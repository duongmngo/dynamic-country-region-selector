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

    _this.detectLocationIpStack = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ip) {
        var IP_STACK_KEY, info;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                IP_STACK_KEY = _this.props.IP_STACK_KEY;
                info = fetch(" http://api.ipstack.com/" + ip + "?access_key=" + IP_STACK_KEY).then(function (res) {
                  return res.json();
                });
                return _context.abrupt("return", info);

              case 3:
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

    _this.detectLocationExtremeIp = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ip) {
        var info;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                info = fetch("https://extreme-ip-lookup.com/json/" + ip).then(function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(res) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return res.json();

                          case 2:
                            res = _context2.sent;
                            return _context2.abrupt("return", res.status === "fail" ? Promise.reject(res) : Promise.resolve(res));

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                return _context3.abrupt("return", info);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.detectLocationIpApi = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var info;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              info = fetch("http://ip-api.com/json").then(function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(res) {
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return res.json();

                        case 2:
                          res = _context4.sent;
                          return _context4.abrupt("return", res.status === "fail" ? Promise.reject(res) : Promise.resolve(res));

                        case 4:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                }));

                return function (_x4) {
                  return _ref5.apply(this, arguments);
                };
              }());
              return _context5.abrupt("return", info);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this2);
    }));

    _this.getCountryRegionData = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(location) {
        var isExist, data;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                isExist = _country2.default.indexOf(location) === -1;

                if (!isExist) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", []);

              case 3:
                _context6.next = 5;
                return import("./data/" + location + ".json");

              case 5:
                data = _context6.sent;
                return _context6.abrupt("return", (0, _lodash.get)(data, "default") || []);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x5) {
        return _ref6.apply(this, arguments);
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
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var _this3 = this;

      var countryCode, CountryRegionData, ip, infoLocation;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              countryCode = this.props.countryCode;
              CountryRegionData = {};
              _context7.next = 4;
              return publicIp.v4();

            case 4:
              _context7.t0 = _context7.sent;

              if (_context7.t0) {
                _context7.next = 9;
                break;
              }

              _context7.next = 8;
              return publicIp.v6();

            case 8:
              _context7.t0 = _context7.sent;

            case 9:
              ip = _context7.t0;

              if (!(countryCode === "" || !countryCode)) {
                _context7.next = 15;
                break;
              }

              _context7.next = 13;
              return this.detectLocationIpApi().then(function (value) {
                return value;
              }).catch(function () {
                return _this3.detectLocationExtremeIp(ip);
              }).then(function (value) {
                return value;
              }).catch(function () {
                return _this3.detectLocationIpStack(ip);
              }).then(function (value) {
                return value;
              });

            case 13:
              infoLocation = _context7.sent;

              countryCode = (0, _lodash.get)(infoLocation, "country_code") || (0, _lodash.get)(infoLocation, "countryCode");

            case 15:
              _context7.next = 17;
              return this.getCountryRegionData(countryCode);

            case 17:
              CountryRegionData = _context7.sent;

              this.setState({
                CountryRegionData: CountryRegionData,
                isGettingInitialData: true
              });

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function componentDidMount() {
      return _ref7.apply(this, arguments);
    }

    return componentDidMount;
  }();

  DynamicLevelLocationSelector.prototype.render = function render() {
    var _this4 = this;

    var _props = this.props,
        customLayout = _props.customLayout,
        componentLevels = _props.componentLevels,
        value = _props.value;
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
          listData: index === 0 ? data : _this4.getDataNextLevel(data, index),
          title: element,
          handleChangeValue: _this4.handleChangeValue,
          key: index,
          value: (0, _lodash.get)(value[index], "code"),
          customLayout: customLayout,
          componentLevels: (0, _lodash.get)(componentLevels, "level" + index),
          getDataOptions: _this4.getDataOptions,
          getDefaultOption: _this4.getDefaultOption
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