import { FC, PropsWithChildren } from "react";
import "../../assets/area-point.css";
import { NodeViewProps } from "../../modal/NodeView";
import PointView, { PointViewProps } from "./PointView";
declare const Point: FC<PropsWithChildren<PointProps>>;
export interface PointProps extends PointViewProps, NodeViewProps {
    point: typeof PointView;
}
export default Point;
