export interface Instructor {
  no: number;
  name: string;
  role: string;
  status: string;
  avatarSeed: string;
  expertise: string;
}

export interface SlideData {
  id: number;
  chapter: string;
  badge: string;
  title: string;
  subtitle: string;
  pageReference: string;
  bgGlow: string;
  content: {
    heroText?: string;
    highlights?: string[];
    details?: {
      title: string;
      description: string;
      formula?: string;
      code?: string;
      tag?: string;
    }[];
    tableData?: {
      headers: string[];
      rows: (string | number)[][];
    };
    tips?: string[];
    interactiveType?: 'anatomy' | 'pointers' | 'stats' | 'string' | 'if' | 'lookup' | 'chart' | 'simulator' | 'team';
  };
}

export const INSTRUCTORS: Instructor[] = [
  {
    no: 1,
    name: 'Mathius Wader, S.Kom',
    role: 'Pranata Komputer (Prakom)',
    status: 'Pengajar Utama',
    avatarSeed: 'MW',
    expertise: 'Arsitektur Data & Otomasi Formula Spreadsheet',
  },
  {
    no: 2,
    name: 'Andis Siti Suhartini, S.Pd, M.Pd',
    role: 'Widyaiswara',
    status: 'Pengajar',
    avatarSeed: 'AS',
    expertise: 'Metodologi Pembelajaran & Manajemen ASN OAP',
  },
  {
    no: 3,
    name: 'Delson Alberth Gebze, S.Pd, M.Pd',
    role: 'Widyaiswara',
    status: 'Pengajar',
    expertise: 'Pengembangan Kapasitas & Evaluasi Diklat ASN',
    avatarSeed: 'DG',
  },
  {
    no: 4,
    name: 'Yoga Putra Pratama, S.Kom',
    role: 'Pranata Komputer (Prakom)',
    status: 'Pengajar',
    expertise: 'Pemrograman & Troubleshooting Laboratorium Komputer',
    avatarSeed: 'YP',
  },
  {
    no: 5,
    name: 'Janseb Sulo Sattuan, S.Kom',
    role: 'Pranata Komputer (Prakom)',
    status: 'Pengajar',
    expertise: 'Sistem Informasi Administrasi & Basis Data',
    avatarSeed: 'JS',
  },
  {
    no: 6,
    name: 'Hanif Maulana Usman, S.Tr.IP',
    role: 'Pelaksana',
    status: 'Pengajar',
    expertise: 'Tata Kelola Administrasi & Pelayanan Teknis',
    avatarSeed: 'HU',
  },
];

