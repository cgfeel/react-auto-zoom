import { FC, PropsWithChildren, RefObject } from "react";
import { ModalViewProps } from "../../index.d";
import ZoomProvider, { ZoomElement, ZoomProviderProps, ZoomRefInstance } from "../../ZoomProvider";
import "../../assets/area-fixed.css";
import Modal, { ModalProps } from "../../modal";
import Preview from "../../modal/Preview";
import FixedControl, { fixedStyle } from "../../power/FixedControl";
import { AreaBaseProps, ConfigurationInfo, defaultConfig, useExtract, useRelease } from "../../useZoom";

const fixedConfig: FixedConfiguration = {
    ...defaultConfig,
    ...fixedStyle,
    placement: "rt",
};

const FixedBase: FC<PropsWithChildren<FixedBaseProps<FixedConfiguration>>> = ({
    children,
    className,
    config,
    disable,
    fallback,
    match,
    show,
    theme,
    touch,
    viewClassName,
    zoomRef,
    filter,
    onTouch,
    pick,
    useStyle,
    fixedExtract = {},
    power = [],
}) => {
    const zoomProps = { className, disable, match };

    const extract = useExtract("fixed", { defaultConfig: fixedConfig, props: config, filter }, fixedExtract);
    const { replace, revert } = useRelease();

    return (
        <ZoomProvider
            {...zoomProps}
            onTouch={onTouch}
            ref={ref => {
                if (zoomRef) zoomRef.current = ref;
            }}>
            <Modal mode="fixed" fallback={fallback} extract={extract} pick={pick} replace={replace} revert={revert}>
                <Preview
                    mode="fixed"
                    className={viewClassName}
                    power={[...power, <FixedControl key="fixed" />]}
                    show={show}
                    theme={theme}
                    touch={touch}
                    useStyle={useStyle}
                />
            </Modal>
            {children}
        </ZoomProvider>
    );
};

export interface FixedConfiguration extends ConfigurationInfo {
    fixed_height?: number;
    fixed_width?: number;
    fixed_x?: number;
    fixed_y?: number;
    placement?: "auto" | "bl" | "bottom" | "br" | "lb" | "left" | "lt" | "rb" | "right" | "rt" | "tl" | "top" | "tr";
}

export interface FixedBaseProps<T extends FixedConfiguration>
    extends AreaBaseProps<T>,
        Pick<ModalProps<T>, "fallback">,
        Pick<ModalViewProps<T>, "touch" | "useStyle">,
        ZoomProviderProps {
    pick: (target: ZoomElement) => boolean;
    fixedExtract?: T;
    zoomRef?: RefObject<ZoomRefInstance>;
}

export { fixedConfig };

export default FixedBase;
