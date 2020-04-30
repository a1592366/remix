/*** MARK_1588228997064 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ webpackHotUpdate("runtime/index",{

/***/ "./.remix/runtime/boot.js":
/*!********************************!*\
  !*** ./.remix/runtime/boot.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.program = void 0;

var _project = __webpack_require__(/*! @remix/core/project */ "../remix/project.js");

var _document = __webpack_require__(/*! @remix/core/document */ "../remix/document.js");

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

var program = new _project.Program(_src["default"], _document.document.body);
exports.program = program;
var _default = program;
exports["default"] = _default;

/***/ }),

/***/ "./.remix/runtime/client.js":
/*!**********************************!*\
  !*** ./.remix/runtime/client.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _boot = _interopRequireDefault(__webpack_require__(/*! ./boot */ "./.remix/runtime/boot.js"));

_boot["default"].start();

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(__webpack_require__(/*! @remix/core */ "../remix/index.js"));

var _components = __webpack_require__(/*! @remix/core/components */ "../remix/components.js");

var _Remix = _interopRequireDefault(__webpack_require__(/*! ./pages/Remix */ "./src/pages/Remix/index.js"));

var _Playground = _interopRequireDefault(__webpack_require__(/*! ./pages/Playground */ "./src/pages/Playground/index.js"));

var _Docs = _interopRequireDefault(__webpack_require__(/*! ./pages/Docs */ "./src/pages/Docs/index.js"));

__webpack_require__(/*! ./index.css */ "./src/index.css");

var _default = function _default() {
  return /*#__PURE__*/_core["default"].createElement(_components.Application, {
    config: {
      navigationStyle: 'custom'
    }
  }, /*#__PURE__*/_core["default"].createElement(_components.Router, null, /*#__PURE__*/_core["default"].createElement(_components.Router.Route, {
    path: "pages/Remix/index",
    component: _Remix["default"],
    config: {}
  }), /*#__PURE__*/_core["default"].createElement(_components.Router.Route, {
    path: "pages/Playground/index",
    component: _Playground["default"]
  }), /*#__PURE__*/_core["default"].createElement(_components.Router.Route, {
    path: "pages/Docs/index",
    component: _Docs["default"]
  })), /*#__PURE__*/_core["default"].createElement(_components.TabBar, {
    borderStyle: "white",
    color: "#bfbfbf",
    selectedColor: "#33aa9e"
  }, /*#__PURE__*/_core["default"].createElement(_components.TabBar.TabBarItem, {
    path: "pages/Remix/index",
    icon: "./static/icons/remix.png",
    selectedIcon: "./static/icons/remix_selected.png"
  }, "Remix"), /*#__PURE__*/_core["default"].createElement(_components.TabBar.TabBarItem, {
    path: "pages/Playground/index",
    icon: "./static/icons/playground.png",
    selectedIcon: "./static/icons/playground_selected.png"
  }, "Playground"), /*#__PURE__*/_core["default"].createElement(_components.TabBar.TabBarItem, {
    path: "pages/Docs/index",
    icon: "./static/icons/docs.png",
    selectedIcon: "./static/icons/docs_selected.png"
  }, "Docs")));
};

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/pages/Docs/index.js":
/*!*********************************!*\
  !*** ./src/pages/Docs/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _core = _interopRequireWildcard(__webpack_require__(/*! @remix/core */ "../remix/index.js"));

var _hooks = __webpack_require__(/*! @remix/core/hooks */ "../remix/hooks.js");

__webpack_require__(/*! ./index.css */ "./src/pages/Docs/index.css");

