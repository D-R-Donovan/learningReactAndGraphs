import React, { useRef, useEffect } from "react";

type PlottingFunction = (ctx: CanvasRenderingContext2D, width: number, height: number, padding: number) => void

interface graphProps {
    height: number;
    width: number;
    className: string;
    plotLine: PlottingFunction;
}


/**
 * Adds axis and unit markings/labels, and deals with CSS pixel -> real pixel conversion 
 * 
 * Beware, gaph coords =/= canvas coords. The edge of the canvas is reserved to avoid clipping 
 * TODO: investgate possibilty of wrapping canvas functions so above can be ignored outside of this class
 * 
 * @param ref 
 * @param plotLine 
 */
function graphSetup(ref: HTMLCanvasElement, plotLine: PlottingFunction): void {

    // assert canvas context is not null as react promises component is mounted
    let ctx = ref.getContext("2d")!;

    ctx.clearRect(0, 0, ref.width, ref.height);

    // find device pixel density and CSS pixel difference 
    let dpr = window.devicePixelRatio || 1;
    let dimensions = ref.getBoundingClientRect();
    ref.height = dimensions.height;
    ref.width = Math.floor(dimensions.width);

    ctx.lineWidth = 1
    ctx.strokeStyle = "#b281ff";
    ctx.textAlign = "center"
    ctx.fillStyle = "white"

    // change canvas origin to be in middle of canvas
    ctx.translate(0, ref.height / 2);

    // TODO: test if variable graph offsets needed for different displays
    // if yes axis labels & tick marks offset may need changing too
    let minGraphX = 20
    let maxGraphX = ref.width - 20;
    //let width = ref.width

    let halfHeight = ref.height / 2;
    let minGraphY = -halfHeight + 20
    let maxGraphY = halfHeight - 20;


    // vertical axis lines
    ctx.moveTo(minGraphX, minGraphY);
    ctx.lineTo(minGraphX, maxGraphY);

    // horizontal axis lines
    ctx.moveTo(minGraphX, 0);
    ctx.lineTo(maxGraphX, 0);


    ctx.font = "13px Arial"
    for (let x = 0; x <= 8; x++) {
        const xPos = (x * ((maxGraphX - minGraphX) / 8)) + minGraphX;
        ctx.moveTo(xPos, + 5)
        ctx.lineTo(xPos, - 5)

        ctx.fillText(String(x / 4) + "π", xPos, 20)
    }


    ctx.font = "10px Arial"
    for (let y = 0; y <= 4; y++) {
        const yPos = (-1 + 0.5 * y) * maxGraphY;

        ctx.moveTo(15, yPos)
        ctx.lineTo(20, yPos)
        
        ctx.fillText(String(1 - 0.5 * y), 10, yPos + 13)
    }
    ctx.stroke();

    plotLine(ctx, ref.width, ref.height, 20);

    // scale CSS pixel to device pixel
    ctx.scale(dpr, dpr);
}

function Graph(props: graphProps): JSX.Element {
    const localref = useRef<HTMLCanvasElement | null>(null)
    useEffect((): void => {
        if (!localref.current) throw Error("localref is not assigned");
        graphSetup(localref.current, props.plotLine);
    })

    return <canvas ref={localref} className={props.className} />
}

export default Graph;