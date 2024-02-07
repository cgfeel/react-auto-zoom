/// <reference types="react" />
declare const PointImg: import("react").ForwardRefExoticComponent<PointImgProps & import("react").RefAttributes<PointImgInstance>>;
export interface PointImgInstance {
    pick: () => void;
}
export interface PointImgProps {
    origin: string;
    src: string;
    align?: "center" | "right";
    className?: string;
}
export default PointImg;
