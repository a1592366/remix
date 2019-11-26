import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Button, Map, Picker, Swiper, Video } from 'remixjs/components';
import classnames from 'classnames';

import './index.css';

export default ({ className, transparent, ...rest }) => {
  const classes = classnames({
    'component__button': true,
    'component__button_transparent': transparent,
    [className]: !!className
  })
  return (
    <Button {...rest} hoverClass="none" plain>
      <View className={classes}>
        {rest.children}
      </View>
    </Button>
  );
}