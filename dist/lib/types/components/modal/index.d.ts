import { PropsWithChildren, ReactNode } from "react";
import { ViewConfigurations } from "../ViewProvider";
import { ZoomElement } from "../ZoomProvider";
import { ConfigName, useExtract } from "../useZoom";
declare const ModalContext: import("react").Context<ModalInstance<keyof ViewConfigurations>>;
declare const Modal: <T extends keyof ViewConfigurations>({ children, fallback, mode, extract, replace, revert, pick, }: PropsWithChildren<ModalProps<T>>) => ReactNode;
export interface ModalInstance<T = ConfigName> {
    config: ReturnType<Required<ModalProps<T>>["extract"]>;
    mode: T;
    target: ZoomElement;
    close: () => void;
}
export interface ModalProps<T extends ConfigName> {
    mode: T;
    replace: (elem: ZoomElement) => ZoomElement;
    revert: (elem: ZoomElement) => void;
    fallback?: ReactNode;
    extract?: ReturnType<typeof useExtract<T>>;
    pick?: (elem: ZoomElement) => boolean;
}
export { ModalContext };
export default Modal;
