import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppStore from './images/appstore.png';
import Cash from './images/cash.svg';
import Facebook from './images/fb.svg';
import Installment from './images/installment.svg';
import InternetBanking from './images/internet-banking.svg';
import Jcb from './images/jcb.svg';
import MasterCard from './images/mastercard.svg';
import PlayStore from './images/playstore.png';
import Visa from './images/visa.svg';
import Youtube from './images/youtube.svg';
import Zalo from './images/zalo.png';

Footer.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    padding: '10px auto',
    margin: '20px auto',
    marginBottom: '10px',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  smallContent: {
    width: '300px',
    padding: '5px',
    margin: '5px 20px',
    letterSpacing: '1px',
  },

  bigImages: {
    width: '300px',
    padding: '10px',

    display: 'flex',
  },
  image: {
    width: '75px',
    height: '40px',
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.root}>
        <Box className={classes.smallContent}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            HỖ TRỢ KHÁCH HÀNG
          </Typography>
          <Typography variant="body2">
            <span style={{ color: 'red' }}>
              Hotline chăm sóc khách hàng: 1900-6035 (1000đ/phút , 8-21h kể cả T7, CN)
            </span>
          </Typography>
          <Typography variant="body2">Các câu hỏi thường gặp</Typography>
          <Typography variant="body2">Gửi yêu cầu hỗ trợ</Typography>
          <Typography variant="body2">Hướng dẫn đặt hàng</Typography>
          <Typography variant="body2">Phương thức vận chuyển</Typography>
        </Box>
        <Box className={classes.smallContent}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            VỀ E-COMMERCE
          </Typography>
          <Typography variant="body2">Chính sách bảo mật thanh toán</Typography>
          <Typography variant="body2">Chính sách bảo mật thông tin cá nhân</Typography>
        </Box>
        <Box className={classes.smallContent}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            HỢP TÁC VÀ LIÊN KẾT
          </Typography>
          <Typography variant="body2">Quy chế hoạt động Sàn GDTMĐT</Typography>
          <Typography variant="body2">Bán hàng cùng E-commerce</Typography>
        </Box>
        <Box className={classes.smallContent}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            PHƯƠNG THỨC THANH TOÁN
          </Typography>
          <Box className={classes.bigImages}>
            <img src={Visa} alt="Visa" style={{ marginRight: '10px' }} />
            <img src={MasterCard} alt="Mastercard" style={{ marginRight: '10px' }} />
            <img src={Jcb} alt="Jcb" style={{ marginRight: '10px' }} />
          </Box>
          <Box className={classes.bigImages}>
            <img src={Cash} alt="Cash" style={{ marginRight: '10px' }} />

            <img src={InternetBanking} alt="Internet Banking" style={{ marginRight: '10px' }} />

            <img src={Installment} alt="Installment" style={{ marginRight: '10px' }} />
          </Box>
        </Box>
        <Box className={classes.smallContent}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            KẾT NỐI VỚI CHÚNG TÔI
          </Typography>

          <Box className={classes.bigImages}>
            <img src={Facebook} alt="Facebook" />

            <img src={Youtube} alt="Youtube" />

            <img
              src={Zalo}
              alt="Zalo"
              style={{ width: '30px', height: '30px', marginLeft: '10px' }}
            />
          </Box>

          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI
          </Typography>

          <img src={AppStore} alt="AppStore" style={{ width: '150px', height: '40px' }} />

          <img src={PlayStore} alt="PlayStore" style={{ width: '150px', height: '40px' }} />
        </Box>
      </Box>
    </div>
  );
}

export default Footer;
