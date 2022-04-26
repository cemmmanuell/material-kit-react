import * as Yup from 'yup';
import React from 'react';
import { useState } from 'react';
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
export default function ContactForm() {
  const history = useNavigate();
  const AccountSchema =Yup.object().shape({
    first_name: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Name is required'),
    last_name: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Name is required'),
    email: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Email is required')
    .email('Valid email is require'),
    phone_number: Yup.string()
    .min(0, 'Too short')
    .max(10, 'Too long')
    .required('Phone is required')
    
  
  
  });
  const formik =useFormik({
    initialValues:{
     first_name:'',
     last_name:'',
     email:'',
     phone_number:''
  
  
    },
    validationSchema:AccountSchema,
    onSubmit: (values) => {
      
      
      const htmlheaders={
        'Acces-Control-Allow-Origin': config.base_api,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`
      }
      axios.post(`${config.base_api}/contacts`,{
          "first_name":values.first_name,
          "last_name":values.last_name,
          "phone_number":values.phone_number,
          "email":values.email
      },{headers:htmlheaders})
      .then ((result)=>{console.log("result",result);
      alert('New cotnact added');
      
        history('/dashboard/contact_list');
       
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
      <CardHeader title="Add new contact" subheader="contact details" />
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
            autoComplete="given-name"
            error={Boolean(touched.first_name && errors.first_name)}
            helperText={touched.first_name && errors.fisrt_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            {...getFieldProps("last_name")}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            error={Boolean(touched.last_name && errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="lastName"
            name="lastName"
            {...getFieldProps("email")}
            label="Email address"
            fullWidth
            autoComplete="family-name"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="lastName"
            name="lastName"
            {...getFieldProps("phone_number")}
            label="Phone number"
            fullWidth
            autoComplete="family-name"
            error={Boolean(touched.phone_number && errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
          />
        </Grid>
       
      </Grid>
    </Grid>
      </CardContent> 
    <CardActions>
      <LoadingButton loading={isSubmitting} type="submit"  variant="contained" color="primary">Save</LoadingButton>
    </CardActions>
      </Card>
      </Form>
      </FormikProvider>
   </>
  );
}
