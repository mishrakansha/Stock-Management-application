import React, { Component } from "react";
import "./dataContainer.css";
import { connect } from "react-redux";
class DataContainer extends Component {
  render() {
    const { dataContainerGrid, child } = this.props;
    return (
      <div id="dataContainer" style={dataContainerGrid}>
        {child}
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
