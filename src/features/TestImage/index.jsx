import { Box, makeStyles, Typography } from '@material-ui/core';
import UploadImage from 'components/FormFields/UploadImage';
import ImageGrid from 'components/ImageGrid';
import React from 'react';

Test.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',

    margin: '20px auto',
    padding: '10px',
  },

  largeBox: {
    width: '1200px',
    height: '1000px',
    margin: '10px auto',
    padding: '20px',

    // border: '1px solid black',
    boxShadow: '0 0 10px 0.5px',
    textAlign: 'center',
  },
}));

function Test(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.largeBox}>
        <Typography variant="h4">Check form field upload image</Typography>
        <UploadImage />
        <ImageGrid />
      </Box>
    </div>
  );
}

export default Test;
