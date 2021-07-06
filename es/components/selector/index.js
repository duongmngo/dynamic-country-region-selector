var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import { get, find, isUndefined } from "lodash";
import styles from "./styles.module.scss";
export default function Selector(_ref) {
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
      return handleChangeValue(index, { name: get(find(listData, ["code", "" + e.target.value]), "name"), code: e.target.value });
    },
    value: value || "",
    style: _extends({}, customSelector)
  };

  return React.createElement(
    "div",
    { className: styles.selector, style: _extends({}, styleSheetLayout) },
    React.createElement(
      "label",
      { className: styles.title, style: _extends({}, customLabel) },
      title || ""
    ),
    React.createElement(
      "select",
      attrs,
      !isUndefined(customSelector) && !isUndefined(get(customSelector, "placeholder")) ? getDefaultOption(get(customSelector, "placeholder"), true) : getDefaultOption(title, false),
      getDataOptions(listData)
    )
  );
}