import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { CardHeader, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from 'react';
import ReactSession from "react-client-session/dist/ReactSession";
import { Autocomplete } from "@material-ui/core";
import Datatable from '../table';
import { fDate } from "src/utils/formatTime";
import Page from '../../components/Page';
import axios from "axios";
import config from '../../config.json'

export default function Feedback() {
   

  const [messages, SetMessages]=useState([]);

  
  useEffect(async()=> {
    let res = await fechdata();
      
    SetMessages(res);
    console.log(res);
    },[])
  
  async function  fechdata(){
  
    var rowdata=[];
   
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
      
    }
    await axios.get(`${config.base_api}/feedback?no=${ReactSession.get('user_details').data.no}`,{headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result);
      rowdata=result.data;
      var i=0;
        rowdata.forEach(row => {
        
          row.id=i++;
      });
      //SetRows(rowdata.data);

      
      return rowdata;
   }
    )
    .catch((error)=> console.log("Error message",error));
    return rowdata;
  }
    const Member =(props)=>{
         return (
           <div>
          <Grid item xs={6} sm={6} md={5}>
        
          <h2>{props.message}</h2>
          <h5 >You texted</h5>
          </Grid>
          <Grid item xs={6} sm={6} md={5}>

          </Grid>
          </div>
         )
    }
    const Housing =(props)=>{
      
      return (
        <div>
       <Grid item xs={6} sm={6} md={5}>
  
       </Grid>
       <Grid item xs={6} sm={6} md={5}>
       <h2 style={{color:'#229A16'}}>{props.reply}</h2>
         {props.reply=="" ? "" :   <h5 style={{color:'#229A16'}}>Dhamini sacco replied</h5>}
       </Grid>
       </div>
      )
 }

    
    const Lineup=()=>{
     return (

      <div>
      {messages.map(name => 
     { 
       return (
       <div>
      <Member message={name.message} /> 
    
      <Housing reply={name.reply} />
       </div>
       )
     })
  }
    </div>
  
      )
  }



   const feedback=()=>
    {
      const htmlheaders={
            
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      }
      axios.post(`${config.base_api}/feedback`,{
        "message":message.current.value, 
        "no":ReactSession.get('user_details').data.no
       },
       {headers:htmlheaders})
      .then ((result)=>
      
      {
        console.log("result",result);
        
        if(result.status==200){
         alert('Message sent');
        // SetMessages(messages.push([{"message":message.current.value, reply:""}]))
        }
        else
        {
          alert('Error occured');
        }
  
      }
    
    ).catch((error)=> {
       console.log("Error message",error);
       alert('Error occured please try again');
      });
    
    }
  
   const message=useRef('');
    return (
      <Page title="User feedback | Members portal">
      <Grid xs={12} sm={12} md={12}>
        
        <Grid spacing={2} container xs={6} sm={12} md={12}>
         
      

       
      
       </Grid>


       </Grid>
       <Grid item xs={12} sm={12} md={12}>
           
           <Lineup />
       </Grid>
       <Grid xs={12} sm={12} md={12}>
 

       <TextField
             
             label="Message to Housing"
             placeholder="Type here"
             multiline
             rows={5}
            
             
             inputRef={message}
             margin="normal"
            fullWidth
       />
         
         <Button color="primary" variant="contained" onClick={feedback} >
            Send 
        </Button>
       </Grid>

     

       </Page>
    );
  }

