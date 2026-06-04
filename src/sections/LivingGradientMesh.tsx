import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_dark;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float t = u_time * 0.05;
  float isDark = u_dark;

  float n1 = snoise(uv * 1.5 + vec2(t * 1.2, t * 0.8));
  float n2 = snoise(uv * 2.5 - vec2(t * 0.5, t * 1.1));

  vec2 p1 = vec2(0.5 + sin(t*0.7)*0.2 + u_mouse.x*0.1, 0.5 + cos(t*0.5)*0.15 + u_mouse.y*0.1);
  vec2 p2 = vec2(0.3 + cos(t*0.6)*0.2, 0.7 + sin(t*0.9)*0.15);
  vec2 p3 = vec2(0.7 + sin(t*0.8)*0.15, 0.3 + cos(t*0.4)*0.2);

  float d1 = length(uv - p1) * (1.0 + n1 * 0.2);
  float d2 = length(uv - p2) * (1.0 + n2 * 0.2);
  float d3 = length(uv - p3) * (1.0 + (n1+n2)*0.1);

  // Light colors
  vec3 lc1 = vec3(0.85, 0.88, 0.92);
  vec3 lc2 = vec3(0.95, 0.95, 0.97);
  vec3 lc3 = vec3(0.75, 0.82, 0.88);
  vec3 lc4 = vec3(0.98, 0.98, 0.98);

  // Dark colors
  vec3 dc1 = vec3(0.06, 0.07, 0.10);
  vec3 dc2 = vec3(0.04, 0.04, 0.06);
  vec3 dc3 = vec3(0.08, 0.09, 0.14);
  vec3 dc4 = vec3(0.12, 0.13, 0.18);

  vec3 c1 = mix(lc1, dc1, isDark);
  vec3 c2 = mix(lc2, dc2, isDark);
  vec3 c3 = mix(lc3, dc3, isDark);
  vec3 c4 = mix(lc4, dc4, isDark);

  float s1 = smoothstep(0.6, 0.0, d1);
  float s2 = smoothstep(0.5, 0.0, d2);
  float s3 = smoothstep(0.4, 0.0, d3);

  vec3 col = mix(c2, c1, s1);
  col = mix(col, c3, s2);
  col = mix(col, c4, s3);

  float aberration = 0.003;
  float r = snoise(vec2(uv.x + aberration, uv.y) * 3.0 + t);
  float g_val = snoise(uv * 3.0 + t);
  float b = snoise(vec2(uv.x - aberration, uv.y) * 3.0 + t);

  col += vec3(r, g_val, b) * 0.04 * (1.0 - isDark * 0.5);

  gl_FragColor = vec4(col, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_dark: { value: 0.0 },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = state.clock.elapsedTime;

    // Check dark mode
    const isDark = document.documentElement.classList.contains("dark");
    const targetDark = isDark ? 1.0 : 0.0;
    mat.uniforms.u_dark.value += (targetDark - mat.uniforms.u_dark.value) * 0.03;

    const tx = (state.pointer.x + 1) * 0.5;
    const ty = (state.pointer.y + 1) * 0.5;
    mouseRef.current.x += (tx - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (ty - mouseRef.current.y) * 0.05;
    mat.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function LivingGradientMesh() {
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1], near: 0, far: 1 }}
        gl={{ antialias: false, alpha: true }}
        style={{ width: "100%", height: "100%" }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
