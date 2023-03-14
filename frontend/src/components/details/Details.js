import React, { Component } from "react";
import { items } from "../data";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: items,
    };
  }
  render() {
    const { id } = this.props.params;
    console.log(id);
    return (
      <div className="deailsPageContainer">
        {this.state.item.map((element) => {
          if (element.id == id) {
            return (
              <div className="innerDeailsPageContainer">
                {" "}
                <div>item Name:- {element.itemName}</div>
                <div>Quantity:- {element.quantity}</div>
                <div>Price:- {element.price}</div>
                <div>Date:- {element.date}</div>
                <div>
                  Manufacturing Company:- {element.manufacturingCompany}
                </div>
                <div> Discription:- {element.discription}</div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default withRouter(Details);
