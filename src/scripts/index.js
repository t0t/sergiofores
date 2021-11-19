import '../estilos/main.scss'
// const moment = require("moment");
const d3 = require('d3')

// SIDENAV open-close
import { openNav, closeNav } from './sidenav'
const hambutton = document.getElementById('hambutton')
hambutton.addEventListener('click', openNav)
const closesidenav = document.getElementById('closesidenav')
closesidenav.addEventListener('click', closeNav)

import { nodes, links, MANY_BODY_STRENGTH } from './data/data.js';
import { widthApp, heightApp, centerX, centerY } from "./utils/inicializargraficas"

// import datablog from './data/datablog.json';
// console.log(datablog);
// => "world"

// TYPEWRITTER EFFECT
import Typewriter from '../../node_modules/typewriter-effect/dist/core'

const typeHeading = document.getElementById('typewritter')
let typewriter = new Typewriter(typeHeading, {
  loop: false,
  delay: 95
})

typewriter
  .pauseFor(1500)
  .typeString('Descifrar toda la Vida')
  .pauseFor(2000)
  .deleteChars(13)
  .typeString(' La Creación para encontrArte')
  .typeString('<span style="color: #2BC4A9;"> desde Cero.</span>')
  .pauseFor(4000)
  .start()

// ANIMINTRO
// let width = 450
// let height = 450

// const animcover = d3
//   .select('#animcover')
//   .append('svg')
//   .attr('width', width)
//   .attr('height', height)

// // create dummy data -> just one element per circle
// const dataanimintro = [
//   { name: 'Uno', group: 1 },
//   { name: 'Dos', group: 2 },
//   { name: 'Tres', group: 3 },
//   { name: 'Cuatro', group: 4 },
//   { name: 'F', group: 5 },
//   { name: 'E', group: 5 },
//   { name: 'G', group: 5 },
//   { name: 'H', group: 5 },
//   { name: 'I', group: 5 },
//   { name: 'J', group: 5 }
// ]

// // A scale that gives a X target position for each group
// const x = d3
//   .scaleOrdinal()
//   .domain([1, 2, 3, 4, 5])
//   .range([50, 50, 50, 50, 50])

// // A color scale
// const color = d3
//   .scaleOrdinal()
//   .domain([1, 2, 3, 4, 5])
//   .range(['#FF6874', '#2BC4A9', '#9F9FFF', '#FFFF9F', 'transparent'])

// const radiou = 48

// // Initialize the circle: all located at the center of the svg area
// let node = animcover
//   .append('g')
//   .selectAll('circle')
//   .data(dataanimintro)
//   .join('circle')
//   .attr('r', radiou)
//   .attr('cx', width / 2)
//   .attr('cy', height / 2)
//   .style('fill', d => color(d.group))
//   .call(
//     d3
//       .drag() // call specific function when circle is dragged
//       .on('start', dragstarted)
//       .on('drag', dragged)
//       .on('end', dragended)
//   )

// // Features of the forces applied to the nodes:
// var simulation = d3
//   .forceSimulation()
//   .force(
//     'x',
//     d3
//       .forceX()
//       .strength(0.3)
//       .x(d => x(d.group))
//   )
//   .force(
//     'y',
//     d3
//       .forceY()
//       .strength(0.1)
//       .y(height / 2)
//   )
//   .force(
//     'center',
//     d3
//       .forceCenter()
//       .x(width / 2)
//       .y(height / 2)
//   ) // Attraction to the center of the svg area
//   .force('charge', d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
//   .force(
//     'collide',
//     d3
//       .forceCollide()
//       .strength(8)
//       .radius(radiou)
//       .iterations(3)
//   ) // Force that avoids circle overlapping

// // Apply these forces to the nodes and update their positions.
// // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
// simulation.nodes(dataanimintro).on('tick', d => {
//   node.attr('cx', d => d.x).attr('cy', d => d.y)
// })

// // What happens when a circle is dragged?
// function dragstarted (event, d) {
//   if (!event.active) simulation.alphaTarget(0.03).restart()
//   d.fx = d.x
//   d.fy = d.y
// }
// function dragged (event, d) {
//   d.fx = event.x
//   d.fy = event.y
// }
// function dragended (event, d) {
//   if (!event.active) simulation.alphaTarget(0.03)
//   d.fx = null
//   d.fy = null
// }

// MOMENT
// const now = moment().format("YYYY-MM-DD, h:mm:ss a")
// console.log(now)

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



// APP
import {inputFecha, obtenerCantidadDias, traduceTexto, diasTranscurridos} from "./utils/gematriaap"

let frnegativa, frpositiva, diasfinanyo, diahoy, agnio

// DB datos
const gematriAppData = require("./data/datos.json")
const datos = gematriAppData.datos

const gematriApp = d3.select("#gematriApp")
  .append('svg')
  .attr('width', widthApp)
  .attr('height', heightApp)
  .attr('id', "main-svg")

const gematriAppG = gematriApp
  .append('g')
  .attr('transform', `translate(${centerX}, ${centerY})`)

