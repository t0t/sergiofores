// import {d3} from "node_modules/d3/dist/d3.min.js"
const d3 = require('d3')
export let widthApp = window.innerWidth
export let heightApp = window.innerHeight / 2
export const centerX = widthApp /2;
export const centerY = heightApp / 2;

// Inicializa cualquier svgs
function crearGraficaSVG(nombre) {
  const container = d3
  .select(`#${nombre}`)
  .append('svg')
  .attr('width', widthApp)
  .attr('height', heightApp)
  
  group = container
  .append('g')
  .attr('transform', `translate(${widthApp / 2},${heightApp / 2})`)
  .attr('class', `${nombre}`)
  
  return group
}


export function crearSVG(canvasname, el, data) {
  const elemento = crearGraficaSVG(`${canvasname}`)
    .select(`${el}`)
    .data(data)
    .enter()

    return elemento;
}
// export function crearLineas(el, data) {
//   const line = crearSVG(canvasname, el, data)
//     .selectAll(`${el}`)
//     .data(data)
//     .enter()

//     return line;
// }
