import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { lighten } from 'polished';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../contexts/theme';

import { Container, Logo, CustomMenu } from './styles';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { signed, signOut } = useAuth();
  const { themeName, toggleTheme } = useTheme();

  const { colors } = useContext(ThemeContext);

  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openAccountAnchorEl = Boolean(accountAnchorEl);

  const handleAccountMenu = (event: any) =>
    setAccountAnchorEl(event.currentTarget);
  const handleAccountClose = () => setAccountAnchorEl(null);

  const accountMenuId = 'configs-app-menu';
  const renderAccountMenu = (
    <CustomMenu
      id={accountMenuId}
      anchorEl={accountAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={openAccountAnchorEl}
      onClose={handleAccountClose}
    >
      {signed ? (
        <MenuItem
          onClick={() => {
            handleAccountClose();
            signOut();
          }}
        >
          Sign Out
        </MenuItem>
      ) : (
        <div>
          <Link to="/SignUp">
            <MenuItem onClick={handleAccountClose}>Sign Up</MenuItem>
          </Link>
          <Link to="/SignIn">
            <MenuItem onClick={handleAccountClose}>Sign In</MenuItem>
          </Link>
        </div>
      )}
    </CustomMenu>
  );

  const [configsAnchorEl, setConfigsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openConfigsAnchorEl = Boolean(configsAnchorEl);

  const handleConfigsMenu = (event: any) =>
    setConfigsAnchorEl(event.currentTarget);
  const handleConfigsClose = () => setConfigsAnchorEl(null);

  const configsMenuId = 'configs-app-menu';
  const renderConfigsMenu = (
    <CustomMenu
      id={configsMenuId}
      anchorEl={configsAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={openConfigsAnchorEl}
      onClose={handleConfigsClose}
    >
      <MenuItem>
        <span>Dark Mode</span>
        <Switch
          onChange={toggleTheme}
          checked={themeName !== 'light'}
          checkedIcon={false}
          uncheckedIcon={false}
          handleDiameter={24}
          width={40}
          height={18}
          offColor={lighten(0.1, colors.highlight)}
          onColor={colors.tertiary}
        />
      </MenuItem>
    </CustomMenu>
  );

  return (
    <Container signed={signed}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Logo src={logoImg} />
          </Link>

          <div>
            <IconButton
              aria-label="account actions"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleAccountMenu}
              color="inherit"
            >
              <AccountCircleIcon
                style={{ fill: signed || themeName === 'light' ? 'black' : '' }}
              />
            </IconButton>
            <IconButton
              aria-label="configurations"
              aria-controls={configsMenuId}
              aria-haspopup="true"
              onClick={handleConfigsMenu}
              color="inherit"
            >
              <MoreIcon
                style={{ fill: signed || themeName === 'light' ? 'black' : '' }}
              />
            </IconButton>
          </div>
        </Toolbar>
        {renderAccountMenu}
        {renderConfigsMenu}
      </AppBar>
    </Container>
  );
};

export default Header;
