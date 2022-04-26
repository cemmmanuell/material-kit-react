import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core';
import {ReactSession} from 'react-client-session';
// components
import { Navigate, useRoutes } from 'react-router-dom';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/dashboard/profile'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  }
];


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const history = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [user_details, setUser_details]=useState(ReactSession.get('user_details'));
 
  const handleOpen = () => {
    
    setOpen(true);
    const d= ReactSession.get('user_details');
    
    setUser_details(d);
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLock=()=>{
    window.history.pushState(null, "", window.location.href);
  
    history('/Login');
  }

  return (
 
  
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
          {user_details==undefined  ? <Navigate to="/login" /> : user_details.data.name }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          { user_details==undefined  ? <Navigate to="/login" /> : user_details.data.email} 
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined"
          onClick={handleLock}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
