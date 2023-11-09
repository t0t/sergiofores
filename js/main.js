import '../sass/style.scss'

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
  targets: '.animeintro',
  opacity: '1',
  // scale: ['3', '1.5'],
  keyframes: [
    {scale: .8},
    {rotate: '-10'},
    {translateX: 1},
    {translateY: 1},
    {scale: 1},
    {rotate: '10'},
    {rotate: '0'},
  ],
  easing: 'easeInOutSine',
  // backgroundColor: '#000',
  duration: 1500
  // loop: true
  // borderRadius: ['0%', '5%']
});



// Muestra Creditos
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("body").addEventListener("click", credits)
// });

// let credits = () => {
//   console.log("Website desarrollada a mano y con mucho cariño por Sergio Forés")
// }


function eventoDragVentanas(){
  const VENTANAS = document.querySelectorAll(".drag");

  VENTANAS.forEach(ventana => {
          
      let mousePosition   = [0,0];
      let element         = document.getElementById(ventana.id);
      let elementPosition = [10 , 55];
      
      let mainEH = function (event) {
              let rect = event.target.getBoundingClientRect();
              elementPosition = [rect.left , rect.top];
              mousePosition = [event.clientX, event.clientY];
              document.addEventListener('mousemove', calcEH);
              document.addEventListener('mouseup', removeHandlers);
              document.addEventListener('contextmenu', removeHandlers);
      };
      
      let calcEH = function (event) {
          let vector      = [-mousePosition[0] + event.clientX, -mousePosition[1] + event.clientY];
          mousePosition   = [mousePosition[0] + vector[0], mousePosition[1] + vector[1]];
          elementPosition = [elementPosition[0] + vector[0], elementPosition[1] + vector[1]];
          updatePosition();
      };
      
      let removeHandlers = function () {
          document.removeEventListener('mousemove', calcEH);
          document.removeEventListener('mouseup', removeHandlers);
          document.removeEventListener('contextmenu', removeHandlers);
      };
      
      function updatePosition() {
          element.style.left = elementPosition[0] + "px";
          element.style.top  = elementPosition[1] + "px";
      }
      
      element.addEventListener('mousedown', mainEH, true);
          
  });
}
eventoDragVentanas();

document.querySelectorAll('.draggable').DraggableJS();

// SLIDER https://www.w3schools.com/w3css/w3css_slideshow.asp
var slideIndex = [1, 1, 1, 1];
var slideId = [
  "slider1",
  "slider2",
  "slider3",
  "slider4"
]

showDivs(1, 0);
showDivs(1, 1);
showDivs(1, 2);
showDivs(1, 3);

function plusDivs(n, no) {
  showDivs(slideIndex[no] += n, no);
}

function showDivs(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);

  if (n > x.length) { slideIndex[no] = 1 }
  if (n < 1) { slideIndex[no] = x.length }

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  x[slideIndex[no] - 1].style.display = "block";

}