

import React from 'react';
import ReactDOM from 'react-dom';

const context = React.createContext();

const Consum = () => {

  return <div>C</div>
}

class App extends React.Component {
  state = {
    active: true,
    authorized: false
  }

  onClick = () => {
    debugger;
    this.setState({
      active: !this.state.active
    })
  }

  render () {
    const { active } = this.state;

    return (
        <div>
          <div className={active ? 'classA active' : 'classA'} onClick={this.onClick}>classA</div>

          {
            active ? <div className={'classB active'}>classB</div> : <Consum />
          }


        </div>
    );
  }
}


ReactDOM.render(<App />, document.body)
