import React from 'react';
import classnames from 'classnames';

export const [
  PARSE, STEP, RUN
] = ['PARSE', 'STEP', 'RUN'];

export default function ({ onPress, stepDisabled }) {
  return (
    <view className="playground__ctrl">
      <view 
        className="playground__ctrl-button playground__parse"
        onTap={() => onPress(PARSE)}
      >
        Parse
      </view>
      <view 
        className="playground__ctrl-button playground__step"
        onTap={() => onPress(STEP)}
      >
        Step
      </view>
      <view 
        className="playground__ctrl-button playground__run"
        onTap={() => onPress(RUN)}
      >
        Run
      </view>
    </view>
  );
}