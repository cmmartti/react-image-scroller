"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _emotion = require("emotion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    overflow-x: scroll;\n    overflow-y: hidden;\n    height: 100%;\n    ::-webkit-scrollbar {\n        display: none;\n    }\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// -webkit-overflow-scrolling: touch;
var className = (0, _emotion.css)(_templateObject());

var ScrollContainer = function ScrollContainer(props) {
  var innerRef = props.innerRef,
      innerProps = props.innerProps,
      children = props.children;
  return _react.default.createElement("div", _extends({
    ref: innerRef,
    className: className
  }, innerProps), children);
};

var _default = ScrollContainer;
exports.default = _default;