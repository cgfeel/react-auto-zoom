import { FC, PropsWithChildren } from "react";
import { FixedConfiguration, FixedBaseProps } from "./FixedBase";
declare const Fixed: FC<PropsWithChildren<FixedProps>>;
export interface FixedProps extends Omit<FixedBaseProps<FixedConfiguration>, "fixedExtract" | "onTouch" | "pick" | "touch" | "useStyle" | "zoomRef"> {
}
export default Fixed;
