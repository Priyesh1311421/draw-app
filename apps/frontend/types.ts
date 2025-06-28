export interface Draw {
    id: string;
    shape: "rectangle" | "line" ;
    strokeStyle: string;
    fillStyle: string;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
    points?: {x: number, y: number }[];
    text?: string;
    font?: string;
    fontSize?: string;
}

export type ToolType = 'rectangle' | 'line' | 'selection' | 'resize';

export interface Action {
    type: "draw" | "move" | "resize";
    orginalDraw: Draw | null;
    modifiedDraw: Draw| null;
}

export type ActiveAction = "select" | "move" | "draw" | "resize"
export type ActiveShape = "rectangle" | "line";

export interface CanvasState {
    diagrams: Draw[];
    activeDraw: Draw| null;
    selectedDraw: Draw | null;
    activeShape: ActiveShape;
    activeAction: ActiveAction;
    activeStrokeStyle: string;
    activeFillStyle: string;
    activeFont: string;
    activeFontSize: string;
    isDragging: boolean;
}