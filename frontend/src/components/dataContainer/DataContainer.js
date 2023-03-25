import React, { Component } from "react";
import "./DataContainer.css";
import { connect } from "react-redux";
class DataContainer extends Component {
  render() {
    return (
      <div id="dataContainer" style={this.props.dataContainerGrid}>
        {" "}
        {this.props.child}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataContainerGrid: state.navBar.dataContainerGrid,
  };
};
export default connect(mapStateToProps, {})(DataContainer);
