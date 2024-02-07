import { ZoomContext } from "@/index";
import { forwardRef, memo, useContext, useImperativeHandle } from "react";

const ZoomTouch = forwardRef<ZoomTouchInstance, ZoomTouchProps>(({ touch }, ref) => {
    const [target, { close }] = useContext(ZoomContext);

    useImperativeHandle(ref, () => ({
        close: () => touch && close(target),
    }));

    return null;
});

if (process.env.NODE_ENV !== "production") {
    ZoomTouch.displayName = "ZoomTouch";
}

export interface ZoomTouchInstance {
    close: () => void;
}

export interface ZoomTouchProps {
    touch?: boolean;
}

export default memo(ZoomTouch);
