import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL =   0 ;


export default function AppItemOrders() {
  return (
    <RootStyle>
   
      <Typography variant="h4">{fNumber(ReactSession.get('user_details')==undefined ? 0 : ReactSession.get('user_details').data.sharesRetained)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Share capital
      </Typography>
    </RootStyle>
  );
}
