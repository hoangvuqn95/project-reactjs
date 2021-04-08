import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import { GitHub, PermContactCalendar, Search, ShoppingCart } from '@material-ui/icons';
import Images from 'constants/images';
import { itemsCountSelector } from 'features/Cart/selectors';
import { addSearchTerm } from 'features/Product/productSlice';
import React, { useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ThemeContext, { themes } from 'themeContext';

Header.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontSize: '18px',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },

  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // For list features
  boxFeature: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  // title for only logo web
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'green',
    textDecoration: 'none',
    '&:hover': {
      borderBottom: '2px solid deeppink',
    },
  },

  // Search on the header
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderBottom: '1px solid green',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'whitesmoke',
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
    color: '#4caf50',
  },
  inputRoot: {
    color: '#4caf50',
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
  // cart - get quantity
  const itemsCount = useSelector(itemsCountSelector);

  // Time to wait begin search data - use useRef
  // Search
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  const handleChangeSearch = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const action = addSearchTerm({ q: value });
      dispatch(action);
    }, 500);
  };

  // setting theme on header click
  const { setCurrentTheme } = useContext(ThemeContext);

  const handleToggleClick = () => {
    setCurrentTheme((theme) => (theme.name === 'mountain' ? '' : themes.mountain));
    setMenuTheme(null);
  };

  const handleToggleClick2 = () => {
    setCurrentTheme((theme) => (theme.name === 'city' ? '' : themes.city));
    setMenuTheme(null);
  };

  const handleToggleClick3 = () => {
    setCurrentTheme((theme) => (theme.name === 'wall' ? '' : themes.wall));
    setMenuTheme(null);
  };
  const handleToggleClick4 = () => {
    setCurrentTheme((theme) => (theme.name === 'sherbert' ? '' : themes.sherbert));
    setMenuTheme(null);
  };

  const handleToggleClick5 = () => {
    setCurrentTheme((theme) => (theme.name === 'earth' ? '' : themes.earth));
    setMenuTheme(null);
  };

  // menu of theme
  const [menuTheme, setMenuTheme] = useState(null);

  const handleOpen = (e) => {
    setMenuTheme(e.currentTarget);
  };

  const handleClose = () => {
    setMenuTheme(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'green' }}>
        <Toolbar className={classes.box}>
          <NavLink edge="start" exact to="/" className={`${classes.link} ${classes.title}`}>
            <Button color="inherit" style={{ fontSize: '1.25rem' }}>
              E-COMMERCE
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
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </Box>

          <Box className={classes.boxFeature}>
            <NavLink to="/products" className={classes.link}>
              <Button color="inherit" style={{ fontSize: '1.25rem' }}>
                Products
              </Button>
            </NavLink>

            {/* Login & Register */}
            <NavLink to="/sign-in" className={classes.link}>
              <Tooltip title="Login">
                <IconButton color="inherit">
                  <img src={Images.LOGIN} alt="" width="35px" height="35px" />
                </IconButton>
              </Tooltip>
            </NavLink>

            {/* Cart */}
            <NavLink to="/cart" className={classes.link}>
              <Tooltip title="Cart">
                <IconButton color="inherit">
                  <Badge badgeContent={itemsCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/contact" className={classes.link}>
              <Tooltip title="Contact">
                <IconButton color="inherit">
                  <PermContactCalendar />
                </IconButton>
              </Tooltip>
            </NavLink>

            <Box className={classes.link}>
              <Tooltip title="Theme">
                <IconButton
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleOpen}
                >
                  <img src={Images.THEME3} alt="" width="35px" height="35px" />
                </IconButton>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={menuTheme}
                keepMounted
                open={Boolean(menuTheme)}
                onClose={handleClose}
                color="primary"
              >
                <MenuItem onClick={handleToggleClick}>Mountain</MenuItem>
                <MenuItem onClick={handleToggleClick2}>City</MenuItem>
                <MenuItem onClick={handleToggleClick3}>Wall</MenuItem>
                <MenuItem onClick={handleToggleClick4}>Sherbert</MenuItem>
                <MenuItem onClick={handleToggleClick5}>Earth</MenuItem>
              </Menu>
            </Box>

            <a
              href="https://github.com/hoangvuqn95/project-reactjs"
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tooltip title="Github">
                <IconButton color="inherit">
                  <GitHub />
                </IconButton>
              </Tooltip>
            </a>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
