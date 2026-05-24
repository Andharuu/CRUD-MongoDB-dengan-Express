# Sistem Akademik - CRUD Dosen & Mahasiswa

Aplikasi web *full-stack* modern untuk manajemen data akademik Dosen dan Mahasiswa menggunakan **Express.js (Backend)**, **React Vite (Frontend)**, dan **MongoDB Atlas (Database Cloud)**.

## 🚀 Fitur Utama
- **CRUD Dosen**: Mengelola data NIP, Nama Lengkap, dan Mata Kuliah.
- **CRUD Mahasiswa**: Mengelola data NRP, Nama Lengkap, dan Program Studi.
- **Navigation Switch Modern**: Komponen perpindahan halaman interaktif dengan tema warna ungu elegan yang mendeteksi rute aktif secara dinamis.
- **Database Cloud Integration**: Terhubung aman menggunakan MongoDB Atlas Cloud atau MongoDB Lokal.

---

## 📁 Struktur Direktori Proyek
Proyek ini dipisahkan menjadi dua lingkungan (*environment*) mandiri yang terisolasi untuk menghindari bentrok dependensi (*package*):

```file structure
.
├── app/                  <-- Proyek Frontend (React + Vite)
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── DosenCard.jsx
│       │   └── MahasiswaCard.jsx
│       └── pages/
│           ├── Home.jsx (Dosen)
│           ├── Create.jsx (Dosen)
│           ├── Edit.jsx (Dosen)
│           ├── MahasiswaHome.jsx
│           ├── MahasiswaCreate.jsx
│           └── MahasiswaEdit.jsx
└── server/               <-- Proyek Backend API (Express + MongoDB CommonJS)
    ├── package.json
    ├── .env
    ├── index.js
    ├── db/
    │   └── conn.js
    └── routes/
        ├── dosen.js
        └── mahasiswa.js

```

## Persyaratan Sistem (Prerequisites)
Sebelum menjalankan aplikasi, pastikan komputer Anda telah terpasang:
- Node.js (Versi 16 atau yang terbaru)
- Akun MongoDB Atlas (untuk penyimpanan cloud) atau MongoDB Community Server (untuk lokal)
- Browser modern (Chrome, Edge, Brave, Firefox)

## 🌐 Cara Menghubungkan ke MongoDB Atlas (Cloud)
Untuk menggunakan database berbasis cloud (MongoDB Atlas) agar data Anda dapat diakses dari mana saja, ikuti panduan berikut:
1. **Registrasi & Buat Cluster**
- Buka situs resmi MongoDB Atlas dan masuk ke akun Anda.
- Buat sebuah proyek baru, lalu klik Create a Deployment.
- Pilih opsi M0 (Free) sebagai cluster gratis, pilih penyedia cloud (seperti AWS/Google Cloud) dan region terdekat (misal: Singapore), lalu klik Create.

2. **Atur Keamanan (Database & Network Access)**
- Database Access: Buat pengguna database (database user). Masukkan Username dan Password baru (Simpan password ini karena akan digunakan di kode). 
- Klik Create User.
- Network Access: Masuk ke menu Network Access di sebelah kiri. Klik Add IP Address. Jika ingin mempermudah akses dari jaringan mana pun (seperti saat berpindah koneksi/Wi-Fi), masukkan IP 0.0.0.0/0 (akses publik dengan proteksi password), lalu klik Confirm.

3. **Dapatkan Connection String (URI)**
- Kembali ke menu Database (Dashboard Utama Atlas).
- Klik tombol Connect pada cluster yang baru saja Anda buat.
- Pilih opsi Drivers (di bawah rubrik Connect to your application).
- Pilih Driver Node.js dan versi terbaru.
- Salin (copy) kode Connection String yang muncul. Bentuknya kurang lebih seperti ini:mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

4. **Konfigurasi pada Proyek Backend**
- Buka proyek Anda di VS Code, masuk ke file server/.env.
- Ubah nilai variabel ATLAS_URI dengan menempelkan (paste) string yang telah disalin.
- Ganti <username> dengan nama user Anda, dan ganti <password> dengan password user database yang Anda buat di langkah sebelumnya.
- Masukkan nama database edu_mongo tepat sebelum tanda tanya (?).
- Contoh isi file server/.env:
```env
ATLAS_URI=mongodb+srv://akademik_user:PasswordRahasia123@cluster0.xxxxx.mongodb.net/edu_mongo?retryWrites=true&w=majority&appName=Cluster0
PORT=5050

```


## 🛠️ Langkah Instalasi & Menjalankan Aplikasi
    Instalasi dilakukan secara terpisah pada masing-masing folder agar tidak merusak arsitektur package.

1. **Jalankan Backend (Server)**
- Buka terminal baru di VS Code, masuk ke folder server:
```Bash
cd server
```

- Instal seluruh library pendukung:
```Bash
npm install
```

- Jalankan server:
```Bash
node index.js
```

- Pastikan muncul pesan sukses:
```Plaintext
Koneksi ke MongoDB berhasil!
Server Express berjalan dengan aman di port: 5050
```

2. **Jalankan Frontend (App)**
- Buka terminal kedua di VS Code (klik tanda + di panel terminal), lalu masuk ke folder app:
```Bash
cd app
```

- Instal dependensi React & Vite:
```Bash
npm install
```

- Jalankan aplikasi frontend:
```Bash
npm run dev
```

- Buka alamat lokal yang disediakan oleh Vite 
    umumnya ```http://localhost:5173``` di browser Anda.


## 📌 Catatan Penting Pengembangan
- CORS Policy: Backend Express sudah dilengkapi middleware cors() sehingga aman menerima data yang dikirim oleh React Vite dari port yang berbeda.
- Dinamis JSON: Sisi server dikonfigurasi menggunakan app.use(express.json()) untuk membaca kiriman body data berformat JSON dari komponen formulir React.
- Top-Level Await: Sisi server menggunakan pembungkusan fungsi asinkronus (connectToServer) untuk menyesuaikan pembatasan CommonJS ("type": "commonjs").