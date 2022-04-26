import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import LoginForm from './../../authentication/login/LoginForm';
export class Success extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
     <>
      <AppBar title="Success" />
      <h1>Thank You For Your Submission</h1>
      <p>You will get an email with further instructions.</p>
      </>
     
    );
  }
}

export default Success;