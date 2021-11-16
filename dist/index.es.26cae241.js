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
})({"lE8I5":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "2d49982b26cae241";
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

},{}],"6uzu9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AElement", ()=>AElement
);
parcelHelpers.export(exports, "AnimateColorElement", ()=>AnimateColorElement
);
parcelHelpers.export(exports, "AnimateElement", ()=>AnimateElement
);
parcelHelpers.export(exports, "AnimateTransformElement", ()=>AnimateTransformElement
);
parcelHelpers.export(exports, "BoundingBox", ()=>BoundingBox
);
parcelHelpers.export(exports, "CB1", ()=>CB1
);
parcelHelpers.export(exports, "CB2", ()=>CB2
);
parcelHelpers.export(exports, "CB3", ()=>CB3
);
parcelHelpers.export(exports, "CB4", ()=>CB4
);
parcelHelpers.export(exports, "Canvg", ()=>Canvg
);
parcelHelpers.export(exports, "CircleElement", ()=>CircleElement
);
parcelHelpers.export(exports, "ClipPathElement", ()=>ClipPathElement
);
parcelHelpers.export(exports, "DefsElement", ()=>DefsElement
);
parcelHelpers.export(exports, "DescElement", ()=>DescElement
);
parcelHelpers.export(exports, "Document", ()=>Document
);
parcelHelpers.export(exports, "Element", ()=>Element
);
parcelHelpers.export(exports, "EllipseElement", ()=>EllipseElement
);
parcelHelpers.export(exports, "FeColorMatrixElement", ()=>FeColorMatrixElement
);
parcelHelpers.export(exports, "FeCompositeElement", ()=>FeCompositeElement
);
parcelHelpers.export(exports, "FeDropShadowElement", ()=>FeDropShadowElement
);
parcelHelpers.export(exports, "FeGaussianBlurElement", ()=>FeGaussianBlurElement
);
parcelHelpers.export(exports, "FeMorphologyElement", ()=>FeMorphologyElement
);
parcelHelpers.export(exports, "FilterElement", ()=>FilterElement
);
parcelHelpers.export(exports, "Font", ()=>Font
);
parcelHelpers.export(exports, "FontElement", ()=>FontElement
);
parcelHelpers.export(exports, "FontFaceElement", ()=>FontFaceElement
);
parcelHelpers.export(exports, "GElement", ()=>GElement
);
parcelHelpers.export(exports, "GlyphElement", ()=>GlyphElement
);
parcelHelpers.export(exports, "GradientElement", ()=>GradientElement
);
parcelHelpers.export(exports, "ImageElement", ()=>ImageElement
);
parcelHelpers.export(exports, "LineElement", ()=>LineElement
);
parcelHelpers.export(exports, "LinearGradientElement", ()=>LinearGradientElement
);
parcelHelpers.export(exports, "MarkerElement", ()=>MarkerElement
);
parcelHelpers.export(exports, "MaskElement", ()=>MaskElement
);
parcelHelpers.export(exports, "Matrix", ()=>Matrix
);
parcelHelpers.export(exports, "MissingGlyphElement", ()=>MissingGlyphElement
);
parcelHelpers.export(exports, "Mouse", ()=>Mouse
);
parcelHelpers.export(exports, "PSEUDO_ZERO", ()=>PSEUDO_ZERO
);
parcelHelpers.export(exports, "Parser", ()=>Parser
);
parcelHelpers.export(exports, "PathElement", ()=>PathElement
);
parcelHelpers.export(exports, "PathParser", ()=>PathParser
);
parcelHelpers.export(exports, "PatternElement", ()=>PatternElement
);
parcelHelpers.export(exports, "Point", ()=>Point
);
parcelHelpers.export(exports, "PolygonElement", ()=>PolygonElement
);
parcelHelpers.export(exports, "PolylineElement", ()=>PolylineElement
);
parcelHelpers.export(exports, "Property", ()=>Property
);
parcelHelpers.export(exports, "QB1", ()=>QB1
);
parcelHelpers.export(exports, "QB2", ()=>QB2
);
parcelHelpers.export(exports, "QB3", ()=>QB3
);
parcelHelpers.export(exports, "RadialGradientElement", ()=>RadialGradientElement
);
parcelHelpers.export(exports, "RectElement", ()=>RectElement
);
parcelHelpers.export(exports, "RenderedElement", ()=>RenderedElement
);
parcelHelpers.export(exports, "Rotate", ()=>Rotate
);
parcelHelpers.export(exports, "SVGElement", ()=>SVGElement
);
parcelHelpers.export(exports, "SVGFontLoader", ()=>SVGFontLoader
);
parcelHelpers.export(exports, "Scale", ()=>Scale
);
parcelHelpers.export(exports, "Screen", ()=>Screen
);
parcelHelpers.export(exports, "Skew", ()=>Skew
);
parcelHelpers.export(exports, "SkewX", ()=>SkewX
);
parcelHelpers.export(exports, "SkewY", ()=>SkewY
);
parcelHelpers.export(exports, "StopElement", ()=>StopElement
);
parcelHelpers.export(exports, "StyleElement", ()=>StyleElement
);
parcelHelpers.export(exports, "SymbolElement", ()=>SymbolElement
);
parcelHelpers.export(exports, "TRefElement", ()=>TRefElement
);
parcelHelpers.export(exports, "TSpanElement", ()=>TSpanElement
);
parcelHelpers.export(exports, "TextElement", ()=>TextElement
);
parcelHelpers.export(exports, "TextPathElement", ()=>TextPathElement
);
parcelHelpers.export(exports, "TitleElement", ()=>TitleElement
);
parcelHelpers.export(exports, "Transform", ()=>Transform
);
parcelHelpers.export(exports, "Translate", ()=>Translate
);
parcelHelpers.export(exports, "UnknownElement", ()=>UnknownElement
);
parcelHelpers.export(exports, "UseElement", ()=>UseElement
);
parcelHelpers.export(exports, "ViewPort", ()=>ViewPort
);
parcelHelpers.export(exports, "compressSpaces", ()=>compressSpaces
);
parcelHelpers.export(exports, "getSelectorSpecificity", ()=>getSelectorSpecificity
);
parcelHelpers.export(exports, "normalizeAttributeName", ()=>normalizeAttributeName
);
parcelHelpers.export(exports, "normalizeColor", ()=>normalizeColor
);
parcelHelpers.export(exports, "parseExternalUrl", ()=>parseExternalUrl
);
parcelHelpers.export(exports, "presets", ()=>index
);
parcelHelpers.export(exports, "toNumbers", ()=>toNumbers
);
parcelHelpers.export(exports, "trimLeft", ()=>trimLeft
);
parcelHelpers.export(exports, "trimRight", ()=>trimRight
);
parcelHelpers.export(exports, "vectorMagnitude", ()=>vectorMagnitude
);
parcelHelpers.export(exports, "vectorsAngle", ()=>vectorsAngle
);
parcelHelpers.export(exports, "vectorsRatio", ()=>vectorsRatio
);
var _esPromiseJs = require("core-js/modules/es.promise.js");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _asyncToGeneratorDefault = parcelHelpers.interopDefault(_asyncToGenerator);
var _esStringMatchJs = require("core-js/modules/es.string.match.js");
var _esStringReplaceJs = require("core-js/modules/es.string.replace.js");
var _esStringStartsWithJs = require("core-js/modules/es.string.starts-with.js");
var _esArrayIteratorJs = require("core-js/modules/es.array.iterator.js");
var _webDomCollectionsIteratorJs = require("core-js/modules/web.dom-collections.iterator.js");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _esArrayReduceJs = require("core-js/modules/es.array.reduce.js");
var _esStringEndsWithJs = require("core-js/modules/es.string.ends-with.js");
var _esStringSplitJs = require("core-js/modules/es.string.split.js");
var _raf = require("raf");
var _rafDefault = parcelHelpers.interopDefault(_raf);
var _esStringTrimJs = require("core-js/modules/es.string.trim.js");
var _rgbcolor = require("rgbcolor");
var _rgbcolorDefault = parcelHelpers.interopDefault(_rgbcolor);
var _esStringIncludesJs = require("core-js/modules/es.string.includes.js");
var _esArrayIndexOfJs = require("core-js/modules/es.array.index-of.js");
var _esArrayReverseJs = require("core-js/modules/es.array.reverse.js");
var _svgPathdata = require("svg-pathdata");
var _esRegexpToStringJs = require("core-js/modules/es.regexp.to-string.js");
var _stackblurCanvas = require("stackblur-canvas");
var process = require("process");
/**
 * Options preset for `OffscreenCanvas`.
 * @param config - Preset requirements.
 * @param config.DOMParser - XML/HTML parser from string into DOM Document.
 * @returns Preset object.
 */ function offscreen() {
    var { DOMParser: DOMParserFallback  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    };
    var preset = {
        window: null,
        ignoreAnimation: true,
        ignoreMouse: true,
        DOMParser: DOMParserFallback,
        createCanvas (width, height) {
            return new OffscreenCanvas(width, height);
        },
        createImage (url) {
            return _asyncToGeneratorDefault.default(function*() {
                var response = yield fetch(url);
                var blob = yield response.blob();
                var img = yield createImageBitmap(blob);
                return img;
            })();
        }
    };
    if (typeof DOMParser !== 'undefined' || typeof DOMParserFallback === 'undefined') Reflect.deleteProperty(preset, 'DOMParser');
    return preset;
}
/**
 * Options preset for `node-canvas`.
 * @param config - Preset requirements.
 * @param config.DOMParser - XML/HTML parser from string into DOM Document.
 * @param config.canvas - `node-canvas` exports.
 * @param config.fetch - WHATWG-compatible `fetch` function.
 * @returns Preset object.
 */ function node17(_ref) {
    var { DOMParser , canvas , fetch  } = _ref;
    return {
        window: null,
        ignoreAnimation: true,
        ignoreMouse: true,
        DOMParser,
        fetch,
        createCanvas: canvas.createCanvas,
        createImage: canvas.loadImage
    };
}
var index = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    offscreen: offscreen,
    node: node17
});
/**
 * HTML-safe compress white-spaces.
 * @param str - String to compress.
 * @returns String.
 */ function compressSpaces(str) {
    return str.replace(/(?!\u3000)\s+/gm, ' ');
}
/**
 * HTML-safe left trim.
 * @param str - String to trim.
 * @returns String.
 */ function trimLeft(str) {
    return str.replace(/^[\n \t]+/, '');
}
/**
 * HTML-safe right trim.
 * @param str - String to trim.
 * @returns String.
 */ function trimRight(str) {
    return str.replace(/[\n \t]+$/, '');
}
/**
 * String to numbers array.
 * @param str - Numbers string.
 * @returns Numbers array.
 */ function toNumbers(str) {
    var matches = (str || '').match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
    return matches.map(parseFloat);
} // Microsoft Edge fix
var allUppercase = /^[A-Z-]+$/;
/**
 * Normalize attribute name.
 * @param name - Attribute name.
 * @returns Normalized attribute name.
 */ function normalizeAttributeName(name) {
    if (allUppercase.test(name)) return name.toLowerCase();
    return name;
}
/**
 * Parse external URL.
 * @param url - CSS url string.
 * @returns Parsed URL.
 */ function parseExternalUrl(url) {
    //                      single quotes [2]
    //                      v         double quotes [3]
    //                      v         v         no quotes [4]
    //                      v         v         v
    var urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url) || [];
    return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
