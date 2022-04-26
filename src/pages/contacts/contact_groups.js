import React from 'react';
import ContactGroupsList from '../../components/contacts/contact_groups';

import Page from '../../components/Page';


export default function ContactGroups() {
  return (
    <Page title="Contact groups  | SMS portal">
      <div>
      <ContactGroupsList />
     
     
   </div>
    </Page>
  );
}
