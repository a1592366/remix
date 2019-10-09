(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["project"] = factory();
	else
		root["project"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/project/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/readOnlyError.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/readOnlyError.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

module.exports = _readOnlyError;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/requestidlecallback/index.js":
/*!***************************************************!*\
  !*** ./node_modules/requestidlecallback/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function(){
	'use strict';
	var scheduleStart, throttleDelay, lazytimer, lazyraf;
	var root = typeof window != 'undefined' ?
		window :
		typeof global != undefined ?
			global :
			this || {};
	var requestAnimationFrame = root.cancelRequestAnimationFrame && root.requestAnimationFrame || setTimeout;
	var cancelRequestAnimationFrame = root.cancelRequestAnimationFrame || clearTimeout;
	var tasks = [];
	var runAttempts = 0;
	var isRunning = false;
	var remainingTime = 7;
	var minThrottle = 35;
	var throttle = 125;
	var index = 0;
	var taskStart = 0;
	var tasklength = 0;
	var IdleDeadline = {
		get didTimeout(){
			return false;
		},
		timeRemaining: function(){
			var timeRemaining = remainingTime - (Date.now() - taskStart);
			return timeRemaining < 0 ? 0 : timeRemaining;
		},
	};
	var setInactive = debounce(function(){
		remainingTime = 22;
		throttle = 66;
		minThrottle = 0;
	});

	function debounce(fn){
		var id, timestamp;
		var wait = 99;
		var check = function(){
			var last = (Date.now()) - timestamp;

			if (last < wait) {
				id = setTimeout(check, wait - last);
			} else {
				id = null;
				fn();
			}
		};
		return function(){
			timestamp = Date.now();
			if(!id){
				id = setTimeout(check, wait);
			}
		};
	}

	function abortRunning(){
		if(isRunning){
			if(lazyraf){
				cancelRequestAnimationFrame(lazyraf);
			}
			if(lazytimer){
				clearTimeout(lazytimer);
			}
			isRunning = false;
		}
	}

	function onInputorMutation(){
		if(throttle != 125){
			remainingTime = 7;
			throttle = 125;
			minThrottle = 35;

			if(isRunning) {
				abortRunning();
				scheduleLazy();
			}
		}
		setInactive();
	}

	function scheduleAfterRaf() {
		lazyraf = null;
		lazytimer = setTimeout(runTasks, 0);
	}

	function scheduleRaf(){
		lazytimer = null;
		requestAnimationFrame(scheduleAfterRaf);
	}

	function scheduleLazy(){

		if(isRunning){return;}
		throttleDelay = throttle - (Date.now() - taskStart);

		scheduleStart = Date.now();

		isRunning = true;

		if(minThrottle && throttleDelay < minThrottle){
			throttleDelay = minThrottle;
		}

		if(throttleDelay > 9){
			lazytimer = setTimeout(scheduleRaf, throttleDelay);
		} else {
			throttleDelay = 0;
			scheduleRaf();
		}
	}

	function runTasks(){
		var task, i, len;
		var timeThreshold = remainingTime > 9 ?
			9 :
			1
		;

		taskStart = Date.now();
		isRunning = false;

		lazytimer = null;

		if(runAttempts > 2 || taskStart - throttleDelay - 50 < scheduleStart){
			for(i = 0, len = tasks.length; i < len && IdleDeadline.timeRemaining() > timeThreshold; i++){
				task = tasks.shift();
				tasklength++;
				if(task){
					task(IdleDeadline);
				}
			}
		}

		if(tasks.length){
			scheduleLazy();
		} else {
			runAttempts = 0;
		}
	}

	function requestIdleCallbackShim(task){
		index++;
		tasks.push(task);
		scheduleLazy();
		return index;
	}

	function cancelIdleCallbackShim(id){
		var index = id - 1 - tasklength;
		if(tasks[index]){
			tasks[index] = null;
		}
	}

	if(!root.requestIdleCallback || !root.cancelIdleCallback){
		root.requestIdleCallback = requestIdleCallbackShim;
		root.cancelIdleCallback = cancelIdleCallbackShim;

		if(root.document && document.addEventListener){
			root.addEventListener('scroll', onInputorMutation, true);
			root.addEventListener('resize', onInputorMutation);

			document.addEventListener('focus', onInputorMutation, true);
			document.addEventListener('mouseover', onInputorMutation, true);
			['click', 'keypress', 'touchstart', 'mousedown'].forEach(function(name){
				document.addEventListener(name, onInputorMutation, {capture: true, passive: true});
			});

			if(root.MutationObserver){
				new MutationObserver( onInputorMutation ).observe( document.documentElement, {childList: true, subtree: true, attributes: true} );
			}
		}
	} else {
		try{
			root.requestIdleCallback(function(){}, {timeout: 0});
		} catch(e){
			(function(rIC){
				var timeRemainingProto, timeRemaining;
				root.requestIdleCallback = function(fn, timeout){
					if(timeout && typeof timeout.timeout == 'number'){
						return rIC(fn, timeout.timeout);
					}
					return rIC(fn);
				};
				if(root.IdleCallbackDeadline && (timeRemainingProto = IdleCallbackDeadline.prototype)){
					timeRemaining = Object.getOwnPropertyDescriptor(timeRemainingProto, 'timeRemaining');
					if(!timeRemaining || !timeRemaining.configurable || !timeRemaining.get){return;}
					Object.defineProperty(timeRemainingProto, 'timeRemaining', {
						value:  function(){
							return timeRemaining.get.call(this);
						},
						enumerable: true,
						configurable: true,
					});
				}
			})(root.requestIdleCallback)
		}
	}

	return {
		request: requestIdleCallbackShim,
		cancel: cancelIdleCallbackShim,
	};
}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/Application.js":
/*!***************************************!*\
  !*** ./src/components/Application.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Application; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react/Component */ "./src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/PropTypes */ "./src/react/PropTypes.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./View */ "./src/components/View.js");









var Application =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Application, _Component);

  function Application() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Application);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Application).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Application, [{
    key: "render",
    value: function render() {
      return React.createElement(_View__WEBPACK_IMPORTED_MODULE_7__["default"], null, this.props.children);
    }
  }]);

  return Application;
}(_react_Component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/components/TabBar.js":
/*!**********************************!*\
  !*** ./src/components/TabBar.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabBar; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/Component */ "./src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react/PropTypes */ "./src/react/PropTypes.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./View */ "./src/components/View.js");










var TabBarItem =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TabBarItem, _Component);

  function TabBarItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabBarItem);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TabBarItem).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabBarItem, [{
    key: "render",
    value: function render() {
      return React.createElement(_View__WEBPACK_IMPORTED_MODULE_8__["default"], null, this.props.children);
    }
  }]);

  return TabBarItem;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBarItem, "propTypes", {
  path: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  icon: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  selectedIcon: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  children: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string
});

var TabBar =
/*#__PURE__*/
function (_Component2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TabBar, _Component2);

  function TabBar() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabBar);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TabBar).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabBar, [{
    key: "render",
    value: function render() {
      return React.createElement(_View__WEBPACK_IMPORTED_MODULE_8__["default"], null, this.props.children);
    }
  }]);

  return TabBar;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBar, "TabBarItem", TabBarItem);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBar, "propTypes", {
  color: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  selectedColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  backgroundColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  borderStyle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].oneOf(['black', 'white']),
  position: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].oneOf(['bottom', 'top']),
  custom: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBar, "defaultProps", {
  position: 'bottom',
  bottom: false
});



/***/ }),

/***/ "./src/components/View.js":
/*!********************************!*\
  !*** ./src/components/View.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return View; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/Component */ "./src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react/PropTypes */ "./src/react/PropTypes.js");







var _defineProperty2, _defineProperty3;




var View =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(View, _Component);

  function View() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, View);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(View).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(View, [{
    key: "render",
    value: function render() {
      return React.createElement("view", this.props.children, this.props.children);
    }
  }]);

  return View;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(View, "propTypes", (_defineProperty2 = {
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].object,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func,
  onClick: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func
}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "onPress", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "onTouchStart", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "onTouchMove", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "onTouchEnd", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].func), _defineProperty2));

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(View, "defaultProps", (_defineProperty3 = {
  style: null,
  className: null,
  onPress: null,
  onLongPress: null,
  onClick: null
}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "onPress", null), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "onTap", null), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "onTouchStart", null), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "onTouchMove", null), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "onTouchEnd", null), _defineProperty3));



/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! exports provided: Application, TabBar, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application */ "./src/components/Application.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _Application__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/components/View.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _View__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _TabBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabBar */ "./src/components/TabBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabBar", function() { return _TabBar__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/context/createLegacyContext.js":
/*!********************************************!*\
  !*** ./src/context/createLegacyContext.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createLegacyContext; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");
/* harmony import */ var _processChildContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processChildContext */ "./src/context/processChildContext.js");


function createLegacyContext() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _shared__WEBPACK_IMPORTED_MODULE_0__["EMPTY_CONTEXT"];
  var disableLegacyContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    disableLegacyContext: disableLegacyContext,
    previousContext: _shared__WEBPACK_IMPORTED_MODULE_0__["EMPTY_CONTEXT"],
    stack: [],
    index: -1,
    cursor: {
      current: context
    },
    pop: function pop(cursor, currentFiber) {
      if (this.index > -1) {
        var _this$stack$this$inde = this.stack[this.index],
            fiber = _this$stack$this$inde.fiber,
            current = _this$stack$this$inde.current;
        cursor.current = current;
        this.stack[this.index] = null;
        this.index--;
      }
    },
    push: function push(cursor, value, fiber) {
      this.stack[++this.index] = {
        current: cursor.current,
        fiber: fiber
      };
      cursor.current = value;
    },
    pushProvider: function pushProvider(workInProgress) {
      if (this.disableLegacyContext) {
        return false;
      } else {
        var instance = workInProgress.stateNode;
        var memoizedMergedChildContext = instance ? instance[_shared__WEBPACK_IMPORTED_MODULE_0__["MERGED_CHILD_CONTEXT"]] : _shared__WEBPACK_IMPORTED_MODULE_0__["EMPTY_CONTEXT"];
        this.previousContext = this.cursor.current;
        this.push(this.cursor, memoizedMergedChildContext, workInProgress);
      }
    },
    invalidateProvider: function invalidateProvider(workInProgress, Component, changed) {
      if (!context.disableLegacyContext) {
        var instance = workInProgress.stateNode;

        if (changed) {
          var mergedContext = Object(_processChildContext__WEBPACK_IMPORTED_MODULE_1__["default"])(workInProgress, Component, this.previousContext);
          instance[_shared__WEBPACK_IMPORTED_MODULE_0__["MERGED_CHILD_CONTEXT"]] = mergedContext;
          this.pop(this.cursor, workInProgress);
          this.push(this.cursor, mergedContext, workInProgress);
        }
      }
    }
  };
}

/***/ }),

/***/ "./src/context/getMaskedContext.js":
/*!*****************************************!*\
  !*** ./src/context/getMaskedContext.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMaskedContext; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/context/index.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");


function getMaskedContext(workInProgress, unmaskedContext) {
  if (_index__WEBPACK_IMPORTED_MODULE_0__["default"].disableLegacyContext) {
    return _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_CONTEXT"];
  }

  var type = workInProgress.type;
  var contextTypes = type.contextTypes;

  if (!contextTypes) {
    return _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_CONTEXT"];
  }

  var instance = workInProgress.stateNode;

  if (instance) {
    var mergedContext = instance[_shared__WEBPACK_IMPORTED_MODULE_1__["MERGED_CHILD_CONTEXT"]];

    if (instance[_shared__WEBPACK_IMPORTED_MODULE_1__["MERGED_CHILD_CONTEXT"]] === unmaskedContext) {
      return mergedContext;
    }
  }

  var ctx = {};

  for (var contextKey in contextTypes) {
    ctx[contextKey] = unmaskedContext[contextKey];
  }

  if (instance) {
    if (!_index__WEBPACK_IMPORTED_MODULE_0__["default"].disableLegacyContext) {
      instance[_shared__WEBPACK_IMPORTED_MODULE_1__["MERGED_CHILD_CONTEXT"]] = ctx;
    }
  }

  return ctx;
}

/***/ }),

/***/ "./src/context/getUnmaskedContext.js":
/*!*******************************************!*\
  !*** ./src/context/getUnmaskedContext.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUnmaskedContext; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/context/index.js");



function getUnmaskedContext(workInProgress, Component) {
  if (_index__WEBPACK_IMPORTED_MODULE_2__["default"].disableLegacyContext) {
    return _shared__WEBPACK_IMPORTED_MODULE_0__["EMPTY_CONTEXT"];
  } else {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isContextProvider"])(Component)) {
      return _index__WEBPACK_IMPORTED_MODULE_2__["default"].previousContext;
    }

    return _index__WEBPACK_IMPORTED_MODULE_2__["contextCursor"].current;
  }
}

/***/ }),

/***/ "./src/context/index.js":
/*!******************************!*\
  !*** ./src/context/index.js ***!
  \******************************/
/*! exports provided: default, contextCursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextCursor", function() { return contextCursor; });
/* harmony import */ var _createLegacyContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createLegacyContext */ "./src/context/createLegacyContext.js");

var context = Object(_createLegacyContext__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ __webpack_exports__["default"] = (context);
var contextCursor = context.cursor;

/***/ }),

/***/ "./src/context/processChildContext.js":
/*!********************************************!*\
  !*** ./src/context/processChildContext.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return processChildContext; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context */ "./src/context/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



function processChildContext(workInProgress, type, parentContext) {
  if (!_context__WEBPACK_IMPORTED_MODULE_2__["default"].disableLegacyContext) {
    var instance = workInProgress.stateNode;
    var childContextTypes = type.childContextTypes;

    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(instance.getChildContext)) {
      return parentContext;
    }

    var _context = instance.getChildContext();

    return _objectSpread({}, parentContext, {}, _context);
  } else {
    return parentContext;
  }
}

/***/ }),

/***/ "./src/context/pushHostRootContext.js":
/*!********************************************!*\
  !*** ./src/context/pushHostRootContext.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/document/Element.js":
/*!*********************************!*\
  !*** ./src/document/Element.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_2__);




var Element = function Element() {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Element);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "uuid", uuid_v4__WEBPACK_IMPORTED_MODULE_2___default()());

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "tagName", null);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "nodeType", null);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "child", null);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "return", null);
};



/***/ }),

