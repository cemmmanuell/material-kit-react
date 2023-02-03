import React, { Component } from 'react'
import Chart from 'react-google-charts'
import ReactSession from 'react-client-session/dist/ReactSession'
import { CardHeader, Card } from '@material-ui/core'
import { useState } from 'react'
import { Suspense } from 'react';
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
export default function MultiLineChart() {

const user_details=ReactSession.get('user_details');
const[datas, setData]=useState([]);
useEffect(()=> {
const LineData =user_details==undefined  ? <div>Loading Chart</div> : user_details.data.graphHeader;
setData(LineData);
},[])

 



const LineChartOptions = {
  hAxis: {
    title: 'Year',
  },
  vAxis: {
    title: 'Balance',
  },
  series: {
    1: { curveType: 'function' },
  },
}
const Cht=()=>{
    return (
        <div>
        <Chart
         
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data= {datas}
        options={LineChartOptions}
        rootProps={{ 'data-testid': '2' }}
      />
      </div>
    )
    
}


 
    return (
      <div>
        <Card>  
        <CardHeader title="Progression chart" />
        <Suspense fallback="loading..." >
          {datas!=[] ? <Cht/>  : "Loading......" }
       </Suspense>
        </Card>
      </div>
    )
  
}

