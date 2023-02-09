import React, { useRef, useEffect } from "react";

type PlottingFunction = (ctx: CanvasRenderingContext2D, width: number, height: number) => void

interface graphProps {
    height: number;
    width: number;
    style: React.CSSProperties;
    plotLine: PlottingFunction
}

function addAxis(ref: HTMLCanvasElement, height: number, width: number,
    plotLine: PlottingFunction): void {

    // assert canvas context is not null as react promises component is mounted
    let ctx = ref.getContext("2d")!;

    // vertical axis lines
    ctx.moveTo(15, 10);
    ctx.lineTo(15, height - 10);

    // horizontal axis lines
    ctx.moveTo(15, height / 2);
    ctx.lineTo(width - 10, height / 2);

    ctx.lineWidth = 1
    ctx.strokeStyle = "#b281ff";

    // add x axis ticks and labels
    for (let x = 0; x <= 7; x++) {
        ctx.moveTo((x * ((width - 20) / 8)) + 15, (height / 2) + 5)
        ctx.lineTo((x * ((width - 20) / 8)) + 15, (height / 2) - 5)
        ctx.font = "13px Arial white"
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText(String(x / 4) + "π", (x * ((width - 20) / 8)) + 25, (height / 2) + 20)
    }

    // add y axis ticks and labels
    for (let y = 0; y <= 4; y++) {
        ctx.moveTo(15, y * ((height - 20) / 4) + 10)
        ctx.lineTo(20, y * ((height - 20) / 4) + 10)
        ctx.font = "10px Arial white"
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText(String(1 - 0.5 * y), 5, y * ((height - 20) / 4) + 13)
    }
    ctx.stroke();

    plotLine(ctx, width, height)

}

function Graph(props: graphProps): JSX.Element {
    const localref = useRef<HTMLCanvasElement | null>(null)
    useEffect((): void => {
        if (!localref.current) throw Error("localref is not assigned");
        addAxis(localref.current, props.height, props.width, props.plotLine);
    })

    return <canvas ref={localref} height={props.height} width={props.width} style={props.style} />
}

export default Graph;