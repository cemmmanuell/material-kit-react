import * as Yup from 'yup';
import { useState, useContext } from 'react';
import {ReactSession} from 'react-client-session';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import config from "../../../config.json";
import axios from 'axios';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------
import {AppStateContext} from './../../../Context';


export default function SetPassword() {
  const {handleAuthenticateUser, isTimedOut} = useContext(AppStateContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIssubmittiong]=useState(false);
  const { createProxyMiddleware } = require('http-proxy-middleware');
  const LoginSchema = Yup.object().shape({
    user_email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password:  Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    }).required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      user_email: '',
      password: '',
      confirm_password:'',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setIssubmittiong(true);
   
     const htmlheaders1={
        'Acces-Control-Allow-Origin': config.base_api,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      }
    
      axios.put(`${config.base_api}/set_password`,{
        "user_email":values.user_email,
        "user_password_hash":values.password
        
        
      },{headers:htmlheaders1})
      .then ((result)=>{console.log("result",result);
        if (result.status==401){
          alert('Invalid credentials')
        }
        if (result.status==415){
          alert('Invalid credentials')
        } 
       if(result.status==200)
       { 
        
       ReactSession.set("user_details", result);
       navigate('/dashboard');
       }
     }
      )
      .catch((error)=> console.log("Error message",error)) 
        alert(error);
        setIssubmittiong(false);
      
    }
    

     
    
  });

  const { errors, touched, values,  handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

        <TextField
            fullWidth
            autoComplete="current-password"
            type="text"
            label="Email address"
            {...getFieldProps('user_email')}
           
            error={Boolean(touched.user_email && errors.user_email)}
            helperText={touched.user_email && errors.user_email}
          />

        <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password "
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirm password"
            {...getFieldProps('confirm_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirm_password && errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          

         
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Set password
        </LoadingButton>
      </Form>
    </FormikProvider>
   
   
    </>
  );
}
