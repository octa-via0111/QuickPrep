# QuickPrep 🍳

> **Cook what you have. Spend what you can. Make it simple.**
> Aplikasi Panduan Memasak Cerdas & Praktis Berbasis Progressive Web App (PWA)

---

## 1. Deskripsi QuickPrep

**QuickPrep** adalah aplikasi web Progressive Web App (PWA) panduan memasak yang dirancang khusus untuk mahasiswa, anak kos, pemula, dan siapa saja yang ingin memasak secara hemat, praktis, dan anti-bingung.

QuickPrep tidak hanya menyediakan daftar resep biasa, melainkan secara aktif membantu pengguna menentukan hidangan berdasarkan kondisi nyata mereka:
- Berapa sisa uang di dompet hari ini (fitur **Cook on Budget**).
- Alat masak apa saja yang tersedia di kosan (fitur **Cook with My Tools**).
- Memilihkan menu secara otomatis ketika bingung mau makan apa (fitur **Recipe Spin Wheel**).
- Memberikan solusi alternatif bumbu ketika ada bahan yang habis di kulkas (fitur **Missing Ingredients / Substitusi Bahan**).
- Membimbing langkah demi langkah memasak dengan fokus penuh, teks instruksi besar, penyesuaian bahan pengganti otomatis, dan timer memasak terintegrasi (fitur **Mode Memasak Interaktif**).

---

## 2. Fitur Utama Aplikasi

1. **Recipe Spin Wheel (Roulette Penentu Menu)**:
   - Roda roulette berputar mulus dengan efek suara detak roda dan perayaan *confetti*.
   - Mengambil resep nyata dari database sesuai filter budget, kategori, alat, dan durasi yang dipilih pengguna sebelum memutar.
2. **Cook on Budget**:
   - Filter resep berdasarkan uang yang dimiliki (preset Rp5.000, Rp10.000, Rp15.000, Rp20.000, Rp25.000, atau input nominal bebas).
   - Menampilkan estimasi biaya total, biaya per porsi, dan estimasi waktu masak.
3. **Cook with My Tools**:
   - Filter resep berdasarkan alat masak yang dimiliki (Rice cooker, Wajan, Teflon, Panci, Kompor, Blender, dll).
   - Pengguna dapat menyimpan daftar alat yang dimiliki di profil sebagai preferensi default.
4. **Missing Ingredients / Substitusi Bahan**:
   - Menandai bahan yang tidak tersedia dan memberikan saran pengganti bumbu yang realistis untuk masakan Indonesia.
   - Memberikan penjelasan alasan substitusi, perkiraan perubahan rasa, serta perubahan tekstur masakan.
   - Mengganti bahan langsung di tampilan resep secara interaktif.
5. **Dynamic Serving Scaler (Pengatur Porsi Dinamis)**:
   - Jumlah porsi resep dapat diubah naik/turun dengan satu klik, dan kuantitas seluruh takaran bahan otomatis dikalkulasikan ulang.
6. **Mode Memasak Interaktif (Step-by-Step Cooking Mode)**:
   - Mode memasak layar fokus per langkah (*distraction-free*).
   - Penyesuaian otomatis nama bahan pada instruksi jika pengguna memilih bahan pengganti/substitusi.
   - Navigasi jelas: *Langkah Sebelumnya*, *Langkah Berikutnya*, serta indikator progres langkah.
   - Selesai memasak ditandai selebrasi confetti dan pencatatan riwayat memasak.
7. **Cooking Timer Terintegrasi**:
   - Timer hitung mundur interaktif per langkah atau mandiri dengan preset durasi dan notifikasi suara lonceng (*chime*) saat waktu habis.
8. **Resep Favorit & Riwayat Memasak**:
   - Resep favorit disimpan di LocalStorage dan tetap tersedia saat aplikasi ditutup/dibuka kembali.
   - Riwayat memasak mencatat masakan yang pernah dibuat beserta rating bintang dan catatan rasa.
9. **Progressive Web App (PWA) & Offline Mode**:
   - Dapat diinstall di layar utama smartphone (Android/iOS) dan desktop (*standalone mode*).
   - Menggunakan Service Worker dan strategi caching cerdas.
   - Menampilkan indikator banner offline dan fallback halaman offline yang ramah ketika koneksi terputus.

---

## 3. Teknologi yang Digunakan

