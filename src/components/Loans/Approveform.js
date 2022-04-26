import * as Yup from 'yup';
import React from 'react';
import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { Popover } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {ReactSession} from 'react-client-session';
import { Card, CardContent, CardActions, CardHeader, Box } from '@material-ui/core';
import Datatable from '../table';
import config from "../../config.json";
import Icon from '@iconify/react';
import { Button, IconButton } from '@material-ui/core';
import listfill from '@iconify/icons-eva/list-fill';
import editoutline from '@iconify/icons-eva/edit-outline';
import trashoutline from '@iconify/icons-eva/trash-outline';
import fileoutline from '@iconify/icons-eva/file-outline';
import { truncate } from 'lodash';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      width:'100%'
    },
    box:{
      width:700,
    }
  }));
  const htmlheaders={
          
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   
  };
     function post_(member, amount){
      
  }

export default function Approveform(props) {
   console.log(props.data);
     const post= () =>
      {
        //post_(props.data.memberNo, amount.current.value)
        axios.post(`${config.base_api}/approveGuarantorship`,
        {
        "memberno":ReactSession.get('user_details').data.no,
        "loanee":props.data.row.memberNo,
        "loanno": props.data.row.loanNo,
        "amount":parseFloat(amount.current.value),
        "approve":true
       },
     {headers:htmlheaders})
    .then ((result)=>{console.log("result",result);
     alert('You have approved guarantorship')
  });
    
      };
    
    const reject =()=>
      {
        const htmlheaders={
              
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         
        }
        axios.post(`${config.base_api}/approveGuarantorship`,{
            "memberno":ReactSession.get('user_details').data.no,
            "loanee":props.data.row.memberNo,
             "loanno": props.data.row.loanNo,
            "amount":amount.current.value,
            "approve":false
        },
         {headers:htmlheaders})
        .then ((result)=>{console.log("result",result);
         alert('You have rejected guarantorship')
      });
    
      }
      const amount=useRef('');
      const classes = useStyles();
    return (

        <Box className={classes.box}>
        <Grid xs={12} sm={12} md={12}>
           <Grid spacing={2} container xs={6} sm={12} md={12}>
           <Grid item xs={6} sm={6} md={12}>
           <TextField
                
                label="Amount to guarantee"
                placeholder="Enter amount you wish to guarantee"
                type="number"
                inputRef={amount}
                margin="normal"
                fullWidth
              
              />
          
            
             <Grid item xs={6} spacing={3} sm={6} md={6}>
           <Button color="secondary" variant="contained" onClick={reject} >
             Reject
           </Button>
           <Button color="primary" variant="contained" onClick={post}>
             Accept
           </Button>
           </Grid>
           </Grid>
        
          </Grid>
          </Grid>
        </Box>
        );

}
