import { Box, LinearProgress, makeStyles } from '@material-ui/core';
import productApi from 'api/productApi';
import Images from 'constants/images';
import { addToCart } from 'features/Cart/cartSlice';
import { cartItemsSelector } from 'features/Cart/selectors';
import AddCart from 'features/Product/components/AddCart';
import DetailDescription from 'features/Product/components/Description';
import Detail from 'features/Product/components/Detail';
import ImagesArray from 'features/Product/components/ImagesArray';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gridColumnGap: '30px',

    width: '80%',
    height: '100%',
    margin: '20px auto',
    padding: '60px 20px',

    backgroundColor: 'white',
    borderLeft: '2px solid green',
    boxShadow: '0 0 10px 1px green',

    borderTopLeftRadius: '20%',
    borderBottomRightRadius: '20%',
  },

  forDetail: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  images: {
    borderRight: '1px solid green',
  },
}));

function DetailPage() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const { params } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await productApi.getById(params.productId);
        // console.log("kiem tra duong dan: ", data);
        setProductDetail(data);
      } catch (error) {
        console.log('Failed to fetch to detail page', error);
      }

      setLoading(false);
    })();
  }, [params.productId]);

  // Add to cart from detail page
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();

  const handleAddToCart = (count) => {
    const action = addToCart({ product: productDetail, quantity: count });
    dispatch(action);

    history.push('/cart');
  };

  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <div className={classes.root}>
        {loading && <LinearProgress />}

        <img src={Images.WAVE_BG} alt="" />

        <Box className={classes.box}>
          <Box className={classes.images}>
            <ImagesArray imageList={productDetail.images} />
          </Box>
          <Box className={classes.forDetail}>
            <Detail product={productDetail} />
            <Box style={{ marginTop: '20px' }}>
              <AddCart onClickAdd={handleAddToCart} />
            </Box>
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <DetailDescription product={productDetail} />
        </Box>
      </div>
    </>
  );
}

export default DetailPage;
