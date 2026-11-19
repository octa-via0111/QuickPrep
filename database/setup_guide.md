# Panduan Konfigurasi Database Supabase QuickPrep

Panduan langkah demi langkah untuk menghubungkan QuickPrep dengan database PostgreSQL di Supabase.

---

## 1. Membuat Project Supabase Baru
1. Buka [https://supabase.com](https://supabase.com) dan login atau buat akun baru.
2. Klik tombol **New Project**.
3. Isi informasi project:
   - **Name**: `quickprep-db` (atau nama lain yang diinginkan)
   - **Database Password**: Buat password yang kuat dan catat dengan aman.
   - **Region**: Pilih region terdekat (misal `Singapore (ap-southeast-1)`).
4. Klik **Create new project** dan tunggu 1-2 menit hingga status database aktif (Green/Healthy).

---

## 2. Membuat Struktur Tabel (Schema)
1. Di dashboard Supabase project Anda, klik menu **SQL Editor** pada navigasi sidebar kiri.
2. Klik **New query**.
3. Buka file `database/schema.sql` pada repository QuickPrep ini.
4. Salin (copy) seluruh isi file `database/schema.sql`, lalu tempel (paste) ke dalam SQL Editor Supabase.
5. Klik tombol **Run** (atau tekan `Ctrl + Enter`).
6. Pastikan muncul pesan `Success. No rows returned` yang menandakan tabel-tabel berikut berhasil dibuat:
   - `categories`
   - `tools`
   - `ingredients`
   - `recipes`
   - `recipe_tools`
   - `recipe_ingredients`
   - `substitutions`
   - `cooking_history`

---

## 3. Mengisi Data Resep Awal (Seed Data)
1. Masih di **SQL Editor** Supabase, klik tombol **New query** (tab baru).
2. Buka file `database/seed.sql` pada repository ini.
3. Salin (copy) seluruh isi file `database/seed.sql` (berisi 26 resep, kategori, alat, bahan, dan substitusi).
4. Tempel (paste) ke dalam SQL Editor Supabase.
5. Klik tombol **Run**.
6. Anda dapat memverifikasi datanya dengan membuka menu **Table Editor** di sidebar kiri dan melihat isi tabel `recipes` (terdapat 26 data resep lengkap).

---

## 4. Mendapatkan API Credentials Supabase
1. Di dashboard Supabase, buka menu **Project Settings** (ikon gear di pojok kiri bawah).
2. Pilih submenu **API**.
3. Di bagian **Project API Keys**:
   - Salin **Project URL** (contoh: `https://xyzcompany.supabase.co`).
   - Salin key **anon / public** (key ini aman digunakan untuk akses publik).
   *(PENTING: Jangan gunakan `service_role` key).*

---

## 5. Memasang Kredensial ke Backend QuickPrep
1. Buka file `backend/.env` di project lokal Anda.
2. Perbarui nilai `SUPABASE_URL` dan `SUPABASE_ANON_KEY`:
   ```env
   PORT=5000
   NODE_ENV=development
   SUPABASE_URL=https://proyek-anda.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Restart server backend (`npm run dev` pada folder `backend`).
4. Pada terminal backend akan muncul log:
   ```
   [Supabase] Terhubung ke Supabase PostgreSQL: https://proyek-anda.supabase.co
   ```
5. Selamat! Backend QuickPrep kini terhubung penuh secara real-time ke database PostgreSQL Supabase Anda!
