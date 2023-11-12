import Inspect from 'vite-plugin-inspect'
import {resolve} from 'path'

export default {
    plugin: [Inspect()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                lab: resolve(__dirname, 'lab/index.html')
            }
        }
    }
}

// "use strict";
// Object.defineProperty(
//     exports, "__esModule", { value: !0 }),
//     exports.default = void 0;
// var _vite = require("vite"),
//     _vitePluginPug = _interopRequireDefault(require("vite-plugin-pug"));

// function _interopRequireDefault(e) {
//     return e && e.__esModule ? e : { default: e }
// }
// var _default = (0, _vite.defineConfig)({
//     plugins: [(0, _vitePluginPug.default)(
//         {
//             pretty: "production" !== process.env.NODE_ENV
//         })
//     ],
//     base: "./src"
// });
// exports.default = _default;

// module.exports = {
//     root: 'src',
//     build: {
//       outDir: '../dist'
//     }
//   }