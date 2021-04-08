import { Box, makeStyles, Typography } from '@material-ui/core';
import SimpleRating from 'components/Rating/SimpleRating';
import PropTypes from 'prop-types';
import React from 'react';

Detail.propTypes = {
  product: PropTypes.object,
};

Detail.defaultProps = {
  product: {},
};

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: '100%',
    height: '150px',
    margin: '0 auto',
    padding: '10px auto',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  productName: {
    width: '100%',
    height: '100px',
    padding: '10px auto',

    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#4caf50',
    marginBottom: '10px',
    fontWeight: 'bold',
  },

  // rating style
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  // Price
  classPrice: {
    width: '100%',

    padding: '5px 10px',
    color: '#4caf50',

    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottom: '2px solid green',
  },
  // promotionPercent
  percentSalePrice: {
    color: 'white',
    fontSize: '35px',
    fontWeight: 'bold',
    backgroundColor: 'deeppink',
    padding: '10px',

    borderTopLeftRadius: '20%',
    borderBottomRightRadius: '20%',
  },
}));

// insert '$1.' front of 000 and character '₫'
function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '₫';
}

function Detail({ product }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.productName}>
        <Typography variant="h3" style={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
      </Box>

      {/* Rating */}
      <Box className={classes.rating}>
        <SimpleRating />
      </Box>
      <Box className={classes.classPrice}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          {currencyFormat(product.salePrice || 0)}
        </Typography>

        <Typography variant="body1">
          <span className={classes.percentSalePrice}>{`-${Math.floor(
            100 - (product.salePrice / product.originalPrice) * 100
          )}%`}</span>
        </Typography>

        <Typography variant="h5">
          <span style={{ textDecoration: 'line-through' }}>
            {currencyFormat(product.originalPrice || 0)}
          </span>
        </Typography>
      </Box>
    </div>
  );
}

export default Detail;
