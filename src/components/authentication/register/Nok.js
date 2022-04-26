import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from 'react';
import { Autocomplete } from "@material-ui/core";
import Datatable from '../../table';
import config from '../../../config.json'
import axios from 'axios';
import {ReactSession} from 'react-client-session';
import { CardHeader } from "@material-ui/core";
export default function Nok(props) {
  const [rows, SetRows] =useState([]);
  const [customerAccs, SetCustomerAccs]=useState([]);
  const [customerAcc, SetCustomerAcc]=useState({});
  const[count, setCount]=useState(1);
  const  continues = (e) => {
  
    e.preventDefault();
    props.post();
    //props.nextStep();
    
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
      'Content-Type': 'application/json'
      //'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
      
    }
    var rowdata=[];
    await axios.get(`${config.base_api}/relationships`,{headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result);
      rowdata= result.data;
      var i=0;
      rowdata.forEach(row => {
        
        row.name=row.name;
        row.value=row.value;
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
  const Name=useRef('');
  const amount=useRef('');
  const phone =useRef('');
  const email =useRef('');
  const allocation =useRef('');
  const idno =useRef('');


  const columns = [
 
    {
      field: 'id',
      headerName: 'No',
      width: 10,
      editable: false,
    },
    {
        field: 'idno',
        headerName: 'Id Number',
        width: 10,
        editable: false,
    },

    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'relationship',
      headerName: 'Relationship',
      
      width: 200,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      
      width: 200,
      editable: true,
    },
    {
        field: 'allocation',
        headerName: 'Allocation',
        
        width: 200,
        editable: true,
      }
  ];

  const add_guarantors=()=>{
  
      var rws=rows;
      rws=Object.assign([], rws);
      var inp={id:count,relationship:customerAcc.value, name:Name.current.value, phone:phone.current.value, email:email.current.value, allocation:allocation.current.value, idno:idno.current.value};
      rws.push(inp);
      console.log(rws);
      SetRows(rws);
      setCount(count+1);
      props.guarants('nextofkin', rws);
    

    }

  
   
    return (
      
      <Grid xs={12} sm={12} md={12}>
        <CardHeader title="Add next of kin details below"></CardHeader>
        <Grid spacing={2} container xs={6} sm={12} md={12}>
        <Grid item xs={12} sm={12} md={12}>
        
          

          <TextField
             
             label="Name "
             placeholder="Enter names of next of kin"
             type="text"
             inputRef={Name}
             margin="normal"
            fullWidth
           />
            <TextField
             
             label="Id Number"
             placeholder="Enter id number"
             type="number"
             inputRef={idno}
             margin="normal"
            fullWidth
           />
           <Autocomplete
            
            margin="normal"
            options={customerAccs}
            
            getOptionLabel={(option) => `${option.name} `}
          
            filterSelectedOptions
            onChange={onChangeLoantype}
            margin="normal"
            renderInput={(params) => (
              <TextField
                {...params}
               
                label="Relationship "
                placeholder="Select relationship"
              />
            )}
          />
            <TextField
             
             label="Phone number"
             placeholder="Enter the phone number"
             type="text"
             inputRef={phone}
             margin="normal"
            fullWidth
           />
            <TextField
             
             label="Email address"
             placeholder="Enter email address"
             type="text"
             inputRef={email}
             margin="normal"
            fullWidth
           />
           <TextField
             
             label="Allocation"
             placeholder="Enter % allocation"
             type="number"
             inputRef={allocation}
             margin="normal"
            fullWidth
           />
            <Button color="primary" variant="contained" onClick={add_guarantors}>
              Add Next of kin
            </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <Datatable rows={rows} columns={columns} />
        <Grid item xs={6} spacing={3} sm={6} md={6}>
        <Button color="secondary" variant="contained" onClick={back}>
             Back
        </Button>
        <Button color="primary" variant="contained" onClick={continues}>
              Submit
        </Button>
        </Grid>
      
        </Grid>
       </Grid>
       </Grid>
    );
  }

