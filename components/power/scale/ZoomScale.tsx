import { FC, useContext, useEffect, useRef } from "react";
import { ZoomContext } from "../../ZoomProvider";
import ScaleBase, { ScaleBaseInstance, ScaleBaseProps } from "./ScaleBase";

const defaultTips = {
    normal: "滚轮放大缩小，双击还原",
    tool: "滚轮放大缩小，重点设置还原",
};

const ZoomScale: FC<ZoomScaleTips> = ({ tips = {} }) => {
    const [target] = useContext(ZoomContext);
    const scaleRef = useRef<ScaleBaseInstance>(null);

    useEffect(() => {
        const parent = target ? target.parentElement : undefined;
        if (!parent) return;

        let scale = 1;
        let timeup = 0;

        const clear = () => {
            if (timeup !== 0) {
                clearTimeout(timeup);
                timeup = 0;
            }
        };

        const clickHandle = (event: ScaleClickEvent) => {
            if (event.scale) resetHandle(event);
        };

        const resetHandle = (event: MouseEvent) => {
            const point = parent.querySelector(".point-control");
            if (event.type === "dblclick" && point !== null) return;

            scale = 1;
            clear();

            timeup = scaleRef.current?.upScale(scale);
        };

        const wheelHandle = (event: WheelEvent) => {
            scale += event.deltaY * -0.01;
            scale = Math.min(Math.max(0.5, scale), 2);
            scale = Math.floor(scale * 100) / 100;

            event.preventDefault();
            clear();

            timeup = scaleRef.current?.upScale(scale);
        };

        parent.addEventListener("wheel", wheelHandle, { passive: false });
        parent.addEventListener("dblclick", resetHandle);
        parent.addEventListener("click", clickHandle);
        parent.setAttribute("scale", "1");

        return () => {
            parent.removeEventListener("wheel", wheelHandle, { passive: false });
            parent.removeEventListener("dblclick", resetHandle);
            parent.removeEventListener("click", clickHandle);
            parent.removeAttribute("scale");
        };
    }, [scaleRef, target]);

    return <ScaleBase ref={scaleRef} tips={{ ...defaultTips, ...tips }} />;
};

interface ScaleClickEvent extends MouseEvent {
    scale?: boolean;
}

export interface ZoomScaleTips extends ScaleBaseProps {}

export default ZoomScale;
