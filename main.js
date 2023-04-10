import "./style.scss";
import gsap from "gsap";
import SplitType from "split-type";
import * as THREE from "three";
import * as dat from "lil-gui";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
/**
 * Base
 */


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.ConeGeometry( 0.2, 0.5, 4 );

// Materials

const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0x000000);

// Mesh
for (let i = 0; i < 100; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  mesh.rotation.x = (Math.random() - 0.5) * 10;
  mesh.rotation.y = (Math.random() - 0.5) * 10;
  scene.add(mesh);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;


scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 0);

// move camera based on mouse position 


/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  camera.position.x = Math.sin(elapsedTime) * 2;
  camera.position.y = Math.cos(elapsedTime) * 2;
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

const menu = document.querySelector(".hamburger-menu");
const mobileNav = document.querySelector(".mobile-navbar");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links");
const loader = document.querySelector(".loading-screen");
const loadingText = document.querySelector(".loading-title");

loadingText.style.visibility = "visible";

new SplitType("#loading-text");

gsap.to(".char", {
  y: 0,
  stagger: 0.05,
  delay: 0.2,
  duration: 0.1,
});

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("loader-hidden");
  }, 1200);
});

menu.addEventListener("click", () => {
  menu.classList.toggle("open");
  mobileNav.classList.toggle("show");
});

mobileNavLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    menu.classList.toggle("open");
    mobileNav.classList.toggle("show");
  });
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    const id = navLink.textContent;
    const section = document.getElementById(id);
    const position = section.offsetTop - 70;
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  });
});
