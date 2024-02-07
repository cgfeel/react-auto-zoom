import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ComputeStyleType } from "../index.d";
import { ConfigurationInfo } from "../useZoom";

const ImgView: FC<ImgViewProps> = ({ info, close, compute }) => {
    const { origin, error_tips, load_tips, alt = "" } = info;

    const wrapRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState(origin ? 1 : 2);

    const closeHandel = useCallback(() => {
        const target = wrapRef.current;
        if (target !== null && getComputedStyle(target).opacity === "0") close();
    }, [wrapRef, close]);

    const failed = status === 2;
    const tips = failed ? error_tips : load_tips;
    const desc = status ? tips || "none" : alt;

    useEffect(() => {
        setTimeout(closeHandel, 500);
    }, [status, closeHandel]);

    return (
        <div
            className={`zoom-img-wrap${status ? "" : " loadit"}`}
            ref={wrapRef}
            onTransitionEnd={event => {
                event.target === wrapRef.current && closeHandel();
            }}>
            <div className="zoom-img-view">
                <img
                    alt={alt}
                    src={origin}
                    onError={() => {
                        console.log(origin, "error");
                        setStatus(2);
                    }}
                    onLoad={event => {
                        const img = event.target;
                        setStatus(0);
                        compute({
                            "img-h": img.naturalHeight,
                            "img-w": img.naturalWidth,
                        });
                    }}
                />
                {status > 0 && (
                    <div className={`zoom-load-status ${failed ? "zoom-img-fail" : "zoom-load-img"}`}>
                        <span></span>
                    </div>
                )}
            </div>
            {desc && <div className="zoom-img-tips">{desc}</div>}
        </div>
    );
};

export interface ImgViewProps {
    info: ConfigurationInfo;
    close: () => void;
    compute: ComputeStyleType;
}

export default ImgView;
