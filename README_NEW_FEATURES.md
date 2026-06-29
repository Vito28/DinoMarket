# UI/UX Refactor Prompt — AdinoMarket / DinoMarket

## Tujuan Utama

Rombak UI/UX website e-commerce **AdinoMarket / DinoMarket** agar terlihat lebih modern, rapi, responsive, dan terasa seperti marketplace profesional. Fokus utama adalah memperbaiki pengalaman pengguna pada navigasi, autentikasi, checkout, halaman pesanan, halaman bantuan, syarat dan ketentuan, kebijakan privasi, settings, serta halaman 404.

Website harus tetap ringan, clean, mudah digunakan, dan cocok untuk e-commerce. Gunakan standar UI/UX marketplace modern seperti Shopee, Tokopedia, atau Lazada sebagai referensi umum, tetapi jangan menyalin brand, warna, layout, logo, atau aset mereka secara langsung.

---

## Konteks Project

Project ini adalah website e-commerce bernama **AdinoMarket / DinoMarket** yang sudah menggunakan React, React Router, React Bootstrap, dan sudah dideploy ke GitHub Pages dengan custom domain.

Pastikan semua perubahan tetap kompatibel dengan deployment static hosting GitHub Pages.

---

## Masalah UI/UX Saat Ini

Beberapa bagian masih perlu diperbaiki:

1. Navigasi masih terlihat kurang rapi dan kurang profesional.
2. Search bar di navigation terlalu mengganggu layout dan membuat navbar terlihat penuh.
3. Tombol masuk/keluar atau login/logout masih kurang bagus secara visual.
4. Navigation belum responsive dengan baik di mobile.
5. Belum ada UI/UX yang jelas untuk user yang sudah login.
6. Belum ada halaman “Pesanan Saya” dengan tampilan status pesanan.
7. Checkout masih harus dicegah jika user belum login.
8. Belum ada halaman Pusat Bantuan.
9. Belum ada halaman Syarat dan Ketentuan.
10. Belum ada halaman Kebijakan Privasi.
11. Belum ada halaman Settings yang layak.
12. Belum ada page 404 yang bagus dan sesuai style website.

---

## Scope Pekerjaan

Lakukan refactor UI/UX secara menyeluruh, tetapi tetap jaga struktur project agar tidak rusak.

Prioritas utama:

1. Perbaiki navigation.
2. Perbaiki tampilan auth state: belum login, sudah login, logout.
3. Tambahkan UI/UX halaman Pesanan Saya.
4. Tambahkan UI/UX halaman Settings.
5. Tambahkan halaman Pusat Bantuan.
6. Tambahkan halaman Syarat dan Ketentuan.
7. Tambahkan halaman Kebijakan Privasi.
8. Tambahkan halaman 404.
9. Tambahkan proteksi checkout untuk user yang belum login.
10. Pastikan semua halaman responsive untuk desktop, tablet, dan mobile.

---

## Requirement Navigation

Rombak navigation agar lebih rapi, modern, dan responsive.

### Desktop Navigation

Navigation desktop harus memiliki:

* Logo + nama brand di sebelah kiri.
* Menu utama yang rapi.
* Menu kategori.
* Cart icon dengan badge jumlah item.
* Auth area yang jelas.
* Jika user belum login, tampilkan tombol:

  * Masuk
  * Daftar
* Jika user sudah login, tampilkan:

  * Avatar atau icon user.
  * Nama user atau label “Akun Saya”.
  * Dropdown menu akun.

### Menu Dropdown Akun

Jika user sudah login, dropdown akun harus berisi:

* Profil Saya
* Pesanan Saya
* Settings
* Pusat Bantuan
* Keluar

Desain dropdown harus clean, punya spacing yang nyaman, hover state yang jelas, dan tidak terlihat default Bootstrap mentah.

### Search Bar

Search bar jangan membuat navigation terlihat penuh atau berantakan.

Buat search bar dengan pendekatan berikut:

* Pada desktop, search boleh tetap ada tetapi harus dibuat lebih rapi, compact, dan proporsional.
* Pada mobile, search sebaiknya dipindah ke bar terpisah di bawah navbar atau dibuka melalui tombol icon search.
* Jangan sampai search bar membuat tombol login/cart turun tidak rapi.
* Gunakan placeholder yang jelas seperti “Cari produk di DinoMarket...”.

