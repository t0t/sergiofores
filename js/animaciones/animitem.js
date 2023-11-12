//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Anims
let animContainer = document.querySelectorAll('.animItem')
animContainer.forEach(element => {
  // const animItem = element.querySelector('.animItem')
  let tl = gsap
    .timeline()
    .fromTo(
      element,
      { width: "0%", opacity: 0 },
      { width: "100%", opacity: 1, ease: 'back', duration: 2 }
    )

  ScrollTrigger.create({
    trigger: element,
    start: 'top 50%',
    end: 'bottom top',
    toggleActions: 'play none none none',
    animation: tl
  })
})
