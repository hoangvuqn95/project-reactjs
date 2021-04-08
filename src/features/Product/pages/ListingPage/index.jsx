import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  LinearProgress,
  Slide,
  Snackbar,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import productApi from 'api/productApi';
import Banner from 'components/Banner';
import LoadingPage from 'components/LoadingPage';
import Images from 'constants/images';
import { addToCart } from 'features/Cart/cartSlice';
import { cartItemsSelector } from 'features/Cart/selectors';
import Advertisement from 'features/Product/components/Advertisement';
import Categories from 'features/Product/components/Categories';
import ListProduct from 'features/Product/components/List';
import ProductForm from 'features/Product/components/ProductForm';
import ProductPagination from 'features/Product/components/ProductPagination';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ThemeContext from 'themeContext';

ListingPage.propTypes = {};

function ListingPage(props) {
  // cart
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();
  // search
  const history = useHistory();
  const searchTerm = useSelector((state) => state.product.searchTerm);
  // category - phan loai san pham
  const [categories, setCategories] = useState('');

  // theme
  const { currentTheme: theme } = useContext(ThemeContext);

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 15,
    _sort: 'updatedAt',
    _order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Show form module with dialog window
  const [open, setOpen] = useState(false);
  // Edit, remove product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  // Pagination of product page
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 15,
    _totalRows: 1,
  });

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

  const { _totalRows, _limit } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);

        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch to product list', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  useEffect(() => {
    if (!!searchTerm.q) {
      setCategories('');
      setFilters((x) => ({ ...x, ...searchTerm }));
    }

    if (!searchTerm.q) {
      setCategories('');
      setFilters({
        _page: 1,
        _limit: 15,
        _sort: 'updatedAt',
        _order: 'desc',
      });
    }
  }, [searchTerm]);

  const handleEditClick = (product) => {
    setSelectedProduct({
      name: '',
      salePrice: '',
      originalPrice: '',
      categoryId: '',
      ...product,
    });

    setOpen(true);
  };

  // clone product item(in a array have more object or array child, so we have to clone again)
  // we can clone with immerjs

  // Add one product
  const handleAddClick = () => setOpen(true);

  // Remove one product
  const handleRemoveClick = async (product) => {
    try {
      const message = `Are you sure to remove product named "${product.name}"? `;
      if (window.confirm(message)) {
        await productApi.remove(product.id);
        setFilters((x) => ({ ...x }));
      }
    } catch (error) {
      console.log('Failed to remove product: ', error);
    }
  };

  const handleSubmit = async (values) => {
    // Add mode
    const isAdd = !selectedProduct;
    if (isAdd) {
      await productApi.add(values);
      // re-fetch student list with current filters
      setFilters((x) => ({ ...x }));
      setOpen(false);

      return;
    }

    // Edit mode
    try {
      setSubmitting(true);

      values.id = selectedProduct.id;
      const updatedProduct = await productApi.update(values);

      // update product item
      setProductList((currentList) => {
        const newList = [...currentList];
        const updatedIdx = newList.findIndex((x) => x.id === selectedProduct.id);
        // If position of this id < 0, not exist, so render first array
        if (updatedIdx < 0) return currentList;

        // clone todo child object of item
        newList[updatedIdx] = {
          ...newList[updatedIdx],
          ...updatedProduct,
        };

        return newList;
      });

      setSelectedProduct(null);

      // Close dialog
      setOpen(false);
    } catch (error) {
      console.log('Failed to update product', error);
    }

    setSubmitting(false);
  };

  // Cart
  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  const [transition, setTransition] = useState(Slide);
  // Show notification of cart
  const [openCartNotification, setOpenCartNotification] = useState(false);
  const handleCloseCartNotification = () => {
    setOpenCartNotification(false);
  };

  const handleAddToCartClick = (product) => {
    setTransition(() => transition);
    setOpenCartNotification(true);

    const action = addToCart({ product, quantity: 1 });
    dispatch(action);
  };

  const handleMoveToCart = () => {
    history.push('/cart');
  };

  // category - lay categoryId tren api de phan loai
  const handleCategoryClick = (category) => {
    setCategories(category.value);
    setPagination((x) => ({ ...x, _page: 1 }));
    setFilters({
      _page: 1,
      _limit: 15,
      _sort: 'updatedAt',
      _order: 'desc',
      categoryId: category.value,
    });
  };

  return (
    <div style={{ background: theme.primaryColor }}>
      {/* loading */}
      {loading ? (
        <LoadingPage />
      ) : (
        <Grid container display="flex" justify="space-between">
          <Grid item xs={2}>
            <Advertisement backgroundUrl={Images.SALE} />
          </Grid>

          <Grid item xs={8}>
            <Box>
              <Banner title="New products 🤩" backgroundUrl={Images.XPS_BG} />

              {/* Filter */}
              <Categories categories={categories} filters={filters} onClick={handleCategoryClick} />

              {/* Add new product */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddClick}
              >
                Add New Product
              </Button>
            </Box>

            {/* Toan tu 3 ngoi */}
            {/* List product */}
            <Box>
              <ListProduct
                productList={productList}
                onPageChange={handlePageChange}
                onRemove={handleRemoveClick}
                onEdit={handleEditClick}
                onClickAddToCart={handleAddToCartClick}
              />

              {/* Dialog to open form */}
              <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                {submitting && <LinearProgress />}
                <DialogContent>
                  <ProductForm initialValues={selectedProduct} onSubmit={handleSubmit} />
                </DialogContent>
              </Dialog>

              {/* Pagination render */}
              <ProductPagination
                count={totalPages}
                page={pagination._page}
                onPageChange={handlePageChange}
              />

              <Snackbar
                open={openCartNotification}
                onClose={handleCloseCartNotification}
                TransitionComponent={transition}
                message="A new product has been added to cart!"
                key={transition ? transition.name : ''}
                action={
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleMoveToCart}
                    >
                      Move To Cart
                    </Button>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      onClick={handleCloseCartNotification}
                    >
                      <CloseIcon />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Advertisement backgroundUrl={Images.SALE50} width="250px" height="400px" />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ListingPage;
