import "./style.scss";
import gsap from "gsap";
import SplitType from "split-type";
import * as THREE from "three";
import * as dat from "lil-gui";
/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.ConeGeometry(0.2, 0.5, 4);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

// Materials

const material = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
});
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: 0x000000,
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

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

// cursor
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  camera.position.x += (parallaxX - camera.position.x) * 5 * deltaTime;
  camera.position.y += (parallaxY - camera.position.y) * 5 * deltaTime;
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
