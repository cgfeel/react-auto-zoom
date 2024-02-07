import { ZoomCoordProps } from "@/index";
import { FC } from "react";
declare const UploadResult: UploadResultRef;
export interface UploadResultInstance extends Required<ZoomCoordProps> {
}
export interface UploadResultRef extends FC {
    <P = {
        ref?: UploadResultInstance;
    }>(props: P): ReturnType<FC<P>>;
}
export default UploadResult;
