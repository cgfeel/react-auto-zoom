import { FC } from "react";
import { ScaleBaseProps } from "./ScaleBase";
declare const ZoomTouchScale: FC<ZoomTouchScaleProps>;
export interface ZoomTouchScaleProps extends ScaleBaseProps {
    strict?: boolean;
}
export default ZoomTouchScale;
