// APP
const d3 = require('d3')
// DB datos
const gematriAppData = require("./data/datos.json")

const datos = gematriAppData.datos

let frnegativa, frpositiva, diasfinanyo, diahoy, agnio

let arjesArray = []

console.log("APP")

import {inputFecha, obtenerCantidadDias, traduceTexto, diasTranscurridos} from "./utils/gematriaap"
import { widthApp, heightApp, centerX, centerY } from "./utils/inicializargraficas"

const gematriApp = d3.select("#gematriApp")
  .append('svg')
  .attr('width', widthApp)
  .attr('height', heightApp)
  .attr('id', "main-svg")
console.log(gematriApp)
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
  if(iw < 964) {
    outputTexts
      .attr('transform', `translate(${iw/2}, 0)`)
  }
}
//Arjés: Uno, Dos, Tres....
const arjes = gematriAppG.selectAll("text").data(datos)
  arjes.enter().append("text")
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

  d3.select("#fechanacimiento").on("change", updateFecha )
  function updateFecha(e) {
    let fechaNacimientoUsuario = e.target.value
      frpositiva = parseInt(inputFecha(fechaNacimientoUsuario))
      frnegativa = parseInt(frpositiva - obtenerCantidadDias(agnio))
    fecha
      .text(`${frpositiva} ${frnegativa}`)
      .classed("result result--anim", true)
    }
  
  let outputTexts = gematriAppG.append("g")
  
  let fecha = outputTexts
    .append("text")
    .attr("x", -centerX/2+25)
    .attr("y", -5)

  let fr = outputTexts
    .append("text")
    .attr("x", -centerX/2+25)
    .attr("y", 30)
  
  
    d3.select("#entrada").on("keyup", updateFrecuencia )
    function updateFrecuencia(e) {
      let entradaTexto = e.target.value
      let result = traduceTexto(entradaTexto)
      updateArjesArray(result)
      fr
        .text(result)
        .classed("result result--anim", true)
    }
      
    // Dias que quedan y transcurridos
    outputTexts
      .append("text")
      .attr("x", -centerX/2+25)
      .attr("y", 60)
      .classed("result result--anim", true)
      .text(() => {
        diahoy = diasTranscurridos(new Date())
        diasfinanyo = obtenerCantidadDias(agnio) - diahoy
        return `${diahoy}-${diasfinanyo}`
      })



function updateArjesArray(dato) {
  arjesArray.push(dato)
  for (let i = 0; i < arjesArray.length; i++) {
    let string = arjesArray.join("")
    let newArray = string.split('').map(Number)
    outputTexts.selectAll("circle")
    .data(newArray).enter()
    .append("circle")
    .attr("r",(d) => d*10)
    .attr("cx",d => -centerX+d*10)
    .attr("cy",d => d*d)
    .attr("stroke-width", "1")
    .attr("stroke", (d, i)=> {
        return `rgb(${arjesArray[1]+d*10},${arjesArray[2]+d*10},${arjesArray[3]+d*10})`        
    })
  }
}

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
