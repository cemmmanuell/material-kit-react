import React from 'react';
import FailedMessages_ from 'src/components/messaging/failed_messages';

import Page from '../../components/Page';


export default function UsersList() {
  return (
    <Page title="Pending messages | SMS portal">
      <div>
     
     <FailedMessages_/>
     
     
   </div>
    </Page>
  );
}