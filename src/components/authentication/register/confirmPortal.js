import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/lab";
import { Autocomplete } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class ConfirmPortal extends Component {
  continue = (e) => {
    e.preventDefault();
   // this.props.nextStep();
   this.props.confirm();
  };
  onFocus = event => {

    if(event.target.autocomplete)
    {
      event.target.autocomplete = "";
    }
 
 };
  render() {
    const { values, handleChange } = this.props;
    return (
     
        <>
        
            <AppBar title="Enter User Details" />
            <h1>Please check your email</h1>
            <p>A one time password has been sent to your email or your phone please use the one code in the next process</p>
            <TextField
              placeholder="Enter one time password"
              label="OTP"
              onChange={handleChange("otp")}
              autoComplete="off"
              margin="normal"
              onFocus={this.onFocus}
              fullWidth
            />

            <TextField
              placeholder="Enter new password"
              label="New password"
              onChange={handleChange("password")}
              type="password"
              autoComplete="off"
              onFocus={this.onFocus}
              margin="normal"
              fullWidth
            />
           
            <TextField
              placeholder="Confirm password"
              label="Confirm password"
              onChange={handleChange("confirmPassword")}
              type="password"
              autoComplete="off"
              onFocus={this.onFocus}
              margin="normal"
              fullWidth
            />
           
           
           <br/>
            <Button color="primary" variant="contained" onClick={this.continue}>
             Submit
            </Button>
          
        </>
      
    );
  }
}

export default ConfirmPortal;
