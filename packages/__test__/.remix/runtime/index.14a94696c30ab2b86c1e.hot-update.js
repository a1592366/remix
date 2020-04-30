/*** MARK_1588228997064 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ webpackHotUpdate("runtime/index",{

/***/ "../remix-cli/node_modules/vm-browserify/index.js":
/*!********************************************************!*\
  !*** ../remix-cli/node_modules/vm-browserify/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var indexOf = function (xs, item) {
  if (xs.indexOf) return xs.indexOf(item);else for (var i = 0; i < xs.length; i++) {
    if (xs[i] === item) return i;
  }
  return -1;
};

var Object_keys = function (obj) {
  if (Object.keys) return Object.keys(obj);else {
    var res = [];

    for (var key in obj) res.push(key);

    return res;
  }
};

var forEach = function (xs, fn) {
  if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
    fn(xs[i], i, xs);
  }
};

var defineProp = function () {
  try {
    Object.defineProperty({}, '_', {});
    return function (obj, name, value) {
      Object.defineProperty(obj, name, {
        writable: true,
        enumerable: false,
        configurable: true,
        value: value
      });
    };
  } catch (e) {
    return function (obj, name, value) {
      obj[name] = value;
    };
  }
}();

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}

Context.prototype = {};

var Script = exports.Script = function NodeScript(code) {
  if (!(this instanceof Script)) return new Script(code);
  this.code = code;
};

Script.prototype.runInContext = function (context) {
  if (!(context instanceof Context)) {
    throw new TypeError("needs a 'context' argument.");
  }

  var iframe = document.createElement('iframe');
  if (!iframe.style) iframe.style = {};
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  var win = iframe.contentWindow;
  var wEval = win.eval,
      wExecScript = win.execScript;

  if (!wEval && wExecScript) {
    // win.eval() magically appears when this is called in IE:
    wExecScript.call(win, 'null');
    wEval = win.eval;
  }

  forEach(Object_keys(context), function (key) {
    win[key] = context[key];
  });
  forEach(globals, function (key) {
    if (context[key]) {
      win[key] = context[key];
    }
  });
  var winKeys = Object_keys(win);
  var res = wEval.call(win, this.code);
  forEach(Object_keys(win), function (key) {
    // Avoid copying circular objects like `top` and `window` by only
    // updating existing context properties or new properties in the `win`
    // that was only introduced after the eval.
    if (key in context || indexOf(winKeys, key) === -1) {
      context[key] = win[key];
    }
  });
  forEach(globals, function (key) {
    if (!(key in context)) {
      defineProp(context, key, win[key]);
    }
  });
  document.body.removeChild(iframe);
  return res;
};

Script.prototype.runInThisContext = function () {
  return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
  var ctx = Script.createContext(context);
  var res = this.runInContext(ctx);

  if (context) {
    forEach(Object_keys(ctx), function (key) {
      context[key] = ctx[key];
    });
  }

  return res;
};

forEach(Object_keys(Script.prototype), function (name) {
  exports[name] = Script[name] = function (code) {
    var s = Script(code);
    return s[name].apply(s, [].slice.call(arguments, 1));
  };
});

exports.isContext = function (context) {
  return context instanceof Context;
};

exports.createScript = function (code) {
  return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
  var copy = new Context();

  if (typeof context === 'object') {
    forEach(Object_keys(context), function (key) {
      copy[key] = context[key];
    });
  }

  return copy;
};

/***/ }),

