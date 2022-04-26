import React from 'react';
import PendingMessages_ from 'src/components/messaging/pending_messages';

import Page from '../../components/Page';


export default function UsersList() {
  return (
    <Page title="Pending messages | SMS portal">
      <div>
     
     <PendingMessages_/>
     
     
   </div>
    </Page>
  );
}