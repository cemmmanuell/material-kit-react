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
              placeholder="Enter your ID number"
              label="ID NUMBER"
              onChange={handleChange("idNumber")}
             
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
