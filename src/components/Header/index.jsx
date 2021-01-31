import { AppBar, Box, Button, fade, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { Search, ShoppingCart } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Picker.png';

Header.propTypes = {};

// Mau xanh duong
const accent = lightBlue[300];
// Mau xanh ghi
const accentCyan = cyan[500];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontSize: '18px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  // Logo
  logo: {
    borderRadius: '10%',
    width: '150px',
    height: '75px',
    marginTop: '5px',
    marginBottom: '5px',
  },

  // Search on the header
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: accentCyan }}>
        <Toolbar>
          <NavLink edge="start" exact to="/" className={`${classes.link} ${classes.title}`}>
            <img className={classes.logo} src={Logo} alt="logo" />
          </NavLink>

          <NavLink to="/products" className={classes.link}>
            <Button color="inherit" style={{ fontSize: '1.25rem' }}>
              Products
            </Button>
          </NavLink>

          <NavLink to="/posts" className={classes.link}>
            <Button color="inherit" style={{ fontSize: '1.25rem' }}>
              Posts
            </Button>
          </NavLink>

          {/* Search */}
          <Box className={classes.search}>
            <Box className={classes.searchIcon}>
              <Search />
            </Box>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>

          {/* Login & Register */}
          <NavLink to="/account" className={classes.link}>
            <Button color="inherit" style={{ fontSize: '1.25rem' }}>
              Login
            </Button>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className={classes.link}>
            <Button color="inherit" style={{ fontSize: '1.25rem' }}>
              <ShoppingCart />
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
