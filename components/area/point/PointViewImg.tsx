import { FC, useContext, useRef } from "react";
import { ZoomContext } from "../../ZoomProvider";
import { FixedConfiguration } from "../fixed/FixedBase";

const PointViewImg: FC<PointViewImgProps> = ({ info, mount }) => {
    const [, { open }] = useContext(ZoomContext);
    const imgRef = useRef<HTMLImageElement>(null);
    return (
        <img
            {...info}
            className="zoom-portal-img"
            ref={imgRef}
            onLoad={() => mount > -1 && open(imgRef.current, mount)}
        />
    );
};

interface PointViewImgProps {
    info: FixedConfiguration;
    mount: number;
}

export default PointViewImg;
