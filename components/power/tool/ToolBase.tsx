import { FC, RefObject, useEffect } from "react";
import { ZoomElement } from "../../ZoomProvider";

const ToolBase: FC<ToolBaseProps> = ({ target, touch, view }) => {
    useEffect(() => {
        target?.parentElement?.setAttribute("tool", "1");
        return () => {
            target?.parentElement?.removeAttribute("tool");
        };
    }, [target]);

    useEffect(() => {
        view.current?.className = "point-control";
    }, [view]);

    return (
        <div className={`point-control-button${touch ? " touch" : ""}`}>
            <a className="scale">
                <u>
                    <i className="gg-assign"></i>
                </u>
                <span>倍数</span>
            </a>
            <a className="close">
                <u>
                    <i className="gg-close"></i>
                </u>
                <span>关闭</span>
            </a>
            <a className="visible">
                <u>
                    <i className="gg-eye"></i>
                </u>
                <span>取消</span>
            </a>
        </div>
    );
};

export interface ToolBaseProps {
    view: RefObject<HTMLDivElement>;
    target?: ZoomElement;
    touch?: boolean;
}

export default ToolBase;