### Frontend
- **React.js 18** (JavaScript murni, *tanpa TypeScript* sesuai ketentuan praktikum)
- **Vite** (Build tool super cepat)
- **React Router DOM v7** (Navigasi Single Page Application / SPA)
- **Axios** (Komunikasi HTTP terpusat ke backend REST API)
- **Lucide React** (Ikon antarmuka modern dan konsisten)
- **Canvas-Confetti** (Animasi selebrasi saat spin dan selesai memasak)
- **Web Speech API** (Sintesis suara Text-to-Speech Bahasa Indonesia `id-ID`)
- **Web Audio API** (Sintesis efek suara detak roulette dan lonceng timer)
- **CSS Modular & Terorganisasi** (Palet warna *Modern Cozy Kitchen*: Cream `#FAF7F2`, Terracotta `#E0623A`, Dark Brown `#2E231F`, Sage Green `#5B8266`)

### Backend dan API
- **Node.js** & **Express.js**
- **RESTful API Architecture** (Router, Controller, Service, Middleware)
- **CORS & Morgan** (Cross-Origin Resource Sharing dan logging request)
- **Supabase Client (`@supabase/supabase-js`)** (Koneksi ke database Supabase PostgreSQL)
- **Graceful Fallback Mode**: Backend memiliki database *in-memory* otomatis dari seed data sehingga aplikasi tetap langsung dapat dijalankan out-of-the-box bahkan sebelum credential Supabase diisi.

### Database
- **Supabase PostgreSQL**
- Tabel: `categories`, `tools`, `ingredients`, `recipes`, `recipe_tools`, `recipe_ingredients`, `substitutions`, `cooking_history`.

### Progressive Web App (PWA)
- `manifest.json` (Nama, ikon 192px/512px, warna tema, display standalone)
- `sw.js` (Service Worker dengan Cache API, offline fallback, stale-while-revalidate pada API)
- `offline.html` (Halaman ramah pengguna saat koneksi internet terputus)

---

## 4. Struktur Folder Project

```
TA QUICKPREP/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.js          # Koneksi client Supabase
│   │   ├── controllers/
│   │   │   ├── categoryController.js
│   │   │   ├── historyController.js
│   │   │   ├── recipeController.js
│   │   │   ├── substitutionController.js
│   │   │   └── toolController.js
│   │   ├── data/
│   │   │   └── seedData.js          # 26 Resep lengkap, kategori, alat, & substitusi
│   │   ├── middleware/
│   │   │   ├── errorHandler.js      # Penanganan 404 & error server global
│   │   │   └── validator.js         # Validasi parameter request query/body
│   │   ├── routes/
│   │   │   ├── categoryRoutes.js
│   │   │   ├── historyRoutes.js
│   │   │   ├── recipeRoutes.js
│   │   │   ├── substitutionRoutes.js
│   │   │   └── toolRoutes.js
│   │   ├── services/
│   │   │   └── supabaseService.js   # Logika query Supabase & filter fallback
│   │   └── index.js                 # Entry point Express server
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   │   ├── icon-192x192.svg
│   │   │   └── icon-512x512.svg
│   │   ├── favicon.svg
│   │   ├── manifest.json            # PWA Web App Manifest
│   │   ├── offline.html             # Offline fallback page
│   │   └── sw.js                    # PWA Service Worker
│   ├── src/
│   │   ├── components/
│   │   │   ├── BottomNav.jsx        # 5 Tab Menu Mobile
│   │   │   ├── CookingTimer.jsx     # Timer memasak interaktif
│   │   │   ├── Navbar.jsx           # Navigasi desktop & status online/offline
│   │   │   ├── OfflineBanner.jsx    # Notifikasi status offline
│   │   │   ├── RecipeCard.jsx       # Kartu resep responsif
│   │   │   ├── SpinWheel.jsx        # Roulette wheel canvas + suara + confetti
│   │   │   └── SubstitutionModal.jsx# Modal penukar bahan masakan
│   │   ├── hooks/
│   │   │   ├── useCategories.js
│   │   │   ├── useFavorites.js
│   │   │   ├── useOnlineStatus.js
│   │   │   ├── useRecipeDetail.js
│   │   │   ├── useRecipes.js
│   │   │   └── useSpeech.js         # Web Speech API TTS Bahasa Indonesia
│   │   ├── pages/
│   │   │   ├── BudgetPage.jsx       # Halaman Cook on Budget
│   │   │   ├── CookingModePage.jsx  # Halaman Mode Memasak Interaktif
│   │   │   ├── ExplorePage.jsx      # Halaman Jelajah Resep & Filter
│   │   │   ├── FavoritesPage.jsx    # Halaman Resep Favorit
│   │   │   ├── HomePage.jsx         # Halaman Utama
│   │   │   ├── ProfilePage.jsx      # Halaman Profil & Preferensi Alat
│   │   │   └── RecipeDetailPage.jsx # Halaman Detail Resep & Skalasi Porsi
│   │   ├── services/
│   │   │   ├── api.js               # Konfigurasi Axios terpusat
│   │   │   ├── categoryService.js
│   │   │   ├── historyService.js
│   │   │   ├── recipeService.js
│   │   │   ├── substitutionService.js
│   │   │   └── toolService.js
│   │   ├── styles/
│   │   │   └── index.css            # Desain sistem Modern Cozy Kitchen
│   │   ├── utils/
│   │   │   ├── formatter.js         # Format Rupiah & durasi waktu
│   │   │   ├── pwa.js               # Registrasi SW & Install Prompt
│   │   │   └── storage.js           # Pengelolaan LocalStorage
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── database/
│   ├── schema.sql                   # DDL Pembuatan tabel di Supabase
│   ├── seed.sql                     # DML 26 Resep lengkap untuk Supabase
│   └── setup_guide.md               # Panduan setup Supabase lengkap
│
├── postman/
│   └── QuickPrep_API.postman_collection.json # Koleksi pengujian REST API
│
├── package.json                     # Root package runner
└── README.md
```

