import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import earthMapTexture from "@/assets/globemap.png";

interface CountryPin {
  slug: string;
  name: string;
  flag: string;
  lat: number;
  lon: number;
}

// India Home Hub Precise Coordinates (Placed directly over Taj Mahal / India landmass on globemap.png)
const INDIA_HUB = { lat: 0, lon: 55 };

// 22 Study Destination Countries (Matched 100% to countryData.ts)
const DESTINATION_COUNTRIES: CountryPin[] = [
  { slug: "india", name: "India (Home Hub)", flag: "🇮🇳", lat: INDIA_HUB.lat, lon: INDIA_HUB.lon },
  { slug: "uk", name: "United Kingdom", flag: "🇬🇧", lat: 52.05, lon: -1.62 },
  { slug: "usa", name: "United States", flag: "🇺🇸", lat: 39.67, lon: -98.42 },
  { slug: "canada", name: "Canada", flag: "🇨🇦", lat: 53.27, lon: -104.92 },
  { slug: "australia", name: "Australia", flag: "🇦🇺", lat: -25.06, lon: 133.53 },
  { slug: "new-zealand", name: "New Zealand", flag: "🇳🇿", lat: -40.90, lon: 174.88 },
  { slug: "singapore", name: "Singapore", flag: "🇸🇬", lat: 1.32, lon: 103.90 },
  { slug: "ireland", name: "Ireland", flag: "🇮🇪", lat: 53.07, lon: -7.71 },
  { slug: "france", name: "France", flag: "🇫🇷", lat: 46.17, lon: 2.23 },
  { slug: "germany", name: "Germany", flag: "🇩🇪", lat: 51.44, lon: 10.35 },
  { slug: "uae", name: "UAE (Dubai)", flag: "🇦🇪", lat: 23.42, lon: 53.84 },
  { slug: "switzerland", name: "Switzerland", flag: "🇨🇭", lat: 46.81, lon: 8.22 },
  { slug: "spain", name: "Spain", flag: "🇪🇸", lat: 40.46, lon: -3.74 },
  { slug: "malaysia", name: "Malaysia", flag: "🇲🇾", lat: 4.21, lon: 101.97 },
  { slug: "mauritius", name: "Mauritius", flag: "🇲🇺", lat: -20.34, lon: 57.55 },
  { slug: "netherlands", name: "Netherlands", flag: "🇳🇱", lat: 52.13, lon: 5.29 },
  { slug: "italy", name: "Italy", flag: "🇮🇹", lat: 41.87, lon: 12.56 },
  { slug: "russia", name: "Russia", flag: "🇷🇺", lat: 61.52, lon: 105.31 },
  { slug: "ukraine", name: "Ukraine", flag: "🇺🇦", lat: 48.37, lon: 31.16 },
  { slug: "china", name: "China", flag: "🇨🇳", lat: 35.86, lon: 104.19 },
  { slug: "japan", name: "Japan", flag: "🇯🇵", lat: 36.22, lon: 138.20 },
  { slug: "iran", name: "Iran", flag: "🇮🇷", lat: 32.42, lon: 53.68 },
];

