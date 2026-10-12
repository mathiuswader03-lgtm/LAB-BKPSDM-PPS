import React, { useState } from 'react';
import { X, CheckCircle, HelpCircle, Copy, Award, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface TaskItem {
  id: number;
  title: string;
  page: string;
  category: string;
  scenario: string;
  question: string;
  expectedFormula: string[];
  sampleResult: string;
  explanation: string;
  instructorTip: string;
}

const TASKS: TaskItem[] = [
  {
    id: 1,
    title: 'Tugas 1: Soal Aritmatika & Statistik Dasar',
    page: 'Halaman 11',
    category: 'Aritmatika & Statistik',
    scenario: 'Menghitung perkalian sel, pembagian, persentase (A*10%, B*20%, B-(B*20%)) serta total akumulasi.',
    question: 'Tuliskan rumus untuk menghitung Total akumulasi dari sel C3 sampai C16 di kolom A+B!',
    expectedFormula: ['=SUM(C3:C16)', '=SUM(C3:C15)', 'SUM(C3:C16)'],
    sampleResult: 'Akumulasi Total: 1.120',
    explanation: 'Fungsi =SUM(C3:C16) menjumlahkan seluruh hasil pertambahan nilai A dan B dari baris ke-3 sampai baris ke-16.',
    instructorTip: 'Gunakan shortcut Alt + = untuk AutoSum cepat di Excel.',
  },
  {
    id: 2,
    title: 'Tugas 2: Daftar Nilai Ujian Siswa',
    page: 'Halaman 11',
    category: 'Fungsi Statistik Rata-rata',
    scenario: 'Menghitung rata-rata nilai ujian Matematika, Fisika, Kimia, Biologi siswa (Usro, Unyil, Otong, dll).',
    question: 'Tuliskan rumus untuk menghitung nilai Rata-rata siswa Usro (sel C4 sampai F4)!',
    expectedFormula: ['=AVERAGE(C4:F4)', 'AVERAGE(C4:F4)', '=AVERAGE(C4:F4)'],
    sampleResult: 'Rata-rata Usro = 6.875',
    explanation: 'Fungsi =AVERAGE(C4:F4) menghitung rerata nilai Matematika (6.5), Fisika (8.5), Kimia (5.0), dan Biologi (7.5).',
    instructorTip: 'Pastikan tanda titik dua (:) dipakai untuk menyatakan rentang sel berkelanjutan.',
  },
  {
    id: 3,
    title: 'Tugas 3: Daftar Upah Pegawai PT. Papua Selatan Jaya',
    page: 'Halaman 12',
    category: 'Formula Keuangan & Gaji',
    scenario: 'Perhitungan upah kerja kotor (Jam × 25.000) dan upah lembur (Jam × 30.000) untuk 10 pegawai.',
    question: 'Tuliskan rumus untuk menghitung Upah Kerja Kotor pegawai Arsel (Jam Kerja di C10)!',
    expectedFormula: ['=C10*25000', '=C10 * 25000', 'C10*25000', '=C10*25.000'],
    sampleResult: 'Rp 1.125.000 (45 Jam × Rp25.000)',
    explanation: 'Perkalian aritmatika sederhana antara sel jam kerja dengan tarif normal Rp25.000/jam.',
    instructorTip: 'Untuk total upah netto gunakan =Total_Upah - Pajak (di mana Pajak = Total_Upah * 5%).',
  },
  {
    id: 4,
    title: 'Tugas 4: Klasifikasi Grade IF & Status',
    page: 'Halaman 13',
    category: 'Logika Bersyarat IF',
    scenario: 'Mengklasifikasikan Grade A-E dan Status kelulusan mahasiswa berdasarkan nilai ujian.',
    question: 'Tuliskan rumus IF untuk menentukan Status Complete jika Nilai di sel D5 > 75, selain itu Failed!',
    expectedFormula: [
      '=IF(D5>75;"Complete";"Failed")',
      '=IF(D5>75,"Complete","Failed")',
      'IF(D5>75;"Complete";"Failed")',
    ],
    sampleResult: 'Complete (jika nilai > 75) atau Failed (jika <= 75)',
    explanation: 'IF tunggal menguji kondisi nilai lebih dari 75 untuk menentukan sertifikasi kelulusan.',
    instructorTip: 'Gunakan tanda kutip ganda ("") untuk setiap nilai teks di dalam fungsi Excel.',
  },
  {
    id: 5,
    title: 'Tugas 5: Menghitung Harga Jual Buku',
    page: 'Halaman 13',
    category: 'Lookup Vertikal VLOOKUP',
    scenario: 'Mencocokkan Kategori Buku (A=25%, B=50%, C=75%) dari tabel bantu diskon.',
    question: 'Tuliskan rumus VLOOKUP untuk mengambil persentase diskon berdasarkan Kategori di sel C10 dari tabel $F$10:$G$12!',
    expectedFormula: [
      '=VLOOKUP(C10;$F$10:$G$12;2;FALSE)',
      '=VLOOKUP(C10,$F$10:$G$12,2,FALSE)',
      '=VLOOKUP(C10;$F$10:$G$12;2;0)',
    ],
    sampleResult: '25% untuk Kategori A, 50% untuk B, 75% untuk C',
    explanation: 'VLOOKUP mencari nilai kategori di kolom ke-1 tabel bantu dan mengambil angka diskon di kolom ke-2.',
    instructorTip: 'Jangan lupa kunci rentang tabel bantu dengan tanda dollar ($) menggunakan tombol F4.',
  },
  {
    id: 6,
    title: 'Tugas 6: Gaji Pegawai & Pajak Horisontal',
    page: 'Halaman 14',
    category: 'Kombinasi VLOOKUP & HLOOKUP',
    scenario: 'Gaji Pokok & Tunjangan diambil dari tabel vertikal Golongan (1A, 1B, 1C), sedangkan tarif pajak (2%, 3%, 4%) diambil dari tabel horisontal.',
    question: 'Tuliskan rumus HLOOKUP untuk mengambil tarif pajak berdasarkan Golongan di B10 dari tabel horisontal $B$22:$D$23!',
    expectedFormula: [
      '=HLOOKUP(B10;$B$22:$D$23;2;FALSE)',
      '=HLOOKUP(B10,$B$22:$D$23,2,FALSE)',
    ],
    sampleResult: '2% (untuk 1A), 3% (untuk 1B), 4% (untuk 1C)',
    explanation: 'HLOOKUP membaca data dari tabel horisontal pada baris ke-2 yang memuat persentase pajak.',
    instructorTip: 'HLOOKUP membaca per baris (horizontal), sedangkan VLOOKUP membaca per kolom (vertikal).',
  },
  {
    id: 7,
    title: 'Tugas 7: Laporan Nilai Mahasiswa 2026/2027',
    page: 'Halaman 15 - 16',
    category: 'Bobot Persentase & Kombinasi String',
    scenario: 'Menghitung Nilai Akhir dengan bobot 10% Absen, 20% Tugas, 30% UTS, dan 40% UAS.',
    question: 'Tuliskan rumus Nilai Akhir jika Absen di F10, Tugas di G10, UTS di H10, dan UAS di I10!',
    expectedFormula: [
      '=(10%*F10)+(20%*G10)+(30%*H10)+(40%*I10)',
      '=(10%*F10)+(20%*G10)+(30%*H10)+(40%*I10)',
      '=10%*F10+20%*G10+30%*H10+40%*I10',
      '=(0.1*F10)+(0.2*G10)+(0.3*H10)+(0.4*I10)',
    ],
    sampleResult: 'Nilai Akhir = 83.5',
    explanation: 'Perhitungan bobot terstandarisasi akademik sesuai kurikulum pelatihan BKPSDM PPS.',
    instructorTip: 'Jurusan mahasiswa diambil dengan rumus =IF(LEFT(B10;2)="11";"KA";IF(LEFT(B10;2)="12";"MI";"TK")).',
  },
  {
    id: 8,
    title: 'Tugas 8: Rental Champ Karaoke',
    page: 'Halaman 17',
    category: 'Ekstraksi String & Multi-Lookup',
    scenario: 'Membaca kode pemesanan seperti "VIP-02-AT" untuk mengekstrak kode lantai "02" dan tarif per jam.',
    question: 'Tuliskan rumus MID untuk mengambil 2 karakter kode lantai (02) dari kode sewa di sel A10 ("VIP-02-AT")!',
    expectedFormula: [
      '=MID(A10;5;2)',
      '=MID(A10,5,2)',
      'MID(A10;5;2)',
    ],
    sampleResult: '"02" (Lantai 2 - Kamar Ratu)',
    explanation: 'Karakter "02" berada pada posisi ke-5 sebanyak 2 karakter.',
    instructorTip: 'Hasil ekstraksi MID dapat langsung diteruskan sebagai nilai kunci pada fungsi VLOOKUP.',
  },
  {
    id: 9,
    title: 'Tugas 9: Quiz A - Penjualan Barang PT. Papua Selatan Jaya',
    page: 'Halaman 18 - 19',
    category: 'Ujian Mandiri Quiz A',
    scenario: 'Diskon bertingkat jenis tunai: >5 unit dapat 5%, >10 unit dapat 10%, >15 unit dapat 15%, dan bonus jam dinding.',
    question: 'Tuliskan rumus IF untuk Bonus: jika Jenis Bayar di F10 adalah "Tunai" maka dapat "Jam Dinding", selain itu "-"!',
    expectedFormula: [
      '=IF(F10="Tunai";"Jam Dinding";"-")',
      '=IF(F10="Tunai","Jam Dinding","-")',
      '=IF(F10="Tunai";"Jam dinding";"-")',
    ],
    sampleResult: '"Jam Dinding" (jika bayar tunai) atau "-" (kredit)',
    explanation: 'Pengujian logika string teks untuk memberikan apresiasi bonus bagi pembeli tunai.',
    instructorTip: 'Simpan file ujian di folder masing-masing dengan format nama file "Quiz A".',
  },
  {
    id: 10,
    title: 'Tugas 10: Quiz B - Toko Buku Papua Selatan Jaya',
    page: 'Halaman 20 - 21',
    category: 'Ujian Mandiri Quiz B',
    scenario: 'Penggabungan lookup dan teks, diskon beli bertingkat (>5: 5%, >10: 10%, >12: 15%), dan bonus berjenjang.',
    question: 'Tuliskan rumus untuk Bonus Payung jika total harga di H10 > 750000 maka "Payung", jika > 600000 "Kaos", selain itu "Lainnya"!',
    expectedFormula: [
      '=IF(H10>750000;"Payung";IF(H10>600000;"Kaos";"Lainnya"))',
      '=IF(H10>750000,"Payung",IF(H10>600000,"Kaos","Lainnya"))',
    ],
    sampleResult: '"Payung" (jika > Rp750.000) atau "Kaos" (jika > Rp600.000)',
    explanation: 'IF majemuk bertingkat mengevaluasi batas omzet transaksi belanja untuk menentukan suvenir cinderamata.',
    instructorTip: 'Terapkan rumus lookup =VLOOKUP(RIGHT(A10;2);$Tabel_Bantu;2;FALSE) untuk mengambil nama pengarang.',
  },
];

interface TaskSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskSolverModal: React.FC<TaskSolverModalProps> = ({ isOpen, onClose }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number>(1);
  const [userInput, setUserInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const task = TASKS.find((t) => t.id === selectedTaskId) || TASKS[0];

  const handleCheckAnswer = () => {
    const cleanUser = userInput.trim().replace(/\s+/g, '').toLowerCase();
    const matched = task.expectedFormula.some((f) => {
      const cleanExp = f.trim().replace(/\s+/g, '').toLowerCase();
      return cleanUser === cleanExp;
    });

    setIsAnswered(true);
    setIsCorrect(matched);

    if (matched) {
      soundFX.formulaSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#06b6d4'],
      });
    } else {
      soundFX.clickPop();
    }
  };

  const handleSelectTask = (id: number) => {
    soundFX.clickPop();
    setSelectedTaskId(id);
    setUserInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setCopied(false);
  };

  const handleCopyFormula = (f: string) => {
    soundFX.clickPop();
    navigator.clipboard.writeText(f);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Laboratorium Mandiri ASN OAP — Bank Soal Tugas 1 s/d 10
              </h3>
              <p className="text-[11px] text-slate-400">
                BKPSDM Provinsi Papua Selatan @2026 · Uji Pemahaman Formula Spreadsheet
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.clickPop();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left: Task List Drawer */}
          <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/40 p-3 overflow-y-auto space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-2 py-1">
              Daftar Soal Modul Diklat
            </span>
            {TASKS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTask(t.id)}
                className={`w-full p-2.5 rounded-xl text-left transition-all ${
                  selectedTaskId === t.id
                    ? 'bg-emerald-950/80 border border-emerald-500 text-white shadow-sm'
                    : 'hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                  <span className="text-emerald-400 font-bold">TUGAS {t.id}</span>
                  <span className="text-slate-500">{t.page}</span>
                </div>
                <h5 className="text-xs font-semibold truncate text-slate-200">{t.title}</h5>
                <span className="text-[10px] text-slate-500 block truncate">{t.category}</span>
              </button>
            ))}
          </div>

          {/* Right: Active Task Workspace */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-5 bg-slate-900/50">
            {/* Task Info Banner */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  {task.category} · {task.page}
                </span>
                <span className="text-xs font-mono text-slate-500">Soal #{task.id} dari 10</span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{task.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <strong>Studi Kasus:</strong> {task.scenario}
              </p>
            </div>

            {/* Question */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <BookOpen className="w-4 h-4" />
                Pertanyaan Praktek:
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">{task.question}</p>

              {/* Input Formula Field */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] text-slate-400 block">Ketik Rumus Excel Anda di Sini:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => {
                      setUserInput(e.target.value);
                      setIsAnswered(false);
                    }}
                    placeholder={task.expectedFormula[0].substring(0, 5) + '...'}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!userInput.trim()}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-all"
                  >
                    Uji Jawaban
                  </button>
                </div>
              </div>

              {/* Evaluation Feedback */}
              {isAnswered && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                    isCorrect
                      ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/80 border border-rose-500 text-rose-200'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <span className="font-bold block">
                      {isCorrect ? 'Luar Biasa! Jawaban Anda Tepat 100%' : 'Formula Belum Sesuai, Silakan Coba Lagi'}
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {isCorrect ? task.explanation : 'Perhatikan tanda pemisah argumen titik-koma (;) atau koma (,) dan nama koordinat rentang sel.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructor Tip & Solution Reveal */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Kunci Formula Tim Pengajar BKPSDM PPS
                </span>
                <button
                  onClick={() => {
                    soundFX.clickPop();
                    setShowHint(!showHint);
                  }}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {showHint ? 'Sembunyikan Kunci' : 'Tampilkan Kunci Rumus'}
                </button>
              </div>

              {showHint && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-700 font-mono text-xs text-emerald-400">
                    <span>{task.expectedFormula[0]}</span>
                    <button
                      onClick={() => handleCopyFormula(task.expectedFormula[0])}
                      className="p-1 hover:text-white transition-colors"
                      title="Salin ke Clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copied && <span className="text-[10px] text-emerald-400 font-mono">Rumus berhasil disalin!</span>}
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    💡 <strong>Tips Instruktur:</strong> {task.instructorTip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
