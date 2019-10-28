import render from '../../renderer';
import { document } from '../../document';
import { createElement } from '../../react';

export default class ViewController {
  constructor (id, route) {
    this.id = id;
    this.route = route;
    this.container = document.createElement('root');

    document.body.appendChild(this.container);
  }

  onLoad (query, callback) {
    const { component, render: r } = this.route;

    const rendered = render(
      createElement(
        component || r
      ),
      this.container
    );

    const elements = document.getContainerElements(this.container);
    console.log(elements);

    elements.onTouchStart = 'onTouchStart'

    callback(elements);
  }

  onReady () {

  }

 
}