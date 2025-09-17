// "use client";
// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

// export default function AirplaneModel() {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color("#d0cbc7");

//     // Camera
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       1,
//       2000
//     );
//     camera.position.set(0, 20, 150);

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(
//       mountRef.current.clientWidth,
//       mountRef.current.clientHeight
//     );
//     mountRef.current.appendChild(renderer.domElement);

//     // Light
//     const light = new THREE.PointLight(0xffffff, 1);
//     light.position.set(50, 50, 100);
//     scene.add(light);

//     const ambient = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambient);

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;

//     // Load Model
//     const loader = new OBJLoader();
//     loader.load(
//       "https://assets.codepen.io/557388/1405+Plane_1.obj",
//       (object) => {
//         object.traverse((child: any) => {
//           if (child.isMesh) {
//             child.material = new THREE.MeshPhongMaterial({
//               color: 0x171511,
//               specular: 0xd0cbc7,
//               shininess: 5,
//               flatShading: true,
//             });
//           }
//         });
//         object.scale.set(1, 1, 1);
//         object.position.set(0, -20, 0);
//         scene.add(object);
//       }
//     );

//     // Animate
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Cleanup on unmount
//     return () => {
//       mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div
//       ref={mountRef}
//       style={{ width: "100%", height: "100vh", overflow: "hidden" }}
//     />
//   );
// }
