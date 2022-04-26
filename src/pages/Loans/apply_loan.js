
import React from 'react';
import { ApplyLoan } from 'src/components/Loans/apply_loan';

import Page from '../../components/Page';


export default function ApplyLoanForm() {
  return (
    <Page title="Loan application form | Members portal">
      <div>
     
     <ApplyLoan />
     
     
   </div>
    </Page>
  );
}