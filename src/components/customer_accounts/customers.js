import * as Yup from 'yup';
import React from 'react';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
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
import EditCustomer from './edit_customer_account';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width:'100%'
  },
  box:{
    width:700,
  }
}));

const RenderDetailsButton = (params) => {
  const anchorRef = useRef(null);
  const [open, setOPen]=useState(false);
  const [draweropen, setDraweropen]=useState(false);
  const handleClose = () => {
    setOPen(false);
  };
  const toggleDrawer =() => {
    handleClose();
    setDraweropen(true);
  }
  const toggleCloseDrawer=()=>{
    setDraweropen(false);
  }
  const classes = useStyles();
  return (
    <strong>
         
    <IconButton
     ref={anchorRef}
     onClick={(event)=>{
      console.log(params);
      setOPen(true);
                 }}
    >
     

    <Icon icon={listfill} />
             
    </IconButton> 
    <Popover 
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      anchorEl={anchorRef.current}
      >
       <MenuItem
       onClick={toggleDrawer}
       
       >
       <Box><Icon icon={fileoutline} color="primary" /> view  </Box>
       
         
       </MenuItem>
       <MenuItem > 
       <Box><Icon icon={editoutline} /> Edit </Box>
       </MenuItem>
       <MenuItem>
       <Box><Icon icon={trashoutline} /> Delete  </Box>
       </MenuItem>
      </Popover>
      <Drawer open={draweropen}
     onClose={toggleCloseDrawer}
     anchor={'right'}
     
    
   >
     <Box className={classes.box}>
       <EditCustomer customer_details={params.row} />
     </Box>
   </Drawer>
</strong>

     
    )
}
const columns = [
 
  {
    field: 'account_number',
    headerName: 'Account number',
    width: 200,
    editable: false,
  },
  {
    field: 'account_name',
    headerName: 'Account name',
    width: 200,
    editable: true,
  },
  {
    field: 'account_email',
    headerName: 'Email',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'account_phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    
  },{
    field:'ActionButtons',
    
    width:100,
    renderCell:RenderDetailsButton
  }
];







export default function Customers() {




const [rows, SetRows] = useState([]);
const [userLoaded, setUserLoaded] = useState(false);
useEffect(() => {
  (async () => {
    setUserLoaded(false);
    let res = await fechdata();
    
      SetRows(res);
      setUserLoaded(true);
    
  })();
}, []);

async function  fechdata(){

  var rowdata=[];
 
  const htmlheaders={
    'Acces-Control-Allow-Origin': config.base_api,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
    
  }
  await axios.get(`${config.base_api}/customer_accounts`,{headers:htmlheaders})
  .then ((result)=>{
    console.log("result",result);
    rowdata= result.data;
    var i=0;
    rowdata.forEach(row => {
      
      row.id=i++;
    });
    
    return rowdata;
 }
  )
  .catch((error)=> console.log("Error message",error));
  return rowdata;
}


  return (
   
     <Card>
      <CardHeader title="Customers" />
      <CardContent> 
     <Grid xs={12} sm={12}>
      <Typography variant="h6" gutterBottom />
      <Datatable rows={rows} columns={columns} />
       </Grid> 
      </CardContent> 

    <CardActions>
         </CardActions>
      </Card>
    );
}