import { Box, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";

ProductPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

ProductPagination.defaultProps = {
  count: 1,
  page: null,
  onPageChange: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ProductPagination({ count, page, onPageChange }) {
  const classes = useStyles();

  // Goi 1 function len component cha(ListingPage)
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <Box className={classes.root}>
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
}

export default ProductPagination;
