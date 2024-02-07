/// <reference types="react" />
import { ImgWorkerProps } from "../../ImgWorker";
declare const BoxWork: import("react").ForwardRefExoticComponent<BoxWorkProps & import("react").RefAttributes<BoxWorkInstance>>;
export interface BoxWorkInstance {
    hit: (img: string) => void;
    load: (val: number) => void;
}
export interface BoxWorkProps extends Pick<ImgWorkerProps, "onSuccess"> {
    touch?: boolean;
}
export default BoxWork;