// Direct Flight Paths: ALL planes originate EXCLUSIVELY from India (Home Hub) to every country
const FLIGHT_ROUTES: { from: { lat: number; lon: number }; to: { lat: number; lon: number }; name: string }[] = [
  { from: INDIA_HUB, to: { lat: 52.05, lon: -1.62 }, name: "India -> UK" },
  { from: INDIA_HUB, to: { lat: 39.67, lon: -98.42 }, name: "India -> USA" },
  { from: INDIA_HUB, to: { lat: 53.27, lon: -104.92 }, name: "India -> Canada" },
  { from: INDIA_HUB, to: { lat: -25.06, lon: 133.53 }, name: "India -> Australia" },
  { from: INDIA_HUB, to: { lat: -40.90, lon: 174.88 }, name: "India -> New Zealand" },
  { from: INDIA_HUB, to: { lat: 1.32, lon: 103.90 }, name: "India -> Singapore" },
  { from: INDIA_HUB, to: { lat: 53.07, lon: -7.71 }, name: "India -> Ireland" },
  { from: INDIA_HUB, to: { lat: 46.17, lon: 2.23 }, name: "India -> France" },
  { from: INDIA_HUB, to: { lat: 51.44, lon: 10.35 }, name: "India -> Germany" },
  { from: INDIA_HUB, to: { lat: 23.42, lon: 53.84 }, name: "India -> UAE" },
  { from: INDIA_HUB, to: { lat: 46.81, lon: 8.22 }, name: "India -> Switzerland" },
  { from: INDIA_HUB, to: { lat: 40.46, lon: -3.74 }, name: "India -> Spain" },
  { from: INDIA_HUB, to: { lat: 4.21, lon: 101.97 }, name: "India -> Malaysia" },
  { from: INDIA_HUB, to: { lat: -20.34, lon: 57.55 }, name: "India -> Mauritius" },
  { from: INDIA_HUB, to: { lat: 52.13, lon: 5.29 }, name: "India -> Netherlands" },
  { from: INDIA_HUB, to: { lat: 41.87, lon: 12.56 }, name: "India -> Italy" },
  { from: INDIA_HUB, to: { lat: 61.52, lon: 105.31 }, name: "India -> Russia" },
  { from: INDIA_HUB, to: { lat: 48.37, lon: 31.16 }, name: "India -> Ukraine" },
  { from: INDIA_HUB, to: { lat: 35.86, lon: 104.19 }, name: "India -> China" },
  { from: INDIA_HUB, to: { lat: 36.22, lon: 138.20 }, name: "India -> Japan" },
  { from: INDIA_HUB, to: { lat: 32.42, lon: 53.68 }, name: "India -> Iran" },
  // Additional routes to fill empty directions (south, southwest, west, far east)
  { from: INDIA_HUB, to: { lat: -33.92, lon: 18.42 }, name: "India -> South Africa" },       // far south-southwest
  { from: INDIA_HUB, to: { lat: -1.29, lon: 36.82 }, name: "India -> Kenya" },               // southwest
  { from: INDIA_HUB, to: { lat: 35.91, lon: 127.77 }, name: "India -> South Korea" },        // east
  { from: INDIA_HUB, to: { lat: 15.87, lon: 100.99 }, name: "India -> Thailand" },           // east-southeast
  { from: INDIA_HUB, to: { lat: 26.82, lon: 30.80 }, name: "India -> Egypt" },               // west
  { from: INDIA_HUB, to: { lat: -14.24, lon: -51.93 }, name: "India -> Brazil" },            // far west
];





