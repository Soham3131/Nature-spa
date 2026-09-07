"use client";

/*
 * react-hooks/immutability is disabled for this file only.
 *
 * three.js is driven by mutating uniform objects and object3D transforms inside
 * the render loop (useFrame) — that is the framework's entire contract, and it
 * happens outside React's render cycle by design. The rule models values
 * returned from useMemo as immutable, which does not describe GPU uniforms that
 * must be updated ~60 times a second without re-rendering React.
 *
 * Nothing here feeds React state; the objects are handed to three.js once and
 * then owned by the render loop.
 */
/* eslint-disable react-hooks/immutability */

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { vp, damp } from "@/lib/viewportStore";

/* ------------------------------------------------------------------ *
 *  Shared GLSL — simplex-ish value noise, cheap and smooth
 * ------------------------------------------------------------------ */
const NOISE = /* glsl */ `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865, 0.366025403, -0.577350269, 0.024390243);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
`;

/** Deterministic PRNG, so the particle scatter is reproducible and pure. */
function makeRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ *
 *  Aurora backdrop — flowing silk of gold + jade
 * ------------------------------------------------------------------ */
function Aurora() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uGold: { value: new THREE.Color("#c9a24a") },
      uJade: { value: new THREE.Color("#2f6b57") },
      uDeep: { value: new THREE.Color("#050d0a") },
    }),
    [],
  );

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    uniforms.uTime.value += d;
    uniforms.uScroll.value = damp(uniforms.uScroll.value, vp.scroll, 3, d);
  });

  return (
    <mesh position={[0, 0, -14]} scale={[46, 30, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        depthWrite={false}
        transparent
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          varying vec2 vUv;
          uniform float uTime;
          uniform float uScroll;
          uniform vec3 uGold;
          uniform vec3 uJade;
          uniform vec3 uDeep;
          ${NOISE}

          void main(){
            vec2 uv = vUv;
            float t = uTime * 0.03;
            // large, slow features -> soft haze rather than marble veining
            vec2 q = vec2(uv.x * 0.95, uv.y * 0.7 + uScroll * 0.35);

            float n1 = fbm(q + vec2(t, -t * 0.5));
            float n2 = fbm(q * 1.25 + vec2(-t * 0.6, t * 0.3) + n1 * 0.35);

            float ribbon = smoothstep(-0.35, 0.9, n1);
            float glow   = pow(smoothstep(0.1, 1.0, n2 * 0.5 + 0.5), 2.6);

            vec3 col = uDeep;
            col = mix(col, uJade, ribbon * 0.46);
            col = mix(col, uGold, glow * 0.40);

            // keep the middle clear so headline type stays legible
            float d = distance(uv, vec2(0.5, 0.5));
            float centreClear = smoothstep(0.10, 0.50, d);
            float vig = smoothstep(0.82, 0.24, d);

            float alpha = vig * centreClear * 0.95;
            gl_FragColor = vec4(col, alpha);
            #include <colorspace_fragment>
          }
        `}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 *  The centrepiece — a slowly turning iridescent crystal
 * ------------------------------------------------------------------ */
function Crystal({ position }: { position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uA: { value: new THREE.Color("#f2ddab") },
      uB: { value: new THREE.Color("#5f9c85") },
      uC: { value: new THREE.Color("#e8b9b3") },
    }),
    [],
  );

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    uniforms.uTime.value += d;
    if (!mesh.current) return;
    mesh.current.rotation.y += d * 0.16;
    mesh.current.rotation.x = Math.sin(uniforms.uTime.value * 0.22) * 0.16;
    mesh.current.position.y = position[1] + Math.sin(uniforms.uTime.value * 0.6) * 0.18;
  });

  return (
    <mesh ref={mesh} position={position} scale={0.95}>
      <icosahedronGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        vertexShader={/* glsl */ `
          varying vec3 vNormalW;
          varying vec3 vViewDir;
          varying float vFacet;
          void main(){
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vViewDir = normalize(cameraPosition - wp.xyz);
            vFacet = dot(normalize(normal), vec3(0.3, 0.8, 0.5));
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `}
        fragmentShader={/* glsl */ `
          varying vec3 vNormalW;
          varying vec3 vViewDir;
          varying float vFacet;
          uniform float uTime;
          uniform vec3 uA;
          uniform vec3 uB;
          uniform vec3 uC;

          void main(){
            vec3 n = normalize(vNormalW);
            float fres = pow(1.0 - clamp(dot(n, normalize(vViewDir)), 0.0, 1.0), 2.2);

            float band = sin(vFacet * 5.0 + uTime * 0.8) * 0.5 + 0.5;
            vec3 col = mix(uB, uA, band);
            col = mix(col, uC, pow(fres, 1.4) * 0.7);
            col += uA * fres * 0.85;

            float alpha = 0.10 + fres * 0.46;
            gl_FragColor = vec4(col, alpha);
            #include <colorspace_fragment>
          }
        `}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 *  Floating zen stones
 * ------------------------------------------------------------------ */
type StoneProps = ThreeElements["mesh"] & {
  color: string;
  radius: number;
  metal?: number;
};

function Stone({ color, radius, metal = 0.85, ...rest }: StoneProps) {
  return (
    <mesh castShadow={false} receiveShadow={false} {...rest}>
      <sphereGeometry args={[radius, 36, 28]} />
      <meshStandardMaterial
        color={color}
        roughness={0.28}
        metalness={metal}
        envMapIntensity={0.9}
      />
    </mesh>
  );
}

function Stones() {
  const stones = useMemo(
    () =>
      [
        { p: [-5.6, 1.7, -4.2], c: "#d9b866", r: 0.38, s: 1.1 },
        { p: [5.9, 0.9, -5.0], c: "#7fae95", r: 0.46, s: 0.8 },
        { p: [-4.6, -2.3, -3.6], c: "#f7f2e8", r: 0.24, s: 1.4 },
        { p: [4.7, 2.8, -3.8], c: "#a8873f", r: 0.3, s: 1.2 },
        { p: [-7.0, -0.6, -6.0], c: "#e0b3ae", r: 0.42, s: 0.9 },
        { p: [6.8, -2.4, -4.4], c: "#d9b866", r: 0.22, s: 1.5 },
        { p: [-2.6, 3.6, -6.4], c: "#7fae95", r: 0.32, s: 1.0 },
        { p: [2.9, -3.5, -5.6], c: "#f2ddab", r: 0.27, s: 1.3 },
      ] as const,
    [],
  );

  return (
    <>
      {stones.map((s, i) => (
        <Float
          key={i}
          speed={s.s}
          rotationIntensity={0.5}
          floatIntensity={1.15}
          floatingRange={[-0.25, 0.25]}
        >
          <Stone
            position={s.p as unknown as [number, number, number]}
            color={s.c}
            radius={s.r}
            metal={s.c === "#f7f2e8" ? 0.2 : 0.85}
          />
        </Float>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ *
 *  Gold dust
 * ------------------------------------------------------------------ */
function GoldDust({ count = 700 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const rand = makeRandom(0x5eed);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 22;
      positions[i * 3 + 1] = (rand() - 0.5) * 14;
      positions[i * 3 + 2] = (rand() - 0.5) * 12 - 3;
      sizes[i] = rand() * 0.055 + 0.012;
    }
    return { positions, sizes };
  }, [count]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    uniforms.uTime.value += d;
    if (points.current) points.current.rotation.y += d * 0.014;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          attribute float aSize;
          uniform float uTime;
          varying float vTw;
          void main(){
            vec3 p = position;
            p.y += sin(uTime * 0.35 + p.x * 0.6) * 0.35;
            p.x += cos(uTime * 0.24 + p.z * 0.5) * 0.28;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vTw = 0.55 + 0.45 * sin(uTime * 1.6 + p.x * 3.0 + p.y * 2.0);
            gl_PointSize = aSize * 520.0 / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          varying float vTw;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float a = smoothstep(0.5, 0.0, d);
            a *= a * vTw;
            gl_FragColor = vec4(vec3(0.96, 0.85, 0.62), a);
          }
        `}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 *  Camera rig — parallax on pointer, dolly on scroll
 * ------------------------------------------------------------------ */
function Rig() {
  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    vp.spx = damp(vp.spx, vp.px, 2.4, d);
    vp.spy = damp(vp.spy, vp.py, 2.4, d);

    const cam = state.camera;
    cam.position.x = damp(cam.position.x, vp.spx * 1.35, 3, d);
    cam.position.y = damp(cam.position.y, -vp.spy * 0.9 + vp.scroll * 2.2, 3, d);
    cam.position.z = damp(cam.position.z, 9 - vp.scroll * 2.4, 3, d);
    cam.lookAt(0, vp.scroll * 0.8, 0);
  });
  return null;
}

/* ------------------------------------------------------------------ *
 *  Public component
 * ------------------------------------------------------------------ */
export default function SpaScene({ className = "" }: { className?: string }) {
  const [dpr, setDpr] = useState(1.4);

  /**
   * Decided once, lazily, on first render. This component is imported with
   * `ssr: false`, so it only ever renders in the browser — no hydration
   * mismatch, and no state update bouncing through an effect.
   */
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency;
    const lowPower = cores !== undefined && cores <= 2;
    return !(reduced || lowPower);
  });

  if (!enabled) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 55% at 50% 40%, rgba(217,184,102,0.20), transparent 70%), radial-gradient(50% 40% at 20% 70%, rgba(127,174,149,0.16), transparent 70%)",
        }}
      />
    );
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [0, 0, 9], fov: 42 }}
        style={{ pointerEvents: "none" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(Math.min(1.75, window.devicePixelRatio))}
        />
        <color attach="background" args={["#07100d"]} />
        <fog attach="fog" args={["#07100d", 9, 22]} />

        <ambientLight intensity={0.55} color="#cfe3d8" />
        <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffe6b0" />
        <directionalLight position={[-6, -2, 3]} intensity={0.9} color="#6fbf9c" />
        <pointLight position={[0, 0, 4]} intensity={9} distance={18} color="#f2ddab" />

        <Suspense fallback={null}>
          <Aurora />
          <Stones />
          <Crystal position={[4.2, 1.6, -1.9]} />
          <GoldDust />
        </Suspense>

        <Rig />
      </Canvas>
    </div>
  );
}
