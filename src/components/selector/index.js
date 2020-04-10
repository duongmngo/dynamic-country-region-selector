import React from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import { get, find } from "lodash";
import styles from "./styles.scss";
const { Option } = Select;
export default function Selector({ index, listData, title, handleChangeValue, value, customLayout, componentLevels }) {
  const padding = get(componentLevels, "padding");
  const displayLabel = get(componentLevels, "displayLabel");
  const width = get(componentLevels, "width");
  const size = get(componentLevels, "size");
  const styleSheetLayout = {
    flexDirection: customLayout === "vertical" ? "column" : "row",
    alignItems: customLayout !== "vertical" ? "center" : "flex-start"
  };
  const styleSheetLabel = {
    display: displayLabel === false ? "none" : "inline",
    paddingBottom: padding && customLayout === "vertical" ? `${padding}` : "4px",
    paddingRight: padding && customLayout !== "vertical" ? `${padding}` : "4px"
  };
  return (
    <div className={styles.selector} style={{ ...styleSheetLayout }}>
      <span className={styles.title} style={{ ...styleSheetLabel }}>
        {title}
      </span>
      <Select
        showSearch
        style={{ width: width ? width : "150px" }}
        placeholder={`Select ${title || ""} `}
        optionFilterProp="children"
        onSelect={e => handleChangeValue(index, { name: get(find(listData, ["code", `${e}`]), "name"), code: e })}
        value={value}
        size={size}
      >
        {(listData || []).map((element, position) => {
          return (
            <Option key={position} value={get(element, "code")}>
              {get(element, "name")}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
