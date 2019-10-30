import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  state = {
    className: 'a'
  }

  onClick = () => {
    debugger;
    this.setState({
      className: 'b'
    })
  }

  render () {
    return (
      <div>
        <div onClick={this.onClick} className={this.state.className}>a</div>
        <div>b</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.body)