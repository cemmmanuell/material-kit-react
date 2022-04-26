import * as Yup from 'yup';
import React from 'react';
import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import {icon} from '@iconify/react';
import arrowleftfill from '@iconify/icons-eva/arrow-right-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { fabClasses, Popover } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {ReactSession} from 'react-client-session';
import { DatePicker } from '@material-ui/lab';
import { TimePicker } from '@material-ui/lab';
import { Card, CardContent, CardActions, CardHeader, Box, Autocomplete } from '@material-ui/core';
import config from "../../config.json";
import ContactsTab from 'src/components/messaging/contacts_tab';
import closesquareoutline from '@iconify/icons-eva/close-square-outline';
import editoutline from '@iconify/icons-eva/edit-outline';
import trashoutline from '@iconify/icons-eva/trash-outline';
import fileoutline from '@iconify/icons-eva/file-outline';
import Page from '../../components/Page';
import SendButton from 'src/components/messaging/sendmessage';
import Icon from '@iconify/react';
import { Button, IconButton } from '@material-ui/core';
import listfill from '@iconify/icons-eva/list-fill';
import { Fab } from '@material-ui/core';
import StaticDatePickerLandscape from './datepicker';
import StaticTimePickerDemo from './timepicker';
import UploadButton from 'src/components/messaging/contacts_upload_buttons';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width:'100%'
  },
  box:{
    width:700,
  },
  box2:{
    width:1000,
  }
}));


