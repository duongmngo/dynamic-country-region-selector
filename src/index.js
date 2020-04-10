import React, { Component, lazy } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Spin } from "antd";
import { get, isUndefined, isEqual, size, find } from "lodash";
import "./overwrite.css";
import "antd/dist/antd.css";
import Selector from "./components/selector";
import Country from "./data/country";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const publicIp = require("public-ip");
class DynamicLevelLocationSelector extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    CountryRegionData: {},
    valueSelected: [],
    isGettingInitialData: false
  };

  async componentDidMount() {
    let { countryCode } = this.props;
    let CountryRegionData = {};
    if (countryCode === "" || !countryCode) {
      const infoLocation = await this.detectLocation();
      countryCode = get(infoLocation, "country_code");
    }
    CountryRegionData = await this.getCountryRegionData(countryCode);
    this.setState({
      CountryRegionData,
      isGettingInitialData: true,
      labelLevels: get(CountryRegionData, "settings.labelLevels")
    });
  }

  detectLocation = async () => {
    const ip = (await publicIp.v4()) || (await publicIp.v6());
    const info = fetch(` http://api.ipstack.com/${ip}?access_key=e2d17540fe96dff711309fe8f1cd3589`).then(response => response.json());
    return info;
  };

  getCountryRegionData = async location => {
    const isExist = Country.indexOf(location) === -1;
    if (isExist) {
      return [];
    }
    const data = await import(`./data/${location}.json`);
    return get(data, "default") || [];
  };

  handleChangeValue = (index, value) => {
    const { onChange } = this.props;
    const { labelLevels } = this.state;
    let { valueSelected } = this.state;
    const oldData = get(valueSelected, `[${index}]`);
    const isDiff = isEqual(oldData, value);
    if (isUndefined(oldData)) {
      valueSelected[index] = value;
      this.setState({
        valueSelected: [...valueSelected]
      });
      onChange({ value: valueSelected, labelLevels });
      return;
    }
    if (!isDiff) {
      valueSelected[index] = value;
      valueSelected = valueSelected.filter((element, position) => position <= index);
      this.setState({
        valueSelected
      });
      onChange({ value: valueSelected, labelLevels });
      return;
    }
  };

  getDataNextLevel = (data, index) => {
    let { valueSelected } = this.state;
    if (size(valueSelected) < index) {
      return [];
    }
    let i = 0;
    let tamp = data;
    while (i < index) {
      tamp = get(find(tamp, { code: `${valueSelected[i].code}` }), "nextLevels");
      i++;
    }
    return tamp;
  };

  render() {
    let { customLayout, componentLevels } = this.props;
    const { CountryRegionData, valueSelected, isGettingInitialData } = this.state;
    const labelLevels = get(CountryRegionData, "settings.labelLevels");
    const data = get(CountryRegionData, "data");
    customLayout = customLayout === "horizontal" ? customLayout : "vertical";
    const styleSheet = {
      flexDirection: customLayout === "vertical" ? "column" : "row",
      justifyContent: "space-evenly"
    };
    return (
      <div className={`${styles.countryRegion} country-region`} style={{ ...styleSheet }}>
        {isGettingInitialData ? (
          size(labelLevels) > 0 ? (
            (labelLevels || []).map((element, index) => {
              const attrs = {
                index,
                listData: index === 0 ? data : this.getDataNextLevel(data, index),
                title: element,
                handleChangeValue: this.handleChangeValue,
                key: index,
                value: get(valueSelected[index], `code`),
                customLayout,
                componentLevels: get(componentLevels, `level${index}`)
              };
              return <Selector {...attrs} />;
            })
          ) : (
            <Selector />
          )
        ) : (
          <Spin indicator={antIcon} />
        )}
      </div>
    );
  }
}

DynamicLevelLocationSelector.propTypes = {
  valueCountry: PropTypes.string,
  onChange: PropTypes.func,
  customLayout: PropTypes.string,
  componentLevels: PropTypes.object
};

DynamicLevelLocationSelector.defaultProps = {
  countryCode: "",
  onChange: () => {},
  customLayout: "horizontal",
  componentLevels: {}
};

export default DynamicLevelLocationSelector;
