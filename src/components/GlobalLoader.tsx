"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, Center, OrbitControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "./ErrorBoundary";

function PlaneModel(props: any) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/2-draco.glb");
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((key) => {
        actions[key]?.play();
      });
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
try {
  useGLTF.preload("/models/2-draco.glb");
} catch(e) {}

export default function GlobalLoader() {
  const [show, setShow] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const { progress, errors } = useProgress();

  useEffect(() => {
    // Check for WebGL support and prevent context leaking
    try {
      const canvas = document.createElement("canvas");
      const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (gl) {
        setWebGLSupported(true);
        // Immediately lose context to prevent hitting the browser's max WebGL context limit (16)
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      } else {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    // If progress is 100%, start the 3 second countdown.
    if (progress === 100 || errors.length > 0) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [progress, errors]);

  // Failsafe
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] w-full h-screen bg-white overflow-hidden font-sans"
        >
          {/* Full Screen Light gray track exactly in the middle */}
          <div className="absolute top-1/2 left-0 w-full h-3 bg-[#E5E7EB] -translate-y-1/2" />
          
          {/* Full Screen Blue track filling up based on actual download progress */}
          <div 
            className="absolute top-1/2 left-0 h-3 bg-[#00AEEF] -translate-y-1/2 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />

          {/* Plane Container - Moving from Left to Right directly ON the track */}
          <motion.div 
            className="absolute top-1/2 flex flex-col items-center pointer-events-none z-10"
            style={{ 
              y: "-50%",
              x: "-50%",
              width: '400px', 
              height: '400px'
            }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            {webGLSupported ? (
              <ErrorBoundary fallback={<div className="w-16 h-16 border-4 border-[#E5E7EB] border-t-[#00AEEF] rounded-full animate-spin m-auto mt-20"></div>}>
                <Canvas 
                  camera={{ position: [0, 15, 0.1], fov: 40 }} 
                  className="w-full h-full pointer-events-auto"
                >
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
                  <Environment preset="city" />
                  <OrbitControls enableZoom={false} enablePan={false} />

                  <Center>
                    <PlaneModel 
                      rotation={[0, Math.PI / 2, 0]} 
                      scale={0.45} 
                    />
                  </Center>
                </Canvas>
              </ErrorBoundary>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-[#00AEEF] z-20 bg-white px-4 py-2 rounded shadow">Dragale Aviation</span>
              </div>
            )}
          </motion.div>
          
          {/* Stationary Loading text centered at the bottom of the screen */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-widest text-gray-400 uppercase">
            {progress < 100 ? "Loading Assets" : "Ready for Takeoff"}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
