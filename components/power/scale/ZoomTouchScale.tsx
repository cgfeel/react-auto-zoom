import { FC, useContext, useEffect, useRef } from "react";
import { ZoomContext } from "../../ZoomProvider";
import ScaleBase, { ScaleBaseInstance, ScaleBaseProps } from "./ScaleBase";

const defaultTips = {
    normal: "双指放大缩小，双击还原",
    tool: "双指放大缩小，重点设置还原",
};

const ZoomTouchScale: FC<ZoomTouchScaleProps> = ({ strict, tips }) => {
    const [target, { compute }] = useContext(ZoomContext);
    const scaleRef = useRef<ScaleBaseInstance>(null);

    useEffect(() => {
        const { parentElement: parent, mount = -1 } = target || {};
        if (mount < 0) return;

        let scale = 1;
        let timeup = 0;
        let lastTap = 0;

        const clear = () => {
            if (timeup !== 0) {
                clearTimeout(timeup);
                timeup = 0;
            }
        };

        // 严格模式，要两个触点都在区域内，试想一个触点各占一个区域，将会同时触发两个区域
        // 非严格模式，默认
        const contains = (move: Touch) => parent?.contains(move.target);

        const getDistance = <T extends Exclude<typeof start, undefined>>(start: T, stop: T) =>
            Math.hypot(stop[0] - start[0], stop[1] - start[1]);

        const moveHandle = (event: TouchEvent) => {
            // 这里没有采用targetTouches是因为触点来自不同的平级cell
            event.cancelable && event.preventDefault();
            const touches = event.touches;

            const move1 = touches[0];
            const move2 = touches[1];

            if (move2) {
                if (strict && !(contains(move1) && contains(move2))) return;
                const moveStart = compute({ x: move1.pageX, y: move1.pageY });
                const moveStop = compute({ x: move2.pageX, y: move2.pageY });

                if (target.start1 === undefined) {
                    target.start = moveStart;
                    target.start1 = moveStop;
                }

                const zoom = getDistance(moveStart, moveStop) / getDistance(target.start, target.start1);

                scale *= zoom;
                scale = Math.min(Math.max(0.5, scale), 2);
                scale = Math.floor(scale * 100) / 100;

                upScale(scale);
            }
        };

        const showHandle = (event: ScaleTouchEvent) => {
            if (event.scale) return upScale();
        };

        const tabHandle = () => {
            // 只检测一个点，当同时2指离开，正好是要忽略的情况
            if (target?.start1 !== undefined) return;

            // 之后算2次时间差
            const current = Date.now();
            const tapLength = current - lastTap;

            if (tapLength < 500 && tapLength > 0) upScale();
            lastTap = current;
        };

        const upScale = (val?: number = 1) => {
            clear();
            timeup = scaleRef.current?.upScale(val);
        };

        parent?.addEventListener("touchmove", moveHandle);
        parent?.addEventListener("touchend", tabHandle, { capture: true });
        parent?.addEventListener("touchend", showHandle);
        parent?.setAttribute("scale", "1");
        return () => {
            parent?.removeEventListener("touchmove", moveHandle);
            parent?.removeEventListener("touchend", tabHandle, { capture: true });
            parent?.removeEventListener("touchend", showHandle);
            parent?.removeAttribute("scale");
        };
    }, [strict, target, compute]);

    return <ScaleBase ref={scaleRef} tips={{ ...defaultTips, ...tips }} />;
};

interface ScaleTouchEvent extends TouchEvent {
    scale?: boolean;
}

export interface ZoomTouchScaleProps extends ScaleBaseProps {
    strict?: boolean;
}

export default ZoomTouchScale;