/**
 * Transform floats to integers in rgb colors.
 * @param color - Color to normalize.
 * @returns Normalized color.
 */ function normalizeColor(color) {
    if (!color.startsWith('rgb')) return color;
    var rgbParts = 3;
    var normalizedColor = color.replace(/\d+(\.\d+)?/g, (num, isFloat)=>(rgbParts--) && isFloat ? String(Math.round(parseFloat(num))) : num
    );
    return normalizedColor;
}
// slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
var attributeRegex = /(\[[^\]]+\])/g;
var idRegex = /(#[^\s+>~.[:]+)/g;
var classRegex = /(\.[^\s+>~.[:]+)/g;
var pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
var pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
var pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
var elementRegex = /([^\s+>~.[:]+)/g;
function findSelectorMatch(selector, regex) {
    var matches = regex.exec(selector);
    if (!matches) return [
        selector,
        0
    ];
    return [
        selector.replace(regex, ' '),
        matches.length
    ];
}
/**
 * Measure selector specificity.
 * @param selector - Selector to measure.
 * @returns Specificity.
 */ function getSelectorSpecificity(selector) {
    var specificity = [
        0,
        0,
        0
    ];
    var currentSelector = selector.replace(/:not\(([^)]*)\)/g, '     $1 ').replace(/{[\s\S]*/gm, ' ');
    var delta = 0;
    [currentSelector, delta] = findSelectorMatch(currentSelector, attributeRegex);
    specificity[1] += delta;
    [currentSelector, delta] = findSelectorMatch(currentSelector, idRegex);
    specificity[0] += delta;
    [currentSelector, delta] = findSelectorMatch(currentSelector, classRegex);
    specificity[1] += delta;
    [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoElementRegex);
    specificity[2] += delta;
    [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
    specificity[1] += delta;
    [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassRegex);
    specificity[1] += delta;
    currentSelector = currentSelector.replace(/[*\s+>~]/g, ' ').replace(/[#.]/g, ' ');
    [currentSelector, delta] = findSelectorMatch(currentSelector, elementRegex); // lgtm [js/useless-assignment-to-local]
    specificity[2] += delta;
    return specificity.join('');
}
var PSEUDO_ZERO = 0.00000001;
/**
 * Vector magnitude.
 * @param v
 * @returns Number result.
 */ function vectorMagnitude(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}
/**
 * Ratio between two vectors.
 * @param u
 * @param v
 * @returns Number result.
 */ function vectorsRatio(u, v) {
    return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
}
/**
 * Angle between two vectors.
 * @param u
 * @param v
 * @returns Number result.
 */ function vectorsAngle(u, v) {
    return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
}
function CB1(t) {
    return t * t * t;
}
function CB2(t) {
    return 3 * t * t * (1 - t);
}
function CB3(t) {
    return 3 * t * (1 - t) * (1 - t);
}
function CB4(t) {
    return (1 - t) * (1 - t) * (1 - t);
}
function QB1(t) {
    return t * t;
}
function QB2(t) {
    return 2 * t * (1 - t);
}
function QB3(t) {
    return (1 - t) * (1 - t);
}
class Property {
    constructor(document27, name1, value1){
        this.document = document27;
        this.name = name1;
        this.value = value1;
        this.isNormalizedColor = false;
    }
    static empty(document1) {
        return new Property(document1, 'EMPTY', '');
    }
    split() {
        var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
        var { document , name  } = this;
        return compressSpaces(this.getString()).trim().split(separator).map((value)=>new Property(document, name, value)
        );
    }
    hasValue(zeroIsValue) {
        var { value  } = this;
        return value !== null && value !== '' && (zeroIsValue || value !== 0) && typeof value !== 'undefined';
    }
    isString(regexp) {
        var { value  } = this;
        var result = typeof value === 'string';
        if (!result || !regexp) return result;
        return regexp.test(value);
    }
    isUrlDefinition() {
        return this.isString(/^url\(/);
    }
    isPixels() {
        if (!this.hasValue()) return false;
        var asString = this.getString();
        switch(true){
            case asString.endsWith('px'):
            case /^[0-9]+$/.test(asString):
                return true;
            default:
                return false;
        }
    }
    setValue(value2) {
        this.value = value2;
        return this;
    }
    getValue(def4) {
        if (typeof def4 === 'undefined' || this.hasValue()) return this.value;
        return def4;
    }
    getNumber(def1) {
        if (!this.hasValue()) {
            if (typeof def1 === 'undefined') return 0;
            return parseFloat(def1);
        }
        var { value  } = this;
        var n = parseFloat(value);
        if (this.isString(/%$/)) n /= 100;
        return n;
    }
    getString(def2) {
        if (typeof def2 === 'undefined' || this.hasValue()) return typeof this.value === 'undefined' ? '' : String(this.value);
        return String(def2);
    }
    getColor(def3) {
        var color = this.getString(def3);
        if (this.isNormalizedColor) return color;
        this.isNormalizedColor = true;
        color = normalizeColor(color);
        this.value = color;
        return color;
    }
    getDpi() {
        return 96; // TODO: compute?
    }
    getRem() {
        return this.document.rootEmSize;
    }
    getEm() {
        return this.document.emSize;
    }
    getUnits() {
        return this.getString().replace(/[0-9.-]/g, '');
    }
    getPixels(axisOrIsFontSize) {
        var processPercent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!this.hasValue()) return 0;
        var [axis, isFontSize] = typeof axisOrIsFontSize === 'boolean' ? [
            undefined,
            axisOrIsFontSize
        ] : [
            axisOrIsFontSize
        ];
        var { viewPort  } = this.document.screen;
        switch(true){
            case this.isString(/vmin$/):
                return this.getNumber() / 100 * Math.min(viewPort.computeSize('x'), viewPort.computeSize('y'));
            case this.isString(/vmax$/):
                return this.getNumber() / 100 * Math.max(viewPort.computeSize('x'), viewPort.computeSize('y'));
            case this.isString(/vw$/):
                return this.getNumber() / 100 * viewPort.computeSize('x');
            case this.isString(/vh$/):
                return this.getNumber() / 100 * viewPort.computeSize('y');
            case this.isString(/rem$/):
                return this.getNumber() * this.getRem();
            case this.isString(/em$/):
                return this.getNumber() * this.getEm();
            case this.isString(/ex$/):
                return this.getNumber() * this.getEm() / 2;
            case this.isString(/px$/):
                return this.getNumber();
            case this.isString(/pt$/):
                return this.getNumber() * this.getDpi() * (1 / 72);
            case this.isString(/pc$/):
                return this.getNumber() * 15;
            case this.isString(/cm$/):
                return this.getNumber() * this.getDpi() / 2.54;
            case this.isString(/mm$/):
                return this.getNumber() * this.getDpi() / 25.4;
            case this.isString(/in$/):
                return this.getNumber() * this.getDpi();
            case this.isString(/%$/) && isFontSize:
                return this.getNumber() * this.getEm();
            case this.isString(/%$/):
                return this.getNumber() * viewPort.computeSize(axis);
            default:
                var n = this.getNumber();
                if (processPercent && n < 1) return n * viewPort.computeSize(axis);
                return n;
        }
    }
    getMilliseconds() {
        if (!this.hasValue()) return 0;
        if (this.isString(/ms$/)) return this.getNumber();
        return this.getNumber() * 1000;
    }
    getRadians() {
        if (!this.hasValue()) return 0;
        switch(true){
            case this.isString(/deg$/):
                return this.getNumber() * (Math.PI / 180);
            case this.isString(/grad$/):
                return this.getNumber() * (Math.PI / 200);
            case this.isString(/rad$/):
                return this.getNumber();
            default:
                return this.getNumber() * (Math.PI / 180);
        }
    }
    getDefinition() {
        var asString = this.getString();
        var name = /#([^)'"]+)/.exec(asString);
        if (name) name = name[1];
        if (!name) name = asString;
        return this.document.definitions[name];
    }
    getFillStyleDefinition(element1, opacity) {
        var def = this.getDefinition();
        if (!def) return null;
         // gradient
        if (typeof def.createGradient === 'function') return def.createGradient(this.document.ctx, element1, opacity);
         // pattern
        if (typeof def.createPattern === 'function') {
            if (def.getHrefAttribute().hasValue()) {
                var patternTransform = def.getAttribute('patternTransform');
                def = def.getHrefAttribute().getDefinition();
                if (patternTransform.hasValue()) def.getAttribute('patternTransform', true).setValue(patternTransform.value);
            }
            return def.createPattern(this.document.ctx, element1, opacity);
        }
        return null;
    }
    getTextBaseline() {
        if (!this.hasValue()) return null;
        return Property.textBaselineMapping[this.getString()];
    }
    addOpacity(opacity1) {
        var value = this.getColor();
        var len = value.length;
        var commas = 0; // Simulate old RGBColor version, which can't parse rgba.
        for(var i = 0; i < len; i++){
            if (value[i] === ',') commas++;
            if (commas === 3) break;
        }
        if (opacity1.hasValue() && this.isString() && commas !== 3) {
            var color = new _rgbcolorDefault.default(value);
            if (color.ok) {
                color.alpha = opacity1.getNumber();
                value = color.toRGBA();
            }
        }
        return new Property(this.document, this.name, value);
    }
}
Property.textBaselineMapping = {
    'baseline': 'alphabetic',
    'before-edge': 'top',
    'text-before-edge': 'top',
    'middle': 'middle',
    'central': 'middle',
    'after-edge': 'bottom',
    'text-after-edge': 'bottom',
    'ideographic': 'ideographic',
    'alphabetic': 'alphabetic',
    'hanging': 'hanging',
    'mathematical': 'alphabetic'
};
class ViewPort {
    constructor(){
        this.viewPorts = [];
    }
    clear() {
        this.viewPorts = [];
    }
    setCurrent(width5, height3) {
        this.viewPorts.push({
            width: width5,
            height: height3
        });
    }
    removeCurrent() {
        this.viewPorts.pop();
    }
    getCurrent() {
        var { viewPorts  } = this;
        return viewPorts[viewPorts.length - 1];
    }
    get width() {
        return this.getCurrent().width;
    }
    get height() {
        return this.getCurrent().height;
    }
    computeSize(d) {
        if (typeof d === 'number') return d;
        if (d === 'x') return this.width;
        if (d === 'y') return this.height;
        return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
    }
}
class Point {
    constructor(x1, y1){
        this.x = x1;
        this.y = y1;
    }
    static parse(point11) {
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var [x = defaultValue, y = defaultValue] = toNumbers(point11);
        return new Point(x, y);
    }
    static parseScale(scale) {
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var [x = defaultValue, y = x] = toNumbers(scale);
        return new Point(x, y);
    }
    static parsePath(path) {
        var points = toNumbers(path);
        var len = points.length;
        var pathPoints = [];
        for(var i = 0; i < len; i += 2)pathPoints.push(new Point(points[i], points[i + 1]));
        return pathPoints;
    }
    angleTo(point1) {
        return Math.atan2(point1.y - this.y, point1.x - this.x);
    }
    applyTransform(transform1) {
        var { x , y  } = this;
        var xp = x * transform1[0] + y * transform1[2] + transform1[4];
        var yp = x * transform1[1] + y * transform1[3] + transform1[5];
        this.x = xp;
        this.y = yp;
    }
}
class Mouse {
    constructor(screen){
        this.screen = screen;
        this.working = false;
        this.events = [];
        this.eventElements = []; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.onClick = this.onClick.bind(this); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.onMouseMove = this.onMouseMove.bind(this);
    }
    isWorking() {
        return this.working;
    }
    start() {
        if (this.working) return;
        var { screen , onClick , onMouseMove  } = this;
        var canvas = screen.ctx.canvas;
        canvas.onclick = onClick;
        canvas.onmousemove = onMouseMove;
        this.working = true;
    }
    stop() {
        if (!this.working) return;
        var canvas = this.screen.ctx.canvas;
        this.working = false;
        canvas.onclick = null;
        canvas.onmousemove = null;
    }
    hasEvents() {
        return this.working && this.events.length > 0;
    }
    runEvents() {
        if (!this.working) return;
        var { screen: document , events , eventElements  } = this;
        var { style  } = document.ctx.canvas;
        if (style) style.cursor = '';
        events.forEach((_ref, i)=>{
            var { run  } = _ref;
            var element = eventElements[i];
            while(element){
                run(element);
                element = element.parent;
            }
        }); // done running, clear
        this.events = [];
        this.eventElements = [];
    }
    checkPath(element, ctx) {
        if (!this.working || !ctx) return;
        var { events , eventElements  } = this;
        events.forEach((_ref2, i)=>{
            var { x , y  } = _ref2;
            if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) eventElements[i] = element;
        });
    }
    checkBoundingBox(element2, boundingBox) {
        if (!this.working || !boundingBox) return;
        var { events , eventElements  } = this;
        events.forEach((_ref3, i)=>{
            var { x , y  } = _ref3;
            if (!eventElements[i] && boundingBox.isPointInBox(x, y)) eventElements[i] = element2;
        });
    }
    mapXY(x5, y5) {
        var { window , ctx  } = this.screen;
        var point = new Point(x5, y5);
        var element = ctx.canvas;
        while(element){
            point.x -= element.offsetLeft;
            point.y -= element.offsetTop;
            element = element.offsetParent;
        }
        if (window.scrollX) point.x += window.scrollX;
        if (window.scrollY) point.y += window.scrollY;
        return point;
    }
    onClick(event) {
        var { x , y  } = this.mapXY(event.clientX, event.clientY);
        this.events.push({
            type: 'onclick',
            x,
            y,
            run (eventTarget) {
                if (eventTarget.onClick) eventTarget.onClick();
            }
        });
    }
    onMouseMove(event1) {
        var { x , y  } = this.mapXY(event1.clientX, event1.clientY);
        this.events.push({
            type: 'onmousemove',
            x,
            y,
            run (eventTarget) {
                if (eventTarget.onMouseMove) eventTarget.onMouseMove();
            }
        });
    }
}
var defaultWindow = typeof window !== 'undefined' ? window : null;
var defaultFetch$1 = typeof fetch !== 'undefined' ? fetch.bind(undefined) // `fetch` depends on context: `someObject.fetch(...)` will throw error.
 : null;
class Screen {
    constructor(ctx1){
        var { fetch =defaultFetch$1 , window =defaultWindow  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        };
        this.ctx = ctx1;
        this.FRAMERATE = 30;
        this.MAX_VIRTUAL_PIXELS = 30000;
        this.CLIENT_WIDTH = 800;
        this.CLIENT_HEIGHT = 600;
        this.viewPort = new ViewPort();
        this.mouse = new Mouse(this);
        this.animations = [];
        this.waits = [];
        this.frameDuration = 0;
        this.isReadyLock = false;
        this.isFirstRender = true;
        this.intervalId = null;
        this.window = window;
        this.fetch = fetch;
    }
    wait(checker) {
        this.waits.push(checker);
    }
    ready() {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        if (!this.readyPromise) return Promise.resolve();
        return this.readyPromise;
    }
    isReady() {
        if (this.isReadyLock) return true;
        var isReadyLock = this.waits.every((_)=>_()
        );
        if (isReadyLock) {
            this.waits = [];
            if (this.resolveReady) this.resolveReady();
        }
        this.isReadyLock = isReadyLock;
        return isReadyLock;
    }
    setDefaults(ctx2) {
        // initial values and defaults
        ctx2.strokeStyle = 'rgba(0,0,0,0)';
        ctx2.lineCap = 'butt';
        ctx2.lineJoin = 'miter';
        ctx2.miterLimit = 4;
    }
    setViewBox(_ref1) {
        var { document , ctx , aspectRatio , width , desiredWidth , height , desiredHeight , minX =0 , minY =0 , refX , refY , clip =false , clipX =0 , clipY =0  } = _ref1;
        // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
        var cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, ''); // ignore defer
        var [aspectRatioAlign, aspectRatioMeetOrSlice] = cleanAspectRatio.split(' ');
        var align = aspectRatioAlign || 'xMidYMid';
        var meetOrSlice = aspectRatioMeetOrSlice || 'meet'; // calculate scale
        var scaleX = width / desiredWidth;
        var scaleY = height / desiredHeight;
        var scaleMin = Math.min(scaleX, scaleY);
        var scaleMax = Math.max(scaleX, scaleY);
        var finalDesiredWidth = desiredWidth;
        var finalDesiredHeight = desiredHeight;
        if (meetOrSlice === 'meet') {
            finalDesiredWidth *= scaleMin;
            finalDesiredHeight *= scaleMin;
        }
        if (meetOrSlice === 'slice') {
            finalDesiredWidth *= scaleMax;
            finalDesiredHeight *= scaleMax;
        }
        var refXProp = new Property(document, 'refX', refX);
        var refYProp = new Property(document, 'refY', refY);
        var hasRefs = refXProp.hasValue() && refYProp.hasValue();
        if (hasRefs) ctx.translate(-scaleMin * refXProp.getPixels('x'), -scaleMin * refYProp.getPixels('y'));
        if (clip) {
            var scaledClipX = scaleMin * clipX;
            var scaledClipY = scaleMin * clipY;
            ctx.beginPath();
            ctx.moveTo(scaledClipX, scaledClipY);
            ctx.lineTo(width, scaledClipY);
            ctx.lineTo(width, height);
            ctx.lineTo(scaledClipX, height);
            ctx.closePath();
            ctx.clip();
        }
        if (!hasRefs) {
            var isMeetMinY = meetOrSlice === 'meet' && scaleMin === scaleY;
            var isSliceMaxY = meetOrSlice === 'slice' && scaleMax === scaleY;
            var isMeetMinX = meetOrSlice === 'meet' && scaleMin === scaleX;
            var isSliceMaxX = meetOrSlice === 'slice' && scaleMax === scaleX;
            if (align.startsWith('xMid') && (isMeetMinY || isSliceMaxY)) ctx.translate(width / 2 - finalDesiredWidth / 2, 0);
            if (align.endsWith('YMid') && (isMeetMinX || isSliceMaxX)) ctx.translate(0, height / 2 - finalDesiredHeight / 2);
            if (align.startsWith('xMax') && (isMeetMinY || isSliceMaxY)) ctx.translate(width - finalDesiredWidth, 0);
            if (align.endsWith('YMax') && (isMeetMinX || isSliceMaxX)) ctx.translate(0, height - finalDesiredHeight);
        } // scale
        switch(true){
            case align === 'none':
                ctx.scale(scaleX, scaleY);
                break;
            case meetOrSlice === 'meet':
                ctx.scale(scaleMin, scaleMin);
                break;
            case meetOrSlice === 'slice':
                ctx.scale(scaleMax, scaleMax);
                break;
        } // translate
        ctx.translate(-minX, -minY);
    }
    start(element3) {
        var { enableRedraw =false , ignoreMouse =false , ignoreAnimation =false , ignoreDimensions =false , ignoreClear =false , forceRedraw , scaleWidth , scaleHeight , offsetX , offsetY  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        };
        var { FRAMERATE , mouse  } = this;
        var frameDuration = 1000 / FRAMERATE;
        this.frameDuration = frameDuration;
        this.readyPromise = new Promise((resolve)=>{
            this.resolveReady = resolve;
        });
        if (this.isReady()) this.render(element3, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
        if (!enableRedraw) return;
        var now = Date.now();
        var then = now;
        var delta = 0;
        var tick = ()=>{
            now = Date.now();
            delta = now - then;
            if (delta >= frameDuration) {
                then = now - delta % frameDuration;
                if (this.shouldUpdate(ignoreAnimation, forceRedraw)) {
                    this.render(element3, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
                    mouse.runEvents();
                }
            }
            this.intervalId = _rafDefault.default(tick);
        };
        if (!ignoreMouse) mouse.start();
        this.intervalId = _rafDefault.default(tick);
    }
    stop() {
        if (this.intervalId) {
            _rafDefault.default.cancel(this.intervalId);
            this.intervalId = null;
        }
        this.mouse.stop();
    }
    shouldUpdate(ignoreAnimation, forceRedraw) {
        // need update from animations?
        if (!ignoreAnimation) {
            var { frameDuration  } = this;
            var shouldUpdate1 = this.animations.reduce((shouldUpdate, animation)=>animation.update(frameDuration) || shouldUpdate
            , false);
            if (shouldUpdate1) return true;
        } // need update from redraw?
        if (typeof forceRedraw === 'function' && forceRedraw()) return true;
        if (!this.isReadyLock && this.isReady()) return true;
         // need update from mouse events?
        if (this.mouse.hasEvents()) return true;
        return false;
    }
    render(element4, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
        var { CLIENT_WIDTH , CLIENT_HEIGHT , viewPort , ctx , isFirstRender  } = this;
        var canvas = ctx.canvas;
        viewPort.clear();
        if (canvas.width && canvas.height) viewPort.setCurrent(canvas.width, canvas.height);
        else viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
        var widthStyle = element4.getStyle('width');
        var heightStyle = element4.getStyle('height');
        if (!ignoreDimensions && (isFirstRender || typeof scaleWidth !== 'number' && typeof scaleHeight !== 'number')) {
            // set canvas size
            if (widthStyle.hasValue()) {
                canvas.width = widthStyle.getPixels('x');
                if (canvas.style) canvas.style.width = "".concat(canvas.width, "px");
            }
            if (heightStyle.hasValue()) {
                canvas.height = heightStyle.getPixels('y');
                if (canvas.style) canvas.style.height = "".concat(canvas.height, "px");
            }
        }
        var cWidth = canvas.clientWidth || canvas.width;
        var cHeight = canvas.clientHeight || canvas.height;
        if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
            cWidth = widthStyle.getPixels('x');
            cHeight = heightStyle.getPixels('y');
        }
        viewPort.setCurrent(cWidth, cHeight);
        if (typeof offsetX === 'number') element4.getAttribute('x', true).setValue(offsetX);
        if (typeof offsetY === 'number') element4.getAttribute('y', true).setValue(offsetY);
        if (typeof scaleWidth === 'number' || typeof scaleHeight === 'number') {
            var viewBox = toNumbers(element4.getAttribute('viewBox').getString());
            var xRatio = 0;
            var yRatio = 0;
            if (typeof scaleWidth === 'number') {
                var _widthStyle = element4.getStyle('width');
                if (_widthStyle.hasValue()) xRatio = _widthStyle.getPixels('x') / scaleWidth;
                else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / scaleWidth;
            }
            if (typeof scaleHeight === 'number') {
                var _heightStyle = element4.getStyle('height');
                if (_heightStyle.hasValue()) yRatio = _heightStyle.getPixels('y') / scaleHeight;
                else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / scaleHeight;
            }
            if (!xRatio) xRatio = yRatio;
            if (!yRatio) yRatio = xRatio;
            element4.getAttribute('width', true).setValue(scaleWidth);
            element4.getAttribute('height', true).setValue(scaleHeight);
            var transformStyle = element4.getStyle('transform', true, true);
            transformStyle.setValue("".concat(transformStyle.getString(), " scale(").concat(1 / xRatio, ", ").concat(1 / yRatio, ")"));
        } // clear and render
        if (!ignoreClear) ctx.clearRect(0, 0, cWidth, cHeight);
        element4.render(ctx);
        if (isFirstRender) this.isFirstRender = false;
    }
}
Screen.defaultWindow = defaultWindow;
Screen.defaultFetch = defaultFetch$1;
var { defaultFetch  } = Screen;
var DefaultDOMParser = typeof DOMParser !== 'undefined' ? DOMParser : null;
class Parser {
    constructor(){
        var { fetch =defaultFetch , DOMParser =DefaultDOMParser  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        };
        this.fetch = fetch;
        this.DOMParser = DOMParser;
    }
    parse(resource) {
        var _this = this;
        return _asyncToGeneratorDefault.default(function*() {
            if (resource.startsWith('<')) return _this.parseFromString(resource);
            return _this.load(resource);
        })();
    }
    parseFromString(xml1) {
        var parser = new this.DOMParser();
        try {
            return this.checkDocument(parser.parseFromString(xml1, 'image/svg+xml'));
        } catch (err) {
            return this.checkDocument(parser.parseFromString(xml1, 'text/xml'));
        }
    }
    checkDocument(document2) {
        var parserError = document2.getElementsByTagName('parsererror')[0];
        if (parserError) throw new Error(parserError.textContent);
        return document2;
    }
    load(url2) {
        var _this2 = this;
        return _asyncToGeneratorDefault.default(function*() {
            var response = yield _this2.fetch(url2);
            var xml = yield response.text();
            return _this2.parseFromString(xml);
        })();
    }
}
class Translate {
    constructor(_3, point2){
        this.type = 'translate';
        this.point = null;
        this.point = Point.parse(point2);
    }
    apply(ctx3) {
        var { x , y  } = this.point;
        ctx3.translate(x || 0, y || 0);
    }
    unapply(ctx4) {
        var { x , y  } = this.point;
        ctx4.translate(-1 * x || 0, -1 * y || 0);
    }
    applyToPoint(point3) {
        var { x , y  } = this.point;
        point3.applyTransform([
            1,
            0,
            0,
            1,
            x || 0,
            y || 0
        ]);
    }
}
class Rotate {
    constructor(document3, rotate, transformOrigin){
        this.type = 'rotate';
        this.angle = null;
        this.originX = null;
        this.originY = null;
        this.cx = 0;
        this.cy = 0;
        var numbers = toNumbers(rotate);
        this.angle = new Property(document3, 'angle', numbers[0]);
        this.originX = transformOrigin[0];
        this.originY = transformOrigin[1];
        this.cx = numbers[1] || 0;
        this.cy = numbers[2] || 0;
    }
    apply(ctx5) {
        var { cx , cy , originX , originY , angle  } = this;
        var tx = cx + originX.getPixels('x');
        var ty = cy + originY.getPixels('y');
        ctx5.translate(tx, ty);
        ctx5.rotate(angle.getRadians());
        ctx5.translate(-tx, -ty);
    }
    unapply(ctx6) {
        var { cx , cy , originX , originY , angle  } = this;
        var tx = cx + originX.getPixels('x');
        var ty = cy + originY.getPixels('y');
        ctx6.translate(tx, ty);
        ctx6.rotate(-1 * angle.getRadians());
        ctx6.translate(-tx, -ty);
    }
    applyToPoint(point4) {
        var { cx , cy , angle  } = this;
        var rad = angle.getRadians();
        point4.applyTransform([
            1,
            0,
            0,
            1,
            cx || 0,
            cy || 0 // this.p.y
        ]);
        point4.applyTransform([
            Math.cos(rad),
            Math.sin(rad),
            -Math.sin(rad),
            Math.cos(rad),
            0,
            0
        ]);
        point4.applyTransform([
            1,
            0,
            0,
            1,
            -cx || 0,
            -cy || 0 // -this.p.y
        ]);
    }
}
class Scale {
    constructor(_1, scale1, transformOrigin1){
        this.type = 'scale';
        this.scale = null;
        this.originX = null;
        this.originY = null;
        var scaleSize = Point.parseScale(scale1); // Workaround for node-canvas
        if (scaleSize.x === 0 || scaleSize.y === 0) {
            scaleSize.x = PSEUDO_ZERO;
            scaleSize.y = PSEUDO_ZERO;
        }
        this.scale = scaleSize;
        this.originX = transformOrigin1[0];
        this.originY = transformOrigin1[1];
    }
    apply(ctx7) {
        var { scale: { x , y  } , originX , originY  } = this;
        var tx = originX.getPixels('x');
        var ty = originY.getPixels('y');
        ctx7.translate(tx, ty);
        ctx7.scale(x, y || x);
        ctx7.translate(-tx, -ty);
    }
    unapply(ctx8) {
        var { scale: { x , y  } , originX , originY  } = this;
        var tx = originX.getPixels('x');
        var ty = originY.getPixels('y');
        ctx8.translate(tx, ty);
        ctx8.scale(1 / x, 1 / y || x);
        ctx8.translate(-tx, -ty);
    }
    applyToPoint(point5) {
        var { x , y  } = this.scale;
        point5.applyTransform([
            x || 0,
            0,
            0,
            y || 0,
            0,
            0
        ]);
    }
}
class Matrix {
    constructor(_2, matrix1, transformOrigin2){
        this.type = 'matrix';
        this.matrix = [];
        this.originX = null;
        this.originY = null;
        this.matrix = toNumbers(matrix1);
        this.originX = transformOrigin2[0];
        this.originY = transformOrigin2[1];
    }
    apply(ctx9) {
        var { originX , originY , matrix  } = this;
        var tx = originX.getPixels('x');
        var ty = originY.getPixels('y');
        ctx9.translate(tx, ty);
        ctx9.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
        ctx9.translate(-tx, -ty);
    }
    unapply(ctx10) {
        var { originX , originY , matrix  } = this;
        var a = matrix[0];
        var b = matrix[2];
        var c = matrix[4];
        var d = matrix[1];
        var e = matrix[3];
        var f = matrix[5];
        var g = 0;
        var h = 0;
        var i = 1;
        var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
        var tx = originX.getPixels('x');
        var ty = originY.getPixels('y');
        ctx10.translate(tx, ty);
        ctx10.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
        ctx10.translate(-tx, -ty);
    }
    applyToPoint(point6) {
        point6.applyTransform(this.matrix);
    }
}
class Skew extends Matrix {
    constructor(document4, skew, transformOrigin3){
        super(document4, skew, transformOrigin3);
        this.type = 'skew';
        this.angle = null;
        this.angle = new Property(document4, 'angle', skew);
    }
}
class SkewX extends Skew {
    constructor(document5, skew1, transformOrigin4){
        super(document5, skew1, transformOrigin4);
        this.type = 'skewX';
        this.matrix = [
            1,
            0,
            Math.tan(this.angle.getRadians()),
            1,
            0,
            0
        ];
    }
}
class SkewY extends Skew {
    constructor(document6, skew2, transformOrigin5){
        super(document6, skew2, transformOrigin5);
        this.type = 'skewY';
        this.matrix = [
            1,
            Math.tan(this.angle.getRadians()),
            0,
            1,
            0,
            0
        ];
    }
}
function parseTransforms(transform) {
    return compressSpaces(transform).trim().replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g, ') ').split(/\s(?=[a-z])/);
}
function parseTransform(transform) {
    var [type, value] = transform.split('(');
    return [
        type.trim(),
        value.trim().replace(')', '')
    ];
}
class Transform {
    constructor(document7, transform2, transformOrigin6){
        this.document = document7;
        this.transforms = [];
        var data = parseTransforms(transform2);
        data.forEach((transform)=>{
            if (transform === 'none') return;
            var [type, value] = parseTransform(transform);
            var TransformType = Transform.transformTypes[type];
            if (typeof TransformType !== 'undefined') this.transforms.push(new TransformType(this.document, value, transformOrigin6));
        });
    }
    static fromElement(document8, element5) {
        var transformStyle = element5.getStyle('transform', false, true);
        var [transformOriginXProperty, transformOriginYProperty = transformOriginXProperty] = element5.getStyle('transform-origin', false, true).split();
        var transformOrigin = [
            transformOriginXProperty,
            transformOriginYProperty
        ];
        if (transformStyle.hasValue()) return new Transform(document8, transformStyle.getString(), transformOrigin);
        return null;
    }
    apply(ctx11) {
        var { transforms  } = this;
        var len = transforms.length;
        for(var i = 0; i < len; i++)transforms[i].apply(ctx11);
    }
    unapply(ctx12) {
        var { transforms  } = this;
        var len = transforms.length;
        for(var i = len - 1; i >= 0; i--)transforms[i].unapply(ctx12);
    }
    applyToPoint(point7) {
        var { transforms  } = this;
        var len = transforms.length;
        for(var i = 0; i < len; i++)transforms[i].applyToPoint(point7);
    }
}
Transform.transformTypes = {
    translate: Translate,
    rotate: Rotate,
    scale: Scale,
    matrix: Matrix,
    skewX: SkewX,
    skewY: SkewY
};
class Element {
    constructor(document9, node1){
        var captureTextNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.document = document9;
        this.node = node1;
        this.captureTextNodes = captureTextNodes;
        this.attributes = {
        };
        this.styles = {
        };
        this.stylesSpecificity = {
        };
        this.animationFrozen = false;
        this.animationFrozenValue = '';
        this.parent = null;
        this.children = [];
        if (!node1 || node1.nodeType !== 1) // ELEMENT_NODE
        return;
         // add attributes
        Array.from(node1.attributes).forEach((attribute)=>{
            var nodeName = normalizeAttributeName(attribute.nodeName);
            this.attributes[nodeName] = new Property(document9, nodeName, attribute.value);
        });
        this.addStylesFromStyleDefinition(); // add inline styles
        if (this.getAttribute('style').hasValue()) {
            var styles = this.getAttribute('style').getString().split(';').map((_)=>_.trim()
            );
            styles.forEach((style)=>{
                if (!style) return;
                var [name, value] = style.split(':').map((_)=>_.trim()
                );
                this.styles[name] = new Property(document9, name, value);
            });
        }
        var { definitions  } = document9;
        var id = this.getAttribute('id'); // add id
        if (id.hasValue()) {
            if (!definitions[id.getString()]) definitions[id.getString()] = this;
        }
        Array.from(node1.childNodes).forEach((childNode)=>{
            if (childNode.nodeType === 1) this.addChild(childNode); // ELEMENT_NODE
            else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
                var textNode = document9.createTextNode(childNode);
                if (textNode.getText().length > 0) this.addChild(textNode); // TEXT_NODE
            }
        });
    }
    getAttribute(name3) {
        var createIfNotExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var attr = this.attributes[name3];
        if (!attr && createIfNotExists) {
            var _attr = new Property(this.document, name3, '');
            this.attributes[name3] = _attr;
            return _attr;
        }
        return attr || Property.empty(this.document);
    }
    getHrefAttribute() {
        for(var key in this.attributes){
            if (key === 'href' || key.endsWith(':href')) return this.attributes[key];
        }
        return Property.empty(this.document);
    }
    getStyle(name2) {
        var createIfNotExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var skipAncestors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var style = this.styles[name2];
        if (style) return style;
        var attr = this.getAttribute(name2);
        if (attr !== null && attr !== void 0 && attr.hasValue()) {
            this.styles[name2] = attr; // move up to me to cache
            return attr;
        }
        if (!skipAncestors) {
            var { parent  } = this;
            if (parent) {
                var parentStyle = parent.getStyle(name2);
                if (parentStyle !== null && parentStyle !== void 0 && parentStyle.hasValue()) return parentStyle;
            }
        }
        if (createIfNotExists) {
            var _style = new Property(this.document, name2, '');
            this.styles[name2] = _style;
            return _style;
        }
        return style || Property.empty(this.document);
    }
    render(ctx13) {
        // don't render display=none
        // don't render visibility=hidden
        if (this.getStyle('display').getString() === 'none' || this.getStyle('visibility').getString() === 'hidden') return;
        ctx13.save();
        if (this.getStyle('mask').hasValue()) {
            // mask
            var mask = this.getStyle('mask').getDefinition();
            if (mask) {
                this.applyEffects(ctx13);
                mask.apply(ctx13, this);
            }
        } else if (this.getStyle('filter').getValue('none') !== 'none') {
            // filter
            var filter = this.getStyle('filter').getDefinition();
            if (filter) {
                this.applyEffects(ctx13);
                filter.apply(ctx13, this);
            }
        } else {
            this.setContext(ctx13);
            this.renderChildren(ctx13);
            this.clearContext(ctx13);
        }
        ctx13.restore();
    }
    setContext(_7) {
    }
    applyEffects(ctx14) {
        // transform
        var transform = Transform.fromElement(this.document, this);
        if (transform) transform.apply(ctx14);
         // clip
        var clipPathStyleProp = this.getStyle('clip-path', false, true);
        if (clipPathStyleProp.hasValue()) {
            var clip = clipPathStyleProp.getDefinition();
            if (clip) clip.apply(ctx14);
        }
    }
    clearContext(_4) {
    }
    renderChildren(ctx15) {
        this.children.forEach((child)=>{
            child.render(ctx15);
        });
    }
    addChild(childNode) {
        var child = childNode instanceof Element ? childNode : this.document.createElement(childNode);
        child.parent = this;
        if (!Element.ignoreChildTypes.includes(child.type)) this.children.push(child);
    }
    matchesSelector(selector) {
        var { node  } = this;
        if (typeof node.matches === 'function') return node.matches(selector);
        var styleClasses = node.getAttribute('class');
        if (!styleClasses || styleClasses === '') return false;
        return styleClasses.split(' ').some((styleClass)=>".".concat(styleClass) === selector
        );
    }
    addStylesFromStyleDefinition() {
        var { styles , stylesSpecificity  } = this.document;
        for(var selector in styles)if (!selector.startsWith('@') && this.matchesSelector(selector)) {
            var style = styles[selector];
            var specificity = stylesSpecificity[selector];
            if (style) for(var name in style){
                var existingSpecificity = this.stylesSpecificity[name];
                if (typeof existingSpecificity === 'undefined') existingSpecificity = '000';
                if (specificity >= existingSpecificity) {
                    this.styles[name] = style[name];
                    this.stylesSpecificity[name] = specificity;
                }
            }
        }
    }
    removeStyles(element6, ignoreStyles) {
        var toRestore1 = ignoreStyles.reduce((toRestore, name)=>{
            var styleProp = element6.getStyle(name);
            if (!styleProp.hasValue()) return toRestore;
            var value = styleProp.getString();
            styleProp.setValue('');
            return [
                ...toRestore,
                [
                    name,
                    value
                ]
            ];
        }, []);
        return toRestore1;
    }
    restoreStyles(element7, styles) {
        styles.forEach((_ref)=>{
            var [name, value] = _ref;
            element7.getStyle(name, true).setValue(value);
        });
    }
}
Element.ignoreChildTypes = [
    'title'
];
class UnknownElement extends Element {
    constructor(document10, node2, captureTextNodes){
        super(document10, node2, captureTextNodes);
    }
}
function wrapFontFamily(fontFamily) {
    var trimmed = fontFamily.trim();
    return /^('|")/.test(trimmed) ? trimmed : "\"".concat(trimmed, "\"");
}
function prepareFontFamily(fontFamily) {
    return typeof process === 'undefined' ? fontFamily : fontFamily.trim().split(',').map(wrapFontFamily).join(',');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
 * @param fontStyle
 * @returns CSS font style.
 */ function prepareFontStyle(fontStyle) {
    if (!fontStyle) return '';
    var targetFontStyle = fontStyle.trim().toLowerCase();
    switch(targetFontStyle){
        case 'normal':
        case 'italic':
        case 'oblique':
        case 'inherit':
        case 'initial':
        case 'unset':
            return targetFontStyle;
        default:
            if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) return targetFontStyle;
            return '';
    }
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 * @param fontWeight
 * @returns CSS font weight.
 */ function prepareFontWeight(fontWeight) {
    if (!fontWeight) return '';
    var targetFontWeight = fontWeight.trim().toLowerCase();
    switch(targetFontWeight){
        case 'normal':
        case 'bold':
        case 'lighter':
        case 'bolder':
        case 'inherit':
        case 'initial':
        case 'unset':
            return targetFontWeight;
        default:
            if (/^[\d.]+$/.test(targetFontWeight)) return targetFontWeight;
            return '';
    }
}
class Font {
    constructor(fontStyle, fontVariant, fontWeight, fontSize, fontFamily2, inherit){
        var inheritFont = inherit ? typeof inherit === 'string' ? Font.parse(inherit) : inherit : {
        };
        this.fontFamily = fontFamily2 || inheritFont.fontFamily;
        this.fontSize = fontSize || inheritFont.fontSize;
        this.fontStyle = fontStyle || inheritFont.fontStyle;
        this.fontWeight = fontWeight || inheritFont.fontWeight;
        this.fontVariant = fontVariant || inheritFont.fontVariant;
    }
    static parse() {
        var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var inherit = arguments.length > 1 ? arguments[1] : undefined;
        var fontStyle = '';
        var fontVariant = '';
        var fontWeight = '';
        var fontSize = '';
        var fontFamily = '';
        var parts = compressSpaces(font).trim().split(' ');
        var set = {
            fontSize: false,
            fontStyle: false,
            fontWeight: false,
            fontVariant: false
        };
        parts.forEach((part)=>{
            switch(true){
                case !set.fontStyle && Font.styles.includes(part):
                    if (part !== 'inherit') fontStyle = part;
                    set.fontStyle = true;
                    break;
                case !set.fontVariant && Font.variants.includes(part):
                    if (part !== 'inherit') fontVariant = part;
                    set.fontStyle = true;
                    set.fontVariant = true;
                    break;
                case !set.fontWeight && Font.weights.includes(part):
                    if (part !== 'inherit') fontWeight = part;
                    set.fontStyle = true;
                    set.fontVariant = true;
                    set.fontWeight = true;
                    break;
                case !set.fontSize:
                    if (part !== 'inherit') [fontSize] = part.split('/');
                    set.fontStyle = true;
                    set.fontVariant = true;
                    set.fontWeight = true;
                    set.fontSize = true;
                    break;
                default:
                    if (part !== 'inherit') fontFamily += part;
            }
        });
        return new Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
    }
    toString() {
        return [
            prepareFontStyle(this.fontStyle),
            this.fontVariant,
            prepareFontWeight(this.fontWeight),
            this.fontSize,
            prepareFontFamily(this.fontFamily)
        ].join(' ').trim();
    }
}
Font.styles = 'normal|italic|oblique|inherit';
Font.variants = 'normal|small-caps|inherit';
Font.weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';
class BoundingBox {
    constructor(){
        var x1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.NaN;
        var y1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.NaN;
        var x2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.NaN;
        var y2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.NaN;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.addPoint(x1, y1);
        this.addPoint(x2, y2);
    }
    get x() {
        return this.x1;
    }
    get y() {
        return this.y1;
    }
    get width() {
        return this.x2 - this.x1;
    }
    get height() {
        return this.y2 - this.y1;
    }
    addPoint(x2, y2) {
        if (typeof x2 !== 'undefined') {
            if (isNaN(this.x1) || isNaN(this.x2)) {
                this.x1 = x2;
                this.x2 = x2;
            }
            if (x2 < this.x1) this.x1 = x2;
            if (x2 > this.x2) this.x2 = x2;
        }
        if (typeof y2 !== 'undefined') {
            if (isNaN(this.y1) || isNaN(this.y2)) {
                this.y1 = y2;
                this.y2 = y2;
            }
            if (y2 < this.y1) this.y1 = y2;
            if (y2 > this.y2) this.y2 = y2;
        }
    }
    addX(x3) {
        this.addPoint(x3, null);
    }
    addY(y3) {
        this.addPoint(null, y3);
    }
    addBoundingBox(boundingBox1) {
        if (!boundingBox1) return;
        var { x1 , y1 , x2 , y2  } = boundingBox1;
        this.addPoint(x1, y1);
        this.addPoint(x2, y2);
    }
    sumCubic(t, p02, p12, p2, p3) {
        return Math.pow(1 - t, 3) * p02 + 3 * Math.pow(1 - t, 2) * t * p12 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
    }
    bezierCurveAdd(forX, p01, p11, p21, p31) {
        var b = 6 * p01 - 12 * p11 + 6 * p21;
        var a = -3 * p01 + 9 * p11 - 9 * p21 + 3 * p31;
        var c = 3 * p11 - 3 * p01;
        if (a === 0) {
            if (b === 0) return;
            var t = -c / b;
            if (0 < t && t < 1) {
                if (forX) this.addX(this.sumCubic(t, p01, p11, p21, p31));
                else this.addY(this.sumCubic(t, p01, p11, p21, p31));
            }
            return;
        }
        var b2ac = Math.pow(b, 2) - 4 * c * a;
        if (b2ac < 0) return;
        var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
        if (0 < t1 && t1 < 1) {
            if (forX) this.addX(this.sumCubic(t1, p01, p11, p21, p31));
            else this.addY(this.sumCubic(t1, p01, p11, p21, p31));
        }
        var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
        if (0 < t2 && t2 < 1) {
            if (forX) this.addX(this.sumCubic(t2, p01, p11, p21, p31));
            else this.addY(this.sumCubic(t2, p01, p11, p21, p31));
        }
    }
    addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
        this.addPoint(p0x, p0y);
        this.addPoint(p3x, p3y);
        this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
        this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
    }
    addQuadraticCurve(p0x1, p0y1, p1x1, p1y1, p2x1, p2y1) {
        var cp1x = p0x1 + 2 / 3 * (p1x1 - p0x1); // CP1 = QP0 + 2/3 *(QP1-QP0)
        var cp1y = p0y1 + 2 / 3 * (p1y1 - p0y1); // CP1 = QP0 + 2/3 *(QP1-QP0)
        var cp2x = cp1x + 1 / 3 * (p2x1 - p0x1); // CP2 = CP1 + 1/3 *(QP2-QP0)
        var cp2y = cp1y + 1 / 3 * (p2y1 - p0y1); // CP2 = CP1 + 1/3 *(QP2-QP0)
        this.addBezierCurve(p0x1, p0y1, cp1x, cp2x, cp1y, cp2y, p2x1, p2y1);
    }
    isPointInBox(x4, y4) {
        var { x1 , y1 , x2 , y2  } = this;
        return x1 <= x4 && x4 <= x2 && y1 <= y4 && y4 <= y2;
    }
}
class PathParser extends _svgPathdata.SVGPathData {
    constructor(path1){
        super(path1 // Fix spaces after signs.
        .replace(/([+\-.])\s+/gm, '$1') // Remove invalid part.
        .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ''));
        this.control = null;
        this.start = null;
        this.current = null;
        this.command = null;
        this.commands = this.commands;
        this.i = -1;
        this.previousCommand = null;
        this.points = [];
        this.angles = [];
    }
    reset() {
        this.i = -1;
        this.command = null;
        this.previousCommand = null;
        this.start = new Point(0, 0);
        this.control = new Point(0, 0);
        this.current = new Point(0, 0);
        this.points = [];
        this.angles = [];
    }
    isEnd() {
        var { i , commands  } = this;
        return i >= commands.length - 1;
    }
    next() {
        var command = this.commands[++this.i];
        this.previousCommand = this.command;
        this.command = command;
        return command;
    }
    getPoint() {
        var xProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'x';
        var yProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
        var point = new Point(this.command[xProp], this.command[yProp]);
        return this.makeAbsolute(point);
    }
    getAsControlPoint(xProp, yProp) {
        var point = this.getPoint(xProp, yProp);
        this.control = point;
        return point;
    }
    getAsCurrentPoint(xProp1, yProp1) {
        var point = this.getPoint(xProp1, yProp1);
        this.current = point;
        return point;
    }
    getReflectedControlPoint() {
        var previousCommand = this.previousCommand.type;
        if (previousCommand !== _svgPathdata.SVGPathData.CURVE_TO && previousCommand !== _svgPathdata.SVGPathData.SMOOTH_CURVE_TO && previousCommand !== _svgPathdata.SVGPathData.QUAD_TO && previousCommand !== _svgPathdata.SVGPathData.SMOOTH_QUAD_TO) return this.current;
         // reflect point
        var { current: { x: cx , y: cy  } , control: { x: ox , y: oy  }  } = this;
        var point = new Point(2 * cx - ox, 2 * cy - oy);
        return point;
    }
    makeAbsolute(point8) {
        if (this.command.relative) {
            var { x , y  } = this.current;
            point8.x += x;
            point8.y += y;
        }
        return point8;
    }
    addMarker(point9, from2, priorTo) {
        var { points , angles  } = this; // if the last angle isn't filled in because we didn't have this point yet ...
        if (priorTo && angles.length > 0 && !angles[angles.length - 1]) angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
        this.addMarkerAngle(point9, from2 ? from2.angleTo(point9) : null);
    }
    addMarkerAngle(point10, angle) {
        this.points.push(point10);
        this.angles.push(angle);
    }
    getMarkerPoints() {
        return this.points;
    }
    getMarkerAngles() {
        var { angles  } = this;
        var len = angles.length;
        for(var i = 0; i < len; i++)if (!angles[i]) {
            for(var j = i + 1; j < len; j++)if (angles[j]) {
                angles[i] = angles[j];
                break;
            }
        }
        return angles;
    }
}
class RenderedElement extends Element {
    constructor(){
        super(...arguments);
        this.modifiedEmSizeStack = false;
    }
    calculateOpacity() {
        var opacity = 1; // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
        var element = this;
        while(element){
            var opacityStyle = element.getStyle('opacity', false, true); // no ancestors on style call
            if (opacityStyle.hasValue(true)) opacity *= opacityStyle.getNumber();
            element = element.parent;
        }
        return opacity;
    }
    setContext(ctx16) {
        var fromMeasure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!fromMeasure) {
            // causes stack overflow when measuring text with gradients
            // fill
            var fillStyleProp = this.getStyle('fill');
            var fillOpacityStyleProp = this.getStyle('fill-opacity');
            var strokeStyleProp = this.getStyle('stroke');
            var strokeOpacityProp = this.getStyle('stroke-opacity');
            if (fillStyleProp.isUrlDefinition()) {
                var fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);
                if (fillStyle) ctx16.fillStyle = fillStyle;
            } else if (fillStyleProp.hasValue()) {
                if (fillStyleProp.getString() === 'currentColor') fillStyleProp.setValue(this.getStyle('color').getColor());
                var _fillStyle = fillStyleProp.getColor();
                if (_fillStyle !== 'inherit') ctx16.fillStyle = _fillStyle === 'none' ? 'rgba(0,0,0,0)' : _fillStyle;
            }
            if (fillOpacityStyleProp.hasValue()) {
                var _fillStyle2 = new Property(this.document, 'fill', ctx16.fillStyle).addOpacity(fillOpacityStyleProp).getColor();
                ctx16.fillStyle = _fillStyle2;
            } // stroke
            if (strokeStyleProp.isUrlDefinition()) {
                var strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);
                if (strokeStyle) ctx16.strokeStyle = strokeStyle;
            } else if (strokeStyleProp.hasValue()) {
                if (strokeStyleProp.getString() === 'currentColor') strokeStyleProp.setValue(this.getStyle('color').getColor());
                var _strokeStyle = strokeStyleProp.getString();
                if (_strokeStyle !== 'inherit') ctx16.strokeStyle = _strokeStyle === 'none' ? 'rgba(0,0,0,0)' : _strokeStyle;
            }
            if (strokeOpacityProp.hasValue()) {
                var _strokeStyle2 = new Property(this.document, 'stroke', ctx16.strokeStyle).addOpacity(strokeOpacityProp).getString();
                ctx16.strokeStyle = _strokeStyle2;
            }
            var strokeWidthStyleProp = this.getStyle('stroke-width');
            if (strokeWidthStyleProp.hasValue()) {
                var newLineWidth = strokeWidthStyleProp.getPixels();
                ctx16.lineWidth = !newLineWidth ? PSEUDO_ZERO // browsers don't respect 0 (or node-canvas? :-)
                 : newLineWidth;
            }
            var strokeLinecapStyleProp = this.getStyle('stroke-linecap');
            var strokeLinejoinStyleProp = this.getStyle('stroke-linejoin');
            var strokeMiterlimitProp = this.getStyle('stroke-miterlimit'); // NEED TEST
            // const pointOrderStyleProp = this.getStyle('paint-order');
            var strokeDasharrayStyleProp = this.getStyle('stroke-dasharray');
            var strokeDashoffsetProp = this.getStyle('stroke-dashoffset');
            if (strokeLinecapStyleProp.hasValue()) ctx16.lineCap = strokeLinecapStyleProp.getString();
            if (strokeLinejoinStyleProp.hasValue()) ctx16.lineJoin = strokeLinejoinStyleProp.getString();
            if (strokeMiterlimitProp.hasValue()) ctx16.miterLimit = strokeMiterlimitProp.getNumber();
             // NEED TEST
            // if (pointOrderStyleProp.hasValue()) {
            // 	// ?
            // 	ctx.paintOrder = pointOrderStyleProp.getValue();
            // }
            if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== 'none') {
                var gaps = toNumbers(strokeDasharrayStyleProp.getString());
                if (typeof ctx16.setLineDash !== 'undefined') ctx16.setLineDash(gaps);
                else if (typeof ctx16.webkitLineDash !== 'undefined') // @ts-expect-error Handle browser prefix.
                ctx16.webkitLineDash = gaps;
                else if (typeof ctx16.mozDash !== 'undefined' && !(gaps.length === 1 && gaps[0] === 0)) // @ts-expect-error Handle browser prefix.
                ctx16.mozDash = gaps;
                var offset = strokeDashoffsetProp.getPixels();
                if (typeof ctx16.lineDashOffset !== 'undefined') ctx16.lineDashOffset = offset;
                else if (typeof ctx16.webkitLineDashOffset !== 'undefined') // @ts-expect-error Handle browser prefix.
                ctx16.webkitLineDashOffset = offset;
                else if (typeof ctx16.mozDashOffset !== 'undefined') // @ts-expect-error Handle browser prefix.
                ctx16.mozDashOffset = offset;
            }
        } // font
        this.modifiedEmSizeStack = false;
        if (typeof ctx16.font !== 'undefined') {
            var fontStyleProp = this.getStyle('font');
            var fontStyleStyleProp = this.getStyle('font-style');
            var fontVariantStyleProp = this.getStyle('font-variant');
            var fontWeightStyleProp = this.getStyle('font-weight');
            var fontSizeStyleProp = this.getStyle('font-size');
            var fontFamilyStyleProp = this.getStyle('font-family');
            var font = new Font(fontStyleStyleProp.getString(), fontVariantStyleProp.getString(), fontWeightStyleProp.getString(), fontSizeStyleProp.hasValue() ? "".concat(fontSizeStyleProp.getPixels(true), "px") : '', fontFamilyStyleProp.getString(), Font.parse(fontStyleProp.getString(), ctx16.font));
            fontStyleStyleProp.setValue(font.fontStyle);
            fontVariantStyleProp.setValue(font.fontVariant);
            fontWeightStyleProp.setValue(font.fontWeight);
            fontSizeStyleProp.setValue(font.fontSize);
            fontFamilyStyleProp.setValue(font.fontFamily);
            ctx16.font = font.toString();
            if (fontSizeStyleProp.isPixels()) {
                this.document.emSize = fontSizeStyleProp.getPixels();
                this.modifiedEmSizeStack = true;
            }
        }
        if (!fromMeasure) {
            // effects
            this.applyEffects(ctx16); // opacity
            ctx16.globalAlpha = this.calculateOpacity();
        }
    }
    clearContext(ctx17) {
        super.clearContext(ctx17);
        if (this.modifiedEmSizeStack) this.document.popEmSize();
    }
}
class PathElement extends RenderedElement {
    constructor(document11, node3, captureTextNodes1){
        super(document11, node3, captureTextNodes1);
        this.type = 'path';
        this.pathParser = null;
        this.pathParser = new PathParser(this.getAttribute('d').getString());
    }
    path(ctx18) {
        var { pathParser  } = this;
        var boundingBox = new BoundingBox();
        pathParser.reset();
        if (ctx18) ctx18.beginPath();
        while(!pathParser.isEnd())switch(pathParser.next().type){
            case PathParser.MOVE_TO:
                this.pathM(ctx18, boundingBox);
                break;
            case PathParser.LINE_TO:
                this.pathL(ctx18, boundingBox);
                break;
            case PathParser.HORIZ_LINE_TO:
                this.pathH(ctx18, boundingBox);
                break;
            case PathParser.VERT_LINE_TO:
                this.pathV(ctx18, boundingBox);
                break;
            case PathParser.CURVE_TO:
                this.pathC(ctx18, boundingBox);
                break;
            case PathParser.SMOOTH_CURVE_TO:
                this.pathS(ctx18, boundingBox);
                break;
            case PathParser.QUAD_TO:
                this.pathQ(ctx18, boundingBox);
                break;
            case PathParser.SMOOTH_QUAD_TO:
                this.pathT(ctx18, boundingBox);
                break;
            case PathParser.ARC:
                this.pathA(ctx18, boundingBox);
                break;
            case PathParser.CLOSE_PATH:
                this.pathZ(ctx18, boundingBox);
                break;
        }
        return boundingBox;
    }
    getBoundingBox(_5) {
        return this.path();
    }
    getMarkers() {
        var { pathParser  } = this;
        var points = pathParser.getMarkerPoints();
        var angles = pathParser.getMarkerAngles();
        var markers = points.map((point, i)=>[
                point,
                angles[i]
            ]
        );
        return markers;
    }
    renderChildren(ctx19) {
        this.path(ctx19);
        this.document.screen.mouse.checkPath(this, ctx19);
        var fillRuleStyleProp = this.getStyle('fill-rule');
        if (ctx19.fillStyle !== '') {
            if (fillRuleStyleProp.getString('inherit') !== 'inherit') ctx19.fill(fillRuleStyleProp.getString());
            else ctx19.fill();
        }
        if (ctx19.strokeStyle !== '') {
            if (this.getAttribute('vector-effect').getString() === 'non-scaling-stroke') {
                ctx19.save();
                ctx19.setTransform(1, 0, 0, 1, 0, 0);
                ctx19.stroke();
                ctx19.restore();
            } else ctx19.stroke();
        }
        var markers = this.getMarkers();
        if (markers) {
            var markersLastIndex = markers.length - 1;
            var markerStartStyleProp = this.getStyle('marker-start');
            var markerMidStyleProp = this.getStyle('marker-mid');
            var markerEndStyleProp = this.getStyle('marker-end');
            if (markerStartStyleProp.isUrlDefinition()) {
                var marker = markerStartStyleProp.getDefinition();
                var [point, angle] = markers[0];
                marker.render(ctx19, point, angle);
            }
            if (markerMidStyleProp.isUrlDefinition()) {
                var _marker = markerMidStyleProp.getDefinition();
                for(var i = 1; i < markersLastIndex; i++){
                    var [_point, _angle] = markers[i];
                    _marker.render(ctx19, _point, _angle);
                }
            }
            if (markerEndStyleProp.isUrlDefinition()) {
                var _marker2 = markerEndStyleProp.getDefinition();
                var [_point2, _angle2] = markers[markersLastIndex];
                _marker2.render(ctx19, _point2, _angle2);
            }
        }
    }
    static pathM(pathParser) {
        var point = pathParser.getAsCurrentPoint();
        pathParser.start = pathParser.current;
        return {
            point
        };
    }
    pathM(ctx20, boundingBox2) {
        var { pathParser  } = this;
        var { point  } = PathElement.pathM(pathParser);
        var { x , y  } = point;
        pathParser.addMarker(point);
        boundingBox2.addPoint(x, y);
        if (ctx20) ctx20.moveTo(x, y);
    }
    static pathL(pathParser1) {
        var { current  } = pathParser1;
        var point = pathParser1.getAsCurrentPoint();
        return {
            current,
            point
        };
    }
    pathL(ctx21, boundingBox3) {
        var { pathParser  } = this;
        var { current , point  } = PathElement.pathL(pathParser);
        var { x , y  } = point;
        pathParser.addMarker(point, current);
        boundingBox3.addPoint(x, y);
        if (ctx21) ctx21.lineTo(x, y);
    }
    static pathH(pathParser2) {
        var { current , command  } = pathParser2;
        var point = new Point((command.relative ? current.x : 0) + command.x, current.y);
        pathParser2.current = point;
        return {
            current,
            point
        };
    }
    pathH(ctx22, boundingBox4) {
        var { pathParser  } = this;
        var { current , point  } = PathElement.pathH(pathParser);
        var { x , y  } = point;
        pathParser.addMarker(point, current);
        boundingBox4.addPoint(x, y);
        if (ctx22) ctx22.lineTo(x, y);
    }
    static pathV(pathParser3) {
        var { current , command  } = pathParser3;
        var point = new Point(current.x, (command.relative ? current.y : 0) + command.y);
        pathParser3.current = point;
        return {
            current,
            point
        };
    }
    pathV(ctx23, boundingBox5) {
        var { pathParser  } = this;
        var { current , point  } = PathElement.pathV(pathParser);
        var { x , y  } = point;
        pathParser.addMarker(point, current);
        boundingBox5.addPoint(x, y);
        if (ctx23) ctx23.lineTo(x, y);
    }
    static pathC(pathParser4) {
        var { current  } = pathParser4;
        var point = pathParser4.getPoint('x1', 'y1');
        var controlPoint = pathParser4.getAsControlPoint('x2', 'y2');
        var currentPoint = pathParser4.getAsCurrentPoint();
        return {
            current,
            point,
            controlPoint,
            currentPoint
        };
    }
    pathC(ctx24, boundingBox6) {
        var { pathParser  } = this;
        var { current , point , controlPoint , currentPoint  } = PathElement.pathC(pathParser);
        pathParser.addMarker(currentPoint, controlPoint, point);
        boundingBox6.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx24) ctx24.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
    static pathS(pathParser5) {
        var { current  } = pathParser5;
        var point = pathParser5.getReflectedControlPoint();
        var controlPoint = pathParser5.getAsControlPoint('x2', 'y2');
        var currentPoint = pathParser5.getAsCurrentPoint();
        return {
            current,
            point,
            controlPoint,
            currentPoint
        };
    }
    pathS(ctx25, boundingBox7) {
        var { pathParser  } = this;
        var { current , point , controlPoint , currentPoint  } = PathElement.pathS(pathParser);
        pathParser.addMarker(currentPoint, controlPoint, point);
        boundingBox7.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx25) ctx25.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
    static pathQ(pathParser6) {
        var { current  } = pathParser6;
        var controlPoint = pathParser6.getAsControlPoint('x1', 'y1');
        var currentPoint = pathParser6.getAsCurrentPoint();
        return {
            current,
            controlPoint,
            currentPoint
        };
    }
    pathQ(ctx26, boundingBox8) {
        var { pathParser  } = this;
        var { current , controlPoint , currentPoint  } = PathElement.pathQ(pathParser);
        pathParser.addMarker(currentPoint, controlPoint, controlPoint);
        boundingBox8.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx26) ctx26.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
    static pathT(pathParser7) {
        var { current  } = pathParser7;
        var controlPoint = pathParser7.getReflectedControlPoint();
        pathParser7.control = controlPoint;
        var currentPoint = pathParser7.getAsCurrentPoint();
        return {
            current,
            controlPoint,
            currentPoint
        };
    }
    pathT(ctx27, boundingBox9) {
        var { pathParser  } = this;
        var { current , controlPoint , currentPoint  } = PathElement.pathT(pathParser);
        pathParser.addMarker(currentPoint, controlPoint, controlPoint);
        boundingBox9.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx27) ctx27.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
    static pathA(pathParser8) {
        var { current , command  } = pathParser8;
        var { rX , rY , xRot , lArcFlag , sweepFlag  } = command;
        var xAxisRotation = xRot * (Math.PI / 180);
        var currentPoint = pathParser8.getAsCurrentPoint(); // Conversion from endpoint to center parameterization
        // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
        // x1', y1'
        var currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2); // adjust radii
        var l = Math.pow(currp.x, 2) / Math.pow(rX, 2) + Math.pow(currp.y, 2) / Math.pow(rY, 2);
        if (l > 1) {
            rX *= Math.sqrt(l);
            rY *= Math.sqrt(l);
        } // cx', cy'
        var s = (lArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rX, 2) * Math.pow(rY, 2) - Math.pow(rX, 2) * Math.pow(currp.y, 2) - Math.pow(rY, 2) * Math.pow(currp.x, 2)) / (Math.pow(rX, 2) * Math.pow(currp.y, 2) + Math.pow(rY, 2) * Math.pow(currp.x, 2)));
        if (isNaN(s)) s = 0;
        var cpp = new Point(s * rX * currp.y / rY, s * -rY * currp.x / rX); // cx, cy
        var centp = new Point((current.x + currentPoint.x) / 2 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y); // initial angle
        var a1 = vectorsAngle([
            1,
            0
        ], [
            (currp.x - cpp.x) / rX,
            (currp.y - cpp.y) / rY
        ]); // θ1
        // angle delta
        var u = [
            (currp.x - cpp.x) / rX,
            (currp.y - cpp.y) / rY
        ];
        var v = [
            (-currp.x - cpp.x) / rX,
            (-currp.y - cpp.y) / rY
        ];
        var ad = vectorsAngle(u, v); // Δθ
        if (vectorsRatio(u, v) <= -1) ad = Math.PI;
        if (vectorsRatio(u, v) >= 1) ad = 0;
        return {
            currentPoint,
            rX,
            rY,
            sweepFlag,
            xAxisRotation,
            centp,
            a1,
            ad
        };
    }
    pathA(ctx28, boundingBox10) {
        var { pathParser  } = this;
        var { currentPoint , rX , rY , sweepFlag , xAxisRotation , centp , a1 , ad  } = PathElement.pathA(pathParser); // for markers
        var dir = 1 - sweepFlag ? 1 : -1;
        var ah = a1 + dir * (ad / 2);
        var halfWay = new Point(centp.x + rX * Math.cos(ah), centp.y + rY * Math.sin(ah));
        pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
        pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
        boundingBox10.addPoint(currentPoint.x, currentPoint.y); // TODO: this is too naive, make it better
        if (ctx28 && !isNaN(a1) && !isNaN(ad)) {
            var r = rX > rY ? rX : rY;
            var sx = rX > rY ? 1 : rX / rY;
            var sy = rX > rY ? rY / rX : 1;
            ctx28.translate(centp.x, centp.y);
            ctx28.rotate(xAxisRotation);
            ctx28.scale(sx, sy);
            ctx28.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
            ctx28.scale(1 / sx, 1 / sy);
            ctx28.rotate(-xAxisRotation);
            ctx28.translate(-centp.x, -centp.y);
        }
    }
    static pathZ(pathParser9) {
        pathParser9.current = pathParser9.start;
    }
    pathZ(ctx29, boundingBox11) {
        PathElement.pathZ(this.pathParser);
        if (ctx29) // only close path if it is not a straight line
        {
            if (boundingBox11.x1 !== boundingBox11.x2 && boundingBox11.y1 !== boundingBox11.y2) ctx29.closePath();
        }
    }
}
class GlyphElement extends PathElement {
    constructor(document12, node4, captureTextNodes2){
        super(document12, node4, captureTextNodes2);
        this.type = 'glyph';
        this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
        this.unicode = this.getAttribute('unicode').getString();
        this.arabicForm = this.getAttribute('arabic-form').getString();
    }
}
class TextElement extends RenderedElement {
    constructor(document13, node5, captureTextNodes3){
        super(document13, node5, new.target === TextElement ? true : captureTextNodes3);
        this.type = 'text';
        this.x = 0;
        this.y = 0;
        this.measureCache = -1;
    }
    setContext(ctx30) {
        var fromMeasure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        super.setContext(ctx30, fromMeasure);
        var textBaseline = this.getStyle('dominant-baseline').getTextBaseline() || this.getStyle('alignment-baseline').getTextBaseline();
        if (textBaseline) ctx30.textBaseline = textBaseline;
    }
    initializeCoordinates(ctx31) {
        this.x = this.getAttribute('x').getPixels('x');
        this.y = this.getAttribute('y').getPixels('y');
        var dxAttr = this.getAttribute('dx');
        var dyAttr = this.getAttribute('dy');
        if (dxAttr.hasValue()) this.x += dxAttr.getPixels('x');
        if (dyAttr.hasValue()) this.y += dyAttr.getPixels('y');
        this.x += this.getAnchorDelta(ctx31, this, 0);
    }
    getBoundingBox(ctx32) {
        if (this.type !== 'text') return this.getTElementBoundingBox(ctx32);
        this.initializeCoordinates(ctx32);
        var boundingBox = null;
        this.children.forEach((_, i)=>{
            var childBoundingBox = this.getChildBoundingBox(ctx32, this, this, i);
            if (!boundingBox) boundingBox = childBoundingBox;
            else boundingBox.addBoundingBox(childBoundingBox);
        });
        return boundingBox;
    }
    getFontSize() {
        var { document , parent  } = this;
        var inheritFontSize = Font.parse(document.ctx.font).fontSize;
        var fontSize = parent.getStyle('font-size').getNumber(inheritFontSize);
        return fontSize;
    }
    getTElementBoundingBox(ctx33) {
        var fontSize = this.getFontSize();
        return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx33), this.y);
    }
    getGlyph(font1, text, i1) {
        var char = text[i1];
        var glyph = null;
        if (font1.isArabic) {
            var len = text.length;
            var prevChar = text[i1 - 1];
            var nextChar = text[i1 + 1];
            var arabicForm = 'isolated';
            if ((i1 === 0 || prevChar === ' ') && i1 < len - 2 && nextChar !== ' ') arabicForm = 'terminal';
            if (i1 > 0 && prevChar !== ' ' && i1 < len - 2 && nextChar !== ' ') arabicForm = 'medial';
            if (i1 > 0 && prevChar !== ' ' && (i1 === len - 1 || nextChar === ' ')) arabicForm = 'initial';
            if (typeof font1.glyphs[char] !== 'undefined') {
                // NEED TEST
                var maybeGlyph = font1.glyphs[char];
                glyph = maybeGlyph instanceof GlyphElement ? maybeGlyph : maybeGlyph[arabicForm];
            }
        } else glyph = font1.glyphs[char];
        if (!glyph) glyph = font1.missingGlyph;
        return glyph;
    }
    getText() {
        return '';
    }
    getTextFromNode(node6) {
        var textNode = node6 || this.node;
        var childNodes = Array.from(textNode.parentNode.childNodes);
        var index = childNodes.indexOf(textNode);
        var lastIndex = childNodes.length - 1;
        var text = compressSpaces(// || textNode.text
        textNode.textContent || '');
        if (index === 0) text = trimLeft(text);
        if (index === lastIndex) text = trimRight(text);
        return text;
    }
    renderChildren(ctx34) {
        if (this.type !== 'text') {
            this.renderTElementChildren(ctx34);
            return;
        }
        this.initializeCoordinates(ctx34);
        this.children.forEach((_, i)=>{
            this.renderChild(ctx34, this, this, i);
        });
        var { mouse  } = this.document.screen; // Do not calc bounding box if mouse is not working.
        if (mouse.isWorking()) mouse.checkBoundingBox(this, this.getBoundingBox(ctx34));
    }
    renderTElementChildren(ctx35) {
        var { document , parent  } = this;
        var renderText = this.getText();
        var customFont = parent.getStyle('font-family').getDefinition();
        if (customFont) {
            var { unitsPerEm  } = customFont.fontFace;
            var ctxFont = Font.parse(document.ctx.font);
            var fontSize = parent.getStyle('font-size').getNumber(ctxFont.fontSize);
            var fontStyle = parent.getStyle('font-style').getString(ctxFont.fontStyle);
            var scale = fontSize / unitsPerEm;
            var text = customFont.isRTL ? renderText.split('').reverse().join('') : renderText;
            var dx = toNumbers(parent.getAttribute('dx').getString());
            var len = text.length;
            for(var i = 0; i < len; i++){
                var glyph = this.getGlyph(customFont, text, i);
                ctx35.translate(this.x, this.y);
                ctx35.scale(scale, -scale);
                var lw = ctx35.lineWidth;
                ctx35.lineWidth = ctx35.lineWidth * unitsPerEm / fontSize;
                if (fontStyle === 'italic') ctx35.transform(1, 0, 0.4, 1, 0, 0);
                glyph.render(ctx35);
                if (fontStyle === 'italic') ctx35.transform(1, 0, -0.4, 1, 0, 0);
                ctx35.lineWidth = lw;
                ctx35.scale(1 / scale, -1 / scale);
                ctx35.translate(-this.x, -this.y);
                this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;
                if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) this.x += dx[i];
            }
            return;
        }
        var { x , y  } = this; // NEED TEST
        // if (ctx.paintOrder === 'stroke') {
        // 	if (ctx.strokeStyle) {
        // 		ctx.strokeText(renderText, x, y);
        // 	}
        // 	if (ctx.fillStyle) {
        // 		ctx.fillText(renderText, x, y);
        // 	}
        // } else {
        if (ctx35.fillStyle) ctx35.fillText(renderText, x, y);
        if (ctx35.strokeStyle) ctx35.strokeText(renderText, x, y);
         // }
    }
    getAnchorDelta(ctx36, parent, startI) {
        var textAnchor = this.getStyle('text-anchor').getString('start');
        if (textAnchor !== 'start') {
            var { children  } = parent;
            var len = children.length;
            var child = null;
            var width = 0;
            for(var i = startI; i < len; i++){
                child = children[i];
                if (i > startI && child.getAttribute('x').hasValue() || child.getAttribute('text-anchor').hasValue()) break; // new group
                width += child.measureTextRecursive(ctx36);
            }
            return -1 * (textAnchor === 'end' ? width : width / 2);
        }
        return 0;
    }
    adjustChildCoordinates(ctx37, textParent, parent1, i3) {
        var child = parent1.children[i3];
        if (typeof child.measureText !== 'function') return child;
        ctx37.save();
        child.setContext(ctx37, true);
        var xAttr = child.getAttribute('x');
        var yAttr = child.getAttribute('y');
        var dxAttr = child.getAttribute('dx');
        var dyAttr = child.getAttribute('dy');
        var textAnchor = child.getAttribute('text-anchor').getString('start');
        if (i3 === 0 && child.type !== 'textNode') {
            if (!xAttr.hasValue()) xAttr.setValue(textParent.getAttribute('x').getValue('0'));
            if (!yAttr.hasValue()) yAttr.setValue(textParent.getAttribute('y').getValue('0'));
            if (!dxAttr.hasValue()) dxAttr.setValue(textParent.getAttribute('dx').getValue('0'));
            if (!dyAttr.hasValue()) dyAttr.setValue(textParent.getAttribute('dy').getValue('0'));
        }
        if (xAttr.hasValue()) {
            child.x = xAttr.getPixels('x') + textParent.getAnchorDelta(ctx37, parent1, i3);
            if (textAnchor !== 'start') {
                var width = child.measureTextRecursive(ctx37);
                child.x += -1 * (textAnchor === 'end' ? width : width / 2);
            }
            if (dxAttr.hasValue()) child.x += dxAttr.getPixels('x');
        } else {
            if (textAnchor !== 'start') {
                var _width = child.measureTextRecursive(ctx37);
                textParent.x += -1 * (textAnchor === 'end' ? _width : _width / 2);
            }
            if (dxAttr.hasValue()) textParent.x += dxAttr.getPixels('x');
            child.x = textParent.x;
        }
        textParent.x = child.x + child.measureText(ctx37);
        if (yAttr.hasValue()) {
            child.y = yAttr.getPixels('y');
            if (dyAttr.hasValue()) child.y += dyAttr.getPixels('y');
        } else {
            if (dyAttr.hasValue()) textParent.y += dyAttr.getPixels('y');
            child.y = textParent.y;
        }
        textParent.y = child.y;
        child.clearContext(ctx37);
        ctx37.restore();
        return child;
    }
    getChildBoundingBox(ctx38, textParent1, parent2, i2) {
        var child = this.adjustChildCoordinates(ctx38, textParent1, parent2, i2); // not a text node?
        if (typeof child.getBoundingBox !== 'function') return null;
        var boundingBox = child.getBoundingBox(ctx38);
        if (!boundingBox) return null;
        child.children.forEach((_, i)=>{
            var childBoundingBox = textParent1.getChildBoundingBox(ctx38, textParent1, child, i);
            boundingBox.addBoundingBox(childBoundingBox);
        });
        return boundingBox;
    }
    renderChild(ctx39, textParent2, parent3, i4) {
        var child = this.adjustChildCoordinates(ctx39, textParent2, parent3, i4);
        child.render(ctx39);
        child.children.forEach((_, i)=>{
            textParent2.renderChild(ctx39, textParent2, child, i);
        });
    }
    measureTextRecursive(ctx40) {
        var width1 = this.children.reduce((width, child)=>width + child.measureTextRecursive(ctx40)
        , this.measureText(ctx40));
        return width1;
    }
    measureText(ctx41) {
        var { measureCache  } = this;
        if (~measureCache) return measureCache;
        var renderText = this.getText();
        var measure = this.measureTargetText(ctx41, renderText);
        this.measureCache = measure;
        return measure;
    }
    measureTargetText(ctx42, targetText) {
        if (!targetText.length) return 0;
        var { parent  } = this;
        var customFont = parent.getStyle('font-family').getDefinition();
        if (customFont) {
            var fontSize = this.getFontSize();
            var text = customFont.isRTL ? targetText.split('').reverse().join('') : targetText;
            var dx = toNumbers(parent.getAttribute('dx').getString());
            var len = text.length;
            var _measure = 0;
            for(var i = 0; i < len; i++){
                var glyph = this.getGlyph(customFont, text, i);
                _measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
                if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) _measure += dx[i];
            }
            return _measure;
        }
        if (!ctx42.measureText) return targetText.length * 10;
        ctx42.save();
        this.setContext(ctx42, true);
        var { width: measure  } = ctx42.measureText(targetText);
        this.clearContext(ctx42);
        ctx42.restore();
        return measure;
    }
}
class TSpanElement extends TextElement {
    constructor(document14, node7, captureTextNodes4){
        super(document14, node7, new.target === TSpanElement ? true : captureTextNodes4);
        this.type = 'tspan'; // if this node has children, then they own the text
        this.text = this.children.length > 0 ? '' : this.getTextFromNode();
    }
    getText() {
        return this.text;
    }
}
class TextNode extends TSpanElement {
    constructor(){
        super(...arguments);
        this.type = 'textNode';
    }
}
class SVGElement extends RenderedElement {
    constructor(){
        super(...arguments);
        this.type = 'svg';
        this.root = false;
    }
    setContext(ctx43) {
        var _this$node$parentNode;
        var { document  } = this;
        var { screen , window  } = document;
        var canvas = ctx43.canvas;
        screen.setDefaults(ctx43);
        if (canvas.style && typeof ctx43.font !== 'undefined' && window && typeof window.getComputedStyle !== 'undefined') {
            ctx43.font = window.getComputedStyle(canvas).getPropertyValue('font');
            var fontSizeProp = new Property(document, 'fontSize', Font.parse(ctx43.font).fontSize);
            if (fontSizeProp.hasValue()) {
                document.rootEmSize = fontSizeProp.getPixels('y');
                document.emSize = document.rootEmSize;
            }
        } // create new view port
        if (!this.getAttribute('x').hasValue()) this.getAttribute('x', true).setValue(0);
        if (!this.getAttribute('y').hasValue()) this.getAttribute('y', true).setValue(0);
        var { width , height  } = screen.viewPort;
        if (!this.getStyle('width').hasValue()) this.getStyle('width', true).setValue('100%');
        if (!this.getStyle('height').hasValue()) this.getStyle('height', true).setValue('100%');
        if (!this.getStyle('color').hasValue()) this.getStyle('color', true).setValue('black');
        var refXAttr = this.getAttribute('refX');
        var refYAttr = this.getAttribute('refY');
        var viewBoxAttr = this.getAttribute('viewBox');
        var viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
        var clip = !this.root && this.getStyle('overflow').getValue('hidden') !== 'visible';
        var minX = 0;
        var minY = 0;
        var clipX = 0;
        var clipY = 0;
        if (viewBox) {
            minX = viewBox[0];
            minY = viewBox[1];
        }
        if (!this.root) {
            width = this.getStyle('width').getPixels('x');
            height = this.getStyle('height').getPixels('y');
            if (this.type === 'marker') {
                clipX = minX;
                clipY = minY;
                minX = 0;
                minY = 0;
            }
        }
        screen.viewPort.setCurrent(width, height); // Default value of transform-origin is center only for root SVG elements
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform-origin
        if (this.node // is not temporary SVGElement
         && (!this.parent || ((_this$node$parentNode = this.node.parentNode) === null || _this$node$parentNode === void 0 ? void 0 : _this$node$parentNode.nodeName) === 'foreignObject') && this.getStyle('transform', false, true).hasValue() && !this.getStyle('transform-origin', false, true).hasValue()) this.getStyle('transform-origin', true, true).setValue('50% 50%');
        super.setContext(ctx43);
        ctx43.translate(this.getAttribute('x').getPixels('x'), this.getAttribute('y').getPixels('y'));
        if (viewBox) {
            width = viewBox[2];
            height = viewBox[3];
        }
        document.setViewBox({
            ctx: ctx43,
            aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
            width: screen.viewPort.width,
            desiredWidth: width,
            height: screen.viewPort.height,
            desiredHeight: height,
            minX,
            minY,
            refX: refXAttr.getValue(),
            refY: refYAttr.getValue(),
            clip,
            clipX,
            clipY
        });
        if (viewBox) {
            screen.viewPort.removeCurrent();
            screen.viewPort.setCurrent(width, height);
        }
    }
    clearContext(ctx44) {
        super.clearContext(ctx44);
        this.document.screen.viewPort.removeCurrent();
    }
    /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */ resize(width2) {
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width2;
        var preserveAspectRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var widthAttr = this.getAttribute('width', true);
        var heightAttr = this.getAttribute('height', true);
        var viewBoxAttr = this.getAttribute('viewBox');
        var styleAttr = this.getAttribute('style');
        var originWidth = widthAttr.getNumber(0);
        var originHeight = heightAttr.getNumber(0);
        if (preserveAspectRatio) {
            if (typeof preserveAspectRatio === 'string') this.getAttribute('preserveAspectRatio', true).setValue(preserveAspectRatio);
            else {
                var preserveAspectRatioAttr = this.getAttribute('preserveAspectRatio');
                if (preserveAspectRatioAttr.hasValue()) preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, '$1'));
            }
        }
        widthAttr.setValue(width2);
        heightAttr.setValue(height);
        if (!viewBoxAttr.hasValue()) viewBoxAttr.setValue("0 0 ".concat(originWidth || width2, " ").concat(originHeight || height));
        if (styleAttr.hasValue()) {
            var widthStyle = this.getStyle('width');
            var heightStyle = this.getStyle('height');
            if (widthStyle.hasValue()) widthStyle.setValue("".concat(width2, "px"));
            if (heightStyle.hasValue()) heightStyle.setValue("".concat(height, "px"));
        }
    }
}
class RectElement extends PathElement {
    constructor(){
        super(...arguments);
        this.type = 'rect';
    }
    path(ctx45) {
        var x = this.getAttribute('x').getPixels('x');
        var y = this.getAttribute('y').getPixels('y');
        var width = this.getStyle('width', false, true).getPixels('x');
        var height = this.getStyle('height', false, true).getPixels('y');
        var rxAttr = this.getAttribute('rx');
        var ryAttr = this.getAttribute('ry');
        var rx = rxAttr.getPixels('x');
        var ry = ryAttr.getPixels('y');
        if (rxAttr.hasValue() && !ryAttr.hasValue()) ry = rx;
        if (ryAttr.hasValue() && !rxAttr.hasValue()) rx = ry;
        rx = Math.min(rx, width / 2);
        ry = Math.min(ry, height / 2);
        if (ctx45) {
            var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
            ctx45.beginPath(); // always start the path so we don't fill prior paths
            if (height > 0 && width > 0) {
                ctx45.moveTo(x + rx, y);
                ctx45.lineTo(x + width - rx, y);
                ctx45.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
                ctx45.lineTo(x + width, y + height - ry);
                ctx45.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
                ctx45.lineTo(x + rx, y + height);
                ctx45.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
                ctx45.lineTo(x, y + ry);
                ctx45.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
                ctx45.closePath();
            }
        }
        return new BoundingBox(x, y, x + width, y + height);
    }
    getMarkers() {
        return null;
    }
}
class CircleElement extends PathElement {
    constructor(){
        super(...arguments);
        this.type = 'circle';
    }
    path(ctx46) {
        var cx = this.getAttribute('cx').getPixels('x');
        var cy = this.getAttribute('cy').getPixels('y');
        var r = this.getAttribute('r').getPixels();
        if (ctx46 && r > 0) {
            ctx46.beginPath();
            ctx46.arc(cx, cy, r, 0, Math.PI * 2, false);
            ctx46.closePath();
        }
        return new BoundingBox(cx - r, cy - r, cx + r, cy + r);
    }
    getMarkers() {
        return null;
    }
}
class EllipseElement extends PathElement {
    constructor(){
        super(...arguments);
        this.type = 'ellipse';
    }
    path(ctx47) {
        var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
        var rx = this.getAttribute('rx').getPixels('x');
        var ry = this.getAttribute('ry').getPixels('y');
        var cx = this.getAttribute('cx').getPixels('x');
        var cy = this.getAttribute('cy').getPixels('y');
        if (ctx47 && rx > 0 && ry > 0) {
            ctx47.beginPath();
            ctx47.moveTo(cx + rx, cy);
            ctx47.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
            ctx47.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
            ctx47.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
            ctx47.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
            ctx47.closePath();
        }
        return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
    }
    getMarkers() {
        return null;
    }
}
class LineElement extends PathElement {
    constructor(){
        super(...arguments);
        this.type = 'line';
    }
    getPoints() {
        return [
            new Point(this.getAttribute('x1').getPixels('x'), this.getAttribute('y1').getPixels('y')),
            new Point(this.getAttribute('x2').getPixels('x'), this.getAttribute('y2').getPixels('y'))
        ];
    }
    path(ctx48) {
        var [{ x: x0 , y: y0  }, { x: x1 , y: y1  }] = this.getPoints();
        if (ctx48) {
            ctx48.beginPath();
            ctx48.moveTo(x0, y0);
            ctx48.lineTo(x1, y1);
        }
        return new BoundingBox(x0, y0, x1, y1);
    }
    getMarkers() {
        var [p0, p1] = this.getPoints();
        var a = p0.angleTo(p1);
        return [
            [
                p0,
                a
            ],
            [
                p1,
                a
            ]
        ];
    }
}
class PolylineElement extends PathElement {
    constructor(document15, node8, captureTextNodes5){
        super(document15, node8, captureTextNodes5);
        this.type = 'polyline';
        this.points = [];
        this.points = Point.parsePath(this.getAttribute('points').getString());
    }
    path(ctx49) {
        var { points  } = this;
        var [{ x: x0 , y: y0  }] = points;
        var boundingBox = new BoundingBox(x0, y0);
        if (ctx49) {
            ctx49.beginPath();
            ctx49.moveTo(x0, y0);
        }
        points.forEach((_ref)=>{
            var { x , y  } = _ref;
            boundingBox.addPoint(x, y);
            if (ctx49) ctx49.lineTo(x, y);
        });
        return boundingBox;
    }
    getMarkers() {
        var { points  } = this;
        var lastIndex = points.length - 1;
        var markers = [];
        points.forEach((point, i)=>{
            if (i === lastIndex) return;
            markers.push([
                point,
                point.angleTo(points[i + 1])
            ]);
        });
        if (markers.length > 0) markers.push([
            points[points.length - 1],
            markers[markers.length - 1][1]
        ]);
        return markers;
    }
}
class PolygonElement extends PolylineElement {
    constructor(){
        super(...arguments);
        this.type = 'polygon';
    }
    path(ctx50) {
        var boundingBox = super.path(ctx50);
        var [{ x , y  }] = this.points;
        if (ctx50) {
            ctx50.lineTo(x, y);
            ctx50.closePath();
        }
        return boundingBox;
    }
}
class PatternElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'pattern';
    }
    createPattern(ctx51, _6, parentOpacityProp) {
        var width = this.getStyle('width').getPixels('x', true);
        var height = this.getStyle('height').getPixels('y', true); // render me using a temporary svg element
        var patternSvg = new SVGElement(this.document, null);
        patternSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
        patternSvg.attributes.width = new Property(this.document, 'width', "".concat(width, "px"));
        patternSvg.attributes.height = new Property(this.document, 'height', "".concat(height, "px"));
        patternSvg.attributes.transform = new Property(this.document, 'transform', this.getAttribute('patternTransform').getValue());
        patternSvg.children = this.children;
        var patternCanvas = this.document.createCanvas(width, height);
        var patternCtx = patternCanvas.getContext('2d');
        var xAttr = this.getAttribute('x');
        var yAttr = this.getAttribute('y');
        if (xAttr.hasValue() && yAttr.hasValue()) patternCtx.translate(xAttr.getPixels('x', true), yAttr.getPixels('y', true));
        if (parentOpacityProp.hasValue()) this.styles['fill-opacity'] = parentOpacityProp;
        else Reflect.deleteProperty(this.styles, 'fill-opacity');
         // render 3x3 grid so when we transform there's no white space on edges
        for(var x = -1; x <= 1; x++)for(var y = -1; y <= 1; y++){
            patternCtx.save();
            patternSvg.attributes.x = new Property(this.document, 'x', x * patternCanvas.width);
            patternSvg.attributes.y = new Property(this.document, 'y', y * patternCanvas.height);
            patternSvg.render(patternCtx);
            patternCtx.restore();
        }
        var pattern = ctx51.createPattern(patternCanvas, 'repeat');
        return pattern;
    }
}
class MarkerElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'marker';
    }
    render(ctx52, point, angle1) {
        if (!point) return;
        var { x , y  } = point;
        var orient = this.getAttribute('orient').getString('auto');
        var markerUnits = this.getAttribute('markerUnits').getString('strokeWidth');
        ctx52.translate(x, y);
        if (orient === 'auto') ctx52.rotate(angle1);
        if (markerUnits === 'strokeWidth') ctx52.scale(ctx52.lineWidth, ctx52.lineWidth);
        ctx52.save(); // render me using a temporary svg element
        var markerSvg = new SVGElement(this.document, null);
        markerSvg.type = this.type;
        markerSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
        markerSvg.attributes.refX = new Property(this.document, 'refX', this.getAttribute('refX').getValue());
        markerSvg.attributes.refY = new Property(this.document, 'refY', this.getAttribute('refY').getValue());
        markerSvg.attributes.width = new Property(this.document, 'width', this.getAttribute('markerWidth').getValue());
        markerSvg.attributes.height = new Property(this.document, 'height', this.getAttribute('markerHeight').getValue());
        markerSvg.attributes.overflow = new Property(this.document, 'overflow', this.getAttribute('overflow').getValue());
        markerSvg.attributes.fill = new Property(this.document, 'fill', this.getAttribute('fill').getColor('black'));
        markerSvg.attributes.stroke = new Property(this.document, 'stroke', this.getAttribute('stroke').getValue('none'));
        markerSvg.children = this.children;
        markerSvg.render(ctx52);
        ctx52.restore();
        if (markerUnits === 'strokeWidth') ctx52.scale(1 / ctx52.lineWidth, 1 / ctx52.lineWidth);
        if (orient === 'auto') ctx52.rotate(-angle1);
        ctx52.translate(-x, -y);
    }
}
class DefsElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'defs';
    }
    render() {
    }
}
class GElement extends RenderedElement {
    constructor(){
        super(...arguments);
        this.type = 'g';
    }
    getBoundingBox(ctx53) {
        var boundingBox = new BoundingBox();
        this.children.forEach((child)=>{
            boundingBox.addBoundingBox(child.getBoundingBox(ctx53));
        });
        return boundingBox;
    }
}
class GradientElement extends Element {
    constructor(document16, node9, captureTextNodes6){
        super(document16, node9, captureTextNodes6);
        this.attributesToInherit = [
            'gradientUnits'
        ];
        this.stops = [];
        var { stops , children  } = this;
        children.forEach((child)=>{
            if (child.type === 'stop') stops.push(child);
        });
    }
    getGradientUnits() {
        return this.getAttribute('gradientUnits').getString('objectBoundingBox');
    }
    createGradient(ctx54, element8, parentOpacityProp1) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
        var stopsContainer = this;
        if (this.getHrefAttribute().hasValue()) {
            stopsContainer = this.getHrefAttribute().getDefinition();
            this.inheritStopContainer(stopsContainer);
        }
        var { stops  } = stopsContainer;
        var gradient = this.getGradient(ctx54, element8);
        if (!gradient) return this.addParentOpacity(parentOpacityProp1, stops[stops.length - 1].color);
        stops.forEach((stop)=>{
            gradient.addColorStop(stop.offset, this.addParentOpacity(parentOpacityProp1, stop.color));
        });
        if (this.getAttribute('gradientTransform').hasValue()) {
            // render as transformed pattern on temporary canvas
            var { document  } = this;
            var { MAX_VIRTUAL_PIXELS , viewPort  } = document.screen;
            var [rootView] = viewPort.viewPorts;
            var rect = new RectElement(document, null);
            rect.attributes.x = new Property(document, 'x', -MAX_VIRTUAL_PIXELS / 3);
            rect.attributes.y = new Property(document, 'y', -MAX_VIRTUAL_PIXELS / 3);
            rect.attributes.width = new Property(document, 'width', MAX_VIRTUAL_PIXELS);
            rect.attributes.height = new Property(document, 'height', MAX_VIRTUAL_PIXELS);
            var group = new GElement(document, null);
            group.attributes.transform = new Property(document, 'transform', this.getAttribute('gradientTransform').getValue());
            group.children = [
                rect
            ];
            var patternSvg = new SVGElement(document, null);
            patternSvg.attributes.x = new Property(document, 'x', 0);
            patternSvg.attributes.y = new Property(document, 'y', 0);
            patternSvg.attributes.width = new Property(document, 'width', rootView.width);
            patternSvg.attributes.height = new Property(document, 'height', rootView.height);
            patternSvg.children = [
                group
            ];
            var patternCanvas = document.createCanvas(rootView.width, rootView.height);
            var patternCtx = patternCanvas.getContext('2d');
            patternCtx.fillStyle = gradient;
            patternSvg.render(patternCtx);
            return patternCtx.createPattern(patternCanvas, 'no-repeat');
        }
        return gradient;
    }
    inheritStopContainer(stopsContainer) {
        this.attributesToInherit.forEach((attributeToInherit)=>{
            if (!this.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) this.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
        });
    }
    addParentOpacity(parentOpacityProp2, color) {
        if (parentOpacityProp2.hasValue()) {
            var colorProp = new Property(this.document, 'color', color);
            return colorProp.addOpacity(parentOpacityProp2).getColor();
        }
        return color;
    }
}
class LinearGradientElement extends GradientElement {
    constructor(document17, node10, captureTextNodes7){
        super(document17, node10, captureTextNodes7);
        this.type = 'linearGradient';
        this.attributesToInherit.push('x1', 'y1', 'x2', 'y2');
    }
    getGradient(ctx55, element9) {
        var isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
        var boundingBox = isBoundingBoxUnits ? element9.getBoundingBox(ctx55) : null;
        if (isBoundingBoxUnits && !boundingBox) return null;
        if (!this.getAttribute('x1').hasValue() && !this.getAttribute('y1').hasValue() && !this.getAttribute('x2').hasValue() && !this.getAttribute('y2').hasValue()) {
            this.getAttribute('x1', true).setValue(0);
            this.getAttribute('y1', true).setValue(0);
            this.getAttribute('x2', true).setValue(1);
            this.getAttribute('y2', true).setValue(0);
        }
        var x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x1').getNumber() : this.getAttribute('x1').getPixels('x');
        var y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y1').getNumber() : this.getAttribute('y1').getPixels('y');
        var x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x2').getNumber() : this.getAttribute('x2').getPixels('x');
        var y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y2').getNumber() : this.getAttribute('y2').getPixels('y');
        if (x1 === x2 && y1 === y2) return null;
        return ctx55.createLinearGradient(x1, y1, x2, y2);
    }
}
class RadialGradientElement extends GradientElement {
    constructor(document18, node11, captureTextNodes8){
        super(document18, node11, captureTextNodes8);
        this.type = 'radialGradient';
        this.attributesToInherit.push('cx', 'cy', 'r', 'fx', 'fy', 'fr');
    }
    getGradient(ctx56, element10) {
        var isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
        var boundingBox = element10.getBoundingBox(ctx56);
        if (isBoundingBoxUnits && !boundingBox) return null;
        if (!this.getAttribute('cx').hasValue()) this.getAttribute('cx', true).setValue('50%');
        if (!this.getAttribute('cy').hasValue()) this.getAttribute('cy', true).setValue('50%');
        if (!this.getAttribute('r').hasValue()) this.getAttribute('r', true).setValue('50%');
        var cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('cx').getNumber() : this.getAttribute('cx').getPixels('x');
        var cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('cy').getNumber() : this.getAttribute('cy').getPixels('y');
        var fx = cx;
        var fy = cy;
        if (this.getAttribute('fx').hasValue()) fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('fx').getNumber() : this.getAttribute('fx').getPixels('x');
        if (this.getAttribute('fy').hasValue()) fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('fy').getNumber() : this.getAttribute('fy').getPixels('y');
        var r = isBoundingBoxUnits ? (boundingBox.width + boundingBox.height) / 2 * this.getAttribute('r').getNumber() : this.getAttribute('r').getPixels();
        var fr = this.getAttribute('fr').getPixels();
        return ctx56.createRadialGradient(fx, fy, fr, cx, cy, r);
    }
}
class StopElement extends Element {
    constructor(document19, node12, captureTextNodes9){
        super(document19, node12, captureTextNodes9);
        this.type = 'stop';
        var offset = Math.max(0, Math.min(1, this.getAttribute('offset').getNumber()));
        var stopOpacity = this.getStyle('stop-opacity');
        var stopColor = this.getStyle('stop-color', true);
        if (stopColor.getString() === '') stopColor.setValue('#000');
        if (stopOpacity.hasValue()) stopColor = stopColor.addOpacity(stopOpacity);
        this.offset = offset;
        this.color = stopColor.getColor();
    }
}
class AnimateElement extends Element {
    constructor(document20, node13, captureTextNodes10){
        super(document20, node13, captureTextNodes10);
        this.type = 'animate';
        this.duration = 0;
        this.initialValue = null;
        this.initialUnits = '';
        this.removed = false;
        this.frozen = false;
        document20.screen.animations.push(this);
        this.begin = this.getAttribute('begin').getMilliseconds();
        this.maxDuration = this.begin + this.getAttribute('dur').getMilliseconds();
        this.from = this.getAttribute('from');
        this.to = this.getAttribute('to');
        this.values = new Property(document20, 'values', null);
        var valuesAttr = this.getAttribute('values');
        if (valuesAttr.hasValue()) this.values.setValue(valuesAttr.getString().split(';'));
    }
    getProperty() {
        var attributeType = this.getAttribute('attributeType').getString();
        var attributeName = this.getAttribute('attributeName').getString();
        if (attributeType === 'CSS') return this.parent.getStyle(attributeName, true);
        return this.parent.getAttribute(attributeName, true);
    }
    calcValue() {
        var { initialUnits  } = this;
        var { progress , from , to  } = this.getProgress(); // tween value linearly
        var newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;
        if (initialUnits === '%') newValue *= 100; // numValue() returns 0-1 whereas properties are 0-100
        return "".concat(newValue).concat(initialUnits);
    }
    update(delta) {
        var { parent  } = this;
        var prop = this.getProperty(); // set initial value
        if (!this.initialValue) {
            this.initialValue = prop.getString();
            this.initialUnits = prop.getUnits();
        } // if we're past the end time
        if (this.duration > this.maxDuration) {
            var fill = this.getAttribute('fill').getString('remove'); // loop for indefinitely repeating animations
            if (this.getAttribute('repeatCount').getString() === 'indefinite' || this.getAttribute('repeatDur').getString() === 'indefinite') this.duration = 0;
            else if (fill === 'freeze' && !this.frozen) {
                this.frozen = true;
                parent.animationFrozen = true;
                parent.animationFrozenValue = prop.getString();
            } else if (fill === 'remove' && !this.removed) {
                this.removed = true;
                prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
                return true;
            }
            return false;
        }
        this.duration += delta; // if we're past the begin time
        var updated = false;
        if (this.begin < this.duration) {
            var newValue = this.calcValue(); // tween
            var typeAttr = this.getAttribute('type');
            if (typeAttr.hasValue()) {
                // for transform, etc.
                var type = typeAttr.getString();
                newValue = "".concat(type, "(").concat(newValue, ")");
            }
            prop.setValue(newValue);
            updated = true;
        }
        return updated;
    }
    getProgress() {
        var { document , values  } = this;
        var result = {
            progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
        };
        if (values.hasValue()) {
            var p = result.progress * (values.getValue().length - 1);
            var lb = Math.floor(p);
            var ub = Math.ceil(p);
            result.from = new Property(document, 'from', parseFloat(values.getValue()[lb]));
            result.to = new Property(document, 'to', parseFloat(values.getValue()[ub]));
            result.progress = (p - lb) / (ub - lb);
        } else {
            result.from = this.from;
            result.to = this.to;
        }
        return result;
    }
}
class AnimateColorElement extends AnimateElement {
    constructor(){
        super(...arguments);
        this.type = 'animateColor';
    }
    calcValue() {
        var { progress , from , to  } = this.getProgress();
        var colorFrom = new _rgbcolorDefault.default(from.getColor());
        var colorTo = new _rgbcolorDefault.default(to.getColor());
        if (colorFrom.ok && colorTo.ok) {
            // tween color linearly
            var r = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
            var g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
            var b = colorFrom.b + (colorTo.b - colorFrom.b) * progress; // ? alpha
            return "rgb(".concat(Math.floor(r), ", ").concat(Math.floor(g), ", ").concat(Math.floor(b), ")");
        }
        return this.getAttribute('from').getColor();
    }
}
class AnimateTransformElement extends AnimateElement {
    constructor(){
        super(...arguments);
        this.type = 'animateTransform';
    }
    calcValue() {
        var { progress , from: from1 , to: to1  } = this.getProgress(); // tween value linearly
        var transformFrom = toNumbers(from1.getString());
        var transformTo = toNumbers(to1.getString());
        var newValue = transformFrom.map((from, i)=>{
            var to = transformTo[i];
            return from + (to - from) * progress;
        }).join(' ');
        return newValue;
    }
}
class FontElement extends Element {
    constructor(document21, node14, captureTextNodes11){
        super(document21, node14, captureTextNodes11);
        this.type = 'font';
        this.glyphs = {
        };
        this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
        var { definitions  } = document21;
        var { children  } = this;
        for (var child of children)switch(child.type){
            case 'font-face':
                this.fontFace = child;
                var fontFamilyStyle = child.getStyle('font-family');
                if (fontFamilyStyle.hasValue()) definitions[fontFamilyStyle.getString()] = this;
                break;
            case 'missing-glyph':
                this.missingGlyph = child;
                break;
            case 'glyph':
                var glyph = child;
                if (glyph.arabicForm) {
                    this.isRTL = true;
                    this.isArabic = true;
                    if (typeof this.glyphs[glyph.unicode] === 'undefined') this.glyphs[glyph.unicode] = {
                    };
                    this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
                } else this.glyphs[glyph.unicode] = glyph;
                break;
        }
    }
    render() {
    }
}
class FontFaceElement extends Element {
    constructor(document22, node15, captureTextNodes12){
        super(document22, node15, captureTextNodes12);
        this.type = 'font-face';
        this.ascent = this.getAttribute('ascent').getNumber();
        this.descent = this.getAttribute('descent').getNumber();
        this.unitsPerEm = this.getAttribute('units-per-em').getNumber();
    }
}
class MissingGlyphElement extends PathElement {
    constructor(){
        super(...arguments);
        this.type = 'missing-glyph';
        this.horizAdvX = 0;
    }
}
class TRefElement extends TextElement {
    constructor(){
        super(...arguments);
        this.type = 'tref';
    }
    getText() {
        var element = this.getHrefAttribute().getDefinition();
        if (element) {
            var firstChild = element.children[0];
            if (firstChild) return firstChild.getText();
        }
        return '';
    }
}
class AElement extends TextElement {
    constructor(document23, node16, captureTextNodes13){
        super(document23, node16, captureTextNodes13);
        this.type = 'a';
        var { childNodes  } = node16;
        var firstChild = childNodes[0];
        var hasText = childNodes.length > 0 && Array.from(childNodes).every((node)=>node.nodeType === 3
        );
        this.hasText = hasText;
        this.text = hasText ? this.getTextFromNode(firstChild) : '';
    }
    getText() {
        return this.text;
    }
    renderChildren(ctx57) {
        if (this.hasText) {
            // render as text element
            super.renderChildren(ctx57);
            var { document , x , y  } = this;
            var { mouse  } = document.screen;
            var fontSize = new Property(document, 'fontSize', Font.parse(document.ctx.font).fontSize); // Do not calc bounding box if mouse is not working.
            if (mouse.isWorking()) mouse.checkBoundingBox(this, new BoundingBox(x, y - fontSize.getPixels('y'), x + this.measureText(ctx57), y));
        } else if (this.children.length > 0) {
            // render as temporary group
            var g = new GElement(this.document, null);
            g.children = this.children;
            g.parent = this;
            g.render(ctx57);
        }
    }
    onClick() {
        var { window  } = this.document;
        if (window) window.open(this.getHrefAttribute().getString());
    }
    onMouseMove() {
        var ctx = this.document.ctx;
        ctx.canvas.style.cursor = 'pointer';
    }
}
function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) ownKeys$2(Object(source), true).forEach(function(key) {
            _definePropertyDefault.default(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else ownKeys$2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
class TextPathElement extends TextElement {
    constructor(document24, node, captureTextNodes14){
        super(document24, node, captureTextNodes14);
        this.type = 'textPath';
        this.textWidth = 0;
        this.textHeight = 0;
        this.pathLength = -1;
        this.glyphInfo = null;
        this.letterSpacingCache = [];
        this.measuresCache = new Map([
            [
                '',
                0
            ]
        ]);
        var pathElement = this.getHrefAttribute().getDefinition();
        this.text = this.getTextFromNode();
        this.dataArray = this.parsePathData(pathElement);
    }
    getText() {
        return this.text;
    }
    path(ctx58) {
        var { dataArray  } = this;
        if (ctx58) ctx58.beginPath();
        dataArray.forEach((_ref)=>{
            var { type , points  } = _ref;
            switch(type){
                case PathParser.LINE_TO:
                    if (ctx58) ctx58.lineTo(points[0], points[1]);
                    break;
                case PathParser.MOVE_TO:
                    if (ctx58) ctx58.moveTo(points[0], points[1]);
                    break;
                case PathParser.CURVE_TO:
                    if (ctx58) ctx58.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
                    break;
                case PathParser.QUAD_TO:
                    if (ctx58) ctx58.quadraticCurveTo(points[0], points[1], points[2], points[3]);
                    break;
                case PathParser.ARC:
                    var [cx, cy, rx, ry, theta, dTheta, psi, fs] = points;
                    var r = rx > ry ? rx : ry;
                    var scaleX = rx > ry ? 1 : rx / ry;
                    var scaleY = rx > ry ? ry / rx : 1;
                    if (ctx58) {
                        ctx58.translate(cx, cy);
                        ctx58.rotate(psi);
                        ctx58.scale(scaleX, scaleY);
                        ctx58.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
                        ctx58.scale(1 / scaleX, 1 / scaleY);
                        ctx58.rotate(-psi);
                        ctx58.translate(-cx, -cy);
                    }
                    break;
                case PathParser.CLOSE_PATH:
                    if (ctx58) ctx58.closePath();
                    break;
            }
        });
    }
    renderChildren(ctx59) {
        this.setTextData(ctx59);
        ctx59.save();
        var textDecoration = this.parent.getStyle('text-decoration').getString();
        var fontSize = this.getFontSize();
        var { glyphInfo  } = this;
        var fill = ctx59.fillStyle;
        if (textDecoration === 'underline') ctx59.beginPath();
        glyphInfo.forEach((glyph, i)=>{
            var { p0 , p1 , rotation , text: partialText  } = glyph;
            ctx59.save();
            ctx59.translate(p0.x, p0.y);
            ctx59.rotate(rotation);
            if (ctx59.fillStyle) ctx59.fillText(partialText, 0, 0);
            if (ctx59.strokeStyle) ctx59.strokeText(partialText, 0, 0);
            ctx59.restore();
            if (textDecoration === 'underline') {
                if (i === 0) ctx59.moveTo(p0.x, p0.y + fontSize / 8);
                ctx59.lineTo(p1.x, p1.y + fontSize / 5);
            } // // To assist with debugging visually, uncomment following
        //
        // ctx.beginPath();
        // if (i % 2)
        // 	ctx.strokeStyle = 'red';
        // else
        // 	ctx.strokeStyle = 'green';
        // ctx.moveTo(p0.x, p0.y);
        // ctx.lineTo(p1.x, p1.y);
        // ctx.stroke();
        // ctx.closePath();
        });
        if (textDecoration === 'underline') {
            ctx59.lineWidth = fontSize / 20;
            ctx59.strokeStyle = fill;
            ctx59.stroke();
            ctx59.closePath();
        }
        ctx59.restore();
    }
    getLetterSpacingAt() {
        var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return this.letterSpacingCache[idx] || 0;
    }
    findSegmentToFitChar(ctx60, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, dy, c1, charI) {
        var offset = inputOffset;
        var glyphWidth = this.measureText(ctx60, c1);
        if (c1 === ' ' && anchor === 'justify' && textFullWidth < fullPathWidth) glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
        if (charI > -1) offset += this.getLetterSpacingAt(charI);
        var splineStep = this.textHeight / 20;
        var p0 = this.getEquidistantPointOnPath(offset, splineStep, 0);
        var p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0);
        var segment = {
            p0,
            p1
        };
        var rotation = p0 && p1 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : 0;
        if (dy) {
            var dyX = Math.cos(Math.PI / 2 + rotation) * dy;
            var dyY = Math.cos(-rotation) * dy;
            segment.p0 = _objectSpread$2(_objectSpread$2({
            }, p0), {
            }, {
                x: p0.x + dyX,
                y: p0.y + dyY
            });
            segment.p1 = _objectSpread$2(_objectSpread$2({
            }, p1), {
            }, {
                x: p1.x + dyX,
                y: p1.y + dyY
            });
        }
        offset += glyphWidth;
        return {
            offset,
            segment,
            rotation
        };
    }
    measureText(ctx61, text1) {
        var { measuresCache  } = this;
        var targetText = text1 || this.getText();
        if (measuresCache.has(targetText)) return measuresCache.get(targetText);
        var measure = this.measureTargetText(ctx61, targetText);
        measuresCache.set(targetText, measure);
        return measure;
    }
    // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
    // You need to call this method manually to update glyphs cache.
    setTextData(ctx62) {
        if (this.glyphInfo) return;
        var renderText = this.getText();
        var chars = renderText.split('');
        var spacesNumber = renderText.split(' ').length - 1;
        var dx = this.parent.getAttribute('dx').split().map((_)=>_.getPixels('x')
        );
        var dy = this.parent.getAttribute('dy').getPixels('y');
        var anchor = this.parent.getStyle('text-anchor').getString('start');
        var thisSpacing = this.getStyle('letter-spacing');
        var parentSpacing = this.parent.getStyle('letter-spacing');
        var letterSpacing = 0;
        if (!thisSpacing.hasValue() || thisSpacing.getValue() === 'inherit') letterSpacing = parentSpacing.getPixels();
        else if (thisSpacing.hasValue()) {
            if (thisSpacing.getValue() !== 'initial' && thisSpacing.getValue() !== 'unset') letterSpacing = thisSpacing.getPixels();
        } // fill letter-spacing cache
        var letterSpacingCache = [];
        var textLen = renderText.length;
        this.letterSpacingCache = letterSpacingCache;
        for(var i5 = 0; i5 < textLen; i5++)letterSpacingCache.push(typeof dx[i5] !== 'undefined' ? dx[i5] : letterSpacing);
        var dxSum = letterSpacingCache.reduce((acc, cur, i)=>i === 0 ? 0 : acc + cur || 0
        , 0);
        var textWidth = this.measureText(ctx62);
        var textFullWidth = Math.max(textWidth + dxSum, 0);
        this.textWidth = textWidth;
        this.textHeight = this.getFontSize();
        this.glyphInfo = [];
        var fullPathWidth = this.getPathLength();
        var startOffset = this.getStyle('startOffset').getNumber(0) * fullPathWidth;
        var offset = 0;
        if (anchor === 'middle' || anchor === 'center') offset = -textFullWidth / 2;
        if (anchor === 'end' || anchor === 'right') offset = -textFullWidth;
        offset += startOffset;
        chars.forEach((char, i)=>{
            // Find such segment what distance between p0 and p1 is approx. width of glyph
            var { offset: nextOffset , segment , rotation  } = this.findSegmentToFitChar(ctx62, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, dy, char, i);
            offset = nextOffset;
            if (!segment.p0 || !segment.p1) return;
             // const width = this.getLineLength(
            // 	segment.p0.x,
            // 	segment.p0.y,
            // 	segment.p1.x,
            // 	segment.p1.y
            // );
            // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
            // Can foresee having a rough pair table built in that the developer can override as needed.
            // Or use "dx" attribute of the <text> node as a naive replacement
            // const kern = 0;
            // placeholder for future implementation
            // const midpoint = this.getPointOnLine(
            // 	kern + width / 2.0,
            // 	segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y
            // );
            this.glyphInfo.push({
                // transposeX: midpoint.x,
                // transposeY: midpoint.y,
                text: chars[i],
                p0: segment.p0,
                p1: segment.p1,
                rotation
            });
        });
    }
    parsePathData(path2) {
        this.pathLength = -1; // reset path length
        if (!path2) return [];
        var pathCommands = [];
        var { pathParser  } = path2;
        pathParser.reset(); // convert l, H, h, V, and v to L
        while(!pathParser.isEnd()){
            var { current  } = pathParser;
            var startX = current ? current.x : 0;
            var startY = current ? current.y : 0;
            var command = pathParser.next();
            var nextCommandType = command.type;
            var points = [];
            switch(command.type){
                case PathParser.MOVE_TO:
                    this.pathM(pathParser, points);
                    break;
                case PathParser.LINE_TO:
                    nextCommandType = this.pathL(pathParser, points);
                    break;
                case PathParser.HORIZ_LINE_TO:
                    nextCommandType = this.pathH(pathParser, points);
                    break;
                case PathParser.VERT_LINE_TO:
                    nextCommandType = this.pathV(pathParser, points);
                    break;
                case PathParser.CURVE_TO:
                    this.pathC(pathParser, points);
                    break;
                case PathParser.SMOOTH_CURVE_TO:
                    nextCommandType = this.pathS(pathParser, points);
                    break;
                case PathParser.QUAD_TO:
                    this.pathQ(pathParser, points);
                    break;
                case PathParser.SMOOTH_QUAD_TO:
                    nextCommandType = this.pathT(pathParser, points);
                    break;
                case PathParser.ARC:
                    points = this.pathA(pathParser);
                    break;
                case PathParser.CLOSE_PATH:
                    PathElement.pathZ(pathParser);
                    break;
            }
            if (command.type !== PathParser.CLOSE_PATH) pathCommands.push({
                type: nextCommandType,
                points,
                start: {
                    x: startX,
                    y: startY
                },
                pathLength: this.calcLength(startX, startY, nextCommandType, points)
            });
            else pathCommands.push({
                type: PathParser.CLOSE_PATH,
                points: [],
                pathLength: 0
            });
        }
        return pathCommands;
    }
    pathM(pathParser10, points) {
        var { x , y  } = PathElement.pathM(pathParser10).point;
        points.push(x, y);
    }
    pathL(pathParser11, points1) {
        var { x , y  } = PathElement.pathL(pathParser11).point;
        points1.push(x, y);
        return PathParser.LINE_TO;
    }
    pathH(pathParser12, points2) {
        var { x , y  } = PathElement.pathH(pathParser12).point;
        points2.push(x, y);
        return PathParser.LINE_TO;
    }
    pathV(pathParser13, points3) {
        var { x , y  } = PathElement.pathV(pathParser13).point;
        points3.push(x, y);
        return PathParser.LINE_TO;
    }
    pathC(pathParser14, points4) {
        var { point , controlPoint , currentPoint  } = PathElement.pathC(pathParser14);
        points4.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
    pathS(pathParser15, points5) {
        var { point , controlPoint , currentPoint  } = PathElement.pathS(pathParser15);
        points5.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        return PathParser.CURVE_TO;
    }
    pathQ(pathParser16, points6) {
        var { controlPoint , currentPoint  } = PathElement.pathQ(pathParser16);
        points6.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
    pathT(pathParser17, points7) {
        var { controlPoint , currentPoint  } = PathElement.pathT(pathParser17);
        points7.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        return PathParser.QUAD_TO;
    }
    pathA(pathParser18) {
        var { rX , rY , sweepFlag , xAxisRotation , centp , a1 , ad  } = PathElement.pathA(pathParser18);
        if (sweepFlag === 0 && ad > 0) ad -= 2 * Math.PI;
        if (sweepFlag === 1 && ad < 0) ad += 2 * Math.PI;
        return [
            centp.x,
            centp.y,
            rX,
            rY,
            a1,
            ad,
            xAxisRotation,
            sweepFlag
        ];
    }
    calcLength(x, y, commandType, points8) {
        var len = 0;
        var p1 = null;
        var p2 = null;
        var t = 0;
        switch(commandType){
            case PathParser.LINE_TO:
                return this.getLineLength(x, y, points8[0], points8[1]);
            case PathParser.CURVE_TO:
                // Approximates by breaking curve into 100 line segments
                len = 0;
                p1 = this.getPointOnCubicBezier(0, x, y, points8[0], points8[1], points8[2], points8[3], points8[4], points8[5]);
                for(t = 0.01; t <= 1; t += 0.01){
                    p2 = this.getPointOnCubicBezier(t, x, y, points8[0], points8[1], points8[2], points8[3], points8[4], points8[5]);
                    len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                return len;
            case PathParser.QUAD_TO:
                // Approximates by breaking curve into 100 line segments
                len = 0;
                p1 = this.getPointOnQuadraticBezier(0, x, y, points8[0], points8[1], points8[2], points8[3]);
                for(t = 0.01; t <= 1; t += 0.01){
                    p2 = this.getPointOnQuadraticBezier(t, x, y, points8[0], points8[1], points8[2], points8[3]);
                    len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                return len;
            case PathParser.ARC:
                // Approximates by breaking curve into line segments
                len = 0;
                var start = points8[4]; // 4 = theta
                var dTheta = points8[5]; // 5 = dTheta
                var end = points8[4] + dTheta;
                var inc = Math.PI / 180; // 1 degree resolution
                if (Math.abs(start - end) < inc) inc = Math.abs(start - end);
                 // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
                p1 = this.getPointOnEllipticalArc(points8[0], points8[1], points8[2], points8[3], start, 0);
                if (dTheta < 0) // clockwise
                for(t = start - inc; t > end; t -= inc){
                    p2 = this.getPointOnEllipticalArc(points8[0], points8[1], points8[2], points8[3], t, 0);
                    len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                else // counter-clockwise
                for(t = start + inc; t < end; t += inc){
                    p2 = this.getPointOnEllipticalArc(points8[0], points8[1], points8[2], points8[3], t, 0);
                    len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                p2 = this.getPointOnEllipticalArc(points8[0], points8[1], points8[2], points8[3], end, 0);
                len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                return len;
        }
        return 0;
    }
    getPointOnLine(dist, p1x2, p1y2, p2x2, p2y2) {
        var fromX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : p1x2;
        var fromY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : p1y2;
        var m = (p2y2 - p1y2) / (p2x2 - p1x2 + PSEUDO_ZERO);
        var run = Math.sqrt(dist * dist / (1 + m * m));
        if (p2x2 < p1x2) run *= -1;
        var rise = m * run;
        var pt = null;
        if (p2x2 === p1x2) // vertical line
        pt = {
            x: fromX,
            y: fromY + rise
        };
        else if ((fromY - p1y2) / (fromX - p1x2 + PSEUDO_ZERO) === m) pt = {
            x: fromX + run,
            y: fromY + rise
        };
        else {
            var ix = 0;
            var iy = 0;
            var len = this.getLineLength(p1x2, p1y2, p2x2, p2y2);
            if (len < PSEUDO_ZERO) return null;
            var u = (fromX - p1x2) * (p2x2 - p1x2) + (fromY - p1y2) * (p2y2 - p1y2);
            u /= len * len;
            ix = p1x2 + u * (p2x2 - p1x2);
            iy = p1y2 + u * (p2y2 - p1y2);
            var pRise = this.getLineLength(fromX, fromY, ix, iy);
            var pRun = Math.sqrt(dist * dist - pRise * pRise);
            run = Math.sqrt(pRun * pRun / (1 + m * m));
            if (p2x2 < p1x2) run *= -1;
            rise = m * run;
            pt = {
                x: ix + run,
                y: iy + rise
            };
        }
        return pt;
    }
    getPointOnPath(distance) {
        var fullLen = this.getPathLength();
        var cumulativePathLength = 0;
        var p = null;
        if (distance < -0.00005 || distance - 0.00005 > fullLen) return null;
        var { dataArray  } = this;
        for (var command of dataArray){
            if (command && (command.pathLength < 0.00005 || cumulativePathLength + command.pathLength + 0.00005 < distance)) {
                cumulativePathLength += command.pathLength;
                continue;
            }
            var delta = distance - cumulativePathLength;
            var currentT = 0;
            switch(command.type){
                case PathParser.LINE_TO:
                    p = this.getPointOnLine(delta, command.start.x, command.start.y, command.points[0], command.points[1], command.start.x, command.start.y);
                    break;
                case PathParser.ARC:
                    var start = command.points[4]; // 4 = theta
                    var dTheta = command.points[5]; // 5 = dTheta
                    var end = command.points[4] + dTheta;
                    currentT = start + delta / command.pathLength * dTheta;
                    if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) break;
                    p = this.getPointOnEllipticalArc(command.points[0], command.points[1], command.points[2], command.points[3], currentT, command.points[6]);
                    break;
                case PathParser.CURVE_TO:
                    currentT = delta / command.pathLength;
                    if (currentT > 1) currentT = 1;
                    p = this.getPointOnCubicBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3], command.points[4], command.points[5]);
                    break;
                case PathParser.QUAD_TO:
                    currentT = delta / command.pathLength;
                    if (currentT > 1) currentT = 1;
                    p = this.getPointOnQuadraticBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3]);
                    break;
            }
            if (p) return p;
            break;
        }
        return null;
    }
    getLineLength(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    getPathLength() {
        if (this.pathLength === -1) this.pathLength = this.dataArray.reduce((length, command)=>command.pathLength > 0 ? length + command.pathLength : length
        , 0);
        return this.pathLength;
    }
    getPointOnCubicBezier(pct, p1x3, p1y3, p2x3, p2y3, p3x1, p3y1, p4x, p4y) {
        var x = p4x * CB1(pct) + p3x1 * CB2(pct) + p2x3 * CB3(pct) + p1x3 * CB4(pct);
        var y = p4y * CB1(pct) + p3y1 * CB2(pct) + p2y3 * CB3(pct) + p1y3 * CB4(pct);
        return {
            x,
            y
        };
    }
    getPointOnQuadraticBezier(pct1, p1x4, p1y4, p2x4, p2y4, p3x2, p3y2) {
        var x = p3x2 * QB1(pct1) + p2x4 * QB2(pct1) + p1x4 * QB3(pct1);
        var y = p3y2 * QB1(pct1) + p2y4 * QB2(pct1) + p1y4 * QB3(pct1);
        return {
            x,
            y
        };
    }
    getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
        var cosPsi = Math.cos(psi);
        var sinPsi = Math.sin(psi);
        var pt = {
            x: rx * Math.cos(theta),
            y: ry * Math.sin(theta)
        };
        return {
            x: cx + (pt.x * cosPsi - pt.y * sinPsi),
            y: cy + (pt.x * sinPsi + pt.y * cosPsi)
        };
    }
    buildEquidistantCache(inputStep, inputPrecision) {
        var fullLen = this.getPathLength();
        var precision = inputPrecision || 0.25; // accuracy vs performance
        var step = inputStep || fullLen / 100;
        if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
            // Prepare cache
            this.equidistantCache = {
                step,
                precision,
                points: []
            }; // Calculate points
            var s = 0;
            for(var l = 0; l <= fullLen; l += precision){
                var p0 = this.getPointOnPath(l);
                var p1 = this.getPointOnPath(l + precision);
                if (!p0 || !p1) continue;
                s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);
                if (s >= step) {
                    this.equidistantCache.points.push({
                        x: p0.x,
                        y: p0.y,
                        distance: l
                    });
                    s -= step;
                }
            }
        }
    }
    getEquidistantPointOnPath(targetDistance, step, precision) {
        this.buildEquidistantCache(step, precision);
        if (targetDistance < 0 || targetDistance - this.getPathLength() > 0.00005) return null;
        var idx = Math.round(targetDistance / this.getPathLength() * (this.equidistantCache.points.length - 1));
        return this.equidistantCache.points[idx] || null;
    }
}
var dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
class ImageElement extends RenderedElement {
    constructor(document25, node18, captureTextNodes15){
        super(document25, node18, captureTextNodes15);
        this.type = 'image';
        this.loaded = false;
        var href = this.getHrefAttribute().getString();
        if (!href) return;
        var isSvg = href.endsWith('.svg') || /^\s*data:image\/svg\+xml/i.test(href);
        document25.images.push(this);
        if (!isSvg) this.loadImage(href);
        else this.loadSvg(href);
        this.isSvg = isSvg;
    }
    loadImage(href) {
        var _this = this;
        return _asyncToGeneratorDefault.default(function*() {
            try {
                var image = yield _this.document.createImage(href);
                _this.image = image;
            } catch (err) {
                console.error("Error while loading image \"".concat(href, "\":"), err);
            }
            _this.loaded = true;
        })();
    }
    loadSvg(href1) {
        var _this2 = this;
        return _asyncToGeneratorDefault.default(function*() {
            var match = dataUriRegex.exec(href1);
            if (match) {
                var data = match[5];
                if (match[4] === 'base64') _this2.image = atob(data);
                else _this2.image = decodeURIComponent(data);
            } else try {
                var response = yield _this2.document.fetch(href1);
                var svg = yield response.text();
                _this2.image = svg;
            } catch (err) {
                console.error("Error while loading image \"".concat(href1, "\":"), err);
            }
            _this2.loaded = true;
        })();
    }
    renderChildren(ctx63) {
        var { document , image , loaded  } = this;
        var x = this.getAttribute('x').getPixels('x');
        var y = this.getAttribute('y').getPixels('y');
        var width = this.getStyle('width').getPixels('x');
        var height = this.getStyle('height').getPixels('y');
        if (!loaded || !image || !width || !height) return;
        ctx63.save();
        ctx63.translate(x, y);
        if (this.isSvg) {
            var subDocument = document.canvg.forkString(ctx63, this.image, {
                ignoreMouse: true,
                ignoreAnimation: true,
                ignoreDimensions: true,
                ignoreClear: true,
                offsetX: 0,
                offsetY: 0,
                scaleWidth: width,
                scaleHeight: height
            });
            subDocument.document.documentElement.parent = this;
            subDocument.render();
        } else {
            var _image = this.image;
            document.setViewBox({
                ctx: ctx63,
                aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
                width,
                desiredWidth: _image.width,
                height,
                desiredHeight: _image.height
            });
            if (this.loaded) {
                if (typeof _image.complete === 'undefined' || _image.complete) ctx63.drawImage(_image, 0, 0);
            }
        }
        ctx63.restore();
    }
    getBoundingBox() {
        var x = this.getAttribute('x').getPixels('x');
        var y = this.getAttribute('y').getPixels('y');
        var width = this.getStyle('width').getPixels('x');
        var height = this.getStyle('height').getPixels('y');
        return new BoundingBox(x, y, x + width, y + height);
    }
}
class SymbolElement extends RenderedElement {
    constructor(){
        super(...arguments);
        this.type = 'symbol';
    }
    render(_8) {
    }
}
class SVGFontLoader {
    constructor(document26){
        this.document = document26;
        this.loaded = false;
        document26.fonts.push(this);
    }
    load(fontFamily1, url1) {
        var _this = this;
        return _asyncToGeneratorDefault.default(function*() {
            try {
                var { document  } = _this;
                var svgDocument = yield document.canvg.parser.load(url1);
                var fonts = svgDocument.getElementsByTagName('font');
                Array.from(fonts).forEach((fontNode)=>{
                    var font = document.createElement(fontNode);
                    document.definitions[fontFamily1] = font;
                });
            } catch (err) {
                console.error("Error while loading font \"".concat(url1, "\":"), err);
            }
            _this.loaded = true;
        })();
    }
}
class StyleElement extends Element {
    constructor(document31, node19, captureTextNodes16){
        super(document31, node19, captureTextNodes16);
        this.type = 'style';
        var css = compressSpaces(Array.from(node19.childNodes) // NEED TEST
        .map((_)=>_.textContent
        ).join('').replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, '') // remove comments
        .replace(/@import.*;/g, '') // remove imports
        );
        var cssDefs = css.split('}');
        cssDefs.forEach((_9)=>{
            var def = _9.trim();
            if (!def) return;
            var cssParts = def.split('{');
            var cssClasses = cssParts[0].split(',');
            var cssProps = cssParts[1].split(';');
            cssClasses.forEach((_)=>{
                var cssClass = _.trim();
                if (!cssClass) return;
                var props = document31.styles[cssClass] || {
                };
                cssProps.forEach((cssProp)=>{
                    var prop = cssProp.indexOf(':');
                    var name = cssProp.substr(0, prop).trim();
                    var value = cssProp.substr(prop + 1, cssProp.length - prop).trim();
                    if (name && value) props[name] = new Property(document31, name, value);
                });
                document31.styles[cssClass] = props;
                document31.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
                if (cssClass === '@font-face') {
                    //  && !nodeEnv
                    var fontFamily = props['font-family'].getString().replace(/"|'/g, '');
                    var srcs = props.src.getString().split(',');
                    srcs.forEach((src)=>{
                        if (src.indexOf('format("svg")') > 0) {
                            var url = parseExternalUrl(src);
                            if (url) new SVGFontLoader(document31).load(fontFamily, url);
                        }
                    });
                }
            });
        });
    }
}
StyleElement.parseExternalUrl = parseExternalUrl;
class UseElement extends RenderedElement {
    constructor(){
        super(...arguments);
        this.type = 'use';
    }
    setContext(ctx64) {
        super.setContext(ctx64);
        var xAttr = this.getAttribute('x');
        var yAttr = this.getAttribute('y');
        if (xAttr.hasValue()) ctx64.translate(xAttr.getPixels('x'), 0);
        if (yAttr.hasValue()) ctx64.translate(0, yAttr.getPixels('y'));
    }
    path(ctx65) {
        var { element  } = this;
        if (element) element.path(ctx65);
    }
    renderChildren(ctx66) {
        var { document , element  } = this;
        if (element) {
            var tempSvg = element;
            if (element.type === 'symbol') {
                // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
                tempSvg = new SVGElement(document, null);
                tempSvg.attributes.viewBox = new Property(document, 'viewBox', element.getAttribute('viewBox').getString());
                tempSvg.attributes.preserveAspectRatio = new Property(document, 'preserveAspectRatio', element.getAttribute('preserveAspectRatio').getString());
                tempSvg.attributes.overflow = new Property(document, 'overflow', element.getAttribute('overflow').getString());
                tempSvg.children = element.children; // element is still the parent of the children
                element.styles.opacity = new Property(document, 'opacity', this.calculateOpacity());
            }
            if (tempSvg.type === 'svg') {
                var widthStyle = this.getStyle('width', false, true);
                var heightStyle = this.getStyle('height', false, true); // if symbol or svg, inherit width/height from me
                if (widthStyle.hasValue()) tempSvg.attributes.width = new Property(document, 'width', widthStyle.getString());
                if (heightStyle.hasValue()) tempSvg.attributes.height = new Property(document, 'height', heightStyle.getString());
            }
            var oldParent = tempSvg.parent;
            tempSvg.parent = this;
            tempSvg.render(ctx66);
            tempSvg.parent = oldParent;
        }
    }
    getBoundingBox(ctx67) {
        var { element  } = this;
        if (element) return element.getBoundingBox(ctx67);
        return null;
    }
    elementTransform() {
        var { document , element  } = this;
        return Transform.fromElement(document, element);
    }
    get element() {
        if (!this.cachedElement) this.cachedElement = this.getHrefAttribute().getDefinition();
        return this.cachedElement;
    }
}
function imGet(img, x, y, width, _height, rgba) {
    return img[y * width * 4 + x * 4 + rgba];
}
function imSet(img, x, y, width, _height, rgba, val) {
    img[y * width * 4 + x * 4 + rgba] = val;
}
function m(matrix, i, v) {
    var mi = matrix[i];
    return mi * v;
}
function c(a, m1, m2, m3) {
    return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
}
class FeColorMatrixElement extends Element {
    constructor(document28, node20, captureTextNodes17){
        super(document28, node20, captureTextNodes17);
        this.type = 'feColorMatrix';
        var matrix = toNumbers(this.getAttribute('values').getString());
        switch(this.getAttribute('type').getString('matrix')){
            // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
            case 'saturate':
                var s = matrix[0];
                /* eslint-disable array-element-newline */ matrix = [
                    0.213 + 0.787 * s,
                    0.715 - 0.715 * s,
                    0.072 - 0.072 * s,
                    0,
                    0,
                    0.213 - 0.213 * s,
                    0.715 + 0.285 * s,
                    0.072 - 0.072 * s,
                    0,
                    0,
                    0.213 - 0.213 * s,
                    0.715 - 0.715 * s,
                    0.072 + 0.928 * s,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1
                ];
                break;
            case 'hueRotate':
                var a = matrix[0] * Math.PI / 180;
                /* eslint-disable array-element-newline */ matrix = [
                    c(a, 0.213, 0.787, -0.213),
                    c(a, 0.715, -0.715, -0.715),
                    c(a, 0.072, -0.072, 0.928),
                    0,
                    0,
                    c(a, 0.213, -0.213, 0.143),
                    c(a, 0.715, 0.285, 0.14),
                    c(a, 0.072, -0.072, -0.283),
                    0,
                    0,
                    c(a, 0.213, -0.213, -0.787),
                    c(a, 0.715, -0.715, 0.715),
                    c(a, 0.072, 0.928, 0.072),
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1
                ];
                break;
            case 'luminanceToAlpha':
                /* eslint-disable array-element-newline */ matrix = [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.2125,
                    0.7154,
                    0.0721,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1
                ];
                break;
        }
        this.matrix = matrix;
        this.includeOpacity = this.getAttribute('includeOpacity').hasValue();
    }
    apply(ctx68, _x, _y, width3, height1) {
        // assuming x==0 && y==0 for now
        var { includeOpacity , matrix  } = this;
        var srcData = ctx68.getImageData(0, 0, width3, height1);
        for(var y = 0; y < height1; y++)for(var x = 0; x < width3; x++){
            var r = imGet(srcData.data, x, y, width3, height1, 0);
            var g = imGet(srcData.data, x, y, width3, height1, 1);
            var b = imGet(srcData.data, x, y, width3, height1, 2);
            var a = imGet(srcData.data, x, y, width3, height1, 3);
            var nr = m(matrix, 0, r) + m(matrix, 1, g) + m(matrix, 2, b) + m(matrix, 3, a) + m(matrix, 4, 1);
            var ng = m(matrix, 5, r) + m(matrix, 6, g) + m(matrix, 7, b) + m(matrix, 8, a) + m(matrix, 9, 1);
            var nb = m(matrix, 10, r) + m(matrix, 11, g) + m(matrix, 12, b) + m(matrix, 13, a) + m(matrix, 14, 1);
            var na = m(matrix, 15, r) + m(matrix, 16, g) + m(matrix, 17, b) + m(matrix, 18, a) + m(matrix, 19, 1);
            if (includeOpacity) {
                nr = 0;
                ng = 0;
                nb = 0;
                na *= a / 255;
            }
            imSet(srcData.data, x, y, width3, height1, 0, nr);
            imSet(srcData.data, x, y, width3, height1, 1, ng);
            imSet(srcData.data, x, y, width3, height1, 2, nb);
            imSet(srcData.data, x, y, width3, height1, 3, na);
        }
        ctx68.clearRect(0, 0, width3, height1);
        ctx68.putImageData(srcData, 0, 0);
    }
}
class MaskElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'mask';
    }
    apply(ctx69, element11) {
        var { document  } = this; // render as temp svg
        var x = this.getAttribute('x').getPixels('x');
        var y = this.getAttribute('y').getPixels('y');
        var width = this.getStyle('width').getPixels('x');
        var height = this.getStyle('height').getPixels('y');
        if (!width && !height) {
            var boundingBox = new BoundingBox();
            this.children.forEach((child)=>{
                boundingBox.addBoundingBox(child.getBoundingBox(ctx69));
            });
            x = Math.floor(boundingBox.x1);
            y = Math.floor(boundingBox.y1);
            width = Math.floor(boundingBox.width);
            height = Math.floor(boundingBox.height);
        }
        var ignoredStyles = this.removeStyles(element11, MaskElement.ignoreStyles);
        var maskCanvas = document.createCanvas(x + width, y + height);
        var maskCtx = maskCanvas.getContext('2d');
        document.screen.setDefaults(maskCtx);
        this.renderChildren(maskCtx); // convert mask to alpha with a fake node
        // TODO: refactor out apply from feColorMatrix
        new FeColorMatrixElement(document, {
            nodeType: 1,
            childNodes: [],
            attributes: [
                {
                    nodeName: 'type',
                    value: 'luminanceToAlpha'
                },
                {
                    nodeName: 'includeOpacity',
                    value: 'true'
                }
            ]
        }).apply(maskCtx, 0, 0, x + width, y + height);
        var tmpCanvas = document.createCanvas(x + width, y + height);
        var tmpCtx = tmpCanvas.getContext('2d');
        document.screen.setDefaults(tmpCtx);
        element11.render(tmpCtx);
        tmpCtx.globalCompositeOperation = 'destination-in';
        tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, 'no-repeat');
        tmpCtx.fillRect(0, 0, x + width, y + height);
        ctx69.fillStyle = tmpCtx.createPattern(tmpCanvas, 'no-repeat');
        ctx69.fillRect(0, 0, x + width, y + height); // reassign mask
        this.restoreStyles(element11, ignoredStyles);
    }
    render(_15) {
    }
}
MaskElement.ignoreStyles = [
    'mask',
    'transform',
    'clip-path'
];
var noop = ()=>{
};
class ClipPathElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'clipPath';
    }
    apply(ctx70) {
        var { document  } = this;
        var contextProto = Reflect.getPrototypeOf(ctx70);
        var { beginPath , closePath  } = ctx70;
        if (contextProto) {
            contextProto.beginPath = noop;
            contextProto.closePath = noop;
        }
        Reflect.apply(beginPath, ctx70, []);
        this.children.forEach((child)=>{
            if (typeof child.path === 'undefined') return;
            var transform = typeof child.elementTransform !== 'undefined' ? child.elementTransform() : null; // handle <use />
            if (!transform) transform = Transform.fromElement(document, child);
            if (transform) transform.apply(ctx70);
            child.path(ctx70);
            if (contextProto) contextProto.closePath = closePath;
            if (transform) transform.unapply(ctx70);
        });
        Reflect.apply(closePath, ctx70, []);
        ctx70.clip();
        if (contextProto) {
            contextProto.beginPath = beginPath;
            contextProto.closePath = closePath;
        }
    }
    render(_10) {
    }
}
class FilterElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'filter';
    }
    apply(ctx71, element12) {
        // render as temp svg
        var { document , children  } = this;
        var boundingBox = element12.getBoundingBox(ctx71);
        if (!boundingBox) return;
        var px = 0;
        var py = 0;
        children.forEach((child)=>{
            var efd = child.extraFilterDistance || 0;
            px = Math.max(px, efd);
            py = Math.max(py, efd);
        });
        var width = Math.floor(boundingBox.width);
        var height = Math.floor(boundingBox.height);
        var tmpCanvasWidth = width + 2 * px;
        var tmpCanvasHeight = height + 2 * py;
        if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) return;
        var x = Math.floor(boundingBox.x);
        var y = Math.floor(boundingBox.y);
        var ignoredStyles = this.removeStyles(element12, FilterElement.ignoreStyles);
        var tmpCanvas = document.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
        var tmpCtx = tmpCanvas.getContext('2d');
        document.screen.setDefaults(tmpCtx);
        tmpCtx.translate(-x + px, -y + py);
        element12.render(tmpCtx); // apply filters
        children.forEach((child)=>{
            if (typeof child.apply === 'function') child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
        }); // render on me
        ctx71.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y - py, tmpCanvasWidth, tmpCanvasHeight);
        this.restoreStyles(element12, ignoredStyles);
    }
    render(_11) {
    }
}
FilterElement.ignoreStyles = [
    'filter',
    'transform',
    'clip-path'
];
class FeDropShadowElement extends Element {
    constructor(document29, node21, captureTextNodes18){
        super(document29, node21, captureTextNodes18);
        this.type = 'feDropShadow';
        this.addStylesFromStyleDefinition();
    }
    apply(_12, _x1, _y1, _width, _height) {
    }
}
class FeMorphologyElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'feMorphology';
    }
    apply(_13, _x2, _y2, _width1, _height1) {
    }
}
class FeCompositeElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'feComposite';
    }
    apply(_14, _x3, _y3, _width2, _height2) {
    }
}
class FeGaussianBlurElement extends Element {
    constructor(document30, node22, captureTextNodes19){
        super(document30, node22, captureTextNodes19);
        this.type = 'feGaussianBlur';
        this.blurRadius = Math.floor(this.getAttribute('stdDeviation').getNumber());
        this.extraFilterDistance = this.blurRadius;
    }
    apply(ctx72, x6, y6, width4, height2) {
        var { document , blurRadius  } = this;
        var body = document.window ? document.window.document.body : null;
        var canvas = ctx72.canvas; // StackBlur requires canvas be on document
        canvas.id = document.getUniqueId();
        if (body) {
            canvas.style.display = 'none';
            body.appendChild(canvas);
        }
        _stackblurCanvas.canvasRGBA(canvas, x6, y6, width4, height2, blurRadius);
        if (body) body.removeChild(canvas);
    }
}
class TitleElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'title';
    }
}
class DescElement extends Element {
    constructor(){
        super(...arguments);
        this.type = 'desc';
    }
}
var elements = {
    'svg': SVGElement,
    'rect': RectElement,
    'circle': CircleElement,
    'ellipse': EllipseElement,
    'line': LineElement,
    'polyline': PolylineElement,
    'polygon': PolygonElement,
    'path': PathElement,
    'pattern': PatternElement,
    'marker': MarkerElement,
    'defs': DefsElement,
    'linearGradient': LinearGradientElement,
    'radialGradient': RadialGradientElement,
    'stop': StopElement,
    'animate': AnimateElement,
    'animateColor': AnimateColorElement,
    'animateTransform': AnimateTransformElement,
    'font': FontElement,
    'font-face': FontFaceElement,
    'missing-glyph': MissingGlyphElement,
    'glyph': GlyphElement,
    'text': TextElement,
    'tspan': TSpanElement,
    'tref': TRefElement,
    'a': AElement,
    'textPath': TextPathElement,
    'image': ImageElement,
    'g': GElement,
    'symbol': SymbolElement,
    'style': StyleElement,
    'use': UseElement,
    'mask': MaskElement,
    'clipPath': ClipPathElement,
    'filter': FilterElement,
    'feDropShadow': FeDropShadowElement,
    'feMorphology': FeMorphologyElement,
    'feComposite': FeCompositeElement,
    'feColorMatrix': FeColorMatrixElement,
    'feGaussianBlur': FeGaussianBlurElement,
    'title': TitleElement,
    'desc': DescElement
};
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) ownKeys$1(Object(source), true).forEach(function(key) {
            _definePropertyDefault.default(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
function createImage(_x) {
    return _createImage.apply(this, arguments);
}
function _createImage() {
    _createImage = _asyncToGeneratorDefault.default(function*(src) {
        var anonymousCrossOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var image = document.createElement('img');
        if (anonymousCrossOrigin) image.crossOrigin = 'Anonymous';
        return new Promise((resolve, reject)=>{
            image.onload = ()=>{
                resolve(image);
            };
            image.onerror = (_event, _source, _lineno, _colno, error)=>{
                reject(error);
            };
            image.src = src;
        });
    });
    return _createImage.apply(this, arguments);
}
class Document {
    constructor(canvg){
        var { rootEmSize =12 , emSize =12 , createCanvas =Document.createCanvas , createImage =Document.createImage , anonymousCrossOrigin  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        };
        this.canvg = canvg;
        this.definitions = {
        };
        this.styles = {
        };
        this.stylesSpecificity = {
        };
        this.images = [];
        this.fonts = [];
        this.emSizeStack = [];
        this.uniqueId = 0;
        this.screen = canvg.screen;
        this.rootEmSize = rootEmSize;
        this.emSize = emSize;
        this.createCanvas = createCanvas;
        this.createImage = this.bindCreateImage(createImage, anonymousCrossOrigin);
        this.screen.wait(this.isImagesLoaded.bind(this));
        this.screen.wait(this.isFontsLoaded.bind(this));
    }
    bindCreateImage(createImage1, anonymousCrossOrigin) {
        if (typeof anonymousCrossOrigin === 'boolean') return (source, forceAnonymousCrossOrigin)=>createImage1(source, typeof forceAnonymousCrossOrigin === 'boolean' ? forceAnonymousCrossOrigin : anonymousCrossOrigin)
        ;
        return createImage1;
    }
    get window() {
        return this.screen.window;
    }
    get fetch() {
        return this.screen.fetch;
    }
    get ctx() {
        return this.screen.ctx;
    }
    get emSize() {
        var { emSizeStack  } = this;
        return emSizeStack[emSizeStack.length - 1];
    }
    set emSize(value) {
        var { emSizeStack  } = this;
        emSizeStack.push(value);
    }
    popEmSize() {
        var { emSizeStack  } = this;
        emSizeStack.pop();
    }
    getUniqueId() {
        return "canvg".concat(++this.uniqueId);
    }
    isImagesLoaded() {
        return this.images.every((_)=>_.loaded
        );
    }
    isFontsLoaded() {
        return this.fonts.every((_)=>_.loaded
        );
    }
    createDocumentElement(document) {
        var documentElement = this.createElement(document.documentElement);
        documentElement.root = true;
        documentElement.addStylesFromStyleDefinition();
        this.documentElement = documentElement;
        return documentElement;
    }
    createElement(node23) {
        var elementType = node23.nodeName.replace(/^[^:]+:/, '');
        var ElementType = Document.elementTypes[elementType];
        if (typeof ElementType !== 'undefined') return new ElementType(this, node23);
        return new UnknownElement(this, node23);
    }
    createTextNode(node24) {
        return new TextNode(this, node24);
    }
    setViewBox(config) {
        this.screen.setViewBox(_objectSpread$1({
            document: this
        }, config));
    }
}
Document.createCanvas = createCanvas;
Document.createImage = createImage;
Document.elementTypes = elements;
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) ownKeys(Object(source), true).forEach(function(key) {
            _definePropertyDefault.default(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
/**
 * SVG renderer on canvas.
 */ class Canvg {
    /**
   * Main constructor.
   * @param ctx - Rendering context.
   * @param svg - SVG Document.
   * @param options - Rendering options.
   */ constructor(ctx73, svg){
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        };
        this.parser = new Parser(options);
        this.screen = new Screen(ctx73, options);
        this.options = options;
        var document = new Document(this, options);
        var documentElement = document.createDocumentElement(svg);
        this.document = document;
        this.documentElement = documentElement;
    }
    /**
   * Create Canvg instance from SVG source string or URL.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */ static from(ctx74, svg1) {
        var _arguments = arguments;
        return _asyncToGeneratorDefault.default(function*() {
            var options = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : {
            };
            var parser = new Parser(options);
            var svgDocument = yield parser.parse(svg1);
            return new Canvg(ctx74, svgDocument, options);
        })();
    }
    /**
   * Create Canvg instance from SVG source string.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */ static fromString(ctx75, svg2) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        };
        var parser = new Parser(options);
        var svgDocument = parser.parseFromString(svg2);
        return new Canvg(ctx75, svgDocument, options);
    }
    /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */ fork(ctx76, svg3) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        };
        return Canvg.from(ctx76, svg3, _objectSpread(_objectSpread({
        }, this.options), options));
    }
    /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */ forkString(ctx77, svg4) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        };
        return Canvg.fromString(ctx77, svg4, _objectSpread(_objectSpread({
        }, this.options), options));
    }
    /**
   * Document is ready promise.
   * @returns Ready promise.
   */ ready() {
        return this.screen.ready();
    }
    /**
   * Document is ready value.
   * @returns Is ready or not.
   */ isReady() {
        return this.screen.isReady();
    }
    /**
   * Render only first frame, ignoring animations and mouse.
   * @param options - Rendering options.
   */ render() {
        var _arguments2 = arguments, _this = this;
        return _asyncToGeneratorDefault.default(function*() {
            var options = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {
            };
            _this.start(_objectSpread({
                enableRedraw: true,
                ignoreAnimation: true,
                ignoreMouse: true
            }, options));
            yield _this.ready();
            _this.stop();
        })();
    }
    /**
   * Start rendering.
   * @param options - Render options.
   */ start() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        };
        var { documentElement , screen , options: baseOptions  } = this;
        screen.start(documentElement, _objectSpread(_objectSpread({
            enableRedraw: true
        }, baseOptions), options));
    }
    /**
   * Stop rendering.
   */ stop() {
        this.screen.stop();
    }
    /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */ resize(width) {
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
        var preserveAspectRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.documentElement.resize(width, height, preserveAspectRatio);
    }
}
exports.default = Canvg;

},{"process":"lDnB8","core-js/modules/es.promise.js":"8nMUv","@babel/runtime/helpers/asyncToGenerator":"iGxSP","core-js/modules/es.string.match.js":"d8k57","core-js/modules/es.string.replace.js":"bbUl2","core-js/modules/es.string.starts-with.js":"eH6fZ","core-js/modules/es.array.iterator.js":"bLuDU","core-js/modules/web.dom-collections.iterator.js":"cNl8W","@babel/runtime/helpers/defineProperty":"ls4GC","core-js/modules/es.array.reduce.js":"8W8UG","core-js/modules/es.string.ends-with.js":"jWSjD","core-js/modules/es.string.split.js":"eWFDr","raf":"6TZOP","core-js/modules/es.string.trim.js":"iHEeA","rgbcolor":"caWwF","core-js/modules/es.string.includes.js":"CsNki","core-js/modules/es.array.index-of.js":"fclII","core-js/modules/es.array.reverse.js":"9QaOG","svg-pathdata":"T91it","core-js/modules/es.regexp.to-string.js":"dhZg0","stackblur-canvas":"7ZRL1","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8nMUv":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var NativePromise = require('../internals/native-promise-constructor');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var aCallable = require('../internals/a-callable');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var inspectSource = require('../internals/inspect-source');
var iterate = require('../internals/iterate');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var promiseResolve = require('../internals/promise-resolve');
var hostReportErrors = require('../internals/host-report-errors');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var InternalStateModule = require('../internals/internal-state');
var isForced = require('../internals/is-forced');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_BROWSER = require('../internals/engine-is-browser');
var IS_NODE = require('../internals/engine-is-node');
var V8_VERSION = require('../internals/engine-v8-version');
var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function() {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We need Promise#finally in the pure version for preventing prototype pollution
    if (IS_PURE && !PromisePrototype['finally']) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function(resolve) {
        resolve(1);
    });
    var FakePromise = function(exec) {
        exec(function() {
        }, function() {
        });
    };
    var constructor = promise.constructor = {
    };
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function() {
    }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function(iterable) {
    PromiseConstructor.all(iterable)['catch'](function() {
    });
});
// helpers
var isThenable = function(it) {
    var then;
    return isObject(it) && isCallable(then = it.then) ? then : false;
};
var notify = function(state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function() {
        var value = state.value;
        var ok = state.state == FULFILLED;
        var index = 0;
        // variable length - can't use forEach
        while(chain.length > index){
            var reaction = chain[index++];
            var handler = ok ? reaction.ok : reaction.fail;
            var resolve = reaction.resolve;
            var reject = reaction.reject;
            var domain = reaction.domain;
            var result, then, exited;
            try {
                if (handler) {
                    if (!ok) {
                        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                        state.rejection = HANDLED;
                    }
                    if (handler === true) result = value;
                    else {
                        if (domain) domain.enter();
                        result = handler(value); // can throw
                        if (domain) {
                            domain.exit();
                            exited = true;
                        }
                    }
                    if (result === reaction.promise) reject(TypeError('Promise-chain cycle'));
                    else if (then = isThenable(result)) call(then, result, resolve, reject);
                    else resolve(result);
                } else reject(value);
            } catch (error) {
                if (domain && !exited) domain.exit();
                reject(error);
            }
        }
        state.reactions = [];
        state.notified = false;
        if (isReject && !state.rejection) onUnhandled(state);
    });
};
var dispatchEvent = function(name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
        event = document.createEvent('Event');
        event.promise = promise;
        event.reason = reason;
        event.initEvent(name, false, true);
        global.dispatchEvent(event);
    } else event = {
        promise: promise,
        reason: reason
    };
    if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};
