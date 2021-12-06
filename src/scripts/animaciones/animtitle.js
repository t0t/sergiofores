//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Anim header
const header = gsap.timeline({
  scrollTrigger: {
    trigger: '.titlePage',
    start: 'top center',
    end: '+=200vh center',
    scrub: true,
    markers: false,
    toggleActions: 'play reverse play reverse'
  }
})

header.to('.titlePage', {
  rotate: -6,
  scale: 1.3,
  ease: 'back',
  duration: 1
})
header.to('.titlePage', {
  scale: 1,
  rotate: 0,
  y: 200
})
