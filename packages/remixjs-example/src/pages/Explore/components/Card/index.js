import React, { Component } from 'react';
import { View, Image, Text } from 'remixjs/components';

import './index.css'

export default function Card (props) {
  const { cover, name, tags, like } = props;

  return (
    <View className="index__movies-card">
      <View className="index__movies-card-cover">
        <Image mode="aspectFill" className="index__movies-card-cover-image" src={cover} />
      </View>

      <View className="index__movies-card-meta">
        <View className="index__movies-card-name">
          <Text className="index__movies-card-title-text">{name}</Text>
          <View className="index__movies-card-share-icon">

          </View>
        </View>
        
        <View className="index__movies-card-author"></View>
        <View className="index__movies-card-tags">{tags.map(tag => `#${tag}`).join(' ')}</View>
      </View>
    </View>
  );
}