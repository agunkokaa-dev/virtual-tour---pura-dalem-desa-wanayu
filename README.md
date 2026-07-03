# ⛩️ Virtual Tour — Pura Dalem Desa Wanayu

Sebuah aplikasi web interaktif berbasis **React**, **Vite**, dan **Tailwind CSS** yang membungkus tur virtual 360° dari **3DVista VT Pro** untuk mengeksplorasi arsitektur suci **Pura Dalem Desa Wanayu** menggunakan konsep kosmologi Hindu Bali, **Tri Mandala**.

Aplikasi ini dioptimalkan khusus untuk perangkat mobile dan dilengkapi dengan **Mode VR (Stereoskopik)** yang kompatibel dengan VR Box / Google Cardboard murah.

---

## 🌟 Fitur Utama

1. **TourViewer (Integrasi Iframe WebXR)**:
   * Merender tur virtual 360° 3DVista secara *full-screen* dan *seamless*.
   * Dilengkapi kebijakan izin (Permission Policy) lengkap untuk mengizinkan akses sensor giroskop, akselerometer, dan WebXR di dalam iframe:
     `allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer"`

2. **Navigasi Tri Mandala (Sidebar Glassmorphism)**:
   * Menu navigasi melayang transparan modern yang ramah pengguna smartphone (*mobile-friendly*).
   * Membagi eksplorasi pura menjadi 3 zona utama:
     1. **Nista Mandala (Jaba Sisi)** — Zona terluar (sosial & persiapan).
     2. **Madya Mandala (Jaba Tengah)** — Zona tengah (aktivitas manusia, Bale Kulkul, Bale Gong).
     3. **Utama Mandala (Jeroan)** — Zona terdalam yang paling suci (Padmasana & Pelinggih Meru).

3. **Panel Informasi Edukatif (InfoPanel Slide-In)**:
   * Menampilkan informasi edukasi sejarah, makna arsitektur, serta grid fakta menarik mengenai tiap bangunan pura saat tombol "Detail Info" diklik.

4. **Mode VR (Virtual Reality)**:
   * Tombol satu-klik untuk masuk ke Mode VR.
   * Mengaktifkan Fullscreen API dan secara otomatis menyembunyikan seluruh UI overlay 2D (menu sidebar & topbar) agar layar bersih steril saat dimasukkan ke dalam VR Box.

5. **Pemutar Musik Latar (MusicPlayer Gamelan Bali)**:
   * Memutar instrumen gamelan Bali secara otomatis setelah interaksi pertama pengguna.
   * Mendukung format audio lokal `.wav` (prioritas utama) dan `.mp3` (cadangan) dengan fallback cerdas ke lagu ambient online jika file lokal belum siap.
   * Dilengkapi visualizer equalizer gelombang suara bergerak dan pengontrol volume.

---

## 🛠️ Teknologi yang Digunakan

* **Core**: [React 18](https://react.dev/) & [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **3D Engine**: [3DVista Virtual Tour Pro](https://www.3dvista.com/) (Output ekspor HTML5/WebGL diletakkan di `/public/virtual tour output/`)
* **SSL Local Dev**: `@vitejs/plugin-basic-ssl` (Untuk HTTPS lokal)

---

## 🚀 Cara Menjalankan Proyek secara Lokal

### 1. Prasyarat
Pastikan komputer Anda sudah terpasang **Node.js** (LTS terbaru direkomendasikan). Unduh di [nodejs.org](https://nodejs.org/).

### 2. Instalasi Dependencies
Buka terminal/CMD Anda, masuk ke direktori proyek, dan jalankan:
```bash
npm install
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Aplikasi akan berjalan dan menyediakan link lokal.

---

## 📱 Mengakses Lewat HP & Mengaktifkan Sensor VR/Giroskop

> [!IMPORTANT]
> **HTTPS adalah Wajib!** Browser modern (Chrome & Safari) memblokir akses ke sensor gerakan (giroskop/akselerometer) jika website tidak dimuat melalui protokol aman HTTPS.

1. Hubungkan HP dan laptop Anda ke **Wi-Fi yang sama**.
2. Cari IP Wi-Fi asli laptop Anda lewat terminal (Vite akan memunculkan alamat IP Anda di bawah bagian `Network:` saat dev server dijalankan).
3. Buka alamat tersebut di HP dengan format: `https://[IP-LAPTOP-ANDA]:5173/` (gunakan **https**).
4. Lewati peringatan SSL (*Your connection is not private*) di browser HP Anda:
   * **Android (Chrome)**: Klik *Lanjutan (Advanced)* -> *Lanjutkan ke [IP] (tidak aman)*.
   * **iOS (Safari)**: Klik *Tampilkan Rincian (Show Details)* -> *Kunjungi situs web ini (Visit this website)*.
5. Khusus pengguna iPhone (iOS), Anda harus mengetuk **"Izinkan / Allow"** ketika Safari meminta izin akses sensor gerak (*Motion & Orientation*).
6. Tekan tombol **Mode VR** pada web, lalu aktifkan mode **Kacamata VR** bawaan 3DVista di dalam tur untuk mulai menjelajah secara imersif dengan VR Box.

---

## 🎵 Kustomisasi Lagu Gamelan Bali
Untuk menggunakan musik gamelan milik Anda sendiri:
1. Siapkan file lagu berformat `.wav` (atau `.mp3`).
2. Ganti nama file tersebut menjadi **`gamelan.wav`** (atau `gamelan.mp3`).
3. Letakkan file tersebut di dalam direktori `/public` proyek Anda.
4. Komponen `MusicPlayer.jsx` akan mendeteksi file tersebut secara otomatis pada saat web dimuat.
