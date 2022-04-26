import React, { Component } from "react";
import { render } from "react-dom";
import { FormUserDetails } from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import RegisterPortal from "./registerPortal";
import { ConfirmPortal } from "./confirmPortal";
import Confirm from "./Confirm";
import Success from "./Success";
import config from "../../../config.json";
import axios from 'axios';
import LoginForm from './../../authentication/login/LoginForm';

export class RegistrationForm extends Component {
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
  
  register=()=>
  {
    const htmlheaders={
          
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    }
    axios.post(`${config.base_api}/Register`,{
     
      "idno":this.state.idNumber

      
      
    },
     {headers:htmlheaders})
    .then ((result)=>
    
    {
      console.log("result",result);
      this.setState({otp:result.data.otp});
      if(result.status==200){
        //const navigate = useNavigate();
       this.nextStep();
      }else
      {
        alert('You have entered incorrect details');
      }

    }
  
  ).catch((error)=> {
     console.log("Error message",error);
     alert('Error occured please try again');
    });
  
  }

  confirm=()=>
  {
    if(this.password!==this.confirmPassword){
      alert('Passwords do not match');
    }
    const htmlheaders={
          
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    }
    axios.post(`${config.base_api}/Confirm_registration`,{
      "userName":this.state.idNumber,
      "otp":this.state.otp,
      "password":this.state.password
      
      
    },
     {headers:htmlheaders})
    .then ((result)=>
    
    {
      console.log("result",result);
      this.setState({otp:result.data.otp});
      this.nextStep();
     // navigate('/login');

     }
  
  ).catch((error)=> {
     console.log("Error message",error);
     alert(error);
    });
  
  }

  render() {
    const { step } = this.state;
    const {
      memberNo, 
      idNumber,
      otp,
      password, 
      confirmPassword
     
    } = this.state;
    const values = {
      memberNo, 
      idNumber,
      otp,
      password, 
      confirmPassword
     
    };

    switch (step) {
      case 1:
        return (
          <RegisterPortal
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            register={this.register}
            values={values}
          />
        );
      case 2:
        return (
          <ConfirmPortal
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            submit={this.post}
            confirm={this.confirm}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
        <LoginForm />
         ) ;
     
        
    }
  }
}

export default RegistrationForm;