/***/ "./src/document/HTMLBodyElement.js":
/*!*****************************************!*\
  !*** ./src/document/HTMLBodyElement.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLBodyElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "./src/document/HTMLElement.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "./src/shared/HTMLNodeType.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./document */ "./src/document/document.js");











var HTMLBodyElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HTMLBodyElement, _HTMLElement);

  function HTMLBodyElement() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLBodyElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HTMLBodyElement)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "tagName", 'body');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "nodeType", _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_8__["ELEMENT_NODE"]);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HTMLBodyElement, [{
    key: "ownerDocument",
    get: function get() {
      return _document__WEBPACK_IMPORTED_MODULE_9__["default"];
    }
  }]);

  return HTMLBodyElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);



/***/ }),

/***/ "./src/document/HTMLElement.js":
/*!*************************************!*\
  !*** ./src/document/HTMLElement.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Element */ "./src/document/Element.js");







var HTMLElement =
/*#__PURE__*/
function (_Element) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HTMLElement, _Element);

  function HTMLElement() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLElement);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HTMLElement).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HTMLElement, [{
    key: "appendChild",
    value: function appendChild() {}
  }, {
    key: "removeChild",
    value: function removeChild() {}
  }, {
    key: "getAttribute",
    value: function getAttribute() {}
  }, {
    key: "setAttribute",
    value: function setAttribute() {}
  }, {
    key: "removeAttribute",
    value: function removeAttribute() {}
  }, {
    key: "addEventListener",
    value: function addEventListener() {}
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }, {
    key: "toString",
    value: function toString() {
      return "[object HTML".concat(this.tagName, "Element]");
    }
  }]);

  return HTMLElement;
}(_Element__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/document/HTMLTextElement.js":
/*!*****************************************!*\
  !*** ./src/document/HTMLTextElement.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLTextElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Element */ "./src/document/Element.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "./src/shared/HTMLNodeType.js");









var HTMLTextElement =
/*#__PURE__*/
function (_Element) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HTMLTextElement, _Element);

  function HTMLTextElement() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLTextElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLTextElement)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "nodeType", _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__["TEXT_NODE"]);

    return _this;
  }

  return HTMLTextElement;
}(_Element__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/document/createContainer.js":
/*!*****************************************!*\
  !*** ./src/document/createContainer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createContainer; });
function createContainer() {}

/***/ }),

/***/ "./src/document/createElement.js":
/*!***************************************!*\
  !*** ./src/document/createElement.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement */ "./src/document/HTMLElement.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "./src/shared/HTMLNodeType.js");


function createElement(tagName, properties) {
  var element = new _HTMLElement__WEBPACK_IMPORTED_MODULE_0__["default"](tagName);
  element.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_NODE"];
  return element;
}

/***/ }),

/***/ "./src/document/createTextNode.js":
/*!****************************************!*\
  !*** ./src/document/createTextNode.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTextNode; });
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLTextElement */ "./src/document/HTMLTextElement.js");

function createTextNode(text) {}

/***/ }),

/***/ "./src/document/document.js":
/*!**********************************!*\
  !*** ./src/document/document.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLBodyElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLBodyElement */ "./src/document/HTMLBodyElement.js");
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ "./src/document/createElement.js");
/* harmony import */ var _createTextNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createTextNode */ "./src/document/createTextNode.js");
/* harmony import */ var _createContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createContainer */ "./src/document/createContainer.js");




/* harmony default export */ __webpack_exports__["default"] = (typeof document === 'undefined' ? {
  body: new _HTMLBodyElement__WEBPACK_IMPORTED_MODULE_0__["default"](),
  getElementById: function getElementById(id) {
    return Object(_createContainer__WEBPACK_IMPORTED_MODULE_3__["default"])('container');
  },
  getElementsByTagName: function getElementsByTagName() {},
  querySelector: function querySelector() {},
  addEventListener: function addEventListener(type, callback, capture) {
    debugger;
  },
  removeEventListener: function removeEventListener() {
    debugger;
  },
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_1__["default"],
  createTextNode: _createTextNode__WEBPACK_IMPORTED_MODULE_2__["default"]
} : document);

/***/ }),

/***/ "./src/document/index.js":
/*!*******************************!*\
  !*** ./src/document/index.js ***!
  \*******************************/
/*! exports provided: document */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "./src/document/document.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "document", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/event/ensureListeningTo.js":
/*!****************************************!*\
  !*** ./src/event/ensureListeningTo.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ensureListeningTo; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "./src/shared/HTMLNodeType.js");
/* harmony import */ var _listenTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listenTo */ "./src/event/listenTo.js");


function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentOrFragment = rootContainerElement.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT_NODE"] || rootContainerElement.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT_FRAGMENT_NODE"];
  var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  Object(_listenTo__WEBPACK_IMPORTED_MODULE_1__["default"])(registrationName, doc);
}

/***/ }),

/***/ "./src/event/listenTo.js":
/*!*******************************!*\
  !*** ./src/event/listenTo.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listenTo; });
function listenTo() {}

/***/ }),

/***/ "./src/event/registrationNameModules.js":
/*!**********************************************!*\
  !*** ./src/event/registrationNameModules.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./src/project/index.js":
/*!******************************!*\
  !*** ./src/project/index.js ***!
  \******************************/
/*! exports provided: default, getApplicationContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MiniProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApplicationContext", function() { return getApplicationContext; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react */ "./src/react/index.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderer */ "./src/renderer/index.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../document */ "./src/document/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../router */ "./src/router/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_router__WEBPACK_IMPORTED_MODULE_7__);









var MiniProgram =
/*#__PURE__*/
function () {
  function MiniProgram(Application, container) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MiniProgram);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "getApplicationContext", function () {});

    MiniProgram.context = this;
    this.renderApplication(Application, container);
    this.getApplicationContext(this.rendered);
    this.getApplicationInstance();
    this.registerApplication();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MiniProgram, [{
    key: "renderApplication",
    value: function renderApplication(Application, container) {
      this.rendered = Object(_renderer__WEBPACK_IMPORTED_MODULE_4__["render"])(Object(_react__WEBPACK_IMPORTED_MODULE_3__["createElement"])(Application), container || _document__WEBPACK_IMPORTED_MODULE_5__["document"].body);
    }
  }, {
    key: "registerApplication",
    value: function registerApplication() {
      if (typeof App === 'function') {
        var instance = this.instance;
        App({
          onLaunch: function onLaunch() {
            instance.runtime.postMessage({
              level: 'application',
              type: 'event',
              data: {}
            });
          },
          onError: function onError() {
            instance.runtime.postMessage({});
          }
        });
      }
    }
  }, {
    key: "getApplicationInstance",
    value: function (_getApplicationInstance) {
      function getApplicationInstance() {
        return _getApplicationInstance.apply(this, arguments);
      }

      getApplicationInstance.toString = function () {
        return _getApplicationInstance.toString();
      };

      return getApplicationInstance;
    }(function () {
      this.instance = getApplicationInstance();
    })
  }, {
    key: "json",
    value: function json() {
      return {
        tabBar: this.tabBar,
        router: this.router,
        application: {
          configutations: this.application.configutations
        }
      };
    }
  }]);

  return MiniProgram;
}();


var getApplicationContext = function getApplicationContext() {
  return MiniProgram.context;
};

/***/ }),

/***/ "./src/react/Children.js":
/*!*******************************!*\
  !*** ./src/react/Children.js ***!
  \*******************************/
/*! exports provided: map, forEach, count, only, toArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "only", function() { return only; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");


function map(children, iterate, context) {
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(children)) {
    return children;
  }

  children = toArray(children);

  if (context && context !== children) {
    iterate = iterate.bind(context);
  }

  return children.map(iterate);
}
function forEach(children, iterate, context) {
  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(children)) {
    children = toArray(children);
    var length = children.length;

    if (length > 0) {
      if (context && context !== children) {
        iterate = iterate.bind(context);
      }

      for (var i = 0; i < lenght; i++) {
        var child = isInvalid(children[i]) ? null : children[i];
        iterate(child, i, children);
      }
    }
  }
}
function count(children) {
  children = toArray(children);
  return children.length;
}
function only(children) {
  children = toArray(children);

  if (children.length !== 1) {
    throw new Error('Children.only() expects only one child.');
  }

  return children[0];
}
function toArray(children) {
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(children)) {
    return _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_ARRAY"];
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isArray"])(children)) {
    return flatten(children);
  }

  return _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_ARRAY"].concat(children);
}

/***/ }),

/***/ "./src/react/Component.js":
/*!********************************!*\
  !*** ./src/react/Component.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");





var Component =
/*#__PURE__*/
function () {
  function Component(props, context, updater) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Component);

    if (!this.state) {
      this.state = {};
    }

    this.props = props || {};
    this.context = context || _shared__WEBPACK_IMPORTED_MODULE_3__["EMPTY_OBJECT"];
    this.refs = {};
    this.updater = updater;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Component, [{
    key: "setState",
    value: function setState(state) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _shared__WEBPACK_IMPORTED_MODULE_3__["noop"];
      this.updater.enqueueSetState(this, state, callback);
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate(callback) {
      this.updater.enqueueForceUpdate(this, callback);
    }
  }, {
    key: "render",
    value: function render() {
      throw new Error("React Component render must be implatate");
    }
  }]);

  return Component;
}();


Component.prototype.isReactComponent = _shared__WEBPACK_IMPORTED_MODULE_3__["EMPTY_OBJECT"];

/***/ }),

/***/ "./src/react/PropTypes.js":
/*!********************************!*\
  !*** ./src/react/PropTypes.js ***!
  \********************************/
/*! exports provided: PropTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return PropTypes; });
var shim = function shim() {
  return shim;
};

shim.isRequired = shim;
var PropTypes = {
  array: shim,
  bool: shim,
  func: shim,
  number: shim,
  object: shim,
  string: shim,
  any: shim,
  arrayOf: shim,
  element: shim,
  instanceOf: shim,
  node: shim,
  objectOf: shim,
  oneOf: shim,
  oneOfType: shim,
  shape: shim,
  exact: shim,
  PropTypes: {},
  checkPropTypes: shim
};
PropTypes.PropTypes = PropTypes;

/* harmony default export */ __webpack_exports__["default"] = (PropTypes);

/***/ }),

/***/ "./src/react/PureComponent.js":
/*!************************************!*\
  !*** ./src/react/PureComponent.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component */ "./src/react/Component.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");










var PureComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(PureComponent, _Component);

  function PureComponent() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PureComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(PureComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "isPureComponent", true);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PureComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !Object(_shared__WEBPACK_IMPORTED_MODULE_8__["shallowEqual"])(this.props, nextProps) || !Object(_shared__WEBPACK_IMPORTED_MODULE_8__["shallowEqual"])(this.state, nextState);
    }
  }]);

  return PureComponent;
}(_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PureComponent);

/***/ }),

/***/ "./src/react/ReactCurrentOwner.js":
/*!****************************************!*\
  !*** ./src/react/ReactCurrentOwner.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  current: null,
  currentDispatcher: null
});

/***/ }),

/***/ "./src/react/ReactCurrentRootInstance.js":
/*!***********************************************!*\
  !*** ./src/react/ReactCurrentRootInstance.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  current: null
});

/***/ }),

/***/ "./src/react/ReactElement.js":
/*!***********************************!*\
  !*** ./src/react/ReactElement.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactElement; });
/* harmony import */ var _shared_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/elementTypes */ "./src/shared/elementTypes.js");

function ReactElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var owner = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var element = {
    $$typeof: _shared_elementTypes__WEBPACK_IMPORTED_MODULE_0__["REACT_ELEMENT_TYPE"],
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  return element;
}

/***/ }),

/***/ "./src/react/cloneElement.js":
/*!***********************************!*\
  !*** ./src/react/cloneElement.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cloneElement; });
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactElement */ "./src/react/ReactElement.js");

function cloneElement(element, props) {
  return Object(_ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"])(element.type, key, ref, self, source, owner, props);
}

/***/ }),

/***/ "./src/react/createElement.js":
/*!************************************!*\
  !*** ./src/react/createElement.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactElement */ "./src/react/ReactElement.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "./src/shared/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var length = children.length;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(type)) {
    props = Object(_shared__WEBPACK_IMPORTED_MODULE_3__["resolveDefaultProps"])(type, props);
  }

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];
    }
  }

  return Object(_ReactElement__WEBPACK_IMPORTED_MODULE_1__["default"])(type, _objectSpread({}, props));
}

/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/*! exports provided: Children, Component, PureComponent, createElement, cloneElement, useState, PropTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Children */ "./src/react/Children.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _Children__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component */ "./src/react/Component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _Component__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _PureComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PureComponent */ "./src/react/PureComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return _PureComponent__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createElement */ "./src/react/createElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return _createElement__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _cloneElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cloneElement */ "./src/react/cloneElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return _cloneElement__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _useState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useState */ "./src/react/useState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return _useState__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _PropTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PropTypes */ "./src/react/PropTypes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return _PropTypes__WEBPACK_IMPORTED_MODULE_6__["default"]; });









/* harmony default export */ __webpack_exports__["default"] = ({
  Children: _Children__WEBPACK_IMPORTED_MODULE_0__,
  Component: _Component__WEBPACK_IMPORTED_MODULE_1__["default"],
  PureComponent: _PureComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_3__["default"],
  cloneElement: _cloneElement__WEBPACK_IMPORTED_MODULE_4__["default"],
  useState: _useState__WEBPACK_IMPORTED_MODULE_5__["default"],
  PropTypes: _PropTypes__WEBPACK_IMPORTED_MODULE_6__["default"]
});

/***/ }),

/***/ "./src/react/useState.js":
/*!*******************************!*\
  !*** ./src/react/useState.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useState; });
/* harmony import */ var _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentOwner */ "./src/react/ReactCurrentOwner.js");

function useState(state) {
  _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__["default"];
  debugger;
  return [state, function setState() {}];
}

/***/ }),

/***/ "./src/reconciler/ChildrenReconciler.js":
/*!**********************************************!*\
  !*** ./src/reconciler/ChildrenReconciler.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChildrenReconciler; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reconciler/FiberNode */ "./src/reconciler/FiberNode.js");
/* harmony import */ var _shared_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/elementTypes */ "./src/shared/elementTypes.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/effectTags */ "./src/shared/effectTags.js");






