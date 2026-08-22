import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const HeroCanvas3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || 500;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Warm Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffaed, 2.2);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x164332, 0.9);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    const greenFillLight = new THREE.PointLight(0x2D7A5C, 1.8, 10);
    greenFillLight.position.set(-2, 3, 2);
    scene.add(greenFillLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();

    // 1. Center Hero: Lock-Fold Kraft Takeaway Box (Using Real Texture)
    const boxGroup = new THREE.Group();
    rootGroup.add(boxGroup);

    textureLoader.load('/images/products/kraft-boxes.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const boxCardGeo = new THREE.PlaneGeometry(1.9, 1.9);
      const boxCardMat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        roughness: 0.8,
        metalness: 0.05,
      });
      const boxMesh = new THREE.Mesh(boxCardGeo, boxCardMat);
      boxMesh.castShadow = true;
      boxGroup.add(boxMesh);
    });

    boxGroup.position.set(0.7, -0.15, 0.4);
    boxGroup.rotation.set(0.08, -0.2, 0.05);

    // 2. Paper Bottle with Real Tripo3D GLB Model
    const bottleGroup = new THREE.Group();
    rootGroup.add(bottleGroup);

    gltfLoader.load('/models/paper-bottle.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / (maxDim || 1);
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      bottleGroup.add(model);
    });

    bottleGroup.position.set(-1.4, 0.2, -0.2);
    bottleGroup.rotation.set(-0.08, 0.2, -0.1);

    // 3. Kraft Bowl / Plates
    const bowlGroup = new THREE.Group();
    rootGroup.add(bowlGroup);

    textureLoader.load('/images/products/kraft-bowls.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const bowlCardGeo = new THREE.PlaneGeometry(1.6, 1.6);
      const bowlCardMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.8,
        metalness: 0.05,
      });
      const bowlMesh = new THREE.Mesh(bowlCardGeo, bowlCardMat);
      bowlMesh.castShadow = true;
      bowlGroup.add(bowlMesh);
    });

    bowlGroup.position.set(2.0, 0.8, -1.0);
    bowlGroup.rotation.set(0.2, -0.15, 0.1);

    // 4. Floating Honeycomb Sheets & Origami Elements
    const floatingSheets: THREE.Mesh[] = [];
    const sheetGeo = new THREE.BoxGeometry(0.5, 0.02, 0.7);
    const kraftMat = new THREE.MeshStandardMaterial({ color: 0xC29B6C, roughness: 0.85 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x164332, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, roughness: 0.3, metalness: 0.5 });

    for (let i = 0; i < 6; i++) {
      const mat = i % 2 === 0 ? kraftMat : (i % 3 === 0 ? greenMat : goldMat);
      const sheet = new THREE.Mesh(sheetGeo, mat);
      sheet.position.set(
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.0
      );
      sheet.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      rootGroup.add(sheet);
      floatingSheets.push(sheet);
    }

    // 5. Eco Floating Fibers
    const particleCount = 35;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 9;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xC29B6C,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating physics
      boxGroup.position.y = -0.15 + Math.sin(elapsedTime * 1.1) * 0.08;
      boxGroup.rotation.y = -0.2 + Math.sin(elapsedTime * 0.7) * 0.05;

      bottleGroup.position.y = 0.2 + Math.cos(elapsedTime * 1.0) * 0.09;
      bottleGroup.rotation.z = -0.1 + Math.cos(elapsedTime * 0.8) * 0.04;

      bowlGroup.position.y = 0.8 + Math.sin(elapsedTime * 1.3 + 1.0) * 0.07;
      bowlGroup.rotation.y = -0.15 + Math.sin(elapsedTime * 0.9) * 0.05;

      // Floating paper sheets
      floatingSheets.forEach((sheet, idx) => {
        sheet.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
        sheet.rotation.y += 0.004 * (idx % 3 === 0 ? 1 : -1);
        sheet.position.y += Math.sin(elapsedTime * 1.4 + idx) * 0.002;
      });

      // Smooth camera / root parallax
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] lg:min-h-[520px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive Packaging Scene with Official Products"
    />
  );
};
