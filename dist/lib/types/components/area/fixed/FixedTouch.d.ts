import { FC, PropsWithChildren } from "react";
import { FixedConfiguration, FixedBaseProps } from "./FixedBase";
declare const FixedTouch: FC<PropsWithChildren<FixedTouchProps>>;
interface FixedPickProps {
    pickDisable?: boolean;
}
export interface FixedTouchProps extends Omit<FixedBaseProps<FixedConfiguration>, "fixedExtract" | "minHight" | "minWidth" | "onTouch" | "pick" | "touch" | "useStyle" | "zoomRef">, FixedPickProps {
}
export default FixedTouch;
