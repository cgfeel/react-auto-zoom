import { FC } from "react";
import PointViewImg from "./PointViewImg";
import Fixed, { FixedProps } from "../fixed";
import usePoint from "./usePoint";

const PointView: FC<PointViewProps> = ({ config, filter, ...props }) => {
    const [target, info] = usePoint({ config, filter });
    return info === undefined ? null : (
        <Fixed {...props} config={config} filter={filter}>
            <PointViewImg info={info} mount={target?.mount || -1} />
        </Fixed>
    );
};

export interface PointViewProps extends FixedProps {}

export default PointView;
