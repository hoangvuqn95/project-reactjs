import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

ListProduct.propTypes = {
  productList: PropTypes.array,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  onClickAddToCart: PropTypes.func,
};

ListProduct.defaultProps = {
  productList: [],
  onEdit: null,
  onRemove: null,
  onClickAddToCart: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 100,
    borderRadius: '10%',
    margin: '10px',
    position: 'relative',
  },
  media: {
    paddingTop: '56.25%',
    height: 200,
  },
  content: {
    height: 100,
    width: '100%',
    padding: '0 10px',
    textAlign: 'center',

    textTransform: 'uppercase',
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
}));

// insert '$1.' front of 000 and character '₫'
function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '₫';
}

function ListProduct(props) {
  const classes = useStyles();
  const { productList, onEdit, onRemove, onClickAddToCart } = props;

  return (
    <div>
      <Grid
        container
        display="flex"
        justify="space-around"
        alignItems="center"
        style={{ backgroundColor: 'white' }}
      >
        {productList.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.root} key={product.id}>
            <Link to={`products/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  image={product?.images?.[Math.trunc(Math.random() * product.images.length)]}
                  title={product.name}
                  className={classes.media}
                />
                <CardActionArea className={classes.content}>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {currencyFormat(product.salePrice)}

                    <span
                      style={{
                        backgroundColor: '#f3455d',
                        color: 'white',
                        padding: '2px 1px',
                        marginLeft: '5px',
                        borderRadius: '10%',
                      }}
                    >{`-${Math.floor(
                      100 - (product.salePrice / product.originalPrice) * 100
                    )}%`}</span>
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => onClickAddToCart && onClickAddToCart(product)}
            >
              Add To Cart
            </Button>

            <Box className={classes.buttonGroup}>
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={() => onEdit && onEdit(product)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove">
                <IconButton color="primary" onClick={() => onRemove && onRemove(product)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListProduct;
