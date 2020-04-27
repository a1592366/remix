import React from 'react';

import logo from '../../static/images/logo.png';

import './index.css';

export default function () {
  return (
    <view className="remix">
      <view className="remix__logo">
        <image  
          className="remix__logo-image"
          src={logo} 
        />
        <text className="remix__logo-text">REMIX</text>
      </view>
    </view>
  );
}