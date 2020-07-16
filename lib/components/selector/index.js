"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Selector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _styles = require("./styles.scss");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Selector(_ref) {
  var index = _ref.index,
      listData = _ref.listData,
      title = _ref.title,
      handleChangeValue = _ref.handleChangeValue,
      value = _ref.value,
      customLayout = _ref.customLayout,
      componentLevels = _ref.componentLevels,
      getDataOptions = _ref.getDataOptions,
      getDefaultOption = _ref.getDefaultOption;
  var customLabel = componentLevels.customLabel,
      customSelector = componentLevels.customSelector;

  var isVertical = customLayout === "vertical";
  var styleSheetLayout = {
    flexDirection: isVertical ? "column" : "row",
    alignItems: !isVertical ? "center" : "flex-start"
  };
  var attrs = {
    onChange: function onChange(e) {
      return handleChangeValue(index, { name: (0, _lodash.get)((0, _lodash.find)(listData, ["code", "" + e.target.value]), "name"), code: e.target.value });
    },
    value: value || "",
    style: _extends({}, customSelector)
  };

  return _react2.default.createElement(
    "div",
    { className: _styles2.default.selector, style: _extends({}, styleSheetLayout) },
    _react2.default.createElement(
      "label",
      { className: _styles2.default.title, style: _extends({}, customLabel) },
      title || ""
    ),
    _react2.default.createElement(
      "select",
      attrs,
      !(0, _lodash.isUndefined)(customSelector) && !(0, _lodash.isUndefined)((0, _lodash.get)(customSelector, "placeholder")) ? getDefaultOption((0, _lodash.get)(customSelector, "placeholder"), true) : getDefaultOption(title, false),
      getDataOptions(listData)
    )
  );
}
module.exports = exports["default"];