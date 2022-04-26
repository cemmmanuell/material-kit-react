import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function UploadButton(props) {
  return (
    <ButtonGroup variant="contained" color="primary">
      <Button>Download template</Button>
      <Button >Upload contacts</Button>
     
    </ButtonGroup>
  );
}
