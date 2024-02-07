import { FC, PropsWithChildren } from "react";
import { ZoomProviderProps } from "../../ZoomProvider";
import "../../assets/area-follow.css";
import { ModalProps } from "../../modal";
import { AreaBaseProps, ConfigurationInfo } from "../../useZoom";
declare const Follow: FC<PropsWithChildren<FollowProps<ConfigurationInfo>>>;
export interface FollowProps<T extends ConfigurationInfo> extends AreaBaseProps<T>, Pick<ModalProps<T>, "fallback">, ZoomProviderProps {
}
export default Follow;
