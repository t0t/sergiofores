// import '../sass/style.scss'

// import { plusDivs, showDivs } from './slider.js'
// import { slideIndex, slideId } from './slider.js'

import {obras} from './data/obras.js'
console.log(obras)

// LOADER con fundido
let loader = document.getElementById("wrap-preloader");
let theSite = document.getElementById("theSite");
let noOverflow = document.querySelector("html");


function cargadoDOM() {
  console.info("DOM cargado!");
  loader.style.display = "flex";
}


if (document.readyState === "loading") {
  // Loading hasn't finished yet
} else {
  // `DOMContentLoaded` has already fired
  document.addEventListener("DOMContentLoaded", cargadoDOM);
  theSite.style.display = "none";
  noOverflow.style.overflow = "hidden";
}

// Cuando carge todo,  DOM, recursos, etc
window.addEventListener("load", () => {
  console.info("Recursos cargados!");
  loader.style.display = "none";
  theSite.style.display = "block";
  noOverflow.style.overflow = "auto";
  fundidoPagina();
});

let fundidoPagina = () => {
  document.querySelector("#theSite").classList.add("fade-page-on")
}


// ANIME 
// import anime from 'animejs/lib/anime.es.js';

// anime({
//   targets: '.animeintro',
//   // opacity: '1',
//   scale: ['3', '1.5', '1', '.9'],
//   keyframes: [
//     { rotate: '-10' },
//     { translateX: "10" },
//     { translateY: "-10" },
//     { rotate: '10' },
//     { rotate: '0' },
//     { translateX: "0" },
//     { translateY: "0" },
//     { scale: "1" },
//     { rotateY: "60deg" },
//     { perspective: "10vw" },
//     { perspective: "100vw" }
//   ],
//   easing: 'easeInOutSine',
//   // backgroundColor: '#000',
//   duration: 1500
//   // loop: true
//   // borderRadius: ['0%', '5%']
// });



// Muestra Creditos
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("body").addEventListener("click", credits)
// });

// let credits = () => {
//   console.log("Website desarrollada a mano y con mucho cariño por Sergio Forés")
// }



let anchoVentana = window.innerWidth

const isDesktop = () => {
  // DRAGGABLE
  // document.querySelectorAll('.draggable').DraggableJS();

  console.log("isDesktop");
}

const isIpad = () => {
  console.log("isIpad");
}

const isMobile = () => {
  console.log("isMobile");
}

window.addEventListener('resize', function () {
  anchoVentana = window.innerWidth;
  if (anchoVentana > 1024) {
    isDesktop();
    // window.removeEventListener("resize", isDesktop);
  } else if (anchoVentana > 422 && anchoVentana < 1023) {
    isIpad();
    // window.removeEventListener("resize", isIpad);
  } else {
    isMobile();
    // window.removeEventListener("resize", isMobile);
  }
});


