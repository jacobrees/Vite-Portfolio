import "./style.scss"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: true,
});

const homeContainer = document.querySelector(".home-name-container");
const nameTitle = document.querySelector(".name-title");

const nameToNavbar = gsap.timeline({
  scrollTrigger: {
    trigger: homeContainer,
    start: "top center",
    end: "bottom top",
    scrub: 1,
  },
});
nameToNavbar.from(nameTitle, {
  fontSize: 90,
  duration: 1,
  y: screen.height / 2,
});

const scrollText = document.querySelector(".scroll-text");

const scrollDisappear = gsap.timeline({
  scrollTrigger: {
    trigger: homeContainer,
    start: "top top",
    end: "center top",
    scrub: 1,
  },
});

scrollDisappear.to(scrollText, {
  opacity: 0,
  x: -100,
});

const projectsTitle = document.querySelector(".projects-title");
const projectsContainer = document.querySelector(".projects-container");

const enlargeProjectsTitle = gsap.timeline({
  scrollTrigger: {
    trigger: projectsContainer,
    start: "top center",
    end: "bottom 10%",
    scrub: 1,
  },
});

enlargeProjectsTitle.to(projectsTitle, {
  fontSize: 50,
});

gsap.from(".project-img", {
  scrollTrigger: ".project-img",
  x: -500,
});