---

## 5. Cara Instalasi Frontend

1. Buka terminal dan masuk ke folder `frontend`:
   ```bash
   cd frontend
   ```
2. Install seluruh dependensi frontend:
   ```bash
   npm install
   ```

---

## 6. Cara Instalasi Backend

1. Buka terminal dan masuk ke folder `backend`:
   ```bash
   cd backend
   ```
2. Install seluruh dependensi backend:
   ```bash
   npm install
   ```

---

## 7. Cara Menjalankan Backend

1. Di dalam folder `backend`:
   ```bash
   npm run dev
   ```
   *(atau `npm start`)*
2. Server backend akan aktif di:
   ```
   http://localhost:5000
   ```
   Endpoint uji: `http://localhost:5000/api/health`

---

## 8. Cara Menjalankan Frontend

1. Di terminal baru, masuk ke folder `frontend`:
   ```bash
   npm run dev
   ```
2. Aplikasi web frontend akan terbuka di:
   ```
   http://localhost:5173
   ```
3. Vite telah dikonfigurasi dengan proxy otomatis sehingga semua request `/api` langsung diteruskan ke backend port 5000.

---

## 9. Cara Membuat Project Supabase

1. Buka [https://supabase.com](https://supabase.com) dan login.
2. Klik tombol **New Project**.
3. Masukkan nama project (misal: `quickprep-db`), buat database password, dan pilih region terdekat (misal: `Singapore`).
4. Klik **Create new project** dan tunggu proses inisialisasi selesai.

---

## 10. Cara Membuat Tabel Database di Supabase

1. Di dashboard Supabase, buka menu **SQL Editor** pada sidebar kiri.
2. Klik **New query**.
3. Buka file `database/schema.sql` pada project ini, lalu salin seluruh kodenya.
4. Tempel ke dalam SQL Editor Supabase dan klik **Run**.
5. Delapan tabel relasional akan otomatis dibuat dengan index yang optimal.

---

## 11. Cara Mengisi Data Resep Awal (Seed Data)

1. Buka tab query baru di **SQL Editor** Supabase.
2. Buka file `database/seed.sql` pada project ini, lalu salin seluruh kodenya.
3. Tempel ke SQL Editor Supabase dan klik **Run**.
4. Database Supabase kini telah terisi dengan 26 resep masakan Indonesia, 7 kategori, 9 alat masak, 111 bahan, dan 10 substitusi bumbu.

---

## 12. Cara Mengisi Environment Variables

### Backend (`backend/.env`):
Salin `backend/.env.example` menjadi `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# Dapatkan dari Supabase Dashboard -> Project Settings -> API
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Frontend (`frontend/.env`):
Salin `frontend/.env.example` menjadi `frontend/.env`:
```env
# Mode lokal (menggunakan proxy Vite):
VITE_API_URL=/api

# Atau langsung mengarah ke URL backend production:
# VITE_API_URL=https://quickprep-api.yourdomain.com/api
```

---

## 13. Cara Menguji REST API Menggunakan Postman

Telah disediakan file koleksi Postman siap pakai di `postman/QuickPrep_API.postman_collection.json`.

Langkah pengujian:
1. Buka aplikasi **Postman**.
2. Klik tombol **Import** di pojok kiri atas, lalu pilih file `postman/QuickPrep_API.postman_collection.json`.
3. Koleksi akan otomatis mengimpor request berikut:
   - `GET {{baseUrl}}/api/health`
   - `GET {{baseUrl}}/api/recipes`
   - `GET {{baseUrl}}/api/recipes?search=telur`
   - `GET {{baseUrl}}/api/recipes?category=sarapan`
   - `GET {{baseUrl}}/api/recipes?maxBudget=10000`
   - `GET {{baseUrl}}/api/recipes?tool=rice-cooker`
   - `GET {{baseUrl}}/api/recipes?maxCookingTime=15`
   - `GET {{baseUrl}}/api/recipes/rec-01`
   - `GET {{baseUrl}}/api/recipes/rec-01/substitutions`
   - `GET {{baseUrl}}/api/categories`
   - `GET {{baseUrl}}/api/tools`
   - `GET {{baseUrl}}/api/substitutions`
   - `GET {{baseUrl}}/api/substitutions?ingredient=santan`
   - `GET {{baseUrl}}/api/cooking-history`
   - `POST {{baseUrl}}/api/cooking-history`
4. Pastikan backend sedang berjalan (`http://localhost:5000`), lalu klik **Send** pada salah satu request untuk melihat response JSON berformat standar.

---

## 14. Cara Menghubungkan Frontend dan Backend

1. **Pada masa development lokal**:
   - Jalankan backend pada port 5000 (`cd backend && npm run dev`).
   - Jalankan frontend pada port 5173 (`cd frontend && npm run dev`).
   - File `frontend/vite.config.js` sudah memiliki konfigurasi proxy otomatis:
     ```js
     proxy: {
       '/api': {
         target: 'http://localhost:5000',
         changeOrigin: true
       }
     }
     ```
   - Request Axios di frontend memanggil `/api/recipes` yang secara mulus diteruskan ke Express backend.

2. **Pada masa deployment terpisah**:
   - Atur variable `VITE_API_URL` di frontend agar mengarah ke domain backend production Anda.

---

## 15. Cara Deploy Frontend ke Vercel

1. Buka [https://vercel.com](https://vercel.com) dan hubungkan akun GitHub Anda.
2. Klik **Add New Project**, lalu pilih repository `TA QUICKPREP`.
3. Konfigurasikan project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Klik **Deploy**.

---

## 16. Konfigurasi Environment Variables di Vercel

1. Di dashboard project Vercel Anda, buka tab **Settings** > **Environment Variables**.
2. Tambahkan variable:
   - **Key**: `VITE_API_URL`
   - **Value**: URL backend REST API Anda yang sudah di-deploy (misalnya di Render, Railway, atau VPS: `https://quickprep-backend.railway.app/api`).
3. Lakukan **Redeploy** agar build frontend membaca environment variable yang baru.

---

## 17. Cara Menguji PWA (Progressive Web App)

1. Buka aplikasi di browser Google Chrome, Edge, atau browser modern lainnya.
2. Buka **Developer Tools** (`F12` atau klik kanan > *Inspect*).
3. Buka tab **Application** (atau **Lighthouse**).
4. Di bagian **Manifest**:
   - Periksa bahwa `name`, `short_name`, `start_url`, `theme_color`, dan ikon `192x192` serta `512x512` terbaca dengan benar.
5. Tombol **"Install App"** akan muncul di bilah navigasi QuickPrep, atau ikon install PWA akan muncul di kolom URL (*omnibox*) browser.
6. Klik **Install** untuk menginstall QuickPrep sebagai aplikasi mandiri di desktop Anda.

---

## 18. Cara Menguji Service Worker

1. Buka **Developer Tools** > tab **Application** > **Service Workers**.
2. Pastikan file `sw.js` terdaftar dengan status **Activated and is running**.
3. Buka tab **Cache Storage**:
   - Anda akan melihat cache bernama `quickprep-v1.0.0` yang menyimpan App Shell, aset gambar, serta respons API.
4. Di tab **Application** > **Service Workers**, centang kotak **Offline** (atau matikan koneksi internet laptop).
5. Refresh halaman. Aplikasi QuickPrep akan tetap terbuka normal dan menampilkan banner:
   *"Koneksi internet terputus. Menampilkan resep dari memori cache lokal."*

---

## 19. Cara Menguji Aplikasi pada Smartphone

1. Hubungkan smartphone dan komputer Anda ke jaringan Wi-Fi yang sama.
2. Di komputer, cari alamat IP lokal Anda (misal `192.168.1.15` melalui `ipconfig` di terminal).
3. Jalankan Vite frontend dengan host publik:
   ```bash
   cd frontend
   npx vite --host
   ```
4. Buka browser di smartphone Anda (Google Chrome di Android atau Safari di iOS).
5. Masukkan alamat IP komputer, contoh: `http://192.168.1.15:5173`.
6. Di Android: Ketuk menu titik tiga di Chrome > pilih **"Tambahkan ke Layar Utama" (Add to Home screen)** / **"Install Aplikasi"**.
7. Di iOS (Safari): Ketuk ikon Bagikan (*Share*) > pilih **"Add to Home Screen"**.
8. Aplikasi QuickPrep kini terpasang dengan ikon dan pengalaman layar penuh seperti aplikasi native!

---

## 20. Catatan Fitur Online vs Fitur Offline

| Fitur | Butuh Internet (Online) | Berfungsi Saat Offline | Keterangan |
|---|:---:|:---:|---|
| **Melihat Resep dari Database** | Ya (pertama kali) | Ya (dari cache) | Resep yang pernah dibuka otomatis disimpan ke Cache Storage & LocalStorage. |
| **Pencarian & Filter Resep** | Ya | Ya (pada resep lokal) | Saat offline, filter diterapkan secara otomatis pada data yang ada di cache. |
| **Recipe Spin Wheel** | Ya | Ya (kandidat dari cache) | Tetap dapat memutar roulette dan memilih resep yang tersimpan di perangkat. |
| **Checklist Bahan & Porsi** | Tidak | **Ya 100%** | Dikelola secara interaktif di sisi klien (React state). |
| **Substitusi Bahan** | Ya | Ya (dari cache) | Database substitusi yang sudah dicache dapat langsung dilihat. |
| **Mode Memasak Interaktif** | Tidak | **Ya 100%** | Panduan memasak per langkah dengan instruksi dinamis & penyesuaian substitusi. |
| **Cooking Timer** | Tidak | **Ya 100%** | Menggunakan Web Audio API dan JavaScript interval di browser. |
| **Simpan Favorit & Profil** | Tidak | **Ya 100%** | Tersimpan langsung di LocalStorage perangkat. |
| **Simpan Riwayat Masak** | Tidak | **Ya 100%** | Tersimpan di LocalStorage secara instan dan akan disinkronisasikan ke backend API saat online. |

---

## 21. Checklist Kesesuaian Fungsional

- [x] **Home** tampil dinamis dengan data API.
- [x] **Search resep** berfungsi secara real-time.
- [x] **Filter kategori** (Sarapan, Makan Siang, Makan Malam, Camilan, Minuman, Dessert, Anak Kos).
- [x] **Filter budget** (Rp5.000, Rp10.000, Rp15.000, Rp20.000, Rp25.000, custom).
- [x] **Filter alat masak** (Rice cooker, wajan, teflon, panci, kompor, blender, dll).
- [x] **Filter waktu memasak** (≤12 mnt, ≤15 mnt, ≤20 mnt, ≤30 mnt).
- [x] **Recipe Spin Wheel** interaktif, suara putaran, dan hasil resep dari data API sesuai filter.
- [x] **Kartu resep** dapat diklik dan membuka detail resep.
- [x] **Detail resep** menampilkan foto, deskripsi, estimasi biaya, alat, bahan, dan langkah.
- [x] **Checklist bahan** berfungsi dengan status coret/tersedia.
- [x] **Substitusi bahan** dapat dipilih dengan penjelasan rasa dan tekstur serta **otomatis memperbarui teks langkah memasak**.
- [x] **Pengatur porsi dinamis** (Scaler) otomatis menghitung ulang jumlah bahan.
- [x] **Mode Memasak Interaktif** memandu langkah memasak dengan antarmuka fokus dan navigasi jelas.
- [x] **Timer memasak** menghitung mundur dan berbunyi notifikasi lonceng saat selesai.
- [x] **Favorit** dapat ditambah/dihapus dan tersimpan di LocalStorage.
- [x] **Profil & Preferensi** alat masak dan tema night mode dapat diedit dan tersimpan.
- [x] **Riwayat memasak** tersimpan dengan rating dan catatan.
- [x] **RESTful API** terstruktur (Router, Controller, Service, Middleware) dan siap uji Postman.
- [x] **Database Supabase** PostgreSQL didukung penuh (`schema.sql` dan `seed.sql`).
- [x] **Bottom Navigation Bar** 5 menu aktif dengan penanda visual responsif.
- [x] **PWA Installable & Service Worker** berfungsi dengan offline caching.
- [x] **Loading, empty, and error states** tersedia di semua halaman.

---

*Dibuat untuk Tugas Akhir Aplikasi Web & Praktikum Progressive Web App — QuickPrep Team.*
