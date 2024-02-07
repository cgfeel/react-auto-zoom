import { FC } from "react";
import { ComputeStyleType } from "../index.d";
import { ConfigurationInfo } from "../useZoom";
declare const ImgView: FC<ImgViewProps>;
export interface ImgViewProps {
    info: ConfigurationInfo;
    close: () => void;
    compute: ComputeStyleType;
}
export default ImgView;
