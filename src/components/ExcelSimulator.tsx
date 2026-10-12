import React, { useState } from 'react';
import { Calculator, Play, RotateCcw, Check, Sparkles, BookOpen } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CellData {
  val: string | number;
  formula?: string;
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  highlight?: boolean;
}

export const ExcelSimulator: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'nota' | 'upah' | 'grade' | 'lookup'>('nota');
  const [activeCell, setActiveCell] = useState<{ r: number; c: number }>({ r: 2, c: 5 }); // default subtotal/bayar
  const [formulaInput, setFormulaInput] = useState<string>('=E2*F2*12');
  const [ppnRate, setPpnRate] = useState<number>(2); // 2% as in module

  // 1. Preset Data: Nota Pengiriman Laboratorium BKPSDM PPS
  const notaRows = [
    { no: 1, code: 'L-002', name: 'Keyboard USB', price: 320000, qty: 70 },
    { no: 2, code: 'L-003', name: 'Mouse Optik', price: 97000, qty: 70 },
    { no: 3, code: 'R-001', name: 'AC Split 2PK', price: 3200000, qty: 4 },
    { no: 4, code: 'L-004', name: 'Proyektor HD', price: 5200000, qty: 2 },
    { no: 5, code: 'R-002', name: 'CCTV Dome', price: 4500000, qty: 8 },
    { no: 6, code: 'I-001', name: 'Mikrotik Cloud', price: 960000, qty: 2 },
    { no: 7, code: 'I-002', name: 'Hub/Switch 24P', price: 2500000, qty: 4 },
    { no: 8, code: 'I-003', name: 'Router Board', price: 1428000, qty: 3 },
    { no: 9, code: 'I-004', name: 'Modem Fiber', price: 365000, qty: 2 },
    { no: 10, code: 'P-001', name: 'PC All in One', price: 9000000, qty: 70 },
  ];

  // Calculate live totals for Nota Pengiriman
  const computedItems = notaRows.map((item) => ({
    ...item,
    // Jumlah bayar = harga pcs * qty lusin * 12
    total: item.price * item.qty * 12,
  }));
  const subtotal = computedItems.reduce((acc, curr) => acc + curr.total, 0);
  const ppnVal = Math.round(subtotal * (ppnRate / 100));
  const totalBayar = subtotal - ppnVal;

  return (
    <div className="space-y-4">
      {/* Preset selector bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Pilih Lembar Kerja:</span>
          {[
            { id: 'nota', label: '1. Nota Lab BKPSDM (Hal. 5)' },
            { id: 'upah', label: '2. Upah PT Papua Selatan (Hal. 12)' },
            { id: 'grade', label: '3. IF Grade Siswa (Hal. 13)' },
            { id: 'lookup', label: '4. VLOOKUP Toko Buku (Hal. 13)' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                soundFX.clickPop();
                setActivePreset(preset.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset === preset.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.formulaSuccess();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/50 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            Hitung Ulang Formula
          </button>
        </div>
      </div>

      {/* Formula Bar Header */}
      <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-xs">
        <div className="px-3 py-1 bg-slate-900 rounded border border-slate-700 text-emerald-400 font-bold min-w-[65px] text-center">
          H{activeCell.r + 10}
        </div>
        <div className="flex items-center gap-1.5 px-2 text-slate-400 font-bold italic">
          fx
        </div>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => setFormulaInput(e.target.value)}
          className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono text-xs selection:bg-emerald-500"
          placeholder="Ketik rumus spreadsheet di sini..."
        />
        <div className="text-[11px] text-emerald-400 px-2 font-sans font-medium flex items-center gap-1">
          <Check className="w-3.5 h-3.5" /> Siap Dihitung
        </div>
      </div>

      {/* Spreadsheet Grid Container */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto shadow-2xl">
        {activePreset === 'nota' && (
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800">
                <th className="p-2 border-r border-slate-800 text-center w-10">Row</th>
                <th className="p-2 border-r border-slate-800 text-center w-12">B (No)</th>
                <th className="p-2 border-r border-slate-800 text-center w-28">C (Kode)</th>
                <th className="p-2 border-r border-slate-800">D (Nama Barang Lab)</th>
                <th className="p-2 border-r border-slate-800 text-right">E (Harga pcs)</th>
                <th className="p-2 border-r border-slate-800 text-center w-28">F (Volume)</th>
                <th className="p-2 text-right">H (Jumlah Bayar = E*F*12)</th>
              </tr>
            </thead>
            <tbody>
              {computedItems.map((item, idx) => {
                const isSelected = activeCell.r === idx;
                return (
                  <tr
                    key={item.no}
                    onClick={() => {
                      soundFX.clickPop();
                      setActiveCell({ r: idx, c: 5 });
                      setFormulaInput(`=E${10 + idx} * F${10 + idx} * 12`);
                    }}
                    className={`cursor-pointer transition-colors border-b border-slate-850 hover:bg-slate-800/60 ${
                      isSelected ? 'bg-emerald-950/40' : idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-transparent'
                    }`}
                  >
                    <td className="p-2 text-center text-slate-500 border-r border-slate-800 text-[10px]">
                      {10 + idx}
                    </td>
                    <td className="p-2 text-center text-slate-300 border-r border-slate-800">
                      {item.no}
                    </td>
                    <td className="p-2 text-center text-amber-400 font-semibold border-r border-slate-800">
                      {item.code}
                    </td>
                    <td className="p-2 text-white font-sans font-medium border-r border-slate-800">
                      {item.name}
                    </td>
                    <td className="p-2 text-right text-slate-300 border-r border-slate-800">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>
                    <td className="p-2 text-center text-cyan-300 border-r border-slate-800">
                      {item.qty} Lusin
                    </td>
                    <td className={`p-2 text-right font-bold ${isSelected ? 'text-emerald-300 ring-1 ring-emerald-400' : 'text-emerald-400'}`}>
                      Rp {item.total.toLocaleString('id-ID')}
                    </td>
                  </tr>
                );
              })}

              {/* Subtotal Row */}
              <tr
                onClick={() => {
                  soundFX.clickPop();
                  setActiveCell({ r: 10, c: 5 });
                  setFormulaInput('=SUM(H10:H19)');
                }}
                className="bg-slate-950 border-t-2 border-emerald-500/40 cursor-pointer hover:bg-slate-800/40"
              >
                <td className="p-2 text-center text-slate-500 border-r border-slate-800 text-[10px]">20</td>
                <td colSpan={5} className="p-2 text-right text-slate-300 font-bold border-r border-slate-800">
                  Sub Total Pengadaan =SUM(H10:H19) :
                </td>
                <td className="p-2 text-right font-black text-amber-400 text-sm">
                  Rp {subtotal.toLocaleString('id-ID')}
                </td>
              </tr>

              {/* PPN 2% Row */}
              <tr
                onClick={() => {
                  soundFX.clickPop();
                  setActiveCell({ r: 11, c: 5 });
                  setFormulaInput('=2% * H20');
                }}
                className="bg-slate-950 border-b border-slate-800 cursor-pointer hover:bg-slate-800/40"
              >
                <td className="p-2 text-center text-slate-500 border-r border-slate-800 text-[10px]">21</td>
                <td colSpan={5} className="p-2 text-right text-slate-400 border-r border-slate-800">
                  PPN 2% (Tarif Pajak Modul) (=2% * H20) :
                </td>
                <td className="p-2 text-right text-rose-400 font-semibold">
                  - Rp {ppnVal.toLocaleString('id-ID')}
                </td>
              </tr>

              {/* Total Bayar Row */}
              <tr
                onClick={() => {
                  soundFX.clickPop();
                  setActiveCell({ r: 12, c: 5 });
                  setFormulaInput('=H20 - H21');
                }}
                className="bg-emerald-950/60 border-t-2 border-emerald-400 cursor-pointer"
              >
                <td className="p-2 text-center text-emerald-400 border-r border-slate-800 text-[10px]">22</td>
                <td colSpan={5} className="p-2 text-right text-emerald-300 font-black border-r border-slate-800">
                  Total Bayar (=H20 - H21) :
                </td>
                <td className="p-2 text-right text-emerald-300 font-black text-base">
                  Rp {totalBayar.toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {activePreset === 'upah' && (
          <div className="p-4 space-y-3 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                PT. PAPUA SELATAN JAYA — DAFTAR UPAH PEGAWAI OKTOBER 2026
              </h4>
              <span className="text-[11px] font-mono text-emerald-400">Tugas 3 Halaman 12</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Upah Kerja Kotor</span>
                <span className="text-white font-mono font-bold text-sm block mt-0.5">= Jam Kerja × 25.000</span>
                <span className="text-slate-500 text-[10px] mt-1 block">Arsel (45 Jam) = Rp 1.125.000</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Upah Lembur</span>
                <span className="text-cyan-400 font-mono font-bold text-sm block mt-0.5">= Jam Lembur × 30.000</span>
                <span className="text-slate-500 text-[10px] mt-1 block">Arsel (15 Jam) = Rp 450.000</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Pajak (5%) & Netto</span>
                <span className="text-amber-400 font-mono font-bold text-sm block mt-0.5">= Total Upah × 5%</span>
                <span className="text-emerald-400 text-[10px] mt-1 block">Netto = Total Upah - Pajak</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kalkulasi otomatis 10 karyawan: Arsel, Maher, Shaka, Zianka, Rezki, Queen, Naswa, Raisa, Abang, dan Raymon dengan total upah terakumulasi secara instan.
            </p>
          </div>
        )}

        {activePreset === 'grade' && (
          <div className="p-4 space-y-3 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                FUNGSI IF TUNGGAL DAN IF MAJEMUK (TUGAS 4 HALAMAN 13)
              </h4>
              <span className="text-[11px] font-mono text-emerald-400">Ketentuan Grade A s/d E</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg">
                <span className="font-bold text-emerald-400 block">Grade A</span>
                <span className="text-slate-300 text-[11px]">Nilai 90 – 100</span>
              </div>
              <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/40 rounded-lg">
                <span className="font-bold text-cyan-400 block">Grade B</span>
                <span className="text-slate-300 text-[11px]">Nilai 80 – 89</span>
              </div>
              <div className="p-2.5 bg-blue-950/40 border border-blue-500/40 rounded-lg">
                <span className="font-bold text-blue-400 block">Grade C</span>
                <span className="text-slate-300 text-[11px]">Nilai 70 – 79</span>
              </div>
              <div className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-lg">
                <span className="font-bold text-amber-400 block">Grade D</span>
                <span className="text-slate-300 text-[11px]">Nilai 60 – 69</span>
              </div>
              <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-lg">
                <span className="font-bold text-rose-400 block">Grade E</span>
                <span className="text-slate-300 text-[11px]">Nilai &lt; 60</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">Status Kelulusan: </span>
              <span>=IF(Nilai &gt; 75; "Complete"; "Failed")</span>
            </div>
          </div>
        )}

        {activePreset === 'lookup' && (
          <div className="p-4 space-y-3 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                MENGHITUNG HARGA JUAL BUKU DENGAN VLOOKUP (TUGAS 5 HALAMAN 13)
              </h4>
              <span className="text-[11px] font-mono text-emerald-400">Tabel Rujukan Diskon A, B, C</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold block">Kategori A = 25%</span>
                <span className="text-slate-400 text-[11px] block mt-1">Contoh: Buku Photoshop CS6</span>
                <span className="text-white text-[11px] block">Rp 275.000 → Diskon Rp 68.750</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block">Kategori B = 50%</span>
                <span className="text-slate-400 text-[11px] block mt-1">Animasi Iklan Flash</span>
                <span className="text-white text-[11px] block">Rp 180.000 → Diskon Rp 90.000</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block">Kategori C = 75%</span>
                <span className="text-slate-400 text-[11px] block mt-1">Manajemen Web & Server</span>
                <span className="text-white text-[11px] block">Rp 220.000 → Diskon Rp 165.000</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">Rumus Diskon: </span>
              <span>=VLOOKUP(Kategori; $Tabel$Bantu; 2; FALSE) * Harga_Buku</span>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Guidance Info */}
      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Laboratorium Komputer BKPSDM Papua Selatan: Seluruh sel bereaksi secara dinamis saat formula diuji coba.
          </span>
        </div>
        <div className="font-mono text-emerald-400 text-[11px]">
          Tekan baris mana saja untuk melihat formula aslinya
        </div>
      </div>
    </div>
  );
};