// 3D Country Name & Flag Badge Pill Sprite
function createCountryLabelSprite(name: string, flag: string, isIndia: boolean): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.shadowColor = isIndia ? "rgba(245, 158, 11, 0.9)" : "rgba(30, 58, 138, 0.9)";
    ctx.shadowBlur = 12;

    // Rounded rectangle pill
    ctx.beginPath();
    ctx.roundRect(12, 12, 360, 72, 36);
    ctx.fillStyle = isIndia ? "rgba(217, 119, 6, 0.95)" : "rgba(30, 58, 138, 0.95)";
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = isIndia ? "#fef3c7" : "#e0f2fe";
    ctx.stroke();

    // Text label
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${flag} ${name}`, 192, 48);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.52, 0.13, 1);
  return sprite;
}

// Helper to convert lat/long to 3D point matching Three.js SphereGeometry mapping
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Spherical Linear Interpolation (SLERP) for 3D vectors to follow Earth curvature
/**
 * Allocation-free slerp: writes into `out` and returns it.
 *
 * The animation loop below calls this 56 times a second-frame (28 flight arcs,
 * twice each). The allocating version underneath created three Vector3 objects
 * per call, which on its own was ~10,000 short-lived objects per second feeding
 * the garbage collector — and GC pauses run on the main thread, the same thread
 * that handles clicks on the header.
 */
function slerpInto(out: THREE.Vector3, v1: THREE.Vector3, v2: THREE.Vector3, t: number): THREE.Vector3 {
  const dot = Math.min(Math.max(v1.dot(v2), -1), 1);
  const omega = Math.acos(dot);
  if (Math.abs(omega) < 0.0001) return out.copy(v1);
  const sinOmega = Math.sin(omega);
  const scale1 = Math.sin((1 - t) * omega) / sinOmega;
  const scale2 = Math.sin(t * omega) / sinOmega;
  out.set(
    v1.x * scale1 + v2.x * scale2,
    v1.y * scale1 + v2.y * scale2,
    v1.z * scale1 + v2.z * scale2
  );
  return out;
}

/** Allocating version. Still used by the one-off geometry build at mount. */
function slerpVectors(v1: THREE.Vector3, v2: THREE.Vector3, t: number): THREE.Vector3 {
  const dot = Math.min(Math.max(v1.dot(v2), -1), 1);
  const omega = Math.acos(dot);
  if (Math.abs(omega) < 0.0001) return v1.clone();
  const sinOmega = Math.sin(omega);
  const scale1 = Math.sin((1 - t) * omega) / sinOmega;
  const scale2 = Math.sin(t * omega) / sinOmega;
  return v1.clone().multiplyScalar(scale1).add(v2.clone().multiplyScalar(scale2));
}

// 3D Mini Graduation Cap Mesh (Scaled to fit land dots & anchored cleanly)
const createMiniGraduationCap = (isIndia: boolean): THREE.Group => {
  const group = new THREE.Group();

  // Mortarboard Top Square Plate
  const plateGeo = new THREE.BoxGeometry(0.14, 0.02, 0.14);
  const plateMat = new THREE.MeshStandardMaterial({
    color: isIndia ? 0xd97706 : 0x1e3a8a, // Amber Gold for India, Royal Navy Blue for others
    roughness: 0.2,
    metalness: 0.4,
  });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  plateMesh.position.y = 0.04;
  group.add(plateMesh);

  // Skull Cap Base
  const skullGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.04, 16);
  const skullMesh = new THREE.Mesh(skullGeo, plateMat);
  skullMesh.position.y = 0.02;
  group.add(skullMesh);

  // Gold Button on Top
  const buttonGeo = new THREE.SphereGeometry(0.012, 8, 8);
  const tasselMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 });
  const buttonMesh = new THREE.Mesh(buttonGeo, tasselMat);
  buttonMesh.position.y = 0.052;
  group.add(buttonMesh);

  // Hanging Tassel String
  const stringGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.07);
  const stringMesh = new THREE.Mesh(stringGeo, tasselMat);
  stringMesh.position.set(0.04, 0.025, 0.04);
  stringMesh.rotation.z = -Math.PI / 4;
  group.add(stringMesh);

  // Tassel Tip Bead
  const tipGeo = new THREE.ConeGeometry(0.009, 0.022, 8);
  const tipMesh = new THREE.Mesh(tipGeo, tasselMat);
  tipMesh.position.set(0.065, 0.008, 0.065);
  group.add(tipMesh);

  return group;
};

// Sleek 3D Commercial Passenger Airliner Mesh with Glowing Jet Engines
const createPassengerAirlinerMesh = (): THREE.Group => {
  const planeGroup = new THREE.Group();

  // White Commercial Airliner Fuselage Body
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.3,
    roughness: 0.2,
  });

  // Main Cylindrical Fuselage
  const fuselageGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.13, 16);
  const fuselageMesh = new THREE.Mesh(fuselageGeo, bodyMat);
  fuselageMesh.rotation.x = Math.PI / 2; // Point nose forward (+Z)
  planeGroup.add(fuselageMesh);

  // Nose Cone (Front)
  const noseGeo = new THREE.SphereGeometry(0.018, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const noseMesh = new THREE.Mesh(noseGeo, bodyMat);
  noseMesh.position.set(0, 0, 0.065);
  planeGroup.add(noseMesh);

  // Glowing Amber Cockpit Windshield
  const cockpitGeo = new THREE.SphereGeometry(0.014, 12, 12, 0, Math.PI, 0, Math.PI / 3);
  const cockpitMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const cockpitMesh = new THREE.Mesh(cockpitGeo, cockpitMat);
  cockpitMesh.position.set(0, 0, 0.055);
  cockpitMesh.rotation.x = -Math.PI / 8;
  planeGroup.add(cockpitMesh);

  // Tail Cone (Rear Taper)
  const tailConeGeo = new THREE.ConeGeometry(0.018, 0.045, 16);
  const tailConeMesh = new THREE.Mesh(tailConeGeo, bodyMat);
  tailConeMesh.rotation.x = -Math.PI / 2;
  tailConeMesh.position.set(0, 0, -0.087);
  planeGroup.add(tailConeMesh);

  // Swept-Back Main Wings (Angled BACKWARDS towards tail >)
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a8a, // Royal Navy Blue Wings
    metalness: 0.5,
    roughness: 0.3,
  });

  const leftWingGeo = new THREE.BoxGeometry(0.09, 0.004, 0.03);
  const leftWing = new THREE.Mesh(leftWingGeo, wingMat);
  leftWing.position.set(0.045, 0, 0.008);
  leftWing.rotation.y = Math.PI / 6; // Swept BACKWARDS towards tail
  planeGroup.add(leftWing);

  const rightWing = new THREE.Mesh(leftWingGeo, wingMat);
  rightWing.position.set(-0.045, 0, 0.008);
  rightWing.rotation.y = -Math.PI / 6; // Swept BACKWARDS towards tail
  planeGroup.add(rightWing);

  // Twin Jet Engines (Mounted under main wings with glowing cyan exhaust nozzles)
  const engineMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.8, roughness: 0.2 });
  const engineGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.03, 12);
  const exhaustMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  const leftEngine = new THREE.Mesh(engineGeo, engineMat);
  leftEngine.rotation.x = Math.PI / 2;
  leftEngine.position.set(0.03, -0.01, 0.01);
  planeGroup.add(leftEngine);

  const leftExhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.005, 12), exhaustMat);
  leftExhaust.rotation.x = Math.PI / 2;
  leftExhaust.position.set(0.03, -0.01, -0.008);
  planeGroup.add(leftExhaust);

  const rightEngine = new THREE.Mesh(engineGeo, engineMat);
  rightEngine.rotation.x = Math.PI / 2;
  rightEngine.position.set(-0.03, -0.01, 0.01);
  planeGroup.add(rightEngine);

  const rightExhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.005, 12), exhaustMat);
  rightExhaust.rotation.x = Math.PI / 2;
  rightExhaust.position.set(-0.03, -0.01, -0.008);
  planeGroup.add(rightExhaust);

  // Vertical Tail Rudder Fin
  const finGeo = new THREE.BoxGeometry(0.004, 0.04, 0.026);
  const finMesh = new THREE.Mesh(finGeo, wingMat);
  finMesh.position.set(0, 0.022, -0.082);
  finMesh.rotation.x = -Math.PI / 6;
  planeGroup.add(finMesh);

  // Horizontal Tail Stabilizers
  const stabGeo = new THREE.BoxGeometry(0.055, 0.003, 0.018);
  const stabMesh = new THREE.Mesh(stabGeo, wingMat);
  stabMesh.position.set(0, 0.005, -0.09);
  planeGroup.add(stabMesh);

  return planeGroup;
};

const HeroGlobe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    /**
     * Everything drawn in this scene fits inside this radius: the globe is 1.9,
     * the tallest flight arc peaks near 2.70, and city labels sit just off the
     * surface. Framing against this number instead of a hard-coded camera
     * distance is what lets the globe fit any container shape.
     */
    const FIT_RADIUS = 2.48;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.3, 6.2);

    // 2. WebGL Renderer (Transparent Background for Free Floating Effect)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    container.appendChild(renderer.domElement);

    /**
     * THE CANVAS MUST NEVER DICTATE LAYOUT.
     *
     * This was the real cause of the broken mobile hero. renderer.setSize(w, h)
     * writes an inline pixel width onto the canvas element. Grid items default
     * to min-width:auto, meaning they refuse to shrink below their content's
     * intrinsic size — so a canvas carrying style="width:702px" forced its grid
     * column to 702px inside a 343px grid. Worse, it fed back on itself: wider
     * column -> ResizeObserver measures a wider container -> setSize writes an
     * even wider canvas -> wider column again. On a 375px phone the hero grid
     * ended up 728px wide, pushing the globe 50px off-centre and stretching the
     * headline and feature cards with it.
     *
     * Fixing it takes two halves, and both are required:
     *   1. Here: the canvas is sized in CSS percentages, so it always fills its
     *      parent and contributes no intrinsic width of its own.
     *   2. In fitToContainer: setSize(w, h, false) — the `false` tells three.js
     *      to resize the drawing buffer WITHOUT touching the element's style.
     */
    const canvasEl = renderer.domElement;
    canvasEl.style.display = "block";
    canvasEl.style.width = "100%";
    canvasEl.style.height = "100%";

    /**
     * Size the canvas and pull the camera back far enough that FIT_RADIUS is
     * visible on BOTH axes.
     *
     * The previous version pinned camera.position.z to 6.2. PerspectiveCamera
     * fov is the VERTICAL field of view, so the horizontal extent is the
     * vertical extent multiplied by the aspect ratio. On a phone the container
     * is taller than it is wide, aspect drops below 1, the horizontal extent
     * shrinks with it — and the globe was being sliced off down both sides.
     * Deriving the distance from whichever axis is tighter fixes every viewport
     * at once rather than patching breakpoints one at a time.
     */
    let lastW = 0;
    let lastH = 0;

    const fitToContainer = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      // Layout may not have settled yet; a zero height would divide by zero.
      if (w === 0 || h === 0) return;
      // Ignore sub-pixel jitter. Without this the ResizeObserver can retrigger
      // itself on rounding noise and spin.
      if (Math.abs(w - lastW) < 1 && Math.abs(h - lastH) < 1) return;
      lastW = w;
      lastH = h;

      const aspect = w / h;
      const vFov = (camera.fov * Math.PI) / 180;
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

      const fitRadiusEffective = w < 640 ? FIT_RADIUS * 1.06 : FIT_RADIUS;

      const distanceForHeight = fitRadiusEffective / Math.tan(vFov / 2);
      const distanceForWidth = fitRadiusEffective / Math.tan(hFov / 2);

      camera.aspect = aspect;
      camera.position.z = Math.max(distanceForHeight, distanceForWidth);
      camera.updateProjectionMatrix();

      // Cap the pixel ratio lower on small screens. A phone GPU rendering this
      // many arcs and sprites at 3x costs far more than the sharpness is worth.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, w < 640 ? 1.5 : 2));
      // `false` = do not write width/height into the element's inline style.
      // See the note above renderer creation — this is half of the layout fix.
      renderer.setSize(w, h, false);
    };

    fitToContainer();

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(5, 4, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xf59e0b, 1.5);
    dirLight3.position.set(0, -4, 4);
    scene.add(dirLight3);

    // 4. Main Earth Sphere using globemap.png Texture
    const globeRadius = 1.9;
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(earthMapTexture);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const sphereGeo = new THREE.SphereGeometry(globeRadius * 0.985, 96, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: texture,
      emissiveMap: texture,
      emissive: new THREE.Color(0x334155),
      emissiveIntensity: 0.4,
      roughness: 0.5,
      metalness: 0.1,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeMesh);



    // 6. Gold Equator Torus Ring
    const torusGeo = new THREE.TorusGeometry(globeRadius * 1.02, 0.008, 12, 128);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 2;
    globeMesh.add(torusMesh);



    // 7. 3D Jumping Graduation Caps on Landmass Locations
    const capsGroup = new THREE.Group();
    const jumpingCapItems: { capMesh: THREE.Group; basePos: THREE.Vector3; normal: THREE.Vector3 }[] = [];
    const pulseRings: { mesh: THREE.Mesh; offset: number }[] = [];

    DESTINATION_COUNTRIES.forEach((c, idx) => {
      const isIndia = c.slug === "india";
      // Anchored closely to landmass surface
      const basePos = latLonToVec3(c.lat, c.lon, globeRadius * 1.002);
      const normal = basePos.clone().normalize();

      const capMesh = createMiniGraduationCap(isIndia);
      capMesh.position.copy(basePos);

      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      capMesh.quaternion.copy(quat);

      capsGroup.add(capMesh);
      jumpingCapItems.push({ capMesh, basePos, normal });



      // Pulsing Ring under every country cap (Origin/Destination pulse)
      const ringGeo = new THREE.RingGeometry(0.03, 0.065, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isIndia ? 0xf59e0b : 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(basePos);
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      capsGroup.add(ringMesh);

      pulseRings.push({ mesh: ringMesh, offset: idx * 0.3 });
    });

    scene.add(capsGroup);

    // 8. Multi-Source Distributed Spherical Flight Arcs & Commercial Jet Airliners
    // ALL flights originate from India (Home Hub) and fan out to each destination
    // Each route has a UNIQUE arc height so parabolas spread distinctly in different directions
    const arcsGroup = new THREE.Group();
    const hCruise = 0.08; // Cruising altitude at takeoff/landing

    // 27 unique arc heights — each flight path gets a distinctly different parabola curvature
    const uniqueArcHeights = [
      0.30, // India -> UK
      0.65, // India -> USA (long-haul, tall arc)
      0.72, // India -> Canada (longest, tallest arc)
      0.50, // India -> Australia (south, medium-tall)
      0.58, // India -> New Zealand (far south-east)
      0.18, // India -> Singapore (nearby, low arc)
      0.35, // India -> Ireland
      0.32, // India -> France
      0.34, // India -> Germany
      0.20, // India -> UAE (nearby, low arc)
      0.33, // India -> Switzerland
      0.36, // India -> Spain
      0.22, // India -> Malaysia (nearby, low arc)
      0.25, // India -> Mauritius (south, short-haul)
      0.38, // India -> Netherlands
      0.28, // India -> Italy
      0.55, // India -> Russia (far north)
      0.26, // India -> Ukraine
      0.24, // India -> China (east, medium)
      0.42, // India -> Japan (east, medium-tall)
      0.19, // India -> Iran (nearby, low arc)
      0.48, // India -> South Africa (far south)
      0.16, // India -> Kenya (nearby southwest, low arc)
      0.30, // India -> South Korea (east)
      0.21, // India -> Thailand (east-southeast, low)
      0.17, // India -> Egypt (west, nearby)
      0.62, // India -> Brazil (far west, tall arc)
    ];

    interface FlightArcData {
      planeMesh: THREE.Group;
      trailMesh: THREE.Line;
      vStart: THREE.Vector3;
      vEnd: THREE.Vector3;
      speedOffset: number;
      speedRate: number;
      arcHeight: number;
      trailHistory: THREE.Vector3[];
      /** False until the contrail buffer has been filled for the first time. */
      trailSeeded: boolean;
      perpDir: THREE.Vector3;
      lateralDeflection: number;
    }

    const arcAirliners: FlightArcData[] = [];

    FLIGHT_ROUTES.forEach((route, i) => {
      const vStart = latLonToVec3(route.from.lat, route.from.lon, 1.0).normalize();
      const vEnd = latLonToVec3(route.to.lat, route.to.lon, 1.0).normalize();
      const arcHeight = uniqueArcHeights[i] || 0.35;

      // Lateral deflection: bend each arc sideways so routes in similar directions spread apart
      // Positive = curve right, Negative = curve left of the great circle path
      const lateralDeflections = [
         0.12,  // UK - curve right
        -0.18,  // USA - curve left
         0.22,  // Canada - curve right
        -0.10,  // Australia - curve left
         0.15,  // NZ - curve right
        -0.08,  // Singapore - curve left
        -0.20,  // Ireland - curve left (away from UK)
         0.16,  // France - curve right
        -0.14,  // Germany - curve left (away from France)
         0.06,  // UAE - slight right
         0.20,  // Switzerland - curve right
        -0.22,  // Spain - curve left (opposite of France)
         0.10,  // Malaysia - curve right
        -0.12,  // Mauritius - curve left
        -0.16,  // Netherlands - curve left (away from UK)
         0.18,  // Italy - curve right
        -0.08,  // Russia - slight left
         0.14,  // Ukraine - curve right (away from Russia)
        -0.06,  // China - slight left
         0.08,  // Japan - slight right
        -0.05,  // Iran - slight left
         0.15,  // South Africa - curve right (spread from Mauritius)
        -0.10,  // Kenya - curve left
         0.12,  // South Korea - curve right (between Japan & China)
        -0.14,  // Thailand - curve left (between Singapore & Malaysia)
         0.18,  // Egypt - curve right (spread from Iran/UAE)
        -0.20,  // Brazil - curve left (far west)
      ];
      const lateralDeflection = lateralDeflections[i] || 0;
      const perpDir = new THREE.Vector3().crossVectors(vStart, vEnd).normalize();

      // Flight route arc visualization line with gradient colors
      const points: THREE.Vector3[] = [];
      const colors: number[] = [];
      const numSteps = 64;

      for (let s = 0; s <= numSteps; s++) {
        const t = s / numSteps;
        const vSlerp = slerpVectors(vStart, vEnd, t).normalize();
        // Add lateral bend: offset perpendicular to the great circle, strongest at midpoint
        const lateralAmount = lateralDeflection * Math.sin(Math.PI * t);
        const vUnit = vSlerp.clone().add(perpDir.clone().multiplyScalar(lateralAmount)).normalize();
        const alt = globeRadius + hCruise + arcHeight * Math.sin(Math.PI * t);
        points.push(vUnit.multiplyScalar(alt));

        // Color gradient along arc: Amber Gold (Origin) -> Sky Cyan (Destination)
        const c1 = new THREE.Color(i % 2 === 0 ? 0xf59e0b : 0x38bdf8);
        const c2 = new THREE.Color(i % 2 === 0 ? 0x1e3a8a : 0x0284c7);
        const c = c1.clone().lerp(c2, t);
        colors.push(c.r, c.g, c.b);
      }

      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      curveGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      const curveMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
      });
      const lineMesh = new THREE.Line(curveGeo, curveMat);
      arcsGroup.add(lineMesh);

      // Create 3D Commercial Passenger Airliner
      const planeMesh = createPassengerAirlinerMesh();
      arcsGroup.add(planeMesh);

      // Contrail Jet Trail Line for each plane
      const trailMaxPts = 16;
      const trailGeo = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(trailMaxPts * 3);
      trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
      const trailMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xf59e0b : 0x38bdf8,
        transparent: true,
        opacity: 0.8,
      });
      const trailMesh = new THREE.Line(trailGeo, trailMat);
      arcsGroup.add(trailMesh);

      arcAirliners.push({
        planeMesh,
        trailMesh,
        vStart,
        vEnd,
        speedOffset: (i * 0.618033) % 1.0,
        speedRate: 0.06 + (i * 0.618033 % 1.0) * 0.12,
        arcHeight,
        trailHistory: [],
        trailSeeded: false,
        perpDir,
        lateralDeflection,
      });
    });
    scene.add(arcsGroup);

    // 9. Pointer Drag Controls (Mouse & Touch Rotation)
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - prevPointer.x;
      const deltaY = e.clientY - prevPointer.y;

      globeMesh.rotation.y += deltaX * 0.005;
      globeMesh.rotation.x += deltaY * 0.005;
      capsGroup.rotation.y += deltaX * 0.005;
      capsGroup.rotation.x += deltaY * 0.005;
      arcsGroup.rotation.y += deltaX * 0.005;
      arcsGroup.rotation.x += deltaY * 0.005;

      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    /*
     * ── WHY THIS LOOP IS GATED ──
     *
     * It used to run flat out for as long as the front page was mounted. That
     * meant a full WebGL redraw of a 12,000-triangle globe plus 28 animated
     * flight arcs, sixty times a second, while you were reading the footer,
     * while a dialog was open on top of it, and while the tab sat in the
     * background. All of it on the main thread — the same thread that has to
     * answer a click on the header. That is why the navbar felt stuck: it was
     * not broken, it was queued behind the globe.
     *
     * Three conditions now stop the work. The rAF callback still fires (it is
     * a few nanoseconds and keeps the restart trivially correct) but everything
     * expensive below is skipped:
     */
    let onScreen = true;

    // (a) The globe has been scrolled out of view.
    const io = new IntersectionObserver(
      (entries) => { onScreen = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 }
    );
    io.observe(container);

    // (b) A full-screen overlay is up — the enquiry popup, the calculator, the
    //     language dialog. They set this class on <html>; compositing a
    //     translucent layer over a live 60fps canvas is what actually locked
    //     the page up.
    // (c) The tab is hidden, or the visitor asked for reduced motion.
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const isPaused = () =>
      !onScreen ||
      document.hidden ||
      document.documentElement.classList.contains("dd-overlay-open");

    /*
     * Scratch vectors, allocated once and reused every frame. Everything below
     * writes into these instead of calling .clone(). Nothing here is kept
     * between frames, so sharing them is safe.
     */
    const _cur = new THREE.Vector3();
    const _curUnit = new THREE.Vector3();
    const _next = new THREE.Vector3();
    const _nextUnit = new THREE.Vector3();
    const _curPt = new THREE.Vector3();
    const _nextPt = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _up = new THREE.Vector3();
    const _right = new THREE.Vector3();
    const _fwd = new THREE.Vector3();
    const _tail = new THREE.Vector3();
    const _capPos = new THREE.Vector3();
    const _basis = new THREE.Matrix4();

    /* Our own clock, so pausing does not make the animation jump forward by
       however long it was paused. The delta is read every frame and simply
       thrown away while paused. */
    let elapsedTime = 0;
    let drewOnce = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (isPaused()) return;
      // Reduced motion: draw the scene once, correctly, then hold it still.
      if (reduceMotion && drewOnce) return;
      if (!reduceMotion) elapsedTime += delta;
      drewOnce = true;

      // Continuous auto-rotation when not dragging
      if (!isDragging) {
        globeMesh.rotation.y += 0.0025;
        capsGroup.rotation.y += 0.0025;
        arcsGroup.rotation.y += 0.0025;
      }

      // Animate 3D Jumping Graduation Caps on Landmass Locations
      jumpingCapItems.forEach((item, idx) => {
        const jumpHeight = Math.abs(Math.sin(elapsedTime * 3.5 + idx * 0.8)) * 0.05;
        _capPos.copy(item.normal).multiplyScalar(jumpHeight).add(item.basePos);
        item.capMesh.position.copy(_capPos);
      });

      // Animate Pulse Rings on Origin / Destination Country Hubs
      pulseRings.forEach((pr) => {
        const pScale = 1 + ((elapsedTime * 1.6 + pr.offset) % 1) * 1.8;
        pr.mesh.scale.set(pScale, pScale, 1);
        (pr.mesh.material as THREE.MeshBasicMaterial).opacity = 0.75 * (1 - ((elapsedTime * 1.6 + pr.offset) % 1));
      });

      // Animate 3D Passenger Jet Airliners Flying along Multi-Source Distributed SLERP Flight Arcs
      arcAirliners.forEach((al) => {
        const progress = (elapsedTime * al.speedRate + al.speedOffset) % 1;

        /* Identical maths to before — every .clone() and `new` has simply been
           replaced by a write into one of the scratch vectors above. */

        // Position with lateral deflection, at the current t and the next one.
        slerpInto(_cur, al.vStart, al.vEnd, progress).normalize();
        const lateralNow = al.lateralDeflection * Math.sin(Math.PI * progress);
        _curUnit.copy(al.perpDir).multiplyScalar(lateralNow).add(_cur).normalize();
        const currentAlt = globeRadius + hCruise + al.arcHeight * Math.sin(Math.PI * progress);
        _curPt.copy(_curUnit).multiplyScalar(currentAlt);

        const nextT = Math.min(progress + 0.008, 1.0);
        slerpInto(_next, al.vStart, al.vEnd, nextT).normalize();
        const lateralNext = al.lateralDeflection * Math.sin(Math.PI * nextT);
        _nextUnit.copy(al.perpDir).multiplyScalar(lateralNext).add(_next).normalize();
        const nextAlt = globeRadius + hCruise + al.arcHeight * Math.sin(Math.PI * nextT);
        _nextPt.copy(_nextUnit).multiplyScalar(nextAlt);

        // Surface tangent basis, so the fuselage stays parallel to the surface.
        _dir.copy(_nextPt).sub(_curPt).normalize();
        _up.copy(_curUnit); // radial outward normal
        _right.crossVectors(_up, _dir).normalize();
        _fwd.crossVectors(_right, _up).normalize();
        _basis.makeBasis(_right, _up, _fwd);

        al.planeMesh.position.copy(_curPt);
        al.planeMesh.quaternion.setFromRotationMatrix(_basis);

        /* Contrail. Was an array of 16 Vector3 objects with unshift()/pop()
           every frame — one fresh Vector3 per plane per frame, and unshift
           re-indexes the whole array. It is now written straight into the
           geometry buffer: copyWithin slides the existing points back by one
           and the new tail point is written at the head. No allocation, no
           array churn, same picture. */
        _tail.copy(_fwd).multiplyScalar(-0.09).add(_curPt);

        const positions = al.trailMesh.geometry.attributes.position.array as Float32Array;
        if (!al.trailSeeded) {
          // First frame: fill the whole trail with the current tail point,
          // otherwise the unwritten slots sit at the origin and the contrail
          // draws a line to the centre of the globe.
          for (let tIdx = 0; tIdx < 16; tIdx++) {
            positions[tIdx * 3] = _tail.x;
            positions[tIdx * 3 + 1] = _tail.y;
            positions[tIdx * 3 + 2] = _tail.z;
          }
          al.trailSeeded = true;
        } else {
          positions.copyWithin(3, 0, 15 * 3);
          positions[0] = _tail.x;
          positions[1] = _tail.y;
          positions[2] = _tail.z;
        }
        al.trailMesh.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    /**
     * ResizeObserver rather than window.resize: the container changes size
     * without the window doing so. The hero grid collapses from two columns to
     * one, a web font loads and reflows the column beside it, or simply the
     * first layout pass completes after mount. window.resize catches none of
     * those, which is why the globe could come up mis-framed and stay that way
     * until the visitor happened to resize their browser.
     */
    const resizeObserver = new ResizeObserver(() => fitToContainer());
    resizeObserver.observe(container);

    // iOS reports the old viewport at the moment orientationchange fires, so
    // re-measure once it has settled.
    let orientationTimer = 0;
    const handleOrientation = () => {
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(fitToContainer, 200);
    };
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      resizeObserver.disconnect();
      io.disconnect();
      window.clearTimeout(orientationTimer);
      window.removeEventListener("orientationchange", handleOrientation);
      canvasDom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      /*
       * renderer.dispose() on its own does NOT free geometries, materials or
       * textures — those are owned by the scene, and without this the whole
       * scene (a 96x64 sphere, 28 tube geometries, 28 plane meshes, every label
       * sprite and its canvas texture) stayed resident on the GPU. Every visit
       * back to the front page built a brand new one on top of the last, so the
       * page got heavier the more the visitor browsed.
       */
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        const disposeMat = (m: THREE.Material) => {
          const withMap = m as THREE.Material & { map?: THREE.Texture };
          withMap.map?.dispose?.();
          m.dispose();
        };
        if (Array.isArray(mat)) mat.forEach(disposeMat);
        else if (mat) disposeMat(mat);
      });

      renderer.dispose();
      // Browsers cap live WebGL contexts (commonly 16). Without this, browsing
      // back and forth to the front page eventually exhausts them and the globe
      // silently stops appearing.
      renderer.forceContextLoss();
    };
  }, []);

  return (
    /*
     * SIZING
     * Below lg the globe is a centred square that never exceeds the viewport
     * width, so it reads the same on a 360px phone as on a tablet. From lg it
     * returns to the fixed height the two-column hero layout expects.
     * mx-auto is what actually centres it once max-w kicks in — without it the
     * square would sit hard against the left edge of the grid cell.
     */
    <div className="relative w-full max-w-full min-w-0 mx-auto flex items-center justify-center select-none overflow-visible aspect-square max-w-[460px] sm:max-w-[540px] md:max-w-[580px] lg:aspect-auto lg:max-w-none lg:h-[600px]">
      {/* 3D WebGL Canvas - Floating Completely Freely */}
      <div
        ref={mountRef}
        className="w-full h-full min-w-0 cursor-grab active:cursor-grabbing relative z-10"
        /*
         * pan-y lets a vertical swipe scroll the page as normal while a
         * horizontal drag still rotates the globe. Without it the globe either
         * traps the scroll gesture or never receives the drag at all, depending
         * on the browser.
         */
        style={{ touchAction: "pan-y" }}
        title="Drag with mouse or touch pointer to rotate 3D Earth Globe!"
      />
    </div>
  );
};

export default HeroGlobe3D;
