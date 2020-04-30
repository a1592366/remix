import React from 'react';
import { useComponent } from '@remix/core/hooks';

export default useComponent(class extends React.Component {
  state = {
    code: ''
  }

  onInput = ({ detial }) => {
    debugger;
    console.log(detail.value);
  }

  render () {
    return (
      <view className="playground__editarea">
        <editor 
          className="palyground__editarea-editor"
          placeholder="请输入代码"
          onInput={this.onInput}
        />
      </view>
    );
  }
});
