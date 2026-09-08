# SIAP ASN Admin Panel v2 (Vite Build)

Admin panel modern untuk SIAP ASN dengan setup Vite untuk optimization produksi.

## 🚀 Setup & Development

### Prerequisites
- Node.js 16+ dan npm/yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Aliiakbarr03/siap-asn-admin.git
cd siap-asn-admin

# Switch ke branch vite
git checkout setup/vite-build

# Install dependencies
npm install
```

### Development Server

```bash
# Start dev server (hot reload)
npm run dev

# Buka http://localhost:5173
```

### Production Build

```bash
# Build untuk production (minified & optimized)
npm run build

# Output ada di folder 'dist/'
```

### Preview Production Build

```bash
# Preview hasil build sebelum deploy
npm run preview
```

## 📁 Struktur Folder

```
siap-asn-admin/
├── src/
│   ├── index.html              # Entry HTML
│   ├── styles/
│   │   └── main.css           # All CSS (auto-minified)
│   └── js/
│       ├── main.js            # App initialization
│       ├── auth.js            # Authentication
│       ├── db.js              # Database operations
│       └── ui.js              # UI utilities
├── dist/                       # Production build (generated)
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎯 Key Features

✅ **File Splitting**: Kode terpisah jadi modules yang lebih kecil
✅ **Minification**: CSS & JS auto-minified dengan terser
✅ **Hash Filenames**: Cache busting otomatis (`app-abc123.js`)
✅ **Source Maps**: Debug-friendly di development
✅ **CDN Libraries**: XLSX, Supabase, Lucide lewat CDN (bukan bundled)
✅ **Hot Module Replacement (HMR)**: Live reload saat development

## 📊 Performance Improvement

### Before (Single 634 KB file):
- Load time: ~3-4 detik (tergantung bandwidth)
- Cache: Seluruh file di-cache jadi jika ada 1 baris kode berubah, user harus download ulang semua 634 KB

### After (Vite optimized):
- Main bundle: ~50-80 KB (minified)
- CSS: ~30-40 KB (minified)
- Load time: ~1-2 detik
- Cache: Hanya file yang berubah yang di-download ulang

## 🔧 Configuration

### Vite Config (`vite.config.js`)

Tampilan utama:
```javascript
build: {
  minify: 'terser',           // Minification engine
  rollupOptions: {            // Code splitting rules
    output: {
      entryFileNames: '[name]-[hash].js',   // Cache busting
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash].[ext]'
    }
  }
}
```

### Environment Variables

Buat file `.env.local` (tidak di-commit):
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_KEY=your_key
```

## 🚢 Deployment

### Deploy ke Netlify / Vercel

```bash
# Build otomatis saat push ke main branch
git push origin setup/vite-build
```

Config untuk Netlify (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Deploy ke Server Sendiri

```bash
# Build
npm run build

# Upload folder 'dist/' ke server
scp -r dist/* user@server:/var/www/admin
```

## 📝 Development Tips

### Add New Module

```javascript
// src/js/newmodule.js
export function myFunction() {
  console.log('Hello from newmodule');
}

// src/js/main.js
import { myFunction } from './newmodule.js';
window.myFunction = myFunction;
```

### Debugging

Jika mau source maps di production (untuk debugging):

```javascript
// vite.config.js
build: {
  sourcemap: true  // Set ke true untuk include source maps
}
```

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"

```bash
# Pastikan library di-load dari CDN di index.html:
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"><\/script>
```

### Build Error: "Node version mismatch"

```bash
# Upgrade Node.js
nvm use 18  # atau install versi terbaru
```

### Development Server Tidak Bisa Diakses

```bash
# Port 5173 sudah dipakai?
npm run dev -- --port 3000  # Ganti port
```

## 📚 Resources

- [Vite Documentation](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## 🤝 Contributing

Pull requests welcome! Pastikan:
1. Test di development dulu (`npm run dev`)
2. Check build (`npm run build`)
3. Commit message jelas

## 📄 License

MIT License - Bebas digunakan untuk project apapun
