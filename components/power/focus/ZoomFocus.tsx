import { FC, useCallback, useContext, useEffect, useRef } from "react";
import { ViewContext } from "../../ViewProvider";
import "../../assets/power-focus.css";

const ZoomFoucs: FC<ZoomFoucsProps> = ({ coord, radius = 100, hit = () => {} }) => {
    const cornerRef = useRef<HTMLDivElement>(null);
    const {
        data: { fixed },
        view,
    } = useContext(ViewContext);

    const { origin, src } = fixed || {};
    const url = src || origin;

    const cornerStyle: ZoomFoucsInstance["cornerStyle"] = useCallback(
        info => {
            if (cornerRef.current) {
                const styles = Object.keys(info).map(key => `--zoom-focus-corner-${key}: ${info[key]};`);
                styles.length > 0 && cornerRef.current.setAttribute("style", styles.join(" "));
            }
        },
        [cornerRef],
    );

    useEffect(() => {
        view.current?.className = "zoom-focus";
        view.current?.setAttribute("style", `--zoom-focus-radius: ${radius}; --zoom-focus-background: url("${url}");`);
    }, [radius, url, view]);

    useEffect(() => {
        coord !== undefined && cornerStyle(coord);
    }, [coord, cornerStyle]);

    return coord === undefined ? (
        <div className="zoom-focus-control"></div>
    ) : (
        [
            <div className="zoom-focus-control" key="control"></div>,
            <div
                className="zoom-focus-corner"
                key="corner"
                ref={cornerRef}
                onTransitionEnd={() => {
                    const corner = cornerRef.current;
                    if (corner !== null && getComputedStyle(corner).opacity !== "0") hit();
                }}></div>,
        ]
    );
};

export type CoordType = Partial<Record<"height" | "width" | "x" | "y", number>>;

export interface ZoomFoucsInstance {
    cornerStyle: (info: Record<string, number>) => void;
}

export interface ZoomFoucsProps {
    coord?: CoordType;
    radius?: number;
    hit?: () => void;
}

export default ZoomFoucs;
