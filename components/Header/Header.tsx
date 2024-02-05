import { SigninButton } from '@/components/SigninButton';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Link from 'next/link';
import {
  Typography,
  IconButton,
  Container,
  Toolbar,
  Menu,
  Tooltip,
  MenuItem,
  Switch,
  Box,
  Button,
  AppBar
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import LoginIcon from '@mui/icons-material/Login';
import { LangSwitcher } from './LangSwitcher';
import { useAuth } from '@/components/AuthProvider';

const pages = [ 'Currencies', 'Trade', 'Orders' ];
const settings = [ 'Profile', 'Account', 'Dashboard', 'Logout' ];

interface IProps {
  isDarkTheme: boolean,
  onThemeToggle: () => void,
}

export const Header = ({ isDarkTheme, onThemeToggle }: IProps) => {
  const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>(null);
  const [ anchorElUser, setAnchorElUser ] = React.useState<null | HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center'}}>
          <CurrencyBitcoinIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>

          <Link href="/markets" passHref legacyBehavior>
            <Typography variant="h5" align="center" mr={6} style={{ cursor: 'pointer' }}>
              Crypto exchange
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Tooltip title={user?.name}>
            <IconButton color="inherit" onClick={handleOpenUserMenu}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <Switch checked={isDarkTheme} onChange={onThemeToggle} />
          <LangSwitcher />

          {/*<SigninButton />*/}

          {isClient && isAuthenticated ? (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
              >
                Login to account
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};