/***/ "../remix-cli/node_modules/webpack/buildin/amd-options.js":
/*!****************************************************************!*\
  !*** ../remix-cli/node_modules/webpack/buildin/amd-options.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../remix-cli/node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************************************!*\
  !*** ../remix-cli/node_modules/webpack/buildin/harmony-module.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./src/evalute/acorn.js":
/*!******************************!*\
  !*** ./src/evalute/acorn.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "../remix-cli/node_modules/webpack/buildin/amd-options.js") ? define(['exports'], factory) : (global = global || self, factory(global.acorn = {}));
})(undefined, function (exports) {
  'use strict'; // Reserved word lists for various dialects of the language

  var reservedWords = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict: "implements interface let package private protected public static yield",
    strictBind: "eval arguments"
  }; // And the keywords

  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
  var keywords = {
    5: ecma5AndLessKeywords,
    "5module": ecma5AndLessKeywords + " export import",
    6: ecma5AndLessKeywords + " const class extends export import super"
  };
  var keywordRelationalOperator = /^in(stanceof)?$/; // ## Character categories
  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.
  // Generated by `bin/generate-identifier-regex.js`.

  var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
  var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  nonASCIIidentifierStartChars = nonASCIIidentifierChars = null; // These are a run-length and offset encoded representation of the
  // >0xffff code points that are a valid part of identifiers. The
  // offset starts at 0x10000, and each pair of numbers represents an
  // offset to the next range, and then a size of the range. They were
  // generated by bin/generate-identifier-regex.js
  // eslint-disable-next-line comma-spacing

  var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 477, 28, 11, 0, 9, 21, 155, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 0, 33, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 0, 161, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 270, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 754, 9486, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541]; // eslint-disable-next-line comma-spacing

  var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 525, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 232, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 792487, 239]; // This has a complexity linear to the value of the code. The
  // assumption is that looking up astral identifier characters is
  // rare.

  function isInAstralSet(code, set) {
    var pos = 0x10000;

    for (var i = 0; i < set.length; i += 2) {
      pos += set[i];

      if (pos > code) {
        return false;
      }

      pos += set[i + 1];

      if (pos >= code) {
        return true;
      }
    }
  } // Test whether a given character code starts an identifier.


  function isIdentifierStart(code, astral) {
    if (code < 65) {
      return code === 36;
    }

    if (code < 91) {
      return true;
    }

    if (code < 97) {
      return code === 95;
    }

    if (code < 123) {
      return true;
    }

    if (code <= 0xffff) {
      return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
    }

    if (astral === false) {
      return false;
    }

    return isInAstralSet(code, astralIdentifierStartCodes);
  } // Test whether a given character is part of an identifier.


  function isIdentifierChar(code, astral) {
    if (code < 48) {
      return code === 36;
    }

    if (code < 58) {
      return true;
    }

    if (code < 65) {
      return false;
    }

    if (code < 91) {
      return true;
    }

    if (code < 97) {
      return code === 95;
    }

    if (code < 123) {
      return true;
    }

    if (code <= 0xffff) {
      return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
    }

    if (astral === false) {
      return false;
    }

    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
  } // ## Token types
  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.
  // All token type variables start with an underscore, to make them
  // easy to recognize.
  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // The `startsExpr` property is used to check if the token ends a
  // `yield` expression. It is set on all token types that either can
  // directly start an expression (like a quotation mark) or can
  // continue an expression (like the body of a string).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.


  var TokenType = function TokenType(label, conf) {
    if (conf === void 0) conf = {};
    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };

  function binop(name, prec) {
    return new TokenType(name, {
      beforeExpr: true,
      binop: prec
    });
  }

  var beforeExpr = {
    beforeExpr: true
  },
      startsExpr = {
    startsExpr: true
  }; // Map keyword names to token types.

  var keywords$1 = {}; // Succinct definitions of keyword token types

  function kw(name, options) {
    if (options === void 0) options = {};
    options.keyword = name;
    return keywords$1[name] = new TokenType(name, options);
  }

  var types = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    eof: new TokenType("eof"),
    // Punctuation token types.
    bracketL: new TokenType("[", {
      beforeExpr: true,
      startsExpr: true
    }),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", {
      beforeExpr: true,
      startsExpr: true
    }),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", {
      beforeExpr: true,
      startsExpr: true
    }),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", {
      beforeExpr: true,
      startsExpr: true
    }),
    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator.
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.
    eq: new TokenType("=", {
      beforeExpr: true,
      isAssign: true
    }),
    assign: new TokenType("_=", {
      beforeExpr: true,
      isAssign: true
    }),
    incDec: new TokenType("++/--", {
      prefix: true,
      postfix: true,
      startsExpr: true
    }),
    prefix: new TokenType("!/~", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=/===/!==", 6),
    relational: binop("</>/<=/>=", 7),
    bitShift: binop("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", {
      beforeExpr: true,
      binop: 9,
      prefix: true,
      startsExpr: true
    }),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    starstar: new TokenType("**", {
      beforeExpr: true
    }),
    // Keyword token types.
    _break: kw("break"),
    _case: kw("case", beforeExpr),
    _catch: kw("catch"),
    _continue: kw("continue"),
    _debugger: kw("debugger"),
    _default: kw("default", beforeExpr),
    _do: kw("do", {
      isLoop: true,
      beforeExpr: true
    }),
    _else: kw("else", beforeExpr),
    _finally: kw("finally"),
    _for: kw("for", {
      isLoop: true
    }),
    _function: kw("function", startsExpr),
    _if: kw("if"),
    _return: kw("return", beforeExpr),
    _switch: kw("switch"),
    _throw: kw("throw", beforeExpr),
    _try: kw("try"),
    _var: kw("var"),
    _const: kw("const"),
    _while: kw("while", {
      isLoop: true
    }),
    _with: kw("with"),
    _new: kw("new", {
      beforeExpr: true,
      startsExpr: true
    }),
    _this: kw("this", startsExpr),
    _super: kw("super", startsExpr),
    _class: kw("class", startsExpr),
    _extends: kw("extends", beforeExpr),
    _export: kw("export"),
    _import: kw("import", startsExpr),
    _null: kw("null", startsExpr),
    _true: kw("true", startsExpr),
    _false: kw("false", startsExpr),
    _in: kw("in", {
      beforeExpr: true,
      binop: 7
    }),
    _instanceof: kw("instanceof", {
      beforeExpr: true,
      binop: 7
    }),
    _typeof: kw("typeof", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    _void: kw("void", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    _delete: kw("delete", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    })
  }; // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");

  function isNewLine(code, ecma2019String) {
    return code === 10 || code === 13 || !ecma2019String && (code === 0x2028 || code === 0x2029);
  }

  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  var toString = ref.toString; // Checks if an object has a property.

  function has(obj, propName) {
    return hasOwnProperty.call(obj, propName);
  }

  var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === "[object Array]";
  };

  function wordsRegexp(words) {
    return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
  } // These are used when `options.locations` is on, for the
  // `startLoc` and `endLoc` properties.


  var Position = function Position(line, col) {
    this.line = line;
    this.column = col;
  };

  Position.prototype.offset = function offset(n) {
    return new Position(this.line, this.column + n);
  };

  var SourceLocation = function SourceLocation(p, start, end) {
    this.start = start;
    this.end = end;

    if (p.sourceFile !== null) {
      this.source = p.sourceFile;
    }
  }; // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.


  function getLineInfo(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreakG.lastIndex = cur;
      var match = lineBreakG.exec(input);

      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else {
        return new Position(line, offset - cur);
      }
    }
  } // A second optional argument can be given to further configure
  // the parser process. These options are recognized:


  var defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must be
    // either 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018), or 10
    // (2019). This influences support for strict mode, the set of
    // reserved words, and support for new syntax features. The default
    // is 10.
    ecmaVersion: 10,
    // `sourceType` indicates the mode the code should be parsed in.
    // Can be either `"script"` or `"module"`. This influences global
    // strict mode and parsing of `import` and `export` declarations.
    sourceType: "script",
    // `onInsertedSemicolon` can be a callback that will be called
    // when a semicolon is automatically inserted. It will be passed
    // the position of the comma as an offset, and if `locations` is
    // enabled, it is given the location as a `{line, column}` object
    // as second argument.
    onInsertedSemicolon: null,
    // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
    // trailing commas.
    onTrailingComma: null,
    // By default, reserved words are only enforced if ecmaVersion >= 5.
    // Set `allowReserved` to a boolean value to explicitly turn this on
    // an off. When this option has the value "never", reserved words
    // and keywords can also not be used as property names.
    allowReserved: null,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program.
    allowImportExportEverywhere: false,
    // When enabled, await identifiers are allowed to appear at the top-level scope,
    // but they are still not allowed in non-async functions.
    allowAwaitOutsideFunction: false,
    // When enabled, hashbang directive in the beginning of file
    // is allowed and treated as a line comment.
    allowHashBang: false,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokens returned from `tokenizer().getToken()`. Note
    // that you are not allowed to call the parser from the
    // callback—that will corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false
  }; // Interpret and default an options object

  function getOptions(opts) {
    var options = {};

    for (var opt in defaultOptions) {
      options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
    }

    if (options.ecmaVersion >= 2015) {
      options.ecmaVersion -= 2009;
    }

    if (options.allowReserved == null) {
      options.allowReserved = options.ecmaVersion < 5;
    }

    if (isArray(options.onToken)) {
      var tokens = options.onToken;

      options.onToken = function (token) {
        return tokens.push(token);
      };
    }

    if (isArray(options.onComment)) {
      options.onComment = pushComment(options, options.onComment);
    }

    return options;
  }

  function pushComment(options, array) {
    return function (block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? "Block" : "Line",
        value: text,
        start: start,
        end: end
      };

      if (options.locations) {
        comment.loc = new SourceLocation(this, startLoc, endLoc);
      }

      if (options.ranges) {
        comment.range = [start, end];
      }

      array.push(comment);
    };
  } // Each scope gets a bitset that may contain these flags


  var SCOPE_TOP = 1,
      SCOPE_FUNCTION = 2,
      SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION,
      SCOPE_ASYNC = 4,
      SCOPE_GENERATOR = 8,
      SCOPE_ARROW = 16,
      SCOPE_SIMPLE_CATCH = 32,
      SCOPE_SUPER = 64,
      SCOPE_DIRECT_SUPER = 128;

  function functionFlags(async, generator) {
    return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
  } // Used in checkLVal and declareName to determine the type of a binding


  var BIND_NONE = 0,
      // Not a binding
  BIND_VAR = 1,
      // Var-style binding
  BIND_LEXICAL = 2,
      // Let- or const-style binding
  BIND_FUNCTION = 3,
      // Function declaration
  BIND_SIMPLE_CATCH = 4,
      // Simple (identifier pattern) catch binding
  BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

  var Parser = function Parser(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegexp(keywords[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var reserved = "";

    if (options.allowReserved !== true) {
      for (var v = options.ecmaVersion;; v--) {
        if (reserved = reservedWords[v]) {
          break;
        }
      }

      if (options.sourceType === "module") {
        reserved += " await";
      }
    }

    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict);
    this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
    this.input = String(input); // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.

    this.containsEsc = false; // Set up token state
    // The current position of the tokenizer in the input.

    if (startPos) {
      this.pos = startPos;
      this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
      this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    } // Properties of the current token:
    // Its type


    this.type = types.eof; // For tokens that include more information than their type, the value

    this.value = null; // Its start and end offset

    this.start = this.end = this.pos; // And, if locations are used, the {line, column} object
    // corresponding to those offsets

    this.startLoc = this.endLoc = this.curPosition(); // Position information for the previous token

    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos; // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.

    this.context = this.initialContext();
    this.exprAllowed = true; // Figure out if it's a module code.

    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || this.strictDirective(this.pos); // Used to signify the start of a potential arrow function

    this.potentialArrowAt = -1; // Positions to delayed-check that yield/await does not exist in default parameters.

    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0; // Labels in scope.

    this.labels = []; // Thus-far undefined exports.

    this.undefinedExports = {}; // If enabled, skip leading hashbang line.

    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
      this.skipLineComment(2);
    } // Scope tracking for duplicate variable names (see scope.js)


    this.scopeStack = [];
    this.enterScope(SCOPE_TOP); // For RegExp validation

    this.regexpState = null;
  };

  var prototypeAccessors = {
    inFunction: {
      configurable: true
    },
    inGenerator: {
      configurable: true
    },
    inAsync: {
      configurable: true
    },
    allowSuper: {
      configurable: true
    },
    allowDirectSuper: {
      configurable: true
    },
    treatFunctionsAsVar: {
      configurable: true
    }
  };

  Parser.prototype.parse = function parse() {
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(node);
  };

  prototypeAccessors.inFunction.get = function () {
    return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
  };

  prototypeAccessors.inGenerator.get = function () {
    return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
  };

  prototypeAccessors.inAsync.get = function () {
    return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
  };

  prototypeAccessors.allowSuper.get = function () {
    return (this.currentThisScope().flags & SCOPE_SUPER) > 0;
  };

  prototypeAccessors.allowDirectSuper.get = function () {
    return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
  };

  prototypeAccessors.treatFunctionsAsVar.get = function () {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  }; // Switch to a getter for 7.0.0.


  Parser.prototype.inNonArrowFunction = function inNonArrowFunction() {
    return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0;
  };

  Parser.extend = function extend() {
    var plugins = [],
        len = arguments.length;

    while (len--) {
      plugins[len] = arguments[len];
    }

    var cls = this;

    for (var i = 0; i < plugins.length; i++) {
      cls = plugins[i](cls);
    }

    return cls;
  };

  Parser.parse = function parse(input, options) {
    return new this(options, input).parse();
  };

  Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
    var parser = new this(options, input, pos);
    parser.nextToken();
    return parser.parseExpression();
  };

  Parser.tokenizer = function tokenizer(input, options) {
    return new this(options, input);
  };

  Object.defineProperties(Parser.prototype, prototypeAccessors);
  var pp = Parser.prototype; // ## Parser utilities

  var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;

  pp.strictDirective = function (start) {
    for (;;) {
      // Try to find string literal.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));

      if (!match) {
        return false;
      }

      if ((match[1] || match[2]) === "use strict") {
        return true;
      }

      start += match[0].length; // Skip semicolon, if any.

      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;

      if (this.input[start] === ";") {
        start++;
      }
    }
  }; // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.


  pp.eat = function (type) {
    if (this.type === type) {
      this.next();
      return true;
    } else {
      return false;
    }
  }; // Tests whether parsed token is a contextual keyword.


  pp.isContextual = function (name) {
    return this.type === types.name && this.value === name && !this.containsEsc;
  }; // Consumes contextual keyword if possible.


  pp.eatContextual = function (name) {
    if (!this.isContextual(name)) {
      return false;
    }

    this.next();
    return true;
  }; // Asserts that following token is given contextual keyword.


  pp.expectContextual = function (name) {
    if (!this.eatContextual(name)) {
      this.unexpected();
    }
  }; // Test whether a semicolon can be inserted at the current position.


  pp.canInsertSemicolon = function () {
    return this.type === types.eof || this.type === types.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };

  pp.insertSemicolon = function () {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon) {
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
      }

      return true;
    }
  }; // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.


  pp.semicolon = function () {
    if (!this.eat(types.semi) && !this.insertSemicolon()) {
      this.unexpected();
    }
  };

  pp.afterTrailingComma = function (tokType, notNext) {
    if (this.type === tokType) {
      if (this.options.onTrailingComma) {
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
      }

      if (!notNext) {
        this.next();
      }

      return true;
    }
  }; // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.


  pp.expect = function (type) {
    this.eat(type) || this.unexpected();
  }; // Raise an unexpected token error.


  pp.unexpected = function (pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };

  function DestructuringErrors() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  }

  pp.checkPatternErrors = function (refDestructuringErrors, isAssign) {
    if (!refDestructuringErrors) {
      return;
    }

    if (refDestructuringErrors.trailingComma > -1) {
      this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
    }

    var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;

    if (parens > -1) {
      this.raiseRecoverable(parens, "Parenthesized pattern");
    }
  };

  pp.checkExpressionErrors = function (refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) {
      return false;
    }

    var shorthandAssign = refDestructuringErrors.shorthandAssign;
    var doubleProto = refDestructuringErrors.doubleProto;

    if (!andThrow) {
      return shorthandAssign >= 0 || doubleProto >= 0;
    }

    if (shorthandAssign >= 0) {
      this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
    }

    if (doubleProto >= 0) {
      this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
    }
  };

  pp.checkYieldAwaitInDefaultParams = function () {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
      this.raise(this.yieldPos, "Yield expression cannot be a default value");
    }

    if (this.awaitPos) {
      this.raise(this.awaitPos, "Await expression cannot be a default value");
    }
  };

  pp.isSimpleAssignTarget = function (expr) {
    if (expr.type === "ParenthesizedExpression") {
      return this.isSimpleAssignTarget(expr.expression);
    }

    return expr.type === "Identifier" || expr.type === "MemberExpression";
  };

  var pp$1 = Parser.prototype; // ### Statement parsing
  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  pp$1.parseTopLevel = function (node) {
    var exports = {};

    if (!node.body) {
      node.body = [];
    }

    while (this.type !== types.eof) {
      var stmt = this.parseStatement(null, true, exports);
      node.body.push(stmt);
    }

    if (this.inModule) {
      for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
        var name = list[i];
        this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
      }
    }

    this.adaptDirectivePrologue(node.body);
    this.next();
    node.sourceType = this.options.sourceType;
    return this.finishNode(node, "Program");
  };

  var loopLabel = {
    kind: "loop"
  },
      switchLabel = {
    kind: "switch"
  };

  pp$1.isLet = function (context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
      return false;
    }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length,
        nextCh = this.input.charCodeAt(next); // For ambiguous cases, determine if a LexicalDeclaration (or only a
    // Statement) is allowed here. If context is not empty then only a Statement
    // is allowed. However, `let [` is an explicit negative lookahead for
    // ExpressionStatement, so special-case it first.

    if (nextCh === 91) {
      return true;
    } // '['


    if (context) {
      return false;
    }

    if (nextCh === 123) {
      return true;
    } // '{'


    if (isIdentifierStart(nextCh, true)) {
      var pos = next + 1;

      while (isIdentifierChar(this.input.charCodeAt(pos), true)) {
        ++pos;
      }

      var ident = this.input.slice(next, pos);

      if (!keywordRelationalOperator.test(ident)) {
        return true;
      }
    }

    return false;
  }; // check 'async [no LineTerminator here] function'
  // - 'async /*foo*/ function' is OK.
  // - 'async /*\n*/ function' is invalid.


  pp$1.isAsyncFunction = function () {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
      return false;
    }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length;
    return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)));
  }; // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo)`, where looking at the previous token
  // does not help.


  pp$1.parseStatement = function (context, topLevel, exports) {
    var starttype = this.type,
        node = this.startNode(),
        kind;

    if (this.isLet(context)) {
      starttype = types._var;
      kind = "let";
    } // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.


    switch (starttype) {
      case types._break:
      case types._continue:
        return this.parseBreakContinueStatement(node, starttype.keyword);

      case types._debugger:
        return this.parseDebuggerStatement(node);

      case types._do:
        return this.parseDoStatement(node);

      case types._for:
        return this.parseForStatement(node);

      case types._function:
        // Function as sole body of either an if statement or a labeled statement
        // works, but not when it is part of a labeled statement that is the sole
        // body of an if statement.
        if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
          this.unexpected();
        }

        return this.parseFunctionStatement(node, false, !context);

      case types._class:
        if (context) {
          this.unexpected();
        }

        return this.parseClass(node, true);

      case types._if:
        return this.parseIfStatement(node);

      case types._return:
        return this.parseReturnStatement(node);

      case types._switch:
        return this.parseSwitchStatement(node);

      case types._throw:
        return this.parseThrowStatement(node);

      case types._try:
        return this.parseTryStatement(node);

      case types._const:
      case types._var:
        kind = kind || this.value;

        if (context && kind !== "var") {
          this.unexpected();
        }

        return this.parseVarStatement(node, kind);

      case types._while:
        return this.parseWhileStatement(node);

      case types._with:
        return this.parseWithStatement(node);

      case types.braceL:
        return this.parseBlock(true, node);

      case types.semi:
        return this.parseEmptyStatement(node);

      case types._export:
      case types._import:
        if (this.options.ecmaVersion > 10 && starttype === types._import) {
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length,
              nextCh = this.input.charCodeAt(next);

          if (nextCh === 40) // '('
            {
              return this.parseExpressionStatement(node, this.parseExpression());
            }
        }

        if (!this.options.allowImportExportEverywhere) {
          if (!topLevel) {
            this.raise(this.start, "'import' and 'export' may only appear at the top level");
          }

          if (!this.inModule) {
            this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
          }
        }

        return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports);
      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.

      default:
        if (this.isAsyncFunction()) {
          if (context) {
            this.unexpected();
          }

          this.next();
          return this.parseFunctionStatement(node, true, !context);
        }

        var maybeName = this.value,
            expr = this.parseExpression();

        if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon)) {
          return this.parseLabeledStatement(node, maybeName, expr, context);
        } else {
          return this.parseExpressionStatement(node, expr);
        }

    }
  };

  pp$1.parseBreakContinueStatement = function (node, keyword) {
    var isBreak = keyword === "break";
    this.next();

    if (this.eat(types.semi) || this.insertSemicolon()) {
      node.label = null;
    } else if (this.type !== types.name) {
      this.unexpected();
    } else {
      node.label = this.parseIdent();
      this.semicolon();
    } // Verify that there is an actual destination to break or
    // continue to.


    var i = 0;

    for (; i < this.labels.length; ++i) {
      var lab = this.labels[i];

      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) {
          break;
        }

        if (node.label && isBreak) {
          break;
        }
      }
    }

    if (i === this.labels.length) {
      this.raise(node.start, "Unsyntactic " + keyword);
    }

    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  };

  pp$1.parseDebuggerStatement = function (node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  };

  pp$1.parseDoStatement = function (node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types._while);
    node.test = this.parseParenExpression();

    if (this.options.ecmaVersion >= 6) {
      this.eat(types.semi);
    } else {
      this.semicolon();
    }

    return this.finishNode(node, "DoWhileStatement");
  }; // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.


  pp$1.parseForStatement = function (node) {
    this.next();
    var awaitAt = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;
    this.labels.push(loopLabel);
    this.enterScope(0);
    this.expect(types.parenL);

    if (this.type === types.semi) {
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }

      return this.parseFor(node, null);
    }

    var isLet = this.isLet();

    if (this.type === types._var || this.type === types._const || isLet) {
      var init$1 = this.startNode(),
          kind = isLet ? "let" : this.value;
      this.next();
      this.parseVar(init$1, true, kind);
      this.finishNode(init$1, "VariableDeclaration");

      if ((this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
        if (this.options.ecmaVersion >= 9) {
          if (this.type === types._in) {
            if (awaitAt > -1) {
              this.unexpected(awaitAt);
            }
          } else {
            node["await"] = awaitAt > -1;
          }
        }

        return this.parseForIn(node, init$1);
      }

      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }

      return this.parseFor(node, init$1);
    }

    var refDestructuringErrors = new DestructuringErrors();
    var init = this.parseExpression(true, refDestructuringErrors);

    if (this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types._in) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
        } else {
          node["await"] = awaitAt > -1;
        }
      }

      this.toAssignable(init, false, refDestructuringErrors);
      this.checkLVal(init);
      return this.parseForIn(node, init);
    } else {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }

    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }

    return this.parseFor(node, init);
  };

  pp$1.parseFunctionStatement = function (node, isAsync, declarationPosition) {
    this.next();
    return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
  };

  pp$1.parseIfStatement = function (node) {
    this.next();
    node.test = this.parseParenExpression(); // allow function declarations in branches, but only in non-strict mode

    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(types._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement");
  };

  pp$1.parseReturnStatement = function (node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
      this.raise(this.start, "'return' outside of function");
    }

    this.next(); // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.eat(types.semi) || this.insertSemicolon()) {
      node.argument = null;
    } else {
      node.argument = this.parseExpression();
      this.semicolon();
    }

    return this.finishNode(node, "ReturnStatement");
  };

  pp$1.parseSwitchStatement = function (node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(types.braceL);
    this.labels.push(switchLabel);
    this.enterScope(0); // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    var cur;

    for (var sawDefault = false; this.type !== types.braceR;) {
      if (this.type === types._case || this.type === types._default) {
        var isCase = this.type === types._case;

        if (cur) {
          this.finishNode(cur, "SwitchCase");
        }

        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();

        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) {
            this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
          }

          sawDefault = true;
          cur.test = null;
        }

        this.expect(types.colon);
      } else {
        if (!cur) {
          this.unexpected();
        }

        cur.consequent.push(this.parseStatement(null));
      }
    }

    this.exitScope();

    if (cur) {
      this.finishNode(cur, "SwitchCase");
    }

    this.next(); // Closing brace

    this.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  };

  pp$1.parseThrowStatement = function (node) {
    this.next();

    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    }

    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  }; // Reused empty array added for node fields that are always empty.


  var empty = [];

  pp$1.parseTryStatement = function (node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;

    if (this.type === types._catch) {
      var clause = this.startNode();
      this.next();

      if (this.eat(types.parenL)) {
        clause.param = this.parseBindingAtom();
        var simple = clause.param.type === "Identifier";
        this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
        this.checkLVal(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
        this.expect(types.parenR);
      } else {
        if (this.options.ecmaVersion < 10) {
          this.unexpected();
        }

        clause.param = null;
        this.enterScope(0);
      }

      clause.body = this.parseBlock(false);
      this.exitScope();
      node.handler = this.finishNode(clause, "CatchClause");
    }

    node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;

    if (!node.handler && !node.finalizer) {
      this.raise(node.start, "Missing catch or finally clause");
    }

    return this.finishNode(node, "TryStatement");
  };

  pp$1.parseVarStatement = function (node, kind) {
    this.next();
    this.parseVar(node, false, kind);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  };

  pp$1.parseWhileStatement = function (node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(node, "WhileStatement");
  };

  pp$1.parseWithStatement = function (node) {
    if (this.strict) {
      this.raise(this.start, "'with' in strict mode");
    }

    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement("with");
    return this.finishNode(node, "WithStatement");
  };

  pp$1.parseEmptyStatement = function (node) {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  };

  pp$1.parseLabeledStatement = function (node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
      var label = list[i$1];

      if (label.name === maybeName) {
        this.raise(expr.start, "Label '" + maybeName + "' is already declared");
      }
    }

    var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;

    for (var i = this.labels.length - 1; i >= 0; i--) {
      var label$1 = this.labels[i];

      if (label$1.statementStart === node.start) {
        // Update information about previous labels on this node
        label$1.statementStart = this.start;
        label$1.kind = kind;
      } else {
        break;
      }
    }

    this.labels.push({
      name: maybeName,
      kind: kind,
      statementStart: this.start
    });
    node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  };

  pp$1.parseExpressionStatement = function (node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  }; // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).


  pp$1.parseBlock = function (createNewLexicalScope, node) {
    if (createNewLexicalScope === void 0) createNewLexicalScope = true;
    if (node === void 0) node = this.startNode();
    node.body = [];
    this.expect(types.braceL);

    if (createNewLexicalScope) {
      this.enterScope(0);
    }

    while (!this.eat(types.braceR)) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }

    if (createNewLexicalScope) {
      this.exitScope();
    }

    return this.finishNode(node, "BlockStatement");
  }; // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.


  pp$1.parseFor = function (node, init) {
    node.init = init;
    this.expect(types.semi);
    node.test = this.type === types.semi ? null : this.parseExpression();
    this.expect(types.semi);
    node.update = this.type === types.parenR ? null : this.parseExpression();
    this.expect(types.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, "ForStatement");
  }; // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.


  pp$1.parseForIn = function (node, init) {
    var isForIn = this.type === types._in;
    this.next();

    if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
      this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
    } else if (init.type === "AssignmentPattern") {
      this.raise(init.start, "Invalid left-hand side in for-loop");
    }

    node.left = init;
    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  }; // Parse a list of variable declarations.


  pp$1.parseVar = function (node, isFor, kind) {
    node.declarations = [];
    node.kind = kind;

    for (;;) {
      var decl = this.startNode();
      this.parseVarId(decl, kind);

      if (this.eat(types.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else if (kind === "const" && !(this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
        this.unexpected();
      } else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types._in || this.isContextual("of")))) {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        decl.init = null;
      }

      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));

      if (!this.eat(types.comma)) {
        break;
      }
    }

    return node;
  };

  pp$1.parseVarId = function (decl, kind) {
    decl.id = this.parseBindingAtom();
    this.checkLVal(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };

  var FUNC_STATEMENT = 1,
      FUNC_HANGING_STATEMENT = 2,
      FUNC_NULLABLE_ID = 4; // Parse a function declaration or literal (depending on the
  // `statement & FUNC_STATEMENT`).
  // Remove `allowExpressionBody` for 7.0.0, as it is only called with false

  pp$1.parseFunction = function (node, statement, allowExpressionBody, isAsync) {
    this.initFunction(node);

    if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
      if (this.type === types.star && statement & FUNC_HANGING_STATEMENT) {
        this.unexpected();
      }

      node.generator = this.eat(types.star);
    }

    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }

    if (statement & FUNC_STATEMENT) {
      node.id = statement & FUNC_NULLABLE_ID && this.type !== types.name ? null : this.parseIdent();

      if (node.id && !(statement & FUNC_HANGING_STATEMENT)) // If it is a regular function declaration in sloppy mode, then it is
        // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
        // mode depends on properties of the current scope (see
        // treatFunctionsAsVar).
        {
          this.checkLVal(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
        }
    }

    var oldYieldPos = this.yieldPos,
        oldAwaitPos = this.awaitPos,
        oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(node.async, node.generator));

    if (!(statement & FUNC_STATEMENT)) {
      node.id = this.type === types.name ? this.parseIdent() : null;
    }

    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody, false);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
  };

  pp$1.parseFunctionParams = function (node) {
    this.expect(types.parenL);
    node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
  }; // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).


  pp$1.parseClass = function (node, isStatement) {
    this.next(); // ecma-262 14.6 Class Definitions
    // A class definition is always strict mode code.

    var oldStrict = this.strict;
    this.strict = true;
    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var classBody = this.startNode();
    var hadConstructor = false;
    classBody.body = [];
    this.expect(types.braceL);

    while (!this.eat(types.braceR)) {
      var element = this.parseClassElement(node.superClass !== null);

      if (element) {
        classBody.body.push(element);

        if (element.type === "MethodDefinition" && element.kind === "constructor") {
          if (hadConstructor) {
            this.raise(element.start, "Duplicate constructor in the same class");
          }

          hadConstructor = true;
        }
      }
    }

    node.body = this.finishNode(classBody, "ClassBody");
    this.strict = oldStrict;
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  };

  pp$1.parseClassElement = function (constructorAllowsSuper) {
    var this$1 = this;

    if (this.eat(types.semi)) {
      return null;
    }

    var method = this.startNode();

    var tryContextual = function tryContextual(k, noLineBreak) {
      if (noLineBreak === void 0) noLineBreak = false;
      var start = this$1.start,
          startLoc = this$1.startLoc;

      if (!this$1.eatContextual(k)) {
        return false;
      }

      if (this$1.type !== types.parenL && (!noLineBreak || !this$1.canInsertSemicolon())) {
        return true;
      }

      if (method.key) {
        this$1.unexpected();
      }

      method.computed = false;
      method.key = this$1.startNodeAt(start, startLoc);
      method.key.name = k;
      this$1.finishNode(method.key, "Identifier");
      return false;
    };

    method.kind = "method";
    method["static"] = tryContextual("static");
    var isGenerator = this.eat(types.star);
    var isAsync = false;

    if (!isGenerator) {
      if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
        isAsync = true;
        isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
      } else if (tryContextual("get")) {
        method.kind = "get";
      } else if (tryContextual("set")) {
        method.kind = "set";
      }
    }

    if (!method.key) {
      this.parsePropertyName(method);
    }

    var key = method.key;
    var allowsDirectSuper = false;

    if (!method.computed && !method["static"] && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
      if (method.kind !== "method") {
        this.raise(key.start, "Constructor can't have get/set modifier");
      }

      if (isGenerator) {
        this.raise(key.start, "Constructor can't be a generator");
      }

      if (isAsync) {
        this.raise(key.start, "Constructor can't be an async method");
      }

      method.kind = "constructor";
      allowsDirectSuper = constructorAllowsSuper;
    } else if (method["static"] && key.type === "Identifier" && key.name === "prototype") {
      this.raise(key.start, "Classes may not have a static property named prototype");
    }

    this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper);

    if (method.kind === "get" && method.value.params.length !== 0) {
      this.raiseRecoverable(method.value.start, "getter should have no params");
    }

    if (method.kind === "set" && method.value.params.length !== 1) {
      this.raiseRecoverable(method.value.start, "setter should have exactly one param");
    }

    if (method.kind === "set" && method.value.params[0].type === "RestElement") {
      this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params");
    }

    return method;
  };

  pp$1.parseClassMethod = function (method, isGenerator, isAsync, allowsDirectSuper) {
    method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
    return this.finishNode(method, "MethodDefinition");
  };

  pp$1.parseClassId = function (node, isStatement) {
    if (this.type === types.name) {
      node.id = this.parseIdent();

      if (isStatement) {
        this.checkLVal(node.id, BIND_LEXICAL, false);
      }
    } else {
      if (isStatement === true) {
        this.unexpected();
      }

      node.id = null;
    }
  };

  pp$1.parseClassSuper = function (node) {
    node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
  }; // Parses module export declaration.


  pp$1.parseExport = function (node, exports) {
    this.next(); // export * from '...'

    if (this.eat(types.star)) {
      this.expectContextual("from");

      if (this.type !== types.string) {
        this.unexpected();
      }

      node.source = this.parseExprAtom();
      this.semicolon();
      return this.finishNode(node, "ExportAllDeclaration");
    }

    if (this.eat(types._default)) {
      // export default ...
      this.checkExport(exports, "default", this.lastTokStart);
      var isAsync;

      if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
        var fNode = this.startNode();
        this.next();

        if (isAsync) {
          this.next();
        }

        node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
      } else if (this.type === types._class) {
        var cNode = this.startNode();
        node.declaration = this.parseClass(cNode, "nullableID");
      } else {
        node.declaration = this.parseMaybeAssign();
        this.semicolon();
      }

      return this.finishNode(node, "ExportDefaultDeclaration");
    } // export var|const|let|function|class ...


    if (this.shouldParseExportStatement()) {
      node.declaration = this.parseStatement(null);

      if (node.declaration.type === "VariableDeclaration") {
        this.checkVariableExport(exports, node.declaration.declarations);
      } else {
        this.checkExport(exports, node.declaration.id.name, node.declaration.id.start);
      }

      node.specifiers = [];
      node.source = null;
    } else {
      // export { x, y as z } [from '...']
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers(exports);

      if (this.eatContextual("from")) {
        if (this.type !== types.string) {
          this.unexpected();
        }

        node.source = this.parseExprAtom();
      } else {
        for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
          // check for keywords used as local names
          var spec = list[i];
          this.checkUnreserved(spec.local); // check if export is defined

          this.checkLocalExport(spec.local);
        }

        node.source = null;
      }

      this.semicolon();
    }

    return this.finishNode(node, "ExportNamedDeclaration");
  };

  pp$1.checkExport = function (exports, name, pos) {
    if (!exports) {
      return;
    }

    if (has(exports, name)) {
      this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
    }

    exports[name] = true;
  };

  pp$1.checkPatternExport = function (exports, pat) {
    var type = pat.type;

    if (type === "Identifier") {
      this.checkExport(exports, pat.name, pat.start);
    } else if (type === "ObjectPattern") {
      for (var i = 0, list = pat.properties; i < list.length; i += 1) {
        var prop = list[i];
        this.checkPatternExport(exports, prop);
      }
    } else if (type === "ArrayPattern") {
      for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
        var elt = list$1[i$1];

        if (elt) {
          this.checkPatternExport(exports, elt);
        }
      }
    } else if (type === "Property") {
      this.checkPatternExport(exports, pat.value);
    } else if (type === "AssignmentPattern") {
      this.checkPatternExport(exports, pat.left);
    } else if (type === "RestElement") {
      this.checkPatternExport(exports, pat.argument);
    } else if (type === "ParenthesizedExpression") {
      this.checkPatternExport(exports, pat.expression);
    }
  };

  pp$1.checkVariableExport = function (exports, decls) {
    if (!exports) {
      return;
    }

    for (var i = 0, list = decls; i < list.length; i += 1) {
      var decl = list[i];
      this.checkPatternExport(exports, decl.id);
    }
  };

  pp$1.shouldParseExportStatement = function () {
    return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
  }; // Parses a comma-separated list of module exports.


  pp$1.parseExportSpecifiers = function (exports) {
    var nodes = [],
        first = true; // export { x, y as z } [from '...']

    this.expect(types.braceL);

    while (!this.eat(types.braceR)) {
      if (!first) {
        this.expect(types.comma);

        if (this.afterTrailingComma(types.braceR)) {
          break;
        }
      } else {
        first = false;
      }

      var node = this.startNode();
      node.local = this.parseIdent(true);
      node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local;
      this.checkExport(exports, node.exported.name, node.exported.start);
      nodes.push(this.finishNode(node, "ExportSpecifier"));
    }

    return nodes;
  }; // Parses import declaration.


  pp$1.parseImport = function (node) {
    this.next(); // import '...'

    if (this.type === types.string) {
      node.specifiers = empty;
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
    }

    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  }; // Parses a comma-separated list of module imports.


  pp$1.parseImportSpecifiers = function () {
    var nodes = [],
        first = true;

    if (this.type === types.name) {
      // import defaultObj, { x, y as z } from '...'
      var node = this.startNode();
      node.local = this.parseIdent();
      this.checkLVal(node.local, BIND_LEXICAL);
      nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));

      if (!this.eat(types.comma)) {
        return nodes;
      }
    }

    if (this.type === types.star) {
      var node$1 = this.startNode();
      this.next();
      this.expectContextual("as");
      node$1.local = this.parseIdent();
      this.checkLVal(node$1.local, BIND_LEXICAL);
      nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
      return nodes;
    }

    this.expect(types.braceL);

    while (!this.eat(types.braceR)) {
      if (!first) {
        this.expect(types.comma);

        if (this.afterTrailingComma(types.braceR)) {
          break;
        }
      } else {
        first = false;
      }

      var node$2 = this.startNode();
      node$2.imported = this.parseIdent(true);

      if (this.eatContextual("as")) {
        node$2.local = this.parseIdent();
      } else {
        this.checkUnreserved(node$2.imported);
        node$2.local = node$2.imported;
      }

      this.checkLVal(node$2.local, BIND_LEXICAL);
      nodes.push(this.finishNode(node$2, "ImportSpecifier"));
    }

    return nodes;
  }; // Set `ExpressionStatement#directive` property for directive prologues.


  pp$1.adaptDirectivePrologue = function (statements) {
    for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
      statements[i].directive = statements[i].expression.raw.slice(1, -1);
    }
  };

  pp$1.isDirectiveCandidate = function (statement) {
    return statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && ( // Reject parenthesized strings.
    this.input[statement.start] === "\"" || this.input[statement.start] === "'");
  };

  var pp$2 = Parser.prototype; // Convert existing expression atom to assignable pattern
  // if possible.

  pp$2.toAssignable = function (node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
          if (this.inAsync && node.name === "await") {
            this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
          }

          break;

        case "ObjectPattern":
        case "ArrayPattern":
        case "RestElement":
          break;

        case "ObjectExpression":
          node.type = "ObjectPattern";

          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }

          for (var i = 0, list = node.properties; i < list.length; i += 1) {
            var prop = list[i];
            this.toAssignable(prop, isBinding); // Early error:
            //   AssignmentRestProperty[Yield, Await] :
            //     `...` DestructuringAssignmentTarget[Yield, Await]
            //
            //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.

            if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
              this.raise(prop.argument.start, "Unexpected token");
            }
          }

          break;

        case "Property":
          // AssignmentProperty has type === "Property"
          if (node.kind !== "init") {
            this.raise(node.key.start, "Object pattern can't contain getter or setter");
          }

          this.toAssignable(node.value, isBinding);
          break;

        case "ArrayExpression":
          node.type = "ArrayPattern";

          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }

          this.toAssignableList(node.elements, isBinding);
          break;

        case "SpreadElement":
          node.type = "RestElement";
          this.toAssignable(node.argument, isBinding);

          if (node.argument.type === "AssignmentPattern") {
            this.raise(node.argument.start, "Rest elements cannot have a default value");
          }

          break;

        case "AssignmentExpression":
          if (node.operator !== "=") {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          }

          node.type = "AssignmentPattern";
          delete node.operator;
          this.toAssignable(node.left, isBinding);
        // falls through to AssignmentPattern

        case "AssignmentPattern":
          break;

        case "ParenthesizedExpression":
          this.toAssignable(node.expression, isBinding, refDestructuringErrors);
          break;

        case "MemberExpression":
          if (!isBinding) {
            break;
          }

        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    } else if (refDestructuringErrors) {
      this.checkPatternErrors(refDestructuringErrors, true);
    }

    return node;
  }; // Convert list of expression atoms to binding list.


  pp$2.toAssignableList = function (exprList, isBinding) {
    var end = exprList.length;

    for (var i = 0; i < end; i++) {
      var elt = exprList[i];

      if (elt) {
        this.toAssignable(elt, isBinding);
      }
    }

    if (end) {
      var last = exprList[end - 1];

      if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
        this.unexpected(last.argument.start);
      }
    }

    return exprList;
  }; // Parses spread element.


  pp$2.parseSpread = function (refDestructuringErrors) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    return this.finishNode(node, "SpreadElement");
  };

  pp$2.parseRestBinding = function () {
    var node = this.startNode();
    this.next(); // RestElement inside of a function parameter must be an identifier

    if (this.options.ecmaVersion === 6 && this.type !== types.name) {
      this.unexpected();
    }

    node.argument = this.parseBindingAtom();
    return this.finishNode(node, "RestElement");
  }; // Parses lvalue (assignable) atom.


  pp$2.parseBindingAtom = function () {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
        case types.bracketL:
          var node = this.startNode();
          this.next();
          node.elements = this.parseBindingList(types.bracketR, true, true);
          return this.finishNode(node, "ArrayPattern");

        case types.braceL:
          return this.parseObj(true);
      }
    }

    return this.parseIdent();
  };

  pp$2.parseBindingList = function (close, allowEmpty, allowTrailingComma) {
    var elts = [],
        first = true;

    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(types.comma);
      }

      if (allowEmpty && this.type === types.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      } else if (this.type === types.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest);
        elts.push(rest);

        if (this.type === types.comma) {
          this.raise(this.start, "Comma is not permitted after the rest element");
        }

        this.expect(close);
        break;
      } else {
        var elem = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(elem);
        elts.push(elem);
      }
    }

    return elts;
  };

  pp$2.parseBindingListItem = function (param) {
    return param;
  }; // Parses assignment pattern around given atom if possible.


  pp$2.parseMaybeDefault = function (startPos, startLoc, left) {
    left = left || this.parseBindingAtom();

    if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) {
      return left;
    }

    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  }; // Verify that a node is an lval — something that can be assigned
  // to.
  // bindingType can be either:
  // 'var' indicating that the lval creates a 'var' binding
  // 'let' indicating that the lval creates a lexical ('let' or 'const') binding
  // 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references


  pp$2.checkLVal = function (expr, bindingType, checkClashes) {
    if (bindingType === void 0) bindingType = BIND_NONE;

    switch (expr.type) {
      case "Identifier":
        if (bindingType === BIND_LEXICAL && expr.name === "let") {
          this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
        }

        if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
          this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
        }

        if (checkClashes) {
          if (has(checkClashes, expr.name)) {
            this.raiseRecoverable(expr.start, "Argument name clash");
          }

          checkClashes[expr.name] = true;
        }

        if (bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE) {
          this.declareName(expr.name, bindingType, expr.start);
        }

        break;

      case "MemberExpression":
        if (bindingType) {
          this.raiseRecoverable(expr.start, "Binding member expression");
        }

        break;

      case "ObjectPattern":
        for (var i = 0, list = expr.properties; i < list.length; i += 1) {
          var prop = list[i];
          this.checkLVal(prop, bindingType, checkClashes);
        }

        break;

      case "Property":
        // AssignmentProperty has type === "Property"
        this.checkLVal(expr.value, bindingType, checkClashes);
        break;

      case "ArrayPattern":
        for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
          var elem = list$1[i$1];

          if (elem) {
            this.checkLVal(elem, bindingType, checkClashes);
          }
        }

        break;

      case "AssignmentPattern":
        this.checkLVal(expr.left, bindingType, checkClashes);
        break;

      case "RestElement":
        this.checkLVal(expr.argument, bindingType, checkClashes);
        break;

      case "ParenthesizedExpression":
        this.checkLVal(expr.expression, bindingType, checkClashes);
        break;

      default:
        this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
    }
  }; // A recursive descent parser operates by defining functions for all


  var pp$3 = Parser.prototype; // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  pp$3.checkPropClash = function (prop, propHash, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
      return;
    }

    if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
      return;
    }

    var key = prop.key;
    var name;

    switch (key.type) {
      case "Identifier":
        name = key.name;
        break;

      case "Literal":
        name = String(key.value);
        break;

      default:
        return;
    }

    var kind = prop.kind;

    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (propHash.proto) {
          if (refDestructuringErrors) {
            if (refDestructuringErrors.doubleProto < 0) {
              refDestructuringErrors.doubleProto = key.start;
            } // Backwards-compat kludge. Can be removed in version 6.0

          } else {
            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
          }
        }

        propHash.proto = true;
      }

      return;
    }

    name = "$" + name;
    var other = propHash[name];

    if (other) {
      var redefinition;

      if (kind === "init") {
        redefinition = this.strict && other.init || other.get || other.set;
      } else {
        redefinition = other.init || other[kind];
      }

      if (redefinition) {
        this.raiseRecoverable(key.start, "Redefinition of property");
      }
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }

    other[kind] = true;
  }; // ### Expression parsing
  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.
  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initalization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).


  pp$3.parseExpression = function (noIn, refDestructuringErrors) {
    var startPos = this.start,
        startLoc = this.startLoc;
    var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);

    if (this.type === types.comma) {
      var node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];

      while (this.eat(types.comma)) {
        node.expressions.push(this.parseMaybeAssign(noIn, refDestructuringErrors));
      }

      return this.finishNode(node, "SequenceExpression");
    }

    return expr;
  }; // Parse an assignment expression. This includes applications of
  // operators like `+=`.


  pp$3.parseMaybeAssign = function (noIn, refDestructuringErrors, afterLeftParse) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) {
        return this.parseYield(noIn);
      } // The tokenizer will assume an expression is allowed after
      // `yield`, but this isn't that kind of yield
      else {
          this.exprAllowed = false;
        }
    }

    var ownDestructuringErrors = false,
        oldParenAssign = -1,
        oldTrailingComma = -1;

    if (refDestructuringErrors) {
      oldParenAssign = refDestructuringErrors.parenthesizedAssign;
      oldTrailingComma = refDestructuringErrors.trailingComma;
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
    } else {
      refDestructuringErrors = new DestructuringErrors();
      ownDestructuringErrors = true;
    }

    var startPos = this.start,
        startLoc = this.startLoc;

    if (this.type === types.parenL || this.type === types.name) {
      this.potentialArrowAt = this.start;
    }

    var left = this.parseMaybeConditional(noIn, refDestructuringErrors);

    if (afterLeftParse) {
      left = afterLeftParse.call(this, left, startPos, startLoc);
    }

    if (this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      node.operator = this.value;
      node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left;

      if (!ownDestructuringErrors) {
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
      }

      if (refDestructuringErrors.shorthandAssign >= node.left.start) {
        refDestructuringErrors.shorthandAssign = -1;
      } // reset because shorthand default was used correctly


      this.checkLVal(left);
      this.next();
      node.right = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "AssignmentExpression");
    } else {
      if (ownDestructuringErrors) {
        this.checkExpressionErrors(refDestructuringErrors, true);
      }
    }

    if (oldParenAssign > -1) {
      refDestructuringErrors.parenthesizedAssign = oldParenAssign;
    }

    if (oldTrailingComma > -1) {
      refDestructuringErrors.trailingComma = oldTrailingComma;
    }

    return left;
  }; // Parse a ternary conditional (`?:`) operator.


  pp$3.parseMaybeConditional = function (noIn, refDestructuringErrors) {
    var startPos = this.start,
        startLoc = this.startLoc;
    var expr = this.parseExprOps(noIn, refDestructuringErrors);

    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }

    if (this.eat(types.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(types.colon);
      node.alternate = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "ConditionalExpression");
    }

    return expr;
  }; // Start the precedence parser.


  pp$3.parseExprOps = function (noIn, refDestructuringErrors) {
    var startPos = this.start,
        startLoc = this.startLoc;
    var expr = this.parseMaybeUnary(refDestructuringErrors, false);

    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }

    return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  }; // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.


  pp$3.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
    var prec = this.type.binop;

    if (prec != null && (!noIn || this.type !== types._in)) {
      if (prec > minPrec) {
        var logical = this.type === types.logicalOR || this.type === types.logicalAND;
        var op = this.value;
        this.next();
        var startPos = this.start,
            startLoc = this.startLoc;
        var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
        var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
      }
    }

    return left;
  };

  pp$3.buildBinary = function (startPos, startLoc, left, right, op, logical) {
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
  }; // Parse unary operators, both prefix and postfix.


  pp$3.parseMaybeUnary = function (refDestructuringErrors, sawUnary) {
    var startPos = this.start,
        startLoc = this.startLoc,
        expr;

    if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction)) {
      expr = this.parseAwait();
      sawUnary = true;
    } else if (this.type.prefix) {
      var node = this.startNode(),
          update = this.type === types.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(null, true);
      this.checkExpressionErrors(refDestructuringErrors, true);

      if (update) {
        this.checkLVal(node.argument);
      } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
        this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
      } else {
        sawUnary = true;
      }

      expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    } else {
      expr = this.parseExprSubscripts(refDestructuringErrors);

      if (this.checkExpressionErrors(refDestructuringErrors)) {
        return expr;
      }

      while (this.type.postfix && !this.canInsertSemicolon()) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value;
        node$1.prefix = false;
        node$1.argument = expr;
        this.checkLVal(expr);
        this.next();
        expr = this.finishNode(node$1, "UpdateExpression");
      }
    }

    if (!sawUnary && this.eat(types.starstar)) {
      return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false);
    } else {
      return expr;
    }
  }; // Parse call, dot, and `[]`-subscript expressions.


  pp$3.parseExprSubscripts = function (refDestructuringErrors) {
    var startPos = this.start,
        startLoc = this.startLoc;
    var expr = this.parseExprAtom(refDestructuringErrors);

    if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
      return expr;
    }

    var result = this.parseSubscripts(expr, startPos, startLoc);

    if (refDestructuringErrors && result.type === "MemberExpression") {
      if (refDestructuringErrors.parenthesizedAssign >= result.start) {
        refDestructuringErrors.parenthesizedAssign = -1;
      }

      if (refDestructuringErrors.parenthesizedBind >= result.start) {
        refDestructuringErrors.parenthesizedBind = -1;
      }
    }

    return result;
  };

  pp$3.parseSubscripts = function (base, startPos, startLoc, noCalls) {
    var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && this.input.slice(base.start, base.end) === "async";

    while (true) {
      var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow);

      if (element === base || element.type === "ArrowFunctionExpression") {
        return element;
      }

      base = element;
    }
  };

  pp$3.parseSubscript = function (base, startPos, startLoc, noCalls, maybeAsyncArrow) {
    var computed = this.eat(types.bracketL);

    if (computed || this.eat(types.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = computed ? this.parseExpression() : this.parseIdent(this.options.allowReserved !== "never");
      node.computed = !!computed;

      if (computed) {
        this.expect(types.bracketR);
      }

      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types.parenL)) {
      var refDestructuringErrors = new DestructuringErrors(),
          oldYieldPos = this.yieldPos,
          oldAwaitPos = this.awaitPos,
          oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);

      if (maybeAsyncArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();

        if (this.awaitIdentPos > 0) {
          this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
        }

        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true);
      }

      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      base = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types.backQuote) {
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this.parseTemplate({
        isTagged: true
      });
      base = this.finishNode(node$2, "TaggedTemplateExpression");
    }

    return base;
  }; // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.


  pp$3.parseExprAtom = function (refDestructuringErrors) {
    // If a division operator appears in an expression position, the
    // tokenizer got confused, and we force it to read a regexp instead.
    if (this.type === types.slash) {
      this.readRegexp();
    }

    var node,
        canBeArrow = this.potentialArrowAt === this.start;

    switch (this.type) {
      case types._super:
        if (!this.allowSuper) {
          this.raise(this.start, "'super' keyword outside a method");
        }

        node = this.startNode();
        this.next();

        if (this.type === types.parenL && !this.allowDirectSuper) {
          this.raise(node.start, "super() call outside constructor of a subclass");
        } // The `super` keyword can appear at below:
        // SuperProperty:
        //     super [ Expression ]
        //     super . IdentifierName
        // SuperCall:
        //     super ( Arguments )


        if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL) {
          this.unexpected();
        }

        return this.finishNode(node, "Super");

      case types._this:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "ThisExpression");

      case types.name:
        var startPos = this.start,
            startLoc = this.startLoc,
            containsEsc = this.containsEsc;
        var id = this.parseIdent(false);

        if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function)) {
          return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true);
        }

        if (canBeArrow && !this.canInsertSemicolon()) {
          if (this.eat(types.arrow)) {
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false);
          }

          if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) {
            id = this.parseIdent(false);

            if (this.canInsertSemicolon() || !this.eat(types.arrow)) {
              this.unexpected();
            }

            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true);
          }
        }

        return id;

      case types.regexp:
        var value = this.value;
        node = this.parseLiteral(value.value);
        node.regex = {
          pattern: value.pattern,
          flags: value.flags
        };
        return node;

      case types.num:
      case types.string:
        return this.parseLiteral(this.value);

      case types._null:
      case types._true:
      case types._false:
        node = this.startNode();
        node.value = this.type === types._null ? null : this.type === types._true;
        node.raw = this.type.keyword;
        this.next();
        return this.finishNode(node, "Literal");

      case types.parenL:
        var start = this.start,
            expr = this.parseParenAndDistinguishExpression(canBeArrow);

        if (refDestructuringErrors) {
          if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
            refDestructuringErrors.parenthesizedAssign = start;
          }

          if (refDestructuringErrors.parenthesizedBind < 0) {
            refDestructuringErrors.parenthesizedBind = start;
          }
        }

        return expr;

      case types.bracketL:
        node = this.startNode();
        this.next();
        node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
        return this.finishNode(node, "ArrayExpression");

      case types.braceL:
        return this.parseObj(false, refDestructuringErrors);

      case types._function:
        node = this.startNode();
        this.next();
        return this.parseFunction(node, 0);

      case types._class:
        return this.parseClass(this.startNode(), false);

      case types._new:
        return this.parseNew();

      case types.backQuote:
        return this.parseTemplate();

      case types._import:
        if (this.options.ecmaVersion >= 11) {
          return this.parseExprImport();
        } else {
          return this.unexpected();
        }

      default:
        this.unexpected();
    }
  };

  pp$3.parseExprImport = function () {
    var node = this.startNode();
    this.next(); // skip `import`

    switch (this.type) {
      case types.parenL:
        return this.parseDynamicImport(node);

      default:
        this.unexpected();
    }
  };

  pp$3.parseDynamicImport = function (node) {
    this.next(); // skip `(`
    // Parse node.source.

    node.source = this.parseMaybeAssign(); // Verify ending.

    if (!this.eat(types.parenR)) {
      var errorPos = this.start;

      if (this.eat(types.comma) && this.eat(types.parenR)) {
        this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
      } else {
        this.unexpected(errorPos);
      }
    }

    return this.finishNode(node, "ImportExpression");
  };

  pp$3.parseLiteral = function (value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);

    if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
      node.bigint = node.raw.slice(0, -1);
    }

    this.next();
    return this.finishNode(node, "Literal");
  };

  pp$3.parseParenExpression = function () {
    this.expect(types.parenL);
    var val = this.parseExpression();
    this.expect(types.parenR);
    return val;
  };

  pp$3.parseParenAndDistinguishExpression = function (canBeArrow) {
    var startPos = this.start,
        startLoc = this.startLoc,
        val,
        allowTrailingComma = this.options.ecmaVersion >= 8;

    if (this.options.ecmaVersion >= 6) {
      this.next();
      var innerStartPos = this.start,
          innerStartLoc = this.startLoc;
      var exprList = [],
          first = true,
          lastIsComma = false;
      var refDestructuringErrors = new DestructuringErrors(),
          oldYieldPos = this.yieldPos,
          oldAwaitPos = this.awaitPos,
          spreadStart;
      this.yieldPos = 0;
      this.awaitPos = 0; // Do not save awaitIdentPos to allow checking awaits nested in parameters

      while (this.type !== types.parenR) {
        first ? first = false : this.expect(types.comma);

        if (allowTrailingComma && this.afterTrailingComma(types.parenR, true)) {
          lastIsComma = true;
          break;
        } else if (this.type === types.ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRestBinding()));

          if (this.type === types.comma) {
            this.raise(this.start, "Comma is not permitted after the rest element");
          }

          break;
        } else {
          exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
        }
      }

      var innerEndPos = this.start,
          innerEndLoc = this.startLoc;
      this.expect(types.parenR);

      if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        return this.parseParenArrowList(startPos, startLoc, exprList);
      }

      if (!exprList.length || lastIsComma) {
        this.unexpected(this.lastTokStart);
      }

      if (spreadStart) {
        this.unexpected(spreadStart);
      }

      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;

      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }

    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression");
    } else {
      return val;
    }
  };

  pp$3.parseParenItem = function (item) {
    return item;
  };

  pp$3.parseParenArrowList = function (startPos, startLoc, exprList) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
  }; // New's precedence is slightly tricky. It must allow its argument to
  // be a `[]` or dot subscript expression, but not a call — at least,
  // not without wrapping it in parentheses. Thus, it uses the noCalls
  // argument to parseSubscripts to prevent it from consuming the
  // argument list.


  var empty$1 = [];

  pp$3.parseNew = function () {
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    }

    var node = this.startNode();
    var meta = this.parseIdent(true);

    if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
      node.meta = meta;
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);

      if (node.property.name !== "target" || containsEsc) {
        this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target");
      }

      if (!this.inNonArrowFunction()) {
        this.raiseRecoverable(node.start, "new.target can only be used in functions");
      }

      return this.finishNode(node, "MetaProperty");
    }

    var startPos = this.start,
        startLoc = this.startLoc,
        isImport = this.type === types._import;
    node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);

    if (isImport && node.callee.type === "ImportExpression") {
      this.raise(startPos, "Cannot use new with import()");
    }

    if (this.eat(types.parenL)) {
      node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false);
    } else {
      node.arguments = empty$1;
    }

    return this.finishNode(node, "NewExpression");
  }; // Parse template expression.


  pp$3.parseTemplateElement = function (ref) {
    var isTagged = ref.isTagged;
    var elem = this.startNode();

    if (this.type === types.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
      }

      elem.value = {
        raw: this.value,
        cooked: null
      };
    } else {
      elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value
      };
    }

    this.next();
    elem.tail = this.type === types.backQuote;
    return this.finishNode(elem, "TemplateElement");
  };

  pp$3.parseTemplate = function (ref) {
    if (ref === void 0) ref = {};
    var isTagged = ref.isTagged;
    if (isTagged === void 0) isTagged = false;
    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement({
      isTagged: isTagged
    });
    node.quasis = [curElt];

    while (!curElt.tail) {
      if (this.type === types.eof) {
        this.raise(this.pos, "Unterminated template literal");
      }

      this.expect(types.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(types.braceR);
      node.quasis.push(curElt = this.parseTemplateElement({
        isTagged: isTagged
      }));
    }

    this.next();
    return this.finishNode(node, "TemplateLiteral");
  };

  pp$3.isAsyncProp = function (prop) {
    return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  }; // Parse an object literal or binding pattern.


  pp$3.parseObj = function (isPattern, refDestructuringErrors) {
    var node = this.startNode(),
        first = true,
        propHash = {};
    node.properties = [];
    this.next();

    while (!this.eat(types.braceR)) {
      if (!first) {
        this.expect(types.comma);

        if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types.braceR)) {
          break;
        }
      } else {
        first = false;
      }

      var prop = this.parseProperty(isPattern, refDestructuringErrors);

      if (!isPattern) {
        this.checkPropClash(prop, propHash, refDestructuringErrors);
      }

      node.properties.push(prop);
    }

    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
  };

  pp$3.parseProperty = function (isPattern, refDestructuringErrors) {
    var prop = this.startNode(),
        isGenerator,
        isAsync,
        startPos,
        startLoc;

    if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
      if (isPattern) {
        prop.argument = this.parseIdent(false);

        if (this.type === types.comma) {
          this.raise(this.start, "Comma is not permitted after the rest element");
        }

        return this.finishNode(prop, "RestElement");
      } // To disallow parenthesized identifier via `this.toAssignable()`.


      if (this.type === types.parenL && refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0) {
          refDestructuringErrors.parenthesizedAssign = this.start;
        }

        if (refDestructuringErrors.parenthesizedBind < 0) {
          refDestructuringErrors.parenthesizedBind = this.start;
        }
      } // Parse argument.


      prop.argument = this.parseMaybeAssign(false, refDestructuringErrors); // To disallow trailing comma via `this.toAssignable()`.

      if (this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      } // Finish


      return this.finishNode(prop, "SpreadElement");
    }

    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;

      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }

      if (!isPattern) {
        isGenerator = this.eat(types.star);
      }
    }

    var containsEsc = this.containsEsc;
    this.parsePropertyName(prop);

    if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
      this.parsePropertyName(prop, refDestructuringErrors);
    } else {
      isAsync = false;
    }

    this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
    return this.finishNode(prop, "Property");
  };

  pp$3.parsePropertyValue = function (prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
    if ((isGenerator || isAsync) && this.type === types.colon) {
      this.unexpected();
    }

    if (this.eat(types.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
      if (isPattern) {
        this.unexpected();
      }

      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
    } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type !== types.comma && this.type !== types.braceR) {
      if (isGenerator || isAsync) {
        this.unexpected();
      }

      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      prop.value = this.parseMethod(false);
      var paramCount = prop.kind === "get" ? 0 : 1;

      if (prop.value.params.length !== paramCount) {
        var start = prop.value.start;

        if (prop.kind === "get") {
          this.raiseRecoverable(start, "getter should have no params");
        } else {
          this.raiseRecoverable(start, "setter should have exactly one param");
        }
      } else {
        if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
          this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
        }
      }
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      if (isGenerator || isAsync) {
        this.unexpected();
      }

      this.checkUnreserved(prop.key);

      if (prop.key.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = startPos;
      }

      prop.kind = "init";

      if (isPattern) {
        prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
      } else if (this.type === types.eq && refDestructuringErrors) {
        if (refDestructuringErrors.shorthandAssign < 0) {
          refDestructuringErrors.shorthandAssign = this.start;
        }

        prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
      } else {
        prop.value = prop.key;
      }

      prop.shorthand = true;
    } else {
      this.unexpected();
    }
  };

  pp$3.parsePropertyName = function (prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types.bracketR);
        return prop.key;
      } else {
        prop.computed = false;
      }
    }

    return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  }; // Initialize empty function node.


  pp$3.initFunction = function (node) {
    node.id = null;

    if (this.options.ecmaVersion >= 6) {
      node.generator = node.expression = false;
    }

    if (this.options.ecmaVersion >= 8) {
      node.async = false;
    }
  }; // Parse object or class method.


  pp$3.parseMethod = function (isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(),
        oldYieldPos = this.yieldPos,
        oldAwaitPos = this.awaitPos,
        oldAwaitIdentPos = this.awaitIdentPos;
    this.initFunction(node);

    if (this.options.ecmaVersion >= 6) {
      node.generator = isGenerator;
    }

    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
    this.expect(types.parenL);
    node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(node, false, true);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "FunctionExpression");
  }; // Parse arrow function expression with given parameters.


  pp$3.parseArrowExpression = function (node, params, isAsync) {
    var oldYieldPos = this.yieldPos,
        oldAwaitPos = this.awaitPos,
        oldAwaitIdentPos = this.awaitIdentPos;
    this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
    this.initFunction(node);

    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true, false);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "ArrowFunctionExpression");
  }; // Parse function body and check parameters.


  pp$3.parseFunctionBody = function (node, isArrowFunction, isMethod) {
    var isExpression = isArrowFunction && this.type !== types.braceL;
    var oldStrict = this.strict,
        useStrict = false;

    if (isExpression) {
      node.body = this.parseMaybeAssign();
      node.expression = true;
      this.checkParams(node, false);
    } else {
      var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);

      if (!oldStrict || nonSimple) {
        useStrict = this.strictDirective(this.end); // If this is a strict mode function, verify that argument names
        // are not repeated, and it does not try to bind the words `eval`
        // or `arguments`.

        if (useStrict && nonSimple) {
          this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
        }
      } // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).


      var oldLabels = this.labels;
      this.labels = [];

      if (useStrict) {
        this.strict = true;
      } // Add the params to varDeclaredNames to ensure that an error is thrown
      // if a let/const declaration in the function clashes with one of the params.


      this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
      node.body = this.parseBlock(false);
      node.expression = false;
      this.adaptDirectivePrologue(node.body.body);
      this.labels = oldLabels;
    }

    this.exitScope(); // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'

    if (this.strict && node.id) {
      this.checkLVal(node.id, BIND_OUTSIDE);
    }

    this.strict = oldStrict;
  };

  pp$3.isSimpleParamList = function (params) {
    for (var i = 0, list = params; i < list.length; i += 1) {
      var param = list[i];

      if (param.type !== "Identifier") {
        return false;
      }
    }

    return true;
  }; // Checks function params for various disallowed patterns such as using "eval"
  // or "arguments" and duplicate parameters.


  pp$3.checkParams = function (node, allowDuplicates) {
    var nameHash = {};

    for (var i = 0, list = node.params; i < list.length; i += 1) {
      var param = list[i];
      this.checkLVal(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  }; // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).


  pp$3.parseExprList = function (close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
    var elts = [],
        first = true;

    while (!this.eat(close)) {
      if (!first) {
        this.expect(types.comma);

        if (allowTrailingComma && this.afterTrailingComma(close)) {
          break;
        }
      } else {
        first = false;
      }

      var elt = void 0;

      if (allowEmpty && this.type === types.comma) {
        elt = null;
      } else if (this.type === types.ellipsis) {
        elt = this.parseSpread(refDestructuringErrors);

        if (refDestructuringErrors && this.type === types.comma && refDestructuringErrors.trailingComma < 0) {
          refDestructuringErrors.trailingComma = this.start;
        }
      } else {
        elt = this.parseMaybeAssign(false, refDestructuringErrors);
      }

      elts.push(elt);
    }

    return elts;
  };

  pp$3.checkUnreserved = function (ref) {
    var start = ref.start;
    var end = ref.end;
    var name = ref.name;

    if (this.inGenerator && name === "yield") {
      this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
    }

    if (this.inAsync && name === "await") {
      this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
    }

    if (this.keywords.test(name)) {
      this.raise(start, "Unexpected keyword '" + name + "'");
    }

    if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
      return;
    }

    var re = this.strict ? this.reservedWordsStrict : this.reservedWords;

    if (re.test(name)) {
      if (!this.inAsync && name === "await") {
        this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
      }

      this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
    }
  }; // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.


  pp$3.parseIdent = function (liberal, isBinding) {
    var node = this.startNode();

    if (this.type === types.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword; // To fix https://github.com/acornjs/acorn/issues/575
      // `class` and `function` keywords push new context into this.context.
      // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
      // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword

      if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
        this.context.pop();
      }
    } else {
      this.unexpected();
    }

    this.next(!!liberal);
    this.finishNode(node, "Identifier");

    if (!liberal) {
      this.checkUnreserved(node);

      if (node.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = node.start;
      }
    }

    return node;
  }; // Parses yield expression inside generator.


  pp$3.parseYield = function (noIn) {
    if (!this.yieldPos) {
      this.yieldPos = this.start;
    }

    var node = this.startNode();
    this.next();

    if (this.type === types.semi || this.canInsertSemicolon() || this.type !== types.star && !this.type.startsExpr) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types.star);
      node.argument = this.parseMaybeAssign(noIn);
    }

    return this.finishNode(node, "YieldExpression");
  };

  pp$3.parseAwait = function () {
    if (!this.awaitPos) {
      this.awaitPos = this.start;
    }

    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeUnary(null, false);
    return this.finishNode(node, "AwaitExpression");
  };

  var pp$4 = Parser.prototype; // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  pp$4.raise = function (pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    err.pos = pos;
    err.loc = loc;
    err.raisedAt = this.pos;
    throw err;
  };

  pp$4.raiseRecoverable = pp$4.raise;

  pp$4.curPosition = function () {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart);
    }
  };

  var pp$5 = Parser.prototype;

  var Scope = function Scope(flags) {
    this.flags = flags; // A list of var-declared names in the current lexical scope

    this["var"] = []; // A list of lexically-declared names in the current lexical scope

    this.lexical = []; // A list of lexically-declared FunctionDeclaration names in the current lexical scope

    this.functions = [];
  }; // The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.


  pp$5.enterScope = function (flags) {
    this.scopeStack.push(new Scope(flags));
  };

  pp$5.exitScope = function () {
    this.scopeStack.pop();
  }; // The spec says:
  // > At the top level of a function, or script, function declarations are
  // > treated like var declarations rather than like lexical declarations.


  pp$5.treatFunctionsAsVarInScope = function (scope) {
    return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
  };

  pp$5.declareName = function (name, bindingType, pos) {
    var redeclared = false;

    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope["var"].indexOf(name) > -1;
      scope.lexical.push(name);

      if (this.inModule && scope.flags & SCOPE_TOP) {
        delete this.undefinedExports[name];
      }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();

      if (this.treatFunctionsAsVar) {
        redeclared = scope$2.lexical.indexOf(name) > -1;
      } else {
        redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2["var"].indexOf(name) > -1;
      }

      scope$2.functions.push(name);
    } else {
      for (var i = this.scopeStack.length - 1; i >= 0; --i) {
        var scope$3 = this.scopeStack[i];

        if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
          redeclared = true;
          break;
        }

        scope$3["var"].push(name);

        if (this.inModule && scope$3.flags & SCOPE_TOP) {
          delete this.undefinedExports[name];
        }

        if (scope$3.flags & SCOPE_VAR) {
          break;
        }
      }
    }

    if (redeclared) {
      this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
    }
  };

  pp$5.checkLocalExport = function (id) {
    // scope.functions must be empty as Module code is always strict.
    if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0]["var"].indexOf(id.name) === -1) {
      this.undefinedExports[id.name] = id;
    }
  };

  pp$5.currentScope = function () {
    return this.scopeStack[this.scopeStack.length - 1];
  };

  pp$5.currentVarScope = function () {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];

      if (scope.flags & SCOPE_VAR) {
        return scope;
      }
    }
  }; // Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.


  pp$5.currentThisScope = function () {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];

      if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
        return scope;
      }
    }
  };

  var Node = function Node(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;

    if (parser.options.locations) {
      this.loc = new SourceLocation(parser, loc);
    }

    if (parser.options.directSourceFile) {
      this.sourceFile = parser.options.directSourceFile;
    }

    if (parser.options.ranges) {
      this.range = [pos, 0];
    }
  }; // Start an AST node, attaching a start offset.


  var pp$6 = Parser.prototype;

  pp$6.startNode = function () {
    return new Node(this, this.start, this.startLoc);
  };

  pp$6.startNodeAt = function (pos, loc) {
    return new Node(this, pos, loc);
  }; // Finish an AST node, adding `type` and `end` properties.


  function finishNodeAt(node, type, pos, loc) {
    node.type = type;
    node.end = pos;

    if (this.options.locations) {
      node.loc.end = loc;
    }

    if (this.options.ranges) {
      node.range[1] = pos;
    }

    return node;
  }

  pp$6.finishNode = function (node, type) {
    return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
  }; // Finish node at given position


  pp$6.finishNodeAt = function (node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc);
  }; // The algorithm used to determine whether a regexp can appear at a


  var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  };

  var types$1 = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function (p) {
      return p.tryReadTemplateToken();
    }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true)
  };
  var pp$7 = Parser.prototype;

  pp$7.initialContext = function () {
    return [types$1.b_stat];
  };

  pp$7.braceIsBlock = function (prevType) {
    var parent = this.curContext();

    if (parent === types$1.f_expr || parent === types$1.f_stat) {
      return true;
    }

    if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr)) {
      return !parent.isExpr;
    } // The check for `tt.name && exprAllowed` detects whether we are
    // after a `yield` or `of` construct. See the `updateContext` for
    // `tt.name`.


    if (prevType === types._return || prevType === types.name && this.exprAllowed) {
      return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    }

    if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow) {
      return true;
    }

    if (prevType === types.braceL) {
      return parent === types$1.b_stat;
    }

    if (prevType === types._var || prevType === types._const || prevType === types.name) {
      return false;
    }

    return !this.exprAllowed;
  };

  pp$7.inGeneratorContext = function () {
    for (var i = this.context.length - 1; i >= 1; i--) {
      var context = this.context[i];

      if (context.token === "function") {
        return context.generator;
      }
    }

    return false;
  };

  pp$7.updateContext = function (prevType) {
    var update,
        type = this.type;

    if (type.keyword && prevType === types.dot) {
      this.exprAllowed = false;
    } else if (update = type.updateContext) {
      update.call(this, prevType);
    } else {
      this.exprAllowed = type.beforeExpr;
    }
  }; // Token-specific context update code


  types.parenR.updateContext = types.braceR.updateContext = function () {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return;
    }

    var out = this.context.pop();

    if (out === types$1.b_stat && this.curContext().token === "function") {
      out = this.context.pop();
    }

    this.exprAllowed = !out.isExpr;
  };

  types.braceL.updateContext = function (prevType) {
    this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
    this.exprAllowed = true;
  };

  types.dollarBraceL.updateContext = function () {
    this.context.push(types$1.b_tmpl);
    this.exprAllowed = true;
  };

  types.parenL.updateContext = function (prevType) {
    var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
    this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
    this.exprAllowed = true;
  };

  types.incDec.updateContext = function () {// tokExprAllowed stays unchanged
  };

  types._function.updateContext = types._class.updateContext = function (prevType) {
    if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else && !(prevType === types._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat)) {
      this.context.push(types$1.f_expr);
    } else {
      this.context.push(types$1.f_stat);
    }

    this.exprAllowed = false;
  };

  types.backQuote.updateContext = function () {
    if (this.curContext() === types$1.q_tmpl) {
      this.context.pop();
    } else {
      this.context.push(types$1.q_tmpl);
    }

    this.exprAllowed = false;
  };

  types.star.updateContext = function (prevType) {
    if (prevType === types._function) {
      var index = this.context.length - 1;

      if (this.context[index] === types$1.f_expr) {
        this.context[index] = types$1.f_expr_gen;
      } else {
        this.context[index] = types$1.f_gen;
      }
    }

    this.exprAllowed = true;
  };

  types.name.updateContext = function (prevType) {
    var allowed = false;

    if (this.options.ecmaVersion >= 6 && prevType !== types.dot) {
      if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
        allowed = true;
      }
    }

    this.exprAllowed = allowed;
  }; // This file contains Unicode properties extracted from the ECMAScript
  // specification. The lists are extracted like so:
  // $$('#table-binary-unicode-properties > figure > table > tbody > tr > td:nth-child(1) code').map(el => el.innerText)
  // #table-binary-unicode-properties


  var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
  var ecma11BinaryProperties = ecma10BinaryProperties;
  var unicodeBinaryProperties = {
    9: ecma9BinaryProperties,
    10: ecma10BinaryProperties,
    11: ecma11BinaryProperties
  }; // #table-unicode-general-category-values

  var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu"; // #table-unicode-script-values

  var ecma9ScriptValues = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var unicodeScriptValues = {
    9: ecma9ScriptValues,
    10: ecma10ScriptValues,
    11: ecma11ScriptValues
  };
  var data = {};

  function buildUnicodeData(ecmaVersion) {
    var d = data[ecmaVersion] = {
      binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
      nonBinary: {
        General_Category: wordsRegexp(unicodeGeneralCategoryValues),
        Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
      }
    };
    d.nonBinary.Script_Extensions = d.nonBinary.Script;
    d.nonBinary.gc = d.nonBinary.General_Category;
    d.nonBinary.sc = d.nonBinary.Script;
    d.nonBinary.scx = d.nonBinary.Script_Extensions;
  }

  buildUnicodeData(9);
  buildUnicodeData(10);
  buildUnicodeData(11);
  var pp$8 = Parser.prototype;

  var RegExpValidationState = function RegExpValidationState(parser) {
    this.parser = parser;
    this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "");
    this.unicodeProperties = data[parser.options.ecmaVersion >= 11 ? 11 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = [];
    this.backReferenceNames = [];
  };

  RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0;
    this.source = pattern + "";
    this.flags = flags;
    this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
    this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
  };

  RegExpValidationState.prototype.raise = function raise(message) {
    this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
  }; // If u flag is given, this returns the code point at the index (it combines a surrogate pair).
  // Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).


  RegExpValidationState.prototype.at = function at(i) {
    var s = this.source;
    var l = s.length;

    if (i >= l) {
      return -1;
    }

    var c = s.charCodeAt(i);

    if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
      return c;
    }

    var next = s.charCodeAt(i + 1);
    return next >= 0xDC00 && next <= 0xDFFF ? (c << 10) + next - 0x35FDC00 : c;
  };

  RegExpValidationState.prototype.nextIndex = function nextIndex(i) {
    var s = this.source;
    var l = s.length;

    if (i >= l) {
      return l;
    }

    var c = s.charCodeAt(i),
        next;

    if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 0xDC00 || next > 0xDFFF) {
      return i + 1;
    }

    return i + 2;
  };

  RegExpValidationState.prototype.current = function current() {
    return this.at(this.pos);
  };

  RegExpValidationState.prototype.lookahead = function lookahead() {
    return this.at(this.nextIndex(this.pos));
  };

  RegExpValidationState.prototype.advance = function advance() {
    this.pos = this.nextIndex(this.pos);
  };

  RegExpValidationState.prototype.eat = function eat(ch) {
    if (this.current() === ch) {
      this.advance();
      return true;
    }

    return false;
  };

  function codePointToString(ch) {
    if (ch <= 0xFFFF) {
      return String.fromCharCode(ch);
    }

    ch -= 0x10000;
    return String.fromCharCode((ch >> 10) + 0xD800, (ch & 0x03FF) + 0xDC00);
  }
  /**
   * Validate the flags part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */


  pp$8.validateRegExpFlags = function (state) {
    var validFlags = state.validFlags;
    var flags = state.flags;

    for (var i = 0; i < flags.length; i++) {
      var flag = flags.charAt(i);

      if (validFlags.indexOf(flag) === -1) {
        this.raise(state.start, "Invalid regular expression flag");
      }

      if (flags.indexOf(flag, i + 1) > -1) {
        this.raise(state.start, "Duplicate regular expression flag");
      }
    }
  };
  /**
   * Validate the pattern part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */


  pp$8.validateRegExpPattern = function (state) {
    this.regexp_pattern(state); // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
    // parsing contains a |GroupName|, reparse with the goal symbol
    // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
    // exception if _P_ did not conform to the grammar, if any elements of _P_
    // were not matched by the parse, or if any Early Error conditions exist.

    if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
      state.switchN = true;
      this.regexp_pattern(state);
    }
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern


  pp$8.regexp_pattern = function (state) {
    state.pos = 0;
    state.lastIntValue = 0;
    state.lastStringValue = "";
    state.lastAssertionIsQuantifiable = false;
    state.numCapturingParens = 0;
    state.maxBackReference = 0;
    state.groupNames.length = 0;
    state.backReferenceNames.length = 0;
    this.regexp_disjunction(state);

    if (state.pos !== state.source.length) {
      // Make the same messages as V8.
      if (state.eat(0x29
      /* ) */
      )) {
        state.raise("Unmatched ')'");
      }

      if (state.eat(0x5D
      /* ] */
      ) || state.eat(0x7D
      /* } */
      )) {
        state.raise("Lone quantifier brackets");
      }
    }

    if (state.maxBackReference > state.numCapturingParens) {
      state.raise("Invalid escape");
    }

    for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
      var name = list[i];

      if (state.groupNames.indexOf(name) === -1) {
        state.raise("Invalid named capture referenced");
      }
    }
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction


  pp$8.regexp_disjunction = function (state) {
    this.regexp_alternative(state);

    while (state.eat(0x7C
    /* | */
    )) {
      this.regexp_alternative(state);
    } // Make the same message as V8.


    if (this.regexp_eatQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }

    if (state.eat(0x7B
    /* { */
    )) {
      state.raise("Lone quantifier brackets");
    }
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative


  pp$8.regexp_alternative = function (state) {
    while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term


  pp$8.regexp_eatTerm = function (state) {
    if (this.regexp_eatAssertion(state)) {
      // Handle `QuantifiableAssertion Quantifier` alternative.
      // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
      // is a QuantifiableAssertion.
      if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
        // Make the same message as V8.
        if (state.switchU) {
          state.raise("Invalid quantifier");
        }
      }

      return true;
    }

    if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
      this.regexp_eatQuantifier(state);
      return true;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion


  pp$8.regexp_eatAssertion = function (state) {
    var start = state.pos;
    state.lastAssertionIsQuantifiable = false; // ^, $

    if (state.eat(0x5E
    /* ^ */
    ) || state.eat(0x24
    /* $ */
    )) {
      return true;
    } // \b \B


    if (state.eat(0x5C
    /* \ */
    )) {
      if (state.eat(0x42
      /* B */
      ) || state.eat(0x62
      /* b */
      )) {
        return true;
      }

      state.pos = start;
    } // Lookahead / Lookbehind


    if (state.eat(0x28
    /* ( */
    ) && state.eat(0x3F
    /* ? */
    )) {
      var lookbehind = false;

      if (this.options.ecmaVersion >= 9) {
        lookbehind = state.eat(0x3C
        /* < */
        );
      }

      if (state.eat(0x3D
      /* = */
      ) || state.eat(0x21
      /* ! */
      )) {
        this.regexp_disjunction(state);

        if (!state.eat(0x29
        /* ) */
        )) {
          state.raise("Unterminated group");
        }

        state.lastAssertionIsQuantifiable = !lookbehind;
        return true;
      }
    }

    state.pos = start;
    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier


  pp$8.regexp_eatQuantifier = function (state, noError) {
    if (noError === void 0) noError = false;

    if (this.regexp_eatQuantifierPrefix(state, noError)) {
      state.eat(0x3F
      /* ? */
      );
      return true;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix


  pp$8.regexp_eatQuantifierPrefix = function (state, noError) {
    return state.eat(0x2A
    /* * */
    ) || state.eat(0x2B
    /* + */
    ) || state.eat(0x3F
    /* ? */
    ) || this.regexp_eatBracedQuantifier(state, noError);
  };

  pp$8.regexp_eatBracedQuantifier = function (state, noError) {
    var start = state.pos;

    if (state.eat(0x7B
    /* { */
    )) {
      var min = 0,
          max = -1;

      if (this.regexp_eatDecimalDigits(state)) {
        min = state.lastIntValue;

        if (state.eat(0x2C
        /* , */
        ) && this.regexp_eatDecimalDigits(state)) {
          max = state.lastIntValue;
        }

        if (state.eat(0x7D
        /* } */
        )) {
          // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
          if (max !== -1 && max < min && !noError) {
            state.raise("numbers out of order in {} quantifier");
          }

          return true;
        }
      }

      if (state.switchU && !noError) {
        state.raise("Incomplete quantifier");
      }

      state.pos = start;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom


  pp$8.regexp_eatAtom = function (state) {
    return this.regexp_eatPatternCharacters(state) || state.eat(0x2E
    /* . */
    ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
  };

  pp$8.regexp_eatReverseSolidusAtomEscape = function (state) {
    var start = state.pos;

    if (state.eat(0x5C
    /* \ */
    )) {
      if (this.regexp_eatAtomEscape(state)) {
        return true;
      }

      state.pos = start;
    }

    return false;
  };

  pp$8.regexp_eatUncapturingGroup = function (state) {
    var start = state.pos;

    if (state.eat(0x28
    /* ( */
    )) {
      if (state.eat(0x3F
      /* ? */
      ) && state.eat(0x3A
      /* : */
      )) {
        this.regexp_disjunction(state);

        if (state.eat(0x29
        /* ) */
        )) {
          return true;
        }

        state.raise("Unterminated group");
      }

      state.pos = start;
    }

    return false;
  };

  pp$8.regexp_eatCapturingGroup = function (state) {
    if (state.eat(0x28
    /* ( */
    )) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(state);
      } else if (state.current() === 0x3F
      /* ? */
      ) {
          state.raise("Invalid group");
        }

      this.regexp_disjunction(state);

      if (state.eat(0x29
      /* ) */
      )) {
        state.numCapturingParens += 1;
        return true;
      }

      state.raise("Unterminated group");
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom


  pp$8.regexp_eatExtendedAtom = function (state) {
    return state.eat(0x2E
    /* . */
    ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier


  pp$8.regexp_eatInvalidBracedQuantifier = function (state) {
    if (this.regexp_eatBracedQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter


  pp$8.regexp_eatSyntaxCharacter = function (state) {
    var ch = state.current();

    if (isSyntaxCharacter(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }

    return false;
  };

  function isSyntaxCharacter(ch) {
    return ch === 0x24
    /* $ */
    || ch >= 0x28
    /* ( */
    && ch <= 0x2B
    /* + */
    || ch === 0x2E
    /* . */
    || ch === 0x3F
    /* ? */
    || ch >= 0x5B
    /* [ */
    && ch <= 0x5E
    /* ^ */
    || ch >= 0x7B
    /* { */
    && ch <= 0x7D
    /* } */
    ;
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
  // But eat eager.


  pp$8.regexp_eatPatternCharacters = function (state) {
    var start = state.pos;
    var ch = 0;

    while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
      state.advance();
    }

    return state.pos !== start;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter


  pp$8.regexp_eatExtendedPatternCharacter = function (state) {
    var ch = state.current();

    if (ch !== -1 && ch !== 0x24
    /* $ */
    && !(ch >= 0x28
    /* ( */
    && ch <= 0x2B
    /* + */
    ) && ch !== 0x2E
    /* . */
    && ch !== 0x3F
    /* ? */
    && ch !== 0x5B
    /* [ */
    && ch !== 0x5E
    /* ^ */
    && ch !== 0x7C
    /* | */
    ) {
        state.advance();
        return true;
      }

    return false;
  }; // GroupSpecifier[U] ::
  //   [empty]
  //   `?` GroupName[?U]


  pp$8.regexp_groupSpecifier = function (state) {
    if (state.eat(0x3F
    /* ? */
    )) {
      if (this.regexp_eatGroupName(state)) {
        if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
          state.raise("Duplicate capture group name");
        }

        state.groupNames.push(state.lastStringValue);
        return;
      }

      state.raise("Invalid group");
    }
  }; // GroupName[U] ::
  //   `<` RegExpIdentifierName[?U] `>`
  // Note: this updates `state.lastStringValue` property with the eaten name.


  pp$8.regexp_eatGroupName = function (state) {
    state.lastStringValue = "";

    if (state.eat(0x3C
    /* < */
    )) {
      if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E
      /* > */
      )) {
        return true;
      }

      state.raise("Invalid capture group name");
    }

    return false;
  }; // RegExpIdentifierName[U] ::
  //   RegExpIdentifierStart[?U]
  //   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
  // Note: this updates `state.lastStringValue` property with the eaten name.


  pp$8.regexp_eatRegExpIdentifierName = function (state) {
    state.lastStringValue = "";

    if (this.regexp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);

      while (this.regexp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
      }

      return true;
    }

    return false;
  }; // RegExpIdentifierStart[U] ::
  //   UnicodeIDStart
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[?U]


  pp$8.regexp_eatRegExpIdentifierStart = function (state) {
    var start = state.pos;
    var ch = state.current();
    state.advance();

    if (ch === 0x5C
    /* \ */
    && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
      ch = state.lastIntValue;
    }

    if (isRegExpIdentifierStart(ch)) {
      state.lastIntValue = ch;
      return true;
    }

    state.pos = start;
    return false;
  };

  function isRegExpIdentifierStart(ch) {
    return isIdentifierStart(ch, true) || ch === 0x24
    /* $ */
    || ch === 0x5F;
    /* _ */
  } // RegExpIdentifierPart[U] ::
  //   UnicodeIDContinue
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[?U]
  //   <ZWNJ>
  //   <ZWJ>


  pp$8.regexp_eatRegExpIdentifierPart = function (state) {
    var start = state.pos;
    var ch = state.current();
    state.advance();

    if (ch === 0x5C
    /* \ */
    && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
      ch = state.lastIntValue;
    }

    if (isRegExpIdentifierPart(ch)) {
      state.lastIntValue = ch;
      return true;
    }

    state.pos = start;
    return false;
  };

  function isRegExpIdentifierPart(ch) {
    return isIdentifierChar(ch, true) || ch === 0x24
    /* $ */
    || ch === 0x5F
    /* _ */
    || ch === 0x200C
    /* <ZWNJ> */
    || ch === 0x200D;
    /* <ZWJ> */
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape


  pp$8.regexp_eatAtomEscape = function (state) {
    if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
      return true;
    }

    if (state.switchU) {
      // Make the same message as V8.
      if (state.current() === 0x63
      /* c */
      ) {
          state.raise("Invalid unicode escape");
        }

      state.raise("Invalid escape");
    }

    return false;
  };

  pp$8.regexp_eatBackReference = function (state) {
    var start = state.pos;

    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;

      if (state.switchU) {
        // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
        if (n > state.maxBackReference) {
          state.maxBackReference = n;
        }

        return true;
      }

      if (n <= state.numCapturingParens) {
        return true;
      }

      state.pos = start;
    }

    return false;
  };

  pp$8.regexp_eatKGroupName = function (state) {
    if (state.eat(0x6B
    /* k */
    )) {
      if (this.regexp_eatGroupName(state)) {
        state.backReferenceNames.push(state.lastStringValue);
        return true;
      }

      state.raise("Invalid named reference");
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape


  pp$8.regexp_eatCharacterEscape = function (state) {
    return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
  };

  pp$8.regexp_eatCControlLetter = function (state) {
    var start = state.pos;

    if (state.eat(0x63
    /* c */
    )) {
      if (this.regexp_eatControlLetter(state)) {
        return true;
      }

      state.pos = start;
    }

    return false;
  };

  pp$8.regexp_eatZero = function (state) {
    if (state.current() === 0x30
    /* 0 */
    && !isDecimalDigit(state.lookahead())) {
      state.lastIntValue = 0;
      state.advance();
      return true;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape


  pp$8.regexp_eatControlEscape = function (state) {
    var ch = state.current();

    if (ch === 0x74
    /* t */
    ) {
        state.lastIntValue = 0x09;
        /* \t */

        state.advance();
        return true;
      }

    if (ch === 0x6E
    /* n */
    ) {
        state.lastIntValue = 0x0A;
        /* \n */

        state.advance();
        return true;
      }

    if (ch === 0x76
    /* v */
    ) {
        state.lastIntValue = 0x0B;
        /* \v */

        state.advance();
        return true;
      }

    if (ch === 0x66
    /* f */
    ) {
        state.lastIntValue = 0x0C;
        /* \f */

        state.advance();
        return true;
      }

    if (ch === 0x72
    /* r */
    ) {
        state.lastIntValue = 0x0D;
        /* \r */

        state.advance();
        return true;
      }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter


  pp$8.regexp_eatControlLetter = function (state) {
    var ch = state.current();

    if (isControlLetter(ch)) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true;
    }

    return false;
  };

  function isControlLetter(ch) {
    return ch >= 0x41
    /* A */
    && ch <= 0x5A
    /* Z */
    || ch >= 0x61
    /* a */
    && ch <= 0x7A
    /* z */
    ;
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence


  pp$8.regexp_eatRegExpUnicodeEscapeSequence = function (state) {
    var start = state.pos;

    if (state.eat(0x75
    /* u */
    )) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;

        if (state.switchU && lead >= 0xD800 && lead <= 0xDBFF) {
          var leadSurrogateEnd = state.pos;

          if (state.eat(0x5C
          /* \ */
          ) && state.eat(0x75
          /* u */
          ) && this.regexp_eatFixedHexDigits(state, 4)) {
            var trail = state.lastIntValue;

            if (trail >= 0xDC00 && trail <= 0xDFFF) {
              state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
              return true;
            }
          }

          state.pos = leadSurrogateEnd;
          state.lastIntValue = lead;
        }

        return true;
      }

      if (state.switchU && state.eat(0x7B
      /* { */
      ) && this.regexp_eatHexDigits(state) && state.eat(0x7D
      /* } */
      ) && isValidUnicode(state.lastIntValue)) {
        return true;
      }

      if (state.switchU) {
        state.raise("Invalid unicode escape");
      }

      state.pos = start;
    }

    return false;
  };

  function isValidUnicode(ch) {
    return ch >= 0 && ch <= 0x10FFFF;
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape


  pp$8.regexp_eatIdentityEscape = function (state) {
    if (state.switchU) {
      if (this.regexp_eatSyntaxCharacter(state)) {
        return true;
      }

      if (state.eat(0x2F
      /* / */
      )) {
        state.lastIntValue = 0x2F;
        /* / */

        return true;
      }

      return false;
    }

    var ch = state.current();

    if (ch !== 0x63
    /* c */
    && (!state.switchN || ch !== 0x6B
    /* k */
    )) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape


  pp$8.regexp_eatDecimalEscape = function (state) {
    state.lastIntValue = 0;
    var ch = state.current();

    if (ch >= 0x31
    /* 1 */
    && ch <= 0x39
    /* 9 */
    ) {
        do {
          state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30
          /* 0 */
          );
          state.advance();
        } while ((ch = state.current()) >= 0x30
        /* 0 */
        && ch <= 0x39
        /* 9 */
        );

        return true;
      }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape


  pp$8.regexp_eatCharacterClassEscape = function (state) {
    var ch = state.current();

    if (isCharacterClassEscape(ch)) {
      state.lastIntValue = -1;
      state.advance();
      return true;
    }

    if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 0x50
    /* P */
    || ch === 0x70
    /* p */
    )) {
      state.lastIntValue = -1;
      state.advance();

      if (state.eat(0x7B
      /* { */
      ) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(0x7D
      /* } */
      )) {
        return true;
      }

      state.raise("Invalid property name");
    }

    return false;
  };

  function isCharacterClassEscape(ch) {
    return ch === 0x64
    /* d */
    || ch === 0x44
    /* D */
    || ch === 0x73
    /* s */
    || ch === 0x53
    /* S */
    || ch === 0x77
    /* w */
    || ch === 0x57
    /* W */
    ;
  } // UnicodePropertyValueExpression ::
  //   UnicodePropertyName `=` UnicodePropertyValue
  //   LoneUnicodePropertyNameOrValue


  pp$8.regexp_eatUnicodePropertyValueExpression = function (state) {
    var start = state.pos; // UnicodePropertyName `=` UnicodePropertyValue

    if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D
    /* = */
    )) {
      var name = state.lastStringValue;

      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
        return true;
      }
    }

    state.pos = start; // LoneUnicodePropertyNameOrValue

    if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
      return true;
    }

    return false;
  };

  pp$8.regexp_validateUnicodePropertyNameAndValue = function (state, name, value) {
    if (!has(state.unicodeProperties.nonBinary, name)) {
      state.raise("Invalid property name");
    }

    if (!state.unicodeProperties.nonBinary[name].test(value)) {
      state.raise("Invalid property value");
    }
  };

  pp$8.regexp_validateUnicodePropertyNameOrValue = function (state, nameOrValue) {
    if (!state.unicodeProperties.binary.test(nameOrValue)) {
      state.raise("Invalid property name");
    }
  }; // UnicodePropertyName ::
  //   UnicodePropertyNameCharacters


  pp$8.regexp_eatUnicodePropertyName = function (state) {
    var ch = 0;
    state.lastStringValue = "";

    while (isUnicodePropertyNameCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }

    return state.lastStringValue !== "";
  };

  function isUnicodePropertyNameCharacter(ch) {
    return isControlLetter(ch) || ch === 0x5F;
    /* _ */
  } // UnicodePropertyValue ::
  //   UnicodePropertyValueCharacters


  pp$8.regexp_eatUnicodePropertyValue = function (state) {
    var ch = 0;
    state.lastStringValue = "";

    while (isUnicodePropertyValueCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }

    return state.lastStringValue !== "";
  };

  function isUnicodePropertyValueCharacter(ch) {
    return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
  } // LoneUnicodePropertyNameOrValue ::
  //   UnicodePropertyValueCharacters


  pp$8.regexp_eatLoneUnicodePropertyNameOrValue = function (state) {
    return this.regexp_eatUnicodePropertyValue(state);
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass


  pp$8.regexp_eatCharacterClass = function (state) {
    if (state.eat(0x5B
    /* [ */
    )) {
      state.eat(0x5E
      /* ^ */
      );
      this.regexp_classRanges(state);

      if (state.eat(0x5D
      /* ] */
      )) {
        return true;
      } // Unreachable since it threw "unterminated regular expression" error before.


      state.raise("Unterminated character class");
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash


  pp$8.regexp_classRanges = function (state) {
    while (this.regexp_eatClassAtom(state)) {
      var left = state.lastIntValue;

      if (state.eat(0x2D
      /* - */
      ) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;

        if (state.switchU && (left === -1 || right === -1)) {
          state.raise("Invalid character class");
        }

        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
      }
    }
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash


  pp$8.regexp_eatClassAtom = function (state) {
    var start = state.pos;

    if (state.eat(0x5C
    /* \ */
    )) {
      if (this.regexp_eatClassEscape(state)) {
        return true;
      }

      if (state.switchU) {
        // Make the same message as V8.
        var ch$1 = state.current();

        if (ch$1 === 0x63
        /* c */
        || isOctalDigit(ch$1)) {
          state.raise("Invalid class escape");
        }

        state.raise("Invalid escape");
      }

      state.pos = start;
    }

    var ch = state.current();

    if (ch !== 0x5D
    /* ] */
    ) {
        state.lastIntValue = ch;
        state.advance();
        return true;
      }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape


  pp$8.regexp_eatClassEscape = function (state) {
    var start = state.pos;

    if (state.eat(0x62
    /* b */
    )) {
      state.lastIntValue = 0x08;
      /* <BS> */

      return true;
    }

    if (state.switchU && state.eat(0x2D
    /* - */
    )) {
      state.lastIntValue = 0x2D;
      /* - */

      return true;
    }

    if (!state.switchU && state.eat(0x63
    /* c */
    )) {
      if (this.regexp_eatClassControlLetter(state)) {
        return true;
      }

      state.pos = start;
    }

    return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter


  pp$8.regexp_eatClassControlLetter = function (state) {
    var ch = state.current();

    if (isDecimalDigit(ch) || ch === 0x5F
    /* _ */
    ) {
        state.lastIntValue = ch % 0x20;
        state.advance();
        return true;
      }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence


  pp$8.regexp_eatHexEscapeSequence = function (state) {
    var start = state.pos;

    if (state.eat(0x78
    /* x */
    )) {
      if (this.regexp_eatFixedHexDigits(state, 2)) {
        return true;
      }

      if (state.switchU) {
        state.raise("Invalid escape");
      }

      state.pos = start;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits


  pp$8.regexp_eatDecimalDigits = function (state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;

    while (isDecimalDigit(ch = state.current())) {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30
      /* 0 */
      );
      state.advance();
    }

    return state.pos !== start;
  };

  function isDecimalDigit(ch) {
    return ch >= 0x30
    /* 0 */
    && ch <= 0x39;
    /* 9 */
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits


  pp$8.regexp_eatHexDigits = function (state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;

    while (isHexDigit(ch = state.current())) {
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }

    return state.pos !== start;
  };

  function isHexDigit(ch) {
    return ch >= 0x30
    /* 0 */
    && ch <= 0x39
    /* 9 */
    || ch >= 0x41
    /* A */
    && ch <= 0x46
    /* F */
    || ch >= 0x61
    /* a */
    && ch <= 0x66
    /* f */
    ;
  }

  function hexToInt(ch) {
    if (ch >= 0x41
    /* A */
    && ch <= 0x46
    /* F */
    ) {
        return 10 + (ch - 0x41
        /* A */
        );
      }

    if (ch >= 0x61
    /* a */
    && ch <= 0x66
    /* f */
    ) {
        return 10 + (ch - 0x61
        /* a */
        );
      }

    return ch - 0x30;
    /* 0 */
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
  // Allows only 0-377(octal) i.e. 0-255(decimal).


  pp$8.regexp_eatLegacyOctalEscapeSequence = function (state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;

      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;

        if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
          state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
        } else {
          state.lastIntValue = n1 * 8 + n2;
        }
      } else {
        state.lastIntValue = n1;
      }

      return true;
    }

    return false;
  }; // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit


  pp$8.regexp_eatOctalDigit = function (state) {
    var ch = state.current();

    if (isOctalDigit(ch)) {
      state.lastIntValue = ch - 0x30;
      /* 0 */

      state.advance();
      return true;
    }

    state.lastIntValue = 0;
    return false;
  };

  function isOctalDigit(ch) {
    return ch >= 0x30
    /* 0 */
    && ch <= 0x37;
    /* 7 */
  } // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
  // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence


  pp$8.regexp_eatFixedHexDigits = function (state, length) {
    var start = state.pos;
    state.lastIntValue = 0;

    for (var i = 0; i < length; ++i) {
      var ch = state.current();

      if (!isHexDigit(ch)) {
        state.pos = start;
        return false;
      }

      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }

    return true;
  }; // Object type used to represent tokens. Note that normally, tokens
  // simply exist as properties on the parser object. This is only
  // used for the onToken callback and the external tokenizer.


  var Token = function Token(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;

    if (p.options.locations) {
      this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
    }

    if (p.options.ranges) {
      this.range = [p.start, p.end];
    }
  }; // ## Tokenizer


  var pp$9 = Parser.prototype; // Move to the next token

  pp$9.next = function (ignoreEscapeSequenceInKeyword) {
    if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
    }

    if (this.options.onToken) {
      this.options.onToken(new Token(this));
    }

    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };

  pp$9.getToken = function () {
    this.next();
    return new Token(this);
  }; // If we're in an ES6 environment, make parsers iterable


  if (typeof Symbol !== "undefined") {
    pp$9[Symbol.iterator] = function () {
      var this$1 = this;
      return {
        next: function next() {
          var token = this$1.getToken();
          return {
            done: token.type === types.eof,
            value: token
          };
        }
      };
    };
  } // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).


  pp$9.curContext = function () {
    return this.context[this.context.length - 1];
  }; // Read a single token, updating the parser object's token-related
  // properties.


  pp$9.nextToken = function () {
    var curContext = this.curContext();

    if (!curContext || !curContext.preserveSpace) {
      this.skipSpace();
    }

    this.start = this.pos;

    if (this.options.locations) {
      this.startLoc = this.curPosition();
    }

    if (this.pos >= this.input.length) {
      return this.finishToken(types.eof);
    }

    if (curContext.override) {
      return curContext.override(this);
    } else {
      this.readToken(this.fullCharCodeAtPos());
    }
  };

  pp$9.readToken = function (code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92
    /* '\' */
    ) {
        return this.readWord();
      }

    return this.getTokenFromCode(code);
  };

  pp$9.fullCharCodeAtPos = function () {
    var code = this.input.charCodeAt(this.pos);

    if (code <= 0xd7ff || code >= 0xe000) {
      return code;
    }

    var next = this.input.charCodeAt(this.pos + 1);
    return (code << 10) + next - 0x35fdc00;
  };

  pp$9.skipBlockComment = function () {
    var startLoc = this.options.onComment && this.curPosition();
    var start = this.pos,
        end = this.input.indexOf("*/", this.pos += 2);

    if (end === -1) {
      this.raise(this.pos - 2, "Unterminated comment");
    }

    this.pos = end + 2;

    if (this.options.locations) {
      lineBreakG.lastIndex = start;
      var match;

      while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
        ++this.curLine;
        this.lineStart = match.index + match[0].length;
      }
    }

    if (this.options.onComment) {
      this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
    }
  };

  pp$9.skipLineComment = function (startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.curPosition();
    var ch = this.input.charCodeAt(this.pos += startSkip);

    while (this.pos < this.input.length && !isNewLine(ch)) {
      ch = this.input.charCodeAt(++this.pos);
    }

    if (this.options.onComment) {
      this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
    }
  }; // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.


  pp$9.skipSpace = function () {
    loop: while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);

      switch (ch) {
        case 32:
        case 160:
          // ' '
          ++this.pos;
          break;

        case 13:
          if (this.input.charCodeAt(this.pos + 1) === 10) {
            ++this.pos;
          }

        case 10:
        case 8232:
        case 8233:
          ++this.pos;

          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }

          break;

        case 47:
          // '/'
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              // '*'
              this.skipBlockComment();
              break;

            case 47:
              this.skipLineComment(2);
              break;

            default:
              break loop;
          }

          break;

        default:
          if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
            ++this.pos;
          } else {
            break loop;
          }

      }
    }
  }; // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.


  pp$9.finishToken = function (type, val) {
    this.end = this.pos;

    if (this.options.locations) {
      this.endLoc = this.curPosition();
    }

    var prevType = this.type;
    this.type = type;
    this.value = val;
    this.updateContext(prevType);
  }; // ### Token reading
  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //


  pp$9.readToken_dot = function () {
    var next = this.input.charCodeAt(this.pos + 1);

    if (next >= 48 && next <= 57) {
      return this.readNumber(true);
    }

    var next2 = this.input.charCodeAt(this.pos + 2);

    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
      // 46 = dot '.'
      this.pos += 3;
      return this.finishToken(types.ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(types.dot);
    }
  };

  pp$9.readToken_slash = function () {
    // '/'
    var next = this.input.charCodeAt(this.pos + 1);

    if (this.exprAllowed) {
      ++this.pos;
      return this.readRegexp();
    }

    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }

    return this.finishOp(types.slash, 1);
  };

  pp$9.readToken_mult_modulo_exp = function (code) {
    // '%*'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    var tokentype = code === 42 ? types.star : types.modulo; // exponentiation operator ** and **=

    if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
      ++size;
      tokentype = types.starstar;
      next = this.input.charCodeAt(this.pos + 2);
    }

    if (next === 61) {
      return this.finishOp(types.assign, size + 1);
    }

    return this.finishOp(tokentype, size);
  };

  pp$9.readToken_pipe_amp = function (code) {
    // '|&'
    var next = this.input.charCodeAt(this.pos + 1);

    if (next === code) {
      return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2);
    }

    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }

    return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
  };

  pp$9.readToken_caret = function () {
    // '^'
    var next = this.input.charCodeAt(this.pos + 1);

    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }

    return this.finishOp(types.bitwiseXOR, 1);
  };

  pp$9.readToken_plus_min = function (code) {
    // '+-'
    var next = this.input.charCodeAt(this.pos + 1);

    if (next === code) {
      if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }

      return this.finishOp(types.incDec, 2);
    }

    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }

    return this.finishOp(types.plusMin, 1);
  };

  pp$9.readToken_lt_gt = function (code) {
    // '<>'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;

    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;

      if (this.input.charCodeAt(this.pos + size) === 61) {
        return this.finishOp(types.assign, size + 1);
      }

      return this.finishOp(types.bitShift, size);
    }

    if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }

    if (next === 61) {
      size = 2;
    }

    return this.finishOp(types.relational, size);
  };

  pp$9.readToken_eq_excl = function (code) {
    // '=!'
    var next = this.input.charCodeAt(this.pos + 1);

    if (next === 61) {
      return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
    }

    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
      // '=>'
      this.pos += 2;
      return this.finishToken(types.arrow);
    }

    return this.finishOp(code === 61 ? types.eq : types.prefix, 1);
  };

  pp$9.getTokenFromCode = function (code) {
    switch (code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit or another two dots.
      case 46:
        // '.'
        return this.readToken_dot();
      // Punctuation tokens.

      case 40:
        ++this.pos;
        return this.finishToken(types.parenL);

      case 41:
        ++this.pos;
        return this.finishToken(types.parenR);

      case 59:
        ++this.pos;
        return this.finishToken(types.semi);

      case 44:
        ++this.pos;
        return this.finishToken(types.comma);

      case 91:
        ++this.pos;
        return this.finishToken(types.bracketL);

      case 93:
        ++this.pos;
        return this.finishToken(types.bracketR);

      case 123:
        ++this.pos;
        return this.finishToken(types.braceL);

      case 125:
        ++this.pos;
        return this.finishToken(types.braceR);

      case 58:
        ++this.pos;
        return this.finishToken(types.colon);

      case 63:
        ++this.pos;
        return this.finishToken(types.question);

      case 96:
        // '`'
        if (this.options.ecmaVersion < 6) {
          break;
        }

        ++this.pos;
        return this.finishToken(types.backQuote);

      case 48:
        // '0'
        var next = this.input.charCodeAt(this.pos + 1);

        if (next === 120 || next === 88) {
          return this.readRadixNumber(16);
        } // '0x', '0X' - hex number


        if (this.options.ecmaVersion >= 6) {
          if (next === 111 || next === 79) {
            return this.readRadixNumber(8);
          } // '0o', '0O' - octal number


          if (next === 98 || next === 66) {
            return this.readRadixNumber(2);
          } // '0b', '0B' - binary number

        }

      // Anything else beginning with a digit is an integer, octal
      // number, or float.

      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        // 1-9
        return this.readNumber(false);
      // Quotes produce strings.

      case 34:
      case 39:
        // '"', "'"
        return this.readString(code);
      // Operators are parsed inline in tiny state machines. '=' (61) is
      // often referred to. `finishOp` simply skips the amount of
      // characters it is given as second argument, and returns a token
      // of the type given by its first argument.

      case 47:
        // '/'
        return this.readToken_slash();

      case 37:
      case 42:
        // '%*'
        return this.readToken_mult_modulo_exp(code);

      case 124:
      case 38:
        // '|&'
        return this.readToken_pipe_amp(code);

      case 94:
        // '^'
        return this.readToken_caret();

      case 43:
      case 45:
        // '+-'
        return this.readToken_plus_min(code);

      case 60:
      case 62:
        // '<>'
        return this.readToken_lt_gt(code);

      case 61:
      case 33:
        // '=!'
        return this.readToken_eq_excl(code);

      case 126:
        // '~'
        return this.finishOp(types.prefix, 1);
    }

    this.raise(this.pos, "Unexpected character '" + codePointToString$1(code) + "'");
  };

  pp$9.finishOp = function (type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str);
  };

  pp$9.readRegexp = function () {
    var escaped,
        inClass,
        start = this.pos;

    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(start, "Unterminated regular expression");
      }

      var ch = this.input.charAt(this.pos);

      if (lineBreak.test(ch)) {
        this.raise(start, "Unterminated regular expression");
      }

      if (!escaped) {
        if (ch === "[") {
          inClass = true;
        } else if (ch === "]" && inClass) {
          inClass = false;
        } else if (ch === "/" && !inClass) {
          break;
        }

        escaped = ch === "\\";
      } else {
        escaped = false;
      }

      ++this.pos;
    }

    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos;
    var flags = this.readWord1();

    if (this.containsEsc) {
      this.unexpected(flagsStart);
    } // Validate pattern


    var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags);
    this.validateRegExpFlags(state);
    this.validateRegExpPattern(state); // Create Literal#value property value.

    var value = null;

    try {
      value = new RegExp(pattern, flags);
    } catch (e) {// ESTree requires null if it failed to instantiate RegExp object.
      // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
    }

    return this.finishToken(types.regexp, {
      pattern: pattern,
      flags: flags,
      value: value
    });
  }; // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.


  pp$9.readInt = function (radix, len) {
    var start = this.pos,
        total = 0;

    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = this.input.charCodeAt(this.pos),
          val = void 0;

      if (code >= 97) {
        val = code - 97 + 10;
      } // a
      else if (code >= 65) {
          val = code - 65 + 10;
        } // A
        else if (code >= 48 && code <= 57) {
            val = code - 48;
          } // 0-9
          else {
              val = Infinity;
            }

      if (val >= radix) {
        break;
      }

      ++this.pos;
      total = total * radix + val;
    }

    if (this.pos === start || len != null && this.pos - start !== len) {
      return null;
    }

    return total;
  };

  pp$9.readRadixNumber = function (radix) {
    var start = this.pos;
    this.pos += 2; // 0x

    var val = this.readInt(radix);

    if (val == null) {
      this.raise(this.start + 2, "Expected number in radix " + radix);
    }

    if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
      val = typeof BigInt !== "undefined" ? BigInt(this.input.slice(start, this.pos)) : null;
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }

    return this.finishToken(types.num, val);
  }; // Read an integer, octal integer, or floating-point number.


  pp$9.readNumber = function (startsWithDot) {
    var start = this.pos;

    if (!startsWithDot && this.readInt(10) === null) {
      this.raise(start, "Invalid number");
    }

    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;

    if (octal && this.strict) {
      this.raise(start, "Invalid number");
    }

    var next = this.input.charCodeAt(this.pos);

    if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
      var str$1 = this.input.slice(start, this.pos);
      var val$1 = typeof BigInt !== "undefined" ? BigInt(str$1) : null;
      ++this.pos;

      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }

      return this.finishToken(types.num, val$1);
    }

    if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
      octal = false;
    }

    if (next === 46 && !octal) {
      // '.'
      ++this.pos;
      this.readInt(10);
      next = this.input.charCodeAt(this.pos);
    }

    if ((next === 69 || next === 101) && !octal) {
      // 'eE'
      next = this.input.charCodeAt(++this.pos);

      if (next === 43 || next === 45) {
        ++this.pos;
      } // '+-'


      if (this.readInt(10) === null) {
        this.raise(start, "Invalid number");
      }
    }

    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }

    var str = this.input.slice(start, this.pos);
    var val = octal ? parseInt(str, 8) : parseFloat(str);
    return this.finishToken(types.num, val);
  }; // Read a string value, interpreting backslash-escapes.


  pp$9.readCodePoint = function () {
    var ch = this.input.charCodeAt(this.pos),
        code;

    if (ch === 123) {
      // '{'
      if (this.options.ecmaVersion < 6) {
        this.unexpected();
      }

      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;

      if (code > 0x10FFFF) {
        this.invalidStringToken(codePos, "Code point out of bounds");
      }
    } else {
      code = this.readHexChar(4);
    }

    return code;
  };

  function codePointToString$1(code) {
    // UTF-16 Decoding
    if (code <= 0xFFFF) {
      return String.fromCharCode(code);
    }

    code -= 0x10000;
    return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
  }

  pp$9.readString = function (quote) {
    var out = "",
        chunkStart = ++this.pos;

    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated string constant");
      }

      var ch = this.input.charCodeAt(this.pos);

      if (ch === quote) {
        break;
      }

      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.pos;
      } else {
        if (isNewLine(ch, this.options.ecmaVersion >= 10)) {
          this.raise(this.start, "Unterminated string constant");
        }

        ++this.pos;
      }
    }

    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(types.string, out);
  }; // Reads template string tokens.


  var INVALID_TEMPLATE_ESCAPE_ERROR = {};

  pp$9.tryReadTemplateToken = function () {
    this.inTemplateElement = true;

    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
        this.readInvalidTemplateToken();
      } else {
        throw err;
      }
    }

    this.inTemplateElement = false;
  };

  pp$9.invalidStringToken = function (position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw INVALID_TEMPLATE_ESCAPE_ERROR;
    } else {
      this.raise(position, message);
    }
  };

  pp$9.readTmplToken = function () {
    var out = "",
        chunkStart = this.pos;

    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated template");
      }

      var ch = this.input.charCodeAt(this.pos);

      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
        // '`', '${'
        if (this.pos === this.start && (this.type === types.template || this.type === types.invalidTemplate)) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(types.dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(types.backQuote);
          }
        }

        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(types.template, out);
      }

      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;

        switch (ch) {
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }

          case 10:
            out += "\n";
            break;

          default:
            out += String.fromCharCode(ch);
            break;
        }

        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }

        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  }; // Reads a template token to search for the end, without validating any escape sequences


  pp$9.readInvalidTemplateToken = function () {
    for (; this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
        case "\\":
          ++this.pos;
          break;

        case "$":
          if (this.input[this.pos + 1] !== "{") {
            break;
          }

        // falls through

        case "`":
          return this.finishToken(types.invalidTemplate, this.input.slice(this.start, this.pos));
        // no default
      }
    }

    this.raise(this.start, "Unterminated template");
  }; // Used to read escaped characters


  pp$9.readEscapedChar = function (inTemplate) {
    var ch = this.input.charCodeAt(++this.pos);
    ++this.pos;

    switch (ch) {
      case 110:
        return "\n";
      // 'n' -> '\n'

      case 114:
        return "\r";
      // 'r' -> '\r'

      case 120:
        return String.fromCharCode(this.readHexChar(2));
      // 'x'

      case 117:
        return codePointToString$1(this.readCodePoint());
      // 'u'

      case 116:
        return "\t";
      // 't' -> '\t'

      case 98:
        return "\b";
      // 'b' -> '\b'

      case 118:
        return "\x0B";
      // 'v' -> '\u000b'

      case 102:
        return "\f";
      // 'f' -> '\f'

      case 13:
        if (this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
        }

      // '\r\n'

      case 10:
        // ' \n'
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }

        return "";

      case 56:
      case 57:
        if (inTemplate) {
          var codePos = this.pos - 1;
          this.invalidStringToken(codePos, "Invalid escape sequence in template string");
          return null;
        }

      default:
        if (ch >= 48 && ch <= 55) {
          var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
          var octal = parseInt(octalStr, 8);

          if (octal > 255) {
            octalStr = octalStr.slice(0, -1);
            octal = parseInt(octalStr, 8);
          }

          this.pos += octalStr.length - 1;
          ch = this.input.charCodeAt(this.pos);

          if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
            this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
          }

          return String.fromCharCode(octal);
        }

        if (isNewLine(ch)) {
          // Unicode new line characters after \ get removed from output in both
          // template literals and strings
          return "";
        }

        return String.fromCharCode(ch);
    }
  }; // Used to read character escape sequences ('\x', '\u', '\U').


  pp$9.readHexChar = function (len) {
    var codePos = this.pos;
    var n = this.readInt(16, len);

    if (n === null) {
      this.invalidStringToken(codePos, "Bad character escape sequence");
    }

    return n;
  }; // Read an identifier, and return it as a string. Sets `this.containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.


  pp$9.readWord1 = function () {
    this.containsEsc = false;
    var word = "",
        first = true,
        chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;

    while (this.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();

      if (isIdentifierChar(ch, astral)) {
        this.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) {
        // "\"
        this.containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;

        if (this.input.charCodeAt(++this.pos) !== 117) // "u"
          {
            this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
          }

        ++this.pos;
        var esc = this.readCodePoint();

        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
          this.invalidStringToken(escStart, "Invalid Unicode escape");
        }

        word += codePointToString$1(esc);
        chunkStart = this.pos;
      } else {
        break;
      }

      first = false;
    }

    return word + this.input.slice(chunkStart, this.pos);
  }; // Read an identifier or keyword token. Will check for reserved
  // words when necessary.


  pp$9.readWord = function () {
    var word = this.readWord1();
    var type = types.name;

    if (this.keywords.test(word)) {
      type = keywords$1[word];
    }

    return this.finishToken(type, word);
  }; // Acorn is a tiny, fast JavaScript parser written in JavaScript.


  var version = "7.1.0";
  Parser.acorn = {
    Parser: Parser,
    version: version,
    defaultOptions: defaultOptions,
    Position: Position,
    SourceLocation: SourceLocation,
    getLineInfo: getLineInfo,
    Node: Node,
    TokenType: TokenType,
    tokTypes: types,
    keywordTypes: keywords$1,
    TokContext: TokContext,
    tokContexts: types$1,
    isIdentifierChar: isIdentifierChar,
    isIdentifierStart: isIdentifierStart,
    Token: Token,
    isNewLine: isNewLine,
    lineBreak: lineBreak,
    lineBreakG: lineBreakG,
    nonASCIIwhitespace: nonASCIIwhitespace
  }; // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api].
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  function parse(input, options) {
    return Parser.parse(input, options);
  } // This function tries to parse a single expression at a given
  // offset in a string. Useful for parsing mixed-language formats
  // that embed JavaScript expressions.


  function parseExpressionAt(input, pos, options) {
    return Parser.parseExpressionAt(input, pos, options);
  } // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenizer` export provides an interface to the tokenizer.


  function tokenizer(input, options) {
    return Parser.tokenizer(input, options);
  }

  exports.Node = Node;
  exports.Parser = Parser;
  exports.Position = Position;
  exports.SourceLocation = SourceLocation;
  exports.TokContext = TokContext;
  exports.Token = Token;
  exports.TokenType = TokenType;
  exports.defaultOptions = defaultOptions;
  exports.getLineInfo = getLineInfo;
  exports.isIdentifierChar = isIdentifierChar;
  exports.isIdentifierStart = isIdentifierStart;
  exports.isNewLine = isNewLine;
  exports.keywordTypes = keywords$1;
  exports.lineBreak = lineBreak;
  exports.lineBreakG = lineBreakG;
  exports.nonASCIIwhitespace = nonASCIIwhitespace;
  exports.parse = parse;
  exports.parseExpressionAt = parseExpressionAt;
  exports.tokContexts = types$1;
  exports.tokTypes = types;
  exports.tokenizer = tokenizer;
  exports.version = version;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

