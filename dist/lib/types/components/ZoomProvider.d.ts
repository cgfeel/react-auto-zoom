/// <reference types="react" />
import "./assets/index.css";
import { useMatchImage } from "./useZoom";
declare const ZoomContext: import("react").Context<ZoomContextInstance>;
interface ZoomProviderInstance {
    group: ReturnType<typeof useMatchImage>[0];
    close: (elem: ZoomElement) => void;
    compute: (info: StartType) => [number, number];
    open: (target: HTMLElement, mount?: number) => ZoomElement;
}
interface ZoomEvent extends Event {
    overlay?: boolean;
}
type StartType = {
    x: number;
    y: number;
};
export interface ZoomRefInstance {
    create: <T extends StartType>(target: HTMLElement, start: T, start1?: T) => void;
    handle: (event: ZoomEvent) => EventTarget | undefined;
}
export type ZoomContextInstance = [ZoomElement | undefined, ZoomProviderInstance];
export type ZoomElement = HTMLElement & {
    mount?: number;
    start?: [number, number];
    start1?: [number, number];
};
export interface ZoomProviderProps {
    className?: string;
    disable?: boolean;
    match?: string;
    onTouch?: (event: TouchEvent) => void;
}
export { ZoomContext };
declare const _default: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ZoomProviderProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<ZoomRefInstance>>>;
export default _default;