// centra g on resize window
d3.select(window).on('resize', updateWindow)
function updateWindow(e) {
  let iw = e.target.innerWidth
  let ih = e.target.innerHeight
  gematriApp
    .attr('width', iw)
    .attr('height', ih / 2)
  gematriAppG
    .attr('transform', `translate(${iw/2}, ${ih/4})`)
}

const textos = gematriAppG.selectAll("text").data(datos)
  textos.enter().append("text")
    .text( d => `${d.title}`)
    .attr("x", d => `${d.x}`)
    .attr("y", d => `${d.y}`)
    .attr("fill", d =>`${d.color}`)

const dropdownButton = d3.select("#gematriApp")
  .append('select')
  .selectAll('option')
  .data(datos)
  .enter()
  .append('option')
  .text( d => d.title ) // text showed in the menu
  .attr("value", d => d.color ) 

// Escalas
const x = d3.scaleLinear()
  .domain([0, d3.max(datos, d => d.x)])
  .range([0,innerWidth])

const y = d3.scaleLinear()
  .domain([0, d3.max(datos, d => d.y)])
  .range([-0,innerHeight/8])

const xAxisCall = d3.axisTop(x)
  
// Regla
const reglas = gematriAppG.append("g")
  .attr("class", "x axis")
  .attr('transform', `translate(${-centerX}, ${centerY})`)
  .call(xAxisCall)
  reglas.selectAll("rect")
    .data(datos)
  
// Todos los circulos
const circulos = gematriAppG.selectAll("circle").data(datos)
circulos
  .enter()
  .append("circle")
  .attr("cx", (d) => x(d.x))
  .attr("cy", (d) => y(d.y))
  .attr("r", d => d.r)
  .attr("stroke", d => d.color)
  
  let areaFrecuencia = gematriAppG
  .append("circle")
  .attr("cx", centerX/2.5)
  .attr("cy", 70)
  .style("fill", "white")
  .style("opacity", 0.05)
  .attr("r", 1)
  
  // Input Pon tu frecuencia a mano
  d3.select("#inputfrecuencia").on("input", updateInput )
  function updateInput() {
    areaFrecuencia.attr("r", this.value)
  }
  
  // Dropdown
  dropdownButton
    .on("change", (e) => {
      areaFrecuencia.style("stroke", e.target.value)
    })
  
  // Input fecha
  // d3.select("#fechanacimiento")
  //   .on("change", (e) => {
      
  //   })

  d3.select("#fechanacimiento").on("change", updateFecha )
  function updateFecha(e) {
    let fechaNacimientoUsuario = e.target.value
      frpositiva = parseInt(inputFecha(fechaNacimientoUsuario))
      frnegativa = parseInt(frpositiva - obtenerCantidadDias(agnio))
      console.log(frnegativa, frpositiva)
    fecha
      .text(`${frpositiva} ${frnegativa}`)
      .classed("result result--anim", true)
    }

  let fecha = gematriAppG
    .append("text")
    .attr("x", -centerX/2+25)
    .attr("y", -5)

  let fr = gematriAppG
    .append("text")
    .attr("x", -centerX/2+25)
    .attr("y", 30)
    
    d3.select("#entrada").on("keyup", updateFrecuencia )
    function updateFrecuencia(e) {
      let entradaTexto = e.target.value
      let result = traduceTexto(entradaTexto)
      fr
        .text(result)
        .classed("result result--anim", true)
      }
      
    // BTN Generar Grafica
    gematriAppG
      .append("text")
      .attr("x", -centerX/2+25)
      .attr("y", 60)
      .classed("result result--anim", true)
      .text(() => {
        diahoy = diasTranscurridos(new Date())
        diasfinanyo = obtenerCantidadDias(agnio) - diahoy
        return `${diahoy}-${diasfinanyo}`})

// let dataset = []
// for (let i = 0; i < 10; i++) {
//   let randomNum = Math.round(Math.random() * 10));
//   dataset.push(randomNum)
// }
// console.log(dataset)

gematriAppG.selectAll("rect")
  .data(datos)
  .enter()
  .append("rect")
  .attr("x", (d,i)=> i * (widthApp/4 / datos.length))
  .attr("y", d=> heightApp/2 - d.y)
  .attr("stroke","white")
  .attr("fill","white")
  .attr("height", (d,i) => d.x+i*5)
  .attr("width", "3px")


// DOWNLOAD SVG
const downloadAs = require('./utils/dowloadassvg.js')
d3.select('#savesvg').on('click', () => {
  downloadAs.svg('svg#main-svg', 'gematriapp.svg')
})




// let sz1 = 50;
// let sz2 = 20;
// let sz3 = 30;
// let pPath = `M 0,0 C -${sz2},-${sz2}, -${sz2},-${sz3} 0,-${sz1} C ${sz2},-${sz3} ${sz2},-${sz2} 0,0`;

// 1. Muestra efecto navbar-scroll si no es mobil NI Safari
// 2. CSS Bug fix para Apple devices en bagground-attachment: fixed

// Calcula FIBBO
// import calculaFibonacci from "./utils/utils"
// let btn = document.getElementById("btn")
// let valor = document.getElementById("input")
// let getValor = valor.value;
// valor.addEventListener("change", calculaFibonacci(getValor), false);
// btn.addEventListener("click", calculaFibonacci(getValor), false);