/***/ }),

/***/ "./src/evalute/index.js":
/*!******************************!*\
  !*** ./src/evalute/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var create = __webpack_require__(/*! ./interpreter */ "./src/evalute/interpreter.js");

var _native = __webpack_require__(/*! ./native */ "./src/evalute/native.js");

var Evaluate = /*#__PURE__*/function () {
  function Evaluate() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Evaluate);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Evaluate, [{
    key: "view",
    value: function (_view) {
      function view(_x) {
        return _view.apply(this, arguments);
      }

      view.toString = function () {
        return _view.toString();
      };

      return view;
    }(function (route) {
      view(route, this);
    })
  }, {
    key: "onCreate",
    value: function onCreate(interpreter, window) {
      _native(interpreter, window);
    }
  }, {
    key: "listen",
    value: function listen() {}
  }, {
    key: "call",
    value: function call() {}
  }, {
    key: "inject",
    value: function inject() {
      return "\n      if (typeof process !== 'undefined') {\n        process.on = function () {\n\n        }\n      }\n    ";
    }
  }, {
    key: "script",
    value: function script(code) {
      var _this = this;

      this.interpreter = create(code, function (interpreter, window) {
        return _this.onCreate(interpreter, window);
      });
    }
  }, {
    key: "run",
    value: function run() {
      this.interpreter.run();
    }
  }, {
    key: "step",
    value: function step() {
      this.interpreter.step();
    }
  }]);

  return Evaluate;
}();

