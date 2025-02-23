/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/symbol-observable";
exports.ids = ["vendor-chunks/symbol-observable"];
exports.modules = {

/***/ "(ssr)/./node_modules/symbol-observable/lib/ponyfill.js":
/*!********************************************************!*\
  !*** ./node_modules/symbol-observable/lib/ponyfill.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n\tvalue: true\n}));\nexports[\"default\"] = symbolObservablePonyfill;\nfunction symbolObservablePonyfill(root) {\n\tvar result;\n\tvar _Symbol = root.Symbol;\n\n\tif (typeof _Symbol === 'function') {\n\t\tif (_Symbol.observable) {\n\t\t\tresult = _Symbol.observable;\n\t\t} else {\n\n\t\t\t// This just needs to be something that won't trample other user's Symbol.for use\n\t\t\t// It also will guide people to the source of their issues, if this is problematic.\n\t\t\t// META: It's a resource locator!\n\t\t\tresult = _Symbol['for']('https://github.com/benlesh/symbol-observable');\n\t\t\ttry {\n\t\t\t\t_Symbol.observable = result;\n\t\t\t} catch (err) {\n\t\t\t\t// Do nothing. In some environments, users have frozen `Symbol` for security reasons,\n\t\t\t\t// if it is frozen assigning to it will throw. In this case, we don't care, because\n\t\t\t\t// they will need to use the returned value from the ponyfill.\n\t\t\t}\n\t\t}\n\t} else {\n\t\tresult = '@@observable';\n\t}\n\n\treturn result;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuLXByby1uZXh0Ly4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9wb255ZmlsbC5qcz85MDFjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIFRoaXMganVzdCBuZWVkcyB0byBiZSBzb21ldGhpbmcgdGhhdCB3b24ndCB0cmFtcGxlIG90aGVyIHVzZXIncyBTeW1ib2wuZm9yIHVzZVxuXHRcdFx0Ly8gSXQgYWxzbyB3aWxsIGd1aWRlIHBlb3BsZSB0byB0aGUgc291cmNlIG9mIHRoZWlyIGlzc3VlcywgaWYgdGhpcyBpcyBwcm9ibGVtYXRpYy5cblx0XHRcdC8vIE1FVEE6IEl0J3MgYSByZXNvdXJjZSBsb2NhdG9yIVxuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbFsnZm9yJ10oJ2h0dHBzOi8vZ2l0aHViLmNvbS9iZW5sZXNoL3N5bWJvbC1vYnNlcnZhYmxlJyk7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Ly8gRG8gbm90aGluZy4gSW4gc29tZSBlbnZpcm9ubWVudHMsIHVzZXJzIGhhdmUgZnJvemVuIGBTeW1ib2xgIGZvciBzZWN1cml0eSByZWFzb25zLFxuXHRcdFx0XHQvLyBpZiBpdCBpcyBmcm96ZW4gYXNzaWduaW5nIHRvIGl0IHdpbGwgdGhyb3cuIEluIHRoaXMgY2FzZSwgd2UgZG9uJ3QgY2FyZSwgYmVjYXVzZVxuXHRcdFx0XHQvLyB0aGV5IHdpbGwgbmVlZCB0byB1c2UgdGhlIHJldHVybmVkIHZhbHVlIGZyb20gdGhlIHBvbnlmaWxsLlxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/symbol-observable/lib/ponyfill.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/symbol-observable/ponyfill.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/ponyfill.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/ponyfill */ \"(ssr)/./node_modules/symbol-observable/lib/ponyfill.js\");\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvcG9ueWZpbGwuanMiLCJtYXBwaW5ncyI6IkFBQUEsb0hBQTBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3Blbi1wcm8tbmV4dC8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9wb255ZmlsbC5qcz81ZmFjIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvcG9ueWZpbGwnKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/symbol-observable/ponyfill.js\n");

/***/ })

};
;