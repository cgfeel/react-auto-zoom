import { CoordType, ZoomCoordProps } from "@/index";
import { FC, ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

const UploadInternal = (_, ref: ForwardedRef<UploadResultInstance>) => {
    const [[coord, color], setInfo] = useState<CoordType>([{ x: 0, y: 0 }, "#000000"]);
    useImperativeHandle(ref, () => ({
        capture: info => setInfo(info),
    }));

    return [
        <span key="coord">{`(x: ${coord.x}, y: ${coord.y})`}</span>,
        <input key="color" type="color" value={color} readOnly />,
    ];
};

const UploadResult: UploadResultRef = forwardRef(UploadInternal);

if (process.env.NODE_ENV !== "production") {
    UploadResult.displayName = "UploadResult";
}

export interface UploadResultInstance extends Required<ZoomCoordProps> {}

export interface UploadResultRef extends FC {
    <P = { ref?: UploadResultInstance }>(props: P): ReturnType<FC<P>>;
}

export default UploadResult;
