import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { CardHeader, Card, CardContent,  Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { fDateTime } from "src/utils/formatTime";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useRef } from 'react';
import ReactSession from "react-client-session/dist/ReactSession";
import { Autocomplete } from "@material-ui/core";
import Datatable from '../table';
import { fDate } from "src/utils/formatTime";
import Page from '../../components/Page';
import axios from "axios";
import config from '../../config.json';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { map } from "lodash";
export default function Notifications() {
    const [rows, SetRows] = useState([]);
    

      useEffect(async()=> {
        let res = await fechdata();
          
        SetRows(res);
        console.log(res);
        },[])
      
      async function  fechdata(){
      
        var rowdata=[];
       
        const htmlheaders={
          'Acces-Control-Allow-Origin': config.base_api,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ReactSession.get('user_details').data.token_string}`,
          
        }
        await axios.get(`${config.base_api}/notifications`,{headers:htmlheaders})
        .then ((result)=>{
          console.log("result",result);
          rowdata=result.data;
          var i=0;
            rowdata.forEach(row => {
            
              row.id=i++;
          });
          //SetRows(rowdata.data);

          
          return rowdata;
       }
        )
        .catch((error)=> console.log("Error message",error));
        return rowdata;
      }
      

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      const Feed =()=>{
        return (
          <div>
           </div>
        )
      }
 
    return (
       <Card >
          <CardHeader title="Housing Notice Board"/>

          <CardContent>
          <Slider  {...settings}>
          
           
          {rows.map(i=>
            {
             return (
             <div>
             <h2>{i.message}</h2>
             <h5>{fDateTime(i.dateTime)}</h5> 
             <h5>{i.author}</h5>
             </div>
             )
            })
            }
         
           
          
         
        </Slider>
          </CardContent>
       </Card>
    );
  }

