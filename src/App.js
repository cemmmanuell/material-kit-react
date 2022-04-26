// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import {ReactSession} from 'react-client-session';
import { AppStateProvider } from "./Context";
import Footer from './Footer';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Box,
  Button,
  
  } from '@material-ui/core';
// ----------------------------------------------------------------------

export default function App() {
  ReactSession.setStoreType("sessionStorage");
  return (
    <div className="App">
    <AppStateProvider>
    <ThemeConfig>
      <ScrollToTop />
      
      <Router />
    </ThemeConfig>

    
    </AppStateProvider>
    <Footer/>
    </div>
  );
}
