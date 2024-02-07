import { Fixed, ShowItem } from "@/index";
import { FC } from "react";
import { list } from "../PickImage";

const Auto: FC<AutoProps> = ({ view }) => (
    <Fixed config={{ placement: "auto" }} match=".follow img.zoom" show={view}>
        <div className="follow">
            <img className="zoom ex-img" data-mode="ignore" origin={list[1].origin} src={list[1].src} />
            <img className="zoom ex-img" origin={list[2].origin} src={list[2].src} />
        </div>
    </Fixed>
);

export interface AutoProps {
    view: ShowItem[];
}

export default Auto;
