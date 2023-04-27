import React, { useState } from 'react';

import './App.css';
import Graph from './Graph';


function App(): JSX.Element {
  const [frequency, setFrequency] = useState(2.0);
  const [amplitude, setAmplitude] = useState(1.0);
  const [wrapFrequency, setWrapFrequency] = useState(2.0);


  const sineWave = (ctx: CanvasRenderingContext2D, ctxWidth: number, ctxHeight: number, padding: number): void => {
    ctx.beginPath();
    let graphHeight = (ctxHeight / 2) - padding;
    ctx.strokeStyle = "#3eb8ff";
    ctx.moveTo(padding, 0);
    for (let x = padding; x < (ctxWidth - padding); x++) {
      if (x % 3 === 0) {
        let y = -graphHeight * amplitude * Math.sin(2 * Math.PI * (x - padding) * (frequency / (ctxWidth - 2 * padding)));
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  /**
   * This plots a circle where the radius at a given point is determined by a sine wave.
   * The @var wrapFrequency determines how far through a sine wave becomes a full circle.
   * @var frequency and @var amplitude determines the sine wave used.
   * 
   * @param ctx 
   * @param ctxWidth 
   * @param ctxHeight 
   * @param padding 
   */
  const circleSine = (ctx: CanvasRenderingContext2D, ctxWidth: number, ctxHeight: number, padding: number) => {
    ctx.beginPath();

    let graphHeight = -ctxHeight + (padding * 2);
    ctx.strokeStyle = "#3eb8ff";
    for (let angle = 0; angle < 2 * Math.PI; angle += (2 * Math.PI) / 500) {
      //the wrap frequency here is used to stretch the initial sine wave to fit 1 revolution of the circle
      let radius = ((graphHeight / 2) * Math.sin(angle * (frequency/wrapFrequency)));
      let x = amplitude * radius * Math.cos(angle);
      let y = amplitude * radius * Math.sin(angle);
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  const square = (ctx: CanvasRenderingContext2D, ctxWidth: number, ctxHeight: number, padding: number | undefined) => {
    padding = padding!;
    let sHalfwidth = ctxWidth / 2;
    let sHalfHeight = ctxHeight / 2;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#b281ff";

    ctx.moveTo(0, -sHalfHeight + padding);
    ctx.lineTo(0, sHalfHeight - padding);

    ctx.moveTo(-sHalfwidth + padding, 0);
    ctx.lineTo(sHalfwidth - padding, 0);

    ctx.stroke()
  }

  let width;
  if (window.innerWidth > 900) {
    width = 900
  } else {
    width = window.innerWidth * 0.2;
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="Flex-div">
          <div>
            <h2>
              Sine Graph
            </h2>
            <Graph height={width * 0.4} width={width} className="graphStyle" plotLine={sineWave} translate={"midLeft"} />
          <p>
            <input id='sinerange' type="range" min="0.1" max="10" step="0.05"
              value={frequency} className="freqRange" onChange={(e) => { setFrequency(e.target.valueAsNumber) }} />
            <label className='freqLabel'>Frequency = {new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1 }).format(frequency)}</label>
              <input id='apmlituderange' type="range" min="0.1" max="1.5" step="0.1"
                value={amplitude} className="freqRange" onChange={(e) => { setAmplitude(e.target.valueAsNumber) }} />
              <label className='freqLabel'>Amplitude = {new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1 }).format(amplitude)}</label>
          </p>
          </div>
          <div>
            <h2>
              Sine Around a Circle
            </h2>
            <Graph height={width / 2} width={width / 2} padding={20} className='graphStyle' plotLine={circleSine} plotAxis={square} translate={'center'} />
            <p>
              <input id='sinewraprange' type="range" min="0.1" max="5" step="0.1"
                value={wrapFrequency} className="freqRange" onChange={(e) => { setWrapFrequency(e.target.valueAsNumber) }} />
              <label className='freqLabel'>Wraping frequency = {new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1 }).format(wrapFrequency)}</label>
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}


export default App;
