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
import { fDate } from 'src/utils/formatTime';
import { fNumber } from 'src/utils/formatNumber';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width:'100%'
  },
  box:{
    width:700,
  }
}));









export default function LoanDetails(props) {




const [rows, SetRows] = useState({});
const [userLoaded, setUserLoaded] = useState(false);
useEffect(() => {
  (async () => {
    setUserLoaded(false);
    let res = await fechdata();
    console.log({loanDetails: res});
    SetRows(res);
    setUserLoaded(true);
  }
  )();
}, []);

async function  fechdata(){

  var rowdata=[];
 
  const htmlheaders={
    'Acces-Control-Allow-Origin': config.base_api,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
    
  }
  await axios.get(`${config.base_api}/loanProfile?loanno=${props.loanNo}`,{headers:htmlheaders})
  .then ((result)=>{
    console.log("result",result);
    rowdata= result.data;
    
    return rowdata;
 }
  )
  .catch((error)=> console.log("Error message",error));
  return rowdata;
}

const salaryColumns=[
  {
    field: 'description',
    headerName: 'Payroll item',
    width: 200,
    editable: false,
  },
  {
    field:'amount',
    headerName: 'Amount',
    width: 200,
    type:'number',
    editable: false,
  }
]

const guarantorColumn =[
  {
    field: 'loanee',
    headerName: 'Guarantor name',
    width: 200,
    editable: false,
  },
  {
    field:'amount',
    headerName: 'Amount guaranteed',
    width: 200,
    type:'number',
    editable: false,
  }
]
const LoanData=()=>
{
    return (
        <div>
     <Grid container >  
     <Grid item xs={6} sm={6} md={6}>
        
          
            
            <TextField
             
              label="Loan no"

              InputLabelProps={{ shrink: true }}  
              margin="normal"
              disabled
              value={rows.loanNo}
              
            />
          
           

          <TextField
             
             label="Loan product"
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             value={rows.loanProduct}
           
           />

            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Installments"
              value={rows.installments}
           
           />
            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Repayment frequency"
              value={rows.repaymentFrequency}
           
           />
            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Interest rate"
              value={rows.interest}
           
           />

             <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Repayment start date"
              value={fDate(rows.repaymentStartDate)}
           
           />
          

           <br/>
          
          
     </Grid>

     <Grid item xs={6} sm={6} md={6}>
        
          
            
            <TextField
             
              label="Status"

              InputLabelProps={{ shrink: true }}  
              margin="normal"
              disabled
              value={rows.status}
              
            />
          
           

          <TextField
             
             label="Requested amount"
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             value={fNumber(rows.requestedAmount)}
           
           />

            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Approved amount"
              value={fNumber(rows.approvedAmount)}
           
           />
            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Repayment "
              value={fNumber(rows.repayment)}
           
           />
            <TextField
             
             InputLabelProps={{ shrink: true }}  
             disabled
             margin="normal"
             label="Expected completion date"
              value={fDate(rows.expectedCompletionDate)}
           
           />

           
          

           <br/>
          
          
     </Grid>
     </Grid>     
     <Grid container>
     <CardHeader title="Guarantors" />
     <Grid item xs={12} sm={12} md={12}>
     <Datatable rows={rows.guarantors} columns={guarantorColumn} />
     </Grid>  
     </Grid>

     <Grid container>
     <CardHeader title="Salary details" />
     <Grid item xs={12} sm={12} md={12}>
     <Datatable rows={rows.salary} columns={salaryColumns} />
     </Grid>  
     </Grid>
        </div>
    )

}

 return (
   
     <Card>
      <CardHeader title="Loan details" />
      <CardContent> 

     <Grid xs={12} sm={12}>
     <Typography variant="h6" gutterBottom />

       {userLoaded ? <LoanData /> : "Loanding...." }
     
     </Grid> 

     
      </CardContent> 
 
      </Card>
    );
}
