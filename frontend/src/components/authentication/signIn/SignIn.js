import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password: "",
      email: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password,
    };
    const recivedData = await axios.post(
      "http://localhost:5000/auth/signIn",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    sessionStorage.setItem("token", recivedData.data.token);
    if (recivedData.data.token) {
      window.location.reload();
    }
  };
  shouldComponentUpdate() {
    if (this.state.isLoggedIn) {
      return false;
    }
    return true;
  }

  handelOnchange = (event) => {
    const data = event.target.value;
    if (event.target.name === "email") {
      this.setState({ email: data });
    } else if (event.target.name === "password") {
      this.setState({ password: data });
    }
    this.setState({ submitButtonDisable: false });
  };
  handelShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="signInSignUpHeading">
          <h2 className="authLinksActive">SIGN IN</h2>
        </div>
        <form onSubmit={this.handleSubmit} method="post">
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
            onChange={this.handelOnchange}
            value={email}
            name="email"
            placeholder="Enter your email"
          />
          <div className="inputIcon">
            <TextField
              className="input-box"
              required
              value={password}
              name="password"
              style={{
                width: "100%",
              }}
              sx={{
                "& fieldset": { border: "none" },
              }}
              onChange={this.handelOnchange}
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
