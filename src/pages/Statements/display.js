
import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { Viewer } from '@react-pdf-viewer/core';

import { Document } from 'react-pdf';

import Page from '../../components/Page';
import { ReactSession } from 'react-client-session';
import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Suspense } from 'react';
import { getFilePlugin } from '@react-pdf-viewer/get-file';


import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { Popover } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';

import { Card, CardContent, CardActions, CardHeader, Box } from '@material-ui/core';

import config from "../../config.json";
import Icon from '@iconify/react';

import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      width:'100%'
    },
    box:{
      width:800,
    }
  }));

  export const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
    }
export default function Display (){
const classes = useStyles();
const [rows, SetRows] = useState('');
const [bs, setBs]=useState('');
const [url, setUrl]=useState('');
const [userLoaded, setUserLoaded] = useState(false);
// Your render function
const getFilePluginInstance = getFilePlugin();
const { DownloadButton } = getFilePluginInstance;

  
 useEffect( async()=> {
   
   let res =await fechdata();
    
      
 //   var blob = new Blob([res], {type: 'application/pdf'});
   //  var url = URL.createObjectURL(blob);
      console.log(res.data.byteString);
     
      const base64 ='data:application/pdf;base64,'+res.data.byteString;
      const pdfContentType = 'application/pdf';

const base64toBlob = (data) => {
  console.log({"data":data})
// Cut the prefix `data:application/pdf;base64` from the raw base 64
const base64WithoutPrefix = data.substr(`data:${pdfContentType};base64,`.length);

const bytes = atob(base64WithoutPrefix);
let length = bytes.length;
let out = new Uint8Array(length);

while (length--) {
    out[length] = bytes.charCodeAt(length);
}

return new Blob([out], { type: pdfContentType });
};
  var rl=URL.createObjectURL(base64toBlob(base64));
  SetRows(rl);


  
 
},[])


const Add=()=>{
  return (
    <div
        className="rpv-core__viewer"
        style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}
    >
        <div
            style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                padding: '4px',
            }}
        >
            <DownloadButton />
        </div>
        <div
            style={{
                flex: 1,
                overflow: 'hidden',
            }}
        >
        <Viewer fileUrl={rows} plugins={[getFilePluginInstance]} />
        </div>
        </div>
  )
}

async function  fechdata(){

  var rowdata=[];
 
  const htmlheaders={
    'Acces-Control-Allow-Origin': config.base_api,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
    
  }
 await  axios.get(`${config.base_api}/memberStatement?no=${ReactSession.get('user_details').data.no}`,{headers:htmlheaders})
  .then ((result)=>{
    console.log("result",result);
      rowdata=result;
    
    return rowdata;
 }
  )
  .catch((error)=> console.log("Error message",error));
  return rowdata;
}


   
    return (
      <Box className={classes.box}>
    
           <div
          style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              height: '750px',
          }}
      >
       <Suspense fallback="loading..." >
          {rows!="" ? <Add/>  : "Loading......" }
       </Suspense>
      
      
      
     
      </div>
    
      </Box>
    )
}