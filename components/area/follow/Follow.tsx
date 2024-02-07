import { FC, PropsWithChildren, useCallback } from "react";
import ZoomProvider, { ZoomProviderProps } from "../../ZoomProvider";
import "../../assets/area-follow.css";
import Modal, { ModalProps } from "../../modal";
import Preview from "../../modal/Preview";
import FollowControl from "../../power/FollowControl";
import { AreaBaseProps, ConfigurationInfo, defaultConfig, minMax, useExtract, useRelease } from "../../useZoom";

const Follow: FC<PropsWithChildren<FollowProps<ConfigurationInfo>>> = ({
    children,
    className,
    config,
    disable,
    fallback,
    match,
    show,
    theme,
    viewClassName,
    filter,
    power = [],
    minHight = 320,
    minWidth = 560,
}) => {
    const { replace, revert } = useRelease();
    const extract = useExtract("follow", { props: config, defaultConfig, filter });

    const zoomProps = { className, disable, match };
    const pick = useCallback(() => {
        if ("ontouchmove" in window) return false;

        const [h, w] = minMax(minHight, minWidth);
        const { innerHeight, innerWidth } = window;

        return h <= innerHeight && w <= innerWidth;
    }, []);

    return (
        <ZoomProvider {...zoomProps}>
            <Modal mode="follow" fallback={fallback} extract={extract} pick={pick} replace={replace} revert={revert}>
                <Preview
                    mode="follow"
                    className={viewClassName}
                    power={[...power, <FollowControl key="follow" />]}
                    show={show}
                    theme={theme}
                />
            </Modal>
            {children}
        </ZoomProvider>
    );
};

export interface FollowProps<T extends ConfigurationInfo>
    extends AreaBaseProps<T>,
        Pick<ModalProps<T>, "fallback">,
        ZoomProviderProps {}

export default Follow;
