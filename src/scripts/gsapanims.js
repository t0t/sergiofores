//  GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


// Anim crop
let animCrop = gsap.timeline({
  scrollTrigger: {
    trigger: ".animCrop",
    start: "top 100vw",
    scrub: true,
    toggleActions: 'play none none reverse'
  }
})
animCrop.to('.animCrop', {clipPath: "polygon(0 20%, 100% 61%, 100% 100%, 0 50%)"})

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
  ease: 'elastic',
  duration: 1.5
})
header.to('.titlePage', {
  scale: 1,
  rotate: 0
})

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
      fill: '#4AECC1',
      scale: 1.3
    },
    {
      scale: 1,
      stagger: {
        amount:2
      },
      ease: 'elastic',
      opacity: 1
    }
  )
  .fromTo(
    '#botones text',
    { opacity: 0 },
    { opacity: 1, fill: 'black', x: -3, y: 3 },
    "+=10"
  )

const circulos = document.querySelectorAll('#botones circle')
circulos.forEach(el => {
  el.onclick = () => scrollanim.play('anim')
})


// Anims
let animContainer = document.querySelectorAll('.animContainer')
animContainer.forEach(element => {
  const animItem = element.querySelector('.animItem')
  let tl = gsap
    .timeline()
    .fromTo(
      animItem,
      { width: "0%", opacity: 0 },
      { width: "100%", opacity: 1, ease: 'back', duration: 2 }
    )

  ScrollTrigger.create({
    trigger: element,
    start: 'top 60%',
    toggleActions: 'play none none reverse',
    animation: tl
  })
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
