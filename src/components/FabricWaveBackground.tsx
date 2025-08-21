import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface FabricWaveBackgroundProps {
  colorRamp?: string[];
  contourFrequency?: number;
  warpAmount?: number;
  cursorStrength?: number;
  speed?: number;
  reducedMotionFallback?: boolean;
}

// Fragment shader for the fabric wave effect
const fabricShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_cursor;
    uniform float u_cursorStrength;
    uniform float u_warpAmount;
    uniform float u_contourFreq;
    uniform float u_speed;
    uniform bool u_reducedMotion;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Fractal Brownian Motion for complex noise
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }

    // Domain warp function
    vec2 domainWarp(vec2 p, float time) {
      vec2 warp = vec2(
        fbm(p + vec2(time * 0.1, time * 0.15)),
        fbm(p + vec2(time * 0.12, time * 0.08) + vec2(1.7, 9.2))
      );
      return p + warp * u_warpAmount;
    }

    void main() {
      vec2 uv = vUv;
      vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      
      float time = u_reducedMotion ? 0.0 : u_time * u_speed;
      
      // Domain warp base coordinates
      vec2 warpedUv = domainWarp(st * 2.0, time);
      
      // Cursor interaction
      vec2 cursorNorm = (u_cursor - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float cursorDist = length(st - cursorNorm);
      float cursorFalloff = smoothstep(0.4, 0.0, cursorDist);
      
      // Add cursor warp
      vec2 cursorWarp = (st - cursorNorm) * cursorFalloff * u_cursorStrength;
      warpedUv += cursorWarp;
      
      // Generate height field
      float height = fbm(warpedUv + time * 0.05);
      
      // Create contour lines
      float contours = abs(fract(height * u_contourFreq) - 0.5);
      float lines = smoothstep(0.02, 0.0, contours);
      
      // Calculate normals for lighting
      float eps = 0.01;
      float heightX = fbm(warpedUv + vec2(eps, 0.0));
      float heightY = fbm(warpedUv + vec2(0.0, eps));
      vec3 normal = normalize(vec3(height - heightX, height - heightY, eps));
      
      // Fake lighting
      float light = dot(normal, normalize(vec3(1.0, 1.0, 0.5))) * 0.5 + 0.5;
      
      // Iridescent color mapping
      float colorPhase = height * 2.0 + time * 0.1;
      vec3 teal = vec3(0.0, 1.0, 1.0);
      vec3 magenta = vec3(1.0, 0.0, 1.0);
      vec3 amber = vec3(1.0, 0.8, 0.0);
      
      vec3 color1 = mix(teal, magenta, smoothstep(-0.5, 0.5, sin(colorPhase)));
      vec3 color2 = mix(magenta, amber, smoothstep(-0.5, 0.5, sin(colorPhase + 2.094)));
      vec3 baseColor = mix(color1, color2, smoothstep(-0.5, 0.5, cos(colorPhase * 0.7)));
      
      // Final color composition
      vec3 finalColor = baseColor * lines * light * 0.15;
      
      // Add subtle background gradient
      float bgGradient = 1.0 - length(st) * 0.3;
      finalColor += vec3(0.02, 0.025, 0.035) * bgGradient;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function FabricWaveMesh({ 
  colorRamp = ['#00ffff', '#ff00ff', '#ffbf00'],
  contourFrequency = 120,
  warpAmount = 0.3,
  cursorStrength = 0.8,
  speed = 0.2,
  reducedMotionFallback = false 
}: FabricWaveBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(reducedMotionFallback);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches || reducedMotionFallback);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [reducedMotionFallback]);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_cursor: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    u_cursorStrength: { value: cursorStrength },
    u_warpAmount: { value: warpAmount },
    u_contourFreq: { value: contourFrequency },
    u_speed: { value: speed },
    u_reducedMotion: { value: reducedMotion }
  }), [size, cursorStrength, warpAmount, contourFrequency, speed, reducedMotion]);

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = size.height - event.clientY; // Invert Y for WebGL
      uniforms.u_cursor.value.set(mouseRef.current.x, mouseRef.current.y);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = size.height - touch.clientY;
        uniforms.u_cursor.value.set(mouseRef.current.x, mouseRef.current.y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [uniforms, size]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={fabricShader.vertexShader}
        fragmentShader={fabricShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export function FabricWaveBackground(props: FabricWaveBackgroundProps) {
  return (
    <div className="fabric-canvas">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: true
        }}
        dpr={Math.min(1.5, window.devicePixelRatio)}
      >
        <FabricWaveMesh {...props} />
      </Canvas>
    </div>
  );
}