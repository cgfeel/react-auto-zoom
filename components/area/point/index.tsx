import { FC, PropsWithChildren, useRef } from "react";
import ZoomProvider, { ZoomRefInstance } from "../../ZoomProvider";
import "../../assets/area-point.css";
import NodeView, { NodeViewProps } from "../../modal/NodeView";
import PointView, { PointViewProps } from "./PointView";

const Point: FC<PropsWithChildren<PointProps>> = ({ children, className, disable, match, point, portal }) => {
    const zoomRef = useRef<ZoomRefInstance>(null);
    return (
        <ZoomProvider
            className={className}
            disable={disable}
            match={match}
            ref={zoomRef}
            onTouch={(event: TouchEvent) => {
                const target = zoomRef.current?.handle(event);
                if (target) zoomRef.current?.create(target, { x: 0, y: 0 });
            }}>
            <NodeView portal={portal}>{point}</NodeView>
            {children}
        </ZoomProvider>
    );
};

export interface PointProps extends PointViewProps, NodeViewProps {
    point: typeof PointView;
}

export default Point;
