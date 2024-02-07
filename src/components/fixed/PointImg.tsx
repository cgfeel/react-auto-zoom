import { ZoomContext } from "@/index";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";

const PointImg = forwardRef<PointImgInstance, PointImgProps>(({ className, origin, src, align = "" }, ref) => {
    const [target, { close, open }] = useContext(ZoomContext);
    const imgRef = useRef<HTMLImageElement>(null);
    const [start, setStart] = useState(false);

    useImperativeHandle(ref, () => ({
        pick: () => {
            const start = target !== undefined;
            setStart(start);

            start && close(imgRef.current);
        },
    }));

    return (
        <p className={align}>
            <img
                alt="指定位置"
                className={className}
                origin={origin}
                ref={imgRef}
                src={src}
                onLoad={() => start && open(imgRef.current)}
            />
        </p>
    );
});

if (process.env.NODE_ENV !== "production") {
    PointImg.displayName = "PointImg";
}

export interface PointImgInstance {
    pick: () => void;
}

export interface PointImgProps {
    origin: string;
    src: string;
    align?: "center" | "right";
    className?: string;
}

export default PointImg;
