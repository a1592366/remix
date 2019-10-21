import React from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';

import './index.css';


class Index extends React.Component {
  state = {
    connections: [],
    isDataLoaded: false
  }

  componentDidMount () {
    this.getConnections();
  }

  async getConnections () {
    const connections = await fetch('/api/inspect').then(res => res.json());

    this.setState({
      connections,
      isDataLoaded: true
    });
  }

  contentRender = () => {
    const { connections } = this.state;
    const terminals = connections.map(id => {
      return (
        <div className="app__index-terminal" key={id}>
          <Link className="app__index-terminal-link" to={`/inspect?id=${id}`}>{id}</Link>
        </div>
      );
    })

    return (
      <div className="app__index-content">
        <h2 className="app__title">
          请选择调试终端
        </h2>
        <div className="app__index-terminals">
          {terminals}
        </div>
      </div>
    );
  }

  loadingRender = () => {
    return (
      <div className="app__loading">
        Loading...
      </div>
    );
  }

  render () {
    return (
      <Context.Consumer>
        {
          ({ env }) => {
            const { isDataLoaded } = this.state;
            

            return (
              <div className="app__index">
                {
                  !isDataLoaded ? this.loadingRender() : this.contentRender()
                }
              </div>
            );    
          }
        }
        
      </Context.Consumer>
    )
  }
}

export default Index;
