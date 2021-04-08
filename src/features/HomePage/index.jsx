import { Box, makeStyles, Typography } from '@material-ui/core';
import {
  AccessAlarm,
  Accessibility,
  BatteryChargingFull,
  Brightness5,
  BurstMode,
  Laptop,
  LibraryMusic,
  PhoneIphone,
  Store,
} from '@material-ui/icons';
import Images from 'constants/images';
import useClock from 'hooks/useClock';
import React from 'react';
import { Link } from 'react-router-dom';

HomePage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#333',
    color: '#fff',
    fontFamily: '"Roboto", sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '10px',

    margin: '10px auto',

    '& > div': {
      height: '210px',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '& > div:nth-of-type(1)': {
      gridColumn: '1/3',
    },
    '& > div:nth-of-type(6)': {
      gridColumn: '3/5',
    },
    '& > div:nth-of-type(9)': {
      gridColumn: '3/5',
    },
    '& > div:nth-of-type(10)': {
      gridColumn: '1/3',
    },
  },

  bg1: {
    background: `url(${Images.NIGHT_CITY})`,
    transition: 'all 0.5s ease-in-out',
    color: 'white',
    textAlign: 'center',

    '&:hover': {
      opacity: '0.8',
      transform: 'scale(0.98)',
      cursor: 'pointer',
    },
  },
  bg2: {
    background: `url(${Images.MOUNTAIN_BG})`,
    transition: '0.5s ease-in-out',
    color: '#333',

    '&:hover': {
      opacity: '0.8',
      transform: 'scale(0.98)',
      cursor: 'pointer',
    },
  },
}));

function HomePage(props) {
  const classes = useStyles();
  const time = useClock();

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <div className={classes.bg1}>
          <Typography variant="h3">WELCOME TO E-COMMERCE SHOP!!</Typography>
        </div>

        <div className={classes.bg1}>
          <LibraryMusic fontSize="large" />
          <Typography variant="h4">MUSIC</Typography>
        </div>

        <div className={classes.bg2} style={{ color: '#7b516a' }}>
          <AccessAlarm style={{ fontSize: '50px' }} />
          <Typography variant="h4">{time}</Typography>
        </div>

        <div className={classes.bg1}>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Store style={{ fontSize: '75px' }} />
            <Typography variant="h4" style={{ color: 'white' }}>
              LET BEGIN SHOPPING!!!
            </Typography>
          </Link>
        </div>

        <div className={classes.bg1}>
          <Laptop style={{ fontSize: '50px' }} />
          <Typography variant="h5">LAPTOP</Typography>
        </div>

        <div className={classes.bg2}>
          <BurstMode style={{ fontSize: '50px', color: '#4caf82' }} />
        </div>

        <div className={classes.bg1}>
          <PhoneIphone style={{ fontSize: '50px' }} />
          <Typography variant="h5">PHONE</Typography>
        </div>

        <div className={classes.bg1}>
          <Accessibility style={{ fontSize: '50px' }} />
          <Typography variant="h5">CLOTHES</Typography>
        </div>

        <div className={classes.bg2}>
          <Brightness5 style={{ fontSize: '50px', color: '#4caf82' }} />
          <Typography variant="h5" style={{ color: '#4caf82' }}>
            HAVE A NICE DAY, FRIEND
          </Typography>
        </div>

        <div className={classes.bg2}>
          <BatteryChargingFull style={{ fontSize: '50px', color: '#4caf82' }} />
          <Typography variant="h5">Energy</Typography>
        </div>

        <div className={classes.bg2}></div>

        <div className={classes.bg2}></div>
      </Box>
    </div>
  );
}

export default HomePage;
