import React from 'react';
import GuaranteedLoans from 'src/components/Loans/guaranteed';

import Page from '../../components/Page';


export default function GuaranteedLoansList() {
  return (
    <Page title="Guaranteed loans list | Members portal">
      <div>
     
     <GuaranteedLoans />
     
     
   </div>
    </Page>
  );
}