import LegalPage from "./LegalPage";

const sections = [
  ["pendahuluan", "Pendahuluan", "Kebijakan ini menjelaskan bagaimana DinoMarket mengelola data pengguna saat menggunakan akun, keranjang, checkout, dan layanan bantuan."],
  ["data", "Data yang Dikumpulkan", "Data yang dapat dikumpulkan meliputi nama, email, alamat, nomor telepon, preferensi notifikasi, riwayat keranjang, dan aktivitas pesanan."],
  ["penggunaan", "Penggunaan Data", "Data digunakan untuk autentikasi, pemrosesan pesanan, personalisasi pengalaman belanja, pengiriman notifikasi, dan peningkatan layanan."],
  ["penyimpanan", "Penyimpanan Data", "Pada versi static ini, sebagian data disimpan di browser pengguna menggunakan localStorage agar fitur demo tetap berjalan tanpa backend."],
  ["keamanan", "Keamanan Data", "Kami menerapkan pembatasan data yang ditampilkan dan mendorong pengguna memakai password yang kuat serta perangkat yang tepercaya."],
  ["cookie", "Cookie dan Teknologi Serupa", "DinoMarket dapat memakai penyimpanan lokal browser untuk menyimpan sesi, keranjang, dan preferensi tampilan."],
  ["pihak-ketiga", "Pembagian Data kepada Pihak Ketiga", "Data hanya dibagikan jika dibutuhkan untuk operasional layanan, pemenuhan hukum, atau integrasi pengiriman dan pembayaran yang relevan."],
  ["hak", "Hak Pengguna", "Pengguna dapat memperbarui informasi akun, mengelola preferensi notifikasi, dan meminta bantuan terkait data melalui pusat bantuan."],
  ["perubahan", "Perubahan Kebijakan Privasi", "Kebijakan privasi dapat diperbarui sesuai perkembangan fitur, teknologi, dan ketentuan yang berlaku."],
  ["kontak", "Kontak", "Pertanyaan privasi dapat dikirim ke privacy@dinomarket.vitolab.dev."],
].map(([id, title, content]) => ({ id, title, content }));

const Privacy = () => (
  <LegalPage
    title="Kebijakan Privasi"
    description="Cara DinoMarket mengumpulkan, menggunakan, menyimpan, dan melindungi data pengguna."
    sections={sections}
  />
);

export default Privacy;
