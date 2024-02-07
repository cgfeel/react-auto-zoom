import { FC, useContext, useEffect } from "react";
import { ViewContext } from "../../ViewProvider";
import { ZoomContext } from "../../ZoomProvider";
import "../../assets/power-touch-bar.css";
import ToolBase from "./ToolBase";

const ZoomTouchBar: FC = () => {
    const [target] = useContext(ZoomContext);
    const { view } = useContext(ViewContext);

    useEffect(() => {
        const { parentElement: parent } = target || {};

        const contains = (move: Touch) => parent?.contains(move.target);
        const endHandle = (event: TouchEvent) => {
            const touchs = event.touches;
            for (let i = 0; i < touchs.length; i++) {
                if (contains(touchs[i])) return;
            }
            parent.dataset.tap = "1";
        };

        const startHandle = (event: TouchEvent) => {
            const touchs = event.touches;
            for (let i = 0; i < touchs.length; i++) {
                if (contains(touchs[i])) {
                    parent.dataset.tap = "0";
                    break;
                }
            }
        };
        parent?.addEventListener("touchstart", startHandle, { passive: true });
        parent?.addEventListener("touchend", endHandle, { passive: true });
        parent?.addEventListener("touchcancel", endHandle, { passive: true });

        if (parent) {
            parent.dataset.tap = "1";
        }
        return () => {
            parent?.removeEventListener("touchstart", startHandle, { passive: true });
            parent?.removeEventListener("touchend", endHandle, { passive: true });
            parent?.removeEventListener("touchcancel", endHandle, { passive: true });
        };
    }, [target]);

    useEffect(() => {
        const handle = (event: TouchEvent) => {
            const target = event.target as HTMLLinkElement;
            const name = target.className;
            event[name === "close" ? "revert" : "scale"] = true;
        };
        view.current?.addEventListener("touchend", handle);
        return () => {
            view.current?.removeEventListener("touchend", handle);
        };
    }, [view]);

    return <ToolBase target={target} touch={true} view={view} />;
};

export default ZoomTouchBar;
