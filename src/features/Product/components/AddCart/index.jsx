import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React, { useState } from 'react';

AddCart.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  quantity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBuy: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function AddCart({ onClickAdd }) {
  const classes = useStyles();
  const [count, setCount] = useState(1);

  const handleDecreaseClick = () => {
    setCount((x) => x - 1);
  };

  const handleIncreaseClick = () => {
    setCount((x) => x + 1);
  };

  const handleAddToCart = () => {
    if (onClickAdd) onClickAdd(count);
  };

  return (
    <div className={classes.root}>
      <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Typography variant="h4" color="primary" style={{ marginRight: '60px' }}>
          Quantity:{' '}
        </Typography>
        <Box className={classes.quantity}>
          <Button
            variant="contained"
            color="primary"
            disabled={count <= 1}
            onClick={handleDecreaseClick}
          >
            <Remove />
          </Button>
          <Typography
            variant="body1"
            style={{ fontSize: '20px', color: '#4caf50', fontWeight: 'bold', margin: '10px' }}
          >
            {`0${count}`.slice(-2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={count >= 9}
            onClick={handleIncreaseClick}
          >
            <Add />
          </Button>
        </Box>
      </Box>
      <Box className={classes.buttonBuy}>
        <Button
          style={{ padding: '10px 50px', fontSize: '20px', letterSpacing: '2px' }}
          size="medium"
          color="secondary"
          variant="contained"
          onClick={handleAddToCart}
        >
          MUA
        </Button>
      </Box>
    </div>
  );
}

export default AddCart;
