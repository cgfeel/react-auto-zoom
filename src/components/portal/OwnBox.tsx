import { Fixed, Focus, Scale, ShowItem } from "@/index";
import { FC, PropsWithChildren, useState } from "react";

const OwnBox: FC<PropsWithChildren<OwnBoxProps>> = ({ children, scale, view }) => {
    const [mask, setMask] = useState(false);
    return (
        <Fixed
            config={{ placement: "auto" }}
            power={(scale ? [<Scale key="scale" />] : []).concat(mask ? [<Focus key="Focus" />] : [])}
            show={view}
            disable>
            <p className="title">
                <span>自身放大-点击选区自动记录</span>
                <label>
                    放大镜 <input type="checkbox" onChange={event => setMask(event.target.checked)} />
                </label>
            </p>
            {children}
        </Fixed>
    );
};

export interface OwnBoxProps {
    view: ShowItem[];
    scale?: boolean;
}

export default OwnBox;
