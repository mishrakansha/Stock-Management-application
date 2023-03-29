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
            {this.state.showSignIn ? (
              <>
                <div className="leftDiv">
                  <img
                    alt="crypto"
                    src="https://images.unsplash.com/photo-1601382270349-49c15bddf738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  />
                </div>
                <div className="rightDiv">
                  <SignIn />
                  <div className="button-container">
                    <Link className="Link" onClick={this.handelSignUp}>
                      Create new account
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="leftDiv">
                  <SignUp />
                  <div className="button-container">
                    <Link className="Link" onClick={this.handelSignIn}>
                      Already a member ?
                    </Link>
                  </div>
                </div>
                <div className="rightDiv">
                  <img
                    alt="crypto"
                    src="https://images.unsplash.com/photo-1601382270349-49c15bddf738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    // src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Auth;
