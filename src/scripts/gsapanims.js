//  GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



// Anim header
const tl = gsap.timeline({defaults: {ease: "power1.out"}})
tl.from(".titlePage--home", {y:"-50%", opacity:0, duration:2})
tl.to(".titlePage--home", {y:"0%", duration:5}, "-=5")

// Anim header
const tl2 = gsap.timeline()
tl2.to(".bgImg", {clipPath: "polygon(0 0, 0 100%, 100% 50%, 0 0)"})
tl2.to(".bgImg", {clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)"})


const container = document.querySelector(".section--cover")
const typew = document.querySelector("#typewritter")

const cursormove = (e) => {
  let xPos = e.layerY
  typew.style.pointerEvents = "none"
  typew.style.display = "block"
  typew.style.transform = `
    rotate(${-xPos/100}deg)
  `
}
container.addEventListener("mousemove", cursormove)

