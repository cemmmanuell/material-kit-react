import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import ContactForm from '../../components/contacts/contact_form';
import Page from '../../components/Page';


export default function NewContact() {
  return (
    <Page title="New contact | SMS portal">
      <div>
       
          <ContactForm />
          
        
      </div>
    </Page>
  );
}
