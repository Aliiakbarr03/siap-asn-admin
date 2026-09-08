# SIAP ASN Admin Panel v2 (Vite Build)

Admin panel modern untuk SIAP ASN dengan setup Vite untuk optimization produksi.

## 🚀 Setup & Development

### Prerequisites
- Node.js 16+ dan npm/yarn
- Git

### Installation

```bash
git clone https://github.com/Aliiakbarr03/siap-asn-admin.git
cd siap-asn-admin
git checkout setup/vite-build
npm install
```

### Development Server

```bash
npm run dev
# Buka http://localhost:5173
```

### Production Build

```bash
npm run build
# Output ada di folder 'dist/'
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Struktur Folder

```
siap-asn-admin/
├── src/
│   ├── index.html
│   ├── styles/main.css
│   └── js/
│       ├── main.js
│       ├── auth.js
│       ├── db.js
│       └── ui.js
├── dist/                    (generated)
├── vite.config.js
├── package.json
└── README.md
```

## 🔑 Key Features

✅ File Splitting - modular code
✅ Minification - CSS & JS auto-minified
✅ Hash Filenames - cache busting otomatis
✅ Source Maps - debug-friendly di development
✅ Hot Module Replacement (HMR) - live reload

## 📊 Performance Improvement

**Before:** 634 KB (single file)
**After:** 50-80 KB minified + 30-40 KB CSS
**Load time:** 3-4 detik → 1-2 detik

## 🚀 Deployment

### Netlify

```bash
git push origin setup/vite-build
```

Netlify akan otomatis:
- Pull code dari GitHub
- Run `npm install`
- Run `npm run build`
- Deploy ke server

### Environment Variables

Di Netlify, tambahkan:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`

## 📝 Development Tips

### Add New Module

```javascript
// src/js/newmodule.js
export function myFunction() {
  console.log('Hello');
}

// src/js/main.js
import { myFunction } from './newmodule.js';
window.myFunction = myFunction;
```

## 🐛 Troubleshooting

### Build Error: Cannot find package.json
- Pastikan `package.json` di root folder
- Run `npm install` ulang

### Port 5173 sudah dipakai
```bash
npm run dev -- --port 3000
```

## 📚 Resources

- [Vite Docs](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
