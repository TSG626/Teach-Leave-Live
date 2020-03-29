
import React from "react";

export default class Hoverable extends React.Component {
  state = { hovering: false };
  render() {
      return (
          <div
              onMouseEnter={() => this.setState({ hovering: true })}
              onMouseLeave={() => this.setState({ hovering: false })}
          >
              {this.props.children(this.state.hovering)}
          </div>
      );
  }
}
