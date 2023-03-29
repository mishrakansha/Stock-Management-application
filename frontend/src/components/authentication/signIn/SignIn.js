import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }
  handelShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    return (
      <div>
        <div className="signInSignUpHeading">
          <h2 className="authLinksActive">SIGN IN</h2>
        </div>
        <form action="#">
          <TextField
            type="email"
            className="input-box"
            required
            style={{
              width: "100%",
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            placeholder="Enter your email"
          />
          <div className="inputIcon">
            <TextField
              className="input-box"
              required
              style={{
                width: "100%",
              }}
              sx={{
                "& fieldset": { border: "none" },
              }}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <Button
              sx={{
                width: 35,
                minHeight: 35,
                minWidth: 35,
                height: 35,
                color: "black",
                boxShadow: "none",
                backgroundColor: "inherit",
                borderRadius: "50%",
                "& .MuiButton-startIcon": { margin: 0 },
                ":hover": {
                  bgcolor: "inherit",
                  color: "black",
                  boxShadow: "none",
                },
              }}
              onClick={this.handelShowPassword}
              variant="contained"
              size="small"
            >
              {this.state.showPassword ? (
                <span className="material-symbols-outlined eyeIcon">
                  visibility_off
                </span>
              ) : (
                <span className="material-symbols-outlined eyeIcon">
                  visibility
                </span>
              )}
            </Button>
          </div>

          <div className="submitButtonContainer">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "50%" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
