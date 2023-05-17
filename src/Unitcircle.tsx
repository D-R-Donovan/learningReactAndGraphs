import { useEffect, useState, useRef } from "react";
import React from "react";
import Graph from "./Graph";
import "./Unitcircle.css";

function Unitcircle(): JSX.Element {
    const [triangleDegrees, setTriangleDegrees] = useState(0);
    const timer: React.MutableRefObject<undefined | NodeJS.Timer> = useRef();

    useEffect(() => {
        timer.current = setInterval(() => {
            setTriangleDegrees(triangleDegrees => triangleDegrees + Math.PI / 50);
        }, 500);
        return () => {
            console.log(timer.current);
            clearInterval(timer.current);
        };
    },[]);

    const squareAndCircle = (
        ctx: CanvasRenderingContext2D,
        ctxWidth: number,
        ctxHeight: number,
        padding: number | undefined
    ) => {
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

        ctx.stroke();

        // make circle
        ctx.beginPath();
        let graphHeight = (-ctxHeight + padding * 2) / 2;
        ctx.strokeStyle = "#3eb8ff";
        ctx.moveTo(graphHeight * 0.9, 0);
        for (let angle = 0; angle < 2 * Math.PI; angle += (2 * Math.PI) / 500) {
            let x = 0.9 * graphHeight * Math.cos(angle);
            let y = 0.9 * graphHeight * Math.sin(angle);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    };

    const triangle = (
        ctx: CanvasRenderingContext2D,
        ctxWidth: number,
        ctxHeight: number,
        padding: number
    ) => {
        ctx.beginPath();
        ctx.strokeStyle = "#ff6188";
        ctx.font = "15px Arial";
        let graphHeight = (-ctxHeight + padding * 2) / 2;
        let x = -(0.9 * graphHeight * Math.cos(triangleDegrees));
        let y = 0.9 * graphHeight * Math.sin(triangleDegrees);
        ctx.moveTo(0, 0);
        ctx.lineTo(x, 0);
        ctx.lineTo(x, y);
        ctx.lineTo(0, 0);
        let lbl: string = degreeFormat.format(Math.sin(triangleDegrees));
        let lblDimensions: TextMetrics = ctx.measureText(lbl);
        ctx.fillStyle = "#272822"; // page background colour
        ctx.fillRect(
            x + 5,
            y / 2 - lblDimensions.actualBoundingBoxAscent,
            lblDimensions.width,
            15
        );
        ctx.fillStyle = "white";
        ctx.fillText(lbl, x + 5, y / 2);
        ctx.stroke();
        if (triangleDegrees >= Math.PI * 2) {
            clearInterval(timer.current);
        }
    };

    const degreeFormat = new Intl.NumberFormat("en-GB", {
        minimumFractionDigits: 1,
    });
    let width;
    if (window.innerWidth > 900) {
        width = 900;
    } else {
        width = window.innerWidth * 0.9;
    }
    return (
        <div className="Intro">
            <h1>What is the 'Sine' function?</h1>
            <Graph
                height={width / 2}
                width={width / 2}
                translate={"center"}
                className="Triangle"
                plotLine={triangle}
                plotAxis={squareAndCircle}
            />
        </div>
    );
}

export default Unitcircle;
