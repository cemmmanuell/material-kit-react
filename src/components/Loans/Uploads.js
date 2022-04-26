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
export default function Uploads(props) {
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
   const files=useRef('');
  const columns = [
 
    {
      field: 'id',
      headerName: 'No',
      width: 10,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    }
  ];
 const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const add_guarantors=()=>{
      console.log(files)
      var rws=rows;
      var fileBase;
      getBase64(files.current.files[0])
      .then(result => {
       // file["base64"] = result;
       // console.log("File Is", file);
       // fileBase=result;
       var fileExt = files.current.files[0].name.split('.').pop();
      rws=Object.assign([], rws);
      var inp={id:count,name:name.current.value, file: result, extension: fileExt};
      rws.push(inp);
      console.log(rws);
      SetRows(rws);
      setCount(count+1);
      props.uploads('files', rws);
    })
    .catch(err => {
      console.log(err);
    });

    }

  
   
    return (
      <Grid xs={12} sm={12} md={12}>
        <Grid spacing={2} container xs={6} sm={12} md={12}>
        <Grid item xs={6} sm={6} md={5}>
       

          <TextField
             
             label="Filen name"
             placeholder="Enter name of upload file"
             type="text"
             inputRef={name}
             margin="normal"
            fullWidth
           />

           <TextField
             
             label="Filen name"
             placeholder="Enter name of upload file"
             type="file"
             inputRef={files}
             margin="normal"
            fullWidth
           />
            <Button color="primary" variant="contained" onClick={add_guarantors}>
             Add file
            </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
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

