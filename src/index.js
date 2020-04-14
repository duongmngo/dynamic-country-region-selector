import React, { Component, lazy } from "react";
import PropTypes from "prop-types";
import styles from "./country-region.scss";
import { get, isUndefined, isEqual, size, find } from "lodash";
import Selector from "./components/selector";
import Country from "./data/country";
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
    console.log("CountryRegionData", CountryRegionData);
    this.setState({
      CountryRegionData,
      isGettingInitialData: true,
      labelLevels: get(CountryRegionData, "settings.labelLevels")
    });
  }

  detectLocation = async () => {
    const { IP_STACK_KEY } = this.props;
    const ip = (await publicIp.v4()) || (await publicIp.v6());
    const info = fetch(` http://api.ipstack.com/${ip}?access_key=${IP_STACK_KEY}`).then(response => response.json());
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
    if (get(value, "code") === "") {
      valueSelected = valueSelected.filter((element, position) => position < index);
      this.setState({
        valueSelected
      });
      onChange({ value: valueSelected, labelLevels });
      return;
    }
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

  getDefaultOption = title => {
    const { showDefaultOption, defaultOptionLabel } = this.props;
    if (!showDefaultOption) {
      return null;
    }
    return (
      <option value="" key="default">
        {`${defaultOptionLabel}${title || ""}`}
      </option>
    );
  };

  getDataOptions = listData => {
    return (listData || []).map((element, position) => {
      return (
        <option key={position} value={get(element, "code")}>
          {get(element, "name")}
        </option>
      );
    });
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
                componentLevels: get(componentLevels, `level${index}`),
                getDataOptions: this.getDataOptions,
                getDefaultOption: this.getDefaultOption
              };
              return <Selector {...attrs} />;
            })
          ) : (
            <Selector getDataOptions={this.getDataOptions} getDefaultOption={this.getDefaultOption} listData={[]} />
          )
        ) : (
          <div className={styles.loader}></div>
        )}
      </div>
    );
  }
}

DynamicLevelLocationSelector.propTypes = {
  valueCountry: PropTypes.string,
  onChange: PropTypes.func,
  customLayout: PropTypes.string,
  componentLevels: PropTypes.object,
  showDefaultOption: PropTypes.bool,
  defaultOptionLabel: PropTypes.string,
  IP_STACK_KEY: PropTypes.string
};

DynamicLevelLocationSelector.defaultProps = {
  countryCode: "",
  onChange: () => {},
  customLayout: "horizontal",
  componentLevels: { level0: {}, level1: {}, level2: {} },
  showDefaultOption: true,
  defaultOptionLabel: "Select ",
  IP_STACK_KEY: ""
};

export default DynamicLevelLocationSelector;
