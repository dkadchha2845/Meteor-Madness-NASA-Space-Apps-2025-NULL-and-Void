import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import earthTexture from '@/assets/earth-texture.jpg';
import asteroidTexture from '@/assets/asteroid-texture.jpg';

interface AsteroidVisualizationProps {
  asteroidSize: number;
  orbitDistance: number;
  velocity: number;
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  const earthMap = useLoader(THREE.TextureLoader, earthTexture);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group>
      {/* Main Earth sphere with texture */}
      <Sphere ref={earthRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={earthMap}
          roughness={0.9}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Procedural clouds layer */}
      <Sphere ref={cloudsRef} args={[2.05, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          depthWrite={false}
          roughness={1}
        />
      </Sphere>
      
      {/* Atmospheric glow */}
      <Sphere args={[2.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#4169E1"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function Asteroid({ size, distance, velocity }: { size: number; distance: number; velocity: number }) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const angle = useRef(0);
  
  const asteroidMap = useLoader(THREE.TextureLoader, asteroidTexture);

  useFrame((state, delta) => {
    if (asteroidRef.current) {
      angle.current += delta * velocity * 0.1;
      const x = Math.cos(angle.current) * distance;
      const z = Math.sin(angle.current) * distance;
      asteroidRef.current.position.set(x, 0, z);
      asteroidRef.current.rotation.x += delta * 0.5;
      asteroidRef.current.rotation.y += delta * 0.3;
    }
  });

  const asteroidGeometry = useMemo(() => {
    const geometry = new THREE.DodecahedronGeometry(size, 2);
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      vertex.normalize().multiplyScalar(size + (Math.random() - 0.5) * 0.3);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [size]);

  return (
    <mesh ref={asteroidRef} geometry={asteroidGeometry}>
      <meshStandardMaterial
        map={asteroidMap}
        bumpMap={asteroidMap}
        bumpScale={0.3}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function OrbitPath({ distance }: { distance: number }) {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      distance, distance,
      0, 2 * Math.PI,
      false,
      0
    );
    const orbitPoints = curve.getPoints(100);
    return orbitPoints.map(p => new THREE.Vector3(p.x, 0, p.y));
  }, [distance]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ 
      color: "#9333EA", 
      opacity: 0.4, 
      transparent: true 
    }))} />
  );
}

export default function AsteroidVisualization({ 
  asteroidSize, 
  orbitDistance, 
  velocity 
}: AsteroidVisualizationProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden glass-panel">
      <Canvas camera={{ position: [0, 15, 15], fov: 60 }}>
        <color attach="background" args={['#0a0a1a']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4169E1" />
        
        <Stars radius={300} depth={60} count={5000} factor={7} fade speed={1} />
        
        <Suspense fallback={null}>
          <Earth />
          <Asteroid size={asteroidSize} distance={orbitDistance} velocity={velocity} />
        </Suspense>
        <OrbitPath distance={orbitDistance} />
        
        <OrbitControls 
          enablePan={false}
          minDistance={8}
          maxDistance={50}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
