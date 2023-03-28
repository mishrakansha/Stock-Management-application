import React, { Component } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import SignUp from "./signUp/SignUp";
import SignIn from "./signIn/SignIn";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: true,
    };
  }
  handelSignUp = () => {
    this.setState({ showSignIn: false });
  };
  handelSignIn = () => {
    this.setState({ showSignIn: true });
  };
  render() {
    return (
      <>
        <div className="wrapperBody">
          <div className="wrapper">
            <div className="button-container">
              <Link className="Link" onClick={this.handelSignIn}>
                <h2
                  className={
                    this.state.showSignIn
                      ? "authLinksActive"
                      : "authLinksDeactive"
                  }
                >
                  SIGN IN
                </h2>
              </Link>
              <Link className="Link" onClick={this.handelSignUp}>
                <h2
                  className={
                    !this.state.showSignIn
                      ? "authLinksActive"
                      : "authLinksDeactive"
                  }
                >
                  SIGN UP
                </h2>
              </Link>
            </div>
            {this.state.showSignIn ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </>
    );
  }
}

export default Auth;
