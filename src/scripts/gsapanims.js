//  GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Anim header
const header = gsap.timeline({
  scrollTrigger: {
    trigger: ".titlePage--home",
    start: "top center",
    end: "+=200vh center",
    scrub: true,
    markers: false,
    toggleActions: "play reverse play reverse",
  },
});

gsap.fromTo(".bgImg", {
    clipPath: "polygon(0 10%, 0 100%, 100% 50%, 10% 0)",
  },
  {
    clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
  }
);
header.to(".titlePage--home", {
  rotate: -6,
  // y: "-20vh",
  scale: 1.3,
  ease: "elastic",
  duration: 1.5,
});
header.to(".titlePage--home", {
  scale: 1,
  rotate: 0,
  // y: "30vh"
});

gsap.set("#scrollanim", { scale: 0.6 });
const scrollanim = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#scrollanim",
      start: "top center",
      end: "+=100vh 30%",
      scrub: true,
      markers: false,
      toggleActions: "play reverse play reverse",
    },
  })
  .add("anim")
  .to("#scrollanim", {
    scale: 1,
    transformOrigin: "center",
  })
  .to("#adicionales circle", {
    opacity: 0,
    stagger: 0.1,
  })
  .to("#adicionales circle", {
    opacity: 1,
    stagger: 0.1,
  })
  .fromTo(
    "#botones circle",
    {
      opacity: 0,
      fill: "#4AECC1",
      scale: 1.3,
    },
    {
      scale: 1,
      stagger: 0.2,
      ease: "elastic",
      opacity: 1,
    }
  )
  .fromTo(
    "#botones text",
    {
      opacity: 0,
      x: -2,
      y: 2,
    },
    { opacity: 1, fill: "black", x: -3, y: 3 }
  );

const circulos = document.querySelectorAll("#botones circle");
circulos.forEach((el) => {
  el.onclick = () => scrollanim.play("anim");
});

// mueve elemento dependiendo del cursor
// const container = document.querySelector('.section--cover')
// const typew = document.querySelector('#typewritter')

// const cursormove = e => {
//   let xPos = e.layerY
//   typew.style.pointerEvents = 'none'
//   typew.style.display = 'block'
//   typew.style.transform = `
//     rotate(${-xPos / 100}deg)
//   `
// }
// container.addEventListener('mousemove', cursormove)
