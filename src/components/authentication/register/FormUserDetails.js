import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/lab";
import { Autocomplete } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange, handleChangeFile } = this.props;
    return (
     
        <>
        
            <AppBar title="Enter User Details" />
            <TextField
              placeholder="Enter Your First Name and middle name"
              label="First Name and Middle name"
              onChange={handleChange("firstName")}
              defaultValue={values.firstName}
              margin="normal"
              fullWidth
            />
           
            <TextField
              placeholder="Enter Your Last Name"
              label="Last Name"
              onChange={handleChange("lastName")}
              defaultValue={values.lastName}
              margin="normal"
              fullWidth
            />
           
            <TextField
              placeholder="Enter your Post code"
              label="Post code"
              onChange={handleChange("postCode")}
              defaultValue={values.postCode}
              margin="normal"
              fullWidth
            />
             <TextField
              placeholder="Enter your Id number"
              label="ID number"
              onChange={handleChange("idNumber")}
              defaultValue={values.idNumber}
              margin="normal"
              fullWidth
            />
             <TextField
              placeholder="Enter your id copy"
              label="ID copy"
              InputLabelProps={{ shrink: true }}  
              onChange={handleChangeFile("idNoAttachment")}
              type="file"
              margin="normal"
              fullWidth
            />
            <TextField
              placeholder="Enter your KRA pin"
              label="KRA pin"
              onChange={handleChange("kraPin")}
              defaultValue={values.kraPin}
              margin="normal"
              fullWidth
            />
             <TextField
              placeholder="Enter your KRA pin"
              label="KRA pin certificate"
              InputLabelProps={{ shrink: true }}  
              onChange={handleChangeFile("kraPinAttachment")}
              type="file"
              margin="normal"
              fullWidth
            />
          <TextField
              placeholder="Enter your Date of birth"
              label="Date of birth"
              InputLabelProps={{ shrink: true }}  
              onChange={handleChange("dateOfBirth")}
              defaultValue={values.dateOfBirth}
              margin="normal"
              type="date"
              fullWidth
            />
             <Autocomplete
            
             
              options={[{value:0, name:"Male"},{value:1, name: "Female"}]}
              
              getOptionLabel={(option) => `${option.name} `}
            
              filterSelectedOptions
              onChange={handleChange("gender")}
              margin="normal"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Gender "
                  placeholder="Enter your gender"
                />
              )}
            />
           <br/>
          <Autocomplete
            
             
            options={[{  
              value : 0,
              name : "Single"},
              {
                value : 1,
                name : "Married"
              },
              {
                value : 2,
                name : "Seperated"
              },
              {
                value : 3,
                name : "Divorced"
              },
              {
                value : 4,
                name : "Widower"

              },
              {
                value : 5,
                name : "Widow"
              }
            ]}
            
            getOptionLabel={(option) => `${option.name} `}
          
            filterSelectedOptions
            onChange={handleChange("maritalStatus")}
            margin="normal"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Marital status"
                placeholder="Enter your marital status"
              />
            )}
          />
           <br/>
            <Button color="primary" variant="contained" onClick={this.continue}>
              Continue
            </Button>
          
        </>
      
    );
  }
}

export default FormUserDetails;
