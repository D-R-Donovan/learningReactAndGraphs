import React from 'react';

import './App.css';
import Graph from './Graph';

const sineWave = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number): void => {
  ctx.beginPath();
  let freq = 2;
  let graphHeight = (height / 2) - padding;
  ctx.strokeStyle = "#3eb8ff";
  ctx.moveTo(padding, 0);
  for (let x = padding; x < (width - padding); x++) {
    if (x % 3 === 0) {
      let y = -graphHeight * Math.sin(2 * Math.PI * (x - padding) * (freq / (width - 2 * padding)));
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Flex-div">
          <p>
            Sine Graph
          </p>
          <Graph height={400} width={500} className="graphStyle" plotLine={sineWave} />
        </div>
      </header>
    </div>
  );
}


export default App;
