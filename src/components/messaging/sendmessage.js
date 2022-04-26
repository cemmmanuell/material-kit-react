import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function SendButton(props) {
  return (
    <ButtonGroup variant="contained" color="primary">
      <Button  onClick={props.send}>Send now</Button>
       <Button onClick={props.schedule}>Schedule message</Button>
      <Button>Save as draft</Button>
    </ButtonGroup>
  );
}
