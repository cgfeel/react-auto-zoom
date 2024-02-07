import { FC } from "react";
import PointViewImg from "./PointViewImg";
import FixedTouch, { FixedTouchProps } from "../fixed/FixedTouch";
import usePoint from "./usePoint";

const PointTouchView: FC<PointTouchViewProps> = ({ config, filter, ...props }) => {
    const [target, info] = usePoint({ config, filter });
    return info === undefined ? null : (
        <FixedTouch {...props} config={config} filter={filter}>
            <PointViewImg info={info} mount={target?.mount || -1} />
        </FixedTouch>
    );
};

export interface PointTouchViewProps extends FixedTouchProps {}

export default PointTouchView;
