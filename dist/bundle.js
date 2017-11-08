/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Position__ = __webpack_require__(2);


class Area {
    /**
     *
     * @param {string} name
     * @param {Position} position
     */
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    addAccess(area) {

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Area;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Area__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Access__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Position__ = __webpack_require__(2);




class Fabric {
    constructor() {

    }

    /**
     *
     * @param {string} name
     * @param {int} x
     * @param {int} y
     *
     * @returns {Area}
     */
    newArea(name, x, y) {
        return new __WEBPACK_IMPORTED_MODULE_0__Area__["a" /* Area */](name, this.newPosition(x, y))
    }

    /**
     *
     * @param {Area} a1
     * @param {Area} a2
     * @returns {Access}
     */
    newAccess(a1, a2) {
        return new __WEBPACK_IMPORTED_MODULE_1__Access__["a" /* Access */](a1, a2);
    }

    /**
     *
     * @param {int} x
     * @param {int} y
     *
     * @returns {Position}
     */
    newPosition(x, y) {
        return new __WEBPACK_IMPORTED_MODULE_2__Position__["a" /* Position */](x, y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fabric;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Position {
    /**
     *
     * @param {int} x
     * @param {int} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Area__ = __webpack_require__(0);


class Access {
    /**
     *
     * @param {Area} z1
     * @param {Area} z2
     */
    constructor(z1, z2) {
        this.z1 = z1;
        this.z1.addAccess(z2);
        this.z2 = z2;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Access;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Fabric__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__World__ = __webpack_require__(5);



(() => {
    const world = new __WEBPACK_IMPORTED_MODULE_1__World__["a" /* World */]();
    const fab = new __WEBPACK_IMPORTED_MODULE_0__Fabric__["a" /* Fabric */]();

    world.loadArea(fab);

    world.simulate();
})();


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Fabric__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Access__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Area__ = __webpack_require__(0);




class World {
    constructor() {
        this.areas = new Set();
        this.access = new Set();
    }

    /**
     *
     * @param {Fabric} fabric
     */
    loadArea(fabric) {
        const a1 = fabric.newArea('A0', 0, 0);
        const a2 = fabric.newArea('A1', 0, 1);

        this.addZone(a1);
        this.addZone(a2);
        const ac1 = fabric.newAccess(a1, a2);
        this.addAccess(fabric, ac1);
    }

    /**
     *
     * @param {Fabric} fabric
     * @param {Access} ac1
     */
    addAccess(fabric, ac1) {
        this.access.add(ac1);
        const ac2 = fabric.newAccess(ac1.z1, ac1.z2);
        this.access.add(ac2);
    }

    simulate() {

    }

    /**
     *
     * @param {Area} area
     */
    addZone(area) {
        this.areas.add(area);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = World;



/***/ })
/******/ ]);