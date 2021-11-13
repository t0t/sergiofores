
import "../estilos/main.scss";
const moment = require("moment");
const d3 = require("d3");
console.log("cargado d3" + d3)

import { getFullName } from "./utils/utils";
const firstName = getFullName("JStestOK");
console.log(firstName)

// Sidenav open-close
import { openNav, closeNav } from "./sidenav";
const hambutton = document.getElementById("hambutton");
hambutton.addEventListener("click", openNav)
const closesidenav = document.getElementById("closesidenav");
closesidenav.addEventListener("click", closeNav)

import datablog from './data/datablog.json';
console.log(datablog);
// => "world"

import Typewriter from '../../node_modules/typewriter-effect/dist/core';

// new Typewriter('#typewriter', {
//   strings: ['Hello', 'World'],
//   autoStart: true,
// });
const typeHeading = document.getElementById('typewritter');
console.log(typeHeading)

let typewriter = new Typewriter(typeHeading, {
  loop: false,
  delay: 95,
});

typewriter
  .pauseFor(1500)
  .typeString('Descifrar toda la Vida')
  .pauseFor(2000)
  .deleteChars(13)
  .typeString(' La Creación para encontrArte')
  .typeString('<span style="color: #2BC4A9;"> desde Cero.</span>')
  .pauseFor(4000)
  .start();


// ANIMINTRO
let width = 450
let height = 450

const svg = d3.select("#animcover")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// create dummy data -> just one element per circle
const dataanimintro = [
  { name: 'Uno', group: 1 },
  { name: 'Dos', group: 2 },
  { name: 'Tres', group: 3 },
  { name: 'Cuatro', group: 4 },
  { name: 'F', group: 5 },
  { name: 'E', group: 5 },
  { name: 'G', group: 5 },
  { name: 'H', group: 5 },
  { name: 'I', group: 5 },
  { name: 'J', group: 5 }
]

// A scale that gives a X target position for each group
const x = d3.scaleOrdinal()
  .domain([1, 2, 3, 4, 5])
  .range([50, 50, 50, 50, 50])

// A color scale
const color = d3.scaleOrdinal()
.domain([1, 2, 3, 4, 5])
.range([ "#FF6874", "#2BC4A9", "#9F9FFF", "#FFFF9F", "#000"])

// Randomize size
function randomNumber(min,max) {
  return Math.random() * (max - min) + min;
}
const radiou = 48;

// Initialize the circle: all located at the center of the svg area
let node = svg.append("g")
  .selectAll("circle")
  .data(dataanimintro)
  .join("circle")
    .attr("r", radiou)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", d => color(d.group))
    .attr("stroke-width", "4")
    .call(d3.drag() // call specific function when circle is dragged
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

// Features of the forces applied to the nodes:
var simulation = d3.forceSimulation()
  .force("x", d3.forceX().strength(0.3).x(d => x(d.group)))
  .force("y", d3.forceY().strength(0.1).y( height / 2 ))
  .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
  .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
  .force("collide", d3.forceCollide().strength(8).radius(radiou).iterations(3)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(dataanimintro)
    .on("tick", d => {
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
    });


// What happens when a circle is dragged?
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(.03).restart();
   d.fx = d.x;
   d.fy = d.y;
 }
 function dragged(event, d) {
   d.fx = event.x;
   d.fy = event.y;
 }
 function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(.03);
   d.fx = null;
   d.fy = null;
 }



const now = moment().format("YYYY-MM-DD, h:mm:ss a")
console.log(now)



// LOADER con fundido
let loader = document.getElementById("wrap-preloader");
let theSite = document.getElementById("theSite");
let noOverflow = document.querySelector("body");

// Cuando carge todo, DOM, recursos, etc
window.addEventListener("load", () =>  {
  fundidoPagina();
  // oculta el loader
  // loader.style.display = "grid"; //cambiar por linea debajo
  loader.style.display = "none"; //poner en none/grid
  // Muestra la pagina
  theSite.style.display = "inherit";
  noOverflow.style.overflow = "visible";
});

let fundidoPagina = () => {
  document.querySelector("#theSite").classList.add("fade-page-on")
}



