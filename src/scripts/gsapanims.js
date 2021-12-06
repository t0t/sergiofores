//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// SVG 
gsap.set('#scrollanim', { scale: 0.6 })
const scrollanim = gsap
  .timeline({
    scrollTrigger: {
      trigger: '#scrollanim',
      start: 'top 80%',
      end: 'bottom 80%',
      scrub: true,
      markers: false,
      toggleActions: 'play reverse play reverse'
    }
  })
  .add('anim')
  .to('#scrollanim', {
    scale: 0.9,
    transformOrigin: 'center'
  })
  .fromTo('#adicionales circle', {
    opacity: 0 },{ opacity: 1 })
  .fromTo(
    '#botones circle',
    {
      opacity: 0,
      scale: 1.3
    },
    {
      scale: 1,
      stagger: {amount:0.1},
      ease: 'back',
      opacity: 1
    }
  )
  .fromTo(
    '#botones text',
    { opacity: 0 },
    { opacity: 1, stagger: 0.1, x: -2, y: 1.9 }
  )

const circulos = document.querySelectorAll('#botones circle')
circulos.forEach(el => {
  el.onclick = () => scrollanim.play('anim')
})

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
