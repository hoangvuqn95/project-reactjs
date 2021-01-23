import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
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
};

ListProduct.defaultProps = {
  productList: [],
  onEdit: null,
  onRemove: null,
};

const useStyles = makeStyles({
  root: {
    width: 100,
    borderRadius: '10%',
    margin: '10px',
    position: 'relative',
  },
  cardProduct: {},
  media: {
    paddingTop: '56.25%',
    height: 200,
  },
  content: {
    height: 100,
    width: '100%',
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
});

function ListProduct(props) {
  const classes = useStyles();
  const { productList, onEdit, onRemove } = props;

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
                <CardMedia src={product.images[0]} title={product.name} className={classes.media} />
                <CardActionArea className={classes.content}>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body1">
                    {product.salePrice}
                    <span style={{ textDecoration: 'underline' }}>đ</span>
                    {/* Because this is a simple calculator, in life never have simple calculator, default backend have to make calculator for a ecommerce website */}

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
                  <Typography variant="body1">
                    <span style={{ textDecoration: 'line-through' }}>{product.originalPrice}</span>
                    <span style={{ textDecoration: 'underline' }}>đ</span>
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                onClick={() => onEdit && onEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Delete />}
                onClick={() => onRemove && onRemove(product)}
              >
                Delete
              </Button>
            </Box>
            <Box className={classes.buttonGroup}>
              <IconButton
                color="primary"
                aria-label="Edit button"
                onClick={() => onEdit && onEdit(product)}
              >
                <Edit />
              </IconButton>
              <IconButton color="primary" onClick={() => onRemove && onRemove(product)}>
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListProduct;
