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

header.fromTo('.titlePage', {
  rotate: -6,
  scale: 1.3
}, {
  rotate: 0,
  scale: 1,
  ease: 'back',
  duration: 1
})
