import React from 'react';
import { useController } from '@remix/core/hooks';

import logo from '../../static/images/logo.png';

import './index.css';

export default useController(class extends React.Component {

  render () {
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
})