function ChildrenReconciler(shouldTrackSideEffects) {
  function reconcileSingleTextElement(returnFiber, currentFirstChild, textContent) {
    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(currentFirstChild) && currentFirstChild.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["HOST_TEXT"]) {
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent);
      existing["return"] = returnFiber;
      return existing;
    }

    deleteRemainingChildren(returnFiber, currentFirstChild);
    var fiber = Object(_reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_1__["createFiberFromText"])(textContent);
    fiber["return"] = returnFiber;
    return fiber;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, newChild) {
    var key = newChild.key,
        type = newChild.type;
    var child = currentFirstChild;

    while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(child)) {
      if (child.key === key) {
        if (child.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["FRAGMENT"] ? element.type === _shared_elementTypes__WEBPACK_IMPORTED_MODULE_2__["REACT_FRAGMENT_TYPE"] : child.elementType === newChild.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, newChild.type === _shared_elementTypes__WEBPACK_IMPORTED_MODULE_2__["REACT_FRAGMENT_TYPE"] ? newChild.props.children : newChild.props);
          existing.ref = coerceRef(returnFiber, child, newChild);
          existing["return"] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }

      child = child.sibling;
    }

    if (type === _shared_elementTypes__WEBPACK_IMPORTED_MODULE_2__["REACT_FRAGMENT_TYPE"]) {
      var fiber = Object(_reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_1__["createFiberFromFragment"])(newChild.props.children, element.key);
      fiber["return"] = returnFiber;
      return fiber;
    } else {
      var _fiber = Object(_reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_1__["createFiberFromElement"])(newChild);

      _fiber["return"] = returnFiber;
      return _fiber;
    }
  }

  function placeSingleChild(fiber) {
    if (shouldTrackSideEffects && Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(fiber.alternate)) {
      fiber.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__["PLACEMENT"];
    }

    return fiber;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (shouldTrackSideEffects) {
      var _childToDelete = currentFirstChild;

      while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_childToDelete)) {
        deleteChild(returnFiber, _childToDelete);
        _childToDelete = _childToDelete.sibling;
      }

      return null;
    }
  }

  function coerceRef(returnFiber, current, element) {
    var mixedRef = element.ref;

    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(mixedRef) && !Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(mixedRef) && !isObject(mixedRef)) {
      if (element._owner) {
        var owner = element._owner;
        var instance;

        if (owner) {
          var ownerFiber = owner;
          instance = ownerFiber.stateNode;
        }

        var stringRef = String(mixedRef);

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current) && !Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current.ref) && Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(current.ref) && current.ref._stringRef === stringRef) {
          return current.ref;
        }

        var ref = function ref(value) {
          var refs = inst.refs;

          if (refs === EMPTY_REFS) {
            refs = inst.refs = {};
          }

          if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(value)) {
            delete refs[stringRef];
          } else {
            refs[stringRef] = value;
          }
        };

        ref._stringRef = stringRef;
        return ref;
      } else {// error
      }
    }

    return mixedRef;
  }

  function useFiber(fiber, pendingProps) {
    var clone = Object(_reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_1__["createWorkInProgress"])(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function deleteChild(returnFiber, child) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(last)) {
        last.nextEffect = child;
        returnFiber.lastEffect = child;
      } else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      }

      child.nextEffect = null;
      child.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__["DELETION"];
    }
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }

      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);

      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }

        break;
      }

      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }

      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);

        if (_newFiber === null) {
          continue;
        }

        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);

        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }

        previousNewFiber = _newFiber;
      }

      return resultingFirstChild;
    } // Add all children to a key map for quick lookups.


    var existingChildren = mapRemainingChildren(returnFiber, oldFiber); // Keep scanning and use the map to restore deleted items as moves.

    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);

      if (_newFiber2 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren["delete"](_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }

        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);

        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }

        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  return function reconcileChildren(returnFiber, currentFirstChild, newChild) {
    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNull"])(newChild)) {
      if (newChild.$$typeof) {
        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild));
      }
    }

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isString"])(newChild) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(newChild)) {
      return placeSingleChild(reconcileSingleTextElement(returnFiber, currentFirstChild, String(newChild)));
    }

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isArray"])(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}

/***/ }),

/***/ "./src/reconciler/FiberNode.js":
/*!*************************************!*\
  !*** ./src/reconciler/FiberNode.js ***!
  \*************************************/
/*! exports provided: createWorkInProgress, createFiberRoot, createFiberFromText, createFiberFromElement, createFiberFromTypeAndProps, createFiber, createFiberFromFragment, createFiberNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWorkInProgress", function() { return createWorkInProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberRoot", function() { return createFiberRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromText", function() { return createFiberFromText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromElement", function() { return createFiberFromElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromTypeAndProps", function() { return createFiberFromTypeAndProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiber", function() { return createFiber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromFragment", function() { return createFiberFromFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberNode", function() { return createFiberNode; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effectTags */ "./src/shared/effectTags.js");



function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(workInProgress)) {
    var tag = current.tag,
        key = current.key,
        type = current.type,
        elementType = current.elementType,
        stateNode = current.stateNode;
    workInProgress = createFiber(tag, pendingProps, key);
    workInProgress.elementType = elementType;
    workInProgress.type = type;
    workInProgress.stateNode = stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["NO_EFFECT"];
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  var child = current.child,
      memoizedProps = current.memoizedProps,
      memoizedState = current.memoizedState,
      updateQueue = current.updateQueue,
      sibling = current.sibling,
      status = current.status,
      index = current.index,
      ref = current.ref,
      contextDependencies = current.contextDependencies;
  workInProgress.status = status;
  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.updateQueue = updateQueue;
  workInProgress.contextDependencies = contextDependencies;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;
  return workInProgress;
}
function createFiberRoot(container) {
  var uninitializedFiber = createFiber(_shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"], null, null);
  var root = {
    containerInfo: container,
    current: uninitializedFiber,
    didError: false,
    finishedWork: null
  };
  uninitializedFiber.stateNode = root;
  return root;
}
function createFiberFromText(content) {
  var fiber = createFiber(_shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"], content, null);
  return fiber;
}
function createFiberFromElement(element) {
  var owner = null;
  owner = element._owner;
  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);
  return fiber;
}
function createFiberFromTypeAndProps(type, key, pendingProps, owner) {
  var tag = _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["INDETERMINATE_COMPONENT"]; // let resolvedType = type;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(type)) {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isComponentConstructor"])(type)) {
      tag = _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["CLASS_COMPONENT"]; // resolvedType = 
    }
  } else if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isString"])(type)) {
    tag = _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"];
  } else {}

  var fiber = createFiber(tag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = type;
  return fiber;
}
function createFiber(tag, pendingProps, key) {
  return new createFiberNode(tag, pendingProps, key);
}
function createFiberFromFragment(elements, key) {
  var fiber = createFiber(_shared_workTags__WEBPACK_IMPORTED_MODULE_1__["FRAGMENT"], elements, key);
  return fiber;
}
function createFiberNode(tag, pendingProps, key) {
  return {
    tag: tag,
    key: key,
    type: null,
    elementType: null,
    stateNode: null,
    "return": null,
    child: null,
    sibling: null,
    index: 0,
    ref: null,
    pendingProps: pendingProps,
    memoizedProps: null,
    memoizedState: null,
    effectTag: _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["NO_EFFECT"],
    nextEffect: null,
    firstEffect: null,
    lastEffect: null,
    alternate: null
  };
}

/***/ }),

/***/ "./src/reconciler/cloneChildFibers.js":
/*!********************************************!*\
  !*** ./src/reconciler/cloneChildFibers.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cloneChildFibers; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _FiberNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FiberNode */ "./src/reconciler/FiberNode.js");


function cloneChildFibers(current, workInProgress) {
  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(workInProgress.child)) {
    var child = workInProgress.child;
    var newChild = Object(_FiberNode__WEBPACK_IMPORTED_MODULE_1__["createWorkInProgress"])(child, child.pendingProps);
    workInProgress.child = newChild;
    newChild["return"] = workInProgress;

    while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(child.sibling)) {
      child = child.sibling;
      newChild = Object(_FiberNode__WEBPACK_IMPORTED_MODULE_1__["createWorkInProgress"])(child, child.pendingProps);
      newChild["return"] = workInProgress;
    }

    newChild.sibling = null;
  }
}

/***/ }),

/***/ "./src/reconciler/createContainer.js":
/*!*******************************************!*\
  !*** ./src/reconciler/createContainer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createContainer; });
/* harmony import */ var _FiberNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FiberNode */ "./src/reconciler/FiberNode.js");

function createContainer(container) {
  return Object(_FiberNode__WEBPACK_IMPORTED_MODULE_0__["createFiberRoot"])(container);
}

/***/ }),

/***/ "./src/reconciler/mountChildFibers.js":
/*!********************************************!*\
  !*** ./src/reconciler/mountChildFibers.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChildrenReconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChildrenReconciler */ "./src/reconciler/ChildrenReconciler.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_ChildrenReconciler__WEBPACK_IMPORTED_MODULE_0__["default"])(false));

/***/ }),

/***/ "./src/reconciler/reconcileChildFibers.js":
/*!************************************************!*\
  !*** ./src/reconciler/reconcileChildFibers.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChildrenReconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChildrenReconciler */ "./src/reconciler/ChildrenReconciler.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_ChildrenReconciler__WEBPACK_IMPORTED_MODULE_0__["default"])(true));

/***/ }),

/***/ "./src/reconciler/reconcileChildren.js":
/*!*********************************************!*\
  !*** ./src/reconciler/reconcileChildren.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reconcileChildren; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _mountChildFibers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mountChildFibers */ "./src/reconciler/mountChildFibers.js");
/* harmony import */ var _reconcileChildFibers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reconcileChildFibers */ "./src/reconciler/reconcileChildFibers.js");



function reconcileChildren(current, workInProgress, nextChild) {
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current)) {
    workInProgress.child = Object(_mountChildFibers__WEBPACK_IMPORTED_MODULE_1__["default"])(workInProgress, Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current) ? null : current.child, nextChild);
  } else {
    workInProgress.child = Object(_reconcileChildFibers__WEBPACK_IMPORTED_MODULE_2__["default"])(workInProgress, Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current) ? null : current.child, nextChild);
  }
}

/***/ }),

/***/ "./src/reconciler/updateContainer.js":
/*!*******************************************!*\
  !*** ./src/reconciler/updateContainer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateContainer; });
/* harmony import */ var _scheduler_scheduleRootUpdate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/scheduleRootUpdate */ "./src/scheduler/scheduleRootUpdate.js");

function updateContainer(element, root, callback) {
  var current = root.current;
  return Object(_scheduler_scheduleRootUpdate__WEBPACK_IMPORTED_MODULE_0__["default"])(current, element, callback);
}

/***/ }),

/***/ "./src/renderer/config/appendAllChildren.js":
/*!**************************************************!*\
  !*** ./src/renderer/config/appendAllChildren.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendAllChildren; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _appendInitialChild__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appendInitialChild */ "./src/renderer/config/appendInitialChild.js");



function appendAllChildren(instance, workInProgress) {
  var node = workInProgress.child;

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(node)) {
    if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"]) {
      Object(_appendInitialChild__WEBPACK_IMPORTED_MODULE_2__["default"])(instance, node.stateNode);
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["FundamentalComponent"]) {
      Object(_appendInitialChild__WEBPACK_IMPORTED_MODULE_2__["default"])(instance, node.stateNode.instance);
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"]) {// If we have a portal child, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(node.child)) {
      node.child["return"] = node;
      node = node.child;
      continue;
    }

    if (node === workInProgress) {
      return;
    }

    while (node.sibling === null) {
      if (node["return"] === null || node["return"] === workInProgress) {
        return;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;
  }
}

/***/ }),

/***/ "./src/renderer/config/appendChildToContainer.js":
/*!*******************************************************!*\
  !*** ./src/renderer/config/appendChildToContainer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendChildToContainer; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "./src/shared/HTMLNodeType.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");


function appendChildToContainer(container, child) {
  var parentNode;

  if (container.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["COMMENT_NODE"]) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }

  var reactRootContainer = container._reactRootContainer;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(reactRootContainer) && Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(parentNode.onclick)) {// trapClickOnNonInteractiveElement(parentNode);
  }
}

/***/ }),

/***/ "./src/renderer/config/appendInitialChild.js":
/*!***************************************************!*\
  !*** ./src/renderer/config/appendInitialChild.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendInitialChild; });
function appendInitialChild(parent, child) {
  parent.appendChild(child);
}

/***/ }),

/***/ "./src/renderer/config/createElement.js":
/*!**********************************************!*\
  !*** ./src/renderer/config/createElement.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "./src/shared/HTMLNodeType.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");



function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT_NODE"] ? rootContainerElement : rootContainerElement.ownerDocument;
}

function createElement(type, props, rootContainerElement) {
  var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  var element;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isString"])(props.is)) {
    element = ownerDocument.createElemeent(type, {
      is: props.is
    });
  } else {
    element = ownerDocument.createElemeent(type);
  }

  return element;
}

/***/ }),

/***/ "./src/renderer/config/createInstance.js":
/*!***********************************************!*\
  !*** ./src/renderer/config/createInstance.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createInstance; });
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "./src/renderer/config/createElement.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");



function createInstance(type, props, rootContainerInstance, context, workInProgress) {
  var children = props.children;
  var element = document.createElement(type, props, rootContainerInstance);
  element[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_INSTANCE_KEY"]] = workInProgress;
  element[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_EVENT_HANDLERS_KEY"]] = props;
  return element;
}

/***/ }),

/***/ "./src/renderer/config/properties.js":
/*!*******************************************!*\
  !*** ./src/renderer/config/properties.js ***!
  \*******************************************/
/*! exports provided: getProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProperty", function() { return getProperty; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);

var properties = {};
[['className', 'class']].forEach(function (_ref) {
  var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
      propertyName = _ref2[0],
      attributeName = _ref2[1];

  properties[propertyName] = createProperty(propertyName, null, attributeName);
});

function createProperty(propertyName, type, attributeName) {
  return {
    type: type,
    propertyName: propertyName,
    attributeName: attributeName
  };
}

function getProperty(name) {
  return properties[name];
}

/***/ }),

/***/ "./src/renderer/config/setDOMProperties.js":
/*!*************************************************!*\
  !*** ./src/renderer/config/setDOMProperties.js ***!
  \*************************************************/
/*! exports provided: default, setInnerHTML, setValueForStyles, setTextContent, setValueForProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setInitialDOMProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInnerHTML", function() { return setInnerHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValueForStyles", function() { return setValueForStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTextContent", function() { return setTextContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValueForProperty", function() { return setValueForProperty; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _event_ensureListeningTo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../event/ensureListeningTo */ "./src/event/ensureListeningTo.js");
/* harmony import */ var _event_registrationNameModules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../event/registrationNameModules */ "./src/event/registrationNameModules.js");
/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./properties */ "./src/renderer/config/properties.js");





