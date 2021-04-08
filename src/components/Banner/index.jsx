import { makeStyles, Typography } from '@material-ui/core';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';

Banner.propTypes = {
  title: PropTypes.string,
  backgroundUrl: PropTypes.string,
};

Banner.defaultProps = {
  title: '',
  backgroundUrl: '',
};

const useStyles = makeStyles((theme) => ({
  banner: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20rem',

    backgroundImage: `url(${Images.SKY_FALL})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginTop: '20px',
    boxShadow: '0 5px 15px 1px',
  },

  title: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: 'bold',
  },
}));

function Banner(props) {
  const classes = useStyles();
  const { title, backgroundUrl } = props;

  const bannerStyle = backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {};

  return (
    <div className={classes.banner} style={bannerStyle}>
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
    </div>
  );
}

export default Banner;
