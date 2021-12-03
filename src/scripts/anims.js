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
    toggleActions: 'play none none reverse'
  }
})
animCrop.fromTo('.animCrop', {
  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  opacity: 1
},{
  clipPath: "polygon(36% 78%, 80% 52%, 100% 100%, 60% 76%, 0 95%, 30% 36%)",
  opacity: 0
})
