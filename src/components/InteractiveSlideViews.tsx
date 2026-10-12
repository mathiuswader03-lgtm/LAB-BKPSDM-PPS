import React, { useState } from 'react';
import {
  CheckCircle2,
  MousePointer,
  Move,
  Maximize2,
  Plus,
  ArrowRight,
  Sparkles,
  Search,
  Lock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { INSTRUCTORS } from '../data/slidesData';
import { soundFX } from '../utils/audio';

// 1. Team & Cover Showcase
export const TeamShowcase: React.FC<{ isCover?: boolean }> = ({ isCover = false }) => {
  return (
    <div className="w-full space-y-5">
      {isCover && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-slate-900/60 p-5 rounded-xl border border-slate-800">
          <div className="md:col-span-4 flex flex-col items-center justify-center p-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <img
                src="/src/assets/images/papua_selatan_crest_1791780333182.jpg"
                alt="Lambang Provinsi Papua Selatan - Maju Negeriku"
                className="relative w-36 h-36 object-contain rounded-full border-2 border-emerald-500/40 shadow-xl bg-slate-950 p-1"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Motto: Maju Negeriku
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">Provinsi Papua Selatan @2026</p>
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Laboratorium Komputer BKPSDM Papua Selatan
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Akselerasi Literasi Digital Aparatur Sipil Negara
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Program pembinaan dan sertifikasi kompetensi spreadsheet Microsoft Excel 2016 bagi ASN Orang Asli Papua (OAP) guna mewujudkan pengelolaan data administrasi daerah yang cepat, akurat, dan transparan.
            </p>
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <span className="block text-base font-bold text-emerald-400 font-mono">16.384</span>
                <span className="text-[10px] text-slate-400">Total Kolom (A–XFD)</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <span className="block text-base font-bold text-cyan-400 font-mono">1.048.576</span>
                <span className="text-[10px] text-slate-400">Total Baris Sel</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <span className="block text-base font-bold text-amber-400 font-mono">10 Tugas</span>
                <span className="text-[10px] text-slate-400">Studi Kasus Nyata</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of instructors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Daftar Instruktur & Tim Teknis BKPSDM Papua Selatan
          </h4>
          <span className="text-[11px] text-emerald-400 font-mono">6 Tenaga Pengajar Tersertifikasi</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INSTRUCTORS.map((ins) => (
            <div
              key={ins.no}
              className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800/90 hover:border-emerald-500/40 transition-all hover:translate-y-[-2px] group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
                  {ins.avatarSeed}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-bold text-slate-100 truncate group-hover:text-emerald-400 transition-colors">
                      {ins.name}
                    </h5>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0">#{ins.no}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                    <span className="text-amber-400/90 font-medium">{ins.role}</span>
                    <span>·</span>
                    <span>{ins.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {ins.expertise}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Anatomy of Excel Window Inspector
export const AnatomyInspector: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<number>(3); // Default Formula Bar

  const parts = [
    {
      id: 1,
      name: 'Title Bar',
      coords: 'Bagian Paling Atas',
      desc: 'Baris judul yang menampilkan nama file kerja (Workbook). Diatur saat pertama kali melakukan Save As pada komputer.',
      shortcut: 'Alt + F4 untuk keluar',
      visual: 'Book1 - Microsoft Excel',
    },
    {
      id: 2,
      name: 'Menu Bar & Ribbon',
      coords: 'Tepat di bawah Title Bar',
      desc: 'Pusat komando yang memuat tab (File, Home, Insert, Page Layout, Formulas, Data, Review, View) serta ribbon ikon fungsi terkelompok.',
      shortcut: 'Ctrl + F1 (Tampilkan/Sembunyikan Ribbon)',
      visual: 'Home · Insert · Page Layout · Formulas · Data',
    },
    {
      id: 3,
      name: 'Name Box (Kotak Nama)',
      coords: 'Kiri atas di atas grid sel',
      desc: 'Menampilkan koordinat sel aktif yang sedang disorot kursor (misal B3 atau G12). Juga dapat dipakai untuk lompat langsung ke alamat sel.',
      shortcut: 'F5 atau Ctrl + G (Go To)',
      visual: 'G12 (Kolom G, Baris 12)',
    },
    {
      id: 4,
      name: 'Formula Bar',
      coords: 'Sebelah kanan Name Box (fx)',
      desc: 'Kotak persegi panjang tempat memasukkan, menyunting, dan meneliti rumus/isi sel aktif secara mendalam.',
      shortcut: 'F2 (Mode Edit Sel Aktif)',
      visual: 'fx =SUM(H10:H19)',
    },
    {
      id: 5,
      name: 'Index Kolom (Column Name)',
      coords: 'Melintang Vertikal ke atas (A s/d XFD)',
      desc: 'Penanda vertikal kisi lembar kerja berupa huruf abjad A, B, C hingga XFD dengan daya tampung total 16.384 kolom.',
      shortcut: 'Ctrl + Panah Kanan (Ke Kolom XFD)',
      visual: 'Kolom A ... XFD (16.384)',
    },
    {
      id: 6,
      name: 'Index Baris (Row Name)',
      coords: 'Melintang Horisontal ke samping (1 s/d 1.048.576)',
      desc: 'Penanda horizontal berupa nomor angka urut dari baris ke-1 hingga baris ke-1.048.576.',
      shortcut: 'Ctrl + Panah Bawah (Ke Baris 1.048.576)',
      visual: 'Baris 1 ... 1.048.576',
    },
    {
      id: 7,
      name: 'Sel Aktif (Active Cell)',
      coords: 'Titik temu Baris & Kolom',
      desc: 'Perpotongan satu kolom dan satu baris yang siap menerima input teks, angka, maupun formula matematika.',
      shortcut: 'Tab (Pindah Kanan), Enter (Pindah Bawah)',
      visual: 'Kotak dengan Border Hijau Tebal',
    },
    {
      id: 8,
      name: 'Status Bar & Zoom View',
      coords: 'Dasar bagian bawah lembar kerja',
      desc: 'Menampilkan status sistem (Ready), kalkulasi kilat (Average, Count, Sum), serta penggeser pembesaran tampilan lembar.',
      shortcut: 'Ctrl + Scroll Mouse (Zoom In/Out)',
      visual: 'READY · SUM: 417.360.000 · 100%',
    },
  ];

  const current = parts.find((p) => p.id === selectedPart) || parts[0];

  return (
    <div className="space-y-4">
      {/* Interactive visual mockup */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 shadow-2xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
          <span className="font-mono text-emerald-400">Jendela Kerja Microsoft Excel 2016</span>
          <span>Klik komponen di bawah untuk simulasi penjelasan detail</span>
        </div>

        {/* Mock window layout */}
        <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden font-sans text-xs">
          {/* Title bar */}
          <button
            onClick={() => {
              soundFX.clickPop();
              setSelectedPart(1);
            }}
            className={`w-full px-3 py-1.5 flex items-center justify-between border-b transition-colors ${
              selectedPart === 1
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[11px]">Book1 - Microsoft Excel 2016 (BKPSDM Papua Selatan)</span>
            </div>
            <span className="text-[10px] text-slate-400">[1. Title Bar]</span>
          </button>

          {/* Ribbon */}
          <button
            onClick={() => {
              soundFX.clickPop();
              setSelectedPart(2);
            }}
            className={`w-full px-3 py-2 flex items-center justify-between border-b transition-colors ${
              selectedPart === 2
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3 text-[11px]">
              <span className="font-bold text-emerald-400">File</span>
              <span className="bg-emerald-600/30 text-emerald-300 px-1.5 py-0.5 rounded">Home</span>
              <span>Insert</span>
              <span>Page Layout</span>
              <span>Formulas</span>
              <span>Data</span>
              <span>Review</span>
              <span>View</span>
            </div>
            <span className="text-[10px] text-slate-400">[2. Ribbon Menu]</span>
          </button>

          {/* Name Box & Formula Bar */}
          <div className="p-2 grid grid-cols-12 gap-2 bg-slate-900/20 border-b border-slate-800">
            <button
              onClick={() => {
                soundFX.clickPop();
                setSelectedPart(3);
              }}
              className={`col-span-3 px-2.5 py-1 rounded text-left font-mono font-bold flex items-center justify-between border transition-colors ${
                selectedPart === 3
                  ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500'
              }`}
            >
              <span>G12</span>
              <span className="text-[9px] text-slate-400 font-sans">[3. Name Box]</span>
            </button>
            <button
              onClick={() => {
                soundFX.clickPop();
                setSelectedPart(4);
              }}
              className={`col-span-9 px-3 py-1 rounded text-left font-mono flex items-center justify-between border transition-colors ${
                selectedPart === 4
                  ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold italic">fx</span>
                <span className="text-emerald-400 font-semibold">=SUM(H10:H19)</span>
              </div>
              <span className="text-[9px] text-slate-400 font-sans">[4. Formula Bar]</span>
            </button>
          </div>

          {/* Grid Preview */}
          <div className="p-2 grid grid-cols-6 gap-1 bg-slate-950 font-mono text-[11px]">
            {/* Headers */}
            <div className="p-1 bg-slate-900 text-slate-400 text-center rounded">#</div>
            {['A', 'B', 'C', 'D', 'E'].map((col) => (
              <button
                key={col}
                onClick={() => {
                  soundFX.clickPop();
                  setSelectedPart(5);
                }}
                className={`p-1 text-center rounded transition-colors font-bold ${
                  selectedPart === 5
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {col}
              </button>
            ))}

            {/* Row 1 */}
            <button
              onClick={() => {
                soundFX.clickPop();
                setSelectedPart(6);
              }}
              className={`p-1 text-center rounded font-bold ${
                selectedPart === 6
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              1
            </button>
            <div className="p-1 bg-slate-900/40 text-slate-300 rounded text-center">No</div>
            <div className="p-1 bg-slate-900/40 text-slate-300 rounded text-center">Nama Barang</div>
            <div className="p-1 bg-slate-900/40 text-slate-300 rounded text-center">Harga</div>
            <div className="p-1 bg-slate-900/40 text-slate-300 rounded text-center">Volume</div>
            <div className="p-1 bg-slate-900/40 text-slate-300 rounded text-center">Subtotal</div>

            {/* Row 2 (Active cell demonstration) */}
            <button
              onClick={() => {
                soundFX.clickPop();
                setSelectedPart(6);
              }}
              className={`p-1 text-center rounded font-bold ${
                selectedPart === 6
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              2
            </button>
            <div className="p-1 bg-slate-900/20 text-slate-400 rounded text-center">1</div>
            <div className="p-1 bg-slate-900/20 text-slate-400 rounded text-center">Keyboard</div>
            <button
              onClick={() => {
                soundFX.clickPop();
                setSelectedPart(7);
              }}
              className={`p-1 rounded text-center font-bold transition-all relative ${
                selectedPart === 7
                  ? 'ring-2 ring-emerald-400 bg-emerald-950 text-emerald-300'
                  : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              Rp320.000
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-400"></span>
            </button>
            <div className="p-1 bg-slate-900/20 text-slate-400 rounded text-center">70 Unit</div>
            <div className="p-1 bg-slate-900/20 text-slate-400 rounded text-center font-bold text-emerald-400">
              Rp268.800.000
            </div>
          </div>

          {/* Status bar */}
          <button
            onClick={() => {
              soundFX.clickPop();
              setSelectedPart(8);
            }}
            className={`w-full px-3 py-1 flex items-center justify-between border-t transition-colors text-[10px] ${
              selectedPart === 8
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-emerald-400">READY</span>
              <span>Sheet1 (Nota Pengiriman)</span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <span>AVERAGE: 15.400.000</span>
              <span>COUNT: 10</span>
              <span className="text-emerald-400 font-bold">SUM: 417.360.000</span>
              <span className="text-slate-400 font-sans">[8. Status Bar]</span>
            </div>
          </button>
        </div>
      </div>

      {/* Detail explanation of selected component */}
      <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
              {current.id}
            </span>
            <h4 className="text-sm font-bold text-white">{current.name}</h4>
          </div>
          <span className="text-xs font-mono text-emerald-400">{current.coords}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
        <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-400">
          <div>
            <span className="text-slate-500">Pintasan Keyboard: </span>
            <span className="font-mono text-amber-300 font-medium">{current.shortcut}</span>
          </div>
          <div>
            <span className="text-slate-500">Representasi: </span>
            <span className="font-mono text-emerald-300">{current.visual}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Pointer Types Showcase
export const PointerShowcase: React.FC = () => {
  const [activePointer, setActivePointer] = useState<number>(0);

  const pointers = [
    {
      id: 0,
      name: 'Pointer Seleksi (Select / Blok)',
      icon: <Plus className="w-6 h-6 stroke-[3]" />,
      shape: 'Plus Putih Tebal',
      purpose: 'Menyorot & Mengeblok Rentang Sel (Range)',
      desc: 'Muncul saat kursor berada di tengah bidang sel. Digunakan untuk menyorot sekelompok sel (misal B2 sampai H2) sebelum dikenakan rumus, warna, atau Merge & Center.',
      hotkey: 'Shift + Tombol Panah untuk memperluas seleksi',
      actionDemo: 'Seleksi Range H10:H19',
    },
    {
      id: 1,
      name: 'Pointer Pemindah (Move Cell)',
      icon: <Move className="w-6 h-6" />,
      shape: 'Panah Empat Arah',
      purpose: 'Memindahkan Seluruh Isi & Format Sel',
      desc: 'Muncul saat kursor mouse menyentuh garis batas tepi terluar sel yang sedang aktif. Klik dan seret untuk memindahkan sel ke posisi lain tanpa merusak relasi formula.',
      hotkey: 'Drag & Drop garis pembatas sel',
      actionDemo: 'Memindahkan Header Nota Pengiriman',
    },
    {
      id: 2,
      name: 'Pointer Pengubah Ukuran (Resize)',
      icon: <Maximize2 className="w-6 h-6" />,
      shape: 'Panah Ganda Hitam (↔ / ↕)',
      purpose: 'Mengubah Lebar Kolom atau Tinggi Baris',
      desc: 'Muncul tepat di garis pembagi antara dua huruf kolom (misal antara F dan G) atau dua nomor baris. Klik-ganda (double click) untuk Autofit ukuran teks otomatis.',
      hotkey: 'Double click di batas kolom untuk AutoFit',
      actionDemo: 'Memperlebar Kolom "Nama Barang"',
    },
    {
      id: 3,
      name: 'Pointer AutoFill / Copy (Fill Handle)',
      icon: <Plus className="w-6 h-6" />,
      shape: 'Tanda Tambah Hitam Ramping ✚',
      purpose: 'Menduplikasi Nilai & Meneruskan Rumus Otomatis',
      desc: 'Muncul saat kursor diletakkan di kotak kecil (titik pojok kanan bawah) sel yang sedang aktif. Tarik ke bawah untuk menerapkan rumus ke seluruh baris di bawahnya seketika.',
      hotkey: 'Double-click Fill Handle untuk salin rumus cepat',
      actionDemo: 'Menerapkan Rumus =E10*F10*12 ke Bawah',
    },
  ];

  const p = pointers[activePointer];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {pointers.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              soundFX.clickPop();
              setActivePointer(idx);
            }}
            className={`p-3 rounded-xl border text-left transition-all ${
              activePointer === idx
                ? 'bg-emerald-950/70 border-emerald-500 shadow-lg text-emerald-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-white">
                {item.icon}
              </div>
              <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
            </div>
            <h5 className="text-xs font-bold truncate text-slate-100">{item.name}</h5>
            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{item.shape}</span>
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              {p.purpose}
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">{p.name}</h4>
          </div>
          <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400">
            {p.actionDemo}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
        <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Tips Efisiensi Praktikum:</span>
          <span className="font-mono text-emerald-400 font-semibold">{p.hotkey}</span>
        </div>
      </div>
    </div>
  );
};

// 4. Interactive Statistics Tester
export const StatsTester: React.FC = () => {
  const [dataValues, setDataValues] = useState<number[]>([320000, 97000, 3200000, 5200000, 4500000, 960000]);
  const [selectedFunc, setSelectedFunc] = useState<string>('SUM');

  const sumVal = dataValues.reduce((a, b) => a + b, 0);
  const avgVal = Math.round(sumVal / dataValues.length);
  const minVal = Math.min(...dataValues);
  const maxVal = Math.max(...dataValues);
  const countVal = dataValues.length;

  const getComputed = () => {
    switch (selectedFunc) {
      case 'SUM':
        return { val: `Rp ${sumVal.toLocaleString('id-ID')}`, code: '=SUM(E10:E15)', note: 'Menjumlahkan 6 komponen harga' };
      case 'AVERAGE':
        return { val: `Rp ${avgVal.toLocaleString('id-ID')}`, code: '=AVERAGE(E10:E15)', note: 'Nilai rata-rata pengadaan barang lab' };
      case 'MIN':
        return { val: `Rp ${minVal.toLocaleString('id-ID')}`, code: '=MIN(E10:E15)', note: 'Harga barang termurah (Mouse)' };
      case 'MAX':
        return { val: `Rp ${maxVal.toLocaleString('id-ID')}`, code: '=MAX(E10:E15)', note: 'Harga barang termahal (Proyektor)' };
      case 'COUNT':
        return { val: `${countVal} Sel`, code: '=COUNT(E10:E15)', note: 'Menghitung kuantitas data bertipe numerik' };
      case 'COUNTIF':
        return { val: '2 Item', code: '=COUNTIF(E10:E15; "> 3000000")', note: 'Barang dengan harga di atas Rp3.000.000' };
      default:
        return { val: `${sumVal}`, code: '=SUM()', note: '' };
    }
  };

  const computed = getComputed();

  return (
    <div className="space-y-4">
      {/* Function Selector */}
      <div className="flex flex-wrap gap-2">
        {['SUM', 'AVERAGE', 'MIN', 'MAX', 'COUNT', 'COUNTIF'].map((fn) => (
          <button
            key={fn}
            onClick={() => {
              soundFX.clickPop();
              setSelectedFunc(fn);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              selectedFunc === fn
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            ={fn}()
          </button>
        ))}
      </div>

      {/* Visual Live Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="md:col-span-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Range Data Sel E10:E15 (Harga pcs)</span>
            <span className="font-mono text-emerald-400">Klik untuk acak angka</span>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {dataValues.map((val, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80 hover:border-emerald-500/40"
              >
                <span className="text-slate-500 text-[11px]">E{10 + idx}</span>
                <span className="text-white font-semibold">Rp {val.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              soundFX.clickPop();
              setDataValues([
                Math.floor(Math.random() * 500000) + 100000,
                Math.floor(Math.random() * 200000) + 50000,
                Math.floor(Math.random() * 4000000) + 1000000,
                Math.floor(Math.random() * 6000000) + 2000000,
                Math.floor(Math.random() * 5000000) + 1000000,
                Math.floor(Math.random() * 1000000) + 500000,
              ]);
            }}
            className="w-full mt-2 py-1.5 text-[11px] font-semibold text-slate-300 bg-slate-800/60 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Simulasikan Data Acak Baru
          </button>
        </div>

        {/* Calculation Result */}
        <div className="md:col-span-6 flex flex-col justify-center p-4 bg-slate-950 rounded-lg border border-emerald-500/30">
          <span className="text-[11px] text-slate-400 font-mono">Rumus Formula Excel:</span>
          <div className="p-2.5 mt-1 bg-slate-900 rounded border border-slate-800 font-mono text-emerald-400 font-bold text-sm">
            {computed.code}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-3">Hasil Evaluasi Otomatis:</span>
          <div className="text-2xl font-black text-white font-mono mt-0.5 tracking-tight">
            {computed.val}
          </div>
          <p className="text-xs text-slate-400 mt-2 border-t border-slate-800/80 pt-2">
            {computed.note}
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. String Extractor (LEFT, MID, RIGHT)
export const StringExtractor: React.FC = () => {
  const [sampleText, setSampleText] = useState<string>('BKPSDM-2026-PAPSEL');
  const [funcType, setFuncType] = useState<'LEFT' | 'MID' | 'RIGHT'>('LEFT');
  const [chars, setChars] = useState<number>(6);
  const [startPos, setStartPos] = useState<number>(8);

  const evaluateString = () => {
    if (funcType === 'LEFT') {
      return {
        formula: `=LEFT("${sampleText}"; ${chars})`,
        result: sampleText.substring(0, chars),
        desc: `Mengambil ${chars} karakter terdepan dari sisi kiri teks.`,
      };
    } else if (funcType === 'RIGHT') {
      return {
        formula: `=RIGHT("${sampleText}"; ${chars})`,
        result: sampleText.substring(Math.max(0, sampleText.length - chars)),
        desc: `Mengambil ${chars} karakter terakhir dari sisi kanan teks.`,
      };
    } else {
      return {
        formula: `=MID("${sampleText}"; ${startPos}; ${chars})`,
        result: sampleText.substring(startPos - 1, startPos - 1 + chars),
        desc: `Mengambil ${chars} karakter mulai dari posisi ke-${startPos}.`,
      };
    }
  };

  const evalRes = evaluateString();

  return (
    <div className="space-y-4">
      {/* Sample presets from the module */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 text-[11px]">Preset Modul:</span>
        {[
          { label: 'Kode Barang Lab (L-002)', val: 'L-002', fn: 'LEFT', c: 1, s: 1 },
          { label: 'Kode Pakaian (B-001)', val: 'B-001', fn: 'LEFT', c: 1, s: 1 },
          { label: 'NIM Mahasiswa (19200781)', val: '19200781', fn: 'LEFT', c: 2, s: 1 },
          { label: 'Sewa Karaoke (VIP-02-AT)', val: 'VIP-02-AT', fn: 'MID', c: 2, s: 5 },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              soundFX.clickPop();
              setSampleText(item.val);
              setFuncType(item.fn as 'LEFT' | 'MID' | 'RIGHT');
              setChars(item.c);
              setStartPos(item.s);
            }}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="md:col-span-6 space-y-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Teks String Sumber (Cell Acuan):</label>
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-sm text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            {(['LEFT', 'MID', 'RIGHT'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  soundFX.clickPop();
                  setFuncType(mode);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  funcType === mode
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                ={mode}()
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Jumlah Karakter (num_chars): {chars}</label>
              <input
                type="range"
                min="1"
                max={Math.max(1, sampleText.length)}
                value={chars}
                onChange={(e) => setChars(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
            {funcType === 'MID' && (
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mulai Posisi (start_num): {startPos}</label>
                <input
                  type="range"
                  min="1"
                  max={Math.max(1, sampleText.length)}
                  value={startPos}
                  onChange={(e) => setStartPos(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="md:col-span-6 flex flex-col justify-center p-4 bg-slate-950 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono">Formula yang Dihasilkan:</span>
          <div className="p-2.5 mt-1 bg-slate-900 rounded border border-slate-800 font-mono text-emerald-400 font-bold text-sm">
            {evalRes.formula}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-3">Hasil Teks String:</span>
          <div className="text-3xl font-black text-amber-400 font-mono mt-1">
            "{evalRes.result}"
          </div>
          <p className="text-xs text-slate-400 mt-2 border-t border-slate-800/80 pt-2">
            {evalRes.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

// 6. IF Logic Flow
export const IfLogicFlow: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string>('T');

  const conditions = [
    { code: 'T', result: 'Training', desc: 'Seragam Training Olahraga Khusus ASN' },
    { code: 'B', result: 'Pakaian Batik', desc: 'Batik Motif Khas Papua Selatan' },
    { code: 'K', result: 'Kheki', desc: 'Seragam Dinas Harian (PDH) Kheki' },
    { code: 'O', result: 'Pakaian Olahraga', desc: 'Pakaian Bebas Olahraga Santai' },
  ];

  const active = conditions.find((c) => c.code === selectedCode) || conditions[0];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Simulasi Rumus IF Majemuk Bersarang (Nested IF)
          </h4>
          <span className="text-xs font-mono text-emerald-400">4 Kondisi = 3 Fungsi IF</span>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-emerald-500/30 font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre">
          <span className="text-slate-400">=IF(</span>
          <span className={selectedCode === 'T' ? 'text-amber-400 font-bold underline' : 'text-slate-300'}>
            D28="T"; "Training";
          </span>{' '}
          <span className="text-slate-400">IF(</span>
          <span className={selectedCode === 'B' ? 'text-amber-400 font-bold underline' : 'text-slate-300'}>
            D28="B"; "Batik";
          </span>{' '}
          <span className="text-slate-400">IF(</span>
          <span className={selectedCode === 'K' ? 'text-amber-400 font-bold underline' : 'text-slate-300'}>
            D28="K"; "Kheki";
          </span>{' '}
          <span className={selectedCode === 'O' ? 'text-amber-400 font-bold underline' : 'text-emerald-400 font-bold'}>
            "Olahraga"
          </span>
          <span className="text-slate-400">)))</span>
        </div>

        {/* Buttons to test each code */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {conditions.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                soundFX.clickPop();
                setSelectedCode(item.code);
              }}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedCode === item.code
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between font-mono mb-1">
                <span className="text-xs font-bold">Kode: "{item.code}"</span>
                {selectedCode === item.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-semibold text-white">{item.result}</div>
            </button>
          ))}
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Evaluasi Sel D28 = </span>
            <span className="font-mono text-amber-400 font-bold">"{selectedCode}"</span>
            <span className="text-slate-400"> → Menghasilkan Output: </span>
            <span className="font-mono text-emerald-400 font-bold">"{active.result}"</span>
          </div>
          <span className="text-[11px] text-slate-400">{active.desc}</span>
        </div>
      </div>
    </div>
  );
};

// 7. VLOOKUP Visualizer
export const LookupVisualizer: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('F-001');

  const masterTable = [
    { code: 'F-001', title: 'Laskar Pelangi', price: 37500 },
    { code: 'F-002', title: 'Davinci Code', price: 89000 },
    { code: 'F-003', title: 'Harry Potter', price: 88000 },
    { code: 'F-004', title: 'Lima Serangkai', price: 25000 },
  ];

  const activeRow = masterTable.find((b) => b.code === selectedBook) || masterTable[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Table Transaksi */}
        <div className="md:col-span-5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Tabel Transaksi (Peminjaman / Penjualan)</span>
            <span className="font-mono text-amber-400">Cell B3</span>
          </div>
          <div className="bg-slate-950 rounded-lg border border-slate-800 p-2 font-mono text-xs space-y-1">
            <div className="grid grid-cols-3 text-slate-500 font-bold text-[10px] pb-1 border-b border-slate-800">
              <span>B (Kode)</span>
              <span>C (Judul)</span>
              <span>D (Harga)</span>
            </div>
            {masterTable.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  soundFX.clickPop();
                  setSelectedBook(item.code);
                }}
                className={`w-full grid grid-cols-3 text-left p-1.5 rounded transition-all ${
                  selectedBook === item.code
                    ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <span className="font-bold">{item.code}</span>
                <span className="truncate">{item.code === selectedBook ? item.title : '...'}</span>
                <span className="text-right">
                  {item.code === selectedBook ? `Rp ${item.price.toLocaleString('id-ID')}` : '...'}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">
            Klik salah satu baris di atas untuk melihat bagaimana VLOOKUP mencari data di tabel induk.
          </p>
        </div>

        {/* Master Table Induk ($B$13:$D$17) */}
        <div className="md:col-span-7 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tabel Induk Terkunci Absolut ($B$13:$D$17)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Tekan F4</span>
          </div>

          <div className="bg-slate-950 rounded-lg border border-slate-800 p-2 font-mono text-xs">
            <div className="grid grid-cols-3 text-slate-400 font-bold text-[10px] pb-1.5 border-b border-slate-800">
              <span>Kolom 1: Kode Kunci</span>
              <span>Kolom 2: Judul Novel</span>
              <span className="text-right">Kolom 3: Harga</span>
            </div>
            {masterTable.map((row) => {
              const isMatch = row.code === selectedBook;
              return (
                <div
                  key={row.code}
                  className={`grid grid-cols-3 p-1.5 rounded transition-all ${
                    isMatch
                      ? 'bg-emerald-950 border border-emerald-500 text-white font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  <span className={isMatch ? 'text-amber-400' : ''}>{row.code}</span>
                  <span className={isMatch ? 'text-emerald-300' : ''}>{row.title}</span>
                  <span className={`text-right ${isMatch ? 'text-cyan-300' : ''}`}>
                    Rp {row.price.toLocaleString('id-ID')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Formula Breakdown */}
          <div className="p-3 bg-slate-950 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Formula Judul Novel (Kolom ke-2):</span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                =VLOOKUP(B3; $B$13:$D$17; 2; FALSE)
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">Formula Harga (Kolom ke-3):</span>
              <span className="text-[11px] font-mono text-cyan-400 font-bold">
                =VLOOKUP(B3; $B$13:$D$17; 3; FALSE)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
