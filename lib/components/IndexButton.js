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

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    background: #555;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    background: black;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    pointer-events: auto;\n    border: none;\n    color: white;\n    background: hsla(0, 0%, 21%, 0.6);\n    margin: 0 0.5em;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var base = (0, _emotion.css)(_templateObject());
var current = (0, _emotion.css)(_templateObject2());
var nextOrPrevious = (0, _emotion.css)(_templateObject3());

var IndexButton = function IndexButton(props) {
  var innerProps = props.innerProps,
      index = props.index,
      isCurrent = props.isCurrent,
      isNext = props.isNext,
      isPrevious = props.isPrevious;
  return _react.default.createElement("button", _extends({
    className: (0, _emotion.cx)(base, _defineProperty({}, current, isCurrent), _defineProperty({}, nextOrPrevious, isNext || isPrevious))
  }, innerProps), index);
};

var _default = IndexButton;
exports.default = _default;