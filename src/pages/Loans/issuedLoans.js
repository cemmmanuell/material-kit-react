import React from 'react';
import IssuedLoans from '../../components/Loans/issued_loans';

import Page from '../../components/Page';


export default function IssuedLoansList() {
  return (
    <Page title="Issued loans | Members portal">
      <div>
     
     <IssuedLoans />
     
     
   </div>
    </Page>
  );
}