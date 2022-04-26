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

export default function TeamPostForm() {
  const history = useNavigate();
  const AccountSchema =Yup.object().shape({
    user_group_name: Yup.string()
    .min(5, 'Too short')
    .max(49, 'Too long')
    .required('Name is required')
    
  
  
  });
  const formik =useFormik({
    initialValues:{
     user_group_name:''
  
  
    },
    validationSchema:AccountSchema,
    onSubmit: (values) => {
      
      
      const htmlheaders={
        'Acces-Control-Allow-Origin': config.base_api,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`
      }
      axios.post(`${config.base_api}/user_groups`,{
          "user_group_name":values.user_group_name
      },{headers:htmlheaders})
      .then ((result)=>{console.log("result",result);
      alert('New team added');
      
        history('/dashboard/teams_list');
       
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
      <CardHeader title="Add new team" subheader="Team  details" />
      <CardContent> <Grid xs={12} sm={6} >
      <Typography variant="h6" gutterBottom />
        
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="alias"
            name="Alias"
            label="Alias"
            {...getFieldProps("user_group_name")}
            fullWidth
            autoComplete="given-name"
            error={Boolean(touched.user_group_name && errors.user_group_name)}
            helperText={touched.user_group_name && errors.user_group_name}
          />
        </Grid>
       
      
       
       
      </Grid>
    </Grid>
      </CardContent> 
    <CardActions>
      < LoadingButton loding={isSubmitting} type="submit" variant="contained" color="primary">Save</LoadingButton>
    </CardActions>
      </Card>
      </Form>
</FormikProvider>
</>
  );
}

