// import { defineConfig } from "vite"
// import pugPlugin from "vite-plugin-pug"

// export default defineConfig({
//   plugins: [pugPlugin({ pretty: process.env.NODE_ENV !== "production" })],
//   base: "./"
// })
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _vite=require("vite"),_vitePluginPug=_interopRequireDefault(require("vite-plugin-pug"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default=(0,_vite.defineConfig)({plugins:[(0,_vitePluginPug.default)({pretty:"production"!==process.env.NODE_ENV})],base:"./"});exports.default=_default;