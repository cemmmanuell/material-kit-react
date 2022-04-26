import * as Yup from 'yup';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import SelectOptions from '../dd_all';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Navigate } from 'react-router';
import {ReactSession} from 'react-client-session';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { FcBusinessman, FcFile, FcAnswers, FcFullTrash } from 'react-icons/fc';


import config from "../../config.json";


export default function UserPutForm(props) {

//States
const [customerAccs, SetCustomerAccs]=useState([]);
const[customerAcc, SetCustomerAcc]=useState([]);
const[default_, setDefault]=useState({});

const customerAccId=(customerAccId_)=>{
  SetCustomerAcc(customerAccId_)
}
///////////////////////////////////////
  //Fetches 
useEffect(() => {
  (async () => {
   // setUserLoaded(false);
    let res = await fetchData();
    SetCustomerAccs(res);
    setDefault(res.find(r=>r.value===props.user_details.user_customer_account));
    
    
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
  await axios.get(`${config.base_api}/customer_accounts`,{headers:htmlheaders})
  .then ((result)=>{
    console.log("result",result);
    rowdata= result.data;
    var i=0;
    rowdata.forEach(row => {
      
      row.name=row.account_name;
      row.value=row.account_number;
    });
    
    return rowdata;
 }
  )
  .catch((error)=> console.log("Error message",error));
  return rowdata;
}
//////////////////////////////////
  
const history = useNavigate();
const AccountSchema =Yup.object().shape({
 
  user_email : Yup.string()
  .min(5, 'Too short')
  .max(49, 'Too long')
  .required('Email  is required')
  .email('Email must have avalid email address'),

  user_phone_number: Yup.string()
  .min(5, 'Too short')
  .max(49, 'Too long')
  .required('Phone is required')


});
const formik =useFormik({
  initialValues:{
   user_name:props.user_details.user_name,
  
   user_email:props.user_details.user_email,
   user_phone_number:props.user_details.user_phone_number,
   


  },
  validationSchema:AccountSchema,
  onSubmit: (values) => {
    
    
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`
    }
    axios.put(`${config.base_api}/user`,{
      "user_id":props.user_details.user_id,
      "user_email":values.user_email,
      "user_phone_number":values.user_phone_number,
     "user_name":props.user_details.user_name,
     "user_customer_account":customerAcc!=undefined ? customerAcc.account_number : '',
    },{headers:htmlheaders})
    .then ((result)=>{console.log("result",result);
    alert('User details updated');
    window.location.reload();
     
     
   }
    )
    .catch((error)=> console.log("Error message",error))
  }


})
const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
     <FormikProvider  value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}> 
    <>
      <CardHeader title="Edit user" subheader="User details" />
      <CardContent> <Grid xs={12} sm={6}>
      <Typography variant="h6" gutterBottom />
        
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            {...getFieldProps("user_name")}
            label="User name"
            fullWidth
            disabled
            error={Boolean(touched.user_name && errors.user_name)}
            helperText={touched.user_name && errors.user_name}
            
          />
        </Grid>
      <Grid item xs={12}>
        <TextField
            required
            id="firstName"
            name="firstName"
            {...getFieldProps("user_email")}
            label="Email address"
            fullWidth
            error={Boolean(touched.user_email && errors.user_email)}
            helperText={touched.user_email && errors.user_email}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField id="Phone" name="phone" label="Phone number" {...getFieldProps("user_phone_number")} fullWidth
           error={Boolean(touched.user_phone_number && errors.user_phone_number)}
           helperText={touched.user_phone_number && errors.user_phone_number}
          />
        </Grid>

        <Grid item xs={12}>
         <SelectOptions selected={default_}  label={'Customer account'} handleGroup={customerAccId}  options={customerAccs} />
        </Grid>
       
      </Grid>
    </Grid>
      </CardContent> 
     
    <CardActions>
    <ButtonGroup variant="contained" size="small" >
      <LoadingButton variant="contained" startIcon={<FcFile/>} color="success">
       
        New users </LoadingButton>
      <LoadingButton startIcon={<FcAnswers/>} variant="contained" color="warning"
      type="submit"
      loading={isSubmitting}
      >Update user</LoadingButton>
      <LoadingButton startIcon={<FcFullTrash/>} variant="contained" color="error">Delete user</LoadingButton>
      </ButtonGroup>
     
    </CardActions>
    
      </>
     </Form>
     </FormikProvider>
   </>
  );
}
