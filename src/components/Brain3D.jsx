import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const BrainParticles = () => {
    const pointsRef = useRef();

    // Create a pseudo-random particle distribution in the shape of a brain
    const count = 5000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(Math.random() * 2 - 1);

            let r = 2;

            const x = r * Math.sin(phi) * Math.cos(theta) * 0.75;
            const y = r * Math.cos(phi) * 0.85;
            const z = r * Math.sin(phi) * Math.sin(theta) * 1.2;

            const noise = (Math.random() - 0.5) * 0.4;

            pos[i * 3] = x + noise;
            pos[i * 3 + 1] = y + noise;
            pos[i * 3 + 2] = z + noise;
        }
        return pos;
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00ff66"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const WireframeCore = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= delta * 0.1;
            meshRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} scale={[0.8, 0.9, 1.2]}>
            <icosahedronGeometry args={[1.6, 2]} />
            <meshBasicMaterial color="#00ff66" wireframe transparent opacity={0.15} />
        </mesh>
    );
};

export default function Brain3D() {
    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[500px] relative flex items-center justify-center">
            {/* Glow effect behind the brain */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <BrainParticles />
                    <WireframeCore />
                </Float>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                    maxPolarAngle={Math.PI / 2 + 0.2}
                    minPolarAngle={Math.PI / 2 - 0.2}
                />
                <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
}