### Mobile Navigation

Navigation mobile harus:

* Responsive.
* Tidak terlalu padat.
* Memiliki hamburger menu yang rapi.
* Cart tetap mudah diakses.
* Auth state tetap jelas.
* Search tetap mudah digunakan.
* Dropdown tidak boleh berantakan.

---

## Requirement Auth UI/UX

Buat UI/UX yang jelas untuk kondisi user belum login dan sudah login.

### Belum Login

Jika user belum login:

* Tampilkan tombol “Masuk” dan “Daftar”.
* Tombol harus terlihat profesional.
* User tidak boleh bisa checkout.
* Jika user klik checkout, arahkan ke halaman login atau tampilkan modal/peringatan bahwa checkout membutuhkan login.
* Pesan yang disarankan:

“Silakan masuk terlebih dahulu untuk melanjutkan checkout.”

### Sudah Login

Jika user sudah login:

* Navbar harus menunjukkan bahwa user sudah login.
* Tampilkan avatar/icon user.
* Tampilkan nama user atau label akun.
* Dropdown akun harus aktif.
* User bisa membuka:

  * Pesanan Saya
  * Settings
  * Pusat Bantuan
  * Logout

---

## Requirement Checkout Guard

Tambahkan validasi agar checkout tidak bisa dilakukan jika user belum login.

Ketentuan:

* Jika user belum login dan menekan checkout:

  * Jangan lanjut ke proses checkout.
  * Arahkan ke login atau tampilkan modal login required.
  * Simpan niat checkout jika memungkinkan agar setelah login user bisa lanjut.
* Jika user sudah login:

  * User boleh lanjut checkout.
* UI harus memberi feedback yang jelas, bukan hanya redirect diam-diam.

---

## Requirement Halaman Pesanan Saya

Tambahkan halaman **Pesanan Saya** dengan UI/UX seperti marketplace.

Route yang disarankan:

```txt
/orders
```

Atau:

```txt
/my-orders
```

Halaman Pesanan Saya harus memiliki:

1. Header halaman:

   * Judul: “Pesanan Saya”
   * Deskripsi singkat: “Pantau status pesanan dan riwayat belanja kamu.”

2. Tab status pesanan:

   * Semua
   * Belum Bayar
   * Dikemas
   * Dikirim
   * Selesai
   * Dibatalkan

3. Card pesanan:

   * Nomor pesanan
   * Tanggal pesanan
   * Status pesanan
   * Gambar produk
   * Nama produk
   * Jumlah item
   * Total harga
   * Tombol detail
   * Tombol aksi sesuai status

4. Contoh aksi:

   * Belum Bayar: “Bayar Sekarang”
   * Dikemas: “Lihat Detail”
   * Dikirim: “Lacak Pengiriman”
   * Selesai: “Beli Lagi”
   * Dibatalkan: “Lihat Detail”

5. Empty state:

   * Jika belum ada pesanan, tampilkan ilustrasi sederhana atau icon.
   * Teks: “Belum ada pesanan.”
   * Tombol: “Mulai Belanja”

Desain harus terasa seperti e-commerce profesional, bukan hanya tabel biasa.

---

## Requirement Halaman Settings

Tambahkan halaman **Settings** untuk user yang sudah login.

Route yang disarankan:

```txt
/settings
```

Halaman Settings harus memiliki:

1. Sidebar atau tab menu pada desktop.
2. Layout stacked pada mobile.
3. Section minimal:

   * Informasi Akun
   * Alamat Pengiriman
   * Keamanan Akun
   * Preferensi Notifikasi
   * Privasi

### Informasi Akun

Isi UI:

* Nama
* Email
* Nomor telepon
* Tombol edit

### Alamat Pengiriman

Isi UI:

* List alamat
* Label alamat utama
* Tombol tambah alamat
* Tombol edit alamat

### Keamanan Akun

Isi UI:

* Ubah password
* Logout dari perangkat
* Info keamanan akun

### Preferensi Notifikasi

Isi UI:

* Promo
* Status pesanan
* Email notifikasi
* Push notification jika tersedia

### Privasi

Isi UI:

* Link ke Kebijakan Privasi
* Pengaturan data akun jika diperlukan

---

## Requirement Pusat Bantuan

Tambahkan halaman **Pusat Bantuan**.

Route:

```txt
/help
```

Halaman harus terlihat seperti pusat bantuan e-commerce.

Isi minimal:

1. Hero section:

   * Judul: “Pusat Bantuan”
   * Subtitle: “Temukan jawaban untuk kendala belanja, pembayaran, pengiriman, dan akun.”

2. Search bantuan:

   * Placeholder: “Cari bantuan...”

3. Kategori bantuan:

   * Akun & Login
   * Pesanan
   * Pembayaran
   * Pengiriman
   * Pengembalian Barang
   * Promo & Voucher

4. FAQ section:

   * Bagaimana cara membuat akun?
   * Bagaimana cara melacak pesanan?
   * Bagaimana cara membatalkan pesanan?
   * Mengapa checkout tidak bisa dilakukan?
   * Bagaimana cara menghubungi customer service?

5. Contact support section:

   * Email support
   * WhatsApp/contact number jika tersedia
   * Jam operasional

Desain harus clean, mudah dibaca, dan responsive.

---

## Requirement Syarat dan Ketentuan

Tambahkan halaman **Syarat dan Ketentuan**.

Route:

```txt
/terms
```

Isi halaman harus formal tetapi tetap mudah dibaca.

Section minimal:

1. Pendahuluan
2. Definisi
3. Penggunaan Layanan
4. Akun Pengguna
5. Transaksi dan Pembayaran
6. Pengiriman
7. Pembatalan dan Pengembalian
8. Kewajiban Pengguna
9. Batasan Tanggung Jawab
10. Perubahan Syarat dan Ketentuan
11. Kontak

Gunakan layout dokumen yang rapi:

* Card putih.
* Heading jelas.
* Table of contents jika memungkinkan.
* Typography nyaman.
* Spacing luas.
* Responsive.

---

## Requirement Kebijakan Privasi

Tambahkan halaman **Kebijakan Privasi**.

Route:

```txt
/privacy
```

Isi halaman harus rapi dan profesional.

Section minimal:

1. Pendahuluan
2. Data yang Dikumpulkan
3. Penggunaan Data
4. Penyimpanan Data
5. Keamanan Data
6. Cookie dan Teknologi Serupa
7. Pembagian Data kepada Pihak Ketiga
8. Hak Pengguna
9. Perubahan Kebijakan Privasi
10. Kontak

Tampilan harus konsisten dengan halaman Syarat dan Ketentuan.

---

## Requirement Page 404

Tambahkan halaman 404 yang bagus.

Route fallback:

```txt
*
```

Page 404 harus memiliki:

* Judul besar: “404”
* Teks: “Halaman yang kamu cari tidak ditemukan.”
* Deskripsi singkat.
* Tombol kembali ke Beranda.
* Tombol lihat produk atau kategori.
* Visual sederhana seperti icon/search illustration/cart empty.
* Responsive dan sesuai style website.

Jangan tampilkan halaman putih kosong atau default browser.

---

## Requirement Footer

Footer harus diperbaiki agar mendukung halaman baru.

Footer minimal berisi:

1. Brand section:

   * Logo
   * Nama DinoMarket
   * Deskripsi singkat

2. Layanan Pelanggan:

   * Pusat Bantuan
   * Cara Belanja
   * Pengiriman
   * Pengembalian

3. Tentang:

   * Tentang Kami
   * Syarat dan Ketentuan
   * Kebijakan Privasi

4. Akun:

   * Masuk
   * Daftar
   * Pesanan Saya
   * Settings

5. Kontak:

   * Nomor kontak
   * Email
   * Lokasi jika ada

Footer harus responsive dan rapi di mobile.

---

## Visual Design Direction

Gunakan style marketplace modern:

* Clean.
* Banyak whitespace.
* Card-based layout.
* Rounded corners.
* Shadow lembut.
* Warna primary konsisten.
* Typography mudah dibaca.
* Button jelas.
* Hover state ada.
* Active state jelas.
* Tidak terlalu ramai.
* Tidak terlihat seperti Bootstrap default mentah.

### Referensi Feel

Gunakan pendekatan umum marketplace seperti:

