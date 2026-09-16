// ================================================
// generate-og-image — bikin public/assets/images/og-home.jpg (1200×630)
//
// Logo putih Panlapan di tengah, di atas warna background brand yang
// dibaca langsung dari --color-black di src/assets/main.css. Ini kartu
// OG sementara sampai ada kartu resmi dari designer.
//
// Cara jalanin (sharp tidak disimpan sebagai dependency):
//   npx --yes -p sharp node scripts/generate-og-image.js
// ================================================
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LOGO = path.join(ROOT, 'public/assets/images/6-9-2026 - Primary Logo Panlapan - White.png')
const OUT  = path.join(ROOT, 'public/assets/images/og-home.jpg')
const CSS  = path.join(ROOT, 'src/assets/main.css')

const W = 1200, H = 630

// Ambil --color-black dari main.css, jangan hardcode — kalau brand
// color-nya diganti di CSS, OG image ikut berubah waktu di-generate ulang.
const css = fs.readFileSync(CSS, 'utf8')
const bg = css.match(/--color-black:\s*(#[0-9a-fA-F]{3,8})/)?.[1]
if (!bg) throw new Error('--color-black tidak ditemukan di src/assets/main.css')

// Logo dibatasi ~60% lebar kanvas supaya ada napas di pinggir
const logo = await sharp(LOGO)
  .resize({ width: Math.round(W * 0.6), height: Math.round(H * 0.6), fit: 'inside' })
  .png()
  .toBuffer()

await sharp({ create: { width: W, height: H, channels: 3, background: bg } })
  .composite([{ input: logo, gravity: 'centre' }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT)

const kb = (fs.statSync(OUT).size / 1024).toFixed(1)
console.log(`[og-image] ${path.relative(ROOT, OUT)} — ${W}×${H}, bg ${bg}, ${kb} KB`)
