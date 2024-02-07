import { FC } from "react";
import "../assets/power-coord.css";
declare const ZoomCoord: FC<ZoomCoordProps>;
export type CoordType = [{
    x: number;
    y: number;
}, string];
export interface ZoomCoordProps {
    capture?: (val: CoordType) => void;
}
export default ZoomCoord;
