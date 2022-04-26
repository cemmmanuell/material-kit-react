import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Navigate } from 'react-router';

export default function ResponsiveDialog(props) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
   
  

  return (
    <div>
      
      <Dialog
        fullScreen={fullScreen}
        open={props.state}
        onClose={props.close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">"Regitration successful"</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Do you want to login now or later?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close} color="secondary">
            Login later
          </Button>
          <Button onClick={props.open} color="primary" autoFocus>
            Login 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
