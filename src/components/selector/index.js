import React from "react";
import { get, find, omit } from "lodash";
import styles from "./styles.scss";
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
  const isVertical = customLayout === "vertical";
  const padding = get(componentLevels, "padding");
  const displayLabel = get(componentLevels, "displayLabel");
  const overWriteSelect = omit(componentLevels, ["padding", "displayLabel"]);
  const styleSheetLayout = {
    flexDirection: isVertical ? "column" : "row",
    alignItems: !isVertical ? "center" : "flex-start"
  };
  const styleSheetLabel = {
    display: displayLabel === false ? "none" : "inline",
    paddingBottom: padding && isVertical ? `${padding}` : isVertical ? "4px" : "0px",
    paddingRight: padding && !isVertical ? `${padding}` : !isVertical ? "4px" : "0px"
  };
  const attrs = {
    onChange: e => handleChangeValue(index, { name: get(find(listData, ["code", `${e.target.value}`]), "name"), code: e.target.value }),
    value: value || "",
    style: { ...overWriteSelect }
  };
  return (
    <div className={styles.selector} style={{ ...styleSheetLayout }}>
      <label className={styles.title} style={{ ...styleSheetLabel }}>
        {title || ""}
      </label>
      <select {...attrs}>
        {getDefaultOption(title)}
        {getDataOptions(listData)}
      </select>
    </div>
  );
}