module.exports = new Evaluate();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../remix-cli/node_modules/webpack/buildin/harmony-module.js */ "../remix-cli/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/evalute/interpreter.js":
/*!************************************!*\
  !*** ./src/evalute/interpreter.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @license
 * Copyright 2013 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interpreting JavaScript in JavaScript.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Create a new interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 * @param {Function=} opt_initFunc Optional initialization function.  Used to
 *     define APIs.  When called it is passed the interpreter object and the
 *     global scope object.
 * @constructor
 */



var acorn = __webpack_require__(/*! ./acorn */ "./src/evalute/acorn.js");

var Interpreter = function Interpreter(code, opt_initFunc) {
  if (typeof code === 'string') {
    code = acorn.parse(code, Interpreter.PARSE_OPTIONS);
  } // Get a handle on Acorn's node_t object.


  this.nodeConstructor = code.constructor; // Clone the root 'Program' node so that the AST may be modified.

  var ast = new this.nodeConstructor({
    options: {}
  });

  for (var prop in code) {
    ast[prop] = prop === 'body' ? code[prop].slice() : code[prop];
  }

  this.ast = ast;
  this.initFunc_ = opt_initFunc;
  this.paused_ = false;
  this.polyfills_ = []; // Unique identifier for native functions.  Used in serialization.

  this.functionCounter_ = 0; // Map node types to our step function names; a property lookup is faster
  // than string concatenation with "step" prefix.

  this.stepFunctions_ = Object.create(null);
  var stepMatch = /^step([A-Z]\w*)$/;
  var m;

  for (var methodName in this) {
    if (typeof this[methodName] === 'function' && (m = methodName.match(stepMatch))) {
      this.stepFunctions_[m[1]] = this[methodName].bind(this);
    }
  } // Create and initialize the global scope.


  this.globalScope = this.createScope(this.ast, null);
  this.globalObject = this.globalScope.object; // Run the polyfills.

  this.ast = acorn.parse(this.polyfills_.join('\n'), Interpreter.PARSE_OPTIONS);
  this.polyfills_ = undefined; // Allow polyfill strings to garbage collect.

  Interpreter.stripLocations_(this.ast, undefined, undefined);
  var state = new Interpreter.State(this.ast, this.globalScope);
  state.done = false;
  this.stateStack = [state];
  this.run();
  this.value = undefined; // Point at the main program.

  this.ast = ast;
  var state = new Interpreter.State(this.ast, this.globalScope);
  state.done = false;
  this.stateStack.length = 0;
  this.stateStack[0] = state; // Preserve publicly properties from being pruned/renamed by JS compilers.
  // Add others as needed.

  this['stateStack'] = this.stateStack;
};
/**
  * Completion Value Types.
  * @enum {number}
  */


