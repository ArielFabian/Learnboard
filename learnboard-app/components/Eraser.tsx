import { useRef } from "react";


interface EraserProps {
    width: number;
    height: number;
}

export function Eraser({ height, width }: EraserProps){
    const canvasRef = useRef<HTMLCanvasElement>(null); // Add a useRef hook to get a reference to the canvas element
    const context = canvasRef.current?.getContext("2d"); // Access the getContext method correctly
    if (context) {
        context.beginPath();
        context.lineWidth =  5;// Remove optional chaining from the left-hand side of the assignment expression
        context.strokeStyle = "#ffffff"; // Use optional chaining to access the context object
        context.closePath();

        context.stroke();
    }
    
    return <canvas ref={canvasRef} height={height} width={width} />;
}

export default Eraser;