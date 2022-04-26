import React, { Component } from "react";
import { render } from "react-dom";
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Confirm from "./Confirm";
import Success from "./Success";
import {ReactSession} from 'react-client-session';
import config from "../../config.json";
import axios from 'axios';
import Uploads from "./Uploads";
export class ApplyLoan extends Component {
  state = {
    step: 1
   
   

  };
 
  //Proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  //handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  handleChangeselect = (input, val)=> {
    console.log(input);
    this.setState({ [input]:val });
  };
  guarants =(input,gur)=>{
    this.setState({[input]:gur});
    console.log(gur);
  }
  uploads =(input,gur)=>{
    this.setState({[input]:gur});
    console.log(gur);
  }
  
  post=()=>
  {
    
    console.log( {
      "memberNo":ReactSession.get('user_details').data.no,
      "loanProduct":this.state.loanProduct,
      "installments": parseInt(this.state.installments),
      "amount":parseFloat(this.state.amount),
      "guarantors": this.state.guarantors,
      "files":JSON.stringify(this.state.files)
  });

    const htmlheaders={
          
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    }
    axios.post(`${config.base_api}/loans`,
    {
        "memberNo":ReactSession.get('user_details').data.no,
        "loanProduct":this.state.loanProduct,
        "installments": parseInt(this.state.installments),
        "amount":parseFloat(this.state.amount),
        "guarantors": this.state.guarantors,
        "files":JSON.stringify(this.state.files)
    },
     {headers:htmlheaders})
     .then ((result)=>{
      console.log("result",result);
      if (result.status==401){
        alert('Error occured')
      }
      if (result.status==415){
        alert('Error occurer')
      } 
      if (result.status==200){
        this.nextStep();
      }
      if (result.status==400){
        alert(result.data)
      } 
    
   }
    )  .catch((error)=> { console.log("Error message",error)
    alert(error)
    
     }); 
  
 

  }


  render() {
    const { step } = this.state;
    const { 
    
        
       
        loanProduct,
        installments,
        amount,
        guarantors,
        files
       
    
    
     
    } = this.state;
 
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleChangeselect={this.handleChangeselect}
           
          />
        );
      case 2:
        return (
          <FormPersonalDetails
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          post={this.post}
          handleChange={this.handleChange}
          guarants={this.guarants}
        
          />
        );
      case 3: return (
        <Uploads
        nextStep={this.nextStep}
        prevStep={this.prevStep}
        post={this.post}
        handleChange={this.handleChange}
        uploads={this.uploads}
      
        />
      )

      case 4:
        return <Success 
        
        />;
     
        
    }
  }
}

export default ApplyLoan;