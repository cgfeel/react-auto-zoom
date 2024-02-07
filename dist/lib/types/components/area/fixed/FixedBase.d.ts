import { FC, PropsWithChildren, RefObject } from "react";
import { ModalViewProps } from "../../index.d";
import { ZoomElement, ZoomProviderProps, ZoomRefInstance } from "../../ZoomProvider";
import "../../assets/area-fixed.css";
import { ModalProps } from "../../modal";
import { AreaBaseProps, ConfigurationInfo } from "../../useZoom";
declare const fixedConfig: FixedConfiguration;
declare const FixedBase: FC<PropsWithChildren<FixedBaseProps<FixedConfiguration>>>;
export interface FixedConfiguration extends ConfigurationInfo {
    fixed_height?: number;
    fixed_width?: number;
    fixed_x?: number;
    fixed_y?: number;
    placement?: "auto" | "bl" | "bottom" | "br" | "lb" | "left" | "lt" | "rb" | "right" | "rt" | "tl" | "top" | "tr";
}
export interface FixedBaseProps<T extends FixedConfiguration> extends AreaBaseProps<T>, Pick<ModalProps<T>, "fallback">, Pick<ModalViewProps<T>, "touch" | "useStyle">, ZoomProviderProps {
    pick: (target: ZoomElement) => boolean;
    fixedExtract?: T;
    zoomRef?: RefObject<ZoomRefInstance>;
}
export { fixedConfig };
export default FixedBase;