var _temp;

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _default = (0, _hooks.useRemixController)((_temp = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(_temp, _React$Component);

  var _super = _createSuper(_temp);

  function _temp() {
    var _this;

    (0, _classCallCheck2["default"])(this, _temp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      userInformation: null
    });
    return _this;
  }

  (0, _createClass2["default"])(_temp, [{
    key: "render",
    value: function render() {
      var _this$state = (0, _slicedToArray2["default"])(this.state, 1),
          userInformation = _this$state[0];

      return /*#__PURE__*/_core["default"].createElement("view", {
        className: "user",
        style: {
          display: 'flex',
          paddingTop: '100rpx',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, userInformation && /*#__PURE__*/_core["default"].createElement("image", {
        className: "user__avatar",
        style: {
          width: '200rpx',
          height: '200rpx'
        },
        src: userInformation.avatarUrl
      }), /*#__PURE__*/_core["default"].createElement("button", {
        className: "user__nickname",
        openType: "getUserInfo",
        onGetUserInfo: function onGetUserInfo(event) {
          setUserInformation(event.detail.userInfo);
        }
      }, userInformation ? userInformation.nickName : '获取我的个人信息'));
    }
  }]);
  return _temp;
}(_core["default"].Component), _temp));

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/pages/Playground/index.js":
/*!***************************************!*\
  !*** ./src/pages/Playground/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _core = _interopRequireWildcard(__webpack_require__(/*! @remix/core */ "../remix/index.js"));

var _hooks = __webpack_require__(/*! @remix/core/hooks */ "../remix/hooks.js");

var _evalute = _interopRequireDefault(__webpack_require__(/*! ../../evalute */ "./src/evalute/index.js"));

__webpack_require__(/*! ./index.css */ "./src/pages/Playground/index.css");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Playground = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Playground, _Component);

  var _super = _createSuper(Playground);

  function Playground() {
    var _this;

    (0, _classCallCheck2["default"])(this, Playground);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      value: 100
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onTap", function () {
      var value = _this.state.value;

      _this.setState({
        value: value + 100
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(Playground, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      return /*#__PURE__*/_core["default"].createElement("view", {
        className: "playground"
      }, /*#__PURE__*/_core["default"].createElement("view", {
        className: "playground__title"
      }, value), /*#__PURE__*/_core["default"].createElement("view", {
        className: "playground__ctrl"
      }, /*#__PURE__*/_core["default"].createElement("view", {
        className: "playground__ctrl-button playground__parse"
      }, "Parse"), /*#__PURE__*/_core["default"].createElement("view", {
        className: "playground__ctrl-button playground__step"
      }, "Step"), /*#__PURE__*/_core["default"].createElement("view", {
        className: "playground__ctrl-button playground__run",
        onTap: this.onTap
      }, "Run")));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {}
  }]);
  return Playground;
}(_core.Component);

var _default = (0, _hooks.useRemixController)(Playground, {
  backgroundColor: '#efefed'
});

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/pages/Remix/index.js":
/*!**********************************!*\
  !*** ./src/pages/Remix/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _core = _interopRequireDefault(__webpack_require__(/*! @remix/core */ "../remix/index.js"));

var _hooks = __webpack_require__(/*! @remix/core/hooks */ "../remix/hooks.js");

var _logo = _interopRequireDefault(__webpack_require__(/*! ../../static/images/logo.png */ "./src/static/images/logo.png"));

__webpack_require__(/*! ./index.css */ "./src/pages/Remix/index.css");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _default = (0, _hooks.useRemixController)( /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(_class, _React$Component);

  var _super = _createSuper(_class);

  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(_class, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_core["default"].createElement("view", {
        className: "remix"
      }, /*#__PURE__*/_core["default"].createElement("view", {
        className: "remix__logo"
      }, /*#__PURE__*/_core["default"].createElement("image", {
        className: "remix__logo-image",
        src: _logo["default"]
      }), /*#__PURE__*/_core["default"].createElement("text", {
        className: "remix__logo-text"
      }, "REMIX")));
    }
  }]);
  return _class;
}(_core["default"].Component));

exports["default"] = _default;
module.exports = exports.default;

/***/ })

})
//# sourceMappingURL=index.5073a0384373378e023d.hot-update.js.map