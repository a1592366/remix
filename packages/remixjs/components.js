(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["components"] = factory();
	else
		root["components"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/index.js");
/******/ })
/************************************************************************/
/******/ ({

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
//# sourceMappingURL=components.js.map