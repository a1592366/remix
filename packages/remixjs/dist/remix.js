(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dist/remix"] = factory();
	else
		root["dist/remix"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default, Children, Component, PureComponent, createElement, cloneElement, useState, PropTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/react */ "./src/react/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["Children"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["createElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["cloneElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["PropTypes"]; });


/* harmony default export */ __webpack_exports__["default"] = (_src_react__WEBPACK_IMPORTED_MODULE_0__["default"]);


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
//# sourceMappingURL=remix.js.map