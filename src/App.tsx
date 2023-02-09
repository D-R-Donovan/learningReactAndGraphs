import React from 'react';
import './App.css';
import Graph from './Graph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Sine Graph
        </p>
        <Graph height={400} width={500} style={{border:"1px solid white"}}/>
      </header>
    </div>
  );
}

export default App;
