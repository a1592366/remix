import React, { useState, useMemo } from 'react';

import './index.css';


export default function Docs () {
  const [name, setName] = useState('Richelle');
  const nickname = useMemo(() => 'aniwei', []);

  const onClick = () => {
    setName(name === 'Richelle' ? 'Aniwei' : 'Richelle');
  }

  return (
    <view className="docs" onClick={onClick}>
      {name}
      {null}
      {nickname}
      <>
        <view>1</view>
        <view>2</view>
      </>
    </view>
  );
}
