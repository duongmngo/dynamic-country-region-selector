"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _countryRegion = require("./country-region.scss");

var _countryRegion2 = _interopRequireDefault(_countryRegion);

var _lodash = require("lodash");

var _selector = require("./components/selector");

var _selector2 = _interopRequireDefault(_selector);

var _country = require("./data/country");

var _country2 = _interopRequireDefault(_country);

var _wait = require("./utils/wait");

var _wait2 = _interopRequireDefault(_wait);

var _detectCountryCodeFromIp = require("./utils/detect-country-code-from-ip");

var _detectCountryCodeFromIp2 = _interopRequireDefault(_detectCountryCodeFromIp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var publicIp = require("public-ip");

var DynamicLevelLocationSelector = function (_Component) {
  _inherits(DynamicLevelLocationSelector, _Component);

  function DynamicLevelLocationSelector(props) {
    var _this2 = this;

    _classCallCheck(this, DynamicLevelLocationSelector);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      CountryRegionData: {},
      value: [],
      isGettingInitialData: false
    };

    _this.getCountryRegionData = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(location) {
        var isExist, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isExist = _country2.default.indexOf(location) === -1;

                if (!isExist) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", []);

              case 3:
                _context.next = 5;
                return import("./data/" + location + ".json");

              case 5:
                data = _context.sent;
                return _context.abrupt("return", (0, _lodash.get)(data, "default") || []);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.handleChangeValue = function (index, selectedValue) {
      var onChange = _this.props.onChange;
      var CountryRegionData = _this.state.CountryRegionData;

      var labelLevels = (0, _lodash.get)(CountryRegionData, "settings.labelLevels");
      var value = _this.props.value;

      var oldData = (0, _lodash.get)(value, "[" + index + "]");
      var isDiff = (0, _lodash.isEqual)(oldData, selectedValue);
      if ((0, _lodash.get)(selectedValue, "code") === "") {
        value = value.filter(function (element, position) {
          return position < index;
        });
        onChange({ value: value, labelLevels: labelLevels });
        return;
      }
      if ((0, _lodash.isUndefined)(oldData)) {
        value[index] = selectedValue;
        onChange({ value: value, labelLevels: labelLevels });
        return;
      }
      if (!isDiff) {
        value[index] = selectedValue;
        value = value.filter(function (element, position) {
          return position <= index;
        });
        onChange({ value: value, labelLevels: labelLevels });
        return;
      }
    };

    _this.getDefaultOption = function (title) {
      var _this$props = _this.props,
          showDefaultOption = _this$props.showDefaultOption,
          defaultOptionLabel = _this$props.defaultOptionLabel;

      if (!showDefaultOption) {
        return null;
      }
      return _react2.default.createElement(
        "option",
        { value: "", key: "default" },
        "" + defaultOptionLabel + (title || "")
      );
    };

    _this.getDataOptions = function (listData) {
      return (listData || []).map(function (element, position) {
        return _react2.default.createElement(
          "option",
          { key: position, value: (0, _lodash.get)(element, "code") },
          (0, _lodash.get)(element, "name")
        );
      });
    };

    _this.getDataNextLevel = function (data, index) {
      var value = _this.props.value;

      if ((0, _lodash.size)(value) < index) {
        return [];
      }
      var i = 0;
      var tamp = data;
      while (i < index) {
        tamp = (0, _lodash.get)((0, _lodash.find)(tamp, { code: "" + value[i].code }), "nextLevels");
        i++;
      }
      return tamp;
    };

    return _this;
  }

  DynamicLevelLocationSelector.prototype.componentDidMount = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _props, countryCode, IP_STACK_KEY, CountryRegionData, ip, res;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _props = this.props, countryCode = _props.countryCode, IP_STACK_KEY = _props.IP_STACK_KEY;
              CountryRegionData = {};
              _context2.next = 4;
              return publicIp.v4();

            case 4:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 9;
                break;
              }

              _context2.next = 8;
              return publicIp.v6();

            case 8:
              _context2.t0 = _context2.sent;

            case 9:
              ip = _context2.t0;

              if (!(countryCode === "" || !countryCode)) {
                _context2.next = 21;
                break;
              }

              _context2.prev = 11;
              _context2.next = 14;
              return Promise.race([(0, _detectCountryCodeFromIp2.default)(ip, IP_STACK_KEY), (0, _wait2.default)(1000)]);

            case 14:
              res = _context2.sent;

              countryCode = (0, _lodash.get)(res, "countryCode");
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t1 = _context2["catch"](11);
              return _context2.abrupt("return", _context2.t1);

            case 21:
              _context2.next = 23;
              return this.getCountryRegionData(countryCode);

            case 23:
              CountryRegionData = _context2.sent;

              this.setState({
                CountryRegionData: CountryRegionData,
                isGettingInitialData: true
              });

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[11, 18]]);
    }));

    function componentDidMount() {
      return _ref2.apply(this, arguments);
    }

    return componentDidMount;
  }();

  DynamicLevelLocationSelector.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        customLayout = _props2.customLayout,
        componentLevels = _props2.componentLevels,
        value = _props2.value;
    var _state = this.state,
        CountryRegionData = _state.CountryRegionData,
        isGettingInitialData = _state.isGettingInitialData;

    var labelLevels = (0, _lodash.get)(CountryRegionData, "settings.labelLevels");
    var data = (0, _lodash.get)(CountryRegionData, "data");
    customLayout = customLayout === "horizontal" ? customLayout : "vertical";
    var styleSheet = {
      flexDirection: customLayout === "vertical" ? "column" : "row",
      justifyContent: "space-evenly"
    };
    return _react2.default.createElement(
      "div",
      { className: _countryRegion2.default.countryRegion + " country-region", style: _extends({}, styleSheet) },
      isGettingInitialData ? (0, _lodash.size)(labelLevels) > 0 ? (labelLevels || []).map(function (element, index) {
        var attrs = {
          index: index,
          listData: index === 0 ? data : _this3.getDataNextLevel(data, index),
          title: element,
          handleChangeValue: _this3.handleChangeValue,
          key: index,
          value: (0, _lodash.get)(value[index], "code"),
          customLayout: customLayout,
          componentLevels: (0, _lodash.get)(componentLevels, "level" + index),
          getDataOptions: _this3.getDataOptions,
          getDefaultOption: _this3.getDefaultOption
        };
        return _react2.default.createElement(_selector2.default, attrs);
      }) : _react2.default.createElement(_selector2.default, { getDataOptions: this.getDataOptions, getDefaultOption: this.getDefaultOption, listData: [] }) : _react2.default.createElement("div", { className: _countryRegion2.default.loader })
    );
  };

  return DynamicLevelLocationSelector;
}(_react.Component);

DynamicLevelLocationSelector.propTypes = process.env.NODE_ENV !== "production" ? {
  countryCode: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  customLayout: _propTypes2.default.string,
  componentLevels: _propTypes2.default.object,
  showDefaultOption: _propTypes2.default.bool,
  defaultOptionLabel: _propTypes2.default.string,
  IP_STACK_KEY: _propTypes2.default.string,
  value: _propTypes2.default.array
} : {};

DynamicLevelLocationSelector.defaultProps = {
  countryCode: "",
  onChange: function onChange() {},
  customLayout: "horizontal",
  componentLevels: { level0: {}, level1: {}, level2: {} },
  showDefaultOption: true,
  defaultOptionLabel: "Select ",
  IP_STACK_KEY: "",
  value: []
};

exports.default = DynamicLevelLocationSelector;
module.exports = exports["default"];