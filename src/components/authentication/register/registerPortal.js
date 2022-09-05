import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/lab";
import { Autocomplete } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class RegisterPortal extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.register();
    
   
  };



  render() {
    const { values, handleChange } = this.props;
    return (
     
        <>
        
            <AppBar title="Enter User Details" />
           
           
            <TextField
              placeholder="Enter your account number"
              label="Account number"
              onChange={handleChange("userName")}
             
              margin="normal"
              fullWidth
            />
           
           
           <br/>

           <TextField
              placeholder="Enter your account email"
              label="Email"
              onChange={handleChange("email")}
             
              margin="normal"
              fullWidth
            />
           
           
           <br/>
            <Button color="primary" variant="contained" onClick={this.continue}>
              Continue
            </Button>
          
        </>
      
    );
  }
}

export default RegisterPortal;
