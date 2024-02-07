/// <reference types="react" />
declare const list: {
    origin: string;
    src: string;
}[];
export interface PickImageProps {
    num?: number;
    onLoad?: (img: HTMLImageElement) => void;
    start?: () => void;
    select?: (val: number) => void;
}
export { list };
declare const _default: import("react").NamedExoticComponent<PickImageProps>;
export default _default;
