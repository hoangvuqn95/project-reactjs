import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

ImagesArray.propTypes = {
  imageList: PropTypes.array,
};

ImagesArray.defaultProps = {
  imageList: [],
};

const useStyles = makeStyles((theme) => ({
  root: {
    growFlex: 1,
    margin: '10px auto',
    padding: '10px',
    // backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    width: '400px',
    height: '400px',
    marginBottom: '30px',
    border: '1px solid green',
  },

  arrayImages: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: '10px auto',
    padding: '10px',
  },

  image: {
    width: '70px',
    height: '70px',
    margin: '5px',
    borderRadius: '10%',

    '&:hover': {
      transition: '0.5s',
      transform: 'scale(0.9)',
      opacity: '0.9',
    },
  },
}));

function ImagesArray({ imageList }) {
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState(imageList[0] || []);

  // default after render main image is images[0]
  useEffect(() => {
    setSelectedImages(imageList[0]);
  }, [imageList]);

  return (
    <Box>
      <Grid container>
        <Box className={classes.root}>
          <img alt="" src={selectedImages} className={classes.main} />
          <Box className={classes.arrayImages}>
            <IconButton
              onClick={() =>
                setSelectedImages(imageList[imageList.findIndex((x) => x === selectedImages) - 1])
              }
              disabled={imageList.findIndex((x) => x === selectedImages) === 0}
            >
              <ArrowBackIos color="primary" />
            </IconButton>
            {imageList.map((image) => (
              <Grid item xs={4} md={3} lg={2} key={image}>
                <img
                  src={image}
                  className={classes.image}
                  alt=""
                  onClick={() => setSelectedImages(image)}
                />
              </Grid>
            ))}
            <IconButton
              onClick={() =>
                setSelectedImages(imageList[imageList.findIndex((x) => x === selectedImages) + 1])
              }
              disabled={imageList.findIndex((x) => x === selectedImages) >= imageList.length - 1}
            >
              <ArrowForwardIos color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default ImagesArray;
