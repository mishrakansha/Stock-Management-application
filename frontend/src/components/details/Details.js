import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { getOneItem } from "../../actions/stocksActions";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DataContainer from "../dataContainer/DataContainer";

import "./DetailsPage.css";
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
            <div>
              <h3 className="backButton">
                <Link className="Link" to={-1}>
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </h3>
              <h1>{oneItem.itemName}</h1>
            </div>

            {oneItem && (
              <section className="detailsComponent">
                {/* <h3 className="containerTitles">Details</h3>
                <hr /> */}
                <div className="detailsPart">
                  <div className="itemInfoElement">
                    Manufacturing Company : {oneItem.manufacturingCompany}
                  </div>
                  <div className="detailElement">
                    <div className="itemInfoElement">
                      Quantity : {oneItem.quantity}
                    </div>
                    <div className="itemInfoElement">
                      Price : {oneItem.price}
                    </div>
                  </div>

                  <div className="itemInfoElement">
                    Date : {moment(oneItem.date).format("MMMM D, YYYY")}
                  </div>
                </div>
                <div className="detailsPart">
                  <div className="itemInfoElement">Description :</div>
                  <div>{oneItem.description}</div>
                </div>
              </section>
            )}
          </div>
        </div>
      />
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.items.singleStockDetails);
  return {
    oneItem: state.items.singleStockDetails,
  };
};

export default connect(mapStateToProps, { getOneItem })(withRouter(Details));
