/*
Exercise-Holiday:
Buatlah Sebuah Aplikasi Fullstack "Library Management System" dengan Tech Stack
dan Spesifikasi Sebagai Berikut: 
TECH STACK:
    1. Frontend
        - NextJS as Frontend Framework
        - TailwindCSS as CSS Library
        - React Query with Axios for Network Call
        - React Toastify
    2. Backend
        - ExpressTS as REST API Framework
        - MySQL as Database
        - Prisma as ORM 

SPESIFIKASI: 
    1.  ADMIN
            + Buatlah Akun Admin dengan Memasukan Datanya Langsung ke Database
            + Admin Dapat Login Sesuai dengan Waktu Shift nya. 
              Shit Setiap Admin Akan Selalu Sama di Setiap Harinya
                - Shift-01: 07:00-12:00
                - Shift-02: 13:00-18:00 
            + Admin Dapat Merubah Waktu Shift nya. Perubahan Shift 
              Akan Di ACC Oleh Super-Admin. Untuk ACC di Sisi Super-Admin Tidak Perlu 
              Dibuat UI. Cukup Dari Postman Saja.
            + Admin Dapat Input Buku Baru
            + Admin Dapat Melakukan Update/Delete Buku
            + Admin Dapat Melakukan Registrasi Mahasiswa untuk Menjadi Anggota Perpustakaan
            + Admin Dapat Melakukan Input Peminjaman Buku Mahasiswa
                - Dalam 1x Peminjaman Hanya Dapat Meminjam Maksimum 5 Buku
                - Batas Pengembalian Buku Yaitu 5 Hari Setelah Tanggal Peminjaman Buku 
            + Admin Dapat Melakukan Input Pengembalian Buku Mahasiswa
                - Apabila Ada Keterlambatan, System Akan Otomatis Melakukan Perhitungan
                  Denda Rp. 5000/Hari 

*/