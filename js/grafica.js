// --- Grafica
const d3 = require('d3')

import { nodes, links, MANY_BODY_STRENGTH } from './data/data.js';
import { widthApp, heightApp, centerX, centerY } from "./utils/inicializargraficas"

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
                  .attr('stroke', 'black');
                  // .attr('stroke', (link) => link.color || 'black');
const circles = grafica
                  .selectAll('circle')
                  .data(nodes)
                  .enter()
                  .append('circle')
                  .attr('fill', 'black')
                  // .attr('fill', (node) => node.color || 'gray')
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
