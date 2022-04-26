import React, { Component } from "react";
import { render } from "react-dom";
import { FormUserDetails } from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Confirm from "./Confirm";
import Success from "./Success";
import config from "../../../config.json";
import axios from 'axios';
import Nok from "./Nok";
export class UserForm extends Component {
  state = {
    step: 1
  
   

  };
 
  //Proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState(
    {
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

  handleChangeFile = (input) => (e) => {
   
    this.setState({ [input]:e.target.files[0] });
    console.log(e.target.files[0]);
  };

  handleChangeselect = (input, val)=> {
    console.log(input);
    this.setState({ [input]:val });
  };
  nok =(input,gur)=>{
    this.setState({[input]:JSON.stringify(gur)});
    console.log(gur);
  }
  
  
  post=()=>
  {
    const htmlheaders={
          
      'Accept': 'mulitpart/form-data',
      'Content-Type': 'mulitpart/form-data',
     
    }


    const formData=new FormData();
     formData.append("kraPinAttachment",this.state.kraPinAttachment);
     formData.append("idNoAttachment",this.state.idNoAttachment);
     formData.append("dateOfBirth", this.state.dateOfBirth);
     formData.append("gender", this.state.gender);
     formData.append("maritalStatus", this.state.maritalStatus);
     formData.append("firstName",this.state.firstName);
     formData.append("lastName",this.state.lastName);
     formData.append("postCode",this.state.postCode);
     formData.append( "idNumber",this.state.idNumber);
     formData.append("kraPin",this.state.kraPin);
     formData.append("phoneNo",this.state.phoneNo);
     formData.append("email",this.state.email);
     formData.append("homeTown",this.state.homeTown);
     formData.append("contactPersonName",this.state.contactPersonName);
     formData.append("contactPersonPhone",this.state.contactPersonPhone);
     formData.append("kindata", this.state.nextofkin);



    axios.post(`${config.base_api}/members`,formData,{headers:htmlheaders})
    .then ((result)=>{console.log("result",result);
    this.nextStep();
  }).catch((error)=>{alert('Errror occured please try again or contact the Housing for more information')});

  }

  render() {
    const { step } = this.state;
    const { firstName,
      lastName,
      email,
      dateOfBirth,
      postCode,
      idNumber,
      kraPin,
      maritalStatus,
      gender,
      phoneNo,
      contactPersonName,
      contactPersonRelation,
      contactPersonPhone,
      kraPinAttachment,
      idNoAttachment,
      nextofkin 
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      postCode,
      idNumber,
      kraPin,
      maritalStatus,
      gender,
      phoneNo,
      contactPersonName,
      contactPersonRelation,
      contactPersonPhone
     
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleChangeFile={this.handleChangeFile}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            submit={this.post}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:{
        return (
        <Nok
        nextStep={this.nextStep}
        prevStep={this.prevStep}
        post={this.post}
        guarants={this.nok}
        
        handleChange={this.handleChange}
        values={values}
      />
        );
      }
      case 4:
        return <Success 
        
      />;
     
        
    }
  }
}

export default UserForm;