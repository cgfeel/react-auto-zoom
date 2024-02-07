/// <reference types="react" />
declare const MountFixed: import("react").ForwardRefExoticComponent<MountFixedProps & import("react").RefAttributes<MountFixedInstance>>;
export interface MountFixedInstance {
    pick: () => void;
}
export interface MountFixedProps {
    origin: string;
    src: string;
    align?: "center" | "right";
    className?: string;
    open?: number;
}
export default MountFixed;
