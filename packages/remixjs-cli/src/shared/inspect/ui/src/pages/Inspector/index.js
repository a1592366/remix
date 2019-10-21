import React from 'react';
import qs from 'qs';

import { Context } from '../../index';

class Inspector extends React.Component {
  constructor (props) {
    super(props);

    const { location } = props;
    const search = location.search.slice(1);
    const query = qs.parse(search);
    const isDevToolStart = this.isChromeDevToolStart();

    this.query = query;

    this.state = {
      isDevToolStart
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
    return <iframe className="app__inspector-runtime" src={`/runtime.html?id=${this.query.id}`} />
  }

  onReTry = () => {
    const isDevToolStart = this.isChromeDevToolStart();
    this.setState({
      isDevToolStart
    });
  }

  render () {
    const { isDevToolStart } = this.state;

    return (
      <Context.Consumer>
        {
          ({ ws }) => {
            return (
              <div className="app__inspector">
                { 
                  !isDevToolStart ? 
                    this.warningRender() : 
                    this.scriptRender()
                }
              </div>
            )
          }
        }
      </Context.Consumer>
    );
  }
}

export default Inspector;