function setInitialDOMProperties(tag, element, rootContainerElement, nextProps) {
  for (var propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      var nextProp = nextProps[propName];

      if (propName === _shared__WEBPACK_IMPORTED_MODULE_0__["STYLE"]) {
        if (nextProp) {
          Object.freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === _shared__WEBPACK_IMPORTED_MODULE_0__["DANGEROUSLY_SET_INNER_HTML"]) {
        var nextHtml = nextProp ? nextProp[_shared__WEBPACK_IMPORTED_MODULE_0__["HTML"]] : undefined;

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(nextHtml)) {
          setInnerHTML(element, nextHtml);
        }
      } else if (propName === _shared__WEBPACK_IMPORTED_MODULE_0__["CHILDREN"]) {
        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isString"])(nextProp)) {
          var canSetTextContent = tag !== 'textarea' || nextProp !== '';

          if (canSetTextContent) {
            setTextContent(element, nextProp);
          }
        } else if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(nextProp)) {
          setTextContent(element, String(nextProp));
        }
      } else if (_event_registrationNameModules__WEBPACK_IMPORTED_MODULE_3__["default"].hasOwnProperty(propName)) {
        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(nextProp)) {
          Object(_event_ensureListeningTo__WEBPACK_IMPORTED_MODULE_2__["default"])(rootContainerElement, propName);
        }
      } else if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(nextProp)) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}
function setInnerHTML() {}
function setValueForStyles(element, nextProp) {
  var style = element.style;

  for (var styleName in styles) {
    if (styles.hasOwnProperty(styleName)) {
      var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);

      if (styleName === _shared__WEBPACK_IMPORTED_MODULE_0__["STYLE_NAME_FLOAT"]) {
        styleName = 'cssFloat';
      }
    }

    style[styleName] = styleValue;
  }
}
function setTextContent(element, content) {
  element.innerText = content;
}
function setValueForProperty(element, propName, nextProp) {
  var property = Object(_properties__WEBPACK_IMPORTED_MODULE_4__["getProperty"])(propName);

  if (property) {
    element.setAttribute(property.attributeName, nextProp);
  }
}

/***/ }),

/***/ "./src/renderer/config/setInitialProperties.js":
/*!*****************************************************!*\
  !*** ./src/renderer/config/setInitialProperties.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setInitialProperties; });
/* harmony import */ var _setDOMProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setDOMProperties */ "./src/renderer/config/setDOMProperties.js");

function setInitialProperties(element, tag, nextProps, rootContainerInstance) {
  var props;

  switch (tag) {
    default:
      props = nextProps;
  }

  Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(tag, element, rootContainerInstance, props);
}

/***/ }),

/***/ "./src/renderer/config/updateDOMProperties.js":
/*!****************************************************!*\
  !*** ./src/renderer/config/updateDOMProperties.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateDOMProperties; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _setDOMProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setDOMProperties */ "./src/renderer/config/setDOMProperties.js");


function updateDOMProperties(element, updateQueue) {
  for (var i = 0; i < updateQueue.length; i += 2) {
    var propKey = updateQueue[i];
    var propValue = updateQueue[i + 1];

    if (propKey === _shared__WEBPACK_IMPORTED_MODULE_0__["STYLE"]) {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setValueForStyles"])(element, propValue);
    } else if (propKey === _shared__WEBPACK_IMPORTED_MODULE_0__["DANGEROUSLY_SET_INNER_HTML"]) {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setInnerHTML"])(element, propValue);
    } else if (propKey === _shared__WEBPACK_IMPORTED_MODULE_0__["CHILDREN"]) {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setTextContent"])(element, propValue);
    } else {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setValueForProperty"])(element, propKey, propValue, isCustomComponentTag);
    }
  }
}

/***/ }),

/***/ "./src/renderer/config/updateProperties.js":
/*!*************************************************!*\
  !*** ./src/renderer/config/updateProperties.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateProperties; });
/* harmony import */ var _updateDOMProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateDOMProperties */ "./src/renderer/config/updateDOMProperties.js");

function updateProperties(instance, updateQueue, tag, props, nextProps) {
  Object(_updateDOMProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, updateQueue);
}

/***/ }),

/***/ "./src/renderer/index.js":
/*!*******************************!*\
  !*** ./src/renderer/index.js ***!
  \*******************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _renderIntoContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderIntoContainer */ "./src/renderer/renderIntoContainer.js");

function render(element, container, callback) {
  return Object(_renderIntoContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(null, element, container, callback);
}
/* harmony default export */ __webpack_exports__["default"] = (render);

/***/ }),

/***/ "./src/renderer/renderIntoContainer.js":
/*!*********************************************!*\
  !*** ./src/renderer/renderIntoContainer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return renderIntoContainer; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reconciler_createContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reconciler/createContainer */ "./src/reconciler/createContainer.js");
/* harmony import */ var _reconciler_updateContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reconciler/updateContainer */ "./src/reconciler/updateContainer.js");
/* harmony import */ var _react_ReactCurrentRootInstance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../react/ReactCurrentRootInstance */ "./src/react/ReactCurrentRootInstance.js");






var ReactRoot =
/*#__PURE__*/
function () {
  function ReactRoot(container) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ReactRoot);

    this._internalRoot = Object(_reconciler_createContainer__WEBPACK_IMPORTED_MODULE_2__["default"])(container);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ReactRoot, [{
    key: "render",
    value: function render(element, callback) {
      Object(_reconciler_updateContainer__WEBPACK_IMPORTED_MODULE_3__["default"])(element, this._internalRoot, callback);
    }
  }]);

  return ReactRoot;
}();

function renderIntoContainer(parentComponent, element, container, callback) {
  var root = container._reactRootContainer || (container._reactRootContainer = new ReactRoot(container));
  _react_ReactCurrentRootInstance__WEBPACK_IMPORTED_MODULE_4__["default"].current = container;
  return root.render(element, callback);
}

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/scheduler/index.js":
/*!********************************!*\
  !*** ./src/scheduler/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  isRootRendering: false
});

/***/ }),

/***/ "./src/scheduler/scheduleRootUpdate.js":
/*!*********************************************!*\
  !*** ./src/scheduler/scheduleRootUpdate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return scheduleRootUpdate; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "./src/shared/is.js");
/* harmony import */ var _worker_scheduleWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worker/scheduleWork */ "./src/scheduler/worker/scheduleWork.js");
/* harmony import */ var _updater_enqueueUpdate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updater/enqueueUpdate */ "./src/scheduler/updater/enqueueUpdate.js");
/* harmony import */ var _updater_createUpdate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updater/createUpdate */ "./src/scheduler/updater/createUpdate.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./src/scheduler/index.js");





function scheduleRootUpdate(current, element, callback) {
  var update = Object(_updater_createUpdate__WEBPACK_IMPORTED_MODULE_3__["default"])();
  update.payload = {
    element: element
  };

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(callback)) {
    update.callback = callback;
  }

  _index__WEBPACK_IMPORTED_MODULE_4__["default"].isRootRendering = true;
  Object(_updater_enqueueUpdate__WEBPACK_IMPORTED_MODULE_2__["default"])(current, update);
  Object(_worker_scheduleWork__WEBPACK_IMPORTED_MODULE_1__["default"])(current, element);
}

/***/ }),

/***/ "./src/scheduler/updater/appendUpdateToQueue.js":
/*!******************************************************!*\
  !*** ./src/scheduler/updater/appendUpdateToQueue.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendUpdateToQueue; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");

function appendUpdateToQueue(queue, update) {
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(queue.lastUpdate)) {
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

/***/ }),

/***/ "./src/scheduler/updater/classComponentUpdater.js":
/*!********************************************************!*\
  !*** ./src/scheduler/updater/classComponentUpdater.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/updateTags */ "./src/shared/updateTags.js");
/* harmony import */ var _worker_scheduleWork__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../worker/scheduleWork */ "./src/scheduler/worker/scheduleWork.js");
/* harmony import */ var _createUpdate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createUpdate */ "./src/scheduler/updater/createUpdate.js");
/* harmony import */ var _enqueueUpdate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enqueueUpdate */ "./src/scheduler/updater/enqueueUpdate.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");






var classComponentUpdater = {
  isMounted: function isMounted(Component) {
    return instance._reactInternalFiber ? true : false;
  },
  enqueueSetState: function enqueueSetState(instance, payload, callback) {
    var fiber = instance._reactInternalFiber;
    var update = Object(_createUpdate__WEBPACK_IMPORTED_MODULE_3__["default"])();
    update.payload = payload;

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(callback)) {
      update.callback = callback;
    }

    fiber.status = _shared__WEBPACK_IMPORTED_MODULE_0__["WORKING"];
    Object(_enqueueUpdate__WEBPACK_IMPORTED_MODULE_4__["default"])(fiber, update);
    Object(_worker_scheduleWork__WEBPACK_IMPORTED_MODULE_2__["default"])(fiber);
  },
  enqueueReplaceState: function enqueueReplaceState(instance, payload, callback) {
    var fiber = instance[_shared__WEBPACK_IMPORTED_MODULE_0__["REACT_INTERNAL_FIBER"]];
    var update = Object(_createUpdate__WEBPACK_IMPORTED_MODULE_3__["default"])();
    update.tag = _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__["REPLACE_STATE"];
    update.payload = payload;

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(callback)) {
      update.callback = callback;
    }

    fiber.status = _shared__WEBPACK_IMPORTED_MODULE_0__["WORKING"];
    Object(_enqueueUpdate__WEBPACK_IMPORTED_MODULE_4__["default"])(fiber, update);
    Object(_worker_scheduleWork__WEBPACK_IMPORTED_MODULE_2__["default"])(fiber);
  },
  enqueueForceUpdate: function enqueueForceUpdate(instance, callback) {
    var fiber = instance[_shared__WEBPACK_IMPORTED_MODULE_0__["REACT_INTERNAL_FIBER"]];
    var update = Object(_createUpdate__WEBPACK_IMPORTED_MODULE_3__["default"])();
    update.tag = _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__["FORCE_UPDATE"];
    fiber.status = _shared__WEBPACK_IMPORTED_MODULE_0__["WORKING"];

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(callback)) {
      update.callback = callback;
    }

    Object(_enqueueUpdate__WEBPACK_IMPORTED_MODULE_4__["default"])(fiber, update);
    Object(_worker_scheduleWork__WEBPACK_IMPORTED_MODULE_2__["default"])(fiber);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (classComponentUpdater);

/***/ }),

/***/ "./src/scheduler/updater/cloneUpdateQueue.js":
/*!***************************************************!*\
  !*** ./src/scheduler/updater/cloneUpdateQueue.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cloneUpdateQueue; });
function cloneUpdateQueue(queue) {
  return {
    baseState: queue.baseState,
    firstUpdate: queue.firstUpdate,
    lastUpdate: queue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

/***/ }),

/***/ "./src/scheduler/updater/createUpdate.js":
/*!***********************************************!*\
  !*** ./src/scheduler/updater/createUpdate.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUpdate; });
/* harmony import */ var _shared_updateTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/updateTags */ "./src/shared/updateTags.js");

function createUpdate() {
  return {
    tag: _shared_updateTags__WEBPACK_IMPORTED_MODULE_0__["UPDATE_STATE"],
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}

/***/ }),

/***/ "./src/scheduler/updater/createUpdateQueue.js":
/*!****************************************************!*\
  !*** ./src/scheduler/updater/createUpdateQueue.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUpdateQueue; });
function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

/***/ }),

/***/ "./src/scheduler/updater/enqueueUpdate.js":
/*!************************************************!*\
  !*** ./src/scheduler/updater/enqueueUpdate.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return enqueueUpdate; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _createUpdateQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createUpdateQueue */ "./src/scheduler/updater/createUpdateQueue.js");
/* harmony import */ var _appendUpdateToQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appendUpdateToQueue */ "./src/scheduler/updater/appendUpdateToQueue.js");



function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  var firstQueue;
  var secondQueue;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(alternate)) {
    firstQueue = fiber.updateQueue;
    secondQueue = null;

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(firstQueue)) {
      firstQueue = Object(_createUpdateQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(fiber.memoizedState);
      fiber.updateQueue = firstQueue;
    }
  } else {
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue;
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(secondQueue) || firstQueue === secondQueue) {
    Object(_appendUpdateToQueue__WEBPACK_IMPORTED_MODULE_2__["default"])(firstQueue, update);
  } else {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(firstQueue.lastUpdate) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(secondQueue.lastUpdate)) {
      Object(_appendUpdateToQueue__WEBPACK_IMPORTED_MODULE_2__["default"])(firstQueue, update);
      Object(_appendUpdateToQueue__WEBPACK_IMPORTED_MODULE_2__["default"])(secondQueue, update);
    } else {
      Object(_appendUpdateToQueue__WEBPACK_IMPORTED_MODULE_2__["default"])(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}

/***/ }),

/***/ "./src/scheduler/updater/index.js":
/*!****************************************!*\
  !*** ./src/scheduler/updater/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  isForceUpdate: false
});

/***/ }),

/***/ "./src/scheduler/updater/mountIndeterminateComponent.js":
/*!**************************************************************!*\
  !*** ./src/scheduler/updater/mountIndeterminateComponent.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mountIndeterminateComponent; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reconciler/reconcileChildren */ "./src/reconciler/reconcileChildren.js");




function mountIndeterminateComponent(current, workInProgress, Component) {
  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current)) {
    current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"];
  }

  var nextProps = workInProgress.pendingProps;
  var context; // if (!disableLegacyContext) {
  //   var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
  //   context = getMaskedContext(workInProgress, unmaskedContext);
  // }
  // prepareToReadContext(workInProgress, renderExpirationTime);

  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PERFORMED_WORK"];
  workInProgress.tag = _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["FUNCTION_COMPONENT"]; // const children = Component(nextProps, context);
  // reconcileChildren(null, workInProgress, null);

  return workInProgress;
}

/***/ }),

/***/ "./src/scheduler/updater/processUpdateQueue.js":
/*!*****************************************************!*\
  !*** ./src/scheduler/updater/processUpdateQueue.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return processUpdateQueue; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _cloneUpdateQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cloneUpdateQueue */ "./src/scheduler/updater/cloneUpdateQueue.js");
/* harmony import */ var _shared_updateTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/updateTags */ "./src/shared/updateTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





