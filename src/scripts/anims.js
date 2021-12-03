//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Anim crop
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
  opacity: 1,
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
},{
  opacity: 0.5,
  y: "30vh",
  x: "50vw",
  // mixBlendMode: "normal",
  backgroundPosition: "top left"
})
