import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

async function prerender() {
  const serverEntryPath = path.join(distDir, 'server', 'entry-server.js')

  if (!fs.existsSync(serverEntryPath)) {
    console.error('❌ SSR bundle not found at', serverEntryPath)
    process.exit(1)
  }

  const { render } = await import(serverEntryPath)

  const templatePath = path.join(distDir, 'index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')

  const appHtml = await render()
  const html = template.replace('<!--app-html-->', appHtml)

  fs.writeFileSync(templatePath, html)
  console.log('✓ Prerendered dist/index.html')

  // Clean up SSR bundle — not needed at runtime
  fs.rmSync(path.join(distDir, 'server'), { recursive: true, force: true })
  console.log('✓ Cleaned dist/server/')
}

prerender().catch(err => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
