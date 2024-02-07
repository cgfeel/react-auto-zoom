import { ShowItem } from "@/index";
import { FC } from "react";
declare const OwnBox: FC<OwnBoxProps>;
export interface OwnBoxProps {
    origin: string;
    show: ShowItem[];
    scale?: boolean;
    touch?: boolean;
}
export default OwnBox;
