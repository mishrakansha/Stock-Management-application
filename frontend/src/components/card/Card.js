import React, { Component } from "react";
import Button from "@mui/material/Button";
import "./Cards.css";
import { Link } from "react-router-dom";
import { deleteItem } from "./../../actions/itemsFetching";
import moment from "moment";
import { connect } from "react-redux";

// import TextField from "@mui/material/TextField";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { delete: true };
  }
  handleDelete = () => {
    const id = this.props.id;
    this.props
      .deleteItem(id)
      .then((res) => {
        this.setState({ delete: false });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <>
        {this.state.delete && (
          <div className="cards">
            <div className="cardHeading">
              <h4>{this.props.itemName}</h4>
            </div>
            <div className="cardBody">
              <div>By:-{this.props.manufacturingCompany}</div>
              <div className="dateContainer">
                <div className="dateTextContainer">Added On</div>
                <div className="dateIconContainer">
                  <i className="fa-solid fa-calendar-days"></i>
                  {moment(this.props.date).format(" DD/MM/YYYY")}
                </div>
              </div>
              <div className="priceQuantityContainer">
                <div>Qty : {this.props.quantity}</div>
                <div>₹ : {this.props.price}</div>
              </div>
              <div className="crudButtons">
                <Link
                  className="Link"
                  to={`showdetails/${this.props.id}`}
                  state={{ id: this.props.id }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: 35,
                      minHeight: 35,
                      minWidth: 35,
                      height: 35,
                      backgroundColor: "#323765",
                      borderRadius: 0,
                      border: "1px solid",
                      borderColor: "primary.main",
                      "& .MuiButton-startIcon": { margin: 0 },
                      ":hover": {
                        bgcolor: "#323765",
                        color: "white",
                      },
                    }}
                    size="small"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Button>
                </Link>
                <Link
                  className="Link"
                  to={`editdetails/${this.props.id}`}
                  state={{ id: this.props.id }}
                >
                  <Button
                    sx={{
                      width: 35,
                      minHeight: 35,
                      minWidth: 35,
                      height: 35,
                      backgroundColor: "#323765",
                      borderRadius: 0,
                      border: "1px solid",
                      borderColor: "primary.main",
                      "& .MuiButton-startIcon": { margin: 0 },
                      ":hover": {
                        bgcolor: "#323765",
                        color: "white",
                      },
                    }}
                    variant="contained"
                    size="small"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                </Link>
                <Button
                  sx={{
                    width: 35,
                    minHeight: 35,
                    minWidth: 35,
                    height: 35,
                    backgroundColor: "#323765",
                    borderRadius: 0,
                    border: "1px solid",
                    borderColor: "primary.main",
                    "& .MuiButton-startIcon": { margin: 0 },
                    ":hover": {
                      bgcolor: "#323765",
                      color: "white",
                    },
                  }}
                  onClick={this.handleDelete}
                  variant="contained"
                  size="small"
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default connect(null, { deleteItem })(Card);
