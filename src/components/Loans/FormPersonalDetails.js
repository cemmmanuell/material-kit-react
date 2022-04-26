import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from 'react';
import { Autocomplete } from "@material-ui/core";
import Datatable from '../table';
import config from "../../config.json";
import axios from 'axios';
import {ReactSession} from 'react-client-session';
export default function FormPersonalDetails(props) {
  const [rows, SetRows] =useState([]);
  const [customerAccs, SetCustomerAccs]=useState([]);
  const [customerAcc, SetCustomerAcc]=useState({});
  const[count, setCount]=useState(1);
  const  continues = (e) => {
  
    e.preventDefault();
   // props.post();
    props.nextStep();
    
  };

  useEffect(() => {
    (async () => {
     // setUserLoaded(false);
      let res = await fetchData();
      SetCustomerAccs(res);
      
      
    })();
  }, []);
  const onChangeLoantype =(e,values)=>{
    if (values!=undefined)
    console.log(values);
    if(values!=undefined && values.length!=0){
      SetCustomerAcc(values);
    // props.handleChangeselect('loanProduct', values.code)
      console.log(customerAcc);
    }
  }
  async function fetchData(){
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
      
    }
    var rowdata=[];
    await axios.get(`${config.base_api}/Allmembers`,{headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result);
      rowdata= result.data;
      var i=0;
      rowdata.forEach(row => {
        
        row.name=row.name;
        row.value=row.no;
      });
      
      return rowdata;
   }
    )
    .catch((error)=> console.log("Error message",error));
    return rowdata;
  }


 


   const  back = (e) => {
    e.preventDefault();
    props.prevStep();
  };
   
  const no=useRef('');
  const name=useRef('');
  const amount=useRef('');

  const columns = [
 
    {
      field: 'id',
      headerName: 'No',
      width: 10,
      editable: false,
    },
    {
      field: 'loanee',
      headerName: 'Guarantor no',
      width: 200,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Guarantor name',
      
      width: 200,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      
      width: 200,
      editable: true,
    }
  ];

  const add_guarantors=()=>{
    console.log(no.current.value);
    console.log(name.current.value);
    console.log(amount.current.value);
    console.log(rows);
    const htmlheaders1={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    }
    
    axios.post(`${config.base_api}/testguarantee`,{
      "memberno":ReactSession.get('user_details').data.no,
      "loanee":customerAcc.value,
      "amount":parseFloat(amount.current.value)
      
    },{headers:htmlheaders1})
    .then ((result)=>{
      console.log("result",result);
      if (result.status==401){
        alert('Member cannot guarantee')
      }
      if (result.status==415){
        alert('Member cannot guarantee')
      } 
     if(result.status==200)
     { 
      var rws=rows;
      rws=Object.assign([], rws);
      var inp={id:count,loanee:customerAcc.value, name:customerAcc.name, amount:parseFloat(amount.current.value)};
      rws.push(inp);
      console.log(rws);
      SetRows(rws);
      setCount(count+1);
      props.guarants('guarantors', rws);
     }
   }
    )  .catch((error)=> { console.log("Error message",error)
    alert('Member cannot guarantee');
    
     }); 
  

    }

  
   
    return (
      <Grid xs={12} sm={12} md={12}>
        <Grid spacing={2} container xs={6} sm={12} md={12}>
        <Grid item xs={6} sm={6} md={5}>
        <Autocomplete
            
            margin="normal"
            options={customerAccs}
            
            getOptionLabel={(option) => `${option.name} `}
            
            autoComplete
            onChange={onChangeLoantype}
            margin="normal"
            renderInput={(params) => (
              <TextField
                {...params}
               
                label="Members "
                placeholder="Enter loan type"
              />
            )}
          />
          

          <TextField
             
             label="Amount "
             placeholder="Enter amount you wish to be guaranteed"
             type="number"
             inputRef={amount}
             margin="normal"
            fullWidth
           />
            <Button color="primary" variant="contained" onClick={add_guarantors}>
              Add guarantor
            </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
        <Datatable rows={rows} columns={columns} />
        <Grid item xs={6} spacing={3} sm={6} md={6}>
        <Button color="secondary" variant="contained" onClick={back}>
             Back
        </Button>
        <Button color="primary" variant="contained" onClick={continues}>
              Continue
        </Button>
        </Grid>
      
        </Grid>
       </Grid>
       </Grid>
    );
  }

