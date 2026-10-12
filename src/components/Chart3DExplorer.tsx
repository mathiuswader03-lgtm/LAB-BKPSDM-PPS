import React, { useState } from 'react';
import { BarChart3, PieChart, RefreshCw, Eye } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const Chart3DExplorer: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Data from page 10 and Tugas 8 (Daftar Pengunjung Champ Karaoke & Pendapatan)
  const karaokeData = [
    { label: 'VIP-02 (Ratu)', visitors: 28, revenue: 4200000, color: 'from-emerald-500 to-teal-600', hex: '#10b981' },
    { label: 'EXC-02 (Exec II)', visitors: 35, revenue: 3850000, color: 'from-cyan-500 to-blue-600', hex: '#06b6d4' },
    { label: 'VIP-01 (Raja)', visitors: 19, revenue: 2850000, color: 'from-amber-500 to-orange-600', hex: '#f59e0b' },
    { label: 'EXC-01 (Exec I)', visitors: 42, revenue: 4200000, color: 'from-violet-500 to-purple-600', hex: '#8b5cf6' },
    { label: 'VIP-03 (Mahkota)', visitors: 16, revenue: 1760000, color: 'from-rose-500 to-pink-600', hex: '#f43f5e' },
  ];

  const totalVisitors = karaokeData.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalRevenue = karaokeData.reduce((acc, curr) => acc + curr.revenue, 0);
  const maxVisitors = Math.max(...karaokeData.map((d) => d.visitors));

  return (
    <div className="space-y-4">
      {/* Top Toggle Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.clickPop();
              setChartType('bar');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              chartType === 'bar'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Grafik Kolom 3D (Volume Sewa)
          </button>
          <button
            onClick={() => {
              soundFX.clickPop();
              setChartType('pie');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              chartType === 'pie'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <PieChart className="w-4 h-4" />
            Grafik Lingkaran / Pie (Proporsi Omzet)
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          Data Kasus: Champ Karaoke (Halaman 10 Modul BKPSDM)
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 shadow-xl relative min-h-[290px] flex flex-col justify-end">
        {chartType === 'bar' ? (
          /* 3D Isometric Bar Chart View */
          <div className="w-full">
            <div className="flex items-end justify-between gap-4 h-52 pt-8 px-4 border-b border-slate-800">
              {karaokeData.map((item, idx) => {
                const heightPercent = Math.round((item.visitors / maxVisitors) * 100);
                const isSelected = selectedItem === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      soundFX.clickPop();
                      setSelectedItem(isSelected ? null : idx);
                    }}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Floating Label */}
                    <span
                      className={`text-[10px] font-mono mb-1 transition-all ${
                        isSelected ? 'text-emerald-300 font-bold scale-110' : 'text-slate-400 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {item.visitors} Jam
                    </span>

                    {/* 3D Bar representation */}
                    <div className="w-full max-w-[56px] relative perspective-1000">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg bg-gradient-to-t ${item.color} shadow-lg transition-all duration-300 relative group-hover:brightness-110 ${
                          isSelected ? 'ring-2 ring-white scale-105' : ''
                        }`}
                      >
                        {/* 3D top surface highlight */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 rounded-t-lg"></div>
                      </div>
                    </div>

                    {/* X-axis label */}
                    <span className="text-[10px] font-medium text-slate-300 mt-2 text-center truncate max-w-full">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 px-2">
              <span>Sumbu Horisontal: Kategori Kelas & Tipe Kamar</span>
              <span className="font-mono text-emerald-400">Total Jam Tersewa: {totalVisitors} Jam</span>
            </div>
          </div>
        ) : (
          /* Pie Proportion View */
          <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6 py-4">
            {/* SVG Pie Chart */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {karaokeData.map((item, idx) => {
                  let accumulated = 0;
                  for (let i = 0; i < idx; i++) {
                    accumulated += karaokeData[i].revenue;
                  }
                  const startPct = (accumulated / totalRevenue) * 100;
                  const itemPct = (item.revenue / totalRevenue) * 100;
                  const strokeDasharray = `${itemPct} ${100 - itemPct}`;
                  const strokeDashoffset = -startPct;

                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke={item.hex}
                      strokeWidth={selectedItem === idx ? '18' : '15'}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      onClick={() => {
                        soundFX.clickPop();
                        setSelectedItem(selectedItem === idx ? null : idx);
                      }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-slate-400 font-mono">Total Omzet</span>
                <span className="text-xs font-bold text-white font-mono">Rp 16,86 Juta</span>
              </div>
            </div>

            {/* Legend & Details */}
            <div className="space-y-2 text-xs">
              {karaokeData.map((item, idx) => {
                const pct = Math.round((item.revenue / totalRevenue) * 100);
                const isSelected = selectedItem === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      soundFX.clickPop();
                      setSelectedItem(isSelected ? null : idx);
                    }}
                    className={`flex items-center justify-between gap-6 p-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800 text-white font-bold ring-1 ring-emerald-400'
                        : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.hex }}></span>
                      <span>{item.label}</span>
                    </div>
                    <div className="font-mono text-right">
                      <span className="text-white">Rp {item.revenue.toLocaleString('id-ID')}</span>
                      <span className="text-slate-400 text-[10px] ml-2">({pct}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Data Inspection */}
      {selectedItem !== null && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">
              Rincian Terpilih: <strong className="text-white">{karaokeData[selectedItem].label}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Volume: <strong className="text-cyan-400">{karaokeData[selectedItem].visitors} Jam</strong></span>
            <span>Nilai: <strong className="text-emerald-400">Rp {karaokeData[selectedItem].revenue.toLocaleString('id-ID')}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
