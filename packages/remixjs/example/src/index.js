

import React from 'react';
import ReactDOM from 'react-dom';

const context = React.createContext();

const Consum = () => {

  return (
    <context.Consumer>
      {
        (context) => {
          debugger;
          return (
            <div>{context.authorized}</div>
          );
        }
      }
    </context.Consumer>
  );
}

class App extends React.Component {
  state = {
    active: false,
    authorized: false
  }

  onClick = () => {
    debugger;
    this.setState({
      authorized: true
    })
  }

  render () {
    const { active } = this.state;

    return (
      <context.Provider value={this.state}>
        <div>
          <div className={active ? 'classA active' : 'classA'} onClick={this.onClick}>classA</div>
          <div className={active ? 'claassB ': 'classB active'}>classB</div>
          <Consum></Consum>
        </div>
      </context.Provider>
    );
  }
}


ReactDOM.render(<App />, document.body)
