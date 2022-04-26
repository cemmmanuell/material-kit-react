import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import UserPostForm from '../../components/users/users_post_form';
import Page from '../../components/Page';


export default function UserPost() {
  return (
    <Page title="New user | SMS portal">
      <div>
       
      <UserPostForm />
       
     
   </div>
    </Page>
  );
}
