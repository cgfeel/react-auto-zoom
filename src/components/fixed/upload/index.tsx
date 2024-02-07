import { Coord as CoordRaw, FollowFixed, Scale, ShowItem } from "@/index";
import { FC, useMemo, useRef, useState } from "react";
import UploadResult, { UploadResultInstance } from "./UploadResult";

const Upload: FC<UploadProps> = ({ scale, show }) => {
    const resultRef = useRef<UploadResultInstance>(null);
    const [cpatcha, setCaptcha] = useState(false);
    const [img, setImg] = useState("");

    const Coord = useMemo(
        () => <CoordRaw key="coord" capture={info => resultRef.current?.capture(info)} />,
        [resultRef],
    );

    return (
        <div className="box box-fixed-layout">
            <FollowFixed
                className="box-follow-fixed"
                disable={!cpatcha}
                power={scale ? [<Scale key="scale" />, Coord] : [Coord]}
                show={show}>
                <p>截图预览</p>
                <p className="title">
                    <span>
                        先传图：
                        <input
                            type="file"
                            onChange={event => {
                                const files = event.target.files;
                                const reader = new FileReader();
                                reader.onload = function (event) {
                                    setImg(event.target.result);
                                };

                                if (files?.length > 0) {
                                    setCaptcha(false);
                                    reader.readAsDataURL(files[0]);
                                }
                            }}
                        />
                        <button disabled={cpatcha} onClick={() => img !== "" && setCaptcha(true)}>
                            开始截图
                        </button>
                    </span>
                    <span>
                        <UploadResult ref={resultRef} />
                    </span>
                </p>
                {img !== "" && (
                    <p>
                        <img alt="" className="follow-fixed-img" src={img} />
                    </p>
                )}
            </FollowFixed>
        </div>
    );
};

export interface UploadProps {
    show: ShowItem[];
    scale?: boolean;
}

export default Upload;
