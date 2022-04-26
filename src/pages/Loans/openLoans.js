import React from 'react';
import OpenLoans from 'src/components/Loans/open_loans';

import Page from '../../components/Page';


export default function OpenLoansList() {
  return (
    <Page title="Open loans | Members portal">
      <div>
     
     <OpenLoans />
     
     
   </div>
    </Page>
  );
}