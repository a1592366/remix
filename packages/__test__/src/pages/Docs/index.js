import React, { useState } from 'react';

import './index.css';

export default function () {
  const [userInformation, setUserInformation] = useState(null);

  return <view className="user" style={{ display: 'flex', paddingTop: '100rpx', justifyContent: 'center', alignItems: 'center' }}>
    {
      userInformation && <image
        className="user__avatar"
        style={{ width: '200rpx', height: '200rpx' }} 
        src={userInformation.avatarUrl}
      />
    }
    <button 
      className="user__nickname"
      openType="getUserInfo" 
      onGetUserInfo={(event) => { setUserInformation(event.detail.userInfo) }}
    >
      {
        userInformation ? 
          userInformation.nickName : '获取我的个人信息'
      }
    </button>
  </view>
}
