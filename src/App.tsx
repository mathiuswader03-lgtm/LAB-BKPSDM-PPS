import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { ThreeCanvas } from './components/ThreeCanvas';
import { PresentationStage } from './components/PresentationStage';
import { TaskSolverModal } from './components/TaskSolverModal';
import { SLIDES } from './data/slidesData';
import { soundFX } from './utils/audio';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [view3DMode, setView3DMode] = useState<'3d-deck' | 'flat' | 'isometric'>('3d-deck');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  // Fullscreen change handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleToggle3DMode = () => {
    setView3DMode((prev) => {
      if (prev === '3d-deck') return 'isometric';
      if (prev === 'isometric') return 'flat';
      return '3d-deck';
    });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-sans select-none">
      {/* 1. Interactive Three.js 3D WebGL Canvas Layer */}
      <ThreeCanvas
        intensity={view3DMode === 'flat' ? 0.4 : 1.1}
        mode="bars"
      />

      {/* 2. Top Navigation Bar conforming to Frontend Design Constitution */}
      <TopBar
        currentSlide={currentSlideIndex}
        totalSlides={SLIDES.length}
        onNavigate={(idx) => setCurrentSlideIndex(idx)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        view3DMode={view3DMode}
        onToggle3DMode={handleToggle3DMode}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTaskModal={() => setIsTaskModalOpen(true)}
      />

      {/* 3. Main 3D Presentation Stage */}
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-y-auto">
        <PresentationStage
          currentSlideIndex={currentSlideIndex}
          onSlideChange={(idx) => setCurrentSlideIndex(idx)}
          view3DMode={view3DMode}
          onOpenTaskModal={() => setIsTaskModalOpen(true)}
        />
      </main>

      {/* 4. Interactive Tasks & Quiz Modal */}
      <TaskSolverModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
}
