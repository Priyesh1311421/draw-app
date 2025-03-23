import { use, useEffect, useRef, useState } from "react";
import { ALargeSmall, Circle, Minus, Square} from "lucide-react";
import { initDraw } from "@/draw";


const Canvas = ({roomId,socket}:{roomId:string,socket:WebSocket}) => {
    const [selected,setSelected] = useState<'rect'|'circle'|'line'>('rect');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
      //@ts-ignore
      window.selectedTool  = selected;
    },[selected])
    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);
  return <div>
    <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth}></canvas>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-xl p-3 flex gap-4 shadow-md">
      <Square 
      onClick={() => setSelected('rect')}
      className={`cursor-pointer hover:scale-110 transition-transform ${selected === 'rect' ? 'text-red-500' : 'text-black'}`} size={30} />
      <Circle 
      onClick={() => setSelected('circle')}
      className={`cursor-pointer hover:scale-110 transition-transform ${selected === 'circle' ? 'text-red-500' : 'text-black'}`} size={30} />
      <Minus
      onClick={() => setSelected('line')}
      className={`cursor-pointer hover:scale-110 transition-transform ${selected === 'line' ? 'text-red-500' : 'text-black'}`} size={30} />
    </div>
  </div>;
};

export default Canvas;
