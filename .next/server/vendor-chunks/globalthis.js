"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/globalthis";
exports.ids = ["vendor-chunks/globalthis"];
exports.modules = {

/***/ "(ssr)/./node_modules/globalthis/implementation.js":
/*!***************************************************!*\
  !*** ./node_modules/globalthis/implementation.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = global;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9pbXBsZW1lbnRhdGlvbi5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYiIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW4tcHJvLW5leHQvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9pbXBsZW1lbnRhdGlvbi5qcz85YWNkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/globalthis/implementation.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/globalthis/index.js":
/*!******************************************!*\
  !*** ./node_modules/globalthis/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar defineProperties = __webpack_require__(/*! define-properties */ \"(ssr)/./node_modules/define-properties/index.js\");\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"(ssr)/./node_modules/globalthis/implementation.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"(ssr)/./node_modules/globalthis/polyfill.js\");\nvar shim = __webpack_require__(/*! ./shim */ \"(ssr)/./node_modules/globalthis/shim.js\");\n\nvar polyfill = getPolyfill();\n\nvar getGlobal = function () { return polyfill; };\n\ndefineProperties(getGlobal, {\n\tgetPolyfill: getPolyfill,\n\timplementation: implementation,\n\tshim: shim\n});\n\nmodule.exports = getGlobal;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYix1QkFBdUIsbUJBQU8sQ0FBQywwRUFBbUI7O0FBRWxELHFCQUFxQixtQkFBTyxDQUFDLDJFQUFrQjtBQUMvQyxrQkFBa0IsbUJBQU8sQ0FBQywrREFBWTtBQUN0QyxXQUFXLG1CQUFPLENBQUMsdURBQVE7O0FBRTNCOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3Blbi1wcm8tbmV4dC8uL25vZGVfbW9kdWxlcy9nbG9iYWx0aGlzL2luZGV4LmpzPzU1NTEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBzaGltID0gcmVxdWlyZSgnLi9zaGltJyk7XG5cbnZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cbnZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBwb2x5ZmlsbDsgfTtcblxuZGVmaW5lUHJvcGVydGllcyhnZXRHbG9iYWwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEdsb2JhbDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/globalthis/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/globalthis/polyfill.js":
/*!*********************************************!*\
  !*** ./node_modules/globalthis/polyfill.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"(ssr)/./node_modules/globalthis/implementation.js\");\n\nmodule.exports = function getPolyfill() {\n\tif (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {\n\t\treturn implementation;\n\t}\n\treturn global;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9wb2x5ZmlsbC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixxQkFBcUIsbUJBQU8sQ0FBQywyRUFBa0I7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW4tcHJvLW5leHQvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9wb2x5ZmlsbC5qcz9lNGQ5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ29iamVjdCcgfHwgIWdsb2JhbCB8fCBnbG9iYWwuTWF0aCAhPT0gTWF0aCB8fCBnbG9iYWwuQXJyYXkgIT09IEFycmF5KSB7XG5cdFx0cmV0dXJuIGltcGxlbWVudGF0aW9uO1xuXHR9XG5cdHJldHVybiBnbG9iYWw7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/globalthis/polyfill.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/globalthis/shim.js":
/*!*****************************************!*\
  !*** ./node_modules/globalthis/shim.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar define = __webpack_require__(/*! define-properties */ \"(ssr)/./node_modules/define-properties/index.js\");\nvar gOPD = __webpack_require__(/*! gopd */ \"(ssr)/./node_modules/gopd/index.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"(ssr)/./node_modules/globalthis/polyfill.js\");\n\nmodule.exports = function shimGlobal() {\n\tvar polyfill = getPolyfill();\n\tif (define.supportsDescriptors) {\n\t\tvar descriptor = gOPD(polyfill, 'globalThis');\n\t\tif (\n\t\t\t!descriptor\n\t\t\t|| (\n\t\t\t\tdescriptor.configurable\n\t\t\t\t&& (descriptor.enumerable || !descriptor.writable || globalThis !== polyfill)\n\t\t\t)\n\t\t) {\n\t\t\tObject.defineProperty(polyfill, 'globalThis', {\n\t\t\t\tconfigurable: true,\n\t\t\t\tenumerable: false,\n\t\t\t\tvalue: polyfill,\n\t\t\t\twritable: true\n\t\t\t});\n\t\t}\n\t} else if (typeof globalThis !== 'object' || globalThis !== polyfill) {\n\t\tpolyfill.globalThis = polyfill;\n\t}\n\treturn polyfill;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9zaGltLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGFBQWEsbUJBQU8sQ0FBQywwRUFBbUI7QUFDeEMsV0FBVyxtQkFBTyxDQUFDLGdEQUFNO0FBQ3pCLGtCQUFrQixtQkFBTyxDQUFDLCtEQUFZOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW4tcHJvLW5leHQvLi9ub2RlX21vZHVsZXMvZ2xvYmFsdGhpcy9zaGltLmpzPzFiMGQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1HbG9iYWwoKSB7XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdGlmIChkZWZpbmUuc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gZ09QRChwb2x5ZmlsbCwgJ2dsb2JhbFRoaXMnKTtcblx0XHRpZiAoXG5cdFx0XHQhZGVzY3JpcHRvclxuXHRcdFx0fHwgKFxuXHRcdFx0XHRkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZVxuXHRcdFx0XHQmJiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8ICFkZXNjcmlwdG9yLndyaXRhYmxlIHx8IGdsb2JhbFRoaXMgIT09IHBvbHlmaWxsKVxuXHRcdFx0KVxuXHRcdCkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHBvbHlmaWxsLCAnZ2xvYmFsVGhpcycsIHtcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0dmFsdWU6IHBvbHlmaWxsLFxuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAnb2JqZWN0JyB8fCBnbG9iYWxUaGlzICE9PSBwb2x5ZmlsbCkge1xuXHRcdHBvbHlmaWxsLmdsb2JhbFRoaXMgPSBwb2x5ZmlsbDtcblx0fVxuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/globalthis/shim.js\n");

/***/ })

};
;