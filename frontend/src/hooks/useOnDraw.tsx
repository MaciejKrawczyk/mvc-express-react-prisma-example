import React, { useEffect, useRef } from "react";

interface Point {
    x: number;
    y: number;
}

type OnDrawType = (ctx: CanvasRenderingContext2D | null, point: Point | null, prevPoint: Point | null) => void;

export function useOnDraw(onDraw: OnDrawType): { setCanvasRef: (ref: HTMLCanvasElement | null) => void, onCanvasMouseDown: () => void, canvasRef: React.RefObject<HTMLCanvasElement> } {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef(false);
    const prevPointRef = useRef<Point | null>(null);

    const mouseMoveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
    const mouseUpListenerRef = useRef<(() => void) | null>(null);

    const setCanvasRef: (ref: HTMLCanvasElement | null) => void = (ref) => {
        canvasRef.current = ref;
    }

    const onCanvasMouseDown: () => void = () => {
        isDrawingRef.current = true;
    }

    useEffect(() => {
        function computePointInCanvas(clientX: number, clientY: number): Point | null {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top
                }
            } else {
                return null;
            }

        }
        function initMouseMoveListener() {
            const mouseMoveListener = (e: MouseEvent) => {
                if (isDrawingRef.current && canvasRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw && point) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }

        function initMouseUpListener() {
            const listener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = listener;
            window.addEventListener("mouseup", listener);
        }

        function cleanup() {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }

        initMouseMoveListener();
        initMouseUpListener();
        return () => cleanup();

    }, [onDraw]);

    return {
        setCanvasRef,
        onCanvasMouseDown,
        canvasRef
    }

}