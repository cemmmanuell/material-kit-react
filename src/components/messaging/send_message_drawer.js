import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function SendMesssageDrawer(props) {
  return (
    <ButtonGroup variant="contained" color="primary">
      <Button onCLick={()=>props.send()}>Send now</Button>
       <Button onClick={()=>props.schedule()}>Schedule message</Button>
      <Button>Save as draft</Button>
    </ButtonGroup>
  );
}
