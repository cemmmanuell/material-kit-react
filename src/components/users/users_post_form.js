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
import { Navigate } from 'react-router';
import {ReactSession} from 'react-client-session';
import SelectOptions from '../dd_all';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import emailjs from 'emailjs-com';

import config from "../../config.json";


export default function UserPostForm() {
//States
const [customerAccs, SetCustomerAccs]=useState([]);
const[customerAcc, SetCustomerAcc]=useState([]);

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
//Actions
  

const history = useNavigate();
const AccountSchema =Yup.object().shape({
  first_name: Yup.string()
  .min(5, 'Too short')
  .max(49, 'Too long')
  .required('Account name is required'),
  last_name: Yup.string()
  .min(5, 'Too short')
  .max(49, 'Too long')
  .required('Account number is required'),
  user_email : Yup.string()
  .min(5, 'Too short')
  .max(49, 'Too long')
  .required('Email  is required')
  .email('Email must have avalid email address'),

  user_phone_number: Yup.string()
  .min(5, 'Too short')
  .max(49, 'Too long')
  .required('Address is required'),


});
const formik =useFormik({
  initialValues:{
   first_name:'',
   last_name:'',
   user_email:'',
   user_phone_number:''


  },
  validationSchema:AccountSchema,
  onSubmit: (values) => {
    
    
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`
    }
   console.log(customerAcc);

  

    axios.post(`${config.base_api}/user`,{
      "user_name":`${values.first_name}_${values.last_name}`,
      "user_email":values.user_email,
      "user_phone_number":values.user_phone_number,
      "user_customer_account":customerAcc.account_number
    },{headers:htmlheaders})
    .then ((result)=>{console.log("result",result);
    emailjs.init(config.email.user_id);
     const emailparams={
       "to_name":`${values.first_name}_${values.last_name}`,
       "from_name":ReactSession.get('user_details').data.user_name,
       "to_email":values.user_email,
       "password_set_link":`${window.location.protocol}//${window.location.host}/set_password`
     }

     emailjs.send(config.email.service_id,config.email.template,emailparams)
     .then(function (resp){
           console.log(resp.status, resp.text);
     })
    alert('Email notification to the user has been sent with login instructions');
    
      history('/dashboard/users_list');
     
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
    <Card>
      <CardHeader title="Add new user" subheader="User details" />
      <CardContent> <Grid xs={12} sm={6}>
      <Typography variant="h6" gutterBottom />
        
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            {...getFieldProps("first_name")}
            label="First name"
            fullWidth
            error={Boolean(touched.firt_name && errors.firt_name)}
            helperText={touched.firt_name && errors.firt_name}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            {...getFieldProps("last_name")}
            label="Last name"
            fullWidth
            error={Boolean(touched.last_name && errors.last_name)}
            helperText={touched.last_name && errors.last_name}
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
         <SelectOptions label={'Customer account'} handleGroup={customerAccId}  options={customerAccs} />
        </Grid>
       
      </Grid>
    </Grid>
      </CardContent> 
    <CardActions>
      <LoadingButton variant="contained" color="primary"
      type="submit"
      loading={isSubmitting}
      >Send invitation email</LoadingButton>
    </CardActions>
      </Card>
     </Form>
     </FormikProvider>
   </>
  );
}
