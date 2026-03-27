-- BoomMakers — Supabase Initial Schema
-- Migration: 001_initial
-- Created: 2026-03-27

-- ─────────────────────────────────────────────
-- Extension: UUID generation
-- ─────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- Table: leads
-- Stores every submission from the website contact form
-- ─────────────────────────────────────────────
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Contact info
  name            text not null,
  email           text not null,
  phone           text,
  company         text,

  -- Qualification (from multi-step form)
  sector          text,                        -- e.g. 'Barbearia', 'Clínica / Saúde'
  pain_points     text[] default '{}',         -- array of selected pain points
  message         text,

  -- Internal tracking
  plan_interest   text,                        -- 'Starter' | 'Pro' | 'Premium' (optional, from ROI calc)
  status          text not null default 'new', -- new | contacted | qualified | proposal | closed | lost
  assigned_to     text,                        -- name of team member handling the lead
  notes           text,                        -- internal notes (Gil / Elton)

  -- UTM / source tracking
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  referrer        text
);

-- Index for common queries
create index if not exists leads_status_idx       on public.leads (status);
create index if not exists leads_sector_idx       on public.leads (sector);
create index if not exists leads_created_at_idx   on public.leads (created_at desc);

-- ─────────────────────────────────────────────
-- Table: demo_requests
-- Stores explicit demo / diagnostic session bookings
-- (populated from the "Marcar demo" CTA flow)
-- ─────────────────────────────────────────────
create table if not exists public.demo_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  lead_id         uuid references public.leads(id) on delete set null,

  name            text not null,
  email           text not null,
  phone           text,
  company         text,
  sector          text,
  preferred_date  date,
  preferred_time  text,                        -- e.g. '10:00 – 11:00'

  status          text not null default 'pending', -- pending | confirmed | done | cancelled
  meeting_url     text,                        -- Zoom / Google Meet link once confirmed
  notes           text
);

create index if not exists demo_requests_status_idx on public.demo_requests (status);
create index if not exists demo_requests_lead_idx   on public.demo_requests (lead_id);

-- ─────────────────────────────────────────────
-- Row Level Security (RLS)
-- ─────────────────────────────────────────────
-- Enable RLS on both tables
alter table public.leads          enable row level security;
alter table public.demo_requests  enable row level security;

-- Allow anonymous INSERT from the website form (anon key)
create policy "Allow anon insert on leads"
  on public.leads
  for insert
  to anon
  with check (true);

create policy "Allow anon insert on demo_requests"
  on public.demo_requests
  for insert
  to anon
  with check (true);

-- Allow authenticated users (team) to read/update all rows
create policy "Allow authenticated full access on leads"
  on public.leads
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated full access on demo_requests"
  on public.demo_requests
  for all
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
-- Helper view: pipeline_summary
-- Quick overview for the team dashboard
-- ─────────────────────────────────────────────
create or replace view public.pipeline_summary as
select
  status,
  sector,
  count(*)                        as total,
  count(*) filter (where created_at >= now() - interval '7 days')  as last_7_days,
  count(*) filter (where created_at >= now() - interval '30 days') as last_30_days
from public.leads
group by status, sector
order by
  case status
    when 'new'       then 1
    when 'contacted' then 2
    when 'qualified' then 3
    when 'proposal'  then 4
    when 'closed'    then 5
    when 'lost'      then 6
    else 7
  end,
  sector;

-- ─────────────────────────────────────────────
-- Seed: status lookup (informational comment)
-- Valid values for leads.status:
--   new        → just submitted, not yet contacted
--   contacted  → first contact made (call / email)
--   qualified  → diagnostic meeting done, real interest confirmed
--   proposal   → commercial proposal sent
--   closed     → client signed
--   lost       → decided not to proceed
-- ─────────────────────────────────────────────
