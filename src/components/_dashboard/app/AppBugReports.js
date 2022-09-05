import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber, fNumber } from '../../../utils/formatNumber';

import {ReactSession} from 'react-client-session';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.success.lighter,
  backgroundColor: theme.palette.success.darker
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.success.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL =  0;

export default function AppBugReports() {
  return (
    <RootStyle>
      
      
      <Typography variant="h4">{fNumber(ReactSession.get('user_details')!=undefined ? ReactSession.get('user_details').data.outstandingBalance : 0)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Balance
      </Typography>
    </RootStyle>
  );
}
