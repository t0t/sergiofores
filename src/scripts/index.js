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
import { crearSVG, widthApp, heightApp, centerX, centerY, elemento } from "./utils/inicializargraficas"

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
let btnGenerar = document.getElementById('lanza')

// Ejecuta App sólo si existe el boton #lanza App
if (btnGenerar) {
  let input = document.getElementById('entrada')
  let output = document.querySelector('.output')
  let fechaNacimiento = document.getElementById('fechanacimiento')
  let fechaNacimientoUsuario = 10,
    entradaTexto = '',
    frnegativa,
    frpositiva,
    diasfinanyo,
    diahoy,
    agnio,
    frpalabras = 10,
    radi
  

  const datos = [
    {
      id: 0,
      angle: 0,
      x: -260,
      y: 0,
      lupa: 3,
      color: 'black',
      nombre: '0'
    },
    {
      id: 1,
      angle: 0,
      x: 35,
      y: 0,
      lupa: 24,
      color: '#2BC4A9',
      nombre: '1'
    },
    {
      id: 2,
      angle: 0,
      x: 15,
      y: 50,
      lupa: 13,
      color: '#FF6874',
      nombre: '2'
    },
    {
      id: 3,
      angle: 0,
      x: 15,
      y: -45,
      lupa: 4,
      color: '#9F9FFF',
      nombre: '3'
    },
    {
      id: 4,
      angle: 0,
      x: 0,
      y: 0,
      lupa: 3,
      color: '#FFFF9F',
      nombre: '4'
    },
    {
      id: 5,
      angle: 0,
      x: -17,
      y: 50,
      lupa: 3,
      color: 'grey',
      nombre: '5'
    },
    {
      id: 6,
      angle: 0,
      x: -17,
      y: -45,
      lupa: 3,
      color: 'grey',
      nombre: '6'
    },
    {
      id: 7,
      angle: 0,
      x: -38,
      y: 0,
      lupa: 3,
      color: 'grey',
      nombre: '7'
    },
    {
      id: 8,
      angle: 0,
      x: -50,
      y: 50,
      lupa: 3,
      color: 'grey',
      nombre: '8'
    },
    {
      id: 9,
      angle: 0,
      x: -50,
      y: -45,
      lupa: 3,
      color: 'grey',
      nombre: '9'
    }
  ]

  radi = heightApp / 2

  // Ajusta svg y g a window
  d3.select(window).on('resize', e => {
    let iw = e.target.innerWidth
    let ih = e.target.innerHeight
    container.attr('width', iw).attr('height', ih / 2)
    group.attr('transform', `translate(${iw / 2},${ih / 4})`)
  })

  // --- APP
  const grafica2 = d3.select("#graficaApp")
    .append('svg')
    .attr('width', widthApp)
    .attr('height', heightApp)
    .append('g')
    .attr('fill', "red")
    .attr('transform', `translate(${centerX},${centerY})`)
    .attr('class', "group")

  // Circulo grande
  grafica2
    .append('circle')
    .attr('r', radi / 1.5)
    .attr('cx', radi / 2 - radi / 2)
    .attr('strokeWidth', '1px')
    .attr('fill', 'none')

  // Circulo grande2
  grafica2
    .append('circle')
    .attr('r', radi / 1.5)
    .attr('cx', radi / 1.5)

  grafica2
    .attr('stroke', datos[0].color)
    .attr('strokeWidth', '1px')
    .attr('fill', 'none')

  // Circulo grande2
  grafica2
    .append('circle')
    .attr('r', radi / 1.5)
    .attr('cx', -(radi / 1.5))
    .attr('stroke', datos[0].color)
    .on('mouseover', e => {
      e.target.style.fill = datos[0].color
    })
    .on('mouseout', e => {
      e.target.style.fill = datos[1].color
    })

  // https://bl.ocks.org/mbostock/3151228

  grafica2
    .selectAll('text')
    .data(datos)
    .enter()
    .append('text')
    .attr('x', d => d.x * Math.PI)
    .attr('y', d => d.y)
    .attr('transform', d => {
      return `translate(${d.x}, ${d.y})`
    })
    .text(d => d.nombre)
    .attr('fill', d => d.color)

  const arco = d3
    .arc()
    .innerRadius(129)
    .outerRadius(131)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2)

  const arco2 = d3
    .arc()
    .innerRadius(129)
    .outerRadius(135)
    .startAngle(Math.PI * 2)
    .endAngle(10)

  // Arcos
  grafica2
    .append('path')
    .attr('d', arco)
    .attr('stroke', 'none')

  // Uno
  grafica2
    .append('circle')
    .attr('r', radi / 3)
    .attr('cx', radi / 3)
    .attr('stroke', datos[0].color)
    .attr('strokeWidth', '1px')
    .attr('fill', 'none')

  // Input fecha
  fechaNacimiento.addEventListener('change', e => {
    fechaNacimientoUsuario = e.target.value
    frpositiva = parseInt(inputFecha(fechaNacimientoUsuario))
    frnegativa = parseInt(frpositiva - obtenerCantidadDias(agnio))
  })

  // BTN Generar Grafica
  btnGenerar.addEventListener('click', () => {
    entradaTexto = input.value //inserta input texto
    let normaliza = entradaTexto.toLowerCase()
    const removeAccents = str => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
    let textoIntroducido = removeAccents(normaliza)
    frpalabras = extraeValoresLetras(textoIntroducido).reduce(
      (a, v) => ((a += v), +a),
      0
    )

    let fechaActual = new Date()
    diahoy = diasTranscurridos(fechaActual)
    diasfinanyo = obtenerCantidadDias(agnio) - diahoy

    let grafica = [frpalabras, diahoy, diasfinanyo, frpositiva, frnegativa]

    // grafica lineas output
    grafica2
      .selectAll('line')
      .data(grafica)
      .enter()
      .append('line')
      .attr('stroke', datos[3].color)
      .attr('stroke-width', '2px')
      .attr('stroke-dasharray', '4 4')
      .attr('x1', '0')
      .attr('y1', '0')
      .attr('x2', d => d)
      .attr('y2', '100')
      .exit()

    output.classList.add('resultado')

    output.innerHTML = `
        <h2>${frpalabras}</h2>
        <h2>${diahoy}-${diasfinanyo}</h2>
        <h2>${frpositiva}${frnegativa}</h2>
        `
  })

  function inputFecha (f1) {
    var aFecha1 = f1.split('-') // ['1975', '10', '15']
    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2])
    var fFecha2 = Date.UTC(aFecha1[0], -0, 0)
    agnio = aFecha1[0]
    var dif = (fFecha1 - fFecha2) / (1000 * 60 * 60 * 24)
    return Math.floor(dif)
  }

  // dias del año transcurridos hasta hoy
  function diasTranscurridos (fechaactual) {
    let previo = new Date(fechaactual.getFullYear(), 0, 1)
    let actual = new Date(fechaactual.getTime())

    return Math.ceil((actual - previo + 1) / 86400000)
  }

  // Codigo nombre
  function extraeValoresLetras (cadenaTexto) {
    const diccionario = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      ñ: 15,
      o: 16,
      p: 17,
      q: 18,
      r: 19,
      s: 20,
      t: 21,
      u: 22,
      v: 23,
      w: 24,
      x: 25,
      y: 26,
      z: 27
    }

    if (cadenaTexto.length == 1) {
      return diccionario[cadenaTexto] || ' '
    }
    return cadenaTexto.split('').map(extraeValoresLetras)
  }

  function esAgnioBisiesto (agnio) {
    return agnio % 400 == 0 || (agnio % 100 != 0 && agnio % 4 == 0)
  }

  function obtenerCantidadDias (agnio) {
    return esAgnioBisiesto(agnio) ? 366 : 365
  }
} // fin App

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



// const width = +window.innerWidth;
// const height = +window.innerHeight;



// crearSVG("grafica2","circle", [1,2])

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

// --- Grafica
const grafica = d3.select("#grafica")
                  .append('svg')
                  .attr('width', widthApp)
                  .attr('height', heightApp*1.5)
                  .append('g')
                  .attr("transform", `translate(${widthApp}px, ${heightApp}px)`)
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
