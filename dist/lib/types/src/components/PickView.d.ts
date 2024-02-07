import { ShowItem } from "@/useZoom";
import { FC } from "react";
declare const PickView: FC<PickViewProps>;
export interface PickViewProps {
    defaultItems?: ShowItem[];
    item?: ShowItem[];
    onChange?: (items: ShowItem[]) => void;
}
export default PickView;
