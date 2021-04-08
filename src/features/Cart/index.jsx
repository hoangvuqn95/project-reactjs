import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { DeleteForever, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addToCart, clearCart, removeFromCart } from './cartSlice';
import { cartItemsSelector, cartTotalAmount, itemsCountSelector } from './selectors';

CartFeature.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },

  mainContent: {
    width: '900px',
    margin: '20px auto',
    backgroundColor: 'white',
  },

  cardItem: {
    width: '900px',
    // height: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: '10px',
    color: '#4caf50',
  },

  images: {
    width: '150px',
    height: '150px',
    margin: '5px 10px',
  },

  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: '20px',
  },

  total: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: '10px',
    borderTop: '2px solid green',
  },

  // when not yet have product in cart, page will show notification
  noItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    width: '700px',
    height: '700px',
    padding: '20px',
    margin: '20px auto',
  },
  imageNoItem: {
    width: '600px',
    heigh: '600px',
  },
}));

// insert '$1.' front of 000 and character '₫'
function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '₫';
}

function CartFeature(props) {
  const cartItems = useSelector(cartItemsSelector); // items array
  const totalAmount = useSelector(cartTotalAmount); // values
  const itemsCount = useSelector(itemsCountSelector); // quantity

  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const handleIncreaseClick = (item) => {
    const action = addToCart({
      ...item,
      quantity: 1,
    });

    dispatch(action);
  };

  const handleDecreaseClick = (item) => {
    const action = addToCart({
      ...item,
      quantity: -1,
    });

    dispatch(action);
  };

  const handleRemoveClick = (item) => {
    const message = `Are you sure to remove ${item.product.name}?`;
    if (window.confirm(message)) {
      const action = removeFromCart(item);
      dispatch(action);
    }
  };

  const handleRemoveAllCartClick = (item) => {
    const message = `Are you sure to remove everything in your cart?`;
    if (window.confirm(message)) {
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  // payment page
  const handleProceedClick = () => {
    history.push('/payment');
  };

  const [open, setOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(codes[0]);

  const handleOnProductClick = (item) => {
    history.push(`/products/${item.product.id}`);
  };

  const handleContinueShoppingClick = () => {
    history.push('/products');
  };

  return (
    <Container fixed className={classes.root}>
      <Typography variant="h3" color="primary">
        Shopping Carts: {itemsCount}
      </Typography>

      {/* Show display no item */}
      {!itemsCount ? (
        <Box className={classes.noItem}>
          <img src={Images.SHOPPING_BG} alt="" className={classes.imageNoItem} />
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            There are no product in your shopping cart!
          </Typography>

          <Button
            onClick={handleContinueShoppingClick}
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        /* Have more items */

        <Box className={classes.mainContent}>
          <Grid container>
            <Grid item xs={12} md={9} lg={4}>
              {cartItems.map((item) => (
                <Card key={item.product.id} className={classes.cardItem}>
                  <CardMedia
                    onClick={() => handleOnProductClick(item)}
                    className={classes.images}
                    image={
                      item.product?.images?.[Math.trunc(Math.random() * item.product.images.length)]
                    }
                  />
                  <CardContent className={classes.box}>
                    <Typography variant="h5" style={{ textTransform: 'uppercase', width: '300px' }}>
                      {item.product.name}
                    </Typography>

                    <Typography variant="h5">
                      Price: {currencyFormat(item.product.salePrice * item.quantity)}
                    </Typography>

                    <Box className={classes.quantity}>
                      <IconButton
                        onClick={() => handleIncreaseClick(item)}
                        color="primary"
                        disabled={item.quantity >= 9}
                      >
                        <KeyboardArrowUp fontSize="large" />
                      </IconButton>
                      <Box
                        style={{
                          borderBottom: '3px solid lawngreen',
                          fontSize: '20px',
                          margin: '10px',
                          padding: '5px',
                        }}
                      >
                        {item.quantity}
                      </Box>

                      <IconButton
                        onClick={() => handleDecreaseClick(item)}
                        color="primary"
                        disabled={item.quantity <= 1}
                      >
                        <KeyboardArrowDown fontSize="large" />
                      </IconButton>
                    </Box>

                    <Button onClick={() => handleRemoveClick(item)} color="secondary">
                      <DeleteForever fontSize="large" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>

          <Box className={classes.total}>
            <Button variant="contained" color="primary" onClick={handleRemoveAllCartClick}>
              Clear Cart
            </Button>
            <Typography variant="h4" color="secondary">
              Total Bill: {currencyFormat(totalAmount)}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => alert('Thank you for use service of us and have a nice day!')}
            >
              Ok
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default CartFeature;
