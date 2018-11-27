"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ImageScroller =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ImageScroller, _React$Component);

  // ----------------------
  // Lifecycle
  function ImageScroller(props) {
    var _this;

    _classCallCheck(this, ImageScroller);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageScroller).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      previous: null,
      current: [],
      next: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mainRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollContainerRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cacheComponents", function (components) {
      _this.components = (0, _components.defaultComponents)({
        components: components
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyPress", function (event) {
      if (_this.mainRef.current.contains(event.target)) {
        switch (event.key) {
          // case 'ArrowDown':
          case 'ArrowRight':
            event.preventDefault();

            _this.next();

            break;
          // case 'ArrowUp':

          case 'ArrowLeft':
            event.preventDefault();

            _this.previous();

            break;

          default:
            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideScrollbarCounter", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideScrollbar", function () {
      var scrollContainer = _this.scrollContainerRef.current;
      var main = _this.mainRef.current;

      if (scrollContainer && main) {
        var offset = main.clientHeight - scrollContainer.clientHeight; // Webkit measures initial offset as 0, so try up to three times, 10 ms apart

        _this.hideScrollbarCounter += 1;

        if (offset === 0 && _this.hideScrollbarCounter <= 3) {
          setTimeout(_this.hideScrollbar, 10);
        } else {
          scrollContainer.style.height = "calc(100% + ".concat(offset, "px)");
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createIntersectionObserver", function () {
      // IntersectionObservers only report what's _changed_, so keep a list
      _this.intersectionRatios = new Map();
      var observer = new IntersectionObserver(_this.observerCallback, {
        root: _this.scrollContainerRef.current,
        threshold: [0, 0.98]
      });
      Array.from(_this.scrollContainerRef.current.children).forEach(function (image) {
        observer.observe(image);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "observerCallback", function (entries) {
      entries.forEach(function (entry) {
        _this.intersectionRatios.set(parseInt(entry.target.getAttribute('data-image-id'), 10), entry.intersectionRatio);
      });

      function getSummary(items) {
        var previous = null;
        var current = [];
        var next = null;
        var prevItem;
        items.forEach(function (item) {
          // There may be any number of FULLY_VISIBLE items.
          if (item.status === 'FULLY_VISIBLE') {
            current.push(item.index);
          } // There can only be two simultaneous PARTIALLY_VISIBLE items.
          // If they are adjacent, there can be no FULLY_VISIBLE items.
          // So these two items are 'previous' and 'next'.
          else if (item.status === 'PARTIALLY_VISIBLE' && prevItem && prevItem.status === 'PARTIALLY_VISIBLE') {
              previous = prevItem.index;
              next = item.index;
            } // Keep pushing 'previous' forward each iteration until one of
            // the above cases is true.
            else if (current.length === 0 && next === null) {
                previous = item.index;
              } // The item following the final FULLY_VISIBLE item is 'next'.
              else if (current.length > 0 && next === null) {
                  next = item.index;
                } // Save this item to refer back to in the next iteration.


          prevItem = item;
        });
        return {
          previous: previous,
          current: current,
          next: next
        };
      }

      var items = Array.from(_this.scrollContainerRef.current.children);
      var statusList = items.map(function (item) {
        var imageIndex = item.getAttribute('data-image-id');
        imageIndex = parseInt(imageIndex, 10);

        var ratio = _this.intersectionRatios.get(imageIndex);

        var status;

        if (ratio > 0.98) {
          status = 'FULLY_VISIBLE';
        } else if (ratio === 0) {
          status = 'NOT_VISIBLE';
        } else status = 'PARTIALLY_VISIBLE';

        return {
          index: imageIndex,
          status: status
        };
      });

      _this.setState(getSummary(statusList));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTo", function (imageIndex) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (imageIndex === undefined || imageIndex === null) {
        return;
      }

      var _options$position = options.position,
          position = _options$position === void 0 ? 'centre' : _options$position;
      var scrollContainer = _this.scrollContainerRef.current;
      var main = _this.mainRef.current;
      var element = scrollContainer.children[imageIndex]; // Always centre the image

      if (position === 'centre') {
        var margin = (main.offsetWidth - element.offsetWidth) / 2;
        scrollContainer.scrollTo({
          top: 0,
          left: element.offsetLeft - margin,
          behavior: 'smooth'
        });
      } // Fit in as many images as possible
      else if (position === 'nearest') {
          var fit = function fit(initialWidth, step) {
            var width = 0;

            while (true) {
              var adjacentElement = scrollContainer.children[imageIndex + step];
              var adjacentWidth = void 0;

              if (adjacentElement) {
                adjacentWidth = adjacentElement.offsetWidth;
              } else {
                break;
              }

              if (initialWidth + width + adjacentWidth < main.offsetWidth) {
                width += adjacentWidth;
              } else {
                break;
              }

              step += step;
            }

            return width;
          };

          var step;

          if (_this.state.current.length > 0) {
            step = imageIndex > _this.state.current[0] ? -1 : 1;
          } else {
            step = imageIndex > _this.state.previous ? -1 : 1;
          } // Look back and ahead to see if any other images will fit too


          var backWidth = fit(element.offsetWidth, step);
          var aheadWidth = fit(element.offsetWidth + backWidth, -step);
          var leftWidth;

          if (step === 1) {
            leftWidth = aheadWidth;
          } else {
            leftWidth = backWidth;
          }

          var width = element.offsetWidth + backWidth + aheadWidth;

          var _margin = (main.offsetWidth - width) / 2;

          scrollContainer.scrollTo({
            top: 0,
            left: element.offsetLeft - leftWidth - _margin,
            behavior: 'smooth'
          });
        }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "next", function () {
      _this.scrollTo(_this.state.next, {
        position: 'nearest'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "previous", function () {
      _this.scrollTo(_this.state.previous, {
        position: 'nearest'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (imageIndex) {
      return function (event) {
        event.preventDefault();

        if (_this.state.current.includes(imageIndex)) {
          _this.scrollTo(imageIndex, {
            position: 'centre'
          });
        } else {
          _this.scrollTo(imageIndex, {
            position: 'nearest'
          });
        }
      };
    });

    _this.cacheComponents(props.components);

    return _this;
  }

  _createClass(ImageScroller, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.hideScrollbar();
      this.createIntersectionObserver();
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          previous = _this$state.previous,
          current = _this$state.current,
          next = _this$state.next;

      var images = _react.default.Children.toArray(this.props.children);

      var _this$components = this.components,
          IndexButton = _this$components.IndexButton,
          IndexButtonsContainer = _this$components.IndexButtonsContainer,
          ImageWrapper = _this$components.ImageWrapper,
          ImageScrollerContainer = _this$components.ImageScrollerContainer,
          NavButton = _this$components.NavButton,
          ScrollContainer = _this$components.ScrollContainer;
      return _react.default.createElement(ImageScrollerContainer, {
        innerRef: this.mainRef,
        innerProps: {
          tabIndex: 0
        }
      }, _react.default.createElement(NavButton, {
        isPrevious: true,
        isDisabled: previous === null,
        innerProps: {
          onClick: this.previous
        }
      }), _react.default.createElement(IndexButtonsContainer, null, images.map(function (_, imageIndex) {
        return _react.default.createElement(IndexButton, {
          key: imageIndex,
          index: imageIndex + 1,
          isCurrent: current.includes(imageIndex),
          isNext: next === imageIndex,
          isPrevious: previous === imageIndex,
          innerProps: {
            onClick: function onClick() {
              return _this2.scrollTo(imageIndex);
            }
          }
        });
      })), _react.default.createElement(ScrollContainer, {
        innerRef: this.scrollContainerRef
      }, images.map(function (image, imageIndex) {
        return _react.default.createElement(ImageWrapper, {
          key: imageIndex,
          index: imageIndex + 1,
          isCurrent: current.includes(imageIndex),
          isNext: next === imageIndex,
          isPrevious: previous === imageIndex,
          innerProps: {
            'data-image-id': imageIndex,
            onClick: _this2.onClick(imageIndex)
          }
        }, image);
      })), _react.default.createElement(NavButton, {
        isNext: true,
        isDisabled: next === null,
        innerProps: {
          onClick: this.next
        }
      }));
    }
  }]);

  return ImageScroller;
}(_react.default.Component);

exports.default = ImageScroller;

_defineProperty(ImageScroller, "defaultProps", {
  components: {}
});