import React from 'react';

export default function Editor () {
  return (
    <view className="playground__editarea">
      <editor 
        className="palyground__editarea-editor"
        placeholder="请输入代码"
      />
    </view>
  );
}
