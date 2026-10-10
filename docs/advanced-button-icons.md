# Advanced Button — Daftar Icon

> Dokumentasi lengkap icon preset yang tersedia untuk block **Advanced Button**
> (`gravisain/advanced-button`) pada plugin **Gravisain Blocks**.

## Ringkasan

Block **Advanced Button** menyediakan **62 icon preset** yang dapat dipilih melalui
**Icon Picker** di panel inspector (tab **Layout**). Seluruh icon didefinisikan pada
objek `ICONS` di file:

- **Sumber:** `src/controls/icons.js`
- **Komponen Picker:** `src/controls/IconPickerControl.js`
- **Digunakan di:** `src/blocks/advanced-button/components/ButtonInspector.js`
- **Rendering:** `src/blocks/advanced-button/edit.js` (via `getIconMarkup( icon )`)

Semua icon UI menggunakan bahasa desain **Lucide** (grid 24×24, `stroke-width="2"`,
ujung garis membulat) agar terlihat lebih tegas & modern. Logo brand (GitHub, X,
Facebook, Instagram, LinkedIn, YouTube) menggunakan **Simple Icons** (`fill` solid).
Semua menggunakan `currentColor`, sehingga warna icon otomatis mengikuti warna teks tombol.

### Cara Kerja Picker (3 Tab)

Icon pada Advanced Button dapat diisi melalui **3 cara** yang tersedia di satu
kontrol **Icon Picker** yang sama:

| Tab    | Cara Input                          | Nilai tersimpan di atribut `icon`              |
|--------|-------------------------------------|-----------------------------------------------|
| ICON   | Pilih dari preset (grid + pencarian) | Key string, mis. `arrowRight`                |
| SVG    | Tempel kode SVG mentah              | String SVG, mis. `<svg ...>...</svg>`        |
| IMAGE  | Upload / pilih dari Media Library   | URL gambar (`https://`, `/`, `data:image`)   |

---

## Daftar Icon Preset

Berikut daftar lengkap **key** (nilai atribut `icon`), dikelompokkan berdasarkan
kegunaannya.

### 1. Navigasi & Arah
| Key | Nama / Fungsi |
|-----|---------------|
| `arrowRight` | Panah ke kanan |
| `arrowLeft` | Panah ke kiri |
| `arrowUpRight` | Panah diagonal kanan-atas |
| `chevronRight` | Chevron ke kanan |
| `chevronDown` | Chevron ke bawah |

### 2. Aksi & Status
| Key | Nama / Fungsi |
|-----|---------------|
| `check` | Centang |
| `checkCircle` | Centang dalam lingkaran |
| `checkBadge` | Lencana centang (terverifikasi) |
| `xMark` | Silang / tutup |
| `plus` | Tambah |

### 3. Promosi & Sosial
| Key | Nama / Fungsi |
|-----|---------------|
| `sparkles` | Kilau / AI / baru |
| `bolt` | Petir / cepat / power |
| `shieldCheck` | Perisai aman / terpercaya |
| `trophy` | Piala / prestasi |

### 4. E-commerce
| Key | Nama / Fungsi |
|-----|---------------|
| `shoppingCart` | Keranjang belanja |
| `bag` | Tas belanja |

### 5. Komunikasi
| Key | Nama / Fungsi |
|-----|---------------|
| `envelope` | Amplop / email |
| `phone` | Telepon |

### 6. Media
| Key | Nama / Fungsi |
|-----|---------------|
| `play` | Tombol play |
| `download` | Unduh |

### 7. Konten
| Key | Nama / Fungsi |
|-----|---------------|
| `document` | Dokumen / file |
| `link` | Tautan |
| `externalLink` | Tautan eksternal |

### 8. Pengguna & Jadwal
| Key | Nama / Fungsi |
|-----|---------------|
| `user` | Pengguna tunggal |
| `users` | Beberapa pengguna |
| `calendar` | Kalender / jadwal |
| `bell` | Notifikasi / lonceng |

