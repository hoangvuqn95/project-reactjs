import { Box, Card, CardContent, CardMedia, makeStyles } from '@material-ui/core';
import React from 'react';
import Image from './graphic-map.png';

LoginPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    width: '1000px',
    height: '500px',
    position: 'relative',

    margin: '20px auto',
    backgroundColor: 'white',
  },
  image: {
    width: '400px',
    height: '100%',

    position: 'absolute',
    top: 0,
    left: 0,

    padding: '10px',
    borderRight: '1px solid black',
  },
  content: {
    width: '600px',
    height: '100%',

    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

function LoginPage(props) {
  const classes = useStyles();

  return (
    <div>
      <Box mt={1} mb={2}>
        <Card className={classes.card}>
          <CardMedia image={Image} title="Image" component="image" className={classes.image} />
          <CardContent className={classes.content}>
            fdsfjsdif fjidsfis fjidsfoisd fidsjfoisfs
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default LoginPage;