Interpreter.Completion = {
  NORMAL: 0,
  BREAK: 1,
  CONTINUE: 2,
  RETURN: 3,
  THROW: 4
};
/**
 * @const {!Object} Configuration used for all Acorn parsing.
 */

Interpreter.PARSE_OPTIONS = {
  ecmaVersion: 5
};
/**
 * Property descriptor of readonly properties.
 */

Interpreter.READONLY_DESCRIPTOR = {
  configurable: true,
  enumerable: true,
  writable: false
};
/**
 * Property descriptor of non-enumerable properties.
 */

Interpreter.NONENUMERABLE_DESCRIPTOR = {
  configurable: true,
  enumerable: false,
  writable: true
};
/**
 * Property descriptor of readonly, non-enumerable properties.
 */

Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR = {
  configurable: true,
  enumerable: false,
  writable: false
};
/**
 * Property descriptor of variables.
 */

Interpreter.VARIABLE_DESCRIPTOR = {
  configurable: false,
  enumerable: true,
  writable: true
};
/**
 * Unique symbol for indicating that a step has encountered an error, has
 * added it to the stack, and will be thrown within the user's program.
 * When STEP_ERROR is thrown in the JS-Interpreter, the error can be ignored.
 */

Interpreter.STEP_ERROR = {
  'STEP_ERROR': true
};
/**
 * Unique symbol for indicating that a reference is a variable on the scope,
 * not an object property.
 */

Interpreter.SCOPE_REFERENCE = {
  'SCOPE_REFERENCE': true
};
/**
 * Unique symbol for indicating, when used as the value of the value
 * parameter in calls to setProperty and friends, that the value
 * should be taken from the property descriptor instead.
 */

Interpreter.VALUE_IN_DESCRIPTOR = {
  'VALUE_IN_DESCRIPTOR': true
};
/**
 * Unique symbol for indicating that a RegExp timeout has occurred in a VM.
 */

Interpreter.REGEXP_TIMEOUT = {
  'REGEXP_TIMEOUT': true
};
/**
 * For cycle detection in array to string and error conversion;
 * see spec bug github.com/tc39/ecma262/issues/289
 * Since this is for atomic actions only, it can be a class property.
 */

Interpreter.toStringCycles_ = [];
/**
 * Node's vm module, if loaded and required.
 * @type {Object}
 */

Interpreter.vm = null;
/**
 * Code for executing regular expressions in a thread.
 */

Interpreter.WORKER_CODE = ["onmessage = function(e) {", "var result;", "var data = e.data;", "switch (data[0]) {", "case 'split':", // ['split', string, separator, limit]
"result = data[1].split(data[2], data[3]);", "break;", "case 'match':", // ['match', string, regexp]
"result = data[1].match(data[2]);", "break;", "case 'search':", // ['search', string, regexp]
"result = data[1].search(data[2]);", "break;", "case 'replace':", // ['replace', string, regexp, newSubstr]
"result = data[1].replace(data[2], data[3]);", "break;", "case 'exec':", // ['exec', regexp, lastIndex, string]
"var regexp = data[1];", "regexp.lastIndex = data[2];", "result = [regexp.exec(data[3]), data[1].lastIndex];", "break;", "default:", "throw Error('Unknown RegExp operation: ' + data[0]);", "}", "postMessage(result);", "};"];
/**
 * Is a value a legal integer for an array length?
 * @param {Interpreter.Value} x Value to check.
 * @return {number} Zero, or a positive integer if the value can be
 *     converted to such.  NaN otherwise.
 */

Interpreter.legalArrayLength = function (x) {
  var n = x >>> 0; // Array length must be between 0 and 2^32-1 (inclusive).

  return n === Number(x) ? n : NaN;
};
/**
 * Is a value a legal integer for an array index?
 * @param {Interpreter.Value} x Value to check.
 * @return {number} Zero, or a positive integer if the value can be
 *     converted to such.  NaN otherwise.
 */


Interpreter.legalArrayIndex = function (x) {
  var n = x >>> 0; // Array index cannot be 2^32-1, otherwise length would be 2^32.
  // 0xffffffff is 2^32-1.

  return String(n) === String(x) && n !== 0xffffffff ? n : NaN;
};
/**
 * Remove start and end values from AST, or set start and end values to a
 * constant value.  Used to remove highlighting from polyfills and to set
 * highlighting in an eval to cover the entire eval expression.
 * @param {!Object} node AST node.
 * @param {number=} start Starting character of all nodes, or undefined.
 * @param {number=} end Ending character of all nodes, or undefined.
 * @private
 */


Interpreter.stripLocations_ = function (node, start, end) {
  if (start) {
    node['start'] = start;
  } else {
    delete node['start'];
  }

  if (end) {
    node['end'] = end;
  } else {
    delete node['end'];
  }

  for (var name in node) {
    if (node.hasOwnProperty(name)) {
      var prop = node[name];

      if (prop && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(prop) === 'object') {
        Interpreter.stripLocations_(prop, start, end);
      }
    }
  }
};
/**
 * Some pathological regular expressions can take geometric time.
 * Regular expressions are handled in one of three ways:
 * 0 - throw as invalid.
 * 1 - execute natively (risk of unresponsive program).
 * 2 - execute in separate thread (not supported by IE 9).
 */


Interpreter.prototype['REGEXP_MODE'] = 2;
/**
 * If REGEXP_MODE = 2, the length of time (in ms) to allow a RegExp
 * thread to execute before terminating it.
 */

Interpreter.prototype['REGEXP_THREAD_TIMEOUT'] = 1000;
/**
 * Flag indicating that a getter function needs to be called immediately.
 * @private
 */

Interpreter.prototype.getterStep_ = false;
/**
 * Flag indicating that a setter function needs to be called immediately.
 * @private
 */

Interpreter.prototype.setterStep_ = false;
/**
 * Add more code to the interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 */

Interpreter.prototype.appendCode = function (code) {
  var state = this.stateStack[0];

  if (!state || state.node['type'] !== 'Program') {
    throw Error('Expecting original AST to start with a Program node.');
  }

  if (typeof code === 'string') {
    code = acorn.parse(code, Interpreter.PARSE_OPTIONS);
  }

  if (!code || code['type'] !== 'Program') {
    throw Error('Expecting new AST to start with a Program node.');
  }

  this.populateScope_(code, state.scope); // Append the new program to the old one.

  Array.prototype.push.apply(state.node['body'], code['body']);
  state.done = false;
};
/**
 * Execute one step of the interpreter.
 * @return {boolean} True if a step was executed, false if no more instructions.
 */


Interpreter.prototype.step = function () {
  var stack = this.stateStack;

  do {
    var state = stack[stack.length - 1];

    if (!state) {
      return false;
    }

    var node = state.node,
        type = node['type'];

    if (type === 'Program' && state.done) {
      return false;
    } else if (this.paused_) {
      return true;
    }

    try {
      var nextState = this.stepFunctions_[type](stack, state, node);
    } catch (e) {
      // Eat any step errors.  They have been thrown on the stack.
      if (e !== Interpreter.STEP_ERROR) {
        // Uh oh.  This is a real error in the JS-Interpreter.  Rethrow.
        throw e;
      }
    }

    if (nextState) {
      stack.push(nextState);
    }

    if (this.getterStep_) {
      // Getter from this step was not handled.
      throw Error('Getter not supported in this context');
    }

    if (this.setterStep_) {
      // Setter from this step was not handled.
      throw Error('Setter not supported in this context');
    } // This may be polyfill code.  Keep executing until we arrive at user code.

  } while (!node['end']);

  return true;
};
/**
 * Execute the interpreter to program completion.  Vulnerable to infinite loops.
 * @return {boolean} True if a execution is asynchronously blocked,
 *     false if no more instructions.
 */


Interpreter.prototype.run = function () {
  while (!this.paused_ && this.step()) {}

  return this.paused_;
};
/**
 * Initialize the global object with buitin properties and functions.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initGlobal = function (globalObject) {
  // Initialize uneditable global properties.
  this.setProperty(globalObject, 'NaN', NaN, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(globalObject, 'Infinity', Infinity, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(globalObject, 'undefined', undefined, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(globalObject, 'window', globalObject, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(globalObject, 'this', globalObject, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(globalObject, 'self', globalObject); // Editable.
  // Create the objects which will become Object.prototype and
  // Function.prototype, which are needed to bootstrap everything else.

  this.OBJECT_PROTO = new Interpreter.Object(null);
  this.FUNCTION_PROTO = new Interpreter.Object(this.OBJECT_PROTO); // Initialize global objects.

  this.initFunction(globalObject);
  this.initObject(globalObject); // Unable to set globalObject's parent prior (OBJECT did not exist).
  // Note that in a browser this would be `Window`, whereas in Node.js it would
  // be `Object`.  This interpreter is closer to Node in that it has no DOM.

  globalObject.proto = this.OBJECT_PROTO;
  this.setProperty(globalObject, 'constructor', this.OBJECT, Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.initArray(globalObject);
  this.initString(globalObject);
  this.initBoolean(globalObject);
  this.initNumber(globalObject);
  this.initDate(globalObject);
  this.initRegExp(globalObject);
  this.initError(globalObject);
  this.initMath(globalObject);
  this.initJSON(globalObject); // Initialize global functions.

  var thisInterpreter = this;
  var func = this.createNativeFunction(function (x) {
    throw EvalError("Can't happen");
  }, false);
  func.eval = true;
  this.setProperty(globalObject, 'eval', func);
  this.setProperty(globalObject, 'parseInt', this.createNativeFunction(parseInt, false));
  this.setProperty(globalObject, 'parseFloat', this.createNativeFunction(parseFloat, false));
  this.setProperty(globalObject, 'isNaN', this.createNativeFunction(isNaN, false));
  this.setProperty(globalObject, 'isFinite', this.createNativeFunction(isFinite, false));
  var strFunctions = [[escape, 'escape'], [unescape, 'unescape'], [decodeURI, 'decodeURI'], [decodeURIComponent, 'decodeURIComponent'], [encodeURI, 'encodeURI'], [encodeURIComponent, 'encodeURIComponent']];

  for (var i = 0; i < strFunctions.length; i++) {
    var wrapper = function (nativeFunc) {
      return function (str) {
        try {
          return nativeFunc(str);
        } catch (e) {
          // decodeURI('%xy') will throw an error.  Catch and rethrow.
          thisInterpreter.throwException(thisInterpreter.URI_ERROR, e.message);
        }
      };
    }(strFunctions[i][0]);

    this.setProperty(globalObject, strFunctions[i][1], this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);
  } // Preserve publicly properties from being pruned/renamed by JS compilers.
  // Add others as needed.


  this['OBJECT'] = this.OBJECT;
  this['OBJECT_PROTO'] = this.OBJECT_PROTO;
  this['FUNCTION'] = this.FUNCTION;
  this['FUNCTION_PROTO'] = this.FUNCTION_PROTO;
  this['ARRAY'] = this.ARRAY;
  this['ARRAY_PROTO'] = this.ARRAY_PROTO;
  this['REGEXP'] = this.REGEXP;
  this['REGEXP_PROTO'] = this.REGEXP_PROTO;
  this['DATE'] = this.DATE;
  this['DATE_PROTO'] = this.DATE_PROTO; // Run any user-provided initialization.

  if (this.initFunc_) {
    this.initFunc_(this, globalObject);
  }
};
/**
 * Initialize the Function class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initFunction = function (globalObject) {
  var thisInterpreter = this;
  var wrapper;
  var identifierRegexp = /^[A-Za-z_$][\w$]*$/; // Function constructor.

  wrapper = function wrapper(var_args) {
    if (arguments.length) {
      var code = String(arguments[arguments.length - 1]);
    } else {
      var code = '';
    }

    var argsStr = Array.prototype.slice.call(arguments, 0, -1).join(',').trim();

    if (argsStr) {
      var args = argsStr.split(/\s*,\s*/);

      for (var i = 0; i < args.length; i++) {
        var name = args[i];

        if (!identifierRegexp.test(name)) {
          thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, 'Invalid function argument: ' + name);
        }
      }

      argsStr = args.join(', ');
    } // Acorn needs to parse code in the context of a function or else `return`
    // statements will be syntax errors.


    try {
      var ast = acorn.parse('(function(' + argsStr + ') {' + code + '})', Interpreter.PARSE_OPTIONS);
    } catch (e) {
      // Acorn threw a SyntaxError.  Rethrow as a trappable error.
      thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, 'Invalid code: ' + e.message);
    }

    if (ast['body'].length !== 1) {
      // Function('a', 'return a + 6;}; {alert(1);');
      thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, 'Invalid code in function body.');
    }

    var node = ast['body'][0]['expression']; // Note that if this constructor is called as `new Function()` the function
    // object created by stepCallExpression and assigned to `this` is discarded.
    // Interestingly, the scope for constructed functions is the global scope,
    // even if they were constructed in some other scope.

    return thisInterpreter.createFunction(node, thisInterpreter.globalScope);
  };

  this.FUNCTION = this.createNativeFunction(wrapper, true);
  this.setProperty(globalObject, 'Function', this.FUNCTION); // Throw away the created prototype and use the root prototype.

  this.setProperty(this.FUNCTION, 'prototype', this.FUNCTION_PROTO, Interpreter.NONENUMERABLE_DESCRIPTOR); // Configure Function.prototype.

  this.setProperty(this.FUNCTION_PROTO, 'constructor', this.FUNCTION, Interpreter.NONENUMERABLE_DESCRIPTOR);

  this.FUNCTION_PROTO.nativeFunc = function () {};

  this.FUNCTION_PROTO.nativeFunc.id = this.functionCounter_++;
  this.setProperty(this.FUNCTION_PROTO, 'length', 0, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);

  var boxThis = function boxThis(value) {
    // In non-strict mode `this` must be an object.
    if (!(value instanceof Interpreter.Object) && !thisInterpreter.getScope().strict) {
      if (value === undefined || value === null) {
        // `Undefined` and `null` are changed to the global object.
        value = thisInterpreter.globalObject;
      } else {
        // Primitives must be boxed in non-strict mode.
        var box = thisInterpreter.createObjectProto(thisInterpreter.getPrototype(value));
        box.data = value;
        value = box;
      }
    }

    return value;
  };

  wrapper = function wrapper(thisArg, args) {
    var state = thisInterpreter.stateStack[thisInterpreter.stateStack.length - 1]; // Rewrite the current CallExpression state to apply a different function.

    state.func_ = this; // Assign the `this` object.

    state.funcThis_ = boxThis(thisArg); // Bind any provided arguments.

    state.arguments_ = [];

    if (args !== null && args !== undefined) {
      if (args instanceof Interpreter.Object) {
        state.arguments_ = thisInterpreter.arrayPseudoToNative(args);
      } else {
        thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'CreateListFromArrayLike called on non-object');
      }
    }

    state.doneExec_ = false;
  };

  this.setNativeFunctionPrototype(this.FUNCTION, 'apply', wrapper);

  wrapper = function wrapper(thisArg
  /*, var_args */
  ) {
    var state = thisInterpreter.stateStack[thisInterpreter.stateStack.length - 1]; // Rewrite the current CallExpression state to call a different function.

    state.func_ = this; // Assign the `this` object.

    state.funcThis_ = boxThis(thisArg); // Bind any provided arguments.

    state.arguments_ = [];

    for (var i = 1; i < arguments.length; i++) {
      state.arguments_.push(arguments[i]);
    }

    state.doneExec_ = false;
  };

  this.setNativeFunctionPrototype(this.FUNCTION, 'call', wrapper);
  this.polyfills_.push( // Polyfill copied from:
  // developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
  "Object.defineProperty(Function.prototype, 'bind',", "{configurable: true, writable: true, value:", "function(oThis) {", "if (typeof this !== 'function') {", "throw TypeError('What is trying to be bound is not callable');", "}", "var aArgs   = Array.prototype.slice.call(arguments, 1),", "fToBind = this,", "fNOP    = function() {},", "fBound  = function() {", "return fToBind.apply(this instanceof fNOP", "? this", ": oThis,", "aArgs.concat(Array.prototype.slice.call(arguments)));", "};", "if (this.prototype) {", "fNOP.prototype = this.prototype;", "}", "fBound.prototype = new fNOP();", "return fBound;", "}", "});", ""); // Function has no parent to inherit from, so it needs its own mandatory
  // toString and valueOf functions.

  wrapper = function wrapper() {
    return String(this);
  };

  this.setNativeFunctionPrototype(this.FUNCTION, 'toString', wrapper);
  this.setProperty(this.FUNCTION, 'toString', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper() {
    return this.valueOf();
  };

  this.setNativeFunctionPrototype(this.FUNCTION, 'valueOf', wrapper);
  this.setProperty(this.FUNCTION, 'valueOf', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);
};
/**
 * Initialize the Object class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initObject = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // Object constructor.

  wrapper = function wrapper(value) {
    if (value === undefined || value === null) {
      // Create a new object.
      if (thisInterpreter.calledWithNew()) {
        // Called as `new Object()`.
        return this;
      } else {
        // Called as `Object()`.
        return thisInterpreter.createObjectProto(thisInterpreter.OBJECT_PROTO);
      }
    }

    if (!(value instanceof Interpreter.Object)) {
      // Wrap the value as an object.
      var box = thisInterpreter.createObjectProto(thisInterpreter.getPrototype(value));
      box.data = value;
      return box;
    } // Return the provided object.


    return value;
  };

  this.OBJECT = this.createNativeFunction(wrapper, true); // Throw away the created prototype and use the root prototype.

  this.setProperty(this.OBJECT, 'prototype', this.OBJECT_PROTO, Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.OBJECT_PROTO, 'constructor', this.OBJECT, Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(globalObject, 'Object', this.OBJECT);
  /**
   * Checks if the provided value is null or undefined.
   * If so, then throw an error in the call stack.
   * @param {Interpreter.Value} value Value to check.
   */

  var throwIfNullUndefined = function throwIfNullUndefined(value) {
    if (value === undefined || value === null) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, "Cannot convert '" + value + "' to object");
    }
  }; // Static methods on Object.


  wrapper = function wrapper(obj) {
    throwIfNullUndefined(obj);
    var props = obj instanceof Interpreter.Object ? obj.properties : obj;
    return thisInterpreter.arrayNativeToPseudo(Object.getOwnPropertyNames(props));
  };

  this.setProperty(this.OBJECT, 'getOwnPropertyNames', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    throwIfNullUndefined(obj);

    if (obj instanceof Interpreter.Object) {
      obj = obj.properties;
    }

    return thisInterpreter.arrayNativeToPseudo(Object.keys(obj));
  };

  this.setProperty(this.OBJECT, 'keys', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(proto) {
    // Support for the second argument is the responsibility of a polyfill.
    if (proto === null) {
      return thisInterpreter.createObjectProto(null);
    }

    if (!(proto instanceof Interpreter.Object)) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Object prototype may only be an Object or null');
    }

    return thisInterpreter.createObjectProto(proto);
  };

  this.setProperty(this.OBJECT, 'create', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR); // Add a polyfill to handle create's second argument.

  this.polyfills_.push("(function() {", "var create_ = Object.create;", "Object.create = function(proto, props) {", "var obj = create_(proto);", "props && Object.defineProperties(obj, props);", "return obj;", "};", "})();", "");

  wrapper = function wrapper(obj, prop, descriptor) {
    prop = String(prop);

    if (!(obj instanceof Interpreter.Object)) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Object.defineProperty called on non-object');
    }

    if (!(descriptor instanceof Interpreter.Object)) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Property description must be an object');
    }

    if (!obj.properties[prop] && obj.preventExtensions) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, "Can't define property '" + prop + "', object is not extensible");
    } // The polyfill guarantees no inheritance and no getter functions.
    // Therefore the descriptor properties map is the native object needed.


    thisInterpreter.setProperty(obj, prop, Interpreter.VALUE_IN_DESCRIPTOR, descriptor.properties);
    return obj;
  };

  this.setProperty(this.OBJECT, 'defineProperty', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.polyfills_.push( // Flatten the descriptor to remove any inheritance or getter functions.
  "(function() {", "var defineProperty_ = Object.defineProperty;", "Object.defineProperty = function(obj, prop, d1) {", "var d2 = {};", "if ('configurable' in d1) d2.configurable = d1.configurable;", "if ('enumerable' in d1) d2.enumerable = d1.enumerable;", "if ('writable' in d1) d2.writable = d1.writable;", "if ('value' in d1) d2.value = d1.value;", "if ('get' in d1) d2.get = d1.get;", "if ('set' in d1) d2.set = d1.set;", "return defineProperty_(obj, prop, d2);", "};", "})();", "Object.defineProperty(Object, 'defineProperties',", "{configurable: true, writable: true, value:", "function(obj, props) {", "var keys = Object.keys(props);", "for (var i = 0; i < keys.length; i++) {", "Object.defineProperty(obj, keys[i], props[keys[i]]);", "}", "return obj;", "}", "});", "");

  wrapper = function wrapper(obj, prop) {
    if (!(obj instanceof Interpreter.Object)) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Object.getOwnPropertyDescriptor called on non-object');
    }

    prop = String(prop);

    if (!(prop in obj.properties)) {
      return undefined;
    }

    var descriptor = Object.getOwnPropertyDescriptor(obj.properties, prop);
    var getter = obj.getter[prop];
    var setter = obj.setter[prop];
    var pseudoDescriptor = thisInterpreter.createObjectProto(thisInterpreter.OBJECT_PROTO);

    if (getter || setter) {
      thisInterpreter.setProperty(pseudoDescriptor, 'get', getter);
      thisInterpreter.setProperty(pseudoDescriptor, 'set', setter);
    } else {
      thisInterpreter.setProperty(pseudoDescriptor, 'value', descriptor.value);
      thisInterpreter.setProperty(pseudoDescriptor, 'writable', descriptor.writable);
    }

    thisInterpreter.setProperty(pseudoDescriptor, 'configurable', descriptor.configurable);
    thisInterpreter.setProperty(pseudoDescriptor, 'enumerable', descriptor.enumerable);
    return pseudoDescriptor;
  };

  this.setProperty(this.OBJECT, 'getOwnPropertyDescriptor', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    throwIfNullUndefined(obj);
    return thisInterpreter.getPrototype(obj);
  };

  this.setProperty(this.OBJECT, 'getPrototypeOf', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    return Boolean(obj) && !obj.preventExtensions;
  };

  this.setProperty(this.OBJECT, 'isExtensible', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    if (obj instanceof Interpreter.Object) {
      obj.preventExtensions = true;
    }

    return obj;
  };

  this.setProperty(this.OBJECT, 'preventExtensions', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR); // Instance methods on Object.

  this.setNativeFunctionPrototype(this.OBJECT, 'toString', Interpreter.Object.prototype.toString);
  this.setNativeFunctionPrototype(this.OBJECT, 'toLocaleString', Interpreter.Object.prototype.toString);
  this.setNativeFunctionPrototype(this.OBJECT, 'valueOf', Interpreter.Object.prototype.valueOf);

  wrapper = function wrapper(prop) {
    throwIfNullUndefined(this);

    if (this instanceof Interpreter.Object) {
      return String(prop) in this.properties;
    } // Primitive.


    return this.hasOwnProperty(prop);
  };

  this.setNativeFunctionPrototype(this.OBJECT, 'hasOwnProperty', wrapper);

  wrapper = function wrapper(prop) {
    throwIfNullUndefined(this);

    if (this instanceof Interpreter.Object) {
      return Object.prototype.propertyIsEnumerable.call(this.properties, prop);
    } // Primitive.


    return this.propertyIsEnumerable(prop);
  };

  this.setNativeFunctionPrototype(this.OBJECT, 'propertyIsEnumerable', wrapper);

  wrapper = function wrapper(obj) {
    while (true) {
      // Note, circular loops shouldn't be possible.
      obj = thisInterpreter.getPrototype(obj);

      if (!obj) {
        // No parent; reached the top.
        return false;
      }

      if (obj === this) {
        return true;
      }
    }
  };

  this.setNativeFunctionPrototype(this.OBJECT, 'isPrototypeOf', wrapper);
};
/**
 * Initialize the Array class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initArray = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // Array constructor.

  wrapper = function wrapper(var_args) {
    if (thisInterpreter.calledWithNew()) {
      // Called as `new Array()`.
      var newArray = this;
    } else {
      // Called as `Array()`.
      var newArray = thisInterpreter.createArray();
    }

    var first = arguments[0];

    if (arguments.length === 1 && typeof first === 'number') {
      if (isNaN(Interpreter.legalArrayLength(first))) {
        thisInterpreter.throwException(thisInterpreter.RANGE_ERROR, 'Invalid array length');
      }

      newArray.properties.length = first;
    } else {
      for (var i = 0; i < arguments.length; i++) {
        newArray.properties[i] = arguments[i];
      }

      newArray.properties.length = i;
    }

    return newArray;
  };

  this.ARRAY = this.createNativeFunction(wrapper, true);
  this.ARRAY_PROTO = this.ARRAY.properties['prototype'];
  this.setProperty(globalObject, 'Array', this.ARRAY); // Static methods on Array.

  wrapper = function wrapper(obj) {
    return obj && obj["class"] === 'Array';
  };

  this.setProperty(this.ARRAY, 'isArray', this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR); // Instance methods on Array.

  this.setProperty(this.ARRAY_PROTO, 'length', 0, {
    configurable: false,
    enumerable: false,
    writable: true
  });
  this.ARRAY_PROTO["class"] = 'Array';

  wrapper = function wrapper() {
    return Array.prototype.pop.call(this.properties);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'pop', wrapper);

  wrapper = function wrapper(var_args) {
    return Array.prototype.push.apply(this.properties, arguments);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'push', wrapper);

  wrapper = function wrapper() {
    return Array.prototype.shift.call(this.properties);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'shift', wrapper);

  wrapper = function wrapper(var_args) {
    return Array.prototype.unshift.apply(this.properties, arguments);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'unshift', wrapper);

  wrapper = function wrapper() {
    Array.prototype.reverse.call(this.properties);
    return this;
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'reverse', wrapper);

  wrapper = function wrapper(index, howmany
  /*, var_args*/
  ) {
    var list = Array.prototype.splice.apply(this.properties, arguments);
    return thisInterpreter.arrayNativeToPseudo(list);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'splice', wrapper);

  wrapper = function wrapper(opt_begin, opt_end) {
    var list = Array.prototype.slice.call(this.properties, opt_begin, opt_end);
    return thisInterpreter.arrayNativeToPseudo(list);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'slice', wrapper);

  wrapper = function wrapper(opt_separator) {
    return Array.prototype.join.call(this.properties, opt_separator);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'join', wrapper);

  wrapper = function wrapper(var_args) {
    var list = [];
    var length = 0; // Start by copying the current array.

    var iLength = thisInterpreter.getProperty(this, 'length');

    for (var i = 0; i < iLength; i++) {
      if (thisInterpreter.hasProperty(this, i)) {
        var element = thisInterpreter.getProperty(this, i);
        list[length] = element;
      }

      length++;
    } // Loop through all arguments and copy them in.


    for (var i = 0; i < arguments.length; i++) {
      var value = arguments[i];

      if (thisInterpreter.isa(value, thisInterpreter.ARRAY)) {
        var jLength = thisInterpreter.getProperty(value, 'length');

        for (var j = 0; j < jLength; j++) {
          if (thisInterpreter.hasProperty(value, j)) {
            list[length] = thisInterpreter.getProperty(value, j);
          }

          length++;
        }
      } else {
        list[length] = value;
      }
    }

    return thisInterpreter.arrayNativeToPseudo(list);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'concat', wrapper);

  wrapper = function wrapper(searchElement, opt_fromIndex) {
    return Array.prototype.indexOf.apply(this.properties, arguments);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'indexOf', wrapper);

  wrapper = function wrapper(searchElement, opt_fromIndex) {
    return Array.prototype.lastIndexOf.apply(this.properties, arguments);
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'lastIndexOf', wrapper);

  wrapper = function wrapper() {
    Array.prototype.sort.call(this.properties);
    return this;
  };

  this.setNativeFunctionPrototype(this.ARRAY, 'sort', wrapper);
  this.polyfills_.push( // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  "Object.defineProperty(Array.prototype, 'every',", "{configurable: true, writable: true, value:", "function(callbackfn, thisArg) {", "if (!this || typeof callbackfn !== 'function') throw TypeError();", "var T, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "k = 0;", "while (k < len) {", "if (k in O && !callbackfn.call(T, O[k], k, O)) return false;", "k++;", "}", "return true;", "}", "});", // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  "Object.defineProperty(Array.prototype, 'filter',", "{configurable: true, writable: true, value:", "function(fun/*, thisArg*/) {", "if (this === void 0 || this === null || typeof fun !== 'function') throw TypeError();", "var t = Object(this);", "var len = t.length >>> 0;", "var res = [];", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in t) {", "var val = t[i];", "if (fun.call(thisArg, val, i, t)) res.push(val);", "}", "}", "return res;", "}", "});", // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  "Object.defineProperty(Array.prototype, 'forEach',", "{configurable: true, writable: true, value:", "function(callback, thisArg) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var T, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "k = 0;", "while (k < len) {", "if (k in O) callback.call(T, O[k], k, O);", "k++;", "}", "}", "});", // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  "Object.defineProperty(Array.prototype, 'map',", "{configurable: true, writable: true, value:", "function(callback, thisArg) {", "if (!this || typeof callback !== 'function') new TypeError;", "var T, A, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "A = new Array(len);", "k = 0;", "while (k < len) {", "if (k in O) A[k] = callback.call(T, O[k], k, O);", "k++;", "}", "return A;", "}", "});", // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  "Object.defineProperty(Array.prototype, 'reduce',", "{configurable: true, writable: true, value:", "function(callback /*, initialValue*/) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var t = Object(this), len = t.length >>> 0, k = 0, value;", "if (arguments.length === 2) {", "value = arguments[1];", "} else {", "while (k < len && !(k in t)) k++;", "if (k >= len) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = t[k++];", "}", "for (; k < len; k++) {", "if (k in t) value = callback(value, t[k], k, t);", "}", "return value;", "}", "});", // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  "Object.defineProperty(Array.prototype, 'reduceRight',", "{configurable: true, writable: true, value:", "function(callback /*, initialValue*/) {", "if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw TypeError();", "var t = Object(this), len = t.length >>> 0, k = len - 1, value;", "if (arguments.length >= 2) {", "value = arguments[1];", "} else {", "while (k >= 0 && !(k in t)) k--;", "if (k < 0) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = t[k--];", "}", "for (; k >= 0; k--) {", "if (k in t) value = callback(value, t[k], k, t);", "}", "return value;", "}", "});", // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  "Object.defineProperty(Array.prototype, 'some',", "{configurable: true, writable: true, value:", "function(fun/*, thisArg*/) {", "if (!this || typeof fun !== 'function') throw TypeError();", "var t = Object(this);", "var len = t.length >>> 0;", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in t && fun.call(thisArg, t[i], i, t)) {", "return true;", "}", "}", "return false;", "}", "});", "(function() {", "var sort_ = Array.prototype.sort;", "Array.prototype.sort = function(opt_comp) {", // Fast native sort.
  "if (typeof opt_comp !== 'function') {", "return sort_.call(this);", "}", // Slow bubble sort.
  "for (var i = 0; i < this.length; i++) {", "var changes = 0;", "for (var j = 0; j < this.length - i - 1; j++) {", "if (opt_comp(this[j], this[j + 1]) > 0) {", "var swap = this[j];", "this[j] = this[j + 1];", "this[j + 1] = swap;", "changes++;", "}", "}", "if (!changes) break;", "}", "return this;", "};", "})();", "Object.defineProperty(Array.prototype, 'toLocaleString',", "{configurable: true, writable: true, value:", "function() {", "var out = [];", "for (var i = 0; i < this.length; i++) {", "out[i] = (this[i] === null || this[i] === undefined) ? '' : this[i].toLocaleString();", "}", "return out.join(',');", "}", "});", "");
};
/**
 * Initialize the String class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initString = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // String constructor.

  wrapper = function wrapper(value) {
    value = arguments.length ? String(value) : '';

    if (thisInterpreter.calledWithNew()) {
      // Called as `new String()`.
      this.data = value;
      return this;
    } else {
      // Called as `String()`.
      return value;
    }
  };

  this.STRING = this.createNativeFunction(wrapper, true);
  this.setProperty(globalObject, 'String', this.STRING); // Static methods on String.

  this.setProperty(this.STRING, 'fromCharCode', this.createNativeFunction(String.fromCharCode, false), Interpreter.NONENUMERABLE_DESCRIPTOR); // Instance methods on String.
  // Methods with exclusively primitive arguments.

  var functions = ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'slice', 'substr', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim'];

  for (var i = 0; i < functions.length; i++) {
    this.setNativeFunctionPrototype(this.STRING, functions[i], String.prototype[functions[i]]);
  }

  wrapper = function wrapper(compareString, locales, options) {
    locales = locales ? thisInterpreter.pseudoToNative(locales) : undefined;
    options = options ? thisInterpreter.pseudoToNative(options) : undefined;
    return String(this).localeCompare(compareString, locales, options);
  };

  this.setNativeFunctionPrototype(this.STRING, 'localeCompare', wrapper);

  wrapper = function wrapper(separator, limit, callback) {
    var string = String(this);
    limit = limit ? Number(limit) : undefined; // Example of catastrophic split RegExp:
    // 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.split(/^(a+)+b/)

    if (thisInterpreter.isa(separator, thisInterpreter.REGEXP)) {
      separator = separator.data;
      thisInterpreter.maybeThrowRegExp(separator, callback);

      if (thisInterpreter['REGEXP_MODE'] === 2) {
        if (Interpreter.vm) {
          // Run split in vm.
          var sandbox = {
            'string': string,
            'separator': separator,
            'limit': limit
          };
          var code = 'string.split(separator, limit)';
          var jsList = thisInterpreter.vmCall(code, sandbox, separator, callback);

          if (jsList !== Interpreter.REGEXP_TIMEOUT) {
            callback(thisInterpreter.arrayNativeToPseudo(jsList));
          }
        } else {
          // Run split in separate thread.
          var splitWorker = thisInterpreter.createWorker();
          var pid = thisInterpreter.regExpTimeout(separator, splitWorker, callback);

          splitWorker.onmessage = function (e) {
            clearTimeout(pid);
            callback(thisInterpreter.arrayNativeToPseudo(e.data));
          };

          splitWorker.postMessage(['split', string, separator, limit]);
        }

        return;
      }
    } // Run split natively.


    var jsList = string.split(separator, limit);
    callback(thisInterpreter.arrayNativeToPseudo(jsList));
  };

  this.setAsyncFunctionPrototype(this.STRING, 'split', wrapper);

  wrapper = function wrapper(regexp, callback) {
    var string = String(this);

    if (thisInterpreter.isa(regexp, thisInterpreter.REGEXP)) {
      regexp = regexp.data;
    } else {
      regexp = new RegExp(regexp);
    } // Example of catastrophic match RegExp:
    // 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.match(/^(a+)+b/)


    thisInterpreter.maybeThrowRegExp(regexp, callback);

    if (thisInterpreter['REGEXP_MODE'] === 2) {
      if (Interpreter.vm) {
        // Run match in vm.
        var sandbox = {
          'string': string,
          'regexp': regexp
        };
        var code = 'string.match(regexp)';
        var m = thisInterpreter.vmCall(code, sandbox, regexp, callback);

        if (m !== Interpreter.REGEXP_TIMEOUT) {
          callback(m && thisInterpreter.arrayNativeToPseudo(m));
        }
      } else {
        // Run match in separate thread.
        var matchWorker = thisInterpreter.createWorker();
        var pid = thisInterpreter.regExpTimeout(regexp, matchWorker, callback);

        matchWorker.onmessage = function (e) {
          clearTimeout(pid);
          callback(e.data && thisInterpreter.arrayNativeToPseudo(e.data));
        };

        matchWorker.postMessage(['match', string, regexp]);
      }

      return;
    } // Run match natively.


    var m = string.match(regexp);
    callback(m && thisInterpreter.arrayNativeToPseudo(m));
  };

  this.setAsyncFunctionPrototype(this.STRING, 'match', wrapper);

  wrapper = function wrapper(regexp, callback) {
    var string = String(this);

    if (thisInterpreter.isa(regexp, thisInterpreter.REGEXP)) {
      regexp = regexp.data;
    } else {
      regexp = new RegExp(regexp);
    } // Example of catastrophic search RegExp:
    // 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.search(/^(a+)+b/)


    thisInterpreter.maybeThrowRegExp(regexp, callback);

    if (thisInterpreter['REGEXP_MODE'] === 2) {
      if (Interpreter.vm) {
        // Run search in vm.
        var sandbox = {
          'string': string,
          'regexp': regexp
        };
        var code = 'string.search(regexp)';
        var n = thisInterpreter.vmCall(code, sandbox, regexp, callback);

        if (n !== Interpreter.REGEXP_TIMEOUT) {
          callback(n);
        }
      } else {
        // Run search in separate thread.
        var searchWorker = thisInterpreter.createWorker();
        var pid = thisInterpreter.regExpTimeout(regexp, searchWorker, callback);

        searchWorker.onmessage = function (e) {
          clearTimeout(pid);
          callback(e.data);
        };

        searchWorker.postMessage(['search', string, regexp]);
      }

      return;
    } // Run search natively.


    callback(string.search(regexp));
  };

  this.setAsyncFunctionPrototype(this.STRING, 'search', wrapper);

  wrapper = function wrapper(substr, newSubstr, callback) {
    // Support for function replacements is the responsibility of a polyfill.
    var string = String(this);
    newSubstr = String(newSubstr); // Example of catastrophic replace RegExp:
    // 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac'.replace(/^(a+)+b/, '')

    if (thisInterpreter.isa(substr, thisInterpreter.REGEXP)) {
      substr = substr.data;
      thisInterpreter.maybeThrowRegExp(substr, callback);

      if (thisInterpreter['REGEXP_MODE'] === 2) {
        if (Interpreter.vm) {
          // Run replace in vm.
          var sandbox = {
            'string': string,
            'substr': substr,
            'newSubstr': newSubstr
          };
          var code = 'string.replace(substr, newSubstr)';
          var str = thisInterpreter.vmCall(code, sandbox, substr, callback);

          if (str !== Interpreter.REGEXP_TIMEOUT) {
            callback(str);
          }
        } else {
          // Run replace in separate thread.
          var replaceWorker = thisInterpreter.createWorker();
          var pid = thisInterpreter.regExpTimeout(substr, replaceWorker, callback);

          replaceWorker.onmessage = function (e) {
            clearTimeout(pid);
            callback(e.data);
          };

          replaceWorker.postMessage(['replace', string, substr, newSubstr]);
        }

        return;
      }
    } // Run replace natively.


    callback(string.replace(substr, newSubstr));
  };

  this.setAsyncFunctionPrototype(this.STRING, 'replace', wrapper); // Add a polyfill to handle replace's second argument being a function.

  this.polyfills_.push("(function() {", "var replace_ = String.prototype.replace;", "String.prototype.replace = function(substr, newSubstr) {", "if (typeof newSubstr !== 'function') {", // string.replace(string|regexp, string)
  "return replace_.call(this, substr, newSubstr);", "}", "var str = this;", "if (substr instanceof RegExp) {", // string.replace(regexp, function)
  "var subs = [];", "var m = substr.exec(str);", "while (m) {", "m.push(m.index, str);", "var inject = newSubstr.apply(null, m);", "subs.push([m.index, m[0].length, inject]);", "m = substr.global ? substr.exec(str) : null;", "}", "for (var i = subs.length - 1; i >= 0; i--) {", "str = str.substring(0, subs[i][0]) + subs[i][2] + " + "str.substring(subs[i][0] + subs[i][1]);", "}", "} else {", // string.replace(string, function)
  "var i = str.indexOf(substr);", "if (i !== -1) {", "var inject = newSubstr(str.substr(i, substr.length), i, str);", "str = str.substring(0, i) + inject + " + "str.substring(i + substr.length);", "}", "}", "return str;", "};", "})();", "");
};
/**
 * Initialize the Boolean class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initBoolean = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // Boolean constructor.

  wrapper = function wrapper(value) {
    value = Boolean(value);

    if (thisInterpreter.calledWithNew()) {
      // Called as `new Boolean()`.
      this.data = value;
      return this;
    } else {
      // Called as `Boolean()`.
      return value;
    }
  };

  this.BOOLEAN = this.createNativeFunction(wrapper, true);
  this.setProperty(globalObject, 'Boolean', this.BOOLEAN);
};
/**
 * Initialize the Number class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initNumber = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // Number constructor.

  wrapper = function wrapper(value) {
    value = arguments.length ? Number(value) : 0;

    if (thisInterpreter.calledWithNew()) {
      // Called as `new Number()`.
      this.data = value;
      return this;
    } else {
      // Called as `Number()`.
      return value;
    }
  };

  this.NUMBER = this.createNativeFunction(wrapper, true);
  this.setProperty(globalObject, 'Number', this.NUMBER);
  var numConsts = ['MAX_VALUE', 'MIN_VALUE', 'NaN', 'NEGATIVE_INFINITY', 'POSITIVE_INFINITY'];

  for (var i = 0; i < numConsts.length; i++) {
    this.setProperty(this.NUMBER, numConsts[i], Number[numConsts[i]], Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  } // Instance methods on Number.


  wrapper = function wrapper(fractionDigits) {
    try {
      return Number(this).toExponential(fractionDigits);
    } catch (e) {
      // Throws if fractionDigits isn't within 0-20.
      thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
    }
  };

  this.setNativeFunctionPrototype(this.NUMBER, 'toExponential', wrapper);

  wrapper = function wrapper(digits) {
    try {
      return Number(this).toFixed(digits);
    } catch (e) {
      // Throws if digits isn't within 0-20.
      thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
    }
  };

  this.setNativeFunctionPrototype(this.NUMBER, 'toFixed', wrapper);

  wrapper = function wrapper(precision) {
    try {
      return Number(this).toPrecision(precision);
    } catch (e) {
      // Throws if precision isn't within range (depends on implementation).
      thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
    }
  };

  this.setNativeFunctionPrototype(this.NUMBER, 'toPrecision', wrapper);

  wrapper = function wrapper(radix) {
    try {
      return Number(this).toString(radix);
    } catch (e) {
      // Throws if radix isn't within 2-36.
      thisInterpreter.throwException(thisInterpreter.ERROR, e.message);
    }
  };

  this.setNativeFunctionPrototype(this.NUMBER, 'toString', wrapper);

  wrapper = function wrapper(locales, options) {
    locales = locales ? thisInterpreter.pseudoToNative(locales) : undefined;
    options = options ? thisInterpreter.pseudoToNative(options) : undefined;
    return Number(this).toLocaleString(locales, options);
  };

  this.setNativeFunctionPrototype(this.NUMBER, 'toLocaleString', wrapper);
};
/**
 * Initialize the Date class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initDate = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // Date constructor.

  wrapper = function wrapper(value, var_args) {
    if (!thisInterpreter.calledWithNew()) {
      // Called as `Date()`.
      // Calling Date() as a function returns a string, no arguments are heeded.
      return Date();
    } // Called as `new Date()`.


    var args = [null].concat(Array.from(arguments));
    this.data = new (Function.prototype.bind.apply(Date, args))();
    return this;
  };

  this.DATE = this.createNativeFunction(wrapper, true);
  this.DATE_PROTO = this.DATE.properties['prototype'];
  this.setProperty(globalObject, 'Date', this.DATE); // Static methods on Date.

  this.setProperty(this.DATE, 'now', this.createNativeFunction(Date.now, false), Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.DATE, 'parse', this.createNativeFunction(Date.parse, false), Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.DATE, 'UTC', this.createNativeFunction(Date.UTC, false), Interpreter.NONENUMERABLE_DESCRIPTOR); // Instance methods on Date.

  var functions = ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'toDateString', 'toISOString', 'toJSON', 'toGMTString', 'toLocaleDateString', 'toLocaleString', 'toLocaleTimeString', 'toTimeString', 'toUTCString'];

  for (var i = 0; i < functions.length; i++) {
    wrapper = function (nativeFunc) {
      return function (var_args) {
        var args = [];

        for (var i = 0; i < arguments.length; i++) {
          args[i] = thisInterpreter.pseudoToNative(arguments[i]);
        }

        return this.data[nativeFunc].apply(this.data, args);
      };
    }(functions[i]);

    this.setNativeFunctionPrototype(this.DATE, functions[i], wrapper);
  }
};
/**
 * Initialize Regular Expression object.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initRegExp = function (globalObject) {
  var thisInterpreter = this;
  var wrapper; // RegExp constructor.

  wrapper = function wrapper(pattern, flags) {
    if (thisInterpreter.calledWithNew()) {
      // Called as `new RegExp()`.
      var rgx = this;
    } else {
      // Called as `RegExp()`.
      var rgx = thisInterpreter.createObjectProto(thisInterpreter.REGEXP_PROTO);
    }

    pattern = pattern ? String(pattern) : '';
    flags = flags ? String(flags) : '';
    thisInterpreter.populateRegExp(rgx, new RegExp(pattern, flags));
    return rgx;
  };

  this.REGEXP = this.createNativeFunction(wrapper, true);
  this.REGEXP_PROTO = this.REGEXP.properties['prototype'];
  this.setProperty(globalObject, 'RegExp', this.REGEXP);
  this.setProperty(this.REGEXP.properties['prototype'], 'global', undefined, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.REGEXP.properties['prototype'], 'ignoreCase', undefined, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.REGEXP.properties['prototype'], 'multiline', undefined, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.REGEXP.properties['prototype'], 'source', '(?:)', Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR); // Use polyfill to avoid complexity of regexp threads.

  this.polyfills_.push("Object.defineProperty(RegExp.prototype, 'test',", "{configurable: true, writable: true, value:", "function(str) {", "return String(str).search(this) !== -1", "}", "});");

  wrapper = function wrapper(string, callback) {
    var regexp = this.data;
    string = String(string); // Get lastIndex from wrapped regexp, since this is settable.

    regexp.lastIndex = Number(thisInterpreter.getProperty(this, 'lastIndex')); // Example of catastrophic exec RegExp:
    // /^(a+)+b/.exec('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaac')

    thisInterpreter.maybeThrowRegExp(regexp, callback);

    if (thisInterpreter['REGEXP_MODE'] === 2) {
      if (Interpreter.vm) {
        // Run exec in vm.
        var sandbox = {
          'string': string,
          'regexp': regexp
        };
        var code = 'regexp.exec(string)';
        var match = thisInterpreter.vmCall(code, sandbox, regexp, callback);

        if (match !== Interpreter.REGEXP_TIMEOUT) {
          thisInterpreter.setProperty(this, 'lastIndex', regexp.lastIndex);
          callback(matchToPseudo(match));
        }
      } else {
        // Run exec in separate thread.
        // Note that lastIndex is not preserved when a RegExp is passed to a
        // Web Worker.  Thus it needs to be passed back and forth separately.
        var execWorker = thisInterpreter.createWorker();
        var pid = thisInterpreter.regExpTimeout(regexp, execWorker, callback);
        var thisPseudoRegExp = this;

        execWorker.onmessage = function (e) {
          clearTimeout(pid); // Return tuple: [result, lastIndex]

          thisInterpreter.setProperty(thisPseudoRegExp, 'lastIndex', e.data[1]);
          callback(matchToPseudo(e.data[0]));
        };

        execWorker.postMessage(['exec', regexp, regexp.lastIndex, string]);
      }

      return;
    } // Run exec natively.


    var match = regexp.exec(string);
    thisInterpreter.setProperty(this, 'lastIndex', regexp.lastIndex);
    callback(matchToPseudo(match));

    function matchToPseudo(match) {
      if (match) {
        var result = thisInterpreter.arrayNativeToPseudo(match); // match has additional properties.

        thisInterpreter.setProperty(result, 'index', match.index);
        thisInterpreter.setProperty(result, 'input', match.input);
        return result;
      }

      return null;
    }
  };

  this.setAsyncFunctionPrototype(this.REGEXP, 'exec', wrapper);
};
/**
 * Initialize the Error class.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initError = function (globalObject) {
  var thisInterpreter = this; // Error constructor.

  this.ERROR = this.createNativeFunction(function (opt_message) {
    if (thisInterpreter.calledWithNew()) {
      // Called as `new Error()`.
      var newError = this;
    } else {
      // Called as `Error()`.
      var newError = thisInterpreter.createObject(thisInterpreter.ERROR);
    }

    if (opt_message) {
      thisInterpreter.setProperty(newError, 'message', String(opt_message), Interpreter.NONENUMERABLE_DESCRIPTOR);
    }

    return newError;
  }, true);
  this.setProperty(globalObject, 'Error', this.ERROR);
  this.setProperty(this.ERROR.properties['prototype'], 'message', '', Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.ERROR.properties['prototype'], 'name', 'Error', Interpreter.NONENUMERABLE_DESCRIPTOR);

  var createErrorSubclass = function createErrorSubclass(name) {
    var constructor = thisInterpreter.createNativeFunction(function (opt_message) {
      if (thisInterpreter.calledWithNew()) {
        // Called as `new XyzError()`.
        var newError = this;
      } else {
        // Called as `XyzError()`.
        var newError = thisInterpreter.createObject(constructor);
      }

      if (opt_message) {
        thisInterpreter.setProperty(newError, 'message', String(opt_message), Interpreter.NONENUMERABLE_DESCRIPTOR);
      }

      return newError;
    }, true);
    thisInterpreter.setProperty(constructor, 'prototype', thisInterpreter.createObject(thisInterpreter.ERROR), Interpreter.NONENUMERABLE_DESCRIPTOR);
    thisInterpreter.setProperty(constructor.properties['prototype'], 'name', name, Interpreter.NONENUMERABLE_DESCRIPTOR);
    thisInterpreter.setProperty(globalObject, name, constructor);
    return constructor;
  };

  this.EVAL_ERROR = createErrorSubclass('EvalError');
  this.RANGE_ERROR = createErrorSubclass('RangeError');
  this.REFERENCE_ERROR = createErrorSubclass('ReferenceError');
  this.SYNTAX_ERROR = createErrorSubclass('SyntaxError');
  this.TYPE_ERROR = createErrorSubclass('TypeError');
  this.URI_ERROR = createErrorSubclass('URIError');
};
/**
 * Initialize Math object.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initMath = function (globalObject) {
  var myMath = this.createObjectProto(this.OBJECT_PROTO);
  this.setProperty(globalObject, 'Math', myMath);
  var mathConsts = ['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2'];

  for (var i = 0; i < mathConsts.length; i++) {
    this.setProperty(myMath, mathConsts[i], Math[mathConsts[i]], Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  }

  var numFunctions = ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'random', 'round', 'sin', 'sqrt', 'tan'];

  for (var i = 0; i < numFunctions.length; i++) {
    this.setProperty(myMath, numFunctions[i], this.createNativeFunction(Math[numFunctions[i]], false), Interpreter.NONENUMERABLE_DESCRIPTOR);
  }
};
/**
 * Initialize JSON object.
 * @param {!Interpreter.Object} globalObject Global object.
 */


