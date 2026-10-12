'use client';

import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, PerspectiveCamera, Center, Float, Grid } from '@react-three/drei';
import * as THREE from 'three';

// ─── Helipad Component ───────────────────────────────────────────────────────
function Helipad() {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Landing Pad Base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5.5, 0.4, 64]} />
        <meshStandardMaterial color="#02040a" metalness={0.5} roughness={1} />
      </mesh>
      
      {/* Outer Painted Ring (Blue) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
        <ringGeometry args={[4.8, 5, 128]} />
        <meshBasicMaterial color="#00AEEF" transparent opacity={0.8} />
      </mesh>

      {/* Inner Painted Ring (Blue) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
        <ringGeometry args={[4.0, 4.2, 64]} />
        <meshBasicMaterial color="#00AEEF" transparent opacity={0.8} />
      </mesh>
      
      {/* Inner H - Painted Blue */}
      <group position={[0, 0.22, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, 0, 0]}>
          <planeGeometry args={[0.4, 3.5]} />
          <meshBasicMaterial color="#00AEEF" transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.2, 0, 0]}>
          <planeGeometry args={[0.4, 3.5]} />
          <meshBasicMaterial color="#00AEEF" transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[2.4, 0.4]} />
          <meshBasicMaterial color="#00AEEF" transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Shadow Catcher Floor - Invisible except for shadows! */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
}

// ─── Airplane mesh ───────────────────────────────────────────────────────────
function LandingAirplane({ scrollProgress, isMobile }: { scrollProgress: number, isMobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const flareGroup = useRef<THREE.Group>(null!);
  const solidGroup = useRef<THREE.Group>(null!);
  
  const { scene } = useGLTF('/models/2-draco.glb');
  
  // 1) Solid Scene: Original Model with shadow casting enabled
  const solidScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // 2) Hologram Scene: Upgraded additive glowing wireframe
  const hologramScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color("#00AEEF"),
          wireframe: true,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending, // Makes overlapping lines glow intensely
          depthWrite: false, // Prevents internal z-fighting
        });
      }
    });
    return clone;
  }, [scene]);

  const transitionRef = useRef(0);

  useFrame((state, delta) => {
    if (!group.current || !solidGroup.current || !flareGroup.current) return;

    // --- Vertical Landing Animation ---
    const landingProgress = Math.min(1, scrollProgress * 2);
    const easeOutQuad = 1 - (1 - landingProgress) * (1 - landingProgress);
    
    // Drop from 30 on mobile so it doesn't appear immediately on screen
    const targetY = THREE.MathUtils.lerp(isMobile ? 30 : 20, 1.5, easeOutQuad);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 4);

    const targetPitch = THREE.MathUtils.lerp(0.25, 0, easeOutQuad);
    flareGroup.current.rotation.z = THREE.MathUtils.lerp(flareGroup.current.rotation.z, targetPitch, delta * 4);

    // --- Hologram Transition ---
    const hologramProgress = Math.max(0, (scrollProgress - 0.5) * 2);
    transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, hologramProgress, delta * 5);

    // Hide solid cleanly when transition starts
    solidGroup.current.visible = transitionRef.current < 0.5;
    
    // Fade in wireframe
    hologramScene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = transitionRef.current;
      }
    });
  });

  return (
    <group ref={group} position={[0, isMobile ? 30 : 20, 0]}>
      <group ref={flareGroup} rotation={[0, Math.PI / 2, 0]}>
        
        <spotLight 
          position={[0, 0, 0]} 
          angle={0.6} 
          penumbra={0.5} 
          intensity={4} 
          color="#00AEEF" 
          distance={25} 
          castShadow 
        />

        <Center scale={isMobile ? [0.45, 0.45, 0.45] : [0.8, 0.8, 0.8]}>
          <group ref={solidGroup}>
            <primitive object={solidScene} />
          </group>
          <group>
            <primitive object={hologramScene} />
          </group>
        </Center>
      </group>
    </group>
  );
}

// ─── Lights ──────────────────────────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.0} color="#e0f2fe" />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={3.5} 
        color="#ffffff" 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <directionalLight position={[-15, 5, -15]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[0, -10, 5]} intensity={1.5} color="#bae6fd" />
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function LandingHelipadScene() {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      
      const raw = (vh - rect.top) / (el.offsetHeight + vh);
      setScrollProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        marginLeft: 'calc(-50vw + 50%)', 
        background: '#050a1f', // Solid dark blue to match 3D background
        overflow: 'hidden',
      }}
      aria-label="Vertical Landing 3D Scene"
    >
      <Canvas
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        dpr={[1, 1.5]}
        camera={{ position: isMobile ? [0, 4, 18] : [0, 2, 12], fov: 50 }}
        gl={{ antialias: true }}
        shadows
      >
        {/* Set background directly in ThreeJS to fix black Grid alpha masking bugs */}
        <color attach="background" args={['#050a1f']} />
        
        <SceneLights />

        <Suspense fallback={null}>
          <LandingAirplane scrollProgress={scrollProgress} isMobile={isMobile} />
          <Helipad />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Landing Text UI */}
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: Math.max(0, Math.min(1, (scrollProgress - 0.2) * 5)), // Fades in as it lands
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Precision Vertical Landing
          </p>
          <p style={{ color: '#00AEEF', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Anywhere, Anytime.
          </p>
        </div>
      </div>
      
      {/* Instruction to continue scrolling */}
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: Math.max(0, Math.min(1, (scrollProgress - 0.4) * 10)) * (1 - Math.max(0, (scrollProgress - 0.5) * 5)), 
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', animation: 'pulse 2s infinite' }}>
          Keep scrolling for system analysis
        </p>
      </div>
    </div>
  );
}
