// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import MultiLineChart from 'src/components/_dashboard/app/LoansChart';
import Notifications from 'src/components/users/notifications';
// components
import { Card } from '@material-ui/core';
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  QualifyingAmount
} from '../components/_dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    
    <>
   
    <Page title="Dashboard |Members portal">
      
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        
        <Grid container  xs={12} sm={12} md={12} spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
         </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          
          

         
        </Grid>
       <br/>
        <Grid container spacing={3}>
          
          <Grid item xs={8} sm={8} md={12}>
{/*            
            <MultiLineChart /> */}
            <br />
            <Notifications />
           
          </Grid>

         

         
        </Grid>
      </Container>
    </Page>
    </>
  );
}
