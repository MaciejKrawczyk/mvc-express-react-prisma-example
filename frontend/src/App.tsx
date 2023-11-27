// import {useEffect, useRef, useCallback} from "react";
// import Canvas from "./components/Canvas.tsx";
// import {useStateValue} from "./components/StateProvider.tsx";
// import CanvasNavbar from "./components/CanvasNavbar.tsx";

function App() {


    // const [state] = useStateValue();
    // const clickedButton = state.clickedButton;
    //
    //
    // const boxRef = useRef<HTMLElement | null>(null);
    // const containerRef = useRef<HTMLDivElement | null>(null);
    // const isClicked = useRef<boolean>(false);
    //
    // const coords = useRef({
    //     startX: 0,
    //     startY: 0,
    //     lastX: 0,
    //     lastY: 0
    // });
    //
    // const onMouseDown = useCallback((e: MouseEvent) => {
    //     if (clickedButton !== 'hand') return;
    //
    //     isClicked.current = true;
    //     coords.current.startX = e.clientX
    //     coords.current.startY = e.clientY
    // }, [clickedButton]);
    //
    //
    // const onMouseUp = useCallback((e: MouseEvent) => {
    //     isClicked.current = false;
    //     if (boxRef.current) {
    //         coords.current.lastX = boxRef.current.offsetLeft;
    //         coords.current.lastY = boxRef.current.offsetTop;
    //     }
    // }, []);
    //
    // const onMouseMove = useCallback((e: MouseEvent) => {
    //     if (!isClicked.current || !boxRef.current) return;
    //
    //     const nextX = e.clientX - coords.current.startX + coords.current.lastX;
    //     const nextY = e.clientY - coords.current.startY + coords.current.lastY;
    //
    //     boxRef.current.style.left = `${nextX}px`;
    //     boxRef.current.style.top = `${nextY}px`;
    // }, []);
    //
    // useEffect(() => {
    //     const box = boxRef.current;
    //     const container = containerRef.current;
    //
    //     if (!box || !container) return;
    //
    //     box.addEventListener('mousedown', onMouseDown);
    //     box.addEventListener('mouseup', onMouseUp);
    //     container.addEventListener('mousemove', onMouseMove);
    //     container.addEventListener('mouseleave', onMouseUp);
    //
    //     return () => {
    //         box.removeEventListener('mousedown', onMouseDown);
    //         box.removeEventListener('mouseup', onMouseUp);
    //         container.removeEventListener('mousemove', onMouseMove);
    //         container.removeEventListener('mouseleave', onMouseUp);
    //     };
    // }, [onMouseDown, onMouseUp, onMouseMove]);


    return (
        <>
            {/*<CanvasNavbar/>*/}
            {/*<main ref={containerRef} className={'h-full w-full flex justify-center items-center'}>*/}
            {/*    <Canvas*/}
            {/*        ref={boxRef}*/}
            {/*        width={5000}*/}
            {/*        height={5000}*/}
            {/*        className={'absolute top-0 left-0 border border-black'}*/}
            {/*    />*/}
            {/*</main>*/}
            
            
            
        </>
    );
}

export default App;