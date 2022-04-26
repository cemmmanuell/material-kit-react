import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Icon from '@iconify/react';

import { Button, IconButton } from '@material-ui/core';
import listfill from '@iconify/icons-eva/list-fill';



export default function DataTable(props) {
  
  return (
    <div style={{ height:400, width: '100%' }}>
      <DataGrid
        
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
