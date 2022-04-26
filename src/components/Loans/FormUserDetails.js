import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useState, useEffect } from 'react';
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ReactSession} from 'react-client-session';
import config from "../../config.json";
import axios from 'axios';

export default function FormUserDetails(props)
 {

  const [customerAccs, SetCustomerAccs]=useState([]);
  const [customerAcc, SetCustomerAcc]=useState({maxLoanAmount:0, minLoanAmount:0, installments:0});
  useEffect(() => {
    (async () => {
     // setUserLoaded(false);
      let res = await fetchData();
      SetCustomerAccs(res);
      
      
    })();
  }, []);
  
  async function fetchData(){
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
      
    }
    var rowdata=[];
    await axios.get(`${config.base_api}/loanProducts`,{headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result);
      rowdata= result.data;
      var i=0;
      rowdata.forEach(row => {
        
        row.name=row.description;
        row.value=row.code;
      });
      
      return rowdata;
   }
    )
    .catch((error)=> console.log("Error message",error));
    return rowdata;
  }

 const continues = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  const onChangeLoantype =(e,values)=>{
    if (values!=undefined)
    console.log(values);
    if(values!=undefined && values.length!=0){
      SetCustomerAcc(values);
     props.handleChangeselect('loanProduct', values.code)
      console.log(customerAcc);
    }
  }
  const loantypes=()=> {
   
    const htmlheaders={
          
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    }
    axios.get(`${config.base_api}/loanProducts`,
     {headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result.data);
       
      return result.data;

    });
  }
  

  
    //this.loantypes();
  
    
   // console.log(loans);
    
    return (
     
      <Grid xs={12} sm={12}>
    
      <Grid spacing={2} container xs={6} sm={6}>
      <Grid item xs={6} sm={6} md={5}>
              <br/>
            <Autocomplete
            
            margin="normal"
            options={customerAccs}
            
            getOptionLabel={(option) => `${option.name} `}
          
          
            onChange={onChangeLoantype}
            margin="normal"
            renderInput={(params) => (
              <TextField
                {...params}
               
                label="Loan type "
                placeholder="Enter loan type"
              />
            )}
          />
            <TextField
             onChange={props.handleChange('amount')}
             label="Loan amount"
             
             type="number"
             margin="normal"
           
           />
           <TextField
             
             label="Installments"
             onChange={props.handleChange('installments')}
            
             type="number"
             margin="normal"
           
           />
            </Grid>
        <Grid item xs={6} sm={6} md={6}>
        <AppBar title="Enter communication details" />
          
            
            <TextField
             
              label="Maximum loan amount"

              InputLabelProps={{ shrink: true }}  
              margin="normal"
              disabled
              value={customerAcc.maxAmount}
              
            />
          
           

          <TextField
             
             label="Minimum loan amount"
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             value={customerAcc.minAmount}
           
           />

            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Maximum installments"
             value={customerAcc.maxInstallments}
           
           />
            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Interest rate"
             value={customerAcc.interest}
           
           />


           <br/>
          
            <Button color="primary" variant="contained" onClick={continues}>
              Continue
            </Button>
        </Grid>
         
        </Grid>
      </Grid>
    );
  
}


