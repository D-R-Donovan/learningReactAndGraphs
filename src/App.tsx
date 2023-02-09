import React from 'react';
import './App.css';
import Graph from './Graph';

const sineWave = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.beginPath()
  ctx.strokeStyle = "#3eb8ff"
  ctx.moveTo(15, height / 2)
  for (let x = 15; x < width - 10; x++) {
    if (x % 3 === 0) {
      let y = (height / 2) - (((height - 20) / 2) * Math.sin(((x - 15) * 2 * Math.PI) * (2 / (width - 25))))
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
}

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Sine Graph
        </p>
        <Graph height={400} width={500} style={{border:"1px solid white"}} plotLine={sineWave}/>
      </header>
    </div>
  );
}

 
export default App;