Interpreter.prototype.initJSON = function (globalObject) {
  var thisInterpreter = this;
  var myJSON = thisInterpreter.createObjectProto(this.OBJECT_PROTO);
  this.setProperty(globalObject, 'JSON', myJSON);

  var wrapper = function wrapper(text) {
    try {
      var nativeObj = JSON.parse(String(text));
    } catch (e) {
      thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, e.message);
    }

    return thisInterpreter.nativeToPseudo(nativeObj);
  };

  this.setProperty(myJSON, 'parse', this.createNativeFunction(wrapper, false));

  wrapper = function wrapper(value, replacer, space) {
    if (replacer && replacer["class"] === 'Function') {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Function replacer on JSON.stringify not supported');
    } else if (replacer && replacer["class"] === 'Array') {
      replacer = thisInterpreter.arrayPseudoToNative(replacer);
      replacer = replacer.filter(function (word) {
        // Spec says we should also support boxed primitives here.
        return typeof word === 'string' || typeof word === 'number';
      });
    } else {
      replacer = null;
    } // Spec says we should also support boxed primitives here.


    if (typeof space !== 'string' && typeof space !== 'number') {
      space = undefined;
    }

    var nativeObj = thisInterpreter.pseudoToNative(value);

    try {
      var str = JSON.stringify(nativeObj, replacer, space);
    } catch (e) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, e.message);
    }

    return str;
  };

  this.setProperty(myJSON, 'stringify', this.createNativeFunction(wrapper, false));
};
/**
 * Is an object of a certain class?
 * @param {Interpreter.Value} child Object to check.
 * @param {Interpreter.Object} constructor Constructor of object.
 * @return {boolean} True if object is the class or inherits from it.
 *     False otherwise.
 */


Interpreter.prototype.isa = function (child, constructor) {
  if (child === null || child === undefined || !constructor) {
    return false;
  }

  var proto = constructor.properties['prototype'];

  if (child === proto) {
    return true;
  } // The first step up the prototype chain is harder since the child might be
  // a primitive value.  Subsequent steps can just follow the .proto property.


  child = this.getPrototype(child);

  while (child) {
    if (child === proto) {
      return true;
    }

    child = child.proto;
  }

  return false;
};
/**
 * Initialize a pseudo regular expression object based on a native regular
 * expression object.
 * @param {!Interpreter.Object} pseudoRegexp The existing object to set.
 * @param {!RegExp} nativeRegexp The native regular expression.
 */


Interpreter.prototype.populateRegExp = function (pseudoRegexp, nativeRegexp) {
  pseudoRegexp.data = new RegExp(nativeRegexp.source, nativeRegexp.flags); // lastIndex is settable, all others are read-only attributes

  this.setProperty(pseudoRegexp, 'lastIndex', nativeRegexp.lastIndex, Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'source', nativeRegexp.source, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'global', nativeRegexp.global, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'ignoreCase', nativeRegexp.ignoreCase, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'multiline', nativeRegexp.multiline, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
};
/**
 * Create a Web Worker to execute regular expressions.
 * Using a separate file fails in Chrome when run locally on a file:// URI.
 * Using a data encoded URI fails in IE and Edge.
 * Using a blob works in IE11 and all other browsers.
 * @return {!Worker} Web Worker with regexp execution code loaded.
 */


Interpreter.prototype.createWorker = function () {
  var blob = this.createWorker.blob_;

  if (!blob) {
    blob = new Blob([Interpreter.WORKER_CODE.join('\n')], {
      type: 'application/javascript'
    }); // Cache the blob, so it doesn't need to be created next time.

    this.createWorker.blob_ = blob;
  }

  return new Worker(URL.createObjectURL(blob));
};
/**
 * Execute regular expressions in a node vm.
 * @param {string} code Code to execute.
 * @param {!Object} sandbox Global variables for new vm.
 * @param {!RegExp} nativeRegExp Regular expression.
 * @param {!Function} callback Asynchronous callback function.
 */


Interpreter.prototype.vmCall = function (code, sandbox, nativeRegExp, callback) {
  var options = {
    'timeout': this['REGEXP_THREAD_TIMEOUT']
  };

  try {
    return Interpreter.vm['runInNewContext'](code, sandbox, options);
  } catch (e) {
    callback(null);
    this.throwException(this.ERROR, 'RegExp Timeout: ' + nativeRegExp);
  }

  return Interpreter.REGEXP_TIMEOUT;
};
/**
 * If REGEXP_MODE is 0, then throw an error.
 * Also throw if REGEXP_MODE is 2 and JS doesn't support Web Workers or vm.
 * @param {!RegExp} nativeRegExp Regular expression.
 * @param {!Function} callback Asynchronous callback function.
 */


Interpreter.prototype.maybeThrowRegExp = function (nativeRegExp, callback) {
  var ok;

  if (this['REGEXP_MODE'] === 0) {
    // Fail: No RegExp support.
    ok = false;
  } else if (this['REGEXP_MODE'] === 1) {
    // Ok: Native RegExp support.
    ok = true;
  } else {
    // Sandboxed RegExp handling.
    if (Interpreter.vm) {
      // Ok: Node's vm module already loaded.
      ok = true;
    } else if (typeof Worker === 'function' && typeof URL === 'function') {
      // Ok: Web Workers available.
      ok = true;
    } else if (true) {
      // Try to load Node's vm module.
      try {
        Interpreter.vm = __webpack_require__(/*! vm */ "../remix-cli/node_modules/vm-browserify/index.js");
      } catch (e) {}

      ok = !!Interpreter.vm;
    } else {}
  }

  if (!ok) {
    callback(null);
    this.throwException(this.ERROR, 'Regular expressions not supported: ' + nativeRegExp);
  }
};
/**
 * Set a timeout for regular expression threads.  Unless cancelled, this will
 * terminate the thread and throw an error.
 * @param {!RegExp} nativeRegExp Regular expression (used for error message).
 * @param {!Worker} worker Thread to terminate.
 * @param {!Function} callback Async callback function to continue execution.
 * @return {number} PID of timeout.  Used to cancel if thread completes.
 */


Interpreter.prototype.regExpTimeout = function (nativeRegExp, worker, callback) {
  var thisInterpreter = this;
  return setTimeout(function () {
    worker.terminate();
    callback(null);

    try {
      thisInterpreter.throwException(thisInterpreter.ERROR, 'RegExp Timeout: ' + nativeRegExp);
    } catch (e) {// Eat the expected Interpreter.STEP_ERROR.
    }
  }, this['REGEXP_THREAD_TIMEOUT']);
};
/**
 * Create a new data object based on a constructor's prototype.
 * @param {Interpreter.Object} constructor Parent constructor function,
 *     or null if scope object.
 * @return {!Interpreter.Object} New data object.
 */


Interpreter.prototype.createObject = function (constructor) {
  return this.createObjectProto(constructor && constructor.properties['prototype']);
};
/**
 * Create a new data object based on a prototype.
 * @param {Interpreter.Object} proto Prototype object.
 * @return {!Interpreter.Object} New data object.
 */


Interpreter.prototype.createObjectProto = function (proto) {
  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(proto) !== 'object') {
    throw Error('Non object prototype');
  }

  var obj = new Interpreter.Object(proto);

  if (this.isa(obj, this.ERROR)) {
    // Record this object as being an error so that its toString function can
    // process it correctly (toString has no access to the interpreter and could
    // not otherwise determine that the object is an error).
    obj["class"] = 'Error';
  }

  return obj;
};
/**
 * Create a new array.
 * @return {!Interpreter.Object} New array.
 */


Interpreter.prototype.createArray = function () {
  var array = this.createObjectProto(this.ARRAY_PROTO); // Arrays have length.

  this.setProperty(array, 'length', 0, {
    configurable: false,
    enumerable: false,
    writable: true
  });
  array["class"] = 'Array';
  return array;
};
/**
 * Create a new function object (could become interpreted or native or async).
 * @param {number} argumentLength Number of arguments.
 * @param {boolean} isConstructor True if function can be used with 'new'.
 * @return {!Interpreter.Object} New function.
 * @private
 */


Interpreter.prototype.createFunctionBase_ = function (argumentLength, isConstructor) {
  var func = this.createObjectProto(this.FUNCTION_PROTO);

  if (isConstructor) {
    var proto = this.createObjectProto(this.OBJECT_PROTO);
    this.setProperty(func, 'prototype', proto, Interpreter.NONENUMERABLE_DESCRIPTOR);
    this.setProperty(proto, 'constructor', func, Interpreter.NONENUMERABLE_DESCRIPTOR);
  } else {
    func.illegalConstructor = true;
  }

  this.setProperty(func, 'length', argumentLength, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  func["class"] = 'Function';
  return func;
};
/**
 * Create a new interpreted function.
 * @param {!Object} node AST node defining the function.
 * @param {!Interpreter.Scope} scope Parent scope.
 * @return {!Interpreter.Object} New function.
 */


Interpreter.prototype.createFunction = function (node, scope) {
  var func = this.createFunctionBase_(node['params'].length, true);
  func.parentScope = scope;
  func.node = node;
  return func;
};
/**
 * Create a new native function.
 * @param {!Function} nativeFunc JavaScript function.
 * @param {boolean} isConstructor True if function can be used with 'new'.
 * @return {!Interpreter.Object} New function.
 */


Interpreter.prototype.createNativeFunction = function (nativeFunc, isConstructor) {
  var func = this.createFunctionBase_(nativeFunc.length, isConstructor);
  func.nativeFunc = nativeFunc;
  nativeFunc.id = this.functionCounter_++;
  return func;
};
/**
 * Create a new native asynchronous function.
 * @param {!Function} asyncFunc JavaScript function.
 * @return {!Interpreter.Object} New function.
 */


Interpreter.prototype.createAsyncFunction = function (asyncFunc) {
  var func = this.createFunctionBase_(asyncFunc.length, true);
  func.asyncFunc = asyncFunc;
  asyncFunc.id = this.functionCounter_++;
  return func;
};
/**
 * Converts from a native JavaScript object or value to a JS-Interpreter object.
 * Can handle JSON-style values, regular expressions, dates and functions.
 * Does NOT handle cycles.
 * @param {*} nativeObj The native JavaScript object to be converted.
 * @return {Interpreter.Value} The equivalent JS-Interpreter object.
 */


Interpreter.prototype.nativeToPseudo = function (nativeObj) {
  if (nativeObj instanceof Interpreter.Object) {
    throw Error('Object is already pseudo');
  }

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(nativeObj) !== 'object' && typeof nativeObj !== 'function' || nativeObj === null) {
    return nativeObj;
  }

  if (nativeObj instanceof RegExp) {
    var pseudoRegexp = this.createObjectProto(this.REGEXP_PROTO);
    this.populateRegExp(pseudoRegexp, nativeObj);
    return pseudoRegexp;
  }

  if (nativeObj instanceof Date) {
    var pseudoDate = this.createObjectProto(this.DATE_PROTO);
    pseudoDate.data = new Date(nativeObj.valueOf());
    return pseudoDate;
  }

  if (typeof nativeObj === 'function') {
    var thisInterpreter = this;

    var wrapper = function wrapper() {
      var args = Array.prototype.slice.call(arguments).map(function (i) {
        return thisInterpreter.pseudoToNative(i);
      });
      var value = nativeObj.apply(thisInterpreter, args);
      return thisInterpreter.nativeToPseudo(value);
    };

    var prototype = Object.getOwnPropertyDescriptor(nativeObj, 'prototype');
    return this.createNativeFunction(wrapper, !!prototype);
  }

  if (Array.isArray(nativeObj)) {
    // Array.
    var pseudoArray = this.createArray();

    for (var i = 0; i < nativeObj.length; i++) {
      if (i in nativeObj) {
        this.setProperty(pseudoArray, i, this.nativeToPseudo(nativeObj[i]));
      }
    }

    return pseudoArray;
  } // Object.


  var pseudoObj = this.createObjectProto(this.OBJECT_PROTO);

  for (var key in nativeObj) {
    this.setProperty(pseudoObj, key, this.nativeToPseudo(nativeObj[key]));
  }

  return pseudoObj;
};
/**
 * Converts from a JS-Interpreter object to native JavaScript object.
 * Can handle JSON-style values, regular expressions, and dates.
 * Does handle cycles.
 * @param {Interpreter.Value} pseudoObj The JS-Interpreter object to be
 * converted.
 * @param {Object=} opt_cycles Cycle detection (used in recursive calls).
 * @return {*} The equivalent native JavaScript object or value.
 */


