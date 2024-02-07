import { ShowItem } from "@/index";
import { FC, PropsWithChildren } from "react";
declare const OwnBox: FC<PropsWithChildren<OwnBoxProps>>;
export interface OwnBoxProps {
    view: ShowItem[];
    scale?: boolean;
}
export default OwnBox;
