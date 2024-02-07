import { FC } from "react";
import "../../assets/power-focus.css";
declare const ZoomFoucs: FC<ZoomFoucsProps>;
export type CoordType = Partial<Record<"height" | "width" | "x" | "y", number>>;
export interface ZoomFoucsInstance {
    cornerStyle: (info: Record<string, number>) => void;
}
export interface ZoomFoucsProps {
    coord?: CoordType;
    radius?: number;
    hit?: () => void;
}
export default ZoomFoucs;
