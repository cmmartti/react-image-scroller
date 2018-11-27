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
  var data = _taggedTemplateLiteral(["\n    height: 25em;\n    background: hsla(0, 0%, 50%, 0.2);\n    border-radius: 0.4rem;\n\n    max-height: 100vw;\n    overflow-y: hidden;\n    position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var className = (0, _emotion.css)(_templateObject());

var ImageScrollerContainer = function ImageScrollerContainer(props) {
  var innerRef = props.innerRef,
      innerProps = props.innerProps,
      children = props.children;
  return _react.default.createElement("div", _extends({
    ref: innerRef
  }, innerProps, {
    className: className
  }), children);
};

var _default = ImageScrollerContainer;
exports.default = _default;