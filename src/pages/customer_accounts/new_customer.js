import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import NewCustomerForm from '../../components/customer_accounts/new_customer_form';
import Page from '../../components/Page';


export default function NewCustomerAccount() {
  return (
    <Page title="New customer account | SMS portal">
      <div>
       
      <NewCustomerForm />
       
     
   </div>
    </Page>
  );
}
