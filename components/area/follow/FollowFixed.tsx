import { FC, PropsWithChildren } from "react";
import ZoomProvider, { ZoomProviderProps } from "../../ZoomProvider";
import "../../assets/area-follow-fixed.css";
import Modal, { ModalProps } from "../../modal";
import MouseView from "../../modal/MouseView";
import FollowControl from "../../power/FollowControl";
import { AreaBaseProps, ConfigurationInfo, defaultConfig, useExtract, useRelease } from "../../useZoom";

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
    minHight = 100,
    minWidth = 100,
}) => {
    const { replace, revert } = useRelease();
    const extract = useExtract("follow_fixed", { props: config, defaultConfig, filter });

    const zoomProps = { className, disable, match };
    return (
        <ZoomProvider {...zoomProps}>
            <Modal
                mode="follow_fixed"
                fallback={fallback}
                extract={extract}
                pick={() => !("ontouchmove" in window)}
                replace={replace}
                revert={revert}>
                <MouseView
                    mode="follow_fixed"
                    className={viewClassName}
                    height={Math.max(minHight, 100)}
                    power={[...power, <FollowControl key="follow" />]}
                    show={show}
                    theme={theme}
                    width={Math.max(minWidth, 100)}
                />
            </Modal>
            {children}
        </ZoomProvider>
    );
};

export interface FollowProps<T extends ConfigurationInfo>
    extends ZoomProviderProps,
        Pick<ModalProps<T>, "fallback">,
        AreaBaseProps<T> {}

export default Follow;
