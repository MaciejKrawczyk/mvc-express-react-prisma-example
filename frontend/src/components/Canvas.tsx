import {RefObject, useEffect, useRef} from 'react';
import {useOnDraw} from "../hooks/useOnDraw.tsx";
import {useStateValue} from "./StateProvider.tsx";

interface Point {
    x: number;
    y: number;
}

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({width, height, ...props}: CanvasProps) => {


    const [state] = useStateValue();
    const clickedButton = state.clickedButton;


    useEffect(() => {
        console.log(clickedButton);
    }, [clickedButton]);


    const {setCanvasRef, onCanvasMouseDown, canvasRef} = useOnDraw(onDraw);
    const isClicked = useRef<boolean>(false);
    const coords = useRef({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    });


    function onDraw(ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point) {
        switch (clickedButton) {
            case 'pen':
                drawLinePencil(prevPoint, point, ctx, '#000000', 10);
                break;
            case 'hand':
                // Run empty function
                break;
            default:
                // Handle other cases if needed
                break;
        }
    }


    function drawLinePencil(
        start: Point | null,
        end: Point,
        ctx: CanvasRenderingContext2D,
        color: string,
        width: number
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }



    const onMouseDown = (e: MouseEvent) => {
        if (clickedButton !== 'hand') return;

        isClicked.current = true;
        coords.current.startX = e.clientX
        coords.current.startY = e.clientY
    };

    const onMouseUp = (e: MouseEvent) => {
        isClicked.current = false;
        if (canvasRef.current) {
            coords.current.lastX = canvasRef.current.offsetLeft;
            coords.current.lastY = canvasRef.current.offsetTop;
        }
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isClicked.current || !canvasRef.current) return;

        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;

        canvasRef.current.style.left = `${nextX}px`;
        canvasRef.current.style.top = `${nextY}px`;
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', onMouseDown);
            canvas.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseUp);
        };
    }, [onMouseDown, onMouseUp, onMouseMove]);

    return (
        <canvas
            id={'user_canvas'}
            {...props}
            width={width}
            height={height}
            onMouseDown={onCanvasMouseDown}
            ref={setCanvasRef as unknown as RefObject<HTMLCanvasElement>}
        />
    );
}

export default Canvas;



const canvasStyle = {
    border: "1px solid black",
    position: "absolute" // Add this line to make the canvas position absolute
}