import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";
import { getOneItem } from "./../../actions/itemsFetching";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DataContainer from "../dataContainer/DataContainer";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};
class Details extends Component {
  async componentDidMount() {
    const { id } = this.props.params;
    this.props.getOneItem(id);
  }
  render() {
    const { oneItem } = this.props;
    return (
      <DataContainer
        child=<div className="deailsPageContainer">
          <div className="innerDeailsPageContainer">
            <h3 className="backButton">
              <Link className="Link" to="/">
                <i class="fa-solid fa-arrow-left"></i>
              </Link>
            </h3>
            {oneItem && (
              <div className="detailsComponent">
                <h3 className="containerTitles">Deatails</h3>
                <hr />
                <div className="detailsPart">
                  <div className="detailElement">
                    <h4> Item Name </h4>
                    <div>{oneItem.itemName}</div>
                  </div>

                  <div className="detailElement">
                    <h4> Quantity</h4>
                    <div> {oneItem.quantity}</div>
                  </div>
                  <div className="detailElement">
                    <h4> Price</h4>
                    <div> {oneItem.price}</div>
                  </div>
                  <div className="detailElement">
                    <h4> Date</h4>
                    <div>{moment(oneItem.date).format("MMMM D, YYYY")}</div>
                  </div>
                  <div className="detailElement">
                    <h4> Manufacturing Company</h4>
                    <div>{oneItem.manufacturingCompany}</div>
                  </div>
                </div>{" "}
                <h3 className="containerTitles">Description</h3>
                <hr />
                <div className="descriptionPart">
                  <div>{oneItem.description}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    oneItem: state.items.payload,
  };
};

export default connect(mapStateToProps, { getOneItem })(withRouter(Details));
