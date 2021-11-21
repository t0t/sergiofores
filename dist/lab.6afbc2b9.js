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
})({"eFcFJ":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "0f6d4e586afbc2b9";
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

},{}],"ark9W":[function(require,module,exports) {
var _gematriaap = require("./utils/gematriaap");
// APP
const d3 = require('d3');
let frnegativa, frpositiva, diasfinanyo, diahoy, agnio;
let arjesArray = [];
class Mapa {
    constructor(text, diasfinanyo1, cadenanums, frnegativa1){
        this.colors = [
            "#2BC4A9",
            "#FF6874",
            "#9F9FFF",
            "#FFFF9F"
        ];
        this.text = text;
        this.diasfinanyo = diasfinanyo1;
        this.frpositiva = frpositiva;
        this.frnegativa = frnegativa1;
        this.cadenanums = cadenanums;
    }
    getDia() {
        return diahoy;
    }
    getFrecPositiva() {
        return frpositiva;
    }
    getColors() {
        this.colors.forEach((color)=>{
            console.log(color);
        });
    }
    cadenanums() {
    }
    pintacolors() {
    }
    diasfinanyo() {
    }
    diasfinanyo() {
    }
}
let newMap = new Mapa();
console.log(newMap.getColors());
// DB datos
const gematriAppData = require("./data/datos.json");
const datos = gematriAppData.datos;
const gematriApp = d3.select("#gematriApp").append('svg').attr('width', widthApp).attr('height', heightApp).attr('id', "main-svg");
const gematriAppG = gematriApp.append('g').attr('transform', `translate(${centerX}, ${centerY})`);
// centra g on resize window
d3.select(window).on('resize', updateWindow);
function updateWindow(e) {
    let iw = e.target.innerWidth;
    let ih = e.target.innerHeight;
    gematriApp.attr('width', iw).attr('height', ih / 2);
    gematriAppG.attr('transform', `translate(${iw / 2}, ${ih / 4})`);
    if (iw < 964) outputTexts.attr('transform', `translate(${iw / 2}, 0)`);
}
//Arjés: Uno, Dos, Tres....
const arjes = gematriAppG.selectAll("text").data(datos);
arjes.enter().append("text").text((d)=>`${d.title}`
).attr("x", (d)=>`${d.x}`
).attr("y", (d)=>`${d.y}`
).attr("fill", (d)=>`${d.color}`
);
const dropdownButton = d3.select("#gematriApp").append('select').selectAll('option').data(datos).enter().append('option').text((d)=>d.title
) // text showed in the menu
.attr("value", (d)=>d.color
);
// Escalas
const x = d3.scaleLinear().domain([
    0,
    d3.max(datos, (d)=>d.x
    )
]).range([
    0,
    innerWidth
]);
const y = d3.scaleLinear().domain([
    0,
    d3.max(datos, (d)=>d.y
    )
]).range([
    -0,
    innerHeight / 8
]);
const xAxisCall = d3.axisTop(x);
// Regla
const reglas = gematriAppG.append("g").attr("class", "x axis").attr('transform', `translate(${-centerX}, ${centerY})`).call(xAxisCall);
reglas.selectAll("rect").data(datos);
// Todos los circulos
const circulos = gematriAppG.selectAll("circle").data(datos);
circulos.enter().append("circle").attr("cx", (d)=>x(d.x)
).attr("cy", (d)=>y(d.y)
).attr("r", (d)=>d.r
).attr("stroke", (d)=>d.color
);
let areaFrecuencia = gematriAppG.append("circle").attr("cx", centerX / 2.5).attr("cy", 70).style("fill", "white").style("opacity", 0.05).attr("r", 1);
// Input Pon tu frecuencia a mano
d3.select("#inputfrecuencia").on("input", updateInput);
function updateInput() {
    areaFrecuencia.attr("r", this.value);
}
// Dropdown
dropdownButton.on("change", (e)=>{
    areaFrecuencia.style("stroke", e.target.value);
});
d3.select("#fechanacimiento").on("change", updateFecha);
function updateFecha(e) {
    let fechaNacimientoUsuario = e.target.value;
    frpositiva = parseInt(_gematriaap.inputFecha(fechaNacimientoUsuario));
    frnegativa = parseInt(frpositiva - _gematriaap.obtenerCantidadDias(agnio));
    fecha.text(`${frpositiva} ${frnegativa}`).classed("result result--anim", true);
}
let outputTexts = gematriAppG.append("g");
let fecha = outputTexts.append("text").attr("x", -centerX / 2 + 25).attr("y", -5);
let fr = outputTexts.append("text").attr("x", -centerX / 2 + 25).attr("y", 30);
d3.select("#entrada").on("keyup", updateFrecuencia);
function updateFrecuencia(e) {
    let entradaTexto = e.target.value;
    let result = _gematriaap.traduceTexto(entradaTexto);
    updateArjesArray(result);
    Mapa.frpositiva = result;
    fr.text(result).classed("result result--anim", true);
}
// Dias que quedan y transcurridos
outputTexts.append("text").attr("x", -centerX / 2 + 25).attr("y", 60).classed("result result--anim", true).text(()=>{
    diahoy = _gematriaap.diasTranscurridos(new Date());
    diasfinanyo = _gematriaap.obtenerCantidadDias(agnio) - diahoy;
    return `${diahoy}-${diasfinanyo}`;
});
function updateArjesArray(dato) {
    arjesArray.push(dato);
    for(let i = 0; i < arjesArray.length; i++){
        let string = arjesArray.join("");
        let newArray = string.split('').map(Number);
        outputTexts.selectAll("circle").data(newArray).enter().append("circle").attr("r", (d)=>d * 10
        ).attr("cx", (d)=>-centerX + d * 10
        ).attr("cy", (d)=>d * d
        ).attr("stroke-width", "1").attr("stroke", (d, i)=>{
            return `rgb(${arjesArray[1] + d * 10},${arjesArray[2] + d * 10},${arjesArray[3] + d * 10})`;
        });
    }
}
gematriAppG.selectAll("rect").data(datos).enter().append("rect").attr("x", (d, i)=>i * (widthApp / 4 / datos.length)
).attr("y", (d)=>heightApp / 2 - d.y
).attr("stroke", "white").attr("fill", "white").attr("height", (d, i)=>d.x + i * 5
).attr("width", "3px");
// DOWNLOAD SVG
const downloadAs = require('./utils/dowloadassvg.js');
d3.select('#savesvg').on('click', ()=>{
    downloadAs.svg('svg#main-svg', 'gematriapp.svg');
});

},{"d3":"97vK6","./utils/gematriaap":"3Ngm5","./data/datos.json":"i2wOf","./utils/dowloadassvg.js":"7uRyG"}],"3Ngm5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "traduceTexto", ()=>traduceTexto
);
parcelHelpers.export(exports, "inputFecha", ()=>inputFecha
);
// dias del año transcurridos hasta hoy
parcelHelpers.export(exports, "diasTranscurridos", ()=>diasTranscurridos
);
// Codigo nombre
parcelHelpers.export(exports, "extraeValoresLetras", ()=>extraeValoresLetras
);
parcelHelpers.export(exports, "obtenerCantidadDias", ()=>obtenerCantidadDias
);
function traduceTexto(inputtxt) {
    let normaliza = inputtxt.toLowerCase();
    const removeAccents = (str)=>{
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    let textoIntroducido = removeAccents(normaliza);
    return extraeValoresLetras(textoIntroducido).reduce((a, v)=>(a += v, +a)
    , 0);
}
function inputFecha(f1) {
    var aFecha1 = f1.split('-') // ['1975', '10', '15']
    ;
    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2]);
    var fFecha2 = Date.UTC(aFecha1[0], -0, 0);
    agnio = aFecha1[0];
    var dif = (fFecha1 - fFecha2) / 86400000;
    return Math.floor(dif);
}
function diasTranscurridos(fechaactual) {
    let previo = new Date(fechaactual.getFullYear(), 0, 1);
    let actual = new Date(fechaactual.getTime());
    return Math.ceil((actual - previo + 1) / 86400000);
}
function extraeValoresLetras(cadenaTexto) {
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
    };
    if (cadenaTexto.length == 1) return diccionario[cadenaTexto] || ' ';
    return cadenaTexto.split('').map(extraeValoresLetras);
}
function esAgnioBisiesto(agnio) {
    return agnio % 400 == 0 || agnio % 100 != 0 && agnio % 4 == 0;
}
function obtenerCantidadDias(agnio) {
    return esAgnioBisiesto(agnio) ? 366 : 365;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"i2wOf":[function(require,module,exports) {
module.exports = JSON.parse("{\"datos\":[{\"id\":0,\"x\":0,\"cx\":17,\"y\":0,\"cy\":0,\"r\":50,\"lupa\":30,\"color\":\"white\",\"title\":\"Cero\",\"nombre\":\"0\",\"tags\":[\"infinito\",\"vacio\",\"actualización\"]},{\"id\":1,\"x\":100,\"cx\":100,\"y\":0,\"cy\":-50,\"r\":50,\"lupa\":24,\"color\":\"#2BC4A9\",\"title\":\"Uno\",\"nombre\":\"1\",\"tags\":[\"Tierra\",\"Materia\",\"Vida\"]},{\"id\":2,\"x\":365,\"cx\":15,\"y\":50,\"cy\":50,\"r\":20,\"lupa\":13,\"color\":\"#FF6874\",\"title\":\"Dos\",\"nombre\":\"2\",\"tags\":[\"agua\",\"separación\",\"emocion\",\"proteccion\"]},{\"id\":3,\"x\":19,\"cx\":19,\"y\":-45,\"cy\":-45,\"r\":30,\"lupa\":55,\"color\":\"#9F9FFF\",\"title\":\"Tres\",\"nombre\":\"3\",\"tags\":[\"aire\",\"simbolo\",\"encuentro\",\"analogia\"]},{\"id\":4,\"x\":0,\"cx\":0,\"y\":76,\"cy\":76,\"r\":40,\"lupa\":212,\"color\":\"#FFFF9F\",\"title\":\"Cuatro\",\"nombre\":\"4\",\"tags\":[\"fuego\",\"identidad\",\"mundo\",\"techo\"]},{\"id\":5,\"x\":17,\"cx\":17,\"y\":59,\"cy\":59,\"r\":50,\"lupa\":365,\"color\":\"grey\",\"title\":\"Cinco\",\"nombre\":\"5\",\"tags\":[\"matriz\",\"lógica\",\"arjé\"]},{\"id\":6,\"x\":12,\"cx\":12,\"y\":-45,\"cy\":-45,\"r\":60,\"lupa\":153,\"color\":\"grey\",\"title\":\"Seis\",\"nombre\":\"6\",\"tags\":[\"posibilidades\",\"universos\",\"oportunidad\"]},{\"id\":7,\"x\":25,\"cx\":38,\"y\":0,\"cy\":13,\"r\":50,\"lupa\":319,\"color\":\"red\",\"title\":\"Siete\",\"nombre\":\"7\",\"tags\":[\"origen\",\"tzimtzum\",\"genuino\"]},{\"id\":8,\"x\":50,\"cx\":50,\"y\":72,\"cy\":72,\"r\":80,\"lupa\":3,\"color\":\"grey\",\"title\":\"Ocho\",\"nombre\":\"8\",\"tags\":[\"red\",\"circuitos globales\",\"secuencia completa\"]},{\"id\":9,\"x\":74,\"cx\":74,\"y\":-45,\"cy\":-45,\"r\":90,\"lupa\":46,\"color\":\"grey\",\"title\":\"Nueve\",\"nombre\":\"9\",\"tags\":[\"propósito\",\"discernimiento\",\"foco\"]}]}");

},{}],"7uRyG":[function(require,module,exports) {
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.downloadAs = t() : e.downloadAs = t();
}(window, function() {
    return (function(e1) {
        var t1 = {
        };
        function n(o) {
            if (t1[o]) return t1[o].exports;
            var r = t1[o] = {
                i: o,
                l: !1,
                exports: {
                }
            };
            return e1[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
        }
        return n.m = e1, n.c = t1, n.d = function(e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            });
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for(var r in e)n.d(o, r, (function(t) {
                return e[t];
            }).bind(null, r));
            return o;
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return n.d(t, "a", t), t;
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, n.p = "", n(n.s = 0);
    })([
        function(e2, t2, n1) {
            "use strict";
            n1.r(t2);
            let o1 = null;
            const r1 = "TRIGGER__" + Math.random();
            var u1 = {
                download (e, t) {
                    document.getElementById(r1) ? o1 = document.getElementById(r1) : ((o1 = document.createElement("a")).id = r1, o1.target = "_blank", document.body.appendChild(o1)), o1.download = t, o1.href = e, o1.click();
                }
            }, c1 = (e, t)=>{
                const n = "data:image/svg+xml;utf8," + document.querySelector(e).outerHTML.replace(/"/g, "'").replace(/[\r\n%#()<>?\[\\\]^`{|}]/g, encodeURIComponent);
                u1.download(n, t);
            }, d1 = (e, t)=>{
                var n = "data:text/plain;charset=utf-8," + encodeURIComponent(e);
                u1.download(n, t);
            }, a = (e3, t, n2 = "png")=>{
                e3.toBlob(function(e) {
                    var n = document.createElement("img"), o = URL.createObjectURL(e);
                    n.onload = function() {
                        URL.revokeObjectURL(o);
                    }, u1.download(o, t);
                }, `image/${n2}`, 1);
            }, i = (e, t)=>{
                const n = document.querySelector(e), o = (new XMLSerializer).serializeToString(n), r = "data:image/svg+xml;base64," + btoa(o), u = document.createElement("canvas");
                u.width = 200, u.height = 200;
                const c = u.getContext("2d"), d = new Image;
                d.onload = function() {
                    c.drawImage(d, 0, 0), a(u, t);
                }, d.src = r;
            };
            n1.d(t2, "svg", function() {
                return c1;
            }), n1.d(t2, "txt", function() {
                return d1;
            }), n1.d(t2, "cnv", function() {
                return a;
            }), n1.d(t2, "svgpng", function() {
                return i;
            });
        }
    ]);
});

},{}]},["eFcFJ","ark9W"], "ark9W", "parcelRequirece68")

//# sourceMappingURL=lab.6afbc2b9.js.map