var onUnhandled = function(state) {
    call(task, global, function() {
        var promise = state.facade;
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
            result = perform(function() {
                if (IS_NODE) process.emit('unhandledRejection', value, promise);
                else dispatchEvent(UNHANDLED_REJECTION, promise, value);
            });
            // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
            state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
            if (result.error) throw result.value;
        }
    });
};
var isUnhandled = function(state) {
    return state.rejection !== HANDLED && !state.parent;
};
var onHandleUnhandled = function(state) {
    call(task, global, function() {
        var promise = state.facade;
        if (IS_NODE) process.emit('rejectionHandled', promise);
        else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
};
var bind = function(fn, state, unwrap) {
    return function(value) {
        fn(state, value, unwrap);
    };
};
var internalReject = function(state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
};
var internalResolve = function(state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
        if (state.facade === value) throw TypeError("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) microtask(function() {
            var wrapper = {
                done: false
            };
            try {
                call(then, value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
            } catch (error) {
                internalReject(wrapper, error, state);
            }
        });
        else {
            state.value = value;
            state.state = FULFILLED;
            notify(state, false);
        }
    } catch (error) {
        internalReject({
            done: false
        }, error, state);
    }
};
// constructor polyfill
if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
        anInstance(this, PromisePrototype);
        aCallable(executor);
        call(Internal, this);
        var state = getInternalState(this);
        try {
            executor(bind(internalResolve, state), bind(internalReject, state));
        } catch (error) {
            internalReject(state, error);
        }
    };
    PromisePrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
        setInternalState(this, {
            type: PROMISE,
            done: false,
            notified: false,
            parent: false,
            reactions: [],
            rejection: false,
            state: PENDING,
            value: undefined
        });
    };
    Internal.prototype = redefineAll(PromisePrototype, {
        // `Promise.prototype.then` method
        // https://tc39.es/ecma262/#sec-promise.prototype.then
        then: function then(onFulfilled, onRejected) {
            var state = getInternalPromiseState(this);
            var reactions = state.reactions;
            var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
            reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
            reaction.fail = isCallable(onRejected) && onRejected;
            reaction.domain = IS_NODE ? process.domain : undefined;
            state.parent = true;
            reactions[reactions.length] = reaction;
            if (state.state != PENDING) notify(state, false);
            return reaction.promise;
        },
        // `Promise.prototype.catch` method
        // https://tc39.es/ecma262/#sec-promise.prototype.catch
        'catch': function(onRejected) {
            return this.then(undefined, onRejected);
        }
    });
    OwnPromiseCapability = function() {
        var promise = new Internal();
        var state = getInternalState(promise);
        this.promise = promise;
        this.resolve = bind(internalResolve, state);
        this.reject = bind(internalReject, state);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
        return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };
    if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
        nativeThen = NativePromisePrototype.then;
        if (!SUBCLASSING) {
            // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
            redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
                var that = this;
                return new PromiseConstructor(function(resolve, reject) {
                    call(nativeThen, that, resolve, reject);
                }).then(onFulfilled, onRejected);
            // https://github.com/zloirock/core-js/issues/640
            }, {
                unsafe: true
            });
            // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
            redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], {
                unsafe: true
            });
        }
        // make `.constructor === Promise` work for native promise-based APIs
        try {
            delete NativePromisePrototype.constructor;
        } catch (error) {
        }
        // make `instanceof Promise` work for native promise-based APIs
        if (setPrototypeOf) setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
}
$({
    global: true,
    wrap: true,
    forced: FORCED
}, {
    Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE);
// statics
$({
    target: PROMISE,
    stat: true,
    forced: FORCED
}, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
        var capability = newPromiseCapability(this);
        call(capability.reject, undefined, r);
        return capability.promise;
    }
});
$({
    target: PROMISE,
    stat: true,
    forced: IS_PURE || FORCED
}, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
        return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
    }
});
$({
    target: PROMISE,
    stat: true,
    forced: INCORRECT_ITERATION
}, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function() {
            var $promiseResolve = aCallable(C.resolve);
            var values = [];
            var counter = 0;
            var remaining = 1;
            iterate(iterable, function(promise) {
                var index = counter++;
                var alreadyCalled = false;
                remaining++;
                call($promiseResolve, C, promise).then(function(value) {
                    if (alreadyCalled) return;
                    alreadyCalled = true;
                    values[index] = value;
                    --remaining || resolve(values);
                }, reject);
            });
            --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function() {
            var $promiseResolve = aCallable(C.resolve);
            iterate(iterable, function(promise) {
                call($promiseResolve, C, promise).then(capability.resolve, reject);
            });
        });
        if (result.error) reject(result.value);
        return capability.promise;
    }
});

},{"../internals/export":"8yfGv","../internals/is-pure":"6Bbq0","../internals/global":"jxPDA","../internals/get-built-in":"78arb","../internals/function-call":"jhLed","../internals/native-promise-constructor":"1Z5Jd","../internals/redefine":"kxbj8","../internals/redefine-all":"ch5Rt","../internals/object-set-prototype-of":"lb6rR","../internals/set-to-string-tag":"9arwS","../internals/set-species":"hBKMQ","../internals/a-callable":"83opn","../internals/is-callable":"kPhuP","../internals/is-object":"dplrD","../internals/an-instance":"2zeQg","../internals/inspect-source":"7DOzX","../internals/iterate":"fTyka","../internals/check-correctness-of-iteration":"788V9","../internals/species-constructor":"hqPl9","../internals/task":"5TiiK","../internals/microtask":"hWCOJ","../internals/promise-resolve":"1RiLv","../internals/host-report-errors":"99n7W","../internals/new-promise-capability":"1jyVt","../internals/perform":"1r4qC","../internals/internal-state":"i6AaM","../internals/is-forced":"eTyNf","../internals/well-known-symbol":"5C8sm","../internals/engine-is-browser":"QRSRy","../internals/engine-is-node":"jwobg","../internals/engine-v8-version":"9gYOM"}],"8yfGv":[function(require,module,exports) {
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var setGlobal = require('../internals/set-global');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/ module.exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) target = global;
    else if (STATIC) target = global[TARGET] || setGlobal(TARGET, {
    });
    else target = (global[TARGET] || {
    }).prototype;
    if (target) for(key in source){
        sourceProperty = source[key];
        if (options.noTargetGet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || targetProperty && targetProperty.sham) createNonEnumerableProperty(sourceProperty, 'sham', true);
        // extend global
        redefine(target, key, sourceProperty, options);
    }
};

},{"../internals/global":"jxPDA","../internals/object-get-own-property-descriptor":"1gCBk","../internals/create-non-enumerable-property":"6Z1es","../internals/redefine":"kxbj8","../internals/set-global":"kehc7","../internals/copy-constructor-properties":"bCh2q","../internals/is-forced":"eTyNf"}],"jxPDA":[function(require,module,exports) {
var global = arguments[3];
var check = function(it) {
    return it && it.Math == Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
(function() {
    return this;
})() || Function('return this')();

},{}],"1gCBk":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
    }
    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/descriptors":"6ZLib","../internals/function-call":"jhLed","../internals/object-property-is-enumerable":"bz2pv","../internals/create-property-descriptor":"ermgb","../internals/to-indexed-object":"8ueFu","../internals/to-property-key":"bMDpS","../internals/has-own-property":"3ZdUC","../internals/ie8-dom-define":"8jKhl"}],"6ZLib":[function(require,module,exports) {
