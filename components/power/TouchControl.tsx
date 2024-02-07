import { FC, useContext, useEffect } from "react";
import { ViewContext } from "../ViewProvider";
import { ZoomContext } from "../ZoomProvider";
import "../assets/power-touch.css";

const TouchControl: FC = () => {
    const [targetRaw, { close }] = useContext(ZoomContext);
    const { view } = useContext(ViewContext);

    useEffect(() => {
        const coord = (pointX: number, pointY: number) => {
            const { bottom, height, left, right, top, width } = info.size;

            const moveX = Math.min(right, Math.max(pointX, left + 0.1));
            const moveY = Math.min(bottom, Math.max(pointY, top + 0.1));

            const x = Math.ceil((moveX - left) / (width / 10));
            const y = Math.ceil((moveY - top) / (height / 10));

            const num = (y - 1) * 10 + x;
            const cell = parent?.querySelector(`.zoom-cell:nth-child(${num})`);
            if (cell) {
                cell.checked = true;
            }
        };
        const handle = (event: TouchEvent) => {
            if (targetRaw === undefined) return;
            const target = event.target;

            if (parent?.contains(target)) {
                const { pageX, pageY } = event.targetTouches[0];
                const { scrollX, scrollY } = info.size;

                coord(Math.round(pageX) - scrollX, Math.round(pageY) - scrollY);
            }
        };

        const parent = targetRaw?.parentElement;
        const info = {
            size: { bottom: 0, height: 0, left: 0, right: 0, scrollX, scrollY, top: 0, width: 0 },
        };

        const init = () => {
            if (parent) {
                const { height, left, top, width } = parent.getBoundingClientRect();
                const { scrollX, scrollY } = window;

                info.size = {
                    bottom: top + height,
                    height,
                    left,
                    right: left + width,
                    scrollX,
                    scrollY,
                    top,
                    width,
                };
            }
        };

        // 挂起的状态，第一次不会触发`touchstart`
        init();

        // 不能通过事件阻止浏览器默认动作，否者默认展开情况下将会阻止页面正常操作
        document.addEventListener("touchmove", handle, { passive: true });
        parent?.addEventListener("touchstart", init, { passive: true });
        return () => {
            document.removeEventListener("touchmove", handle, { passive: true });
            parent?.removeEventListener("touchstart", init, { passive: true });
        };
    }, [targetRaw]);

    useEffect(() => {
        const handle = () => {
            const { start1, mount } = targetRaw || {};
            if (start1 !== undefined) {
                targetRaw.start1 = undefined;
                return;
            }
            if (mount === undefined) close(targetRaw);
        };
        document.addEventListener("touchend", handle, { passive: true });
        return () => {
            document.removeEventListener("touchend", handle, { passive: true });
        };
    }, [targetRaw, close]);

    useEffect(() => {
        view.current?.classList.add("touch-control");
    }, [view]);

    return null;
};

export default TouchControl;
