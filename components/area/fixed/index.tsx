import { FC, PropsWithChildren, useCallback } from "react";
import { ZoomElement } from "../../ZoomProvider";
import { minMax } from "../../useZoom";
import FixedBase, { FixedConfiguration, FixedBaseProps } from "./FixedBase";

const Fixed: FC<PropsWithChildren<FixedProps>> = ({ children, minHight = 100, minWidth = 150, ...props }) => {
    const [h, w] = minMax(minHight, minWidth);
    const pick = useCallback(
        (target: ZoomElement) => {
            if ("ontouchmove" in window) return false;
            if (target) {
                const { offsetHeight, offsetWidth } = target;
                return h <= offsetHeight && w <= offsetWidth;
            }

            return false;
        },
        [h, w],
    );
    return (
        <FixedBase {...props} pick={pick}>
            {children}
        </FixedBase>
    );
};

export interface FixedProps
    extends Omit<
        FixedBaseProps<FixedConfiguration>,
        "fixedExtract" | "onTouch" | "pick" | "touch" | "useStyle" | "zoomRef"
    > {}

export default Fixed;
