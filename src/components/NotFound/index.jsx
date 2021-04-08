import { makeStyles } from '@material-ui/core';
import Images from 'constants/images';
import React from 'react';

NotFound.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrows: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '750px',
    height: '800px',
    margin: 'auto',
    padding: 'auto',
  },
  notfound: {
    width: '750px',
    height: '750px',
    marginTop: '20px',
    marginBottom: '20px',

    opacity: '0.8',
  },
}));

function NotFound(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={Images.NOTFOUND_BG} className={classes.notfound} alt=" " />
    </div>
  );
}

export default NotFound;
