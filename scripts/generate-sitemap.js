// ================================================
// generate-sitemap — tulis dist/sitemap.xml dari src/data/projects.js
//
// Dipanggil otomatis lewat script "postbuild" di package.json, jadi
// sitemap selalu ikut ter-update tiap kali ada project baru ditambah
// atau di-comment out. Sumber URL-nya sama persis dengan
// ssgOptions.includedRoutes di vite.config.js.
// ================================================
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SITE = 'https://panlapan.com'

// lastmod pakai tanggal build (YYYY-MM-DD) — projects.js cuma menyimpan
// tahun, bukan tanggal, jadi tidak ada sumber tanggal yang lebih akurat.
const lastmod = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
  ...projects.map(p => ({
    loc: `${SITE}/work/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

if (!fs.existsSync(DIST)) {
  console.error('[sitemap] dist/ belum ada — jalankan build dulu.')
  process.exit(1)
}

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml)
console.log(`[sitemap] dist/sitemap.xml — ${urls.length} URL`)
