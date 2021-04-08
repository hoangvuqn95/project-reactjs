import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Images from 'constants/images';

Advertisement.propTypes = {};

const useStyles = makeStyles((theme) => ({
  ad: {
    width: '270px',
    height: '500px',
    margin: '100px auto',
    cursor: 'pointer',

    boxShadow: '0 5px 15px -5px #00000070',
    background: `url(${Images.BIG_SALE})`,
    backgroundImage: 'transparent',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    position: 'sticky',
    top: 100,
    left: 0,
  },
}));

function Advertisement({ backgroundUrl }) {
  const classes = useStyles();

  const adStyle = backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {};

  return <div className={classes.ad} style={adStyle}></div>;
}

export default Advertisement;
