import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber, fNumber } from '../../../utils/formatNumber';
import ReactSession from 'react-client-session/dist/ReactSession';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.lighter,
  backgroundColor: theme.palette.error.dark
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
  


export default function AppNewUsers() {
  return (
    <RootStyle>
     
      <Typography variant="h4">{fNumber( ReactSession.get('user_details')==undefined ? 0: ReactSession.get('user_details').data.projectBalance)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Project balance
      </Typography>
    </RootStyle>
  );
}
