import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  intensity?: number;
  mode?: 'grid' | 'bars' | 'particles';
  tiltX?: number;
  tiltY?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  intensity = 1,
  mode = 'grid',
  tiltX = 0,
  tiltY = 0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 14);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x064e3b, 1.2 * intensity);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x10b981, 2.5 * intensity);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.0 * intensity, 25);
    cyanLight.position.set(-8, 4, 2);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 1.8 * intensity, 25);
    goldLight.position.set(8, -2, 4);
    scene.add(goldLight);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Isometric Excel 3D Grid Plane
    const gridHelper = new THREE.GridHelper(28, 28, 0x10b981, 0x064e3b);
    gridHelper.position.y = -2.5;
    gridHelper.rotation.x = 0.2;
    mainGroup.add(gridHelper);

    // 2. 3D Bar Cubes (Excel 3D column chart aesthetic)
    const barCount = 20;
    const bars: { mesh: THREE.Mesh; baseHeight: number; speed: number; phase: number }[] = [];
    const barGeo = new THREE.BoxGeometry(0.65, 1, 0.65);

    const colors = [0x10b981, 0x059669, 0x047857, 0x0d9488, 0x0284c7, 0xf59e0b];
    for (let i = 0; i < barCount; i++) {
      const col = colors[i % colors.length];
      const barMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.25,
        metalness: 0.6,
        transparent: true,
        opacity: 0.75,
      });

      const mesh = new THREE.Mesh(barGeo, barMat);
      const row = Math.floor(i / 5) - 2;
      const colIndex = (i % 5) - 2;
      mesh.position.set(colIndex * 1.6, -2, row * 1.6 - 1);

      const baseHeight = 1.0 + Math.random() * 3.5;
      mesh.scale.set(1, baseHeight, 1);
      mesh.position.y = -2.5 + baseHeight / 2;

      mainGroup.add(mesh);
      bars.push({
        mesh,
        baseHeight,
        speed: 1.2 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 3. Floating 3D Data Dust / Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x10b981);
    const c2 = new THREE.Color(0x38bdf8);
    const c3 = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      const pick = Math.random();
      const col = pick < 0.6 ? c1 : pick < 0.85 ? c2 : c3;
      particleColors[i] = col.r;
      particleColors[i + 1] = col.g;
      particleColors[i + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Target tilt damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointerMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      mainGroup.rotation.y = time * 0.08 + targetX * 0.35 + (tiltX || 0) * 0.5;
      mainGroup.rotation.x = Math.sin(time * 0.05) * 0.04 + targetY * 0.2 + (tiltY || 0) * 0.3;

      // Animate 3D bars dynamically like live Excel spreadsheet analytics
      bars.forEach((b) => {
        const heightMultiplier = Math.sin(time * b.speed + b.phase) * 0.4 + 1;
        const currentH = b.baseHeight * heightMultiplier;
        b.mesh.scale.y = currentH;
        b.mesh.position.y = -2.5 + currentH / 2;
      });

      // Slowly rotate particle field
      particles.rotation.y = time * 0.02;
      particles.rotation.x = time * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      barGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [intensity, mode, tiltX, tiltY]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};
