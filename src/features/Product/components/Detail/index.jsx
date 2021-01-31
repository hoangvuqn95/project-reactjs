import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  Add,
  AssignmentTurnedInOutlined,
  History,
  Remove,
  Star,
  StorefrontOutlined,
  VerifiedUser,
} from '@material-ui/icons';
import SimpleRating from 'components/Rating/SimpleRating';
import React from 'react';

Detail.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },

  // Card
  cardDetail: {
    backgroundColor: 'white',
    width: '1200px',
    height: '500px',
    display: 'flex',
    flexDirection: 'row',

    margin: '10px auto',
    padding: '10px',
    boxShadow: '0 0 5px 0.5px',
  },

  // Image size
  media: {
    width: '600px',
    border: '1px solid black',
    marginRight: '10px',
  },

  // Content size
  content: {
    width: '100%',
    margin: '0 auto',
    padding: '10px',
  },

  // Have price, shop, and buy go to the cart
  priceAndInformationShop: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  // Price
  classPrice: {
    width: '450px',
    marginRight: '5px',
    padding: '5px 10px',
  },
  // Shop
  classInformationShop: {
    width: '250px',
    border: '1px solid #d8dcda',
    padding: '10px',
    margin: '5px auto',
  },

  smallBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '5px',
  },

  percentSalePrice: {
    backgroundColor: '#f3455d',
    color: 'white',
    padding: '2px 1px',
    margin: '0 10px',
    borderRadius: '10%',
  },
}));

function Detail({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.cardDetail}>
        <CardMedia className={classes.media} image={data.images[0]} title={data.name} />
        {console.log('data:', data)}

        <CardContent className={classes.content}>
          <Box>
            <Typography variant="h5">{data.name}</Typography>
            {/* Rating */}
            <Typography variant="body1">
              <SimpleRating />
            </Typography>
          </Box>

          <Box className={classes.priceAndInformationShop}>
            <Box className={classes.classPrice}>
              <Box
                style={{
                  backgroundColor: '#d8dcda',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '10px',
                }}
              >
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                  {data.salePrice} <span style={{ textDecoration: 'underline' }}>đ</span>
                </Typography>

                <Typography variant="body1">
                  <span className={classes.percentSalePrice}>{`-${Math.floor(
                    100 - (data.salePrice / data.originalPrice) * 100
                  )}%`}</span>
                </Typography>

                <Typography variant="body1">
                  <span style={{ textDecoration: 'line-through' }}>{data.originalPrice}đ</span>
                </Typography>
              </Box>

              <Box style={{ border: '1px solid #d8dcda', marginTop: '15px', padding: '10px' }}>
                <Typography variant="body1">Màu sắc:</Typography>
                <Button variant="outlined" color="primary" style={{ marginRight: '5px' }}>
                  Xanh duong
                </Button>
                <Button variant="outlined" color="primary" style={{ marginRight: '5px' }}>
                  Hong Phan
                </Button>
                <Button variant="outlined" color="primary" style={{ marginRight: '5px' }}>
                  Bac
                </Button>
                <Button variant="outlined" color="primary">
                  Den
                </Button>
              </Box>

              <Box
                style={{
                  border: '1px solid #d8dcda',
                  marginTop: '15px',
                  padding: '10px',
                  fontSize: '18px',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  // fontWeight: 'bold',
                }}
              >
                So luong:
                <Box>
                  <Button variant="outlined" color="secondary">
                    <Remove />
                  </Button>
                  <span>{`0${9}`.slice(-2)}</span>
                  <Button variant="outlined" color="secondary">
                    <Add />
                  </Button>
                </Box>
                <Button variant="contained" color="secondary">
                  Chon mua
                </Button>
              </Box>
            </Box>

            {/* Name, price and information of the shop */}
            <Box className={classes.classInformationShop}>
              <Box className={classes.smallBox}>
                <Avatar size="small">T</Avatar>
                <Typography
                  variant="body1"
                  style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                >
                  Technology shop
                </Typography>
              </Box>

              <Box className={classes.smallBox}>
                <Box width="50px" textAlign="center">
                  4.2/ 5{' '}
                  <span>
                    <Star size="small" color="secondary" />
                  </span>
                </Box>
                <Box width="50px" textAlign="center">
                  123 Followers
                </Box>
              </Box>

              <Box className={classes.smallBox}>
                <Button variant="outlined" startIcon={<StorefrontOutlined />} color="primary">
                  shop
                </Button>
                <Button variant="outlined" color="primary" startIcon={<Add />}>
                  Follow
                </Button>
              </Box>

              <Box
                className={classes.smallBox}
                style={{ borderTop: '1px solid #d8dcda', padding: '10px' }}
              >
                <Box textAlign="center" width="60px">
                  <VerifiedUser color="primary" />
                  <Typography variant="body2">
                    Hoàn tiền 100% <span style={{ textDecoration: 'underline' }}>nếu giả</span>
                  </Typography>
                </Box>
                <Box textAlign="center" width="60px">
                  <AssignmentTurnedInOutlined color="primary" />
                  <Typography variant="body2">Mở hộp kiểm tra nhận hàng</Typography>
                </Box>
                <Box textAlign="center" width="60px">
                  <History color="primary" />
                  <Typography variant="body2">Đổi trả trong 30 ngày nếu sp lỗi</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Detail;
