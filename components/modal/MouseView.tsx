import { ForwardedRef, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { ModalViewProps, ModalViewRef, ModalViewInstance } from "../index.d";
import { pickView, useComputeStyle, useTargetListener } from "../useModal";
import { ConfigName } from "../useZoom";
import { ModalContext } from ".";
import ImgWrap from "./ImgWrap";

const MouseViewInternal = <T extends ConfigName>(
    { height, mode, width, className = "", power = [], show = ["focus"], theme = {} }: MouseViewProps<T>,
    ref: ForwardedRef<ModalViewInstance<T>>,
) => {
    const { config, target, close } = useContext(ModalContext);
    const styleName = pickView(className, show);

    const modeRef = useRef<HTMLDivElement>(null);
    const computeRootStyle = useComputeStyle(modeRef);

    const [name, info] = config;
    const { zindex = theme.zindex || 999 } = info;

    const viewInstance: ModalViewInstance<T> = useMemo(
        () => ({
            style: group => computeRootStyle(group),
            close,
            info,
            modeRef,
            name,
        }),
        [info, modeRef, name, close, computeRootStyle],
    );

    useEffect(() => {
        const handle = (event: MouseEvent) => {
            const { scrollX, scrollY } = window;
            computeRootStyle({
                "start-x": event.pageX - scrollX,
                "start-y": event.pageY - scrollY,
            });
        };
        modeRef.current?.addEventListener("mousemove", handle);
        return () => {
            modeRef.current?.removeEventListener("mouseover", handle);
        };
    }, [modeRef, computeRootStyle]);

    useEffect(() => {
        const size = {
            "wrap-y-size": height,
            "wrap-x-size": width,
        };
        computeRootStyle({ ...size, ...theme, zindex });
    }, [height, theme, width, zindex, computeRootStyle]);

    useImperativeHandle(ref, () => viewInstance);
    useTargetListener(target, computeRootStyle);

    return (
        <div className={`zoom-mouse-control zoom-${mode}${styleName === "" ? "" : " " + styleName}`} ref={modeRef}>
            <div className="zoom-view">
                <ImgWrap
                    info={info}
                    power={power}
                    viewInstance={viewInstance}
                    close={close}
                    computeRootStyle={computeRootStyle}
                />
            </div>
        </div>
    );
};

const MouseView: ModalViewRef = forwardRef(MouseViewInternal);

if (process.env.NODE_ENV !== "production") {
    MouseView.displayName = "MouseView";
}

export interface MouseViewProps<T extends ConfigName> extends ModalViewProps<T> {
    height: number;
    width: number;
}

export default MouseView;
