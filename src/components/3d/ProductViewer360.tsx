import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  RotateCw, ZoomIn, ZoomOut, Play, Pause, Box, Eye, Sparkles, 
  Layers, Sun, Compass, CheckCircle2 
} from 'lucide-react';
import { Product, ProductVariant } from '../../types/catalog';

interface ProductViewer360Props {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

export const ProductViewer360: React.FC<ProductViewer360Props> = ({ product, selectedVariant }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [activeAngleName, setActiveAngleName] = useState('Isometric');
  const [isDragging, setIsDragging] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(45);

  // References for Three.js control
  const modelRootGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting setup
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.6);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xedf6f2, 1.6);
    fillLight.position.set(-5, 4, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x164332, 1.2);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Ground Turntable Platform
    const platformGroup = new THREE.Group();
    scene.add(platformGroup);

    const stageGeo = new THREE.CylinderGeometry(1.7, 1.75, 0.08, 64);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0xF5F0E6,
      roughness: 0.7,
      metalness: 0.05,
    });
    const stage = new THREE.Mesh(stageGeo, stageMat);
    stage.position.y = -1.25;
    stage.receiveShadow = true;
    platformGroup.add(stage);

    const stageRingGeo = new THREE.TorusGeometry(1.72, 0.02, 16, 64);
    const stageRingMat = new THREE.MeshStandardMaterial({ color: 0x164332, roughness: 0.3, metalness: 0.5 });
    const stageRing = new THREE.Mesh(stageRingGeo, stageRingMat);
    stageRing.rotation.x = Math.PI / 2;
    stageRing.position.y = -1.21;
    platformGroup.add(stageRing);

    // Soft Shadow receiver
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.29;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 3D Volumetric Model Root Group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    modelRootGroupRef.current = modelRoot;
    materialsRef.current = [];

    const textureLoader = new THREE.TextureLoader();

    // Natural Kraft & Paper Materials
    const kraftMainMat = new THREE.MeshStandardMaterial({
      color: 0xC49B6C,
      roughness: 0.82,
      metalness: 0.04,
      wireframe: false,
    });
    materialsRef.current.push(kraftMainMat);

    const kraftDarkMat = new THREE.MeshStandardMaterial({
      color: 0x996B3E,
      roughness: 0.88,
      metalness: 0.03,
      wireframe: false,
    });
    materialsRef.current.push(kraftDarkMat);

    const kraftLightMat = new THREE.MeshStandardMaterial({
      color: 0xDBC19F,
      roughness: 0.8,
      metalness: 0.02,
      wireframe: false,
    });
    materialsRef.current.push(kraftLightMat);

    const whiteTissueMat = new THREE.MeshStandardMaterial({
      color: 0xFAFAFA,
      roughness: 0.95,
      metalness: 0.0,
      wireframe: false,
    });
    materialsRef.current.push(whiteTissueMat);

    const woodCapMat = new THREE.MeshStandardMaterial({
      color: 0xB88B58,
      roughness: 0.65,
      metalness: 0.1,
      wireframe: false,
    });
    materialsRef.current.push(woodCapMat);

    const cat = product.categoryId;

    // ==========================================
    // 1. TRUE 3D VOLUMETRIC MODEL: PAPER BOTTLE (Tripo3D Official Model)
    // ==========================================
    if (cat === 'paper-bottles') {
      const bottleGroup = new THREE.Group();
      modelRoot.add(bottleGroup);

      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/models/paper-bottle.glb',
        (gltf) => {
          const model = gltf.scene;

          // Compute bounding box to auto-center & scale model
          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          const maxDim = Math.max(size.x, size.y, size.z);
          const targetHeight = 2.4;
          const scale = targetHeight / (maxDim || 1);
          model.scale.setScalar(scale);

          // Center horizontally and rest on platform base
          model.position.x = -center.x * scale;
          model.position.z = -center.z * scale;
          model.position.y = -box.min.y * scale - 1.22;

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((m) => materialsRef.current.push(m));
                } else {
                  materialsRef.current.push(mesh.material);
                }
              }
            }
          });

          bottleGroup.add(model);
        },
        undefined,
        (error) => {
          console.warn('GLB fallback to procedural model:', error);
          // Fallback procedural bottle
          const bodyGeo = new THREE.CylinderGeometry(0.62, 0.65, 1.5, 48);
          const body = new THREE.Mesh(bodyGeo, kraftMainMat);
          body.position.y = -0.2;
          body.castShadow = true;
          bottleGroup.add(body);
        }
      );
    }

    // ==========================================
    // 2. TRUE 3D VOLUMETRIC MODEL: PAPER PLATES STACK
    // ==========================================
    else if (cat === 'paper-plates') {
      const plateStack = new THREE.Group();
      const plateCount = 14;

      for (let i = 0; i < plateCount; i++) {
        const singlePlate = new THREE.Group();
        const yOffset = (i - plateCount / 2) * 0.05;

        // Plate Basin (recessed center)
        const basinGeo = new THREE.CylinderGeometry(1.25, 0.95, 0.06, 48);
        const basin = new THREE.Mesh(basinGeo, kraftMainMat);
        basin.castShadow = true;
        basin.receiveShadow = true;
        singlePlate.add(basin);

        // Fluted Rim Lip
        const rimGeo = new THREE.TorusGeometry(1.22, 0.06, 16, 48);
        const rim = new THREE.Mesh(rimGeo, kraftLightMat);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.03;
        singlePlate.add(rim);

        // Inner Embossed Ribbing Rings
        const innerRingGeo = new THREE.TorusGeometry(0.7, 0.02, 12, 48);
        const innerRing = new THREE.Mesh(innerRingGeo, kraftDarkMat);
        innerRing.rotation.x = Math.PI / 2;
        innerRing.position.y = 0.032;
        singlePlate.add(innerRing);

        singlePlate.position.y = yOffset;
        plateStack.add(singlePlate);
      }

      // Front Face Texture Overlay on top plate
      textureLoader.load(product.imageUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const topTextureGeo = new THREE.CircleGeometry(1.18, 48);
        const topTextureMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.8,
          metalness: 0.05,
          side: THREE.DoubleSide,
        });
        materialsRef.current.push(topTextureMat);
        const topDisc = new THREE.Mesh(topTextureGeo, topTextureMat);
        topDisc.rotation.x = -Math.PI / 2;
        topDisc.position.y = (plateCount / 2) * 0.05 + 0.035;
        plateStack.add(topDisc);
      });

      plateStack.rotation.x = 0.35;
      modelRoot.add(plateStack);
    }

    // ==========================================
    // 3. TRUE 3D VOLUMETRIC MODEL: KRAFT BOWLS
    // ==========================================
    else if (cat === 'kraft-bowls') {
      const bowlGroup = new THREE.Group();

      // Outer Bowl Body (Double-walled tapered cylinder)
      const outerBodyGeo = new THREE.CylinderGeometry(1.3, 0.9, 0.9, 48, 1, true);
      const outerBody = new THREE.Mesh(outerBodyGeo, kraftMainMat);
      outerBody.castShadow = true;
      outerBody.receiveShadow = true;
      bowlGroup.add(outerBody);

      // Inner Cavity Wall
      const innerBodyGeo = new THREE.CylinderGeometry(1.24, 0.86, 0.86, 48, 1, true);
      const innerBodyMat = new THREE.MeshStandardMaterial({
        color: 0xDBC19F,
        roughness: 0.85,
        side: THREE.BackSide,
      });
      const innerBody = new THREE.Mesh(innerBodyGeo, innerBodyMat);
      innerBody.position.y = 0.02;
      bowlGroup.add(innerBody);

      // Rolled Rim Lip
      const rimGeo = new THREE.TorusGeometry(1.27, 0.05, 16, 48);
      const rim = new THREE.Mesh(rimGeo, kraftDarkMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.45;
      bowlGroup.add(rim);

      // Bottom Base Cap
      const baseGeo = new THREE.CircleGeometry(0.9, 48);
      const base = new THREE.Mesh(baseGeo, kraftDarkMat);
      base.rotation.x = Math.PI / 2;
      base.position.y = -0.45;
      bowlGroup.add(base);

      // Inner Soup/Meal surface fill with real texture from user photo
      textureLoader.load(product.imageUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const innerFillGeo = new THREE.CircleGeometry(1.15, 48);
        const fillMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.5,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        materialsRef.current.push(fillMat);
        const innerFill = new THREE.Mesh(innerFillGeo, fillMat);
        innerFill.rotation.x = -Math.PI / 2;
        innerFill.position.y = 0.25;
        bowlGroup.add(innerFill);
      });

      bowlGroup.rotation.x = 0.28;
      modelRoot.add(bowlGroup);
    }

    // ==========================================
    // 4. TRUE 3D VOLUMETRIC MODEL: KRAFT FOOD BOXES
    // ==========================================
    else if (cat === 'kraft-boxes') {
      const boxGroup = new THREE.Group();

      // Main Tapered Takeaway Container Box
      const boxWidth = 1.9;
      const boxDepth = 1.4;
      const boxHeight = 1.1;

      // Base Box Body
      const boxGeo = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      const boxMesh = new THREE.Mesh(boxGeo, kraftMainMat);
      boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      boxGroup.add(boxMesh);

      // Four-Flap Folded Top Lid
      const lidTopGeo = new THREE.BoxGeometry(boxWidth + 0.08, 0.12, boxDepth + 0.08);
      const lidTop = new THREE.Mesh(lidTopGeo, kraftDarkMat);
      lidTop.position.y = boxHeight / 2 + 0.06;
      lidTop.castShadow = true;
      boxGroup.add(lidTop);

      // Front Tab Lock Closure
      const tabGeo = new THREE.BoxGeometry(0.4, 0.18, 0.04);
      const tab = new THREE.Mesh(tabGeo, kraftLightMat);
      tab.position.set(0, boxHeight / 2 + 0.02, boxDepth / 2 + 0.05);
      boxGroup.add(tab);

      // Side Interlocking Wings
      const wingGeo = new THREE.BoxGeometry(0.04, 0.35, 0.45);
      const leftWing = new THREE.Mesh(wingGeo, kraftDarkMat);
      leftWing.position.set(-boxWidth / 2 - 0.02, 0.1, 0);
      boxGroup.add(leftWing);

      const rightWing = new THREE.Mesh(wingGeo, kraftDarkMat);
      rightWing.position.set(boxWidth / 2 + 0.02, 0.1, 0);
      boxGroup.add(rightWing);

      // Real graphic mapping on front face
      textureLoader.load(product.imageUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const frontDecalGeo = new THREE.PlaneGeometry(boxWidth * 0.95, boxHeight * 0.9);
        const decalMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.8,
          metalness: 0.05,
          side: THREE.FrontSide,
        });
        materialsRef.current.push(decalMat);
        const decal = new THREE.Mesh(frontDecalGeo, decalMat);
        decal.position.set(0, 0, boxDepth / 2 + 0.01);
        boxGroup.add(decal);
      });

      boxGroup.rotation.set(0.2, -0.35, 0.08);
      modelRoot.add(boxGroup);
    }

    // ==========================================
    // 5. TRUE 3D VOLUMETRIC MODEL: TABLE NAPKINS STACK
    // ==========================================
    else if (cat === 'napkins-tissue') {
      const napkinGroup = new THREE.Group();

      // Main Thick Volumetric Stack of Napkins
      const stackWidth = 1.6;
      const stackDepth = 1.6;
      const stackHeight = 1.1;

      const stackGeo = new THREE.BoxGeometry(stackWidth, stackHeight, stackDepth, 16, 16, 16);
      const stackMesh = new THREE.Mesh(stackGeo, whiteTissueMat);
      stackMesh.castShadow = true;
      stackMesh.receiveShadow = true;
      napkinGroup.add(stackMesh);

      // Embossed Layered Sheet Edges (Creased Lines)
      const edgeRingGeo = new THREE.BoxGeometry(stackWidth + 0.02, stackHeight * 0.98, stackDepth + 0.02);
      const edgeRingMat = new THREE.MeshStandardMaterial({
        color: 0xECE8E2,
        roughness: 0.9,
        wireframe: false,
      });
      const edgeRing = new THREE.Mesh(edgeRingGeo, edgeRingMat);
      napkinGroup.add(edgeRing);

      // Loose quarter-fold top napkin lying slightly offset
      const looseNapkinGeo = new THREE.BoxGeometry(stackWidth * 0.8, 0.04, stackDepth * 0.8);
      const looseNapkin = new THREE.Mesh(looseNapkinGeo, whiteTissueMat);
      looseNapkin.position.set(0.12, stackHeight / 2 + 0.03, 0.12);
      looseNapkin.rotation.y = 0.15;
      looseNapkin.castShadow = true;
      napkinGroup.add(looseNapkin);

      // Top Face Real Texture Overlay
      textureLoader.load(product.imageUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const topFaceGeo = new THREE.PlaneGeometry(stackWidth * 0.96, stackDepth * 0.96);
        const topMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.95,
          side: THREE.DoubleSide,
        });
        materialsRef.current.push(topMat);
        const topPlane = new THREE.Mesh(topFaceGeo, topMat);
        topPlane.rotation.x = -Math.PI / 2;
        topPlane.position.y = stackHeight / 2 + 0.01;
        napkinGroup.add(topPlane);
      });

      napkinGroup.rotation.set(0.35, -0.3, 0.1);
      modelRoot.add(napkinGroup);
    }

    // ==========================================
    // 6. TRUE 3D VOLUMETRIC MODEL: HONEYCOMB ROLL
    // ==========================================
    else {
      const rollGroup = new THREE.Group();

      // Outer Rolled Paper Cylinder
      const rollRadius = 0.65;
      const rollHeight = 1.9;

      const rollGeo = new THREE.CylinderGeometry(rollRadius, rollRadius, rollHeight, 48);
      const rollMesh = new THREE.Mesh(rollGeo, kraftMainMat);
      rollMesh.castShadow = true;
      rollMesh.receiveShadow = true;
      rollGroup.add(rollMesh);

      // Hollow Inner Core Tube
      const coreGeo = new THREE.CylinderGeometry(0.22, 0.22, rollHeight + 0.04, 32);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x5C3E1F, roughness: 0.9 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      rollGroup.add(coreMesh);

      // Unrolled Extruded Honeycomb Mesh Sheet
      const meshWidth = 1.4;
      const meshLength = 1.4;
      const meshGeo = new THREE.PlaneGeometry(meshWidth, meshLength, 12, 12);
      
      // Give the unrolled sheet natural undulating wave curves
      const pos = meshGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        pos.setZ(i, Math.sin(u * 3) * 0.08 + Math.cos(v * 2) * 0.05);
      }
      meshGeo.computeVertexNormals();

      textureLoader.load(product.imageUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        const meshMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.85,
          side: THREE.DoubleSide,
        });
        materialsRef.current.push(meshMat);
        const meshSheet = new THREE.Mesh(meshGeo, meshMat);
        meshSheet.rotation.x = Math.PI / 2;
        meshSheet.position.set(0.8, -0.6, 0.5);
        rollGroup.add(meshSheet);
      });

      rollGroup.rotation.set(0.25, 0.4, 0.35);
      modelRoot.add(rollGroup);
    }

    // Drag / Orbit Interaction Controls
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !modelRootGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      modelRootGroupRef.current.rotation.y += deltaX * 0.012;
      modelRootGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, modelRootGroupRef.current.rotation.x + deltaY * 0.007));

      const deg = Math.round(((modelRootGroupRef.current.rotation.y * (180 / Math.PI)) % 360 + 360) % 360);
      setRotationDegrees(deg);

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isMouseDown = true;
        setIsDragging(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isMouseDown || !modelRootGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      modelRootGroupRef.current.rotation.y += deltaX * 0.014;
      modelRootGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, modelRootGroupRef.current.rotation.x + deltaY * 0.008));

      const deg = Math.round(((modelRootGroupRef.current.rotation.y * (180 / Math.PI)) % 360 + 360) % 360);
      setRotationDegrees(deg);

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotateRef.current && !isMouseDown && modelRootGroupRef.current) {
        modelRootGroupRef.current.rotation.y += 0.008;
        const deg = Math.round(((modelRootGroupRef.current.rotation.y * (180 / Math.PI)) % 360 + 360) % 360);
        setRotationDegrees(deg);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [product.categoryId]);

  // Toggle wireframe mode
  const toggleWireframe = () => {
    setWireframe(!wireframe);
    materialsRef.current.forEach((mat: any) => {
      if (mat) mat.wireframe = !wireframe;
    });
  };

  // Adjust zoom
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const step = 0.4;
    if (direction === 'in' && cameraRef.current.position.z > 2.2) {
      cameraRef.current.position.z -= step;
    } else if (direction === 'out' && cameraRef.current.position.z < 6.0) {
      cameraRef.current.position.z += step;
    }
  };

  // Set Angle preset
  const setAngle = (deg: number, name: string) => {
    if (!modelRootGroupRef.current) return;
    setAutoRotate(false);
    setActiveAngleName(name);
    modelRootGroupRef.current.rotation.y = (deg * Math.PI) / 180;
    modelRootGroupRef.current.rotation.x = name === 'Top View' ? 0.8 : (name === 'Front' ? 0.0 : 0.25);
    setRotationDegrees(deg);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-wink-ivory-200/90 to-wink-sand-light/50 rounded-2xl overflow-hidden border border-wink-kraft-light/30 shadow-inner">
      
      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-wink-green-deep text-wink-ivory shadow-sm">
          <Box className="w-3.5 h-3.5 text-wink-green-accent" />
          3D Volumetric Model
        </span>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/80 text-wink-charcoal-muted backdrop-blur border border-wink-kraft-light/20">
          {rotationDegrees}°
        </span>
      </div>

      {/* Top Right Controls: Wireframe & Inspect mode */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur p-1 rounded-xl border border-wink-kraft-light/30 shadow-sm">
        <button
          onClick={toggleWireframe}
          title="Toggle 3D Wireframe Polygons"
          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
            wireframe
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-wink-charcoal-muted hover:text-wink-green'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>{wireframe ? 'Shaded View' : '3D Wireframe'}</span>
        </button>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate your WINKSPLIT 3D packaging model in full 360°"
      />

      {/* Angle Quick Buttons & Controls Toolbar */}
      <div className="absolute bottom-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-wink-kraft-light/30 shadow-md">
        {/* Angle Presets */}
        <div className="flex items-center gap-1">
          {[
            { label: 'Front', deg: 0 },
            { label: 'Isometric', deg: 45 },
            { label: 'Side', deg: 90 },
            { label: 'Top View', deg: 180 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setAngle(item.deg, item.label)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                activeAngleName === item.label
                  ? 'bg-wink-green text-white shadow-sm'
                  : 'text-wink-charcoal-muted hover:text-wink-green hover:bg-wink-ivory-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            className={`p-1.5 rounded-lg border transition-colors ${
              autoRotate
                ? 'bg-wink-green-mint text-wink-green border-wink-green/20'
                : 'bg-white text-wink-charcoal-muted border-gray-200 hover:bg-gray-50'
            }`}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => handleZoom('in')}
            title="Zoom In"
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-wink-charcoal-muted hover:text-wink-green hover:bg-gray-50 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            title="Zoom Out"
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-wink-charcoal-muted hover:text-wink-green hover:bg-gray-50 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
