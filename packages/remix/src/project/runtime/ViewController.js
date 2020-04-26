import { document } from '../../document';
import React, { createElement, render } from '../../react';
import { View } from '../../components';

export default class ViewController {
  constructor (id, route) {
    this.id = id;
    this.route = route;
    this.container = document.createElement('root');

    document.body.appendChild(this.container);
  }

  onLoad (query, callback) {
    const { component, render: r } = this.route;

    // const rendered = render(
    //   createElement(() => 
    //     <View className="root">{createElement(component || r)}</View>
    //   ),
    //   this.container
    // );

    
    const rendered = render(
      createElement(component || r),
      this.container
    );

    const elements = document.getContainerElements(this.container);
    console.log(elements);

    // elements.onTouchStart = 'onTouchStart';
    elements.onTap = 'onTap';


    callback(elements);
  }

  onReady () {

  }

 
}