var fails = require('../internals/fails');
// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({
    }, 1, {
        get: function() {
            return 7;
        }
    })[1] != 7;
});

},{"../internals/fails":"8IfZQ"}],"8IfZQ":[function(require,module,exports) {
module.exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};

},{}],"jhLed":[function(require,module,exports) {
var call = Function.prototype.call;
module.exports = call.bind ? call.bind(call) : function() {
    return call.apply(call, arguments);
};

},{}],"bz2pv":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {
}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
    1: 2
}, 1);
// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"ermgb":[function(require,module,exports) {
module.exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

},{}],"8ueFu":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
module.exports = function(it) {
    return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"e5ccT","../internals/require-object-coercible":"3Qlyo"}],"e5ccT":[function(require,module,exports) {
var global = require('../internals/global');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');
var Object = global.Object;
var split = uncurryThis(''.split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
}) ? function(it) {
    return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;

},{"../internals/global":"jxPDA","../internals/function-uncurry-this":"jJnXC","../internals/fails":"8IfZQ","../internals/classof-raw":"A9m3U"}],"jJnXC":[function(require,module,exports) {
var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);
module.exports = bind ? function(fn) {
    return fn && callBind(call, fn);
} : function(fn) {
    return fn && function() {
        return call.apply(fn, arguments);
    };
};

},{}],"A9m3U":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toString = uncurryThis({
}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function(it) {
    return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this":"jJnXC"}],"3Qlyo":[function(require,module,exports) {
var global = require('../internals/global');
var TypeError = global.TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
};

},{"../internals/global":"jxPDA"}],"bMDpS":[function(require,module,exports) {
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');
// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function(argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
};

},{"../internals/to-primitive":"ilNgA","../internals/is-symbol":"imyt8"}],"ilNgA":[function(require,module,exports) {
var global = require('../internals/global');
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var getMethod = require('../internals/get-method');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');
var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
};

},{"../internals/global":"jxPDA","../internals/function-call":"jhLed","../internals/is-object":"dplrD","../internals/is-symbol":"imyt8","../internals/get-method":"hEJ6b","../internals/ordinary-to-primitive":"fsThT","../internals/well-known-symbol":"5C8sm"}],"dplrD":[function(require,module,exports) {
var isCallable = require('../internals/is-callable');
module.exports = function(it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/is-callable":"kPhuP"}],"kPhuP":[function(require,module,exports) {
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function(argument) {
    return typeof argument == 'function';
};

},{}],"imyt8":[function(require,module,exports) {
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == 'symbol';
} : function(it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};

},{"../internals/global":"jxPDA","../internals/get-built-in":"78arb","../internals/is-callable":"kPhuP","../internals/object-is-prototype-of":"fyf1A","../internals/use-symbol-as-uid":"b6wgs"}],"78arb":[function(require,module,exports) {
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var aFunction = function(argument) {
    return isCallable(argument) ? argument : undefined;
};
module.exports = function(namespace, method) {
    return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

},{"../internals/global":"jxPDA","../internals/is-callable":"kPhuP"}],"fyf1A":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
module.exports = uncurryThis({
}.isPrototypeOf);

},{"../internals/function-uncurry-this":"jJnXC"}],"b6wgs":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = require('../internals/native-symbol');
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"cBk0s"}],"cBk0s":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":"9gYOM","../internals/fails":"8IfZQ"}],"9gYOM":[function(require,module,exports) {
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}
module.exports = version;

},{"../internals/global":"jxPDA","../internals/engine-user-agent":"boFeV"}],"boFeV":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"78arb"}],"hEJ6b":[function(require,module,exports) {
var aCallable = require('../internals/a-callable');
// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function(V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
};

},{"../internals/a-callable":"83opn"}],"83opn":[function(require,module,exports) {
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var tryToString = require('../internals/try-to-string');
var TypeError = global.TypeError;
// `Assert: IsCallable(argument) is true`
module.exports = function(argument) {
    if (isCallable(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a function');
};

},{"../internals/global":"jxPDA","../internals/is-callable":"kPhuP","../internals/try-to-string":"1hxsu"}],"1hxsu":[function(require,module,exports) {
var global = require('../internals/global');
var String = global.String;
module.exports = function(argument) {
    try {
        return String(argument);
    } catch (error) {
        return 'Object';
    }
};

},{"../internals/global":"jxPDA"}],"fsThT":[function(require,module,exports) {
var global = require('../internals/global');
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var TypeError = global.TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function(input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    throw TypeError("Can't convert object to primitive value");
};

},{"../internals/global":"jxPDA","../internals/function-call":"jhLed","../internals/is-callable":"kPhuP","../internals/is-object":"dplrD"}],"5C8sm":[function(require,module,exports) {
var global = require('../internals/global');
var shared = require('../internals/shared');
var hasOwn = require('../internals/has-own-property');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function(name) {
    if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
        var description = 'Symbol.' + name;
        if (NATIVE_SYMBOL && hasOwn(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
        else if (USE_SYMBOL_AS_UID && symbolFor) WellKnownSymbolsStore[name] = symbolFor(description);
        else WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
    return WellKnownSymbolsStore[name];
};

},{"../internals/global":"jxPDA","../internals/shared":"7VLeP","../internals/has-own-property":"3ZdUC","../internals/uid":"eMBx9","../internals/native-symbol":"cBk0s","../internals/use-symbol-as-uid":"b6wgs"}],"7VLeP":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');
(module.exports = function(key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {
    });
})('versions', []).push({
    version: '3.19.1',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"6Bbq0","../internals/shared-store":"3QdEO"}],"6Bbq0":[function(require,module,exports) {
module.exports = false;

},{}],"3QdEO":[function(require,module,exports) {
var global = require('../internals/global');
var setGlobal = require('../internals/set-global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {
});
module.exports = store;

},{"../internals/global":"jxPDA","../internals/set-global":"kehc7"}],"kehc7":[function(require,module,exports) {
var global = require('../internals/global');
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function(key, value) {
    try {
        defineProperty(global, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        global[key] = value;
    }
    return value;
};

},{"../internals/global":"jxPDA"}],"3ZdUC":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');
var hasOwnProperty = uncurryThis({
}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":"jJnXC","../internals/to-object":"eEdae"}],"eEdae":[function(require,module,exports) {
var global = require('../internals/global');
var requireObjectCoercible = require('../internals/require-object-coercible');
var Object = global.Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function(argument) {
    return Object(requireObjectCoercible(argument));
};

},{"../internals/global":"jxPDA","../internals/require-object-coercible":"3Qlyo"}],"eMBx9":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1..toString);
module.exports = function(key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":"jJnXC"}],"8jKhl":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');
// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
        get: function() {
            return 7;
        }
    }).a != 7;
});

},{"../internals/descriptors":"6ZLib","../internals/fails":"8IfZQ","../internals/document-create-element":"jKd7d"}],"jKd7d":[function(require,module,exports) {
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function(it) {
    return EXISTS ? document.createElement(it) : {
    };
};

},{"../internals/global":"jxPDA","../internals/is-object":"dplrD"}],"6Z1es":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
module.exports = DESCRIPTORS ? function(object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};

},{"../internals/descriptors":"6ZLib","../internals/object-define-property":"bauTd","../internals/create-property-descriptor":"ermgb"}],"bauTd":[function(require,module,exports) {
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');
var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
};

},{"../internals/global":"jxPDA","../internals/descriptors":"6ZLib","../internals/ie8-dom-define":"8jKhl","../internals/an-object":"1LIz9","../internals/to-property-key":"bMDpS"}],"1LIz9":[function(require,module,exports) {
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var String = global.String;
var TypeError = global.TypeError;
// `Assert: Type(argument) is Object`
module.exports = function(argument) {
    if (isObject(argument)) return argument;
    throw TypeError(String(argument) + ' is not an object');
};

},{"../internals/global":"jxPDA","../internals/is-object":"dplrD"}],"kxbj8":[function(require,module,exports) {
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var setGlobal = require('../internals/set-global');
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');
var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function(O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable(value)) {
        if (String(name).slice(0, 7) === 'Symbol(') name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
        if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) createNonEnumerableProperty(value, 'name', name);
        state = enforceInternalState(value);
        if (!state.source) state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
    if (O === global) {
        if (simple) O[key] = value;
        else setGlobal(key, value);
        return;
    } else if (!unsafe) delete O[key];
    else if (!noTargetGet && O[key]) simple = true;
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
});

},{"../internals/global":"jxPDA","../internals/is-callable":"kPhuP","../internals/has-own-property":"3ZdUC","../internals/create-non-enumerable-property":"6Z1es","../internals/set-global":"kehc7","../internals/inspect-source":"7DOzX","../internals/internal-state":"i6AaM","../internals/function-name":"6v6mP"}],"7DOzX":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');
var functionToString = uncurryThis(Function.toString);
// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) store.inspectSource = function(it) {
    return functionToString(it);
};
module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":"jJnXC","../internals/is-callable":"kPhuP","../internals/shared-store":"3QdEO"}],"i6AaM":[function(require,module,exports) {
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var uncurryThis = require('../internals/function-uncurry-this');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function(it) {
    return has(it) ? get(it) : set(it, {
    });
};
var getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        return state;
    };
};
if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    var wmget = uncurryThis(store.get);
    var wmhas = uncurryThis(store.has);
    var wmset = uncurryThis(store.set);
    set = function(it, metadata) {
        if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        wmset(store, it, metadata);
        return metadata;
    };
    get = function(it) {
        return wmget(store, it) || {
        };
    };
    has = function(it) {
        return wmhas(store, it);
    };
} else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function(it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
    };
    get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {
        };
    };
    has = function(it) {
        return hasOwn(it, STATE);
    };
}
module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};

},{"../internals/native-weak-map":"3Q3X6","../internals/global":"jxPDA","../internals/function-uncurry-this":"jJnXC","../internals/is-object":"dplrD","../internals/create-non-enumerable-property":"6Z1es","../internals/has-own-property":"3ZdUC","../internals/shared-store":"3QdEO","../internals/shared-key":"oNjWG","../internals/hidden-keys":"lHxXS"}],"3Q3X6":[function(require,module,exports) {
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var inspectSource = require('../internals/inspect-source');
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":"jxPDA","../internals/is-callable":"kPhuP","../internals/inspect-source":"7DOzX"}],"oNjWG":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');
var keys = shared('keys');
module.exports = function(key) {
    return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"7VLeP","../internals/uid":"eMBx9"}],"lHxXS":[function(require,module,exports) {
module.exports = {
};

},{}],"6v6mP":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() {
}).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};

},{"../internals/descriptors":"6ZLib","../internals/has-own-property":"3ZdUC"}],"bCh2q":[function(require,module,exports) {
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
module.exports = function(target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
};

},{"../internals/has-own-property":"3ZdUC","../internals/own-keys":"e0KjM","../internals/object-get-own-property-descriptor":"1gCBk","../internals/object-define-property":"bauTd"}],"e0KjM":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');
var concat = uncurryThis([].concat);
// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"78arb","../internals/function-uncurry-this":"jJnXC","../internals/object-get-own-property-names":"evqXT","../internals/object-get-own-property-symbols":"dBB9V","../internals/an-object":"1LIz9"}],"evqXT":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"3Jr1l","../internals/enum-bug-keys":"a0vpC"}],"3Jr1l":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');
var push = uncurryThis([].push);
module.exports = function(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if (hasOwn(O, key = names[i++])) ~indexOf(result, key) || push(result, key);
    return result;
};

},{"../internals/function-uncurry-this":"jJnXC","../internals/has-own-property":"3ZdUC","../internals/to-indexed-object":"8ueFu","../internals/array-includes":"SXf52","../internals/hidden-keys":"lHxXS"}],"SXf52":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');
// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"8ueFu","../internals/to-absolute-index":"dDgEq","../internals/length-of-array-like":"afDy6"}],"dDgEq":[function(require,module,exports) {
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var max = Math.max;
var min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":"aqyxv"}],"aqyxv":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;
// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

},{}],"afDy6":[function(require,module,exports) {
var toLength = require('../internals/to-length');
// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function(obj) {
    return toLength(obj.length);
};

},{"../internals/to-length":"bMgmi"}],"bMgmi":[function(require,module,exports) {
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function(argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":"aqyxv"}],"a0vpC":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
];

},{}],"dBB9V":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"eTyNf":[function(require,module,exports) {
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
    return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {
};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

},{"../internals/fails":"8IfZQ","../internals/is-callable":"kPhuP"}],"1Z5Jd":[function(require,module,exports) {
var global = require('../internals/global');
module.exports = global.Promise;

},{"../internals/global":"jxPDA"}],"ch5Rt":[function(require,module,exports) {
var redefine = require('../internals/redefine');
module.exports = function(target, src, options) {
    for(var key in src)redefine(target, key, src[key], options);
    return target;
};

},{"../internals/redefine":"kxbj8"}],"lb6rR":[function(require,module,exports) {
/* eslint-disable no-proto -- safe */ var uncurryThis = require('../internals/function-uncurry-this');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');
// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {
} ? (function() {
    var CORRECT_SETTER = false;
    var test = {
    };
    var setter;
    try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
        setter(test, []);
        CORRECT_SETTER = test instanceof Array;
    } catch (error) {
    }
    return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter(O, proto);
        else O.__proto__ = proto;
        return O;
    };
})() : undefined);

},{"../internals/function-uncurry-this":"jJnXC","../internals/an-object":"1LIz9","../internals/a-possible-prototype":"fVs6e"}],"fVs6e":[function(require,module,exports) {
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var String = global.String;
var TypeError = global.TypeError;
module.exports = function(argument) {
    if (typeof argument == 'object' || isCallable(argument)) return argument;
    throw TypeError("Can't set " + String(argument) + ' as a prototype');
};

},{"../internals/global":"jxPDA","../internals/is-callable":"kPhuP"}],"9arwS":[function(require,module,exports) {
var defineProperty = require('../internals/object-define-property').f;
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
module.exports = function(it, TAG, STATIC) {
    if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) defineProperty(it, TO_STRING_TAG, {
        configurable: true,
        value: TAG
    });
};

},{"../internals/object-define-property":"bauTd","../internals/has-own-property":"3ZdUC","../internals/well-known-symbol":"5C8sm"}],"hBKMQ":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');
var SPECIES = wellKnownSymbol('species');
module.exports = function(CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;
    if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function() {
            return this;
        }
    });
};

},{"../internals/get-built-in":"78arb","../internals/object-define-property":"bauTd","../internals/well-known-symbol":"5C8sm","../internals/descriptors":"6ZLib"}],"2zeQg":[function(require,module,exports) {
var global = require('../internals/global');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var TypeError = global.TypeError;
module.exports = function(it, Prototype) {
    if (isPrototypeOf(Prototype, it)) return it;
    throw TypeError('Incorrect invocation');
};

},{"../internals/global":"jxPDA","../internals/object-is-prototype-of":"fyf1A"}],"fTyka":[function(require,module,exports) {
var global = require('../internals/global');
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var iteratorClose = require('../internals/iterator-close');
var TypeError = global.TypeError;
var Result = function(stopped, result) {
    this.stopped = stopped;
    this.result = result;
};
var ResultPrototype = Result.prototype;
module.exports = function(iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;
    var stop = function(condition) {
        if (iterator) iteratorClose(iterator, 'normal', condition);
        return new Result(true, condition);
    };
    var callFn = function(value) {
        if (AS_ENTRIES) {
            anObject(value);
            return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        }
        return INTERRUPTED ? fn(value, stop) : fn(value);
    };
    if (IS_ITERATOR) iterator = iterable;
    else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
            for(index = 0, length = lengthOfArrayLike(iterable); length > index; index++){
                result = callFn(iterable[index]);
                if (result && isPrototypeOf(ResultPrototype, result)) return result;
            }
            return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
    }
    next = iterator.next;
    while(!(step = call(next, iterator)).done){
        try {
            result = callFn(step.value);
        } catch (error) {
            iteratorClose(iterator, 'throw', error);
        }
        if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    }
    return new Result(false);
};

},{"../internals/global":"jxPDA","../internals/function-bind-context":"kZubc","../internals/function-call":"jhLed","../internals/an-object":"1LIz9","../internals/try-to-string":"1hxsu","../internals/is-array-iterator-method":"7ORJD","../internals/length-of-array-like":"afDy6","../internals/object-is-prototype-of":"fyf1A","../internals/get-iterator":"dQrLE","../internals/get-iterator-method":"5CTSY","../internals/iterator-close":"cwu4L"}],"kZubc":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var bind = uncurryThis(uncurryThis.bind);
// optional / simple context binding
module.exports = function(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : bind ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};

},{"../internals/function-uncurry-this":"jJnXC","../internals/a-callable":"83opn"}],"7ORJD":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
// check on default Array iterator
module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/well-known-symbol":"5C8sm","../internals/iterators":"nPOBX"}],"nPOBX":[function(require,module,exports) {
module.exports = {
};

},{}],"dQrLE":[function(require,module,exports) {
var global = require('../internals/global');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var getIteratorMethod = require('../internals/get-iterator-method');
var TypeError = global.TypeError;
module.exports = function(argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
    throw TypeError(tryToString(argument) + ' is not iterable');
};

},{"../internals/global":"jxPDA","../internals/function-call":"jhLed","../internals/a-callable":"83opn","../internals/an-object":"1LIz9","../internals/try-to-string":"1hxsu","../internals/get-iterator-method":"5CTSY"}],"5CTSY":[function(require,module,exports) {
var classof = require('../internals/classof');
var getMethod = require('../internals/get-method');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function(it) {
    if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

},{"../internals/classof":"kJ8JQ","../internals/get-method":"hEJ6b","../internals/iterators":"nPOBX","../internals/well-known-symbol":"5C8sm"}],"kJ8JQ":[function(require,module,exports) {
var global = require('../internals/global');
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var isCallable = require('../internals/is-callable');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function() {
    return arguments;
}()) == 'Arguments';
// fallback for IE11 Script Access Denied error
var tryGet = function(it, key) {
    try {
        return it[key];
    } catch (error) {
    }
};
// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

},{"../internals/global":"jxPDA","../internals/to-string-tag-support":"g8wEl","../internals/is-callable":"kPhuP","../internals/classof-raw":"A9m3U","../internals/well-known-symbol":"5C8sm"}],"g8wEl":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {
};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":"5C8sm"}],"cwu4L":[function(require,module,exports) {
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getMethod = require('../internals/get-method');
module.exports = function(iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);
    try {
        innerResult = getMethod(iterator, 'return');
        if (!innerResult) {
            if (kind === 'throw') throw value;
            return value;
        }
        innerResult = call(innerResult, iterator);
    } catch (error) {
        innerError = true;
        innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
};

},{"../internals/function-call":"jhLed","../internals/an-object":"1LIz9","../internals/get-method":"hEJ6b"}],"788V9":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;
try {
    var called = 0;
    var iteratorWithReturn = {
        next: function() {
            return {
                done: !!called++
            };
        },
        'return': function() {
            SAFE_CLOSING = true;
        }
    };
    iteratorWithReturn[ITERATOR] = function() {
        return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function() {
        throw 2;
    });
} catch (error) {
}
module.exports = function(exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
        var object = {
        };
        object[ITERATOR] = function() {
            return {
                next: function() {
                    return {
                        done: ITERATION_SUPPORT = true
                    };
                }
            };
        };
        exec(object);
    } catch (error) {
    }
    return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":"5C8sm"}],"hqPl9":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aConstructor = require('../internals/a-constructor');