Interpreter.prototype.pseudoToNative = function (pseudoObj, opt_cycles) {
  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(pseudoObj) !== 'object' && typeof pseudoObj !== 'function' || pseudoObj === null) {
    return pseudoObj;
  }

  if (!(pseudoObj instanceof Interpreter.Object)) {
    throw Error('Object is not pseudo');
  }

  if (this.isa(pseudoObj, this.REGEXP)) {
    // Regular expression.
    var nativeRegExp = new RegExp(pseudoObj.data.source, pseudoObj.data.flags);
    nativeRegExp.lastIndex = pseudoObj.data.lastIndex;
    return nativeRegExp;
  }

  if (this.isa(pseudoObj, this.DATE)) {
    // Date.
    return new Date(pseudoObj.data.valueOf());
  }

  var cycles = opt_cycles || {
    pseudo: [],
    "native": []
  };
  var i = cycles.pseudo.indexOf(pseudoObj);

  if (i !== -1) {
    return cycles["native"][i];
  }

  cycles.pseudo.push(pseudoObj);
  var nativeObj;

  if (this.isa(pseudoObj, this.ARRAY)) {
    // Array.
    nativeObj = [];
    cycles["native"].push(nativeObj);
    var length = this.getProperty(pseudoObj, 'length');

    for (var i = 0; i < length; i++) {
      if (this.hasProperty(pseudoObj, i)) {
        nativeObj[i] = this.pseudoToNative(this.getProperty(pseudoObj, i), cycles);
      }
    }
  } else {
    // Object.
    nativeObj = {};
    cycles["native"].push(nativeObj);
    var val;

    for (var key in pseudoObj.properties) {
      val = this.pseudoToNative(pseudoObj.properties[key], cycles); // Use defineProperty to avoid side effects if setting '__proto__'.

      Object.defineProperty(nativeObj, key, {
        value: val,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }

  cycles.pseudo.pop();
  cycles["native"].pop();
  return nativeObj;
};
/**
 * Converts from a native JavaScript array to a JS-Interpreter array.
 * Does handle non-numeric properties (like str.match's index prop).
 * Does NOT recurse into the array's contents.
 * @param {!Array} nativeArray The JavaScript array to be converted.
 * @return {!Interpreter.Object} The equivalent JS-Interpreter array.
 */


Interpreter.prototype.arrayNativeToPseudo = function (nativeArray) {
  var pseudoArray = this.createArray();
  var props = Object.getOwnPropertyNames(nativeArray);

  for (var i = 0; i < props.length; i++) {
    this.setProperty(pseudoArray, props[i], nativeArray[props[i]]);
  }

  return pseudoArray;
};
/**
 * Converts from a JS-Interpreter array to native JavaScript array.
 * Does handle non-numeric properties (like str.match's index prop).
 * Does NOT recurse into the array's contents.
 * @param {!Interpreter.Object} pseudoArray The JS-Interpreter array,
 *     or JS-Interpreter object pretending to be an array.
 * @return {!Array} The equivalent native JavaScript array.
 */


Interpreter.prototype.arrayPseudoToNative = function (pseudoArray) {
  var nativeArray = [];

  for (var key in pseudoArray.properties) {
    nativeArray[key] = this.getProperty(pseudoArray, key);
  } // pseudoArray might be an object pretending to be an array.  In this case
  // it's possible that length is non-existent, invalid, or smaller than the
  // largest defined numeric property.  Set length explicitly here.


  nativeArray.length = Interpreter.legalArrayLength(this.getProperty(pseudoArray, 'length')) || 0;
  return nativeArray;
};
/**
 * Look up the prototype for this value.
 * @param {Interpreter.Value} value Data object.
 * @return {Interpreter.Object} Prototype object, null if none.
 */


Interpreter.prototype.getPrototype = function (value) {
  switch (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value)) {
    case 'number':
      return this.NUMBER.properties['prototype'];

    case 'boolean':
      return this.BOOLEAN.properties['prototype'];

    case 'string':
      return this.STRING.properties['prototype'];
  }

  if (value) {
    return value.proto;
  }

  return null;
};
/**
 * Fetch a property value from a data object.
 * @param {Interpreter.Value} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @return {Interpreter.Value} Property value (may be undefined).
 */


Interpreter.prototype.getProperty = function (obj, name) {
  if (this.getterStep_) {
    throw Error('Getter not supported in that context');
  }

  name = String(name);

  if (obj === undefined || obj === null) {
    this.throwException(this.TYPE_ERROR, "Cannot read property '" + name + "' of " + obj);
  }

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj) === 'object' && !(obj instanceof Interpreter.Object)) {
    throw TypeError('Expecting native value or pseudo object');
  }

  if (name === 'length') {
    // Special cases for magic length property.
    if (this.isa(obj, this.STRING)) {
      return String(obj).length;
    }
  } else if (name.charCodeAt(0) < 0x40) {
    // Might have numbers in there?
    // Special cases for string array indexing
    if (this.isa(obj, this.STRING)) {
      var n = Interpreter.legalArrayIndex(name);

      if (!isNaN(n) && n < String(obj).length) {
        return String(obj)[n];
      }
    }
  }

  do {
    if (obj.properties && name in obj.properties) {
      var getter = obj.getter[name];

      if (getter) {
        // Flag this function as being a getter and thus needing immediate
        // execution (rather than being the value of the property).
        this.getterStep_ = true;
        return getter;
      }

      return obj.properties[name];
    }
  } while (obj = this.getPrototype(obj));

  return undefined;
};
/**
 * Does the named property exist on a data object.
 * @param {!Interpreter.Object} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @return {boolean} True if property exists.
 */


Interpreter.prototype.hasProperty = function (obj, name) {
  if (!(obj instanceof Interpreter.Object)) {
    throw TypeError('Primitive data type has no properties');
  }

  name = String(name);

  if (name === 'length' && this.isa(obj, this.STRING)) {
    return true;
  }

  if (this.isa(obj, this.STRING)) {
    var n = Interpreter.legalArrayIndex(name);

    if (!isNaN(n) && n < String(obj).length) {
      return true;
    }
  }

  do {
    if (obj.properties && name in obj.properties) {
      return true;
    }
  } while (obj = this.getPrototype(obj));

  return false;
};
/**
 * Set a property value on a data object.
 * @param {Interpreter.Value} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @param {Interpreter.Value} value New property value.
 *     Use Interpreter.VALUE_IN_DESCRIPTOR if value is handled by
 *     descriptor instead.
 * @param {Object=} opt_descriptor Optional descriptor object.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */


Interpreter.prototype.setProperty = function (obj, name, value, opt_descriptor) {
  if (this.setterStep_) {
    // Getter from previous call to setProperty was not handled.
    throw Error('Setter not supported in that context');
  }

  name = String(name);

  if (obj === undefined || obj === null) {
    this.throwException(this.TYPE_ERROR, "Cannot set property '" + name + "' of " + obj);
  }

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj) === 'object' && !(obj instanceof Interpreter.Object)) {
    throw TypeError('Expecting native value or pseudo object');
  }

  if (opt_descriptor && ('get' in opt_descriptor || 'set' in opt_descriptor) && ('value' in opt_descriptor || 'writable' in opt_descriptor)) {
    this.throwException(this.TYPE_ERROR, 'Invalid property descriptor. ' + 'Cannot both specify accessors and a value or writable attribute');
  }

  var strict = !this.stateStack || this.getScope().strict;

  if (!(obj instanceof Interpreter.Object)) {
    if (strict) {
      this.throwException(this.TYPE_ERROR, "Can't create property '" + name + "' on '" + obj + "'");
    }

    return;
  }

  if (this.isa(obj, this.STRING)) {
    var n = Interpreter.legalArrayIndex(name);

    if (name === 'length' || !isNaN(n) && n < String(obj).length) {
      // Can't set length or letters on String objects.
      if (strict) {
        this.throwException(this.TYPE_ERROR, "Cannot assign to read only " + "property '" + name + "' of String '" + obj.data + "'");
      }

      return;
    }
  }

  if (obj["class"] === 'Array') {
    // Arrays have a magic length variable that is bound to the elements.
    var length = obj.properties.length;
    var i;

    if (name === 'length') {
      // Delete elements if length is smaller.
      if (opt_descriptor) {
        if (!('value' in opt_descriptor)) {
          return;
        }

        value = opt_descriptor.value;
      }

      value = Interpreter.legalArrayLength(value);

      if (isNaN(value)) {
        this.throwException(this.RANGE_ERROR, 'Invalid array length');
      }

      if (value < length) {
        for (i in obj.properties) {
          i = Interpreter.legalArrayIndex(i);

          if (!isNaN(i) && value <= i) {
            delete obj.properties[i];
          }
        }
      }
    } else if (!isNaN(i = Interpreter.legalArrayIndex(name))) {
      // Increase length if this index is larger.
      obj.properties.length = Math.max(length, i + 1);
    }
  }

  if (obj.preventExtensions && !(name in obj.properties)) {
    if (strict) {
      this.throwException(this.TYPE_ERROR, "Can't add property '" + name + "', object is not extensible");
    }

    return;
  }

  if (opt_descriptor) {
    // Define the property.
    if ('get' in opt_descriptor) {
      if (opt_descriptor.get) {
        obj.getter[name] = opt_descriptor.get;
      } else {
        delete obj.getter[name];
      }
    }

    if ('set' in opt_descriptor) {
      if (opt_descriptor.set) {
        obj.setter[name] = opt_descriptor.set;
      } else {
        delete obj.setter[name];
      }
    }

    var descriptor = {};

    if ('configurable' in opt_descriptor) {
      descriptor.configurable = opt_descriptor.configurable;
    }

    if ('enumerable' in opt_descriptor) {
      descriptor.enumerable = opt_descriptor.enumerable;
    }

    if ('writable' in opt_descriptor) {
      descriptor.writable = opt_descriptor.writable;
      delete obj.getter[name];
      delete obj.setter[name];
    }

    if ('value' in opt_descriptor) {
      descriptor.value = opt_descriptor.value;
      delete obj.getter[name];
      delete obj.setter[name];
    } else if (value !== Interpreter.VALUE_IN_DESCRIPTOR) {
      descriptor.value = value;
      delete obj.getter[name];
      delete obj.setter[name];
    }

    try {
      Object.defineProperty(obj.properties, name, descriptor);
    } catch (e) {
      this.throwException(this.TYPE_ERROR, 'Cannot redefine property: ' + name);
    }
  } else {
    // Set the property.
    if (value === Interpreter.VALUE_IN_DESCRIPTOR) {
      throw ReferenceError('Value not specified.');
    } // Determine the parent (possibly self) where the property is defined.


    var defObj = obj;

    while (!(name in defObj.properties)) {
      defObj = this.getPrototype(defObj);

      if (!defObj) {
        // This is a new property.
        defObj = obj;
        break;
      }
    }

    if (defObj.setter && defObj.setter[name]) {
      this.setterStep_ = true;
      return defObj.setter[name];
    }

    if (defObj.getter && defObj.getter[name]) {
      if (strict) {
        this.throwException(this.TYPE_ERROR, "Cannot set property '" + name + "' of object '" + obj + "' which only has a getter");
      }
    } else {
      // No setter, simple assignment.
      try {
        obj.properties[name] = value;
      } catch (e) {
        if (strict) {
          this.throwException(this.TYPE_ERROR, "Cannot assign to read only " + "property '" + name + "' of object '" + obj + "'");
        }
      }
    }
  }
};
/**
 * Convenience method for adding a native function as a non-enumerable property
 * onto an object's prototype.
 * @param {!Interpreter.Object} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @param {!Function} wrapper Function object.
 */


Interpreter.prototype.setNativeFunctionPrototype = function (obj, name, wrapper) {
  this.setProperty(obj.properties['prototype'], name, this.createNativeFunction(wrapper, false), Interpreter.NONENUMERABLE_DESCRIPTOR);
};
/**
 * Convenience method for adding an async function as a non-enumerable property
 * onto an object's prototype.
 * @param {!Interpreter.Object} obj Data object.
 * @param {Interpreter.Value} name Name of property.
 * @param {!Function} wrapper Function object.
 */


Interpreter.prototype.setAsyncFunctionPrototype = function (obj, name, wrapper) {
  this.setProperty(obj.properties['prototype'], name, this.createAsyncFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);
};
/**
 * Returns the current scope from the stateStack.
 * @return {!Interpreter.Scope} Current scope.
 */


Interpreter.prototype.getScope = function () {
  var scope = this.stateStack[this.stateStack.length - 1].scope;

  if (!scope) {
    throw Error('No scope found.');
  }

  return scope;
};
/**
 * Create a new scope dictionary.
 * @param {!Object} node AST node defining the scope container
 *     (e.g. a function).
 * @param {Interpreter.Scope} parentScope Scope to link to.
 * @return {!Interpreter.Scope} New scope.
 */


Interpreter.prototype.createScope = function (node, parentScope) {
  // Determine if this scope starts with `use strict`.
  var strict = false;

  if (parentScope && parentScope.strict) {
    strict = true;
  } else {
    var firstNode = node['body'] && node['body'][0];

    if (firstNode && firstNode.expression && firstNode.expression['type'] === 'Literal' && firstNode.expression.value === 'use strict') {
      strict = true;
    }
  }

  var object = this.createObjectProto(null);
  var scope = new Interpreter.Scope(parentScope, strict, object);

  if (!parentScope) {
    this.initGlobal(scope.object);
  }

  this.populateScope_(node, scope);
  return scope;
};
/**
 * Create a new special scope dictionary. Similar to createScope(), but
 * doesn't assume that the scope is for a function body.
 * This is used for 'catch' clauses and 'with' statements.
 * @param {!Interpreter.Scope} parentScope Scope to link to.
 * @param {Interpreter.Object=} opt_object Optional object to transform into
 *     scope.
 * @return {!Interpreter.Scope} New scope.
 */


Interpreter.prototype.createSpecialScope = function (parentScope, opt_object) {
  if (!parentScope) {
    throw Error('parentScope required');
  }

  var object = opt_object || this.createObjectProto(null);
  return new Interpreter.Scope(parentScope, parentScope.strict, object);
};
/**
 * Retrieves a value from the scope chain.
 * @param {string} name Name of variable.
 * @return {Interpreter.Value} Any value.
 *   May be flagged as being a getter and thus needing immediate execution
 *   (rather than being the value of the property).
 */


Interpreter.prototype.getValueFromScope = function (name) {
  var scope = this.getScope();

  while (scope && scope !== this.globalScope) {
    if (name in scope.object.properties) {
      return scope.object.properties[name];
    }

    scope = scope.parentScope;
  } // The root scope is also an object which has inherited properties and
  // could also have getters.


  if (scope === this.globalScope && this.hasProperty(scope.object, name)) {
    return this.getProperty(scope.object, name);
  } // Typeof operator is unique: it can safely look at non-defined variables.


  var prevNode = this.stateStack[this.stateStack.length - 1].node;

  if (prevNode['type'] === 'UnaryExpression' && prevNode['operator'] === 'typeof') {
    return undefined;
  }

  this.throwException(this.REFERENCE_ERROR, name + ' is not defined');
};
/**
 * Sets a value to the current scope.
 * @param {string} name Name of variable.
 * @param {Interpreter.Value} value Value.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */


Interpreter.prototype.setValueToScope = function (name, value) {
  var scope = this.getScope();
  var strict = scope.strict;

  while (scope && scope !== this.globalScope) {
    if (name in scope.object.properties) {
      scope.object.properties[name] = value;
      return undefined;
    }

    scope = scope.parentScope;
  } // The root scope is also an object which has readonly properties and
  // could also have setters.


  if (scope === this.globalScope && (!strict || this.hasProperty(scope.object, name))) {
    return this.setProperty(scope.object, name, value);
  }

  this.throwException(this.REFERENCE_ERROR, name + ' is not defined');
};
/**
 * Create a new scope for the given node.
 * @param {!Object} node AST node (program or function).
 * @param {!Interpreter.Scope} scope Scope dictionary to populate.
 * @private
 */


Interpreter.prototype.populateScope_ = function (node, scope) {
  if (node['type'] === 'VariableDeclaration') {
    for (var i = 0; i < node['declarations'].length; i++) {
      this.setProperty(scope.object, node['declarations'][i]['id']['name'], undefined, Interpreter.VARIABLE_DESCRIPTOR);
    }
  } else if (node['type'] === 'FunctionDeclaration') {
    this.setProperty(scope.object, node['id']['name'], this.createFunction(node, scope), Interpreter.VARIABLE_DESCRIPTOR);
    return; // Do not recurse into function.
  } else if (node['type'] === 'FunctionExpression') {
    return; // Do not recurse into function.
  } else if (node['type'] === 'ExpressionStatement') {
    return; // Expressions can't contain variable/function declarations.
  }

  var nodeClass = node['constructor'];

  for (var name in node) {
    var prop = node[name];

    if (prop && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(prop) === 'object') {
      if (Array.isArray(prop)) {
        for (var i = 0; i < prop.length; i++) {
          if (prop[i] && prop[i].constructor === nodeClass) {
            this.populateScope_(prop[i], scope);
          }
        }
      } else {
        if (prop.constructor === nodeClass) {
          this.populateScope_(prop, scope);
        }
      }
    }
  }
};
/**
 * Is the current state directly being called with as a construction with 'new'.
 * @return {boolean} True if 'new foo()', false if 'foo()'.
 */


Interpreter.prototype.calledWithNew = function () {
  return this.stateStack[this.stateStack.length - 1].isConstructor;
};
/**
 * Gets a value from the scope chain or from an object property.
 * @param {!Array} ref Name of variable or object/propname tuple.
 * @return {Interpreter.Value} Any value.
 *   May be flagged as being a getter and thus needing immediate execution
 *   (rather than being the value of the property).
 */


Interpreter.prototype.getValue = function (ref) {
  if (ref[0] === Interpreter.SCOPE_REFERENCE) {
    // A null/varname variable lookup.
    return this.getValueFromScope(ref[1]);
  } else {
    // An obj/prop components tuple (foo.bar).
    return this.getProperty(ref[0], ref[1]);
  }
};
/**
 * Sets a value to the scope chain or to an object property.
 * @param {!Array} ref Name of variable or object/propname tuple.
 * @param {Interpreter.Value} value Value.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */


Interpreter.prototype.setValue = function (ref, value) {
  if (ref[0] === Interpreter.SCOPE_REFERENCE) {
    // A null/varname variable lookup.
    return this.setValueToScope(ref[1], value);
  } else {
    // An obj/prop components tuple (foo.bar).
    return this.setProperty(ref[0], ref[1], value);
  }
};
/**
 * Throw an exception in the interpreter that can be handled by an
 * interpreter try/catch statement.  If unhandled, a real exception will
 * be thrown.  Can be called with either an error class and a message, or
 * with an actual object to be thrown.
 * @param {!Interpreter.Object|Interpreter.Value} errorClass Type of error
 *   (if message is provided) or the value to throw (if no message).
 * @param {string=} opt_message Message being thrown.
 */


Interpreter.prototype.throwException = function (errorClass, opt_message) {
  if (opt_message === undefined) {
    var error = errorClass; // This is a value to throw, not an error class.
  } else {
    var error = this.createObject(errorClass);
    this.setProperty(error, 'message', opt_message, Interpreter.NONENUMERABLE_DESCRIPTOR);
  }

  this.unwind(Interpreter.Completion.THROW, error, undefined); // Abort anything related to the current step.

  throw Interpreter.STEP_ERROR;
};
/**
 * Unwind the stack to the innermost relevant enclosing TryStatement,
 * For/ForIn/WhileStatement or Call/NewExpression.  If this results in
 * the stack being completely unwound the thread will be terminated
 * and the appropriate error being thrown.
 * @param {Interpreter.Completion} type Completion type.
 * @param {Interpreter.Value} value Value computed, returned or thrown.
 * @param {string|undefined} label Target label for break or return.
 */


Interpreter.prototype.unwind = function (type, value, label) {
  if (type === Interpreter.Completion.NORMAL) {
    throw TypeError('Should not unwind for NORMAL completions');
  }

  loop: for (var stack = this.stateStack; stack.length > 0; stack.pop()) {
    var state = stack[stack.length - 1];

    switch (state.node['type']) {
      case 'TryStatement':
        state.cv = {
          type: type,
          value: value,
          label: label
        };
        return;

      case 'CallExpression':
      case 'NewExpression':
        if (type === Interpreter.Completion.RETURN) {
          state.value = value;
          return;
        } else if (type !== Interpreter.Completion.THROW) {
          throw Error('Unsynatctic break/continue not rejected by Acorn');
        }

        break;

      case 'Program':
        // Don't pop the stateStack.
        // Leave the root scope on the tree in case the program is appended to.
        state.done = true;
        break loop;
    }

    if (type === Interpreter.Completion.BREAK) {
      if (label ? state.labels && state.labels.indexOf(label) !== -1 : state.isLoop || state.isSwitch) {
        stack.pop();
        return;
      }
    } else if (type === Interpreter.Completion.CONTINUE) {
      if (label ? state.labels && state.labels.indexOf(label) !== -1 : state.isLoop) {
        return;
      }
    }
  } // Unhandled completion.  Throw a real error.


  var realError;

  if (this.isa(value, this.ERROR)) {
    var errorTable = {
      'EvalError': EvalError,
      'RangeError': RangeError,
      'ReferenceError': ReferenceError,
      'SyntaxError': SyntaxError,
      'TypeError': TypeError,
      'URIError': URIError
    };
    var name = String(this.getProperty(value, 'name'));
    var message = this.getProperty(value, 'message').valueOf();
    var errorConstructor = errorTable[name] || Error;
    realError = errorConstructor(message);
  } else {
    realError = String(value);
  }

  throw realError;
};
/**
 * Create a call to a getter function.
 * @param {!Interpreter.Object} func Function to execute.
 * @param {!Interpreter.Object|!Array} left
 *     Name of variable or object/propname tuple.
 * @private
 */


Interpreter.prototype.createGetter_ = function (func, left) {
  if (!this.getterStep_) {
    throw Error('Unexpected call to createGetter');
  } // Clear the getter flag.


  this.getterStep_ = false; // Normally `this` will be specified as the object component (o.x).
  // Sometimes `this` is explicitly provided (o).

  var funcThis = Array.isArray(left) ? left[0] : left;
  var node = new this.nodeConstructor({
    options: {}
  });
  node['type'] = 'CallExpression';
  var state = new Interpreter.State(node, this.stateStack[this.stateStack.length - 1].scope);
  state.doneCallee_ = true;
  state.funcThis_ = funcThis;
  state.func_ = func;
  state.doneArgs_ = true;
  state.arguments_ = [];
  return state;
};
/**
 * Create a call to a setter function.
 * @param {!Interpreter.Object} func Function to execute.
 * @param {!Interpreter.Object|!Array} left
 *     Name of variable or object/propname tuple.
 * @param {Interpreter.Value} value Value to set.
 * @private
 */


Interpreter.prototype.createSetter_ = function (func, left, value) {
  if (!this.setterStep_) {
    throw Error('Unexpected call to createSetter');
  } // Clear the setter flag.


  this.setterStep_ = false; // Normally `this` will be specified as the object component (o.x).
  // Sometimes `this` is implicitly the global object (x).

  var funcThis = Array.isArray(left) ? left[0] : this.globalObject;
  var node = new this.nodeConstructor({
    options: {}
  });
  node['type'] = 'CallExpression';
  var state = new Interpreter.State(node, this.stateStack[this.stateStack.length - 1].scope);
  state.doneCallee_ = true;
  state.funcThis_ = funcThis;
  state.func_ = func;
  state.doneArgs_ = true;
  state.arguments_ = [value];
  return state;
};
/**
 * Typedef for JS values.
 * @typedef {!Interpreter.Object|boolean|number|string|undefined|null}
 */


Interpreter.Value;
/**
 * Class for a state.
 * @param {!Object} node AST node for the state.
 * @param {!Interpreter.Scope} scope Scope object for the state.
 * @constructor
 */

Interpreter.State = function (node, scope) {
  this.node = node;
  this.scope = scope;
};
/**
 * Class for a scope.
 * @param {Interpreter.Scope} parentScope Parent scope.
 * @param {boolean} strict True if "use strict".
 * @param {!Interpreter.Object} object Object containing scope's variables.
 * @struct
 * @constructor
 */


Interpreter.Scope = function (parentScope, strict, object) {
  this.parentScope = parentScope;
  this.strict = strict;
  this.object = object;
};
/**
 * Class for an object.
 * @param {Interpreter.Object} proto Prototype object or null.
 * @constructor
 */


Interpreter.Object = function (proto) {
  this.getter = Object.create(null);
  this.setter = Object.create(null);
  this.properties = Object.create(null);
  this.proto = proto;
};
/** @type {Interpreter.Object} */


Interpreter.Object.prototype.proto = null;
/** @type {string} */

Interpreter.Object.prototype["class"] = 'Object';
/** @type {Date|RegExp|boolean|number|string|null} */

Interpreter.Object.prototype.data = null;
/**
 * Convert this object into a string.
 * @return {string} String value.
 * @override
 */

Interpreter.Object.prototype.toString = function () {
  if (!(this instanceof Interpreter.Object)) {
    // Primitive value.
    return String(this);
  }

  if (this["class"] === 'Array') {
    // Array contents must not have cycles.
    var cycles = Interpreter.toStringCycles_;
    cycles.push(this);

    try {
      var strs = [];

      for (var i = 0; i < this.properties.length; i++) {
        var value = this.properties[i];
        strs[i] = value instanceof Interpreter.Object && cycles.indexOf(value) !== -1 ? '...' : value;
      }
    } finally {
      cycles.pop();
    }

    return strs.join(',');
  }

  if (this["class"] === 'Error') {
    // Error name and message properties must not have cycles.
    var cycles = Interpreter.toStringCycles_;

    if (cycles.indexOf(this) !== -1) {
      return '[object Error]';
    }

    var name, message; // Bug: Does not support getters and setters for name or message.

    var obj = this;

    do {
      if ('name' in obj.properties) {
        name = obj.properties['name'];
        break;
      }
    } while (obj = obj.proto);

    var obj = this;

    do {
      if ('message' in obj.properties) {
        message = obj.properties['message'];
        break;
      }
    } while (obj = obj.proto);

    cycles.push(this);

    try {
      name = name && String(name);
      message = message && String(message);
    } finally {
      cycles.pop();
    }

    return message ? name + ': ' + message : String(name);
  }

  if (this.data !== null) {
    // RegExp, Date, and boxed primitives.
    return String(this.data);
  }

  return '[object ' + this["class"] + ']';
};
/**
 * Return the object's value.
 * @return {Interpreter.Value} Value.
 * @override
 */


Interpreter.Object.prototype.valueOf = function () {
  if (this.data === undefined || this.data === null || this.data instanceof RegExp) {
    return this; // An Object, RegExp, or primitive.
  }

  if (this.data instanceof Date) {
    return this.data.valueOf(); // Milliseconds.
  }

  return (
    /** @type {(boolean|number|string)} */
    this.data
  ); // Boxed primitive.
}; ///////////////////////////////////////////////////////////////////////////////
// Functions to handle each node type.
///////////////////////////////////////////////////////////////////////////////


Interpreter.prototype['stepArrayExpression'] = function (stack, state, node) {
  var elements = node['elements'];
  var n = state.n_ || 0;

  if (!state.array_) {
    state.array_ = this.createArray();
    state.array_.properties.length = elements.length;
  } else {
    this.setProperty(state.array_, n, state.value);
    n++;
  }

  while (n < elements.length) {
    // Skip missing elements - they're not defined, not undefined.
    if (elements[n]) {
      state.n_ = n;
      return new Interpreter.State(elements[n], state.scope);
    }

    n++;
  }

  stack.pop();
  stack[stack.length - 1].value = state.array_;
};

Interpreter.prototype['stepAssignmentExpression'] = function (stack, state, node) {
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    var nextState = new Interpreter.State(node['left'], state.scope);
    nextState.components = true;
    return nextState;
  }

  if (!state.doneRight_) {
    if (!state.leftReference_) {
      state.leftReference_ = state.value;
    }

    if (state.doneGetter_) {
      state.leftValue_ = state.value;
    }

    if (!state.doneGetter_ && node['operator'] !== '=') {
      var leftValue = this.getValue(state.leftReference_);
      state.leftValue_ = leftValue;

      if (this.getterStep_) {
        // Call the getter function.
        state.doneGetter_ = true;
        var func =
        /** @type {!Interpreter.Object} */
        leftValue;
        return this.createGetter_(func, state.leftReference_);
      }
    }

    state.doneRight_ = true;
    return new Interpreter.State(node['right'], state.scope);
  }

  if (state.doneSetter_) {
    // Return if setter function.
    // Setter method on property has completed.
    // Ignore its return value, and use the original set value instead.
    stack.pop();
    stack[stack.length - 1].value = state.setterValue_;
    return;
  }

  var value = state.leftValue_;
  var rightValue = state.value;

  switch (node['operator']) {
    case '=':
      value = rightValue;
      break;

    case '+=':
      value += rightValue;
      break;

    case '-=':
      value -= rightValue;
      break;

    case '*=':
      value *= rightValue;
      break;

    case '/=':
      value /= rightValue;
      break;

    case '%=':
      value %= rightValue;
      break;

    case '<<=':
      value <<= rightValue;
      break;

    case '>>=':
      value >>= rightValue;
      break;

    case '>>>=':
      value >>>= rightValue;
      break;

    case '&=':
      value &= rightValue;
      break;

    case '^=':
      value ^= rightValue;
      break;

    case '|=':
      value |= rightValue;
      break;

    default:
      throw SyntaxError('Unknown assignment expression: ' + node['operator']);
  }

  var setter = this.setValue(state.leftReference_, value);

  if (setter) {
    state.doneSetter_ = true;
    state.setterValue_ = value;
    return this.createSetter_(setter, state.leftReference_, value);
  } // Return if no setter function.


  stack.pop();
  stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepBinaryExpression'] = function (stack, state, node) {
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    return new Interpreter.State(node['left'], state.scope);
  }

  if (!state.doneRight_) {
    state.doneRight_ = true;
    state.leftValue_ = state.value;
    return new Interpreter.State(node['right'], state.scope);
  }

  stack.pop();
  var leftValue = state.leftValue_;
  var rightValue = state.value;
  var value;

  switch (node['operator']) {
    case '==':
      value = leftValue == rightValue;
      break;

    case '!=':
      value = leftValue != rightValue;
      break;

    case '===':
      value = leftValue === rightValue;
      break;

    case '!==':
      value = leftValue !== rightValue;
      break;

    case '>':
      value = leftValue > rightValue;
      break;

    case '>=':
      value = leftValue >= rightValue;
      break;

    case '<':
      value = leftValue < rightValue;
      break;

    case '<=':
      value = leftValue <= rightValue;
      break;

    case '+':
      value = leftValue + rightValue;
      break;

    case '-':
      value = leftValue - rightValue;
      break;

    case '*':
      value = leftValue * rightValue;
      break;

    case '/':
      value = leftValue / rightValue;
      break;

    case '%':
      value = leftValue % rightValue;
      break;

    case '&':
      value = leftValue & rightValue;
      break;

    case '|':
      value = leftValue | rightValue;
      break;

    case '^':
      value = leftValue ^ rightValue;
      break;

    case '<<':
      value = leftValue << rightValue;
      break;

    case '>>':
      value = leftValue >> rightValue;
      break;

    case '>>>':
      value = leftValue >>> rightValue;
      break;

    case 'in':
      if (!(rightValue instanceof Interpreter.Object)) {
        this.throwException(this.TYPE_ERROR, "'in' expects an object, not '" + rightValue + "'");
      }

      value = this.hasProperty(rightValue, leftValue);
      break;

    case 'instanceof':
      if (!this.isa(rightValue, this.FUNCTION)) {
        this.throwException(this.TYPE_ERROR, 'Right-hand side of instanceof is not an object');
      }

      value = leftValue instanceof Interpreter.Object ? this.isa(leftValue, rightValue) : false;
      break;

    default:
      throw SyntaxError('Unknown binary operator: ' + node['operator']);
  }

  stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepBlockStatement'] = function (stack, state, node) {
  var n = state.n_ || 0;
  var expression = node['body'][n];

  if (expression) {
    state.n_ = n + 1;
    return new Interpreter.State(expression, state.scope);
  }

  stack.pop();
};

