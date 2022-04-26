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

export default function Profile() {
  const [user_details, setUser_details]=useState(ReactSession.get('user_details'));
  const kindata =[
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: false,
    },
    {
      field:'idno',
      headerName: 'Id number',
      width: 200,
      type:'text',
      editable: false,
    },
    {
      field: 'relationship',
      headerName: 'Relationship',
      width: 200,
      editable: false,
    },
    {
      field:'allocation',
      headerName: 'Allocation',
      width: 200,
      type:'number',
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      width: 200,
      editable: false,
    },
    {
      field:'email',
      headerName: 'Email',
      width: 200,
      type:'text',
      editable: false,
    }
  ]
  
   
    return (
      <Page title="User profile | Members portal">
      <Grid xs={12} sm={12} md={12}>
        <CardHeader title="General information" />
        <Grid spacing={2} container xs={6} sm={12} md={12}>
         
        <Grid item xs={6} sm={6} md={5}>
        <TextField
             
             label="No"
             placeholder="Member No"
             type="text"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.no} 
             margin="normal"
             fullWidth
           
           />
           <TextField
             
             label="Name"
             placeholder="Enter guratantor name"
             type="text"  
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.name} 
             margin="normal"
             fullWidth
           />

          <TextField
             
             label="Staff No"
             placeholder="Enter amount you wish to be guaranteed"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.payrollNo} 
             margin="normal"
            fullWidth
           />

          <TextField
             
             label="Id No"
             placeholder="Enter amount you wish to be guaranteed"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.idNumber} 
             margin="normal"
            fullWidth
           />
          <TextField
             
             label="Address"
             placeholder="Enter amount you wish to be guaranteed"
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.address} 
             disabled
             margin="normal"
            fullWidth
           />
        </Grid>

        <Grid item xs={6} sm={6} md={5}>
        <TextField
             
             label="Kra pin"
             placeholder="Kra pin"
             type="text"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.kraPin} 
             margin="normal"
             fullWidth
           
           />
           <TextField
             
             label="Marital status"
             placeholder="Marital status"
             type="text"  
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.maritalStatus} 
             margin="normal"
             fullWidth
           />

          <TextField
             
             label="Gender"
             placeholder="Gender"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.gender} 
             margin="normal"
            fullWidth
           />

          <TextField
             
             label="Date of birth "
             placeholder="Date of birth "
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : fDate(user_details.data.dateOfBirth)} 
             margin="normal"
            fullWidth
           />
         
        </Grid>
      
       </Grid>


       </Grid>
       <Grid xs={12} sm={12} md={12}>
       <CardHeader title="Contact information" />
        <Grid spacing={2} container xs={6} sm={12} md={12}>
        <Grid item xs={6} sm={6} md={5}>
        <TextField
             
             label="Phone number"
             placeholder="Member No"
             type="text"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.phoneNo} 
             margin="normal"
             fullWidth
           
           />
           <TextField
             
             label="Email"
             placeholder="Enter guratantor name"
             type="text"  
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.email} 
             margin="normal"
             fullWidth
           />

          <TextField
             
             label="Home town"
             placeholder="Enter amount you wish to be guaranteed"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.homeTown} 
             margin="normal"
            fullWidth
           />

        
        </Grid>

        <Grid item xs={6} sm={6} md={5}>
        <TextField
             
             label="Contact person"
             placeholder="Contactperson"
             type="text"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.contactPersonName} 
             margin="normal"
             fullWidth
           
           />
           <TextField
             
             label="Contact person phone number"
             placeholder="Enter guratantor name"
             type="text"  
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.contactPersonPhone} 
             margin="normal"
             fullWidth
           />

          <TextField
             
             label="Contact person relation"
             placeholder="Enter amount you wish to be guaranteed"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.contactPersonRelation} 
             margin="normal"
            fullWidth
           />

        
        </Grid>
        </Grid>  
       </Grid>

       <Grid xs={12} sm={12} md={12}>
       <CardHeader title="Bank details" />
        <Grid spacing={2} container xs={6} sm={12} md={12}>
        <Grid item xs={6} sm={6} md={5}>
        <TextField
             
             label="Bank name"
             placeholder="Bank name"
             type="text"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.bankName} 
             margin="normal"
             fullWidth
           
           />
           <TextField
             
             label="Bank account no"
             placeholder="Bank account no"
             type="text"  
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.bankAccountNo} 
             margin="normal"
             fullWidth
           />

          <TextField
             
             label="Bank branch"
             placeholder="Bank branch"
             disabled
             value={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.bankBranch} 
             margin="normal"
            fullWidth
           />

        
        </Grid>

        
        </Grid>  
       </Grid>

       <Grid xs={12} sm={12} md={12}>
       <CardHeader title="Kin details" />
        <Grid spacing={2} container xs={6} sm={12} md={12}>
        <Grid item xs={8} sm={8} md={10}>
         <Datatable columns={kindata} rows={ user_details==undefined  ? <Navigate to="/login" /> : user_details.data.kindata } />

        
        </Grid>

        
        </Grid>  
       </Grid>

       </Page>
    );
  }

