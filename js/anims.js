//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Anim crop 1
let animCrop = gsap.timeline({
  scrollTrigger: {
    trigger: ".animCrop",
    start: "top 0vh",
    end: "center 50vh",
    scrub: true,
    toggleActions: 'play play play reverse'
  }
})
animCrop.fromTo('.animCrop', {
  opacity: 0.45,
  width: "100vw",
  height: "100vh",
  clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 50%)",
},{
  opacity: 1,
  y: "40vh",
  x: "0vw",
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  // mixBlendMode: "normal",
  // backgroundPosition: "top left"
})

// Anim crop 2
let animCrop2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".animCrop2",
    start: "top 0vh",
    end: "center 50vh",
    scrub: true,
    toggleActions: 'play play play reverse'
  }
})
animCrop2.fromTo('.animCrop2', {
  // opacity: 1,
  width: "100vw",
  height: "100vh",
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
},{
  // opacity: 0.5,
  y: "50vh",
  x: "-10vw",
  clipPath: "polygon(0% 0%, 75% 50%, 0% 100%, 0% 100%)",
  // mixBlendMode: "normal",
  // backgroundPosition: "top left"
})
