import React from 'react';

export default function () {

  return <view onGetUserInfo="onGetUserInfo">
    <button onGetUserInfo={() => { debugger; }}>
      GetUserInfomation
    </button>
  </view>
}