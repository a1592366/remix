import React, { Component } from 'react';
import { View, Input } from 'remixjs/components';
import classnames from 'classnames';

import './index.css';

export default ({ className, value, label, onChange, afterAddon, placeholder, disabled }) => {
  const classes = classnames({
    'component__text-input': true,
    'component__text-input_disabled': disabled,
    [className]: !!className
  });

  return (
    <View className={classes}>
      <View className="component__text-input-area">
        <Input 
          disabled={disabled}
          placeholder={placeholder} 
          className="component__text-input-input" 
          value={value} 
          onInput={onChange} 
        />
      </View>
      {afterAddon}
    </View>
  );
}