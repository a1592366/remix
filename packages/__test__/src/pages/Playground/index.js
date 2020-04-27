import React, { useState } from 'react';

import './index.css';

export default function () {
  let interpreter = null;
  const [value, setTextArea] = useState('');

  const onInput = (event) => {
    console.log(event.detail.value);
    setTextArea(event.detail.value);
  }

  const onLineChange = (event) => {
    console.log(event);
  }

  const onParse = () => {
    debugger;
    interpreter = new Interpreter(value, function (interpreter, global) {
   
      interpreter.setProperty(
        global, 
        'alert',
        interpreter.createNativeFunction((text) => {
          wx.showToast({
            title: text
          });
        })
      );

    });
  }

  return (
    <view className="playground">
      <view className="playground__header">

        <view className="playground__editor">
          <view className="playground__editor-line">

          </view>
          <view className="playground__editor-textarea">
            <textarea 
              value={value}
              onInput={onInput}
              onLineChange={onLineChange}
            />
          </view>
        </view>
        <view className="playground__controller">
          <view className="playground__parse" onTap={onParse}>
            Parse
          </view>
          <view className="playground__step">
            Step
          </view>
          <view className="playground__run">
            Run
          </view>
        </view>
        <view className="test">{!value ? '没有' : value}</view>
        <view>测试</view>
      </view>
    </view>
  );
}
