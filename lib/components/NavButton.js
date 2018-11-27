"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _emotion = require("emotion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    ", "\n    right: 0;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    ", "\n    left: 0;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    background: hsla(0, 0%, 21%, 0.6);\n    color: white;\n    height: 4em;\n    top: calc(50% - 2em);\n    position: absolute;\n    border: none;\n    z-index: 2;\n\n    &[disabled] {\n        background: hsla(0, 0%, 21%, 0.3);\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var base = (0, _emotion.css)(_templateObject());
var left = (0, _emotion.css)(_templateObject2(), base);
var right = (0, _emotion.css)(_templateObject3(), base);

var NavButton = function NavButton(props) {
  var innerProps = props.innerProps,
      isPrevious = props.isPrevious,
      isNext = props.isNext,
      isDisabled = props.isDisabled;
  return _react.default.createElement("button", _extends({
    disabled: isDisabled,
    className: isPrevious ? left : right
  }, innerProps), isPrevious && '←', isNext && '→');
};

var _default = NavButton;
exports.default = _default;