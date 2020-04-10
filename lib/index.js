"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("./styles.scss");

var _styles2 = _interopRequireDefault(_styles);

var _antd = require("antd");

var _lodash = require("lodash");

require("./overwrite.css");

require("antd/dist/antd.css");

var _selector = require("./components/selector");

var _selector2 = _interopRequireDefault(_selector);

var _country = require("./data/country");

var _country2 = _interopRequireDefault(_country);

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var antIcon = _react2.default.createElement(_icons.LoadingOutlined, { style: { fontSize: 24 }, spin: true });
var publicIp = require("public-ip");

var DynamicLevelLocationSelector = function (_Component) {
  _inherits(DynamicLevelLocationSelector, _Component);

  function DynamicLevelLocationSelector(props) {
    var _this2 = this;

    _classCallCheck(this, DynamicLevelLocationSelector);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      CountryRegionData: {},
      valueSelected: [],
      isGettingInitialData: false
    };
    _this.detectLocation = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var ip, info;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return publicIp.v4();

            case 2:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return publicIp.v6();

            case 6:
              _context.t0 = _context.sent;

            case 7:
              ip = _context.t0;
              info = fetch(" http://api.ipstack.com/" + ip + "?access_key=e2d17540fe96dff711309fe8f1cd3589").then(function (response) {
                return response.json();
              });
              return _context.abrupt("return", info);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.getCountryRegionData = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(location) {
        var isExist, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isExist = _country2.default.indexOf(location) === -1;

                if (!isExist) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", []);

              case 3:
                _context2.next = 5;
                return import("./data/" + location + ".json");

              case 5:
                data = _context2.sent;
                return _context2.abrupt("return", (0, _lodash.get)(data, "default") || []);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.handleChangeValue = function (index, value) {
      var onChange = _this.props.onChange;
      var labelLevels = _this.state.labelLevels;
      var valueSelected = _this.state.valueSelected;

      var oldData = (0, _lodash.get)(valueSelected, "[" + index + "]");
      var isDiff = (0, _lodash.isEqual)(oldData, value);
      if ((0, _lodash.isUndefined)(oldData)) {
        valueSelected[index] = value;
        _this.setState({
          valueSelected: [].concat(valueSelected)
        });
        onChange({ value: valueSelected, labelLevels: labelLevels });
        return;
      }
      if (!isDiff) {
        valueSelected[index] = value;
        valueSelected = valueSelected.filter(function (element, position) {
          return position <= index;
        });
        _this.setState({
          valueSelected: valueSelected
        });
        onChange({ value: valueSelected, labelLevels: labelLevels });
        return;
      }
    };

    _this.getDataNextLevel = function (data, index) {
      var valueSelected = _this.state.valueSelected;

      if ((0, _lodash.size)(valueSelected) < index) {
        return [];
      }
      var i = 0;
      var tamp = data;
      while (i < index) {
        tamp = (0, _lodash.get)((0, _lodash.find)(tamp, { code: "" + valueSelected[i].code }), "nextLevels");
        i++;
      }
      return tamp;
    };

    return _this;
  }

  DynamicLevelLocationSelector.prototype.componentDidMount = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var countryCode, CountryRegionData, infoLocation;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              countryCode = this.props.countryCode;
              CountryRegionData = {};

              if (!(countryCode === "" || !countryCode)) {
                _context3.next = 7;
                break;
              }

              _context3.next = 5;
              return this.detectLocation();

            case 5:
              infoLocation = _context3.sent;

              countryCode = (0, _lodash.get)(infoLocation, "country_code");

            case 7:
              _context3.next = 9;
              return this.getCountryRegionData(countryCode);

            case 9:
              CountryRegionData = _context3.sent;

              this.setState({
                CountryRegionData: CountryRegionData,
                isGettingInitialData: true,
                labelLevels: (0, _lodash.get)(CountryRegionData, "settings.labelLevels")
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function componentDidMount() {
      return _ref3.apply(this, arguments);
    }

    return componentDidMount;
  }();

  DynamicLevelLocationSelector.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        customLayout = _props.customLayout,
        componentLevels = _props.componentLevels;
    var _state = this.state,
        CountryRegionData = _state.CountryRegionData,
        valueSelected = _state.valueSelected,
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
      { className: _styles2.default.countryRegion + " country-region", style: _extends({}, styleSheet) },
      isGettingInitialData ? (0, _lodash.size)(labelLevels) > 0 ? (labelLevels || []).map(function (element, index) {
        var attrs = {
          index: index,
          listData: index === 0 ? data : _this3.getDataNextLevel(data, index),
          title: element,
          handleChangeValue: _this3.handleChangeValue,
          key: index,
          value: (0, _lodash.get)(valueSelected[index], "code"),
          customLayout: customLayout,
          componentLevels: (0, _lodash.get)(componentLevels, "level" + index)
        };
        return _react2.default.createElement(_selector2.default, attrs);
      }) : _react2.default.createElement(_selector2.default, null) : _react2.default.createElement(_antd.Spin, { indicator: antIcon })
    );
  };

  return DynamicLevelLocationSelector;
}(_react.Component);

DynamicLevelLocationSelector.propTypes = process.env.NODE_ENV !== "production" ? {
  valueCountry: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  customLayout: _propTypes2.default.string,
  componentLevels: _propTypes2.default.object
} : {};

DynamicLevelLocationSelector.defaultProps = {
  countryCode: "",
  onChange: function onChange() {},
  customLayout: "horizontal",
  componentLevels: {}
};

exports.default = DynamicLevelLocationSelector;
module.exports = exports["default"];