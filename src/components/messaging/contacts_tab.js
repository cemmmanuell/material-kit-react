import * as React from 'react';
import {useEffect, useState} from 'react'
import { Tabs, Tab, Box } from '@material-ui/core';
import Icon from '@iconify/react';
import addicon from '@iconify/icons-eva/plus-square-fill';
import { Fab } from '@material-ui/core';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {ReactSession} from 'react-client-session';
import config from './../../config.json'
import { forEach } from 'lodash';
export default function ContactsTab(props) {
  const [value, setValue] = React.useState(props.groups[props.groups.length-1]!=undefined ? props.groups[props.groups.length-1].contact_group_id :'');
  const [rows, SetRows] =React.useState([]);
  const [selectedRows, SetSelected]=React.useState(props.rowsSelected);
  const [userLoaded, setUserLoaded] = useState(false);
  const  handleChange = async (event, newValue) => {
    setValue(newValue);

    let res = await fechdata(newValue);
      
    
    SetRows(res);
    
  };
 
  async function  fechdata(contact_group){
   
    var rowdata=[];
   
    const htmlheaders={
      'Acces-Control-Allow-Origin': config.base_api,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
      
    }
    await axios.get(`${config.base_api}/contacts`,{headers:htmlheaders})
    .then ((result)=>{
      console.log("result",result);
      rowdata= result.data.filter(dt=>dt.contact_group==contact_group);
     console.log(value);
      var i=1;
      rowdata.forEach(row => {
        
        row.id=i++;
      });
      
   }
    )
    .catch((error)=> console.log("Error message",error));

   
    return rowdata;
   
  }
  
  useEffect(() => {
    const value_=value;
    (async () => {
      setUserLoaded(false);
      let res = await fechdata(value);
      

        SetRows(res);
      
      
        setUserLoaded(true);
      
    })();
  }, []);
  const columns = [
    {
        field: 'id',
        
    },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 200,
      editable: false,
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 200,
      editable: true,
    },

    {
      field: 'phone_number',
      headerName: 'Phone number',
      width: 200,
      editable: true,
    }

   
  ];
  

 

  const handleRowSelection = (e) => {
      //filter selection
  /*  const new_rows=[]
    e.forEach(f => {
        new_rows.push(rows.find(r=>r.id==e))
    });  */
    
   //setSelection();
  /*   console.log(new_rows);
    props.onselection(new_rows); */
    console.log(e);
    SetRows(e);
  };



  return (
    <Box sx={{ width: '100%' }}>
        <h2>Select contact from groups</h2>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      
      >
        {  
            props.groups.map(p=>(
                <Tab value={p.contact_group_id} label={p.contact_group_name} />
                 
        ))
            
        }
       
        
      </Tabs>
        <div style={{ minHeight:400, height:500, maxHeight:600, width: '100%'  }} >
      <DataGrid
        
        pageSize={10}
        checkboxSelection
       
        onSelectionModelChange={(vals)=>{
            SetRows(vals);
        }}
        key={rows.id}
        rows={rows}
        columns={columns}
      />
       </div>
    </Box>
  );
}
