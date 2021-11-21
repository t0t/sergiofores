// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"eMWU8":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "23a4ec3421e9926e";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"4XkEm":[function(require,module,exports) {
var _dataJs = require("./data/data.js");
var _inicializargraficas = require("./utils/inicializargraficas");
// --- Grafica
const d3 = require('d3');
const simulation = d3.forceSimulation(_dataJs.nodes).force('charge', d3.forceManyBody().strength(_dataJs.MANY_BODY_STRENGTH)).force('link', d3.forceLink(_dataJs.links).distance((link)=>link.distance
)).force('center', d3.forceCenter(_inicializargraficas.centerX, _inicializargraficas.centerY));
const dragInteraction = d3.drag().on('drag', (event, node)=>{
    node.fx = event.x;
    node.fy = event.y;
    simulation.alpha(1);
    simulation.restart();
});
const grafica = d3.select("#grafica").append('svg').attr('width', _inicializargraficas.widthApp).attr('height', _inicializargraficas.heightApp * 1.5).append('g').attr('class', "group");
const lines = grafica.selectAll('line').data(_dataJs.links).enter().append('line').attr('stroke', 'black');
// .attr('stroke', (link) => link.color || 'black');
const circles = grafica.selectAll('circle').data(_dataJs.nodes).enter().append('circle').attr('fill', 'black')// .attr('fill', (node) => node.color || 'gray')
.attr('r', (node)=>node.size
).call(dragInteraction);
const text = grafica.selectAll('text').data(_dataJs.nodes).enter().append('text').attr('id', (node)=>node.id
).attr('text-anchor', 'middle').attr('alignment-baseline', 'middle').style('pointer-events', 'none').text((node)=>node.id
);
simulation.on('tick', ()=>{
    circles.attr('cx', (node)=>node.x
    ).attr('cy', (node)=>node.y
    );
    text.attr('x', (node)=>node.x
    ).attr('y', (node)=>node.y
    ).attr('id', (node)=>node.id
    );
    lines.attr('x1', (link)=>link.source.x
    ).attr('y1', (link)=>link.source.y
    ).attr('x2', (link)=>link.target.x
    ).attr('y2', (link)=>link.target.y
    );
});

},{"d3":"97vK6","./data/data.js":"4PhqF","./utils/inicializargraficas":"jhWEh"}],"4PhqF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nodes", ()=>nodes
);
parcelHelpers.export(exports, "links", ()=>links
);
parcelHelpers.export(exports, "MANY_BODY_STRENGTH", ()=>MANY_BODY_STRENGTH
);
var _colors = require("./colors");
const nodes = [];
const links = [];
const MAIN_NODE_SIZE = 35;
const CHILD_NODE_SIZE = 15;
const LEAF_NODE_SIZE = 4;
const DEFAULT_DISTANCE = 50;
const MAIN_NODE_DISTANCE = 50;
const LEAF_NODE_DISTANCE = 25;
const MANY_BODY_STRENGTH = -10;
let i1 = 0;
const addMainNode = (node)=>{
    node.size = MAIN_NODE_SIZE;
    node.color = _colors.colors[i1++][1];
    nodes.push(node);
};
const addChildNode = (parentNode, childNode, size = CHILD_NODE_SIZE, distance = DEFAULT_DISTANCE)=>{
    childNode.size = size;
    childNode.color = parentNode.color;
    nodes.push(childNode);
    links.push({
        source: parentNode,
        target: childNode,
        distance,
        color: parentNode.color
    });
};
const assembleChildNode = (parentNode, id, numLeaves = 3)=>{
    const childNode = {
        id
    };
    addChildNode(parentNode, childNode);
    for(let i = 0; i < numLeaves; i++)addChildNode(childNode, {
        id: ''
    }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
};
const connectMainNodes = (source, target)=>{
    links.push({
        source,
        target,
        distance: MAIN_NODE_DISTANCE,
        color: source.color
    });
};
const cuatro = {
    id: '4'
};
addMainNode(cuatro);
assembleChildNode(cuatro, 'Materia');
assembleChildNode(cuatro, 'Existencia');
assembleChildNode(cuatro, 'Tiempo');
assembleChildNode(cuatro, 'Estructura');
assembleChildNode(cuatro, 'Vida');
assembleChildNode(cuatro, 'tierra');
assembleChildNode(cuatro, 'hacer');
assembleChildNode(cuatro, 'Ritmo');
const uno = {
    id: '1'
};
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
const dos = {
    id: '2'
};
addMainNode(dos);
assembleChildNode(dos, 'Separacion');
assembleChildNode(dos, 'Reshimo');
assembleChildNode(dos, 'Membranas');
assembleChildNode(dos, 'Memoria');
assembleChildNode(dos, 'Sentir');
assembleChildNode(dos, 'Emocion', 5);
assembleChildNode(dos, 'Psique', 1);
assembleChildNode(dos, 'Agua');
const tres = {
    id: '3'
};
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

},{"./colors":"fj2eq","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fj2eq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "colors", ()=>colors
);
const colors = [
    [
        '#2BC4A9',
        '#2BC4A9',
        '#2BC4A9',
        '#2BC4A9',
        '#2BC4A9',
        "red"
    ],
    [
        '#FFFF9F',
        'black',
        '#FFFF9F',
        '#FFFF9F',
        '#FFFF9F',
        "red"
    ],
    [
        '#e2777a',
        '#e2777a',
        '#e2777a',
        '#e2777a',
        '#e2777a',
        "red"
    ],
    [
        '#9F9FFF',
        '#9F9FFF',
        '#9F9FFF',
        '#9F9FFF',
        '#9F9FFF',
        "red"
    ]
]; // export const colors = [
 //   ['#2BC4A9', '#2BC4A9', '#2BC4A9', '#2BC4A9', '#2BC4A9'],
 //   ['#FFFF9F', 'black', '#FFFF9F', '#FFFF9F', '#FFFF9F'],
 //   ['#e2777a', '#e2777a', '#e2777a', '#e2777a', '#e2777a'],
 //   ['#9F9FFF', '#9F9FFF', '#9F9FFF', '#9F9FFF', '#9F9FFF'],
 // ];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["eMWU8","4XkEm"], "4XkEm", "parcelRequirece68")

//# sourceMappingURL=index.21e9926e.js.map
