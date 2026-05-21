# Leak Radar Financial Management

Prototipe aplikasi Nuxt 4 untuk menemukan kebocoran finansial berulang: langganan tidak terpakai, biaya tersembunyi, dan uji coba yang berubah menjadi tagihan.

## Fitur Saat Ini

- Dasbor dengan menu fitur terpisah
- Ringkasan kebocoran, metrik utama, dan peringatan prioritas yang dapat diklik
- Radar interaktif dengan tooltip dan popup detail kebocoran
- Manajer langganan dengan tambah, ubah, hapus, dan penyimpanan lokal
- Pelacakan keuangan bulanan untuk pemasukan, pengeluaran, target tabungan, dan dampak kebocoran
- Pencari biaya tersembunyi dengan status perbaikan
- Penjaga uji coba untuk menandai trial agar masuk pantauan
- Sakelar Batal untuk memproses pembatalan massal dari antrean
- Reset Data untuk menghapus state lokal dan mulai dari data kosong

## Pengembangan

Proyek ini menggunakan Nuxt 4. Utility Tailwind aktif melalui runtime Tailwind browser di `nuxt.config.ts`.
Data prototipe tidak memakai impor file dan tidak membawa data awal. State CRUD tersimpan di `localStorage` dari `app/app.vue`.
Jika data lokal membuat tampilan tidak sesuai saat pengujian, gunakan tombol **Reset Data** di sidebar/header untuk menghapus state `localStorage` dan memulai ulang CRUD dari data kosong.
Mata uang menggunakan Rupiah Indonesia.
Headless UI digunakan untuk kontrol interaktif seperti pilihan kategori, dialog, dan switch penjaga uji coba.

Jalankan lokal:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Video E2E

Playwright dipakai untuk membuat video uji penggunaan aplikasi dari data kosong sampai data finansial nyata tersimpan.

```bash
npm install
npm run playwright:install
npm run e2e:video
```

Video hasil test tersimpan di `test-results/e2e-video`. Buka laporan visual dengan:

```bash
npm run e2e:report
```
