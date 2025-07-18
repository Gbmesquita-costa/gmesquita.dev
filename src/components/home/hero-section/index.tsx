"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

import { SocialLinks } from "../../social-links";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.z = 60;

    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(luzAmbiente);

    const pontoLuz1 = new THREE.PointLight(0x4ade80, 1.5, 100);

    pontoLuz1.position.set(20, 20, 20);
    scene.add(pontoLuz1);

    const pontoLuz2 = new THREE.PointLight(0x22d3ee, 1.5, 100);

    pontoLuz2.position.set(-20, -20, 20);
    scene.add(pontoLuz2);

    const techElements = new THREE.Group();

    const triangleGeometry = new THREE.ConeGeometry(3, 6, 3);
    const triangleMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x4ade80,
      emissiveIntensity: 0.8,
      wireframe: true,
    });

    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);

    triangle.position.set(-20, 15, 0);
    techElements.add(triangle);

    const atomGroup = new THREE.Group();

    const nucleusGeometry = new THREE.SphereGeometry(2, 16, 16);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.5,
    });

    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleus);

    for (let i = 0; i < 3; i++) {
      const orbitRadius = 6 + i * 2;

      const orbitGeometry = new THREE.TorusGeometry(orbitRadius, 0.1, 16, 100);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        opacity: 0.5,
        transparent: true,
      });

      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);

      orbit.rotation.x = Math.random() * Math.PI;
      orbit.rotation.y = Math.random() * Math.PI;

      atomGroup.add(orbit);

      const electronGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const electronMaterial = new THREE.MeshPhongMaterial({
        color: 0x22d3ee,
        emissive: 0x22d3ee,
        emissiveIntensity: 1.0,
      });

      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electron.userData = {
        orbitRadius,
        angle: Math.random() * Math.PI * 2,
        orbit,
      };
      atomGroup.add(electron);
    }

    atomGroup.position.set(20, -10, 0);
    techElements.add(atomGroup);

    const codeBlocks: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const size = Math.random() * 2 + 1;

      const geometry = new THREE.BoxGeometry(size, size * 1.5, size * 0.3);
      const material = new THREE.MeshPhongMaterial({
        color: 0x4ade80,
        emissive: 0x4ade80,
        emissiveIntensity: 0.3,
        opacity: 0.6,
        transparent: true,
      });

      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      cube.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };

      codeBlocks.push(cube);
      techElements.add(cube);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      const color =
        Math.random() > 0.5
          ? new THREE.Color(0x4ade80)
          : new THREE.Color(0x22d3ee);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);

    scene.add(particles);
    scene.add(techElements);

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      techElements.rotation.y = mouseRef.current.x * 0.2;
      techElements.rotation.x = mouseRef.current.y * 0.1;

      triangle.rotation.y += 0.01;
      triangle.position.y = Math.sin(elapsedTime) * 2 + 15;

      atomGroup.rotation.y += 0.005;
      atomGroup.rotation.x += 0.003;

      atomGroup.children.forEach((child) => {
        if (child.userData.orbitRadius) {
          child.userData.angle += 0.02;
          child.position.x =
            Math.cos(child.userData.angle) * child.userData.orbitRadius;
          child.position.z =
            Math.sin(child.userData.angle) * child.userData.orbitRadius;
          child.position.y = Math.sin(child.userData.angle * 2) * 2;
        }
      });

      codeBlocks.forEach((block) => {
        block.rotation.x += block.userData.rotationSpeed.x;
        block.rotation.y += block.userData.rotationSpeed.y;
        block.rotation.z += block.userData.rotationSpeed.z;

        block.position.y +=
          Math.sin(
            elapsedTime * block.userData.floatSpeed + block.userData.floatOffset
          ) * 0.02;
      });

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background relative">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full 
        h-full z-0 opacity-70 md:opacity-100"
      />

      <div
        className="fixed top-0 left-0 w-full 
        h-full bg-background/50 z-[1]"
      />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="min-h-[80vh] flex flex-col justify-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Gabriel Mesquita</span>
              </h1>

              <div className="mb-8">
                <p className="text-2xl text-muted-foreground mb-3">
                  Desenvolvedor -{" "}
                  <span className="text-green-400 font-semibold underline">
                    Full Stack
                  </span>
                </p>
                <p className="text-xl text-muted-foreground">
                  Criando experiências web escaláveis e intuitivas
                </p>
              </div>

              <div className="mb-16">
                <div
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-command-palette")
                    )
                  }
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: `flex items-center cursor-pointer
                        text-muted-foreground max-w-[270px] h-12 text-base`,
                      size: "lg",
                    })
                  )}
                >
                  <span>Pressione</span>
                  <kbd
                    className="inline-flex h-6 select-none items-center gap-1 
                    rounded border bg-muted px-2 font-mono text-xs 
                    font-medium text-muted-foreground"
                  >
                    <span className="text-sm">ctrl</span>K
                  </kbd>
                  <span>para começar</span>
                </div>
              </div>

              <SocialLinks />
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 h-px 
        bg-gradient-to-r from-transparent via-green-400/20 
        to-transparent z-50"
      />
    </main>
  );
};

export { HeroSection };
