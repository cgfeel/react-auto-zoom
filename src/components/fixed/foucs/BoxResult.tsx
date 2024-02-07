import { forwardRef, useImperativeHandle, useState } from "react";
import gold from "../../../assets/glod";

const defaultData = { img: "", msg: "loading...", status: 1 };

const BoxResult = forwardRef<BoxResultInstance, BoxResultProps>(({ reload }, ref) => {
    const [{ img, msg, status }, setInfo] = useState(defaultData);

    useImperativeHandle(ref, () => ({
        faild: msg => setInfo({ img: "", status: 0, msg }),
        success: img => setInfo({ msg: "success", status: 0, img }),
        wait: () => setInfo(defaultData),
    }));

    return status !== 0 ? null : img === "" ? (
        <div className="own-result own-result-faild">
            <p className="tips">
                <img alt="" src={gold} />
                {msg}
            </p>
            <p>
                <button
                    onClick={() => !("ontouchend" in window) && location.reload()}
                    onTouchEnd={() => location.reload()}>
                    刷新页面
                </button>
            </p>
        </div>
    ) : (
        <div className="own-result own-result-success">
            <img alt="" src={img} className="bg" />
            <p className="tips">
                <img alt="" src={gold} />
                {msg}
            </p>
            <p>
                <button onClick={() => !("ontouchend" in window) && reload()} onTouchEnd={reload}>
                    重新开始
                </button>
            </p>
        </div>
    );
});

if (process.env.NODE_ENV !== "production") {
    BoxResult.displayName = "BoxResult";
}

export interface BoxResultInstance {
    faild: (msg: string) => void;
    success: (img: string, touch: boolean) => void;
    wait: () => void;
}

export interface BoxResultProps {
    reload: () => void;
}

export default BoxResult;
