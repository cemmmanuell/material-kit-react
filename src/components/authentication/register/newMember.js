import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';

import { Steps, Step } from "react-step-builder";
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import {ReactSession} from 'react-client-session';
import ResponsiveDialog from 'src/components/Dialog';
import Generalinfo from './generalinfo';


export default function Newmember (){
    return (
        <div>
        <Steps>
           <Step component={Icon}/>
        </Steps>
        </div>
    )
}