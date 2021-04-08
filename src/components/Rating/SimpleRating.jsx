import { Box, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';

SimpleRating.propTypes = {};

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    transition: '.5s',

    '&:hover': {
      transition: '0.5s',
    },
  },
}));

function SimpleRating(props) {
  const classes = useStyles();

  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);

  return (
    <div>
      <Box component="fieldset" mb={1} borderColor="transparent" className={classes.root}>
        <Rating
          name="simple-controlled"
          precision={0.5}
          value={value}
          size="medium"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && (
          <Box ml={1} style={{ fontWeight: 'bold', fontSize: '20px' }}>
            {labels[hover !== -1 ? hover : value]}
          </Box>
        )}
      </Box>
    </div>
  );
}
export default SimpleRating;
