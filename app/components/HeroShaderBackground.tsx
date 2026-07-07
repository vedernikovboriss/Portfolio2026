"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uBaseColor;
  varying vec2 vUv;

  float metaball(vec2 p, vec2 center, float radius) {
    vec2 d = p - center;
    float dist2 = dot(d, d) + 0.0008;
    return (radius * radius) / dist2;
  }

  vec2 orbit(float t, vec2 origin, vec2 amp, vec2 freq, float phase) {
    return origin + vec2(
      sin(t * freq.x + phase) * amp.x + cos(t * freq.y * 0.7 + phase * 1.3) * amp.x * 0.35,
      cos(t * freq.y + phase * 0.8) * amp.y + sin(t * freq.x * 0.6 + phase) * amp.y * 0.35
    );
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    float t = uTime;

    float field = 0.0;

    // 8 drifting bubbles with pulsing radii
    field += metaball(p, orbit(t, vec2(-0.55, 0.25), vec2(0.42, 0.28), vec2(0.55, 0.48), 0.0),   0.11 + sin(t * 0.9) * 0.025);
    field += metaball(p, orbit(t, vec2(0.45, 0.35),  vec2(0.38, 0.32), vec2(0.62, 0.41), 1.7),  0.13 + sin(t * 1.1 + 1.0) * 0.03);
    field += metaball(p, orbit(t, vec2(0.05, -0.15), vec2(0.5, 0.36),  vec2(0.47, 0.53), 3.1),  0.12 + sin(t * 0.85 + 2.0) * 0.028);
    field += metaball(p, orbit(t, vec2(-0.2, -0.45), vec2(0.44, 0.3),  vec2(0.51, 0.44), 4.8),  0.1  + sin(t * 1.05 + 0.5) * 0.022);
    field += metaball(p, orbit(t, vec2(0.65, -0.2),  vec2(0.36, 0.4),  vec2(0.58, 0.37), 2.3),  0.09 + sin(t * 1.2 + 1.8) * 0.02);
    field += metaball(p, orbit(t, vec2(-0.35, 0.55), vec2(0.33, 0.38), vec2(0.43, 0.56), 5.5),  0.1  + sin(t * 0.95 + 2.7) * 0.024);
    field += metaball(p, orbit(t, vec2(0.25, 0.05),  vec2(0.4, 0.42),  vec2(0.66, 0.49), 6.2),  0.11 + sin(t * 1.15 + 3.4) * 0.026);
    field += metaball(p, orbit(t, vec2(-0.05, 0.6),  vec2(0.37, 0.34), vec2(0.52, 0.61), 7.9),  0.08 + sin(t * 0.88 + 4.1) * 0.018);
    field += metaball(p, orbit(t, vec2(-0.035, 0.6),  vec2(0.237, 0.344), vec2(0.522, 0.611), 7.9),  0.12 + cos(t * 0.88 + 4.1) * 0.018);

    float body = smoothstep(0.55, 1.35, field);
    float rim  = smoothstep(1.05, 1.55, field) - smoothstep(1.55, 2.4, field);

    float glow = body * 0.11 + rim * 0.06;
    vec3 color = uBaseColor + vec3(0.4) * glow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function readHeroBackgroundColor(): THREE.Color {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--hero-background")
    .trim();

  return new THREE.Color(raw || "#161616");
}

export default function HeroShaderBackground({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let disposed = false;
    let visible = true;
    let lastFrame = 0;
    const targetFps = motionQuery.matches ? 15 : 30;
    const frameInterval = 1000 / targetFps;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBaseColor: { value: new THREE.Vector3() },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const syncHeroBackgroundColor = () => {
      const color = readHeroBackgroundColor();
      uniforms.uBaseColor.value.set(color.r, color.g, color.b);
      renderer.setClearColor(color, 1);
    };

    syncHeroBackgroundColor();

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight, false);
      uniforms.uResolution.value.set(clientWidth, clientHeight);
    };

    const render = (time: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(render);

      if (!visible || document.hidden) return;
      if (time - lastFrame < frameInterval) return;
      lastFrame = time;

      const speed = motionQuery.matches ? 0.25 : 1.0;
      uniforms.uTime.value = time * 0.001 * speed;
      renderer.render(scene, camera);
    };

    resize();
    raf = requestAnimationFrame(render);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(container);

    const onVisibilityChange = () => {
      if (!document.hidden) lastFrame = 0;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? "-z-10"}`}
    />
  );
}