var wellKnownSymbol = require('../internals/well-known-symbol');
var SPECIES = wellKnownSymbol('species');
// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function(O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};

},{"../internals/an-object":"1LIz9","../internals/a-constructor":"1DOBp","../internals/well-known-symbol":"5C8sm"}],"1DOBp":[function(require,module,exports) {
var global = require('../internals/global');
var isConstructor = require('../internals/is-constructor');
var tryToString = require('../internals/try-to-string');
var TypeError = global.TypeError;
// `Assert: IsConstructor(argument) is true`
module.exports = function(argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a constructor');
};

},{"../internals/global":"jxPDA","../internals/is-constructor":"iNoNi","../internals/try-to-string":"1hxsu"}],"iNoNi":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof');
var getBuiltIn = require('../internals/get-built-in');
var inspectSource = require('../internals/inspect-source');
var noop = function() {
};
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
var isConstructorModern = function(argument) {
    if (!isCallable(argument)) return false;
    try {
        construct(noop, empty, argument);
        return true;
    } catch (error) {
        return false;
    }
};
var isConstructorLegacy = function(argument) {
    if (!isCallable(argument)) return false;
    switch(classof(argument)){
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction':
            return false;
    }
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};
// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function() {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = true;
    }) || called;
}) ? isConstructorLegacy : isConstructorModern;

},{"../internals/function-uncurry-this":"jJnXC","../internals/fails":"8IfZQ","../internals/is-callable":"kPhuP","../internals/classof":"kJ8JQ","../internals/get-built-in":"78arb","../internals/inspect-source":"7DOzX"}],"5TiiK":[function(require,module,exports) {
var global = require('../internals/global');
var apply = require('../internals/function-apply');
var bind = require('../internals/function-bind-context');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var fails = require('../internals/fails');
var html = require('../internals/html');
var arraySlice = require('../internals/array-slice');
var createElement = require('../internals/document-create-element');
var IS_IOS = require('../internals/engine-is-ios');
var IS_NODE = require('../internals/engine-is-node');
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {
};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;
try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global.location;
} catch (error) {
}
var run = function(id) {
    if (hasOwn(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
    }
};
var runner = function(id) {
    return function() {
        run(id);
    };
};
var listener = function(event) {
    run(event.data);
};
var post = function(id) {
    // old engines have not location.origin
    global.postMessage(String(id), location.protocol + '//' + location.host);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
    set = function setImmediate(fn) {
        var args = arraySlice(arguments, 1);
        queue[++counter] = function() {
            apply(isCallable(fn) ? fn : Function(fn), undefined, args);
        };
        defer(counter);
        return counter;
    };
    clear = function clearImmediate(id) {
        delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) defer = function(id) {
        process.nextTick(runner(id));
    };
    else if (Dispatch && Dispatch.now) defer = function(id) {
        Dispatch.now(runner(id));
    };
    else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = bind(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
        defer = post;
        global.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) defer = function(id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
        };
    };
    else defer = function(id) {
        setTimeout(runner(id), 0);
    };
}
module.exports = {
    set: set,
    clear: clear
};

},{"../internals/global":"jxPDA","../internals/function-apply":"206oi","../internals/function-bind-context":"kZubc","../internals/is-callable":"kPhuP","../internals/has-own-property":"3ZdUC","../internals/fails":"8IfZQ","../internals/html":"fFwbI","../internals/array-slice":"bI1dk","../internals/document-create-element":"jKd7d","../internals/engine-is-ios":"kaA8e","../internals/engine-is-node":"jwobg"}],"206oi":[function(require,module,exports) {
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function() {
    return call.apply(apply, arguments);
});

},{}],"fFwbI":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"78arb"}],"bI1dk":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
module.exports = uncurryThis([].slice);

},{"../internals/function-uncurry-this":"jJnXC"}],"kaA8e":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"boFeV"}],"jwobg":[function(require,module,exports) {
var classof = require('../internals/classof-raw');
var global = require('../internals/global');
module.exports = classof(global.process) == 'process';

},{"../internals/classof-raw":"A9m3U","../internals/global":"jxPDA"}],"hWCOJ":[function(require,module,exports) {
var global = require('../internals/global');
var bind = require('../internals/function-bind-context');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var macrotask = require('../internals/task').set;
var IS_IOS = require('../internals/engine-is-ios');
var IS_IOS_PEBBLE = require('../internals/engine-is-ios-pebble');
var IS_WEBOS_WEBKIT = require('../internals/engine-is-webos-webkit');
var IS_NODE = require('../internals/engine-is-node');
var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then;
// modern engines have queueMicrotask method
if (!queueMicrotask) {
    flush = function() {
        var parent, fn;
        if (IS_NODE && (parent = process.domain)) parent.exit();
        while(head){
            fn = head.fn;
            head = head.next;
            try {
                fn();
            } catch (error) {
                if (head) notify();
                else last = undefined;
                throw error;
            }
        }
        last = undefined;
        if (parent) parent.enter();
    };
    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
        toggle = true;
        node = document.createTextNode('');
        new MutationObserver(flush).observe(node, {
            characterData: true
        });
        notify = function() {
            node.data = toggle = !toggle;
        };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise.resolve(undefined);
        // workaround of WebKit ~ iOS Safari 10.1 bug
        promise.constructor = Promise;
        then = bind(promise.then, promise);
        notify = function() {
            then(flush);
        };
    // Node.js without promises
    } else if (IS_NODE) notify = function() {
        process.nextTick(flush);
    };
    else {
        // strange IE + webpack dev server bug - use .bind(global)
        macrotask = bind(macrotask, global);
        notify = function() {
            macrotask(flush);
        };
    }
}
module.exports = queueMicrotask || function(fn) {
    var task = {
        fn: fn,
        next: undefined
    };
    if (last) last.next = task;
    if (!head) {
        head = task;
        notify();
    }
    last = task;
};

},{"../internals/global":"jxPDA","../internals/function-bind-context":"kZubc","../internals/object-get-own-property-descriptor":"1gCBk","../internals/task":"5TiiK","../internals/engine-is-ios":"kaA8e","../internals/engine-is-ios-pebble":"2LHWP","../internals/engine-is-webos-webkit":"l4D6v","../internals/engine-is-node":"jwobg"}],"2LHWP":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');
var global = require('../internals/global');
module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;

},{"../internals/engine-user-agent":"boFeV","../internals/global":"jxPDA"}],"l4D6v":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');
module.exports = /web0s(?!.*chrome)/i.test(userAgent);

},{"../internals/engine-user-agent":"boFeV"}],"1RiLv":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');
module.exports = function(C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
};

},{"../internals/an-object":"1LIz9","../internals/is-object":"dplrD","../internals/new-promise-capability":"1jyVt"}],"1jyVt":[function(require,module,exports) {
'use strict';
var aCallable = require('../internals/a-callable');
var PromiseCapability = function(C) {
    var resolve, reject;
    this.promise = new C(function($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
    });
    this.resolve = aCallable(resolve);
    this.reject = aCallable(reject);
};
// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function(C) {
    return new PromiseCapability(C);
};

},{"../internals/a-callable":"83opn"}],"99n7W":[function(require,module,exports) {
var global = require('../internals/global');
module.exports = function(a, b) {
    var console = global.console;
    if (console && console.error) arguments.length == 1 ? console.error(a) : console.error(a, b);
};

},{"../internals/global":"jxPDA"}],"1r4qC":[function(require,module,exports) {
module.exports = function(exec) {
    try {
        return {
            error: false,
            value: exec()
        };
    } catch (error) {
        return {
            error: true,
            value: error
        };
    }
};

},{}],"QRSRy":[function(require,module,exports) {
module.exports = typeof window == 'object';

},{}],"iGxSP":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"d8k57":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var getMethod = require('../internals/get-method');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');
// @@match logic
fixRegExpWellKnownSymbolLogic('match', function(MATCH, nativeMatch, maybeCallNative) {
    return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
            var O = requireObjectCoercible(this);
            var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
            return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function(string) {
            var rx = anObject(this);
            var S = toString(string);
            var res = maybeCallNative(nativeMatch, rx, S);
            if (res.done) return res.value;
            if (!rx.global) return regExpExec(rx, S);
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
            var A = [];
            var n = 0;
            var result;
            while((result = regExpExec(rx, S)) !== null){
                var matchStr = toString(result[0]);
                A[n] = matchStr;
                if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                n++;
            }
            return n === 0 ? null : A;
        }
    ];
});

},{"../internals/function-call":"jhLed","../internals/fix-regexp-well-known-symbol-logic":"kCD7W","../internals/an-object":"1LIz9","../internals/to-length":"bMgmi","../internals/to-string":"4cTlm","../internals/require-object-coercible":"3Qlyo","../internals/get-method":"hEJ6b","../internals/advance-string-index":"8P9Or","../internals/regexp-exec-abstract":"a6f8D"}],"kCD7W":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var uncurryThis = require('../internals/function-uncurry-this');
var redefine = require('../internals/redefine');
var regexpExec = require('../internals/regexp-exec');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;
module.exports = function(KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol(KEY);
    var DELEGATES_TO_SYMBOL = !fails(function() {
        // String methods call symbol-named RegEp methods
        var O = {
        };
        O[SYMBOL] = function() {
            return 7;
        };
        return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;
        if (KEY === 'split') {
            // We can't use real regex here since it causes deoptimization
            // and serious performance degradation in V8
            // https://github.com/zloirock/core-js/issues/306
            re = {
            };
            // RegExp[@@split] doesn't call the regex's exec method, but first creates
            // a new one. We need to return the patched regex when creating the new one.
            re.constructor = {
            };
            re.constructor[SPECIES] = function() {
                return re;
            };
            re.flags = '';
            re[SYMBOL] = /./[SYMBOL];
        }
        re.exec = function() {
            execCalled = true;
            return null;
        };
        re[SYMBOL]('');
        return !execCalled;
    });
    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
        var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
        var methods = exec(SYMBOL, ''[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
            var uncurriedNativeMethod = uncurryThis(nativeMethod);
            var $exec = regexp.exec;
            if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
                if (DELEGATES_TO_SYMBOL && !forceStringMethod) // The native String method already delegates to @@method (this
                // polyfilled function), leasing to infinite recursion.
                // We avoid it by directly calling the native @@method method.
                return {
                    done: true,
                    value: uncurriedNativeRegExpMethod(regexp, str, arg2)
                };
                return {
                    done: true,
                    value: uncurriedNativeMethod(str, regexp, arg2)
                };
            }
            return {
                done: false
            };
        });
        redefine(String.prototype, KEY, methods[0]);
        redefine(RegExpPrototype, SYMBOL, methods[1]);
    }
    if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

},{"../modules/es.regexp.exec":"1vrnL","../internals/function-uncurry-this":"jJnXC","../internals/redefine":"kxbj8","../internals/regexp-exec":"aEWJp","../internals/fails":"8IfZQ","../internals/well-known-symbol":"5C8sm","../internals/create-non-enumerable-property":"6Z1es"}],"1vrnL":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');
// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec
}, {
    exec: exec
});

},{"../internals/export":"8yfGv","../internals/regexp-exec":"aEWJp"}],"aEWJp":[function(require,module,exports) {
'use strict';
/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */ /* eslint-disable regexp/no-useless-quantifier -- testing */ var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var regexpFlags = require('../internals/regexp-flags');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var shared = require('../internals/shared');
var create = require('../internals/object-create');
var getInternalState = require('../internals/internal-state').get;
var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all');
var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg');
var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var UPDATES_LAST_INDEX_WRONG = function() {
    var re1 = /a/;
    var re2 = /b*/g;
    call(nativeExec, re1, 'a');
    call(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) // eslint-disable-next-line max-statements -- TODO
patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;
    if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;
    if (sticky) {
        flags = replace(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) flags += 'g';
        strCopy = stringSlice(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
            source = '(?: ' + source + ')';
            strCopy = ' ' + strCopy;
            charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
    }
    if (NPCG_INCLUDED) reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = call(nativeExec, sticky ? reCopy : re, strCopy);
    if (sticky) {
        if (match) {
            match.input = stringSlice(match.input, charsAdded);
            match[0] = stringSlice(match[0], charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    if (NPCG_INCLUDED && match && match.length > 1) // Fix browsers whose `exec` methods don't consistently return `undefined`
    // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
    call(nativeReplace, match[0], reCopy, function() {
        for(i = 1; i < arguments.length - 2; i++)if (arguments[i] === undefined) match[i] = undefined;
    });
    if (match && groups) {
        match.groups = object = create(null);
        for(i = 0; i < groups.length; i++){
            group = groups[i];
            object[group[0]] = match[group[1]];
        }
    }
    return match;
};
module.exports = patchedExec;

},{"../internals/function-call":"jhLed","../internals/function-uncurry-this":"jJnXC","../internals/to-string":"4cTlm","../internals/regexp-flags":"4QDzk","../internals/regexp-sticky-helpers":"801yY","../internals/shared":"7VLeP","../internals/object-create":"1As5O","../internals/internal-state":"i6AaM","../internals/regexp-unsupported-dot-all":"kpGJO","../internals/regexp-unsupported-ncg":"1ugKh"}],"4cTlm":[function(require,module,exports) {
var global = require('../internals/global');
var classof = require('../internals/classof');
var String = global.String;
module.exports = function(argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
};

},{"../internals/global":"jxPDA","../internals/classof":"kJ8JQ"}],"4QDzk":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');
// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function() {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
};

},{"../internals/an-object":"1LIz9"}],"801yY":[function(require,module,exports) {
var fails = require('../internals/fails');
var global = require('../internals/global');
// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;
exports.UNSUPPORTED_Y = fails(function() {
    var re = $RegExp('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
});
exports.BROKEN_CARET = fails(function() {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
});

},{"../internals/fails":"8IfZQ","../internals/global":"jxPDA"}],"1As5O":[function(require,module,exports) {
/* global ActiveXObject -- old IE, WSH */ var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');
var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');
var EmptyConstructor = function() {
};
var scriptTag = function(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};
// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
};
// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
};
// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument1;
var NullProtoObject = function() {
    try {
        activeXDocument1 = new ActiveXObject('htmlfile');
    } catch (error) {
    }
    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument1 ? NullProtoObjectViaActiveX(activeXDocument1) // old IE
     : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument1); // WSH
    var length = enumBugKeys.length;
    while(length--)delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":"1LIz9","../internals/object-define-properties":"8PPlc","../internals/enum-bug-keys":"a0vpC","../internals/hidden-keys":"lHxXS","../internals/html":"fFwbI","../internals/document-create-element":"jKd7d","../internals/shared-key":"oNjWG"}],"8PPlc":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var objectKeys = require('../internals/object-keys');
// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while(length > index)definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
};

},{"../internals/descriptors":"6ZLib","../internals/object-define-property":"bauTd","../internals/an-object":"1LIz9","../internals/to-indexed-object":"8ueFu","../internals/object-keys":"9bK4Y"}],"9bK4Y":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');
// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/object-keys-internal":"3Jr1l","../internals/enum-bug-keys":"a0vpC"}],"kpGJO":[function(require,module,exports) {
var fails = require('../internals/fails');
var global = require('../internals/global');
// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;
module.exports = fails(function() {
    var re = $RegExp('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

},{"../internals/fails":"8IfZQ","../internals/global":"jxPDA"}],"1ugKh":[function(require,module,exports) {
var fails = require('../internals/fails');
var global = require('../internals/global');
// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;
module.exports = fails(function() {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});

},{"../internals/fails":"8IfZQ","../internals/global":"jxPDA"}],"8P9Or":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function(S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":"a9S4J"}],"a9S4J":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);
var createMethod = function(CONVERT_TO_STRING) {
    return function($this, pos) {
        var S = toString(requireObjectCoercible($this));
        var position = toIntegerOrInfinity(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = charCodeAt(S, position);
        return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
    };
};
module.exports = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
};

},{"../internals/function-uncurry-this":"jJnXC","../internals/to-integer-or-infinity":"aqyxv","../internals/to-string":"4cTlm","../internals/require-object-coercible":"3Qlyo"}],"a6f8D":[function(require,module,exports) {
var global = require('../internals/global');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof-raw');
var regexpExec = require('../internals/regexp-exec');
var TypeError = global.TypeError;
// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function(R, S) {
    var exec = R.exec;
    if (isCallable(exec)) {
        var result = call(exec, R, S);
        if (result !== null) anObject(result);
        return result;
    }
    if (classof(R) === 'RegExp') return call(regexpExec, R, S);
    throw TypeError('RegExp#exec called on incompatible receiver');
};

},{"../internals/global":"jxPDA","../internals/function-call":"jhLed","../internals/an-object":"1LIz9","../internals/is-callable":"kPhuP","../internals/classof-raw":"A9m3U","../internals/regexp-exec":"aEWJp"}],"bbUl2":[function(require,module,exports) {
'use strict';
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var fails = require('../internals/fails');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var getMethod = require('../internals/get-method');
var getSubstitution = require('../internals/get-substitution');
var regExpExec = require('../internals/regexp-exec-abstract');
var wellKnownSymbol = require('../internals/well-known-symbol');
var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
var maybeToString = function(it) {
    return it === undefined ? it : String(it);
};
// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = function() {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
}();
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
    if (/./[REPLACE]) return /./[REPLACE]('a', '$0') === '';
    return false;
}();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
    var re = /./;
    re.exec = function() {
        var result = [];
        result.groups = {
            a: '7'
        };
        return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
});
// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function(_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
    return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
            var O = requireObjectCoercible(this);
            var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
            return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace, toString(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function(string, replaceValue) {
            var rx = anObject(this);
            var S = toString(string);
            if (typeof replaceValue == 'string' && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, '$<') === -1) {
                var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
                if (res.done) return res.value;
            }
            var functionalReplace = isCallable(replaceValue);
            if (!functionalReplace) replaceValue = toString(replaceValue);
            var global = rx.global;
            if (global) {
                var fullUnicode = rx.unicode;
                rx.lastIndex = 0;
            }
            var results = [];
            while(true){
                var result = regExpExec(rx, S);
                if (result === null) break;
                push(results, result);
                if (!global) break;
                var matchStr = toString(result[0]);
                if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
            }
            var accumulatedResult = '';
            var nextSourcePosition = 0;
            for(var i = 0; i < results.length; i++){
                result = results[i];
                var matched = toString(result[0]);
                var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
                var captures = [];
                // NOTE: This is equivalent to
                //   captures = result.slice(1).map(maybeToString)
                // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
                // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
                // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
                for(var j = 1; j < result.length; j++)push(captures, maybeToString(result[j]));
                var namedCaptures = result.groups;
                if (functionalReplace) {
                    var replacerArgs = concat([
                        matched
                    ], captures, position, S);
                    if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
                    var replacement = toString(apply(replaceValue, undefined, replacerArgs));
                } else replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                if (position >= nextSourcePosition) {
                    accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
                    nextSourcePosition = position + matched.length;
                }
            }
            return accumulatedResult + stringSlice(S, nextSourcePosition);
        }
    ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

},{"../internals/function-apply":"206oi","../internals/function-call":"jhLed","../internals/function-uncurry-this":"jJnXC","../internals/fix-regexp-well-known-symbol-logic":"kCD7W","../internals/fails":"8IfZQ","../internals/an-object":"1LIz9","../internals/is-callable":"kPhuP","../internals/to-integer-or-infinity":"aqyxv","../internals/to-length":"bMgmi","../internals/to-string":"4cTlm","../internals/require-object-coercible":"3Qlyo","../internals/advance-string-index":"8P9Or","../internals/get-method":"hEJ6b","../internals/get-substitution":"bJykS","../internals/regexp-exec-abstract":"a6f8D","../internals/well-known-symbol":"5C8sm"}],"bJykS":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');
var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function(match, ch) {
        var capture;
        switch(charAt(ch, 0)){
            case '$':
                return '$';
            case '&':
                return matched;
            case '`':
                return stringSlice(str, 0, position);
            case "'":
                return stringSlice(str, tailPos);
            case '<':
                capture = namedCaptures[stringSlice(ch, 1, -1)];
                break;
            default:
                var n = +ch;
                if (n === 0) return match;
                if (n > m) {
                    var f = floor(n / 10);
                    if (f === 0) return match;
                    if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
                    return match;
                }
                capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
    });
};

},{"../internals/function-uncurry-this":"jJnXC","../internals/to-object":"eEdae"}],"eH6fZ":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');
// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
}();
// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
    startsWith: function startsWith(searchString /* , position = 0 */ ) {
        var that = toString(requireObjectCoercible(this));
        notARegExp(searchString);
        var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
        var search = toString(searchString);
        return un$StartsWith ? un$StartsWith(that, search, index) : stringSlice(that, index, index + search.length) === search;
    }
});

},{"../internals/export":"8yfGv","../internals/function-uncurry-this":"jJnXC","../internals/object-get-own-property-descriptor":"1gCBk","../internals/to-length":"bMgmi","../internals/to-string":"4cTlm","../internals/not-a-regexp":"hJJXZ","../internals/require-object-coercible":"3Qlyo","../internals/correct-is-regexp-logic":"aNJkR","../internals/is-pure":"6Bbq0"}],"hJJXZ":[function(require,module,exports) {
var global = require('../internals/global');
var isRegExp = require('../internals/is-regexp');
var TypeError = global.TypeError;
module.exports = function(it) {
    if (isRegExp(it)) throw TypeError("The method doesn't accept regular expressions");
    return it;
};

},{"../internals/global":"jxPDA","../internals/is-regexp":"lV2Ye"}],"lV2Ye":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');
var MATCH = wellKnownSymbol('match');
// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function(it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/is-object":"dplrD","../internals/classof-raw":"A9m3U","../internals/well-known-symbol":"5C8sm"}],"aNJkR":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var MATCH = wellKnownSymbol('match');
module.exports = function(METHOD_NAME) {
    var regexp = /./;
    try {
        '/./'[METHOD_NAME](regexp);
    } catch (error1) {
        try {
            regexp[MATCH] = false;
            return '/./'[METHOD_NAME](regexp);
        } catch (error2) {
        }
    }
    return false;
};

},{"../internals/well-known-symbol":"5C8sm"}],"bLuDU":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function(iterated, kind) {
    setInternalState(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated),
        index: 0,
        kind: kind // kind
    });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function() {
    var state = getInternalState(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
        state.target = undefined;
        return {
            value: undefined,
            done: true
        };
    }
    if (kind == 'keys') return {
        value: index,
        done: false
    };
    if (kind == 'values') return {
        value: target[index],
        done: false
    };
    return {
        value: [
            index,
            target[index]
        ],
        done: false
    };
}, 'values');
// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/to-indexed-object":"8ueFu","../internals/add-to-unscopables":"icGQt","../internals/iterators":"nPOBX","../internals/internal-state":"i6AaM","../internals/define-iterator":"3Ugai"}],"icGQt":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var definePropertyModule = require('../internals/object-define-property');
var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;
// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
});
// add a key to Array.prototype[@@unscopables]
module.exports = function(key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/well-known-symbol":"5C8sm","../internals/object-create":"1As5O","../internals/object-define-property":"bauTd"}],"3Ugai":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var IS_PURE = require('../internals/is-pure');
var FunctionName = require('../internals/function-name');
var isCallable = require('../internals/is-callable');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');
var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';
var returnThis = function() {
    return this;
};
module.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);
    var getIterationMethod = function(KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch(KIND){
            case KEYS:
                return function keys() {
                    return new IteratorConstructor(this, KIND);
                };
            case VALUES:
                return function values() {
                    return new IteratorConstructor(this, KIND);
                };
            case ENTRIES:
                return function entries() {
                    return new IteratorConstructor(this, KIND);
                };
        }
        return function() {
            return new IteratorConstructor(this);
        };
    };
    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;
    // fix native
    if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                if (setPrototypeOf) setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
            }
            // Set @@toStringTag to native iterators
            setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
            if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
        }
    }
    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
        else {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values() {
                return call(nativeIterator, this);
            };
        }
    }
    // export additional methods
    if (DEFAULT) {
        methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) {
            for(KEY in methods)if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) redefine(IterablePrototype, KEY, methods[KEY]);
        } else $({
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
        }, methods);
    }
    // define iterator
    if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) redefine(IterablePrototype, ITERATOR, defaultIterator, {
        name: DEFAULT
    });
    Iterators[NAME] = defaultIterator;
    return methods;
};

},{"../internals/export":"8yfGv","../internals/function-call":"jhLed","../internals/is-pure":"6Bbq0","../internals/function-name":"6v6mP","../internals/is-callable":"kPhuP","../internals/create-iterator-constructor":"1fB00","../internals/object-get-prototype-of":"lBy7h","../internals/object-set-prototype-of":"lb6rR","../internals/set-to-string-tag":"9arwS","../internals/create-non-enumerable-property":"6Z1es","../internals/redefine":"kxbj8","../internals/well-known-symbol":"5C8sm","../internals/iterators":"nPOBX","../internals/iterators-core":"gL68y"}],"1fB00":[function(require,module,exports) {
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');
var returnThis = function() {
    return this;
};
module.exports = function(IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype, {
        next: createPropertyDescriptor(1, next)
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
};

},{"../internals/iterators-core":"gL68y","../internals/object-create":"1As5O","../internals/create-property-descriptor":"ermgb","../internals/set-to-string-tag":"9arwS","../internals/iterators":"nPOBX"}],"gL68y":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */ if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
}
var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function() {
    var test = {
    };
    // FF44- legacy iterators case
    return IteratorPrototype[ITERATOR].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {
};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);
// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) redefine(IteratorPrototype, ITERATOR, function() {
    return this;
});
module.exports = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/fails":"8IfZQ","../internals/is-callable":"kPhuP","../internals/object-create":"1As5O","../internals/object-get-prototype-of":"lBy7h","../internals/redefine":"kxbj8","../internals/well-known-symbol":"5C8sm","../internals/is-pure":"6Bbq0"}],"lBy7h":[function(require,module,exports) {
var global = require('../internals/global');
var hasOwn = require('../internals/has-own-property');
var isCallable = require('../internals/is-callable');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');
var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;
// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
    var object = toObject(O);
    if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) return constructor.prototype;
    return object instanceof Object ? ObjectPrototype : null;
};

},{"../internals/global":"jxPDA","../internals/has-own-property":"3ZdUC","../internals/is-callable":"kPhuP","../internals/to-object":"eEdae","../internals/shared-key":"oNjWG","../internals/correct-prototype-getter":"5LqOC"}],"5LqOC":[function(require,module,exports) {
var fails = require('../internals/fails');
module.exports = !fails(function() {
    function F() {
    }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":"8IfZQ"}],"cNl8W":[function(require,module,exports) {
var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');
var ArrayIteratorMethods = require('../modules/es.array.iterator');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;
var handlePrototype = function(CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
            createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
            CollectionPrototype[ITERATOR] = ArrayValues;
        }
        if (!CollectionPrototype[TO_STRING_TAG]) createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
        if (DOMIterables[COLLECTION_NAME]) for(var METHOD_NAME in ArrayIteratorMethods){
            // some Chrome versions have non-configurable methods on DOMTokenList
            if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
                createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
            } catch (error) {
                CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
            }
        }
    }
};
for(var COLLECTION_NAME1 in DOMIterables)handlePrototype(global[COLLECTION_NAME1] && global[COLLECTION_NAME1].prototype, COLLECTION_NAME1);
handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

},{"../internals/global":"jxPDA","../internals/dom-iterables":"7H0N4","../internals/dom-token-list-prototype":"eWdLK","../modules/es.array.iterator":"bLuDU","../internals/create-non-enumerable-property":"6Z1es","../internals/well-known-symbol":"5C8sm"}],"7H0N4":[function(require,module,exports) {
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
};

},{}],"eWdLK":[function(require,module,exports) {
// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = require('../internals/document-create-element');
var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;
module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

},{"../internals/document-create-element":"jKd7d"}],"ls4GC":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"8W8UG":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/engine-v8-version');
var IS_NODE = require('../internals/engine-is-node');
var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD || CHROME_BUG
}, {
    reduce: function reduce(callbackfn /* , initialValue */ ) {
        var length = arguments.length;
        return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
    }
});

},{"../internals/export":"8yfGv","../internals/array-reduce":"j7uXX","../internals/array-method-is-strict":"ilytn","../internals/engine-v8-version":"9gYOM","../internals/engine-is-node":"jwobg"}],"j7uXX":[function(require,module,exports) {
var global = require('../internals/global');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var TypeError = global.TypeError;
// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function(IS_RIGHT) {
    return function(that, callbackfn, argumentsLength, memo) {
        aCallable(callbackfn);
        var O = toObject(that);
        var self = IndexedObject(O);
        var length = lengthOfArrayLike(O);
        var index = IS_RIGHT ? length - 1 : 0;
        var i = IS_RIGHT ? -1 : 1;
        if (argumentsLength < 2) while(true){
            if (index in self) {
                memo = self[index];
                index += i;
                break;
            }
            index += i;
            if (IS_RIGHT ? index < 0 : length <= index) throw TypeError('Reduce of empty array with no initial value');
        }
        for(; IS_RIGHT ? index >= 0 : length > index; index += i)if (index in self) memo = callbackfn(memo, self[index], index, O);
        return memo;
    };
};
module.exports = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod(true)
};

},{"../internals/global":"jxPDA","../internals/a-callable":"83opn","../internals/to-object":"eEdae","../internals/indexed-object":"e5ccT","../internals/length-of-array-like":"afDy6"}],"ilytn":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
module.exports = function(METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function() {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(null, argument || function() {
            throw 1;
        }, 1);
    });
};

},{"../internals/fails":"8IfZQ"}],"jWSjD":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');
// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var un$EndsWith = uncurryThis(''.endsWith);
var slice = uncurryThis(''.slice);
var min = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
}();
// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
    endsWith: function endsWith(searchString /* , endPosition = @length */ ) {
        var that = toString(requireObjectCoercible(this));
        notARegExp(searchString);
        var endPosition = arguments.length > 1 ? arguments[1] : undefined;
        var len = that.length;
        var end = endPosition === undefined ? len : min(toLength(endPosition), len);
        var search = toString(searchString);
        return un$EndsWith ? un$EndsWith(that, search, end) : slice(that, end - search.length, end) === search;
    }
});

},{"../internals/export":"8yfGv","../internals/function-uncurry-this":"jJnXC","../internals/object-get-own-property-descriptor":"1gCBk","../internals/to-length":"bMgmi","../internals/to-string":"4cTlm","../internals/not-a-regexp":"hJJXZ","../internals/require-object-coercible":"3Qlyo","../internals/correct-is-regexp-logic":"aNJkR","../internals/is-pure":"6Bbq0"}],"eWFDr":[function(require,module,exports) {
'use strict';
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var isRegExp = require('../internals/is-regexp');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var arraySlice = require('../internals/array-slice');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var fails = require('../internals/fails');
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 4294967295;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);
// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function() {
        return originalExec.apply(this, arguments);
    };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});
