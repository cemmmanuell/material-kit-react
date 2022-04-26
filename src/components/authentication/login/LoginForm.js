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


export default function LoginForm() {
  const {handleAuthenticateUser, isTimedOut} = useContext(AppStateContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIssubmittiong]=useState(false);
  const { createProxyMiddleware } = require('http-proxy-middleware');
  const LoginSchema = Yup.object().shape({
    user_name: Yup.string().required('Member no is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      user_name: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setIssubmittiong(true);
      if(config.admin==values.user_name && config.password==values.password){
        const htmlheaders={
          
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         
        }
        axios.post(`${config.base_api}/adminlogin`,{
          "user_name":values.user_name,
          "password":values.password,
          
        },
         {headers:htmlheaders})
        .then ((result)=>{console.log("result",result);
          
        ReactSession.set("user_details", result);
        handleAuthenticateUser();
         navigate('/dashboard');
         
       }
        )
        .catch((error)=> console.log("Error message",error))
        

      }else{
     const htmlheaders1={
        'Acces-Control-Allow-Origin': config.base_api,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      }
    
      axios.post(`${config.base_api}/login`,{
        "userName":values.user_name,
        "password":values.password,
        
      },{headers:htmlheaders1})
      .then ((result)=>{
        console.log("result",result);
        if (result.status==401){
          alert('Invalid credentials')
        }
        if (result.status==415){
          alert('Invalid credentials')
        } 
       if(result.status==200){ 
     
        result.data.graphData.forEach(element => {
          result.data.graphHeader.push(element);
        });

      ReactSession.set("user_details", result);
      handleAuthenticateUser();
      navigate('/dashboard');
       }
     }
      )
      .catch((error)=> { console.log("Error message",error)
      alert('Authentification failed');
      setIssubmittiong(false);
       }); 
       
      }
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
            autoComplete="username"
            type="text"
            label="ID NUMBER"
            {...getFieldProps('user_name')}
            error={Boolean(touched.user_name && errors.user_name)}
            helperText={touched.user_name && errors.user_name}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} to="/RegisterForm" variant="subtitle2">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
   
   
    </>
  );
}
