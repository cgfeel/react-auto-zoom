import { RefObject, useCallback, useEffect } from "react";
import { ZoomElement } from "./ZoomProvider";
import { ShowItem, ZoomRootType } from "./useZoom";

export function useNodeStyle(id: string) {
    return useCallback((current: number, column: number) => {
        const x = current % column;
        const y = Math.floor(current / column);
        return `[name="zoom-cell[${id}]"]:nth-child(${current + 1}):hover ~ .zoom-view, .zoom-control:not(:hover) [name="zoom-cell[${id}]"]:nth-child(${
            current + 1
        }):checked ~ .zoom-view { --zoom-cell-x: ${x}; --zoom-cell-y: ${y}; }`;
    }, [id]);
}

export function pickView(className: string, show: ShowItem[]) {
    const name = show.reduce((current, key) => current.indexOf(key) < 0 ? [...current, key] : current, className.split(' '));
    return name.filter(i => i).join(' ');
}

export function useComputeStyle(modeRef: RefObject<HTMLDivElement>) {
    return useCallback((styles: ZoomRootType) => {
        Object.keys(styles).forEach(key => modeRef.current?.style.setProperty(`--zoom-${key}`, styles[key]));
    }, [modeRef]);
}

export function useTargetListener(target: ZoomElement, computeRootStyle: ReturnType<typeof useComputeStyle>) {
    useEffect(() => {
        const handle = () => {
            const { height, left, top, width } = target.getBoundingClientRect();
            const { innerHeight, innerWidth } = window;

            computeRootStyle({
                "control-height": height,
                "control-left": left,
                "control-top": top,
                "control-width": width,
                "window-h": innerHeight,
                "window-w": innerWidth,
            });
        };

        const [x, y] = target.start || [0, 0];
        computeRootStyle({
            "start-x": x,
            "start-y": y,
        });

        window.addEventListener("resize", handle);
        handle();

        return () => {
            window.removeEventListener("resize", handle);
        };
    }, [target, computeRootStyle]);
}