// @@split logic
fixRegExpWellKnownSymbolLogic('split', function(SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if ('abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 || ''.split(/.?/).length) // based on es5-shim implementation, need to rework it
    internalSplit = function(separator, limit) {
        var string = toString(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [
            string
        ];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return call(nativeSplit, string, separator, lim);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while(match = call(regexpExec, separatorCopy, string)){
            lastIndex = separatorCopy.lastIndex;
            if (lastIndex > lastLastIndex) {
                push(output, stringSlice(string, lastLastIndex, match.index));
                if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
                lastLength = match[0].length;
                lastLastIndex = lastIndex;
                if (output.length >= lim) break;
            }
            if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
            if (lastLength || !exec(separatorCopy, '')) push(output, '');
        } else push(output, stringSlice(string, lastLastIndex));
        return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
    else if ('0'.split(undefined, 0).length) internalSplit = function(separator, limit) {
        return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
    else internalSplit = nativeSplit;
    return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
            var O = requireObjectCoercible(this);
            var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
            return splitter ? call(splitter, separator, O, limit) : call(internalSplit, toString(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function(string, limit) {
            var rx = anObject(this);
            var S = toString(string);
            var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
            if (res.done) return res.value;
            var C = speciesConstructor(rx, RegExp);
            var unicodeMatching = rx.unicode;
            var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y ? 'g' : 'y');
            // ^(? + rx + ) is needed, in combination with some S slicing, to
            // simulate the 'y' flag.
            var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
            var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
            if (lim === 0) return [];
            if (S.length === 0) return callRegExpExec(splitter, S) === null ? [
                S
            ] : [];
            var p = 0;
            var q = 0;
            var A = [];
            while(q < S.length){
                splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
                var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
                var e;
                if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) q = advanceStringIndex(S, q, unicodeMatching);
                else {
                    push(A, stringSlice(S, p, q));
                    if (A.length === lim) return A;
                    for(var i = 1; i <= z.length - 1; i++){
                        push(A, z[i]);
                        if (A.length === lim) return A;
                    }
                    q = p = e;
                }
            }
            push(A, stringSlice(S, p));
            return A;
        }
    ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

},{"../internals/function-apply":"206oi","../internals/function-call":"jhLed","../internals/function-uncurry-this":"jJnXC","../internals/fix-regexp-well-known-symbol-logic":"kCD7W","../internals/is-regexp":"lV2Ye","../internals/an-object":"1LIz9","../internals/require-object-coercible":"3Qlyo","../internals/species-constructor":"hqPl9","../internals/advance-string-index":"8P9Or","../internals/to-length":"bMgmi","../internals/to-string":"4cTlm","../internals/get-method":"hEJ6b","../internals/array-slice":"bI1dk","../internals/regexp-exec-abstract":"a6f8D","../internals/regexp-exec":"aEWJp","../internals/regexp-sticky-helpers":"801yY","../internals/fails":"8IfZQ"}],"6TZOP":[function(require,module,exports) {
var global = arguments[3];
var now = require('performance-now'), root = typeof window === 'undefined' ? global : window, vendors = [
    'moz',
    'webkit'
], suffix = 'AnimationFrame', raf = root['request' + suffix], caf = root['cancel' + suffix] || root['cancelRequest' + suffix];
for(var i1 = 0; !raf && i1 < vendors.length; i1++){
    raf = root[vendors[i1] + 'Request' + suffix];
    caf = root[vendors[i1] + 'Cancel' + suffix] || root[vendors[i1] + 'CancelRequest' + suffix];
}
// Some versions of FF have rAF but not cAF
if (!raf || !caf) {
    var last = 0, id = 0, queue = [], frameDuration = 1000 / 60;
    raf = function(callback) {
        if (queue.length === 0) {
            var _now = now(), next = Math.max(0, frameDuration - (_now - last));
            last = next + _now;
            setTimeout(function() {
                var cp = queue.slice(0);
                // Clear queue here to prevent
                // callbacks from appending listeners
                // to the current frame's queue
                queue.length = 0;
                for(var i = 0; i < cp.length; i++){
                    if (!cp[i].cancelled) try {
                        cp[i].callback(last);
                    } catch (e) {
                        setTimeout(function() {
                            throw e;
                        }, 0);
                    }
                }
            }, Math.round(next));
        }
        queue.push({
            handle: ++id,
            callback: callback,
            cancelled: false
        });
        return id;
    };
    caf = function(handle) {
        for(var i = 0; i < queue.length; i++)if (queue[i].handle === handle) queue[i].cancelled = true;
    };
}
module.exports = function(fn) {
    // Wrap in a new function to prevent
    // `cancel` potentially being assigned
    // to the native rAF function
    return raf.call(root, fn);
};
module.exports.cancel = function() {
    caf.apply(root, arguments);
};
module.exports.polyfill = function(object) {
    if (!object) object = root;
    object.requestAnimationFrame = raf;
    object.cancelAnimationFrame = caf;
};

},{"performance-now":"5jwb9"}],"5jwb9":[function(require,module,exports) {
var process = require("process");
// Generated by CoffeeScript 1.12.2
(function() {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
    if (typeof performance !== "undefined" && performance !== null && performance.now) module.exports = function() {
        return performance.now();
    };
    else if (typeof process !== "undefined" && process !== null && process.hrtime) {
        module.exports = function() {
            return (getNanoSeconds() - nodeLoadTime) / 1000000;
        };
        hrtime = process.hrtime;
        getNanoSeconds = function() {
            var hr;
            hr = hrtime();
            return hr[0] * 1000000000 + hr[1];
        };
        moduleLoadTime = getNanoSeconds();
        upTime = process.uptime() * 1000000000;
        nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
        module.exports = function() {
            return Date.now() - loadTime;
        };
        loadTime = Date.now();
    } else {
        module.exports = function() {
            return new Date().getTime() - loadTime;
        };
        loadTime = new Date().getTime();
    }
}).call(this);

},{"process":"lDnB8"}],"iHEeA":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/string-trim-forced');
// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({
    target: 'String',
    proto: true,
    forced: forcedStringTrimMethod('trim')
}, {
    trim: function trim() {
        return $trim(this);
    }
});

},{"../internals/export":"8yfGv","../internals/string-trim":"6sOY8","../internals/string-trim-forced":"icVcZ"}],"6sOY8":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var whitespaces = require('../internals/whitespaces');
var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');
// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function(TYPE) {
    return function($this) {
        var string = toString(requireObjectCoercible($this));
        if (TYPE & 1) string = replace(string, ltrim, '');
        if (TYPE & 2) string = replace(string, rtrim, '');
        return string;
    };
};
module.exports = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
};

},{"../internals/function-uncurry-this":"jJnXC","../internals/require-object-coercible":"3Qlyo","../internals/to-string":"4cTlm","../internals/whitespaces":"ddvZW"}],"ddvZW":[function(require,module,exports) {
// a string of all valid unicode whitespaces
module.exports = "\t\n\v\f\r \xa0              　\u2028\u2029﻿";

},{}],"icVcZ":[function(require,module,exports) {
var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');
var non = '\u200B\u0085\u180E';
// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function(METHOD_NAME) {
    return fails(function() {
        return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME;
    });
};

},{"../internals/function-name":"6v6mP","../internals/fails":"8IfZQ","../internals/whitespaces":"ddvZW"}],"caWwF":[function(require,module,exports) {
/*
	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
	http://www.phpied.com/rgb-color-parser-in-javascript/
*/ module.exports = function(color_string) {
    this.ok = false;
    this.alpha = 1;
    // strip any leading #
    if (color_string.charAt(0) == '#') color_string = color_string.substr(1, 6);
    color_string = color_string.replace(/ /g, '');
    color_string = color_string.toLowerCase();
    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        rebeccapurple: '663399',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    color_string = simple_colors[color_string] || color_string;
    // emd of simple type-in colors
    // array of color definition objects
    var color_defs = [
        {
            re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
            example: [
                'rgba(123, 234, 45, 0.8)',
                'rgba(255,234,245,1.0)'
            ],
            process: function(bits) {
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3]),
                    parseFloat(bits[4])
                ];
            }
        },
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: [
                'rgb(123, 234, 45)',
                'rgb(255,234,245)'
            ],
            process: function(bits) {
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            example: [
                '#00ff00',
                '336699'
            ],
            process: function(bits) {
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            example: [
                '#fb0',
                'f0f'
            ],
            process: function(bits) {
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];
    // search through the definitions to find a match
    for(var i1 = 0; i1 < color_defs.length; i1++){
        var re = color_defs[i1].re;
        var processor = color_defs[i1].process;
        var bits1 = re.exec(color_string);
        if (bits1) {
            var channels = processor(bits1);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            if (channels.length > 3) this.alpha = channels[3];
            this.ok = true;
        }
    }
    // validate/cleanup values
    this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
    this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
    this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
    this.alpha = this.alpha < 0 ? 0 : this.alpha > 1 || isNaN(this.alpha) ? 1 : this.alpha;
    // some getters
    this.toRGB = function() {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
    this.toRGBA = function() {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
    };
    this.toHex = function() {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    };
    // help
    this.getHelpXML = function() {
        var examples = new Array();
        // add regexps
        for(var i = 0; i < color_defs.length; i++){
            var example = color_defs[i].example;
            for(var j = 0; j < example.length; j++)examples[examples.length] = example[j];
        }
        // add type-in colors
        for(var sc in simple_colors)examples[examples.length] = sc;
        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for(var i = 0; i < examples.length; i++)try {
            var list_item = document.createElement('li');
            var list_color = new RGBColor(examples[i]);
            var example_div = document.createElement('div');
            example_div.style.cssText = "margin: 3px; border: 1px solid black; background:" + list_color.toHex() + '; ' + 'color:' + list_color.toHex();
            example_div.appendChild(document.createTextNode('test'));
            var list_item_value = document.createTextNode(' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex());
            list_item.appendChild(example_div);
            list_item.appendChild(list_item_value);
            xml.appendChild(list_item);
        } catch (e) {
        }
        return xml;
    };
};

},{}],"CsNki":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var stringIndexOf = uncurryThis(''.indexOf);
// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
}, {
    includes: function includes(searchString /* , position = 0 */ ) {
        return !!~stringIndexOf(toString(requireObjectCoercible(this)), toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
});

},{"../internals/export":"8yfGv","../internals/function-uncurry-this":"jJnXC","../internals/not-a-regexp":"hJJXZ","../internals/require-object-coercible":"3Qlyo","../internals/to-string":"4cTlm","../internals/correct-is-regexp-logic":"aNJkR"}],"fclII":[function(require,module,exports) {
'use strict';
/* eslint-disable es/no-array-prototype-indexof -- required for testing */ var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var $IndexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var un$IndexOf = uncurryThis([].indexOf);
var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([
    1
], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({
    target: 'Array',
    proto: true,
    forced: NEGATIVE_ZERO || !STRICT_METHOD
}, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */ ) {
        var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
        return NEGATIVE_ZERO ? un$IndexOf(this, searchElement, fromIndex) || 0 : $IndexOf(this, searchElement, fromIndex);
    }
});

},{"../internals/export":"8yfGv","../internals/function-uncurry-this":"jJnXC","../internals/array-includes":"SXf52","../internals/array-method-is-strict":"ilytn"}],"9QaOG":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var isArray = require('../internals/is-array');
var un$Reverse = uncurryThis([].reverse);
var test = [
    1,
    2
];
// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({
    target: 'Array',
    proto: true,
    forced: String(test) === String(test.reverse())
}, {
    reverse: function reverse() {
        // eslint-disable-next-line no-self-assign -- dirty hack
        if (isArray(this)) this.length = this.length;
        return un$Reverse(this);
    }
});

},{"../internals/export":"8yfGv","../internals/function-uncurry-this":"jJnXC","../internals/is-array":"gN5mt"}],"gN5mt":[function(require,module,exports) {
var classof = require('../internals/classof-raw');
// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
    return classof(argument) == 'Array';
};

},{"../internals/classof-raw":"A9m3U"}],"T91it":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "COMMAND_ARG_COUNTS", ()=>N1
);
parcelHelpers.export(exports, "SVGPathData", ()=>_
);
parcelHelpers.export(exports, "SVGPathDataParser", ()=>f1
);
parcelHelpers.export(exports, "SVGPathDataTransformer", ()=>u1
);
parcelHelpers.export(exports, "encodeSVGPath", ()=>e1
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var t1 = function(r2, e2) {
    return (t1 = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, r) {
        t.__proto__ = r;
    } || function(t, r) {
        for(var e in r)Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e]);
    })(r2, e2);
};
function r1(r, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    function i() {
        this.constructor = r;
    }
    t1(r, e), r.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i);
}
function e1(t) {
    var r = "";
    Array.isArray(t) || (t = [
        t
    ]);
    for(var e = 0; e < t.length; e++){
        var i = t[e];
        if (i.type === _.CLOSE_PATH) r += "z";
        else if (i.type === _.HORIZ_LINE_TO) r += (i.relative ? "h" : "H") + i.x;
        else if (i.type === _.VERT_LINE_TO) r += (i.relative ? "v" : "V") + i.y;
        else if (i.type === _.MOVE_TO) r += (i.relative ? "m" : "M") + i.x + " " + i.y;
        else if (i.type === _.LINE_TO) r += (i.relative ? "l" : "L") + i.x + " " + i.y;
        else if (i.type === _.CURVE_TO) r += (i.relative ? "c" : "C") + i.x1 + " " + i.y1 + " " + i.x2 + " " + i.y2 + " " + i.x + " " + i.y;
        else if (i.type === _.SMOOTH_CURVE_TO) r += (i.relative ? "s" : "S") + i.x2 + " " + i.y2 + " " + i.x + " " + i.y;
        else if (i.type === _.QUAD_TO) r += (i.relative ? "q" : "Q") + i.x1 + " " + i.y1 + " " + i.x + " " + i.y;
        else if (i.type === _.SMOOTH_QUAD_TO) r += (i.relative ? "t" : "T") + i.x + " " + i.y;
        else {
            if (i.type !== _.ARC) throw new Error('Unexpected command type "' + i.type + '" at index ' + e + ".");
            r += (i.relative ? "a" : "A") + i.rX + " " + i.rY + " " + i.xRot + " " + +i.lArcFlag + " " + +i.sweepFlag + " " + i.x + " " + i.y;
        }
    }
    return r;
}
function i1(t, r) {
    var e = t[0], i = t[1];
    return [
        e * Math.cos(r) - i * Math.sin(r),
        e * Math.sin(r) + i * Math.cos(r)
    ];
}
function a1() {
    for(var t = [], r = 0; r < arguments.length; r++)t[r] = arguments[r];
    for(var e = 0; e < t.length; e++)if ("number" != typeof t[e]) throw new Error("assertNumbers arguments[" + e + "] is not a number. " + typeof t[e] + " == typeof " + t[e]);
    return !0;
}
var n1 = Math.PI;
function o1(t, r, e) {
    t.lArcFlag = 0 === t.lArcFlag ? 0 : 1, t.sweepFlag = 0 === t.sweepFlag ? 0 : 1;
    var a = t.rX, o = t.rY, s = t.x, u = t.y;
    a = Math.abs(t.rX), o = Math.abs(t.rY);
    var h = i1([
        (r - s) / 2,
        (e - u) / 2
    ], -t.xRot / 180 * n1), c = h[0], y = h[1], p = Math.pow(c, 2) / Math.pow(a, 2) + Math.pow(y, 2) / Math.pow(o, 2);
    1 < p && (a *= Math.sqrt(p), o *= Math.sqrt(p)), t.rX = a, t.rY = o;
    var m = Math.pow(a, 2) * Math.pow(y, 2) + Math.pow(o, 2) * Math.pow(c, 2), O = (t.lArcFlag !== t.sweepFlag ? 1 : -1) * Math.sqrt(Math.max(0, (Math.pow(a, 2) * Math.pow(o, 2) - m) / m)), l = a * y / o * O, T = -o * c / a * O, v = i1([
        l,
        T
    ], t.xRot / 180 * n1);
    t.cX = v[0] + (r + s) / 2, t.cY = v[1] + (e + u) / 2, t.phi1 = Math.atan2((y - T) / o, (c - l) / a), t.phi2 = Math.atan2((-y - T) / o, (-c - l) / a), 0 === t.sweepFlag && t.phi2 > t.phi1 && (t.phi2 -= 2 * n1), 1 === t.sweepFlag && t.phi2 < t.phi1 && (t.phi2 += 2 * n1), t.phi1 *= 180 / n1, t.phi2 *= 180 / n1;
}
function s1(t, r, e) {
    a1(t, r, e);
    var i = t * t + r * r - e * e;
    if (0 > i) return [];
    if (0 === i) return [
        [
            t * e / (t * t + r * r),
            r * e / (t * t + r * r)
        ]
    ];
    var n = Math.sqrt(i);
    return [
        [
            (t * e + r * n) / (t * t + r * r),
            (r * e - t * n) / (t * t + r * r)
        ],
        [
            (t * e - r * n) / (t * t + r * r),
            (r * e + t * n) / (t * t + r * r)
        ]
    ];
}
var u1, h1 = Math.PI / 180;
function c1(t, r, e) {
    return (1 - e) * t + e * r;
}
function y1(t, r, e, i) {
    return t + Math.cos(i / 180 * n1) * r + Math.sin(i / 180 * n1) * e;
}
function p1(t2, r3, e3, i2) {
    var a2 = 0.000001, n = r3 - t2, o = e3 - r3, s = 3 * n + 3 * (i2 - e3) - 6 * o, u = 6 * (o - n), h = 3 * n;
    return Math.abs(s) < a2 ? [
        -h / u
    ] : (function(t, r, e) {
        void 0 === e && (e = 0.000001);
        var i = t * t / 4 - r;
        if (i < -e) return [];
        if (i <= e) return [
            -t / 2
        ];
        var a = Math.sqrt(i);
        return [
            -t / 2 - a,
            -t / 2 + a
        ];
    })(u / s, h / s, a2);
}
function m1(t, r, e, i, a) {
    var n = 1 - a;
    return t * (n * n * n) + r * (3 * n * n * a) + e * (3 * n * a * a) + i * (a * a * a);
}
!function(t3) {
    function r4() {
        return u2(function(t, r, e) {
            return t.relative && (void 0 !== t.x1 && (t.x1 += r), void 0 !== t.y1 && (t.y1 += e), void 0 !== t.x2 && (t.x2 += r), void 0 !== t.y2 && (t.y2 += e), void 0 !== t.x && (t.x += r), void 0 !== t.y && (t.y += e), t.relative = !1), t;
        });
    }
    function e4() {
        var t = NaN, r = NaN, e = NaN, i = NaN;
        return u2(function(a, n, o) {
            return a.type & _.SMOOTH_CURVE_TO && (a.type = _.CURVE_TO, t = isNaN(t) ? n : t, r = isNaN(r) ? o : r, a.x1 = a.relative ? n - t : 2 * n - t, a.y1 = a.relative ? o - r : 2 * o - r), a.type & _.CURVE_TO ? (t = a.relative ? n + a.x2 : a.x2, r = a.relative ? o + a.y2 : a.y2) : (t = NaN, r = NaN), a.type & _.SMOOTH_QUAD_TO && (a.type = _.QUAD_TO, e = isNaN(e) ? n : e, i = isNaN(i) ? o : i, a.x1 = a.relative ? n - e : 2 * n - e, a.y1 = a.relative ? o - i : 2 * o - i), a.type & _.QUAD_TO ? (e = a.relative ? n + a.x1 : a.x1, i = a.relative ? o + a.y1 : a.y1) : (e = NaN, i = NaN), a;
        });
    }
    function n2() {
        var t = NaN, r = NaN;
        return u2(function(e, i, a) {
            if (e.type & _.SMOOTH_QUAD_TO && (e.type = _.QUAD_TO, t = isNaN(t) ? i : t, r = isNaN(r) ? a : r, e.x1 = e.relative ? i - t : 2 * i - t, e.y1 = e.relative ? a - r : 2 * a - r), e.type & _.QUAD_TO) {
                t = e.relative ? i + e.x1 : e.x1, r = e.relative ? a + e.y1 : e.y1;
                var n = e.x1, o = e.y1;
                e.type = _.CURVE_TO, e.x1 = ((e.relative ? 0 : i) + 2 * n) / 3, e.y1 = ((e.relative ? 0 : a) + 2 * o) / 3, e.x2 = (e.x + 2 * n) / 3, e.y2 = (e.y + 2 * o) / 3;
            } else t = NaN, r = NaN;
            return e;
        });
    }
    function u2(t) {
        var r = 0, e = 0, i = NaN, a = NaN;
        return function(n) {
            if (isNaN(i) && !(n.type & _.MOVE_TO)) throw new Error("path must start with moveto");
            var o = t(n, r, e, i, a);
            return n.type & _.CLOSE_PATH && (r = i, e = a), void 0 !== n.x && (r = n.relative ? r + n.x : n.x), void 0 !== n.y && (e = n.relative ? e + n.y : n.y), n.type & _.MOVE_TO && (i = r, a = e), o;
        };
    }
    function O2(t4, r, e, i, n, o) {
        return a1(t4, r, e, i, n, o), u2(function(a, s, u, h) {
            var c = a.x1, y = a.x2, p = a.relative && !isNaN(h), m = void 0 !== a.x ? a.x : p ? 0 : s, O = void 0 !== a.y ? a.y : p ? 0 : u;
            function l(t) {
                return t * t;
            }
            a.type & _.HORIZ_LINE_TO && 0 !== r && (a.type = _.LINE_TO, a.y = a.relative ? 0 : u), a.type & _.VERT_LINE_TO && 0 !== e && (a.type = _.LINE_TO, a.x = a.relative ? 0 : s), void 0 !== a.x && (a.x = a.x * t4 + O * e + (p ? 0 : n)), void 0 !== a.y && (a.y = m * r + a.y * i + (p ? 0 : o)), void 0 !== a.x1 && (a.x1 = a.x1 * t4 + a.y1 * e + (p ? 0 : n)), void 0 !== a.y1 && (a.y1 = c * r + a.y1 * i + (p ? 0 : o)), void 0 !== a.x2 && (a.x2 = a.x2 * t4 + a.y2 * e + (p ? 0 : n)), void 0 !== a.y2 && (a.y2 = y * r + a.y2 * i + (p ? 0 : o));
            var T = t4 * i - r * e;
            if (void 0 !== a.xRot && (1 !== t4 || 0 !== r || 0 !== e || 1 !== i)) {
                if (0 === T) delete a.rX, delete a.rY, delete a.xRot, delete a.lArcFlag, delete a.sweepFlag, a.type = _.LINE_TO;
                else {
                    var v = a.xRot * Math.PI / 180, f = Math.sin(v), N = Math.cos(v), x = 1 / l(a.rX), d = 1 / l(a.rY), E = l(N) * x + l(f) * d, A = 2 * f * N * (x - d), C = l(f) * x + l(N) * d, M = E * i * i - A * r * i + C * r * r, R = A * (t4 * i + r * e) - 2 * (E * e * i + C * t4 * r), g = E * e * e - A * t4 * e + C * t4 * t4, I = (Math.atan2(R, M - g) + Math.PI) % Math.PI / 2, S = Math.sin(I), L = Math.cos(I);
                    a.rX = Math.abs(T) / Math.sqrt(M * l(L) + R * S * L + g * l(S)), a.rY = Math.abs(T) / Math.sqrt(M * l(S) - R * S * L + g * l(L)), a.xRot = 180 * I / Math.PI;
                }
            }
            return void 0 !== a.sweepFlag && 0 > T && (a.sweepFlag = +!a.sweepFlag), a;
        });
    }
    function l2() {
        return function(t) {
            var r = {
            };
            for(var e in t)r[e] = t[e];
            return r;
        };
    }
    t3.ROUND = function(t5) {
        function r5(r) {
            return Math.round(r * t5) / t5;
        }
        return void 0 === t5 && (t5 = 10000000000000), a1(t5), function(t) {
            return void 0 !== t.x1 && (t.x1 = r5(t.x1)), void 0 !== t.y1 && (t.y1 = r5(t.y1)), void 0 !== t.x2 && (t.x2 = r5(t.x2)), void 0 !== t.y2 && (t.y2 = r5(t.y2)), void 0 !== t.x && (t.x = r5(t.x)), void 0 !== t.y && (t.y = r5(t.y)), void 0 !== t.rX && (t.rX = r5(t.rX)), void 0 !== t.rY && (t.rY = r5(t.rY)), t;
        };
    }, t3.TO_ABS = r4, t3.TO_REL = function() {
        return u2(function(t, r, e) {
            return t.relative || (void 0 !== t.x1 && (t.x1 -= r), void 0 !== t.y1 && (t.y1 -= e), void 0 !== t.x2 && (t.x2 -= r), void 0 !== t.y2 && (t.y2 -= e), void 0 !== t.x && (t.x -= r), void 0 !== t.y && (t.y -= e), t.relative = !0), t;
        });
    }, t3.NORMALIZE_HVZ = function(t, r, e) {
        return void 0 === t && (t = !0), void 0 === r && (r = !0), void 0 === e && (e = !0), u2(function(i, a, n, o, s) {
            if (isNaN(o) && !(i.type & _.MOVE_TO)) throw new Error("path must start with moveto");
            return r && i.type & _.HORIZ_LINE_TO && (i.type = _.LINE_TO, i.y = i.relative ? 0 : n), e && i.type & _.VERT_LINE_TO && (i.type = _.LINE_TO, i.x = i.relative ? 0 : a), t && i.type & _.CLOSE_PATH && (i.type = _.LINE_TO, i.x = i.relative ? o - a : o, i.y = i.relative ? s - n : s), i.type & _.ARC && (0 === i.rX || 0 === i.rY) && (i.type = _.LINE_TO, delete i.rX, delete i.rY, delete i.xRot, delete i.lArcFlag, delete i.sweepFlag), i;
        });
    }, t3.NORMALIZE_ST = e4, t3.QT_TO_C = n2, t3.INFO = u2, t3.SANITIZE = function(t) {
        void 0 === t && (t = 0), a1(t);
        var r = NaN, e = NaN, i = NaN, n = NaN;
        return u2(function(a, o, s, u, h) {
            var c = Math.abs, y = !1, p = 0, m = 0;
            if (a.type & _.SMOOTH_CURVE_TO && (p = isNaN(r) ? 0 : o - r, m = isNaN(e) ? 0 : s - e), a.type & (_.CURVE_TO | _.SMOOTH_CURVE_TO) ? (r = a.relative ? o + a.x2 : a.x2, e = a.relative ? s + a.y2 : a.y2) : (r = NaN, e = NaN), a.type & _.SMOOTH_QUAD_TO ? (i = isNaN(i) ? o : 2 * o - i, n = isNaN(n) ? s : 2 * s - n) : a.type & _.QUAD_TO ? (i = a.relative ? o + a.x1 : a.x1, n = a.relative ? s + a.y1 : a.y2) : (i = NaN, n = NaN), a.type & _.LINE_COMMANDS || a.type & _.ARC && (0 === a.rX || 0 === a.rY || !a.lArcFlag) || a.type & _.CURVE_TO || a.type & _.SMOOTH_CURVE_TO || a.type & _.QUAD_TO || a.type & _.SMOOTH_QUAD_TO) {
                var O = void 0 === a.x ? 0 : a.relative ? a.x : a.x - o, l = void 0 === a.y ? 0 : a.relative ? a.y : a.y - s;
                p = isNaN(i) ? void 0 === a.x1 ? p : a.relative ? a.x : a.x1 - o : i - o, m = isNaN(n) ? void 0 === a.y1 ? m : a.relative ? a.y : a.y1 - s : n - s;
                var T = void 0 === a.x2 ? 0 : a.relative ? a.x : a.x2 - o, v = void 0 === a.y2 ? 0 : a.relative ? a.y : a.y2 - s;
                c(O) <= t && c(l) <= t && c(p) <= t && c(m) <= t && c(T) <= t && c(v) <= t && (y = !0);
            }
            return a.type & _.CLOSE_PATH && c(o - u) <= t && c(s - h) <= t && (y = !0), y ? [] : a;
        });
    }, t3.MATRIX = O2, t3.ROTATE = function(t, r, e) {
        void 0 === r && (r = 0), void 0 === e && (e = 0), a1(t, r, e);
        var i = Math.sin(t), n = Math.cos(t);
        return O2(n, i, -i, n, r - r * n + e * i, e - r * i - e * n);
    }, t3.TRANSLATE = function(t, r) {
        return void 0 === r && (r = 0), a1(t, r), O2(1, 0, 0, 1, t, r);
    }, t3.SCALE = function(t, r) {
        return void 0 === r && (r = t), a1(t, r), O2(t, 0, 0, r, 0, 0);
    }, t3.SKEW_X = function(t) {
        return a1(t), O2(1, 0, Math.atan(t), 1, 0, 0);
    }, t3.SKEW_Y = function(t) {
        return a1(t), O2(1, Math.atan(t), 0, 1, 0, 0);
    }, t3.X_AXIS_SYMMETRY = function(t) {
        return void 0 === t && (t = 0), a1(t), O2(-1, 0, 0, 1, t, 0);
    }, t3.Y_AXIS_SYMMETRY = function(t) {
        return void 0 === t && (t = 0), a1(t), O2(1, 0, 0, -1, 0, t);
    }, t3.A_TO_C = function() {
        return u2(function(t6, r6, e5) {
            return _.ARC === t6.type ? (function(t, r7, e6) {
                var a3, n3, s, u;
                t.cX || o1(t, r7, e6);
                for(var y = Math.min(t.phi1, t.phi2), p = Math.max(t.phi1, t.phi2) - y, m = Math.ceil(p / 90), O = new Array(m), l = r7, T = e6, v = 0; v < m; v++){
                    var f = c1(t.phi1, t.phi2, v / m), N = c1(t.phi1, t.phi2, (v + 1) / m), x = N - f, d = 4 / 3 * Math.tan(x * h1 / 4), E = [
                        Math.cos(f * h1) - d * Math.sin(f * h1),
                        Math.sin(f * h1) + d * Math.cos(f * h1)
                    ], A = E[0], C = E[1], M = [
                        Math.cos(N * h1),
                        Math.sin(N * h1)
                    ], R = M[0], g = M[1], I = [
                        R + d * Math.sin(N * h1),
                        g - d * Math.cos(N * h1)
                    ], S = I[0], L = I[1];
                    O[v] = {
                        relative: t.relative,
                        type: _.CURVE_TO
                    };
                    var H = function(r, e) {
                        var a = i1([
                            r * t.rX,
                            e * t.rY
                        ], t.xRot), n = a[0], o = a[1];
                        return [
                            t.cX + n,
                            t.cY + o
                        ];
                    };
                    a3 = H(A, C), O[v].x1 = a3[0], O[v].y1 = a3[1], n3 = H(S, L), O[v].x2 = n3[0], O[v].y2 = n3[1], s = H(R, g), O[v].x = s[0], O[v].y = s[1], t.relative && (O[v].x1 -= l, O[v].y1 -= T, O[v].x2 -= l, O[v].y2 -= T, O[v].x -= l, O[v].y -= T), l = (u = [
                        O[v].x,
                        O[v].y
                    ])[0], T = u[1];
                }
                return O;
            })(t6, t6.relative ? 0 : r6, t6.relative ? 0 : e5) : t6;
        });
    }, t3.ANNOTATE_ARCS = function() {
        return u2(function(t, r, e) {
            return t.relative && (r = 0, e = 0), _.ARC === t.type && o1(t, r, e), t;
        });
    }, t3.CLONE = l2, t3.CALCULATE_BOUNDS = function() {
        var t7 = function(t) {
            var r = {
            };
            for(var e in t)r[e] = t[e];
            return r;
        }, i3 = r4(), a = n2(), h = e4(), c = u2(function(r8, e7, n) {
            var u = h(a(i3(t7(r8))));
            function O(t) {
                t > c.maxX && (c.maxX = t), t < c.minX && (c.minX = t);
            }
            function l(t) {
                t > c.maxY && (c.maxY = t), t < c.minY && (c.minY = t);
            }
            if (u.type & _.DRAWING_COMMANDS && (O(e7), l(n)), u.type & _.HORIZ_LINE_TO && O(u.x), u.type & _.VERT_LINE_TO && l(u.y), u.type & _.LINE_TO && (O(u.x), l(u.y)), u.type & _.CURVE_TO) {
                O(u.x), l(u.y);
                for(var T = 0, v = p1(e7, u.x1, u.x2, u.x); T < v.length; T++)0 < (w = v[T]) && 1 > w && O(m1(e7, u.x1, u.x2, u.x, w));
                for(var f = 0, N = p1(n, u.y1, u.y2, u.y); f < N.length; f++)0 < (w = N[f]) && 1 > w && l(m1(n, u.y1, u.y2, u.y, w));
            }
            if (u.type & _.ARC) {
                O(u.x), l(u.y), o1(u, e7, n);
                for(var x = u.xRot / 180 * Math.PI, d = Math.cos(x) * u.rX, E = Math.sin(x) * u.rX, A = -Math.sin(x) * u.rY, C = Math.cos(x) * u.rY, M = u.phi1 < u.phi2 ? [
                    u.phi1,
                    u.phi2
                ] : -180 > u.phi2 ? [
                    u.phi2 + 360,
                    u.phi1 + 360
                ] : [
                    u.phi2,
                    u.phi1
                ], R = M[0], g = M[1], I = function(t) {
                    var r = t[0], e = t[1], i = 180 * Math.atan2(e, r) / Math.PI;
                    return i < R ? i + 360 : i;
                }, S = 0, L = s1(A, -d, 0).map(I); S < L.length; S++)(w = L[S]) > R && w < g && O(y1(u.cX, d, A, w));
                for(var H = 0, U = s1(C, -E, 0).map(I); H < U.length; H++){
                    var w;
                    (w = U[H]) > R && w < g && l(y1(u.cY, E, C, w));
                }
            }
            return r8;
        });
        return c.minX = 1 / 0, c.maxX = -1 / 0, c.minY = 1 / 0, c.maxY = -1 / 0, c;
    };
}(u1 || (u1 = {
}));
var O1, l1 = function() {
    function t8() {
    }
    return t8.prototype.round = function(t) {
        return this.transform(u1.ROUND(t));
    }, t8.prototype.toAbs = function() {
        return this.transform(u1.TO_ABS());
    }, t8.prototype.toRel = function() {
        return this.transform(u1.TO_REL());
    }, t8.prototype.normalizeHVZ = function(t, r, e) {
        return this.transform(u1.NORMALIZE_HVZ(t, r, e));
    }, t8.prototype.normalizeST = function() {
        return this.transform(u1.NORMALIZE_ST());
    }, t8.prototype.qtToC = function() {
        return this.transform(u1.QT_TO_C());
    }, t8.prototype.aToC = function() {
        return this.transform(u1.A_TO_C());
    }, t8.prototype.sanitize = function(t) {
        return this.transform(u1.SANITIZE(t));
    }, t8.prototype.translate = function(t, r) {
        return this.transform(u1.TRANSLATE(t, r));
    }, t8.prototype.scale = function(t, r) {
        return this.transform(u1.SCALE(t, r));
    }, t8.prototype.rotate = function(t, r, e) {
        return this.transform(u1.ROTATE(t, r, e));
    }, t8.prototype.matrix = function(t, r, e, i, a, n) {
        return this.transform(u1.MATRIX(t, r, e, i, a, n));
    }, t8.prototype.skewX = function(t) {
        return this.transform(u1.SKEW_X(t));
    }, t8.prototype.skewY = function(t) {
        return this.transform(u1.SKEW_Y(t));
    }, t8.prototype.xSymmetry = function(t) {
        return this.transform(u1.X_AXIS_SYMMETRY(t));
    }, t8.prototype.ySymmetry = function(t) {
        return this.transform(u1.Y_AXIS_SYMMETRY(t));
    }, t8.prototype.annotateArcs = function() {
        return this.transform(u1.ANNOTATE_ARCS());
    }, t8;
}(), T1 = function(t) {
    return " " === t || "\t" === t || "\r" === t || "\n" === t;
}, v1 = function(t) {
    return "0".charCodeAt(0) <= t.charCodeAt(0) && t.charCodeAt(0) <= "9".charCodeAt(0);
}, f1 = function(t9) {
    function e8() {
        var r = t9.call(this) || this;
        return r.curNumber = "", r.curCommandType = -1, r.curCommandRelative = !1, r.canParseCommandOrComma = !0, r.curNumberHasExp = !1, r.curNumberHasExpDigits = !1, r.curNumberHasDecimal = !1, r.curArgs = [], r;
    }
    return r1(e8, t9), e8.prototype.finish = function(t) {
        if (void 0 === t && (t = []), this.parse(" ", t), 0 !== this.curArgs.length || !this.canParseCommandOrComma) throw new SyntaxError("Unterminated command at the path end.");
        return t;
    }, e8.prototype.parse = function(t10, r) {
        var e = this;
        void 0 === r && (r = []);
        for(var i = function(t) {
            r.push(t), e.curArgs.length = 0, e.canParseCommandOrComma = !0;
        }, a = 0; a < t10.length; a++){
            var n = t10[a], o = !(this.curCommandType !== _.ARC || 3 !== this.curArgs.length && 4 !== this.curArgs.length || 1 !== this.curNumber.length || "0" !== this.curNumber && "1" !== this.curNumber), s = v1(n) && ("0" === this.curNumber && "0" === n || o);
            if (!v1(n) || s) {
                if ("e" !== n && "E" !== n) {
                    if ("-" !== n && "+" !== n || !this.curNumberHasExp || this.curNumberHasExpDigits) {
                        if ("." !== n || this.curNumberHasExp || this.curNumberHasDecimal || o) {
                            if (this.curNumber && -1 !== this.curCommandType) {
                                var u = Number(this.curNumber);
                                if (isNaN(u)) throw new SyntaxError("Invalid number ending at " + a);
                                if (this.curCommandType === _.ARC) {
                                    if (0 === this.curArgs.length || 1 === this.curArgs.length) {
                                        if (0 > u) throw new SyntaxError('Expected positive number, got "' + u + '" at index "' + a + '"');
                                    } else if ((3 === this.curArgs.length || 4 === this.curArgs.length) && "0" !== this.curNumber && "1" !== this.curNumber) throw new SyntaxError('Expected a flag, got "' + this.curNumber + '" at index "' + a + '"');
                                }
                                this.curArgs.push(u), this.curArgs.length === N1[this.curCommandType] && (_.HORIZ_LINE_TO === this.curCommandType ? i({
                                    type: _.HORIZ_LINE_TO,
                                    relative: this.curCommandRelative,
                                    x: u
                                }) : _.VERT_LINE_TO === this.curCommandType ? i({
                                    type: _.VERT_LINE_TO,
                                    relative: this.curCommandRelative,
                                    y: u
                                }) : this.curCommandType === _.MOVE_TO || this.curCommandType === _.LINE_TO || this.curCommandType === _.SMOOTH_QUAD_TO ? (i({
                                    type: this.curCommandType,
                                    relative: this.curCommandRelative,
                                    x: this.curArgs[0],
                                    y: this.curArgs[1]
                                }), _.MOVE_TO === this.curCommandType && (this.curCommandType = _.LINE_TO)) : this.curCommandType === _.CURVE_TO ? i({
                                    type: _.CURVE_TO,
                                    relative: this.curCommandRelative,
                                    x1: this.curArgs[0],
                                    y1: this.curArgs[1],
                                    x2: this.curArgs[2],
                                    y2: this.curArgs[3],
                                    x: this.curArgs[4],
                                    y: this.curArgs[5]
                                }) : this.curCommandType === _.SMOOTH_CURVE_TO ? i({
                                    type: _.SMOOTH_CURVE_TO,
                                    relative: this.curCommandRelative,
                                    x2: this.curArgs[0],
                                    y2: this.curArgs[1],
                                    x: this.curArgs[2],
                                    y: this.curArgs[3]
                                }) : this.curCommandType === _.QUAD_TO ? i({
                                    type: _.QUAD_TO,
                                    relative: this.curCommandRelative,
                                    x1: this.curArgs[0],
                                    y1: this.curArgs[1],
                                    x: this.curArgs[2],
                                    y: this.curArgs[3]
                                }) : this.curCommandType === _.ARC && i({
                                    type: _.ARC,
                                    relative: this.curCommandRelative,
                                    rX: this.curArgs[0],
                                    rY: this.curArgs[1],
                                    xRot: this.curArgs[2],
                                    lArcFlag: this.curArgs[3],
                                    sweepFlag: this.curArgs[4],
                                    x: this.curArgs[5],
                                    y: this.curArgs[6]
                                })), this.curNumber = "", this.curNumberHasExpDigits = !1, this.curNumberHasExp = !1, this.curNumberHasDecimal = !1, this.canParseCommandOrComma = !0;
                            }
                            if (!T1(n)) {
                                if ("," === n && this.canParseCommandOrComma) this.canParseCommandOrComma = !1;
                                else if ("+" !== n && "-" !== n && "." !== n) {
                                    if (s) this.curNumber = n, this.curNumberHasDecimal = !1;
                                    else {
                                        if (0 !== this.curArgs.length) throw new SyntaxError("Unterminated command at index " + a + ".");
                                        if (!this.canParseCommandOrComma) throw new SyntaxError('Unexpected character "' + n + '" at index ' + a + ". Command cannot follow comma");
                                        if (this.canParseCommandOrComma = !1, "z" !== n && "Z" !== n) {
                                            if ("h" === n || "H" === n) this.curCommandType = _.HORIZ_LINE_TO, this.curCommandRelative = "h" === n;
                                            else if ("v" === n || "V" === n) this.curCommandType = _.VERT_LINE_TO, this.curCommandRelative = "v" === n;
                                            else if ("m" === n || "M" === n) this.curCommandType = _.MOVE_TO, this.curCommandRelative = "m" === n;
                                            else if ("l" === n || "L" === n) this.curCommandType = _.LINE_TO, this.curCommandRelative = "l" === n;
                                            else if ("c" === n || "C" === n) this.curCommandType = _.CURVE_TO, this.curCommandRelative = "c" === n;
                                            else if ("s" === n || "S" === n) this.curCommandType = _.SMOOTH_CURVE_TO, this.curCommandRelative = "s" === n;
                                            else if ("q" === n || "Q" === n) this.curCommandType = _.QUAD_TO, this.curCommandRelative = "q" === n;
                                            else if ("t" === n || "T" === n) this.curCommandType = _.SMOOTH_QUAD_TO, this.curCommandRelative = "t" === n;
                                            else {
                                                if ("a" !== n && "A" !== n) throw new SyntaxError('Unexpected character "' + n + '" at index ' + a + ".");
                                                this.curCommandType = _.ARC, this.curCommandRelative = "a" === n;
                                            }
                                        } else r.push({
                                            type: _.CLOSE_PATH
                                        }), this.canParseCommandOrComma = !0, this.curCommandType = -1;
                                    }
                                } else this.curNumber = n, this.curNumberHasDecimal = "." === n;
                            }
                        } else this.curNumber += n, this.curNumberHasDecimal = !0;
                    } else this.curNumber += n;
                } else this.curNumber += n, this.curNumberHasExp = !0;
            } else this.curNumber += n, this.curNumberHasExpDigits = this.curNumberHasExp;
        }
        return r;
    }, e8.prototype.transform = function(t) {
        return Object.create(this, {
            parse: {
                value: function(r, e) {
                    void 0 === e && (e = []);
                    for(var i = 0, a = Object.getPrototypeOf(this).parse.call(this, r); i < a.length; i++){
                        var n = a[i], o = t(n);
                        Array.isArray(o) ? e.push.apply(e, o) : e.push(o);
                    }
                    return e;
                }
            }
        });
    }, e8;
}(l1), _ = function(t11) {
    function i4(r) {
        var e = t11.call(this) || this;
        return e.commands = "string" == typeof r ? i4.parse(r) : r, e;
    }
    return r1(i4, t11), i4.prototype.encode = function() {
        return i4.encode(this.commands);
    }, i4.prototype.getBounds = function() {
        var t = u1.CALCULATE_BOUNDS();
        return this.transform(t), t;
    }, i4.prototype.transform = function(t) {
        for(var r = [], e = 0, i = this.commands; e < i.length; e++){
            var a = t(i[e]);
            Array.isArray(a) ? r.push.apply(r, a) : r.push(a);
        }
        return this.commands = r, this;
    }, i4.encode = function(t) {
        return e1(t);
    }, i4.parse = function(t) {
        var r = new f1, e = [];
        return r.parse(t, e), r.finish(e), e;
    }, i4.CLOSE_PATH = 1, i4.MOVE_TO = 2, i4.HORIZ_LINE_TO = 4, i4.VERT_LINE_TO = 8, i4.LINE_TO = 16, i4.CURVE_TO = 32, i4.SMOOTH_CURVE_TO = 64, i4.QUAD_TO = 128, i4.SMOOTH_QUAD_TO = 256, i4.ARC = 512, i4.LINE_COMMANDS = i4.LINE_TO | i4.HORIZ_LINE_TO | i4.VERT_LINE_TO, i4.DRAWING_COMMANDS = i4.HORIZ_LINE_TO | i4.VERT_LINE_TO | i4.LINE_TO | i4.CURVE_TO | i4.SMOOTH_CURVE_TO | i4.QUAD_TO | i4.SMOOTH_QUAD_TO | i4.ARC, i4;
}(l1), N1 = ((O1 = {
})[_.MOVE_TO] = 2, O1[_.LINE_TO] = 2, O1[_.HORIZ_LINE_TO] = 1, O1[_.VERT_LINE_TO] = 1, O1[_.CLOSE_PATH] = 0, O1[_.QUAD_TO] = 4, O1[_.SMOOTH_QUAD_TO] = 2, O1[_.CURVE_TO] = 6, O1[_.SMOOTH_CURVE_TO] = 4, O1[_.ARC] = 7, O1);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dhZg0":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var redefine = require('../internals/redefine');
var anObject = require('../internals/an-object');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var $toString = require('../internals/to-string');
var fails = require('../internals/fails');
var regExpFlags = require('../internals/regexp-flags');
var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);
var NOT_GENERIC = fails(function() {
    return n$ToString.call({
        source: 'a',
        flags: 'b'
    }) != '/a/b';
});
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;
// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
}, {
    unsafe: true
});

},{"../internals/function-uncurry-this":"jJnXC","../internals/function-name":"6v6mP","../internals/redefine":"kxbj8","../internals/an-object":"1LIz9","../internals/object-is-prototype-of":"fyf1A","../internals/to-string":"4cTlm","../internals/fails":"8IfZQ","../internals/regexp-flags":"4QDzk"}],"7ZRL1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlurStack", ()=>BlurStack1
);
parcelHelpers.export(exports, "canvasRGB", ()=>processCanvasRGB
);
parcelHelpers.export(exports, "canvasRGBA", ()=>processCanvasRGBA
);
parcelHelpers.export(exports, "image", ()=>processImage
);
parcelHelpers.export(exports, "imageDataRGB", ()=>processImageDataRGB
);
parcelHelpers.export(exports, "imageDataRGBA", ()=>processImageDataRGBA
);
function _typeof(obj1) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
        return typeof obj;
    };
    else _typeof = function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return _typeof(obj1);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
