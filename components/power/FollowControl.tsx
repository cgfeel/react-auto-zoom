import { FC, useContext, useEffect } from "react";
import { ViewContext } from "../ViewProvider";
import { ZoomContext } from "../ZoomProvider";

const FollowControl: FC = () => {
    const { view, style } = useContext(ViewContext);
    const [target] = useContext(ZoomContext);

    useEffect(() => {
        const handle = () => {
            if (target !== undefined) {
                const { left, top } = target.getBoundingClientRect();
                style({
                    "control-left": left,
                    "control-top": top,
                });
            }
        };
        view.current?.className = "follow-control";
        window.addEventListener("scroll", handle);
        return () => {
            window.addEventListener("scroll", handle);
        };
    }, [target, view, style]);

    return null;
};

export default FollowControl;
