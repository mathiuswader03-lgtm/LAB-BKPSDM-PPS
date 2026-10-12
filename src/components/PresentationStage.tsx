import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Grid,
  FileText,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Compass,
  Check,
  Award,
} from 'lucide-react';
import { SLIDES, SlideData } from '../data/slidesData';
import {
  TeamShowcase,
  AnatomyInspector,
  PointerShowcase,
  StatsTester,
  StringExtractor,
  IfLogicFlow,
  LookupVisualizer,
} from './InteractiveSlideViews';
import { ExcelSimulator } from './ExcelSimulator';
import { Chart3DExplorer } from './Chart3DExplorer';
import { soundFX } from '../utils/audio';

interface PresentationStageProps {
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  view3DMode: '3d-deck' | 'flat' | 'isometric';
  onOpenTaskModal: () => void;
}

export const PresentationStage: React.FC<PresentationStageProps> = ({
  currentSlideIndex,
  onSlideChange,
  view3DMode,
  onOpenTaskModal,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [showTrainerNotes, setShowTrainerNotes] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const slide: SlideData = SLIDES[currentSlideIndex] || SLIDES[0];

  // Mouse tilt for real 3D depth perception
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (view3DMode === 'flat') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // tilt angle
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlideIndex < SLIDES.length - 1) {
          soundFX.slideTransition();
          onSlideChange(currentSlideIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlideIndex > 0) {
          soundFX.slideTransition();
          onSlideChange(currentSlideIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, onSlideChange]);

  // Autoplay timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentSlideIndex >= SLIDES.length - 1) {
          setIsPlaying(false);
          onSlideChange(0);
        } else {
          soundFX.slideTransition();
          onSlideChange(currentSlideIndex + 1);
        }
      }, 12000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlideIndex, onSlideChange]);

  const goToPrev = () => {
    if (currentSlideIndex > 0) {
      soundFX.slideTransition();
      onSlideChange(currentSlideIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      soundFX.slideTransition();
      onSlideChange(currentSlideIndex + 1);
    }
  };

  // Render specific interactive component based on slide id
  const renderInteractiveContent = () => {
    switch (slide.id) {
      case 1:
        return <TeamShowcase isCover={true} />;
      case 2:
        return <TeamShowcase isCover={false} />;
      case 3:
        return <AnatomyInspector />;
      case 4:
        return <PointerShowcase />;
      case 5:
        return <StatsTester />;
      case 6:
        return <ExcelSimulator />;
      case 7:
        return <StringExtractor />;
      case 8:
        return <IfLogicFlow />;
      case 9:
        return <LookupVisualizer />;
      case 10:
        return <Chart3DExplorer />;
      case 11:
      case 12:
        return <ExcelSimulator />;
      default:
        return <TeamShowcase />;
    }
  };

  // 3D Transform styles
  const getCardTransform = () => {
    if (view3DMode === 'flat') {
      return 'translateZ(0px) rotateX(0deg) rotateY(0deg)';
    }
    if (view3DMode === 'isometric') {
      return 'rotateX(14deg) rotateY(-10deg) translateZ(10px)';
    }
    return `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(15px)`;
  };

  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between p-4 md:p-6 select-none max-w-7xl mx-auto w-full">
      {/* Slide Navigation Top HUD */}
      <div className="flex items-center justify-between gap-4 mb-3">
        {/* Breadcrumb / Chapter Indicator */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-emerald-400">
            {slide.chapter}
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">·</span>
          <span className="hidden sm:inline text-xs text-slate-300 font-medium">{slide.pageReference}</span>
        </div>

        {/* Slide Counter & Presenter Toggles */}
        <div className="flex items-center gap-2">
          {/* Trainer Notes Toggle */}
          <button
            onClick={() => {
              soundFX.clickPop();
              setShowTrainerNotes(!showTrainerNotes);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showTrainerNotes
                ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catatan Pengajar</span>
          </button>

          {/* Thumbnail Grid Toggle */}
          <button
            onClick={() => {
              soundFX.clickPop();
              setShowThumbnails(!showThumbnails);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Daftar Slide</span>
          </button>

          <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <strong className="text-white">{currentSlideIndex + 1}</strong> / {SLIDES.length}
          </span>
        </div>
      </div>

      {/* 3D Main Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 flex flex-col justify-center perspective-1500"
      >
        <div
          style={{
            transform: getCardTransform(),
            transition: view3DMode === 'flat' ? 'transform 0.3s ease' : 'transform 0.12s ease-out',
          }}
          className="relative w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-5 md:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transform-style-3d overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div
            className={`absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br ${slide.bgGlow} blur-3xl pointer-events-none opacity-60`}
          ></div>

          {/* Slide Header */}
          <div className="relative z-10 mb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                {slide.badge}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                MODUL DIKLAT ASN OAP @2026
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {slide.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              {slide.subtitle}
            </p>
          </div>

          {/* Slide Interactive Body */}
          <div className="relative z-10 min-h-[360px]">{renderInteractiveContent()}</div>

          {/* Trainer Notes Bottom Panel */}
          {showTrainerNotes && (
            <div className="relative z-10 mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 animate-fade-in text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Catatan Pedagogi Tim Pengajar BKPSDM PPS
              </div>
              <p className="text-amber-100/90 leading-relaxed">
                {slide.content.heroText ||
                  'Pastikan seluruh peserta pelatihan ASN Orang Asli Papua mempraktikkan langsung rumus di lembar kerja Excel masing-masing di laboratorium komputer. Bimbingan intensif diberikan per meja praktikum.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Slide Thumbnails Drawer */}
      {showThumbnails && (
        <div className="absolute inset-x-4 bottom-20 z-40 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
            <span className="font-bold text-white">Navigasi Langsung 12 Bab Modul Excel 2016</span>
            <button
              onClick={() => setShowThumbnails(false)}
              className="text-slate-400 hover:text-white"
            >
              Tutup
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-56 overflow-y-auto">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundFX.slideTransition();
                  onSlideChange(idx);
                  setShowThumbnails(false);
                }}
                className={`p-2 rounded-xl text-left border transition-all ${
                  currentSlideIndex === idx
                    ? 'bg-emerald-950 border-emerald-500 text-white font-bold'
                    : 'bg-slate-900/80 border-slate-800/80 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-0.5">
                  <span>#{idx + 1}</span>
                  <span>{s.pageReference}</span>
                </div>
                <h6 className="text-[11px] truncate text-slate-200">{s.title}</h6>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Presenter Toolbar & Controls */}
      <div className="mt-4 flex items-center justify-between gap-4 bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800/80">
        {/* Navigation Previous */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          <button
            onClick={goToNext}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-30 disabled:pointer-events-none transition-colors font-bold"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Autoplay & Practice trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFX.clickPop();
              setIsPlaying(!isPlaying);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isPlaying
                ? 'bg-amber-950 border border-amber-500 text-amber-300'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Jeda Otomatis' : 'Mulai Slideshow'}</span>
          </button>

          <button
            onClick={() => {
              soundFX.clickPop();
              onOpenTaskModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 hover:bg-amber-900/60 transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Simulasi Ujian Tugas 1–10</span>
          </button>
        </div>
      </div>
    </div>
  );
};
