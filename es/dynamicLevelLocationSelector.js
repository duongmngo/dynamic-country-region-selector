import _regeneratorRuntime from "babel-runtime/regenerator";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, lazy } from "react";
import PropTypes from "prop-types";
import styles from "./country-region.module.scss";
import { get, isUndefined, isEqual, size, find, isEmpty } from "lodash";
import Selector from "./components/selector";
import Country from "./data/country";
import wait from "./utils/wait";
import detectLocationFromIp from "./utils/detect-country-code-from-ip";
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
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(location) {
        var isExist, data;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isExist = Country.indexOf(location) !== -1;

                if (isExist) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", {});

              case 3:
                _context.next = 5;
                return import("./data/" + location + ".json");

              case 5:
                data = _context.sent;
                return _context.abrupt("return", get(data, "default") || {});

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

      var labelLevels = get(CountryRegionData, "settings.labelLevels");
      var value = _this.props.value;

      var oldData = get(value, "[" + index + "]");
      var isDiff = isEqual(oldData, selectedValue);
      if (get(selectedValue, "code") === "") {
        value = value.filter(function (element, position) {
          return position < index;
        });
        onChange({ value: value, labelLevels: labelLevels });
        return;
      }
      if (isUndefined(oldData)) {
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

    _this.getDefaultOption = function (placeholder, isCustomPlaceholder) {
      var _this$props = _this.props,
          showDefaultOption = _this$props.showDefaultOption,
          defaultOptionLabel = _this$props.defaultOptionLabel;

      if (!showDefaultOption) {
        return null;
      }
      return React.createElement(
        "option",
        { value: "", key: "default", hidden: true },
        !isCustomPlaceholder ? "" + defaultOptionLabel + (placeholder || "") : "" + placeholder
      );
    };

    _this.getDataOptions = function (listData) {
      return (listData || []).map(function (element, position) {
        return React.createElement(
          "option",
          { key: position, value: get(element, "code") },
          get(element, "name")
        );
      });
    };

    _this.getDataNextLevel = function (data, index) {
      var value = _this.props.value;

      if (size(value) < index) {
        return [];
      }
      var i = 0;
      var tamp = data;
      while (i < index) {
        tamp = get(find(tamp, { code: "" + value[i].code }), "nextLevels");
        i++;
      }
      return tamp;
    };

    return _this;
  }

  DynamicLevelLocationSelector.prototype.componentDidMount = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _props, countryCode, IP_STACK_KEY, CountryRegionData, ip, res;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _props = this.props, countryCode = _props.countryCode, IP_STACK_KEY = _props.IP_STACK_KEY;
              CountryRegionData = {};

              if (!isEmpty(countryCode)) {
                _context2.next = 21;
                break;
              }

              _context2.prev = 3;
              _context2.next = 6;
              return publicIp.v4();

            case 6:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 11;
                break;
              }

              _context2.next = 10;
              return publicIp.v6();

            case 10:
              _context2.t0 = _context2.sent;

            case 11:
              ip = _context2.t0;
              _context2.next = 14;
              return Promise.race([detectLocationFromIp(ip, IP_STACK_KEY), wait(1000)]);

            case 14:
              res = _context2.sent;

              countryCode = get(res, "countryCode");
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t1 = _context2["catch"](3);
              return _context2.abrupt("return", _context2.t1);

            case 21:
              _context2.next = 23;
              return this.getCountryRegionData(countryCode.toUpperCase());

            case 23:
              CountryRegionData = _context2.sent;

              this.setState({
                CountryRegionData: CountryRegionData,
                isGettingInitialData: true,
                countryCode: countryCode
              });

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 18]]);
    }));

    function componentDidMount() {
      return _ref2.apply(this, arguments);
    }

    return componentDidMount;
  }();

  DynamicLevelLocationSelector.prototype.componentWillReceiveProps = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(nextProps) {
      var CountryRegionData;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(nextProps.countryCode !== this.state.countryCode && !isEmpty(nextProps.countryCode))) {
                _context3.next = 5;
                break;
              }

              _context3.next = 3;
              return this.getCountryRegionData(nextProps.countryCode.toUpperCase());

            case 3:
              CountryRegionData = _context3.sent;

              this.setState({
                CountryRegionData: CountryRegionData,
                countryCode: nextProps.countryCode
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function componentWillReceiveProps(_x2) {
      return _ref3.apply(this, arguments);
    }

    return componentWillReceiveProps;
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

    var labelLevels = get(CountryRegionData, "settings.labelLevels");
    var data = get(CountryRegionData, "data");
    customLayout = customLayout === "horizontal" ? customLayout : "vertical";
    var styleSheet = {
      flexDirection: customLayout === "vertical" ? "column" : "row",
      justifyContent: "space-evenly"
    };

    return React.createElement(
      "div",
      { className: styles.countryRegion + " country-region", style: _extends({}, styleSheet) },
      isGettingInitialData ? size(labelLevels) > 0 ? (labelLevels || []).map(function (element, index) {
        var attrs = {
          index: index,
          listData: index === 0 ? data : _this3.getDataNextLevel(data, index),
          title: element,
          handleChangeValue: _this3.handleChangeValue,
          key: index,
          value: get(value[index], "code"),
          customLayout: customLayout,
          componentLevels: get(componentLevels, "level" + index),
          getDataOptions: _this3.getDataOptions,
          getDefaultOption: _this3.getDefaultOption
        };
        return React.createElement(Selector, attrs);
      }) : React.createElement(Selector, { getDataOptions: this.getDataOptions, getDefaultOption: this.getDefaultOption, listData: [], componentLevels: {} }) : React.createElement("div", { className: styles.loader })
    );
  };

  return DynamicLevelLocationSelector;
}(Component);

DynamicLevelLocationSelector.propTypes = process.env.NODE_ENV !== "production" ? {
  countryCode: PropTypes.string,
  onChange: PropTypes.func,
  customLayout: PropTypes.string,
  componentLevels: PropTypes.object,
  showDefaultOption: PropTypes.bool,
  defaultOptionLabel: PropTypes.string,
  IP_STACK_KEY: PropTypes.string,
  value: PropTypes.array
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

export default DynamicLevelLocationSelector;