/* eslint-disable no-useless-constructor */
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  render() {
    return (
      <div id="mainArea">
        <p>
          button count: <span>{this.state.count}</span>
        </p>
        <button id="mainButton" onClick={() => this.setState({count: this.state.count + 1})}>Increase</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
