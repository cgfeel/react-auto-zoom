import { Fixed as FixedRaw, FixedTouch, Focus as FocusRaw, FocusCoord, Scale, ShowItem, TouchFocus } from "@/index";
import { FC, useMemo, useRef, useState } from "react";
import BoxWork, { BoxWorkInstance } from "./BoxWork";
import ZoomTouch, { ZoomTouchInstance } from "./ZoomTouch";

const OwnBox: FC<OwnBoxProps> = ({ origin, scale, show, touch }) => {
    const [Fixed, Focus] = useMemo(() => (touch ? [FixedTouch, TouchFocus] : [FixedRaw, FocusRaw]), [touch]);

    const zoomRef = useRef<ZoomTouchInstance>(null);
    const imgRef = useRef<BoxWorkInstance>(null);

    const [mask, setMask] = useState(false);
    const [originUrl, setOriginUrl] = useState(origin);
    const [coord, setCoord] = useState<FocusCoord | undefined>(undefined);

    return (
        <div className="box box-fixed-layout">
            <Fixed
                className="own-box"
                match=".own-box-1"
                config={{ placement: "auto" }}
                disable={originUrl === ""}
                power={[
                    scale ? <Scale key="scale" /> : null,
                    !mask ? null : (
                        <Focus
                            key="Focus"
                            coord={coord}
                            radius={140}
                            hit={() => {
                                zoomRef.current?.close();
                                imgRef.current?.hit(originUrl);
                            }}
                        />
                    ),
                ].filter(i => i)}
                show={show}
                filter={() => ({ origin: originUrl })}>
                <p className="title">
                    <span>非图片自身放大</span>
                    <label>
                        放大镜
                        <input
                            type="checkbox"
                            disabled={origin === ""}
                            onChange={event => {
                                const { checked } = event.target;

                                setOriginUrl(checked ? "" : origin);
                                setMask(checked);

                                imgRef.current?.load(checked ? Date.now() : 0);
                            }}
                        />
                    </label>
                </p>
                <div className="own-wrap">
                    <div
                        className="own-box-1"
                        src={
                            mask
                                ? "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                : ""
                        }></div>
                    {useMemo(
                        () => (
                            <BoxWork
                                ref={imgRef}
                                touch={touch}
                                onSuccess={({ base64, coord }) => {
                                    setOriginUrl(base64);
                                    setCoord(coord);
                                }}
                            />
                        ),
                        [imgRef, touch],
                    )}
                </div>
                <ZoomTouch ref={zoomRef} touch={touch} />
            </Fixed>
        </div>
    );
};

export interface OwnBoxProps {
    origin: string;
    show: ShowItem[];
    scale?: boolean;
    touch?: boolean;
}

export default OwnBox;
