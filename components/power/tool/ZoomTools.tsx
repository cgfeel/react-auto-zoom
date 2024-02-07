import { FC, useCallback, useContext, useEffect } from "react";
import { ViewContext } from "../../ViewProvider";
import { ZoomContext } from "../../ZoomProvider";
import "../../assets/power-tools.css";
import ToolBase from "./ToolBase";

const action: Partial<Record<string, string>> = {
    close: "revert",
    scale: "scale",
};

const ZoomTools: FC<ZoomToolsProps> = () => {
    const [target] = useContext(ZoomContext);
    const { name, data, view } = useContext(ViewContext);

    const info = data[name];
    const { column = 10 } = info || {};

    const styleVar = useCallback(
        (point: number) => {
            const x = Math.floor(point % column);
            const y = Math.floor(point / column);
            view.current?.setAttribute("style", `--zoom-cell-x: ${x}; --zoom-cell-y: ${y};`);
            view.current?.dataset.tool = "1";
        },
        [column, view],
    );

    useEffect(() => {
        const close = () => {
            view.current?.removeAttribute("style");
            view.current?.dataset.tool = "0";
        };
        const handle = (event: MouseEvent) => {
            const target = event.target as HTMLLinkElement;
            const name = target.className;
            if (["scale", "visible"].indexOf(name) >= 0) close();

            const type = action[name];
            if (type !== undefined) event[type] = true;
        };
        view.current?.addEventListener("click", handle);
        return () => {
            view.current?.removeEventListener("click", handle);
        };
    }, [view]);

    useEffect(() => {
        const parent = target?.parentElement;
        const handle = (event: Event) => {
            const target = event.target as HTMLInputElement;
            styleVar(parseInt(target.value) || 0);
        };

        parent?.addEventListener("change", handle);
        return () => {
            parent?.removeEventListener("change", handle);
        };
    }, [target, styleVar]);

    return <ToolBase key="btns" target={target} view={view} />;
};

export interface ZoomToolsProps {}

export default ZoomTools;
