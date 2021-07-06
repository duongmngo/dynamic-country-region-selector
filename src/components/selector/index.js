import React from "react";
import { get, find, isUndefined } from "lodash";
import styles from "./styles.module.scss";
export default function Selector({
  index,
  listData,
  title,
  handleChangeValue,
  value,
  customLayout,
  componentLevels,
  getDataOptions,
  getDefaultOption
}) {
  const { customLabel, customSelector } = componentLevels;
  const isVertical = customLayout === "vertical";
  const styleSheetLayout = {
    flexDirection: isVertical ? "column" : "row",
    alignItems: !isVertical ? "center" : "flex-start"
  };
  const attrs = {
    onChange: e => handleChangeValue(index, { name: get(find(listData, ["code", `${e.target.value}`]), "name"), code: e.target.value }),
    value: value || "",
    style: { ...customSelector }
  };

  return (
    <div className={styles.selector} style={{ ...styleSheetLayout }}>
      <label className={styles.title} style={{ ...customLabel }}>
        {title || ""}
      </label>
      <select {...attrs}>
        {!isUndefined(customSelector) && !isUndefined(get(customSelector, "placeholder"))
          ? getDefaultOption(get(customSelector, "placeholder"), true)
          : getDefaultOption(title, false)}
        {getDataOptions(listData)}
      </select>
    </div>
  );
}
