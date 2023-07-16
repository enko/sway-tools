export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Mode {
    width: number;
    height: number;
    refresh: number;
}

export interface Output {
    id: number;
    name: string;
    rect: Rect;
    focus: number[];
    border: string;
    percent: number;
    window_rect: Rect;
    dec_rect: Rect;
    geometry: Rect;
    window: null;
    urgend: boolean;
    floating_nodes: number[];
    sticky: boolean;
    type: "output";
    active: true;
    primary: boolean;
    make: string;
    model: string;
    serial: string;
    scale: number;
    transform: string;
    current_workspace: string;
    modes: Mode[];
    current_mode: Mode;
    focused: boolean;
}
