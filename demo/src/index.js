import React, { Component } from "react";
import { render } from "react-dom";

import DynamicLevelLocationSelector from "../../src";

export default class Demo extends Component {
  handleChangeValue = e => {
    console.log("value", e);
  };
  render() {
    return (
      <div style={{ width: "800px", height: "200px", marginLeft: "20%" }}>
        <h1>country-region Demo</h1>
        <DynamicLevelLocationSelector onChange={this.handleChangeValue} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
