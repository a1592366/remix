import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/Index';
import Inspector from './pages/Inspector';

import './index.css';

export const Context =  createContext();


class App extends React.Component {
  id = uuid.v4();

  state = {
    env: null,
    ws: null
  }

  componentDidMount () {
    this.getEnviroments();
    // this.createSocket();
  }

  async getEnviroments () {
    const env = await fetch('/api/env').then(res => res.json());
    
    this.setState({
      env
    });
  }
  onOpen = () => {
    const { env } = this.state;
    this.opened = true;

    this.post({
      type: env.INSEPCT_MESSAGE_TYPES.REGISTER
    });
  }
  

  onMessage = (message) => {
    try {
      const json = JSON.parse(message);
    } catch (err) {

    }
  }

  render () {
    return (
      <Router>
        <div className="app">
          <header className="app__header">
            <a className="app__header-logo">
              REMIX DevTools
            </a>
          </header>
  
          <section className="app__content">
            <Context.Provider value={this.state} >
              <Route exact path="/" component={Home} />
              <Route path="/inspect" component={Inspector} />
            </Context.Provider>
          </section>
        </div>
      </Router>
    );
  }
} 

ReactDOM.render(<App />, document.getElementById('app'))

