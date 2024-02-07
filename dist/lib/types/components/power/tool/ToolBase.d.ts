import { FC, RefObject } from "react";
import { ZoomElement } from "../../ZoomProvider";
declare const ToolBase: FC<ToolBaseProps>;
export interface ToolBaseProps {
    view: RefObject<HTMLDivElement>;
    target?: ZoomElement;
    touch?: boolean;
}
export default ToolBase;
