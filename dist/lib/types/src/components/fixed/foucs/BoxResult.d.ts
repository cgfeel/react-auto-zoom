/// <reference types="react" />
declare const BoxResult: import("react").ForwardRefExoticComponent<BoxResultProps & import("react").RefAttributes<BoxResultInstance>>;
export interface BoxResultInstance {
    faild: (msg: string) => void;
    success: (img: string, touch: boolean) => void;
    wait: () => void;
}
export interface BoxResultProps {
    reload: () => void;
}
export default BoxResult;
