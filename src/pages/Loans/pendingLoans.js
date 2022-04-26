import React from 'react';
import PendingLoans from '../../components/Loans/pending_loans';

import Page from '../../components/Page';


export default function PendingLoansList() {
  return (
    <Page title="Pending loans | Members portal">
      <div>
     
     <PendingLoans />
     
     
   </div>
    </Page>
  );
}