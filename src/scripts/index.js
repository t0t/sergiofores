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
let width = 450
let height = 450

const animcover = d3
  .select('#animcover')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

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
const x = d3
  .scaleOrdinal()
  .domain([1, 2, 3, 4, 5])
  .range([50, 50, 50, 50, 50])

// A color scale
const color = d3
  .scaleOrdinal()
  .domain([1, 2, 3, 4, 5])
  .range(['#FF6874', '#2BC4A9', '#9F9FFF', '#FFFF9F', 'transparent'])

const radiou = 48

// Initialize the circle: all located at the center of the svg area
let node = animcover
  .append('g')
  .selectAll('circle')
  .data(dataanimintro)
  .join('circle')
  .attr('r', radiou)
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .style('fill', d => color(d.group))
  .call(
    d3
      .drag() // call specific function when circle is dragged
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  )

// Features of the forces applied to the nodes:
var simulation = d3
  .forceSimulation()
  .force(
    'x',
    d3
      .forceX()
      .strength(0.3)
      .x(d => x(d.group))
  )
  .force(
    'y',
    d3
      .forceY()
      .strength(0.1)
      .y(height / 2)
  )
  .force(
    'center',
    d3
      .forceCenter()
      .x(width / 2)
      .y(height / 2)
  ) // Attraction to the center of the svg area
  .force('charge', d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
  .force(
    'collide',
    d3
      .forceCollide()
      .strength(8)
      .radius(radiou)
      .iterations(3)
  ) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation.nodes(dataanimintro).on('tick', d => {
  node.attr('cx', d => d.x).attr('cy', d => d.y)
})

// What happens when a circle is dragged?
function dragstarted (event, d) {
  if (!event.active) simulation.alphaTarget(0.03).restart()
  d.fx = d.x
  d.fy = d.y
}
function dragged (event, d) {
  d.fx = event.x
  d.fy = event.y
}
function dragended (event, d) {
  if (!event.active) simulation.alphaTarget(0.03)
  d.fx = null
  d.fy = null
}

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
// Ejecuta App sólo si existe el boton #lanza
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
  let widthApp = window.innerWidth
  let heightApp = window.innerHeight / 2

  const datos = [
    {
      id: 0,
      angle: 0,
      x: -60,
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

  radi = height / 2

  const container = d3
    .select('#grafica')
    .append('svg')
    .attr('width', widthApp)
    .attr('height', heightApp)

  const group = container
    .append('g')
    .attr('transform', `translate(${widthApp / 2},${heightApp / 2})`)
    .attr('id', 'grafic')

  // Ajusta svg y g a window
  d3.select(window).on('resize', e => {
    let iw = e.target.innerWidth
    let ih = e.target.innerHeight
    container.attr('width', iw).attr('height', ih / 2)
    group.attr('transform', `translate(${iw / 2},${ih / 4})`)
  })

  // Circulo grande
  group
    .append('circle')
    .attr('r', radi / 1.5)
    .attr('cx', radi / 2 - radi / 2)
    .attr('strokeWidth', '1px')
    .attr('fill', 'none')

  // Circulo grande2
  group
    .append('circle')
    .attr('r', radi / 1.5)
    .attr('cx', radi / 1.5)

  group
    .attr('stroke', datos[0].color)
    .attr('strokeWidth', '1px')
    .attr('fill', 'none')

  // Circulo grande2
  group
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

  group
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
  group
    .append('path')
    .attr('d', arco)
    .attr('stroke', 'none')

  group
    .append('path')
    .attr('d', arco2)
    .attr('transform', `rotate(360) translate(-${radi * 1.345} 0)`)
    .attr('stroke', 'none')

  // Uno
  group
    .append('circle')
    .attr('r', radi / 3)
    .attr('cx', radi / 3)
    .attr('stroke', datos[0].color)
    .attr('strokeWidth', '1px')
    .attr('fill', 'none')

  // Dos
  group
    .append('circle')
    .attr('r', radi / 3)
    .attr('cx', radi / 3 - radi / 1.5)
    .attr('stroke', datos[0].color)
    .attr('fill', 'none')
    .attr('strokeWidth', '1px')

  // Tres
  group
    .append('circle')
    .attr('r', radi / 3)
    .attr('cx', 0)
    .attr('stroke', datos[0].color)
    .attr('fill', 'none')
    .attr('strokeWidth', '1px')

  // Cuatro
  group
    .append('circle')
    .attr('r', radi / 3)
    .attr('cx', radi - radi / 3)
    .attr('stroke', datos[0].color)
    .attr('fill', 'none')
    .attr('strokeWidth', '1px')

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
    group
      .selectAll('line')
      .data(grafica)
      .enter()
      .append('line')
      .attr('stroke', datos[3].color)
      .attr('stroke-width', '10px')
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

import { createCanvas } from 'algorithmx'

const canvas = createCanvas('my_dataviz')

canvas.size([window.innerWidth, window.innerHeight]).zoom(2)

// NODOS

canvas
  .node(1)
  .add({ color: '#2BC4A9' })
  .label('arje')
  .add({ text: 'Tierra' })

canvas
  .node(2)
  .add({ color: '#e2777a' })
  .label('arje')
  .add({ text: 'Agua', angle: 45 })

canvas
  .node(3)
  .add({ color: '#9F9FFF' })
  .label('arje')
  .add({ text: 'Aire' })

canvas
  .node(4)
  .add({ color: '#FFFF9F' })
  .label('arje')
  .add({ text: 'Fuego' })
// .ease('elastic-in').size('1.5x').pause(0.5)
canvas
  .node(5)
  .add({ color: 'grey' })
  .label('arje')
  .add({ text: 'Logica' })
// .ease('elastic-in').size('1.5x').pause(0.5)
canvas
  .node(6)
  .add({ color: 'grey' })
  .label('arje')
  .add({ text: 'seis' })
// .ease('elastic-in').size('1.5x').pause(0.5)
canvas
  .node(7)
  .add({ color: 'grey' })
  .label('arje')
  .add({ text: 'Origen' })
// .ease('elastic-in').size('1.5x').pause(0.5)
canvas
  .node(8)
  .add({ color: 'grey' })
  .label('arje')
  .add({ text: 'Red' })
// .ease('elastic-in').size('1.5x').pause(0.5)
canvas
  .node(9)
  .add({ color: 'grey' })
  .label('arje')
  .add({ text: 'Propósito' })
// .ease('elastic-in').size('1.5x').pause(0.5)
canvas
  .node(0)
  .add({ color: 'black' })
  .label('arje')
  .add({ text: 'Vacío' })
// .ease('elastic-in').size('1.5x').pause(0.5)

// canvas.nodes([1,2,3]).add({ color: "red"})

// EDGES

canvas
  .edge([1, 2])
  .add()
  .label('cross')
  .add({ text: 'xxxxx' })

canvas
  .edge([1, 3])
  .add()
  .label('cross')
  .add({ text: 'xxxxxxx' })

canvas
  .edge([1, 4])
  .add()
  .label('cross')
  .add({ text: 'xxxxxxxx' })

canvas
  .edge([2, 3])
  .add()
  .label('cross')
  .add({ text: 'xxxxxxxx' })
canvas
  .edge([2, 4])
  .add()
  .label('cross')
  .add({ text: 'xxxxxxxx' })

canvas
  .edge([2, 1])
  .add()
  .label('cross')
  .add({ text: 'xxxxxxxx' })

canvas
  .edge([2, 5])
  .add()
  .label('cross')
  .add({ text: 'xxxxxxxx' })

canvas
  .edge([3, 1])
  .add()
  .label('cross')
  .add({ text: 'xxx' })

canvas
  .edge([3, 2])
  .add()
  .label('cross')
  .add({ text: 'xxx' })

canvas
  .edge([3, 4])
  .add()
  .label('cross')
  .add({ text: 'xxxxxx' })

canvas
  .edge([3, 6])
  .add()
  .label('cross')
  .add({ text: 'xxx' })

canvas
  .edge([4, 5])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([4, 6])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([4, 7])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([5, 6])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([5, 8])
  .add()
  .label('cross')
  .add({ text: 'xxx' })

canvas
  .edge([5, 6])
  .add()
  .label('cross')
  .add({ text: 'xxx' })

canvas
  .edge([7, 5])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([7, 0])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([7, 6])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([7, 8])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([7, 9])
  .add()
  .label('cross')
  .add({ text: 'xxx' })

canvas
  .edge([8, 9])
  .add()
  .label('cross')
  .add({ text: 'xxxxx' })

canvas
  .edge([8, 9])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([6, 9])
  .add()
  .label('cross')
  .add({ text: 'xxx' })
  
canvas
  .edge([8, 0])
  .add()
  .label('cross')
  .add({ text: 'xxxx' })

canvas
  .edge([9, 7])
  .add()
  .label('cross')
  .add({ text: 'xxxxxx' })

canvas
  .edge([9, 0])
  .add()
  .label('cross')
  .add({ text: 'xxxxxx' })
// canvas
//   .edge([0, 1]).add()
//   .label('cross')
//   .add({ text: 'xxxxxx' })
