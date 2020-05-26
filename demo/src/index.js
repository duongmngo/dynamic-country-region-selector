import React, { Component } from "react";
import { render } from "react-dom";

import DynamicLevelLocationSelector from "../../src";

export default class Demo extends Component {
  state = {
    value: []
  };
  handleChangeValue = e => {
    this.setState({ value: e.value });
  };
  render() {
    return (
      <div style={{ width: "800px", height: "200px", marginLeft: "20%" }}>
        <h1>country-region Demo</h1>
        <DynamicLevelLocationSelector value={this.state.value} onChange={this.handleChangeValue} IP_STACK_KEY="e2d17540fe96dff711309fe8f1cd3589" />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
