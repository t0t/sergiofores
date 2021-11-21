import '../estilos/main.scss'
// const moment = require("moment");
const d3 = require('d3')

// SIDENAV open-close
import { openNav, closeNav } from './sidenav'
const hambutton = document.getElementById('hambutton')
hambutton.addEventListener('click', openNav)
const closesidenav = document.getElementById('closesidenav')
closesidenav.addEventListener('click', closeNav)

// import datablog from './data/datablog.json';
// console.log(datablog);
// => "world"

import { widthApp, heightApp, centerX, centerY } from "./utils/inicializargraficas"

// LOADER con fundido de pagina
let loader = document.getElementById('wrap-preloader')
let theSite = document.getElementById('theSite')
let noOverflow = document.querySelector('body')

// Cuando carge todo, DOM, recursos, etc
window.addEventListener('load', () => {
  fundidoPagina()
  // oculta el loader
  // loader.style.display = "grid"; //cambiar por linea debajo
  loader.style.display = 'none' //poner en none/grid
  // Muestra la pagina
  theSite.style.display = 'inherit'
  noOverflow.style.overflow = 'visible'
})

let fundidoPagina = () => {
  document.querySelector('#theSite').classList.add('fade-page-on')
}





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




import { isMobileDevice, isSafari } from './utils/device-detection'

if (!isSafari && !isMobileDevice()) {
  let prevScrollpos = window.pageYOffset

  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset

    if (prevScrollpos > currentScrollPos) {
      document.getElementById('navbar').style.top = '0px'
    } else {
      document.getElementById('navbar').style.top = '-100px'
    }

    prevScrollpos = currentScrollPos
  }
} else if (isMobileDevice) {
  // console.log("es solo safari o IOS")
  let quitaBgFixed = document.getElementsByTagName('header')[0] //aplica a solo primer header
  quitaBgFixed.style.backgroundAttachment = 'scroll'
  quitaBgFixed.style.backgroundPosition = 'bottom left'
  quitaBgFixed.style.backgroundSize = 'inherit'
}
