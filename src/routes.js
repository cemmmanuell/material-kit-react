import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Compose from './pages/messaging/compose';
import SentMessages from './pages/messaging/sent_messages';
import PendingMessages from './pages/messaging/pending_messages';
import FailedMessages from './pages/messaging/failed_messages';
import Draft from './pages/messaging/draft';
import NewContact from './pages/contacts/new_contact';
import NewContactGroup from './pages/contacts/new_contact_group';
import UserPost from './pages/users/users_post';
import TeamPost from './pages/users/team_post';
import NewCustomerAccount from './pages/customer_accounts/new_customer';
import CustomerList from './pages/customer_accounts/index';
import UsersList from './pages/users/index';
import ReactSession from 'react-client-session/dist/ReactSession';
import TeamsList from './pages/users/teams';
import SchduledMessages from './pages/messaging/scheduled_messages'
import ContactsList from './pages/contacts/contacts';
import ContactGroups from './pages/contacts/contact_groups';
import Set_Password from './pages/set_password';
import OpenLoansList from './pages/Loans/openLoans';
import PendingLoansList from './pages/Loans/pendingLoans';
import IssuedLoansList from './pages/Loans/issuedLoans';
import TransactionsList from './pages/Transactions/Transactions';
import GuaranteedLoansList from './pages/Loans/guaranteedLoansList';
import GuarantorsList from './pages/Loans/guarantorsList';
import MemberStatement from './pages/Statements/memberstatement';
import { replace } from 'lodash';
import RegistrationForm from './components/authentication/register/RegisterForm';
import RegForm from './pages/RegForm';
import { RegisterForm } from './components/authentication/register';
import ApplyLoanForm from './pages/Loans/apply_loan';
import RequestGuarantees from './pages/Loans/RequestGuarantee';
import Profile from './components/users/profile';
import Feedback from './components/users/feedback';
// ----------------------------------------------------------------------



export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'compose', element: <Compose /> },
        { path: 'draft', element: <Draft /> },
        { path: 'pending_messages', element: <PendingMessages /> },
        { path: 'scheduled_messages', element: <SchduledMessages /> },
        { path: 'sent_messages', element: <SentMessages /> },
        { path: 'contact_group_new', element: <NewContactGroup /> },
        { path: 'failed_messages', element: <FailedMessages /> },
        { path: 'new_contact', element: <NewContact />},
        { path: 'user_new', element: <UserPost />},
        { path: 'team_new', element: <TeamPost />},
        { path: 'new_customer_account', element: <NewCustomerAccount />},
        { path: 'customer_list', element: <CustomerList />},
        {path: 'users_list', element: <UsersList />},
        {path: 'teams_list', element: <TeamsList/>},
        {path: 'contact_list', element: <ContactsList/>},
        {path: 'contact_group_list', element: <ContactGroups/>},
        {path:'OPen_loans', element :<OpenLoansList />}, 
        {path: 'pending_loans', element : <PendingLoansList /> }, 
        {path: 'processed_loans', element: <IssuedLoansList/>},
        {path: 'ministatement', element: <TransactionsList />},
        {path: 'loans_guranteed', element: <GuarantorsList />},
        {path: 'guranteed_loans', element: <GuaranteedLoansList/>},
        {path: 'memberstatement', element: <MemberStatement state={true} /> },
        {path: 'apply_new_loan', element: <ApplyLoanForm />},
        {path: 'approve_gurarantee', element:<RequestGuarantees/>},
        {path: 'profile', element:<Profile/>},
        {path: 'feedback', element:<Feedback/>}

        
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        {path: 'Set_password', element:<Set_Password/>},
        { path: 'register', element: <Register /> },
        {path: 'RegisterForm', element:<RegForm/>},
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
