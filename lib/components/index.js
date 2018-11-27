"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultComponents = void 0;

var _IndexButton = _interopRequireDefault(require("./IndexButton"));

var _IndexButtonsContainer = _interopRequireDefault(require("./IndexButtonsContainer"));

var _ImageScrollerContainer = _interopRequireDefault(require("./ImageScrollerContainer"));

var _ImageWrapper = _interopRequireDefault(require("./ImageWrapper"));

var _NavButton = _interopRequireDefault(require("./NavButton"));

var _ScrollContainer = _interopRequireDefault(require("./ScrollContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var components = {
  IndexButton: _IndexButton.default,
  IndexButtonsContainer: _IndexButtonsContainer.default,
  ImageWrapper: _ImageWrapper.default,
  ImageScrollerContainer: _ImageScrollerContainer.default,
  NavButton: _NavButton.default,
  ScrollContainer: _ScrollContainer.default
};

var defaultComponents = function defaultComponents(props) {
  return _objectSpread({}, components, props.components);
};

exports.defaultComponents = defaultComponents;