import { Box, Card, CardActionArea, CardActions, CardMedia, Typography } from '@material-ui/core';
import React from 'react';

Detail.propTypes = {};

function Detail({ data }) {
  return (
    <div>
      <Card>
        <CardActions>
          <Typography variant="h5">{data.name}</Typography>
          <Typography variant="h5">{data.salePrice}</Typography>
          <Typography variant="body1">{data.shortDescription}</Typography>
        </CardActions>
      </Card>
    </div>
  );
}

export default Detail;
