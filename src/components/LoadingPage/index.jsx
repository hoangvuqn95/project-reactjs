import React from 'react';
import './Loading.scss';

LoadingPage.propTypes = {};

function LoadingPage(props) {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
        <h2 style={{ color: 'deeppink', textAlign: 'center', fontSize: '20px' }}>LOADING...</h2>
      </div>
    </div>
  );
}

export default LoadingPage;
