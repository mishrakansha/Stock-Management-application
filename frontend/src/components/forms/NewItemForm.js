import React, { Component } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/FormCss.css";
export default class NewItemForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (const [key, value] of data) {
      console.log(`${key}: ${value}\n`);
    }
  };
  render() {
    return (
      <div className="formContainer">
        <div className="innerFormContainer">
          <h1>Add New Item</h1>
          <form onSubmit={this.handleSubmit} id="form">
            <TextField
              required
              name="Item_name"
              id="filled-basic"
              label="Item Name"
              variant="filled"
              style={{ width: "100%" }}
            />
            <TextField
              required
              id="filled-basic"
              label="Quantity"
              name="quantity"
              variant="filled"
              type="number"
              style={{ width: "100%" }}
            />
            <TextField
              required
              id="filled-basic"
              name="price"
              label="Price"
              variant="filled"
              type="number"
              style={{ width: "100%" }}
            />
            <TextField
              multiline
              rows={2}
              name="discription"
              variant="filled"
              label="Discription"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