/* eslint-disable no-bitwise -- used for calculations */ /* eslint-disable unicorn/prefer-query-selector -- aiming at
  backward-compatibility */ /**
* StackBlur - a fast almost Gaussian Blur For Canvas
*
* In case you find this class useful - especially in commercial projects -
* I am not totally unhappy for a small donation to my PayPal account
* mario@quasimondo.de
*
* Or support me on flattr:
* {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
*
* @module StackBlur
* @author Mario Klingemann
* Contact: mario@quasimondo.com
* Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
* Twitter: @quasimondo
*
* @copyright (c) 2010 Mario Klingemann
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/ var mulTable = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456,
    388,
    335,
    292,
    512,
    454,
    405,
    364,
    328,
    298,
    271,
    496,
    456,
    420,
    388,
    360,
    335,
    312,
    292,
    273,
    512,
    482,
    454,
    428,
    405,
    383,
    364,
    345,
    328,
    312,
    298,
    284,
    271,
    259,
    496,
    475,
    456,
    437,
    420,
    404,
    388,
    374,
    360,
    347,
    335,
    323,
    312,
    302,
    292,
    282,
    273,
    265,
    512,
    497,
    482,
    468,
    454,
    441,
    428,
    417,
    405,
    394,
    383,
    373,
    364,
    354,
    345,
    337,
    328,
    320,
    312,
    305,
    298,
    291,
    284,
    278,
    271,
    265,
    259,
    507,
    496,
    485,
    475,
    465,
    456,
    446,
    437,
    428,
    420,
    412,
    404,
    396,
    388,
    381,
    374,
    367,
    360,
    354,
    347,
    341,
    335,
    329,
    323,
    318,
    312,
    307,
    302,
    297,
    292,
    287,
    282,
    278,
    273,
    269,
    265,
    261,
    512,
    505,
    497,
    489,
    482,
    475,
    468,
    461,
    454,
    447,
    441,
    435,
    428,
    422,
    417,
    411,
    405,
    399,
    394,
    389,
    383,
    378,
    373,
    368,
    364,
    359,
    354,
    350,
    345,
    341,
    337,
    332,
    328,
    324,
    320,
    316,
    312,
    309,
    305,
    301,
    298,
    294,
    291,
    287,
    284,
    281,
    278,
    274,
    271,
    268,
    265,
    262,
    259,
    257,
    507,
    501,
    496,
    491,
    485,
    480,
    475,
    470,
    465,
    460,
    456,
    451,
    446,
    442,
    437,
    433,
    428,
    424,
    420,
    416,
    412,
    408,
    404,
    400,
    396,
    392,
    388,
    385,
    381,
    377,
    374,
    370,
    367,
    363,
    360,
    357,
    354,
    350,
    347,
    344,
    341,
    338,
    335,
    332,
    329,
    326,
    323,
    320,
    318,
    315,
    312,
    310,
    307,
    304,
    302,
    299,
    297,
    294,
    292,
    289,
    287,
    285,
    282,
    280,
    278,
    275,
    273,
    271,
    269,
    267,
    265,
    263,
    261,
    259
];
var shgTable = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24
];
/**
 * @param {string|HTMLImageElement} img
 * @param {string|HTMLCanvasElement} canvas
 * @param {Float} radius
 * @param {boolean} blurAlphaChannel
 * @param {boolean} useOffset
 * @param {boolean} skipStyles
 * @returns {undefined}
 */ function processImage(img, canvas, radius, blurAlphaChannel, useOffset, skipStyles) {
    if (typeof img === 'string') img = document.getElementById(img);
    if (!img || !('naturalWidth' in img)) return;
    var dimensionType = useOffset ? 'offset' : 'natural';
    var w = img[dimensionType + 'Width'];
    var h = img[dimensionType + 'Height'];
    if (typeof canvas === 'string') canvas = document.getElementById(canvas);
    if (!canvas || !('getContext' in canvas)) return;
    if (!skipStyles) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
    }
    canvas.width = w;
    canvas.height = h;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);
    if (isNaN(radius) || radius < 1) return;
    if (blurAlphaChannel) processCanvasRGBA(canvas, 0, 0, w, h, radius);
    else processCanvasRGB(canvas, 0, 0, w, h, radius);
}
/**
 * @param {string|HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @throws {Error|TypeError}
 * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
 */ function getImageDataFromCanvas(canvas, topX, topY, width, height) {
    if (typeof canvas === 'string') canvas = document.getElementById(canvas);
    if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");
    var context = canvas.getContext('2d');
    try {
        return context.getImageData(topX, topY, width, height);
    } catch (e) {
        throw new Error('unable to access image data: ' + e);
    }
}
/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */ function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;
    var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
    imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
    canvas.getContext('2d').putImageData(imageData, topX, topY);
}
/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */ function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
    var pixels = imageData.data;
    var div = 2 * radius + 1; // const w4 = width << 2;
    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    var stackStart = new BlurStack1();
    var stack = stackStart;
    var stackEnd;
    for(var i = 1; i < div; i++){
        stack = stack.next = new BlurStack1();
        if (i === radiusPlus1) stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null, stackOut = null, yw = 0, yi = 0;
    var mulSum = mulTable[radius];
    var shgSum = shgTable[radius];
    for(var y = 0; y < height; y++){
        stack = stackStart;
        var pr = pixels[yi], pg = pixels[yi + 1], pb = pixels[yi + 2], pa = pixels[yi + 3];
        for(var _i = 0; _i < radiusPlus1; _i++){
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }
        var rInSum = 0, gInSum = 0, bInSum = 0, aInSum = 0, rOutSum = radiusPlus1 * pr, gOutSum = radiusPlus1 * pg, bOutSum = radiusPlus1 * pb, aOutSum = radiusPlus1 * pa, rSum = sumFactor * pr, gSum = sumFactor * pg, bSum = sumFactor * pb, aSum = sumFactor * pa;
        for(var _i2 = 1; _i2 < radiusPlus1; _i2++){
            var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
            var r = pixels[p], g = pixels[p + 1], b = pixels[p + 2], a = pixels[p + 3];
            var rbs = radiusPlus1 - _i2;
            rSum += (stack.r = r) * rbs;
            gSum += (stack.g = g) * rbs;
            bSum += (stack.b = b) * rbs;
            aSum += (stack.a = a) * rbs;
            rInSum += r;
            gInSum += g;
            bInSum += b;
            aInSum += a;
            stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for(var x = 0; x < width; x++){
            var paInitial = aSum * mulSum >> shgSum;
            pixels[yi + 3] = paInitial;
            if (paInitial !== 0) {
                var _a2 = 255 / paInitial;
                pixels[yi] = (rSum * mulSum >> shgSum) * _a2;
                pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a2;
                pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a2;
            } else pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
            rSum -= rOutSum;
            gSum -= gOutSum;
            bSum -= bOutSum;
            aSum -= aOutSum;
            rOutSum -= stackIn.r;
            gOutSum -= stackIn.g;
            bOutSum -= stackIn.b;
            aOutSum -= stackIn.a;
            var _p = x + radius + 1;
            _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
            rInSum += stackIn.r = pixels[_p];
            gInSum += stackIn.g = pixels[_p + 1];
            bInSum += stackIn.b = pixels[_p + 2];
            aInSum += stackIn.a = pixels[_p + 3];
            rSum += rInSum;
            gSum += gInSum;
            bSum += bInSum;
            aSum += aInSum;
            stackIn = stackIn.next;
            var _stackOut = stackOut, _r = _stackOut.r, _g = _stackOut.g, _b = _stackOut.b, _a = _stackOut.a;
            rOutSum += _r;
            gOutSum += _g;
            bOutSum += _b;
            aOutSum += _a;
            rInSum -= _r;
            gInSum -= _g;
            bInSum -= _b;
            aInSum -= _a;
            stackOut = stackOut.next;
            yi += 4;
        }
        yw += width;
    }
    for(var _x = 0; _x < width; _x++){
        yi = _x << 2;
        var _pr = pixels[yi], _pg = pixels[yi + 1], _pb = pixels[yi + 2], _pa = pixels[yi + 3], _rOutSum = radiusPlus1 * _pr, _gOutSum = radiusPlus1 * _pg, _bOutSum = radiusPlus1 * _pb, _aOutSum = radiusPlus1 * _pa, _rSum = sumFactor * _pr, _gSum = sumFactor * _pg, _bSum = sumFactor * _pb, _aSum = sumFactor * _pa;
        stack = stackStart;
        for(var _i3 = 0; _i3 < radiusPlus1; _i3++){
            stack.r = _pr;
            stack.g = _pg;
            stack.b = _pb;
            stack.a = _pa;
            stack = stack.next;
        }
        var yp = width;
        var _gInSum = 0, _bInSum = 0, _aInSum = 0, _rInSum = 0;
        for(var _i4 = 1; _i4 <= radius; _i4++){
            yi = yp + _x << 2;
            var _rbs = radiusPlus1 - _i4;
            _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
            _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
            _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
            _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
            _rInSum += _pr;
            _gInSum += _pg;
            _bInSum += _pb;
            _aInSum += _pa;
            stack = stack.next;
            if (_i4 < heightMinus1) yp += width;
        }
        yi = _x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for(var _y = 0; _y < height; _y++){
            var _p2 = yi << 2;
            pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;
            if (_pa > 0) {
                _pa = 255 / _pa;
                pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
                pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
                pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
            } else pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
            _rSum -= _rOutSum;
            _gSum -= _gOutSum;
            _bSum -= _bOutSum;
            _aSum -= _aOutSum;
            _rOutSum -= stackIn.r;
            _gOutSum -= stackIn.g;
            _bOutSum -= stackIn.b;
            _aOutSum -= stackIn.a;
            _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
            _rSum += _rInSum += stackIn.r = pixels[_p2];
            _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
            _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
            _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
            stackIn = stackIn.next;
            _rOutSum += _pr = stackOut.r;
            _gOutSum += _pg = stackOut.g;
            _bOutSum += _pb = stackOut.b;
            _aOutSum += _pa = stackOut.a;
            _rInSum -= _pr;
            _gInSum -= _pg;
            _bInSum -= _pb;
            _aInSum -= _pa;
            stackOut = stackOut.next;
            yi += width;
        }
    }
    return imageData;
}
/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */ function processCanvasRGB(canvas, topX, topY, width, height, radius) {
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;
    var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
    imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
    canvas.getContext('2d').putImageData(imageData, topX, topY);
}
/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */ function processImageDataRGB(imageData, topX, topY, width, height, radius) {
    var pixels = imageData.data;
    var div = 2 * radius + 1; // const w4 = width << 2;
    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    var stackStart = new BlurStack1();
    var stack = stackStart;
    var stackEnd;
    for(var i = 1; i < div; i++){
        stack = stack.next = new BlurStack1();
        if (i === radiusPlus1) stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;
    var mulSum = mulTable[radius];
    var shgSum = shgTable[radius];
    var p, rbs;
    var yw = 0, yi = 0;
    for(var y = 0; y < height; y++){
        var pr = pixels[yi], pg = pixels[yi + 1], pb = pixels[yi + 2], rOutSum = radiusPlus1 * pr, gOutSum = radiusPlus1 * pg, bOutSum = radiusPlus1 * pb, rSum = sumFactor * pr, gSum = sumFactor * pg, bSum = sumFactor * pb;
        stack = stackStart;
        for(var _i5 = 0; _i5 < radiusPlus1; _i5++){
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }
        var rInSum = 0, gInSum = 0, bInSum = 0;
        for(var _i6 = 1; _i6 < radiusPlus1; _i6++){
            p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
            rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
            gSum += (stack.g = pg = pixels[p + 1]) * rbs;
            bSum += (stack.b = pb = pixels[p + 2]) * rbs;
            rInSum += pr;
            gInSum += pg;
            bInSum += pb;
            stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for(var x = 0; x < width; x++){
            pixels[yi] = rSum * mulSum >> shgSum;
            pixels[yi + 1] = gSum * mulSum >> shgSum;
            pixels[yi + 2] = bSum * mulSum >> shgSum;
            rSum -= rOutSum;
            gSum -= gOutSum;
            bSum -= bOutSum;
            rOutSum -= stackIn.r;
            gOutSum -= stackIn.g;
            bOutSum -= stackIn.b;
            p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
            rInSum += stackIn.r = pixels[p];
            gInSum += stackIn.g = pixels[p + 1];
            bInSum += stackIn.b = pixels[p + 2];
            rSum += rInSum;
            gSum += gInSum;
            bSum += bInSum;
            stackIn = stackIn.next;
            rOutSum += pr = stackOut.r;
            gOutSum += pg = stackOut.g;
            bOutSum += pb = stackOut.b;
            rInSum -= pr;
            gInSum -= pg;
            bInSum -= pb;
            stackOut = stackOut.next;
            yi += 4;
        }
        yw += width;
    }
    for(var _x2 = 0; _x2 < width; _x2++){
        yi = _x2 << 2;
        var _pr2 = pixels[yi], _pg2 = pixels[yi + 1], _pb2 = pixels[yi + 2], _rOutSum2 = radiusPlus1 * _pr2, _gOutSum2 = radiusPlus1 * _pg2, _bOutSum2 = radiusPlus1 * _pb2, _rSum2 = sumFactor * _pr2, _gSum2 = sumFactor * _pg2, _bSum2 = sumFactor * _pb2;
        stack = stackStart;
        for(var _i7 = 0; _i7 < radiusPlus1; _i7++){
            stack.r = _pr2;
            stack.g = _pg2;
            stack.b = _pb2;
            stack = stack.next;
        }
        var _rInSum2 = 0, _gInSum2 = 0, _bInSum2 = 0;
        for(var _i8 = 1, yp = width; _i8 <= radius; _i8++){
            yi = yp + _x2 << 2;
            _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
            _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
            _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
            _rInSum2 += _pr2;
            _gInSum2 += _pg2;
            _bInSum2 += _pb2;
            stack = stack.next;
            if (_i8 < heightMinus1) yp += width;
        }
        yi = _x2;
        stackIn = stackStart;
        stackOut = stackEnd;
        for(var _y2 = 0; _y2 < height; _y2++){
            p = yi << 2;
            pixels[p] = _rSum2 * mulSum >> shgSum;
            pixels[p + 1] = _gSum2 * mulSum >> shgSum;
            pixels[p + 2] = _bSum2 * mulSum >> shgSum;
            _rSum2 -= _rOutSum2;
            _gSum2 -= _gOutSum2;
            _bSum2 -= _bOutSum2;
            _rOutSum2 -= stackIn.r;
            _gOutSum2 -= stackIn.g;
            _bOutSum2 -= stackIn.b;
            p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
            _rSum2 += _rInSum2 += stackIn.r = pixels[p];
            _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
            _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
            stackIn = stackIn.next;
            _rOutSum2 += _pr2 = stackOut.r;
            _gOutSum2 += _pg2 = stackOut.g;
            _bOutSum2 += _pb2 = stackOut.b;
            _rInSum2 -= _pr2;
            _gInSum2 -= _pg2;
            _bInSum2 -= _pb2;
            stackOut = stackOut.next;
            yi += width;
        }
    }
    return imageData;
}
/**
 *
 */ var BlurStack1 = /**
 * Set properties.
 */ function BlurStack() {
    _classCallCheck(this, BlurStack);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["lE8I5"], null, "parcelRequirece68")

//# sourceMappingURL=index.es.26cae241.js.map