function processUpdateQueue(workInProgress, queue, props, instance) {
  // copy queue
  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(workInProgress.alternate)) {
    if (queue === workInProgress.alternate.updateQueue) {
      queue = workInProgress.updateQueue = Object(_cloneUpdateQueue__WEBPACK_IMPORTED_MODULE_2__["default"])(queue);
    }
  }

  var update = queue.firstUpdate;
  var state = queue.baseState;

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(update)) {
    state = getStateFromUpdate(workInProgress, queue, update, state, props, instance);
    var callback = update.callback;

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(callback)) {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__["CALLBACK"];
      update.nextEffet = null;

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(queue.lastEffect)) {
        queue.firstEffect = queue.lastEffect = update;
      } else {
        queue.lastEffect.nextEffect = update;
        queue.lastEffect = update;
      }
    }

    update = update.next;
  }

  queue.firstUpdate = null;
  queue.lastUpdate = null;
  queue.baseState = state;
  workInProgress.memoizedState = state;
}

function getStateFromUpdate(workInProgress, queue, update, state, nextProps, instance) {
  var tag = update.tag;

  switch (tag) {
    case _shared_updateTags__WEBPACK_IMPORTED_MODULE_3__["UPDATE_STATE"]:
      {
        var payload = update.payload;
        var partialState;

        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(payload)) {
          partialState = payload.call(instance, state, nextProps);
        } else {
          partialState = payload;
        }

        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(partialState)) {
          return state;
        }

        return _objectSpread({}, state, {}, partialState);
      }
  }
}

/***/ }),

/***/ "./src/scheduler/updater/updateClassComponent.js":
/*!*******************************************************!*\
  !*** ./src/scheduler/updater/updateClassComponent.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateClassComponent; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _classComponentUpdater__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classComponentUpdater */ "./src/scheduler/updater/classComponentUpdater.js");
/* harmony import */ var _processUpdateQueue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./processUpdateQueue */ "./src/scheduler/updater/processUpdateQueue.js");
/* harmony import */ var _reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../reconciler/reconcileChildren */ "./src/reconciler/reconcileChildren.js");
/* harmony import */ var _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../react/ReactCurrentOwner */ "./src/react/ReactCurrentOwner.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../context */ "./src/context/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index */ "./src/scheduler/updater/index.js");
/* harmony import */ var _context_getUnmaskedContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../context/getUnmaskedContext */ "./src/context/getUnmaskedContext.js");
/* harmony import */ var _context_getMaskedContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../context/getMaskedContext */ "./src/context/getMaskedContext.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }













function constructClassInstance(workInProgress, Component, props) {
  var ctx = _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_CONTEXT"];

  if (!_context__WEBPACK_IMPORTED_MODULE_8__["default"].disableLegacyContext) {
    var unmaskedContext = Object(_context_getUnmaskedContext__WEBPACK_IMPORTED_MODULE_10__["default"])(workInProgress, Component, true);

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isLegacyContextConsumer"])(Component)) {
      ctx = Object(_context_getMaskedContext__WEBPACK_IMPORTED_MODULE_11__["default"])(workInProgress, unmaskedContext);
    } else {
      ctx = _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_CONTEXT"];
    }
  }

  var instance = new Component(props, ctx);

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(instance.state)) {
    workInProgress.memoizedState = null;
  } else {
    workInProgress.memoizedState = instance.state;
  }

  instance.updater = _classComponentUpdater__WEBPACK_IMPORTED_MODULE_4__["default"];
  workInProgress.stateNode = instance;
  instance[_shared__WEBPACK_IMPORTED_MODULE_1__["REACT_INTERNAL_FIBER"]] = workInProgress;
  return instance;
}

function mountClassInstance(workInProgress, Component, props) {
  var instance = workInProgress.stateNode;
  var hasContext = false;
  instance.props = props;
  instance.state = workInProgress.memoizedState;
  instance.refs = _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_OBJECT"]; // context

  var updateQueue = workInProgress.updateQueue;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(updateQueue)) {
    Object(_processUpdateQueue__WEBPACK_IMPORTED_MODULE_5__["default"])(workInProgress, updateQueue, props, instance);
    instance.state = workInProgress.memoizedState;
  }

  var getDerivedStateFromProps = Component.getDerivedStateFromProps;
  var isDerivedStateFunction = Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(getDerivedStateFromProps);

  if (isDerivedStateFunction) {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    instance.state = workInProgress.memoizedState;
  }

  var getSnapshotBeforeUpdate = instance.getSnapshotBeforeUpdate,
      UNSAFE_componentWillMount = instance.UNSAFE_componentWillMount,
      componentWillMount = instance.componentWillMount,
      componentDidMount = instance.componentDidMount;

  if (isDerivedStateFunction && !Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(getSnapshotBeforeUpdate) && (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(UNSAFE_componentWillMount) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(componentWillMount))) {
    callComponentWillMount(workInProgress, instance);
    updateQueue = workInProgress.updateQueue;

    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNull"])(updateQueue)) {
      Object(_processUpdateQueue__WEBPACK_IMPORTED_MODULE_5__["default"])(workInProgress, updateQueue, props, instance);
      instance.state = workInProgress.memoizedState;
    }
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(componentDidMount)) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["UPDATE"];
  }
}

function updateClassInstance(current, workInProgress, Component, nextProps) {
  var instance = workInProgress.stateNode;
  var props = workInProgress.memoizedProps;
  instance.props = workInProgress.type === workInProgress.elementType ? props : Object(_shared__WEBPACK_IMPORTED_MODULE_1__["resolveDefaultProps"])(workInProgress.type, props);
  var context = instance.context;
  var contextTypes = Component.contextTypes;
  var nextContext = _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_CONTEXT"];

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(contextTypes)) {
    nextContext = {};
  } else if (false) {}

  var getDerivedStateFromProps = Component.getDerivedStateFromProps;
  var hasNewLifecycles = Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(getDerivedStateFromProps) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.getSnapshotBeforeUpdate);

  if (!hasNewLifecycles) {
    callComponentWillReceiveProps(instance, nextProps, nextContext);
  }

  var state = workInProgress.memoizedState;
  var updateQueue = workInProgress.updateQueue;
  var newState = instance.state = state;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(updateQueue)) {
    Object(_processUpdateQueue__WEBPACK_IMPORTED_MODULE_5__["default"])(workInProgress, updateQueue, nextProps, instance);
    newState = workInProgress.memoizedState;
  }

  if (props === nextProps && state === newState) {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.componentDidUpdate)) {
      if (props !== current.memoizedProps || state !== current.memoizedState) {
        workInProgress.effectTag |= Update;
      }
    }

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.getSnapshotBeforeUpdate)) {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Snapshot;
      }
    }

    return false;
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(getDerivedStateFromProps)) {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = _index__WEBPACK_IMPORTED_MODULE_9__["default"].isForceUpdate || callShouldComponentUpdate(workInProgress, Component, props, nextProps, state, newState, nextContext);

  if (shouldUpdate) {
    var componentWillMount = instance.UNSAFE_componentWillMount || instance.componentWillMount;

    if (!hasNewLifecycles && Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(componentWillMount)) {
      componentWillMount.call(instance);
    }

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.componentDidMount)) {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["UPDATE"];
    }
  } else {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.componentDidMount)) {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["UPDATE"];
    }

    workInProgress.memoizedProps = nextProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = nextProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
}

function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext) {
  var instance = workInProgress.stateNode;
  var didCaptureError = workInProgress.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["DID_CAPTURE"] === _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["NO_EFFECT"];
  _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_7__["default"].current = workInProgress;
  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["PERFORMED_WORK"];
  var nextChildren;

  if (didCaptureError && !Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(Component.getDerivedStateFromError)) {} else {
    nextChildren = instance.render();
  }

  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["PERFORMED_WORK"];

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNull"])(current) && didCaptureError) {// 
  } else {
    Object(_reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_6__["default"])(current, workInProgress, nextChildren);
  }

  workInProgress.memoizedState = instance.state;

  if (hasContext) {
    _context__WEBPACK_IMPORTED_MODULE_8__["default"].invalidateProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function callShouldComponentUpdate(workInProgress, Component, props, nextProps, state, newState, nextContext) {
  var instance = workInProgress.stateNode;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.shouldComponentUpdate)) {
    var shouldUpdate = instance.shouldComponentUpdate(nextProps, newState, nextContext);
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !Object(_shared__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"])(props, nextProps) || !Object(_shared__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"])(state, newState);
  }

  return true;
}

function callComponentWillReceiveProps(instance, nextProps, nextContext) {
  var componentWillReceiveProps = instance.UNSAFE_componentWillReceiveProps || instance.componentWillReceiveProps;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(componentWillReceiveProps)) {
    var state = instance.state;
    componentWillReceiveProps.call(instance, instance.pendingProps, nextContext);

    if (instance.state !== state) {
      _classComponentUpdater__WEBPACK_IMPORTED_MODULE_4__["default"].enqueueReplaceState(instance, instance.state, null);
    }
  }
}

function callComponentWillMount(workInProgress, instance) {
  var state = instance.state;
  var componentWillMount = instance.UNSAFE_componentWillMount || instance.componentDidMount;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.componentWillMount)) {
    componentWillMount.call(instance);
  }

  if (state !== instance.state) {
    _classComponentUpdater__WEBPACK_IMPORTED_MODULE_4__["default"].enqueueReplaceState(instance, instance.state, null);
  }
}

function applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props) {
  var state = workInProgress.memoizedState;
  var partialState = getDerivedStateFromProps(props, state);
  workInProgress.memoizedState = Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(partialState) ? state : _objectSpread({}, state, {
    partialState: partialState
  });
  var updateQueue = workInProgress.updateQueue;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNull"])(updateQueue) && workInProgress.isNoWork) {
    updateQueue.baseState = workInProgress.memoizedState;
  }
}

function updateClassComponent(current, workInProgress) {
  var Component = workInProgress.type;
  var unresolvedProps = workInProgress.pendingProps;
  var resolvedProps = workInProgress.elementType === Component ? unresolvedProps : Object(_shared__WEBPACK_IMPORTED_MODULE_1__["resolveDefaultProps"])(Component, unresolvedProps);
  var instance = workInProgress.stateNode;
  var hasContext = false;
  var shouldUpdate;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isContextProvider"])(Component)) {
    hasContext = true;
    _context__WEBPACK_IMPORTED_MODULE_8__["default"].pushProvider(workInProgress);
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(instance)) {
    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(current)) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["PLACEMENT"];
    }

    constructClassInstance(workInProgress, Component, resolvedProps);
    mountClassInstance(workInProgress, Component, resolvedProps);
    shouldUpdate = true;
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, resolvedProps);
  }

  return finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext);
}

/***/ }),

/***/ "./src/scheduler/updater/updateFunctionComponent.js":
/*!**********************************************************!*\
  !*** ./src/scheduler/updater/updateFunctionComponent.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateFunctionComponent; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _reconciler_cloneChildFibers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reconciler/cloneChildFibers */ "./src/reconciler/cloneChildFibers.js");
/* harmony import */ var _reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../reconciler/reconcileChildren */ "./src/reconciler/reconcileChildren.js");





function updateFunctionComponent(current, workInProgress) {
  var Component = workInProgress.type;
  var unresolvedProps = workInProgress.pendingProps;
  var nextProps = Object(_shared__WEBPACK_IMPORTED_MODULE_1__["resolveDefaultProps"])(Component, unresolvedProps);
  var context; // todo  context;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(current)) {
    var props = current.memorizedProps;

    if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"])(props, nextProps) && current.ref === workInProgress.ref) {
      Object(_reconciler_cloneChildFibers__WEBPACK_IMPORTED_MODULE_3__["default"])(current, workInProgress);
      return workInProgress.child;
    }
  }

  var children = callFunctionComponent(Component, nextProps, context);
  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["PERFORMED_WORK"];
  Object(_reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_4__["default"])(current, workInProgress, children);
  return workInProgress.child;
}

function callFunctionComponent(Component, nextProps, context) {
  return Component(nextProps, context);
}

/***/ }),

/***/ "./src/scheduler/updater/updateHostComponent.js":
/*!******************************************************!*\
  !*** ./src/scheduler/updater/updateHostComponent.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateHostComponent; });
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reconciler/reconcileChildren */ "./src/reconciler/reconcileChildren.js");




function updateHostComponent(current, workInProgress) {
  // pushHostContext(workInProgress);
  var type = workInProgress.type;
  var nextProps = workInProgress.pendingProps;
  var props = !Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(current) ? current.memoizedProps : null;
  var nextChildren = nextProps.children;
  var isDirectTextChild = Object(_shared__WEBPACK_IMPORTED_MODULE_2__["shouldSetTextContent"])(type, nextProps);

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(props) && Object(_shared__WEBPACK_IMPORTED_MODULE_2__["shouldSetTextContent"])(type, props)) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["CONTENT_RESET"];
  }

  var ref = workInProgress.ref;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(current) && !Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(ref) || !Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(current) && current.ref !== ref) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["REF"];
  }

  Object(_reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_3__["default"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

/***/ }),

/***/ "./src/scheduler/updater/updateHostInstance.js":
/*!*****************************************************!*\
  !*** ./src/scheduler/updater/updateHostInstance.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateHostInstance; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_elementTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/elementTags */ "./src/shared/elementTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _event_registrationNameModules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../event/registrationNameModules */ "./src/event/registrationNameModules.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






function updateHostInstance(current, workInProgress, type, nextProps, rootContainerInstance) {
  var props = current.memoizedProps;

  if (props !== nextProps) {
    var instance = workInProgress.stateNode;
    var updatePayload = prepareUpdate(instance, type, props, nextProps, rootContainerInstance, null);
    workInProgress.updateQueue = updatePayload;
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_4__["UPDATE"];
  }
}

function prepareUpdate(element, type, props, nextProps, rootContainerInstance, hostContext) {
  return diffProperties(element, type, props, nextProps, rootContainerInstance);
}

function getInputHostProps(elements, props) {
  var node = elements;
  var checked = props.checked;
  return _objectSpread({}, props, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: undefined,
    checked: Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(checked) ? checked : node._wrapperState.initialChecked
  });
}

function getTextAreaHostProps(elements, props) {
  var node = elements;
  return _objectSpread({}, props, {
    value: undefined,
    defaultValue: undefined,
    children: String(node._wrapperState.initialValue)
  });
}

