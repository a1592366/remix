import React, { Component } from 'react';
import { useController } from '@remix/core/hooks';

import Controller, { PARSE, STEP, RUN} from './Controller';
import Editor from './Editor';


import './index.css';


class Playground extends Component {
  static getDerivedStateFromProps () {
  }

  state = {
    value: 100
  }

  onPress = (type) => {
    
  }


  render () {
    const { value } = this.state;

    return (
      <view className="playground">
        <Editor />
        <Controller 
          onPress={this.onPress}
        />
      </view>
    );
  }
}

export default useController(Playground, {
  backgroundColor: '#efefed'
});