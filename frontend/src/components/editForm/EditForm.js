import { editItem, getOneItem } from "../../redux/actions/stocks";
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./editForm.css";
import moment from "moment";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { editFormPopUp } from "../../redux/actions/stocks";
class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      quantity: "",
      price: "",
      description: "",
      date: "",
      manufacturingCompany: "",
      manufacturingCompanyError: false,
      itemNameError: false,
      quantityError: false,
      priceError: false,
      descriptionError: false,
      dateError: false,
      formSubmitted: false,
      modified: false,
    };
  }
  async componentDidMount() {
    const { editFormId: id, getOneItem } = this.props;
    try {
      await getOneItem(id);
      const { oneItem: data } = this.props;
      let {
        itemName,
        manufacturingCompany,
        price,
        quantity,
        date,
        description,
      } = data;
      date = moment(date).format("yyyy-MM-DD");
      this.setState({
        itemName: itemName,
        quantity: quantity,
        price: price,
        description: description,
        date: date,
        manufacturingCompany: manufacturingCompany,
      });
    } catch (e) {
      console.log(e);
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
    } = this.state;
    const data = {
      itemName: itemName,
      quantity: quantity,
      price: price,
      description: description,
      date: date,
      manufacturingCompany: manufacturingCompany,
    };
    const { editFormId: id, editItem, editFormPopUp } = this.props;
    editItem(id, data);
    editFormPopUp(false);
    window.scrollTo(0, 0);
  };
  handelOnchange = (event) => {
    var data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length > 2 && data.length <= 100) {
        this.setState({ itemNameError: false });
      } else {
        this.setState({ itemNameError: true });
      }
      this.setState({ itemName: data });
    } else if (event.target.name === "quantity") {
      if (data > 0) {
        this.setState({ quantityError: false });
      } else {
        this.setState({ quantityError: true });
        event.target.value = "";
      }
      this.setState({ quantity: event.target.value });
    } else if (event.target.name === "description") {
      if (data.length > 0) {
        this.setState({ descriptionError: false });
      } else {
        this.setState({ descriptionError: true });
      }
      this.setState({ description: data });
    } else if (event.target.name === "manufacturingCompany") {
      if (data.length > 0) {
        this.setState({
          manufacturingCompanyError: false,
        });
      } else {
        this.setState({ manufacturingCompanyError: true });
      }
      this.setState({
        manufacturingCompany: data,
      });
    } else if (event.target.name === "price") {
      if (data > 0) {
        this.setState({
          priceError: false,
        });
      } else {
        this.setState({
          priceError: true,
        });
        event.target.value = "";
      }
      this.setState({
        price: event.target.value,
      });
    } else if (event.target.name === "manufacturingCompany") {
      this.setState({ manufacturingCompany: event.target.value });
    } else if (event.target.name === "date") {
      var inputtedDate = event.target.value;
      var today = new Date();
      let datenew = new Date(inputtedDate);
      if (today < datenew) {
        console.log("invalid");
        this.setState({ dateError: true });
      } else {
        this.setState({ dateError: false });
      }
      this.setState({ date: event.target.value });
    }
    this.setState({ modified: true });
  };
  handelClose = () => {
    const { editFormPopUp } = this.props;
    editFormPopUp(false);
  };
  render() {
    const { isPopperOpen: open } = this.props;
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
      manufacturingCompanyError,
      itemNameError,
      quantityError,
      priceError,
      descriptionError,
      dateError,
      formSubmitted,
      modified,
    } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} fullWidth={true}>
        <div className="innerEditFormContainer">
          <div>
            <h1>UPDATE ITEM</h1>
          </div>
        </div>
        <DialogContent>
          <form
            onSubmit={this.handleSubmit}
            method="post"
            action="localhost:5000/api/stock/additem"
            id="editForm"
          >
            {formSubmitted && <h3>Sucessfully Updated </h3>}
            <TextField
              required
              id="filled-basic"
              name="itemName"
              value={itemName || ""}
              label="Item Name"
              variant="filled"
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              onChange={this.handelOnchange}
              type="text"
              style={{ width: "100%" }}
            />
            {itemNameError && (
              <div className="errorMessage">
                * Name of the item should contain atleast 3 character and atmost
                100 character
              </div>
            )}
            <TextField
              required
              id="filled-basic"
              min="1"
              label="Quantity"
              value={quantity || ""}
              InputProps={{
                inputProps: {
                  min: 1,
                },
                style: {
                  height: "50px",
                },
              }}
              name="quantity"
              variant="filled"
              onInput={this.handelOnchange}
              type="number"
              style={{ width: "100%" }}
            />
            {quantityError && (
              <div className="errorMessage">
                * Quantity should be greater than 1.
              </div>
            )}
            <TextField
              required
              id="filled-basic"
              name="price"
              label="Price"
              value={price || ""}
              variant="filled"
              InputProps={{
                inputProps: {
                  min: 1,
                },
                style: {
                  height: "50px",
                },
              }}
              onChange={this.handelOnchange}
              type="number"
              style={{ width: "100%" }}
            />
            {priceError && (
              <div className="errorMessage">
                * Price should be greater than 1.
              </div>
            )}
            <TextField
              required
              id="filled-basic"
              name="manufacturingCompany"
              label="Manufacturing company"
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              variant="filled"
              onChange={this.handelOnchange}
              type="text"
              value={manufacturingCompany || ""}
              style={{ width: "100%" }}
            />
            {manufacturingCompanyError && (
              <div className="errorMessage">* this field is required.</div>
            )}
            <TextField
              required
              multiline
              rows={2}
              name="description"
              onChange={this.handelOnchange}
              variant="filled"
              value={description || ""}
              label="Description"
              dv
              xz
            />
            {descriptionError && (
              <div className="errorMessage">* this field is required.</div>
            )}
            <TextField
              id="datetime-local"
              label="Date"
              type="date"
              variant="filled"
              value={date || ""}
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              name="date"
              onChange={this.handelOnchange}
              p
              InputLabelProps={{
                shrink: true,
              }}
            />
            {dateError && (
              <div className="errorMessage">
                * date should not be greater than than today
              </div>
            )}
            <div className="submitButtonContainer">
              <Button
                disabled={
                  !modified ||
                  dateError ||
                  itemNameError ||
                  descriptionError ||
                  priceError ||
                  manufacturingCompanyError
                }
                type="submit"
                onChange={this.handelOnchange}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "50%",
                }}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: " #323765",
              ":hover": {
                background: "rgb(50 55 101 / 4%)",
              },
            }}
            onClick={this.handelClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isPopperOpen: state.items.isPopperOpen.isPopperOpen,
    editFormId: state.items.isPopperOpen.id,
    oneItem: state.items.singleStockDetails,
  };
};
export default connect(mapStateToProps, {
  editItem,
  editFormPopUp,
  getOneItem,
})(EditForm);
