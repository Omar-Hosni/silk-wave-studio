import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
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

// Enhanced symphonic fabric shader with multiple wave layers and springy physics
const symphonyShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
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
    uniform float u_breathe;
    uniform float u_springiness;
    uniform vec2 u_cursorVelocity;
    
    varying vec2 vUv;
    varying vec3 vPosition;

    // Enhanced noise functions for more organic movement
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
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

    // Multi-octave noise for complex organic patterns
    float fbm(vec2 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }

    // Symphony-inspired wave layers
    float symphonyWave(vec2 p, float time, float phase) {
      float wave1 = sin(p.x * 3.0 + time * 2.0 + phase) * 0.3;
      float wave2 = sin(p.y * 2.0 + time * 1.5 + phase * 0.7) * 0.2;
      float wave3 = sin((p.x + p.y) * 1.5 + time * 1.8 + phase * 1.3) * 0.15;
      
      // Add organic fluctuations
      float organic = fbm(p + time * 0.1, 4) * 0.1;
      
      return wave1 + wave2 + wave3 + organic;
    }

    // Enhanced domain warp with springy cursor interaction
    vec2 domainWarp(vec2 p, float time, vec2 cursor, float cursorStrength) {
      // Base organic warp
      vec2 warp1 = vec2(
        fbm(p + vec2(time * 0.08, time * 0.12), 3),
        fbm(p + vec2(time * 0.1, time * 0.07) + vec2(1.7, 9.2), 3)
      );
      
      // Symphony wave layer
      float symphonyPhase = time * 0.5;
      vec2 symphonyWarp = vec2(
        symphonyWave(p, time, symphonyPhase) * 0.2,
        symphonyWave(p + vec2(0.5, 0.3), time, symphonyPhase + 1.57) * 0.2
      );
      
      // Springy cursor interaction with velocity
      vec2 cursorNorm = cursor / u_resolution.xy;
      vec2 toP = p - (cursorNorm * 2.0 - 1.0);
      float cursorDist = length(toP);
      
      // Enhanced springy falloff with velocity influence
      float springyFalloff = smoothstep(0.6, 0.0, cursorDist);
      springyFalloff *= springyFalloff; // Squared for more dramatic falloff
      
      // Add velocity-based stretching
      vec2 velocityWarp = u_cursorVelocity * springyFalloff * 0.0005;
      
      // Springy deformation
      vec2 springyDeform = toP * springyFalloff * cursorStrength * u_springiness;
      springyDeform += velocityWarp;
      
      return p + (warp1 + symphonyWarp) * u_warpAmount + springyDeform;
    }

    // Living, breathing effect
    float breathingEffect(vec2 p, float time) {
      float breathe = sin(time * 0.8) * 0.5 + 0.5; // Slow breathing cycle
      breathe = smoothstep(0.2, 0.8, breathe); // Smooth the breathing
      
      // Radial breathing from multiple points
      vec2 center1 = vec2(0.3, 0.7);
      vec2 center2 = vec2(0.7, 0.3);
      vec2 center3 = vec2(0.5, 0.5);
      
      float dist1 = length(p - center1);
      float dist2 = length(p - center2);
      float dist3 = length(p - center3);
      
      float pulse1 = sin(dist1 * 10.0 - time * 3.0) * exp(-dist1 * 2.0);
      float pulse2 = sin(dist2 * 12.0 - time * 2.5) * exp(-dist2 * 2.5);
      float pulse3 = sin(dist3 * 8.0 - time * 4.0) * exp(-dist3 * 1.5);
      
      return (pulse1 + pulse2 + pulse3) * breathe * 0.1;
    }

    void main() {
      vec2 uv = vUv;
      vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      
      float time = u_reducedMotion ? 0.0 : u_time * u_speed;
      
      // Enhanced domain warping with cursor interaction
      vec2 warpedUv = domainWarp(st * 1.5, time, u_cursor, u_cursorStrength);
      
      // Multiple wave layers for symphony effect
      float height1 = fbm(warpedUv + time * 0.03, 5);
      float height2 = symphonyWave(warpedUv * 0.8, time, 0.0) * 0.7;
      float height3 = fbm(warpedUv * 1.5 - time * 0.02, 3) * 0.4;
      
      // Living breathing effect
      float breathe = breathingEffect(uv, time);
      
      // Combine all height layers
      float finalHeight = height1 + height2 + height3 + breathe;
      
      // Enhanced contour generation with multiple frequencies
      float contours1 = abs(fract(finalHeight * u_contourFreq) - 0.5);
      float contours2 = abs(fract(finalHeight * u_contourFreq * 0.5) - 0.5);
      float contours3 = abs(fract(finalHeight * u_contourFreq * 2.0) - 0.5);
      
      float lines1 = smoothstep(0.02, 0.0, contours1);
      float lines2 = smoothstep(0.04, 0.0, contours2) * 0.3;
      float lines3 = smoothstep(0.01, 0.0, contours3) * 0.6;
      
      float finalLines = lines1 + lines2 + lines3;
      
      // Enhanced normals for better lighting
      float eps = 0.008;
      float heightX = fbm(warpedUv + vec2(eps, 0.0), 4);
      float heightY = fbm(warpedUv + vec2(0.0, eps), 4);
      vec3 normal = normalize(vec3((finalHeight - heightX) / eps, (finalHeight - heightY) / eps, 1.0));
      
      // Multiple light sources for more dynamic lighting
      vec3 light1 = normalize(vec3(1.0, 1.0, 0.8));
      vec3 light2 = normalize(vec3(-0.5, 0.8, 0.6));
      vec3 light3 = normalize(vec3(0.0, -0.5, 1.0));
      
      float lighting1 = max(0.0, dot(normal, light1)) * 0.6;
      float lighting2 = max(0.0, dot(normal, light2)) * 0.3;
      float lighting3 = max(0.0, dot(normal, light3)) * 0.2;
      
      float finalLighting = lighting1 + lighting2 + lighting3 + 0.3; // Ambient
      
      // Symphony-inspired iridescent color palette
      float colorPhase = finalHeight * 3.0 + time * 0.15;
      
      // Rich symphony colors: deep blues, purples, teals, and golds
      vec3 deepBlue = vec3(0.1, 0.3, 0.8);
      vec3 richPurple = vec3(0.6, 0.2, 0.9);
      vec3 elegantTeal = vec3(0.0, 0.8, 0.7);
      vec3 warmGold = vec3(1.0, 0.7, 0.2);
      
      // Complex color mixing for organic feel
      vec3 color1 = mix(deepBlue, richPurple, smoothstep(-0.8, 0.8, sin(colorPhase)));
      vec3 color2 = mix(elegantTeal, warmGold, smoothstep(-0.6, 0.6, sin(colorPhase + 2.0)));
      vec3 color3 = mix(richPurple, elegantTeal, smoothstep(-0.4, 0.4, cos(colorPhase * 0.7)));
      
      vec3 finalColor = mix(color1, color2, smoothstep(-0.5, 0.5, sin(colorPhase * 0.3)));
      finalColor = mix(finalColor, color3, 0.3);
      
      // Apply lighting and line intensity
      finalColor = finalColor * finalLines * finalLighting * 0.25;
      
      // Add subtle atmospheric depth
      float depth = length(st) * 0.5;
      vec3 atmosphere = vec3(0.05, 0.08, 0.12) * (1.0 - depth);
      finalColor += atmosphere;
      
      // Subtle glow around cursor
      vec2 cursorNorm = (u_cursor - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float cursorGlow = 1.0 - smoothstep(0.0, 0.5, length(st - cursorNorm));
      finalColor += vec3(0.02, 0.04, 0.06) * cursorGlow * cursorGlow;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function SymphonyFabricMesh({ 
  colorRamp = ['#1a4d80', '#9c4dcc', '#00c8b4', '#ffb347'],
  contourFrequency = 80,
  warpAmount = 0.4,
  cursorStrength = 1.2,
  speed = 0.3,
  reducedMotionFallback = false 
}: FabricWaveBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, camera } = useThree();
  const mouseRef = useRef({ x: size.width / 2, y: size.height / 2 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(reducedMotionFallback);
  const lastMouseTime = useRef(Date.now());

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
    u_reducedMotion: { value: reducedMotion },
    u_breathe: { value: 0 },
    u_springiness: { value: 2.5 },
    u_cursorVelocity: { value: new THREE.Vector2(0, 0) }
  }), [size, cursorStrength, warpAmount, contourFrequency, speed, reducedMotion]);

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  // Enhanced mouse tracking with velocity and easing
  useEffect(() => {
    let animationId: number;
    const targetMouse = { x: size.width / 2, y: size.height / 2 };
    const currentMouse = { x: size.width / 2, y: size.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      const deltaTime = now - lastMouseTime.current;
      
      const newX = event.clientX;
      const newY = size.height - event.clientY;
      
      // Calculate velocity
      if (deltaTime > 0) {
        velocityRef.current.x = (newX - targetMouse.x) / deltaTime;
        velocityRef.current.y = (newY - targetMouse.y) / deltaTime;
      }
      
      targetMouse.x = newX;
      targetMouse.y = newY;
      lastMouseTime.current = now;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const now = Date.now();
        const deltaTime = now - lastMouseTime.current;
        
        const newX = touch.clientX;
        const newY = size.height - touch.clientY;
        
        if (deltaTime > 0) {
          velocityRef.current.x = (newX - targetMouse.x) / deltaTime;
          velocityRef.current.y = (newY - targetMouse.y) / deltaTime;
        }
        
        targetMouse.x = newX;
        targetMouse.y = newY;
        lastMouseTime.current = now;
      }
    };

    // Smooth easing animation
    const animate = () => {
      const ease = 0.08;
      currentMouse.x += (targetMouse.x - currentMouse.x) * ease;
      currentMouse.y += (targetMouse.y - currentMouse.y) * ease;
      
      uniforms.u_cursor.value.set(currentMouse.x, currentMouse.y);
      uniforms.u_cursorVelocity.value.set(velocityRef.current.x, velocityRef.current.y);
      
      // Decay velocity
      velocityRef.current.x *= 0.95;
      velocityRef.current.y *= 0.95;
      
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [uniforms, size]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.u_time.value = state.clock.getElapsedTime();
      // Add breathing effect
      uniforms.u_breathe.value = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        vertexShader={symphonyShader.vertexShader}
        fragmentShader={symphonyShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
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
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
        dpr={Math.min(2, window.devicePixelRatio)}
      >
        <SymphonyFabricMesh {...props} />
      </Canvas>
    </div>
  );
}