/// <reference types="react" />
import "../../assets/power-scale.css";
export interface ScaleBaseInstance {
    upScale: (scale: number) => ReturnType<typeof setTimeout>;
}
export interface ScaleBaseProps {
    tips?: Record<string, string>;
}
declare const _default: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ScaleBaseProps & import("react").RefAttributes<ScaleBaseInstance>>>;
export default _default;
