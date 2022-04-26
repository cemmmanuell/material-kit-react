import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class FormPersonalDetails extends Component {
  
  continue = (e) => {
   // this.props.submit();
    e.preventDefault();
    this.props.nextStep();
    
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, submit } = this.props;
    return (
     
        <>
          
            <AppBar title="Enter communication details" />
            <TextField
              placeholder="Enter phone number"
              label="Phone number"
              onChange={handleChange("phoneNo")}
              defaultValue={values.phoneNo}
              margin="normal"
              fullWidth
            />
            
            <TextField
              placeholder="Enter your email"
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.city}
              margin="normal"
              fullWidth
            />
          
            <TextField
              placeholder="Enter your hometown"
              label="Hometown"
              onChange={handleChange("homeTown")}
              defaultValue={values.homeTown}
              margin="normal"
              fullWidth
            />

            <TextField
              placeholder="Enter contact person name"
              label="Contact person"
              onChange={handleChange("contactPersonName")}
              defaultValue={values.contactPersonName}
              margin="normal"
              fullWidth
            />

            <TextField
              placeholder="Enter contact person phone no"
              label="Contact person phone number"
              onChange={handleChange("contactPersonPhone")}
              defaultValue={values.contactPersonPhone}
              margin="normal"
              fullWidth
            /> 
          
            <Button color="secondary" variant="contained" onClick={this.back}>
              Back
            </Button>
           
            <Button color="primary" size="small" variant="contained" onClick={this.continue}>
             Continue
            </Button>

          
        </>
      
    );
  }
}

export default FormPersonalDetails;