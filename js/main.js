import '../sass/style.scss'
// import img13 from '/img/bg12.jpg'
// document.getElementById('img13').src = img13

// LOADER con fundido
let loader = document.getElementById("wrap-preloader");
let theSite = document.getElementById("theSite");
let noOverflow = document.querySelector("body");

// Cuando carge todo, DOM, recursos, etc
window.addEventListener("load", () =>  {
  fundidoPagina();
  // oculta el loader
  loader.style.display = "none"; //poner en none/grid
  // Muestra la pagina
  theSite.style.display = "inherit";
  noOverflow.style.overflow = "visible";
});

let fundidoPagina = () => {
  document.querySelector("#theSite").classList.add("fade-page-on")
}

// ANIME 
import anime from 'animejs/lib/anime.es.js';

anime({
  targets: '.titlePage',
  // scale: ['3', '1.5'],
  keyframes: [
    {scale: 2},
    {translateY: -300},
    {translateX: 250},
    {translateY: 40},
    {translateX: 0},
    {translateY: 0},
    {scale: 1}
    // {rotate: '-10deg'}
  ],
  rotate: '1turn',
  // backgroundColor: '#000',
  duration: 3500
  // borderRadius: ['0%', '5%']
});



// Muestra Creditos
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("body").addEventListener("click", credits)
// });

// let credits = () => {
//   console.log("Website desarrollada a mano y con mucho cariño por Sergio Forés")
// }
