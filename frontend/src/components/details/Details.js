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
  async componentDidMount() {}
  render() {
    const { id } = this.props.params;
    console.log(id);
    return (
      <div id="dataContainer">
        <div className="deailsPageContainer">
          {this.state.item.map((element) => {
            if (element.id === id) {
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
                  <div> Description:- {element.description}</div>
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
