//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Anim crop
let animCrop = gsap.timeline({
  scrollTrigger: {
    trigger: ".animCrop",
    start: "top 99vw",
    scrub: true,
    toggleActions: 'play none none reverse'
  }
})
animCrop.to('.animCrop', {clipPath: "polygon(0 0, 0% 100%, 100% 0)"})