### 9. Lainnya
| Key | Nama / Fungsi |
|-----|---------------|
| `star` | Bintang / rating |
| `heart` | Hati / suka |

### 10. Navigasi Tambahan
| Key | Nama / Fungsi |
|-----|---------------|
| `arrowUp` | Panah ke atas |
| `arrowDown` | Panah ke bawah |
| `chevronUp` | Chevron ke atas |
| `chevronLeft` | Chevron ke kiri |

### 11. Aksi Tambahan
| Key | Nama / Fungsi |
|-----|---------------|
| `send` | Kirim |
| `share2` | Bagikan |
| `search` | Cari |
| `menu` | Menu / hamburger |
| `copy` | Salin |
| `pencil` | Edit / tulis |
| `trash2` | Hapus |

### 12. Umum & Antarmuka
| Key | Nama / Fungsi |
|-----|---------------|
| `home` | Beranda |
| `settings` | Pengaturan / gear |
| `info` | Informasi |
| `alertTriangle` | Peringatan |
| `clock` | Waktu / jam |
| `mapPin` | Lokasi / pin |
| `globe` | Global / dunia |
| `lock` | Kunci / privat |
| `eye` | Lihat / pratinjau |

### 13. E-commerce & Konten Tambahan
| Key | Nama / Fungsi |
|-----|---------------|
| `creditCard` | Kartu kredit / pembayaran |
| `gift` | Hadiah / promo |
| `tag` | Label / harga |
| `bookmark` | Simpan / bookmark |

### 14. Media Sosial (Logo Brand)
> Logo brand ini menggunakan **Simple Icons** (format *solid fill*, mengikuti bentuk
> logo resmi) sehingga warnanya mengikuti `currentColor` tombol.

| Key | Nama / Fungsi |
|-----|---------------|
| `github` | Logo GitHub |
| `twitter` | Logo X (Twitter) |
| `facebook` | Logo Facebook |
| `instagram` | Logo Instagram |
| `linkedin` | Logo LinkedIn |
| `youtube` | Logo YouTube |

---

## Icon Device Preview (Teknis)

Tiga key berikut ikut berada di dalam objek `ICONS`, sehingga **secara teknis juga
muncul** di Icon Picker. Namun key ini adalah ikon *preview device* yang dipakai
untuk kontrol responsivitas — **tidak dirancang** untuk dipakai sebagai icon tombol:

| Key | Keterangan |
|-----|------------|
| `desktop` | Ikon perangkat desktop |
| `tablet` | Ikon perangkat tablet |
| `mobile` | Ikon perangkat mobile |

> **Catatan:** Jika diperlukan, ketiga key ini dapat dipisahkan agar tidak tampil
> di Icon Picker Advanced Button.

---

## Catatan Tambahan

1. **Icon Umum vs Device:** 59 icon (kategori 1–14) direkomendasikan untuk tombol;
   3 icon device (`desktop`, `tablet`, `mobile`) bersifat teknis.
2. **Warna Otomatis:** Icon UI memakai `stroke="currentColor"` dan logo brand memakai
   `fill="currentColor"`, jadi warna mengikuti `textColor` tombol pada keadaan normal
   dan `hoverTextColor` saat hover.
3. **Custom Icon (Premium):** File `icons.js` juga menggabungkan icon dari
   `window.gravisainCustomIcons` (Gravisain Studio Premium) bila tersedia
   (lihat bagian `// Merge custom icons`), sehingga daftar preset dapat bertambah dinamis.
4. **Posisi Icon:** Setelah memilih icon, posisinya diatur lewat atribut
   `iconPosition` (`left` | `right`) beserta jarak via atribut `iconSpacing`.
5. **Fallback:** Bila nilai `icon` tidak dikenali, `getIconMarkup()` akan
   menampilkan icon default `check`.
6. **Lisensi:** Icon UI dari **Lucide** (ISC License); logo brand dari
   **Simple Icons** (CC0 1.0).