function diffProperties(elements, tag, lastRawProps, nextRawProps, rootContainerInstance) {
  var updatePayload = null;
  var lastProps;
  var nextProps;

  switch (tag) {
    case _shared_elementTags__WEBPACK_IMPORTED_MODULE_2__["INPUT"]:
      lastProps = getInputHostProps(elements, lastRawProps);
      nextProps = getInputHostProps(elements, nextRawProps);
      updatePayload = [];
      break;

    case _shared_elementTags__WEBPACK_IMPORTED_MODULE_2__["TEXTAREA"]:
      lastProps = getTextAreaHostProps(elements, lastRawProps);
      nextProps = getTextAreaHostProps(elements, nextRawProps);
      updatePayload = [];
      break;

    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps; // if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
      //   // TODO: This cast may not be sound for SVG, MathML or custom elements.
      //   trapClickOnNonInteractiveElement(domElement);
      // }

      break;
  }

  var propKey;
  var styleName;
  var styleUpdates = null;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(lastProps[propKey])) {
      continue;
    }

    if (propKey === _shared__WEBPACK_IMPORTED_MODULE_3__["STYLE"]) {
      var lastStyle = lastProps[propKey];

      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }

          styleUpdates[styleName] = '';
        }
      }
    } else if (_event_registrationNameModules__WEBPACK_IMPORTED_MODULE_5__["default"].hasOwnProperty(propKey)) {
      if (!updatePayload) {
        updatePayload = [];
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }

  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = !Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(lastProps) ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(nextProp) && Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(lastProp)) {
      continue;
    }

    if (propKey === _shared__WEBPACK_IMPORTED_MODULE_3__["STYLE"]) {
      if (nextProp) {
        Object.freeze(nextProp);
      }

      if (lastProp) {
        for (styleName in lastProp) {
          if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
            if (!styleUpdates) {
              styleUpdates = {};
            }

            styleUpdates[styleName] = '';
          }
        }

        for (styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
            if (!styleUpdates) {
              styleUpdates = {};
            }

            styleUpdates[styleName] = nextProp[styleName];
          }
        }
      } else {
        if (!styleUpdates) {
          if (!updatePayload) {
            updatePayload = [];
          }

          updatePayload.push(propKey, styleUpdates);
        }

        styleUpdates = nextProp;
      }
    } else if (propKey === _shared__WEBPACK_IMPORTED_MODULE_3__["DANGEROUSLY_SET_INNER_HTML"]) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      var lastHtml = lastProp ? lastProp[HTML] : undefined;

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(nextHtml)) {
        if (lastHtml !== nextHtml) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
        }
      }
    } else if (propKey === _shared__WEBPACK_IMPORTED_MODULE_3__["CHILDREN"]) {
      if (lastProp !== nextProp && (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isString"])(nextProp) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(nextProp))) {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
    } else if (_event_registrationNameModules__WEBPACK_IMPORTED_MODULE_5__["default"].hasOwnProperty(propKey)) {
      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(nextProp)) {
        ensureListeningTo(rootContainerInstance, propKey);
      }

      if (!updatePayload && lastProp !== nextProp) {
        updatePayload = [];
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }

  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(_shared__WEBPACK_IMPORTED_MODULE_3__["STYLE"], styleUpdates);
  }

  return updatePayload;
}

/***/ }),

/***/ "./src/scheduler/updater/updateHostRoot.js":
/*!*************************************************!*\
  !*** ./src/scheduler/updater/updateHostRoot.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateHostRoot; });
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _context_pushHostRootContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/pushHostRootContext */ "./src/context/pushHostRootContext.js");
/* harmony import */ var _context_pushHostRootContext__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_context_pushHostRootContext__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reconciler/reconcileChildren */ "./src/reconciler/reconcileChildren.js");
/* harmony import */ var _processUpdateQueue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./processUpdateQueue */ "./src/scheduler/updater/processUpdateQueue.js");
/* harmony import */ var _reconciler_cloneChildFibers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../reconciler/cloneChildFibers */ "./src/reconciler/cloneChildFibers.js");






function updateHostRoot(current, workInProgress) {
  // pushHostRootContext(workInProgress);
  var updateQueue = workInProgress.updateQueue;
  var pendingProps = workInProgress.pendingProps;
  var memoizedState = workInProgress.memoizedState;
  var children = !Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(memoizedState) ? memoizedState.element : null;
  Object(_processUpdateQueue__WEBPACK_IMPORTED_MODULE_4__["default"])(workInProgress, updateQueue, pendingProps, null);
  var nextState = workInProgress.memoizedState;
  var nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  Object(_reconciler_reconcileChildren__WEBPACK_IMPORTED_MODULE_3__["default"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function bailoutOnAlreadyFinishedWork(current, workInProgress) {
  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(current)) {
    workInProgress.firstContextDependency = current.firstContextDependency;
  }

  Object(_reconciler_cloneChildFibers__WEBPACK_IMPORTED_MODULE_5__["default"])(current, workInProgress);
  return workInProgress.child;
}

/***/ }),

/***/ "./src/scheduler/updater/updateHostText.js":
/*!*************************************************!*\
  !*** ./src/scheduler/updater/updateHostText.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateHostText; });
function updateHostText(current, workInProgress) {
  var nextProps = workInProgress.pendingProps;
  workInProgress.memoizedProps = nextProps;
}

/***/ }),

/***/ "./src/scheduler/worker/beginWork.js":
/*!*******************************************!*\
  !*** ./src/scheduler/worker/beginWork.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return beginWork; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _reconciler_cloneChildFibers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reconciler/cloneChildFibers */ "./src/reconciler/cloneChildFibers.js");
/* harmony import */ var _updater_updateClassComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../updater/updateClassComponent */ "./src/scheduler/updater/updateClassComponent.js");
/* harmony import */ var _updater_updateFunctionComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../updater/updateFunctionComponent */ "./src/scheduler/updater/updateFunctionComponent.js");
/* harmony import */ var _updater_mountIndeterminateComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../updater/mountIndeterminateComponent */ "./src/scheduler/updater/mountIndeterminateComponent.js");
/* harmony import */ var _updater_updateHostComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../updater/updateHostComponent */ "./src/scheduler/updater/updateHostComponent.js");
/* harmony import */ var _updater_updateHostRoot__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../updater/updateHostRoot */ "./src/scheduler/updater/updateHostRoot.js");
/* harmony import */ var _updater_updateHostText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../updater/updateHostText */ "./src/scheduler/updater/updateHostText.js");










function beginWork(current, workInProgress) {
  var tag = workInProgress.tag;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(current)) {
    var props = workInProgress.memoizedProps;
    var nextProps = workInProgress.pendingProps;

    if (props === nextProps && workInProgress.type === current.type) {
      if (workInProgress.status === _shared__WEBPACK_IMPORTED_MODULE_1__["NO_WORK"]) {
        Object(_reconciler_cloneChildFibers__WEBPACK_IMPORTED_MODULE_3__["default"])(current, workInProgress);
        return workInProgress.child;
      }
    }
  }

  workInProgress.status = _shared__WEBPACK_IMPORTED_MODULE_1__["NO_WORK"];

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["INDETERMINATE_COMPONENT"]:
      {
        return Object(_updater_mountIndeterminateComponent__WEBPACK_IMPORTED_MODULE_6__["default"])(current, workInProgress, workInProgress.type);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_ROOT"]:
      {
        return Object(_updater_updateHostRoot__WEBPACK_IMPORTED_MODULE_8__["default"])(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["CLASS_COMPONENT"]:
      {
        return Object(_updater_updateClassComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_COMPONENT"]:
      {
        return Object(_updater_updateHostComponent__WEBPACK_IMPORTED_MODULE_7__["default"])(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["FUNCTION_COMPONENT"]:
      {
        return Object(_updater_updateFunctionComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_TEXT"]:
      {
        return Object(_updater_updateHostText__WEBPACK_IMPORTED_MODULE_9__["default"])(current, workInProgress);
      }
  }
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitAllHostEffects.js":
/*!*************************************************************!*\
  !*** ./src/scheduler/worker/commit/commitAllHostEffects.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitAllHostEffects; });
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _commitPlacement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commitPlacement */ "./src/scheduler/worker/commit/commitPlacement.js");
/* harmony import */ var _commitWork__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commitWork */ "./src/scheduler/worker/commit/commitWork.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index */ "./src/scheduler/worker/index.js");





function commitAllHostEffects() {
  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect)) {
    var effectTag = _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect.effectTag;
    var primaryEffectTag = effectTag & (_shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"] | _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["UPDATE"] | _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["DELETION"]);

    switch (primaryEffectTag) {
      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"]:
        {
          Object(_commitPlacement__WEBPACK_IMPORTED_MODULE_2__["default"])(_index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect);
          _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"];
          break;
        }

      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT_AND_UPDATE"]:
        {
          Object(_commitPlacement__WEBPACK_IMPORTED_MODULE_2__["default"])(_index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect);
          _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"];
          var current = _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect.alternate;
          Object(_commitWork__WEBPACK_IMPORTED_MODULE_3__["default"])(current, _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect);
          break;
        }

      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["UPDATE"]:
        {
          var _current = _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect.alternate;
          Object(_commitWork__WEBPACK_IMPORTED_MODULE_3__["default"])(_current, _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect);
          break;
        }

      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["DELETION"]:
        {
          commitDeletion(_index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect);
          break;
        }
    }

    _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect = _index__WEBPACK_IMPORTED_MODULE_4__["default"].nextEffect.nextEffect;
  }
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitAllLifeCycles.js":
/*!************************************************************!*\
  !*** ./src/scheduler/worker/commit/commitAllLifeCycles.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitAllLifeCycles; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _commitLifeCycles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commitLifeCycles */ "./src/scheduler/worker/commit/commitLifeCycles.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index */ "./src/scheduler/worker/index.js");




function commitAllLifeCycles(root) {
  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_3__["default"].nextEffect)) {
    var effectTag = _index__WEBPACK_IMPORTED_MODULE_3__["default"].nextEffect.effectTag;

    if (effectTag & (_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE"] | _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["CALLBACK"])) {
      var current = _index__WEBPACK_IMPORTED_MODULE_3__["default"].nextEffect.alternate;
      Object(_commitLifeCycles__WEBPACK_IMPORTED_MODULE_2__["default"])(root, current, _index__WEBPACK_IMPORTED_MODULE_3__["default"].nextEffect);
    }

    if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["REF"]) {}

    _index__WEBPACK_IMPORTED_MODULE_3__["default"].nextEffect = _index__WEBPACK_IMPORTED_MODULE_3__["default"].nextEffect.nextEffect;
  }
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitLifeCycles.js":
/*!*********************************************************!*\
  !*** ./src/scheduler/worker/commit/commitLifeCycles.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitLifeCycles; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared */ "./src/shared/index.js");
/* harmony import */ var _commitUpdateQueue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commitUpdateQueue */ "./src/scheduler/worker/commit/commitUpdateQueue.js");





function commitLifeCycles(root, current, finishedWork) {
  var tag = finishedWork.tag;

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["FUNCTION_COMPONENT"]:
      {
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["CLASS_COMPONENT"]:
      {
        var instance = finishedWork.stateNode;

        if (finishedWork.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE"]) {
          if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(current)) {
            instance.componentDidMount();
          } else {
            var props = finishedWork.elementType === finishedWork.type ? current.memoizedProps : Object(_shared__WEBPACK_IMPORTED_MODULE_3__["resolveDefaultProps"])(finishedWork.type, current.memoizedProps);
            var state = current.memoizedState;

            if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(instance.componentDidUpdate)) {
              instance.componentDidUpdate(props, state, instance.__reactInternalSnapshotBeforeUpdate);
            }
          }
        }

        var updateQueue = finishedWork.updateQueue;

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(updateQueue)) {
          Object(_commitUpdateQueue__WEBPACK_IMPORTED_MODULE_4__["default"])(finishedWork, updateQueue, instance);
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_ROOT"]:
      {
        var _updateQueue = finishedWork.updateQueue;

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(_updateQueue)) {
          var _instance;

          if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(finishedWork.child)) {
            _instance = finishedWork.child.stateNode;
          }

          Object(_commitUpdateQueue__WEBPACK_IMPORTED_MODULE_4__["default"])(finishedWork, _updateQueue, _instance);
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_COMPONENT"]:
      {}
  }
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitPlacement.js":
/*!********************************************************!*\
  !*** ./src/scheduler/worker/commit/commitPlacement.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitPlacement; });
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "./node_modules/@babel/runtime/helpers/readOnlyError.js");
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _renderer_config_appendChildToContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../renderer/config/appendChildToContainer */ "./src/renderer/config/appendChildToContainer.js");






function getHostParentFiber(fiber) {
  var returnFiber = fiber["return"];

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(returnFiber)) {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isHostParent"])(returnFiber)) {
      return returnFiber;
    }

    returnFiber = returnFiber["return"];
  }
}

function getHostSibling(fiber) {
  var node = fiber;

  siblings: while (true) {
    while (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node.sibling)) {
      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node["return"]) === null || Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isHostParent"])(node["return"])) {
        return null;
      }

      node = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("node"), node["return"]);
    }

    node.sibling["return"] = node["return"];
    node = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("node"), node.sibling);

    while (node.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] && node.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"]) {
      if (node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["PLACEMENT"]) {
        continue siblings;
      }

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node.child) || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"]) {
        continue siblings;
      } else {
        node.child["return"] = node;
        node = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("node"), node.child);
      }
    }

    if (!(node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["PLACEMENT"])) {
      return node.stateNode;
    }
  }
}

function commitPlacement(finishedWork) {
  var parentFiber = getHostParentFiber(finishedWork);
  var tag = parentFiber.tag,
      stateNode = parentFiber.stateNode;
  var parent;
  var isContainer;

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"]:
      {
        parent = stateNode;
        isContainer = false;
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"]:
      {
        parent = stateNode.containerInfo;
        isContainer = true;
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"]:
      {
        parent = stateNode.containerInfo;
        isContainer = true;
        break;
      }

    default:
      console.log('Invalid host parent');
  }

  if (parentFiber.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["CONTENT_RESET"]) {
    resetTextContent(parent);
    parentFiber.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["CONTENT_RESET"];
  }

  var before = getHostSibling(finishedWork);
  var node = finishedWork;

  while (true) {
    var isHost = node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"];

    if (isHost || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["FUNCTION_COMPONENT"]) {
      var _stateNode = isHost ? node.stateNode : node.stateNode.instance;

      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, _stateNode, before);
        } else {
          insertBefore(parent, _stateNode, before);
        }
      } else {
        if (isContainer) {
          Object(_renderer_config_appendChildToContainer__WEBPACK_IMPORTED_MODULE_4__["default"])(parent, _stateNode);
        } else {
          appendChild(parent, _stateNode);
        }
      }
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"]) {} else if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node.child)) {
      node.child["return"] = node;
      node = node.child;
      continue;
    }

    if (node === finishedWork) {
      return;
    }

    while (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node.sibling)) {
      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node["return"]) || node["return"] === finishedWork) {
        return;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;
  }
}

