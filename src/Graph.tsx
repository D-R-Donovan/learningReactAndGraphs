import React, { useRef, useEffect } from "react";

type LinePlottingFunction = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    padding: number
) => void;
type AxisPlottingFunction = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    padding: number | undefined
) => void;

interface graphProps {
    height: number;
    width: number;
    className: string;
    plotLine: LinePlottingFunction;
    plotAxis?: AxisPlottingFunction;
    padding?: number;
    translate?: string | [number, number];
    xRange?: [number, number];
    yRange?: [number, number];
    intervalX?: number;
    intervalY?: number;
    unitsX?: string;
    unitsY?: string;
}

//TODO: investgate possibilty of wrapping canvas functions so above can be ignored outside of this class
function Graph(props: graphProps): JSX.Element {
    const localref = useRef<HTMLCanvasElement | null>(null);
    useEffect((): void => {
        if (!localref.current) throw Error("localref is not assigned");
        let ref = localref.current;
        let padding = props.padding === undefined ? 20 : props.padding;
        let ctx: CanvasRenderingContext2D = ref.getContext("2d")!;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, -ref.height, ref.width, 2 * ref.height);

        // find device pixel density and CSS pixel difference
        let dpr = window.devicePixelRatio || 1;

        // TODO: add an enum? or similar for supported translations
        if (!props.translate) {
        } else if (Array.isArray(props.translate)) {
            ctx.translate(props.translate[0], props.translate[1]);
        } else if (props.translate === "center") {
            ctx.translate(ref.width / 2, ref.height / 2);
        } else if (props.translate === "midLeft") {
            ctx.translate(0, ref.height / 2);
        } else {
            throw Error("translation argument is unrecognised");
        }

        if (!props.plotAxis) {
            axisSetup(
                ctx,
                padding,
                ref.width,
                ref.height,
                props.xRange,
                props.yRange,
                props.intervalX,
                props.intervalY,
                props.unitsX,
                props.unitsY
            );
        } else {
            props.plotAxis(ctx, ref.width, ref.height, padding);
        }

        props.plotLine(ctx, ref.width, ref.height, padding);

        // scale CSS pixel to device pixel
        ctx.scale(dpr, dpr);
    });

    return (
        <canvas
            ref={localref}
            className={props.className}
            height={props.height}
            width={props.width}
        />
    );
}

function axisSetup(
    ctx: CanvasRenderingContext2D,
    padding: number,
    width: number,
    height: number,
    xRange: [number, number] | undefined,
    yRange: [number, number] | undefined,
    intervalX: number = 1,
    intervalY: number = 1,
    unitsX: string = "",
    unitsY: string = ""
) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#b281ff";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    let minGraphX = padding;
    let maxGraphX = width - padding;

    let halfHeight = height / 2;
    let minGraphY = -halfHeight + padding;
    let maxGraphY = halfHeight - padding;

    // vertical axis lines
    ctx.moveTo(minGraphX, minGraphY);
    ctx.lineTo(minGraphX, maxGraphY);

    // horizontal axis lines
    ctx.moveTo(minGraphX, 0);
    ctx.lineTo(maxGraphX, 0);

    ctx.font = "13px Arial";
    for (let x = 0; x <= 8; x++) {
        const xPos = x * ((maxGraphX - minGraphX) / 8) + minGraphX;
        ctx.moveTo(xPos, +5);
        ctx.lineTo(xPos, -5);

        ctx.fillText(String(x / 4) + unitsX, xPos, 20);
    }

    ctx.font = "10px Arial";
    for (let y = 0; y <= 4; y++) {
        const yPos = (-1 + 0.5 * y) * maxGraphY;

        ctx.moveTo(padding - 5, yPos);
        ctx.lineTo(padding, yPos);

        ctx.fillText(String(1 - 0.5 * y) + unitsY, 10, yPos + 13);
    }
    ctx.stroke();
}

export default Graph;
