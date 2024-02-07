import { forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { ViewContext } from "../../ViewProvider";
import "../../assets/power-scale.css";

const ScaleBase = forwardRef<ScaleBaseInstance, ScaleBaseProps>(({ tips }, ref) => {
    const { view, style } = useContext(ViewContext);
    const [show, toggle] = useState(false);

    const upScale = useCallback(
        (scale: number) => {
            style({ scale });
            toggle(true);

            return setTimeout(() => toggle(false), 1500);
        },
        [style, toggle],
    );

    useEffect(() => {
        view.current?.className = "zoom-scale";
    }, [view]);

    useImperativeHandle(ref, () => ({ upScale }));

    return (
        <div className={`zoom-scale-control${show ? " showit" : ""}`}>
            <h3></h3>
            <div
                className="zoom-scale-tips"
                {...Object.keys(tips).reduce(
                    (current, key) => ({
                        ...current,
                        [`data-${key}`]: tips[key],
                    }),
                    {},
                )}></div>
            <div className="zoom-scale-step">
                <a></a>
            </div>
            <ul>
                <li>
                    <a>× 0.5</a>
                </li>
                <li>
                    <a>× 1</a>
                </li>
                <li>
                    <a>× 1.5</a>
                </li>
                <li>
                    <a>× 2</a>
                </li>
            </ul>
        </div>
    );
});

if (process.env.NODE_ENV !== "production") {
    ScaleBase.displayName = "ScaleBase";
}

export interface ScaleBaseInstance {
    upScale: (scale: number) => ReturnType<typeof setTimeout>;
}

export interface ScaleBaseProps {
    tips?: Record<string, string>;
}

export default memo(ScaleBase);