* Header jelas.
* Search mudah ditemukan.
* Cart mudah diakses.
* User account mudah dimengerti.
* Pesanan punya status tab.
* Bantuan punya kategori dan FAQ.
* Legal pages terlihat formal dan rapi.

Jangan menyalin brand Shopee, Tokopedia, Lazada, atau marketplace lain secara langsung.

---

## Responsive Requirement

Pastikan semua halaman bagus pada:

* Desktop besar
* Laptop
* Tablet
* Mobile

Breakpoint yang perlu diperhatikan:

* Mobile kecil sekitar 320px
* Mobile umum 375px - 430px
* Tablet 768px
* Desktop 1024px ke atas

Tidak boleh ada:

* Horizontal scroll tidak perlu.
* Navbar pecah.
* Button keluar layar.
* Search bar terlalu besar di mobile.
* Dropdown menumpuk berantakan.
* Card pesanan terlalu sempit.
* Text terlalu kecil.

---

## Accessibility Requirement

Pastikan UI lebih accessible:

* Button punya label jelas.
* Icon-only button harus punya `aria-label`.
* Form input punya label atau placeholder jelas.
* Warna teks harus kontras.
* Focus state tidak hilang.
* Link harus bisa dikenali.
* Jangan hanya mengandalkan warna untuk status.

---

## Routing Requirement

Tambahkan atau rapikan route berikut:

```txt
/
/search/:query
/cart
/checkout
/orders
/settings
/help
/terms
/privacy
/login
/register
*
```

Jika project sudah punya route berbeda, sesuaikan tanpa merusak flow yang ada.

---

## Data Dummy

Jika backend atau data asli belum tersedia, gunakan dummy data yang rapi untuk UI preview.

Contoh status pesanan:

* Belum Bayar
* Dikemas
* Dikirim
* Selesai
* Dibatalkan

Pastikan dummy data mudah diganti ke data asli nanti.

---

## Code Quality

Saat melakukan perubahan:

1. Jangan merusak fitur yang sudah ada.
2. Jangan menghapus logic penting tanpa alasan.
3. Komponen harus dipisah dengan rapi jika perlu.
4. Gunakan nama komponen yang jelas.
5. Hindari duplikasi kode berlebihan.
6. Gunakan class CSS yang konsisten.
7. Pastikan build berhasil.
8. Pastikan tidak ada import yang rusak.
9. Pastikan route tidak error.
10. Pastikan deploy ke GitHub Pages tetap aman.

---

## File yang Kemungkinan Perlu Diubah

Silakan sesuaikan dengan struktur project, tetapi kemungkinan file yang perlu disentuh:

```txt
src/components/Navigation.jsx
src/components/Footer.jsx
src/components/AuthButton.jsx
src/pages/Orders.jsx
src/pages/Settings.jsx
src/pages/Help.jsx
src/pages/Terms.jsx
src/pages/Privacy.jsx
src/pages/NotFound.jsx
src/pages/Checkout.jsx
src/App.jsx
src/main.jsx
src/styles atau src/index.css
```

Jika file belum ada, buat file baru dengan struktur yang rapi.

---

## Acceptance Criteria

Perubahan dianggap selesai jika:

1. Navbar terlihat modern, clean, dan responsive.
2. Search bar tidak lagi merusak layout.
3. Login/logout UI terlihat profesional.
4. User yang sudah login terlihat jelas di navbar.
5. User yang belum login tidak bisa checkout.
6. Ada halaman Pesanan Saya dengan tab status pesanan.
7. Ada halaman Settings yang rapi.
8. Ada halaman Pusat Bantuan.
9. Ada halaman Syarat dan Ketentuan.
10. Ada halaman Kebijakan Privasi.
11. Ada halaman 404 yang bagus.
12. Footer sudah memuat link halaman penting.
13. Semua halaman responsive.
14. Build berhasil tanpa error.
15. Tidak ada broken route.
16. Tidak ada asset/logo yang hilang.
17. Website tetap cocok untuk deploy GitHub Pages.

---

## Final Check

Setelah selesai, jalankan:

```bash
bun run build
```

Pastikan build sukses.

Jika ada error, perbaiki sampai build berhasil.

Setelah itu project siap dideploy dengan:

```bash
bun run deploy
```
