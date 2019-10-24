import React from 'react';
import classnames from 'classnames';
import qs from 'qs';
import { Link } from 'react-router-dom';

import { Context } from '../../index';

import './index.css';

class Inspector extends React.Component {
  constructor (props) {
    super(props);

    const { location } = props;
    const search = location.search.slice(1);
    const query = qs.parse(search);
    const isDevToolStart = this.isChromeDevToolStart();

    this.query = query;

    this.state = {
      isDevToolStart,
      isDisconnected: false
    }
  }

  componentDidMount () {
    window.addEventListener('message', this.onRuntimeMessage);
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onRuntimeMessage);
  }

  onRuntimeMessage = ({ data: { code, post } }) => {
    switch (code) {
      case 'DISCONNECTED': {
        this.setState({
          isDisconnected: true
        });
        break;
      }
    }
  }

  isChromeDevToolStart = () => {
    const devtools = function(){};
    devtools.toString = function() {
      devtools.opened = true;
    }

    console.log('%c', devtools);

    return devtools.opened;
  }

  warningRender () {
    return (
      <div className="app__loading">
        请打开控制台进行代码调试，「Command + Option + i」,<a onClick={this.onReTry}>刷新</a>
      </div>
    );
  }

  scriptRender () {
    return <iframe ref={ref => this.runtime = ref} className="app__inspector-runtime" src={`/runtime.html?id=${this.query.id}`} />
  }

  onReTry = () => {
    const isDevToolStart = this.isChromeDevToolStart();
    this.setState({
      isDevToolStart
    });
  }

  onReConnect = () => {

    if (this.runtime) {
      this.setState({
        isDisconnected: false
      }, () => {
        this.runtime.contentWindow.location.reload();
      })
    }
  }

  render () {
    const { isDevToolStart, isDisconnected } = this.state;
    const classes = classnames({
      'app__inspector': true,
      'app__inspector_disconnected': isDisconnected
    })

    return (
      <div className={classes}>
        { 
          !isDevToolStart ? 
            this.warningRender() : 
            this.scriptRender()
        }
        <div className="app__inspector-mask">
          <div className="app__inspector-mask-text">已断开</div>
          <a className="app__inspector-mask-return" onClick={this.onReConnect} >重新连接</a>
        </div>
      </div>
    );
  }
}

export default Inspector;
