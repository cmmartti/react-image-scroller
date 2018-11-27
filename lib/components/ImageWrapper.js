"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _emotion = require("emotion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    &:hover::after {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        z-index: 2;\n        background-color: hsla(0, 0%, 21%, 0.15);\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    flex: 0 0 auto;\n    max-height: 100%;\n    max-width: 100%;\n    height: 100%;\n    width: auto;\n    position: relative;\n\n    &:first-child {\n        border-radius: 0.4em 0 0 0.4em;\n    }\n    &:last-child {\n        border-radius: 0 0.4em 0.4em 0;\n    }\n\n    img {\n        height: 100%;\n        width: auto;\n        max-height: 100%;\n        max-width: 100%;\n        object-fit: contain;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var base = (0, _emotion.css)(_templateObject());
var nextOrPrevious = (0, _emotion.css)(_templateObject2());

var ImageWrapper = function ImageWrapper(props) {
  var innerProps = props.innerProps,
      children = props.children,
      index = props.index,
      isCurrent = props.isCurrent,
      isNext = props.isNext,
      isPrevious = props.isPrevious;
  return _react.default.createElement("div", _extends({
    className: (0, _emotion.cx)(base, _defineProperty({}, nextOrPrevious, isNext || isPrevious))
  }, innerProps), children);
};

var _default = ImageWrapper;
exports.default = _default;