export const SLIDES: SlideData[] = [
  {
    id: 1,
    chapter: '01. PEMBUKAAN & IDENTITAS MODUL',
    badge: 'BKPSDM PROVINSI PAPUA SELATAN',
    title: 'Modul Pelatihan Komputer ASN OAP 2026',
    subtitle: 'Aplikasi Lembar Kerja Microsoft Excel 2016 Berbasis Kebutuhan Tata Kelola Pemerintahan',
    pageReference: 'Halaman 1',
    bgGlow: 'from-emerald-500/20 via-sky-500/10 to-transparent',
    content: {
      heroText:
        'Peningkatan kompetensi teknologi informasi bagi Aparatur Sipil Negara (ASN) Orang Asli Papua (OAP) di lingkungan Pemerintah Provinsi Papua Selatan menuju birokrasi berdaya saing, transparan, dan modern.',
      highlights: [
        'Instansi Penyelenggara: Badan Kepegawaian & Pengembangan SDM (BKPSDM) Papua Selatan',
        'Motto Pembangunan: "Maju Negeriku" — Merauke, Asmat, Mappi, Boven Digoel',
        'Fasilitas: Laboratorium Komputer BKPSDM Provinsi Papua Selatan Tahun Anggaran 2026',
        'Target Capaian: Penguasaan komputasi data, rumus aritmatika, fungsi statistik, logika kondisional & lookup otomatis',
      ],
      interactiveType: 'team',
    },
  },
  {
    id: 2,
    chapter: '02. TIM PENGAJAR & FASILITATOR',
    badge: 'LABORATORIUM KOMPUTER BKPSDM PPS',
    title: 'Profil Tim Pengajar & Kolaborasi Pengampu',
    subtitle: 'Sinergi Widyaiswara dan Pranata Komputer Ahli untuk Pelatihan ASN Berkualitas',
    pageReference: 'Halaman 1 - 2',
    bgGlow: 'from-amber-500/20 via-emerald-500/10 to-transparent',
    content: {
      heroText:
        'Kolaborasi instruktur berpengalaman yang membimbing aparatur sipil negara dari pengenalan antarmuka dasar hingga pemecahan kasus studi nyata pengelolaan administrasi perkantoran.',
      details: [
        {
          title: 'Mathius Wader, S.Kom (Prakom)',
          description: 'Pengajar teknis formula cerdas, normalisasi data, dan implementasi otomasi perkantoran.',
          tag: 'Instruktur Utama',
        },
        {
          title: 'Andis Siti Suhartini & Delson Alberth Gebze',
          description: 'Widyaiswara penjamin mutu pedagogi dan ketercapaian kompetensi pelatihan aparatur.',
          tag: 'Widyaiswara',
        },
        {
          title: 'Yoga Putra, Janseb Sulo & Hanif Maulana',
          description: 'Pengajar praktikum intensif, pendampingan hands-on laboratorium komputer dan troubleshooting.',
          tag: 'Tim Laboratorium',
        },
      ],
      interactiveType: 'team',
    },
  },
  {
    id: 3,
    chapter: '03. ANATOMI JENDELA KERJA EXCEL 2016',
    badge: 'PENGENALAN WORKBOOK & WORKSHEET',
    title: 'Struktur Kerja & Koordinat Spreadsheet',
    subtitle: 'Navigasi 15 Komponen Utama Antarmuka Microsoft Excel 2016',
    pageReference: 'Halaman 2 - 3',
    bgGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    content: {
      heroText:
        'Microsoft Excel mengolah lembar kerja (spreadsheet) terstruktur yang bekerja menggunakan Workbook (buku kerja) yang di dalamnya menampung Worksheet (lembar sebar) yang tersusun atas jutaan sel koordinat.',
      highlights: [
        'Kapasitas Kolom: 16.384 Kolom melintang vertikal (Huruf A sampai XFD)',
        'Kapasitas Baris: 1.048.576 Baris melintang horizontal (Nomor angka 1 sampai 1.048.576)',
        'Definisi Sel (Cell): Titik perpotongan antara Kolom dan Baris (misal G12 = Kolom G, Baris 12)',
        'Name Box: Menampilkan identitas koordinat sel aktif yang sedang disorot pengguna',
        'Formula Bar: Kotak persegi panjang tempat mengetikkan, mengedit, dan mengevaluasi rumus aktif',
      ],
      details: [
        {
          title: '1. Title Bar',
          description: 'Menunjukkan nama file aktif (Save As). Terletak di pucuk atas jendela aplikasi.',
        },
        {
          title: '2. Menu Bar & Ribbon',
          description: 'Berisi menu utama (File, Home, Insert, Formulas, Data) yang dilengkapi panel ribbon icon.',
        },
        {
          title: '3. Quick Access & Window Controls',
          description: 'Tombol pintas Save, Undo, Redo, Minimize, Maximize, serta Close di pojok kanan atas.',
        },
        {
          title: '4. Status Bar & View Mode',
          description: 'Menampilkan status kalkulasi cepat (Ready, Sum, Count, Average) dan zoom level.',
        },
      ],
      interactiveType: 'anatomy',
    },
  },
  {
    id: 4,
    chapter: '04. BENTUK POINTER & FORMAT SEL',
    badge: 'OPERASI MOUSE & TATA KELOLA TAMPILAN',
    title: '4 Bentuk Pointer Mouse & Format Cell',
    subtitle: 'Teknik Seleksi Presisi, Pemindahan Data, AutoFill, dan Penggabungan Sel',
    pageReference: 'Halaman 4',
    bgGlow: 'from-blue-500/20 via-emerald-500/10 to-transparent',
    content: {
      heroText:
        'Bentuk kursor mouse berubah secara otomatis sesuai posisi di lembar kerja untuk mengeksekusi operasi yang berbeda.',
      details: [
        {
          title: 'Pointer Seleksi (Plus Putih Tebal ➕)',
          description: 'Digunakan untuk menyorot atau mengeblok rentang sel (range) untuk kalkulasi atau format.',
          tag: 'Menyorot Cell',
        },
        {
          title: 'Pointer Pemindah (Panah 4 Arah ✢)',
          description: 'Muncul di garis tepi sel aktif. Digunakan untuk memindahkan seluruh isi dan format sel ke lokasi baru.',
          tag: 'Move Cell',
        },
        {
          title: 'Pointer Pengubah Ukuran (Panah Ganda ↔ ↕)',
          description: 'Muncul di antara batas header kolom atau baris untuk memperlebar atau meninggikan ukuran kisi.',
          tag: 'Resize Kolom/Baris',
        },
        {
          title: 'Pointer Salin & Deret (Plus Hitam Ramping ✚)',
          description: 'Fill Handle di pojok kanan bawah sel aktif. Berfungsi menduplikasi nilai atau meneruskan pola rumus otomatis.',
          tag: 'AutoFill / Copy',
        },
      ],
      tips: [
        'Menggabungkan Sel: Blok rentang sel (misal B2 s/d H2) lalu klik Merge & Center pada grup Alignment Ribbon Home.',
        'Format Cells: Klik kanan pada sel yang disorot → Format Cells (atau tekan Ctrl+1) untuk mengatur Number, Mata Uang Rp, Border, dan Alignment.',
      ],
      interactiveType: 'pointers',
    },
  },
  {
    id: 5,
    chapter: '05. FUNGSI STATISTIK DASAR',
    badge: 'KALKULASI OTOMATIS SPREADSHEET',
    title: '8 Fungsi Statistik Esensial Excel 2016',
    subtitle: 'Sintaks Matematis Standar Kantor Pemerintahan untuk Mengolah Kumpulan Data (Range)',
    pageReference: 'Halaman 5',
    bgGlow: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
    content: {
      heroText:
        'Fungsi statistik digunakan untuk mengolah angka secara otomatis tanpa perlu melakukan penjumlahan manual satu per satu.',
      details: [
        {
          title: '=SUM(Range)',
          description: 'Menjumlahkan seluruh nilai numerik yang terdapat dalam suatu rentang data.',
          formula: '=SUM(H10:H19)',
        },
        {
          title: '=AVERAGE(Range)',
          description: 'Menghitung nilai rata-rata aritmatika dari rentang data numerik terpilih.',
          formula: '=AVERAGE(G10:G19)',
        },
        {
          title: '=MIN(Range) & =MAX(Range)',
          description: 'Mencari dan mencetak nilai minimum (terendah) serta nilai maksimum (tertinggi) pada rentang.',
          formula: '=MIN(H10:H19) / =MAX(H10:H19)',
        },
        {
          title: '=COUNT(Range) vs =COUNTA(Range)',
          description: 'COUNT hanya menghitung sel berisi angka. COUNTA menghitung semua sel nonblank (yang tidak kosong).',
          formula: '=COUNTA(A10:A19)',
        },
        {
          title: '=COUNTIF(Range; Kriteria)',
          description: 'Menghitung banyaknya sel yang memenuhi syarat kriteria tertentu (contoh: hanya yang bernilai "Batik").',
          formula: '=COUNTIF(F10:F19; "B")',
        },
        {
          title: '=SUMIF(Range; Kriteria; [Sum_Range])',
          description: 'Menjumlahkan total angka pada range tertentu yang hanya memenuhi kriteria acuan spesifik.',
          formula: '=SUMIF(F10:F19; "B"; H10:H19)',
        },
      ],
      interactiveType: 'stats',
    },
  },
  {
    id: 6,
    chapter: '06. LATIHAN 1: NOTA PENGIRIMAN LAB',
    badge: 'PRAKTIKUM ARITMATIKA & PPN',
    title: 'Kasus Pengadaan Laboratorium BKPSDM',
    subtitle: 'Menghitung Volume Lusin, Subtotal, Pajak Pertambahan Nilai 2%, dan Total Bayar',
    pageReference: 'Halaman 5 - 6',
    bgGlow: 'from-amber-500/20 via-emerald-500/10 to-transparent',
    content: {
      heroText:
        'Simulasi faktur pengadaan perangkat komputer laboratorium BKPSDM PPS: Keyboard, Mouse, AC, Proyektor, CCTV, Mikrotik, Switch, Router, Modem, PC All in One.',
      details: [
        {
          title: 'a. Jumlah Bayar (Konversi Lusin)',
          description: '1 lusin = 12 pcs. Rumus: Harga (pcs) × Jumlah Pengiriman × 12.',
          formula: '=E10 * F10 * 12',
        },
        {
          title: 'b. Sub Total Seluruh Pengiriman',
          description: 'Menjumlahkan seluruh akumulasi pengeluaran dari sel H10 sampai H19.',
          formula: '=SUM(H10:H19)',
        },
        {
          title: 'c. Nilai PPN Sebesar 2%',
          description: 'Perhitungan tarif pajak dari subtotal yang diperoleh pada sel H20.',
          formula: '=2% * H20',
        },
        {
          title: 'd. Total Bayar Bersih Pengadaan',
          description: 'Didapatkan dari Sub Total dikurangi nilai PPN (atau ditambah sesuai ketentuan akuntansi faktur).',
          formula: '=H20 - H21',
        },
      ],
      tips: [
        'Trik Instruktur: Gunakan teknik klik-tarik sorot range sel H10 s/d H19 untuk meminimalisir kesalahan pengetikan manual.',
      ],
      interactiveType: 'simulator',
    },
  },
  {
    id: 7,
    chapter: '07. MANIPULASI STRING & TEKS',
    badge: 'FUNGSI LEFT · MID · RIGHT',
    title: 'Ekstraksi Karakter Kode Barang Inventaris',
    subtitle: 'Memisahkan Huruf Awalan, Karakter Tengah, dan Akhiran Kode Barang',
    pageReference: 'Halaman 6 - 7',
    bgGlow: 'from-sky-500/20 via-emerald-500/10 to-transparent',
    content: {
      heroText:
        'Dalam sistem inventaris dan kepegawaian, kode barang atau NIP sering kali memuat informasi terselubung yang dapat dipecah dengan 3 fungsi teks standar.',
      details: [
        {
          title: '=LEFT(text; [num_chars])',
          description: 'Mengambil karakter dari posisi paling kiri teks. Contoh: dari kode "L-002", mengambil 1 karakter kiri menghasilkan "L".',
          formula: '=LEFT(C10; 1)',
        },
        {
          title: '=MID(text; start_num; num_chars)',
          description: 'Mengambil karakter dari posisi tengah teks mulai dari nomor indeks tertentu sebanyak n karakter yang diinginkan.',
          formula: '=MID("BKPSDM-2026"; 8; 4) → "2026"',
        },
        {
          title: '=RIGHT(text; [num_chars])',
          description: 'Mengambil karakter dari posisi paling kanan teks sebanyak jumlah karakter yang ditentukan.',
          formula: '=RIGHT(C10; 3) → "002"',
        },
      ],
      tips: [
        'Studi Kasus Latihan 3: Mengisi kolom Jenis Peralatan Lab berdasarkan 1 karakter pertama dari kode barang (L, R, I, P) menggunakan rumus =LEFT(C10; 1).',
      ],
      interactiveType: 'string',
    },
  },
  {
    id: 8,
    chapter: '08. LOGIKA BERSYARAT IF',
    badge: 'IF TUNGGAL & IF MAJEMUK',
    title: 'Percabangan Keputusan Otomatis',
    subtitle: 'Formulasi Logika Penentuan Jenis Pakaian Dinas & Kelulusan ASN',
    pageReference: 'Halaman 8',
    bgGlow: 'from-purple-500/20 via-emerald-500/10 to-transparent',
    content: {
      heroText:
        'Fungsi IF menguji apakah suatu kondisi bernilai BENAR (TRUE) atau SALAH (FALSE), kemudian mengembalikan hasil yang sesuai.',
      details: [
        {
          title: 'IF Tunggal (1 Kondisi, 2 Hasil)',
          description: 'Sintaks: =IF(logical_test; [value_if_true]; [value_if_false]). Contoh pengujian status sertifikasi kelulusan diklat.',
          formula: '=IF(C3="lulus"; "dapat sertifikat"; "tidak dapat sertifikat")',
        },
        {
          title: 'IF Majemuk / Bersarang (Multiple Conditions)',
          description: 'Digunakan saat kondisi lebih dari 2. Kaidah aturan pengajar BKPSDM: Jumlah IF yang dipakai = Jumlah Kondisi - 1.',
          formula: '=IF(D28="T";"Training"; IF(D28="B";"Batik"; IF(D28="K";"Kheki"; "Olahraga")))',
        },
      ],
      highlights: [
        'Kode T → Pakaian Training Olahraga',
        'Kode B → Pakaian Batik Papua',
        'Kode K → Seragam Dinas Kheki',
        'Kode O → Pakaian Olahraga Santai',
      ],
      interactiveType: 'if',
    },
  },
  {
    id: 9,
    chapter: '09. MASTER DATA LOOKUP (VLOOKUP & HLOOKUP)',
    badge: 'RELASI TABEL VERTIKAL & HORIZONTAL',
    title: 'Fungsi Pencarian Data Otomatis',
    subtitle: 'Mengambil Nilai dari Tabel Induk dengan Penguncian Sel Absolut $ (Tombol F4)',
    pageReference: 'Halaman 9 - 10',
    bgGlow: 'from-emerald-500/20 via-sky-500/10 to-transparent',
    content: {
      heroText:
        'VLOOKUP dan HLOOKUP menghubungkan tabel transaksi dengan tabel referensi master tanpa perlu mengetik ulang data satu per satu.',
      details: [
        {
          title: 'VLOOKUP (Vertical Lookup)',
          description: 'Mencari data pada tabel yang tersusun secara vertikal (kolom ke bawah). Mengembalikan nilai pada kolom ke-N.',
          formula: '=VLOOKUP(Nilai_Kunci; Range_Tabel; Index_Kolom; [Range_Lookup])',
        },
        {
          title: 'HLOOKUP (Horizontal Lookup)',
          description: 'Mencari data pada tabel yang tersusun secara horizontal (baris ke samping). Mengembalikan nilai pada baris ke-N.',
          formula: '=HLOOKUP(Nilai_Kunci; Range_Tabel; Index_Baris; [Range_Lookup])',
        },
        {
          title: 'Nilai Kunci (Lookup Value - B3)',
          description: 'Sel acuan yang menjadi kunci pencocokan antara tabel transaksi dengan tabel induk.',
        },
        {
          title: 'Kunci Absolut ($B$13:$D$17)',
          description: 'Wajib mengunci tabel induk dengan menekan tombol F4 (simbol $) agar range tidak bergeser saat formula disalin ke bawah.',
        },
        {
          title: 'Parameter FALSE (Exact Match)',
          description: 'Menjamin pencarian menghasilkan kecocokan tepat (100% persis), cocok untuk data yang tidak terurut.',
        },
      ],
      interactiveType: 'lookup',
    },
  },
  {
    id: 10,
    chapter: '10. VISUALISASI DATA: CHART & GRAFIK 3D',
    badge: 'GRAFIK PIE & COLUMN INTERAKTIF',
    title: 'Penyajian Informasi Grafis Eksekutif',
    subtitle: 'Mengubah Baris Data Menjadi Grafik visual 2D dan 3D Berdaya Tarik Tinggi',
    pageReference: 'Halaman 10',
    bgGlow: 'from-amber-500/20 via-indigo-500/10 to-transparent',
    content: {
      heroText:
        'Grafik membantu pimpinan dan pengambil kebijakan membaca tren data secara instan tanpa tenggelam dalam tabel angka yang padat.',
      highlights: [
        'Langkah Pembuatan: Blok rentang data yang akan divisualisasikan → Buka tab Menu Insert → Pilih jenis Charts yang sesuai',
        'Pie Chart 3D: Sangat efektif menampilkan proporsi persentase pengunjung atau alokasi anggaran belanja',
        'Column & Bar Chart: Ideal membandingkan capaian volume barang atau omzet antar kategori',
        'Studi Kasus: Visualisasi Proporsi Pengunjung Champ Karaoke berdasarkan Kelas Sewa (VIP vs Executive)',
      ],
      interactiveType: 'chart',
    },
  },
  {
    id: 11,
    chapter: '11. STUDI KASUS LABORATORIUM (TUGAS 1 - 5)',
    badge: 'BANK SOAL PRAKTIKUM BAGIAN 1',
    title: 'Evaluasi Kompetensi Mandiri ASN (1 s/d 5)',
    subtitle: 'Rangkaian Lembar Kerja Uji Mandiri: Aritmatika, Nilai Ujian, Daftar Upah, Grade IF, dan Toko Buku',
    pageReference: 'Halaman 11 - 13',
    bgGlow: 'from-emerald-500/20 via-blue-500/10 to-transparent',
    content: {
      details: [
        {
          title: 'Tugas 1: Soal Aritmatika A & B',
          description: 'Operasi perkalian, pembagian, persentase (A*10%, B*20%, B-(B*20%)), SUM, AVERAGE, MAX, MIN, dan COUNT.',
          tag: 'Halaman 11',
        },
        {
          title: 'Tugas 2: Daftar Nilai Ujian Siswa',
          description: 'Menghitung nilai rata-rata tiap siswa (Matematika, Fisika, Kimia, Biologi) serta baris SUM, MIN, MAX kelas.',
          tag: 'Halaman 11',
        },
        {
          title: 'Tugas 3: Daftar Upah Pegawai PT Papua Selatan Jaya',
          description: 'Upah Kerja Kotor (Jam × 25.000) + Upah Lembur (Jam × 30.000), Pajak 5%, dan Upah Netto 10 karyawan.',
          tag: 'Halaman 12',
        },
        {
          title: 'Tugas 4: Klasifikasi Grade IF & Status Kelulusan',
          description: 'Grade A (>=90), B (80-89), C (70-79), D (60-69), E (<60) serta Status Complete (>75) vs Failed (<75).',
          tag: 'Halaman 13',
        },
        {
          title: 'Tugas 5: Menghitung Harga Jual Buku (VLOOKUP)',
          description: 'Mencocokkan Kategori A (25%), B (50%), C (75%) dengan VLOOKUP untuk menentukan diskon dan harga jual.',
          tag: 'Halaman 13',
        },
      ],
      interactiveType: 'simulator',
    },
  },
  {
    id: 12,
    chapter: '12. STUDI KASUS LANJUTAN (TUGAS 6 - 10)',
    badge: 'BANK SOAL PRAKTIKUM BAGIAN 2',
    title: 'Evaluasi Mahir & Ujian Sertifikasi (6 s/d 10)',
    subtitle: 'Penggajian Multi-Golongan, Laporan Semester Mahasiswa, Rental Karaoke, Quiz A & Quiz B',
    pageReference: 'Halaman 14 - 21',
    bgGlow: 'from-purple-500/20 via-emerald-500/10 to-transparent',
    content: {
      details: [
        {
          title: 'Tugas 6: Gaji Pegawai & Pajak Horisontal (1A, 1B, 1C)',
          description: 'Kombinasi VLOOKUP tabel gaji pokok & tunjangan dengan HLOOKUP tarif pajak horisontal (2%, 3%, 4%).',
          tag: 'Halaman 14',
        },
        {
          title: 'Tugas 7: Laporan Nilai Mahasiswa 2026/2027',
          description: 'Ekstraksi 2 digit NIM untuk Jurusan, Lookup Mata Kuliah, Bobot Nilai Akhir (10% Absen, 20% Tugas, 30% UTS, 40% UAS), Grade A-E, dan Resume.',
          tag: 'Halaman 15-16',
        },
        {
          title: 'Tugas 8: Rental Champ Karaoke (VLOOKUP & HLOOKUP)',
          description: 'Membaca kode VIP-02-AT untuk menentukan Kelas Ruangan, Lantai, Harga Sewa per Jam, dan Subtotal.',
          tag: 'Halaman 17',
        },
        {
          title: 'Tugas 9: Quiz A - Tabel Penjualan PT Papua Selatan Jaya',
          description: 'Kombinasi Lookup katalog barang, diskon tunai bertingkat (5%, 10%, 15%), dan bonus jam dinding.',
          tag: 'Halaman 18-19',
        },
        {
          title: 'Tugas 10: Quiz B - Toko Buku Papua Selatan Jaya',
          description: 'Penggabungan fungsi Lookup dan fungsi Text, diskon bertingkat kuantitas, serta jenjang bonus hadiah (Payung, Kaos, Kalender, PIN).',
          tag: 'Halaman 20-21',
        },
      ],
      interactiveType: 'simulator',
    },
  },
];
