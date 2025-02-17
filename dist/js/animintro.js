// set the dimensions and margins of the graph
var width = 450
var height = 450

// append the svg object to the body of the page
var svg = d3.select("#animcover")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// create dummy data -> just one element per circle
const ddttss = [
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
const radio = 48;

// Initialize the circle: all located at the center of the svg area
let node = svg.append("g")
  .selectAll("circle")
  .data(ddttss)
  .join("circle")
    .attr("r", radio)
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
  .force("collide", d3.forceCollide().strength(8).radius(radio).iterations(3)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(ddttss)
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