function safelyDetachRef(current) {
  var ref = current.ref;

  if (ref.current !== null) {} else {
    ref.current = null;
  }
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitRoot.js":
/*!***************************************************!*\
  !*** ./src/scheduler/worker/commit/commitRoot.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitRoot; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/ReactCurrentOwner */ "./src/react/ReactCurrentOwner.js");
/* harmony import */ var _commitAllHostEffects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commitAllHostEffects */ "./src/scheduler/worker/commit/commitAllHostEffects.js");
/* harmony import */ var _commitAllLifeCycles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commitAllLifeCycles */ "./src/scheduler/worker/commit/commitAllLifeCycles.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../index */ "./src/scheduler/worker/index.js");






function commitRoot(root, finishedWork) {
  _index__WEBPACK_IMPORTED_MODULE_5__["default"].isCommitting = true;
  _index__WEBPACK_IMPORTED_MODULE_5__["default"].isWorking = true;

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(finishedWork)) {
    root.finishedWork = null;
  }

  var firstEffect;

  if (finishedWork.effectTag > _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PERFORMED_WORK"]) {
    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(finishedWork.lastEffect)) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    firstEffect = finishedWork.firstEffect;
  }

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(firstEffect)) {
    _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_2__["default"].current = null;
  }

  _index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect = firstEffect;

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect)) {
    Object(_commitAllHostEffects__WEBPACK_IMPORTED_MODULE_3__["default"])();

    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect)) {
      _index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect = nextEffect.nextEffect;
    }
  }

  root.current = finishedWork;
  _index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect = firstEffect;

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect)) {
    Object(_commitAllLifeCycles__WEBPACK_IMPORTED_MODULE_4__["default"])(root);

    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect)) {
      _index__WEBPACK_IMPORTED_MODULE_5__["default"].nextEffect = nextEffect.nextEffect;
    }
  }

  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(firstEffect)) {}

  _index__WEBPACK_IMPORTED_MODULE_5__["default"].isCommitting = false;
  _index__WEBPACK_IMPORTED_MODULE_5__["default"].isWorking = false;
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitUpdateQueue.js":
/*!**********************************************************!*\
  !*** ./src/scheduler/worker/commit/commitUpdateQueue.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitUpdateQueue; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");

function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
}

function commitUpdateEffects(effect, instance) {
  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(effect)) {
    var callback = effect.callback;

    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(callback)) {
      effect.callback = null;
      callback.call(instance);
    }

    effect = effect.nextEffect;
  }
}

/***/ }),

/***/ "./src/scheduler/worker/commit/commitWork.js":
/*!***************************************************!*\
  !*** ./src/scheduler/worker/commit/commitWork.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return commitWork; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/shared/index.js");
/* harmony import */ var _renderer_config_updateProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../renderer/config/updateProperties */ "./src/renderer/config/updateProperties.js");




function commitWork(current, finishedWork) {
  var tag = finishedWork.tag;

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["FUNCTION_COMPONENT"]:
      {
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_COMPONENT"]:
      {
        var instance = finishedWork.stateNode;

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(instance)) {
          var nextProps = finishedWork.memoizedProps;
          var props = !Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(current) ? current.memoizedProps : nextProps;
          var type = finishedWork.type;
          var updateQueue = finishedWork.updateQueue;
          finishedWork.updateQueue = null;

          if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(updateQueue)) {
            commitUpdate(instance, updateQueue, type, props, finishedWork, finishedWork);
          }
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_TEXT"]:
      {
        var _instance = finishedWork.stateNode;
        var nextText = finishedWork.memoizedProps;
        var text = Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndefined"])(current) ? current$$1.memoizedProps : nextText;
        commitTextUpdate(_instance, text, nextText);
        return;
      }
  }
}

function commitUpdate(instance, updateQueue, type, props, nextProps, finishedWork) {
  instance[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_EVENT_HANDLERS_KEY"]] = nextProps;
  Object(_renderer_config_updateProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(instance, updateQueue, type, props, nextProps);
}

/***/ }),

/***/ "./src/scheduler/worker/completeRoot.js":
/*!**********************************************!*\
  !*** ./src/scheduler/worker/completeRoot.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return completeRoot; });
/* harmony import */ var _commit_commitRoot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commit/commitRoot */ "./src/scheduler/worker/commit/commitRoot.js");

function completeRoot(root, finishedWork) {
  if (root.finishedWork) {
    root.finishedWork = null;
    Object(_commit_commitRoot__WEBPACK_IMPORTED_MODULE_0__["default"])(root, finishedWork);
  }
}

/***/ }),

/***/ "./src/scheduler/worker/completeUnitOfWork.js":
/*!****************************************************!*\
  !*** ./src/scheduler/worker/completeUnitOfWork.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return completeUnitOfWork; });
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _completeWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./completeWork */ "./src/scheduler/worker/completeWork.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");



function completeUnitOfWork(workInProgress) {
  do {
    var current = workInProgress.alternate;
    var returnFiber = workInProgress["return"];
    var siblingFiber = workInProgress.sibling;

    if ((workInProgress.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["INCOMPLETE"]) === _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["NO_EFFECT"]) {
      var next = Object(_completeWork__WEBPACK_IMPORTED_MODULE_1__["default"])(current, workInProgress);

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(next)) {
        return next;
      }

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(returnFiber) && (returnFiber.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["INCOMPLETE"]) === _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["NO_EFFECT"]) {
        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(returnFiber.firstEffect)) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(workInProgress.lastEffect)) {
          if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(returnFiber.lastEffect)) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }

          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        if (workInProgress.effectTag > _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PERFORMED_WORK"]) {
          if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(returnFiber.lastEffect)) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }

          returnFiber.lastEffect = workInProgress;
        }
      }
    } else {
      var _next = unwindWork(workInProgress);

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(_next)) {
        _next.effectTag &= HostEffectMask;
        return _next;
      }

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(returnFiber)) {
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["INCOMPLETE"];
      }
    }

    if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(siblingFiber)) {
      return siblingFiber;
    }

    workInProgress = returnFiber;
  } while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(workInProgress)); // root complete 

}

/***/ }),

/***/ "./src/scheduler/worker/completeWork.js":
/*!**********************************************!*\
  !*** ./src/scheduler/worker/completeWork.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return completeWork; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effectTags */ "./src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _updater_updateHostInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../updater/updateHostInstance */ "./src/scheduler/updater/updateHostInstance.js");
/* harmony import */ var _renderer_config_createInstance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../renderer/config/createInstance */ "./src/renderer/config/createInstance.js");
/* harmony import */ var _react_ReactCurrentRootInstance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../react/ReactCurrentRootInstance */ "./src/react/ReactCurrentRootInstance.js");
/* harmony import */ var _renderer_config_setInitialProperties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../renderer/config/setInitialProperties */ "./src/renderer/config/setInitialProperties.js");
/* harmony import */ var _renderer_config_appendAllChildren__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../renderer/config/appendAllChildren */ "./src/renderer/config/appendAllChildren.js");








function completeWork(current, workInProgress) {
  var nextProps = workInProgress.pendingProps;
  var tag = workInProgress.tag;

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["CLASS_COMPONENT"]:
      {
        var Component = workInProgress.type;

        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isContextProvider"])(Component)) {// popContext();
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["FUNCTION_COMPONENT"]:
      {
        break;
      }
      ;

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_ROOT"]:
      {
        var root = workInProgress.stateNode;

        if (root.pendingContext) {
          root.context = root.pendingContext;
          root.pendingContext = null;
        }

        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(current) || Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(current.child)) {
          workInProgress.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"];
        } // updateHostContainer()


        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_COMPONENT"]:
      {
        var type = workInProgress.type;
        var _nextProps = workInProgress.pendingProps;
        var rootContainerInstance = getRootHostContainer();

        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(current) && !Object(_shared_is__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(workInProgress.stateNode)) {
          Object(_updater_updateHostInstance__WEBPACK_IMPORTED_MODULE_3__["default"])(current, workInProgress, type, _nextProps);
        } else {
          var instance = Object(_renderer_config_createInstance__WEBPACK_IMPORTED_MODULE_4__["default"])(type, _nextProps, null, null, workInProgress);
          workInProgress.stateNode = instance;
          Object(_renderer_config_appendAllChildren__WEBPACK_IMPORTED_MODULE_7__["default"])(instance, workInProgress);
          Object(_renderer_config_setInitialProperties__WEBPACK_IMPORTED_MODULE_6__["default"])(instance, type, _nextProps, rootContainerInstance);
        }

        break;
      }

    case _shared_is__WEBPACK_IMPORTED_MODULE_2__["isContextProvider"]:
      {
        break;
      }
  }
}

function getRootHostContainer() {
  var rootInstance = _react_ReactCurrentRootInstance__WEBPACK_IMPORTED_MODULE_5__["default"].current;
  return rootInstance;
}

/***/ }),

/***/ "./src/scheduler/worker/index.js":
/*!***************************************!*\
  !*** ./src/scheduler/worker/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  nextUnitOfWork: null,
  nextEffect: null,
  isWorking: false,
  isCommitting: false
});

/***/ }),

/***/ "./src/scheduler/worker/performUnitOfWork.js":
/*!***************************************************!*\
  !*** ./src/scheduler/worker/performUnitOfWork.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return performUnitOfWork; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _completeUnitOfWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./completeUnitOfWork */ "./src/scheduler/worker/completeUnitOfWork.js");
/* harmony import */ var _beginWork__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./beginWork */ "./src/scheduler/worker/beginWork.js");



function performUnitOfWork(workInProgress) {
  var current = workInProgress.alternate;
  var next = Object(_beginWork__WEBPACK_IMPORTED_MODULE_2__["default"])(current, workInProgress);
  workInProgress.memoizedProps = workInProgress.pendingProps;

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(next)) {
    next = Object(_completeUnitOfWork__WEBPACK_IMPORTED_MODULE_1__["default"])(workInProgress);
  }

  return next;
}

/***/ }),

/***/ "./src/scheduler/worker/performWork.js":
/*!*********************************************!*\
  !*** ./src/scheduler/worker/performWork.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return performWork; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _workLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workLoop */ "./src/scheduler/worker/workLoop.js");
/* harmony import */ var _workLoopSync__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workLoopSync */ "./src/scheduler/worker/workLoopSync.js");
/* harmony import */ var _completeRoot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./completeRoot */ "./src/scheduler/worker/completeRoot.js");
/* harmony import */ var _requestWork__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./requestWork */ "./src/scheduler/worker/requestWork.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../index */ "./src/scheduler/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index */ "./src/scheduler/worker/index.js");







function performWork(deadline, fiber, sync) {
  _index__WEBPACK_IMPORTED_MODULE_6__["default"].isWorking = true;

  if (sync) {
    Object(_workLoopSync__WEBPACK_IMPORTED_MODULE_2__["default"])(fiber);
    _index__WEBPACK_IMPORTED_MODULE_5__["default"].isRootRendering = false;
  } else {
    Object(_workLoop__WEBPACK_IMPORTED_MODULE_1__["default"])(deadline, fiber);

    if (_index__WEBPACK_IMPORTED_MODULE_6__["default"].nextUnitOfWork) {
      Object(_requestWork__WEBPACK_IMPORTED_MODULE_4__["default"])(_index__WEBPACK_IMPORTED_MODULE_6__["default"].nextUnitOfWork);
    }
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_6__["default"].nextUnitOfWork)) {
    var root = _index__WEBPACK_IMPORTED_MODULE_6__["default"].root;
    root.finishedWork = root.current.alternate;
    Object(_completeRoot__WEBPACK_IMPORTED_MODULE_3__["default"])(root, root.finishedWork);
  }
}

/***/ }),

/***/ "./src/scheduler/worker/requestWork.js":
/*!*********************************************!*\
  !*** ./src/scheduler/worker/requestWork.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return requestWork; });
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! requestidlecallback */ "./node_modules/requestidlecallback/index.js");
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(requestidlecallback__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _performWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./performWork */ "./src/scheduler/worker/performWork.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/scheduler/index.js");



function requestWork(fiber) {
  if (_index__WEBPACK_IMPORTED_MODULE_2__["default"].isRootRendering) {
    Object(_performWork__WEBPACK_IMPORTED_MODULE_1__["default"])(null, fiber, true);
  } else {
    requestidlecallback__WEBPACK_IMPORTED_MODULE_0___default.a.request(function (deadline) {
      Object(_performWork__WEBPACK_IMPORTED_MODULE_1__["default"])(deadline, fiber);
    });
  }
}

/***/ }),

/***/ "./src/scheduler/worker/resetWork.js":
/*!*******************************************!*\
  !*** ./src/scheduler/worker/resetWork.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resetWork; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scheduler/worker/index.js");

function resetWork(root) {
  _index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork = null; // worker.nextEffect = null;

  _index__WEBPACK_IMPORTED_MODULE_0__["default"].root = root;
}

/***/ }),

/***/ "./src/scheduler/worker/scheduleWork.js":
/*!**********************************************!*\
  !*** ./src/scheduler/worker/scheduleWork.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return scheduleWork; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/workTags */ "./src/shared/workTags.js");
/* harmony import */ var _scheduleWorkToRoot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduleWorkToRoot */ "./src/scheduler/worker/scheduleWorkToRoot.js");
/* harmony import */ var _requestWork__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./requestWork */ "./src/scheduler/worker/requestWork.js");
/* harmony import */ var _resetWork__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resetWork */ "./src/scheduler/worker/resetWork.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./src/scheduler/worker/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../index */ "./src/scheduler/index.js");






function scheduleWork(fiber) {
  var root = Object(_scheduleWorkToRoot__WEBPACK_IMPORTED_MODULE_1__["default"])(fiber);
  Object(_resetWork__WEBPACK_IMPORTED_MODULE_3__["default"])(root);

  if (!_index__WEBPACK_IMPORTED_MODULE_4__["default"].isWorking || _index__WEBPACK_IMPORTED_MODULE_4__["default"].isCommitting) {
    _index__WEBPACK_IMPORTED_MODULE_4__["default"].isWorking = true;
    Object(_requestWork__WEBPACK_IMPORTED_MODULE_2__["default"])(root.current);
  }
}

/***/ }),

