

import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  state = {
    active: false
  }

  onClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render () {
    const { active } = this.state;

    return (
      <div>
        <div className={active ? 'classA active' : 'classA'} onClick={this.onClick}>classA</div>
        <div className={active ? 'claassB ': 'classB active'}>classB</div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.body)
