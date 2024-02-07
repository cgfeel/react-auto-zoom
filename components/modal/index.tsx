import { PropsWithChildren, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ViewConfigurations } from "../ViewProvider";
import { ZoomContext, ZoomElement } from "../ZoomProvider";
import { ConfigName, useExtract } from "../useZoom";

const ModalContext = createContext({} as ModalInstance);

const Modal = <T extends ConfigName>({
    children,
    fallback,
    mode,
    extract,
    replace,
    revert,
    pick = () => false,
}: PropsWithChildren<ModalProps<T>>) => {
    const [target, { close }] = useContext(ZoomContext);
    const [view, setView] = useState<ZoomElement | null | undefined>(undefined);

    const closeHandle = useCallback(() => close(view), [view, close]);
    useEffect(() => {
        const status = target ? pick(target) : undefined;
        if (status) {
            setView(view => (view === target ? view : replace(target)));
        } else {
            setView(status === undefined ? status : null);
        }
    }, [target, pick, replace, setView]);

    useEffect(() => {
        return () => {
            if (view) revert(view);
        };
    }, [view, revert]);

    if (!view) return view === undefined ? null : fallback;

    return createPortal(
        <ModalContext.Provider
            value={{
                config: extract ? extract(view) : [mode, {} as ViewConfigurations<T>],
                target: view,
                close: closeHandle,
                mode,
            }}>
            {children}
        </ModalContext.Provider>,
        view.parentNode,
    );
};

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
