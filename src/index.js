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
    value: [],
    isGettingInitialData: false
  };

  async componentDidMount() {
    let { countryCode } = this.props;
    let CountryRegionData = {};
    const ip = (await publicIp.v4()) || (await publicIp.v6());
    if (countryCode === "" || !countryCode) {
      const infoLocation = await this.detectLocationIpApi()
        .then(value => value)
        .catch(() => this.detectLocationExtremeIp(ip))
        .then(value => value)
        .catch(() => this.detectLocationIpStack(ip))
        .then(value => value);
      countryCode = get(infoLocation, "country_code") || get(infoLocation, "countryCode");
    }
    CountryRegionData = await this.getCountryRegionData(countryCode);
    this.setState({
      CountryRegionData,
      isGettingInitialData: true
    });
  }

  detectLocationIpStack = async ip => {
    const { IP_STACK_KEY } = this.props;
    const info = fetch(` http://api.ipstack.com/${ip}?access_key=${IP_STACK_KEY}`).then(res => res.json());
    return info;
  };

  detectLocationExtremeIp = async ip => {
    const info = fetch(`https://extreme-ip-lookup.com/json/${ip}`).then(async res => {
      res = await res.json();
      return res.status === "fail" ? Promise.reject(res) : Promise.resolve(res);
    });
    return info;
  };

  detectLocationIpApi = async () => {
    const info = fetch(`http://ip-api.com/json`).then(async res => {
      res = await res.json();
      return res.status === "fail" ? Promise.reject(res) : Promise.resolve(res);
    });
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

  handleChangeValue = (index, selectedValue) => {
    const { onChange } = this.props;
    const { CountryRegionData } = this.state;
    const labelLevels = get(CountryRegionData, "settings.labelLevels");
    let { value } = this.props;
    const oldData = get(value, `[${index}]`);
    const isDiff = isEqual(oldData, selectedValue);
    if (get(selectedValue, "code") === "") {
      value = value.filter((element, position) => position < index);
      onChange({ value: value, labelLevels });
      return;
    }
    if (isUndefined(oldData)) {
      value[index] = selectedValue;
      onChange({ value: value, labelLevels });
      return;
    }
    if (!isDiff) {
      value[index] = selectedValue;
      value = value.filter((element, position) => position <= index);
      onChange({ value: value, labelLevels });
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
    let { value } = this.props;
    if (size(value) < index) {
      return [];
    }
    let i = 0;
    let tamp = data;
    while (i < index) {
      tamp = get(find(tamp, { code: `${value[i].code}` }), "nextLevels");
      i++;
    }
    return tamp;
  };

  render() {
    let { customLayout, componentLevels, value } = this.props;
    const { CountryRegionData, isGettingInitialData } = this.state;
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
                value: get(value[index], `code`),
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
  countryCode: PropTypes.string,
  onChange: PropTypes.func,
  customLayout: PropTypes.string,
  componentLevels: PropTypes.object,
  showDefaultOption: PropTypes.bool,
  defaultOptionLabel: PropTypes.string,
  IP_STACK_KEY: PropTypes.string,
  value: PropTypes.array
};

DynamicLevelLocationSelector.defaultProps = {
  countryCode: "",
  onChange: () => {},
  customLayout: "horizontal",
  componentLevels: { level0: {}, level1: {}, level2: {} },
  showDefaultOption: true,
  defaultOptionLabel: "Select ",
  IP_STACK_KEY: "",
  value: []
};

export default DynamicLevelLocationSelector;