// APP
let btnGenerar = document.getElementById("lanza");
// Ejecuta App sólo si existe el boton #lanza
if (btnGenerar) {

    let input = document.getElementById("entrada");
    let output = document.querySelector(".output");
    let fechaNacimiento = document.getElementById('fechanacimiento');
    let fechaNacimientoUsuario = 10, entradaTexto = "", frnegativa, frpositiva, diasfinanyo, diahoy, agnio, frpalabras = 10, radi;
    let widthApp = window.innerWidth;
    let heightApp = window.innerHeight / 2;

    const datos = [
    {
        id: 0, angle: 0, x: -60, y: 0, lupa: 3, color: 'black', nombre: '0'
    },{
        id: 1, angle: 0, x: 35, y: 0, lupa: 24, color: '#2BC4A9', nombre: '1'
    },{
        id: 2, angle: 0, x: 15, y: 50, lupa: 13, color: '#FF6874', nombre: '2'
    },{
        id: 3, angle: 0, x: 15, y: -45, lupa: 4, color: '#9F9FFF', nombre: '3'
    },{
        id: 4, angle: 0, x: 0, y: 0, lupa: 3, color: '#FFFF9F', nombre: '4'
    },{
        id: 5, angle: 0, x: -17, y: 50, lupa: 3, color: 'grey', nombre: '5'
    },{
        id: 6, angle: 0, x: -17, y: -45, lupa: 3, color: 'grey', nombre: '6'
    },{
        id: 7, angle: 0, x: -38, y: 0, lupa: 3, color: 'grey', nombre: '7'
    },{
        id: 8, angle: 0, x: -50, y: 50, lupa: 3, color: 'grey', nombre: '8'
    },{
        id: 9, angle: 0, x: -50, y: -45, lupa: 3, color: 'grey', nombre: '9'
    }
    ];

    radi = height / 2;

    const container = d3.select("#grafica")
    .append("svg")
    .attr("width", widthApp)
    .attr("height", heightApp);

    const group = container
    .append("g")
    .attr("transform", `translate(${widthApp / 2},${heightApp / 2})`)
    .attr("id", "grafic");

    // Ajusta svg y g a window
    d3.select(window).on("resize", (e) => {
    let iw = e.target.innerWidth;
    let ih = e.target.innerHeight;
    container
    .attr("width", iw)
    .attr("height", ih / 2);
    group.attr("transform", `translate(${iw / 2},${ih / 4})`);
    })

    // Circulo grande
    group
    .append("circle")
    .attr("r", radi / 1.5)
    .attr("cx", radi / 2 - radi / 2)
    .attr("strokeWidth", "1px")
    .attr("fill", "none");

    // Circulo grande2
    group
    .append("circle")
    .attr("r", radi / 1.5)
    .attr("cx", radi / 1.5)

    group
    .attr("stroke", datos[0].color)
    .attr("strokeWidth", "1px")
    .attr("fill", "none");

    // Circulo grande2
    group
    .append("circle")
    .attr("r", radi / 1.5)
    .attr("cx", -(radi / 1.5))
    .attr("stroke", datos[0].color)
    .on('mouseover', (e) => { e.target.style.fill = datos[0].color })
    .on('mouseout', (e) => { e.target.style.fill = datos[1].color })

    // https://bl.ocks.org/mbostock/3151228

    group
    .selectAll("text")
    .data(datos)
    .enter()
    .append("text")
    .attr("x", d => d.x * Math.PI)
    .attr("y", d => d.y)
    .attr("transform", d => {
        return `translate(${d.x}, ${d.y})`
    })
    .text(d => d.nombre)
    .attr("fill", d => d.color)

    const arco = d3.arc()
    .innerRadius(129)
    .outerRadius(131)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

    const arco2 = d3.arc()
    .innerRadius(129)
    .outerRadius(135)
    .startAngle(Math.PI * 2)
    .endAngle(10);

    // Arcos
    group
    .append("path")
    .attr("d", arco)
    .attr("stroke", "none");

    group
    .append("path")
    .attr("d", arco2)
    .attr("transform", `rotate(360) translate(-${radi * 1.345} 0)`)
    .attr("stroke", "none");

    // Uno
    group
    .append("circle")
    .attr("r", radi / 3)
    .attr("cx", radi / 3)
    .attr("stroke", datos[0].color)
    .attr("strokeWidth", "1px")
    .attr("fill", "none")

    // Dos
    group
    .append("circle")
    .attr("r", radi / 3)
    .attr("cx", radi / 3 - radi / 1.5)
    .attr("stroke", datos[0].color)
    .attr("fill", "none")
    .attr("strokeWidth", "1px")

    // Tres
    group
    .append("circle")
    .attr("r", radi / 3)
    .attr("cx", 0)
    .attr("stroke", datos[0].color)
    .attr("fill", "none")
    .attr("strokeWidth", "1px")

    // Cuatro
    group
    .append("circle")
    .attr("r", radi / 3)
    .attr("cx", radi - radi / 3)
    .attr("stroke", datos[0].color)
    .attr("fill", "none")
    .attr("strokeWidth", "1px")

    // Input fecha
    fechaNacimiento.addEventListener('change', (e) => {
    fechaNacimientoUsuario = e.target.value;
    frpositiva = parseInt(inputFecha(fechaNacimientoUsuario));
    frnegativa = parseInt(frpositiva - obtenerCantidadDias(agnio));
    });

    // BTN Generar Grafica
    btnGenerar.addEventListener("click", () => {
    entradaTexto = input.value; //inserta input texto
    let normaliza = entradaTexto.toLowerCase()
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    let textoIntroducido = removeAccents(normaliza);
    frpalabras = extraeValoresLetras(textoIntroducido).reduce((a, v) => (a += v, +a), 0);

    let fechaActual = new Date();
    diahoy = diasTranscurridos(fechaActual);
    diasfinanyo = obtenerCantidadDias(agnio) - diahoy;

    let grafica = [
        frpalabras,
        diahoy,
        diasfinanyo,
        frpositiva,
        frnegativa
    ];

    // grafica lineas output
    group
        .selectAll("line")
        .data(grafica)
        .enter()
        .append("line")
        .attr("stroke", datos[3].color)
        .attr("stroke-width", "10px")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", d => d)
        .attr("y2", "100")
        .exit()

    output.classList.add("resultado")

    output.innerHTML = `
        <h2>${frpalabras}</h2>
        <h2>${diahoy}-${diasfinanyo}</h2>
        <h2>${frpositiva}${frnegativa}</h2>
        `
    })

    function inputFecha(f1) {
    var aFecha1 = f1.split('-'); // ['1975', '10', '15']
    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2]);
    var fFecha2 = Date.UTC(aFecha1[0], -0, 0);
    agnio = aFecha1[0];
    var dif = (fFecha1 - fFecha2) / (1000 * 60 * 60 * 24);
    return Math.floor(dif);
    }

    // dias del año transcurridos hasta hoy
    function diasTranscurridos(fechaactual) {
    let previo = new Date(fechaactual.getFullYear(), 0, 1);
    let actual = new Date(fechaactual.getTime());

    return Math.ceil((actual - previo + 1) / 86400000);
    }

    // Codigo nombre
    function extraeValoresLetras(cadenaTexto) {
    const diccionario = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, ñ: 15, o: 16, p: 17, q: 18, r: 19, s: 20, t: 21, u: 22, v: 23, w: 24, x: 25, y: 26, z: 27
    }

    if (cadenaTexto.length == 1) {
        return diccionario[cadenaTexto] || ' ';
    }
    return cadenaTexto.split('').map(extraeValoresLetras);
    }

    function esAgnioBisiesto(agnio) {
    return agnio % 400 == 0 || (agnio % 100 != 0 && agnio % 4 == 0);
    }

    function obtenerCantidadDias(agnio) {
    return esAgnioBisiesto(agnio) ? 366 : 365;
    }
} // fin App









// let sz1 = 50;
// let sz2 = 20;
// let sz3 = 30;
// let pPath = `M 0,0 C -${sz2},-${sz2}, -${sz2},-${sz3} 0,-${sz1} C ${sz2},-${sz3} ${sz2},-${sz2} 0,0`;





//  HIDE NAV ON SCROLL
 function isMobileDevice() {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(Browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
  
    return check;
  }
  
  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
  
  // Muestra efecto navbar si no es mobil NI Safari
  if ( !isSafari && !isMobileDevice()) {
  
    console.log(`SAFARI ${isSafari}`);
    var prevScrollpos = window.pageYOffset;
  
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
  
      if (prevScrollpos > currentScrollPos)  {
        document.getElementById("navbar").style.top = "0px";
      } else {
        document.getElementById("navbar").style.top = "-100px";
      }
  
      prevScrollpos = currentScrollPos;
    };
  } else if (isMobileDevice) {
    // console.log("es solo safari")
    let quitaBgFixed = document.getElementsByTagName("header")[0];
    quitaBgFixed.style.backgroundAttachment = "scroll";
    quitaBgFixed.style.backgroundPosition = "bottom center";
    quitaBgFixed.style.backgroundSize = "inherit";
  }

  