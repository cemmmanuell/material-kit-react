import { Icon } from '@iconify/react';

import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { ReactSession } from 'react-client-session';
import {FcFolder, FcCollaboration, FcHome, FcAddressBook, FcAssistant, FcBarChart, FcCalendar}  from 'react-icons/fc';


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

var sidebarConfig =[];

const userDetails= ReactSession.get('user_details')!=undefined ? ReactSession.get('user_details').data : {};
console.log(sidebarConfig);
if(userDetails.user_customer_account==null)
{

  sidebarConfig= [
  
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
    },
    {
      title: 'Customer accounts',
      path: '',
      icon: <FcFolder />,
      children: [
        {
          title: 'Customer list',
          path: '/dashboard/customer_list',
          icon: getIcon(peopleFill)
        },
        {
          title: 'New customer',
          path: '/dashboard/new_customer_account',
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

export default sidebarConfig;
