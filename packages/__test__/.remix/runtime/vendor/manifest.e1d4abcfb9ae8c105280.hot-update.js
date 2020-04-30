/*** MARK_1588230095304 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ webpackHotUpdate("runtime/vendor/manifest",{

/***/ "../remix/src/document/HTMLElement.js":
/*!********************************************!*\
  !*** ../remix/src/document/HTMLElement.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "../remix/src/document/Element.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function resolveDefaultProps(defaultProps, unresolvedProps) {
  if (defaultProps) {
    var props = {};

    for (var propName in defaultProps) {
      var value = void 0;

      if (unresolvedProps[propName] === undefined) {
        value = defaultProps[propName];
      } else {
        value = unresolvedProps[propName];
      }

      if (!(value === null || value === undefined)) {
        props[propName] = value;
      }
    }

    return props;
  }

  return {};
}

var HTMLElement = /*#__PURE__*/function (_Element) {
  (0, _inherits2["default"])(HTMLElement, _Element);

  var _super = _createSuper(HTMLElement);

  function HTMLElement(tagName) {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLElement);
    _this = _super.call(this);
    _this.tagName = tagName;
    _this.innerText = null; // this.style = new StyleSheet(this);

    return _this;
  }

  (0, _createClass2["default"])(HTMLElement, [{
    key: "getElementById",
    value: function getElementById(id) {
      if (this.uuid === id) {
        return this;
      }

      var node = this.child;

      while (node) {
        if (node.uuid === id) {
          return node;
        }

        if (node.child) {
          node = node.child;
        } else {
          while (node.sibling === null) {
            if (node["return"] === null) {
              return null;
            }

            node = node["return"];
          }

          node = node.sibling;
        }
      }
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      child.previous = this.lastChild;
      child["return"] = this;
      child.parentNode = this;

      if (this.child === null) {
        this.child = this.lastChild = child;
      } else {
        this.lastChild.sibling = child;
        this.lastChild = child;
      }
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var node = this.child;
      var prevNode = null;

      while (node) {
        if (child === node) {
          if (node === this.child) {
            this.child = node.sibling;
          } else {
            prevNode.sibling = node.sibling;
          }
        }

        prevNode = node;
        node = node.sibling;
      }
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, beforeChild) {
      if (this.child === beforeChild) {
        this.child = child;
      } else {
        beforeChild.previous.sibling = child;
      }

      child.sibling = beforeChild;
      beforeChild.previous = child;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this[name] = value;
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this[name] = null;
    }
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
  }, {
    key: "serialize",
    value: function serialize() {
      var defaultProps = this.constructor.defaultProps;
      var element = resolveDefaultProps(defaultProps, this);

      if (this.sibling) {
        element.sibling = this.sibling.serialize();
      } else {
        element.sibling = this.sibling;
      }

      if (this.child) {
        element.child = this.child.serialize();
      }

      if (this.innerText) {
        element.innerText = this.innerText;
      }

      element.tagName = this.tagName;
      element.uuid = this.uuid;
      return element;
    }
  }, {
    key: "innerHTML",
    set: function set(html) {
      throw new Error('Sorry, innerHTML is not be supportted');
    }
  }]);
  return HTMLElement;
}(_Element2["default"]);

exports["default"] = HTMLElement;
module.exports = exports.default;

/***/ })

})
//# sourceMappingURL=manifest.e1d4abcfb9ae8c105280.hot-update.js.map