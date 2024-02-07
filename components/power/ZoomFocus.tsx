import { FC, useContext, useEffect } from "react";
import { ViewContext } from "../ViewProvider";
import "../assets/power-focus.css";

const ZoomFocus: FC<ZoomFocusInstance> = ({ radius = 100 }) => {
    const {
        data: { fixed },
        view,
    } = useContext(ViewContext);

    const { origin, src } = fixed || {};
    const url = src || origin;

    useEffect(() => {
        view.current?.classList.add("zoom-focus");
        view.current?.setAttribute("style", `--zoom-focus-radius: ${radius}; --zoom-focus-background: url("${url}");`);
    }, [radius, url, view]);

    return <div className="zoom-focus-control"></div>;
};

export interface ZoomFocusInstance {
    radius?: number;
}

export default ZoomFocus;
