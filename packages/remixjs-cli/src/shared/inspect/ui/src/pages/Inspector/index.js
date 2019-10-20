import React from 'react';

class Inspector extends React.Component {
  state = {
    open: false
  }


  isChromeDevToolOpen = () => {
    const devtools = /./;
    
    devtools.toString = () => {
      this.setState({
        opened: true
      })
    }

    console.log('%c', devtools);
  }

  render () {
    return (
      <div className="app__inspector">
        <iframe className="app__inspector-frame" src=""></iframe>
      </div>
    );
  }
}

export default Inspector;
