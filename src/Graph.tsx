import React, {useRef, useEffect} from "react";

function addAxis(ref:HTMLCanvasElement, height:number, width:number) : void {
    
    // assert canvas context is not null as react promises component is mounted
    let ctx = ref.getContext("2d")!; 

    ctx.translate(0, Math.floor(height/2))

    ctx.lineWidth = 1

    for (var x = 0; x <= width; x += 40) {
        ctx.moveTo(0.5 + x + 10, 10);
        ctx.lineTo(0.5 + x + 10, height + 10);
    }

    for (var x = 0; x <= height; x += 40) {
        ctx.moveTo(10, 0.5 + x + 10);
        ctx.lineTo(width + 10, 0.5 + x + 10);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();


    // const stepping : number = 25
    // const steppingDistance : number = 5
    // const num_lines_x = Math.floor(height / stepping);
    // const num_lines_y = Math.floor(width / stepping);
    // for (var i = 0; i <= num_lines_x; i++) {
    //     ctx.beginPath();
    //     ctx.lineWidth = 1;

    //     if (i === steppingDistance)
    //         ctx.strokeStyle = "#000000";
    //     else
    //         ctx.strokeStyle = "#e9e9e9";

    //     if (i === num_lines_x) {
    //         ctx.moveTo(0, stepping * i);
    //         ctx.lineTo(width, stepping * i);
    //     }
    //     else {
    //         ctx.moveTo(0, stepping * i + 0.5);
    //         ctx.lineTo(width, stepping * i + 0.5);
    //     }
    //     ctx.stroke();
    // }
    // for (i = 0; i <= num_lines_y; i++) {
    //     ctx.beginPath();
    //     ctx.lineWidth = 1;

    //     // If line represents Y-axis draw in different color
    //     if (i === steppingDistance)
    //         ctx.strokeStyle = "#000000";
    //     else
    //         ctx.strokeStyle = "#e9e9e9";

    //     if (i === num_lines_y) {
    //         ctx.moveTo(stepping * i, 0);
    //         ctx.lineTo(stepping * i, height);
    //     }
    //     else {
    //         ctx.moveTo(stepping * i + 0.5, 0);
    //         ctx.lineTo(stepping * i + 0.5, height);
    //     }
    //     ctx.stroke();
    // }
    // ctx.translate(steppingDistance * stepping, steppingDistance * stepping);
    // for (i = 1; i < (num_lines_y - steppingDistance); i++) {
    //     ctx.beginPath();
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = "#000000";

    //     // Draw a tick mark 6px long (-3 to 3)
    //     ctx.moveTo(stepping * i + 0.5, -3);
    //     ctx.lineTo(stepping * i + 0.5, 3);
    //     ctx.stroke();

    //     // Text value at that point
    //     ctx.font = '9px Arial';
    //     ctx.textAlign = 'start';
    //     ctx.fillText(String(i), stepping * i - 2, 15);
    // }

    // // Ticks marks along the negative X-axis
    // for (i = 1; i < steppingDistance; i++) {
    //     ctx.beginPath();
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = "#000000";

    //     // Draw a tick mark 6px long (-3 to 3)
    //     ctx.moveTo(-stepping * i + 0.5, -3);
    //     ctx.lineTo(-stepping * i + 0.5, 3);
    //     ctx.stroke();

    //     // Text value at that point
    //     ctx.font = '9px Arial';
    //     ctx.textAlign = 'end';
    //     ctx.fillText(String(-i), -stepping * i + 3, 15);
    // }
}

function Graph(props: any) : JSX.Element {
    const localref = useRef<HTMLCanvasElement | null>(null)
    useEffect((): void => {
        if (!localref.current) throw Error("localref is not assigned");
        addAxis(localref.current, props.height, props.width);
    })

    return <canvas ref={localref} height={props.height} width={props.width} style={props.style}/>
}

export default Graph;