// --- Grafica
const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
  .force('link', d3.forceLink(links).distance((link) => link.distance))
  .force('center', d3.forceCenter(centerX, centerY));

const dragInteraction = d3.drag().on('drag', (event, node) => {
  node.fx = event.x;
  node.fy = event.y;
  simulation.alpha(1);
  simulation.restart();
});

const grafica = d3.select("#grafica")
                  .append('svg')
                  .attr('width', widthApp)
                  .attr('height', heightApp*1.5)
                  .append('g')
                  .attr('class', "group")
const lines = grafica
                  .selectAll('line')
                  .data(links)
                  .enter()
                  .append('line')
                  .attr('stroke', (link) => link.color || 'black');
const circles = grafica
                  .selectAll('circle')
                  .data(nodes)
                  .enter()
                  .append('circle')
                  .attr('fill', (node) => node.color || 'gray')
                  .attr('r', (node) => node.size)
                  .call(dragInteraction);
const text = grafica
                  .selectAll('text')
                  .data(nodes)
                  .enter()
                  .append('text')
                  .attr('id', (node) => node.id)
                  .attr('text-anchor', 'middle')
                  .attr('alignment-baseline', 'middle')
                  .style('pointer-events', 'none')
                  .text((node) => node.id);

simulation.on('tick', () => {

            circles
                  .attr('cx', (node) => node.x)
                  .attr('cy', (node) => node.y);
            text
                  .attr('x', (node) => node.x)
                  .attr('y', (node) => node.y)
                  .attr('id', (node) => node.id)
            lines
                  .attr('x1', (link) => link.source.x)
                  .attr('y1', (link) => link.source.y)
                  .attr('x2', (link) => link.target.x)
                  .attr('y2', (link) => link.target.y);
});









import { isMobileDevice, isSafari } from './utils/device-detection'
import { WebGLBufferRenderer } from 'three'

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





// NETWORK
// import { createCanvas } from 'algorithmx'

// const canvas = createCanvas('my_dataviz')
// canvas.size([window.innerWidth, window.innerHeight])

// // Mapa
// const canvas2 = canvas;
// canvas2.duration(2).edgelayout('symmetric').edgelength(14).zoom(2.3)

// const nodes2 = [0,1,2,3,4,5,6,7,8,9]
// canvas2.nodes(nodes2).add().size('0.3x')
// canvas2.node(1).color('#2BC4A9')
// canvas2.node(2).color('#e2777a').highlight()
// canvas2.node(3).color('#9F9FFF').highlight()
// canvas2.node(4).color('#FFFF9F').add({
//   labels: { 0: { text: "4", color:"black" } }
// })
// canvas2.node("diez").color('#2e2e2e').add({
//   shape: 'rect',
//   size: [8, 4],
//   pos: [0,-20],
//   labels: { 0: { text: '10', color:"grey" } }
// })
// canvas2.node(0).color('black')

// const edges2 = [[1,3],[3,4],[4,5],[5,7],[7,9],[9,0]]
// const edges2a = [[0,8],[8,7],[7,6],[6,4],[4,2],[2,1]]
// const edges2b = [[2,5],[5,8]]
// const edges2e = [[3,6],[6,9]]
// const edges2c = [["diez",1]]
// const edges2d = [[1,4],[4,7],[7,0]]
// canvas2.edges(edges2).thickness(0.5).add().traverse("grey")
// canvas2.edges(edges2a).thickness(0.5).color("grey")
// canvas2.edges(edges2b).thickness(0.5).color('#e2777a')
// canvas2.edges(edges2e).thickness(0.5).color('#9F9FFF')
// canvas2.edges(edges2c).add({ path: [[-1, 1], [1, -1]] }).thickness(0.1).color('grey')
// canvas2.pause(1.75)
// canvas2.edges(edges2d).duration(2).thickness(1).traverse('#FFFF9F').add()


// const canvas1 = canvas;
// canvas1.nodes([1, 10]).add({
//   shape: 'rect',
//   size: [5, 5]
// })
// canvas1.node(10).add({ fixed: true, pos: [-20, -50] })
// canvas1.edges([[1, 10], [1, 10, 'a'], [1, 10, 'b']]).add()
// canvas1.pause(4.5)

// canvas1.attrs({
//   nodes: {
//       // 1: { color: 'blue' },
//       10: { 
//         labels: { 0: { text: '+0+1234', color:"grey" } },
//         color: 'transparent', 
//         svgattrs: {"stroke-width": 0.2, 'stroke': '#2BC4A9'} }
//   },
//   edges: {
//       '1-10': {
//           color: {
//             // value: 'blue',
//             animtype: 'traverse',
//             highlight: true,
//           },
//           svgattrs: {
//             'stroke-width': 0.1,
//             'stroke': '#2BC4A9',
//             'stroke-dasharray': '1 1',
//           },
//           thickness: 0.5
//       },
//       '1-10-a': { color: 'white', thickness: 0.5,  },
//       '1-10-b': { color: 'black', thickness: 0.5 }
//   }
// })
