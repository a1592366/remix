import React, { Component } from 'react';

import Controller, { PARSE, STEP, RUN } from './Controller';
import Editor from './Editor';


import './index.css';


export default function Playground () {

  return (
    <view className="playground">
      <Editor />
      <Controller />
    </view>
  );
}
