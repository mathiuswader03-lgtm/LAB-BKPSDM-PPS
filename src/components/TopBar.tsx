import React from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Box, Layers } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface TopBarProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  view3DMode: '3d-deck' | 'flat' | 'isometric';
  onToggle3DMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTaskModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
  isFullscreen,
  onToggleFullscreen,
  view3DMode,
  onToggle3DMode,
  soundEnabled,
  onToggleSound,
  onOpenTaskModal,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            soundFX.clickPop();
            onNavigate(0);
          }}
          className="text-base font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm">
            X
          </div>
          <span>BKPSDM Papua Selatan 2026</span>
        </a>
      </div>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => {
            soundFX.clickPop();
            onNavigate(0);
          }}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
            currentSlide === 0 ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Pengantar Modul
        </button>
        <button
          onClick={() => {
            soundFX.clickPop();
            onNavigate(2);
          }}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
            currentSlide >= 2 && currentSlide <= 4 ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Anatomi & Formula
        </button>
        <button
          onClick={() => {
            soundFX.clickPop();
            onNavigate(6);
          }}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
            currentSlide >= 6 && currentSlide <= 8 ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Logika & Lookup
        </button>
        <button
          onClick={() => {
            soundFX.clickPop();
            onNavigate(9);
          }}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-400 ${
            currentSlide === 9 ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Visualisasi Grafik 3D
        </button>
        <button
          onClick={() => {
            soundFX.clickPop();
            onOpenTaskModal();
          }}
          className="transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 text-amber-300/90 font-medium"
        >
          Bank Soal Tugas 1–10
        </button>
      </nav>

      {/* Zone 3: 1 primary action + subtle utility controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Sound toggle */}
        <button
          onClick={() => {
            onToggleSound();
            soundFX.clickPop();
          }}
          title={soundEnabled ? 'Matikan Suara FX' : 'Aktifkan Suara FX'}
          className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/80 transition-colors"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* 3D view toggle */}
        <button
          onClick={() => {
            onToggle3DMode();
            soundFX.modeToggle();
          }}
          title={`Sudut Pandang: ${view3DMode === '3d-deck' ? '3D Stage Perspektif' : view3DMode === 'isometric' ? 'Isometrik 3D' : 'Datar 2D'}`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
        >
          {view3DMode === '3d-deck' ? (
            <Box className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Layers className="w-3.5 h-3.5 text-sky-400" />
          )}
          <span className="hidden sm:inline">Perspektif 3D</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={() => {
            onToggleFullscreen();
            soundFX.clickPop();
          }}
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
          className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/80 transition-colors"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        {/* Primary CTA button */}
        <button
          onClick={() => {
            soundFX.clickPop();
            onOpenTaskModal();
          }}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg hover:from-emerald-300 hover:to-teal-300 shadow-sm transition-all whitespace-nowrap shrink-0"
        >
          Laboratorium Mandiri
        </button>
      </div>
    </header>
  );
};
