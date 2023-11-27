import { useStateValue } from './StateProvider.tsx';


const CanvasNavbar = ({}) => {

    const [, dispatch] = useStateValue();
    const handleClick = (button: string) => {
        dispatch({ type: 'SET_CLICKED_BUTTON', payload: button });
    };

    function downloadCanvas(){
        const canvas: HTMLCanvasElement = document.getElementById("user_canvas");
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = 'your-canvas.jpg';
        link.href = url;
        link.click();
    }

    return (
        <div className={'w-screen h-20 bg-transparent border border-b-black sticky top-0 flex z-50 justify-around items-center'}>
            <div onClick={() => handleClick('pen')} className={'w-12 h-12 rounded-full bg-pink-400 cursor-pointer flex justify-center items-center'}>pen</div>
            <div onClick={() => handleClick('hand')} className={'w-12 h-12 rounded-full bg-green-300 cursor-pointer flex justify-center items-center'}>hand</div>
            <div onClick={() => downloadCanvas()} className={'w-12 h-12 rounded-full bg-green-300 cursor-pointer flex justify-center items-center'}>download</div>

        </div>
    )
}

export default CanvasNavbar