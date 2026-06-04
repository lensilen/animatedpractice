Nama: Benita Aryani  
NIM: 2410501023  
Kelas: B

# Cara Menjalankan

1. Buka terminal di folder project.
2. Jalankan perintah:

```bash
npx expo start
```

3. Setelah QR code muncul di terminal, scan menggunakan aplikasi Expo Go di HP.
4. Aplikasi akan terbuka di HP setelah proses loading selesai.

# Jawaban Refleksi

### 1. Kapan sebaiknya menggunakan Animated API vs Reanimated 2?

Animated API sebaiknya digunakan untuk animasi yang sederhana, misalnya membuat tampilan muncul perlahan, bergeser, atau membesar dan mengecil. Menurut saya, Animated API lebih mudah dipakai karena sudah tersedia di React Native dan cocok untuk kebutuhan animasi dasar.

Reanimated 2 lebih cocok digunakan jika animasinya lebih kompleks dan banyak berhubungan dengan gesture, seperti swipe atau drag. Kelebihannya animasi bisa berjalan lebih halus, tetapi cara penggunaannya lebih sulit karena konsepnya lebih banyak dibanding Animated API.

### 2. Mengapa background task di iOS tidak dapat dijamin tepat waktu?

Background task di iOS tidak selalu berjalan tepat waktu karena sistem operasi memiliki aturan sendiri. iOS akan mempertimbangkan kondisi baterai, aktivitas pengguna, koneksi internet, dan kebutuhan sistem sebelum menjalankan task di background.

Akibatnya, aplikasi tidak boleh terlalu bergantung pada jadwal yang sangat tepat. Aplikasi sebaiknya tetap mengambil data terbaru saat dibuka, sehingga pengguna tetap mendapat informasi yang sesuai walaupun background task terlambat berjalan.

### 3. Mengapa server-side validation lebih aman dari client-side validation?

Server-side validation lebih aman karena pengecekan dilakukan di server, bukan hanya di aplikasi pengguna. Jika validasi hanya dilakukan di sisi client, ada kemungkinan pengguna memodifikasi aplikasi atau memalsukan data transaksi.

Dengan validasi di server, bukti pembelian dapat diperiksa langsung ke layanan resmi seperti App Store atau Google Play. Setelah transaksi dinyatakan valid, barulah akses premium atau item pembelian diberikan kepada pengguna.

### 4. Bagaimana lazy loading image dapat meningkatkan performa aplikasi?

Lazy loading image dapat meningkatkan performa karena aplikasi hanya memuat gambar yang sedang dibutuhkan atau sedang terlihat di layar. Dengan begitu, aplikasi tidak perlu memuat semua gambar sekaligus.

Cara ini membantu mengurangi penggunaan memori, menghemat internet, dan membuat tampilan awal aplikasi lebih cepat muncul. Pada aplikasi yang memiliki banyak gambar, lazy loading juga membuat proses scroll terasa lebih ringan.