Interpreter.prototype['stepBreakStatement'] = function (stack, state, node) {
  var label = node['label'] && node['label']['name'];
  this.unwind(Interpreter.Completion.BREAK, undefined, label);
};

Interpreter.prototype['stepCallExpression'] = function (stack, state, node) {
  if (!state.doneCallee_) {
    state.doneCallee_ = 1; // Components needed to determine value of `this`.

    var nextState = new Interpreter.State(node['callee'], state.scope);
    nextState.components = true;
    return nextState;
  }

  if (state.doneCallee_ === 1) {
    // Determine value of the function.
    state.doneCallee_ = 2;
    var func = state.value;

    if (Array.isArray(func)) {
      state.func_ = this.getValue(func);

      if (func[0] === Interpreter.SCOPE_REFERENCE) {
        // (Globally or locally) named function.  Is it named 'eval'?
        state.directEval_ = func[1] === 'eval';
      } else {
        // Method function, `this` is object (ignored if invoked as `new`).
        state.funcThis_ = func[0];
      }

      func = state.func_;

      if (this.getterStep_) {
        // Call the getter function.
        state.doneCallee_ = 1;
        return this.createGetter_(
        /** @type {!Interpreter.Object} */
        func, state.value);
      }
    } else {
      // Already evaluated function: (function(){...})();
      state.func_ = func;
    }

    state.arguments_ = [];
    state.n_ = 0;
  }

  var func = state.func_;

  if (!state.doneArgs_) {
    if (state.n_ !== 0) {
      state.arguments_.push(state.value);
    }

    if (node['arguments'][state.n_]) {
      return new Interpreter.State(node['arguments'][state.n_++], state.scope);
    } // Determine value of `this` in function.


    if (node['type'] === 'NewExpression') {
      if (func.illegalConstructor) {
        // Illegal: new escape();
        this.throwException(this.TYPE_ERROR, func + ' is not a constructor');
      } // Constructor, `this` is new object.


      if (func === this.ARRAY) {
        state.funcThis_ = this.createArray();
      } else {
        var proto = func.properties['prototype'];

        if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(proto) !== 'object' || proto === null) {
          // Non-object prototypes default to `Object.prototype`.
          proto = this.OBJECT_PROTO;
        }

        state.funcThis_ = this.createObjectProto(proto);
      }

      state.isConstructor = true;
    } else if (state.funcThis_ === undefined) {
      // Global function, `this` is global object (or `undefined` if strict).
      state.funcThis_ = state.scope.strict ? undefined : this.globalObject;
    }

    state.doneArgs_ = true;
  }

  if (!state.doneExec_) {
    state.doneExec_ = true;

    if (!(func instanceof Interpreter.Object)) {
      this.throwException(this.TYPE_ERROR, func + ' is not a function');
    }

    var funcNode = func.node;

    if (funcNode) {
      var scope = this.createScope(funcNode['body'], func.parentScope); // Add all arguments.

      for (var i = 0; i < funcNode['params'].length; i++) {
        var paramName = funcNode['params'][i]['name'];
        var paramValue = state.arguments_.length > i ? state.arguments_[i] : undefined;
        this.setProperty(scope.object, paramName, paramValue);
      } // Build arguments variable.


      var argsList = this.createArray();

      for (var i = 0; i < state.arguments_.length; i++) {
        this.setProperty(argsList, i, state.arguments_[i]);
      }

      this.setProperty(scope.object, 'arguments', argsList); // Add the function's name (var x = function foo(){};)

      var name = funcNode['id'] && funcNode['id']['name'];

      if (name) {
        this.setProperty(scope.object, name, func);
      }

      this.setProperty(scope.object, 'this', state.funcThis_, Interpreter.READONLY_DESCRIPTOR);
      state.value = undefined; // Default value if no explicit return.

      return new Interpreter.State(funcNode['body'], scope);
    } else if (func.eval) {
      var code = state.arguments_[0];

      if (typeof code !== 'string') {
        // JS does not parse String objects:
        // eval(new String('1 + 1')) -> '1 + 1'
        state.value = code;
      } else {
        try {
          var ast = acorn.parse(String(code), Interpreter.PARSE_OPTIONS);
        } catch (e) {
          // Acorn threw a SyntaxError.  Rethrow as a trappable error.
          this.throwException(this.SYNTAX_ERROR, 'Invalid code: ' + e.message);
        }

        var evalNode = new this.nodeConstructor({
          options: {}
        });
        evalNode['type'] = 'EvalProgram_';
        evalNode['body'] = ast['body'];
        Interpreter.stripLocations_(evalNode, node['start'], node['end']); // Create new scope and update it with definitions in eval().

        var scope = state.directEval_ ? state.scope : this.globalScope;

        if (scope.strict) {
          // Strict mode get its own scope in eval.
          scope = this.createScope(ast, scope);
        } else {
          // Non-strict mode pollutes the current scope.
          this.populateScope_(ast, scope);
        }

        this.value = undefined; // Default value if no code.

        return new Interpreter.State(evalNode, scope);
      }
    } else if (func.nativeFunc) {
      state.value = func.nativeFunc.apply(state.funcThis_, state.arguments_);
    } else if (func.asyncFunc) {
      var thisInterpreter = this;

      var callback = function callback(value) {
        state.value = value;
        thisInterpreter.paused_ = false;
      }; // Force the argument lengths to match, then append the callback.


      var argLength = func.asyncFunc.length - 1;
      var argsWithCallback = state.arguments_.concat(new Array(argLength)).slice(0, argLength);
      argsWithCallback.push(callback);
      this.paused_ = true;
      func.asyncFunc.apply(state.funcThis_, argsWithCallback);
      return;
    } else {
      /* A child of a function is a function but is not callable.  For example:
      var F = function() {};
      F.prototype = escape;
      var f = new F();
      f();
      */
      this.throwException(this.TYPE_ERROR, func["class"] + ' is not callable');
    }
  } else {
    // Execution complete.  Put the return value on the stack.
    stack.pop();

    if (state.isConstructor && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(state.value) !== 'object') {
      // Normal case for a constructor is to use the `this` value.
      stack[stack.length - 1].value = state.funcThis_;
    } else {
      // Non-constructors or constructions explicitly returning objects use
      // the return value.
      stack[stack.length - 1].value = state.value;
    }
  }
};

Interpreter.prototype['stepCatchClause'] = function (stack, state, node) {
  if (!state.done_) {
    state.done_ = true; // Create an empty scope.

    var scope = this.createSpecialScope(state.scope); // Add the argument.

    this.setProperty(scope.object, node['param']['name'], state.throwValue); // Execute catch clause.

    return new Interpreter.State(node['body'], scope);
  } else {
    stack.pop();
  }
};

Interpreter.prototype['stepConditionalExpression'] = function (stack, state, node) {
  var mode = state.mode_ || 0;

  if (mode === 0) {
    state.mode_ = 1;
    return new Interpreter.State(node['test'], state.scope);
  }

  if (mode === 1) {
    state.mode_ = 2;
    var value = Boolean(state.value);

    if (value && node['consequent']) {
      // Execute `if` block.
      return new Interpreter.State(node['consequent'], state.scope);
    } else if (!value && node['alternate']) {
      // Execute `else` block.
      return new Interpreter.State(node['alternate'], state.scope);
    } // eval('1;if(false){2}') -> undefined


    this.value = undefined;
  }

  stack.pop();

  if (node['type'] === 'ConditionalExpression') {
    stack[stack.length - 1].value = state.value;
  }
};

Interpreter.prototype['stepContinueStatement'] = function (stack, state, node) {
  var label = node['label'] && node['label']['name'];
  this.unwind(Interpreter.Completion.CONTINUE, undefined, label);
};

Interpreter.prototype['stepDebuggerStatement'] = function (stack, state, node) {
  // Do nothing.  May be overridden by developers.
  stack.pop();
};

Interpreter.prototype['stepDoWhileStatement'] = function (stack, state, node) {
  if (node['type'] === 'DoWhileStatement' && state.test_ === undefined) {
    // First iteration of do/while executes without checking test.
    state.value = true;
    state.test_ = true;
  }

  if (!state.test_) {
    state.test_ = true;
    return new Interpreter.State(node['test'], state.scope);
  }

  if (!state.value) {
    // Done, exit loop.
    stack.pop();
  } else if (node['body']) {
    // Execute the body.
    state.test_ = false;
    state.isLoop = true;
    return new Interpreter.State(node['body'], state.scope);
  }
};

Interpreter.prototype['stepEmptyStatement'] = function (stack, state, node) {
  stack.pop();
};

Interpreter.prototype['stepEvalProgram_'] = function (stack, state, node) {
  var n = state.n_ || 0;
  var expression = node['body'][n];

  if (expression) {
    state.n_ = n + 1;
    return new Interpreter.State(expression, state.scope);
  }

  stack.pop();
  stack[stack.length - 1].value = this.value;
};

Interpreter.prototype['stepExpressionStatement'] = function (stack, state, node) {
  if (!state.done_) {
    state.done_ = true;
    return new Interpreter.State(node['expression'], state.scope);
  }

  stack.pop(); // Save this value to interpreter.value for use as a return value if
  // this code is inside an eval function.

  this.value = state.value;
};

Interpreter.prototype['stepForInStatement'] = function (stack, state, node) {
  // First, initialize a variable if exists.  Only do so once, ever.
  if (!state.doneInit_) {
    state.doneInit_ = true;

    if (node['left']['declarations'] && node['left']['declarations'][0]['init']) {
      if (state.scope.strict) {
        this.throwException(this.SYNTAX_ERROR, 'for-in loop variable declaration may not have an initializer.');
      } // Variable initialization: for (var x = 4 in y)


      return new Interpreter.State(node['left'], state.scope);
    }
  } // Second, look up the object.  Only do so once, ever.


  if (!state.doneObject_) {
    state.doneObject_ = true;

    if (!state.variable_) {
      state.variable_ = state.value;
    }

    return new Interpreter.State(node['right'], state.scope);
  }

  if (!state.isLoop) {
    // First iteration.
    state.isLoop = true;
    state.object_ = state.value;
    state.visited_ = Object.create(null);
  } // Third, find the property name for this iteration.


  if (state.name_ === undefined) {
    gotPropName: while (true) {
      if (state.object_ instanceof Interpreter.Object) {
        if (!state.props_) {
          state.props_ = Object.getOwnPropertyNames(state.object_.properties);
        }

        while (true) {
          var prop = state.props_.shift();

          if (prop === undefined) {
            break; // Reached end of this object's properties.
          }

          if (!Object.prototype.hasOwnProperty.call(state.object_.properties, prop)) {
            continue; // Property has been deleted in the loop.
          }

          if (state.visited_[prop]) {
            continue; // Already seen this property on a child.
          }

          state.visited_[prop] = true;

          if (!Object.prototype.propertyIsEnumerable.call(state.object_.properties, prop)) {
            continue; // Skip non-enumerable property.
          }

          state.name_ = prop;
          break gotPropName;
        }
      } else if (state.object_ !== null && state.object_ !== undefined) {
        // Primitive value (other than null or undefined).
        if (!state.props_) {
          state.props_ = Object.getOwnPropertyNames(state.object_);
        }

        while (true) {
          var prop = state.props_.shift();

          if (prop === undefined) {
            break; // Reached end of this value's properties.
          }

          state.visited_[prop] = true;

          if (!Object.prototype.propertyIsEnumerable.call(state.object_, prop)) {
            continue; // Skip non-enumerable property.
          }

          state.name_ = prop;
          break gotPropName;
        }
      }

      state.object_ = this.getPrototype(state.object_);
      state.props_ = null;

      if (state.object_ === null) {
        // Done, exit loop.
        stack.pop();
        return;
      }
    }
  } // Fourth, find the variable


  if (!state.doneVariable_) {
    state.doneVariable_ = true;
    var left = node['left'];

    if (left['type'] === 'VariableDeclaration') {
      // Inline variable declaration: for (var x in y)
      state.variable_ = [Interpreter.SCOPE_REFERENCE, left['declarations'][0]['id']['name']];
    } else {
      // Arbitrary left side: for (foo().bar in y)
      state.variable_ = null;
      var nextState = new Interpreter.State(left, state.scope);
      nextState.components = true;
      return nextState;
    }
  }

  if (!state.variable_) {
    state.variable_ = state.value;
  } // Fifth, set the variable.


  if (!state.doneSetter_) {
    state.doneSetter_ = true;
    var value = state.name_;
    var setter = this.setValue(state.variable_, value);

    if (setter) {
      return this.createSetter_(setter, state.variable_, value);
    }
  } // Next step will be step three.


  state.name_ = undefined; // Reevaluate the variable since it could be a setter on the global object.

  state.doneVariable_ = false;
  state.doneSetter_ = false; // Sixth and finally, execute the body if there was one.  this.

  if (node['body']) {
    return new Interpreter.State(node['body'], state.scope);
  }
};

Interpreter.prototype['stepForStatement'] = function (stack, state, node) {
  var mode = state.mode_ || 0;

  if (mode === 0) {
    state.mode_ = 1;

    if (node['init']) {
      return new Interpreter.State(node['init'], state.scope);
    }
  } else if (mode === 1) {
    state.mode_ = 2;

    if (node['test']) {
      return new Interpreter.State(node['test'], state.scope);
    }
  } else if (mode === 2) {
    state.mode_ = 3;

    if (node['test'] && !state.value) {
      // Done, exit loop.
      stack.pop();
    } else {
      // Execute the body.
      state.isLoop = true;
      return new Interpreter.State(node['body'], state.scope);
    }
  } else if (mode === 3) {
    state.mode_ = 1;

    if (node['update']) {
      return new Interpreter.State(node['update'], state.scope);
    }
  }
};

Interpreter.prototype['stepFunctionDeclaration'] = function (stack, state, node) {
  // This was found and handled when the scope was populated.
  stack.pop();
};

Interpreter.prototype['stepFunctionExpression'] = function (stack, state, node) {
  stack.pop();
  stack[stack.length - 1].value = this.createFunction(node, state.scope);
};

Interpreter.prototype['stepIdentifier'] = function (stack, state, node) {
  stack.pop();

  if (state.components) {
    stack[stack.length - 1].value = [Interpreter.SCOPE_REFERENCE, node['name']];
    return;
  }

  var value = this.getValueFromScope(node['name']); // An identifier could be a getter if it's a property on the global object.

  if (this.getterStep_) {
    // Call the getter function.
    var scope = state.scope;

    while (!this.hasProperty(scope, node['name'])) {
      scope = scope.parentScope;
    }

    var func =
    /** @type {!Interpreter.Object} */
    value;
    return this.createGetter_(func, this.globalObject);
  }

  stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepIfStatement'] = Interpreter.prototype['stepConditionalExpression'];

Interpreter.prototype['stepLabeledStatement'] = function (stack, state, node) {
  // No need to hit this node again on the way back up the stack.
  stack.pop(); // Note that a statement might have multiple labels.

  var labels = state.labels || [];
  labels.push(node['label']['name']);
  var nextState = new Interpreter.State(node['body'], state.scope);
  nextState.labels = labels;
  return nextState;
};

Interpreter.prototype['stepLiteral'] = function (stack, state, node) {
  stack.pop();
  var value = node['value'];

  if (value instanceof RegExp) {
    var pseudoRegexp = this.createObjectProto(this.REGEXP_PROTO);
    this.populateRegExp(pseudoRegexp, value);
    value = pseudoRegexp;
  }

  stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepLogicalExpression'] = function (stack, state, node) {
  if (node['operator'] !== '&&' && node['operator'] !== '||') {
    throw SyntaxError('Unknown logical operator: ' + node['operator']);
  }

  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    return new Interpreter.State(node['left'], state.scope);
  }

  if (!state.doneRight_) {
    if (node['operator'] === '&&' && !state.value || node['operator'] === '||' && state.value) {
      // Shortcut evaluation.
      stack.pop();
      stack[stack.length - 1].value = state.value;
    } else {
      state.doneRight_ = true;
      return new Interpreter.State(node['right'], state.scope);
    }
  } else {
    stack.pop();
    stack[stack.length - 1].value = state.value;
  }
};

Interpreter.prototype['stepMemberExpression'] = function (stack, state, node) {
  if (!state.doneObject_) {
    state.doneObject_ = true;
    return new Interpreter.State(node['object'], state.scope);
  }

  var propName;

  if (!node['computed']) {
    state.object_ = state.value; // obj.foo -- Just access `foo` directly.

    propName = node['property']['name'];
  } else if (!state.doneProperty_) {
    state.object_ = state.value; // obj[foo] -- Compute value of `foo`.

    state.doneProperty_ = true;
    return new Interpreter.State(node['property'], state.scope);
  } else {
    propName = state.value;
  }

  stack.pop();

  if (state.components) {
    stack[stack.length - 1].value = [state.object_, propName];
  } else {
    var value = this.getProperty(state.object_, propName);

    if (this.getterStep_) {
      // Call the getter function.
      var func =
      /** @type {!Interpreter.Object} */
      value;
      return this.createGetter_(func, state.object_);
    }

    stack[stack.length - 1].value = value;
  }
};

Interpreter.prototype['stepNewExpression'] = Interpreter.prototype['stepCallExpression'];

Interpreter.prototype['stepObjectExpression'] = function (stack, state, node) {
  var n = state.n_ || 0;
  var property = node['properties'][n];

  if (!state.object_) {
    // First execution.
    state.object_ = this.createObjectProto(this.OBJECT_PROTO);
    state.properties_ = Object.create(null);
  } else {
    // Determine property name.
    var key = property['key'];

    if (key['type'] === 'Identifier') {
      var propName = key['name'];
    } else if (key['type'] === 'Literal') {
      var propName = key['value'];
    } else {
      throw SyntaxError('Unknown object structure: ' + key['type']);
    } // Set the property computed in the previous execution.


    if (!state.properties_[propName]) {
      // Create temp object to collect value, getter, and/or setter.
      state.properties_[propName] = {};
    }

    state.properties_[propName][property['kind']] = state.value;
    state.n_ = ++n;
    property = node['properties'][n];
  }

  if (property) {
    return new Interpreter.State(property['value'], state.scope);
  }

  for (var key in state.properties_) {
    var kinds = state.properties_[key];

    if ('get' in kinds || 'set' in kinds) {
      // Set a property with a getter or setter.
      var descriptor = {
        configurable: true,
        enumerable: true,
        get: kinds['get'],
        set: kinds['set']
      };
      this.setProperty(state.object_, key, Interpreter.VALUE_IN_DESCRIPTOR, descriptor);
    } else {
      // Set a normal property with a value.
      this.setProperty(state.object_, key, kinds['init']);
    }
  }

  stack.pop();
  stack[stack.length - 1].value = state.object_;
};

Interpreter.prototype['stepProgram'] = function (stack, state, node) {
  var expression = node['body'].shift();

  if (expression) {
    state.done = false;
    return new Interpreter.State(expression, state.scope);
  }

  state.done = true; // Don't pop the stateStack.
  // Leave the root scope on the tree in case the program is appended to.
};

Interpreter.prototype['stepReturnStatement'] = function (stack, state, node) {
  if (node['argument'] && !state.done_) {
    state.done_ = true;
    return new Interpreter.State(node['argument'], state.scope);
  }

  this.unwind(Interpreter.Completion.RETURN, state.value, undefined);
};

Interpreter.prototype['stepSequenceExpression'] = function (stack, state, node) {
  var n = state.n_ || 0;
  var expression = node['expressions'][n];

  if (expression) {
    state.n_ = n + 1;
    return new Interpreter.State(expression, state.scope);
  }

  stack.pop();
  stack[stack.length - 1].value = state.value;
};

Interpreter.prototype['stepSwitchStatement'] = function (stack, state, node) {
  if (!state.test_) {
    state.test_ = 1;
    return new Interpreter.State(node['discriminant'], state.scope);
  }

  if (state.test_ === 1) {
    state.test_ = 2; // Preserve switch value between case tests.

    state.switchValue_ = state.value;
    state.defaultCase_ = -1;
  }

  while (true) {
    var index = state.index_ || 0;
    var switchCase = node['cases'][index];

    if (!state.matched_ && switchCase && !switchCase['test']) {
      // Test on the default case is null.
      // Bypass (but store) the default case, and get back to it later.
      state.defaultCase_ = index;
      state.index_ = index + 1;
      continue;
    }

    if (!switchCase && !state.matched_ && state.defaultCase_ !== -1) {
      // Ran through all cases, no match.  Jump to the default.
      state.matched_ = true;
      state.index_ = state.defaultCase_;
      continue;
    }

    if (switchCase) {
      if (!state.matched_ && !state.tested_ && switchCase['test']) {
        state.tested_ = true;
        return new Interpreter.State(switchCase['test'], state.scope);
      }

      if (state.matched_ || state.value === state.switchValue_) {
        state.matched_ = true;
        var n = state.n_ || 0;

        if (switchCase['consequent'][n]) {
          state.isSwitch = true;
          state.n_ = n + 1;
          return new Interpreter.State(switchCase['consequent'][n], state.scope);
        }
      } // Move on to next case.


      state.tested_ = false;
      state.n_ = 0;
      state.index_ = index + 1;
    } else {
      stack.pop();
      return;
    }
  }
};

Interpreter.prototype['stepThisExpression'] = function (stack, state, node) {
  stack.pop();
  stack[stack.length - 1].value = this.getValueFromScope('this');
};

Interpreter.prototype['stepThrowStatement'] = function (stack, state, node) {
  if (!state.done_) {
    state.done_ = true;
    return new Interpreter.State(node['argument'], state.scope);
  } else {
    this.throwException(state.value);
  }
};

Interpreter.prototype['stepTryStatement'] = function (stack, state, node) {
  if (!state.doneBlock_) {
    state.doneBlock_ = true;
    return new Interpreter.State(node['block'], state.scope);
  }

  if (state.cv && state.cv.type === Interpreter.Completion.THROW && !state.doneHandler_ && node['handler']) {
    state.doneHandler_ = true;
    var nextState = new Interpreter.State(node['handler'], state.scope);
    nextState.throwValue = state.cv.value;
    state.cv = undefined; // This error has been handled, don't rethrow.

    return nextState;
  }

  if (!state.doneFinalizer_ && node['finalizer']) {
    state.doneFinalizer_ = true;
    return new Interpreter.State(node['finalizer'], state.scope);
  }

  stack.pop();

  if (state.cv) {
    // There was no catch handler, or the catch/finally threw an error.
    // Throw the error up to a higher try.
    this.unwind(state.cv.type, state.cv.value, state.cv.label);
  }
};

Interpreter.prototype['stepUnaryExpression'] = function (stack, state, node) {
  if (!state.done_) {
    state.done_ = true;
    var nextState = new Interpreter.State(node['argument'], state.scope);
    nextState.components = node['operator'] === 'delete';
    return nextState;
  }

  stack.pop();
  var value = state.value;

  if (node['operator'] === '-') {
    value = -value;
  } else if (node['operator'] === '+') {
    value = +value;
  } else if (node['operator'] === '!') {
    value = !value;
  } else if (node['operator'] === '~') {
    value = ~value;
  } else if (node['operator'] === 'delete') {
    var result = true; // If value is not an array, then it is a primitive, or some other value.
    // If so, skip the delete and return true.

    if (Array.isArray(value)) {
      var obj = value[0];

      if (obj === Interpreter.SCOPE_REFERENCE) {
        // `delete foo;` is the same as `delete window.foo;`.
        obj = state.scope;
      }

      var name = String(value[1]);

      try {
        delete obj.properties[name];
      } catch (e) {
        if (state.scope.strict) {
          this.throwException(this.TYPE_ERROR, "Cannot delete property '" + name + "' of '" + obj + "'");
        } else {
          result = false;
        }
      }
    }

    value = result;
  } else if (node['operator'] === 'typeof') {
    value = value && value["class"] === 'Function' ? 'function' : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value);
  } else if (node['operator'] === 'void') {
    value = undefined;
  } else {
    throw SyntaxError('Unknown unary operator: ' + node['operator']);
  }

  stack[stack.length - 1].value = value;
};

Interpreter.prototype['stepUpdateExpression'] = function (stack, state, node) {
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    var nextState = new Interpreter.State(node['argument'], state.scope);
    nextState.components = true;
    return nextState;
  }

  if (!state.leftSide_) {
    state.leftSide_ = state.value;
  }

  if (state.doneGetter_) {
    state.leftValue_ = state.value;
  }

  if (!state.doneGetter_) {
    var leftValue = this.getValue(state.leftSide_);
    state.leftValue_ = leftValue;

    if (this.getterStep_) {
      // Call the getter function.
      state.doneGetter_ = true;
      var func =
      /** @type {!Interpreter.Object} */
      leftValue;
      return this.createGetter_(func, state.leftSide_);
    }
  }

  if (state.doneSetter_) {
    // Return if setter function.
    // Setter method on property has completed.
    // Ignore its return value, and use the original set value instead.
    stack.pop();
    stack[stack.length - 1].value = state.setterValue_;
    return;
  }

  var leftValue = Number(state.leftValue_);
  var changeValue;

  if (node['operator'] === '++') {
    changeValue = leftValue + 1;
  } else if (node['operator'] === '--') {
    changeValue = leftValue - 1;
  } else {
    throw SyntaxError('Unknown update expression: ' + node['operator']);
  }

  var returnValue = node['prefix'] ? changeValue : leftValue;
  var setter = this.setValue(state.leftSide_, changeValue);

  if (setter) {
    state.doneSetter_ = true;
    state.setterValue_ = returnValue;
    return this.createSetter_(setter, state.leftSide_, changeValue);
  } // Return if no setter function.


  stack.pop();
  stack[stack.length - 1].value = returnValue;
};

Interpreter.prototype['stepVariableDeclaration'] = function (stack, state, node) {
  var declarations = node['declarations'];
  var n = state.n_ || 0;
  var declarationNode = declarations[n];

  if (state.init_ && declarationNode) {
    // This setValue call never needs to deal with calling a setter function.
    // Note that this is setting the init value, not defining the variable.
    // Variable definition is done when scope is populated.
    this.setValueToScope(declarationNode['id']['name'], state.value);
    state.init_ = false;
    declarationNode = declarations[++n];
  }

  while (declarationNode) {
    // Skip any declarations that are not initialized.  They have already
    // been defined as undefined in populateScope_.
    if (declarationNode['init']) {
      state.n_ = n;
      state.init_ = true;
      return new Interpreter.State(declarationNode['init'], state.scope);
    }

    declarationNode = declarations[++n];
  }

  stack.pop();
};

Interpreter.prototype['stepWithStatement'] = function (stack, state, node) {
  if (!state.doneObject_) {
    state.doneObject_ = true;
    return new Interpreter.State(node['object'], state.scope);
  } else if (!state.doneBody_) {
    state.doneBody_ = true;
    var scope = this.createSpecialScope(state.scope, state.value);
    return new Interpreter.State(node['body'], scope);
  } else {
    stack.pop();
  }
};

Interpreter.prototype['stepWhileStatement'] = Interpreter.prototype['stepDoWhileStatement']; // Preserve top-level API functions from being pruned/renamed by JS compilers.
// Add others as needed.
// The global object (`window` in a browser, `global` in node.js) is `this`.

Interpreter.prototype['step'] = Interpreter.prototype.step;
Interpreter.prototype['run'] = Interpreter.prototype.run;
Interpreter.prototype['appendCode'] = Interpreter.prototype.appendCode;
Interpreter.prototype['createObject'] = Interpreter.prototype.createObject;
Interpreter.prototype['createObjectProto'] = Interpreter.prototype.createObjectProto;
Interpreter.prototype['createAsyncFunction'] = Interpreter.prototype.createAsyncFunction;
Interpreter.prototype['createNativeFunction'] = Interpreter.prototype.createNativeFunction;
Interpreter.prototype['getProperty'] = Interpreter.prototype.getProperty;
Interpreter.prototype['setProperty'] = Interpreter.prototype.setProperty;
Interpreter.prototype['nativeToPseudo'] = Interpreter.prototype.nativeToPseudo;
Interpreter.prototype['pseudoToNative'] = Interpreter.prototype.pseudoToNative;

module.exports = function (code, injection) {
  return new Interpreter(code, injection);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../remix-cli/node_modules/webpack/buildin/harmony-module.js */ "../remix-cli/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/evalute/native.js":
/*!*******************************!*\
  !*** ./src/evalute/native.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

module.exports = function (interpreter, window) {
  interpreter.setProperty(window, 'App', interpreter.createNativeFunction(function (data) {
    App(_objectSpread({}, data.properties, {
      onLaunch: function onLaunch() {
        debugger;
      }
    }));
  }));
  interpreter.setProperty(window, 'Page', interpreter.createNativeFunction(function (data) {
    Page(data);
  }));
  interpreter.setProperty(window, 'console', interpreter.nativeToPseudo(console));
  interpreter.setProperty(window, 'wx', interpreter.nativeToPseudo(wx));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../remix-cli/node_modules/webpack/buildin/harmony-module.js */ "../remix-cli/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/pages/Playground/index.js":
/*!***************************************!*\
  !*** ./src/pages/Playground/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _remix_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @remix/core */ "../remix/index.js");
/* harmony import */ var _remix_core_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @remix/core/hooks */ "../remix/hooks.js");
/* harmony import */ var _evalute__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../evalute */ "./src/evalute/index.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index.css */ "./src/pages/Playground/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_10__);








function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var Playground = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Playground, _Component);

  var _super = _createSuper(Playground);

  function Playground() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Playground);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "state", {
      value: 100
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onTap", function () {
      var value = _this.state.value;

      _this.setState({
        value: value + 100
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Playground, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      return /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", {
        className: "playground"
      }, /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", {
        className: "playground__title"
      }, value), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", {
        className: "playground__ctrl"
      }, /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", {
        className: "playground__ctrl-button playground__parse"
      }, "Parse"), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", {
        className: "playground__ctrl-button playground__step"
      }, "Step"), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", {
        className: "playground__ctrl-button playground__run",
        onTap: this.onTap
      }, "Run")));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {}
  }]);

  return Playground;
}(_remix_core__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_remix_core_hooks__WEBPACK_IMPORTED_MODULE_8__["useRemixController"])(Playground, {
  backgroundColor: '#efefed'
}));

/***/ })

})
//# sourceMappingURL=index.14a94696c30ab2b86c1e.hot-update.js.map