import { colors } from './colors';

export const nodes = [];
export const links = [];

const MAIN_NODE_SIZE = 35;
const CHILD_NODE_SIZE = 15;
const LEAF_NODE_SIZE = 4;
const DEFAULT_DISTANCE = 100;
const MAIN_NODE_DISTANCE = 100;
const LEAF_NODE_DISTANCE = 25;
export const MANY_BODY_STRENGTH = -10;

let i = 0;

const addMainNode = (node) => {
  node.size = MAIN_NODE_SIZE;
  node.color = colors[i++][1];
  nodes.push(node);
};

const addChildNode = (
  parentNode,
  childNode,
  size = CHILD_NODE_SIZE,
  distance = DEFAULT_DISTANCE
) => {
  childNode.size = size;
  childNode.color = parentNode.color;
  nodes.push(childNode);
  links.push({
    source: parentNode,
    target: childNode,
    distance,
    color: parentNode.color,
  });
};

const assembleChildNode = (parentNode, id, numLeaves = 3) => {
  const childNode = { id };
  addChildNode(parentNode, childNode);

  for (let i = 0; i < numLeaves; i++) {
    addChildNode(childNode, { id: '' }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
  }
};

const connectMainNodes = (source, target) => {
  links.push({
    source,
    target,
    distance: MAIN_NODE_DISTANCE,
    color: source.color
  });
};

const cuatro = { id: '4' };
addMainNode(cuatro);
assembleChildNode(cuatro, 'Materia');
assembleChildNode(cuatro, 'Existencia');
assembleChildNode(cuatro, 'Tiempo');
assembleChildNode(cuatro, 'Estructura');
assembleChildNode(cuatro, 'Vida');
assembleChildNode(cuatro, 'tierra');
assembleChildNode(cuatro, 'hacer');
assembleChildNode(cuatro, 'Ritmo');

const uno = { id: '1' };
addMainNode(uno);
assembleChildNode(uno, 'Identidad');
assembleChildNode(uno, 'Mundo');
assembleChildNode(uno, 'Techo');
assembleChildNode(uno, 'Foco');
assembleChildNode(uno, 'Fuego');
assembleChildNode(uno, 'Discernimiento');
assembleChildNode(uno, 'Voluntad');
assembleChildNode(uno, 'Diseño');
assembleChildNode(uno, 'Ser');

const dos = { id: '2' };
addMainNode(dos);
assembleChildNode(dos, 'Separacion');
assembleChildNode(dos, 'Reshimo');
assembleChildNode(dos, 'Membranas');
assembleChildNode(dos, 'Memoria');
assembleChildNode(dos, 'Sentir');
assembleChildNode(dos, 'Emocion', 5);
assembleChildNode(dos, 'Psique', 1);
assembleChildNode(dos, 'Agua');

const tres = { id: '3' };
addMainNode(tres);
assembleChildNode(tres, 'Aire');
assembleChildNode(tres, 'Encuentro');
assembleChildNode(tres, 'Analogía', 3);
assembleChildNode(tres, 'Simbolo', 3);
assembleChildNode(tres, 'Decir', 3);
assembleChildNode(tres, 'Transmitir', 3);
assembleChildNode(tres, 'Trascender', 3);

connectMainNodes(uno, cuatro);
connectMainNodes(uno, dos);
connectMainNodes(cuatro, dos);
connectMainNodes(tres, dos);
connectMainNodes(tres, cuatro);
connectMainNodes(tres, uno);