export default function Compose() {
  const htmlheaders={
    'Acces-Control-Allow-Origin': config.base_api,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
    
  }

const message =useRef('');
const [open, setOPen]=useState(false);
const [draweropen, setDraweropen]=useState(false);
const[scheduledraweropen, Setscheduledraweropen]=useState(false);
const[uploadopen, OpenUpload]=useState(false);
const[p_, setP]=useState([]);
const handleClose = () => {
  setOPen(false);
};
const toggleDrawer =(p) => {
  console.log(p);
  setDraweropen(true);
  setP(p);

}
const toggleCloseDrawer=()=>{
 
  setDraweropen(false);
  Setscheduledraweropen(false);
  OpenUpload(false);
}
   const classes = useStyles();

  const [rows, SetRows] = useState([]);
  const[selectedrows, SetSelected]=useState([]);
  const [groups, SetGroups]=useState([]);
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      setUserLoaded(false);
      let groupdata= await fetchgroups();
      SetGroups(groupdata);
      let res = await fechdata();
     

        SetRows(res);
       
      
        setUserLoaded(true);
        
      
    })();
  }, []);
  
  async function  fechdata(){
   
    var rowdata=[];
   
   
    await axios.get(`${config.base_api}/contacts`,{headers:htmlheaders})
    .then ((result)=>{
     
      rowdata= result.data;
      var i=0;
      rowdata.forEach(row => {
       // row.group_name=groups.find(r=>r.contact_group_id==row.contact_group).contact_group_name;
        row.id=i++;
      });

     // rowdata.sort((a,b)=>a.localeCompare)
      console.log("ascending",rowdata);
    
   }
    )
    .catch((error)=> console.log("Error message",error));
    console.log(rowdata);
   
    return rowdata;
   
  }
  
 

  async function  fetchgroups(){
   
    var rowdata=[];
   
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
      
    }
    await axios.get(`${config.base_api}/contact_groups`,{headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result);
      rowdata= result.data;
      var i=0;
      rowdata.forEach(row => {
       
        row.id=i++;
      });
      
   }
    )
    .catch((error)=> console.log("Error message",error));

   
    return rowdata;
   
  }
  const handleChange=(values)=>{
    if (values.length!=0){
     // const new_selected_rows=[];
      values.forEach(e => {
       selectedrows.push(e);
     });
      
     //console.log({"Not filtered":new_selected_rows});
     //Unique valus
     
     

     SetSelected(selectedrows);
  }
   console.log(selectedrows);
}
  const handleContacts=(values)=>{
     
     console.log({"Not filtered":values});
     //Unique valus
     
     

     SetSelected(values);

  }
  
  async function onSend ()
  {
   await  axios.post(`${config.base_api}/messages`,
    {
      "entry_date":new Date().toISOString(),
      "message": message.current.value,
      "status":1,
      "sms_details": selectedrows,
      "date_time_send": new Date().toISOString(),
      "customer_account": ReactSession.get('user_details').data.user_customer_account

    },
    {headers:htmlheaders})
    .then ((result)=>{console.log("result",result);
      alert('New message posted');
   
     }
    ); 
    console.log( {
      "entry_date": Date(),
      "message": message.current.value,
      "status":1,
      "date_time_send": Date(),
      "sms_details": selectedrows

    });
  }
  const onDraft=()=>{
    
  }
  
  const onSchedule=()=>{
      Setscheduledraweropen(true);
  }
  const[scheduleDate, ChangeScheduleDate]=useState();
  const[scheduleTime, ChangeScheduleTime]=useState();
  const onChangeTImepicker=(time)=>{
   ChangeScheduleTime(time.toLocaleTimeString());
   console.log(time.toLocaleTimeString());
   console.log(scheduleDate+' '+scheduleTime);
  }
  const onChangeDatepicker=(date)=>{
   ChangeScheduleDate(date.toLocaleDateString());
    console.log(date.toISOString());
  }

  async function scheduleMessage () {
    await  axios.post(`${config.base_api}/messages`,
    {
      "entry_date":new Date().toISOString(),
      "message": message.current.value,
      "status":2,
      "sms_details": selectedrows,
      "date_time_send": new Date(scheduleDate+' '+scheduleTime).toISOString(),
      "customer_account": ReactSession.get('user_details').data.user_customer_account

    },
    {headers:htmlheaders})
    .then ((result)=>{console.log("result",result);
      alert(`New message scheduled for Date:${scheduleDate} Time: ${scheduleTime}` );
   
     }
    ); 
    console.log( {
      "entry_date":new Date().toISOString(),
      "message": message.current.value,
      "status":2,
      "sms_details": selectedrows,
      "customer_account": ReactSession.get('user_details').data.user_customer_account
     

    });
  }

  return (
    <Page title="Compose | SMS portal">
      <div>
        <Card>
          <CardContent>
          <Grid item container spacing={2}>
          <Grid item xs={10}>
            <Autocomplete
              multiple
              id="tags-outlined"
              
              filterSelectedOptions
              
              onChange={(event,values)=>handleContacts(values)}
              options={rows}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              groupBy={(option) => option.contact_group_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Contacts"
                  placeholder="Fill in the contacts"
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={()=>{OpenUpload(true)}} size="large" xs={4}>Import<Icon icon={arrowleftfill}></Icon>  </Button>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={groups}
              
              getOptionLabel={(option) => `${option.contact_group_name} `}
              groupBy={(option) => option.contact_group}
              filterSelectedOptions
              onChange={(event, values)=>toggleDrawer(values)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Contact groups"
                  placeholder="Fill in the contacts"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-full-width"
              label="Message"
              inputRef={message}
              helperText="45/150"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
         
        </Grid>
          </CardContent>
        <CardActions><SendButton send={onSend} draft={onDraft} schedule={onSchedule} /></CardActions>
        </Card>

    <Drawer open={draweropen} anchor={'right'} onClose={toggleCloseDrawer}>
        
     <Box style={{margin:10}} className={classes.box}>
          <ContactsTab groups={p_} rowsSelected={selectedrows} onselection={handleChange}/>
     </Box>
   </Drawer>

   <Drawer open={scheduledraweropen} anchor={'right'} onClose={toggleCloseDrawer}>
        
   <Box  className={classes.box2}>
         <Grid  container >
           <Grid item xs={6}>
         <StaticDatePickerLandscape onChangeDate={onChangeDatepicker}  />
         </Grid>
           <Grid  item xs={6}>
         <StaticTimePickerDemo onChangeTime={onChangeTImepicker} />
         </Grid>
         
         
         </Grid>
         <hr />
         <Grid  container  spacing={3}>
           <Grid item xs={5} />
           <Grid item xs={4}>
         <Button  variant="contained" onClick={scheduleMessage} color="primary">Schedule </Button>
         </Grid>
          <Grid item xs={3} />
         
         </Grid>
        </Box>
     </Drawer>
   <Drawer anchor={'right'} onClose={toggleCloseDrawer} open={uploadopen}>
   <Box style={{margin:10}} className={classes.box}>
     <UploadButton />
   </Box>  
   </Drawer>
      </div>
    </Page>
  );
}
