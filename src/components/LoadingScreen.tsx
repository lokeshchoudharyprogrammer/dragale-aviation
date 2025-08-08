'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
    const controls = useAnimation()

    useEffect(() => {
        controls.start({
            x: [-1200, 0, 600],
            y: [100, 0, -200],
            rotateZ: [-10, 0, 10],
            rotateX: [1, 0.15, 0.3],
            transition: {
                duration: 4,
                ease: 'easeInOut',
            },
        }).then(() => {
            onFinish()
        })
    }, [controls, onFinish])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">

            {/* 👇 Only the 3D model animates */}
            <motion.div
                className="relative flex items-center justify-center w-full h-full"
                animate={controls}
                initial={{ x: -300, y: 120, rotateZ: -30, rotateX: -1 }}
                style={{ perspective: 1200 }}
            >
                <div className="relative w-[150vw] max-w-[1100px] h-[60vh] md:h-[70vh]">
                    <Canvas camera={{ position: [3, 2, 6], fov: 50 }}>
                        <CameraRig />
                        <ambientLight intensity={1.1} />
                        <directionalLight position={[5, 5, 5]} intensity={1.5} />
                        <Model />
                        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                    </Canvas>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 md:bottom-12 w-full px-4 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
            >
                <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.65)]">
                    Dragale Aviation
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg font-light tracking-wide leading-relaxed">
                    Pioneering India’s first <span className="text-white font-medium">eVTOL air ambulance</span> to deliver rapid, safe,
                    and innovative emergency medical transport — because every second counts.
                </p>

                {/* Optional CTA button for pro feel */}
                {/* <div className="mt-6">
                    <button onClick={()=>{
                        
                    }} className="px-6 py-2 rounded-full bg-white/10 text-white text-sm md:text-base font-medium backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                        Explore Our Mission
                    </button>
                </div> */}
            </motion.div>
            {/* Responsive Glow Effects */}
            <div className="absolute w-[60vw] max-w-[300px] h-[60vw] max-h-[300px] bg-purple-600 blur-[160px] opacity-20 rounded-full top-[10%] left-[5%] pointer-events-none" />
            <div className="absolute w-[50vw] max-w-[250px] h-[50vw] max-h-[250px] bg-blue-500 blur-[140px] opacity-20 rounded-full bottom-[6%] right-[6%] pointer-events-none" />


        </div>



    )
}

// 👇 Keeps camera looking at center of scene
function CameraRig() {
    useFrame(({ camera }) => {
        camera.lookAt(1, 0, 0)
    })
    return null
}

function Model() {
    // @ts-expect-error this is crt dont ask again ok me 
    const ref = useRef()
    const { scene } = useGLTF('/taxi.glb')

    // Track animation progress (0 to 1)
    const progressRef = useRef(0)

    useFrame((state, delta) => {
        console.log(state)
        if (!ref.current) return


        if (progressRef.current < 1) {
            progressRef.current += delta
            if (progressRef.current > 1) progressRef.current = 1
        }

        // Interpolate rotation from 0 to 120° (in radians)
        const startYaw = 0
        const endYaw = (Math.PI * 2) / 3 // ≈ 120°
        const currentYaw = startYaw + (endYaw - startYaw) * progressRef.current
        // @ts-expect-error this is crt dont ask again ok me 
        ref.current.rotation.x = Math.PI / 30         // 6° pitch up
        // @ts-expect-error this is crt dont ask again ok me 
        ref.current.rotation.y = currentYaw           // One-time yaw
        // @ts-expect-error this is crt dont ask again ok me 
        ref.current.rotation.z = -Math.PI / 60        // slight roll
    })

    return <primitive ref={ref} object={scene} scale={0.5} />
}

