/*** MARK_1588230095304 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ webpackHotUpdate("runtime/vendor/manifest",{

/***/ "../remix/src/document/HTMLPickerElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLPickerElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _remixPicker = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-picker */ "../remix/src/components/remix-ui/remix-picker/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLPickerElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLPickerElement, _HTMLElement);

  var _super = _createSuper(HTMLPickerElement);

  function HTMLPickerElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLPickerElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.PICKER;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLPickerElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLPickerElement;
(0, _defineProperty2["default"])(HTMLPickerElement, "defaultProps", _remixPicker["default"].defaultProps);
module.exports = exports.default;

/***/ })

})
//# sourceMappingURL=manifest.ded86a1c1ecfe8777c18.hot-update.js.map