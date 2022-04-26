import * as Yup from 'yup';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { Navigate } from 'react-router';
import {ReactSession} from 'react-client-session';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

import config from "../../config.json";

export default function EditCustomer(props) {


  const history = useNavigate();
  
  const [navigate, SetNavigate]= useState(false);
  const AccountSchema =Yup.object().shape({
    account_name: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Account name is required'),
    account_number: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    
    .required('Account number is required'),
    account_email: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Email  is required')
    .email('Email must have avalid email address'),

    account_address: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Address is required'),

    account_phone: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Phone number is required'),
    account_sms_id: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Sms id is required')

  });
  console.log(props);
  const formik =useFormik({
      
    initialValues:{
      account_name:props.customer_details.account_name,
      account_number:props.customer_details.account_number,
      account_email:props.customer_details.account_email,
      account_phone:props.customer_details.account_phone,
      account_sms_id:props.customer_details.account_sms_id,
      account_address:props.customer_details.account_address

    },
    validationSchema:AccountSchema,
    onSubmit: (values) => {
      
      
      const htmlheaders={
        'Acces-Control-Allow-Origin': config.base_api,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`
      }
      axios.put(`${config.base_api}/customer_accounts`,{
        "account_name":values.account_name,
        "account_number":values.account_number,
        "account_id":props.customer_details.account_id,
        "account_address":values.account_address,
        "account_phone":values.account_phone,
        "account_email":values.account_email,
        "account_sms_id":values.account_sms_id
      },{headers:htmlheaders})
      .then ((result)=>{console.log("result",result);
      alert('Customer details updated');
      history('/dashboard/customer_list/');
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
     <Card>
      <CardHeader title="Add new customer account" subheader="Customer details" />
      <CardContent> <Grid xs={12} sm={12}>
      <Typography variant="h6" gutterBottom />
        
      
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <TextField
            label="Account number"
            fullWidth
            
            {...getFieldProps('account_number')}
            autoComplete="account_number"
            error={Boolean(touched.account_number && errors.account_number)}
            helperText={touched.account_number && errors.account_number}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="account_name"
            name="account_name"
            label="Account name"
            fullWidth
            autoComplete="account_name"
            {...getFieldProps('account_name')}
            error={Boolean(touched.account_name && errors.account_name)}
            helperText={touched.account_name && errors.account_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="account_email"
            name="account_email"
            label="Email address"
            fullWidth
            autoComplete="account_email"
            {...getFieldProps('account_email')}
            error={Boolean(touched.account_email && errors.account_email)}
            helperText={touched.account_email && errors.account_email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
            {...getFieldProps('account_address')}
            error={Boolean(touched.account_address && errors.account_address)}
            helperText={touched.account_address && errors.account_address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Telephone"
            fullWidth
            autoComplete="phone"
            {...getFieldProps('account_phone')}
            error={Boolean(touched.account_phone && errors.account_phone)}
            helperText={touched.account_phone && errors.account_phone}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="sender_id"
            name="sender_id"
            label="Sms id"
            fullWidth
            autoComplete="sender_id"
            {...getFieldProps('account_sms_id')}
            error={Boolean(touched.account_sms_id && errors.account_sms_id)}
            helperText={touched.account_sms_id && errors.account_sms_id}
          />
        </Grid>
       
      </Grid>
    </Grid>
      </CardContent> 
    <CardActions>
     <LoadingButton
      type="submit"
      variant="contained"

      loading={isSubmitting}
     >
       Edit account
     </LoadingButton>
    </CardActions>
      </Card>
      </Form>
    </FormikProvider>
    </>  
  );
}
