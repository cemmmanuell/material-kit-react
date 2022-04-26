import React from 'react';
import Transactions from '../../components/Transactions/transactions';

import Page from '../../components/Page';


export default function TransactionsList() {
  return (
    <Page title="Ministatement | Members portal">
      <div>
     
     <Transactions />
     
     
   </div>
    </Page>
  );
}