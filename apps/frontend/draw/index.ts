import { HTTP_BACKEND } from "@/config";
import axios from "axios";


type Shape = {
    type: 'rect',
    x: number;
    y: number;
    width: number;
    height: number;
}|{
    type: 'circle',
    x: number;
    y: number;
    radius: number;
}|{
    type: 'line',
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export async function initDraw(canvas: HTMLCanvasElement,roomId: string,socket: WebSocket) {
    const ctx = canvas.getContext('2d');

    let existingShapes: Shape[] = await getExistingShapes(roomId);
    console.log(existingShapes)

    if(!ctx){
        return;
    }

    socket.onmessage = (event) =>{
        const message = JSON.parse(event.data);
        if(message.type === 'chat'){
            const parsedData = JSON.parse(message.message);
            existingShapes.push(parsedData.shape);
            clearCanvas(existingShapes,canvas,ctx)
        }
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    clearCanvas(existingShapes,canvas,ctx)
    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener('mousedown',(e) =>{
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })
    
    canvas.addEventListener('mouseup',(e) =>{
        clicked = false;
        let shape: Shape | null = null;
        // @ts-ignore
        switch (window.selectedTool) {
            case 'rect':
            shape = {
                type: 'rect',
                x: startX,
                y: startY,
                width: e.clientX - startX,
                height: e.clientY - startY
            };
            break;
            case 'circle':
            const radius = (e.clientY - startY);
            shape = {
                type: 'circle',
                x: startX,
                y: startY,
                radius: radius
            };
            break;
            case 'line':
            shape = {
                type: 'line',
                x1: startX,
                y1: startY,
                x2: e.clientX,
                y2: e.clientY
            };
            break;
        }
        if (shape) {
            existingShapes.push(shape);
        }
        
        socket.send(JSON.stringify({
            type:'chat',
            roomId: parseInt(roomId),
            message: JSON.stringify({shape})
        }))
        
        clearCanvas(existingShapes,canvas,ctx)
    })

    canvas.addEventListener('mousemove',(e) =>{
        if(clicked){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.fillRect(0,0,canvas.width,canvas.height)
            clearCanvas(existingShapes,canvas,ctx)
            ctx.strokeStyle = 'white'
            // @ts-ignore
            const tool = window.selectedTool;
            if(tool === 'rect'){
                ctx.strokeRect(startX,startY,width,height)
            }else if(tool === 'circle'){
                const radius = height;
                ctx.beginPath()
                ctx.arc(startX,startY,radius,0,Math.PI*2)
                ctx.stroke()
            }else if(tool === 'line'){
                ctx.beginPath()
                ctx.moveTo(startX,startY)
                ctx.lineTo(e.clientX,e.clientY)
                ctx.stroke()
            }
        }
    })
            
        
}

function clearCanvas(existingShapes: Shape[],canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    existingShapes.map((shape) =>{
        if(shape.type === 'rect'){
            ctx.strokeStyle = 'white'
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
        }else if(shape.type === 'circle'){
            ctx.strokeStyle = 'white'
            ctx.beginPath()
            ctx.arc(shape.x,shape.y,shape.radius,0,Math.PI*2)
            ctx.stroke()
        }else if(shape.type === 'line'){
            ctx.strokeStyle = 'white'
            ctx.beginPath()
            ctx.moveTo(shape.x1,shape.y1)
            ctx.lineTo(shape.x2,shape.y2)
            ctx.stroke()
        }
    })
}

async function getExistingShapes(roomId: string){
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;
    const shapes = messages.map((x:{message:any})=>{
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    })

    return shapes;
}




