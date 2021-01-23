import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import productApi from 'api/productApi';
import ListProduct from 'features/Product/components/List';
import ProductForm from 'features/Product/components/ProductForm';
import ProductPagination from 'features/Product/components/ProductPagination';
import React, { useEffect, useState } from 'react';

ListingPage.propTypes = {};

function ListingPage(props) {
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

  const handleEditClick = (product) => {
    setSelectedProduct({
      name: '',
      salePrice: '',
      originalPrice: '',
      picture: '',
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
      const message = `Are you sure to remove product named "${product.name}"?.`;
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

  return (
    <div>
      <Grid container display="flex" justify="space-between" style={{ backgroundColor: 'fff' }}>
        <Grid item xs={2}>
          Hello mother fucker
        </Grid>

        <Grid item xs={8}>
          <Box>
            <Typography variant="h1">Carousel</Typography>
            <Typography variant="h1">Ad</Typography>
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
          <Box>
            <ListProduct
              productList={productList}
              onPageChange={handlePageChange}
              onRemove={handleRemoveClick}
              onEdit={handleEditClick}
            />

            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              {submitting && <CircularProgress />}
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
          </Box>
        </Grid>

        <Grid item xs={2}>
          Hello everyone
        </Grid>
      </Grid>
    </div>
  );
}

export default ListingPage;
