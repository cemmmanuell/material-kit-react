import React from 'react';
import { useState, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';

import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardActions, CardHeader, Box } from '@material-ui/core';
import Page from '../../components/Page';
import Display from '../../pages/Statements/display';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      width:'100%'
    },
    box:{
      width:800,
    }
  }));
  export default function MemberStatement(props) {
  const anchorRef = useRef(null);
  const [open, setOPen]=useState(false);
  const [draweropen, setDraweropen]=useState(props.state);
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
    
    <Page title="Fee statetent | portal">
       
      <div>
     
      <Drawer open={draweropen}
      onClose={toggleCloseDrawer}
     anchor={'right'}
     
    
   >
    <Display />
   </Drawer>
     
     
   </div>
    </Page>
  );
}