/***/ "./src/scheduler/worker/scheduleWorkToRoot.js":
/*!****************************************************!*\
  !*** ./src/scheduler/worker/scheduleWorkToRoot.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return scheduleWorkToRoot; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/workTags */ "./src/shared/workTags.js");

function scheduleWorkToRoot(fiber) {
  while (fiber) {
    if (fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_ROOT"]) {
      return fiber.stateNode;
    }

    fiber = fiber["return"];
  }
}

/***/ }),

/***/ "./src/scheduler/worker/workLoop.js":
/*!******************************************!*\
  !*** ./src/scheduler/worker/workLoop.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return workLoop; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scheduler/worker/index.js");
/* harmony import */ var _performUnitOfWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./performUnitOfWork */ "./src/scheduler/worker/performUnitOfWork.js");
/* harmony import */ var _reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reconciler/FiberNode */ "./src/reconciler/FiberNode.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");





function workLoop(deadline, fiber) {
  if (!_index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork) {
    _index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork = Object(_reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_2__["createWorkInProgress"])(fiber, null);
  }

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork) && deadline.timeRemaining() > _shared__WEBPACK_IMPORTED_MODULE_4__["EXPIRE_TIME"]) {
    _index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork = Object(_performUnitOfWork__WEBPACK_IMPORTED_MODULE_1__["default"])(_index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork);
  }
}

/***/ }),

/***/ "./src/scheduler/worker/workLoopSync.js":
/*!**********************************************!*\
  !*** ./src/scheduler/worker/workLoopSync.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return workLoopSync; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scheduler/worker/index.js");
/* harmony import */ var _performUnitOfWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./performUnitOfWork */ "./src/scheduler/worker/performUnitOfWork.js");
/* harmony import */ var _reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reconciler/FiberNode */ "./src/reconciler/FiberNode.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/is */ "./src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/shared/index.js");





function workLoopSync(fiber) {
  if (!_index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork) {
    _index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork = Object(_reconciler_FiberNode__WEBPACK_IMPORTED_MODULE_2__["createWorkInProgress"])(fiber, null);
  }

  while (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(_index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork)) {
    _index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork = Object(_performUnitOfWork__WEBPACK_IMPORTED_MODULE_1__["default"])(_index__WEBPACK_IMPORTED_MODULE_0__["default"].nextUnitOfWork);
  }
}

/***/ }),

/***/ "./src/shared/HTMLNodeType.js":
/*!************************************!*\
  !*** ./src/shared/HTMLNodeType.js ***!
  \************************************/
/*! exports provided: ELEMENT_NODE, TEXT_NODE, COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_NODE", function() { return ELEMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_NODE", function() { return TEXT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT_NODE", function() { return COMMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_NODE", function() { return DOCUMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_FRAGMENT_NODE", function() { return DOCUMENT_FRAGMENT_NODE; });
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

/***/ }),

/***/ "./src/shared/effectTags.js":
/*!**********************************!*\
  !*** ./src/shared/effectTags.js ***!
  \**********************************/
/*! exports provided: NO_EFFECT, PERFORMED_WORK, PLACEMENT, UPDATE, PLACEMENT_AND_UPDATE, DELETION, CONTENT_RESET, CALLBACK, DID_CAPTURE, REF, SNAPSHOT, PASSIVE, INCOMPLETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_EFFECT", function() { return NO_EFFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERFORMED_WORK", function() { return PERFORMED_WORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLACEMENT", function() { return PLACEMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE", function() { return UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLACEMENT_AND_UPDATE", function() { return PLACEMENT_AND_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETION", function() { return DELETION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_RESET", function() { return CONTENT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CALLBACK", function() { return CALLBACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DID_CAPTURE", function() { return DID_CAPTURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REF", function() { return REF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNAPSHOT", function() { return SNAPSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PASSIVE", function() { return PASSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCOMPLETE", function() { return INCOMPLETE; });
var NO_EFFECT = 0;
var PERFORMED_WORK = 1;
var PLACEMENT = 2;
var UPDATE = 4;
var PLACEMENT_AND_UPDATE = 6;
var DELETION = 8;
var CONTENT_RESET = 16;
var CALLBACK = 32;
var DID_CAPTURE = 64;
var REF = 128;
var SNAPSHOT = 256;
var PASSIVE = 512;
var INCOMPLETE = 1024;

/***/ }),

/***/ "./src/shared/elementTags.js":
/*!***********************************!*\
  !*** ./src/shared/elementTags.js ***!
  \***********************************/
/*! exports provided: INPUT, TEXTAREA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INPUT", function() { return INPUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTAREA", function() { return TEXTAREA; });
var INPUT = 'input';
var TEXTAREA = 'textarea';

/***/ }),

/***/ "./src/shared/elementTypes.js":
/*!************************************!*\
  !*** ./src/shared/elementTypes.js ***!
  \************************************/
/*! exports provided: REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE, REACT_ASYNC_MODE_TYPE, REACT_CONCURRENT_MODE_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_ELEMENT_TYPE", function() { return REACT_ELEMENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_PORTAL_TYPE", function() { return REACT_PORTAL_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_FRAGMENT_TYPE", function() { return REACT_FRAGMENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_STRICT_MODE_TYPE", function() { return REACT_STRICT_MODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_PROFILER_TYPE", function() { return REACT_PROFILER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_PROVIDER_TYPE", function() { return REACT_PROVIDER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_CONTEXT_TYPE", function() { return REACT_CONTEXT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_ASYNC_MODE_TYPE", function() { return REACT_ASYNC_MODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_CONCURRENT_MODE_TYPE", function() { return REACT_CONCURRENT_MODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_FORWARD_REF_TYPE", function() { return REACT_FORWARD_REF_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_SUSPENSE_TYPE", function() { return REACT_SUSPENSE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_MEMO_TYPE", function() { return REACT_MEMO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_LAZY_TYPE", function() { return REACT_LAZY_TYPE; });
var hasSymbol = typeof Symbol === 'function' && Symbol["for"];
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol["for"]('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol["for"]('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol["for"]('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol["for"]('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol["for"]('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol["for"]('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol["for"]('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol["for"]('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol["for"]('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol["for"]('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol["for"]('react.lazy') : 0xead4;

/***/ }),

/***/ "./src/shared/index.js":
/*!*****************************!*\
  !*** ./src/shared/index.js ***!
  \*****************************/
/*! exports provided: CHILDREN, HTML, STYLE, STYLE_NAME_FLOAT, DANGEROUSLY_SET_INNER_HTML, INTERNAL_INSTANCE_KEY, INTERNAL_EVENT_HANDLERS_KEY, REACT_INTERNAL_FIBER, REACT_INTERNAL_INSTANCE, MERGED_CHILD_CONTEXT, MASKED_CHILD_CONTEXT, UNMASKED_CHILD_CONTEXT, EMPTY_OBJECT, EMPTY_ARRAY, EMPTY_CONTEXT, EMPTY_REFS, EXPIRE_TIME, NO_WORK, WORKING, noop, assign, keys, shouldSetTextContent, shallowEqual, resolveDefaultProps, extend, clone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILDREN", function() { return CHILDREN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTML", function() { return HTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STYLE", function() { return STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STYLE_NAME_FLOAT", function() { return STYLE_NAME_FLOAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DANGEROUSLY_SET_INNER_HTML", function() { return DANGEROUSLY_SET_INNER_HTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERNAL_INSTANCE_KEY", function() { return INTERNAL_INSTANCE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERNAL_EVENT_HANDLERS_KEY", function() { return INTERNAL_EVENT_HANDLERS_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_INTERNAL_FIBER", function() { return REACT_INTERNAL_FIBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_INTERNAL_INSTANCE", function() { return REACT_INTERNAL_INSTANCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERGED_CHILD_CONTEXT", function() { return MERGED_CHILD_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASKED_CHILD_CONTEXT", function() { return MASKED_CHILD_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNMASKED_CHILD_CONTEXT", function() { return UNMASKED_CHILD_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_OBJECT", function() { return EMPTY_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_ARRAY", function() { return EMPTY_ARRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_CONTEXT", function() { return EMPTY_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_REFS", function() { return EMPTY_REFS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPIRE_TIME", function() { return EXPIRE_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_WORK", function() { return NO_WORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKING", function() { return WORKING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldSetTextContent", function() { return shouldSetTextContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return shallowEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveDefaultProps", function() { return resolveDefaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./src/shared/is.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var randomKey = Math.random().toString(36).slice(2);
var CHILDREN = 'children';
var HTML = '__html';
var STYLE = 'style';
var STYLE_NAME_FLOAT = 'float';
var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
var INTERNAL_INSTANCE_KEY = '__reactInternalInstance$' + randomKey;
var INTERNAL_EVENT_HANDLERS_KEY = '__reactEventHandlers$' + randomKey;
var REACT_INTERNAL_FIBER = '_reactInternalFiber';
var REACT_INTERNAL_INSTANCE = '_reactInternalInstance';
var MERGED_CHILD_CONTEXT = '__reactInternalMemoizedMergedChildContext';
var MASKED_CHILD_CONTEXT = '__reactInternalMemoizedMaskedChildContext';
var UNMASKED_CHILD_CONTEXT = '__reactInternalMemoizedUnmaskedChildContext';
var EMPTY_OBJECT = {};
var EMPTY_ARRAY = [];
var EMPTY_CONTEXT = {};
var EMPTY_REFS = {};
var EXPIRE_TIME = 1;
var NO_WORK = 0;
var WORKING = 1;
function noop() {}
var assign = Object.assign;
var keys = Object.keys;
function shouldSetTextContent(type, props) {
  // todo
  return Object(_is__WEBPACK_IMPORTED_MODULE_1__["isString"])(props.children) || false;
}
function shallowEqual(objectA, objectB) {
  if (objectA === null || objectB === null) {
    return false;
  }

  if (is(objectA, objectB)) {
    return true;
  }

  var keysA = objectA ? keys(objectA) : [];
  var keysB = objectB ? keys(objectB) : [];

  if (keysA.length !== keysB.length) {
    return false;
  }

  var length = objectA.length;

  for (var i = 0; i < length; i++) {
    var key = keysA[i];

    if (!objectA.hasOwnProperty(key) || !is(objectA[key], objectB[key])) {
      return false;
    }
  }

  return true;
}
function resolveDefaultProps(Component, unresolvedProps) {
  if (Component) {
    if (Component.defaultProps) {
      var props = _objectSpread({}, unresolvedProps);

      var defaultProps = Component.defaultProps;

      for (var propName in defaultProps) {
        if (Object(_is__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(props[propName])) {
          props[propName] = defaultProps[propName];
        }
      }

      return props;
    }
  }

  return unresolvedProps;
}
function extend(target, source) {
  if (source) {
    return assign(target, source);
  }

  return target;
}
function clone(target) {
  return extend({}, clone);
}

/***/ }),

/***/ "./src/shared/is.js":
/*!**************************!*\
  !*** ./src/shared/is.js ***!
  \**************************/
/*! exports provided: isArray, isNull, isUndefined, isFunction, isString, isObject, isNumber, isNullOrUndefined, isComponentConstructor, isLegacyContextConsumer, isContextProvider, isHostParent, is */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrUndefined", function() { return isNullOrUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComponentConstructor", function() { return isComponentConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLegacyContextConsumer", function() { return isLegacyContextConsumer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isContextProvider", function() { return isContextProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHostParent", function() { return isHostParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workTags */ "./src/shared/workTags.js");


var isArray = Array.isArray;
function isNull(o) {
  return o === null;
}
function isUndefined(o) {
  return o === undefined;
}
function isFunction(o) {
  return typeof o === 'function';
}
function isString(o) {
  return typeof o === 'string';
}
function isObject(o) {
  return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(o) === 'object' && !isNull(o);
}
function isNumber(o) {
  return typeof o === 'number';
}
function isNullOrUndefined(o) {
  return o === undefined || o === null;
}
function isComponentConstructor(Component) {
  var proto = Component.prototype;
  return !!(proto && proto.isReactComponent);
}
function isLegacyContextConsumer(Component) {
  var contextTypes = Component.contextTypes;
  return !isNullOrUndefined(contextTypes);
}
function isContextProvider(Component) {
  var childContextTypes = Component.childContextTypes;
  return !isNullOrUndefined(childContextTypes);
}
function isHostParent(fiber) {
  var tag = fiber.tag;
  return tag === _workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || tag === _workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"] || tag === _workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"];
}
var is = Object.is || function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
};

/***/ }),

/***/ "./src/shared/updateTags.js":
/*!**********************************!*\
  !*** ./src/shared/updateTags.js ***!
  \**********************************/
/*! exports provided: UPDATE_STATE, REPLACE_STATE, FORCE_UPDATE, CAPTURE_UPDATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_STATE", function() { return UPDATE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPLACE_STATE", function() { return REPLACE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORCE_UPDATE", function() { return FORCE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTURE_UPDATE", function() { return CAPTURE_UPDATE; });
var UPDATE_STATE = 0;
var REPLACE_STATE = 1;
var FORCE_UPDATE = 2;
var CAPTURE_UPDATE = 4;

/***/ }),

/***/ "./src/shared/workTags.js":
/*!********************************!*\
  !*** ./src/shared/workTags.js ***!
  \********************************/
/*! exports provided: FUNCTION_COMPONENT, CLASS_COMPONENT, INDETERMINATE_COMPONENT, HOST_ROOT, HOST_PORTAL, HOST_COMPONENT, HOST_TEXT, FRAGMENT, CONTEXT_CONSUMER, CONTEXT_PROVIDER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNCTION_COMPONENT", function() { return FUNCTION_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_COMPONENT", function() { return CLASS_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDETERMINATE_COMPONENT", function() { return INDETERMINATE_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_ROOT", function() { return HOST_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_PORTAL", function() { return HOST_PORTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_COMPONENT", function() { return HOST_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_TEXT", function() { return HOST_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FRAGMENT", function() { return FRAGMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CONSUMER", function() { return CONTEXT_CONSUMER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_PROVIDER", function() { return CONTEXT_PROVIDER; });
var FUNCTION_COMPONENT = 0;
var CLASS_COMPONENT = 1;
var INDETERMINATE_COMPONENT = 2;
var HOST_ROOT = 3;
var HOST_PORTAL = 4;
var HOST_COMPONENT = 5;
var HOST_TEXT = 6;
var FRAGMENT = 7;
var CONTEXT_CONSUMER = 9;
var CONTEXT_PROVIDER = 10;

/***/ })

/******/ });
});
//# sourceMappingURL=project.js.map