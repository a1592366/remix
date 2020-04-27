import React, { useState } from 'react';

export default function () {
  const [userInformation, setUserInformation] = useState(null)

  return <view>
    {
      userInformation && <image 
        src={userInformation.avatarUrl}
      />
    }
    <button openType="getUserInfo" onGetUserInfo={(event) => { setUserInformation(event.detail.userInfo) }}>
      {userInformation ? userInformation.nickName : '授权'}
    </button>
  </view>
}
