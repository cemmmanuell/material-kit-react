import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
//
import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import IdleTimer from 'react-idle-timer';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import SessionTimeout from 'src/SessionTimeOut';
import {AppStateContext} from "./../../Context";
import { useContext, useEffect } from 'react';
import {FcFolder, FcCollaboration, FcHome, FcAddressBook, FcAssistant, FcBarChart, FcCalendar}  from 'react-icons/fc';

import { ReactSession } from 'react-client-session';
// ----------------------------------------------------------------------
const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  
  let sidebarConfig=[];
    

  const userDetails= ReactSession.get('user_details')!=undefined ? ReactSession.get('user_details').data : {};
  
  if(userDetails.user_customer_account==null)
  {
  
    sidebarConfig= [
    
      {
        title: 'dashboard',
        path: '/dashboard/app',
       
        icon: <FcHome width={220} height={22} />
      }
    
     ,
      {
        title: 'Statements',
        path: '', 
        icon: < FcCalendar width={22} height={22} />,
        children: [
          {
            title: 'Detailed account statement',
            path: '/Dashboard/memberstatement',
            icon: getIcon(peopleFill)
          }
        ]
      },
     
      {
        title: 'Feedback',
        path: '',
        icon: <FcBarChart width={22} height={22} /> ,
        children: [
          {
            title: 'Feedback',
            path: '/Dashboard/feedback',
            icon: getIcon(peopleFill)
          }
        ]
      }
    
      
      
     
    ];
  }else
  {
      
    sidebarConfig=[
    
      {
        title: 'dashboard',
        path: '/dashboard/app',
       
        icon: <FcHome width={220} height={22} />
      },
      {
        title: 'Messaging',
        path: '',
        icon: <FcCollaboration width={22} height={22}  />,
        children: [
          {
            title: 'Compose message',
            path: '/Dashboard/compose',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Draft message',
            path: '/dashboard/draft',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Sent messages',
            path: '/dashboard/sent_messages',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Pending messages',
            path: '/dashboard/pending_messages',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Failed messages',
            path: '/dashboard/failed_messages',
            icon: getIcon(peopleFill)
          }
        ]
      },
      {
        title: 'Contacts',
        path: '',
        icon: < FcAddressBook width={22} height={22} />,
        children: [
          {
            title: 'New contact',
            path: '/dashboard/new_contact',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Contacts',
            path: '/dashboard/contact_list',
            icon: getIcon(peopleFill)
          },
          {
            title: 'New contact group',
            path: '/dashboard/contact_group_new',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Contact groups',
            path: '/dashboard/contact_group_list',
            icon: getIcon(peopleFill)
          }
        ]
      },
      {
        title: 'Team',
        path: '', 
        icon: < FcAssistant width={22} height={22} />,
        children: [
          {
            title: 'New user ',
            path: '/dashboard/user_new',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Users',
            path: '/dashboard/users_list',
            icon: getIcon(peopleFill)
          },
          {
            title: 'New team',
            path: '/dashboard/team_new',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Teams',
            path: '/dashboard/teams_list',
            icon: getIcon(peopleFill)
          }
        ]
      },
     
      {
        title: 'Billing',
        path: '', 
        icon: < FcCalendar width={22} height={22} />,
        children: [
          {
            title: 'Payment notifications',
            path: '',
            icon: getIcon(peopleFill)
          },
          {
            title: 'New invoices',
            path: '',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Pending payments',
            path: '',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Complete payments',
            path: '',
            icon: getIcon(peopleFill)
          }
        ]
      },
     
      {
        title: 'Reports',
        path: '',
        icon: <FcBarChart width={22} height={22} /> ,
        children: [
          {
            title: 'Sms balances',
            path: '',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Sms usage',
            path: '',
            icon: getIcon(peopleFill)
          },
          {
            title: 'Activity log',
            path: '',
            icon: getIcon(peopleFill)
          }
        ]
      }
     
    ];
  }
  
  
  console.log(sidebarConfig);
  return (
    <RootStyle>
      <SessionTimeout />
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} sidebarConfig={sidebarConfig} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
