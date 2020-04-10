"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Selector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _antd = require("antd");

require("antd/dist/antd.css");

var _lodash = require("lodash");

var _styles = require("./styles.scss");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
function Selector(_ref) {
  var index = _ref.index,
      listData = _ref.listData,
      title = _ref.title,
      handleChangeValue = _ref.handleChangeValue,
      value = _ref.value,
      customLayout = _ref.customLayout,
      componentLevels = _ref.componentLevels;

  var padding = (0, _lodash.get)(componentLevels, "padding");
  var displayLabel = (0, _lodash.get)(componentLevels, "displayLabel");
  var width = (0, _lodash.get)(componentLevels, "width");
  var size = (0, _lodash.get)(componentLevels, "size");
  var styleSheetLayout = {
    flexDirection: customLayout === "vertical" ? "column" : "row",
    alignItems: customLayout !== "vertical" ? "center" : "flex-start"
  };
  var styleSheetLabel = {
    display: displayLabel === false ? "none" : "inline",
    paddingBottom: padding && customLayout === "vertical" ? "" + padding : "4px",
    paddingRight: padding && customLayout !== "vertical" ? "" + padding : "4px"
  };
  return _react2.default.createElement(
    "div",
    { className: _styles2.default.selector, style: _extends({}, styleSheetLayout) },
    _react2.default.createElement(
      "span",
      { className: _styles2.default.title, style: _extends({}, styleSheetLabel) },
      title
    ),
    _react2.default.createElement(
      _antd.Select,
      {
        showSearch: true,
        style: { width: width ? width : "150px" },
        placeholder: "Select " + (title || "") + " ",
        optionFilterProp: "children",
        onSelect: function onSelect(e) {
          return handleChangeValue(index, { name: (0, _lodash.get)((0, _lodash.find)(listData, ["code", "" + e]), "name"), code: e });
        },
        value: value,
        size: size
      },
      (listData || []).map(function (element, position) {
        return _react2.default.createElement(
          Option,
          { key: position, value: (0, _lodash.get)(element, "code") },
          (0, _lodash.get)(element, "name")
        );
      })
    )
  );
}
module.exports = exports["default"];