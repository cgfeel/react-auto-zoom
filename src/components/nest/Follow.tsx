import { Follow as FollowRaw, ShowItem } from "@/index";
import { FC } from "react";
import { list } from "../PickImage";

const Follow: FC<FollowProps> = ({ view }) => (
    <FollowRaw match=".follow img.zoom" show={view}>
        <div className="follow">
            {list.map((img, i) => (
                <img className={i > 0 ? "zoom ex-img" : " ex-img"} key={i} origin={img.origin} src={img.src} />
            ))}
        </div>
    </FollowRaw>
);

export interface FollowProps {
    view: ShowItem[];
}

export default Follow;
