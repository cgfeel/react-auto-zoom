import { FC, PropsWithChildren } from "react";
import { ZoomProviderProps } from "../../ZoomProvider";
import "../../assets/area-follow-fixed.css";
import { ModalProps } from "../../modal";
import { AreaBaseProps, ConfigurationInfo } from "../../useZoom";
declare const Follow: FC<PropsWithChildren<FollowProps<ConfigurationInfo>>>;
export interface FollowProps<T extends ConfigurationInfo> extends ZoomProviderProps, Pick<ModalProps<T>, "fallback">, AreaBaseProps<T> {
}
export default Follow;
