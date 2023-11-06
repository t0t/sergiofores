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
    {scale: .8},
    {rotate: '-10'},
    {translateX: 0},
    {translateY: 0},
    {scale: 1},
    {rotate: '0'},
    {rotate: '10'}
  ],
  easing: 'easeInOutSine',
  // backgroundColor: '#000',
  duration: 3500,
  loop: true
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