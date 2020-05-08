import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App () {
  const [name, setName] = useState('Richelle');

  debugger;  

  return (
    <div onClick={() => setName('Aniwei')}>
      {name}
    </div>
  );
}

ReactDOM.render(<App />, document.body);