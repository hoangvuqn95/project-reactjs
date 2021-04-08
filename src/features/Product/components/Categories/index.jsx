import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useBoxColor from 'hooks/useBoxColor';

Categories.propTypes = {
  onClick: PropTypes.func,
};

Categories.defaultProps = {
  onClick: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gridRowGap: '20px',

    width: '100%',
    height: '100%',
    margin: '10px auto',
    padding: '10px',
  },
  button: {
    width: '100px',
    height: '100px',
    padding: '10px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '10%',
    color: '#ffffff',
    cursor: 'pointer',
    textTransform: 'uppercase',
    textAlign: 'center',

    fontWeight: 'bold',
    transition: 'all 0.35s ease-in-out 0s',

    '&:hover': {
      opacity: '0.7',
      transform: 'scale(0.9)',
      transition: '0.5s',
    },
    '&:active': {
      transform: 'scale(0.88)',
      transition: 'all 0.5s ease-in-out',
      color: 'red',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));

const CATEGORIES_MAP = [
  { name: 'All', value: [] },
  { name: 'Clothes', value: 'c45eca94-70ef-4264-8714-df482e3d0eff' },
  { name: 'Mask', value: '3ab235d3-7b26-49ad-a5c1-0d4b2f91056e' },
  { name: 'Esthetics', value: '641710c1-5db5-4651-8fad-58ae8f7c7a34' },
  { name: 'Laptop', value: '7922f29f-32eb-4e88-bde8-c283a26da4ba' },
  { name: 'Disk Technology', value: 'ea0cfab5-ecac-48fc-a84a-16e869c37620' },
  { name: 'Telephone', value: 'b4fce5af-d6d5-4438-876d-a7d436087097' },
];

function Categories({ onClick }) {
  const classes = useStyles();

  // random color use custom hook : useBoxColor
  const color = useBoxColor();

  return (
    <Box className={classes.root}>
      {CATEGORIES_MAP.map((category, id) => (
        <Box key={id}>
          <Box
            style={{ background: color }}
            className={classes.button}
            onClick={() => onClick(category)}
          >
            {category.name}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Categories;
