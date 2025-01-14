import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography, Grid } from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Members portal">
      { <AuthLayout>
        <Stack sx={{ mb:2 }}>
       
       
        
       
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/RegisterForm">
          Register for portal access
        </Link>
       </Stack>
      </AuthLayout>}

     

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }} />
          <img alt="register" src="/static/devcologo.png" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
       
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
             Welcome to   Dhamini sacco portal
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
         

          <LoginForm />

          <MHidden width="smUp">
          <Stack sx={{ mb:2 }}>
           
        
       
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/RegisterForm">
          Register for portal access
        </Link>
            </Stack>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
