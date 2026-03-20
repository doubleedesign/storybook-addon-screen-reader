var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/focus-visible/dist/focus-visible.js
var require_focus_visible = __commonJS({
  "node_modules/focus-visible/dist/focus-visible.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define(factory) : factory();
    })(exports, (function() {
      "use strict";
      function applyFocusVisiblePolyfill(scope) {
        var hadKeyboardEvent = true;
        var hadFocusVisibleRecently = false;
        var hadFocusVisibleRecentlyTimeout = null;
        var inputTypesAllowlist = {
          text: true,
          search: true,
          url: true,
          tel: true,
          email: true,
          password: true,
          number: true,
          date: true,
          month: true,
          week: true,
          time: true,
          datetime: true,
          "datetime-local": true
        };
        function isValidFocusTarget(el) {
          if (el && el !== document && el.nodeName !== "HTML" && el.nodeName !== "BODY" && "classList" in el && "contains" in el.classList) {
            return true;
          }
          return false;
        }
        function focusTriggersKeyboardModality(el) {
          var type = el.type;
          var tagName = el.tagName;
          if (tagName === "INPUT" && inputTypesAllowlist[type] && !el.readOnly) {
            return true;
          }
          if (tagName === "TEXTAREA" && !el.readOnly) {
            return true;
          }
          if (el.isContentEditable) {
            return true;
          }
          return false;
        }
        function addFocusVisibleClass(el) {
          if (el.classList.contains("focus-visible")) {
            return;
          }
          el.classList.add("focus-visible");
          el.setAttribute("data-focus-visible-added", "");
        }
        function removeFocusVisibleClass(el) {
          if (!el.hasAttribute("data-focus-visible-added")) {
            return;
          }
          el.classList.remove("focus-visible");
          el.removeAttribute("data-focus-visible-added");
        }
        function onKeyDown(e15) {
          if (e15.metaKey || e15.altKey || e15.ctrlKey) {
            return;
          }
          if (isValidFocusTarget(scope.activeElement)) {
            addFocusVisibleClass(scope.activeElement);
          }
          hadKeyboardEvent = true;
        }
        function onPointerDown(e15) {
          hadKeyboardEvent = false;
        }
        function onFocus(e15) {
          if (!isValidFocusTarget(e15.target)) {
            return;
          }
          if (hadKeyboardEvent || focusTriggersKeyboardModality(e15.target)) {
            addFocusVisibleClass(e15.target);
          }
        }
        function onBlur(e15) {
          if (!isValidFocusTarget(e15.target)) {
            return;
          }
          if (e15.target.classList.contains("focus-visible") || e15.target.hasAttribute("data-focus-visible-added")) {
            hadFocusVisibleRecently = true;
            window.clearTimeout(hadFocusVisibleRecentlyTimeout);
            hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
              hadFocusVisibleRecently = false;
            }, 100);
            removeFocusVisibleClass(e15.target);
          }
        }
        function onVisibilityChange(e15) {
          if (document.visibilityState === "hidden") {
            if (hadFocusVisibleRecently) {
              hadKeyboardEvent = true;
            }
            addInitialPointerMoveListeners();
          }
        }
        function addInitialPointerMoveListeners() {
          document.addEventListener("mousemove", onInitialPointerMove);
          document.addEventListener("mousedown", onInitialPointerMove);
          document.addEventListener("mouseup", onInitialPointerMove);
          document.addEventListener("pointermove", onInitialPointerMove);
          document.addEventListener("pointerdown", onInitialPointerMove);
          document.addEventListener("pointerup", onInitialPointerMove);
          document.addEventListener("touchmove", onInitialPointerMove);
          document.addEventListener("touchstart", onInitialPointerMove);
          document.addEventListener("touchend", onInitialPointerMove);
        }
        function removeInitialPointerMoveListeners() {
          document.removeEventListener("mousemove", onInitialPointerMove);
          document.removeEventListener("mousedown", onInitialPointerMove);
          document.removeEventListener("mouseup", onInitialPointerMove);
          document.removeEventListener("pointermove", onInitialPointerMove);
          document.removeEventListener("pointerdown", onInitialPointerMove);
          document.removeEventListener("pointerup", onInitialPointerMove);
          document.removeEventListener("touchmove", onInitialPointerMove);
          document.removeEventListener("touchstart", onInitialPointerMove);
          document.removeEventListener("touchend", onInitialPointerMove);
        }
        function onInitialPointerMove(e15) {
          if (e15.target.nodeName && e15.target.nodeName.toLowerCase() === "html") {
            return;
          }
          hadKeyboardEvent = false;
          removeInitialPointerMoveListeners();
        }
        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("mousedown", onPointerDown, true);
        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("touchstart", onPointerDown, true);
        document.addEventListener("visibilitychange", onVisibilityChange, true);
        addInitialPointerMoveListeners();
        scope.addEventListener("focus", onFocus, true);
        scope.addEventListener("blur", onBlur, true);
        if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
          scope.host.setAttribute("data-js-focus-visible", "");
        } else if (scope.nodeType === Node.DOCUMENT_NODE) {
          document.documentElement.classList.add("js-focus-visible");
          document.documentElement.setAttribute("data-js-focus-visible", "");
        }
      }
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;
        var event;
        try {
          event = new CustomEvent("focus-visible-polyfill-ready");
        } catch (error) {
          event = document.createEvent("CustomEvent");
          event.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
        }
        window.dispatchEvent(event);
      }
      if (typeof document !== "undefined") {
        applyFocusVisiblePolyfill(document);
      }
    }));
  }
});

// node_modules/aria-query/lib/util/iteratorProxy.js
var require_iteratorProxy = __commonJS({
  "node_modules/aria-query/lib/util/iteratorProxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function iteratorProxy() {
      var values = this;
      var index = 0;
      var iter = {
        "@@iterator": function iterator() {
          return iter;
        },
        next: function next() {
          if (index < values.length) {
            var value = values[index];
            index = index + 1;
            return {
              done: false,
              value
            };
          } else {
            return {
              done: true
            };
          }
        }
      };
      return iter;
    }
    var _default = exports.default = iteratorProxy;
  }
});

// node_modules/aria-query/lib/util/iterationDecorator.js
var require_iterationDecorator = __commonJS({
  "node_modules/aria-query/lib/util/iterationDecorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = iterationDecorator;
    var _iteratorProxy = _interopRequireDefault(require_iteratorProxy());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    function _typeof3(o13) {
      "@babel/helpers - typeof";
      return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o14) {
        return typeof o14;
      } : function(o14) {
        return o14 && "function" == typeof Symbol && o14.constructor === Symbol && o14 !== Symbol.prototype ? "symbol" : typeof o14;
      }, _typeof3(o13);
    }
    function iterationDecorator(collection, entries) {
      if (typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol") {
        Object.defineProperty(collection, Symbol.iterator, {
          value: _iteratorProxy.default.bind(entries)
        });
      }
      return collection;
    }
  }
});

// node_modules/aria-query/lib/ariaPropsMap.js
var require_ariaPropsMap = __commonJS({
  "node_modules/aria-query/lib/ariaPropsMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    function _slicedToArray(r9, e15) {
      return _arrayWithHoles(r9) || _iterableToArrayLimit(r9, e15) || _unsupportedIterableToArray(r9, e15) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r9, a5) {
      if (r9) {
        if ("string" == typeof r9) return _arrayLikeToArray(r9, a5);
        var t7 = {}.toString.call(r9).slice(8, -1);
        return "Object" === t7 && r9.constructor && (t7 = r9.constructor.name), "Map" === t7 || "Set" === t7 ? Array.from(r9) : "Arguments" === t7 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t7) ? _arrayLikeToArray(r9, a5) : void 0;
      }
    }
    function _arrayLikeToArray(r9, a5) {
      (null == a5 || a5 > r9.length) && (a5 = r9.length);
      for (var e15 = 0, n12 = Array(a5); e15 < a5; e15++) n12[e15] = r9[e15];
      return n12;
    }
    function _iterableToArrayLimit(r9, l4) {
      var t7 = null == r9 ? null : "undefined" != typeof Symbol && r9[Symbol.iterator] || r9["@@iterator"];
      if (null != t7) {
        var e15, n12, i10, u8, a5 = [], f4 = true, o13 = false;
        try {
          if (i10 = (t7 = t7.call(r9)).next, 0 === l4) {
            if (Object(t7) !== t7) return;
            f4 = false;
          } else for (; !(f4 = (e15 = i10.call(t7)).done) && (a5.push(e15.value), a5.length !== l4); f4 = true) ;
        } catch (r10) {
          o13 = true, n12 = r10;
        } finally {
          try {
            if (!f4 && null != t7.return && (u8 = t7.return(), Object(u8) !== u8)) return;
          } finally {
            if (o13) throw n12;
          }
        }
        return a5;
      }
    }
    function _arrayWithHoles(r9) {
      if (Array.isArray(r9)) return r9;
    }
    var properties = [["aria-activedescendant", {
      "type": "id"
    }], ["aria-atomic", {
      "type": "boolean"
    }], ["aria-autocomplete", {
      "type": "token",
      "values": ["inline", "list", "both", "none"]
    }], ["aria-braillelabel", {
      "type": "string"
    }], ["aria-brailleroledescription", {
      "type": "string"
    }], ["aria-busy", {
      "type": "boolean"
    }], ["aria-checked", {
      "type": "tristate"
    }], ["aria-colcount", {
      type: "integer"
    }], ["aria-colindex", {
      type: "integer"
    }], ["aria-colspan", {
      type: "integer"
    }], ["aria-controls", {
      "type": "idlist"
    }], ["aria-current", {
      type: "token",
      values: ["page", "step", "location", "date", "time", true, false]
    }], ["aria-describedby", {
      "type": "idlist"
    }], ["aria-description", {
      "type": "string"
    }], ["aria-details", {
      "type": "id"
    }], ["aria-disabled", {
      "type": "boolean"
    }], ["aria-dropeffect", {
      "type": "tokenlist",
      "values": ["copy", "execute", "link", "move", "none", "popup"]
    }], ["aria-errormessage", {
      "type": "id"
    }], ["aria-expanded", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-flowto", {
      "type": "idlist"
    }], ["aria-grabbed", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-haspopup", {
      "type": "token",
      "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
    }], ["aria-hidden", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-invalid", {
      "type": "token",
      "values": ["grammar", false, "spelling", true]
    }], ["aria-keyshortcuts", {
      type: "string"
    }], ["aria-label", {
      "type": "string"
    }], ["aria-labelledby", {
      "type": "idlist"
    }], ["aria-level", {
      "type": "integer"
    }], ["aria-live", {
      "type": "token",
      "values": ["assertive", "off", "polite"]
    }], ["aria-modal", {
      type: "boolean"
    }], ["aria-multiline", {
      "type": "boolean"
    }], ["aria-multiselectable", {
      "type": "boolean"
    }], ["aria-orientation", {
      "type": "token",
      "values": ["vertical", "undefined", "horizontal"]
    }], ["aria-owns", {
      "type": "idlist"
    }], ["aria-placeholder", {
      type: "string"
    }], ["aria-posinset", {
      "type": "integer"
    }], ["aria-pressed", {
      "type": "tristate"
    }], ["aria-readonly", {
      "type": "boolean"
    }], ["aria-relevant", {
      "type": "tokenlist",
      "values": ["additions", "all", "removals", "text"]
    }], ["aria-required", {
      "type": "boolean"
    }], ["aria-roledescription", {
      type: "string"
    }], ["aria-rowcount", {
      type: "integer"
    }], ["aria-rowindex", {
      type: "integer"
    }], ["aria-rowspan", {
      type: "integer"
    }], ["aria-selected", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-setsize", {
      "type": "integer"
    }], ["aria-sort", {
      "type": "token",
      "values": ["ascending", "descending", "none", "other"]
    }], ["aria-valuemax", {
      "type": "number"
    }], ["aria-valuemin", {
      "type": "number"
    }], ["aria-valuenow", {
      "type": "number"
    }], ["aria-valuetext", {
      "type": "string"
    }]];
    var ariaPropsMap = {
      entries: function entries() {
        return properties;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        for (var _i = 0, _properties = properties; _i < _properties.length; _i++) {
          var _properties$_i = _slicedToArray(_properties[_i], 2), key = _properties$_i[0], values = _properties$_i[1];
          fn.call(thisArg, values, key, properties);
        }
      },
      get: function get(key) {
        var item = properties.filter(function(tuple) {
          return tuple[0] === key ? true : false;
        })[0];
        return item && item[1];
      },
      has: function has(key) {
        return !!ariaPropsMap.get(key);
      },
      keys: function keys() {
        return properties.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function values() {
        return properties.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = exports.default = (0, _iterationDecorator.default)(ariaPropsMap, ariaPropsMap.entries());
  }
});

// node_modules/aria-query/lib/domMap.js
var require_domMap = __commonJS({
  "node_modules/aria-query/lib/domMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    function _slicedToArray(r9, e15) {
      return _arrayWithHoles(r9) || _iterableToArrayLimit(r9, e15) || _unsupportedIterableToArray(r9, e15) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r9, a5) {
      if (r9) {
        if ("string" == typeof r9) return _arrayLikeToArray(r9, a5);
        var t7 = {}.toString.call(r9).slice(8, -1);
        return "Object" === t7 && r9.constructor && (t7 = r9.constructor.name), "Map" === t7 || "Set" === t7 ? Array.from(r9) : "Arguments" === t7 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t7) ? _arrayLikeToArray(r9, a5) : void 0;
      }
    }
    function _arrayLikeToArray(r9, a5) {
      (null == a5 || a5 > r9.length) && (a5 = r9.length);
      for (var e15 = 0, n12 = Array(a5); e15 < a5; e15++) n12[e15] = r9[e15];
      return n12;
    }
    function _iterableToArrayLimit(r9, l4) {
      var t7 = null == r9 ? null : "undefined" != typeof Symbol && r9[Symbol.iterator] || r9["@@iterator"];
      if (null != t7) {
        var e15, n12, i10, u8, a5 = [], f4 = true, o13 = false;
        try {
          if (i10 = (t7 = t7.call(r9)).next, 0 === l4) {
            if (Object(t7) !== t7) return;
            f4 = false;
          } else for (; !(f4 = (e15 = i10.call(t7)).done) && (a5.push(e15.value), a5.length !== l4); f4 = true) ;
        } catch (r10) {
          o13 = true, n12 = r10;
        } finally {
          try {
            if (!f4 && null != t7.return && (u8 = t7.return(), Object(u8) !== u8)) return;
          } finally {
            if (o13) throw n12;
          }
        }
        return a5;
      }
    }
    function _arrayWithHoles(r9) {
      if (Array.isArray(r9)) return r9;
    }
    var dom = [["a", {
      reserved: false
    }], ["abbr", {
      reserved: false
    }], ["acronym", {
      reserved: false
    }], ["address", {
      reserved: false
    }], ["applet", {
      reserved: false
    }], ["area", {
      reserved: false
    }], ["article", {
      reserved: false
    }], ["aside", {
      reserved: false
    }], ["audio", {
      reserved: false
    }], ["b", {
      reserved: false
    }], ["base", {
      reserved: true
    }], ["bdi", {
      reserved: false
    }], ["bdo", {
      reserved: false
    }], ["big", {
      reserved: false
    }], ["blink", {
      reserved: false
    }], ["blockquote", {
      reserved: false
    }], ["body", {
      reserved: false
    }], ["br", {
      reserved: false
    }], ["button", {
      reserved: false
    }], ["canvas", {
      reserved: false
    }], ["caption", {
      reserved: false
    }], ["center", {
      reserved: false
    }], ["cite", {
      reserved: false
    }], ["code", {
      reserved: false
    }], ["col", {
      reserved: true
    }], ["colgroup", {
      reserved: true
    }], ["content", {
      reserved: false
    }], ["data", {
      reserved: false
    }], ["datalist", {
      reserved: false
    }], ["dd", {
      reserved: false
    }], ["del", {
      reserved: false
    }], ["details", {
      reserved: false
    }], ["dfn", {
      reserved: false
    }], ["dialog", {
      reserved: false
    }], ["dir", {
      reserved: false
    }], ["div", {
      reserved: false
    }], ["dl", {
      reserved: false
    }], ["dt", {
      reserved: false
    }], ["em", {
      reserved: false
    }], ["embed", {
      reserved: false
    }], ["fieldset", {
      reserved: false
    }], ["figcaption", {
      reserved: false
    }], ["figure", {
      reserved: false
    }], ["font", {
      reserved: false
    }], ["footer", {
      reserved: false
    }], ["form", {
      reserved: false
    }], ["frame", {
      reserved: false
    }], ["frameset", {
      reserved: false
    }], ["h1", {
      reserved: false
    }], ["h2", {
      reserved: false
    }], ["h3", {
      reserved: false
    }], ["h4", {
      reserved: false
    }], ["h5", {
      reserved: false
    }], ["h6", {
      reserved: false
    }], ["head", {
      reserved: true
    }], ["header", {
      reserved: false
    }], ["hgroup", {
      reserved: false
    }], ["hr", {
      reserved: false
    }], ["html", {
      reserved: true
    }], ["i", {
      reserved: false
    }], ["iframe", {
      reserved: false
    }], ["img", {
      reserved: false
    }], ["input", {
      reserved: false
    }], ["ins", {
      reserved: false
    }], ["kbd", {
      reserved: false
    }], ["keygen", {
      reserved: false
    }], ["label", {
      reserved: false
    }], ["legend", {
      reserved: false
    }], ["li", {
      reserved: false
    }], ["link", {
      reserved: true
    }], ["main", {
      reserved: false
    }], ["map", {
      reserved: false
    }], ["mark", {
      reserved: false
    }], ["marquee", {
      reserved: false
    }], ["menu", {
      reserved: false
    }], ["menuitem", {
      reserved: false
    }], ["meta", {
      reserved: true
    }], ["meter", {
      reserved: false
    }], ["nav", {
      reserved: false
    }], ["noembed", {
      reserved: true
    }], ["noscript", {
      reserved: true
    }], ["object", {
      reserved: false
    }], ["ol", {
      reserved: false
    }], ["optgroup", {
      reserved: false
    }], ["option", {
      reserved: false
    }], ["output", {
      reserved: false
    }], ["p", {
      reserved: false
    }], ["param", {
      reserved: true
    }], ["picture", {
      reserved: true
    }], ["pre", {
      reserved: false
    }], ["progress", {
      reserved: false
    }], ["q", {
      reserved: false
    }], ["rp", {
      reserved: false
    }], ["rt", {
      reserved: false
    }], ["rtc", {
      reserved: false
    }], ["ruby", {
      reserved: false
    }], ["s", {
      reserved: false
    }], ["samp", {
      reserved: false
    }], ["script", {
      reserved: true
    }], ["section", {
      reserved: false
    }], ["select", {
      reserved: false
    }], ["small", {
      reserved: false
    }], ["source", {
      reserved: true
    }], ["spacer", {
      reserved: false
    }], ["span", {
      reserved: false
    }], ["strike", {
      reserved: false
    }], ["strong", {
      reserved: false
    }], ["style", {
      reserved: true
    }], ["sub", {
      reserved: false
    }], ["summary", {
      reserved: false
    }], ["sup", {
      reserved: false
    }], ["table", {
      reserved: false
    }], ["tbody", {
      reserved: false
    }], ["td", {
      reserved: false
    }], ["textarea", {
      reserved: false
    }], ["tfoot", {
      reserved: false
    }], ["th", {
      reserved: false
    }], ["thead", {
      reserved: false
    }], ["time", {
      reserved: false
    }], ["title", {
      reserved: true
    }], ["tr", {
      reserved: false
    }], ["track", {
      reserved: true
    }], ["tt", {
      reserved: false
    }], ["u", {
      reserved: false
    }], ["ul", {
      reserved: false
    }], ["var", {
      reserved: false
    }], ["video", {
      reserved: false
    }], ["wbr", {
      reserved: false
    }], ["xmp", {
      reserved: false
    }]];
    var domMap = {
      entries: function entries() {
        return dom;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        for (var _i = 0, _dom = dom; _i < _dom.length; _i++) {
          var _dom$_i = _slicedToArray(_dom[_i], 2), key = _dom$_i[0], values = _dom$_i[1];
          fn.call(thisArg, values, key, dom);
        }
      },
      get: function get(key) {
        var item = dom.filter(function(tuple) {
          return tuple[0] === key ? true : false;
        })[0];
        return item && item[1];
      },
      has: function has(key) {
        return !!domMap.get(key);
      },
      keys: function keys() {
        return dom.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function values() {
        return dom.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = exports.default = (0, _iterationDecorator.default)(domMap, domMap.entries());
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/commandRole.js
var require_commandRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var commandRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    };
    var _default = exports.default = commandRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js
var require_compositeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var compositeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    };
    var _default = exports.default = compositeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/inputRole.js
var require_inputRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var inputRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null
      },
      relatedConcepts: [{
        concept: {
          name: "input"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    };
    var _default = exports.default = inputRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js
var require_landmarkRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var landmarkRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = landmarkRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js
var require_rangeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rangeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuemax": null,
        "aria-valuemin": null,
        "aria-valuenow": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = rangeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js
var require_roletypeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var roletypeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {
        "aria-atomic": null,
        "aria-busy": null,
        "aria-controls": null,
        "aria-current": null,
        "aria-describedby": null,
        "aria-details": null,
        "aria-dropeffect": null,
        "aria-flowto": null,
        "aria-grabbed": null,
        "aria-hidden": null,
        "aria-keyshortcuts": null,
        "aria-label": null,
        "aria-labelledby": null,
        "aria-live": null,
        "aria-owns": null,
        "aria-relevant": null,
        "aria-roledescription": null
      },
      relatedConcepts: [{
        concept: {
          name: "role"
        },
        module: "XHTML"
      }, {
        concept: {
          name: "type"
        },
        module: "Dublin Core"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
    var _default = exports.default = roletypeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js
var require_sectionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var sectionRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "frontmatter"
        },
        module: "DTB"
      }, {
        concept: {
          name: "level"
        },
        module: "DTB"
      }, {
        concept: {
          name: "level"
        },
        module: "SMIL"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = sectionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js
var require_sectionheadRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var sectionheadRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = sectionheadRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/selectRole.js
var require_selectRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var selectRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
    };
    var _default = exports.default = selectRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/structureRole.js
var require_structureRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var structureRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    };
    var _default = exports.default = structureRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js
var require_widgetRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var widgetRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    };
    var _default = exports.default = widgetRole;
  }
});

// node_modules/aria-query/lib/etc/roles/abstract/windowRole.js
var require_windowRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var windowRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-modal": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    };
    var _default = exports.default = windowRole;
  }
});

// node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js
var require_ariaAbstractRoles = __commonJS({
  "node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _commandRole = _interopRequireDefault(require_commandRole());
    var _compositeRole = _interopRequireDefault(require_compositeRole());
    var _inputRole = _interopRequireDefault(require_inputRole());
    var _landmarkRole = _interopRequireDefault(require_landmarkRole());
    var _rangeRole = _interopRequireDefault(require_rangeRole());
    var _roletypeRole = _interopRequireDefault(require_roletypeRole());
    var _sectionRole = _interopRequireDefault(require_sectionRole());
    var _sectionheadRole = _interopRequireDefault(require_sectionheadRole());
    var _selectRole = _interopRequireDefault(require_selectRole());
    var _structureRole = _interopRequireDefault(require_structureRole());
    var _widgetRole = _interopRequireDefault(require_widgetRole());
    var _windowRole = _interopRequireDefault(require_windowRole());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
    var _default = exports.default = ariaAbstractRoles;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/alertRole.js
var require_alertRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var alertRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-atomic": "true",
        "aria-live": "assertive"
      },
      relatedConcepts: [{
        concept: {
          name: "alert"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = alertRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js
var require_alertdialogRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var alertdialogRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "alert"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
    };
    var _default = exports.default = alertdialogRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/applicationRole.js
var require_applicationRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var applicationRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "Device Independence Delivery Unit"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = applicationRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/articleRole.js
var require_articleRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var articleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "article"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]]
    };
    var _default = exports.default = articleRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/bannerRole.js
var require_bannerRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var bannerRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["scoped to the body element"],
          name: "header"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = bannerRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js
var require_blockquoteRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var blockquoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "blockquote"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = blockquoteRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/buttonRole.js
var require_buttonRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var buttonRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-pressed": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "button"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "image"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "reset"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "submit"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "button"
        },
        module: "HTML"
      }, {
        concept: {
          name: "trigger"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    };
    var _default = exports.default = buttonRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/captionRole.js
var require_captionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var captionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "caption"
        },
        module: "HTML"
      }],
      requireContextRole: ["figure", "grid", "table"],
      requiredContextRole: ["figure", "grid", "table"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = captionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/cellRole.js
var require_cellRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var cellRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-colspan": null,
        "aria-rowindex": null,
        "aria-rowspan": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["ancestor table element has table role"],
          name: "td"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = cellRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js
var require_checkboxRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var checkboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "checkbox"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "option"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = exports.default = checkboxRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/codeRole.js
var require_codeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var codeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "code"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = codeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js
var require_columnheaderRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var columnheaderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-sort": null
      },
      relatedConcepts: [{
        concept: {
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "col"
          }],
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "colgroup"
          }],
          name: "th"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
    };
    var _default = exports.default = columnheaderRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js
var require_comboboxRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var comboboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-expanded": "false",
        "aria-haspopup": "listbox"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "email"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "search"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "tel"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "text"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "multiple"
          }, {
            constraints: ["undefined"],
            name: "size"
          }],
          constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-controls": null,
        "aria-expanded": "false"
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = exports.default = comboboxRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js
var require_complementaryRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var complementaryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["scoped to the body element", "scoped to the main element"],
          name: "aside"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "aside"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "aside"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = complementaryRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js
var require_contentinfoRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var contentinfoRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["scoped to the body element"],
          name: "footer"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = contentinfoRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/definitionRole.js
var require_definitionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var definitionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dd"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = definitionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/deletionRole.js
var require_deletionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var deletionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "del"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = deletionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/dialogRole.js
var require_dialogRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var dialogRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dialog"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "window"]]
    };
    var _default = exports.default = dialogRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/directoryRole.js
var require_directoryRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var directoryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        module: "DAISY Guide"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]]
    };
    var _default = exports.default = directoryRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/documentRole.js
var require_documentRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var documentRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "Device Independence Delivery Unit"
        }
      }, {
        concept: {
          name: "html"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = documentRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js
var require_emphasisRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var emphasisRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "em"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = emphasisRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/feedRole.js
var require_feedRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var feedRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["article"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]]
    };
    var _default = exports.default = feedRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/figureRole.js
var require_figureRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var figureRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "figure"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = figureRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/formRole.js
var require_formRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/formRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var formRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          name: "form"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          name: "form"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "name"
          }],
          name: "form"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = formRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/genericRole.js
var require_genericRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var genericRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "a"
        },
        module: "HTML"
      }, {
        concept: {
          name: "area"
        },
        module: "HTML"
      }, {
        concept: {
          name: "aside"
        },
        module: "HTML"
      }, {
        concept: {
          name: "b"
        },
        module: "HTML"
      }, {
        concept: {
          name: "bdo"
        },
        module: "HTML"
      }, {
        concept: {
          name: "body"
        },
        module: "HTML"
      }, {
        concept: {
          name: "data"
        },
        module: "HTML"
      }, {
        concept: {
          name: "div"
        },
        module: "HTML"
      }, {
        concept: {
          constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "footer"
        },
        module: "HTML"
      }, {
        concept: {
          constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "header"
        },
        module: "HTML"
      }, {
        concept: {
          name: "hgroup"
        },
        module: "HTML"
      }, {
        concept: {
          name: "i"
        },
        module: "HTML"
      }, {
        concept: {
          name: "pre"
        },
        module: "HTML"
      }, {
        concept: {
          name: "q"
        },
        module: "HTML"
      }, {
        concept: {
          name: "samp"
        },
        module: "HTML"
      }, {
        concept: {
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          name: "small"
        },
        module: "HTML"
      }, {
        concept: {
          name: "span"
        },
        module: "HTML"
      }, {
        concept: {
          name: "u"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = genericRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/gridRole.js
var require_gridRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var gridRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-multiselectable": null,
        "aria-readonly": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
    };
    var _default = exports.default = gridRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js
var require_gridcellRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var gridcellRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-selected": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"],
          name: "td"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
    };
    var _default = exports.default = gridcellRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/groupRole.js
var require_groupRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var groupRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null
      },
      relatedConcepts: [{
        concept: {
          name: "details"
        },
        module: "HTML"
      }, {
        concept: {
          name: "fieldset"
        },
        module: "HTML"
      }, {
        concept: {
          name: "optgroup"
        },
        module: "HTML"
      }, {
        concept: {
          name: "address"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = groupRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/headingRole.js
var require_headingRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var headingRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-level": "2"
      },
      relatedConcepts: [{
        concept: {
          name: "h1"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h2"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h3"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h4"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h5"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h6"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-level": "2"
      },
      superClass: [["roletype", "structure", "sectionhead"]]
    };
    var _default = exports.default = headingRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/imgRole.js
var require_imgRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var imgRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "alt"
          }],
          name: "img"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "alt"
          }],
          name: "img"
        },
        module: "HTML"
      }, {
        concept: {
          name: "imggroup"
        },
        module: "DTB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = imgRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/insertionRole.js
var require_insertionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var insertionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "ins"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = insertionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/linkRole.js
var require_linkRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var linkRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "href"
          }],
          name: "a"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "href"
          }],
          name: "area"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    };
    var _default = exports.default = linkRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/listRole.js
var require_listRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/listRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var listRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menu"
        },
        module: "HTML"
      }, {
        concept: {
          name: "ol"
        },
        module: "HTML"
      }, {
        concept: {
          name: "ul"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["listitem"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = listRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/listboxRole.js
var require_listboxRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var listboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-orientation": "vertical"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: [">1"],
            name: "size"
          }],
          constraints: ["the size attribute value is greater than 1"],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "multiple"
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          name: "datalist"
        },
        module: "HTML"
      }, {
        concept: {
          name: "list"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["option", "group"], ["option"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = exports.default = listboxRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/listitemRole.js
var require_listitemRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var listitemRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["direct descendant of ol", "direct descendant of ul", "direct descendant of menu"],
          name: "li"
        },
        module: "HTML"
      }, {
        concept: {
          name: "item"
        },
        module: "XForms"
      }],
      requireContextRole: ["directory", "list"],
      requiredContextRole: ["directory", "list"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = listitemRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/logRole.js
var require_logRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/logRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var logRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-live": "polite"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = logRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/mainRole.js
var require_mainRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var mainRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "main"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = mainRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/markRole.js
var require_markRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/markRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var markRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: [],
      props: {
        "aria-braillelabel": null,
        "aria-brailleroledescription": null,
        "aria-description": null
      },
      relatedConcepts: [{
        concept: {
          name: "mark"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = markRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js
var require_marqueeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var marqueeRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = marqueeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/mathRole.js
var require_mathRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var mathRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "math"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = mathRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/menuRole.js
var require_menuRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "vertical"
      },
      relatedConcepts: [{
        concept: {
          name: "MENU"
        },
        module: "JAPI"
      }, {
        concept: {
          name: "list"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }, {
        concept: {
          name: "sidebar"
        },
        module: "DTB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = exports.default = menuRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/menubarRole.js
var require_menubarRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menubarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        concept: {
          name: "toolbar"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
    };
    var _default = exports.default = menubarRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js
var require_menuitemRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuitemRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "MENU_ITEM"
        },
        module: "JAPI"
      }, {
        concept: {
          name: "listitem"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "option"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    };
    var _default = exports.default = menuitemRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js
var require_menuitemcheckboxRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuitemcheckboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
    };
    var _default = exports.default = menuitemcheckboxRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js
var require_menuitemradioRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuitemradioRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
    };
    var _default = exports.default = menuitemradioRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/meterRole.js
var require_meterRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var meterRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null,
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [{
        concept: {
          name: "meter"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-valuenow": null
      },
      superClass: [["roletype", "structure", "range"]]
    };
    var _default = exports.default = meterRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/navigationRole.js
var require_navigationRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var navigationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "nav"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = navigationRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/noneRole.js
var require_noneRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var noneRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
    var _default = exports.default = noneRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/noteRole.js
var require_noteRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var noteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = noteRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/optionRole.js
var require_optionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var optionRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false"
      },
      relatedConcepts: [{
        concept: {
          name: "item"
        },
        module: "XForms"
      }, {
        concept: {
          name: "listitem"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "option"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-selected": "false"
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = exports.default = optionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js
var require_paragraphRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var paragraphRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "p"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = paragraphRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/presentationRole.js
var require_presentationRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var presentationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "alt",
            value: ""
          }],
          name: "img"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = presentationRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js
var require_progressbarRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var progressbarRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null
      },
      relatedConcepts: [{
        concept: {
          name: "progress"
        },
        module: "HTML"
      }, {
        concept: {
          name: "status"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
    };
    var _default = exports.default = progressbarRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/radioRole.js
var require_radioRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var radioRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "radio"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = exports.default = radioRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js
var require_radiogroupRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var radiogroupRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          name: "list"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["radio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = exports.default = radiogroupRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/regionRole.js
var require_regionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var regionRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          name: "Device Independence Glossart perceivable unit"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = regionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/rowRole.js
var require_rowRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rowRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-expanded": null,
        "aria-level": null,
        "aria-posinset": null,
        "aria-rowindex": null,
        "aria-selected": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "tr"
        },
        module: "HTML"
      }],
      requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
    };
    var _default = exports.default = rowRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js
var require_rowgroupRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rowgroupRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "tbody"
        },
        module: "HTML"
      }, {
        concept: {
          name: "tfoot"
        },
        module: "HTML"
      }, {
        concept: {
          name: "thead"
        },
        module: "HTML"
      }],
      requireContextRole: ["grid", "table", "treegrid"],
      requiredContextRole: ["grid", "table", "treegrid"],
      requiredOwnedElements: [["row"]],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = rowgroupRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js
var require_rowheaderRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rowheaderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-sort": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "scope",
            value: "row"
          }],
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "rowgroup"
          }],
          name: "th"
        },
        module: "HTML"
      }],
      requireContextRole: ["row", "rowgroup"],
      requiredContextRole: ["row", "rowgroup"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
    };
    var _default = exports.default = rowheaderRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js
var require_scrollbarRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var scrollbarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-valuetext": null,
        "aria-orientation": "vertical",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-controls": null,
        "aria-valuenow": null
      },
      superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
    };
    var _default = exports.default = scrollbarRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/searchRole.js
var require_searchRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var searchRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = searchRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js
var require_searchboxRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var searchboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "search"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input", "textbox"]]
    };
    var _default = exports.default = searchboxRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/separatorRole.js
var require_separatorRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var separatorRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0",
        "aria-valuenow": null,
        "aria-valuetext": null
      },
      relatedConcepts: [{
        concept: {
          name: "hr"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = exports.default = separatorRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/sliderRole.js
var require_sliderRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var sliderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-valuetext": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "range"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-valuenow": null
      },
      superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
    };
    var _default = exports.default = sliderRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js
var require_spinbuttonRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var spinbuttonRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-valuetext": null,
        "aria-valuenow": "0"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "number"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
    };
    var _default = exports.default = spinbuttonRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/statusRole.js
var require_statusRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var statusRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-atomic": "true",
        "aria-live": "polite"
      },
      relatedConcepts: [{
        concept: {
          name: "output"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = statusRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/strongRole.js
var require_strongRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var strongRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "strong"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = strongRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js
var require_subscriptRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var subscriptRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "sub"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = subscriptRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js
var require_superscriptRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var superscriptRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "sup"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = superscriptRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/switchRole.js
var require_switchRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var switchRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "button"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox"]]
    };
    var _default = exports.default = switchRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/tabRole.js
var require_tabRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tabRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false"
      },
      relatedConcepts: [],
      requireContextRole: ["tablist"],
      requiredContextRole: ["tablist"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
    };
    var _default = exports.default = tabRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/tableRole.js
var require_tableRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tableRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-colcount": null,
        "aria-rowcount": null
      },
      relatedConcepts: [{
        concept: {
          name: "table"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = tableRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/tablistRole.js
var require_tablistRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tablistRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-multiselectable": null,
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        module: "DAISY",
        concept: {
          name: "guide"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["tab"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"]]
    };
    var _default = exports.default = tablistRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js
var require_tabpanelRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tabpanelRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = tabpanelRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/termRole.js
var require_termRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/termRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var termRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dfn"
        },
        module: "HTML"
      }, {
        concept: {
          name: "dt"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = termRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/textboxRole.js
var require_textboxRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var textboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-multiline": null,
        "aria-placeholder": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "type"
          }, {
            constraints: ["undefined"],
            name: "list"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "email"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "tel"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "text"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "input"
        },
        module: "XForms"
      }, {
        concept: {
          name: "textarea"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = exports.default = textboxRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/timeRole.js
var require_timeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var timeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "time"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = timeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/timerRole.js
var require_timerRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var timerRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "status"]]
    };
    var _default = exports.default = timerRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js
var require_toolbarRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var toolbarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        concept: {
          name: "menubar"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]]
    };
    var _default = exports.default = toolbarRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js
var require_tooltipRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tooltipRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = tooltipRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/treeRole.js
var require_treeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var treeRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-required": null,
        "aria-orientation": "vertical"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = exports.default = treeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/treegridRole.js
var require_treegridRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var treegridRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
    };
    var _default = exports.default = treegridRole;
  }
});

// node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js
var require_treeitemRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var treeitemRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-expanded": null,
        "aria-haspopup": null
      },
      relatedConcepts: [],
      requireContextRole: ["group", "tree"],
      requiredContextRole: ["group", "tree"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-selected": null
      },
      superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
    };
    var _default = exports.default = treeitemRole;
  }
});

// node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js
var require_ariaLiteralRoles = __commonJS({
  "node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _alertRole = _interopRequireDefault(require_alertRole());
    var _alertdialogRole = _interopRequireDefault(require_alertdialogRole());
    var _applicationRole = _interopRequireDefault(require_applicationRole());
    var _articleRole = _interopRequireDefault(require_articleRole());
    var _bannerRole = _interopRequireDefault(require_bannerRole());
    var _blockquoteRole = _interopRequireDefault(require_blockquoteRole());
    var _buttonRole = _interopRequireDefault(require_buttonRole());
    var _captionRole = _interopRequireDefault(require_captionRole());
    var _cellRole = _interopRequireDefault(require_cellRole());
    var _checkboxRole = _interopRequireDefault(require_checkboxRole());
    var _codeRole = _interopRequireDefault(require_codeRole());
    var _columnheaderRole = _interopRequireDefault(require_columnheaderRole());
    var _comboboxRole = _interopRequireDefault(require_comboboxRole());
    var _complementaryRole = _interopRequireDefault(require_complementaryRole());
    var _contentinfoRole = _interopRequireDefault(require_contentinfoRole());
    var _definitionRole = _interopRequireDefault(require_definitionRole());
    var _deletionRole = _interopRequireDefault(require_deletionRole());
    var _dialogRole = _interopRequireDefault(require_dialogRole());
    var _directoryRole = _interopRequireDefault(require_directoryRole());
    var _documentRole = _interopRequireDefault(require_documentRole());
    var _emphasisRole = _interopRequireDefault(require_emphasisRole());
    var _feedRole = _interopRequireDefault(require_feedRole());
    var _figureRole = _interopRequireDefault(require_figureRole());
    var _formRole = _interopRequireDefault(require_formRole());
    var _genericRole = _interopRequireDefault(require_genericRole());
    var _gridRole = _interopRequireDefault(require_gridRole());
    var _gridcellRole = _interopRequireDefault(require_gridcellRole());
    var _groupRole = _interopRequireDefault(require_groupRole());
    var _headingRole = _interopRequireDefault(require_headingRole());
    var _imgRole = _interopRequireDefault(require_imgRole());
    var _insertionRole = _interopRequireDefault(require_insertionRole());
    var _linkRole = _interopRequireDefault(require_linkRole());
    var _listRole = _interopRequireDefault(require_listRole());
    var _listboxRole = _interopRequireDefault(require_listboxRole());
    var _listitemRole = _interopRequireDefault(require_listitemRole());
    var _logRole = _interopRequireDefault(require_logRole());
    var _mainRole = _interopRequireDefault(require_mainRole());
    var _markRole = _interopRequireDefault(require_markRole());
    var _marqueeRole = _interopRequireDefault(require_marqueeRole());
    var _mathRole = _interopRequireDefault(require_mathRole());
    var _menuRole = _interopRequireDefault(require_menuRole());
    var _menubarRole = _interopRequireDefault(require_menubarRole());
    var _menuitemRole = _interopRequireDefault(require_menuitemRole());
    var _menuitemcheckboxRole = _interopRequireDefault(require_menuitemcheckboxRole());
    var _menuitemradioRole = _interopRequireDefault(require_menuitemradioRole());
    var _meterRole = _interopRequireDefault(require_meterRole());
    var _navigationRole = _interopRequireDefault(require_navigationRole());
    var _noneRole = _interopRequireDefault(require_noneRole());
    var _noteRole = _interopRequireDefault(require_noteRole());
    var _optionRole = _interopRequireDefault(require_optionRole());
    var _paragraphRole = _interopRequireDefault(require_paragraphRole());
    var _presentationRole = _interopRequireDefault(require_presentationRole());
    var _progressbarRole = _interopRequireDefault(require_progressbarRole());
    var _radioRole = _interopRequireDefault(require_radioRole());
    var _radiogroupRole = _interopRequireDefault(require_radiogroupRole());
    var _regionRole = _interopRequireDefault(require_regionRole());
    var _rowRole = _interopRequireDefault(require_rowRole());
    var _rowgroupRole = _interopRequireDefault(require_rowgroupRole());
    var _rowheaderRole = _interopRequireDefault(require_rowheaderRole());
    var _scrollbarRole = _interopRequireDefault(require_scrollbarRole());
    var _searchRole = _interopRequireDefault(require_searchRole());
    var _searchboxRole = _interopRequireDefault(require_searchboxRole());
    var _separatorRole = _interopRequireDefault(require_separatorRole());
    var _sliderRole = _interopRequireDefault(require_sliderRole());
    var _spinbuttonRole = _interopRequireDefault(require_spinbuttonRole());
    var _statusRole = _interopRequireDefault(require_statusRole());
    var _strongRole = _interopRequireDefault(require_strongRole());
    var _subscriptRole = _interopRequireDefault(require_subscriptRole());
    var _superscriptRole = _interopRequireDefault(require_superscriptRole());
    var _switchRole = _interopRequireDefault(require_switchRole());
    var _tabRole = _interopRequireDefault(require_tabRole());
    var _tableRole = _interopRequireDefault(require_tableRole());
    var _tablistRole = _interopRequireDefault(require_tablistRole());
    var _tabpanelRole = _interopRequireDefault(require_tabpanelRole());
    var _termRole = _interopRequireDefault(require_termRole());
    var _textboxRole = _interopRequireDefault(require_textboxRole());
    var _timeRole = _interopRequireDefault(require_timeRole());
    var _timerRole = _interopRequireDefault(require_timerRole());
    var _toolbarRole = _interopRequireDefault(require_toolbarRole());
    var _tooltipRole = _interopRequireDefault(require_tooltipRole());
    var _treeRole = _interopRequireDefault(require_treeRole());
    var _treegridRole = _interopRequireDefault(require_treegridRole());
    var _treeitemRole = _interopRequireDefault(require_treeitemRole());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["mark", _markRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
    var _default = exports.default = ariaLiteralRoles;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js
var require_docAbstractRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAbstractRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "abstract [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docAbstractRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js
var require_docAcknowledgmentsRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAcknowledgmentsRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "acknowledgments [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docAcknowledgmentsRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js
var require_docAfterwordRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAfterwordRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "afterword [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docAfterwordRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js
var require_docAppendixRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAppendixRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "appendix [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docAppendixRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js
var require_docBacklinkRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBacklinkRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "referrer [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = exports.default = docBacklinkRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js
var require_docBiblioentryRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBiblioentryRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "EPUB biblioentry [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: ["doc-bibliography"],
      requiredContextRole: ["doc-bibliography"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]]
    };
    var _default = exports.default = docBiblioentryRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js
var require_docBibliographyRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBibliographyRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "bibliography [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-biblioentry"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docBibliographyRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js
var require_docBibliorefRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBibliorefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "biblioref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = exports.default = docBibliorefRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js
var require_docChapterRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docChapterRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "chapter [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docChapterRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js
var require_docColophonRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docColophonRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "colophon [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docColophonRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js
var require_docConclusionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docConclusionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "conclusion [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docConclusionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js
var require_docCoverRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docCoverRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "cover [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]]
    };
    var _default = exports.default = docCoverRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js
var require_docCreditRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docCreditRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "credit [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docCreditRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js
var require_docCreditsRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docCreditsRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "credits [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docCreditsRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js
var require_docDedicationRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docDedicationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "dedication [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docDedicationRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js
var require_docEndnoteRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEndnoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "rearnote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: ["doc-endnotes"],
      requiredContextRole: ["doc-endnotes"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]]
    };
    var _default = exports.default = docEndnoteRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js
var require_docEndnotesRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEndnotesRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "rearnotes [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-endnote"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docEndnotesRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js
var require_docEpigraphRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEpigraphRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "epigraph [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docEpigraphRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js
var require_docEpilogueRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEpilogueRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "epilogue [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docEpilogueRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js
var require_docErrataRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docErrataRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "errata [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docErrataRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js
var require_docExampleRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docExampleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docExampleRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js
var require_docFootnoteRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docFootnoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "footnote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docFootnoteRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js
var require_docForewordRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docForewordRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "foreword [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docForewordRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js
var require_docGlossaryRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docGlossaryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "glossary [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["definition"], ["term"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docGlossaryRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js
var require_docGlossrefRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docGlossrefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "glossref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = exports.default = docGlossrefRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js
var require_docIndexRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docIndexRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "index [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    };
    var _default = exports.default = docIndexRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js
var require_docIntroductionRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docIntroductionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "introduction [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docIntroductionRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js
var require_docNoterefRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docNoterefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "noteref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = exports.default = docNoterefRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js
var require_docNoticeRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docNoticeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "notice [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]]
    };
    var _default = exports.default = docNoticeRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js
var require_docPagebreakRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPagebreakRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "pagebreak [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "separator"]]
    };
    var _default = exports.default = docPagebreakRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPagefooterRole.js
var require_docPagefooterRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPagefooterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPagefooterRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: [],
      props: {
        "aria-braillelabel": null,
        "aria-brailleroledescription": null,
        "aria-description": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docPagefooterRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPageheaderRole.js
var require_docPageheaderRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPageheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPageheaderRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: [],
      props: {
        "aria-braillelabel": null,
        "aria-brailleroledescription": null,
        "aria-description": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docPageheaderRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js
var require_docPagelistRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPagelistRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "page-list [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    };
    var _default = exports.default = docPagelistRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js
var require_docPartRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPartRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "part [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docPartRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js
var require_docPrefaceRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPrefaceRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "preface [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docPrefaceRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js
var require_docPrologueRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPrologueRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "prologue [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = exports.default = docPrologueRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js
var require_docPullquoteRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPullquoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "pullquote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["none"]]
    };
    var _default = exports.default = docPullquoteRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js
var require_docQnaRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docQnaRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "qna [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = exports.default = docQnaRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js
var require_docSubtitleRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docSubtitleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "subtitle [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"]]
    };
    var _default = exports.default = docSubtitleRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js
var require_docTipRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docTipRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "help [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]]
    };
    var _default = exports.default = docTipRole;
  }
});

// node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js
var require_docTocRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docTocRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "toc [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    };
    var _default = exports.default = docTocRole;
  }
});

// node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js
var require_ariaDpubRoles = __commonJS({
  "node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _docAbstractRole = _interopRequireDefault(require_docAbstractRole());
    var _docAcknowledgmentsRole = _interopRequireDefault(require_docAcknowledgmentsRole());
    var _docAfterwordRole = _interopRequireDefault(require_docAfterwordRole());
    var _docAppendixRole = _interopRequireDefault(require_docAppendixRole());
    var _docBacklinkRole = _interopRequireDefault(require_docBacklinkRole());
    var _docBiblioentryRole = _interopRequireDefault(require_docBiblioentryRole());
    var _docBibliographyRole = _interopRequireDefault(require_docBibliographyRole());
    var _docBibliorefRole = _interopRequireDefault(require_docBibliorefRole());
    var _docChapterRole = _interopRequireDefault(require_docChapterRole());
    var _docColophonRole = _interopRequireDefault(require_docColophonRole());
    var _docConclusionRole = _interopRequireDefault(require_docConclusionRole());
    var _docCoverRole = _interopRequireDefault(require_docCoverRole());
    var _docCreditRole = _interopRequireDefault(require_docCreditRole());
    var _docCreditsRole = _interopRequireDefault(require_docCreditsRole());
    var _docDedicationRole = _interopRequireDefault(require_docDedicationRole());
    var _docEndnoteRole = _interopRequireDefault(require_docEndnoteRole());
    var _docEndnotesRole = _interopRequireDefault(require_docEndnotesRole());
    var _docEpigraphRole = _interopRequireDefault(require_docEpigraphRole());
    var _docEpilogueRole = _interopRequireDefault(require_docEpilogueRole());
    var _docErrataRole = _interopRequireDefault(require_docErrataRole());
    var _docExampleRole = _interopRequireDefault(require_docExampleRole());
    var _docFootnoteRole = _interopRequireDefault(require_docFootnoteRole());
    var _docForewordRole = _interopRequireDefault(require_docForewordRole());
    var _docGlossaryRole = _interopRequireDefault(require_docGlossaryRole());
    var _docGlossrefRole = _interopRequireDefault(require_docGlossrefRole());
    var _docIndexRole = _interopRequireDefault(require_docIndexRole());
    var _docIntroductionRole = _interopRequireDefault(require_docIntroductionRole());
    var _docNoterefRole = _interopRequireDefault(require_docNoterefRole());
    var _docNoticeRole = _interopRequireDefault(require_docNoticeRole());
    var _docPagebreakRole = _interopRequireDefault(require_docPagebreakRole());
    var _docPagefooterRole = _interopRequireDefault(require_docPagefooterRole());
    var _docPageheaderRole = _interopRequireDefault(require_docPageheaderRole());
    var _docPagelistRole = _interopRequireDefault(require_docPagelistRole());
    var _docPartRole = _interopRequireDefault(require_docPartRole());
    var _docPrefaceRole = _interopRequireDefault(require_docPrefaceRole());
    var _docPrologueRole = _interopRequireDefault(require_docPrologueRole());
    var _docPullquoteRole = _interopRequireDefault(require_docPullquoteRole());
    var _docQnaRole = _interopRequireDefault(require_docQnaRole());
    var _docSubtitleRole = _interopRequireDefault(require_docSubtitleRole());
    var _docTipRole = _interopRequireDefault(require_docTipRole());
    var _docTocRole = _interopRequireDefault(require_docTocRole());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagefooter", _docPagefooterRole.default], ["doc-pageheader", _docPageheaderRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
    var _default = exports.default = ariaDpubRoles;
  }
});

// node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js
var require_graphicsDocumentRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var graphicsDocumentRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        module: "GRAPHICS",
        concept: {
          name: "graphics-object"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "img"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "article"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]]
    };
    var _default = exports.default = graphicsDocumentRole;
  }
});

// node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js
var require_graphicsObjectRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var graphicsObjectRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        module: "GRAPHICS",
        concept: {
          name: "graphics-document"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "group"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "img"
        }
      }, {
        module: "GRAPHICS",
        concept: {
          name: "graphics-symbol"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]]
    };
    var _default = exports.default = graphicsObjectRole;
  }
});

// node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js
var require_graphicsSymbolRole = __commonJS({
  "node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var graphicsSymbolRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]]
    };
    var _default = exports.default = graphicsSymbolRole;
  }
});

// node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js
var require_ariaGraphicsRoles = __commonJS({
  "node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _graphicsDocumentRole = _interopRequireDefault(require_graphicsDocumentRole());
    var _graphicsObjectRole = _interopRequireDefault(require_graphicsObjectRole());
    var _graphicsSymbolRole = _interopRequireDefault(require_graphicsSymbolRole());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]];
    var _default = exports.default = ariaGraphicsRoles;
  }
});

// node_modules/aria-query/lib/rolesMap.js
var require_rolesMap = __commonJS({
  "node_modules/aria-query/lib/rolesMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _ariaAbstractRoles = _interopRequireDefault(require_ariaAbstractRoles());
    var _ariaLiteralRoles = _interopRequireDefault(require_ariaLiteralRoles());
    var _ariaDpubRoles = _interopRequireDefault(require_ariaDpubRoles());
    var _ariaGraphicsRoles = _interopRequireDefault(require_ariaGraphicsRoles());
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    function _createForOfIteratorHelper(r9, e15) {
      var t7 = "undefined" != typeof Symbol && r9[Symbol.iterator] || r9["@@iterator"];
      if (!t7) {
        if (Array.isArray(r9) || (t7 = _unsupportedIterableToArray(r9)) || e15 && r9 && "number" == typeof r9.length) {
          t7 && (r9 = t7);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n12() {
            return _n >= r9.length ? { done: true } : { done: false, value: r9[_n++] };
          }, e: function e16(r10) {
            throw r10;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o13, a5 = true, u8 = false;
      return { s: function s7() {
        t7 = t7.call(r9);
      }, n: function n12() {
        var r10 = t7.next();
        return a5 = r10.done, r10;
      }, e: function e16(r10) {
        u8 = true, o13 = r10;
      }, f: function f4() {
        try {
          a5 || null == t7.return || t7.return();
        } finally {
          if (u8) throw o13;
        }
      } };
    }
    function _slicedToArray(r9, e15) {
      return _arrayWithHoles(r9) || _iterableToArrayLimit(r9, e15) || _unsupportedIterableToArray(r9, e15) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r9, a5) {
      if (r9) {
        if ("string" == typeof r9) return _arrayLikeToArray(r9, a5);
        var t7 = {}.toString.call(r9).slice(8, -1);
        return "Object" === t7 && r9.constructor && (t7 = r9.constructor.name), "Map" === t7 || "Set" === t7 ? Array.from(r9) : "Arguments" === t7 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t7) ? _arrayLikeToArray(r9, a5) : void 0;
      }
    }
    function _arrayLikeToArray(r9, a5) {
      (null == a5 || a5 > r9.length) && (a5 = r9.length);
      for (var e15 = 0, n12 = Array(a5); e15 < a5; e15++) n12[e15] = r9[e15];
      return n12;
    }
    function _iterableToArrayLimit(r9, l4) {
      var t7 = null == r9 ? null : "undefined" != typeof Symbol && r9[Symbol.iterator] || r9["@@iterator"];
      if (null != t7) {
        var e15, n12, i10, u8, a5 = [], f4 = true, o13 = false;
        try {
          if (i10 = (t7 = t7.call(r9)).next, 0 === l4) {
            if (Object(t7) !== t7) return;
            f4 = false;
          } else for (; !(f4 = (e15 = i10.call(t7)).done) && (a5.push(e15.value), a5.length !== l4); f4 = true) ;
        } catch (r10) {
          o13 = true, n12 = r10;
        } finally {
          try {
            if (!f4 && null != t7.return && (u8 = t7.return(), Object(u8) !== u8)) return;
          } finally {
            if (o13) throw n12;
          }
        }
        return a5;
      }
    }
    function _arrayWithHoles(r9) {
      if (Array.isArray(r9)) return r9;
    }
    var roles2 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
    roles2.forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), roleDefinition = _ref2[1];
      var _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var superClassIter = _step.value;
          var _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
          try {
            var _loop = function _loop2() {
              var superClassName = _step2.value;
              var superClassRoleTuple = roles2.filter(function(_ref3) {
                var _ref4 = _slicedToArray(_ref3, 1), name = _ref4[0];
                return name === superClassName;
              })[0];
              if (superClassRoleTuple) {
                var superClassDefinition = superClassRoleTuple[1];
                for (var _i = 0, _Object$keys = Object.keys(superClassDefinition.props); _i < _Object$keys.length; _i++) {
                  var prop = _Object$keys[_i];
                  if (
                    // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                    !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)
                  ) {
                    roleDefinition.props[prop] = superClassDefinition.props[prop];
                  }
                }
              }
            };
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              _loop();
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    var rolesMap = {
      entries: function entries() {
        return roles2;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _iterator3 = _createForOfIteratorHelper(roles2), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], values = _step3$value[1];
            fn.call(thisArg, values, key, roles2);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      },
      get: function get(key) {
        var item = roles2.filter(function(tuple) {
          return tuple[0] === key ? true : false;
        })[0];
        return item && item[1];
      },
      has: function has(key) {
        return !!rolesMap.get(key);
      },
      keys: function keys() {
        return roles2.map(function(_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1), key = _ref6[0];
          return key;
        });
      },
      values: function values() {
        return roles2.map(function(_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2), values2 = _ref8[1];
          return values2;
        });
      }
    };
    var _default = exports.default = (0, _iterationDecorator.default)(rolesMap, rolesMap.entries());
  }
});

// node_modules/aria-query/lib/elementRoleMap.js
var require_elementRoleMap = __commonJS({
  "node_modules/aria-query/lib/elementRoleMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    var _rolesMap = _interopRequireDefault(require_rolesMap());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    function _slicedToArray(r9, e15) {
      return _arrayWithHoles(r9) || _iterableToArrayLimit(r9, e15) || _unsupportedIterableToArray(r9, e15) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r9, a5) {
      if (r9) {
        if ("string" == typeof r9) return _arrayLikeToArray(r9, a5);
        var t7 = {}.toString.call(r9).slice(8, -1);
        return "Object" === t7 && r9.constructor && (t7 = r9.constructor.name), "Map" === t7 || "Set" === t7 ? Array.from(r9) : "Arguments" === t7 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t7) ? _arrayLikeToArray(r9, a5) : void 0;
      }
    }
    function _arrayLikeToArray(r9, a5) {
      (null == a5 || a5 > r9.length) && (a5 = r9.length);
      for (var e15 = 0, n12 = Array(a5); e15 < a5; e15++) n12[e15] = r9[e15];
      return n12;
    }
    function _iterableToArrayLimit(r9, l4) {
      var t7 = null == r9 ? null : "undefined" != typeof Symbol && r9[Symbol.iterator] || r9["@@iterator"];
      if (null != t7) {
        var e15, n12, i11, u8, a5 = [], f4 = true, o13 = false;
        try {
          if (i11 = (t7 = t7.call(r9)).next, 0 === l4) {
            if (Object(t7) !== t7) return;
            f4 = false;
          } else for (; !(f4 = (e15 = i11.call(t7)).done) && (a5.push(e15.value), a5.length !== l4); f4 = true) ;
        } catch (r10) {
          o13 = true, n12 = r10;
        } finally {
          try {
            if (!f4 && null != t7.return && (u8 = t7.return(), Object(u8) !== u8)) return;
          } finally {
            if (o13) throw n12;
          }
        }
        return a5;
      }
    }
    function _arrayWithHoles(r9) {
      if (Array.isArray(r9)) return r9;
    }
    var elementRoles2 = [];
    var keys = _rolesMap.default.keys();
    for (i10 = 0; i10 < keys.length; i10++) {
      key = keys[i10];
      role = _rolesMap.default.get(key);
      if (role) {
        concepts = [].concat(role.baseConcepts, role.relatedConcepts);
        _loop = function _loop2() {
          var relation = concepts[k2];
          if (relation.module === "HTML") {
            var concept = relation.concept;
            if (concept) {
              var elementRoleRelation = elementRoles2.filter(function(relation2) {
                return ariaRoleRelationConceptEquals(relation2[0], concept);
              })[0];
              var roles2;
              if (elementRoleRelation) {
                roles2 = elementRoleRelation[1];
              } else {
                roles2 = [];
              }
              var isUnique = true;
              for (var _i = 0; _i < roles2.length; _i++) {
                if (roles2[_i] === key) {
                  isUnique = false;
                  break;
                }
              }
              if (isUnique) {
                roles2.push(key);
              }
              if (!elementRoleRelation) {
                elementRoles2.push([concept, roles2]);
              }
            }
          }
        };
        for (k2 = 0; k2 < concepts.length; k2++) {
          _loop();
        }
      }
    }
    var key;
    var role;
    var concepts;
    var _loop;
    var k2;
    var i10;
    var elementRoleMap = {
      entries: function entries() {
        return elementRoles2;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        for (var _i2 = 0, _elementRoles = elementRoles2; _i2 < _elementRoles.length; _i2++) {
          var _elementRoles$_i = _slicedToArray(_elementRoles[_i2], 2), _key = _elementRoles$_i[0], values = _elementRoles$_i[1];
          fn.call(thisArg, values, _key, elementRoles2);
        }
      },
      get: function get(key2) {
        var item = elementRoles2.filter(function(tuple) {
          return key2.name === tuple[0].name && ariaRoleRelationConceptAttributeEquals(key2.attributes, tuple[0].attributes);
        })[0];
        return item && item[1];
      },
      has: function has(key2) {
        return !!elementRoleMap.get(key2);
      },
      keys: function keys2() {
        return elementRoles2.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
          return key2;
        });
      },
      values: function values() {
        return elementRoles2.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    function ariaRoleRelationConceptEquals(a5, b4) {
      return a5.name === b4.name && ariaRoleRelationConstraintsEquals(a5.constraints, b4.constraints) && ariaRoleRelationConceptAttributeEquals(a5.attributes, b4.attributes);
    }
    function ariaRoleRelationConstraintsEquals(a5, b4) {
      if (a5 === void 0 && b4 !== void 0) {
        return false;
      }
      if (a5 !== void 0 && b4 === void 0) {
        return false;
      }
      if (a5 !== void 0 && b4 !== void 0) {
        if (a5.length !== b4.length) {
          return false;
        }
        for (var _i3 = 0; _i3 < a5.length; _i3++) {
          if (a5[_i3] !== b4[_i3]) {
            return false;
          }
        }
      }
      return true;
    }
    function ariaRoleRelationConceptAttributeEquals(a5, b4) {
      if (a5 === void 0 && b4 !== void 0) {
        return false;
      }
      if (a5 !== void 0 && b4 === void 0) {
        return false;
      }
      if (a5 !== void 0 && b4 !== void 0) {
        if (a5.length !== b4.length) {
          return false;
        }
        for (var _i4 = 0; _i4 < a5.length; _i4++) {
          if (a5[_i4].name !== b4[_i4].name || a5[_i4].value !== b4[_i4].value) {
            return false;
          }
          if (a5[_i4].constraints === void 0 && b4[_i4].constraints !== void 0) {
            return false;
          }
          if (a5[_i4].constraints !== void 0 && b4[_i4].constraints === void 0) {
            return false;
          }
          if (a5[_i4].constraints !== void 0 && b4[_i4].constraints !== void 0) {
            if (a5[_i4].constraints.length !== b4[_i4].constraints.length) {
              return false;
            }
            for (var j2 = 0; j2 < a5[_i4].constraints.length; j2++) {
              if (a5[_i4].constraints[j2] !== b4[_i4].constraints[j2]) {
                return false;
              }
            }
          }
        }
      }
      return true;
    }
    var _default = exports.default = (0, _iterationDecorator.default)(elementRoleMap, elementRoleMap.entries());
  }
});

// node_modules/aria-query/lib/roleElementMap.js
var require_roleElementMap = __commonJS({
  "node_modules/aria-query/lib/roleElementMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    var _rolesMap = _interopRequireDefault(require_rolesMap());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    function _slicedToArray(r9, e15) {
      return _arrayWithHoles(r9) || _iterableToArrayLimit(r9, e15) || _unsupportedIterableToArray(r9, e15) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r9, a5) {
      if (r9) {
        if ("string" == typeof r9) return _arrayLikeToArray(r9, a5);
        var t7 = {}.toString.call(r9).slice(8, -1);
        return "Object" === t7 && r9.constructor && (t7 = r9.constructor.name), "Map" === t7 || "Set" === t7 ? Array.from(r9) : "Arguments" === t7 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t7) ? _arrayLikeToArray(r9, a5) : void 0;
      }
    }
    function _arrayLikeToArray(r9, a5) {
      (null == a5 || a5 > r9.length) && (a5 = r9.length);
      for (var e15 = 0, n12 = Array(a5); e15 < a5; e15++) n12[e15] = r9[e15];
      return n12;
    }
    function _iterableToArrayLimit(r9, l4) {
      var t7 = null == r9 ? null : "undefined" != typeof Symbol && r9[Symbol.iterator] || r9["@@iterator"];
      if (null != t7) {
        var e15, n12, i11, u8, a5 = [], f4 = true, o13 = false;
        try {
          if (i11 = (t7 = t7.call(r9)).next, 0 === l4) {
            if (Object(t7) !== t7) return;
            f4 = false;
          } else for (; !(f4 = (e15 = i11.call(t7)).done) && (a5.push(e15.value), a5.length !== l4); f4 = true) ;
        } catch (r10) {
          o13 = true, n12 = r10;
        } finally {
          try {
            if (!f4 && null != t7.return && (u8 = t7.return(), Object(u8) !== u8)) return;
          } finally {
            if (o13) throw n12;
          }
        }
        return a5;
      }
    }
    function _arrayWithHoles(r9) {
      if (Array.isArray(r9)) return r9;
    }
    var roleElement = [];
    var keys = _rolesMap.default.keys();
    for (i10 = 0; i10 < keys.length; i10++) {
      key = keys[i10];
      role = _rolesMap.default.get(key);
      relationConcepts = [];
      if (role) {
        concepts = [].concat(role.baseConcepts, role.relatedConcepts);
        for (k2 = 0; k2 < concepts.length; k2++) {
          relation = concepts[k2];
          if (relation.module === "HTML") {
            concept = relation.concept;
            if (concept != null) {
              relationConcepts.push(concept);
            }
          }
        }
        if (relationConcepts.length > 0) {
          roleElement.push([key, relationConcepts]);
        }
      }
    }
    var key;
    var role;
    var relationConcepts;
    var concepts;
    var relation;
    var concept;
    var k2;
    var i10;
    var roleElementMap = {
      entries: function entries() {
        return roleElement;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        for (var _i = 0, _roleElement = roleElement; _i < _roleElement.length; _i++) {
          var _roleElement$_i = _slicedToArray(_roleElement[_i], 2), _key = _roleElement$_i[0], values = _roleElement$_i[1];
          fn.call(thisArg, values, _key, roleElement);
        }
      },
      get: function get(key2) {
        var item = roleElement.filter(function(tuple) {
          return tuple[0] === key2 ? true : false;
        })[0];
        return item && item[1];
      },
      has: function has(key2) {
        return !!roleElementMap.get(key2);
      },
      keys: function keys2() {
        return roleElement.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
          return key2;
        });
      },
      values: function values() {
        return roleElement.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = exports.default = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
  }
});

// node_modules/aria-query/lib/index.js
var require_lib = __commonJS({
  "node_modules/aria-query/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.roles = exports.roleElements = exports.elementRoles = exports.dom = exports.aria = void 0;
    var _ariaPropsMap = _interopRequireDefault(require_ariaPropsMap());
    var _domMap = _interopRequireDefault(require_domMap());
    var _rolesMap = _interopRequireDefault(require_rolesMap());
    var _elementRoleMap = _interopRequireDefault(require_elementRoleMap());
    var _roleElementMap = _interopRequireDefault(require_roleElementMap());
    function _interopRequireDefault(e15) {
      return e15 && e15.__esModule ? e15 : { default: e15 };
    }
    var aria = exports.aria = _ariaPropsMap.default;
    var dom = exports.dom = _domMap.default;
    var roles2 = exports.roles = _rolesMap.default;
    var elementRoles2 = exports.elementRoles = _elementRoleMap.default;
    var roleElements = exports.roleElements = _roleElementMap.default;
  }
});

// src/register.js
import React from "react";

// node_modules/@lit/react/create-component.js
var e = /* @__PURE__ */ new Set(["children", "localName", "ref", "style", "className"]);
var n = /* @__PURE__ */ new WeakMap();
var t = (e15, t7, o13, l4, a5) => {
  const s7 = a5?.[t7];
  void 0 === s7 ? (e15[t7] = o13, null == o13 && t7 in HTMLElement.prototype && e15.removeAttribute(t7)) : o13 !== l4 && ((e16, t8, o14) => {
    let l5 = n.get(e16);
    void 0 === l5 && n.set(e16, l5 = /* @__PURE__ */ new Map());
    let a6 = l5.get(t8);
    void 0 !== o14 ? void 0 === a6 ? (l5.set(t8, a6 = { handleEvent: o14 }), e16.addEventListener(t8, a6)) : a6.handleEvent = o14 : void 0 !== a6 && (l5.delete(t8), e16.removeEventListener(t8, a6));
  })(e15, s7, o13);
};
var o = ({ react: n12, tagName: o13, elementClass: l4, events: a5, displayName: s7 }) => {
  const c10 = new Set(Object.keys(a5 ?? {})), r9 = n12.forwardRef(((s8, r10) => {
    const i10 = n12.useRef(/* @__PURE__ */ new Map()), d6 = n12.useRef(null), f4 = {}, u8 = {};
    for (const [n13, t7] of Object.entries(s8)) e.has(n13) ? f4["className" === n13 ? "class" : n13] = t7 : c10.has(n13) || n13 in l4.prototype ? u8[n13] = t7 : f4[n13] = t7;
    return n12.useLayoutEffect((() => {
      if (null === d6.current) return;
      const e15 = /* @__PURE__ */ new Map();
      for (const n13 in u8) t(d6.current, n13, s8[n13], i10.current.get(n13), a5), i10.current.delete(n13), e15.set(n13, s8[n13]);
      for (const [e16, n13] of i10.current) t(d6.current, e16, void 0, n13, a5);
      i10.current = e15;
    })), n12.useLayoutEffect((() => {
      d6.current?.removeAttribute("defer-hydration");
    }), []), f4.suppressHydrationWarning = true, n12.createElement(o13, { ...f4, ref: n12.useCallback(((e15) => {
      d6.current = e15, "function" == typeof r10 ? r10(e15) : null !== r10 && (r10.current = e15);
    }), [r10]) });
  }));
  return r9.displayName = s7 ?? l4.name, r9;
};

// src/register.js
import { addons as addons2, types } from "storybook/manager-api";
import { AddonPanel } from "storybook/internal/components";

// node_modules/@lit/reactive-element/css-tag.js
var t2 = globalThis;
var e2 = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o2 = /* @__PURE__ */ new WeakMap();
var n2 = class {
  constructor(t7, e15, o13) {
    if (this._$cssResult$ = true, o13 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t7, this.t = e15;
  }
  get styleSheet() {
    let t7 = this.o;
    const s7 = this.t;
    if (e2 && void 0 === t7) {
      const e15 = void 0 !== s7 && 1 === s7.length;
      e15 && (t7 = o2.get(s7)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e15 && o2.set(s7, t7));
    }
    return t7;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t7) => new n2("string" == typeof t7 ? t7 : t7 + "", void 0, s);
var i = (t7, ...e15) => {
  const o13 = 1 === t7.length ? t7[0] : e15.reduce((e16, s7, o14) => e16 + ((t8) => {
    if (true === t8._$cssResult$) return t8.cssText;
    if ("number" == typeof t8) return t8;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s7) + t7[o14 + 1], t7[0]);
  return new n2(o13, t7, s);
};
var S = (s7, o13) => {
  if (e2) s7.adoptedStyleSheets = o13.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
  else for (const e15 of o13) {
    const o14 = document.createElement("style"), n12 = t2.litNonce;
    void 0 !== n12 && o14.setAttribute("nonce", n12), o14.textContent = e15.cssText, s7.appendChild(o14);
  }
};
var c = e2 ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
  let e15 = "";
  for (const s7 of t8.cssRules) e15 += s7.cssText;
  return r(e15);
})(t7) : t7;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e3, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o3, getPrototypeOf: n3 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t7, s7) => t7;
var u = { toAttribute(t7, s7) {
  switch (s7) {
    case Boolean:
      t7 = t7 ? l : null;
      break;
    case Object:
    case Array:
      t7 = null == t7 ? t7 : JSON.stringify(t7);
  }
  return t7;
}, fromAttribute(t7, s7) {
  let i10 = t7;
  switch (s7) {
    case Boolean:
      i10 = null !== t7;
      break;
    case Number:
      i10 = null === t7 ? null : Number(t7);
      break;
    case Object:
    case Array:
      try {
        i10 = JSON.parse(t7);
      } catch (t8) {
        i10 = null;
      }
  }
  return i10;
} };
var f = (t7, s7) => !i2(t7, s7);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t7) {
    this._$Ei(), (this.l ??= []).push(t7);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t7, s7 = b) {
    if (s7.state && (s7.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s7 = Object.create(s7)).wrapped = true), this.elementProperties.set(t7, s7), !s7.noAccessor) {
      const i10 = Symbol(), h6 = this.getPropertyDescriptor(t7, i10, s7);
      void 0 !== h6 && e3(this.prototype, t7, h6);
    }
  }
  static getPropertyDescriptor(t7, s7, i10) {
    const { get: e15, set: r9 } = h(this.prototype, t7) ?? { get() {
      return this[s7];
    }, set(t8) {
      this[s7] = t8;
    } };
    return { get: e15, set(s8) {
      const h6 = e15?.call(this);
      r9?.call(this, s8), this.requestUpdate(t7, h6, i10);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t7) {
    return this.elementProperties.get(t7) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t7 = n3(this);
    t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t8 = this.properties, s7 = [...r2(t8), ...o3(t8)];
      for (const i10 of s7) this.createProperty(i10, t8[i10]);
    }
    const t7 = this[Symbol.metadata];
    if (null !== t7) {
      const s7 = litPropertyMetadata.get(t7);
      if (void 0 !== s7) for (const [t8, i10] of s7) this.elementProperties.set(t8, i10);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t8, s7] of this.elementProperties) {
      const i10 = this._$Eu(t8, s7);
      void 0 !== i10 && this._$Eh.set(i10, t8);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s7) {
    const i10 = [];
    if (Array.isArray(s7)) {
      const e15 = new Set(s7.flat(1 / 0).reverse());
      for (const s8 of e15) i10.unshift(c(s8));
    } else void 0 !== s7 && i10.push(c(s7));
    return i10;
  }
  static _$Eu(t7, s7) {
    const i10 = s7.attribute;
    return false === i10 ? void 0 : "string" == typeof i10 ? i10 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
  }
  addController(t7) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
  }
  removeController(t7) {
    this._$EO?.delete(t7);
  }
  _$E_() {
    const t7 = /* @__PURE__ */ new Map(), s7 = this.constructor.elementProperties;
    for (const i10 of s7.keys()) this.hasOwnProperty(i10) && (t7.set(i10, this[i10]), delete this[i10]);
    t7.size > 0 && (this._$Ep = t7);
  }
  createRenderRoot() {
    const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t7, this.constructor.elementStyles), t7;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
  }
  enableUpdating(t7) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t7) => t7.hostDisconnected?.());
  }
  attributeChangedCallback(t7, s7, i10) {
    this._$AK(t7, i10);
  }
  _$ET(t7, s7) {
    const i10 = this.constructor.elementProperties.get(t7), e15 = this.constructor._$Eu(t7, i10);
    if (void 0 !== e15 && true === i10.reflect) {
      const h6 = (void 0 !== i10.converter?.toAttribute ? i10.converter : u).toAttribute(s7, i10.type);
      this._$Em = t7, null == h6 ? this.removeAttribute(e15) : this.setAttribute(e15, h6), this._$Em = null;
    }
  }
  _$AK(t7, s7) {
    const i10 = this.constructor, e15 = i10._$Eh.get(t7);
    if (void 0 !== e15 && this._$Em !== e15) {
      const t8 = i10.getPropertyOptions(e15), h6 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
      this._$Em = e15;
      const r9 = h6.fromAttribute(s7, t8.type);
      this[e15] = r9 ?? this._$Ej?.get(e15) ?? r9, this._$Em = null;
    }
  }
  requestUpdate(t7, s7, i10, e15 = false, h6) {
    if (void 0 !== t7) {
      const r9 = this.constructor;
      if (false === e15 && (h6 = this[t7]), i10 ??= r9.getPropertyOptions(t7), !((i10.hasChanged ?? f)(h6, s7) || i10.useDefault && i10.reflect && h6 === this._$Ej?.get(t7) && !this.hasAttribute(r9._$Eu(t7, i10)))) return;
      this.C(t7, s7, i10);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t7, s7, { useDefault: i10, reflect: e15, wrapped: h6 }, r9) {
    i10 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, r9 ?? s7 ?? this[t7]), true !== h6 || void 0 !== r9) || (this._$AL.has(t7) || (this.hasUpdated || i10 || (s7 = void 0), this._$AL.set(t7, s7)), true === e15 && this._$Em !== t7 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t7));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t8) {
      Promise.reject(t8);
    }
    const t7 = this.scheduleUpdate();
    return null != t7 && await t7, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t9, s8] of this._$Ep) this[t9] = s8;
        this._$Ep = void 0;
      }
      const t8 = this.constructor.elementProperties;
      if (t8.size > 0) for (const [s8, i10] of t8) {
        const { wrapped: t9 } = i10, e15 = this[s8];
        true !== t9 || this._$AL.has(s8) || void 0 === e15 || this.C(s8, void 0, i10, e15);
      }
    }
    let t7 = false;
    const s7 = this._$AL;
    try {
      t7 = this.shouldUpdate(s7), t7 ? (this.willUpdate(s7), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s7)) : this._$EM();
    } catch (s8) {
      throw t7 = false, this._$EM(), s8;
    }
    t7 && this._$AE(s7);
  }
  willUpdate(t7) {
  }
  _$AE(t7) {
    this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t7) {
    return true;
  }
  update(t7) {
    this._$Eq &&= this._$Eq.forEach((t8) => this._$ET(t8, this[t8])), this._$EM();
  }
  updated(t7) {
  }
  firstUpdated(t7) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t3 = globalThis;
var i3 = (t7) => t7;
var s2 = t3.trustedTypes;
var e4 = s2 ? s2.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
var h2 = "$lit$";
var o4 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n4 = "?" + o4;
var r3 = `<${n4}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
var u2 = Array.isArray;
var d2 = (t7) => u2(t7) || "function" == typeof t7?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t7) => (i10, ...s7) => ({ _$litType$: t7, strings: i10, values: s7 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t7, i10) {
  if (!u2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e4 ? e4.createHTML(i10) : i10;
}
var N = (t7, i10) => {
  const s7 = t7.length - 1, e15 = [];
  let n12, l4 = 2 === i10 ? "<svg>" : 3 === i10 ? "<math>" : "", c10 = v;
  for (let i11 = 0; i11 < s7; i11++) {
    const s8 = t7[i11];
    let a5, u8, d6 = -1, f4 = 0;
    for (; f4 < s8.length && (c10.lastIndex = f4, u8 = c10.exec(s8), null !== u8); ) f4 = c10.lastIndex, c10 === v ? "!--" === u8[1] ? c10 = _ : void 0 !== u8[1] ? c10 = m : void 0 !== u8[2] ? (y2.test(u8[2]) && (n12 = RegExp("</" + u8[2], "g")), c10 = p2) : void 0 !== u8[3] && (c10 = p2) : c10 === p2 ? ">" === u8[0] ? (c10 = n12 ?? v, d6 = -1) : void 0 === u8[1] ? d6 = -2 : (d6 = c10.lastIndex - u8[2].length, a5 = u8[1], c10 = void 0 === u8[3] ? p2 : '"' === u8[3] ? $ : g) : c10 === $ || c10 === g ? c10 = p2 : c10 === _ || c10 === m ? c10 = v : (c10 = p2, n12 = void 0);
    const x2 = c10 === p2 && t7[i11 + 1].startsWith("/>") ? " " : "";
    l4 += c10 === v ? s8 + r3 : d6 >= 0 ? (e15.push(a5), s8.slice(0, d6) + h2 + s8.slice(d6) + o4 + x2) : s8 + o4 + (-2 === d6 ? i11 : x2);
  }
  return [V(t7, l4 + (t7[s7] || "<?>") + (2 === i10 ? "</svg>" : 3 === i10 ? "</math>" : "")), e15];
};
var S2 = class _S {
  constructor({ strings: t7, _$litType$: i10 }, e15) {
    let r9;
    this.parts = [];
    let l4 = 0, a5 = 0;
    const u8 = t7.length - 1, d6 = this.parts, [f4, v3] = N(t7, i10);
    if (this.el = _S.createElement(f4, e15), P.currentNode = this.el.content, 2 === i10 || 3 === i10) {
      const t8 = this.el.content.firstChild;
      t8.replaceWith(...t8.childNodes);
    }
    for (; null !== (r9 = P.nextNode()) && d6.length < u8; ) {
      if (1 === r9.nodeType) {
        if (r9.hasAttributes()) for (const t8 of r9.getAttributeNames()) if (t8.endsWith(h2)) {
          const i11 = v3[a5++], s7 = r9.getAttribute(t8).split(o4), e16 = /([.?@])?(.*)/.exec(i11);
          d6.push({ type: 1, index: l4, name: e16[2], strings: s7, ctor: "." === e16[1] ? I : "?" === e16[1] ? L : "@" === e16[1] ? z : H }), r9.removeAttribute(t8);
        } else t8.startsWith(o4) && (d6.push({ type: 6, index: l4 }), r9.removeAttribute(t8));
        if (y2.test(r9.tagName)) {
          const t8 = r9.textContent.split(o4), i11 = t8.length - 1;
          if (i11 > 0) {
            r9.textContent = s2 ? s2.emptyScript : "";
            for (let s7 = 0; s7 < i11; s7++) r9.append(t8[s7], c3()), P.nextNode(), d6.push({ type: 2, index: ++l4 });
            r9.append(t8[i11], c3());
          }
        }
      } else if (8 === r9.nodeType) if (r9.data === n4) d6.push({ type: 2, index: l4 });
      else {
        let t8 = -1;
        for (; -1 !== (t8 = r9.data.indexOf(o4, t8 + 1)); ) d6.push({ type: 7, index: l4 }), t8 += o4.length - 1;
      }
      l4++;
    }
  }
  static createElement(t7, i10) {
    const s7 = l2.createElement("template");
    return s7.innerHTML = t7, s7;
  }
};
function M(t7, i10, s7 = t7, e15) {
  if (i10 === E) return i10;
  let h6 = void 0 !== e15 ? s7._$Co?.[e15] : s7._$Cl;
  const o13 = a2(i10) ? void 0 : i10._$litDirective$;
  return h6?.constructor !== o13 && (h6?._$AO?.(false), void 0 === o13 ? h6 = void 0 : (h6 = new o13(t7), h6._$AT(t7, s7, e15)), void 0 !== e15 ? (s7._$Co ??= [])[e15] = h6 : s7._$Cl = h6), void 0 !== h6 && (i10 = M(t7, h6._$AS(t7, i10.values), h6, e15)), i10;
}
var R = class {
  constructor(t7, i10) {
    this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i10;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t7) {
    const { el: { content: i10 }, parts: s7 } = this._$AD, e15 = (t7?.creationScope ?? l2).importNode(i10, true);
    P.currentNode = e15;
    let h6 = P.nextNode(), o13 = 0, n12 = 0, r9 = s7[0];
    for (; void 0 !== r9; ) {
      if (o13 === r9.index) {
        let i11;
        2 === r9.type ? i11 = new k(h6, h6.nextSibling, this, t7) : 1 === r9.type ? i11 = new r9.ctor(h6, r9.name, r9.strings, this, t7) : 6 === r9.type && (i11 = new Z(h6, this, t7)), this._$AV.push(i11), r9 = s7[++n12];
      }
      o13 !== r9?.index && (h6 = P.nextNode(), o13++);
    }
    return P.currentNode = l2, e15;
  }
  p(t7) {
    let i10 = 0;
    for (const s7 of this._$AV) void 0 !== s7 && (void 0 !== s7.strings ? (s7._$AI(t7, s7, i10), i10 += s7.strings.length - 2) : s7._$AI(t7[i10])), i10++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t7, i10, s7, e15) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t7, this._$AB = i10, this._$AM = s7, this.options = e15, this._$Cv = e15?.isConnected ?? true;
  }
  get parentNode() {
    let t7 = this._$AA.parentNode;
    const i10 = this._$AM;
    return void 0 !== i10 && 11 === t7?.nodeType && (t7 = i10.parentNode), t7;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t7, i10 = this) {
    t7 = M(this, t7, i10), a2(t7) ? t7 === A || null == t7 || "" === t7 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t7 !== this._$AH && t7 !== E && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : d2(t7) ? this.k(t7) : this._(t7);
  }
  O(t7) {
    return this._$AA.parentNode.insertBefore(t7, this._$AB);
  }
  T(t7) {
    this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
  }
  _(t7) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(l2.createTextNode(t7)), this._$AH = t7;
  }
  $(t7) {
    const { values: i10, _$litType$: s7 } = t7, e15 = "number" == typeof s7 ? this._$AC(t7) : (void 0 === s7.el && (s7.el = S2.createElement(V(s7.h, s7.h[0]), this.options)), s7);
    if (this._$AH?._$AD === e15) this._$AH.p(i10);
    else {
      const t8 = new R(e15, this), s8 = t8.u(this.options);
      t8.p(i10), this.T(s8), this._$AH = t8;
    }
  }
  _$AC(t7) {
    let i10 = C.get(t7.strings);
    return void 0 === i10 && C.set(t7.strings, i10 = new S2(t7)), i10;
  }
  k(t7) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i10 = this._$AH;
    let s7, e15 = 0;
    for (const h6 of t7) e15 === i10.length ? i10.push(s7 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s7 = i10[e15], s7._$AI(h6), e15++;
    e15 < i10.length && (this._$AR(s7 && s7._$AB.nextSibling, e15), i10.length = e15);
  }
  _$AR(t7 = this._$AA.nextSibling, s7) {
    for (this._$AP?.(false, true, s7); t7 !== this._$AB; ) {
      const s8 = i3(t7).nextSibling;
      i3(t7).remove(), t7 = s8;
    }
  }
  setConnected(t7) {
    void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t7, i10, s7, e15, h6) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t7, this.name = i10, this._$AM = e15, this.options = h6, s7.length > 2 || "" !== s7[0] || "" !== s7[1] ? (this._$AH = Array(s7.length - 1).fill(new String()), this.strings = s7) : this._$AH = A;
  }
  _$AI(t7, i10 = this, s7, e15) {
    const h6 = this.strings;
    let o13 = false;
    if (void 0 === h6) t7 = M(this, t7, i10, 0), o13 = !a2(t7) || t7 !== this._$AH && t7 !== E, o13 && (this._$AH = t7);
    else {
      const e16 = t7;
      let n12, r9;
      for (t7 = h6[0], n12 = 0; n12 < h6.length - 1; n12++) r9 = M(this, e16[s7 + n12], i10, n12), r9 === E && (r9 = this._$AH[n12]), o13 ||= !a2(r9) || r9 !== this._$AH[n12], r9 === A ? t7 = A : t7 !== A && (t7 += (r9 ?? "") + h6[n12 + 1]), this._$AH[n12] = r9;
    }
    o13 && !e15 && this.j(t7);
  }
  j(t7) {
    t7 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t7) {
    this.element[this.name] = t7 === A ? void 0 : t7;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t7) {
    this.element.toggleAttribute(this.name, !!t7 && t7 !== A);
  }
};
var z = class extends H {
  constructor(t7, i10, s7, e15, h6) {
    super(t7, i10, s7, e15, h6), this.type = 5;
  }
  _$AI(t7, i10 = this) {
    if ((t7 = M(this, t7, i10, 0) ?? A) === E) return;
    const s7 = this._$AH, e15 = t7 === A && s7 !== A || t7.capture !== s7.capture || t7.once !== s7.once || t7.passive !== s7.passive, h6 = t7 !== A && (s7 === A || e15);
    e15 && this.element.removeEventListener(this.name, this, s7), h6 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
  }
  handleEvent(t7) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
  }
};
var Z = class {
  constructor(t7, i10, s7) {
    this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s7;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t7) {
    M(this, t7);
  }
};
var j = { M: h2, P: o4, A: n4, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
var B = t3.litHtmlPolyfillSupport;
B?.(S2, k), (t3.litHtmlVersions ??= []).push("3.3.2");
var D = (t7, i10, s7) => {
  const e15 = s7?.renderBefore ?? i10;
  let h6 = e15._$litPart$;
  if (void 0 === h6) {
    const t8 = s7?.renderBefore ?? null;
    e15._$litPart$ = h6 = new k(i10.insertBefore(c3(), t8), t8, void 0, s7 ?? {});
  }
  return h6._$AI(t7), h6;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t7 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t7.firstChild, t7;
  }
  update(t7) {
    const r9 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = D(r9, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o5 = s3.litElementPolyfillSupport;
o5?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// src/components/screen-reader-panel.js
import { addons } from "storybook/manager-api";
import { STORY_CHANGED } from "storybook/internal/core-events";

// node_modules/@spectrum-web-components/base/src/version.js
var version = "0.42.5";

// node_modules/@spectrum-web-components/base/src/Base.js
var c4 = /* @__PURE__ */ new Set();
var g2 = () => {
  const s7 = document.documentElement.dir === "rtl" ? document.documentElement.dir : "ltr";
  c4.forEach((o13) => {
    o13.setAttribute("dir", s7);
  });
};
var w2 = new MutationObserver(g2);
w2.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
var p3 = (s7) => typeof s7.startManagingContentDirection != "undefined" || s7.tagName === "SP-THEME";
function SpectrumMixin(s7) {
  class o13 extends s7 {
    get isLTR() {
      return this.dir === "ltr";
    }
    hasVisibleFocusInTree() {
      const n12 = ((r9 = document) => {
        var l4;
        let t7 = r9.activeElement;
        for (; t7 != null && t7.shadowRoot && t7.shadowRoot.activeElement; ) t7 = t7.shadowRoot.activeElement;
        const a5 = t7 ? [t7] : [];
        for (; t7; ) {
          const i10 = t7.assignedSlot || t7.parentElement || ((l4 = t7.getRootNode()) == null ? void 0 : l4.host);
          i10 && a5.push(i10), t7 = i10;
        }
        return a5;
      })(this.getRootNode())[0];
      if (!n12) return false;
      try {
        return n12.matches(":focus-visible") || n12.matches(".focus-visible");
      } catch (r9) {
        return n12.matches(".focus-visible");
      }
    }
    connectedCallback() {
      if (!this.hasAttribute("dir")) {
        let e15 = this.assignedSlot || this.parentNode;
        for (; e15 !== document.documentElement && !p3(e15); ) e15 = e15.assignedSlot || e15.parentNode || e15.host;
        if (this.dir = e15.dir === "rtl" ? e15.dir : this.dir || "ltr", e15 === document.documentElement) c4.add(this);
        else {
          const { localName: n12 } = e15;
          n12.search("-") > -1 && !customElements.get(n12) ? customElements.whenDefined(n12).then(() => {
            e15.startManagingContentDirection(this);
          }) : e15.startManagingContentDirection(this);
        }
        this._dirParent = e15;
      }
      super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._dirParent && (this._dirParent === document.documentElement ? c4.delete(this) : this._dirParent.stopManagingContentDirection(this), this.removeAttribute("dir"));
    }
  }
  return o13;
}
var SpectrumElement = class extends SpectrumMixin(i4) {
};
SpectrumElement.VERSION = version;

// node_modules/@lit/reactive-element/decorators/property.js
var o6 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t7 = o6, e15, r9) => {
  const { kind: n12, metadata: i10 } = r9;
  let s7 = globalThis.litPropertyMetadata.get(i10);
  if (void 0 === s7 && globalThis.litPropertyMetadata.set(i10, s7 = /* @__PURE__ */ new Map()), "setter" === n12 && ((t7 = Object.create(t7)).wrapped = true), s7.set(r9.name, t7), "accessor" === n12) {
    const { name: o13 } = r9;
    return { set(r10) {
      const n13 = e15.get.call(this);
      e15.set.call(this, r10), this.requestUpdate(o13, n13, t7, true, r10);
    }, init(e16) {
      return void 0 !== e16 && this.C(o13, void 0, t7, e16), e16;
    } };
  }
  if ("setter" === n12) {
    const { name: o13 } = r9;
    return function(r10) {
      const n13 = this[o13];
      e15.call(this, r10), this.requestUpdate(o13, n13, t7, true, r10);
    };
  }
  throw Error("Unsupported decorator location: " + n12);
};
function n5(t7) {
  return (e15, o13) => "object" == typeof o13 ? r4(t7, e15, o13) : ((t8, e16, o14) => {
    const r9 = e16.hasOwnProperty(o14);
    return e16.constructor.createProperty(o14, t8), r9 ? Object.getOwnPropertyDescriptor(e16, o14) : void 0;
  })(t7, e15, o13);
}

// node_modules/@lit/reactive-element/decorators/base.js
var e5 = (e15, t7, c10) => (c10.configurable = true, c10.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e15, t7, c10), c10);

// node_modules/@lit/reactive-element/decorators/query.js
function e6(e15, r9) {
  return (n12, s7, i10) => {
    const o13 = (t7) => t7.renderRoot?.querySelector(e15) ?? null;
    if (r9) {
      const { get: e16, set: r10 } = "object" == typeof s7 ? n12 : i10 ?? (() => {
        const t7 = Symbol();
        return { get() {
          return this[t7];
        }, set(e17) {
          this[t7] = e17;
        } };
      })();
      return e5(n12, s7, { get() {
        let t7 = e16.call(this);
        return void 0 === t7 && (t7 = o13(this), (null !== t7 || this.hasUpdated) && r10.call(this, t7)), t7;
      } });
    }
    return e5(n12, s7, { get() {
      return o13(this);
    } });
  };
}

// node_modules/@spectrum-web-components/base/src/sizedMixin.js
var a3 = Object.defineProperty;
var u3 = Object.getOwnPropertyDescriptor;
var m2 = (r9, i10, s7, t7) => {
  for (var e15 = t7 > 1 ? void 0 : t7 ? u3(i10, s7) : i10, l4 = r9.length - 1, o13; l4 >= 0; l4--) (o13 = r9[l4]) && (e15 = (t7 ? o13(i10, s7, e15) : o13(e15)) || e15);
  return t7 && e15 && a3(i10, s7, e15), e15;
};
function SizedMixin(r9, { validSizes: i10 = ["s", "m", "l", "xl"], noDefaultSize: s7, defaultSize: t7 = "m" } = {}) {
  class e15 extends r9 {
    constructor() {
      super(...arguments);
      this._size = t7;
    }
    get size() {
      return this._size || t7;
    }
    set size(n12) {
      const p8 = s7 ? null : t7, z2 = n12 && n12.toLocaleLowerCase(), x2 = i10.includes(z2) ? z2 : p8;
      if (x2 && this.setAttribute("size", x2), this._size === x2) return;
      const c10 = this._size;
      this._size = x2, this.requestUpdate("size", c10);
    }
    update(n12) {
      !this.hasAttribute("size") && !s7 && this.setAttribute("size", this.size), super.update(n12);
    }
  }
  return m2([n5({ type: String })], e15.prototype, "size", 1), e15;
}

// node_modules/@spectrum-web-components/shared/src/focus-visible.js
var i5 = true;
try {
  document.body.querySelector(":focus-visible");
} catch (a5) {
  i5 = false, Promise.resolve().then(() => __toESM(require_focus_visible(), 1));
}
var FocusVisiblePolyfillMixin = (a5) => {
  var s7, t7;
  const n12 = (l4) => {
    if (l4.shadowRoot == null || l4.hasAttribute("data-js-focus-visible")) return () => {
    };
    if (self.applyFocusVisiblePolyfill) self.applyFocusVisiblePolyfill(l4.shadowRoot), l4.manageAutoFocus && l4.manageAutoFocus();
    else {
      const e15 = () => {
        self.applyFocusVisiblePolyfill && l4.shadowRoot && self.applyFocusVisiblePolyfill(l4.shadowRoot), l4.manageAutoFocus && l4.manageAutoFocus();
      };
      return self.addEventListener("focus-visible-polyfill-ready", e15, { once: true }), () => {
        self.removeEventListener("focus-visible-polyfill-ready", e15);
      };
    }
    return () => {
    };
  }, o13 = Symbol("endPolyfillCoordination");
  class c10 extends (t7 = a5, s7 = o13, t7) {
    constructor() {
      super(...arguments);
      this[s7] = null;
    }
    connectedCallback() {
      super.connectedCallback && super.connectedCallback(), i5 || requestAnimationFrame(() => {
        this[o13] == null && (this[o13] = n12(this));
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback(), i5 || requestAnimationFrame(() => {
        this[o13] != null && (this[o13](), this[o13] = null);
      });
    }
  }
  return c10;
};

// node_modules/@spectrum-web-components/shared/src/focusable.js
var d3 = Object.defineProperty;
var b3 = Object.getOwnPropertyDescriptor;
var n6 = (s7, a5, e15, t7) => {
  for (var i10 = t7 > 1 ? void 0 : t7 ? b3(a5, e15) : a5, o13 = s7.length - 1, r9; o13 >= 0; o13--) (r9 = s7[o13]) && (i10 = (t7 ? r9(a5, e15, i10) : r9(i10)) || i10);
  return t7 && i10 && d3(a5, e15, i10), i10;
};
function u4() {
  return new Promise((s7) => requestAnimationFrame(() => s7()));
}
var Focusable = class extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.autofocus = false;
    this._tabIndex = 0;
    this.manipulatingTabindex = false;
    this.autofocusReady = Promise.resolve();
  }
  get tabIndex() {
    if (this.focusElement === this) {
      const t7 = this.hasAttribute("tabindex") ? Number(this.getAttribute("tabindex")) : NaN;
      return isNaN(t7) ? -1 : t7;
    }
    const e15 = parseFloat(this.hasAttribute("tabindex") && this.getAttribute("tabindex") || "0");
    return this.disabled || e15 < 0 ? -1 : this.focusElement ? this.focusElement.tabIndex : e15;
  }
  set tabIndex(e15) {
    if (this.manipulatingTabindex) {
      this.manipulatingTabindex = false;
      return;
    }
    if (this.focusElement === this) {
      if (e15 !== this._tabIndex) {
        this._tabIndex = e15;
        const t7 = this.disabled ? "-1" : "" + e15;
        this.manipulatingTabindex = true, this.setAttribute("tabindex", t7);
      }
      return;
    }
    if (e15 === -1 ? this.addEventListener("pointerdown", this.onPointerdownManagementOfTabIndex) : (this.manipulatingTabindex = true, this.removeEventListener("pointerdown", this.onPointerdownManagementOfTabIndex)), e15 === -1 || this.disabled) {
      this.setAttribute("tabindex", "-1"), this.removeAttribute("focusable"), e15 !== -1 && this.manageFocusElementTabindex(e15);
      return;
    }
    this.setAttribute("focusable", ""), this.hasAttribute("tabindex") ? this.removeAttribute("tabindex") : this.manipulatingTabindex = false, this.manageFocusElementTabindex(e15);
  }
  onPointerdownManagementOfTabIndex() {
    this.tabIndex === -1 && setTimeout(() => {
      this.tabIndex = 0, this.focus({ preventScroll: true }), this.tabIndex = -1;
    });
  }
  async manageFocusElementTabindex(e15) {
    this.focusElement || await this.updateComplete, e15 === null ? this.focusElement.removeAttribute("tabindex") : this.focusElement.tabIndex = e15;
  }
  get focusElement() {
    throw new Error("Must implement focusElement getter!");
  }
  focus(e15) {
    this.disabled || !this.focusElement || (this.focusElement !== this ? this.focusElement.focus(e15) : HTMLElement.prototype.focus.apply(this, [e15]));
  }
  blur() {
    const e15 = this.focusElement || this;
    e15 !== this ? e15.blur() : HTMLElement.prototype.blur.apply(this);
  }
  click() {
    if (this.disabled) return;
    const e15 = this.focusElement || this;
    e15 !== this ? e15.click() : HTMLElement.prototype.click.apply(this);
  }
  manageAutoFocus() {
    this.autofocus && (this.dispatchEvent(new KeyboardEvent("keydown", { code: "Tab" })), this.focusElement.focus());
  }
  firstUpdated(e15) {
    super.firstUpdated(e15), (!this.hasAttribute("tabindex") || this.getAttribute("tabindex") !== "-1") && this.setAttribute("focusable", "");
  }
  update(e15) {
    e15.has("disabled") && this.handleDisabledChanged(this.disabled, e15.get("disabled")), super.update(e15);
  }
  updated(e15) {
    super.updated(e15), e15.has("disabled") && this.disabled && this.blur();
  }
  async handleDisabledChanged(e15, t7) {
    const i10 = () => this.focusElement !== this && typeof this.focusElement.disabled != "undefined";
    e15 ? (this.manipulatingTabindex = true, this.setAttribute("tabindex", "-1"), await this.updateComplete, i10() ? this.focusElement.disabled = true : this.setAttribute("aria-disabled", "true")) : t7 && (this.manipulatingTabindex = true, this.focusElement === this ? this.setAttribute("tabindex", "" + this._tabIndex) : this.removeAttribute("tabindex"), await this.updateComplete, i10() ? this.focusElement.disabled = false : this.removeAttribute("aria-disabled"));
  }
  async getUpdateComplete() {
    const e15 = await super.getUpdateComplete();
    return await this.autofocusReady, e15;
  }
  connectedCallback() {
    super.connectedCallback(), this.autofocus && (this.autofocusReady = new Promise(async (e15) => {
      await u4(), await u4(), e15();
    }), this.updateComplete.then(() => {
      this.manageAutoFocus();
    }));
  }
};
n6([n5({ type: Boolean, reflect: true })], Focusable.prototype, "disabled", 2), n6([n5({ type: Boolean })], Focusable.prototype, "autofocus", 2), n6([n5({ type: Number })], Focusable.prototype, "tabIndex", 1);

// node_modules/lit-html/directives/if-defined.js
var o7 = (o13) => o13 ?? A;

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t7) => (...e15) => ({ _$litDirective$: t7, values: e15 });
var i6 = class {
  constructor(t7) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t7, e15, i10) {
    this._$Ct = t7, this._$AM = e15, this._$Ci = i10;
  }
  _$AS(t7, e15) {
    return this.update(t7, e15);
  }
  update(t7, e15) {
    return this.render(...e15);
  }
};

// node_modules/lit-html/directive-helpers.js
var { I: t5 } = j;
var i7 = (o13) => o13;
var n7 = (o13) => null === o13 || "object" != typeof o13 && "function" != typeof o13;
var r5 = (o13) => void 0 === o13.strings;
var s4 = () => document.createComment("");
var v2 = (o13, n12, e15) => {
  const l4 = o13._$AA.parentNode, d6 = void 0 === n12 ? o13._$AB : n12._$AA;
  if (void 0 === e15) {
    const i10 = l4.insertBefore(s4(), d6), n13 = l4.insertBefore(s4(), d6);
    e15 = new t5(i10, n13, o13, o13.options);
  } else {
    const t7 = e15._$AB.nextSibling, n13 = e15._$AM, c10 = n13 !== o13;
    if (c10) {
      let t8;
      e15._$AQ?.(o13), e15._$AM = o13, void 0 !== e15._$AP && (t8 = o13._$AU) !== n13._$AU && e15._$AP(t8);
    }
    if (t7 !== d6 || c10) {
      let o14 = e15._$AA;
      for (; o14 !== t7; ) {
        const t8 = i7(o14).nextSibling;
        i7(l4).insertBefore(o14, d6), o14 = t8;
      }
    }
  }
  return e15;
};
var u5 = (o13, t7, i10 = o13) => (o13._$AI(t7, i10), o13);
var m3 = {};
var p4 = (o13, t7 = m3) => o13._$AH = t7;
var M2 = (o13) => o13._$AH;
var h3 = (o13) => {
  o13._$AR(), o13._$AA.remove();
};

// node_modules/lit-html/directives/repeat.js
var u6 = (e15, s7, t7) => {
  const r9 = /* @__PURE__ */ new Map();
  for (let l4 = s7; l4 <= t7; l4++) r9.set(e15[l4], l4);
  return r9;
};
var c5 = e7(class extends i6 {
  constructor(e15) {
    if (super(e15), e15.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e15, s7, t7) {
    let r9;
    void 0 === t7 ? t7 = s7 : void 0 !== s7 && (r9 = s7);
    const l4 = [], o13 = [];
    let i10 = 0;
    for (const s8 of e15) l4[i10] = r9 ? r9(s8, i10) : i10, o13[i10] = t7(s8, i10), i10++;
    return { values: o13, keys: l4 };
  }
  render(e15, s7, t7) {
    return this.dt(e15, s7, t7).values;
  }
  update(s7, [t7, r9, c10]) {
    const d6 = M2(s7), { values: p8, keys: a5 } = this.dt(t7, r9, c10);
    if (!Array.isArray(d6)) return this.ut = a5, p8;
    const h6 = this.ut ??= [], v3 = [];
    let m5, y3, x2 = 0, j2 = d6.length - 1, k2 = 0, w3 = p8.length - 1;
    for (; x2 <= j2 && k2 <= w3; ) if (null === d6[x2]) x2++;
    else if (null === d6[j2]) j2--;
    else if (h6[x2] === a5[k2]) v3[k2] = u5(d6[x2], p8[k2]), x2++, k2++;
    else if (h6[j2] === a5[w3]) v3[w3] = u5(d6[j2], p8[w3]), j2--, w3--;
    else if (h6[x2] === a5[w3]) v3[w3] = u5(d6[x2], p8[w3]), v2(s7, v3[w3 + 1], d6[x2]), x2++, w3--;
    else if (h6[j2] === a5[k2]) v3[k2] = u5(d6[j2], p8[k2]), v2(s7, d6[x2], d6[j2]), j2--, k2++;
    else if (void 0 === m5 && (m5 = u6(a5, k2, w3), y3 = u6(h6, x2, j2)), m5.has(h6[x2])) if (m5.has(h6[j2])) {
      const e15 = y3.get(a5[k2]), t8 = void 0 !== e15 ? d6[e15] : null;
      if (null === t8) {
        const e16 = v2(s7, d6[x2]);
        u5(e16, p8[k2]), v3[k2] = e16;
      } else v3[k2] = u5(t8, p8[k2]), v2(s7, d6[x2], t8), d6[e15] = null;
      k2++;
    } else h3(d6[j2]), j2--;
    else h3(d6[x2]), x2++;
    for (; k2 <= w3; ) {
      const e15 = v2(s7, v3[w3 + 1]);
      u5(e15, p8[k2]), v3[k2++] = e15;
    }
    for (; x2 <= j2; ) {
      const e15 = d6[x2++];
      null !== e15 && h3(e15);
    }
    return this.ut = a5, p4(s7, v3), E;
  }
});

// node_modules/lit-html/directives/class-map.js
var e8 = e7(class extends i6 {
  constructor(t7) {
    if (super(t7), t7.type !== t4.ATTRIBUTE || "class" !== t7.name || t7.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return " " + Object.keys(t7).filter((s7) => t7[s7]).join(" ") + " ";
  }
  update(s7, [i10]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s7.strings && (this.nt = new Set(s7.strings.join(" ").split(/\s/).filter((t7) => "" !== t7)));
      for (const t7 in i10) i10[t7] && !this.nt?.has(t7) && this.st.add(t7);
      return this.render(i10);
    }
    const r9 = s7.element.classList;
    for (const t7 of this.st) t7 in i10 || (r9.remove(t7), this.st.delete(t7));
    for (const t7 in i10) {
      const s8 = !!i10[t7];
      s8 === this.st.has(t7) || this.nt?.has(t7) || (s8 ? (r9.add(t7), this.st.add(t7)) : (r9.remove(t7), this.st.delete(t7)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/style-map.js
var n8 = "important";
var i8 = " !" + n8;
var o8 = e7(class extends i6 {
  constructor(t7) {
    if (super(t7), t7.type !== t4.ATTRIBUTE || "style" !== t7.name || t7.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return Object.keys(t7).reduce((e15, r9) => {
      const s7 = t7[r9];
      return null == s7 ? e15 : e15 + `${r9 = r9.includes("-") ? r9 : r9.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s7};`;
    }, "");
  }
  update(e15, [r9]) {
    const { style: s7 } = e15.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r9)), this.render(r9);
    for (const t7 of this.ft) null == r9[t7] && (this.ft.delete(t7), t7.includes("-") ? s7.removeProperty(t7) : s7[t7] = null);
    for (const t7 in r9) {
      const e16 = r9[t7];
      if (null != e16) {
        this.ft.add(t7);
        const r10 = "string" == typeof e16 && e16.endsWith(i8);
        t7.includes("-") || r10 ? s7.setProperty(t7, r10 ? e16.slice(0, -11) : e16, r10 ? n8 : "") : s7[t7] = e16;
      }
    }
    return E;
  }
});

// node_modules/lit-html/async-directive.js
var s5 = (i10, t7) => {
  const e15 = i10._$AN;
  if (void 0 === e15) return false;
  for (const i11 of e15) i11._$AO?.(t7, false), s5(i11, t7);
  return true;
};
var o9 = (i10) => {
  let t7, e15;
  do {
    if (void 0 === (t7 = i10._$AM)) break;
    e15 = t7._$AN, e15.delete(i10), i10 = t7;
  } while (0 === e15?.size);
};
var r6 = (i10) => {
  for (let t7; t7 = i10._$AM; i10 = t7) {
    let e15 = t7._$AN;
    if (void 0 === e15) t7._$AN = e15 = /* @__PURE__ */ new Set();
    else if (e15.has(i10)) break;
    e15.add(i10), c6(t7);
  }
};
function h4(i10) {
  void 0 !== this._$AN ? (o9(this), this._$AM = i10, r6(this)) : this._$AM = i10;
}
function n9(i10, t7 = false, e15 = 0) {
  const r9 = this._$AH, h6 = this._$AN;
  if (void 0 !== h6 && 0 !== h6.size) if (t7) if (Array.isArray(r9)) for (let i11 = e15; i11 < r9.length; i11++) s5(r9[i11], false), o9(r9[i11]);
  else null != r9 && (s5(r9, false), o9(r9));
  else s5(this, i10);
}
var c6 = (i10) => {
  i10.type == t4.CHILD && (i10._$AP ??= n9, i10._$AQ ??= h4);
};
var f3 = class extends i6 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i10, t7, e15) {
    super._$AT(i10, t7, e15), r6(this), this.isConnected = i10._$AU;
  }
  _$AO(i10, t7 = true) {
    i10 !== this.isConnected && (this.isConnected = i10, i10 ? this.reconnected?.() : this.disconnected?.()), t7 && (s5(this, i10), o9(this));
  }
  setValue(t7) {
    if (r5(this._$Ct)) this._$Ct._$AI(t7, this);
    else {
      const i10 = [...this._$Ct._$AH];
      i10[this._$Ci] = t7, this._$Ct._$AI(i10, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/private-async-helpers.js
var s6 = class {
  constructor(t7) {
    this.G = t7;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t7) {
    this.G = t7;
  }
  deref() {
    return this.G;
  }
};
var i9 = class {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    this.Y ??= new Promise((t7) => this.Z = t7);
  }
  resume() {
    this.Z?.(), this.Y = this.Z = void 0;
  }
};

// node_modules/lit-html/directives/until.js
var n10 = (t7) => !n7(t7) && "function" == typeof t7.then;
var h5 = 1073741823;
var c7 = class extends f3 {
  constructor() {
    super(...arguments), this._$Cwt = h5, this._$Cbt = [], this._$CK = new s6(this), this._$CX = new i9();
  }
  render(...s7) {
    return s7.find((t7) => !n10(t7)) ?? E;
  }
  update(s7, i10) {
    const e15 = this._$Cbt;
    let r9 = e15.length;
    this._$Cbt = i10;
    const o13 = this._$CK, c10 = this._$CX;
    this.isConnected || this.disconnected();
    for (let t7 = 0; t7 < i10.length && !(t7 > this._$Cwt); t7++) {
      const s8 = i10[t7];
      if (!n10(s8)) return this._$Cwt = t7, s8;
      t7 < r9 && s8 === e15[t7] || (this._$Cwt = h5, r9 = 0, Promise.resolve(s8).then(async (t8) => {
        for (; c10.get(); ) await c10.get();
        const i11 = o13.deref();
        if (void 0 !== i11) {
          const e16 = i11._$Cbt.indexOf(s8);
          e16 > -1 && e16 < i11._$Cwt && (i11._$Cwt = e16, i11.setValue(t8));
        }
      }));
    }
    return E;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
};
var m4 = e7(c7);

// node_modules/lit-html/directives/live.js
var l3 = e7(class extends i6 {
  constructor(r9) {
    if (super(r9), r9.type !== t4.PROPERTY && r9.type !== t4.ATTRIBUTE && r9.type !== t4.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r5(r9)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r9) {
    return r9;
  }
  update(i10, [t7]) {
    if (t7 === E || t7 === A) return t7;
    const o13 = i10.element, l4 = i10.name;
    if (i10.type === t4.PROPERTY) {
      if (t7 === o13[l4]) return E;
    } else if (i10.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t7 === o13.hasAttribute(l4)) return E;
    } else if (i10.type === t4.ATTRIBUTE && o13.getAttribute(l4) === t7 + "") return E;
    return p4(i10), t7;
  }
});

// node_modules/lit-html/directives/unsafe-html.js
var e9 = class extends i6 {
  constructor(i10) {
    if (super(i10), this.it = A, i10.type !== t4.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r9) {
    if (r9 === A || null == r9) return this._t = void 0, this.it = r9;
    if (r9 === E) return r9;
    if ("string" != typeof r9) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r9 === this.it) return this._t;
    this.it = r9;
    const s7 = [r9];
    return s7.raw = s7, this._t = { _$litType$: this.constructor.resultType, strings: s7, values: [] };
  }
};
e9.directiveName = "unsafeHTML", e9.resultType = 1;
var o10 = e7(e9);

// node_modules/@spectrum-web-components/checkbox/src/CheckboxMixin.js
var a4 = Object.defineProperty;
var p5 = Object.getOwnPropertyDescriptor;
var c8 = (i10, e15, r9, n12) => {
  for (var t7 = n12 > 1 ? void 0 : n12 ? p5(e15, r9) : e15, o13 = i10.length - 1, l4; o13 >= 0; o13--) (l4 = i10[o13]) && (t7 = (n12 ? l4(e15, r9, t7) : l4(t7)) || t7);
  return n12 && t7 && a4(e15, r9, t7), t7;
};
function CheckboxMixin(i10) {
  class e15 extends i10 {
    constructor() {
      super(...arguments);
      this.checked = false;
      this.readonly = false;
    }
    handleChange() {
      if (this.readonly) {
        this.inputElement.checked = this.checked;
        return;
      }
      this.checked = this.inputElement.checked;
      const t7 = new CustomEvent("change", { bubbles: true, cancelable: true, composed: true });
      this.dispatchEvent(t7) || (this.checked = !this.inputElement.checked, this.inputElement.checked = this.checked);
    }
    render() {
      return b2`
                <input
                    id="input"
                    name=${o7(this.name || void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `;
    }
  }
  return c8([n5({ type: Boolean, reflect: true })], e15.prototype, "checked", 2), c8([n5({ type: String, reflect: true })], e15.prototype, "name", 2), c8([n5({ type: Boolean, reflect: true })], e15.prototype, "readonly", 2), c8([e6("#input")], e15.prototype, "inputElement", 2), e15;
}

// node_modules/@spectrum-web-components/checkbox/src/CheckboxBase.js
var CheckboxBase = class extends CheckboxMixin(Focusable) {
  get focusElement() {
    return this.inputElement;
  }
};

// node_modules/@spectrum-web-components/switch/src/switch.css.js
var t6 = i`
    :host{--spectrum-switch-label-color-default:var(--spectrum-neutral-content-color-default);--spectrum-switch-label-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-switch-label-color-down:var(--spectrum-neutral-content-color-down);--spectrum-switch-label-color-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-switch-label-color-disabled:var(--spectrum-disabled-content-color);--spectrum-switch-background-color:var(--spectrum-gray-300);--spectrum-switch-background-color-disabled:var(--spectrum-gray-300);--spectrum-switch-background-color-selected-disabled:var(--spectrum-disabled-content-color);--spectrum-switch-background-color-selected-default:var(--spectrum-neutral-background-color-selected-default);--spectrum-switch-background-color-selected-hover:var(--spectrum-neutral-background-color-selected-hover);--spectrum-switch-background-color-selected-down:var(--spectrum-neutral-background-color-selected-down);--spectrum-switch-background-color-selected-focus:var(--spectrum-neutral-background-color-selected-key-focus);--spectrum-switch-focus-indicator-thickness:var(--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness));--spectrum-switch-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-switch-handle-background-color:var(--spectrum-gray-75);--spectrum-switch-handle-border-color-disabled:var(--spectrum-disabled-content-color)}:host([disabled]){--spectrum-switch-label-color-default:var(--spectrum-disabled-content-color)}:host([emphasized]){--spectrum-switch-background-color-selected-default:var(--spectrum-accent-color-900);--spectrum-switch-background-color-selected-hover:var(--spectrum-accent-color-1000);--spectrum-switch-background-color-selected-down:var(--spectrum-accent-color-1100);--spectrum-switch-background-color-selected-focus:var(--spectrum-accent-color-1000);--spectrum-switch-handle-border-color-selected-default:var(--spectrum-accent-color-900);--spectrum-switch-handle-border-color-selected-hover:var(--spectrum-accent-color-1000);--spectrum-switch-handle-border-color-selected-down:var(--spectrum-accent-color-1100);--spectrum-switch-handle-border-color-selected-focus:var(--spectrum-accent-color-1000)}:host([size=s]){--spectrum-switch-min-height:var(--spectrum-component-height-75);--spectrum-switch-control-width:var(--spectrum-switch-control-width-small);--spectrum-switch-control-height:var(--spectrum-switch-control-height-small);--spectrum-switch-control-label-spacing:var(--spectrum-text-to-control-75);--spectrum-switch-spacing-top-to-control:var(--spectrum-switch-top-to-control-small);--spectrum-switch-spacing-top-to-label:var(--spectrum-component-top-to-text-75);--spectrum-switch-font-size:var(--spectrum-font-size-75)}:host{--spectrum-switch-min-height:var(--spectrum-component-height-100);--spectrum-switch-control-width:var(--spectrum-switch-control-width-medium);--spectrum-switch-control-height:var(--spectrum-switch-control-height-medium);--spectrum-switch-control-label-spacing:var(--spectrum-text-to-control-100);--spectrum-switch-spacing-top-to-control:var(--spectrum-switch-top-to-control-medium);--spectrum-switch-spacing-top-to-label:var(--spectrum-component-top-to-text-100);--spectrum-switch-font-size:var(--spectrum-font-size-100)}:host([size=l]){--spectrum-switch-min-height:var(--spectrum-component-height-200);--spectrum-switch-control-width:var(--spectrum-switch-control-width-large);--spectrum-switch-control-height:var(--spectrum-switch-control-height-large);--spectrum-switch-control-label-spacing:var(--spectrum-text-to-control-200);--spectrum-switch-spacing-top-to-control:var(--spectrum-switch-top-to-control-large);--spectrum-switch-spacing-top-to-label:var(--spectrum-component-top-to-text-200);--spectrum-switch-font-size:var(--spectrum-font-size-200)}:host([size=xl]){--spectrum-switch-min-height:var(--spectrum-component-height-300);--spectrum-switch-control-width:var(--spectrum-switch-control-width-extra-large);--spectrum-switch-control-height:var(--spectrum-switch-control-height-extra-large);--spectrum-switch-control-label-spacing:var(--spectrum-text-to-control-300);--spectrum-switch-spacing-top-to-control:var(--spectrum-switch-top-to-control-extra-large);--spectrum-switch-spacing-top-to-label:var(--spectrum-component-top-to-text-300);--spectrum-switch-font-size:var(--spectrum-font-size-300)}:host{min-block-size:var(--mod-switch-height,var(--spectrum-switch-min-height));vertical-align:top;align-items:flex-start;max-inline-size:100%;display:inline-flex;position:relative}#input{box-sizing:border-box;opacity:0;z-index:1;cursor:pointer;block-size:100%;inline-size:100%;margin:0;padding:0;position:absolute;inset-block-start:0;inset-inline-start:0}:host([checked]) #input+#switch:before{transform:translateX(calc(var(--mod-switch-control-width,var(--spectrum-switch-control-width)) - 100%))}:host([checked]) #input+#switch:dir(rtl):before,:host([dir=rtl][checked]) #input+#switch:before{transform:translateX(calc(( var(--mod-switch-control-width,var(--spectrum-switch-control-width)) - 100% )*-1))}:host([disabled]) #input,:host([disabled]) #input{cursor:default}#input:focus-visible+#switch:after{margin:calc(var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap))*-1)}#label{color:var(--highcontrast-switch-label-color-default,var(--mod-switch-label-color-default,var(--spectrum-switch-label-color-default)));margin-inline:var(--mod-switch-control-label-spacing,var(--spectrum-switch-control-label-spacing));font-size:var(--mod-switch-font-size,var(--spectrum-switch-font-size));line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));transition:color var(--mod-animation-duration-200,var(--spectrum-animation-duration-200))ease-in-out;margin-block-start:var(--mod-switch-spacing-top-to-label,var(--spectrum-switch-spacing-top-to-label));margin-block-end:0}#switch{box-sizing:border-box;inline-size:var(--mod-switch-control-width,var(--spectrum-switch-control-width));margin-block:calc(var(--mod-switch-height,var(--spectrum-switch-min-height)) - var(--mod-switch-control-height,var(--spectrum-switch-control-height)) - var(--mod-switch-spacing-top-to-control,var(--spectrum-switch-spacing-top-to-control)));vertical-align:middle;transition:background var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out,border var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out;block-size:var(--mod-switch-control-height,var(--spectrum-switch-control-height));border-radius:calc(var(--mod-switch-control-height,var(--spectrum-switch-control-height))/2);flex-grow:0;flex-shrink:0;margin-inline:0;display:inline-block;position:relative;inset-inline:0}#switch:before{box-sizing:border-box;transition:background var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out,border var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out,transform var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out,box-shadow var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out;inline-size:var(--mod-switch-control-height,var(--spectrum-switch-control-height));block-size:var(--mod-switch-control-height,var(--spectrum-switch-control-height));border-width:var(--mod-border-width-200,var(--spectrum-border-width-200));border-radius:calc(var(--mod-switch-control-height,var(--spectrum-switch-control-height))/2);border-style:solid}#switch:after,#switch:before{content:"";display:block;position:absolute;inset-block-start:0;inset-inline-start:0}#switch:after{border-radius:calc(var(--mod-switch-control-height,var(--spectrum-switch-control-height))/2 + var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap))*2);transition:opacity var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-out,margin var(--spectrum-animation-duration-100,var(--spectrum-animation-duration-100))ease-out;margin:0;inset-block-end:0;inset-inline-end:0}#switch{background-color:var(--highcontrast-switch-background-color,var(--mod-switch-background-color,var(--spectrum-switch-background-color)))}#switch:before{background-color:var(--highcontrast-switch-handle-background-color,var(--mod-switch-handle-background-color,var(--spectrum-switch-handle-background-color)));border-color:var(--highcontrast-switch-handle-border-color-default,var(--mod-switch-handle-border-color-default,var(--spectrum-switch-handle-border-color-default)))}:host(:active) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-down,var(--mod-switch-handle-border-color-down,var(--spectrum-switch-handle-border-color-down)))}:host(:active) #input~#label{color:var(--highcontrast-switch-label-color-down,var(--mod-switch-label-color-down,var(--spectrum-switch-label-color-down)))}:host(:active[checked]) #input:enabled+#switch{background-color:var(--highcontrast-switch-background-color-selected-down,var(--mod-switch-background-color-selected-down,var(--spectrum-switch-background-color-selected-down)))}:host(:active[checked]) #input:enabled+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-selected-down,var(--mod-switch-handle-border-color-selected-down,var(--spectrum-switch-handle-border-color-selected-down)))}#input:focus-visible+#switch:after{box-shadow:0 0 0 var(--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness))var(--highcontrast-switch-focus-indicator-color,var(--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)))}#input:focus-visible+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-focus,var(--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)))}:host([checked]) #input:focus-visible+#switch{background-color:var(--highcontrast-switch-background-color-selected-focus,var(--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)))}:host([checked]) #input:focus-visible+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-selected-focus,var(--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)))}#input:focus-visible~#label{color:var(--highcontrast-switch-label-color-focus,var(--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)))}@media (hover:hover){:host(:hover) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-hover,var(--mod-switch-handle-border-color-hover,var(--spectrum-switch-handle-border-color-hover)));box-shadow:none}:host(:hover) #input~#label{color:var(--highcontrast-switch-label-color-hover,var(--mod-switch-label-color-hover,var(--spectrum-switch-label-color-hover)))}:host([checked]:hover) #input:enabled+#switch{background-color:var(--highcontrast-switch-background-color-selected-hover,var(--mod-switch-background-color-selected-hover,var(--spectrum-switch-background-color-selected-hover)))}:host([checked]:hover) #input:enabled+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-selected-hover,var(--mod-switch-handle-border-color-selected-hover,var(--spectrum-switch-handle-border-color-selected-hover)))}:host([disabled]:hover) #input+#switch,:host([disabled]:hover) #input+#switch{background-color:var(--highcontrast-switch-background-color-disabled,var(--mod-switch-background-color-disabled,var(--spectrum-switch-background-color-disabled)))}:host([disabled]:hover) #input+#switch:before,:host([disabled]:hover) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-disabled,var(--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)))}:host([disabled]:hover) #input~#label,:host([disabled]:hover) #input~#label{color:var(--highcontrast-switch-label-color-disabled,var(--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)))}:host([disabled][checked]:hover) #input+#switch,:host([disabled][checked]:hover) #input+#switch{background-color:var(--highcontrast-switch-background-color-selected-disabled,var(--mod-switch-background-color-selected-disabled,var(--spectrum-switch-background-color-selected-disabled)))}:host([disabled][checked]:hover) #input+#switch:before,:host([disabled][checked]:hover) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-disabled,var(--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)))}:host([disabled][checked]:hover) #input~#label,:host([disabled][checked]:hover) #input~#label{color:var(--highcontrast-switch-label-color-disabled,var(--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)))}:host(:hover) #input:focus-visible+#switch:after{box-shadow:0 0 0 var(--mod-switch-focus-indicator-thickness,var(--spectrum-switch-focus-indicator-thickness))var(--highcontrast-switch-focus-indicator-color,var(--mod-switch-focus-indicator-color,var(--spectrum-switch-focus-indicator-color)))}:host(:hover) #input:focus-visible+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-focus,var(--mod-switch-handle-border-color-focus,var(--spectrum-switch-handle-border-color-focus)))}:host([checked]:hover) #input:focus-visible+#switch{background-color:var(--highcontrast-switch-background-color-selected-focus,var(--mod-switch-background-color-selected-focus,var(--spectrum-switch-background-color-selected-focus)))}:host([checked]:hover) #input:focus-visible+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-selected-focus,var(--mod-switch-handle-border-color-selected-focus,var(--spectrum-switch-handle-border-color-selected-focus)))}:host(:hover) #input:focus-visible~#label{color:var(--highcontrast-switch-label-color-focus,var(--mod-switch-label-color-focus,var(--spectrum-switch-label-color-focus)))}}:host([checked]) #input+#switch{background-color:var(--highcontrast-switch-background-color-selected-default,var(--mod-switch-background-color-selected-default,var(--spectrum-switch-background-color-selected-default)))}:host([checked]) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-selected-default,var(--mod-switch-handle-border-color-selected-default,var(--spectrum-switch-handle-border-color-selected-default)))}:host([disabled]) #input+#switch,:host([disabled]) #input+#switch{background-color:var(--highcontrast-switch-background-color-disabled,var(--mod-switch-background-color-disabled,var(--spectrum-switch-background-color-disabled)))}:host([disabled]) #input+#switch:before,:host([disabled]) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-disabled,var(--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)))}:host([disabled][checked]) #input+#switch,:host([disabled][checked]) #input+#switch{background-color:var(--highcontrast-switch-background-color-selected-disabled,var(--mod-switch-background-color-selected-disabled,var(--spectrum-switch-background-color-selected-disabled)))}:host([disabled][checked]) #input+#switch:before,:host([disabled][checked]) #input+#switch:before{border-color:var(--highcontrast-switch-handle-border-color-disabled,var(--mod-switch-handle-border-color-disabled,var(--spectrum-switch-handle-border-color-disabled)))}:host([disabled]) #input~#label,:host([disabled]) #input~#label{color:var(--highcontrast-switch-label-color-disabled,var(--mod-switch-label-color-disabled,var(--spectrum-switch-label-color-disabled)))}@media (forced-colors:active){:host{forced-color-adjust:none;--highcontrast-switch-label-color-default:ButtonText;--highcontrast-switch-label-color-hover:ButtonText;--highcontrast-switch-label-color-down:ButtonText;--highcontrast-switch-label-color-focus:ButtonText;--highcontrast-switch-label-color-disabled:GrayText;--highcontrast-switch-handle-background-color:ButtonFace;--highcontrast-switch-handle-border-color-default:ButtonText;--highcontrast-switch-handle-border-color-hover:Highlight;--highcontrast-switch-handle-border-color-down:Highlight;--highcontrast-switch-handle-border-color-focus:Highlight;--highcontrast-switch-handle-border-color-disabled:Highlight;--highcontrast-switch-handle-border-color-selected-default:Highlight;--highcontrast-switch-handle-border-color-selected-hover:Highlight;--highcontrast-switch-handle-border-color-selected-down:Highlight;--highcontrast-switch-handle-border-color-selected-focus:Highlight;--highcontrast-switch-background-color:ButtonFace;--highcontrast-switch-background-color-selected-default:Highlight;--highcontrast-switch-background-color-selected-hover:Highlight;--highcontrast-switch-background-color-selected-down:Highlight;--highcontrast-switch-background-color-selected-focus:Highlight;--highcontrast-switch-background-color-selected-disabled:Highlight;--highcontrast-switch-focus-indicator-color:ButtonText}#input:not(:checked)+#switch{box-shadow:inset 0 0 0 1px buttontext}@media (hover:hover){:host(:hover) #input:not(:checked)+#switch{box-shadow:inset 0 0 0 1px highlight}:host([disabled][checked]:hover) #input+#switch,:host([disabled][checked]:hover) #input+#switch{background-color:graytext;box-shadow:inset 0 0 0 1px graytext}:host([disabled][checked]:hover) #input+#switch:before,:host([disabled][checked]:hover) #input+#switch:before{background-color:buttonface;border-color:graytext}}:host([disabled]) #input:not(:checked)+#switch,:host([disabled]) #input:not(:checked)+#switch{background-color:buttonface;box-shadow:inset 0 0 0 1px graytext}:host([disabled]) #input:not(:checked)+#switch:before,:host([disabled]) #input:not(:checked)+#switch:before{background-color:buttonface;border-color:graytext}:host([disabled][checked]) #input+#switch,:host([disabled][checked]) #input+#switch{background-color:graytext;box-shadow:inset 0 0 0 1px graytext}:host([disabled][checked]) #input+#switch:before,:host([disabled][checked]) #input+#switch:before{background-color:buttonface;border-color:graytext}:host([disabled]) #input~#label,:host([disabled]) #input~#label{color:graytext}}:host{--spectrum-switch-handle-border-color-default:var(--system-spectrum-switch-handle-border-color-default);--spectrum-switch-handle-border-color-hover:var(--system-spectrum-switch-handle-border-color-hover);--spectrum-switch-handle-border-color-down:var(--system-spectrum-switch-handle-border-color-down);--spectrum-switch-handle-border-color-focus:var(--system-spectrum-switch-handle-border-color-focus);--spectrum-switch-handle-border-color-selected-default:var(--system-spectrum-switch-handle-border-color-selected-default);--spectrum-switch-handle-border-color-selected-hover:var(--system-spectrum-switch-handle-border-color-selected-hover);--spectrum-switch-handle-border-color-selected-down:var(--system-spectrum-switch-handle-border-color-selected-down);--spectrum-switch-handle-border-color-selected-focus:var(--system-spectrum-switch-handle-border-color-selected-focus)}:host([disabled]){pointer-events:none}
`;
var switch_css_default = t6;

// node_modules/@spectrum-web-components/switch/src/switch-legacy.css.js
var o12 = i`
    #switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s)ease-in-out,border var(--spectrum-global-animation-duration-100,.13s)ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s)ease-in-out}
`;
var switch_legacy_css_default = o12;

// node_modules/@spectrum-web-components/switch/src/Switch.js
var d4 = Object.defineProperty;
var u7 = Object.getOwnPropertyDescriptor;
var p6 = (s7, r9, e15, i10) => {
  for (var t7 = i10 > 1 ? void 0 : i10 ? u7(r9, e15) : r9, o13 = s7.length - 1, l4; o13 >= 0; o13--) (l4 = s7[o13]) && (t7 = (i10 ? l4(r9, e15, t7) : l4(t7)) || t7);
  return i10 && t7 && d4(r9, e15, t7), t7;
};
var Switch = class extends SizedMixin(CheckboxBase) {
  constructor() {
    super(...arguments);
    this.emphasized = false;
  }
  static get styles() {
    return window.hasOwnProperty("ShadyDOM") ? [switch_css_default, switch_legacy_css_default] : [switch_css_default];
  }
  render() {
    return b2`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
  }
  firstUpdated(e15) {
    super.firstUpdated(e15), this.inputElement.setAttribute("role", "switch");
  }
  updated(e15) {
    e15.has("checked") && this.inputElement.setAttribute("aria-checked", this.checked ? "true" : "false");
  }
};
p6([n5({ type: Boolean, reflect: true })], Switch.prototype, "emphasized", 2);

// node_modules/@spectrum-web-components/base/src/define-element.js
function defineElement(e15, n12) {
  window.__swc, customElements.define(e15, n12);
}

// node_modules/@spectrum-web-components/switch/sp-switch.js
defineElement("sp-switch", Switch);

// node_modules/@spectrum-web-components/theme/src/Theme.js
var d5 = ["spectrum", "express", "spectrum-two"];
var c9 = ["medium", "large", "medium-express", "large-express", "medium-spectrum-two", "large-spectrum-two"];
var p7 = ["light", "lightest", "dark", "darkest", "light-express", "lightest-express", "dark-express", "darkest-express", "light-spectrum-two", "dark-spectrum-two"];
var r7 = class r8 extends HTMLElement {
  constructor() {
    super();
    this._dir = "";
    this._system = "spectrum";
    this._color = "";
    this._scale = "";
    this.trackedChildren = /* @__PURE__ */ new Set();
    this._updateRequested = false;
    this._contextConsumers = /* @__PURE__ */ new Map();
    this.attachShadow({ mode: "open" });
    const e15 = document.importNode(r8.template.content, true);
    this.shadowRoot.appendChild(e15), this.shouldAdoptStyles(), this.addEventListener("sp-query-theme", this.onQueryTheme), this.addEventListener("sp-language-context", this._handleContextPresence), this.updateComplete = this.__createDeferredPromise();
  }
  static get observedAttributes() {
    return ["color", "scale", "lang", "dir", "system", "theme"];
  }
  set dir(e15) {
    if (e15 === this.dir) return;
    this.setAttribute("dir", e15), this._dir = e15;
    const t7 = e15 === "rtl" ? e15 : "ltr";
    this.trackedChildren.forEach((s7) => {
      s7.setAttribute("dir", t7);
    });
  }
  get dir() {
    return this._dir;
  }
  attributeChangedCallback(e15, t7, s7) {
    t7 !== s7 && (e15 === "color" ? this.color = s7 : e15 === "scale" ? this.scale = s7 : e15 === "lang" && s7 ? (this.lang = s7, this._provideContext()) : e15 === "theme" ? this.theme = s7 : e15 === "system" ? this.system = s7 : e15 === "dir" && (this.dir = s7));
  }
  requestUpdate() {
    window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow ? window.ShadyCSS.styleElement(this) : this.shouldAdoptStyles();
  }
  get system() {
    const e15 = r8.themeFragmentsByKind.get("system"), { name: t7 } = e15 && e15.get("default") || {};
    return this._system || t7 || "";
  }
  set system(e15) {
    if (e15 === this._system) return;
    const t7 = e15 && d5.includes(e15) ? e15 : this.system;
    t7 !== this._system && (this._system = t7, this.requestUpdate()), t7 ? this.setAttribute("system", t7) : this.removeAttribute("system");
  }
  get theme() {
    return this.system || this.removeAttribute("system"), this.system;
  }
  set theme(e15) {
    this.system = e15, this.requestUpdate();
  }
  get color() {
    const e15 = r8.themeFragmentsByKind.get("color"), { name: t7 } = e15 && e15.get("default") || {};
    return this._color || t7 || "";
  }
  set color(e15) {
    if (e15 === this._color) return;
    const t7 = e15 && p7.includes(e15) ? e15 : this.color;
    t7 !== this._color && (this._color = t7, this.requestUpdate()), t7 ? this.setAttribute("color", t7) : this.removeAttribute("color");
  }
  get scale() {
    const e15 = r8.themeFragmentsByKind.get("scale"), { name: t7 } = e15 && e15.get("default") || {};
    return this._scale || t7 || "";
  }
  set scale(e15) {
    if (e15 === this._scale) return;
    const t7 = e15 && c9.includes(e15) ? e15 : this.scale;
    t7 !== this._scale && (this._scale = t7, this.requestUpdate()), t7 ? this.setAttribute("scale", t7) : this.removeAttribute("scale");
  }
  get styles() {
    const e15 = [...r8.themeFragmentsByKind.keys()], t7 = (a5, i10, n12) => {
      const o13 = n12 && n12 !== "theme" && n12 !== "system" && this.theme !== "spectrum" && this.system !== "spectrum" ? a5.get(`${i10}-${this.system}`) : a5.get(i10), l4 = i10 === "spectrum" || !n12 || this.hasAttribute(n12);
      if (o13 && l4) return o13.styles;
    };
    return [...e15.reduce((a5, i10) => {
      const n12 = r8.themeFragmentsByKind.get(i10);
      let o13;
      if (i10 === "app" || i10 === "core") o13 = t7(n12, i10);
      else {
        const { [i10]: l4 } = this;
        o13 = t7(n12, l4, i10);
      }
      return o13 && a5.push(o13), a5;
    }, [])];
  }
  static get template() {
    return this.templateElement || (this.templateElement = document.createElement("template"), this.templateElement.innerHTML = "<slot></slot>"), this.templateElement;
  }
  __createDeferredPromise() {
    return new Promise((e15) => {
      this.__resolve = e15;
    });
  }
  onQueryTheme(e15) {
    if (e15.defaultPrevented) return;
    e15.preventDefault();
    const { detail: t7 } = e15;
    t7.color = this.color || void 0, t7.scale = this.scale || void 0, t7.lang = this.lang || document.documentElement.lang || navigator.language, t7.theme = this.system || void 0, t7.system = this.system || void 0;
  }
  connectedCallback() {
    if (this.shouldAdoptStyles(), window.ShadyCSS !== void 0 && window.ShadyCSS.styleElement(this), r8.instances.add(this), !this.hasAttribute("dir")) {
      let e15 = this.assignedSlot || this.parentNode;
      for (; e15 !== document.documentElement && !(e15 instanceof r8); ) e15 = e15.assignedSlot || e15.parentNode || e15.host;
      this.dir = e15.dir === "rtl" ? e15.dir : "ltr";
    }
  }
  disconnectedCallback() {
    r8.instances.delete(this);
  }
  startManagingContentDirection(e15) {
    this.trackedChildren.add(e15);
  }
  stopManagingContentDirection(e15) {
    this.trackedChildren.delete(e15);
  }
  async shouldAdoptStyles() {
    this._updateRequested || (this.updateComplete = this.__createDeferredPromise(), this._updateRequested = true, this._updateRequested = await false, this.adoptStyles(), this.__resolve(true));
  }
  adoptStyles() {
    const e15 = this.styles;
    if (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow && window.ShadyCSS.ScopingShim) {
      const t7 = [];
      for (const [s7, a5] of r8.themeFragmentsByKind) for (const [i10, { styles: n12 }] of a5) {
        if (i10 === "default") continue;
        let o13 = n12.cssText;
        r8.defaultFragments.has(i10) || (o13 = o13.replace(":host", `:host([${s7}='${i10}'])`)), t7.push(o13);
      }
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t7, this.localName), window.ShadyCSS.prepareTemplate(r8.template, this.localName);
    } else if (e2) {
      const t7 = [];
      for (const s7 of e15) t7.push(s7.styleSheet);
      this.shadowRoot.adoptedStyleSheets = t7;
    } else this.shadowRoot.querySelectorAll("style").forEach((s7) => s7.remove()), e15.forEach((s7) => {
      const a5 = document.createElement("style");
      a5.textContent = s7.cssText, this.shadowRoot.appendChild(a5);
    });
  }
  static registerThemeFragment(e15, t7, s7) {
    const a5 = r8.themeFragmentsByKind.get(t7) || /* @__PURE__ */ new Map();
    a5.size === 0 && (r8.themeFragmentsByKind.set(t7, a5), a5.set("default", { name: e15, styles: s7 }), r8.defaultFragments.add(e15)), a5.set(e15, { name: e15, styles: s7 }), r8.instances.forEach((i10) => i10.shouldAdoptStyles());
  }
  _provideContext() {
    this._contextConsumers.forEach(([e15, t7]) => e15(this.lang, t7));
  }
  _handleContextPresence(e15) {
    e15.stopPropagation();
    const t7 = e15.composedPath()[0];
    if (this._contextConsumers.has(t7)) return;
    this._contextConsumers.set(t7, [e15.detail.callback, () => this._contextConsumers.delete(t7)]);
    const [s7, a5] = this._contextConsumers.get(t7) || [];
    s7 && a5 && s7(this.lang || document.documentElement.lang || navigator.language, a5);
  }
};
r7.themeFragmentsByKind = /* @__PURE__ */ new Map(), r7.defaultFragments = /* @__PURE__ */ new Set(["spectrum"]), r7.instances = /* @__PURE__ */ new Set(), r7.VERSION = version;
var Theme = r7;

// node_modules/@spectrum-web-components/theme/sp-theme.js
customElements.define("sp-theme", Theme);

// node_modules/@spectrum-web-components/theme/src/spectrum-two/theme-light-core-tokens.css.js
var e10 = i`
    :host,:root{--spectrum-overlay-opacity:.4;--spectrum-drop-shadow-color-rgb:0,0,0;--spectrum-drop-shadow-color-opacity:.15;--spectrum-drop-shadow-color:rgba(var(--spectrum-drop-shadow-color-rgb),var(--spectrum-drop-shadow-color-opacity));--spectrum-background-layer-2-color:var(--spectrum-gray-25);--spectrum-neutral-subdued-background-color-default:var(--spectrum-gray-700);--spectrum-neutral-subdued-background-color-hover:var(--spectrum-gray-800);--spectrum-neutral-subdued-background-color-down:var(--spectrum-gray-800);--spectrum-neutral-subdued-background-color-key-focus:var(--spectrum-gray-800);--spectrum-accent-background-color-default:var(--spectrum-accent-color-900);--spectrum-accent-background-color-hover:var(--spectrum-accent-color-1000);--spectrum-accent-background-color-down:var(--spectrum-accent-color-1000);--spectrum-accent-background-color-key-focus:var(--spectrum-accent-color-1000);--spectrum-informative-background-color-default:var(--spectrum-informative-color-900);--spectrum-informative-background-color-hover:var(--spectrum-informative-color-1000);--spectrum-informative-background-color-down:var(--spectrum-informative-color-1000);--spectrum-informative-background-color-key-focus:var(--spectrum-informative-color-1000);--spectrum-negative-background-color-default:var(--spectrum-negative-color-900);--spectrum-negative-background-color-hover:var(--spectrum-negative-color-1000);--spectrum-negative-background-color-down:var(--spectrum-negative-color-1000);--spectrum-negative-background-color-key-focus:var(--spectrum-negative-color-1000);--spectrum-positive-background-color-default:var(--spectrum-positive-color-900);--spectrum-positive-background-color-hover:var(--spectrum-positive-color-1000);--spectrum-positive-background-color-down:var(--spectrum-positive-color-1000);--spectrum-positive-background-color-key-focus:var(--spectrum-positive-color-1000);--spectrum-notice-background-color-default:var(--spectrum-notice-color-600);--spectrum-gray-background-color-default:var(--spectrum-gray-700);--spectrum-red-background-color-default:var(--spectrum-red-900);--spectrum-orange-background-color-default:var(--spectrum-orange-600);--spectrum-yellow-background-color-default:var(--spectrum-yellow-400);--spectrum-chartreuse-background-color-default:var(--spectrum-chartreuse-500);--spectrum-celery-background-color-default:var(--spectrum-celery-600);--spectrum-green-background-color-default:var(--spectrum-green-900);--spectrum-seafoam-background-color-default:var(--spectrum-seafoam-900);--spectrum-cyan-background-color-default:var(--spectrum-cyan-900);--spectrum-blue-background-color-default:var(--spectrum-blue-900);--spectrum-indigo-background-color-default:var(--spectrum-indigo-900);--spectrum-purple-background-color-default:var(--spectrum-purple-900);--spectrum-fuchsia-background-color-default:var(--spectrum-fuchsia-900);--spectrum-magenta-background-color-default:var(--spectrum-magenta-900);--spectrum-neutral-visual-color:var(--spectrum-gray-500);--spectrum-accent-visual-color:var(--spectrum-accent-color-800);--spectrum-informative-visual-color:var(--spectrum-informative-color-800);--spectrum-negative-visual-color:var(--spectrum-negative-color-800);--spectrum-notice-visual-color:var(--spectrum-notice-color-700);--spectrum-positive-visual-color:var(--spectrum-positive-color-700);--spectrum-gray-visual-color:var(--spectrum-gray-500);--spectrum-red-visual-color:var(--spectrum-red-800);--spectrum-orange-visual-color:var(--spectrum-orange-700);--spectrum-yellow-visual-color:var(--spectrum-yellow-600);--spectrum-chartreuse-visual-color:var(--spectrum-chartreuse-600);--spectrum-celery-visual-color:var(--spectrum-celery-700);--spectrum-green-visual-color:var(--spectrum-green-700);--spectrum-seafoam-visual-color:var(--spectrum-seafoam-700);--spectrum-cyan-visual-color:var(--spectrum-cyan-600);--spectrum-blue-visual-color:var(--spectrum-blue-800);--spectrum-indigo-visual-color:var(--spectrum-indigo-800);--spectrum-purple-visual-color:var(--spectrum-purple-800);--spectrum-fuchsia-visual-color:var(--spectrum-fuchsia-800);--spectrum-magenta-visual-color:var(--spectrum-magenta-800);--spectrum-background-elevated-color:var(--spectrum-gray-25);--spectrum-background-pasteboard-color:var(--spectrum-gray-100);--spectrum-brown-visual-color:var(--spectrum-brown-800);--spectrum-cinnamon-visual-color:var(--spectrum-cinnamon-800);--spectrum-pink-visual-color:var(--spectrum-pink-800);--spectrum-silver-visual-color:var(--spectrum-silver-800);--spectrum-turquoise-visual-color:var(--spectrum-turquoise-800);--spectrum-brown-background-color-default:var(--spectrum-brown-900);--spectrum-cinnamon-background-color-default:var(--spectrum-cinnamon-900);--spectrum-pink-background-color-default:var(--spectrum-pink-900);--spectrum-silver-background-color-default:var(--spectrum-silver-900);--spectrum-turquoise-background-color-default:var(--spectrum-turquoise-900);--spectrum-opacity-checkerboard-square-dark:var(--spectrum-gray-200);--spectrum-gray-25-rgb:255,255,255;--spectrum-gray-25:rgba(var(--spectrum-gray-25-rgb));--spectrum-gray-50-rgb:248,248,248;--spectrum-gray-50:rgba(var(--spectrum-gray-50-rgb));--spectrum-gray-75-rgb:243,243,243;--spectrum-gray-75:rgba(var(--spectrum-gray-75-rgb));--spectrum-gray-100-rgb:233,233,233;--spectrum-gray-100:rgba(var(--spectrum-gray-100-rgb));--spectrum-gray-200-rgb:225,225,225;--spectrum-gray-200:rgba(var(--spectrum-gray-200-rgb));--spectrum-gray-300-rgb:218,218,218;--spectrum-gray-300:rgba(var(--spectrum-gray-300-rgb));--spectrum-gray-400-rgb:198,198,198;--spectrum-gray-400:rgba(var(--spectrum-gray-400-rgb));--spectrum-gray-500-rgb:143,143,143;--spectrum-gray-500:rgba(var(--spectrum-gray-500-rgb));--spectrum-gray-600-rgb:113,113,113;--spectrum-gray-600:rgba(var(--spectrum-gray-600-rgb));--spectrum-gray-700-rgb:80,80,80;--spectrum-gray-700:rgba(var(--spectrum-gray-700-rgb));--spectrum-gray-800-rgb:41,41,41;--spectrum-gray-800:rgba(var(--spectrum-gray-800-rgb));--spectrum-gray-900-rgb:19,19,19;--spectrum-gray-900:rgba(var(--spectrum-gray-900-rgb));--spectrum-gray-1000-rgb:0,0,0;--spectrum-gray-1000:rgba(var(--spectrum-gray-1000-rgb));--spectrum-blue-100-rgb:245,249,255;--spectrum-blue-100:rgba(var(--spectrum-blue-100-rgb));--spectrum-blue-200-rgb:229,240,254;--spectrum-blue-200:rgba(var(--spectrum-blue-200-rgb));--spectrum-blue-300-rgb:203,226,254;--spectrum-blue-300:rgba(var(--spectrum-blue-300-rgb));--spectrum-blue-400-rgb:172,207,253;--spectrum-blue-400:rgba(var(--spectrum-blue-400-rgb));--spectrum-blue-500-rgb:142,185,252;--spectrum-blue-500:rgba(var(--spectrum-blue-500-rgb));--spectrum-blue-600-rgb:114,158,253;--spectrum-blue-600:rgba(var(--spectrum-blue-600-rgb));--spectrum-blue-700-rgb:93,137,255;--spectrum-blue-700:rgba(var(--spectrum-blue-700-rgb));--spectrum-blue-800-rgb:75,117,255;--spectrum-blue-800:rgba(var(--spectrum-blue-800-rgb));--spectrum-blue-900-rgb:59,99,251;--spectrum-blue-900:rgba(var(--spectrum-blue-900-rgb));--spectrum-blue-1000-rgb:39,77,234;--spectrum-blue-1000:rgba(var(--spectrum-blue-1000-rgb));--spectrum-blue-1100-rgb:29,62,207;--spectrum-blue-1100:rgba(var(--spectrum-blue-1100-rgb));--spectrum-blue-1200-rgb:21,50,173;--spectrum-blue-1200:rgba(var(--spectrum-blue-1200-rgb));--spectrum-blue-1300-rgb:16,40,140;--spectrum-blue-1300:rgba(var(--spectrum-blue-1300-rgb));--spectrum-blue-1400-rgb:12,31,105;--spectrum-blue-1400:rgba(var(--spectrum-blue-1400-rgb));--spectrum-blue-1500-rgb:14,24,67;--spectrum-blue-1500:rgba(var(--spectrum-blue-1500-rgb));--spectrum-blue-1600-rgb:7,11,30;--spectrum-blue-1600:rgba(var(--spectrum-blue-1600-rgb));--spectrum-red-100-rgb:255,246,245;--spectrum-red-100:rgba(var(--spectrum-red-100-rgb));--spectrum-red-200-rgb:255,235,232;--spectrum-red-200:rgba(var(--spectrum-red-200-rgb));--spectrum-red-300-rgb:255,214,209;--spectrum-red-300:rgba(var(--spectrum-red-300-rgb));--spectrum-red-400-rgb:255,188,180;--spectrum-red-400:rgba(var(--spectrum-red-400-rgb));--spectrum-red-500-rgb:255,157,145;--spectrum-red-500:rgba(var(--spectrum-red-500-rgb));--spectrum-red-600-rgb:255,118,101;--spectrum-red-600:rgba(var(--spectrum-red-600-rgb));--spectrum-red-700-rgb:255,81,61;--spectrum-red-700:rgba(var(--spectrum-red-700-rgb));--spectrum-red-800-rgb:240,56,35;--spectrum-red-800:rgba(var(--spectrum-red-800-rgb));--spectrum-red-900-rgb:215,50,32;--spectrum-red-900:rgba(var(--spectrum-red-900-rgb));--spectrum-red-1000-rgb:183,40,24;--spectrum-red-1000:rgba(var(--spectrum-red-1000-rgb));--spectrum-red-1100-rgb:156,33,19;--spectrum-red-1100:rgba(var(--spectrum-red-1100-rgb));--spectrum-red-1200-rgb:129,27,14;--spectrum-red-1200:rgba(var(--spectrum-red-1200-rgb));--spectrum-red-1300-rgb:104,21,10;--spectrum-red-1300:rgba(var(--spectrum-red-1300-rgb));--spectrum-red-1400-rgb:80,16,6;--spectrum-red-1400:rgba(var(--spectrum-red-1400-rgb));--spectrum-red-1500-rgb:59,11,4;--spectrum-red-1500:rgba(var(--spectrum-red-1500-rgb));--spectrum-red-1600-rgb:29,5,2;--spectrum-red-1600:rgba(var(--spectrum-red-1600-rgb));--spectrum-orange-100-rgb:255,246,231;--spectrum-orange-100:rgba(var(--spectrum-orange-100-rgb));--spectrum-orange-200-rgb:255,236,207;--spectrum-orange-200:rgba(var(--spectrum-orange-200-rgb));--spectrum-orange-300-rgb:255,218,158;--spectrum-orange-300:rgba(var(--spectrum-orange-300-rgb));--spectrum-orange-400-rgb:255,193,94;--spectrum-orange-400:rgba(var(--spectrum-orange-400-rgb));--spectrum-orange-500-rgb:255,162,19;--spectrum-orange-500:rgba(var(--spectrum-orange-500-rgb));--spectrum-orange-600-rgb:252,125,0;--spectrum-orange-600:rgba(var(--spectrum-orange-600-rgb));--spectrum-orange-700-rgb:232,106,0;--spectrum-orange-700:rgba(var(--spectrum-orange-700-rgb));--spectrum-orange-800-rgb:212,91,0;--spectrum-orange-800:rgba(var(--spectrum-orange-800-rgb));--spectrum-orange-900-rgb:194,78,0;--spectrum-orange-900:rgba(var(--spectrum-orange-900-rgb));--spectrum-orange-1000-rgb:167,62,0;--spectrum-orange-1000:rgba(var(--spectrum-orange-1000-rgb));--spectrum-orange-1100-rgb:144,51,0;--spectrum-orange-1100:rgba(var(--spectrum-orange-1100-rgb));--spectrum-orange-1200-rgb:118,41,0;--spectrum-orange-1200:rgba(var(--spectrum-orange-1200-rgb));--spectrum-orange-1300-rgb:95,32,0;--spectrum-orange-1300:rgba(var(--spectrum-orange-1300-rgb));--spectrum-orange-1400-rgb:73,24,0;--spectrum-orange-1400:rgba(var(--spectrum-orange-1400-rgb));--spectrum-orange-1500-rgb:52,18,0;--spectrum-orange-1500:rgba(var(--spectrum-orange-1500-rgb));--spectrum-orange-1600-rgb:25,8,0;--spectrum-orange-1600:rgba(var(--spectrum-orange-1600-rgb));--spectrum-yellow-100-rgb:255,248,204;--spectrum-yellow-100:rgba(var(--spectrum-yellow-100-rgb));--spectrum-yellow-200-rgb:255,241,151;--spectrum-yellow-200:rgba(var(--spectrum-yellow-200-rgb));--spectrum-yellow-300-rgb:255,222,44;--spectrum-yellow-300:rgba(var(--spectrum-yellow-300-rgb));--spectrum-yellow-400-rgb:245,199,0;--spectrum-yellow-400:rgba(var(--spectrum-yellow-400-rgb));--spectrum-yellow-500-rgb:230,175,0;--spectrum-yellow-500:rgba(var(--spectrum-yellow-500-rgb));--spectrum-yellow-600-rgb:210,149,0;--spectrum-yellow-600:rgba(var(--spectrum-yellow-600-rgb));--spectrum-yellow-700-rgb:193,131,0;--spectrum-yellow-700:rgba(var(--spectrum-yellow-700-rgb));--spectrum-yellow-800-rgb:175,116,0;--spectrum-yellow-800:rgba(var(--spectrum-yellow-800-rgb));--spectrum-yellow-900-rgb:158,102,0;--spectrum-yellow-900:rgba(var(--spectrum-yellow-900-rgb));--spectrum-yellow-1000-rgb:134,85,0;--spectrum-yellow-1000:rgba(var(--spectrum-yellow-1000-rgb));--spectrum-yellow-1100-rgb:114,72,0;--spectrum-yellow-1100:rgba(var(--spectrum-yellow-1100-rgb));--spectrum-yellow-1200-rgb:93,59,0;--spectrum-yellow-1200:rgba(var(--spectrum-yellow-1200-rgb));--spectrum-yellow-1300-rgb:75,47,0;--spectrum-yellow-1300:rgba(var(--spectrum-yellow-1300-rgb));--spectrum-yellow-1400-rgb:56,35,0;--spectrum-yellow-1400:rgba(var(--spectrum-yellow-1400-rgb));--spectrum-yellow-1500-rgb:40,25,0;--spectrum-yellow-1500:rgba(var(--spectrum-yellow-1500-rgb));--spectrum-yellow-1600-rgb:18,11,0;--spectrum-yellow-1600:rgba(var(--spectrum-yellow-1600-rgb));--spectrum-chartreuse-100-rgb:246,251,222;--spectrum-chartreuse-100:rgba(var(--spectrum-chartreuse-100-rgb));--spectrum-chartreuse-200-rgb:234,246,173;--spectrum-chartreuse-200:rgba(var(--spectrum-chartreuse-200-rgb));--spectrum-chartreuse-300-rgb:208,236,70;--spectrum-chartreuse-300:rgba(var(--spectrum-chartreuse-300-rgb));--spectrum-chartreuse-400-rgb:182,219,0;--spectrum-chartreuse-400:rgba(var(--spectrum-chartreuse-400-rgb));--spectrum-chartreuse-500-rgb:163,196,0;--spectrum-chartreuse-500:rgba(var(--spectrum-chartreuse-500-rgb));--spectrum-chartreuse-600-rgb:143,172,0;--spectrum-chartreuse-600:rgba(var(--spectrum-chartreuse-600-rgb));--spectrum-chartreuse-700-rgb:128,153,0;--spectrum-chartreuse-700:rgba(var(--spectrum-chartreuse-700-rgb));--spectrum-chartreuse-800-rgb:114,137,0;--spectrum-chartreuse-800:rgba(var(--spectrum-chartreuse-800-rgb));--spectrum-chartreuse-900-rgb:102,122,0;--spectrum-chartreuse-900:rgba(var(--spectrum-chartreuse-900-rgb));--spectrum-chartreuse-1000-rgb:86,103,0;--spectrum-chartreuse-1000:rgba(var(--spectrum-chartreuse-1000-rgb));--spectrum-chartreuse-1100-rgb:73,87,0;--spectrum-chartreuse-1100:rgba(var(--spectrum-chartreuse-1100-rgb));--spectrum-chartreuse-1200-rgb:60,71,0;--spectrum-chartreuse-1200:rgba(var(--spectrum-chartreuse-1200-rgb));--spectrum-chartreuse-1300-rgb:47,57,0;--spectrum-chartreuse-1300:rgba(var(--spectrum-chartreuse-1300-rgb));--spectrum-chartreuse-1400-rgb:35,43,0;--spectrum-chartreuse-1400:rgba(var(--spectrum-chartreuse-1400-rgb));--spectrum-chartreuse-1500-rgb:25,30,0;--spectrum-chartreuse-1500:rgba(var(--spectrum-chartreuse-1500-rgb));--spectrum-chartreuse-1600-rgb:11,14,0;--spectrum-chartreuse-1600:rgba(var(--spectrum-chartreuse-1600-rgb));--spectrum-celery-100-rgb:235,255,220;--spectrum-celery-100:rgba(var(--spectrum-celery-100-rgb));--spectrum-celery-200-rgb:197,255,156;--spectrum-celery-200:rgba(var(--spectrum-celery-200-rgb));--spectrum-celery-300-rgb:157,247,92;--spectrum-celery-300:rgba(var(--spectrum-celery-300-rgb));--spectrum-celery-400-rgb:129,228,58;--spectrum-celery-400:rgba(var(--spectrum-celery-400-rgb));--spectrum-celery-500-rgb:110,206,42;--spectrum-celery-500:rgba(var(--spectrum-celery-500-rgb));--spectrum-celery-600-rgb:93,180,31;--spectrum-celery-600:rgba(var(--spectrum-celery-600-rgb));--spectrum-celery-700-rgb:82,161,25;--spectrum-celery-700:rgba(var(--spectrum-celery-700-rgb));--spectrum-celery-800-rgb:72,144,20;--spectrum-celery-800:rgba(var(--spectrum-celery-800-rgb));--spectrum-celery-900-rgb:64,129,17;--spectrum-celery-900:rgba(var(--spectrum-celery-900-rgb));--spectrum-celery-1000-rgb:52,109,12;--spectrum-celery-1000:rgba(var(--spectrum-celery-1000-rgb));--spectrum-celery-1100-rgb:44,92,9;--spectrum-celery-1100:rgba(var(--spectrum-celery-1100-rgb));--spectrum-celery-1200-rgb:35,75,6;--spectrum-celery-1200:rgba(var(--spectrum-celery-1200-rgb));--spectrum-celery-1300-rgb:27,60,3;--spectrum-celery-1300:rgba(var(--spectrum-celery-1300-rgb));--spectrum-celery-1400-rgb:19,46,0;--spectrum-celery-1400:rgba(var(--spectrum-celery-1400-rgb));--spectrum-celery-1500-rgb:12,33,0;--spectrum-celery-1500:rgba(var(--spectrum-celery-1500-rgb));--spectrum-celery-1600-rgb:4,15,0;--spectrum-celery-1600:rgba(var(--spectrum-celery-1600-rgb));--spectrum-green-100-rgb:237,252,241;--spectrum-green-100:rgba(var(--spectrum-green-100-rgb));--spectrum-green-200-rgb:215,247,225;--spectrum-green-200:rgba(var(--spectrum-green-200-rgb));--spectrum-green-300-rgb:173,238,197;--spectrum-green-300:rgba(var(--spectrum-green-300-rgb));--spectrum-green-400-rgb:107,227,162;--spectrum-green-400:rgba(var(--spectrum-green-400-rgb));--spectrum-green-500-rgb:43,209,125;--spectrum-green-500:rgba(var(--spectrum-green-500-rgb));--spectrum-green-600-rgb:18,184,103;--spectrum-green-600:rgba(var(--spectrum-green-600-rgb));--spectrum-green-700-rgb:11,164,93;--spectrum-green-700:rgba(var(--spectrum-green-700-rgb));--spectrum-green-800-rgb:7,147,85;--spectrum-green-800:rgba(var(--spectrum-green-800-rgb));--spectrum-green-900-rgb:5,131,78;--spectrum-green-900:rgba(var(--spectrum-green-900-rgb));--spectrum-green-1000-rgb:3,110,69;--spectrum-green-1000:rgba(var(--spectrum-green-1000-rgb));--spectrum-green-1100-rgb:2,93,60;--spectrum-green-1100:rgba(var(--spectrum-green-1100-rgb));--spectrum-green-1200-rgb:1,76,52;--spectrum-green-1200:rgba(var(--spectrum-green-1200-rgb));--spectrum-green-1300-rgb:0,61,44;--spectrum-green-1300:rgba(var(--spectrum-green-1300-rgb));--spectrum-green-1400-rgb:0,46,34;--spectrum-green-1400:rgba(var(--spectrum-green-1400-rgb));--spectrum-green-1500-rgb:0,33,25;--spectrum-green-1500:rgba(var(--spectrum-green-1500-rgb));--spectrum-green-1600-rgb:0,15,12;--spectrum-green-1600:rgba(var(--spectrum-green-1600-rgb));--spectrum-seafoam-100-rgb:235,251,246;--spectrum-seafoam-100:rgba(var(--spectrum-seafoam-100-rgb));--spectrum-seafoam-200-rgb:211,246,234;--spectrum-seafoam-200:rgba(var(--spectrum-seafoam-200-rgb));--spectrum-seafoam-300-rgb:169,237,216;--spectrum-seafoam-300:rgba(var(--spectrum-seafoam-300-rgb));--spectrum-seafoam-400-rgb:92,225,194;--spectrum-seafoam-400:rgba(var(--spectrum-seafoam-400-rgb));--spectrum-seafoam-500-rgb:16,207,169;--spectrum-seafoam-500:rgba(var(--spectrum-seafoam-500-rgb));--spectrum-seafoam-600-rgb:13,181,149;--spectrum-seafoam-600:rgba(var(--spectrum-seafoam-600-rgb));--spectrum-seafoam-700-rgb:11,162,134;--spectrum-seafoam-700:rgba(var(--spectrum-seafoam-700-rgb));--spectrum-seafoam-800-rgb:9,144,120;--spectrum-seafoam-800:rgba(var(--spectrum-seafoam-800-rgb));--spectrum-seafoam-900-rgb:7,129,109;--spectrum-seafoam-900:rgba(var(--spectrum-seafoam-900-rgb));--spectrum-seafoam-1000-rgb:5,108,92;--spectrum-seafoam-1000:rgba(var(--spectrum-seafoam-1000-rgb));--spectrum-seafoam-1100-rgb:3,92,80;--spectrum-seafoam-1100:rgba(var(--spectrum-seafoam-1100-rgb));--spectrum-seafoam-1200-rgb:1,75,67;--spectrum-seafoam-1200:rgba(var(--spectrum-seafoam-1200-rgb));--spectrum-seafoam-1300-rgb:0,60,54;--spectrum-seafoam-1300:rgba(var(--spectrum-seafoam-1300-rgb));--spectrum-seafoam-1400-rgb:0,46,40;--spectrum-seafoam-1400:rgba(var(--spectrum-seafoam-1400-rgb));--spectrum-seafoam-1500-rgb:0,33,29;--spectrum-seafoam-1500:rgba(var(--spectrum-seafoam-1500-rgb));--spectrum-seafoam-1600-rgb:0,15,14;--spectrum-seafoam-1600:rgba(var(--spectrum-seafoam-1600-rgb));--spectrum-cyan-100-rgb:238,250,254;--spectrum-cyan-100:rgba(var(--spectrum-cyan-100-rgb));--spectrum-cyan-200-rgb:217,244,253;--spectrum-cyan-200:rgba(var(--spectrum-cyan-200-rgb));--spectrum-cyan-300-rgb:183,231,252;--spectrum-cyan-300:rgba(var(--spectrum-cyan-300-rgb));--spectrum-cyan-400-rgb:138,213,255;--spectrum-cyan-400:rgba(var(--spectrum-cyan-400-rgb));--spectrum-cyan-500-rgb:92,192,255;--spectrum-cyan-500:rgba(var(--spectrum-cyan-500-rgb));--spectrum-cyan-600-rgb:48,167,254;--spectrum-cyan-600:rgba(var(--spectrum-cyan-600-rgb));--spectrum-cyan-700-rgb:29,149,231;--spectrum-cyan-700:rgba(var(--spectrum-cyan-700-rgb));--spectrum-cyan-800-rgb:18,134,205;--spectrum-cyan-800:rgba(var(--spectrum-cyan-800-rgb));--spectrum-cyan-900-rgb:11,120,179;--spectrum-cyan-900:rgba(var(--spectrum-cyan-900-rgb));--spectrum-cyan-1000-rgb:4,102,145;--spectrum-cyan-1000:rgba(var(--spectrum-cyan-1000-rgb));--spectrum-cyan-1100-rgb:0,87,121;--spectrum-cyan-1100:rgba(var(--spectrum-cyan-1100-rgb));--spectrum-cyan-1200-rgb:0,71,98;--spectrum-cyan-1200:rgba(var(--spectrum-cyan-1200-rgb));--spectrum-cyan-1300-rgb:0,57,78;--spectrum-cyan-1300:rgba(var(--spectrum-cyan-1300-rgb));--spectrum-cyan-1400-rgb:0,43,59;--spectrum-cyan-1400:rgba(var(--spectrum-cyan-1400-rgb));--spectrum-cyan-1500-rgb:0,31,43;--spectrum-cyan-1500:rgba(var(--spectrum-cyan-1500-rgb));--spectrum-cyan-1600-rgb:0,14,20;--spectrum-cyan-1600:rgba(var(--spectrum-cyan-1600-rgb));--spectrum-indigo-100-rgb:247,248,255;--spectrum-indigo-100:rgba(var(--spectrum-indigo-100-rgb));--spectrum-indigo-200-rgb:235,238,255;--spectrum-indigo-200:rgba(var(--spectrum-indigo-200-rgb));--spectrum-indigo-300-rgb:216,222,255;--spectrum-indigo-300:rgba(var(--spectrum-indigo-300-rgb));--spectrum-indigo-400-rgb:192,201,255;--spectrum-indigo-400:rgba(var(--spectrum-indigo-400-rgb));--spectrum-indigo-500-rgb:167,178,255;--spectrum-indigo-500:rgba(var(--spectrum-indigo-500-rgb));--spectrum-indigo-600-rgb:145,151,254;--spectrum-indigo-600:rgba(var(--spectrum-indigo-600-rgb));--spectrum-indigo-700-rgb:132,128,254;--spectrum-indigo-700:rgba(var(--spectrum-indigo-700-rgb));--spectrum-indigo-800-rgb:122,106,253;--spectrum-indigo-800:rgba(var(--spectrum-indigo-800-rgb));--spectrum-indigo-900-rgb:113,85,250;--spectrum-indigo-900:rgba(var(--spectrum-indigo-900-rgb));--spectrum-indigo-1000-rgb:99,56,238;--spectrum-indigo-1000:rgba(var(--spectrum-indigo-1000-rgb));--spectrum-indigo-1100-rgb:84,36,219;--spectrum-indigo-1100:rgba(var(--spectrum-indigo-1100-rgb));--spectrum-indigo-1200-rgb:69,19,191;--spectrum-indigo-1200:rgba(var(--spectrum-indigo-1200-rgb));--spectrum-indigo-1300-rgb:55,6,160;--spectrum-indigo-1300:rgba(var(--spectrum-indigo-1300-rgb));--spectrum-indigo-1400-rgb:42,0,129;--spectrum-indigo-1400:rgba(var(--spectrum-indigo-1400-rgb));--spectrum-indigo-1500-rgb:31,0,98;--spectrum-indigo-1500:rgba(var(--spectrum-indigo-1500-rgb));--spectrum-indigo-1600-rgb:17,0,54;--spectrum-indigo-1600:rgba(var(--spectrum-indigo-1600-rgb));--spectrum-purple-100-rgb:251,247,254;--spectrum-purple-100:rgba(var(--spectrum-purple-100-rgb));--spectrum-purple-200-rgb:244,235,252;--spectrum-purple-200:rgba(var(--spectrum-purple-200-rgb));--spectrum-purple-300-rgb:235,218,249;--spectrum-purple-300:rgba(var(--spectrum-purple-300-rgb));--spectrum-purple-400-rgb:221,193,246;--spectrum-purple-400:rgba(var(--spectrum-purple-400-rgb));--spectrum-purple-500-rgb:208,167,243;--spectrum-purple-500:rgba(var(--spectrum-purple-500-rgb));--spectrum-purple-600-rgb:191,138,238;--spectrum-purple-600:rgba(var(--spectrum-purple-600-rgb));--spectrum-purple-700-rgb:178,114,235;--spectrum-purple-700:rgba(var(--spectrum-purple-700-rgb));--spectrum-purple-800-rgb:166,92,231;--spectrum-purple-800:rgba(var(--spectrum-purple-800-rgb));--spectrum-purple-900-rgb:154,71,226;--spectrum-purple-900:rgba(var(--spectrum-purple-900-rgb));--spectrum-purple-1000-rgb:134,40,217;--spectrum-purple-1000:rgba(var(--spectrum-purple-1000-rgb));--spectrum-purple-1100-rgb:115,13,204;--spectrum-purple-1100:rgba(var(--spectrum-purple-1100-rgb));--spectrum-purple-1200-rgb:93,0,177;--spectrum-purple-1200:rgba(var(--spectrum-purple-1200-rgb));--spectrum-purple-1300-rgb:75,0,144;--spectrum-purple-1300:rgba(var(--spectrum-purple-1300-rgb));--spectrum-purple-1400-rgb:59,0,111;--spectrum-purple-1400:rgba(var(--spectrum-purple-1400-rgb));--spectrum-purple-1500-rgb:44,0,84;--spectrum-purple-1500:rgba(var(--spectrum-purple-1500-rgb));--spectrum-purple-1600-rgb:23,0,45;--spectrum-purple-1600:rgba(var(--spectrum-purple-1600-rgb));--spectrum-fuchsia-100-rgb:254,246,255;--spectrum-fuchsia-100:rgba(var(--spectrum-fuchsia-100-rgb));--spectrum-fuchsia-200-rgb:253,233,255;--spectrum-fuchsia-200:rgba(var(--spectrum-fuchsia-200-rgb));--spectrum-fuchsia-300-rgb:250,211,255;--spectrum-fuchsia-300:rgba(var(--spectrum-fuchsia-300-rgb));--spectrum-fuchsia-400-rgb:247,181,255;--spectrum-fuchsia-400:rgba(var(--spectrum-fuchsia-400-rgb));--spectrum-fuchsia-500-rgb:243,147,255;--spectrum-fuchsia-500:rgba(var(--spectrum-fuchsia-500-rgb));--spectrum-fuchsia-600-rgb:236,105,255;--spectrum-fuchsia-600:rgba(var(--spectrum-fuchsia-600-rgb));--spectrum-fuchsia-700-rgb:223,77,245;--spectrum-fuchsia-700:rgba(var(--spectrum-fuchsia-700-rgb));--spectrum-fuchsia-800-rgb:200,68,220;--spectrum-fuchsia-800:rgba(var(--spectrum-fuchsia-800-rgb));--spectrum-fuchsia-900-rgb:181,57,200;--spectrum-fuchsia-900:rgba(var(--spectrum-fuchsia-900-rgb));--spectrum-fuchsia-1000-rgb:156,40,175;--spectrum-fuchsia-1000:rgba(var(--spectrum-fuchsia-1000-rgb));--spectrum-fuchsia-1100-rgb:135,27,154;--spectrum-fuchsia-1100:rgba(var(--spectrum-fuchsia-1100-rgb));--spectrum-fuchsia-1200-rgb:113,15,131;--spectrum-fuchsia-1200:rgba(var(--spectrum-fuchsia-1200-rgb));--spectrum-fuchsia-1300-rgb:92,4,109;--spectrum-fuchsia-1300:rgba(var(--spectrum-fuchsia-1300-rgb));--spectrum-fuchsia-1400-rgb:72,0,88;--spectrum-fuchsia-1400:rgba(var(--spectrum-fuchsia-1400-rgb));--spectrum-fuchsia-1500-rgb:54,0,66;--spectrum-fuchsia-1500:rgba(var(--spectrum-fuchsia-1500-rgb));--spectrum-fuchsia-1600-rgb:29,0,35;--spectrum-fuchsia-1600:rgba(var(--spectrum-fuchsia-1600-rgb));--spectrum-magenta-100-rgb:255,245,248;--spectrum-magenta-100:rgba(var(--spectrum-magenta-100-rgb));--spectrum-magenta-200-rgb:255,232,240;--spectrum-magenta-200:rgba(var(--spectrum-magenta-200-rgb));--spectrum-magenta-300-rgb:255,213,227;--spectrum-magenta-300:rgba(var(--spectrum-magenta-300-rgb));--spectrum-magenta-400-rgb:255,185,208;--spectrum-magenta-400:rgba(var(--spectrum-magenta-400-rgb));--spectrum-magenta-500-rgb:255,152,187;--spectrum-magenta-500:rgba(var(--spectrum-magenta-500-rgb));--spectrum-magenta-600-rgb:255,112,159;--spectrum-magenta-600:rgba(var(--spectrum-magenta-600-rgb));--spectrum-magenta-700-rgb:255,72,133;--spectrum-magenta-700:rgba(var(--spectrum-magenta-700-rgb));--spectrum-magenta-800-rgb:240,45,110;--spectrum-magenta-800:rgba(var(--spectrum-magenta-800-rgb));--spectrum-magenta-900-rgb:217,35,97;--spectrum-magenta-900:rgba(var(--spectrum-magenta-900-rgb));--spectrum-magenta-1000-rgb:186,22,80;--spectrum-magenta-1000:rgba(var(--spectrum-magenta-1000-rgb));--spectrum-magenta-1100-rgb:163,5,62;--spectrum-magenta-1100:rgba(var(--spectrum-magenta-1100-rgb));--spectrum-magenta-1200-rgb:136,0,51;--spectrum-magenta-1200:rgba(var(--spectrum-magenta-1200-rgb));--spectrum-magenta-1300-rgb:111,0,40;--spectrum-magenta-1300:rgba(var(--spectrum-magenta-1300-rgb));--spectrum-magenta-1400-rgb:86,0,30;--spectrum-magenta-1400:rgba(var(--spectrum-magenta-1400-rgb));--spectrum-magenta-1500-rgb:64,0,22;--spectrum-magenta-1500:rgba(var(--spectrum-magenta-1500-rgb));--spectrum-magenta-1600-rgb:35,0,12;--spectrum-magenta-1600:rgba(var(--spectrum-magenta-1600-rgb));--spectrum-pink-100-rgb:255,246,252;--spectrum-pink-100:rgba(var(--spectrum-pink-100-rgb));--spectrum-pink-200-rgb:255,232,247;--spectrum-pink-200:rgba(var(--spectrum-pink-200-rgb));--spectrum-pink-300-rgb:255,211,240;--spectrum-pink-300:rgba(var(--spectrum-pink-300-rgb));--spectrum-pink-400-rgb:255,181,230;--spectrum-pink-400:rgba(var(--spectrum-pink-400-rgb));--spectrum-pink-500-rgb:255,148,219;--spectrum-pink-500:rgba(var(--spectrum-pink-500-rgb));--spectrum-pink-600-rgb:255,103,204;--spectrum-pink-600:rgba(var(--spectrum-pink-600-rgb));--spectrum-pink-700-rgb:242,76,184;--spectrum-pink-700:rgba(var(--spectrum-pink-700-rgb));--spectrum-pink-800-rgb:228,52,163;--spectrum-pink-800:rgba(var(--spectrum-pink-800-rgb));--spectrum-pink-900-rgb:206,42,146;--spectrum-pink-900:rgba(var(--spectrum-pink-900-rgb));--spectrum-pink-1000-rgb:176,31,123;--spectrum-pink-1000:rgba(var(--spectrum-pink-1000-rgb));--spectrum-pink-1100-rgb:152,22,104;--spectrum-pink-1100:rgba(var(--spectrum-pink-1100-rgb));--spectrum-pink-1200-rgb:128,12,85;--spectrum-pink-1200:rgba(var(--spectrum-pink-1200-rgb));--spectrum-pink-1300-rgb:105,3,68;--spectrum-pink-1300:rgba(var(--spectrum-pink-1300-rgb));--spectrum-pink-1400-rgb:83,0,53;--spectrum-pink-1400:rgba(var(--spectrum-pink-1400-rgb));--spectrum-pink-1500-rgb:62,0,39;--spectrum-pink-1500:rgba(var(--spectrum-pink-1500-rgb));--spectrum-pink-1600-rgb:33,0,21;--spectrum-pink-1600:rgba(var(--spectrum-pink-1600-rgb));--spectrum-turquoise-100-rgb:238,251,251;--spectrum-turquoise-100:rgba(var(--spectrum-turquoise-100-rgb));--spectrum-turquoise-200-rgb:209,245,245;--spectrum-turquoise-200:rgba(var(--spectrum-turquoise-200-rgb));--spectrum-turquoise-300-rgb:169,236,237;--spectrum-turquoise-300:rgba(var(--spectrum-turquoise-300-rgb));--spectrum-turquoise-400-rgb:111,221,228;--spectrum-turquoise-400:rgba(var(--spectrum-turquoise-400-rgb));--spectrum-turquoise-500-rgb:39,202,216;--spectrum-turquoise-500:rgba(var(--spectrum-turquoise-500-rgb));--spectrum-turquoise-600-rgb:15,177,192;--spectrum-turquoise-600:rgba(var(--spectrum-turquoise-600-rgb));--spectrum-turquoise-700-rgb:12,158,171;--spectrum-turquoise-700:rgba(var(--spectrum-turquoise-700-rgb));--spectrum-turquoise-800-rgb:10,141,153;--spectrum-turquoise-800:rgba(var(--spectrum-turquoise-800-rgb));--spectrum-turquoise-900-rgb:8,126,137;--spectrum-turquoise-900:rgba(var(--spectrum-turquoise-900-rgb));--spectrum-turquoise-1000-rgb:5,107,116;--spectrum-turquoise-1000:rgba(var(--spectrum-turquoise-1000-rgb));--spectrum-turquoise-1100-rgb:3,90,98;--spectrum-turquoise-1100:rgba(var(--spectrum-turquoise-1100-rgb));--spectrum-turquoise-1200-rgb:1,74,81;--spectrum-turquoise-1200:rgba(var(--spectrum-turquoise-1200-rgb));--spectrum-turquoise-1300-rgb:0,59,65;--spectrum-turquoise-1300:rgba(var(--spectrum-turquoise-1300-rgb));--spectrum-turquoise-1400-rgb:0,44,49;--spectrum-turquoise-1400:rgba(var(--spectrum-turquoise-1400-rgb));--spectrum-turquoise-1500-rgb:0,32,35;--spectrum-turquoise-1500:rgba(var(--spectrum-turquoise-1500-rgb));--spectrum-turquoise-1600-rgb:0,15,17;--spectrum-turquoise-1600:rgba(var(--spectrum-turquoise-1600-rgb));--spectrum-brown-100-rgb:252,247,242;--spectrum-brown-100:rgba(var(--spectrum-brown-100-rgb));--spectrum-brown-200-rgb:247,238,225;--spectrum-brown-200:rgba(var(--spectrum-brown-200-rgb));--spectrum-brown-300-rgb:239,221,195;--spectrum-brown-300:rgba(var(--spectrum-brown-300-rgb));--spectrum-brown-400-rgb:229,200,157;--spectrum-brown-400:rgba(var(--spectrum-brown-400-rgb));--spectrum-brown-500-rgb:214,177,123;--spectrum-brown-500:rgba(var(--spectrum-brown-500-rgb));--spectrum-brown-600-rgb:190,155,104;--spectrum-brown-600:rgba(var(--spectrum-brown-600-rgb));--spectrum-brown-700-rgb:171,138,90;--spectrum-brown-700:rgba(var(--spectrum-brown-700-rgb));--spectrum-brown-800-rgb:154,123,77;--spectrum-brown-800:rgba(var(--spectrum-brown-800-rgb));--spectrum-brown-900-rgb:139,109,66;--spectrum-brown-900:rgba(var(--spectrum-brown-900-rgb));--spectrum-brown-1000-rgb:119,91,50;--spectrum-brown-1000:rgba(var(--spectrum-brown-1000-rgb));--spectrum-brown-1100-rgb:103,76,35;--spectrum-brown-1100:rgba(var(--spectrum-brown-1100-rgb));--spectrum-brown-1200-rgb:88,61,21;--spectrum-brown-1200:rgba(var(--spectrum-brown-1200-rgb));--spectrum-brown-1300-rgb:70,49,17;--spectrum-brown-1300:rgba(var(--spectrum-brown-1300-rgb));--spectrum-brown-1400-rgb:52,37,13;--spectrum-brown-1400:rgba(var(--spectrum-brown-1400-rgb));--spectrum-brown-1500-rgb:38,26,9;--spectrum-brown-1500:rgba(var(--spectrum-brown-1500-rgb));--spectrum-brown-1600-rgb:16,12,4;--spectrum-brown-1600:rgba(var(--spectrum-brown-1600-rgb));--spectrum-silver-100-rgb:247,247,247;--spectrum-silver-100:rgba(var(--spectrum-silver-100-rgb));--spectrum-silver-200-rgb:239,239,239;--spectrum-silver-200:rgba(var(--spectrum-silver-200-rgb));--spectrum-silver-300-rgb:223,223,223;--spectrum-silver-300:rgba(var(--spectrum-silver-300-rgb));--spectrum-silver-400-rgb:204,204,204;--spectrum-silver-400:rgba(var(--spectrum-silver-400-rgb));--spectrum-silver-500-rgb:183,183,183;--spectrum-silver-500:rgba(var(--spectrum-silver-500-rgb));--spectrum-silver-600-rgb:160,160,160;--spectrum-silver-600:rgba(var(--spectrum-silver-600-rgb));--spectrum-silver-700-rgb:143,143,143;--spectrum-silver-700:rgba(var(--spectrum-silver-700-rgb));--spectrum-silver-800-rgb:128,128,128;--spectrum-silver-800:rgba(var(--spectrum-silver-800-rgb));--spectrum-silver-900-rgb:114,114,114;--spectrum-silver-900:rgba(var(--spectrum-silver-900-rgb));--spectrum-silver-1000-rgb:96,96,96;--spectrum-silver-1000:rgba(var(--spectrum-silver-1000-rgb));--spectrum-silver-1100-rgb:81,81,81;--spectrum-silver-1100:rgba(var(--spectrum-silver-1100-rgb));--spectrum-silver-1200-rgb:66,66,66;--spectrum-silver-1200:rgba(var(--spectrum-silver-1200-rgb));--spectrum-silver-1300-rgb:52,52,52;--spectrum-silver-1300:rgba(var(--spectrum-silver-1300-rgb));--spectrum-silver-1400-rgb:39,39,39;--spectrum-silver-1400:rgba(var(--spectrum-silver-1400-rgb));--spectrum-silver-1500-rgb:28,28,28;--spectrum-silver-1500:rgba(var(--spectrum-silver-1500-rgb));--spectrum-silver-1600-rgb:12,12,12;--spectrum-silver-1600:rgba(var(--spectrum-silver-1600-rgb));--spectrum-cinnamon-100-rgb:253,247,243;--spectrum-cinnamon-100:rgba(var(--spectrum-cinnamon-100-rgb));--spectrum-cinnamon-200-rgb:249,236,229;--spectrum-cinnamon-200:rgba(var(--spectrum-cinnamon-200-rgb));--spectrum-cinnamon-300-rgb:244,218,203;--spectrum-cinnamon-300:rgba(var(--spectrum-cinnamon-300-rgb));--spectrum-cinnamon-400-rgb:237,196,172;--spectrum-cinnamon-400:rgba(var(--spectrum-cinnamon-400-rgb));--spectrum-cinnamon-500-rgb:229,170,136;--spectrum-cinnamon-500:rgba(var(--spectrum-cinnamon-500-rgb));--spectrum-cinnamon-600-rgb:212,145,108;--spectrum-cinnamon-600:rgba(var(--spectrum-cinnamon-600-rgb));--spectrum-cinnamon-700-rgb:198,126,88;--spectrum-cinnamon-700:rgba(var(--spectrum-cinnamon-700-rgb));--spectrum-cinnamon-800-rgb:184,109,70;--spectrum-cinnamon-800:rgba(var(--spectrum-cinnamon-800-rgb));--spectrum-cinnamon-900-rgb:170,94,56;--spectrum-cinnamon-900:rgba(var(--spectrum-cinnamon-900-rgb));--spectrum-cinnamon-1000-rgb:147,77,43;--spectrum-cinnamon-1000:rgba(var(--spectrum-cinnamon-1000-rgb));--spectrum-cinnamon-1100-rgb:128,62,32;--spectrum-cinnamon-1100:rgba(var(--spectrum-cinnamon-1100-rgb));--spectrum-cinnamon-1200-rgb:110,48,21;--spectrum-cinnamon-1200:rgba(var(--spectrum-cinnamon-1200-rgb));--spectrum-cinnamon-1300-rgb:92,35,11;--spectrum-cinnamon-1300:rgba(var(--spectrum-cinnamon-1300-rgb));--spectrum-cinnamon-1400-rgb:72,25,6;--spectrum-cinnamon-1400:rgba(var(--spectrum-cinnamon-1400-rgb));--spectrum-cinnamon-1500-rgb:52,18,4;--spectrum-cinnamon-1500:rgba(var(--spectrum-cinnamon-1500-rgb));--spectrum-cinnamon-1600-rgb:24,8,2;--spectrum-cinnamon-1600:rgba(var(--spectrum-cinnamon-1600-rgb));--spectrum-icon-color-blue-primary-default:var(--spectrum-blue-900);--spectrum-icon-color-green-primary-default:var(--spectrum-green-900);--spectrum-icon-color-red-primary-default:var(--spectrum-red-900);--spectrum-icon-color-yellow-primary-default:var(--spectrum-yellow-400);--spectrum-menu-item-background-color-default-rgb:0,0,0;--spectrum-menu-item-background-color-default-opacity:0;--spectrum-menu-item-background-color-default:rgba(var(--spectrum-menu-item-background-color-default-rgb),var(--spectrum-menu-item-background-color-default-opacity));--spectrum-menu-item-background-color-hover:var(--spectrum-transparent-black-200);--spectrum-menu-item-background-color-down:var(--spectrum-transparent-black-200);--spectrum-menu-item-background-color-key-focus:var(--spectrum-transparent-black-200);--spectrum-drop-zone-background-color-rgb:var(--spectrum-blue-800-rgb);--spectrum-dropindicator-color:var(--spectrum-blue-800);--spectrum-calendar-day-background-color-selected:rgba(var(--spectrum-blue-900-rgb),.1);--spectrum-calendar-day-background-color-hover:rgba(var(--spectrum-black-rgb),.06);--spectrum-calendar-day-today-background-color-selected-hover:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-calendar-day-background-color-selected-hover:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-calendar-day-background-color-down:var(--spectrum-transparent-black-200);--spectrum-calendar-day-background-color-cap-selected:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-calendar-day-background-color-key-focus:rgba(var(--spectrum-black-rgb),.06);--spectrum-calendar-day-border-color-key-focus:var(--spectrum-blue-800);--spectrum-badge-label-icon-color-primary:var(--spectrum-white);--spectrum-coach-indicator-ring-default-color:var(--spectrum-blue-800);--spectrum-coach-indicator-ring-dark-color:var(--spectrum-gray-900);--spectrum-coach-indicator-ring-light-color:var(--spectrum-gray-50);--spectrum-well-border-color:var(--spectrum-black-rgb);--spectrum-steplist-current-marker-color-key-focus:var(--spectrum-blue-800);--spectrum-treeview-item-background-color-quiet-selected:rgba(var(--spectrum-gray-900-rgb),.06);--spectrum-treeview-item-background-color-selected:rgba(var(--spectrum-blue-900-rgb),.1);--spectrum-logic-button-and-background-color:var(--spectrum-blue-900);--spectrum-logic-button-and-border-color:var(--spectrum-blue-900);--spectrum-logic-button-and-background-color-hover:var(--spectrum-blue-1100);--spectrum-logic-button-and-border-color-hover:var(--spectrum-blue-1100);--spectrum-logic-button-or-background-color:var(--spectrum-magenta-900);--spectrum-logic-button-or-border-color:var(--spectrum-magenta-900);--spectrum-logic-button-or-background-color-hover:var(--spectrum-magenta-1100);--spectrum-logic-button-or-border-color-hover:var(--spectrum-magenta-1100);--spectrum-assetcard-border-color-selected:var(--spectrum-blue-900);--spectrum-assetcard-border-color-selected-hover:var(--spectrum-blue-900);--spectrum-assetcard-border-color-selected-down:var(--spectrum-blue-1000);--spectrum-assetcard-selectionindicator-background-color-ordered:var(--spectrum-blue-900);--spectrum-assestcard-focus-indicator-color:var(--spectrum-blue-800);--spectrum-assetlist-item-background-color-selected-hover:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-assetlist-item-background-color-selected:rgba(var(--spectrum-blue-900-rgb),.1);--spectrum-assetlist-border-color-key-focus:var(--spectrum-blue-800)}:host,:root{color-scheme:light}
`;
var theme_light_core_tokens_css_default = e10;

// node_modules/@spectrum-web-components/theme/src/spectrum-two/theme-core-tokens.css.js
var e11 = i`
            /*!
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
:host,:root{--spectrum-focus-indicator-color:var(--spectrum-blue-800);--spectrum-static-white-focus-indicator-color:var(--spectrum-white);--spectrum-static-black-focus-indicator-color:var(--spectrum-black);--spectrum-overlay-color:var(--spectrum-black);--spectrum-opacity-disabled:.3;--spectrum-background-base-color:var(--spectrum-gray-25);--spectrum-background-layer-1-color:var(--spectrum-gray-50);--spectrum-neutral-background-color-default:var(--spectrum-gray-800);--spectrum-neutral-background-color-hover:var(--spectrum-gray-900);--spectrum-neutral-background-color-down:var(--spectrum-gray-900);--spectrum-neutral-background-color-key-focus:var(--spectrum-gray-900);--spectrum-neutral-background-color-selected-default:var(--spectrum-gray-800);--spectrum-neutral-background-color-selected-hover:var(--spectrum-gray-900);--spectrum-neutral-background-color-selected-down:var(--spectrum-gray-900);--spectrum-neutral-background-color-selected-key-focus:var(--spectrum-gray-900);--spectrum-neutral-subdued-content-color-selected:var(--spectrum-neutral-subdued-content-color-down);--spectrum-accent-content-color-selected:var(--spectrum-accent-content-color-down);--spectrum-disabled-background-color:var(--spectrum-gray-100);--spectrum-disabled-static-white-background-color:var(--spectrum-transparent-white-100);--spectrum-disabled-static-black-background-color:var(--spectrum-transparent-black-100);--spectrum-background-opacity-default:0;--spectrum-background-opacity-hover:.1;--spectrum-background-opacity-down:.1;--spectrum-background-opacity-key-focus:.1;--spectrum-neutral-content-color-default:var(--spectrum-gray-800);--spectrum-neutral-content-color-hover:var(--spectrum-gray-900);--spectrum-neutral-content-color-down:var(--spectrum-gray-900);--spectrum-neutral-content-color-focus-hover:var(--spectrum-neutral-content-color-down);--spectrum-neutral-content-color-focus:var(--spectrum-neutral-content-color-down);--spectrum-neutral-content-color-key-focus:var(--spectrum-gray-900);--spectrum-neutral-subdued-content-color-default:var(--spectrum-gray-700);--spectrum-neutral-subdued-content-color-hover:var(--spectrum-gray-800);--spectrum-neutral-subdued-content-color-down:var(--spectrum-gray-800);--spectrum-neutral-subdued-content-color-key-focus:var(--spectrum-gray-800);--spectrum-accent-content-color-default:var(--spectrum-accent-color-900);--spectrum-accent-content-color-hover:var(--spectrum-accent-color-1000);--spectrum-accent-content-color-down:var(--spectrum-accent-color-1000);--spectrum-accent-content-color-key-focus:var(--spectrum-accent-color-1000);--spectrum-negative-content-color-default:var(--spectrum-negative-color-900);--spectrum-negative-content-color-hover:var(--spectrum-negative-color-1000);--spectrum-negative-content-color-down:var(--spectrum-negative-color-1000);--spectrum-negative-content-color-key-focus:var(--spectrum-negative-color-1000);--spectrum-disabled-content-color:var(--spectrum-gray-400);--spectrum-disabled-static-white-content-color:var(--spectrum-transparent-white-400);--spectrum-disabled-static-black-content-color:var(--spectrum-transparent-black-400);--spectrum-disabled-border-color:var(--spectrum-gray-300);--spectrum-disabled-static-white-border-color:var(--spectrum-transparent-white-300);--spectrum-disabled-static-black-border-color:var(--spectrum-transparent-black-300);--spectrum-negative-border-color-default:var(--spectrum-negative-color-900);--spectrum-negative-border-color-hover:var(--spectrum-negative-color-1000);--spectrum-negative-border-color-down:var(--spectrum-negative-color-1100);--spectrum-negative-border-color-focus-hover:var(--spectrum-negative-border-color-down);--spectrum-negative-border-color-focus:var(--spectrum-negative-color-1000);--spectrum-negative-border-color-key-focus:var(--spectrum-negative-color-1000);--spectrum-swatch-border-color:var(--spectrum-gray-900);--spectrum-swatch-border-opacity:.51;--spectrum-swatch-disabled-icon-border-color:var(--spectrum-black);--spectrum-swatch-disabled-icon-border-opacity:.51;--spectrum-thumbnail-border-color:var(--spectrum-gray-800);--spectrum-thumbnail-border-opacity:.1;--spectrum-thumbnail-opacity-disabled:var(--spectrum-opacity-disabled);--spectrum-opacity-checkerboard-square-light:var(--spectrum-white);--spectrum-avatar-opacity-disabled:var(--spectrum-opacity-disabled);--spectrum-color-area-border-color:var(--spectrum-gray-1000);--spectrum-color-area-border-opacity:.1;--spectrum-color-slider-border-color:var(--spectrum-gray-1000);--spectrum-color-slider-border-opacity:.1;--spectrum-color-loupe-drop-shadow-color:var(--spectrum-transparent-black-300);--spectrum-color-loupe-drop-shadow-y:2px;--spectrum-color-loupe-drop-shadow-blur:8px;--spectrum-color-loupe-inner-border:var(--spectrum-transparent-black-200);--spectrum-color-loupe-outer-border:var(--spectrum-white);--spectrum-card-selection-background-color:var(--spectrum-gray-100);--spectrum-card-selection-background-color-opacity:.95;--spectrum-drop-zone-background-color:var(--spectrum-accent-visual-color);--spectrum-drop-zone-background-color-opacity:.1;--spectrum-drop-zone-background-color-opacity-filled:.3;--spectrum-coach-mark-pagination-color:var(--spectrum-gray-600);--spectrum-color-handle-inner-border-color:var(--spectrum-black);--spectrum-color-handle-inner-border-opacity:.42;--spectrum-color-handle-outer-border-color:var(--spectrum-black);--spectrum-color-handle-outer-border-opacity:var(--spectrum-color-handle-inner-border-opacity);--spectrum-color-handle-drop-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-floating-action-button-drop-shadow-color:var(--spectrum-transparent-black-300);--spectrum-floating-action-button-shadow-color:var(--spectrum-floating-action-button-drop-shadow-color);--spectrum-table-row-hover-color:var(--spectrum-gray-900);--spectrum-table-row-hover-opacity:.07;--spectrum-table-selected-row-background-color:var(--spectrum-informative-background-color-default);--spectrum-table-selected-row-background-opacity:.1;--spectrum-table-selected-row-background-color-non-emphasized:var(--spectrum-neutral-background-color-selected-default);--spectrum-table-selected-row-background-opacity-non-emphasized:.1;--spectrum-table-row-down-opacity:.1;--spectrum-table-selected-row-background-opacity-hover:.15;--spectrum-table-selected-row-background-opacity-non-emphasized-hover:.15;--spectrum-white-rgb:255,255,255;--spectrum-white:rgba(var(--spectrum-white-rgb));--spectrum-transparent-white-25-rgb:255,255,255;--spectrum-transparent-white-25-opacity:0;--spectrum-transparent-white-25:rgba(var(--spectrum-transparent-white-25-rgb),var(--spectrum-transparent-white-25-opacity));--spectrum-transparent-white-50-rgb:255,255,255;--spectrum-transparent-white-50-opacity:.04;--spectrum-transparent-white-50:rgba(var(--spectrum-transparent-white-50-rgb),var(--spectrum-transparent-white-50-opacity));--spectrum-transparent-white-75-rgb:255,255,255;--spectrum-transparent-white-75-opacity:.07;--spectrum-transparent-white-75:rgba(var(--spectrum-transparent-white-75-rgb),var(--spectrum-transparent-white-75-opacity));--spectrum-transparent-white-100-rgb:255,255,255;--spectrum-transparent-white-100-opacity:.11;--spectrum-transparent-white-100:rgba(var(--spectrum-transparent-white-100-rgb),var(--spectrum-transparent-white-100-opacity));--spectrum-transparent-white-200-rgb:255,255,255;--spectrum-transparent-white-200-opacity:.14;--spectrum-transparent-white-200:rgba(var(--spectrum-transparent-white-200-rgb),var(--spectrum-transparent-white-200-opacity));--spectrum-transparent-white-300-rgb:255,255,255;--spectrum-transparent-white-300-opacity:.17;--spectrum-transparent-white-300:rgba(var(--spectrum-transparent-white-300-rgb),var(--spectrum-transparent-white-300-opacity));--spectrum-transparent-white-400-rgb:255,255,255;--spectrum-transparent-white-400-opacity:.21;--spectrum-transparent-white-400:rgba(var(--spectrum-transparent-white-400-rgb),var(--spectrum-transparent-white-400-opacity));--spectrum-transparent-white-500-rgb:255,255,255;--spectrum-transparent-white-500-opacity:.39;--spectrum-transparent-white-500:rgba(var(--spectrum-transparent-white-500-rgb),var(--spectrum-transparent-white-500-opacity));--spectrum-transparent-white-600-rgb:255,255,255;--spectrum-transparent-white-600-opacity:.51;--spectrum-transparent-white-600:rgba(var(--spectrum-transparent-white-600-rgb),var(--spectrum-transparent-white-600-opacity));--spectrum-transparent-white-700-rgb:255,255,255;--spectrum-transparent-white-700-opacity:.66;--spectrum-transparent-white-700:rgba(var(--spectrum-transparent-white-700-rgb),var(--spectrum-transparent-white-700-opacity));--spectrum-transparent-white-800-rgb:255,255,255;--spectrum-transparent-white-800-opacity:.85;--spectrum-transparent-white-800:rgba(var(--spectrum-transparent-white-800-rgb),var(--spectrum-transparent-white-800-opacity));--spectrum-transparent-white-900-rgb:255,255,255;--spectrum-transparent-white-900-opacity:.94;--spectrum-transparent-white-900:rgba(var(--spectrum-transparent-white-900-rgb),var(--spectrum-transparent-white-900-opacity));--spectrum-transparent-white-1000-rgb:255,255,255;--spectrum-transparent-white-1000:rgba(var(--spectrum-transparent-white-1000-rgb));--spectrum-black-rgb:0,0,0;--spectrum-black:rgba(var(--spectrum-black-rgb));--spectrum-transparent-black-25-rgb:0,0,0;--spectrum-transparent-black-25-opacity:0;--spectrum-transparent-black-25:rgba(var(--spectrum-transparent-black-25-rgb),var(--spectrum-transparent-black-25-opacity));--spectrum-transparent-black-50-rgb:0,0,0;--spectrum-transparent-black-50-opacity:.03;--spectrum-transparent-black-50:rgba(var(--spectrum-transparent-black-50-rgb),var(--spectrum-transparent-black-50-opacity));--spectrum-transparent-black-75-rgb:0,0,0;--spectrum-transparent-black-75-opacity:.05;--spectrum-transparent-black-75:rgba(var(--spectrum-transparent-black-75-rgb),var(--spectrum-transparent-black-75-opacity));--spectrum-transparent-black-100-rgb:0,0,0;--spectrum-transparent-black-100-opacity:.09;--spectrum-transparent-black-100:rgba(var(--spectrum-transparent-black-100-rgb),var(--spectrum-transparent-black-100-opacity));--spectrum-transparent-black-200-rgb:0,0,0;--spectrum-transparent-black-200-opacity:.12;--spectrum-transparent-black-200:rgba(var(--spectrum-transparent-black-200-rgb),var(--spectrum-transparent-black-200-opacity));--spectrum-transparent-black-300-rgb:0,0,0;--spectrum-transparent-black-300-opacity:.15;--spectrum-transparent-black-300:rgba(var(--spectrum-transparent-black-300-rgb),var(--spectrum-transparent-black-300-opacity));--spectrum-transparent-black-400-rgb:0,0,0;--spectrum-transparent-black-400-opacity:.22;--spectrum-transparent-black-400:rgba(var(--spectrum-transparent-black-400-rgb),var(--spectrum-transparent-black-400-opacity));--spectrum-transparent-black-500-rgb:0,0,0;--spectrum-transparent-black-500-opacity:.44;--spectrum-transparent-black-500:rgba(var(--spectrum-transparent-black-500-rgb),var(--spectrum-transparent-black-500-opacity));--spectrum-transparent-black-600-rgb:0,0,0;--spectrum-transparent-black-600-opacity:.56;--spectrum-transparent-black-600:rgba(var(--spectrum-transparent-black-600-rgb),var(--spectrum-transparent-black-600-opacity));--spectrum-transparent-black-700-rgb:0,0,0;--spectrum-transparent-black-700-opacity:.69;--spectrum-transparent-black-700:rgba(var(--spectrum-transparent-black-700-rgb),var(--spectrum-transparent-black-700-opacity));--spectrum-transparent-black-800-rgb:0,0,0;--spectrum-transparent-black-800-opacity:.84;--spectrum-transparent-black-800:rgba(var(--spectrum-transparent-black-800-rgb),var(--spectrum-transparent-black-800-opacity));--spectrum-transparent-black-900-rgb:0,0,0;--spectrum-transparent-black-900-opacity:.93;--spectrum-transparent-black-900:rgba(var(--spectrum-transparent-black-900-rgb),var(--spectrum-transparent-black-900-opacity));--spectrum-transparent-black-1000-rgb:0,0,0;--spectrum-transparent-black-1000:rgba(var(--spectrum-transparent-black-1000-rgb));--spectrum-icon-color-inverse:var(--spectrum-gray-50);--spectrum-icon-color-primary-default:var(--spectrum-neutral-content-color-default);--spectrum-radio-button-selection-indicator:4px;--spectrum-field-label-top-margin-small:0px;--spectrum-field-label-top-margin-medium:0px;--spectrum-field-label-top-margin-large:0px;--spectrum-field-label-top-margin-extra-large:0px;--spectrum-field-label-to-component:0px;--spectrum-help-text-to-component:0px;--spectrum-status-light-dot-size-small:8px;--spectrum-action-button-edge-to-hold-icon-extra-small:3px;--spectrum-action-button-edge-to-hold-icon-small:3px;--spectrum-button-minimum-width-multiplier:2.25;--spectrum-divider-thickness-small:1px;--spectrum-divider-thickness-medium:2px;--spectrum-divider-thickness-large:4px;--spectrum-swatch-rectangle-width-multiplier:2;--spectrum-swatch-slash-thickness-extra-small:2px;--spectrum-swatch-slash-thickness-small:3px;--spectrum-swatch-slash-thickness-medium:4px;--spectrum-swatch-slash-thickness-large:5px;--spectrum-progress-bar-minimum-width:48px;--spectrum-progress-bar-maximum-width:768px;--spectrum-meter-minimum-width:48px;--spectrum-meter-maximum-width:768px;--spectrum-meter-default-width:var(--spectrum-meter-width);--spectrum-in-line-alert-minimum-width:240px;--spectrum-popover-tip-width:16px;--spectrum-popover-tip-height:8px;--spectrum-menu-item-label-to-description:1px;--spectrum-menu-item-section-divider-height:8px;--spectrum-slider-track-thickness:2px;--spectrum-slider-handle-gap:4px;--spectrum-picker-minimum-width-multiplier:2;--spectrum-picker-border-width:var(--spectrum-border-width-100);--spectrum-picker-end-edge-to-disclousure-icon-quiet:var(--spectrum-picker-end-edge-to-disclosure-icon-quiet);--spectrum-picker-end-edge-to-disclosure-icon-quiet:0px;--spectrum-text-field-minimum-width-multiplier:1.5;--spectrum-combo-box-minimum-width-multiplier:2.5;--spectrum-combo-box-quiet-minimum-width-multiplier:2;--spectrum-combo-box-visual-to-field-button-quiet:0px;--spectrum-alert-dialog-minimum-width:288px;--spectrum-alert-dialog-maximum-width:480px;--spectrum-contextual-help-minimum-width:268px;--spectrum-breadcrumbs-height:var(--spectrum-component-height-300);--spectrum-breadcrumbs-height-compact:var(--spectrum-component-height-200);--spectrum-breadcrumbs-end-edge-to-text:0px;--spectrum-breadcrumbs-truncated-menu-to-separator-icon:0px;--spectrum-breadcrumbs-start-edge-to-truncated-menu:0px;--spectrum-breadcrumbs-truncated-menu-to-bottom-text:0px;--spectrum-alert-banner-to-top-workflow-icon:var(--spectrum-alert-banner-top-to-workflow-icon);--spectrum-alert-banner-to-top-text:var(--spectrum-alert-banner-top-to-text);--spectrum-alert-banner-to-bottom-text:var(--spectrum-alert-banner-bottom-to-text);--spectrum-color-area-border-width:var(--spectrum-border-width-100);--spectrum-color-area-border-rounding:var(--spectrum-corner-radius-medium-size-small);--spectrum-color-wheel-color-area-margin:12px;--spectrum-color-slider-border-width:1px;--spectrum-color-slider-border-rounding:var(--spectrum-corner-radius-medium-size-small);--spectrum-floating-action-button-drop-shadow-blur:12px;--spectrum-floating-action-button-drop-shadow-y:4px;--spectrum-illustrated-message-maximum-width:380px;--spectrum-search-field-minimum-width-multiplier:4;--spectrum-color-loupe-height:64px;--spectrum-color-loupe-width:48px;--spectrum-color-loupe-bottom-to-color-handle:12px;--spectrum-color-loupe-outer-border-width:var(--spectrum-border-width-200);--spectrum-color-loupe-inner-border-width:1px;--spectrum-card-minimum-width:100px;--spectrum-card-preview-minimum-height:130px;--spectrum-card-selection-background-size:40px;--spectrum-drop-zone-width:428px;--spectrum-drop-zone-content-maximum-width:var(--spectrum-illustrated-message-maximum-width);--spectrum-drop-zone-border-dash-length:8px;--spectrum-drop-zone-border-dash-gap:4px;--spectrum-drop-zone-title-size:var(--spectrum-illustrated-message-title-size);--spectrum-drop-zone-cjk-title-size:var(--spectrum-illustrated-message-cjk-title-size);--spectrum-drop-zone-body-size:var(--spectrum-illustrated-message-body-size);--spectrum-accordion-top-to-text-compact-small:2px;--spectrum-accordion-top-to-text-compact-medium:4px;--spectrum-accordion-disclosure-indicator-to-text:0px;--spectrum-accordion-edge-to-disclosure-indicator:0px;--spectrum-accordion-edge-to-text:0px;--spectrum-accordion-focus-indicator-gap:0px;--spectrum-color-handle-border-width:var(--spectrum-border-width-200);--spectrum-color-handle-inner-border-width:1px;--spectrum-color-handle-outer-border-width:1px;--spectrum-color-handle-drop-shadow-x:0;--spectrum-color-handle-drop-shadow-y:0;--spectrum-color-handle-drop-shadow-blur:0;--spectrum-table-row-height-small-compact:var(--spectrum-component-height-75);--spectrum-table-row-height-medium-compact:var(--spectrum-component-height-100);--spectrum-table-row-height-large-compact:var(--spectrum-component-height-200);--spectrum-table-row-height-extra-large-compact:var(--spectrum-component-height-300);--spectrum-table-row-top-to-text-small-compact:var(--spectrum-component-top-to-text-75);--spectrum-table-row-top-to-text-medium-compact:var(--spectrum-component-top-to-text-100);--spectrum-table-row-top-to-text-large-compact:var(--spectrum-component-top-to-text-200);--spectrum-table-row-top-to-text-extra-large-compact:var(--spectrum-component-top-to-text-300);--spectrum-table-row-bottom-to-text-small-compact:var(--spectrum-component-bottom-to-text-75);--spectrum-table-row-bottom-to-text-medium-compact:var(--spectrum-component-bottom-to-text-100);--spectrum-table-row-bottom-to-text-large-compact:var(--spectrum-component-bottom-to-text-200);--spectrum-table-row-bottom-to-text-extra-large-compact:var(--spectrum-component-bottom-to-text-300);--spectrum-table-edge-to-content:16px;--spectrum-table-border-divider-width:1px;--spectrum-tab-item-height-small:var(--spectrum-component-height-200);--spectrum-tab-item-height-medium:var(--spectrum-component-height-300);--spectrum-tab-item-height-large:var(--spectrum-component-height-400);--spectrum-tab-item-height-extra-large:var(--spectrum-component-height-500);--spectrum-tab-item-compact-height-small:var(--spectrum-component-height-75);--spectrum-tab-item-compact-height-medium:var(--spectrum-component-height-100);--spectrum-tab-item-compact-height-large:var(--spectrum-component-height-200);--spectrum-tab-item-compact-height-extra-large:var(--spectrum-component-height-300);--spectrum-tab-item-start-to-edge-quiet:0px;--spectrum-in-field-button-width-stacked-small:20px;--spectrum-in-field-button-width-stacked-medium:28px;--spectrum-in-field-button-width-stacked-large:36px;--spectrum-in-field-button-width-stacked-extra-large:44px;--spectrum-in-field-button-fill-stacked-inner-border-rounding:0px;--spectrum-in-field-button-edge-to-fill:0px;--spectrum-in-field-button-stacked-inner-edge-to-fill:0px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-small:7px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-medium:9px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-large:13px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-extra-large:16px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small:3px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium:3px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large:4px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large:5px;--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-small:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small);--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-medium:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium);--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-large:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large);--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-extra-large:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large);--spectrum-asterisk-icon-size-75:8px;--spectrum-divider-vertical-minimum-height:200px;--spectrum-divider-horizontal-minimum-width:200px;--spectrum-tooltip-tip-corner-radius:1px;--spectrum-tag-minimum-width-multiplier:1;--spectrum-tag-maximum-width-multiplier:7;--spectrum-title-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-title-cjk-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-title-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-title-cjk-font-style:var(--spectrum-default-font-style);--spectrum-title-cjk-font-weight:var(--spectrum-bold-font-weight);--spectrum-title-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-title-cjk-size-l:var(--spectrum-font-size-200);--spectrum-title-cjk-size-m:var(--spectrum-font-size-100);--spectrum-title-cjk-size-s:var(--spectrum-font-size-75);--spectrum-title-cjk-size-xl:var(--spectrum-font-size-300);--spectrum-title-cjk-size-xs:var(--spectrum-font-size-50);--spectrum-title-cjk-size-xxl:var(--spectrum-font-size-400);--spectrum-title-cjk-size-xxxl:var(--spectrum-font-size-500);--spectrum-title-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-title-cjk-strong-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-title-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-title-cjk-strong-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-title-line-height:var(--spectrum-line-height-100);--spectrum-title-margin-bottom-multiplier:.25;--spectrum-title-margin-top-multiplier:.888889;--spectrum-title-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-title-sans-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-title-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-title-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-title-sans-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-title-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-title-sans-serif-strong-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-title-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-title-sans-serif-strong-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-title-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-title-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-title-serif-font-family:var(--spectrum-serif-font-family);--spectrum-title-serif-font-style:var(--spectrum-default-font-style);--spectrum-title-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-title-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-title-serif-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-title-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-title-serif-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-title-size-l:var(--spectrum-font-size-300);--spectrum-title-size-m:var(--spectrum-font-size-200);--spectrum-title-size-s:var(--spectrum-font-size-100);--spectrum-title-size-xl:var(--spectrum-font-size-400);--spectrum-title-size-xs:var(--spectrum-font-size-75);--spectrum-title-size-xxl:var(--spectrum-font-size-500);--spectrum-title-size-xxxl:var(--spectrum-font-size-600);--spectrum-corner-radius-0:0px;--spectrum-corner-radius-75:3px;--spectrum-corner-radius-100:4px;--spectrum-corner-radius-200:5px;--spectrum-corner-radius-300:6px;--spectrum-corner-radius-400:7px;--spectrum-corner-radius-500:8px;--spectrum-corner-radius-600:9px;--spectrum-corner-radius-700:10px;--spectrum-corner-radius-800:16px;--spectrum-corner-radius-1000:9999px;--spectrum-drop-shadow-x:0px;--spectrum-android-elevation:2dp;--spectrum-spacing-50:2px;--spectrum-spacing-75:4px;--spectrum-spacing-100:8px;--spectrum-spacing-200:12px;--spectrum-spacing-300:16px;--spectrum-spacing-400:24px;--spectrum-spacing-500:32px;--spectrum-spacing-600:40px;--spectrum-spacing-700:48px;--spectrum-spacing-800:64px;--spectrum-spacing-900:80px;--spectrum-spacing-1000:96px;--spectrum-focus-indicator-thickness:2px;--spectrum-focus-indicator-gap:2px;--spectrum-border-width-100:1px;--spectrum-border-width-200:2px;--spectrum-border-width-400:4px;--spectrum-field-edge-to-text-quiet:0px;--spectrum-field-edge-to-visual-quiet:0px;--spectrum-field-edge-to-border-quiet:0px;--spectrum-field-edge-to-alert-icon-quiet:0px;--spectrum-field-edge-to-validation-icon-quiet:0px;--spectrum-side-label-character-count-top-margin-small:0px;--spectrum-side-label-character-count-top-margin-medium:0px;--spectrum-side-label-character-count-top-margin-large:0px;--spectrum-side-label-character-count-top-margin-extra-large:0px;--spectrum-text-underline-thickness:1px;--spectrum-text-underline-gap:1px;--spectrum-component-size-width-ratio-down:.3333;--spectrum-component-size-minimum-perspective-down:24px;--spectrum-component-size-difference-down:-2px;--spectrum-corner-radius-none:var(--spectrum-corner-radius-0);--spectrum-corner-radius-small-default:var(--spectrum-corner-radius-100);--spectrum-corner-radius-medium-default:var(--spectrum-corner-radius-500);--spectrum-corner-radius-large-default:var(--spectrum-corner-radius-700);--spectrum-corner-radius-extra-large-default:var(--spectrum-corner-radius-800);--spectrum-corner-radius-full:var(--spectrum-corner-radius-1000);--spectrum-corner-radius-small-size-small:var(--spectrum-corner-radius-75);--spectrum-corner-radius-small-size-medium:var(--spectrum-corner-radius-100);--spectrum-corner-radius-small-size-large:var(--spectrum-corner-radius-200);--spectrum-corner-radius-small-size-extra-large:var(--spectrum-corner-radius-300);--spectrum-corner-radius-medium-size-extra-small:var(--spectrum-corner-radius-300);--spectrum-corner-radius-medium-size-small:var(--spectrum-corner-radius-400);--spectrum-corner-radius-medium-size-medium:var(--spectrum-corner-radius-500);--spectrum-corner-radius-medium-size-large:var(--spectrum-corner-radius-600);--spectrum-corner-radius-medium-size-extra-large:var(--spectrum-corner-radius-700);--spectrum-accent-color-100:var(--spectrum-blue-100);--spectrum-accent-color-200:var(--spectrum-blue-200);--spectrum-accent-color-300:var(--spectrum-blue-300);--spectrum-accent-color-400:var(--spectrum-blue-400);--spectrum-accent-color-500:var(--spectrum-blue-500);--spectrum-accent-color-600:var(--spectrum-blue-600);--spectrum-accent-color-700:var(--spectrum-blue-700);--spectrum-accent-color-800:var(--spectrum-blue-800);--spectrum-accent-color-900:var(--spectrum-blue-900);--spectrum-accent-color-1000:var(--spectrum-blue-1000);--spectrum-accent-color-1100:var(--spectrum-blue-1100);--spectrum-accent-color-1200:var(--spectrum-blue-1200);--spectrum-accent-color-1300:var(--spectrum-blue-1300);--spectrum-accent-color-1400:var(--spectrum-blue-1400);--spectrum-accent-color-1500:var(--spectrum-blue-1500);--spectrum-accent-color-1600:var(--spectrum-blue-1600);--spectrum-informative-color-100:var(--spectrum-blue-100);--spectrum-informative-color-200:var(--spectrum-blue-200);--spectrum-informative-color-300:var(--spectrum-blue-300);--spectrum-informative-color-400:var(--spectrum-blue-400);--spectrum-informative-color-500:var(--spectrum-blue-500);--spectrum-informative-color-600:var(--spectrum-blue-600);--spectrum-informative-color-700:var(--spectrum-blue-700);--spectrum-informative-color-800:var(--spectrum-blue-800);--spectrum-informative-color-900:var(--spectrum-blue-900);--spectrum-informative-color-1000:var(--spectrum-blue-1000);--spectrum-informative-color-1100:var(--spectrum-blue-1100);--spectrum-informative-color-1200:var(--spectrum-blue-1200);--spectrum-informative-color-1300:var(--spectrum-blue-1300);--spectrum-informative-color-1400:var(--spectrum-blue-1400);--spectrum-informative-color-1500:var(--spectrum-blue-1500);--spectrum-informative-color-1600:var(--spectrum-blue-1600);--spectrum-negative-color-100:var(--spectrum-red-100);--spectrum-negative-color-200:var(--spectrum-red-200);--spectrum-negative-color-300:var(--spectrum-red-300);--spectrum-negative-color-400:var(--spectrum-red-400);--spectrum-negative-color-500:var(--spectrum-red-500);--spectrum-negative-color-600:var(--spectrum-red-600);--spectrum-negative-color-700:var(--spectrum-red-700);--spectrum-negative-color-800:var(--spectrum-red-800);--spectrum-negative-color-900:var(--spectrum-red-900);--spectrum-negative-color-1000:var(--spectrum-red-1000);--spectrum-negative-color-1100:var(--spectrum-red-1100);--spectrum-negative-color-1200:var(--spectrum-red-1200);--spectrum-negative-color-1300:var(--spectrum-red-1300);--spectrum-negative-color-1400:var(--spectrum-red-1400);--spectrum-negative-color-1500:var(--spectrum-red-1500);--spectrum-negative-color-1600:var(--spectrum-red-1600);--spectrum-notice-color-100:var(--spectrum-orange-100);--spectrum-notice-color-200:var(--spectrum-orange-200);--spectrum-notice-color-300:var(--spectrum-orange-300);--spectrum-notice-color-400:var(--spectrum-orange-400);--spectrum-notice-color-500:var(--spectrum-orange-500);--spectrum-notice-color-600:var(--spectrum-orange-600);--spectrum-notice-color-700:var(--spectrum-orange-700);--spectrum-notice-color-800:var(--spectrum-orange-800);--spectrum-notice-color-900:var(--spectrum-orange-900);--spectrum-notice-color-1000:var(--spectrum-orange-1000);--spectrum-notice-color-1100:var(--spectrum-orange-1100);--spectrum-notice-color-1200:var(--spectrum-orange-1200);--spectrum-notice-color-1300:var(--spectrum-orange-1300);--spectrum-notice-color-1400:var(--spectrum-orange-1400);--spectrum-notice-color-1500:var(--spectrum-orange-1500);--spectrum-notice-color-1600:var(--spectrum-orange-1600);--spectrum-positive-color-100:var(--spectrum-green-100);--spectrum-positive-color-200:var(--spectrum-green-200);--spectrum-positive-color-300:var(--spectrum-green-300);--spectrum-positive-color-400:var(--spectrum-green-400);--spectrum-positive-color-500:var(--spectrum-green-500);--spectrum-positive-color-600:var(--spectrum-green-600);--spectrum-positive-color-700:var(--spectrum-green-700);--spectrum-positive-color-800:var(--spectrum-green-800);--spectrum-positive-color-900:var(--spectrum-green-900);--spectrum-positive-color-1000:var(--spectrum-green-1000);--spectrum-positive-color-1100:var(--spectrum-green-1100);--spectrum-positive-color-1200:var(--spectrum-green-1200);--spectrum-positive-color-1300:var(--spectrum-green-1300);--spectrum-positive-color-1400:var(--spectrum-green-1400);--spectrum-positive-color-1500:var(--spectrum-green-1500);--spectrum-positive-color-1600:var(--spectrum-green-1600);--spectrum-negative-subdued-background-color-default:var(--spectrum-negative-color-200);--spectrum-negative-subdued-background-color-hover:var(--spectrum-negative-color-300);--spectrum-negative-subdued-background-color-down:var(--spectrum-negative-color-300);--spectrum-negative-subdued-background-color-key-focus:var(--spectrum-negative-color-300);--spectrum-default-font-family:var(--spectrum-sans-serif-font-family);--spectrum-sans-serif-font-family:Adobe Clean;--spectrum-serif-font-family:Adobe Clean Serif;--spectrum-cjk-font-family:Adobe Clean Han;--spectrum-light-font-weight:300;--spectrum-regular-font-weight:400;--spectrum-medium-font-weight:500;--spectrum-bold-font-weight:700;--spectrum-extra-bold-font-weight:800;--spectrum-black-font-weight:900;--spectrum-italic-font-style:italic;--spectrum-default-font-style:normal;--spectrum-line-height-100:1.3;--spectrum-line-height-200:1.5;--spectrum-cjk-line-height-100:1.5;--spectrum-cjk-line-height-200:1.7;--spectrum-cjk-letter-spacing:.05em;--spectrum-heading-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-heading-serif-font-family:var(--spectrum-serif-font-family);--spectrum-heading-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-heading-sans-serif-light-font-weight:var(--spectrum-light-font-weight);--spectrum-heading-sans-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-light-font-weight:var(--spectrum-regular-font-weight);--spectrum-heading-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-light-font-weight:var(--spectrum-light-font-weight);--spectrum-heading-cjk-light-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-heading-cjk-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-heavy-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-heavy-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-light-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-sans-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-light-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-light-strong-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-heading-cjk-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-heavy-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-heavy-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-light-emphasized-font-weight:var(--spectrum-light-font-weight);--spectrum-heading-sans-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-heading-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-heading-cjk-light-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-heavy-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-heavy-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-light-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-sans-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-light-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-light-strong-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-heading-cjk-light-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-heavy-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-heavy-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-size-xxxl:var(--spectrum-font-size-1300);--spectrum-heading-size-xxl:var(--spectrum-font-size-1100);--spectrum-heading-size-xl:var(--spectrum-font-size-900);--spectrum-heading-size-l:var(--spectrum-font-size-700);--spectrum-heading-size-m:var(--spectrum-font-size-500);--spectrum-heading-size-s:var(--spectrum-font-size-300);--spectrum-heading-size-xs:var(--spectrum-font-size-200);--spectrum-heading-size-xxs:var(--spectrum-font-size-100);--spectrum-heading-cjk-size-xxxl:var(--spectrum-font-size-1300);--spectrum-heading-cjk-size-xxl:var(--spectrum-font-size-900);--spectrum-heading-cjk-size-xl:var(--spectrum-font-size-800);--spectrum-heading-cjk-size-l:var(--spectrum-font-size-600);--spectrum-heading-cjk-size-m:var(--spectrum-font-size-400);--spectrum-heading-cjk-size-s:var(--spectrum-font-size-300);--spectrum-heading-cjk-size-xs:var(--spectrum-font-size-200);--spectrum-heading-cjk-size-xxs:var(--spectrum-font-size-100);--spectrum-heading-line-height:var(--spectrum-line-height-100);--spectrum-heading-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-heading-margin-top-multiplier:.888889;--spectrum-heading-margin-bottom-multiplier:.25;--spectrum-heading-color:var(--spectrum-gray-900);--spectrum-body-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-body-serif-font-family:var(--spectrum-serif-font-family);--spectrum-body-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-body-sans-serif-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-body-serif-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-serif-font-style:var(--spectrum-default-font-style);--spectrum-body-cjk-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-cjk-font-style:var(--spectrum-default-font-style);--spectrum-body-sans-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-body-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-body-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-body-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-body-sans-serif-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-serif-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-cjk-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-body-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-body-sans-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-body-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-body-size-xxxl:var(--spectrum-font-size-600);--spectrum-body-size-xxl:var(--spectrum-font-size-500);--spectrum-body-size-xl:var(--spectrum-font-size-400);--spectrum-body-size-l:var(--spectrum-font-size-300);--spectrum-body-size-m:var(--spectrum-font-size-200);--spectrum-body-size-s:var(--spectrum-font-size-100);--spectrum-body-size-xs:var(--spectrum-font-size-75);--spectrum-body-line-height:var(--spectrum-line-height-200);--spectrum-body-cjk-line-height:var(--spectrum-cjk-line-height-200);--spectrum-body-margin-multiplier:.75;--spectrum-body-color:var(--spectrum-gray-800);--spectrum-detail-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-detail-serif-font-family:var(--spectrum-serif-font-family);--spectrum-detail-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-detail-sans-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-detail-cjk-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-light-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-light-font-weight:var(--spectrum-light-font-weight);--spectrum-detail-cjk-light-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-detail-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-strong-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-light-strong-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-light-strong-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-detail-cjk-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-detail-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-cjk-light-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-detail-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-strong-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-light-strong-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-light-strong-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-detail-cjk-light-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-size-xl:var(--spectrum-font-size-200);--spectrum-detail-size-l:var(--spectrum-font-size-100);--spectrum-detail-size-m:var(--spectrum-font-size-75);--spectrum-detail-size-s:var(--spectrum-font-size-50);--spectrum-detail-line-height:var(--spectrum-line-height-100);--spectrum-detail-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-detail-margin-top-multiplier:.888889;--spectrum-detail-margin-bottom-multiplier:.25;--spectrum-detail-letter-spacing:.06em;--spectrum-detail-sans-serif-text-transform:uppercase;--spectrum-detail-serif-text-transform:uppercase;--spectrum-detail-color:var(--spectrum-gray-900);--spectrum-code-font-family:Source Code Pro;--spectrum-code-cjk-font-family:var(--spectrum-code-font-family);--spectrum-code-font-weight:var(--spectrum-regular-font-weight);--spectrum-code-font-style:var(--spectrum-default-font-style);--spectrum-code-cjk-font-weight:var(--spectrum-regular-font-weight);--spectrum-code-cjk-font-style:var(--spectrum-default-font-style);--spectrum-code-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-code-strong-font-style:var(--spectrum-default-font-style);--spectrum-code-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-code-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-code-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-code-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-code-cjk-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-code-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-code-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-code-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-code-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-code-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-code-size-xl:var(--spectrum-font-size-400);--spectrum-code-size-l:var(--spectrum-font-size-300);--spectrum-code-size-m:var(--spectrum-font-size-200);--spectrum-code-size-s:var(--spectrum-font-size-100);--spectrum-code-size-xs:var(--spectrum-font-size-75);--spectrum-code-line-height:var(--spectrum-line-height-200);--spectrum-code-cjk-line-height:var(--spectrum-cjk-line-height-200);--spectrum-code-color:var(--spectrum-gray-800);--system-spectrum-actionbutton-background-color-default:var(--spectrum-gray-75);--system-spectrum-actionbutton-background-color-hover:var(--spectrum-gray-200);--system-spectrum-actionbutton-background-color-down:var(--spectrum-gray-300);--system-spectrum-actionbutton-background-color-focus:var(--spectrum-gray-200);--system-spectrum-actionbutton-border-color-default:var(--spectrum-gray-400);--system-spectrum-actionbutton-border-color-hover:var(--spectrum-gray-500);--system-spectrum-actionbutton-border-color-down:var(--spectrum-gray-600);--system-spectrum-actionbutton-border-color-focus:var(--spectrum-gray-500);--system-spectrum-actionbutton-background-color-disabled:transparent;--system-spectrum-actionbutton-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-actionbutton-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-actionbutton-quiet-background-color-default:transparent;--system-spectrum-actionbutton-quiet-background-color-hover:var(--spectrum-gray-200);--system-spectrum-actionbutton-quiet-background-color-down:var(--spectrum-gray-300);--system-spectrum-actionbutton-quiet-background-color-focus:var(--spectrum-gray-200);--system-spectrum-actionbutton-quiet-border-color-default:transparent;--system-spectrum-actionbutton-quiet-border-color-hover:transparent;--system-spectrum-actionbutton-quiet-border-color-down:transparent;--system-spectrum-actionbutton-quiet-border-color-focus:transparent;--system-spectrum-actionbutton-quiet-background-color-disabled:transparent;--system-spectrum-actionbutton-quiet-border-color-disabled:transparent;--system-spectrum-actionbutton-selected-border-color-default:transparent;--system-spectrum-actionbutton-selected-border-color-hover:transparent;--system-spectrum-actionbutton-selected-border-color-down:transparent;--system-spectrum-actionbutton-selected-border-color-focus:transparent;--system-spectrum-actionbutton-selected-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-actionbutton-selected-border-color-disabled:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-default:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-default:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-hover:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-hover:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-down:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-down:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-focus:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-focus:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-disabled:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-disabled:transparent;--system-spectrum-actionbutton-staticblack-background-color-default:transparent;--system-spectrum-actionbutton-staticblack-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-actionbutton-staticblack-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-actionbutton-staticblack-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-actionbutton-staticblack-border-color-default:var(--spectrum-transparent-black-400);--system-spectrum-actionbutton-staticblack-border-color-hover:var(--spectrum-transparent-black-500);--system-spectrum-actionbutton-staticblack-border-color-down:var(--spectrum-transparent-black-600);--system-spectrum-actionbutton-staticblack-border-color-focus:var(--spectrum-transparent-black-500);--system-spectrum-actionbutton-staticblack-content-color-default:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-content-color-hover:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-content-color-down:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-content-color-focus:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-actionbutton-staticblack-background-color-disabled:transparent;--system-spectrum-actionbutton-staticblack-border-color-disabled:var(--spectrum-disabled-static-black-border-color);--system-spectrum-actionbutton-staticblack-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-default:var(--spectrum-transparent-black-800);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-hover:var(--spectrum-transparent-black-900);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-down:var(--spectrum-transparent-black-900);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-focus:var(--spectrum-transparent-black-900);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-default:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-hover:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-down:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-focus:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-disabled:var(--spectrum-disabled-static-black-background-color);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-border-color-disabled:transparent;--system-spectrum-actionbutton-staticwhite-background-color-default:transparent;--system-spectrum-actionbutton-staticwhite-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-actionbutton-staticwhite-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-actionbutton-staticwhite-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-actionbutton-staticwhite-border-color-default:var(--spectrum-transparent-white-400);--system-spectrum-actionbutton-staticwhite-border-color-hover:var(--spectrum-transparent-white-500);--system-spectrum-actionbutton-staticwhite-border-color-down:var(--spectrum-transparent-white-600);--system-spectrum-actionbutton-staticwhite-border-color-focus:var(--spectrum-transparent-white-500);--system-spectrum-actionbutton-staticwhite-content-color-default:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-content-color-hover:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-content-color-down:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-content-color-focus:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-actionbutton-staticwhite-background-color-disabled:transparent;--system-spectrum-actionbutton-staticwhite-border-color-disabled:var(--spectrum-disabled-static-white-border-color);--system-spectrum-actionbutton-staticwhite-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-default:var(--spectrum-transparent-white-800);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-down:var(--spectrum-transparent-white-900);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-default:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-hover:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-down:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-focus:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-border-color-disabled:transparent;--system-spectrum-actiongroup-gap-size-compact:0;--system-spectrum-actiongroup-horizontal-spacing-compact:-1px;--system-spectrum-actiongroup-vertical-spacing-compact:-1px;--system-spectrum-button-background-color-default:var(--spectrum-gray-75);--system-spectrum-button-background-color-hover:var(--spectrum-gray-200);--system-spectrum-button-background-color-down:var(--spectrum-gray-300);--system-spectrum-button-background-color-focus:var(--spectrum-gray-200);--system-spectrum-button-border-color-default:var(--spectrum-gray-400);--system-spectrum-button-border-color-hover:var(--spectrum-gray-500);--system-spectrum-button-border-color-down:var(--spectrum-gray-600);--system-spectrum-button-border-color-focus:var(--spectrum-gray-500);--system-spectrum-button-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-background-color-disabled:transparent;--system-spectrum-button-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-accent-background-color-default:var(--spectrum-accent-background-color-default);--system-spectrum-button-accent-background-color-hover:var(--spectrum-accent-background-color-hover);--system-spectrum-button-accent-background-color-down:var(--spectrum-accent-background-color-down);--system-spectrum-button-accent-background-color-focus:var(--spectrum-accent-background-color-key-focus);--system-spectrum-button-accent-border-color-default:transparent;--system-spectrum-button-accent-border-color-hover:transparent;--system-spectrum-button-accent-border-color-down:transparent;--system-spectrum-button-accent-border-color-focus:transparent;--system-spectrum-button-accent-content-color-default:var(--spectrum-white);--system-spectrum-button-accent-content-color-hover:var(--spectrum-white);--system-spectrum-button-accent-content-color-down:var(--spectrum-white);--system-spectrum-button-accent-content-color-focus:var(--spectrum-white);--system-spectrum-button-accent-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-accent-border-color-disabled:transparent;--system-spectrum-button-accent-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-accent-outline-background-color-default:transparent;--system-spectrum-button-accent-outline-background-color-hover:var(--spectrum-accent-color-200);--system-spectrum-button-accent-outline-background-color-down:var(--spectrum-accent-color-300);--system-spectrum-button-accent-outline-background-color-focus:var(--spectrum-accent-color-200);--system-spectrum-button-accent-outline-border-color-default:var(--spectrum-accent-color-900);--system-spectrum-button-accent-outline-border-color-hover:var(--spectrum-accent-color-1000);--system-spectrum-button-accent-outline-border-color-down:var(--spectrum-accent-color-1100);--system-spectrum-button-accent-outline-border-color-focus:var(--spectrum-accent-color-1000);--system-spectrum-button-accent-outline-content-color-default:var(--spectrum-accent-content-color-default);--system-spectrum-button-accent-outline-content-color-hover:var(--spectrum-accent-content-color-hover);--system-spectrum-button-accent-outline-content-color-down:var(--spectrum-accent-content-color-down);--system-spectrum-button-accent-outline-content-color-focus:var(--spectrum-accent-content-color-key-focus);--system-spectrum-button-accent-outline-background-color-disabled:transparent;--system-spectrum-button-accent-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-accent-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-negative-background-color-default:var(--spectrum-negative-background-color-default);--system-spectrum-button-negative-background-color-hover:var(--spectrum-negative-background-color-hover);--system-spectrum-button-negative-background-color-down:var(--spectrum-negative-background-color-down);--system-spectrum-button-negative-background-color-focus:var(--spectrum-negative-background-color-key-focus);--system-spectrum-button-negative-border-color-default:transparent;--system-spectrum-button-negative-border-color-hover:transparent;--system-spectrum-button-negative-border-color-down:transparent;--system-spectrum-button-negative-border-color-focus:transparent;--system-spectrum-button-negative-content-color-default:var(--spectrum-white);--system-spectrum-button-negative-content-color-hover:var(--spectrum-white);--system-spectrum-button-negative-content-color-down:var(--spectrum-white);--system-spectrum-button-negative-content-color-focus:var(--spectrum-white);--system-spectrum-button-negative-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-negative-border-color-disabled:transparent;--system-spectrum-button-negative-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-negative-outline-background-color-default:transparent;--system-spectrum-button-negative-outline-background-color-hover:var(--spectrum-negative-color-200);--system-spectrum-button-negative-outline-background-color-down:var(--spectrum-negative-color-300);--system-spectrum-button-negative-outline-background-color-focus:var(--spectrum-negative-color-200);--system-spectrum-button-negative-outline-border-color-default:var(--spectrum-negative-color-900);--system-spectrum-button-negative-outline-border-color-hover:var(--spectrum-negative-color-1000);--system-spectrum-button-negative-outline-border-color-down:var(--spectrum-negative-color-1100);--system-spectrum-button-negative-outline-border-color-focus:var(--spectrum-negative-color-1000);--system-spectrum-button-negative-outline-content-color-default:var(--spectrum-negative-content-color-default);--system-spectrum-button-negative-outline-content-color-hover:var(--spectrum-negative-content-color-hover);--system-spectrum-button-negative-outline-content-color-down:var(--spectrum-negative-content-color-down);--system-spectrum-button-negative-outline-content-color-focus:var(--spectrum-negative-content-color-key-focus);--system-spectrum-button-negative-outline-background-color-disabled:transparent;--system-spectrum-button-negative-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-negative-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-primary-background-color-default:var(--spectrum-neutral-background-color-default);--system-spectrum-button-primary-background-color-hover:var(--spectrum-neutral-background-color-hover);--system-spectrum-button-primary-background-color-down:var(--spectrum-neutral-background-color-down);--system-spectrum-button-primary-background-color-focus:var(--spectrum-neutral-background-color-key-focus);--system-spectrum-button-primary-border-color-default:transparent;--system-spectrum-button-primary-border-color-hover:transparent;--system-spectrum-button-primary-border-color-down:transparent;--system-spectrum-button-primary-border-color-focus:transparent;--system-spectrum-button-primary-content-color-default:var(--spectrum-white);--system-spectrum-button-primary-content-color-hover:var(--spectrum-white);--system-spectrum-button-primary-content-color-down:var(--spectrum-white);--system-spectrum-button-primary-content-color-focus:var(--spectrum-white);--system-spectrum-button-primary-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-primary-border-color-disabled:transparent;--system-spectrum-button-primary-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-primary-outline-background-color-default:transparent;--system-spectrum-button-primary-outline-background-color-hover:var(--spectrum-gray-300);--system-spectrum-button-primary-outline-background-color-down:var(--spectrum-gray-400);--system-spectrum-button-primary-outline-background-color-focus:var(--spectrum-gray-300);--system-spectrum-button-primary-outline-border-color-default:var(--spectrum-gray-800);--system-spectrum-button-primary-outline-border-color-hover:var(--spectrum-gray-900);--system-spectrum-button-primary-outline-border-color-down:var(--spectrum-gray-900);--system-spectrum-button-primary-outline-border-color-focus:var(--spectrum-gray-900);--system-spectrum-button-primary-outline-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-primary-outline-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-primary-outline-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-primary-outline-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-primary-outline-background-color-disabled:transparent;--system-spectrum-button-primary-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-primary-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-secondary-background-color-default:var(--spectrum-gray-200);--system-spectrum-button-secondary-background-color-hover:var(--spectrum-gray-300);--system-spectrum-button-secondary-background-color-down:var(--spectrum-gray-400);--system-spectrum-button-secondary-background-color-focus:var(--spectrum-gray-300);--system-spectrum-button-secondary-border-color-default:transparent;--system-spectrum-button-secondary-border-color-hover:transparent;--system-spectrum-button-secondary-border-color-down:transparent;--system-spectrum-button-secondary-border-color-focus:transparent;--system-spectrum-button-secondary-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-secondary-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-secondary-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-secondary-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-secondary-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-secondary-border-color-disabled:transparent;--system-spectrum-button-secondary-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-secondary-outline-background-color-default:transparent;--system-spectrum-button-secondary-outline-background-color-hover:var(--spectrum-gray-300);--system-spectrum-button-secondary-outline-background-color-down:var(--spectrum-gray-400);--system-spectrum-button-secondary-outline-background-color-focus:var(--spectrum-gray-300);--system-spectrum-button-secondary-outline-border-color-default:var(--spectrum-gray-300);--system-spectrum-button-secondary-outline-border-color-hover:var(--spectrum-gray-400);--system-spectrum-button-secondary-outline-border-color-down:var(--spectrum-gray-500);--system-spectrum-button-secondary-outline-border-color-focus:var(--spectrum-gray-400);--system-spectrum-button-secondary-outline-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-secondary-outline-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-secondary-outline-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-secondary-outline-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-secondary-outline-background-color-disabled:transparent;--system-spectrum-button-secondary-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-secondary-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-quiet-background-color-default:transparent;--system-spectrum-button-quiet-background-color-hover:var(--spectrum-gray-200);--system-spectrum-button-quiet-background-color-down:var(--spectrum-gray-300);--system-spectrum-button-quiet-background-color-focus:var(--spectrum-gray-200);--system-spectrum-button-quiet-border-color-default:transparent;--system-spectrum-button-quiet-border-color-hover:transparent;--system-spectrum-button-quiet-border-color-down:transparent;--system-spectrum-button-quiet-border-color-focus:transparent;--system-spectrum-button-quiet-background-color-disabled:transparent;--system-spectrum-button-quiet-border-color-disabled:transparent;--system-spectrum-button-selected-background-color-default:var(--spectrum-neutral-subdued-background-color-default);--system-spectrum-button-selected-background-color-hover:var(--spectrum-neutral-subdued-background-color-hover);--system-spectrum-button-selected-background-color-down:var(--spectrum-neutral-subdued-background-color-down);--system-spectrum-button-selected-background-color-focus:var(--spectrum-neutral-subdued-background-color-key-focus);--system-spectrum-button-selected-border-color-default:transparent;--system-spectrum-button-selected-border-color-hover:transparent;--system-spectrum-button-selected-border-color-down:transparent;--system-spectrum-button-selected-border-color-focus:transparent;--system-spectrum-button-selected-content-color-default:var(--spectrum-white);--system-spectrum-button-selected-content-color-hover:var(--spectrum-white);--system-spectrum-button-selected-content-color-down:var(--spectrum-white);--system-spectrum-button-selected-content-color-focus:var(--spectrum-white);--system-spectrum-button-selected-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-selected-border-color-disabled:transparent;--system-spectrum-button-selected-emphasized-background-color-default:var(--spectrum-accent-background-color-default);--system-spectrum-button-selected-emphasized-background-color-hover:var(--spectrum-accent-background-color-hover);--system-spectrum-button-selected-emphasized-background-color-down:var(--spectrum-accent-background-color-down);--system-spectrum-button-selected-emphasized-background-color-focus:var(--spectrum-accent-background-color-key-focus);--system-spectrum-button-staticblack-quiet-border-color-default:transparent;--system-spectrum-button-staticwhite-quiet-border-color-default:transparent;--system-spectrum-button-staticblack-quiet-border-color-hover:transparent;--system-spectrum-button-staticwhite-quiet-border-color-hover:transparent;--system-spectrum-button-staticblack-quiet-border-color-down:transparent;--system-spectrum-button-staticwhite-quiet-border-color-down:transparent;--system-spectrum-button-staticblack-quiet-border-color-focus:transparent;--system-spectrum-button-staticwhite-quiet-border-color-focus:transparent;--system-spectrum-button-staticblack-quiet-border-color-disabled:transparent;--system-spectrum-button-staticwhite-quiet-border-color-disabled:transparent;--system-spectrum-button-staticwhite-background-color-default:var(--spectrum-transparent-white-800);--system-spectrum-button-staticwhite-background-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-background-color-down:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-background-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-border-color-default:transparent;--system-spectrum-button-staticwhite-border-color-hover:transparent;--system-spectrum-button-staticwhite-border-color-down:transparent;--system-spectrum-button-staticwhite-border-color-focus:transparent;--system-spectrum-button-staticwhite-content-color-default:var(--spectrum-black);--system-spectrum-button-staticwhite-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticwhite-content-color-down:var(--spectrum-black);--system-spectrum-button-staticwhite-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticwhite-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-button-staticwhite-border-color-disabled:transparent;--system-spectrum-button-staticwhite-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticwhite-outline-background-color-default:transparent;--system-spectrum-button-staticwhite-outline-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-outline-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-outline-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-outline-border-color-default:var(--spectrum-transparent-white-800);--system-spectrum-button-staticwhite-outline-border-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-outline-border-color-down:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-outline-border-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-outline-content-color-default:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-content-color-down:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-outline-background-color-disabled:transparent;--system-spectrum-button-staticwhite-outline-border-color-disabled:var(--spectrum-disabled-static-white-border-color);--system-spectrum-button-staticwhite-outline-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticwhite-selected-background-color-default:var(--spectrum-transparent-white-800);--system-spectrum-button-staticwhite-selected-background-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-selected-background-color-down:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-selected-background-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-selected-content-color-default:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-content-color-down:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-button-staticwhite-selected-border-color-disabled:transparent;--system-spectrum-button-staticwhite-secondary-background-color-default:var(--spectrum-transparent-white-200);--system-spectrum-button-staticwhite-secondary-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-border-color-default:transparent;--system-spectrum-button-staticwhite-secondary-border-color-hover:transparent;--system-spectrum-button-staticwhite-secondary-border-color-down:transparent;--system-spectrum-button-staticwhite-secondary-border-color-focus:transparent;--system-spectrum-button-staticwhite-secondary-content-color-default:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-content-color-down:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-secondary-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-button-staticwhite-secondary-border-color-disabled:transparent;--system-spectrum-button-staticwhite-secondary-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticwhite-secondary-outline-background-color-default:transparent;--system-spectrum-button-staticwhite-secondary-outline-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-outline-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-outline-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-outline-border-color-default:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-outline-border-color-hover:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-outline-border-color-down:var(--spectrum-transparent-white-500);--system-spectrum-button-staticwhite-secondary-outline-border-color-focus:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-outline-content-color-default:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-content-color-down:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-secondary-outline-background-color-disabled:transparent;--system-spectrum-button-staticwhite-secondary-outline-border-color-disabled:var(--spectrum-disabled-static-white-border-color);--system-spectrum-button-staticwhite-secondary-outline-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticblack-background-color-default:var(--spectrum-transparent-black-800);--system-spectrum-button-staticblack-background-color-hover:var(--spectrum-transparent-black-900);--system-spectrum-button-staticblack-background-color-down:var(--spectrum-transparent-black-900);--system-spectrum-button-staticblack-background-color-focus:var(--spectrum-transparent-black-900);--system-spectrum-button-staticblack-border-color-default:transparent;--system-spectrum-button-staticblack-border-color-hover:transparent;--system-spectrum-button-staticblack-border-color-down:transparent;--system-spectrum-button-staticblack-border-color-focus:transparent;--system-spectrum-button-staticblack-content-color-default:var(--spectrum-white);--system-spectrum-button-staticblack-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticblack-content-color-down:var(--spectrum-white);--system-spectrum-button-staticblack-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticblack-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-background-color-disabled:var(--spectrum-disabled-static-black-background-color);--system-spectrum-button-staticblack-border-color-disabled:transparent;--system-spectrum-button-staticblack-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-button-staticblack-outline-background-color-default:transparent;--system-spectrum-button-staticblack-outline-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-outline-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-outline-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-outline-border-color-default:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-outline-border-color-hover:var(--spectrum-transparent-black-500);--system-spectrum-button-staticblack-outline-border-color-down:var(--spectrum-transparent-black-600);--system-spectrum-button-staticblack-outline-border-color-focus:var(--spectrum-transparent-black-500);--system-spectrum-button-staticblack-outline-content-color-default:var(--spectrum-black);--system-spectrum-button-staticblack-outline-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticblack-outline-content-color-down:var(--spectrum-black);--system-spectrum-button-staticblack-outline-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticblack-outline-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-outline-background-color-disabled:transparent;--system-spectrum-button-staticblack-outline-border-color-disabled:var(--spectrum-disabled-static-black-border-color);--system-spectrum-button-staticblack-outline-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-button-staticblack-secondary-background-color-default:var(--spectrum-transparent-black-200);--system-spectrum-button-staticblack-secondary-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-border-color-default:transparent;--system-spectrum-button-staticblack-secondary-border-color-hover:transparent;--system-spectrum-button-staticblack-secondary-border-color-down:transparent;--system-spectrum-button-staticblack-secondary-border-color-focus:transparent;--system-spectrum-button-staticblack-secondary-content-color-default:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-content-color-down:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-secondary-background-color-disabled:var(--spectrum-disabled-static-black-background-color);--system-spectrum-button-staticblack-secondary-border-color-disabled:transparent;--system-spectrum-button-staticblack-secondary-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-button-staticblack-secondary-outline-background-color-default:transparent;--system-spectrum-button-staticblack-secondary-outline-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-outline-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-outline-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-outline-border-color-default:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-outline-border-color-hover:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-outline-border-color-down:var(--spectrum-transparent-black-500);--system-spectrum-button-staticblack-secondary-outline-border-color-focus:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-outline-content-color-default:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-content-color-down:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-secondary-outline-background-color-disabled:transparent;--system-spectrum-button-staticblack-secondary-outline-border-color-disabled:var(--spectrum-disabled-static-black-border-color);--system-spectrum-button-staticblack-secondary-outline-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-checkbox-control-color-default:var(--spectrum-gray-600);--system-spectrum-checkbox-control-color-hover:var(--spectrum-gray-700);--system-spectrum-checkbox-control-color-down:var(--spectrum-gray-800);--system-spectrum-checkbox-control-color-focus:var(--spectrum-gray-700);--system-spectrum-closebutton-background-color-default:transparent;--system-spectrum-closebutton-background-color-hover:var(--spectrum-gray-200);--system-spectrum-closebutton-background-color-down:var(--spectrum-gray-300);--system-spectrum-closebutton-background-color-focus:var(--spectrum-gray-200);--system-spectrum-combobox-border-color-default:var(--spectrum-gray-500);--system-spectrum-combobox-border-color-hover:var(--spectrum-gray-600);--system-spectrum-combobox-border-color-focus:var(--spectrum-gray-500);--system-spectrum-combobox-border-color-focus-hover:var(--spectrum-gray-600);--system-spectrum-combobox-border-color-key-focus:var(--spectrum-gray-600);--system-spectrum-infieldbutton-spectrum-infield-button-border-width:var(--spectrum-border-width-100);--system-spectrum-infieldbutton-spectrum-infield-button-border-color:inherit;--system-spectrum-infieldbutton-spectrum-infield-button-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-infieldbutton-spectrum-infield-button-border-radius-reset:0;--system-spectrum-infieldbutton-spectrum-infield-button-stacked-top-border-radius-start-start:var(--spectrum-infield-button-border-radius-reset);--system-spectrum-infieldbutton-spectrum-infield-button-stacked-bottom-border-radius-end-start:var(--spectrum-infield-button-border-radius-reset);--system-spectrum-infieldbutton-spectrum-infield-button-background-color:var(--spectrum-gray-75);--system-spectrum-infieldbutton-spectrum-infield-button-background-color-hover:var(--spectrum-gray-200);--system-spectrum-infieldbutton-spectrum-infield-button-background-color-down:var(--spectrum-gray-300);--system-spectrum-infieldbutton-spectrum-infield-button-background-color-key-focus:var(--spectrum-gray-200);--system-spectrum-picker-background-color-default:var(--spectrum-gray-75);--system-spectrum-picker-background-color-default-open:var(--spectrum-gray-200);--system-spectrum-picker-background-color-active:var(--spectrum-gray-300);--system-spectrum-picker-background-color-hover:var(--spectrum-gray-200);--system-spectrum-picker-background-color-hover-open:var(--spectrum-gray-200);--system-spectrum-picker-background-color-key-focus:var(--spectrum-gray-200);--system-spectrum-picker-border-color-default:var(--spectrum-gray-500);--system-spectrum-picker-border-color-default-open:var(--spectrum-gray-500);--system-spectrum-picker-border-color-hover:var(--spectrum-gray-600);--system-spectrum-picker-border-color-hover-open:var(--spectrum-gray-600);--system-spectrum-picker-border-color-active:var(--spectrum-gray-700);--system-spectrum-picker-border-color-key-focus:var(--spectrum-gray-600);--system-spectrum-picker-border-width:var(--spectrum-border-width-100);--system-spectrum-pickerbutton-spectrum-picker-button-background-color:var(--spectrum-gray-75);--system-spectrum-pickerbutton-spectrum-picker-button-background-color-hover:var(--spectrum-gray-200);--system-spectrum-pickerbutton-spectrum-picker-button-background-color-down:var(--spectrum-gray-300);--system-spectrum-pickerbutton-spectrum-picker-button-background-color-key-focus:var(--spectrum-gray-200);--system-spectrum-pickerbutton-spectrum-picker-button-border-color:inherit;--system-spectrum-pickerbutton-spectrum-picker-button-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-pickerbutton-spectrum-picker-button-border-radius-rounded-sided:0;--system-spectrum-pickerbutton-spectrum-picker-button-border-radius-sided:0;--system-spectrum-pickerbutton-spectrum-picker-button-border-width:var(--spectrum-border-width-100);--system-spectrum-popover-border-width:var(--spectrum-border-width-100);--system-spectrum-radio-button-border-color-default:var(--spectrum-gray-600);--system-spectrum-radio-button-border-color-hover:var(--spectrum-gray-700);--system-spectrum-radio-button-border-color-down:var(--spectrum-gray-800);--system-spectrum-radio-button-border-color-focus:var(--spectrum-gray-700);--system-spectrum-radio-emphasized-button-checked-border-color-default:var(--spectrum-accent-color-900);--system-spectrum-radio-emphasized-button-checked-border-color-hover:var(--spectrum-accent-color-1000);--system-spectrum-radio-emphasized-button-checked-border-color-down:var(--spectrum-accent-color-1100);--system-spectrum-radio-emphasized-button-checked-border-color-focus:var(--spectrum-accent-color-1000);--system-spectrum-search-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-edge-to-visual:var(--spectrum-component-edge-to-visual-100);--system-spectrum-search-border-color-default:var(--spectrum-gray-500);--system-spectrum-search-border-color-hover:var(--spectrum-gray-600);--system-spectrum-search-border-color-focus:var(--spectrum-gray-800);--system-spectrum-search-border-color-focus-hover:var(--spectrum-gray-900);--system-spectrum-search-border-color-key-focus:var(--spectrum-gray-900);--system-spectrum-search-sizes-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizes-edge-to-visual:var(--spectrum-component-edge-to-visual-75);--system-spectrum-search-sizem-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizem-edge-to-visual:var(--spectrum-component-edge-to-visual-100);--system-spectrum-search-sizel-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizel-edge-to-visual:var(--spectrum-component-edge-to-visual-200);--system-spectrum-search-sizexl-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizexl-edge-to-visual:var(--spectrum-component-edge-to-visual-300);--system-spectrum-slider-track-color:var(--spectrum-gray-300);--system-spectrum-slider-track-fill-color:var(--spectrum-gray-700);--system-spectrum-slider-ramp-track-color:var(--spectrum-gray-400);--system-spectrum-slider-ramp-track-color-disabled:var(--spectrum-gray-200);--system-spectrum-slider-handle-background-color:transparent;--system-spectrum-slider-handle-background-color-disabled:transparent;--system-spectrum-slider-ramp-handle-background-color:var(--spectrum-gray-100);--system-spectrum-slider-ticks-handle-background-color:var(--spectrum-gray-100);--system-spectrum-slider-handle-border-color:var(--spectrum-gray-700);--system-spectrum-slider-handle-disabled-background-color:var(--spectrum-gray-100);--system-spectrum-slider-tick-mark-color:var(--spectrum-gray-300);--system-spectrum-slider-handle-border-color-hover:var(--spectrum-gray-800);--system-spectrum-slider-handle-border-color-down:var(--spectrum-gray-800);--system-spectrum-slider-handle-border-color-key-focus:var(--spectrum-gray-800);--system-spectrum-slider-handle-focus-ring-color-key-focus:var(--spectrum-focus-indicator-color);--system-spectrum-stepper-border-width:var(--spectrum-border-width-100);--system-spectrum-stepper-buttons-border-style:none;--system-spectrum-stepper-buttons-border-width:0;--system-spectrum-stepper-buttons-border-color:var(--spectrum-gray-500);--system-spectrum-stepper-buttons-background-color:var(--spectrum-gray-50);--system-spectrum-stepper-buttons-border-color-hover:var(--spectrum-gray-600);--system-spectrum-stepper-buttons-border-color-focus:var(--spectrum-gray-800);--system-spectrum-stepper-buttons-border-color-keyboard-focus:var(--spectrum-gray-900);--system-spectrum-stepper-button-border-radius-reset:0px;--system-spectrum-stepper-button-border-width:var(--spectrum-border-width-100);--system-spectrum-stepper-border-color:var(--spectrum-gray-500);--system-spectrum-stepper-border-color-hover:var(--spectrum-gray-600);--system-spectrum-stepper-border-color-focus:var(--spectrum-gray-800);--system-spectrum-stepper-border-color-focus-hover:var(--spectrum-gray-800);--system-spectrum-stepper-border-color-keyboard-focus:var(--spectrum-gray-900);--system-spectrum-stepper-border-color-invalid:var(--spectrum-negative-border-color-default);--system-spectrum-stepper-border-color-focus-invalid:var(--spectrum-negative-border-color-focus);--system-spectrum-stepper-border-color-focus-hover-invalid:var(--spectrum-negative-border-color-focus-hover);--system-spectrum-stepper-border-color-keyboard-focus-invalid:var(--spectrum-negative-border-color-key-focus);--system-spectrum-stepper-button-background-color-focus:var(--spectrum-gray-300);--system-spectrum-stepper-button-background-color-keyboard-focus:var(--spectrum-gray-200);--system-spectrum-switch-handle-border-color-default:var(--spectrum-gray-600);--system-spectrum-switch-handle-border-color-hover:var(--spectrum-gray-700);--system-spectrum-switch-handle-border-color-down:var(--spectrum-gray-800);--system-spectrum-switch-handle-border-color-focus:var(--spectrum-gray-700);--system-spectrum-switch-handle-border-color-selected-default:var(--spectrum-gray-700);--system-spectrum-switch-handle-border-color-selected-hover:var(--spectrum-gray-800);--system-spectrum-switch-handle-border-color-selected-down:var(--spectrum-gray-900);--system-spectrum-switch-handle-border-color-selected-focus:var(--spectrum-gray-800);--system-spectrum-tabs-font-weight:var(--spectrum-default-font-weight);--system-spectrum-tag-border-color:var(--spectrum-gray-700);--system-spectrum-tag-border-color-hover:var(--spectrum-gray-800);--system-spectrum-tag-border-color-active:var(--spectrum-gray-900);--system-spectrum-tag-border-color-focus:var(--spectrum-gray-800);--system-spectrum-tag-size-small-corner-radius:var(--spectrum-corner-radius-100);--system-spectrum-tag-size-medium-corner-radius:var(--spectrum-corner-radius-100);--system-spectrum-tag-size-large-corner-radius:var(--spectrum-corner-radius-100);--system-spectrum-tag-background-color:var(--spectrum-gray-75);--system-spectrum-tag-background-color-hover:var(--spectrum-gray-75);--system-spectrum-tag-background-color-active:var(--spectrum-gray-200);--system-spectrum-tag-background-color-focus:var(--spectrum-gray-75);--system-spectrum-tag-content-color:var(--spectrum-neutral-subdued-content-color-default);--system-spectrum-tag-content-color-hover:var(--spectrum-neutral-subdued-content-color-hover);--system-spectrum-tag-content-color-active:var(--spectrum-neutral-subdued-content-color-down);--system-spectrum-tag-content-color-focus:var(--spectrum-neutral-subdued-content-color-key-focus);--system-spectrum-tag-border-color-selected:var(--spectrum-neutral-subdued-background-color-default);--system-spectrum-tag-border-color-selected-hover:var(--spectrum-neutral-subdued-background-color-hover);--system-spectrum-tag-border-color-selected-active:var(--spectrum-neutral-subdued-background-color-down);--system-spectrum-tag-border-color-selected-focus:var(--spectrum-neutral-subdued-background-color-key-focus);--system-spectrum-tag-border-color-disabled:transparent;--system-spectrum-tag-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-tag-size-small-spacing-inline-start:var(--spectrum-component-edge-to-visual-75);--system-spectrum-tag-size-small-label-spacing-inline-end:var(--spectrum-component-edge-to-text-75);--system-spectrum-tag-size-small-clear-button-spacing-inline-end:var(--spectrum-component-edge-to-visual-75);--system-spectrum-tag-size-medium-spacing-inline-start:var(--spectrum-component-edge-to-visual-100);--system-spectrum-tag-size-medium-label-spacing-inline-end:var(--spectrum-component-edge-to-text-100);--system-spectrum-tag-size-medium-clear-button-spacing-inline-end:var(--spectrum-component-edge-to-visual-100);--system-spectrum-tag-size-large-spacing-inline-start:var(--spectrum-component-edge-to-visual-200);--system-spectrum-tag-size-large-label-spacing-inline-end:var(--spectrum-component-edge-to-text-200);--system-spectrum-tag-size-large-clear-button-spacing-inline-end:var(--spectrum-component-edge-to-visual-200);--system-spectrum-textfield-border-color:var(--spectrum-gray-500);--system-spectrum-textfield-border-color-hover:var(--spectrum-gray-600);--system-spectrum-textfield-border-color-focus:var(--spectrum-gray-800);--system-spectrum-textfield-border-color-focus-hover:var(--spectrum-gray-900);--system-spectrum-textfield-border-color-keyboard-focus:var(--spectrum-gray-900);--system-spectrum-textfield-border-width:var(--spectrum-border-width-100);--system-spectrum-toast-background-color-default:var(--spectrum-neutral-subdued-background-color-default);--system-spectrum-tooltip-backgound-color-default-neutral:var(--spectrum-neutral-subdued-background-color-default);--system:spectrum;--spectrum-animation-linear:cubic-bezier(0,0,1,1);--spectrum-animation-duration-0:0s;--spectrum-animation-duration-100:.13s;--spectrum-animation-duration-200:.16s;--spectrum-animation-duration-300:.19s;--spectrum-animation-duration-400:.22s;--spectrum-animation-duration-500:.25s;--spectrum-animation-duration-600:.3s;--spectrum-animation-duration-700:.35s;--spectrum-animation-duration-800:.4s;--spectrum-animation-duration-900:.45s;--spectrum-animation-duration-1000:.5s;--spectrum-animation-duration-2000:1s;--spectrum-animation-duration-4000:2s;--spectrum-animation-duration-6000:3s;--spectrum-animation-ease-in-out:cubic-bezier(.45,0,.4,1);--spectrum-animation-ease-in:cubic-bezier(.5,0,1,1);--spectrum-animation-ease-out:cubic-bezier(0,0,.4,1);--spectrum-animation-ease-linear:cubic-bezier(0,0,1,1);--spectrum-sans-font-family-stack:adobe-clean,var(--spectrum-sans-serif-font-family),"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-sans-serif-font:var(--spectrum-sans-font-family-stack);--spectrum-serif-font-family-stack:adobe-clean-serif,var(--spectrum-serif-font-family),"Source Serif Pro",Georgia,serif;--spectrum-serif-font:var(--spectrum-serif-font-family-stack);--spectrum-code-font-family-stack:"Source Code Pro",Monaco,monospace;--spectrum-cjk-font-family-stack:adobe-clean-han-japanese,var(--spectrum-cjk-font-family),sans-serif;--spectrum-cjk-font:var(--spectrum-code-font-family-stack);--spectrum-docs-static-white-background-color-rgb:15,121,125;--spectrum-docs-static-white-background-color:rgba(var(--spectrum-docs-static-white-background-color-rgb));--spectrum-docs-static-black-background-color-rgb:206,247,243;--spectrum-docs-static-black-background-color:rgba(var(--spectrum-docs-static-black-background-color-rgb))}:root,:host{--spectrum-font-family-ar:myriad-arabic,adobe-clean,"Source Sans Pro",-apple-system,blinkmacsystemfont,"Segoe UI",roboto,ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-font-family-he:myriad-hebrew,adobe-clean,"Source Sans Pro",-apple-system,blinkmacsystemfont,"Segoe UI",roboto,ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-font-family:var(--spectrum-sans-font-family-stack);--spectrum-font-style:var(--spectrum-default-font-style);--spectrum-font-size:var(--spectrum-font-size-100);font-family:var(--spectrum-font-family);font-style:var(--spectrum-font-style);font-size:var(--spectrum-font-size)}.spectrum:lang(ar){font-family:var(--spectrum-font-family-ar)}.spectrum:lang(he){font-family:var(--spectrum-font-family-he)}.spectrum-Heading{--spectrum-heading-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-heading-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-heading-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-heading-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-heading-font-color:var(--spectrum-heading-color);--spectrum-heading-margin-start:calc(var(--mod-heading-font-size,var(--spectrum-heading-font-size))*var(--spectrum-heading-margin-top-multiplier));--spectrum-heading-margin-end:calc(var(--mod-heading-font-size,var(--spectrum-heading-font-size))*var(--spectrum-heading-margin-bottom-multiplier))}.spectrum-Heading--sizeXXS{--spectrum-heading-font-size:var(--spectrum-heading-size-xxs);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxs)}.spectrum-Heading--sizeXS{--spectrum-heading-font-size:var(--spectrum-heading-size-xs);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xs)}.spectrum-Heading--sizeS{--spectrum-heading-font-size:var(--spectrum-heading-size-s);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-s)}.spectrum-Heading--sizeM{--spectrum-heading-font-size:var(--spectrum-heading-size-m);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-m)}.spectrum-Heading--sizeL{--spectrum-heading-font-size:var(--spectrum-heading-size-l);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-l)}.spectrum-Heading--sizeXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xl)}.spectrum-Heading--sizeXXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xxl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxl)}.spectrum-Heading--sizeXXXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xxxl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxxl)}.spectrum-Heading{font-family:var(--mod-heading-sans-serif-font-family,var(--spectrum-heading-sans-serif-font-family));font-style:var(--mod-heading-sans-serif-font-style,var(--spectrum-heading-sans-serif-font-style));font-weight:var(--mod-heading-sans-serif-font-weight,var(--spectrum-heading-sans-serif-font-weight));font-size:var(--mod-heading-font-size,var(--spectrum-heading-font-size));color:var(--highcontrast-heading-font-color,var(--mod-heading-font-color,var(--spectrum-heading-font-color)));line-height:var(--mod-heading-line-height,var(--spectrum-heading-line-height));margin-block:0}.spectrum-Heading .spectrum-Heading-strong,.spectrum-Heading strong{font-style:var(--mod-heading-sans-serif-strong-font-style,var(--spectrum-heading-sans-serif-strong-font-style));font-weight:var(--mod-heading-sans-serif-strong-font-weight,var(--spectrum-heading-sans-serif-strong-font-weight))}.spectrum-Heading .spectrum-Heading-emphasized,.spectrum-Heading em{font-style:var(--mod-heading-sans-serif-emphasized-font-style,var(--spectrum-heading-sans-serif-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-emphasized-font-weight,var(--spectrum-heading-sans-serif-emphasized-font-weight))}.spectrum-Heading .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading em strong,.spectrum-Heading strong em{font-style:var(--mod-heading-sans-serif-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-strong-emphasized-font-weight))}.spectrum-Heading:lang(ja),.spectrum-Heading:lang(ko),.spectrum-Heading:lang(zh){font-family:var(--mod-heading-cjk-font-family,var(--spectrum-heading-cjk-font-family));font-style:var(--mod-heading-cjk-font-style,var(--spectrum-heading-cjk-font-style));font-weight:var(--mod-heading-cjk-font-weight,var(--spectrum-heading-cjk-font-weight));font-size:var(--mod-heading-cjk-font-size,var(--spectrum-heading-cjk-font-size));line-height:var(--mod-heading-cjk-line-height,var(--spectrum-heading-cjk-line-height));letter-spacing:var(--mod-heading-cjk-letter-spacing,var(--spectrum-heading-cjk-letter-spacing))}.spectrum-Heading:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em,.spectrum-Heading:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em,.spectrum-Heading:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em{font-style:var(--mod-heading-cjk-emphasized-font-style,var(--spectrum-heading-cjk-emphasized-font-style));font-weight:var(--mod-heading-cjk-emphasized-font-weight,var(--spectrum-heading-cjk-emphasized-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong,.spectrum-Heading:lang(ja) strong,.spectrum-Heading:lang(ko) .spectrum-Heading-strong,.spectrum-Heading:lang(ko) strong,.spectrum-Heading:lang(zh) .spectrum-Heading-strong,.spectrum-Heading:lang(zh) strong{font-style:var(--mod-heading-cjk-strong-font-style,var(--spectrum-heading-cjk-strong-font-style));font-weight:var(--mod-heading-cjk-strong-font-weight,var(--spectrum-heading-cjk-strong-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em strong,.spectrum-Heading:lang(ja) strong em,.spectrum-Heading:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em strong,.spectrum-Heading:lang(ko) strong em,.spectrum-Heading:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em strong,.spectrum-Heading:lang(zh) strong em{font-style:var(--mod-heading-cjk-strong-emphasized-font-style,var(--spectrum-heading-cjk-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-strong-emphasized-font-weight,var(--spectrum-heading-cjk-strong-emphasized-font-weight))}.spectrum-Heading--heavy{font-style:var(--mod-heading-sans-serif-heavy-font-style,var(--spectrum-heading-sans-serif-heavy-font-style));font-weight:var(--mod-heading-sans-serif-heavy-font-weight,var(--spectrum-heading-sans-serif-heavy-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--heavy strong{font-style:var(--mod-heading-sans-serif-heavy-strong-font-style,var(--spectrum-heading-sans-serif-heavy-strong-font-style));font-weight:var(--mod-heading-sans-serif-heavy-strong-font-weight,var(--spectrum-heading-sans-serif-heavy-strong-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-emphasized,.spectrum-Heading--heavy em{font-style:var(--mod-heading-sans-serif-heavy-emphasized-font-style,var(--spectrum-heading-sans-serif-heavy-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-heavy-emphasized-font-weight,var(--spectrum-heading-sans-serif-heavy-emphasized-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy em strong,.spectrum-Heading--heavy strong em{font-style:var(--mod-heading-sans-serif-heavy-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-heavy-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-heavy-strong-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja),.spectrum-Heading--heavy:lang(ko),.spectrum-Heading--heavy:lang(zh){font-style:var(--mod-heading-cjk-heavy-font-style,var(--spectrum-heading-cjk-heavy-font-style));font-weight:var(--mod-heading-cjk-heavy-font-weight,var(--spectrum-heading-cjk-heavy-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em{font-style:var(--mod-heading-cjk-heavy-emphasized-font-style,var(--spectrum-heading-cjk-heavy-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ja) strong,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ko) strong,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(zh) strong{font-style:var(--mod-heading-cjk-heavy-strong-font-style,var(--spectrum-heading-cjk-heavy-strong-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-font-weight,var(--spectrum-heading-cjk-heavy-strong-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em strong,.spectrum-Heading--heavy:lang(ja) strong em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em strong,.spectrum-Heading--heavy:lang(ko) strong em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em strong,.spectrum-Heading--heavy:lang(zh) strong em{font-style:var(--mod-heading-cjk-heavy-strong-emphasized-font-style,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-weight))}.spectrum-Heading--light{font-style:var(--mod-heading-sans-serif-light-font-style,var(--spectrum-heading-sans-serif-light-font-style));font-weight:var(--mod-heading-sans-serif-light-font-weight,var(--spectrum-heading-sans-serif-light-font-weight))}.spectrum-Heading--light .spectrum-Heading-emphasized,.spectrum-Heading--light em{font-style:var(--mod-heading-sans-serif-light-emphasized-font-style,var(--spectrum-heading-sans-serif-light-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-light-emphasized-font-weight,var(--spectrum-heading-sans-serif-light-emphasized-font-weight))}.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--light strong{font-style:var(--mod-heading-sans-serif-light-strong-font-style,var(--spectrum-heading-sans-serif-light-strong-font-style));font-weight:var(--mod-heading-sans-serif-light-strong-font-weight,var(--spectrum-heading-sans-serif-light-strong-font-weight))}.spectrum-Heading--light .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light em strong,.spectrum-Heading--light strong em{font-style:var(--mod-heading-sans-serif-light-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-light-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-light-strong-emphasized-font-weight))}.spectrum-Heading--light:lang(ja),.spectrum-Heading--light:lang(ko),.spectrum-Heading--light:lang(zh){font-style:var(--mod-heading-cjk-light-font-style,var(--spectrum-heading-cjk-light-font-style));font-weight:var(--mod-heading-cjk-light-font-weight,var(--spectrum-heading-cjk-light-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ja) strong,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ko) strong,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--light:lang(zh) strong{font-style:var(--mod-heading-cjk-light-strong-font-style,var(--spectrum-heading-cjk-light-strong-font-style));font-weight:var(--mod-heading-cjk-light-strong-font-weight,var(--spectrum-heading-cjk-light-strong-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em{font-style:var(--mod-heading-cjk-light-emphasized-font-style,var(--spectrum-heading-cjk-light-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-emphasized-font-weight,var(--spectrum-heading-cjk-light-emphasized-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em strong,.spectrum-Heading--light:lang(ja) strong em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em strong,.spectrum-Heading--light:lang(ko) strong em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em strong,.spectrum-Heading--light:lang(zh) strong em{font-style:var(--mod-heading-cjk-light-strong-emphasized-font-style,var(--spectrum-heading-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-strong-emphasized-font-weight,var(--spectrum-heading-cjk-light-strong-emphasized-font-weight))}.spectrum-Heading--serif{font-family:var(--mod-heading-serif-font-family,var(--spectrum-heading-serif-font-family));font-style:var(--mod-heading-serif-font-style,var(--spectrum-heading-serif-font-style));font-weight:var(--mod-heading-serif-font-weight,var(--spectrum-heading-serif-font-weight))}.spectrum-Heading--serif .spectrum-Heading-emphasized,.spectrum-Heading--serif em{font-style:var(--mod-heading-serif-emphasized-font-style,var(--spectrum-heading-serif-emphasized-font-style));font-weight:var(--mod-heading-serif-emphasized-font-weight,var(--spectrum-heading-serif-emphasized-font-weight))}.spectrum-Heading--serif .spectrum-Heading-strong,.spectrum-Heading--serif strong{font-style:var(--mod-heading-serif-strong-font-style,var(--spectrum-heading-serif-strong-font-style));font-weight:var(--mod-heading-serif-strong-font-weight,var(--spectrum-heading-serif-strong-font-weight))}.spectrum-Heading--serif .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif em strong,.spectrum-Heading--serif strong em{font-style:var(--mod-heading-serif-strong-emphasized-font-style,var(--spectrum-heading-serif-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-strong-emphasized-font-weight,var(--spectrum-heading-serif-strong-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy{font-style:var(--mod-heading-serif-heavy-font-style,var(--spectrum-heading-serif-heavy-font-style));font-weight:var(--mod-heading-serif-heavy-font-weight,var(--spectrum-heading-serif-heavy-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--serif.spectrum-Heading--heavy strong{font-style:var(--mod-heading-serif-heavy-strong-font-style,var(--spectrum-heading-serif-heavy-strong-font-style));font-weight:var(--mod-heading-serif-heavy-strong-font-weight,var(--spectrum-heading-serif-heavy-strong-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--heavy em{font-style:var(--mod-heading-serif-heavy-emphasized-font-style,var(--spectrum-heading-serif-heavy-emphasized-font-style));font-weight:var(--mod-heading-serif-heavy-emphasized-font-weight,var(--spectrum-heading-serif-heavy-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--heavy em strong,.spectrum-Heading--serif.spectrum-Heading--heavy strong em{font-style:var(--mod-heading-serif-heavy-strong-emphasized-font-style,var(--spectrum-heading-serif-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-heavy-strong-emphasized-font-weight,var(--spectrum-heading-serif-heavy-strong-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light{font-style:var(--mod-heading-serif-light-font-style,var(--spectrum-heading-serif-light-font-style));font-weight:var(--mod-heading-serif-light-font-weight,var(--spectrum-heading-serif-light-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--light em{font-style:var(--mod-heading-serif-light-emphasized-font-style,var(--spectrum-heading-serif-light-emphasized-font-style));font-weight:var(--mod-heading-serif-light-emphasized-font-weight,var(--spectrum-heading-serif-light-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--serif.spectrum-Heading--light strong{font-style:var(--mod-heading-serif-light-strong-font-style,var(--spectrum-heading-serif-light-strong-font-style));font-weight:var(--mod-heading-serif-light-strong-font-weight,var(--spectrum-heading-serif-light-strong-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--light em strong,.spectrum-Heading--serif.spectrum-Heading--light strong em{font-style:var(--mod-heading-serif-light-strong-emphasized-font-style,var(--spectrum-heading-serif-light-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-light-strong-emphasized-font-weight,var(--spectrum-heading-serif-light-strong-emphasized-font-weight))}.spectrum-Typography .spectrum-Heading{margin-block-start:var(--mod-heading-margin-start,var(--spectrum-heading-margin-start));margin-block-end:var(--mod-heading-margin-end,var(--spectrum-heading-margin-end))}.spectrum-Body{--spectrum-body-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-body-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-body-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-body-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-body-margin:calc(var(--mod-body-font-size,var(--spectrum-body-font-size))*var(--spectrum-body-margin-multiplier));--spectrum-body-font-color:var(--spectrum-body-color)}.spectrum-Body--sizeXS{--spectrum-body-font-size:var(--spectrum-body-size-xs)}.spectrum-Body--sizeS{--spectrum-body-font-size:var(--spectrum-body-size-s)}.spectrum-Body--sizeM{--spectrum-body-font-size:var(--spectrum-body-size-m)}.spectrum-Body--sizeL{--spectrum-body-font-size:var(--spectrum-body-size-l)}.spectrum-Body--sizeXL{--spectrum-body-font-size:var(--spectrum-body-size-xl)}.spectrum-Body--sizeXXL{--spectrum-body-font-size:var(--spectrum-body-size-xxl)}.spectrum-Body--sizeXXXL{--spectrum-body-font-size:var(--spectrum-body-size-xxxl)}.spectrum-Body{font-family:var(--mod-body-sans-serif-font-family,var(--spectrum-body-sans-serif-font-family));font-style:var(--mod-body-sans-serif-font-style,var(--spectrum-body-sans-serif-font-style));font-weight:var(--mod-body-sans-serif-font-weight,var(--spectrum-body-sans-serif-font-weight));font-size:var(--mod-body-font-size,var(--spectrum-body-font-size));color:var(--highcontrast-body-font-color,var(--mod-body-font-color,var(--spectrum-body-font-color)));line-height:var(--mod-body-line-height,var(--spectrum-body-line-height));margin-block:0}.spectrum-Body .spectrum-Body-strong,.spectrum-Body strong{font-style:var(--mod-body-sans-serif-strong-font-style,var(--spectrum-body-sans-serif-strong-font-style));font-weight:var(--mod-body-sans-serif-strong-font-weight,var(--spectrum-body-sans-serif-strong-font-weight))}.spectrum-Body .spectrum-Body-emphasized,.spectrum-Body em{font-style:var(--mod-body-sans-serif-emphasized-font-style,var(--spectrum-body-sans-serif-emphasized-font-style));font-weight:var(--mod-body-sans-serif-emphasized-font-weight,var(--spectrum-body-sans-serif-emphasized-font-weight))}.spectrum-Body .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body em strong,.spectrum-Body strong em{font-style:var(--mod-body-sans-serif-strong-emphasized-font-style,var(--spectrum-body-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-body-sans-serif-strong-emphasized-font-weight,var(--spectrum-body-sans-serif-strong-emphasized-font-weight))}.spectrum-Body:lang(ja),.spectrum-Body:lang(ko),.spectrum-Body:lang(zh){font-family:var(--mod-body-cjk-font-family,var(--spectrum-body-cjk-font-family));font-style:var(--mod-body-cjk-font-style,var(--spectrum-body-cjk-font-style));font-weight:var(--mod-body-cjk-font-weight,var(--spectrum-body-cjk-font-weight));line-height:var(--mod-body-cjk-line-height,var(--spectrum-body-cjk-line-height));letter-spacing:var(--mod-body-cjk-letter-spacing,var(--spectrum-body-cjk-letter-spacing))}.spectrum-Body:lang(ja) .spectrum-Body-strong,.spectrum-Body:lang(ja) strong,.spectrum-Body:lang(ko) .spectrum-Body-strong,.spectrum-Body:lang(ko) strong,.spectrum-Body:lang(zh) .spectrum-Body-strong,.spectrum-Body:lang(zh) strong{font-style:var(--mod-body-cjk-strong-font-style,var(--spectrum-body-cjk-strong-font-style));font-weight:var(--mod-body-cjk-strong-font-weight,var(--spectrum-body-cjk-strong-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-emphasized,.spectrum-Body:lang(ja) em,.spectrum-Body:lang(ko) .spectrum-Body-emphasized,.spectrum-Body:lang(ko) em,.spectrum-Body:lang(zh) .spectrum-Body-emphasized,.spectrum-Body:lang(zh) em{font-style:var(--mod-body-cjk-emphasized-font-style,var(--spectrum-body-cjk-emphasized-font-style));font-weight:var(--mod-body-cjk-emphasized-font-weight,var(--spectrum-body-cjk-emphasized-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ja) em strong,.spectrum-Body:lang(ja) strong em,.spectrum-Body:lang(ko) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ko) em strong,.spectrum-Body:lang(ko) strong em,.spectrum-Body:lang(zh) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(zh) em strong,.spectrum-Body:lang(zh) strong em{font-style:var(--mod-body-cjk-strong-emphasized-font-style,var(--spectrum-body-cjk-strong-emphasized-font-style));font-weight:var(--mod-body-cjk-strong-emphasized-font-weight,var(--spectrum-body-cjk-strong-emphasized-font-weight))}.spectrum-Body--serif{font-family:var(--mod-body-serif-font-family,var(--spectrum-body-serif-font-family));font-weight:var(--mod-body-serif-font-weight,var(--spectrum-body-serif-font-weight));font-style:var(--mod-body-serif-font-style,var(--spectrum-body-serif-font-style))}.spectrum-Body--serif .spectrum-Body-strong,.spectrum-Body--serif strong{font-style:var(--mod-body-serif-strong-font-style,var(--spectrum-body-serif-strong-font-style));font-weight:var(--mod-body-serif-strong-font-weight,var(--spectrum-body-serif-strong-font-weight))}.spectrum-Body--serif .spectrum-Body-emphasized,.spectrum-Body--serif em{font-style:var(--mod-body-serif-emphasized-font-style,var(--spectrum-body-serif-emphasized-font-style));font-weight:var(--mod-body-serif-emphasized-font-weight,var(--spectrum-body-serif-emphasized-font-weight))}.spectrum-Body--serif .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body--serif em strong,.spectrum-Body--serif strong em{font-style:var(--mod-body-serif-strong-emphasized-font-style,var(--spectrum-body-serif-strong-emphasized-font-style));font-weight:var(--mod-body-serif-strong-emphasized-font-weight,var(--spectrum-body-serif-strong-emphasized-font-weight))}.spectrum-Typography .spectrum-Body{margin-block-end:var(--mod-body-margin,var(--spectrum-body-margin))}.spectrum-Detail{--spectrum-detail-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-detail-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-detail-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-detail-margin-start:calc(var(--mod-detail-font-size,var(--spectrum-detail-font-size))*var(--spectrum-detail-margin-top-multiplier));--spectrum-detail-margin-end:calc(var(--mod-detail-font-size,var(--spectrum-detail-font-size))*var(--spectrum-detail-margin-bottom-multiplier));--spectrum-detail-font-color:var(--spectrum-detail-color)}.spectrum-Detail--sizeS{--spectrum-detail-font-size:var(--spectrum-detail-size-s)}.spectrum-Detail--sizeM{--spectrum-detail-font-size:var(--spectrum-detail-size-m)}.spectrum-Detail--sizeL{--spectrum-detail-font-size:var(--spectrum-detail-size-l)}.spectrum-Detail--sizeXL{--spectrum-detail-font-size:var(--spectrum-detail-size-xl)}.spectrum-Detail{font-family:var(--mod-detail-sans-serif-font-family,var(--spectrum-detail-sans-serif-font-family));font-style:var(--mod-detail-sans-serif-font-style,var(--spectrum-detail-sans-serif-font-style));font-weight:var(--mod-detail-sans-serif-font-weight,var(--spectrum-detail-sans-serif-font-weight));font-size:var(--mod-detail-font-size,var(--spectrum-detail-font-size));color:var(--highcontrast-detail-font-color,var(--mod-detail-font-color,var(--spectrum-detail-font-color)));line-height:var(--mod-detail-line-height,var(--spectrum-detail-line-height));letter-spacing:var(--mod-detail-letter-spacing,var(--spectrum-detail-letter-spacing));text-transform:uppercase;margin-block:0}.spectrum-Detail .spectrum-Detail-strong,.spectrum-Detail strong{font-style:var(--mod-detail-sans-serif-strong-font-style,var(--spectrum-detail-sans-serif-strong-font-style));font-weight:var(--mod-detail-sans-serif-strong-font-weight,var(--spectrum-detail-sans-serif-strong-font-weight))}.spectrum-Detail .spectrum-Detail-emphasized,.spectrum-Detail em{font-style:var(--mod-detail-sans-serif-emphasized-font-style,var(--spectrum-detail-sans-serif-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-emphasized-font-weight,var(--spectrum-detail-sans-serif-emphasized-font-weight))}.spectrum-Detail .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail em strong,.spectrum-Detail strong em{font-style:var(--mod-detail-sans-serif-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-strong-emphasized-font-weight))}.spectrum-Detail:lang(ja),.spectrum-Detail:lang(ko),.spectrum-Detail:lang(zh){font-family:var(--mod-detail-cjk-font-family,var(--spectrum-detail-cjk-font-family));font-style:var(--mod-detail-cjk-font-style,var(--spectrum-detail-cjk-font-style));font-weight:var(--mod-detail-cjk-font-weight,var(--spectrum-detail-cjk-font-weight));line-height:var(--mod-detail-cjk-line-height,var(--spectrum-detail-cjk-line-height))}.spectrum-Detail:lang(ja) .spectrum-Detail-strong,.spectrum-Detail:lang(ja) strong,.spectrum-Detail:lang(ko) .spectrum-Detail-strong,.spectrum-Detail:lang(ko) strong,.spectrum-Detail:lang(zh) .spectrum-Detail-strong,.spectrum-Detail:lang(zh) strong{font-style:var(--mod-detail-cjk-strong-font-style,var(--spectrum-detail-cjk-strong-font-style));font-weight:var(--mod-detail-cjk-strong-font-weight,var(--spectrum-detail-cjk-strong-font-weight))}.spectrum-Detail:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em,.spectrum-Detail:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em,.spectrum-Detail:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em{font-style:var(--mod-detail-cjk-emphasized-font-style,var(--spectrum-detail-cjk-emphasized-font-style));font-weight:var(--mod-detail-cjk-emphasized-font-weight,var(--spectrum-detail-cjk-emphasized-font-weight))}.spectrum-Detail:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em strong,.spectrum-Detail:lang(ja) strong em,.spectrum-Detail:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em strong,.spectrum-Detail:lang(ko) strong em,.spectrum-Detail:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em strong,.spectrum-Detail:lang(zh) strong em{font-style:var(--mod-detail-cjk-strong-emphasized-font-style,var(--spectrum-detail-cjk-strong-emphasized-font-style));font-weight:var(--mod-detail-cjk-strong-emphasized-font-weight,var(--spectrum-detail-cjk-strong-emphasized-font-weight))}.spectrum-Detail--serif{font-family:var(--mod-detail-serif-font-family,var(--spectrum-detail-serif-font-family));font-style:var(--mod-detail-serif-font-style,var(--spectrum-detail-serif-font-style));font-weight:var(--mod-detail-serif-font-weight,var(--spectrum-detail-serif-font-weight))}.spectrum-Detail--serif .spectrum-Detail-strong,.spectrum-Detail--serif strong{font-style:var(--mod-detail-serif-strong-font-style,var(--spectrum-detail-serif-strong-font-style));font-weight:var(--mod-detail-serif-strong-font-weight,var(--spectrum-detail-serif-strong-font-weight))}.spectrum-Detail--serif .spectrum-Detail-emphasized,.spectrum-Detail--serif em{font-style:var(--mod-detail-serif-emphasized-font-style,var(--spectrum-detail-serif-emphasized-font-style));font-weight:var(--mod-detail-serif-emphasized-font-weight,var(--spectrum-detail-serif-emphasized-font-weight))}.spectrum-Detail--serif .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--serif em strong,.spectrum-Detail--serif strong em{font-style:var(--mod-detail-serif-strong-emphasized-font-style,var(--spectrum-detail-serif-strong-emphasized-font-style));font-weight:var(--mod-detail-serif-strong-emphasized-font-weight,var(--spectrum-detail-serif-strong-emphasized-font-weight))}.spectrum-Detail--light{font-style:var(--mod-detail-sans-serif-light-font-style,var(--spectrum-detail-sans-serif-light-font-style));font-weight:var(--spectrum-detail-sans-serif-light-font-weight,var(--spectrum-detail-sans-serif-light-font-weight))}.spectrum-Detail--light .spectrum-Detail-strong,.spectrum-Detail--light strong{font-style:var(--mod-detail-sans-serif-light-strong-font-style,var(--spectrum-detail-sans-serif-light-strong-font-style));font-weight:var(--mod-detail-sans-serif-light-strong-font-weight,var(--spectrum-detail-sans-serif-light-strong-font-weight))}.spectrum-Detail--light .spectrum-Detail-emphasized,.spectrum-Detail--light em{font-style:var(--mod-detail-sans-serif-light-emphasized-font-style,var(--spectrum-detail-sans-serif-light-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-light-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-emphasized-font-weight))}.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized,.spectrum-Detail--light em strong,.spectrum-Detail--light strong em{font-style:var(--mod-detail-sans-serif-light-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-weight))}.spectrum-Detail--light:lang(ja),.spectrum-Detail--light:lang(ko),.spectrum-Detail--light:lang(zh){font-style:var(--mod-detail-cjk-light-font-style,var(--spectrum-detail-cjk-light-font-style));font-weight:var(--mod-detail-cjk-light-font-weight,var(--spectrum-detail-cjk-light-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ja) strong,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ko) strong,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong,.spectrum-Detail--light:lang(zh) strong{font-style:var(--mod-detail-cjk-light-strong-font-style,var(--spectrum-detail-cjk-light-strong-font-style));font-weight:var(--mod-detail-cjk-light-strong-font-weight,var(--spectrum-detail-cjk-light-strong-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ja) em,.spectrum-Detail--light:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) em,.spectrum-Detail--light:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) em{font-style:var(--mod-detail-cjk-light-emphasized-font-style,var(--spectrum-detail-cjk-light-emphasized-font-style));font-weight:var(--mod-detail-cjk-light-emphasized-font-weight,var(--spectrum-detail-cjk-light-emphasized-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized{font-style:var(--mod-detail-cjk-light-strong-emphasized-font-style,var(--spectrum-detail-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-detail-cjk-light-strong-emphasized-font-weight,var(--spectrum-detail-cjk-light-strong-emphasized-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light{font-style:var(--mod-detail-serif-light-font-style,var(--spectrum-detail-serif-light-font-style));font-weight:var(--mod-detail-serif-light-font-weight,var(--spectrum-detail-serif-light-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong,.spectrum-Detail--serif.spectrum-Detail--light strong{font-style:var(--mod-detail-serif-light-strong-font-style,var(--spectrum-detail-serif-light-strong-font-style));font-weight:var(--mod-detail-serif-light-strong-font-weight,var(--spectrum-detail-serif-light-strong-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-emphasized,.spectrum-Detail--serif.spectrum-Detail--light em{font-style:var(--mod-detail-serif-light-emphasized-font-style,var(--spectrum-detail-serif-light-emphasized-font-style));font-weight:var(--mod-detail-serif-light-emphasized-font-weight,var(--spectrum-detail-serif-light-emphasized-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized,.spectrum-Detail--serif.spectrum-Detail--light em strong,.spectrum-Detail--serif.spectrum-Detail--light strong em{font-style:var(--mod-detail-serif-light-strong-emphasized-font-style,var(--spectrum-detail-serif-light-strong-emphasized-font-style));font-weight:var(--mod-detail-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-serif-light-strong-emphasized-font-weight))}.spectrum-Typography .spectrum-Detail{margin-block-start:var(--mod-detail-margin-start,var(--spectrum-detail-margin-start));margin-block-end:var(--mod-detail-margin-end,var(--spectrum-detail-margin-end))}.spectrum-Code{--spectrum-code-font-family:var(--spectrum-code-font-family-stack);--spectrum-code-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-code-font-color:var(--spectrum-code-color)}.spectrum-Code--sizeXS{--spectrum-code-font-size:var(--spectrum-code-size-xs)}.spectrum-Code--sizeS{--spectrum-code-font-size:var(--spectrum-code-size-s)}.spectrum-Code--sizeM{--spectrum-code-font-size:var(--spectrum-code-size-m)}.spectrum-Code--sizeL{--spectrum-code-font-size:var(--spectrum-code-size-l)}.spectrum-Code--sizeXL{--spectrum-code-font-size:var(--spectrum-code-size-xl)}.spectrum-Code{font-family:var(--mod-code-font-family,var(--spectrum-code-font-family));font-style:var(--mod-code-font-style,var(--spectrum-code-font-style));font-weight:var(--mod-code-font-weight,var(--spectrum-code-font-weight));font-size:var(--mod-code-font-size,var(--spectrum-code-font-size));line-height:var(--mod-code-line-height,var(--spectrum-code-line-height));color:var(--highcontrast-code-font-color,var(--mod-code-font-color,var(--spectrum-code-font-color)));margin-block:0}.spectrum-Code .spectrum-Code-strong,.spectrum-Code strong{font-style:var(--mod-code-strong-font-style,var(--spectrum-code-strong-font-style));font-weight:var(--mod-code-strong-font-weight,var(--spectrum-code-strong-font-weight))}.spectrum-Code .spectrum-Code-emphasized,.spectrum-Code em{font-style:var(--mod-code-emphasized-font-style,var(--spectrum-code-emphasized-font-style));font-weight:var(--mod-code-emphasized-font-weight,var(--spectrum-code-emphasized-font-weight))}.spectrum-Code .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code em strong,.spectrum-Code strong em{font-style:var(--mod-code-strong-emphasized-font-style,var(--spectrum-code-strong-emphasized-font-style));font-weight:var(--mod-code-strong-emphasized-font-weight,var(--spectrum-code-strong-emphasized-font-weight))}.spectrum-Code:lang(ja),.spectrum-Code:lang(ko),.spectrum-Code:lang(zh){font-family:var(--mod-code-cjk-font-family,var(--spectrum-code-cjk-font-family));font-style:var(--mod-code-cjk-font-style,var(--spectrum-code-cjk-font-style));font-weight:var(--mod-code-cjk-font-weight,var(--spectrum-code-cjk-font-weight));line-height:var(--mod-code-cjk-line-height,var(--spectrum-code-cjk-line-height));letter-spacing:var(--mod-code-cjk-letter-spacing,var(--spectrum-code-cjk-letter-spacing))}.spectrum-Code:lang(ja) .spectrum-Code-strong,.spectrum-Code:lang(ja) strong,.spectrum-Code:lang(ko) .spectrum-Code-strong,.spectrum-Code:lang(ko) strong,.spectrum-Code:lang(zh) .spectrum-Code-strong,.spectrum-Code:lang(zh) strong{font-style:var(--mod-code-cjk-strong-font-style,var(--spectrum-code-cjk-strong-font-style));font-weight:var(--mod-code-cjk-strong-font-weight,var(--spectrum-code-cjk-strong-font-weight))}.spectrum-Code:lang(ja) .spectrum-Code-emphasized,.spectrum-Code:lang(ja) em,.spectrum-Code:lang(ko) .spectrum-Code-emphasized,.spectrum-Code:lang(ko) em,.spectrum-Code:lang(zh) .spectrum-Code-emphasized,.spectrum-Code:lang(zh) em{font-style:var(--mod-code-cjk-emphasized-font-style,var(--spectrum-code-cjk-emphasized-font-style));font-weight:var(--mod-code-cjk-emphasized-font-weight,var(--spectrum-code-cjk-emphasized-font-weight))}.spectrum-Code:lang(ja) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(ja) em strong,.spectrum-Code:lang(ja) strong em,.spectrum-Code:lang(ko) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(ko) em strong,.spectrum-Code:lang(ko) strong em,.spectrum-Code:lang(zh) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(zh) em strong,.spectrum-Code:lang(zh) strong em{font-style:var(--mod-code-cjk-strong-emphasized-font-style,var(--spectrum-code-cjk-strong-emphasized-font-style));font-weight:var(--mod-code-cjk-strong-emphasized-font-weight,var(--spectrum-code-cjk-strong-emphasized-font-weight))}:host{--spectrum-picker-border-width:var(--spectrum-border-width-100);display:block}#scale,#theme{width:100%;height:100%}
        `;
var theme_core_tokens_css_default = e11;

// node_modules/@spectrum-web-components/theme/src/spectrum-two/core-tokens.js
Theme.registerThemeFragment("spectrum-two", "system", theme_core_tokens_css_default);

// node_modules/@spectrum-web-components/theme/spectrum-two/theme-light-core-tokens.js
Theme.registerThemeFragment("light-spectrum-two", "color", theme_light_core_tokens_css_default);

// node_modules/@spectrum-web-components/theme/src/spectrum-two/theme-dark-core-tokens.css.js
var e12 = i`
    :host,:root{--spectrum-overlay-opacity:.6;--spectrum-drop-shadow-color-rgb:0,0,0;--spectrum-drop-shadow-color-opacity:.8;--spectrum-drop-shadow-color:rgba(var(--spectrum-drop-shadow-color-rgb),var(--spectrum-drop-shadow-color-opacity));--spectrum-background-layer-2-color:var(--spectrum-gray-75);--spectrum-neutral-subdued-background-color-default:var(--spectrum-gray-500);--spectrum-neutral-subdued-background-color-hover:var(--spectrum-gray-400);--spectrum-neutral-subdued-background-color-down:var(--spectrum-gray-400);--spectrum-neutral-subdued-background-color-key-focus:var(--spectrum-gray-400);--spectrum-accent-background-color-default:var(--spectrum-accent-color-700);--spectrum-accent-background-color-hover:var(--spectrum-accent-color-600);--spectrum-accent-background-color-down:var(--spectrum-accent-color-600);--spectrum-accent-background-color-key-focus:var(--spectrum-accent-color-600);--spectrum-informative-background-color-default:var(--spectrum-informative-color-700);--spectrum-informative-background-color-hover:var(--spectrum-informative-color-600);--spectrum-informative-background-color-down:var(--spectrum-informative-color-600);--spectrum-informative-background-color-key-focus:var(--spectrum-informative-color-600);--spectrum-negative-background-color-default:var(--spectrum-negative-color-700);--spectrum-negative-background-color-hover:var(--spectrum-negative-color-600);--spectrum-negative-background-color-down:var(--spectrum-negative-color-600);--spectrum-negative-background-color-key-focus:var(--spectrum-negative-color-600);--spectrum-positive-background-color-default:var(--spectrum-positive-color-700);--spectrum-positive-background-color-hover:var(--spectrum-positive-color-600);--spectrum-positive-background-color-down:var(--spectrum-positive-color-600);--spectrum-positive-background-color-key-focus:var(--spectrum-positive-color-600);--spectrum-notice-background-color-default:var(--spectrum-notice-color-900);--spectrum-gray-background-color-default:var(--spectrum-gray-500);--spectrum-red-background-color-default:var(--spectrum-red-700);--spectrum-orange-background-color-default:var(--spectrum-orange-900);--spectrum-yellow-background-color-default:var(--spectrum-yellow-1100);--spectrum-chartreuse-background-color-default:var(--spectrum-chartreuse-1000);--spectrum-celery-background-color-default:var(--spectrum-celery-900);--spectrum-green-background-color-default:var(--spectrum-green-700);--spectrum-seafoam-background-color-default:var(--spectrum-seafoam-700);--spectrum-cyan-background-color-default:var(--spectrum-cyan-700);--spectrum-blue-background-color-default:var(--spectrum-blue-700);--spectrum-indigo-background-color-default:var(--spectrum-indigo-700);--spectrum-purple-background-color-default:var(--spectrum-purple-700);--spectrum-fuchsia-background-color-default:var(--spectrum-fuchsia-700);--spectrum-magenta-background-color-default:var(--spectrum-magenta-700);--spectrum-neutral-visual-color:var(--spectrum-gray-600);--spectrum-accent-visual-color:var(--spectrum-accent-color-900);--spectrum-informative-visual-color:var(--spectrum-informative-color-900);--spectrum-negative-visual-color:var(--spectrum-negative-color-700);--spectrum-notice-visual-color:var(--spectrum-notice-color-900);--spectrum-positive-visual-color:var(--spectrum-positive-color-800);--spectrum-gray-visual-color:var(--spectrum-gray-600);--spectrum-red-visual-color:var(--spectrum-red-700);--spectrum-orange-visual-color:var(--spectrum-orange-900);--spectrum-yellow-visual-color:var(--spectrum-yellow-1100);--spectrum-chartreuse-visual-color:var(--spectrum-chartreuse-900);--spectrum-celery-visual-color:var(--spectrum-celery-800);--spectrum-green-visual-color:var(--spectrum-green-800);--spectrum-seafoam-visual-color:var(--spectrum-seafoam-800);--spectrum-cyan-visual-color:var(--spectrum-cyan-900);--spectrum-blue-visual-color:var(--spectrum-blue-900);--spectrum-indigo-visual-color:var(--spectrum-indigo-900);--spectrum-purple-visual-color:var(--spectrum-purple-900);--spectrum-fuchsia-visual-color:var(--spectrum-fuchsia-900);--spectrum-magenta-visual-color:var(--spectrum-magenta-900);--spectrum-background-elevated-color:var(--spectrum-gray-75);--spectrum-background-pasteboard-color:var(--spectrum-gray-25);--spectrum-brown-visual-color:var(--spectrum-brown-900);--spectrum-cinnamon-visual-color:var(--spectrum-cinnamon-900);--spectrum-pink-visual-color:var(--spectrum-pink-900);--spectrum-silver-visual-color:var(--spectrum-silver-900);--spectrum-turquoise-visual-color:var(--spectrum-turquoise-900);--spectrum-brown-background-color-default:var(--spectrum-brown-700);--spectrum-cinnamon-background-color-default:var(--spectrum-cinnamon-700);--spectrum-pink-background-color-default:var(--spectrum-pink-700);--spectrum-silver-background-color-default:var(--spectrum-silver-700);--spectrum-turquoise-background-color-default:var(--spectrum-turquoise-700);--spectrum-opacity-checkerboard-square-dark:var(--spectrum-gray-800);--spectrum-gray-25-rgb:17,17,17;--spectrum-gray-25:rgba(var(--spectrum-gray-25-rgb));--spectrum-gray-50-rgb:27,27,27;--spectrum-gray-50:rgba(var(--spectrum-gray-50-rgb));--spectrum-gray-75-rgb:34,34,34;--spectrum-gray-75:rgba(var(--spectrum-gray-75-rgb));--spectrum-gray-100-rgb:44,44,44;--spectrum-gray-100:rgba(var(--spectrum-gray-100-rgb));--spectrum-gray-200-rgb:50,50,50;--spectrum-gray-200:rgba(var(--spectrum-gray-200-rgb));--spectrum-gray-300-rgb:57,57,57;--spectrum-gray-300:rgba(var(--spectrum-gray-300-rgb));--spectrum-gray-400-rgb:68,68,68;--spectrum-gray-400:rgba(var(--spectrum-gray-400-rgb));--spectrum-gray-500-rgb:109,109,109;--spectrum-gray-500:rgba(var(--spectrum-gray-500-rgb));--spectrum-gray-600-rgb:138,138,138;--spectrum-gray-600:rgba(var(--spectrum-gray-600-rgb));--spectrum-gray-700-rgb:175,175,175;--spectrum-gray-700:rgba(var(--spectrum-gray-700-rgb));--spectrum-gray-800-rgb:219,219,219;--spectrum-gray-800:rgba(var(--spectrum-gray-800-rgb));--spectrum-gray-900-rgb:242,242,242;--spectrum-gray-900:rgba(var(--spectrum-gray-900-rgb));--spectrum-gray-1000-rgb:255,255,255;--spectrum-gray-1000:rgba(var(--spectrum-gray-1000-rgb));--spectrum-blue-100-rgb:14,23,63;--spectrum-blue-100:rgba(var(--spectrum-blue-100-rgb));--spectrum-blue-200-rgb:15,28,82;--spectrum-blue-200:rgba(var(--spectrum-blue-200-rgb));--spectrum-blue-300-rgb:12,33,117;--spectrum-blue-300:rgba(var(--spectrum-blue-300-rgb));--spectrum-blue-400-rgb:18,45,154;--spectrum-blue-400:rgba(var(--spectrum-blue-400-rgb));--spectrum-blue-500-rgb:26,58,195;--spectrum-blue-500:rgba(var(--spectrum-blue-500-rgb));--spectrum-blue-600-rgb:37,73,229;--spectrum-blue-600:rgba(var(--spectrum-blue-600-rgb));--spectrum-blue-700-rgb:52,91,248;--spectrum-blue-700:rgba(var(--spectrum-blue-700-rgb));--spectrum-blue-800-rgb:69,110,254;--spectrum-blue-800:rgba(var(--spectrum-blue-800-rgb));--spectrum-blue-900-rgb:86,129,255;--spectrum-blue-900:rgba(var(--spectrum-blue-900-rgb));--spectrum-blue-1000-rgb:105,149,254;--spectrum-blue-1000:rgba(var(--spectrum-blue-1000-rgb));--spectrum-blue-1100-rgb:124,169,252;--spectrum-blue-1100:rgba(var(--spectrum-blue-1100-rgb));--spectrum-blue-1200-rgb:152,192,252;--spectrum-blue-1200:rgba(var(--spectrum-blue-1200-rgb));--spectrum-blue-1300-rgb:181,213,253;--spectrum-blue-1300:rgba(var(--spectrum-blue-1300-rgb));--spectrum-blue-1400-rgb:213,231,254;--spectrum-blue-1400:rgba(var(--spectrum-blue-1400-rgb));--spectrum-blue-1500-rgb:238,245,255;--spectrum-blue-1500:rgba(var(--spectrum-blue-1500-rgb));--spectrum-blue-1600-rgb:255,255,255;--spectrum-blue-1600:rgba(var(--spectrum-blue-1600-rgb));--spectrum-red-100-rgb:54,10,3;--spectrum-red-100:rgba(var(--spectrum-red-100-rgb));--spectrum-red-200-rgb:68,13,5;--spectrum-red-200:rgba(var(--spectrum-red-200-rgb));--spectrum-red-300-rgb:87,17,7;--spectrum-red-300:rgba(var(--spectrum-red-300-rgb));--spectrum-red-400-rgb:115,24,11;--spectrum-red-400:rgba(var(--spectrum-red-400-rgb));--spectrum-red-500-rgb:147,31,17;--spectrum-red-500:rgba(var(--spectrum-red-500-rgb));--spectrum-red-600-rgb:177,38,23;--spectrum-red-600:rgba(var(--spectrum-red-600-rgb));--spectrum-red-700-rgb:205,46,29;--spectrum-red-700:rgba(var(--spectrum-red-700-rgb));--spectrum-red-800-rgb:230,54,35;--spectrum-red-800:rgba(var(--spectrum-red-800-rgb));--spectrum-red-900-rgb:252,67,46;--spectrum-red-900:rgba(var(--spectrum-red-900-rgb));--spectrum-red-1000-rgb:255,103,86;--spectrum-red-1000:rgba(var(--spectrum-red-1000-rgb));--spectrum-red-1100-rgb:255,134,120;--spectrum-red-1100:rgba(var(--spectrum-red-1100-rgb));--spectrum-red-1200-rgb:255,167,157;--spectrum-red-1200:rgba(var(--spectrum-red-1200-rgb));--spectrum-red-1300-rgb:255,196,189;--spectrum-red-1300:rgba(var(--spectrum-red-1300-rgb));--spectrum-red-1400-rgb:255,222,219;--spectrum-red-1400:rgba(var(--spectrum-red-1400-rgb));--spectrum-red-1500-rgb:255,242,240;--spectrum-red-1500:rgba(var(--spectrum-red-1500-rgb));--spectrum-red-1600-rgb:255,255,255;--spectrum-red-1600:rgba(var(--spectrum-red-1600-rgb));--spectrum-orange-100-rgb:49,16,0;--spectrum-orange-100:rgba(var(--spectrum-orange-100-rgb));--spectrum-orange-200-rgb:61,21,0;--spectrum-orange-200:rgba(var(--spectrum-orange-200-rgb));--spectrum-orange-300-rgb:80,27,0;--spectrum-orange-300:rgba(var(--spectrum-orange-300-rgb));--spectrum-orange-400-rgb:106,36,0;--spectrum-orange-400:rgba(var(--spectrum-orange-400-rgb));--spectrum-orange-500-rgb:135,47,0;--spectrum-orange-500:rgba(var(--spectrum-orange-500-rgb));--spectrum-orange-600-rgb:162,59,0;--spectrum-orange-600:rgba(var(--spectrum-orange-600-rgb));--spectrum-orange-700-rgb:185,73,0;--spectrum-orange-700:rgba(var(--spectrum-orange-700-rgb));--spectrum-orange-800-rgb:205,86,0;--spectrum-orange-800:rgba(var(--spectrum-orange-800-rgb));--spectrum-orange-900-rgb:224,100,0;--spectrum-orange-900:rgba(var(--spectrum-orange-900-rgb));--spectrum-orange-1000-rgb:243,117,0;--spectrum-orange-1000:rgba(var(--spectrum-orange-1000-rgb));--spectrum-orange-1100-rgb:255,137,0;--spectrum-orange-1100:rgba(var(--spectrum-orange-1100-rgb));--spectrum-orange-1200-rgb:255,173,45;--spectrum-orange-1200:rgba(var(--spectrum-orange-1200-rgb));--spectrum-orange-1300-rgb:255,201,116;--spectrum-orange-1300:rgba(var(--spectrum-orange-1300-rgb));--spectrum-orange-1400-rgb:255,225,178;--spectrum-orange-1400:rgba(var(--spectrum-orange-1400-rgb));--spectrum-orange-1500-rgb:255,243,225;--spectrum-orange-1500:rgba(var(--spectrum-orange-1500-rgb));--spectrum-orange-1600-rgb:255,255,255;--spectrum-orange-1600:rgba(var(--spectrum-orange-1600-rgb));--spectrum-yellow-100-rgb:37,23,0;--spectrum-yellow-100:rgba(var(--spectrum-yellow-100-rgb));--spectrum-yellow-200-rgb:47,29,0;--spectrum-yellow-200:rgba(var(--spectrum-yellow-200-rgb));--spectrum-yellow-300-rgb:61,39,0;--spectrum-yellow-300:rgba(var(--spectrum-yellow-300-rgb));--spectrum-yellow-400-rgb:83,52,0;--spectrum-yellow-400:rgba(var(--spectrum-yellow-400-rgb));--spectrum-yellow-500-rgb:107,67,0;--spectrum-yellow-500:rgba(var(--spectrum-yellow-500-rgb));--spectrum-yellow-600-rgb:130,82,0;--spectrum-yellow-600:rgba(var(--spectrum-yellow-600-rgb));--spectrum-yellow-700-rgb:151,97,0;--spectrum-yellow-700:rgba(var(--spectrum-yellow-700-rgb));--spectrum-yellow-800-rgb:169,110,0;--spectrum-yellow-800:rgba(var(--spectrum-yellow-800-rgb));--spectrum-yellow-900-rgb:186,124,0;--spectrum-yellow-900:rgba(var(--spectrum-yellow-900-rgb));--spectrum-yellow-1000-rgb:203,141,0;--spectrum-yellow-1000:rgba(var(--spectrum-yellow-1000-rgb));--spectrum-yellow-1100-rgb:218,159,0;--spectrum-yellow-1100:rgba(var(--spectrum-yellow-1100-rgb));--spectrum-yellow-1200-rgb:235,183,0;--spectrum-yellow-1200:rgba(var(--spectrum-yellow-1200-rgb));--spectrum-yellow-1300-rgb:249,206,0;--spectrum-yellow-1300:rgba(var(--spectrum-yellow-1300-rgb));--spectrum-yellow-1400-rgb:255,230,86;--spectrum-yellow-1400:rgba(var(--spectrum-yellow-1400-rgb));--spectrum-yellow-1500-rgb:255,246,195;--spectrum-yellow-1500:rgba(var(--spectrum-yellow-1500-rgb));--spectrum-yellow-1600-rgb:255,255,255;--spectrum-yellow-1600:rgba(var(--spectrum-yellow-1600-rgb));--spectrum-chartreuse-100-rgb:23,28,0;--spectrum-chartreuse-100:rgba(var(--spectrum-chartreuse-100-rgb));--spectrum-chartreuse-200-rgb:30,36,0;--spectrum-chartreuse-200:rgba(var(--spectrum-chartreuse-200-rgb));--spectrum-chartreuse-300-rgb:39,47,0;--spectrum-chartreuse-300:rgba(var(--spectrum-chartreuse-300-rgb));--spectrum-chartreuse-400-rgb:53,63,0;--spectrum-chartreuse-400:rgba(var(--spectrum-chartreuse-400-rgb));--spectrum-chartreuse-500-rgb:68,82,0;--spectrum-chartreuse-500:rgba(var(--spectrum-chartreuse-500-rgb));--spectrum-chartreuse-600-rgb:83,100,0;--spectrum-chartreuse-600:rgba(var(--spectrum-chartreuse-600-rgb));--spectrum-chartreuse-700-rgb:97,116,0;--spectrum-chartreuse-700:rgba(var(--spectrum-chartreuse-700-rgb));--spectrum-chartreuse-800-rgb:109,131,0;--spectrum-chartreuse-800:rgba(var(--spectrum-chartreuse-800-rgb));--spectrum-chartreuse-900-rgb:122,147,0;--spectrum-chartreuse-900:rgba(var(--spectrum-chartreuse-900-rgb));--spectrum-chartreuse-1000-rgb:136,164,0;--spectrum-chartreuse-1000:rgba(var(--spectrum-chartreuse-1000-rgb));--spectrum-chartreuse-1100-rgb:151,181,0;--spectrum-chartreuse-1100:rgba(var(--spectrum-chartreuse-1100-rgb));--spectrum-chartreuse-1200-rgb:169,203,0;--spectrum-chartreuse-1200:rgba(var(--spectrum-chartreuse-1200-rgb));--spectrum-chartreuse-1300-rgb:187,225,0;--spectrum-chartreuse-1300:rgba(var(--spectrum-chartreuse-1300-rgb));--spectrum-chartreuse-1400-rgb:219,240,117;--spectrum-chartreuse-1400:rgba(var(--spectrum-chartreuse-1400-rgb));--spectrum-chartreuse-1500-rgb:242,249,206;--spectrum-chartreuse-1500:rgba(var(--spectrum-chartreuse-1500-rgb));--spectrum-chartreuse-1600-rgb:255,255,255;--spectrum-chartreuse-1600:rgba(var(--spectrum-chartreuse-1600-rgb));--spectrum-celery-100-rgb:11,31,0;--spectrum-celery-100:rgba(var(--spectrum-celery-100-rgb));--spectrum-celery-200-rgb:15,38,0;--spectrum-celery-200:rgba(var(--spectrum-celery-200-rgb));--spectrum-celery-300-rgb:21,51,1;--spectrum-celery-300:rgba(var(--spectrum-celery-300-rgb));--spectrum-celery-400-rgb:31,67,4;--spectrum-celery-400:rgba(var(--spectrum-celery-400-rgb));--spectrum-celery-500-rgb:41,86,8;--spectrum-celery-500:rgba(var(--spectrum-celery-500-rgb));--spectrum-celery-600-rgb:50,105,11;--spectrum-celery-600:rgba(var(--spectrum-celery-600-rgb));--spectrum-celery-700-rgb:60,122,15;--spectrum-celery-700:rgba(var(--spectrum-celery-700-rgb));--spectrum-celery-800-rgb:69,138,19;--spectrum-celery-800:rgba(var(--spectrum-celery-800-rgb));--spectrum-celery-900-rgb:78,154,23;--spectrum-celery-900:rgba(var(--spectrum-celery-900-rgb));--spectrum-celery-1000-rgb:88,172,28;--spectrum-celery-1000:rgba(var(--spectrum-celery-1000-rgb));--spectrum-celery-1100-rgb:100,190,35;--spectrum-celery-1100:rgba(var(--spectrum-celery-1100-rgb));--spectrum-celery-1200-rgb:116,213,46;--spectrum-celery-1200:rgba(var(--spectrum-celery-1200-rgb));--spectrum-celery-1300-rgb:136,234,65;--spectrum-celery-1300:rgba(var(--spectrum-celery-1300-rgb));--spectrum-celery-1400-rgb:170,251,112;--spectrum-celery-1400:rgba(var(--spectrum-celery-1400-rgb));--spectrum-celery-1500-rgb:222,255,198;--spectrum-celery-1500:rgba(var(--spectrum-celery-1500-rgb));--spectrum-celery-1600-rgb:255,255,255;--spectrum-celery-1600:rgba(var(--spectrum-celery-1600-rgb));--spectrum-green-100-rgb:0,30,23;--spectrum-green-100:rgba(var(--spectrum-green-100-rgb));--spectrum-green-200-rgb:0,38,29;--spectrum-green-200:rgba(var(--spectrum-green-200-rgb));--spectrum-green-300-rgb:0,51,38;--spectrum-green-300:rgba(var(--spectrum-green-300-rgb));--spectrum-green-400-rgb:0,68,48;--spectrum-green-400:rgba(var(--spectrum-green-400-rgb));--spectrum-green-500-rgb:2,87,58;--spectrum-green-500:rgba(var(--spectrum-green-500-rgb));--spectrum-green-600-rgb:3,106,67;--spectrum-green-600:rgba(var(--spectrum-green-600-rgb));--spectrum-green-700-rgb:4,124,75;--spectrum-green-700:rgba(var(--spectrum-green-700-rgb));--spectrum-green-800-rgb:6,140,82;--spectrum-green-800:rgba(var(--spectrum-green-800-rgb));--spectrum-green-900-rgb:9,157,89;--spectrum-green-900:rgba(var(--spectrum-green-900-rgb));--spectrum-green-1000-rgb:14,175,98;--spectrum-green-1000:rgba(var(--spectrum-green-1000-rgb));--spectrum-green-1100-rgb:24,193,110;--spectrum-green-1100:rgba(var(--spectrum-green-1100-rgb));--spectrum-green-1200-rgb:57,215,134;--spectrum-green-1200:rgba(var(--spectrum-green-1200-rgb));--spectrum-green-1300-rgb:126,231,172;--spectrum-green-1300:rgba(var(--spectrum-green-1300-rgb));--spectrum-green-1400-rgb:189,241,208;--spectrum-green-1400:rgba(var(--spectrum-green-1400-rgb));--spectrum-green-1500-rgb:229,250,236;--spectrum-green-1500:rgba(var(--spectrum-green-1500-rgb));--spectrum-green-1600-rgb:255,255,255;--spectrum-green-1600:rgba(var(--spectrum-green-1600-rgb));--spectrum-seafoam-100-rgb:0,30,27;--spectrum-seafoam-100:rgba(var(--spectrum-seafoam-100-rgb));--spectrum-seafoam-200-rgb:0,39,35;--spectrum-seafoam-200:rgba(var(--spectrum-seafoam-200-rgb));--spectrum-seafoam-300-rgb:0,50,44;--spectrum-seafoam-300:rgba(var(--spectrum-seafoam-300-rgb));--spectrum-seafoam-400-rgb:0,67,59;--spectrum-seafoam-400:rgba(var(--spectrum-seafoam-400-rgb));--spectrum-seafoam-500-rgb:2,86,75;--spectrum-seafoam-500:rgba(var(--spectrum-seafoam-500-rgb));--spectrum-seafoam-600-rgb:4,105,89;--spectrum-seafoam-600:rgba(var(--spectrum-seafoam-600-rgb));--spectrum-seafoam-700-rgb:6,122,103;--spectrum-seafoam-700:rgba(var(--spectrum-seafoam-700-rgb));--spectrum-seafoam-800-rgb:8,138,116;--spectrum-seafoam-800:rgba(var(--spectrum-seafoam-800-rgb));--spectrum-seafoam-900-rgb:10,154,128;--spectrum-seafoam-900:rgba(var(--spectrum-seafoam-900-rgb));--spectrum-seafoam-1000-rgb:12,173,142;--spectrum-seafoam-1000:rgba(var(--spectrum-seafoam-1000-rgb));--spectrum-seafoam-1100-rgb:14,190,156;--spectrum-seafoam-1100:rgba(var(--spectrum-seafoam-1100-rgb));--spectrum-seafoam-1200-rgb:29,214,176;--spectrum-seafoam-1200:rgba(var(--spectrum-seafoam-1200-rgb));--spectrum-seafoam-1300-rgb:122,229,203;--spectrum-seafoam-1300:rgba(var(--spectrum-seafoam-1300-rgb));--spectrum-seafoam-1400-rgb:186,241,222;--spectrum-seafoam-1400:rgba(var(--spectrum-seafoam-1400-rgb));--spectrum-seafoam-1500-rgb:229,249,243;--spectrum-seafoam-1500:rgba(var(--spectrum-seafoam-1500-rgb));--spectrum-seafoam-1600-rgb:255,255,255;--spectrum-seafoam-1600:rgba(var(--spectrum-seafoam-1600-rgb));--spectrum-cyan-100-rgb:0,29,39;--spectrum-cyan-100:rgba(var(--spectrum-cyan-100-rgb));--spectrum-cyan-200-rgb:0,36,49;--spectrum-cyan-200:rgba(var(--spectrum-cyan-200-rgb));--spectrum-cyan-300-rgb:0,48,65;--spectrum-cyan-300:rgba(var(--spectrum-cyan-300-rgb));--spectrum-cyan-400-rgb:0,64,88;--spectrum-cyan-400:rgba(var(--spectrum-cyan-400-rgb));--spectrum-cyan-500-rgb:0,82,113;--spectrum-cyan-500:rgba(var(--spectrum-cyan-500-rgb));--spectrum-cyan-600-rgb:3,99,140;--spectrum-cyan-600:rgba(var(--spectrum-cyan-600-rgb));--spectrum-cyan-700-rgb:8,115,168;--spectrum-cyan-700:rgba(var(--spectrum-cyan-700-rgb));--spectrum-cyan-800-rgb:15,128,194;--spectrum-cyan-800:rgba(var(--spectrum-cyan-800-rgb));--spectrum-cyan-900-rgb:24,142,220;--spectrum-cyan-900:rgba(var(--spectrum-cyan-900-rgb));--spectrum-cyan-1000-rgb:38,159,244;--spectrum-cyan-1000:rgba(var(--spectrum-cyan-1000-rgb));--spectrum-cyan-1100-rgb:63,177,255;--spectrum-cyan-1100:rgba(var(--spectrum-cyan-1100-rgb));--spectrum-cyan-1200-rgb:107,199,255;--spectrum-cyan-1200:rgba(var(--spectrum-cyan-1200-rgb));--spectrum-cyan-1300-rgb:152,219,255;--spectrum-cyan-1300:rgba(var(--spectrum-cyan-1300-rgb));--spectrum-cyan-1400-rgb:195,236,252;--spectrum-cyan-1400:rgba(var(--spectrum-cyan-1400-rgb));--spectrum-cyan-1500-rgb:230,248,253;--spectrum-cyan-1500:rgba(var(--spectrum-cyan-1500-rgb));--spectrum-cyan-1600-rgb:255,255,255;--spectrum-cyan-1600:rgba(var(--spectrum-cyan-1600-rgb));--spectrum-indigo-100-rgb:30,0,93;--spectrum-indigo-100:rgba(var(--spectrum-indigo-100-rgb));--spectrum-indigo-200-rgb:35,0,110;--spectrum-indigo-200:rgba(var(--spectrum-indigo-200-rgb));--spectrum-indigo-300-rgb:47,0,140;--spectrum-indigo-300:rgba(var(--spectrum-indigo-300-rgb));--spectrum-indigo-400-rgb:62,12,174;--spectrum-indigo-400:rgba(var(--spectrum-indigo-400-rgb));--spectrum-indigo-500-rgb:79,30,209;--spectrum-indigo-500:rgba(var(--spectrum-indigo-500-rgb));--spectrum-indigo-600-rgb:95,52,235;--spectrum-indigo-600:rgba(var(--spectrum-indigo-600-rgb));--spectrum-indigo-700-rgb:109,75,248;--spectrum-indigo-700:rgba(var(--spectrum-indigo-700-rgb));--spectrum-indigo-800-rgb:119,97,252;--spectrum-indigo-800:rgba(var(--spectrum-indigo-800-rgb));--spectrum-indigo-900-rgb:128,119,254;--spectrum-indigo-900:rgba(var(--spectrum-indigo-900-rgb));--spectrum-indigo-1000-rgb:139,141,254;--spectrum-indigo-1000:rgba(var(--spectrum-indigo-1000-rgb));--spectrum-indigo-1100-rgb:153,161,255;--spectrum-indigo-1100:rgba(var(--spectrum-indigo-1100-rgb));--spectrum-indigo-1200-rgb:176,186,255;--spectrum-indigo-1200:rgba(var(--spectrum-indigo-1200-rgb));--spectrum-indigo-1300-rgb:199,208,255;--spectrum-indigo-1300:rgba(var(--spectrum-indigo-1300-rgb));--spectrum-indigo-1400-rgb:223,228,255;--spectrum-indigo-1400:rgba(var(--spectrum-indigo-1400-rgb));--spectrum-indigo-1500-rgb:243,244,255;--spectrum-indigo-1500:rgba(var(--spectrum-indigo-1500-rgb));--spectrum-indigo-1600-rgb:255,255,255;--spectrum-indigo-1600:rgba(var(--spectrum-indigo-1600-rgb));--spectrum-purple-100-rgb:41,0,79;--spectrum-purple-100:rgba(var(--spectrum-purple-100-rgb));--spectrum-purple-200-rgb:50,0,96;--spectrum-purple-200:rgba(var(--spectrum-purple-200-rgb));--spectrum-purple-300-rgb:64,0,122;--spectrum-purple-300:rgba(var(--spectrum-purple-300-rgb));--spectrum-purple-400-rgb:83,0,159;--spectrum-purple-400:rgba(var(--spectrum-purple-400-rgb));--spectrum-purple-500-rgb:107,6,195;--spectrum-purple-500:rgba(var(--spectrum-purple-500-rgb));--spectrum-purple-600-rgb:130,34,215;--spectrum-purple-600:rgba(var(--spectrum-purple-600-rgb));--spectrum-purple-700-rgb:148,62,224;--spectrum-purple-700:rgba(var(--spectrum-purple-700-rgb));--spectrum-purple-800-rgb:161,84,229;--spectrum-purple-800:rgba(var(--spectrum-purple-800-rgb));--spectrum-purple-900-rgb:173,105,233;--spectrum-purple-900:rgba(var(--spectrum-purple-900-rgb));--spectrum-purple-1000-rgb:186,127,237;--spectrum-purple-1000:rgba(var(--spectrum-purple-1000-rgb));--spectrum-purple-1100-rgb:197,149,240;--spectrum-purple-1100:rgba(var(--spectrum-purple-1100-rgb));--spectrum-purple-1200-rgb:212,176,244;--spectrum-purple-1200:rgba(var(--spectrum-purple-1200-rgb));--spectrum-purple-1300-rgb:225,201,247;--spectrum-purple-1300:rgba(var(--spectrum-purple-1300-rgb));--spectrum-purple-1400-rgb:238,224,250;--spectrum-purple-1400:rgba(var(--spectrum-purple-1400-rgb));--spectrum-purple-1500-rgb:248,243,253;--spectrum-purple-1500:rgba(var(--spectrum-purple-1500-rgb));--spectrum-purple-1600-rgb:255,255,255;--spectrum-purple-1600:rgba(var(--spectrum-purple-1600-rgb));--spectrum-fuchsia-100-rgb:50,0,61;--spectrum-fuchsia-100:rgba(var(--spectrum-fuchsia-100-rgb));--spectrum-fuchsia-200-rgb:61,0,74;--spectrum-fuchsia-200:rgba(var(--spectrum-fuchsia-200-rgb));--spectrum-fuchsia-300-rgb:79,0,95;--spectrum-fuchsia-300:rgba(var(--spectrum-fuchsia-300-rgb));--spectrum-fuchsia-400-rgb:102,9,120;--spectrum-fuchsia-400:rgba(var(--spectrum-fuchsia-400-rgb));--spectrum-fuchsia-500-rgb:127,23,146;--spectrum-fuchsia-500:rgba(var(--spectrum-fuchsia-500-rgb));--spectrum-fuchsia-600-rgb:151,38,170;--spectrum-fuchsia-600:rgba(var(--spectrum-fuchsia-600-rgb));--spectrum-fuchsia-700-rgb:173,51,192;--spectrum-fuchsia-700:rgba(var(--spectrum-fuchsia-700-rgb));--spectrum-fuchsia-800-rgb:192,64,212;--spectrum-fuchsia-800:rgba(var(--spectrum-fuchsia-800-rgb));--spectrum-fuchsia-900-rgb:213,73,235;--spectrum-fuchsia-900:rgba(var(--spectrum-fuchsia-900-rgb));--spectrum-fuchsia-1000-rgb:232,91,253;--spectrum-fuchsia-1000:rgba(var(--spectrum-fuchsia-1000-rgb));--spectrum-fuchsia-1100-rgb:240,122,255;--spectrum-fuchsia-1100:rgba(var(--spectrum-fuchsia-1100-rgb));--spectrum-fuchsia-1200-rgb:245,159,255;--spectrum-fuchsia-1200:rgba(var(--spectrum-fuchsia-1200-rgb));--spectrum-fuchsia-1300-rgb:248,191,255;--spectrum-fuchsia-1300:rgba(var(--spectrum-fuchsia-1300-rgb));--spectrum-fuchsia-1400-rgb:251,219,255;--spectrum-fuchsia-1400:rgba(var(--spectrum-fuchsia-1400-rgb));--spectrum-fuchsia-1500-rgb:253,241,255;--spectrum-fuchsia-1500:rgba(var(--spectrum-fuchsia-1500-rgb));--spectrum-fuchsia-1600-rgb:255,255,255;--spectrum-fuchsia-1600:rgba(var(--spectrum-fuchsia-1600-rgb));--spectrum-magenta-100-rgb:59,0,22;--spectrum-magenta-100:rgba(var(--spectrum-magenta-100-rgb));--spectrum-magenta-200-rgb:74,0,27;--spectrum-magenta-200:rgba(var(--spectrum-magenta-200-rgb));--spectrum-magenta-300-rgb:93,0,34;--spectrum-magenta-300:rgba(var(--spectrum-magenta-300-rgb));--spectrum-magenta-400-rgb:123,0,45;--spectrum-magenta-400:rgba(var(--spectrum-magenta-400-rgb));--spectrum-magenta-500-rgb:152,7,60;--spectrum-magenta-500:rgba(var(--spectrum-magenta-500-rgb));--spectrum-magenta-600-rgb:181,19,76;--spectrum-magenta-600:rgba(var(--spectrum-magenta-600-rgb));--spectrum-magenta-700-rgb:207,31,92;--spectrum-magenta-700:rgba(var(--spectrum-magenta-700-rgb));--spectrum-magenta-800-rgb:231,41,105;--spectrum-magenta-800:rgba(var(--spectrum-magenta-800-rgb));--spectrum-magenta-900-rgb:255,51,119;--spectrum-magenta-900:rgba(var(--spectrum-magenta-900-rgb));--spectrum-magenta-1000-rgb:255,96,149;--spectrum-magenta-1000:rgba(var(--spectrum-magenta-1000-rgb));--spectrum-magenta-1100-rgb:255,128,171;--spectrum-magenta-1100:rgba(var(--spectrum-magenta-1100-rgb));--spectrum-magenta-1200-rgb:255,163,194;--spectrum-magenta-1200:rgba(var(--spectrum-magenta-1200-rgb));--spectrum-magenta-1300-rgb:255,193,214;--spectrum-magenta-1300:rgba(var(--spectrum-magenta-1300-rgb));--spectrum-magenta-1400-rgb:255,220,232;--spectrum-magenta-1400:rgba(var(--spectrum-magenta-1400-rgb));--spectrum-magenta-1500-rgb:255,241,246;--spectrum-magenta-1500:rgba(var(--spectrum-magenta-1500-rgb));--spectrum-magenta-1600-rgb:255,255,255;--spectrum-magenta-1600:rgba(var(--spectrum-magenta-1600-rgb));--spectrum-pink-100-rgb:58,0,37;--spectrum-pink-100:rgba(var(--spectrum-pink-100-rgb));--spectrum-pink-200-rgb:71,0,44;--spectrum-pink-200:rgba(var(--spectrum-pink-200-rgb));--spectrum-pink-300-rgb:90,0,57;--spectrum-pink-300:rgba(var(--spectrum-pink-300-rgb));--spectrum-pink-400-rgb:115,7,75;--spectrum-pink-400:rgba(var(--spectrum-pink-400-rgb));--spectrum-pink-500-rgb:143,18,97;--spectrum-pink-500:rgba(var(--spectrum-pink-500-rgb));--spectrum-pink-600-rgb:171,29,119;--spectrum-pink-600:rgba(var(--spectrum-pink-600-rgb));--spectrum-pink-700-rgb:196,39,138;--spectrum-pink-700:rgba(var(--spectrum-pink-700-rgb));--spectrum-pink-800-rgb:220,47,156;--spectrum-pink-800:rgba(var(--spectrum-pink-800-rgb));--spectrum-pink-900-rgb:236,67,175;--spectrum-pink-900:rgba(var(--spectrum-pink-900-rgb));--spectrum-pink-1000-rgb:251,90,196;--spectrum-pink-1000:rgba(var(--spectrum-pink-1000-rgb));--spectrum-pink-1100-rgb:255,122,210;--spectrum-pink-1100:rgba(var(--spectrum-pink-1100-rgb));--spectrum-pink-1200-rgb:255,159,223;--spectrum-pink-1200:rgba(var(--spectrum-pink-1200-rgb));--spectrum-pink-1300-rgb:255,191,234;--spectrum-pink-1300:rgba(var(--spectrum-pink-1300-rgb));--spectrum-pink-1400-rgb:255,219,243;--spectrum-pink-1400:rgba(var(--spectrum-pink-1400-rgb));--spectrum-pink-1500-rgb:255,241,250;--spectrum-pink-1500:rgba(var(--spectrum-pink-1500-rgb));--spectrum-pink-1600-rgb:255,255,255;--spectrum-pink-1600:rgba(var(--spectrum-pink-1600-rgb));--spectrum-turquoise-100-rgb:0,30,33;--spectrum-turquoise-100:rgba(var(--spectrum-turquoise-100-rgb));--spectrum-turquoise-200-rgb:0,37,41;--spectrum-turquoise-200:rgba(var(--spectrum-turquoise-200-rgb));--spectrum-turquoise-300-rgb:0,49,54;--spectrum-turquoise-300:rgba(var(--spectrum-turquoise-300-rgb));--spectrum-turquoise-400-rgb:0,66,72;--spectrum-turquoise-400:rgba(var(--spectrum-turquoise-400-rgb));--spectrum-turquoise-500-rgb:3,84,92;--spectrum-turquoise-500:rgba(var(--spectrum-turquoise-500-rgb));--spectrum-turquoise-600-rgb:5,103,112;--spectrum-turquoise-600:rgba(var(--spectrum-turquoise-600-rgb));--spectrum-turquoise-700-rgb:7,120,131;--spectrum-turquoise-700:rgba(var(--spectrum-turquoise-700-rgb));--spectrum-turquoise-800-rgb:9,135,147;--spectrum-turquoise-800:rgba(var(--spectrum-turquoise-800-rgb));--spectrum-turquoise-900-rgb:11,151,164;--spectrum-turquoise-900:rgba(var(--spectrum-turquoise-900-rgb));--spectrum-turquoise-1000-rgb:13,168,182;--spectrum-turquoise-1000:rgba(var(--spectrum-turquoise-1000-rgb));--spectrum-turquoise-1100-rgb:16,186,202;--spectrum-turquoise-1100:rgba(var(--spectrum-turquoise-1100-rgb));--spectrum-turquoise-1200-rgb:64,208,220;--spectrum-turquoise-1200:rgba(var(--spectrum-turquoise-1200-rgb));--spectrum-turquoise-1300-rgb:128,225,231;--spectrum-turquoise-1300:rgba(var(--spectrum-turquoise-1300-rgb));--spectrum-turquoise-1400-rgb:183,240,240;--spectrum-turquoise-1400:rgba(var(--spectrum-turquoise-1400-rgb));--spectrum-turquoise-1500-rgb:228,249,249;--spectrum-turquoise-1500:rgba(var(--spectrum-turquoise-1500-rgb));--spectrum-turquoise-1600-rgb:255,255,255;--spectrum-turquoise-1600:rgba(var(--spectrum-turquoise-1600-rgb));--spectrum-brown-100-rgb:35,24,8;--spectrum-brown-100:rgba(var(--spectrum-brown-100-rgb));--spectrum-brown-200-rgb:44,31,11;--spectrum-brown-200:rgba(var(--spectrum-brown-200-rgb));--spectrum-brown-300-rgb:58,40,14;--spectrum-brown-300:rgba(var(--spectrum-brown-300-rgb));--spectrum-brown-400-rgb:78,55,19;--spectrum-brown-400:rgba(var(--spectrum-brown-400-rgb));--spectrum-brown-500-rgb:98,71,30;--spectrum-brown-500:rgba(var(--spectrum-brown-500-rgb));--spectrum-brown-600-rgb:115,88,47;--spectrum-brown-600:rgba(var(--spectrum-brown-600-rgb));--spectrum-brown-700-rgb:132,104,61;--spectrum-brown-700:rgba(var(--spectrum-brown-700-rgb));--spectrum-brown-800-rgb:148,118,73;--spectrum-brown-800:rgba(var(--spectrum-brown-800-rgb));--spectrum-brown-900-rgb:163,132,84;--spectrum-brown-900:rgba(var(--spectrum-brown-900-rgb));--spectrum-brown-1000-rgb:181,147,98;--spectrum-brown-1000:rgba(var(--spectrum-brown-1000-rgb));--spectrum-brown-1100-rgb:199,163,112;--spectrum-brown-1100:rgba(var(--spectrum-brown-1100-rgb));--spectrum-brown-1200-rgb:222,185,130;--spectrum-brown-1200:rgba(var(--spectrum-brown-1200-rgb));--spectrum-brown-1300-rgb:232,207,169;--spectrum-brown-1300:rgba(var(--spectrum-brown-1300-rgb));--spectrum-brown-1400-rgb:242,227,206;--spectrum-brown-1400:rgba(var(--spectrum-brown-1400-rgb));--spectrum-brown-1500-rgb:250,244,236;--spectrum-brown-1500:rgba(var(--spectrum-brown-1500-rgb));--spectrum-brown-1600-rgb:255,255,255;--spectrum-brown-1600:rgba(var(--spectrum-brown-1600-rgb));--spectrum-silver-100-rgb:26,26,26;--spectrum-silver-100:rgba(var(--spectrum-silver-100-rgb));--spectrum-silver-200-rgb:33,33,33;--spectrum-silver-200:rgba(var(--spectrum-silver-200-rgb));--spectrum-silver-300-rgb:44,44,44;--spectrum-silver-300:rgba(var(--spectrum-silver-300-rgb));--spectrum-silver-400-rgb:59,59,59;--spectrum-silver-400:rgba(var(--spectrum-silver-400-rgb));--spectrum-silver-500-rgb:76,76,76;--spectrum-silver-500:rgba(var(--spectrum-silver-500-rgb));--spectrum-silver-600-rgb:92,92,92;--spectrum-silver-600:rgba(var(--spectrum-silver-600-rgb));--spectrum-silver-700-rgb:108,108,108;--spectrum-silver-700:rgba(var(--spectrum-silver-700-rgb));--spectrum-silver-800-rgb:123,123,123;--spectrum-silver-800:rgba(var(--spectrum-silver-800-rgb));--spectrum-silver-900-rgb:137,137,137;--spectrum-silver-900:rgba(var(--spectrum-silver-900-rgb));--spectrum-silver-1000-rgb:152,152,152;--spectrum-silver-1000:rgba(var(--spectrum-silver-1000-rgb));--spectrum-silver-1100-rgb:169,169,169;--spectrum-silver-1100:rgba(var(--spectrum-silver-1100-rgb));--spectrum-silver-1200-rgb:190,190,190;--spectrum-silver-1200:rgba(var(--spectrum-silver-1200-rgb));--spectrum-silver-1300-rgb:211,211,211;--spectrum-silver-1300:rgba(var(--spectrum-silver-1300-rgb));--spectrum-silver-1400-rgb:229,229,229;--spectrum-silver-1400:rgba(var(--spectrum-silver-1400-rgb));--spectrum-silver-1500-rgb:244,244,244;--spectrum-silver-1500:rgba(var(--spectrum-silver-1500-rgb));--spectrum-silver-1600-rgb:255,255,255;--spectrum-silver-1600:rgba(var(--spectrum-silver-1600-rgb));--spectrum-cinnamon-100-rgb:48,17,4;--spectrum-cinnamon-100:rgba(var(--spectrum-cinnamon-100-rgb));--spectrum-cinnamon-200-rgb:59,21,5;--spectrum-cinnamon-200:rgba(var(--spectrum-cinnamon-200-rgb));--spectrum-cinnamon-300-rgb:79,28,7;--spectrum-cinnamon-300:rgba(var(--spectrum-cinnamon-300-rgb));--spectrum-cinnamon-400-rgb:100,41,15;--spectrum-cinnamon-400:rgba(var(--spectrum-cinnamon-400-rgb));--spectrum-cinnamon-500-rgb:122,57,28;--spectrum-cinnamon-500:rgba(var(--spectrum-cinnamon-500-rgb));--spectrum-cinnamon-600-rgb:143,74,40;--spectrum-cinnamon-600:rgba(var(--spectrum-cinnamon-600-rgb));--spectrum-cinnamon-700-rgb:163,88,52;--spectrum-cinnamon-700:rgba(var(--spectrum-cinnamon-700-rgb));--spectrum-cinnamon-800-rgb:179,103,64;--spectrum-cinnamon-800:rgba(var(--spectrum-cinnamon-800-rgb));--spectrum-cinnamon-900-rgb:192,119,80;--spectrum-cinnamon-900:rgba(var(--spectrum-cinnamon-900-rgb));--spectrum-cinnamon-1000-rgb:206,136,99;--spectrum-cinnamon-1000:rgba(var(--spectrum-cinnamon-1000-rgb));--spectrum-cinnamon-1100-rgb:220,154,118;--spectrum-cinnamon-1100:rgba(var(--spectrum-cinnamon-1100-rgb));--spectrum-cinnamon-1200-rgb:232,179,149;--spectrum-cinnamon-1200:rgba(var(--spectrum-cinnamon-1200-rgb));--spectrum-cinnamon-1300-rgb:239,203,183;--spectrum-cinnamon-1300:rgba(var(--spectrum-cinnamon-1300-rgb));--spectrum-cinnamon-1400-rgb:246,225,214;--spectrum-cinnamon-1400:rgba(var(--spectrum-cinnamon-1400-rgb));--spectrum-cinnamon-1500-rgb:252,244,239;--spectrum-cinnamon-1500:rgba(var(--spectrum-cinnamon-1500-rgb));--spectrum-cinnamon-1600-rgb:255,255,255;--spectrum-cinnamon-1600:rgba(var(--spectrum-cinnamon-1600-rgb));--spectrum-icon-color-blue-primary-default:var(--spectrum-blue-800);--spectrum-icon-color-green-primary-default:var(--spectrum-green-800);--spectrum-icon-color-red-primary-default:var(--spectrum-red-700);--spectrum-icon-color-yellow-primary-default:var(--spectrum-yellow-1000);--spectrum-menu-item-background-color-default-rgb:255,255,255;--spectrum-menu-item-background-color-default-opacity:0;--spectrum-menu-item-background-color-default:rgba(var(--spectrum-menu-item-background-color-default-rgb),var(--spectrum-menu-item-background-color-default-opacity));--spectrum-menu-item-background-color-hover:var(--spectrum-transparent-white-200);--spectrum-menu-item-background-color-down:var(--spectrum-transparent-white-200);--spectrum-menu-item-background-color-key-focus:var(--spectrum-transparent-white-200);--spectrum-drop-zone-background-color-rgb:var(--spectrum-blue-900-rgb);--spectrum-dropindicator-color:var(--spectrum-blue-700);--spectrum-calendar-day-background-color-selected:rgba(var(--spectrum-blue-800-rgb),.15);--spectrum-calendar-day-background-color-hover:rgba(var(--spectrum-white-rgb),.07);--spectrum-calendar-day-today-background-color-selected-hover:rgba(var(--spectrum-blue-800-rgb),.25);--spectrum-calendar-day-background-color-selected-hover:rgba(var(--spectrum-blue-800-rgb),.25);--spectrum-calendar-day-background-color-down:var(--spectrum-transparent-white-200);--spectrum-calendar-day-background-color-cap-selected:rgba(var(--spectrum-blue-800-rgb),.25);--spectrum-calendar-day-background-color-key-focus:rgba(var(--spectrum-white-rgb),.07);--spectrum-calendar-day-border-color-key-focus:var(--spectrum-blue-700);--spectrum-badge-label-icon-color-primary:var(--spectrum-black);--spectrum-coach-indicator-ring-default-color:var(--spectrum-blue-700);--spectrum-coach-indicator-ring-dark-color:var(--spectrum-gray-900);--spectrum-coach-indicator-ring-light-color:var(--spectrum-gray-50);--spectrum-well-border-color:rgba(var(--spectrum-white-rgb),.05);--spectrum-steplist-current-marker-color-key-focus:var(--spectrum-blue-700);--spectrum-treeview-item-background-color-quiet-selected:rgba(var(--spectrum-gray-900-rgb),.07);--spectrum-treeview-item-background-color-selected:rgba(var(--spectrum-blue-800-rgb),.15);--spectrum-logic-button-and-background-color:var(--spectrum-blue-800);--spectrum-logic-button-and-border-color:var(--spectrum-blue-800);--spectrum-logic-button-and-background-color-hover:var(--spectrum-blue-1000);--spectrum-logic-button-and-border-color-hover:var(--spectrum-blue-1000);--spectrum-logic-button-or-background-color:var(--spectrum-magenta-700);--spectrum-logic-button-or-border-color:var(--spectrum-magenta-700);--spectrum-logic-button-or-background-color-hover:var(--spectrum-magenta-900);--spectrum-logic-button-or-border-color-hover:var(--spectrum-magenta-900);--spectrum-assetcard-border-color-selected:var(--spectrum-blue-800);--spectrum-assetcard-border-color-selected-hover:var(--spectrum-blue-800);--spectrum-assetcard-border-color-selected-down:var(--spectrum-blue-900);--spectrum-assetcard-selectionindicator-background-color-ordered:var(--spectrum-blue-800);--spectrum-assestcard-focus-indicator-color:var(--spectrum-blue-700);--spectrum-assetlist-item-background-color-selected-hover:rgba(var(--spectrum-blue-800-rgb),.25);--spectrum-assetlist-item-background-color-selected:rgba(var(--spectrum-blue-800-rgb),.15);--spectrum-assetlist-border-color-key-focus:var(--spectrum-blue-700)}:host,:root{color-scheme:dark}
`;
var theme_dark_core_tokens_css_default = e12;

// node_modules/@spectrum-web-components/theme/spectrum-two/theme-dark-core-tokens.js
Theme.registerThemeFragment("dark-spectrum-two", "color", theme_dark_core_tokens_css_default);

// node_modules/@spectrum-web-components/theme/src/spectrum-two/scale-medium-core-tokens.css.js
var e13 = i`
    :host,:root{--spectrum-checkbox-control-size-small:12px;--spectrum-checkbox-control-size-medium:14px;--spectrum-checkbox-control-size-large:16px;--spectrum-checkbox-control-size-extra-large:18px;--spectrum-checkbox-top-to-control-small:6px;--spectrum-checkbox-top-to-control-medium:9px;--spectrum-checkbox-top-to-control-large:12px;--spectrum-checkbox-top-to-control-extra-large:15px;--spectrum-switch-control-width-small:22px;--spectrum-switch-control-width-medium:26px;--spectrum-switch-control-width-large:30px;--spectrum-switch-control-width-extra-large:34px;--spectrum-switch-control-height-small:14px;--spectrum-switch-control-height-medium:16px;--spectrum-switch-control-height-large:18px;--spectrum-switch-control-height-extra-large:20px;--spectrum-switch-top-to-control-small:6px;--spectrum-switch-top-to-control-medium:9px;--spectrum-switch-top-to-control-large:12px;--spectrum-switch-top-to-control-extra-large:15px;--spectrum-radio-button-control-size-small:12px;--spectrum-radio-button-control-size-medium:14px;--spectrum-radio-button-control-size-large:16px;--spectrum-radio-button-control-size-extra-large:18px;--spectrum-radio-button-top-to-control-small:6px;--spectrum-radio-button-top-to-control-medium:9px;--spectrum-radio-button-top-to-control-large:12px;--spectrum-radio-button-top-to-control-extra-large:15px;--spectrum-field-label-text-to-asterisk-small:4px;--spectrum-field-label-text-to-asterisk-medium:4px;--spectrum-field-label-text-to-asterisk-large:5px;--spectrum-field-label-text-to-asterisk-extra-large:5px;--spectrum-field-label-top-to-asterisk-small:8px;--spectrum-field-label-top-to-asterisk-medium:12px;--spectrum-field-label-top-to-asterisk-large:15px;--spectrum-field-label-top-to-asterisk-extra-large:18px;--spectrum-field-label-to-component-quiet-small:-8px;--spectrum-field-label-to-component-quiet-medium:-8px;--spectrum-field-label-to-component-quiet-large:-12px;--spectrum-field-label-to-component-quiet-extra-large:-15px;--spectrum-help-text-top-to-workflow-icon-small:var(--spectrum-component-top-to-workflow-icon-75);--spectrum-help-text-top-to-workflow-icon-medium:var(--spectrum-component-top-to-workflow-icon-100);--spectrum-help-text-top-to-workflow-icon-large:var(--spectrum-component-top-to-workflow-icon-200);--spectrum-help-text-top-to-workflow-icon-extra-large:var(--spectrum-component-top-to-workflow-icon-300);--spectrum-status-light-dot-size-medium:8px;--spectrum-status-light-dot-size-large:10px;--spectrum-status-light-dot-size-extra-large:10px;--spectrum-status-light-top-to-dot-small:8px;--spectrum-status-light-top-to-dot-medium:12px;--spectrum-status-light-top-to-dot-large:15px;--spectrum-status-light-top-to-dot-extra-large:19px;--spectrum-action-button-edge-to-hold-icon-medium:4px;--spectrum-action-button-edge-to-hold-icon-large:5px;--spectrum-action-button-edge-to-hold-icon-extra-large:6px;--spectrum-tooltip-tip-width:10px;--spectrum-tooltip-tip-height:5px;--spectrum-tooltip-maximum-width:160px;--spectrum-progress-circle-size-small:16px;--spectrum-progress-circle-size-medium:32px;--spectrum-progress-circle-size-large:64px;--spectrum-progress-circle-thickness-small:2px;--spectrum-progress-circle-thickness-medium:3px;--spectrum-progress-circle-thickness-large:4px;--spectrum-toast-height:52px;--spectrum-toast-maximum-width:336px;--spectrum-toast-top-to-workflow-icon:18px;--spectrum-toast-top-to-text:18px;--spectrum-toast-bottom-to-text:20px;--spectrum-action-bar-height:48px;--spectrum-action-bar-top-to-item-counter:14px;--spectrum-swatch-size-extra-small:16px;--spectrum-swatch-size-small:24px;--spectrum-swatch-size-medium:32px;--spectrum-swatch-size-large:40px;--spectrum-progress-bar-thickness-small:4px;--spectrum-progress-bar-thickness-medium:6px;--spectrum-progress-bar-thickness-large:8px;--spectrum-progress-bar-thickness-extra-large:10px;--spectrum-meter-width:192px;--spectrum-meter-thickness-small:4px;--spectrum-meter-thickness-large:6px;--spectrum-tag-top-to-avatar-small:4px;--spectrum-tag-top-to-avatar-medium:6px;--spectrum-tag-top-to-avatar-large:9px;--spectrum-tag-top-to-cross-icon-small:8px;--spectrum-tag-top-to-cross-icon-medium:12px;--spectrum-tag-top-to-cross-icon-large:15px;--spectrum-popover-top-to-content-area:4px;--spectrum-menu-item-edge-to-content-not-selected-small:28px;--spectrum-menu-item-edge-to-content-not-selected-medium:32px;--spectrum-menu-item-edge-to-content-not-selected-large:38px;--spectrum-menu-item-edge-to-content-not-selected-extra-large:45px;--spectrum-menu-item-top-to-disclosure-icon-small:7px;--spectrum-menu-item-top-to-disclosure-icon-medium:11px;--spectrum-menu-item-top-to-disclosure-icon-large:14px;--spectrum-menu-item-top-to-disclosure-icon-extra-large:17px;--spectrum-menu-item-top-to-selected-icon-small:7px;--spectrum-menu-item-top-to-selected-icon-medium:11px;--spectrum-menu-item-top-to-selected-icon-large:14px;--spectrum-menu-item-top-to-selected-icon-extra-large:17px;--spectrum-slider-control-height-small:14px;--spectrum-slider-control-height-medium:16px;--spectrum-slider-control-height-large:18px;--spectrum-slider-control-height-extra-large:20px;--spectrum-slider-handle-size-small:14px;--spectrum-slider-handle-size-medium:16px;--spectrum-slider-handle-size-large:18px;--spectrum-slider-handle-size-extra-large:20px;--spectrum-slider-handle-border-width-down-small:5px;--spectrum-slider-handle-border-width-down-medium:6px;--spectrum-slider-handle-border-width-down-large:7px;--spectrum-slider-handle-border-width-down-extra-large:8px;--spectrum-slider-bottom-to-handle-small:5px;--spectrum-slider-bottom-to-handle-medium:8px;--spectrum-slider-bottom-to-handle-large:11px;--spectrum-slider-bottom-to-handle-extra-large:14px;--spectrum-slider-control-to-field-label-small:5px;--spectrum-slider-control-to-field-label-medium:8px;--spectrum-slider-control-to-field-label-large:11px;--spectrum-slider-control-to-field-label-extra-large:14px;--spectrum-picker-visual-to-disclosure-icon-small:7px;--spectrum-picker-visual-to-disclosure-icon-medium:8px;--spectrum-picker-visual-to-disclosure-icon-large:9px;--spectrum-picker-visual-to-disclosure-icon-extra-large:10px;--spectrum-text-area-minimum-width:112px;--spectrum-text-area-minimum-height:56px;--spectrum-combo-box-visual-to-field-button-small:7px;--spectrum-combo-box-visual-to-field-button-medium:8px;--spectrum-combo-box-visual-to-field-button-large:9px;--spectrum-combo-box-visual-to-field-button-extra-large:10px;--spectrum-thumbnail-size-50:16px;--spectrum-thumbnail-size-75:18px;--spectrum-thumbnail-size-100:20px;--spectrum-thumbnail-size-200:22px;--spectrum-thumbnail-size-300:26px;--spectrum-thumbnail-size-400:28px;--spectrum-thumbnail-size-500:32px;--spectrum-thumbnail-size-600:36px;--spectrum-thumbnail-size-700:40px;--spectrum-thumbnail-size-800:44px;--spectrum-thumbnail-size-900:50px;--spectrum-thumbnail-size-1000:56px;--spectrum-alert-dialog-title-size:var(--spectrum-heading-size-s);--spectrum-alert-dialog-description-size:var(--spectrum-body-size-s);--spectrum-opacity-checkerboard-square-size:var(--spectrum-opacity-checkerboard-square-size-medium);--spectrum-opacity-checkerboard-square-size-medium:8px;--spectrum-contextual-help-title-size:var(--spectrum-heading-size-xs);--spectrum-contextual-help-body-size:var(--spectrum-body-size-s);--spectrum-breadcrumbs-height-multiline:72px;--spectrum-breadcrumbs-top-to-text:13px;--spectrum-breadcrumbs-top-to-text-compact:11px;--spectrum-breadcrumbs-top-to-text-multiline:12px;--spectrum-breadcrumbs-bottom-to-text:15px;--spectrum-breadcrumbs-bottom-to-text-compact:12px;--spectrum-breadcrumbs-bottom-to-text-multiline:9px;--spectrum-breadcrumbs-start-edge-to-text:8px;--spectrum-breadcrumbs-top-text-to-bottom-text:9px;--spectrum-breadcrumbs-top-to-separator-icon:19px;--spectrum-breadcrumbs-top-to-separator-icon-compact:15px;--spectrum-breadcrumbs-top-to-separator-icon-multiline:15px;--spectrum-breadcrumbs-separator-icon-to-bottom-text-multiline:11px;--spectrum-breadcrumbs-top-to-truncated-menu:8px;--spectrum-breadcrumbs-top-to-truncated-menu-compact:4px;--spectrum-avatar-size-50:16px;--spectrum-avatar-size-75:18px;--spectrum-avatar-size-100:20px;--spectrum-avatar-size-200:22px;--spectrum-avatar-size-300:26px;--spectrum-avatar-size-400:28px;--spectrum-avatar-size-500:32px;--spectrum-avatar-size-600:36px;--spectrum-avatar-size-700:40px;--spectrum-alert-banner-minimum-height:56px;--spectrum-alert-banner-width:832px;--spectrum-alert-banner-top-to-workflow-icon:19px;--spectrum-alert-banner-top-to-text:18px;--spectrum-alert-banner-bottom-to-text:20px;--spectrum-rating-indicator-width:18px;--spectrum-rating-indicator-to-icon:4px;--spectrum-color-area-width:192px;--spectrum-color-area-minimum-width:64px;--spectrum-color-area-height:192px;--spectrum-color-area-minimum-height:64px;--spectrum-color-wheel-width:192px;--spectrum-color-wheel-minimum-width:175px;--spectrum-color-slider-length:192px;--spectrum-color-slider-minimum-length:80px;--spectrum-illustrated-message-title-size:var(--spectrum-heading-size-m);--spectrum-illustrated-message-cjk-title-size:var(--spectrum-heading-cjk-size-m);--spectrum-illustrated-message-body-size:var(--spectrum-body-size-s);--spectrum-coach-mark-width:296px;--spectrum-coach-mark-minimum-width:296px;--spectrum-coach-mark-maximum-width:380px;--spectrum-coach-mark-edge-to-content:var(--spectrum-spacing-400);--spectrum-coach-mark-pagination-text-to-bottom-edge:33px;--spectrum-coach-mark-media-height:222px;--spectrum-coach-mark-media-minimum-height:166px;--spectrum-coach-mark-title-size:var(--spectrum-heading-size-xs);--spectrum-coach-mark-body-size:var(--spectrum-body-size-s);--spectrum-coach-mark-pagination-body-size:var(--spectrum-body-size-s);--spectrum-accordion-top-to-text-regular-small:5px;--spectrum-accordion-small-top-to-text-spacious:9px;--spectrum-accordion-top-to-text-regular-medium:8px;--spectrum-accordion-top-to-text-spacious-medium:12px;--spectrum-accordion-top-to-text-compact-large:4px;--spectrum-accordion-top-to-text-regular-large:9px;--spectrum-accordion-top-to-text-spacious-large:12px;--spectrum-accordion-top-to-text-compact-extra-large:5px;--spectrum-accordion-top-to-text-regular-extra-large:9px;--spectrum-accordion-top-to-text-spacious-extra-large:13px;--spectrum-accordion-bottom-to-text-compact-small:2px;--spectrum-accordion-bottom-to-text-regular-small:7px;--spectrum-accordion-bottom-to-text-spacious-small:11px;--spectrum-accordion-bottom-to-text-compact-medium:5px;--spectrum-accordion-bottom-to-text-regular-medium:9px;--spectrum-accordion-bottom-to-text-spacious-medium:13px;--spectrum-accordion-bottom-to-text-compact-large:8px;--spectrum-accordion-bottom-to-text-regular-large:11px;--spectrum-accordion-bottom-to-text-spacious-large:16px;--spectrum-accordion-bottom-to-text-compact-extra-large:8px;--spectrum-accordion-bottom-to-text-regular-extra-large:12px;--spectrum-accordion-bottom-to-text-spacious-extra-large:16px;--spectrum-accordion-minimum-width:200px;--spectrum-accordion-content-area-top-to-content:8px;--spectrum-accordion-content-area-bottom-to-content:16px;--spectrum-color-handle-size:16px;--spectrum-color-handle-size-key-focus:32px;--spectrum-table-column-header-row-top-to-text-small:8px;--spectrum-table-column-header-row-top-to-text-medium:7px;--spectrum-table-column-header-row-top-to-text-large:10px;--spectrum-table-column-header-row-top-to-text-extra-large:13px;--spectrum-table-column-header-row-bottom-to-text-small:9px;--spectrum-table-column-header-row-bottom-to-text-medium:8px;--spectrum-table-column-header-row-bottom-to-text-large:10px;--spectrum-table-column-header-row-bottom-to-text-extra-large:13px;--spectrum-table-row-height-small-regular:32px;--spectrum-table-row-height-medium-regular:40px;--spectrum-table-row-height-large-regular:48px;--spectrum-table-row-height-extra-large-regular:56px;--spectrum-table-row-height-small-spacious:40px;--spectrum-table-row-height-medium-spacious:48px;--spectrum-table-row-height-large-spacious:56px;--spectrum-table-row-height-extra-large-spacious:64px;--spectrum-table-row-top-to-text-small-regular:8px;--spectrum-table-row-top-to-text-medium-regular:11px;--spectrum-table-row-top-to-text-large-regular:14px;--spectrum-table-row-top-to-text-extra-large-regular:17px;--spectrum-table-row-bottom-to-text-small-regular:9px;--spectrum-table-row-bottom-to-text-medium-regular:12px;--spectrum-table-row-bottom-to-text-large-regular:14px;--spectrum-table-row-bottom-to-text-extra-large-regular:17px;--spectrum-table-row-top-to-text-small-spacious:12px;--spectrum-table-row-top-to-text-medium-spacious:15px;--spectrum-table-row-top-to-text-large-spacious:18px;--spectrum-table-row-top-to-text-extra-large-spacious:21px;--spectrum-table-row-bottom-to-text-small-spacious:13px;--spectrum-table-row-bottom-to-text-medium-spacious:16px;--spectrum-table-row-bottom-to-text-large-spacious:18px;--spectrum-table-row-bottom-to-text-extra-large-spacious:21px;--spectrum-table-checkbox-to-text:24px;--spectrum-table-header-row-checkbox-to-top-small:10px;--spectrum-table-header-row-checkbox-to-top-medium:9px;--spectrum-table-header-row-checkbox-to-top-large:12px;--spectrum-table-header-row-checkbox-to-top-extra-large:15px;--spectrum-table-row-checkbox-to-top-small-compact:6px;--spectrum-table-row-checkbox-to-top-small-regular:10px;--spectrum-table-row-checkbox-to-top-small-spacious:14px;--spectrum-table-row-checkbox-to-top-medium-compact:9px;--spectrum-table-row-checkbox-to-top-medium-regular:13px;--spectrum-table-row-checkbox-to-top-medium-spacious:17px;--spectrum-table-row-checkbox-to-top-large-compact:12px;--spectrum-table-row-checkbox-to-top-large-regular:16px;--spectrum-table-row-checkbox-to-top-large-spacious:20px;--spectrum-table-row-checkbox-to-top-extra-large-compact:15px;--spectrum-table-row-checkbox-to-top-extra-large-regular:19px;--spectrum-table-row-checkbox-to-top-extra-large-spacious:23px;--spectrum-table-section-header-row-height-small:24px;--spectrum-table-section-header-row-height-medium:32px;--spectrum-table-section-header-row-height-large:40px;--spectrum-table-section-header-row-height-extra-large:48px;--spectrum-table-thumbnail-to-top-minimum-small-compact:4px;--spectrum-table-thumbnail-to-top-minimum-medium-compact:5px;--spectrum-table-thumbnail-to-top-minimum-large-compact:7px;--spectrum-table-thumbnail-to-top-minimum-extra-large-compact:8px;--spectrum-table-thumbnail-to-top-minimum-small-regular:5px;--spectrum-table-thumbnail-to-top-minimum-medium-regular:7px;--spectrum-table-thumbnail-to-top-minimum-large-regular:8px;--spectrum-table-thumbnail-to-top-minimum-extra-large-regular:8px;--spectrum-table-thumbnail-to-top-minimum-small-spacious:7px;--spectrum-table-thumbnail-to-top-minimum-medium-spacious:8px;--spectrum-table-thumbnail-to-top-minimum-large-spacious:8px;--spectrum-table-thumbnail-to-top-minimum-extra-large-spacious:10px;--spectrum-tab-item-to-tab-item-horizontal-small:21px;--spectrum-tab-item-to-tab-item-horizontal-medium:24px;--spectrum-tab-item-to-tab-item-horizontal-large:27px;--spectrum-tab-item-to-tab-item-horizontal-extra-large:30px;--spectrum-tab-item-to-tab-item-vertical-small:4px;--spectrum-tab-item-to-tab-item-vertical-medium:4px;--spectrum-tab-item-to-tab-item-vertical-large:5px;--spectrum-tab-item-to-tab-item-vertical-extra-large:5px;--spectrum-tab-item-start-to-edge-small:12px;--spectrum-tab-item-start-to-edge-medium:12px;--spectrum-tab-item-start-to-edge-large:13px;--spectrum-tab-item-start-to-edge-extra-large:13px;--spectrum-tab-item-top-to-text-small:11px;--spectrum-tab-item-bottom-to-text-small:12px;--spectrum-tab-item-top-to-text-medium:14px;--spectrum-tab-item-bottom-to-text-medium:14px;--spectrum-tab-item-top-to-text-large:16px;--spectrum-tab-item-bottom-to-text-large:18px;--spectrum-tab-item-top-to-text-extra-large:19px;--spectrum-tab-item-bottom-to-text-extra-large:20px;--spectrum-tab-item-top-to-text-compact-small:4px;--spectrum-tab-item-bottom-to-text-compact-small:5px;--spectrum-tab-item-top-to-text-compact-medium:6px;--spectrum-tab-item-bottom-to-text-compact-medium:8px;--spectrum-tab-item-top-to-text-compact-large:10px;--spectrum-tab-item-bottom-to-text-compact-large:12px;--spectrum-tab-item-top-to-text-compact-extra-large:12px;--spectrum-tab-item-bottom-to-text-compact-extra-large:13px;--spectrum-tab-item-top-to-workflow-icon-small:13px;--spectrum-tab-item-top-to-workflow-icon-medium:15px;--spectrum-tab-item-top-to-workflow-icon-large:17px;--spectrum-tab-item-top-to-workflow-icon-extra-large:19px;--spectrum-tab-item-top-to-workflow-icon-compact-small:3px;--spectrum-tab-item-top-to-workflow-icon-compact-medium:7px;--spectrum-tab-item-top-to-workflow-icon-compact-large:9px;--spectrum-tab-item-top-to-workflow-icon-compact-extra-large:11px;--spectrum-tab-item-focus-indicator-gap-small:7px;--spectrum-tab-item-focus-indicator-gap-medium:8px;--spectrum-tab-item-focus-indicator-gap-large:9px;--spectrum-tab-item-focus-indicator-gap-extra-large:10px;--spectrum-side-navigation-width:192px;--spectrum-side-navigation-minimum-width:160px;--spectrum-side-navigation-maximum-width:240px;--spectrum-side-navigation-second-level-edge-to-text:24px;--spectrum-side-navigation-third-level-edge-to-text:36px;--spectrum-side-navigation-with-icon-second-level-edge-to-text:50px;--spectrum-side-navigation-with-icon-third-level-edge-to-text:62px;--spectrum-side-navigation-item-to-item:4px;--spectrum-side-navigation-item-to-header:24px;--spectrum-side-navigation-bottom-to-text:8px;--spectrum-tray-top-to-content-area:4px;--spectrum-arrow-icon-size-75:10px;--spectrum-arrow-icon-size-100:10px;--spectrum-arrow-icon-size-200:12px;--spectrum-arrow-icon-size-300:14px;--spectrum-arrow-icon-size-400:16px;--spectrum-arrow-icon-size-500:18px;--spectrum-arrow-icon-size-600:20px;--spectrum-asterisk-icon-size-100:8px;--spectrum-asterisk-icon-size-200:10px;--spectrum-asterisk-icon-size-300:10px;--spectrum-checkmark-icon-size-50:10px;--spectrum-checkmark-icon-size-75:10px;--spectrum-checkmark-icon-size-100:10px;--spectrum-checkmark-icon-size-200:12px;--spectrum-checkmark-icon-size-300:14px;--spectrum-checkmark-icon-size-400:16px;--spectrum-checkmark-icon-size-500:16px;--spectrum-checkmark-icon-size-600:18px;--spectrum-chevron-icon-size-50:6px;--spectrum-chevron-icon-size-75:10px;--spectrum-chevron-icon-size-100:10px;--spectrum-chevron-icon-size-200:12px;--spectrum-chevron-icon-size-300:14px;--spectrum-chevron-icon-size-400:16px;--spectrum-chevron-icon-size-500:16px;--spectrum-chevron-icon-size-600:18px;--spectrum-cross-icon-size-75:8px;--spectrum-cross-icon-size-100:8px;--spectrum-cross-icon-size-200:10px;--spectrum-cross-icon-size-300:12px;--spectrum-cross-icon-size-400:12px;--spectrum-cross-icon-size-500:14px;--spectrum-cross-icon-size-600:16px;--spectrum-dash-icon-size-50:8px;--spectrum-dash-icon-size-75:8px;--spectrum-dash-icon-size-100:10px;--spectrum-dash-icon-size-200:12px;--spectrum-dash-icon-size-300:12px;--spectrum-dash-icon-size-400:14px;--spectrum-dash-icon-size-500:16px;--spectrum-dash-icon-size-600:18px;--spectrum-side-navigation-header-to-item:8px;--spectrum-switch-handle-size-small:6px;--spectrum-switch-handle-selected-size-small:8px;--spectrum-switch-handle-selected-size-medium:10px;--spectrum-switch-handle-selected-size-large:12px;--spectrum-switch-handle-selected-size-extra-large:14px;--spectrum-switch-handle-size-medium:8px;--spectrum-switch-handle-size-large:10px;--spectrum-switch-handle-size-extra-large:12px;--spectrum-tag-label-to-clear-icon-small:8px;--spectrum-tag-label-to-clear-icon-medium:12px;--spectrum-tag-label-to-clear-icon-large:15px;--spectrum-tag-edge-to-clear-icon-small:8px;--spectrum-tag-edge-to-clear-icon-medium:12px;--spectrum-tag-edge-to-clear-icon-large:15px;--spectrum-opacity-checkerboard-square-size-small:4px;--spectrum-drop-shadow-y:1px;--spectrum-drop-shadow-blur:4px;--spectrum-workflow-icon-size-50:14px;--spectrum-workflow-icon-size-75:16px;--spectrum-workflow-icon-size-100:20px;--spectrum-workflow-icon-size-200:22px;--spectrum-workflow-icon-size-300:26px;--spectrum-text-to-visual-50:5px;--spectrum-text-to-visual-75:5px;--spectrum-text-to-visual-100:6px;--spectrum-text-to-visual-200:7px;--spectrum-text-to-visual-300:8px;--spectrum-text-to-control-75:9px;--spectrum-text-to-control-100:10px;--spectrum-text-to-control-200:11px;--spectrum-text-to-control-300:13px;--spectrum-component-height-50:20px;--spectrum-component-height-75:24px;--spectrum-component-height-100:32px;--spectrum-component-height-200:40px;--spectrum-component-height-300:48px;--spectrum-component-height-400:56px;--spectrum-component-height-500:64px;--spectrum-component-pill-edge-to-visual-75:10px;--spectrum-component-pill-edge-to-visual-100:14px;--spectrum-component-pill-edge-to-visual-200:18px;--spectrum-component-pill-edge-to-visual-300:21px;--spectrum-component-pill-edge-to-visual-only-75:4px;--spectrum-component-pill-edge-to-visual-only-100:7px;--spectrum-component-pill-edge-to-visual-only-200:10px;--spectrum-component-pill-edge-to-visual-only-300:13px;--spectrum-component-pill-edge-to-text-75:12px;--spectrum-component-pill-edge-to-text-100:16px;--spectrum-component-pill-edge-to-text-200:20px;--spectrum-component-pill-edge-to-text-300:24px;--spectrum-component-edge-to-visual-50:6px;--spectrum-component-edge-to-visual-75:7px;--spectrum-component-edge-to-visual-100:10px;--spectrum-component-edge-to-visual-200:13px;--spectrum-component-edge-to-visual-300:15px;--spectrum-component-edge-to-visual-only-50:3px;--spectrum-component-edge-to-visual-only-75:4px;--spectrum-component-edge-to-visual-only-100:6px;--spectrum-component-edge-to-visual-only-200:9px;--spectrum-component-edge-to-visual-only-300:11px;--spectrum-component-edge-to-text-50:8px;--spectrum-component-edge-to-text-75:9px;--spectrum-component-edge-to-text-100:12px;--spectrum-component-edge-to-text-200:15px;--spectrum-component-edge-to-text-300:18px;--spectrum-component-top-to-workflow-icon-50:3px;--spectrum-component-top-to-workflow-icon-75:4px;--spectrum-component-top-to-workflow-icon-100:6px;--spectrum-component-top-to-workflow-icon-200:9px;--spectrum-component-top-to-workflow-icon-300:11px;--spectrum-component-top-to-text-50:3px;--spectrum-component-top-to-text-75:4px;--spectrum-component-top-to-text-100:6px;--spectrum-component-top-to-text-200:9px;--spectrum-component-top-to-text-300:12px;--spectrum-component-bottom-to-text-50:3px;--spectrum-component-bottom-to-text-75:5px;--spectrum-component-bottom-to-text-100:9px;--spectrum-component-bottom-to-text-200:11px;--spectrum-component-bottom-to-text-300:14px;--spectrum-component-to-menu-small:6px;--spectrum-component-to-menu-medium:6px;--spectrum-component-to-menu-large:7px;--spectrum-component-to-menu-extra-large:8px;--spectrum-field-edge-to-disclosure-icon-75:7px;--spectrum-field-edge-to-disclosure-icon-100:11px;--spectrum-field-edge-to-disclosure-icon-200:14px;--spectrum-field-edge-to-disclosure-icon-300:17px;--spectrum-field-end-edge-to-disclosure-icon-75:7px;--spectrum-field-end-edge-to-disclosure-icon-100:11px;--spectrum-field-end-edge-to-disclosure-icon-200:14px;--spectrum-field-end-edge-to-disclosure-icon-300:17px;--spectrum-field-top-to-disclosure-icon-75:7px;--spectrum-field-top-to-disclosure-icon-100:11px;--spectrum-field-top-to-disclosure-icon-200:14px;--spectrum-field-top-to-disclosure-icon-300:17px;--spectrum-field-top-to-alert-icon-small:4px;--spectrum-field-top-to-alert-icon-medium:7px;--spectrum-field-top-to-alert-icon-large:10px;--spectrum-field-top-to-alert-icon-extra-large:13px;--spectrum-field-top-to-validation-icon-small:7px;--spectrum-field-top-to-validation-icon-medium:11px;--spectrum-field-top-to-validation-icon-large:14px;--spectrum-field-top-to-validation-icon-extra-large:17px;--spectrum-field-top-to-progress-circle-small:4px;--spectrum-field-top-to-progress-circle-medium:8px;--spectrum-field-top-to-progress-circle-large:12px;--spectrum-field-top-to-progress-circle-extra-large:16px;--spectrum-field-edge-to-alert-icon-small:9px;--spectrum-field-edge-to-alert-icon-medium:12px;--spectrum-field-edge-to-alert-icon-large:15px;--spectrum-field-edge-to-alert-icon-extra-large:18px;--spectrum-field-edge-to-validation-icon-small:9px;--spectrum-field-edge-to-validation-icon-medium:12px;--spectrum-field-edge-to-validation-icon-large:15px;--spectrum-field-edge-to-validation-icon-extra-large:18px;--spectrum-field-text-to-alert-icon-small:8px;--spectrum-field-text-to-alert-icon-medium:12px;--spectrum-field-text-to-alert-icon-large:15px;--spectrum-field-text-to-alert-icon-extra-large:18px;--spectrum-field-text-to-validation-icon-small:8px;--spectrum-field-text-to-validation-icon-medium:12px;--spectrum-field-text-to-validation-icon-large:15px;--spectrum-field-text-to-validation-icon-extra-large:18px;--spectrum-field-width:var(--spectrum-field-width-small);--spectrum-field-width-small:192px;--spectrum-character-count-to-field-quiet-small:-3px;--spectrum-character-count-to-field-quiet-medium:-3px;--spectrum-character-count-to-field-quiet-large:-3px;--spectrum-character-count-to-field-quiet-extra-large:-4px;--spectrum-side-label-character-count-to-field:12px;--spectrum-disclosure-indicator-top-to-disclosure-icon-small:7px;--spectrum-disclosure-indicator-top-to-disclosure-icon-medium:11px;--spectrum-disclosure-indicator-top-to-disclosure-icon-large:14px;--spectrum-disclosure-indicator-top-to-disclosure-icon-extra-large:17px;--spectrum-navigational-indicator-top-to-back-icon-small:6px;--spectrum-navigational-indicator-top-to-back-icon-medium:9px;--spectrum-navigational-indicator-top-to-back-icon-large:12px;--spectrum-navigational-indicator-top-to-back-icon-extra-large:15px;--spectrum-color-control-track-width:24px;--spectrum-corner-triangle-icon-size-75:5px;--spectrum-corner-triangle-icon-size-100:5px;--spectrum-corner-triangle-icon-size-200:6px;--spectrum-corner-triangle-icon-size-300:7px;--spectrum-field-width-medium:208px;--spectrum-field-width-large:224px;--spectrum-field-width-extra-large:240px;--spectrum-font-size-50:11px;--spectrum-font-size-75:12px;--spectrum-font-size-100:14px;--spectrum-font-size-200:16px;--spectrum-font-size-300:18px;--spectrum-font-size-400:20px;--spectrum-font-size-500:22px;--spectrum-font-size-600:25px;--spectrum-font-size-700:28px;--spectrum-font-size-800:32px;--spectrum-font-size-900:36px;--spectrum-font-size-1000:40px;--spectrum-font-size-1100:45px;--spectrum-font-size-1200:50px;--spectrum-font-size-1300:60px;--spectrum-edge-to-visual-only-75:4px;--spectrum-edge-to-visual-only-100:7px;--spectrum-edge-to-visual-only-200:10px;--spectrum-edge-to-visual-only-300:13px;--spectrum-slider-tick-mark-height:10px;--spectrum-slider-ramp-track-height:16px;--spectrum-colorwheel-path:"M 95 95 m -95 0 a 95 95 0 1 0 190 0 a 95 95 0 1 0 -190 0.2 M 95 95 m -73 0 a 73 73 0 1 0 146 0 a 73 73 0 1 0 -146 0";--spectrum-colorwheel-path-borders:"M 96 96 m -96 0 a 96 96 0 1 0 192 0 a 96 96 0 1 0 -192 0.2 M 96 96 m -72 0 a 72 72 0 1 0 144 0 a 72 72 0 1 0 -144 0";--spectrum-colorwheel-colorarea-container-size:144px;--spectrum-colorloupe-checkerboard-fill:url(#checkerboard-primary);--spectrum-menu-item-selectable-edge-to-text-not-selected-small:28px;--spectrum-menu-item-selectable-edge-to-text-not-selected-medium:32px;--spectrum-menu-item-selectable-edge-to-text-not-selected-large:38px;--spectrum-menu-item-selectable-edge-to-text-not-selected-extra-large:45px;--spectrum-menu-item-checkmark-height-small:10px;--spectrum-menu-item-checkmark-height-medium:10px;--spectrum-menu-item-checkmark-height-large:12px;--spectrum-menu-item-checkmark-height-extra-large:14px;--spectrum-menu-item-checkmark-width-small:10px;--spectrum-menu-item-checkmark-width-medium:10px;--spectrum-menu-item-checkmark-width-large:12px;--spectrum-menu-item-checkmark-width-extra-large:14px;--spectrum-rating-icon-spacing:var(--spectrum-spacing-75);--spectrum-button-top-to-text-small:5px;--spectrum-button-bottom-to-text-small:4px;--spectrum-button-top-to-text-medium:7px;--spectrum-button-bottom-to-text-medium:8px;--spectrum-button-top-to-text-large:10px;--spectrum-button-bottom-to-text-large:10px;--spectrum-button-top-to-text-extra-large:13px;--spectrum-button-bottom-to-text-extra-large:13px;--spectrum-alert-banner-close-button-spacing:var(--spectrum-spacing-100);--spectrum-alert-banner-edge-to-divider:var(--spectrum-spacing-100);--spectrum-alert-banner-edge-to-button:var(--spectrum-spacing-100);--spectrum-alert-banner-text-to-button-vertical:var(--spectrum-spacing-100);--spectrum-alert-dialog-padding:var(--spectrum-spacing-500);--spectrum-alert-dialog-description-to-buttons:var(--spectrum-spacing-700);--spectrum-coach-indicator-gap:6px;--spectrum-coach-indicator-ring-diameter:var(--spectrum-spacing-300);--spectrum-coach-indicator-quiet-ring-diameter:var(--spectrum-spacing-100);--spectrum-coachmark-buttongroup-display:flex;--spectrum-coachmark-buttongroup-mobile-display:none;--spectrum-coachmark-menu-display:inline-flex;--spectrum-coachmark-menu-mobile-display:none;--spectrum-well-padding:var(--spectrum-spacing-300);--spectrum-well-margin-top:var(--spectrum-spacing-75);--spectrum-well-min-width:240px;--spectrum-well-border-radius:var(--spectrum-spacing-75);--spectrum-icon-chevron-size-50:6px;--spectrum-workflow-icon-size-xxl:32px;--spectrum-workflow-icon-size-xxs:12px;--spectrum-treeview-item-indentation-medium:var(--spectrum-spacing-300);--spectrum-treeview-item-indentation-small:var(--spectrum-spacing-200);--spectrum-treeview-item-indentation-large:20px;--spectrum-treeview-item-indentation-extra-large:var(--spectrum-spacing-400);--spectrum-treeview-indicator-inset-block-start:5px;--spectrum-treeview-item-min-block-size-thumbnail-offset-medium:0px;--spectrum-dialog-confirm-entry-animation-distance:20px;--spectrum-dialog-confirm-hero-height:128px;--spectrum-dialog-confirm-border-radius:4px;--spectrum-dialog-confirm-title-text-size:18px;--spectrum-dialog-confirm-description-text-size:14px;--spectrum-dialog-confirm-padding-grid:40px;--spectrum-datepicker-initial-width:128px;--spectrum-datepicker-generic-padding:var(--spectrum-spacing-200);--spectrum-datepicker-dash-line-height:24px;--spectrum-datepicker-width-quiet-first:72px;--spectrum-datepicker-width-quiet-second:16px;--spectrum-datepicker-datetime-width-first:36px;--spectrum-datepicker-invalid-icon-to-button:8px;--spectrum-datepicker-invalid-icon-to-button-quiet:7px;--spectrum-datepicker-input-datetime-width:var(--spectrum-spacing-400);--spectrum-pagination-textfield-width:var(--spectrum-spacing-700);--spectrum-pagination-item-inline-spacing:5px;--spectrum-dial-border-radius:16px;--spectrum-dial-handle-position:8px;--spectrum-dial-handle-block-margin:16px;--spectrum-dial-handle-inline-margin:16px;--spectrum-dial-controls-margin:8px;--spectrum-dial-label-gap-y:5px;--spectrum-dial-label-container-top-to-text:4px;--spectrum-assetcard-focus-ring-border-radius:8px;--spectrum-assetcard-selectionindicator-margin:12px;--spectrum-assetcard-title-font-size:var(--spectrum-heading-size-xs);--spectrum-assetcard-header-content-font-size:var(--spectrum-heading-size-xs);--spectrum-assetcard-content-font-size:var(--spectrum-body-size-s);--spectrum-tooltip-animation-distance:var(--spectrum-spacing-75);--spectrum-ui-icon-medium-display:block;--spectrum-ui-icon-large-display:none}:root,:host{--spectrum-global-alias-appframe-border-size:2px;--swc-scale-factor:1}
`;
var scale_medium_core_tokens_css_default = e13;

// node_modules/@spectrum-web-components/theme/spectrum-two/scale-medium-core-tokens.js
Theme.registerThemeFragment("medium-spectrum-two", "scale", scale_medium_core_tokens_css_default);

// node_modules/@spectrum-web-components/theme/src/spectrum-two/scale-large-core-tokens.css.js
var e14 = i`
    :host,:root{--spectrum-checkbox-control-size-small:16px;--spectrum-checkbox-control-size-medium:18px;--spectrum-checkbox-control-size-large:20px;--spectrum-checkbox-control-size-extra-large:22px;--spectrum-checkbox-top-to-control-small:7px;--spectrum-checkbox-top-to-control-medium:11px;--spectrum-checkbox-top-to-control-large:15px;--spectrum-checkbox-top-to-control-extra-large:19px;--spectrum-switch-control-width-small:30px;--spectrum-switch-control-width-medium:34px;--spectrum-switch-control-width-large:38px;--spectrum-switch-control-width-extra-large:46px;--spectrum-switch-control-height-small:18px;--spectrum-switch-control-height-medium:20px;--spectrum-switch-control-height-large:22px;--spectrum-switch-control-height-extra-large:26px;--spectrum-switch-top-to-control-small:7px;--spectrum-switch-top-to-control-medium:11px;--spectrum-switch-top-to-control-large:15px;--spectrum-switch-top-to-control-extra-large:19px;--spectrum-radio-button-control-size-small:16px;--spectrum-radio-button-control-size-medium:18px;--spectrum-radio-button-control-size-large:20px;--spectrum-radio-button-control-size-extra-large:22px;--spectrum-radio-button-top-to-control-small:7px;--spectrum-radio-button-top-to-control-medium:11px;--spectrum-radio-button-top-to-control-large:15px;--spectrum-radio-button-top-to-control-extra-large:19px;--spectrum-field-label-text-to-asterisk-small:5px;--spectrum-field-label-text-to-asterisk-medium:5px;--spectrum-field-label-text-to-asterisk-large:6px;--spectrum-field-label-text-to-asterisk-extra-large:6px;--spectrum-field-label-top-to-asterisk-small:11px;--spectrum-field-label-top-to-asterisk-medium:15px;--spectrum-field-label-top-to-asterisk-large:19px;--spectrum-field-label-top-to-asterisk-extra-large:24px;--spectrum-field-label-to-component-quiet-small:-10px;--spectrum-field-label-to-component-quiet-medium:-10px;--spectrum-field-label-to-component-quiet-large:-15px;--spectrum-field-label-to-component-quiet-extra-large:-19px;--spectrum-help-text-top-to-workflow-icon-small:var(--spectrum-component-top-to-workflow-icon-75);--spectrum-help-text-top-to-workflow-icon-medium:var(--spectrum-component-top-to-workflow-icon-100);--spectrum-help-text-top-to-workflow-icon-large:var(--spectrum-component-top-to-workflow-icon-200);--spectrum-help-text-top-to-workflow-icon-extra-large:var(--spectrum-component-top-to-workflow-icon-300);--spectrum-status-light-dot-size-medium:10px;--spectrum-status-light-dot-size-large:12px;--spectrum-status-light-dot-size-extra-large:12px;--spectrum-status-light-top-to-dot-small:11px;--spectrum-status-light-top-to-dot-medium:15px;--spectrum-status-light-top-to-dot-large:19px;--spectrum-status-light-top-to-dot-extra-large:24px;--spectrum-action-button-edge-to-hold-icon-medium:5px;--spectrum-action-button-edge-to-hold-icon-large:6px;--spectrum-action-button-edge-to-hold-icon-extra-large:7px;--spectrum-tooltip-tip-width:12px;--spectrum-tooltip-tip-height:6px;--spectrum-tooltip-maximum-width:200px;--spectrum-progress-circle-size-small:20px;--spectrum-progress-circle-size-medium:40px;--spectrum-progress-circle-size-large:80px;--spectrum-progress-circle-thickness-small:3px;--spectrum-progress-circle-thickness-medium:4px;--spectrum-progress-circle-thickness-large:5px;--spectrum-toast-height:60px;--spectrum-toast-maximum-width:420px;--spectrum-toast-top-to-workflow-icon:20px;--spectrum-toast-top-to-text:20px;--spectrum-toast-bottom-to-text:22px;--spectrum-action-bar-height:56px;--spectrum-action-bar-top-to-item-counter:16px;--spectrum-swatch-size-extra-small:20px;--spectrum-swatch-size-small:30px;--spectrum-swatch-size-medium:40px;--spectrum-swatch-size-large:50px;--spectrum-progress-bar-thickness-small:5px;--spectrum-progress-bar-thickness-medium:8px;--spectrum-progress-bar-thickness-large:10px;--spectrum-progress-bar-thickness-extra-large:13px;--spectrum-meter-width:240px;--spectrum-meter-thickness-small:5px;--spectrum-meter-thickness-large:8px;--spectrum-tag-top-to-avatar-small:5px;--spectrum-tag-top-to-avatar-medium:7px;--spectrum-tag-top-to-avatar-large:11px;--spectrum-tag-top-to-cross-icon-small:10px;--spectrum-tag-top-to-cross-icon-medium:15px;--spectrum-tag-top-to-cross-icon-large:19px;--spectrum-popover-top-to-content-area:5px;--spectrum-menu-item-edge-to-content-not-selected-small:24px;--spectrum-menu-item-edge-to-content-not-selected-medium:42px;--spectrum-menu-item-edge-to-content-not-selected-large:47px;--spectrum-menu-item-edge-to-content-not-selected-extra-large:54px;--spectrum-menu-item-top-to-disclosure-icon-small:9px;--spectrum-menu-item-top-to-disclosure-icon-medium:13px;--spectrum-menu-item-top-to-disclosure-icon-large:17px;--spectrum-menu-item-top-to-disclosure-icon-extra-large:22px;--spectrum-menu-item-top-to-selected-icon-small:9px;--spectrum-menu-item-top-to-selected-icon-medium:13px;--spectrum-menu-item-top-to-selected-icon-large:17px;--spectrum-menu-item-top-to-selected-icon-extra-large:22px;--spectrum-slider-control-height-small:18px;--spectrum-slider-control-height-medium:20px;--spectrum-slider-control-height-large:22px;--spectrum-slider-control-height-extra-large:26px;--spectrum-slider-handle-size-small:18px;--spectrum-slider-handle-size-medium:20px;--spectrum-slider-handle-size-large:22px;--spectrum-slider-handle-size-extra-large:26px;--spectrum-slider-handle-border-width-down-small:7px;--spectrum-slider-handle-border-width-down-medium:8px;--spectrum-slider-handle-border-width-down-large:9px;--spectrum-slider-handle-border-width-down-extra-large:11px;--spectrum-slider-bottom-to-handle-small:6px;--spectrum-slider-bottom-to-handle-medium:10px;--spectrum-slider-bottom-to-handle-large:14px;--spectrum-slider-bottom-to-handle-extra-large:17px;--spectrum-slider-control-to-field-label-small:6px;--spectrum-slider-control-to-field-label-medium:10px;--spectrum-slider-control-to-field-label-large:14px;--spectrum-slider-control-to-field-label-extra-large:17px;--spectrum-picker-visual-to-disclosure-icon-small:9px;--spectrum-picker-visual-to-disclosure-icon-medium:10px;--spectrum-picker-visual-to-disclosure-icon-large:11px;--spectrum-picker-visual-to-disclosure-icon-extra-large:13px;--spectrum-text-area-minimum-width:140px;--spectrum-text-area-minimum-height:70px;--spectrum-combo-box-visual-to-field-button-small:9px;--spectrum-combo-box-visual-to-field-button-medium:10px;--spectrum-combo-box-visual-to-field-button-large:11px;--spectrum-combo-box-visual-to-field-button-extra-large:13px;--spectrum-thumbnail-size-50:20px;--spectrum-thumbnail-size-75:22px;--spectrum-thumbnail-size-100:26px;--spectrum-thumbnail-size-200:28px;--spectrum-thumbnail-size-300:32px;--spectrum-thumbnail-size-400:36px;--spectrum-thumbnail-size-500:40px;--spectrum-thumbnail-size-600:46px;--spectrum-thumbnail-size-700:50px;--spectrum-thumbnail-size-800:55px;--spectrum-thumbnail-size-900:62px;--spectrum-thumbnail-size-1000:70px;--spectrum-alert-dialog-title-size:var(--spectrum-heading-size-xs);--spectrum-alert-dialog-description-size:var(--spectrum-body-size-xs);--spectrum-opacity-checkerboard-square-size:var(--spectrum-opacity-checkerboard-square-size-medium);--spectrum-opacity-checkerboard-square-size-medium:10px;--spectrum-contextual-help-title-size:var(--spectrum-heading-size-xxs);--spectrum-contextual-help-body-size:var(--spectrum-body-size-xs);--spectrum-breadcrumbs-height-multiline:84px;--spectrum-breadcrumbs-top-to-text:17px;--spectrum-breadcrumbs-top-to-text-compact:16px;--spectrum-breadcrumbs-top-to-text-multiline:15px;--spectrum-breadcrumbs-bottom-to-text:19px;--spectrum-breadcrumbs-bottom-to-text-compact:19px;--spectrum-breadcrumbs-bottom-to-text-multiline:10px;--spectrum-breadcrumbs-start-edge-to-text:9px;--spectrum-breadcrumbs-top-text-to-bottom-text:11px;--spectrum-breadcrumbs-top-to-separator-icon:25px;--spectrum-breadcrumbs-top-to-separator-icon-compact:23px;--spectrum-breadcrumbs-top-to-separator-icon-multiline:20px;--spectrum-breadcrumbs-separator-icon-to-bottom-text-multiline:15px;--spectrum-breadcrumbs-top-to-truncated-menu:10px;--spectrum-breadcrumbs-top-to-truncated-menu-compact:5px;--spectrum-avatar-size-50:20px;--spectrum-avatar-size-75:22px;--spectrum-avatar-size-100:26px;--spectrum-avatar-size-200:28px;--spectrum-avatar-size-300:32px;--spectrum-avatar-size-400:36px;--spectrum-avatar-size-500:40px;--spectrum-avatar-size-600:46px;--spectrum-avatar-size-700:50px;--spectrum-alert-banner-minimum-height:64px;--spectrum-alert-banner-width:680px;--spectrum-alert-banner-top-to-workflow-icon:21px;--spectrum-alert-banner-top-to-text:21px;--spectrum-alert-banner-bottom-to-text:22px;--spectrum-rating-indicator-width:22px;--spectrum-rating-indicator-to-icon:5px;--spectrum-color-area-width:240px;--spectrum-color-area-minimum-width:80px;--spectrum-color-area-height:240px;--spectrum-color-area-minimum-height:80px;--spectrum-color-wheel-width:240px;--spectrum-color-wheel-minimum-width:219px;--spectrum-color-slider-length:240px;--spectrum-color-slider-minimum-length:100px;--spectrum-illustrated-message-title-size:var(--spectrum-heading-size-s);--spectrum-illustrated-message-cjk-title-size:var(--spectrum-heading-cjk-size-s);--spectrum-illustrated-message-body-size:var(--spectrum-body-size-xs);--spectrum-coach-mark-width:216px;--spectrum-coach-mark-minimum-width:216px;--spectrum-coach-mark-maximum-width:248px;--spectrum-coach-mark-edge-to-content:var(--spectrum-spacing-300);--spectrum-coach-mark-pagination-text-to-bottom-edge:22px;--spectrum-coach-mark-media-height:162px;--spectrum-coach-mark-media-minimum-height:121px;--spectrum-coach-mark-title-size:var(--spectrum-heading-size-xxs);--spectrum-coach-mark-body-size:var(--spectrum-body-size-xs);--spectrum-coach-mark-pagination-body-size:var(--spectrum-body-size-xs);--spectrum-accordion-top-to-text-regular-small:7px;--spectrum-accordion-small-top-to-text-spacious:12px;--spectrum-accordion-top-to-text-regular-medium:9px;--spectrum-accordion-top-to-text-spacious-medium:14px;--spectrum-accordion-top-to-text-compact-large:7px;--spectrum-accordion-top-to-text-regular-large:12px;--spectrum-accordion-top-to-text-spacious-large:14px;--spectrum-accordion-top-to-text-compact-extra-large:7px;--spectrum-accordion-top-to-text-regular-extra-large:12px;--spectrum-accordion-top-to-text-spacious-extra-large:14px;--spectrum-accordion-bottom-to-text-compact-small:4px;--spectrum-accordion-bottom-to-text-regular-small:9px;--spectrum-accordion-bottom-to-text-spacious-small:14px;--spectrum-accordion-bottom-to-text-compact-medium:8px;--spectrum-accordion-bottom-to-text-regular-medium:13px;--spectrum-accordion-bottom-to-text-spacious-medium:18px;--spectrum-accordion-bottom-to-text-compact-large:9px;--spectrum-accordion-bottom-to-text-regular-large:14px;--spectrum-accordion-bottom-to-text-spacious-large:19px;--spectrum-accordion-bottom-to-text-compact-extra-large:10px;--spectrum-accordion-bottom-to-text-regular-extra-large:15px;--spectrum-accordion-bottom-to-text-spacious-extra-large:21px;--spectrum-accordion-minimum-width:250px;--spectrum-accordion-content-area-top-to-content:10px;--spectrum-accordion-content-area-bottom-to-content:20px;--spectrum-color-handle-size:20px;--spectrum-color-handle-size-key-focus:40px;--spectrum-table-column-header-row-top-to-text-small:10px;--spectrum-table-column-header-row-top-to-text-medium:9px;--spectrum-table-column-header-row-top-to-text-large:13px;--spectrum-table-column-header-row-top-to-text-extra-large:16px;--spectrum-table-column-header-row-bottom-to-text-small:11px;--spectrum-table-column-header-row-bottom-to-text-medium:10px;--spectrum-table-column-header-row-bottom-to-text-large:13px;--spectrum-table-column-header-row-bottom-to-text-extra-large:17px;--spectrum-table-row-height-small-regular:40px;--spectrum-table-row-height-medium-regular:50px;--spectrum-table-row-height-large-regular:60px;--spectrum-table-row-height-extra-large-regular:70px;--spectrum-table-row-height-small-spacious:50px;--spectrum-table-row-height-medium-spacious:60px;--spectrum-table-row-height-large-spacious:70px;--spectrum-table-row-height-extra-large-spacious:80px;--spectrum-table-row-top-to-text-small-regular:10px;--spectrum-table-row-top-to-text-medium-regular:14px;--spectrum-table-row-top-to-text-large-regular:18px;--spectrum-table-row-top-to-text-extra-large-regular:21px;--spectrum-table-row-bottom-to-text-small-regular:11px;--spectrum-table-row-bottom-to-text-medium-regular:15px;--spectrum-table-row-bottom-to-text-large-regular:18px;--spectrum-table-row-bottom-to-text-extra-large-regular:22px;--spectrum-table-row-top-to-text-small-spacious:15px;--spectrum-table-row-top-to-text-medium-spacious:18px;--spectrum-table-row-top-to-text-large-spacious:23px;--spectrum-table-row-top-to-text-extra-large-spacious:26px;--spectrum-table-row-bottom-to-text-small-spacious:16px;--spectrum-table-row-bottom-to-text-medium-spacious:18px;--spectrum-table-row-bottom-to-text-large-spacious:23px;--spectrum-table-row-bottom-to-text-extra-large-spacious:27px;--spectrum-table-checkbox-to-text:30px;--spectrum-table-header-row-checkbox-to-top-small:14px;--spectrum-table-header-row-checkbox-to-top-medium:13px;--spectrum-table-header-row-checkbox-to-top-large:17px;--spectrum-table-header-row-checkbox-to-top-extra-large:21px;--spectrum-table-row-checkbox-to-top-small-compact:9px;--spectrum-table-row-checkbox-to-top-small-regular:14px;--spectrum-table-row-checkbox-to-top-small-spacious:19px;--spectrum-table-row-checkbox-to-top-medium-compact:13px;--spectrum-table-row-checkbox-to-top-medium-regular:18px;--spectrum-table-row-checkbox-to-top-medium-spacious:23px;--spectrum-table-row-checkbox-to-top-large-compact:17px;--spectrum-table-row-checkbox-to-top-large-regular:22px;--spectrum-table-row-checkbox-to-top-large-spacious:27px;--spectrum-table-row-checkbox-to-top-extra-large-compact:21px;--spectrum-table-row-checkbox-to-top-extra-large-regular:26px;--spectrum-table-row-checkbox-to-top-extra-large-spacious:31px;--spectrum-table-section-header-row-height-small:30px;--spectrum-table-section-header-row-height-medium:40px;--spectrum-table-section-header-row-height-large:50px;--spectrum-table-section-header-row-height-extra-large:60px;--spectrum-table-thumbnail-to-top-minimum-small-compact:5px;--spectrum-table-thumbnail-to-top-minimum-medium-compact:6px;--spectrum-table-thumbnail-to-top-minimum-large-compact:9px;--spectrum-table-thumbnail-to-top-minimum-extra-large-compact:10px;--spectrum-table-thumbnail-to-top-minimum-small-regular:6px;--spectrum-table-thumbnail-to-top-minimum-medium-regular:9px;--spectrum-table-thumbnail-to-top-minimum-large-regular:10px;--spectrum-table-thumbnail-to-top-minimum-extra-large-regular:10px;--spectrum-table-thumbnail-to-top-minimum-small-spacious:9px;--spectrum-table-thumbnail-to-top-minimum-medium-spacious:10px;--spectrum-table-thumbnail-to-top-minimum-large-spacious:10px;--spectrum-table-thumbnail-to-top-minimum-extra-large-spacious:12px;--spectrum-tab-item-to-tab-item-horizontal-small:27px;--spectrum-tab-item-to-tab-item-horizontal-medium:30px;--spectrum-tab-item-to-tab-item-horizontal-large:33px;--spectrum-tab-item-to-tab-item-horizontal-extra-large:36px;--spectrum-tab-item-to-tab-item-vertical-small:5px;--spectrum-tab-item-to-tab-item-vertical-medium:5px;--spectrum-tab-item-to-tab-item-vertical-large:6px;--spectrum-tab-item-to-tab-item-vertical-extra-large:6px;--spectrum-tab-item-start-to-edge-small:13px;--spectrum-tab-item-start-to-edge-medium:15px;--spectrum-tab-item-start-to-edge-large:17px;--spectrum-tab-item-start-to-edge-extra-large:19px;--spectrum-tab-item-top-to-text-small:14px;--spectrum-tab-item-bottom-to-text-small:15px;--spectrum-tab-item-top-to-text-medium:18px;--spectrum-tab-item-bottom-to-text-medium:19px;--spectrum-tab-item-top-to-text-large:22px;--spectrum-tab-item-bottom-to-text-large:22px;--spectrum-tab-item-top-to-text-extra-large:25px;--spectrum-tab-item-bottom-to-text-extra-large:25px;--spectrum-tab-item-top-to-text-compact-small:5px;--spectrum-tab-item-bottom-to-text-compact-small:6px;--spectrum-tab-item-top-to-text-compact-medium:9px;--spectrum-tab-item-bottom-to-text-compact-medium:10px;--spectrum-tab-item-top-to-text-compact-large:12px;--spectrum-tab-item-bottom-to-text-compact-large:14px;--spectrum-tab-item-top-to-text-compact-extra-large:15px;--spectrum-tab-item-bottom-to-text-compact-extra-large:17px;--spectrum-tab-item-top-to-workflow-icon-small:15px;--spectrum-tab-item-top-to-workflow-icon-medium:19px;--spectrum-tab-item-top-to-workflow-icon-large:23px;--spectrum-tab-item-top-to-workflow-icon-extra-large:26px;--spectrum-tab-item-top-to-workflow-icon-compact-small:5px;--spectrum-tab-item-top-to-workflow-icon-compact-medium:9px;--spectrum-tab-item-top-to-workflow-icon-compact-large:13px;--spectrum-tab-item-top-to-workflow-icon-compact-extra-large:16px;--spectrum-tab-item-focus-indicator-gap-small:9px;--spectrum-tab-item-focus-indicator-gap-medium:10px;--spectrum-tab-item-focus-indicator-gap-large:11px;--spectrum-tab-item-focus-indicator-gap-extra-large:12px;--spectrum-side-navigation-width:240px;--spectrum-side-navigation-minimum-width:200px;--spectrum-side-navigation-maximum-width:300px;--spectrum-side-navigation-second-level-edge-to-text:30px;--spectrum-side-navigation-third-level-edge-to-text:45px;--spectrum-side-navigation-with-icon-second-level-edge-to-text:62px;--spectrum-side-navigation-with-icon-third-level-edge-to-text:77px;--spectrum-side-navigation-item-to-item:5px;--spectrum-side-navigation-item-to-header:30px;--spectrum-side-navigation-bottom-to-text:10px;--spectrum-tray-top-to-content-area:5px;--spectrum-arrow-icon-size-75:12px;--spectrum-arrow-icon-size-100:14px;--spectrum-arrow-icon-size-200:16px;--spectrum-arrow-icon-size-300:16px;--spectrum-arrow-icon-size-400:18px;--spectrum-arrow-icon-size-500:22px;--spectrum-arrow-icon-size-600:24px;--spectrum-asterisk-icon-size-100:10px;--spectrum-asterisk-icon-size-200:12px;--spectrum-asterisk-icon-size-300:12px;--spectrum-checkmark-icon-size-50:12px;--spectrum-checkmark-icon-size-75:12px;--spectrum-checkmark-icon-size-100:14px;--spectrum-checkmark-icon-size-200:14px;--spectrum-checkmark-icon-size-300:16px;--spectrum-checkmark-icon-size-400:18px;--spectrum-checkmark-icon-size-500:20px;--spectrum-checkmark-icon-size-600:24px;--spectrum-chevron-icon-size-50:8px;--spectrum-chevron-icon-size-75:12px;--spectrum-chevron-icon-size-100:14px;--spectrum-chevron-icon-size-200:14px;--spectrum-chevron-icon-size-300:16px;--spectrum-chevron-icon-size-400:18px;--spectrum-chevron-icon-size-500:20px;--spectrum-chevron-icon-size-600:24px;--spectrum-cross-icon-size-75:10px;--spectrum-cross-icon-size-100:10px;--spectrum-cross-icon-size-200:12px;--spectrum-cross-icon-size-300:14px;--spectrum-cross-icon-size-400:16px;--spectrum-cross-icon-size-500:16px;--spectrum-cross-icon-size-600:18px;--spectrum-dash-icon-size-50:10px;--spectrum-dash-icon-size-75:10px;--spectrum-dash-icon-size-100:12px;--spectrum-dash-icon-size-200:14px;--spectrum-dash-icon-size-300:16px;--spectrum-dash-icon-size-400:18px;--spectrum-dash-icon-size-500:20px;--spectrum-dash-icon-size-600:22px;--spectrum-side-navigation-header-to-item:10px;--spectrum-switch-handle-size-small:10px;--spectrum-switch-handle-selected-size-small:12px;--spectrum-switch-handle-selected-size-medium:14px;--spectrum-switch-handle-selected-size-large:16px;--spectrum-switch-handle-selected-size-extra-large:20px;--spectrum-switch-handle-size-medium:12px;--spectrum-switch-handle-size-large:14px;--spectrum-switch-handle-size-extra-large:18px;--spectrum-tag-label-to-clear-icon-small:10px;--spectrum-tag-label-to-clear-icon-medium:15px;--spectrum-tag-label-to-clear-icon-large:19px;--spectrum-tag-edge-to-clear-icon-small:10px;--spectrum-tag-edge-to-clear-icon-medium:15px;--spectrum-tag-edge-to-clear-icon-large:19px;--spectrum-opacity-checkerboard-square-size-small:5px;--spectrum-drop-shadow-y:2px;--spectrum-drop-shadow-blur:6px;--spectrum-workflow-icon-size-50:16px;--spectrum-workflow-icon-size-75:18px;--spectrum-workflow-icon-size-100:24px;--spectrum-workflow-icon-size-200:28px;--spectrum-workflow-icon-size-300:30px;--spectrum-text-to-visual-50:7px;--spectrum-text-to-visual-75:7px;--spectrum-text-to-visual-100:8px;--spectrum-text-to-visual-200:9px;--spectrum-text-to-visual-300:10px;--spectrum-text-to-control-75:11px;--spectrum-text-to-control-100:13px;--spectrum-text-to-control-200:14px;--spectrum-text-to-control-300:16px;--spectrum-component-height-50:26px;--spectrum-component-height-75:30px;--spectrum-component-height-100:40px;--spectrum-component-height-200:50px;--spectrum-component-height-300:60px;--spectrum-component-height-400:70px;--spectrum-component-height-500:80px;--spectrum-component-pill-edge-to-visual-75:13px;--spectrum-component-pill-edge-to-visual-100:17px;--spectrum-component-pill-edge-to-visual-200:22px;--spectrum-component-pill-edge-to-visual-300:27px;--spectrum-component-pill-edge-to-visual-only-75:5px;--spectrum-component-pill-edge-to-visual-only-100:9px;--spectrum-component-pill-edge-to-visual-only-200:13px;--spectrum-component-pill-edge-to-visual-only-300:16px;--spectrum-component-pill-edge-to-text-75:15px;--spectrum-component-pill-edge-to-text-100:20px;--spectrum-component-pill-edge-to-text-200:25px;--spectrum-component-pill-edge-to-text-300:30px;--spectrum-component-edge-to-visual-50:7px;--spectrum-component-edge-to-visual-75:9px;--spectrum-component-edge-to-visual-100:12px;--spectrum-component-edge-to-visual-200:16px;--spectrum-component-edge-to-visual-300:19px;--spectrum-component-edge-to-visual-only-50:5px;--spectrum-component-edge-to-visual-only-75:6px;--spectrum-component-edge-to-visual-only-100:8px;--spectrum-component-edge-to-visual-only-200:11px;--spectrum-component-edge-to-visual-only-300:15px;--spectrum-component-edge-to-text-50:10px;--spectrum-component-edge-to-text-75:11px;--spectrum-component-edge-to-text-100:15px;--spectrum-component-edge-to-text-200:19px;--spectrum-component-edge-to-text-300:22px;--spectrum-component-top-to-workflow-icon-50:5px;--spectrum-component-top-to-workflow-icon-75:6px;--spectrum-component-top-to-workflow-icon-100:8px;--spectrum-component-top-to-workflow-icon-200:11px;--spectrum-component-top-to-workflow-icon-300:15px;--spectrum-component-top-to-text-50:4px;--spectrum-component-top-to-text-75:5px;--spectrum-component-top-to-text-100:8px;--spectrum-component-top-to-text-200:12px;--spectrum-component-top-to-text-300:15px;--spectrum-component-bottom-to-text-50:6px;--spectrum-component-bottom-to-text-75:6px;--spectrum-component-bottom-to-text-100:11px;--spectrum-component-bottom-to-text-200:14px;--spectrum-component-bottom-to-text-300:18px;--spectrum-component-to-menu-small:7px;--spectrum-component-to-menu-medium:8px;--spectrum-component-to-menu-large:9px;--spectrum-component-to-menu-extra-large:10px;--spectrum-field-edge-to-disclosure-icon-75:9px;--spectrum-field-edge-to-disclosure-icon-100:13px;--spectrum-field-edge-to-disclosure-icon-200:17px;--spectrum-field-edge-to-disclosure-icon-300:22px;--spectrum-field-end-edge-to-disclosure-icon-75:9px;--spectrum-field-end-edge-to-disclosure-icon-100:13px;--spectrum-field-end-edge-to-disclosure-icon-200:17px;--spectrum-field-end-edge-to-disclosure-icon-300:22px;--spectrum-field-top-to-disclosure-icon-75:9px;--spectrum-field-top-to-disclosure-icon-100:13px;--spectrum-field-top-to-disclosure-icon-200:17px;--spectrum-field-top-to-disclosure-icon-300:22px;--spectrum-field-top-to-alert-icon-small:5px;--spectrum-field-top-to-alert-icon-medium:9px;--spectrum-field-top-to-alert-icon-large:13px;--spectrum-field-top-to-alert-icon-extra-large:16px;--spectrum-field-top-to-validation-icon-small:9px;--spectrum-field-top-to-validation-icon-medium:13px;--spectrum-field-top-to-validation-icon-large:17px;--spectrum-field-top-to-validation-icon-extra-large:22px;--spectrum-field-top-to-progress-circle-small:7px;--spectrum-field-top-to-progress-circle-medium:12px;--spectrum-field-top-to-progress-circle-large:17px;--spectrum-field-top-to-progress-circle-extra-large:22px;--spectrum-field-edge-to-alert-icon-small:11px;--spectrum-field-edge-to-alert-icon-medium:15px;--spectrum-field-edge-to-alert-icon-large:19px;--spectrum-field-edge-to-alert-icon-extra-large:22px;--spectrum-field-edge-to-validation-icon-small:11px;--spectrum-field-edge-to-validation-icon-medium:15px;--spectrum-field-edge-to-validation-icon-large:19px;--spectrum-field-edge-to-validation-icon-extra-large:22px;--spectrum-field-text-to-alert-icon-small:10px;--spectrum-field-text-to-alert-icon-medium:15px;--spectrum-field-text-to-alert-icon-large:19px;--spectrum-field-text-to-alert-icon-extra-large:22px;--spectrum-field-text-to-validation-icon-small:10px;--spectrum-field-text-to-validation-icon-medium:15px;--spectrum-field-text-to-validation-icon-large:19px;--spectrum-field-text-to-validation-icon-extra-large:22px;--spectrum-field-width:var(--spectrum-field-width-small);--spectrum-field-width-small:240px;--spectrum-character-count-to-field-quiet-small:-4px;--spectrum-character-count-to-field-quiet-medium:-4px;--spectrum-character-count-to-field-quiet-large:-4px;--spectrum-character-count-to-field-quiet-extra-large:-5px;--spectrum-side-label-character-count-to-field:15px;--spectrum-disclosure-indicator-top-to-disclosure-icon-small:9px;--spectrum-disclosure-indicator-top-to-disclosure-icon-medium:13px;--spectrum-disclosure-indicator-top-to-disclosure-icon-large:17px;--spectrum-disclosure-indicator-top-to-disclosure-icon-extra-large:22px;--spectrum-navigational-indicator-top-to-back-icon-small:7px;--spectrum-navigational-indicator-top-to-back-icon-medium:12px;--spectrum-navigational-indicator-top-to-back-icon-large:16px;--spectrum-navigational-indicator-top-to-back-icon-extra-large:19px;--spectrum-color-control-track-width:30px;--spectrum-corner-triangle-icon-size-75:6px;--spectrum-corner-triangle-icon-size-100:7px;--spectrum-corner-triangle-icon-size-200:8px;--spectrum-corner-triangle-icon-size-300:8px;--spectrum-field-width-medium:256px;--spectrum-field-width-large:272px;--spectrum-field-width-extra-large:288px;--spectrum-font-size-50:13px;--spectrum-font-size-75:15px;--spectrum-font-size-100:17px;--spectrum-font-size-200:19px;--spectrum-font-size-300:22px;--spectrum-font-size-400:24px;--spectrum-font-size-500:27px;--spectrum-font-size-600:31px;--spectrum-font-size-700:34px;--spectrum-font-size-800:39px;--spectrum-font-size-900:44px;--spectrum-font-size-1000:49px;--spectrum-font-size-1100:55px;--spectrum-font-size-1200:62px;--spectrum-font-size-1300:70px;--spectrum-edge-to-visual-only-75:5px;--spectrum-edge-to-visual-only-100:9px;--spectrum-edge-to-visual-only-200:13px;--spectrum-edge-to-visual-only-300:16px;--spectrum-slider-tick-mark-height:13px;--spectrum-slider-ramp-track-height:20px;--spectrum-colorwheel-path:"M 119 119 m -119 0 a 119 119 0 1 0 238 0 a 119 119 0 1 0 -238 0.2 M 119 119 m -91 0 a 91 91 0 1 0 182 0 a 91 91 0 1 0 -182 0";--spectrum-colorwheel-path-borders:"M 120 120 m -120 0 a 120 120 0 1 0 240 0 a 120 120 0 1 0 -240 0.2 M 120 120 m -90 0 a 90 90 0 1 0 180 0 a 90 90 0 1 0 -180 0";--spectrum-colorwheel-colorarea-container-size:182px;--spectrum-colorloupe-checkerboard-fill:url(#checkerboard-secondary);--spectrum-menu-item-selectable-edge-to-text-not-selected-small:34px;--spectrum-menu-item-selectable-edge-to-text-not-selected-medium:42px;--spectrum-menu-item-selectable-edge-to-text-not-selected-large:47px;--spectrum-menu-item-selectable-edge-to-text-not-selected-extra-large:54px;--spectrum-menu-item-checkmark-height-small:12px;--spectrum-menu-item-checkmark-height-medium:14px;--spectrum-menu-item-checkmark-height-large:16px;--spectrum-menu-item-checkmark-height-extra-large:16px;--spectrum-menu-item-checkmark-width-small:12px;--spectrum-menu-item-checkmark-width-medium:14px;--spectrum-menu-item-checkmark-width-large:16px;--spectrum-menu-item-checkmark-width-extra-large:16px;--spectrum-rating-icon-spacing:var(--spectrum-spacing-100);--spectrum-button-top-to-text-small:6px;--spectrum-button-bottom-to-text-small:5px;--spectrum-button-top-to-text-medium:9px;--spectrum-button-bottom-to-text-medium:10px;--spectrum-button-top-to-text-large:12px;--spectrum-button-bottom-to-text-large:13px;--spectrum-button-top-to-text-extra-large:16px;--spectrum-button-bottom-to-text-extra-large:17px;--spectrum-alert-banner-close-button-spacing:var(--spectrum-spacing-200);--spectrum-alert-banner-edge-to-divider:var(--spectrum-spacing-200);--spectrum-alert-banner-edge-to-button:var(--spectrum-spacing-200);--spectrum-alert-banner-text-to-button-vertical:var(--spectrum-spacing-200);--spectrum-alert-dialog-padding:var(--spectrum-spacing-400);--spectrum-alert-dialog-description-to-buttons:var(--spectrum-spacing-600);--spectrum-coach-indicator-gap:8px;--spectrum-coach-indicator-ring-diameter:20px;--spectrum-coach-indicator-quiet-ring-diameter:10px;--spectrum-coachmark-buttongroup-display:none;--spectrum-coachmark-buttongroup-mobile-display:flex;--spectrum-coachmark-menu-display:none;--spectrum-coachmark-menu-mobile-display:inline-flex;--spectrum-well-padding:20px;--spectrum-well-margin-top:5px;--spectrum-well-min-width:300px;--spectrum-well-border-radius:5px;--spectrum-icon-chevron-size-50:8px;--spectrum-workflow-icon-size-xxl:40px;--spectrum-workflow-icon-size-xxs:15px;--spectrum-treeview-item-indentation-medium:20px;--spectrum-treeview-item-indentation-small:15px;--spectrum-treeview-item-indentation-large:25px;--spectrum-treeview-item-indentation-extra-large:30px;--spectrum-treeview-indicator-inset-block-start:6px;--spectrum-treeview-item-min-block-size-thumbnail-offset-medium:2px;--spectrum-dialog-confirm-entry-animation-distance:25px;--spectrum-dialog-confirm-hero-height:160px;--spectrum-dialog-confirm-border-radius:5px;--spectrum-dialog-confirm-title-text-size:19px;--spectrum-dialog-confirm-description-text-size:15px;--spectrum-dialog-confirm-padding-grid:24px;--spectrum-datepicker-initial-width:160px;--spectrum-datepicker-generic-padding:15px;--spectrum-datepicker-dash-line-height:30px;--spectrum-datepicker-width-quiet-first:90px;--spectrum-datepicker-width-quiet-second:20px;--spectrum-datepicker-datetime-width-first:45px;--spectrum-datepicker-invalid-icon-to-button:10px;--spectrum-datepicker-invalid-icon-to-button-quiet:9px;--spectrum-datepicker-input-datetime-width:30px;--spectrum-pagination-textfield-width:60px;--spectrum-pagination-item-inline-spacing:6px;--spectrum-dial-border-radius:20px;--spectrum-dial-handle-position:10px;--spectrum-dial-handle-block-margin:20px;--spectrum-dial-handle-inline-margin:20px;--spectrum-dial-controls-margin:10px;--spectrum-dial-label-gap-y:6px;--spectrum-dial-label-container-top-to-text:5px;--spectrum-assetcard-focus-ring-border-radius:9px;--spectrum-assetcard-selectionindicator-margin:15px;--spectrum-assetcard-title-font-size:var(--spectrum-heading-size-xxs);--spectrum-assetcard-header-content-font-size:var(--spectrum-heading-size-xxs);--spectrum-assetcard-content-font-size:var(--spectrum-body-size-xs);--spectrum-tooltip-animation-distance:5px;--spectrum-ui-icon-medium-display:none;--spectrum-ui-icon-large-display:block}:root,:host{--spectrum-global-alias-appframe-border-size:1px;--swc-scale-factor:1.25}
`;
var scale_large_core_tokens_css_default = e14;

// node_modules/@spectrum-web-components/theme/spectrum-two/scale-large-core-tokens.js
Theme.registerThemeFragment("large-spectrum-two", "scale", scale_large_core_tokens_css_default);

// node_modules/query-selector-shadow-dom/src/normalize.js
function normalizeSelector(sel) {
  function saveUnmatched() {
    if (unmatched) {
      if (tokens.length > 0 && /^[~+>]$/.test(tokens[tokens.length - 1])) {
        tokens.push(" ");
      }
      tokens.push(unmatched);
    }
  }
  var tokens = [], match, unmatched, regex, state = [0], next_match_idx = 0, prev_match_idx, not_escaped_pattern = /(?:[^\\]|(?:^|[^\\])(?:\\\\)+)$/, whitespace_pattern = /^\s+$/, state_patterns = [
    /\s+|\/\*|["'>~+[(]/g,
    // general
    /\s+|\/\*|["'[\]()]/g,
    // [..] set
    /\s+|\/\*|["'[\]()]/g,
    // (..) set
    null,
    // string literal (placeholder)
    /\*\//g
    // comment
  ];
  sel = sel.trim();
  while (true) {
    unmatched = "";
    regex = state_patterns[state[state.length - 1]];
    regex.lastIndex = next_match_idx;
    match = regex.exec(sel);
    if (match) {
      prev_match_idx = next_match_idx;
      next_match_idx = regex.lastIndex;
      if (prev_match_idx < next_match_idx - match[0].length) {
        unmatched = sel.substring(
          prev_match_idx,
          next_match_idx - match[0].length
        );
      }
      if (state[state.length - 1] < 3) {
        saveUnmatched();
        if (match[0] === "[") {
          state.push(1);
        } else if (match[0] === "(") {
          state.push(2);
        } else if (/^["']$/.test(match[0])) {
          state.push(3);
          state_patterns[3] = new RegExp(match[0], "g");
        } else if (match[0] === "/*") {
          state.push(4);
        } else if (/^[\])]$/.test(match[0]) && state.length > 0) {
          state.pop();
        } else if (/^(?:\s+|[~+>])$/.test(match[0])) {
          if (tokens.length > 0 && !whitespace_pattern.test(tokens[tokens.length - 1]) && state[state.length - 1] === 0) {
            tokens.push(" ");
          }
          if (state[state.length - 1] === 1 && tokens.length === 5 && tokens[2].charAt(tokens[2].length - 1) === "=") {
            tokens[4] = " " + tokens[4];
          }
          if (whitespace_pattern.test(match[0])) {
            continue;
          }
        }
        tokens.push(match[0]);
      } else {
        tokens[tokens.length - 1] += unmatched;
        if (not_escaped_pattern.test(tokens[tokens.length - 1])) {
          if (state[state.length - 1] === 4) {
            if (tokens.length < 2 || whitespace_pattern.test(tokens[tokens.length - 2])) {
              tokens.pop();
            } else {
              tokens[tokens.length - 1] = " ";
            }
            match[0] = "";
          }
          state.pop();
        }
        tokens[tokens.length - 1] += match[0];
      }
    } else {
      unmatched = sel.substr(next_match_idx);
      saveUnmatched();
      break;
    }
  }
  return tokens.join("").trim();
}

// node_modules/query-selector-shadow-dom/src/querySelectorDeep.js
function querySelectorDeep(selector, root = document, allElements = null) {
  return _querySelectorDeep(selector, false, root, allElements);
}
function _querySelectorDeep(selector, findMany, root, allElements = null) {
  selector = normalizeSelector(selector);
  let lightElement = root.querySelector(selector);
  if (document.head.createShadowRoot || document.head.attachShadow) {
    if (!findMany && lightElement) {
      return lightElement;
    }
    const selectionsToMake = splitByCharacterUnlessQuoted(selector, ",");
    return selectionsToMake.reduce((acc, minimalSelector) => {
      if (!findMany && acc) {
        return acc;
      }
      const splitSelector = splitByCharacterUnlessQuoted(minimalSelector.replace(/^\s+/g, "").replace(/\s*([>+~]+)\s*/g, "$1"), " ").filter((entry) => !!entry).map((entry) => splitByCharacterUnlessQuoted(entry, ">"));
      const possibleElementsIndex = splitSelector.length - 1;
      const lastSplitPart = splitSelector[possibleElementsIndex][splitSelector[possibleElementsIndex].length - 1];
      const possibleElements = collectAllElementsDeep(lastSplitPart, root, allElements);
      const findElements = findMatchingElement(splitSelector, possibleElementsIndex, root);
      if (findMany) {
        acc = acc.concat(possibleElements.filter(findElements));
        return acc;
      } else {
        acc = possibleElements.find(findElements);
        return acc || null;
      }
    }, findMany ? [] : null);
  } else {
    if (!findMany) {
      return lightElement;
    } else {
      return root.querySelectorAll(selector);
    }
  }
}
function findMatchingElement(splitSelector, possibleElementsIndex, root) {
  return (element) => {
    let position = possibleElementsIndex;
    let parent = element;
    let foundElement = false;
    while (parent && !isDocumentNode(parent)) {
      let foundMatch = true;
      if (splitSelector[position].length === 1) {
        foundMatch = parent.matches(splitSelector[position]);
      } else {
        const reversedParts = [].concat(splitSelector[position]).reverse();
        let newParent = parent;
        for (const part of reversedParts) {
          if (!newParent || !newParent.matches(part)) {
            foundMatch = false;
            break;
          }
          newParent = findParentOrHost(newParent, root);
        }
      }
      if (foundMatch && position === 0) {
        foundElement = true;
        break;
      }
      if (foundMatch) {
        position--;
      }
      parent = findParentOrHost(parent, root);
    }
    return foundElement;
  };
}
function splitByCharacterUnlessQuoted(selector, character) {
  return selector.match(/\\?.|^$/g).reduce((p8, c10) => {
    if (c10 === '"' && !p8.sQuote) {
      p8.quote ^= 1;
      p8.a[p8.a.length - 1] += c10;
    } else if (c10 === "'" && !p8.quote) {
      p8.sQuote ^= 1;
      p8.a[p8.a.length - 1] += c10;
    } else if (!p8.quote && !p8.sQuote && c10 === character) {
      p8.a.push("");
    } else {
      p8.a[p8.a.length - 1] += c10;
    }
    return p8;
  }, { a: [""] }).a;
}
function isDocumentNode(node) {
  return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_NODE;
}
function findParentOrHost(element, root) {
  const parentNode = element.parentNode;
  return parentNode && parentNode.host && parentNode.nodeType === 11 ? parentNode.host : parentNode === root ? null : parentNode;
}
function collectAllElementsDeep(selector = null, root, cachedElements = null) {
  let allElements = [];
  if (cachedElements) {
    allElements = cachedElements;
  } else {
    const findAllElements = function(nodes) {
      for (let i10 = 0; i10 < nodes.length; i10++) {
        const el = nodes[i10];
        allElements.push(el);
        if (el.shadowRoot) {
          findAllElements(el.shadowRoot.querySelectorAll("*"));
        }
      }
    };
    if (root.shadowRoot) {
      findAllElements(root.shadowRoot.querySelectorAll("*"));
    }
    findAllElements(root.querySelectorAll("*"));
  }
  return selector ? allElements.filter((el) => el.matches(selector)) : allElements;
}

// node_modules/dom-accessibility-api/dist/polyfills/array.from.mjs
var toStr = Object.prototype.toString;
function isCallable(fn) {
  return typeof fn === "function" || toStr.call(fn) === "[object Function]";
}
function toInteger(value) {
  var number = Number(value);
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || !isFinite(number)) {
    return number;
  }
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
function arrayFrom(arrayLike, mapFn) {
  var C2 = Array;
  var items = Object(arrayLike);
  if (arrayLike == null) {
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  }
  if (typeof mapFn !== "undefined") {
    if (!isCallable(mapFn)) {
      throw new TypeError("Array.from: when provided, the second argument must be a function");
    }
  }
  var len = toLength(items.length);
  var A2 = isCallable(C2) ? Object(new C2(len)) : new Array(len);
  var k2 = 0;
  var kValue;
  while (k2 < len) {
    kValue = items[k2];
    if (mapFn) {
      A2[k2] = mapFn(kValue, k2);
    } else {
      A2[k2] = kValue;
    }
    k2 += 1;
  }
  A2.length = len;
  return A2;
}

// node_modules/dom-accessibility-api/dist/polyfills/SetLike.mjs
function _typeof(o13) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o14) {
    return typeof o14;
  } : function(o14) {
    return o14 && "function" == typeof Symbol && o14.constructor === Symbol && o14 !== Symbol.prototype ? "symbol" : typeof o14;
  }, _typeof(o13);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i10 = 0; i10 < props.length; i10++) {
    var descriptor = props[i10];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t7) {
  var i10 = _toPrimitive(t7, "string");
  return "symbol" == _typeof(i10) ? i10 : i10 + "";
}
function _toPrimitive(t7, r9) {
  if ("object" != _typeof(t7) || !t7) return t7;
  var e15 = t7[Symbol.toPrimitive];
  if (void 0 !== e15) {
    var i10 = e15.call(t7, r9 || "default");
    if ("object" != _typeof(i10)) return i10;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r9 ? String : Number)(t7);
}
var SetLike = /* @__PURE__ */ (function() {
  function SetLike2() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck(this, SetLike2);
    _defineProperty(this, "items", void 0);
    this.items = items;
  }
  return _createClass(SetLike2, [{
    key: "add",
    value: function add(value) {
      if (this.has(value) === false) {
        this.items.push(value);
      }
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.items = [];
    }
  }, {
    key: "delete",
    value: function _delete(value) {
      var previousLength = this.items.length;
      this.items = this.items.filter(function(item) {
        return item !== value;
      });
      return previousLength !== this.items.length;
    }
  }, {
    key: "forEach",
    value: function forEach(callbackfn) {
      var _this = this;
      this.items.forEach(function(item) {
        callbackfn(item, item, _this);
      });
    }
  }, {
    key: "has",
    value: function has(value) {
      return this.items.indexOf(value) !== -1;
    }
  }, {
    key: "size",
    get: function get() {
      return this.items.length;
    }
  }]);
})();
var SetLike_default = typeof Set === "undefined" ? Set : SetLike;

// node_modules/dom-accessibility-api/dist/getRole.mjs
function getLocalName(element) {
  var _element$localName;
  return (
    // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
    (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
      // eslint-disable-next-line no-restricted-properties -- required for the fallback
      element.tagName.toLowerCase()
    )
  );
}
var localNameToRoleMappings = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  details: "group",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  // WARNING: Only with an accessible name
  form: "form",
  footer: "contentinfo",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  header: "banner",
  hr: "separator",
  html: "document",
  legend: "legend",
  li: "listitem",
  math: "math",
  main: "main",
  menu: "list",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  // WARNING: Only in certain context
  option: "option",
  output: "status",
  progress: "progressbar",
  // WARNING: Only with an accessible name
  section: "region",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  // WARNING: Only in certain context
  td: "cell",
  th: "columnheader",
  thead: "rowgroup",
  tr: "row",
  ul: "list"
};
var prohibitedAttributes = {
  caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
  insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  none: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
};
function hasGlobalAriaAttributes(element, role) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-description",
    "aria-describedby",
    "aria-details",
    // "disabled",
    "aria-dropeffect",
    // "errormessage",
    "aria-flowto",
    "aria-grabbed",
    // "haspopup",
    "aria-hidden",
    // "invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription"
  ].some(function(attributeName) {
    var _prohibitedAttributes;
    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole(element, implicitRole) {
  return hasGlobalAriaAttributes(element, implicitRole);
}
function getRole(element) {
  var explicitRole = getExplicitRole(element);
  if (explicitRole === null || presentationRoles.indexOf(explicitRole) !== -1) {
    var implicitRole = getImplicitRole(element);
    if (presentationRoles.indexOf(explicitRole || "") === -1 || ignorePresentationalRole(element, implicitRole || "")) {
      return implicitRole;
    }
  }
  return explicitRole;
}
function getImplicitRole(element) {
  var mappedByTag = localNameToRoleMappings[getLocalName(element)];
  if (mappedByTag !== void 0) {
    return mappedByTag;
  }
  switch (getLocalName(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href")) {
        return "link";
      }
      break;
    case "img":
      if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
        return "presentation";
      }
      return "img";
    case "input": {
      var _ref = element, type = _ref.type;
      switch (type) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          if (element.hasAttribute("list")) {
            return "combobox";
          }
          return "textbox";
        case "search":
          if (element.hasAttribute("list")) {
            return "combobox";
          }
          return "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      if (element.hasAttribute("multiple") || element.size > 1) {
        return "listbox";
      }
      return "combobox";
  }
  return null;
}
function getExplicitRole(element) {
  var role = element.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0) {
      return explicitRole;
    }
  }
  return null;
}

// node_modules/dom-accessibility-api/dist/util.mjs
var presentationRoles = ["presentation", "none"];
function isElement(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement(node) {
  return isElement(node) && getLocalName(node) === "caption";
}
function isHTMLInputElement(node) {
  return isElement(node) && getLocalName(node) === "input";
}
function isHTMLOptGroupElement(node) {
  return isElement(node) && getLocalName(node) === "optgroup";
}
function isHTMLSelectElement(node) {
  return isElement(node) && getLocalName(node) === "select";
}
function isHTMLTableElement(node) {
  return isElement(node) && getLocalName(node) === "table";
}
function isHTMLTextAreaElement(node) {
  return isElement(node) && getLocalName(node) === "textarea";
}
function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null) {
    throw new TypeError("no window available");
  }
  return defaultView;
}
function isHTMLFieldSetElement(node) {
  return isElement(node) && getLocalName(node) === "fieldset";
}
function isHTMLLegendElement(node) {
  return isElement(node) && getLocalName(node) === "legend";
}
function isHTMLSlotElement(node) {
  return isElement(node) && getLocalName(node) === "slot";
}
function isSVGElement(node) {
  return isElement(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement(node) {
  return isElement(node) && getLocalName(node) === "svg";
}
function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
function queryIdRefs(node, attributeName) {
  if (isElement(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" ");
    var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(
      function(element) {
        return element !== null;
      }
      // TODO: why does this not narrow?
    );
  }
  return [];
}
function hasAnyConcreteRoles(node, roles2) {
  if (isElement(node)) {
    return roles2.indexOf(getRole(node)) !== -1;
  }
  return false;
}

// node_modules/dom-accessibility-api/dist/accessible-name-and-description.mjs
function asFlatString(s7) {
  return s7.trim().replace(/\s\s+/g, " ");
}
function isHidden(node, getComputedStyleImplementation) {
  if (!isElement(node)) {
    return false;
  }
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
    return true;
  }
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}
function hasAbstractRole(node, role) {
  if (!isElement(node)) {
    return false;
  }
  switch (role) {
    case "range":
      return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}
function querySelectorAllSubtree(element, selectors) {
  var elements = arrayFrom(element.querySelectorAll(selectors));
  queryIdRefs(element, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
  });
  return elements;
}
function querySelectedOptions(listbox) {
  if (isHTMLSelectElement(listbox)) {
    return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
  }
  return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, presentationRoles);
}
function isNativeHostLanguageTextAlternativeElement(node) {
  return isHTMLTableCaptionElement(node);
}
function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
function getValueOfTextbox(element) {
  if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
    return element.value;
  }
  return element.textContent || "";
}
function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");
  if (/^["'].*["']$/.test(content)) {
    return content.slice(1, -1);
  }
  return "";
}
function isLabelableElement(element) {
  var localName = getLocalName(element);
  return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement(element) {
  if (isLabelableElement(element)) {
    return element;
  }
  var labelableElement = null;
  element.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement(childNode)) {
      var descendantLabelableElement = findLabelableElement(childNode);
      if (descendantLabelableElement !== null) {
        labelableElement = descendantLabelableElement;
      }
    }
  });
  return labelableElement;
}
function getControlOfLabel(label) {
  if (label.control !== void 0) {
    return label.control;
  }
  var htmlFor = label.getAttribute("for");
  if (htmlFor !== null) {
    return label.ownerDocument.getElementById(htmlFor);
  }
  return findLabelableElement(label);
}
function getLabels(element) {
  var labelsProperty = element.labels;
  if (labelsProperty === null) {
    return labelsProperty;
  }
  if (labelsProperty !== void 0) {
    return arrayFrom(labelsProperty);
  }
  if (!isLabelableElement(element)) {
    return null;
  }
  var document2 = element.ownerDocument;
  return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel(label) === element;
  });
}
function getSlotContents(slot) {
  var assignedNodes = slot.assignedNodes();
  if (assignedNodes.length === 0) {
    return arrayFrom(slot.childNodes);
  }
  return assignedNodes;
}
function computeTextAlternative(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var consultedNodes = new SetLike_default();
  var computedStyles = typeof Map === "undefined" ? void 0 : /* @__PURE__ */ new Map();
  var window2 = safeWindow(root);
  var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, uncachedGetComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
  var getComputedStyle = function getComputedStyle2(el, pseudoElement) {
    if (pseudoElement !== void 0) {
      throw new Error("use uncachedGetComputedStyle directly for pseudo elements");
    }
    if (computedStyles === void 0) {
      return uncachedGetComputedStyle(el);
    }
    var cachedStyles = computedStyles.get(el);
    if (cachedStyles) {
      return cachedStyles;
    }
    var style = uncachedGetComputedStyle(el, pseudoElement);
    computedStyles.set(el, style);
    return style;
  };
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = uncachedGetComputedStyle(node, "::before");
      var beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
    childNodes.forEach(function(child) {
      var result = computeTextAlternative2(child, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false,
        recursion: true
      });
      var display = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
      var separator = display !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    });
    if (isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = uncachedGetComputedStyle(node, "::after");
      var afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function useAttribute(element, attributeName) {
    var attribute = element.getAttributeNode(attributeName);
    if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
      consultedNodes.add(attribute);
      return attribute.value;
    }
    return null;
  }
  function computeTooltipAttributeValue(node) {
    if (!isElement(node)) {
      return null;
    }
    return useAttribute(node, "title");
  }
  function computeElementTextAlternative(node) {
    if (!isElement(node)) {
      return null;
    }
    if (isHTMLFieldSetElement(node)) {
      consultedNodes.add(node);
      var children = arrayFrom(node.childNodes);
      for (var i10 = 0; i10 < children.length; i10 += 1) {
        var child = children[i10];
        if (isHTMLLegendElement(child)) {
          return computeTextAlternative2(child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isHTMLTableElement(node)) {
      consultedNodes.add(node);
      var _children = arrayFrom(node.childNodes);
      for (var _i = 0; _i < _children.length; _i += 1) {
        var _child = _children[_i];
        if (isHTMLTableCaptionElement(_child)) {
          return computeTextAlternative2(_child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isSVGSVGElement(node)) {
      consultedNodes.add(node);
      var _children2 = arrayFrom(node.childNodes);
      for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
        var _child2 = _children2[_i2];
        if (isSVGTitleElement(_child2)) {
          return _child2.textContent;
        }
      }
      return null;
    } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null) {
        return nameFromAlt;
      }
    } else if (isHTMLOptGroupElement(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null) {
        return nameFromLabel;
      }
    }
    if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null) {
        return nameFromValue;
      }
      if (node.type === "submit") {
        return "Submit";
      }
      if (node.type === "reset") {
        return "Reset";
      }
    }
    var labels = getLabels(node);
    if (labels !== null && labels.length !== 0) {
      consultedNodes.add(node);
      return arrayFrom(labels).map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: true,
          isReferenced: false,
          recursion: true
        });
      }).filter(function(label) {
        return label.length > 0;
      }).join(" ");
    }
    if (isHTMLInputElement(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null) {
        return _nameFromAlt;
      }
      var nameFromTitle = useAttribute(node, "title");
      if (nameFromTitle !== null) {
        return nameFromTitle;
      }
      return "Submit Query";
    }
    if (hasAnyConcreteRoles(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, {
        isEmbeddedInLabel: false,
        isReferenced: false
      });
      if (nameFromSubTree !== "") {
        return nameFromSubTree;
      }
    }
    return null;
  }
  function computeTextAlternative2(current, context) {
    if (consultedNodes.has(current)) {
      return "";
    }
    if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
      consultedNodes.add(current);
      return "";
    }
    var labelAttributeNode = isElement(current) ? current.getAttributeNode("aria-labelledby") : null;
    var labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs(current, "aria-labelledby") : [];
    if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
      consultedNodes.add(labelAttributeNode);
      return labelElements.map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: true,
          // this isn't recursion as specified, otherwise we would skip
          // `aria-label` in
          // <input id="myself" aria-label="foo" aria-labelledby="myself"
          recursion: false
        });
      }).join(" ");
    }
    var skipToStep2E = context.recursion && isControl(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name") {
        consultedNodes.add(current);
        return ariaLabel;
      }
      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null) {
          consultedNodes.add(current);
          return elementTextAlternative;
        }
      }
    }
    if (hasAnyConcreteRoles(current, ["menu"])) {
      consultedNodes.add(current);
      return "";
    }
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);
        if (selectedOptions.length === 0) {
          return isHTMLInputElement(current) ? current.value : "";
        }
        return arrayFrom(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative2(selectedOption, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false,
            recursion: true
          });
        }).join(" ");
      }
      if (hasAbstractRole(current, "range")) {
        consultedNodes.add(current);
        if (current.hasAttribute("aria-valuetext")) {
          return current.getAttribute("aria-valuetext");
        }
        if (current.hasAttribute("aria-valuenow")) {
          return current.getAttribute("aria-valuenow");
        }
        return current.getAttribute("value") || "";
      }
      if (hasAnyConcreteRoles(current, ["textbox"])) {
        consultedNodes.add(current);
        return getValueOfTextbox(current);
      }
    }
    if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement(current)) {
      var accumulatedText2F = computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
      if (accumulatedText2F !== "") {
        consultedNodes.add(current);
        return accumulatedText2F;
      }
    }
    if (current.nodeType === current.TEXT_NODE) {
      consultedNodes.add(current);
      return current.textContent || "";
    }
    if (context.recursion) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
    }
    var tooltipAttributeValue = computeTooltipAttributeValue(current);
    if (tooltipAttributeValue !== null) {
      consultedNodes.add(current);
      return tooltipAttributeValue;
    }
    consultedNodes.add(current);
    return "";
  }
  return asFlatString(computeTextAlternative2(root, {
    isEmbeddedInLabel: false,
    // by spec computeAccessibleDescription starts with the referenced elements as roots
    isReferenced: compute === "description",
    recursion: false
  }));
}

// node_modules/dom-accessibility-api/dist/accessible-description.mjs
function _typeof2(o13) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o14) {
    return typeof o14;
  } : function(o14) {
    return o14 && "function" == typeof Symbol && o14.constructor === Symbol && o14 !== Symbol.prototype ? "symbol" : typeof o14;
  }, _typeof2(o13);
}
function ownKeys(e15, r9) {
  var t7 = Object.keys(e15);
  if (Object.getOwnPropertySymbols) {
    var o13 = Object.getOwnPropertySymbols(e15);
    r9 && (o13 = o13.filter(function(r10) {
      return Object.getOwnPropertyDescriptor(e15, r10).enumerable;
    })), t7.push.apply(t7, o13);
  }
  return t7;
}
function _objectSpread(e15) {
  for (var r9 = 1; r9 < arguments.length; r9++) {
    var t7 = null != arguments[r9] ? arguments[r9] : {};
    r9 % 2 ? ownKeys(Object(t7), true).forEach(function(r10) {
      _defineProperty2(e15, r10, t7[r10]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e15, Object.getOwnPropertyDescriptors(t7)) : ownKeys(Object(t7)).forEach(function(r10) {
      Object.defineProperty(e15, r10, Object.getOwnPropertyDescriptor(t7, r10));
    });
  }
  return e15;
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey2(t7) {
  var i10 = _toPrimitive2(t7, "string");
  return "symbol" == _typeof2(i10) ? i10 : i10 + "";
}
function _toPrimitive2(t7, r9) {
  if ("object" != _typeof2(t7) || !t7) return t7;
  var e15 = t7[Symbol.toPrimitive];
  if (void 0 !== e15) {
    var i10 = e15.call(t7, r9 || "default");
    if ("object" != _typeof2(i10)) return i10;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r9 ? String : Number)(t7);
}
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var description = queryIdRefs(root, "aria-describedby").map(function(element) {
    return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, {
      compute: "description"
    }));
  }).join(" ");
  if (description === "") {
    var ariaDescription = root.getAttribute("aria-description");
    description = ariaDescription === null ? "" : ariaDescription;
  }
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}

// node_modules/dom-accessibility-api/dist/accessible-name.mjs
function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "none", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (prohibitsNaming(root)) {
    return "";
  }
  return computeTextAlternative(root, options);
}

// src/screen-reader/screenReader.js
var import_aria_query = __toESM(require_lib(), 1);
function dispatchTextChanged(text) {
  const evt = new CustomEvent("screen-reader-text-changed", {
    detail: { text }
  });
  window.dispatchEvent(evt);
}
function getImplicitRole2(element) {
  if (!element || !element.tagName) return null;
  const tagName = element.tagName.toLowerCase();
  for (const [key, roleSet] of import_aria_query.elementRoles) {
    if (key.name === tagName) {
      if (key.attributes) {
        const matches = key.attributes.every((attr) => {
          if (attr.name === "type") {
            return element.getAttribute("type") === attr.value;
          }
          return element.hasAttribute(attr.name) === (attr.value !== void 0);
        });
        if (matches && roleSet.size > 0) {
          return Array.from(roleSet)[0];
        }
      } else if (roleSet.size > 0) {
        return Array.from(roleSet)[0];
      }
    }
  }
  return null;
}
var ScreenReader = class {
  constructor() {
    this.isRunning = false;
    this.voiceEnabled = false;
    this.textEnabled = false;
    this.storyDocument = null;
    this.lastAnnouncedElement = null;
    this.handleFocusIn = this.onFocusIn.bind(this);
    this.handleKeyDown = this.onKeyDown.bind(this);
    this.handleMutation = this.onMutation.bind(this);
    this.mutationObserver = null;
    this.liveRegionObserver = null;
  }
  /**
   * Compute the accessible role for an element
   * Priority: explicit role > implicit role from aria-query > fallback mapping
   */
  computeRole(element) {
    if (!element) return "element";
    const explicitRole = element.getAttribute("role");
    if (explicitRole) return explicitRole;
    const implicitRole = getImplicitRole2(element);
    if (implicitRole) return implicitRole;
    const tagName = element.tagName ? element.tagName.toLowerCase() : "";
    const fallbackMappings = {
      a: element.hasAttribute("href") ? "link" : "generic",
      button: "button",
      input: this.getInputRole(element),
      select: "combobox",
      textarea: "textbox",
      h1: "heading",
      h2: "heading",
      h3: "heading",
      h4: "heading",
      h5: "heading",
      h6: "heading",
      p: "paragraph",
      img: "img",
      nav: "navigation",
      main: "main",
      aside: "complementary",
      header: "banner",
      footer: "contentinfo",
      li: "listitem",
      ul: "list",
      ol: "list",
      table: "table",
      details: "group",
      summary: "button",
      label: "generic",
      section: element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby") ? "region" : "generic",
      article: "article",
      form: "form",
      dialog: "dialog"
    };
    return fallbackMappings[tagName] || "generic";
  }
  /**
   * Get role for input elements based on type
   */
  getInputRole(element) {
    const type = (element.getAttribute("type") || "text").toLowerCase();
    const inputRoles = {
      checkbox: "checkbox",
      radio: "radio",
      button: "button",
      submit: "button",
      reset: "button",
      image: "button",
      range: "slider",
      search: "searchbox",
      email: "textbox",
      tel: "textbox",
      url: "textbox",
      number: "spinbutton",
      password: "textbox",
      text: "textbox"
    };
    return inputRoles[type] || "textbox";
  }
  /**
   * Get accessible name using dom-accessibility-api (W3C AccName spec)
   */
  getAccessibleName(element) {
    if (!element) return "";
    try {
      return computeAccessibleName(element, {
        // Compute name even for elements that normally wouldn't have one
        computedStyleSupportsPseudoElements: true
      });
    } catch (e15) {
      if (element.getAttribute("aria-label")) {
        return element.getAttribute("aria-label");
      }
      if (element.shadowRoot) {
        const slot = element.shadowRoot.querySelector("slot");
        if (slot) {
          const nodes = slot.assignedNodes({ flatten: true });
          return nodes.map((n12) => n12.textContent || "").join("").trim();
        }
      }
      return (element.textContent || "").trim();
    }
  }
  /**
   * Get accessible description using dom-accessibility-api
   */
  getAccessibleDescription(element) {
    if (!element) return "";
    try {
      return computeAccessibleDescription(element);
    } catch (e15) {
      return "";
    }
  }
  /**
   * Generate announcement for an element based on its role and state
   */
  announceElement(element) {
    if (!element || element === this.lastAnnouncedElement) return;
    this.lastAnnouncedElement = element;
    const role = this.computeRole(element);
    const name = this.getAccessibleName(element);
    const description = this.getAccessibleDescription(element);
    let announcement = this.buildRoleAnnouncement(element, role, name);
    if (description) {
      announcement += ` ${description}`;
    }
    if (announcement) {
      this.say(announcement);
    }
  }
  /**
   * Build announcement string based on role
   */
  buildRoleAnnouncement(element, role, name) {
    const announcements = {
      link: () => {
        const visited = element.matches(":visited") ? "visited " : "";
        return `${visited}Link, ${name || "unlabeled"}. Press Enter to follow.`;
      },
      button: () => {
        const pressed = element.getAttribute("aria-pressed");
        const expanded = element.getAttribute("aria-expanded");
        let state = "";
        if (pressed === "true") state = ", pressed";
        else if (pressed === "false") state = ", not pressed";
        if (expanded === "true") state += ", expanded";
        else if (expanded === "false") state += ", collapsed";
        return `Button, ${name || "unlabeled"}${state}. Press Space or Enter to activate.`;
      },
      checkbox: () => {
        const checked = element.checked || element.getAttribute("aria-checked") === "true";
        const mixed = element.getAttribute("aria-checked") === "mixed";
        const state = mixed ? "partially checked" : checked ? "checked" : "not checked";
        return `Checkbox, ${name || "unlabeled"}, ${state}. Press Space to toggle.`;
      },
      radio: () => {
        const checked = element.checked || element.getAttribute("aria-checked") === "true";
        return `Radio button, ${name || "unlabeled"}, ${checked ? "selected" : "not selected"}.`;
      },
      switch: () => {
        const checked = element.getAttribute("aria-checked") === "true" || element.checked;
        return `Switch, ${name || "unlabeled"}, ${checked ? "on" : "off"}. Press Space to toggle.`;
      },
      textbox: () => {
        const value = element.value || "";
        const required = element.hasAttribute("required") || element.getAttribute("aria-required") === "true";
        const invalid = element.getAttribute("aria-invalid") === "true";
        const readonly = element.hasAttribute("readonly") || element.getAttribute("aria-readonly") === "true";
        let state = "";
        if (required) state += ", required";
        if (invalid) state += ", invalid entry";
        if (readonly) state += ", read only";
        return `Text field, ${name || "unlabeled"}${state}. ${value ? `Contains: ${value}` : "Empty."}`;
      },
      searchbox: () => {
        const value = element.value || "";
        return `Search field, ${name || "unlabeled"}. ${value ? `Contains: ${value}` : "Empty."}`;
      },
      combobox: () => {
        const expanded = element.getAttribute("aria-expanded") === "true";
        const value = element.value || element.options?.[element.selectedIndex]?.text || "";
        return `Combo box, ${name || "unlabeled"}, ${expanded ? "expanded" : "collapsed"}. ${value ? `Selected: ${value}` : ""} Press Space to open.`;
      },
      listbox: () => {
        const expanded = element.getAttribute("aria-expanded");
        let state = "";
        if (expanded === "true") state = ", expanded";
        else if (expanded === "false") state = ", collapsed";
        return `List box, ${name || "unlabeled"}${state}.`;
      },
      slider: () => {
        const value = element.value || element.getAttribute("aria-valuenow") || "";
        const min = element.min || element.getAttribute("aria-valuemin") || "0";
        const max = element.max || element.getAttribute("aria-valuemax") || "100";
        const valueText = element.getAttribute("aria-valuetext") || value;
        return `Slider, ${name || "unlabeled"}. Value: ${valueText}. Range: ${min} to ${max}.`;
      },
      spinbutton: () => {
        const value = element.value || element.getAttribute("aria-valuenow") || "";
        return `Spin button, ${name || "unlabeled"}. Value: ${value}. Use arrow keys to adjust.`;
      },
      heading: () => {
        const level = element.getAttribute("aria-level") || (element.tagName ? element.tagName.match(/h(\d)/i)?.[1] : null) || "2";
        return `Heading level ${level}, ${name}`;
      },
      img: () => {
        if (!name && element.getAttribute("alt") === "") {
          return "";
        }
        return `Image, ${name || "no description"}`;
      },
      figure: () => `Figure, ${name || ""}`,
      listitem: () => {
        const list = element.closest('ol, ul, [role="list"]');
        const items = list ? list.querySelectorAll('li, [role="listitem"]') : [];
        const index = Array.from(items).indexOf(element) + 1;
        const total = items.length;
        return `${name}. List item ${index} of ${total}.`;
      },
      option: () => {
        const selected = element.getAttribute("aria-selected") === "true" || element.selected;
        const list = element.closest('[role="listbox"], select');
        const options = list ? list.querySelectorAll('[role="option"], option') : [];
        const index = Array.from(options).indexOf(element) + 1;
        return `${name}${selected ? ", selected" : ""}. Option ${index} of ${options.length}.`;
      },
      menuitem: () => `Menu item, ${name}`,
      menuitemcheckbox: () => {
        const checked = element.getAttribute("aria-checked") === "true";
        return `Menu item checkbox, ${name}, ${checked ? "checked" : "not checked"}`;
      },
      menuitemradio: () => {
        const checked = element.getAttribute("aria-checked") === "true";
        return `Menu item radio, ${name}, ${checked ? "selected" : "not selected"}`;
      },
      tab: () => {
        const selected = element.getAttribute("aria-selected") === "true";
        const tablist = element.closest('[role="tablist"]');
        const tabs = tablist ? tablist.querySelectorAll('[role="tab"]') : [];
        const index = Array.from(tabs).indexOf(element) + 1;
        return `Tab, ${name}${selected ? ", selected" : ""}. ${index} of ${tabs.length}.`;
      },
      tabpanel: () => `Tab panel, ${name}`,
      navigation: () => `Navigation${name ? `, ${name}` : ""}`,
      main: () => `Main content${name ? `, ${name}` : ""}`,
      banner: () => `Banner${name ? `, ${name}` : ""}`,
      contentinfo: () => `Content info${name ? `, ${name}` : ""}`,
      complementary: () => `Complementary${name ? `, ${name}` : ""}`,
      region: () => `Region, ${name}`,
      article: () => `Article${name ? `, ${name}` : ""}`,
      form: () => `Form${name ? `, ${name}` : ""}`,
      search: () => `Search${name ? `, ${name}` : ""}`,
      dialog: () => {
        const modal = element.getAttribute("aria-modal") === "true";
        return `${modal ? "Modal " : ""}Dialog, ${name || "unlabeled"}`;
      },
      alertdialog: () => `Alert dialog, ${name || "unlabeled"}`,
      alert: () => `Alert: ${name}`,
      status: () => `Status: ${name}`,
      log: () => `Log: ${name}`,
      marquee: () => `Marquee: ${name}`,
      timer: () => `Timer: ${name}`,
      progressbar: () => {
        const value = element.getAttribute("aria-valuenow");
        const valueText = element.getAttribute("aria-valuetext");
        if (valueText) return `Progress bar, ${name}. ${valueText}`;
        if (value) return `Progress bar, ${name}. ${value} percent`;
        return `Progress bar, ${name}. Loading...`;
      },
      meter: () => {
        const value = element.getAttribute("aria-valuenow") || element.value;
        return `Meter, ${name}. Value: ${value}`;
      },
      tooltip: () => `Tooltip: ${name}`,
      tree: () => `Tree, ${name}`,
      treeitem: () => {
        const expanded = element.getAttribute("aria-expanded");
        const selected = element.getAttribute("aria-selected") === "true";
        let state = selected ? ", selected" : "";
        if (expanded === "true") state += ", expanded";
        else if (expanded === "false") state += ", collapsed";
        return `Tree item, ${name}${state}`;
      },
      grid: () => `Grid, ${name}`,
      gridcell: () => name,
      row: () => {
        const index = element.getAttribute("aria-rowindex");
        return index ? `Row ${index}, ${name}` : name;
      },
      rowheader: () => `Row header, ${name}`,
      columnheader: () => `Column header, ${name}`,
      cell: () => name,
      table: () => {
        const rows = element.querySelectorAll('tr, [role="row"]').length;
        const cols = element.querySelector('tr, [role="row"]')?.children.length || 0;
        return `Table, ${name || "unlabeled"}. ${rows} rows, ${cols} columns.`;
      },
      list: () => {
        const items = element.querySelectorAll('li, [role="listitem"]').length;
        return `List${name ? `, ${name}` : ""}. ${items} items.`;
      },
      menu: () => `Menu, ${name}`,
      menubar: () => `Menu bar, ${name}`,
      toolbar: () => `Toolbar, ${name}`,
      group: () => name ? `Group, ${name}` : "",
      separator: () => "Separator",
      generic: () => name || ""
    };
    const announceFn = announcements[role];
    return announceFn ? announceFn() : name || `${role}`;
  }
  /**
   * Add visual focus indicator styles to the document
   */
  addStyles() {
    if (!this.storyDocument || !this.storyDocument.head) return;
    this.removeStyles();
    const styleElement = this.storyDocument.createElement("style");
    styleElement.id = "screen-reader-addon-styles";
    styleElement.textContent = `
      [data-sr-current] {
        outline: 3px solid #005fcc !important;
        outline-offset: 2px !important;
      }
    `;
    this.storyDocument.head.appendChild(styleElement);
  }
  /**
   * Remove visual focus indicator styles
   */
  removeStyles() {
    if (!this.storyDocument) return;
    const styles = this.storyDocument.getElementById("screen-reader-addon-styles");
    if (styles) styles.remove();
  }
  /**
   * Speak/display the announcement
   */
  say(speech) {
    if (!speech) return;
    if (this.voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(speech);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
    if (this.textEnabled) {
      dispatchTextChanged(speech);
    }
  }
  /**
   * Update visual focus indicator
   */
  updateFocusIndicator(element) {
    if (!element) return;
    const prev = querySelectorDeep("[data-sr-current]", this.storyDocument);
    if (prev) prev.removeAttribute("data-sr-current");
    if (element.setAttribute) {
      element.setAttribute("data-sr-current", "true");
    }
  }
  /**
   * Find the deeply focused element, traversing into shadow DOMs
   */
  getDeepActiveElement(root = this.storyDocument) {
    let active = root.activeElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }
  /**
   * Handle focus changes - main way we track navigation
   * 
   * Real screen readers announce the actual focused element (often inside shadow DOM).
   * We traverse into shadow DOM to find the real focused element, just like browsers do.
   */
  onFocusIn(evt) {
    if (!this.isRunning) return;
    const { target } = evt;
    if (!target) return;
    const deepActive = this.getDeepActiveElement();
    const deepName = deepActive ? this.getAccessibleName(deepActive) : "";
    const deepRole = deepActive ? this.computeRole(deepActive) : "generic";
    const elementToAnnounce = deepName && deepRole !== "generic" ? deepActive : target;
    this.updateFocusIndicator(elementToAnnounce);
    this.announceElement(elementToAnnounce);
  }
  /**
   * Handle keyboard events for additional navigation feedback
   */
  onKeyDown(evt) {
    if (!this.isRunning) return;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(evt.key) !== -1) {
      setTimeout(() => {
        this.checkActiveDescendant(evt.target);
      }, 10);
    }
  }
  /**
   * Check for aria-activedescendant changes (used by menus, listboxes, etc.)
   */
  checkActiveDescendant(element) {
    if (!element) return;
    const activeId = element.getAttribute("aria-activedescendant");
    if (activeId) {
      const activeElement = this.storyDocument.getElementById(activeId);
      if (activeElement) {
        this.updateFocusIndicator(activeElement);
        this.announceElement(activeElement);
        return;
      }
    }
    if (element.shadowRoot) {
      const activeInShadow = element.shadowRoot.querySelector(
        '[aria-selected="true"], [aria-current="true"], :focus'
      );
      if (activeInShadow) {
        this.updateFocusIndicator(activeInShadow);
        this.announceElement(activeInShadow);
      }
    }
  }
  /**
   * Watch for DOM mutations to catch dynamic changes
   */
  onMutation(mutations) {
    if (!this.isRunning) return;
    const watchedAttrs = [
      "aria-selected",
      "aria-checked",
      "aria-expanded",
      "aria-activedescendant",
      "aria-pressed",
      "aria-invalid"
    ];
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        const { target } = mutation;
        if (watchedAttrs.indexOf(mutation.attributeName) !== -1) {
          if (mutation.attributeName === "aria-activedescendant") {
            this.checkActiveDescendant(target);
          } else if (target.getAttribute(mutation.attributeName) === "true" && mutation.attributeName === "aria-selected") {
            this.updateFocusIndicator(target);
            this.announceElement(target);
          }
        }
      }
    });
  }
  /**
   * Watch for live region updates (aria-live)
   */
  onLiveRegionMutation(mutations) {
    if (!this.isRunning) return;
    mutations.forEach((mutation) => {
      const target = mutation.target;
      const liveRegion = target.closest('[aria-live], [role="alert"], [role="status"], [role="log"]');
      if (!liveRegion) return;
      const politeness = liveRegion.getAttribute("aria-live") || (liveRegion.getAttribute("role") === "alert" ? "assertive" : "polite");
      let announcement = "";
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.textContent) {
            announcement += node.textContent.trim() + " ";
          }
        });
      } else if (mutation.type === "characterData") {
        announcement = target.textContent || "";
      }
      if (announcement.trim()) {
        if (politeness === "assertive") {
          speechSynthesis.cancel();
        }
        this.say(announcement.trim());
      }
    });
  }
  /**
   * Set up mutation observer for aria attribute changes
   */
  setupMutationObserver() {
    if (!this.storyDocument || !this.storyDocument.body) return;
    this.mutationObserver = new MutationObserver(this.handleMutation);
    this.mutationObserver.observe(this.storyDocument.body, {
      attributes: true,
      subtree: true,
      attributeFilter: [
        "aria-selected",
        "aria-checked",
        "aria-expanded",
        "aria-activedescendant",
        "aria-pressed",
        "aria-invalid"
      ]
    });
  }
  /**
   * Set up observer for live regions
   */
  setupLiveRegionObserver() {
    if (!this.storyDocument || !this.storyDocument.body) return;
    this.liveRegionObserver = new MutationObserver(this.onLiveRegionMutation.bind(this));
    this.liveRegionObserver.observe(this.storyDocument.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
  /**
   * Start the screen reader
   */
  start(iframe) {
    let targetIframe = iframe;
    if (!targetIframe) {
      targetIframe = document.getElementById("storybook-preview-iframe") || document.querySelector('iframe[data-is-storybook="true"]') || document.querySelector("iframe");
    }
    if (!targetIframe || !targetIframe.contentWindow || !targetIframe.contentWindow.document || !targetIframe.contentWindow.document.body) {
      console.warn("[Screen Reader] Waiting for iframe...");
      setTimeout(() => {
        this.start(targetIframe);
      }, 200);
      return;
    }
    this.stop();
    this.storyDocument = targetIframe.contentWindow.document;
    if (this.storyDocument.readyState === "loading") {
      this.storyDocument.addEventListener("DOMContentLoaded", () => {
        this.start(targetIframe);
      });
      return;
    }
    this.addStyles();
    this.storyDocument.addEventListener("focusin", this.handleFocusIn, true);
    this.storyDocument.addEventListener("keydown", this.handleKeyDown, true);
    this.setupMutationObserver();
    this.setupLiveRegionObserver();
    this.isRunning = true;
    this.lastAnnouncedElement = null;
    this.say("Screen reader enabled. Use Tab or arrow keys to navigate.");
    const currentFocus = this.storyDocument.activeElement;
    if (currentFocus && currentFocus !== this.storyDocument.body) {
      this.updateFocusIndicator(currentFocus);
      this.announceElement(currentFocus);
    }
  }
  /**
   * Stop the screen reader
   */
  stop() {
    if (!this.isRunning && !this.storyDocument) return;
    if (this.storyDocument) {
      this.storyDocument.removeEventListener("focusin", this.handleFocusIn, true);
      this.storyDocument.removeEventListener("keydown", this.handleKeyDown, true);
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    if (this.liveRegionObserver) {
      this.liveRegionObserver.disconnect();
      this.liveRegionObserver = null;
    }
    if (this.storyDocument) {
      const current = querySelectorDeep("[data-sr-current]", this.storyDocument);
      if (current) current.removeAttribute("data-sr-current");
      this.removeStyles();
    }
    this.isRunning = false;
    this.lastAnnouncedElement = null;
    if (this.voiceEnabled || this.textEnabled) {
      this.say("Screen reader disabled");
    }
  }
};

// src/components/screen-reader-panel.js
var ScreenReaderPanel = class extends i4 {
  static properties = {
    voice: { type: Boolean },
    text: { type: Boolean },
    isActive: { type: Boolean },
    screenReaderText: { type: String }
  };
  static styles = i`
    :host {
      display: block;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      gap: 8px;
    }

    .toggle-label {
      font-size: 14px;
      color: var(--spectrum-global-color-gray-800, #4b4b4b);
    }

    .text-output {
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid var(--spectrum-global-color-gray-300, #e0e0e0);
      padding: 12px;
      margin-top: 12px;
      background: var(--spectrum-global-color-gray-100, #f5f5f5);
      min-height: 60px;
      max-height: 200px;
      overflow-y: auto;
    }

    .status-text {
      font-size: 12px;
      color: var(--spectrum-global-color-gray-600, #6e6e6e);
      margin: 12px 0 0 0;
      font-style: italic;
    }

    .placeholder {
      color: var(--spectrum-global-color-gray-500, #959595);
    }
  `;
  constructor() {
    super();
    this.voice = false;
    this.text = false;
    this.isActive = false;
    this.screenReaderText = "";
    this.screenReader = null;
    this.channel = null;
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleStoryChange = this.handleStoryChange.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("screen-reader-text-changed", this.handleTextChange);
    this.channel = addons.getChannel();
    this.channel.on(STORY_CHANGED, this.handleStoryChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("screen-reader-text-changed", this.handleTextChange);
    if (this.channel) {
      this.channel.off(STORY_CHANGED, this.handleStoryChange);
    }
    this.stopScreenReader();
  }
  handleTextChange(evt) {
    this.screenReaderText = evt.detail.text;
  }
  handleStoryChange() {
    if (this.isActive && this.screenReader) {
      this.screenReader.stop();
      this.screenReader = null;
      setTimeout(() => {
        if (this.voice || this.text) {
          this.startScreenReader();
        }
      }, 500);
    }
  }
  handleVoiceToggle(ev) {
    this.voice = ev.target.checked;
    this.updateScreenReader();
  }
  handleTextToggle(ev) {
    this.text = ev.target.checked;
    this.updateScreenReader();
  }
  findStorybookIframe() {
    return document.getElementById("storybook-preview-iframe") || document.querySelector('iframe[data-is-storybook="true"]') || document.querySelector('iframe[title*="storybook"]') || document.querySelector("iframe");
  }
  startScreenReader() {
    const iframe = this.findStorybookIframe();
    if (!iframe) {
      console.error("[Screen Reader Addon] Cannot find preview iframe");
      return;
    }
    this.screenReader = new ScreenReader();
    this.screenReader.voiceEnabled = this.voice;
    this.screenReader.textEnabled = this.text;
    this.screenReader.start(iframe);
    this.isActive = true;
  }
  stopScreenReader() {
    if (this.screenReader) {
      this.screenReader.stop();
      this.screenReader = null;
    }
    this.isActive = false;
    this.screenReaderText = "";
  }
  updateScreenReader() {
    const shouldBeActive = this.voice || this.text;
    if (shouldBeActive && !this.isActive) {
      this.startScreenReader();
    } else if (!shouldBeActive && this.isActive) {
      this.stopScreenReader();
    } else if (shouldBeActive && this.screenReader) {
      this.screenReader.voiceEnabled = this.voice;
      this.screenReader.textEnabled = this.text;
    }
  }
  render() {
    return b2`
      <sp-theme scale="medium" color="light" system="spectrum-two">
        <div class="toggle-row">
          <sp-switch
            ?checked=${this.voice}
            @change=${this.handleVoiceToggle}
          >
            Voice Reader
          </sp-switch>
        </div>

        <div class="toggle-row">
          <sp-switch
            ?checked=${this.text}
            @change=${this.handleTextToggle}
          >
            Text Reader
          </sp-switch>
        </div>

        ${this.text ? b2`
              <div class="text-output">
                ${this.screenReaderText || b2`<span class="placeholder">Navigate to hear announcements...</span>`}
              </div>
            ` : ""}
        ${this.isActive ? b2`
              <p class="status-text">
                Use Tab or arrow keys to navigate. Focus changes will be announced.
              </p>
            ` : ""}
      </sp-theme>
    `;
  }
};
customElements.define("screen-reader-panel", ScreenReaderPanel);

// src/register.js
var ScreenReaderPanelReact = o({
  tagName: "screen-reader-panel",
  elementClass: ScreenReaderPanel,
  react: React
});
var ADDON_ID = "screenreader";
var PANEL_ID = `${ADDON_ID}/panel`;
addons2.register(ADDON_ID, () => {
  addons2.add(PANEL_ID, {
    type: types.PANEL,
    title: "Screen Reader",
    render: ({ active }) => /* @__PURE__ */ React.createElement(AddonPanel, { active }, /* @__PURE__ */ React.createElement(ScreenReaderPanelReact, null))
  });
});
/*! Bundled license information:

@lit/react/create-component.js:
lit-html/directives/if-defined.js:
lit-html/directives/class-map.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
lit-html/async-directive.js:
lit-html/directives/until.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/private-async-helpers.js:
lit-html/directives/when.js:
lit-html/directives/join.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
