import React, { useState } from 'react';
import Markdown from 'react-markdown';

import './index.css';

const md = `
测试 react-markdown 渲染

![图片](https://upload-images.jianshu.io/upload_images/703764-605e3cc2ecb664f6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 好像可以哦，不错不错
`

export default function Docs () {
  
  return (
    <view className="docs">
      <Markdown source={md} skipHtml={false} />
    </view>
  );
}
