import { PropsWithChildren, RefObject, createContext, useRef } from "react";
import { ConfigName, ConfigurationInfo } from "./useZoom";
import { FixedConfiguration } from "./area/fixed/FixedBase";
import { ComputeStyleType, ModalViewInstance } from "./index.d";

const ViewContext = createContext<ViewProviderInstance>({} as ViewProviderInstance);

const ViewProvider = <T extends ConfigName>({ children, view }: PropsWithChildren<ViewProviderProps<T>>) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const { info, name, close, mount, style } = view;
    return (
        <ViewContext.Provider
            value={{
                data: {
                    [name]: info,
                },
                name,
                view: viewRef,
                close,
                mount,
                style,
            }}>
            <div ref={viewRef}>{children}</div>
        </ViewContext.Provider>
    );
};

export interface ViewConfigurations {
    follow: ConfigurationInfo;
    follow_fixed: ConfigurationInfo;
    fixed: FixedConfiguration;
}

export interface ViewProviderInstance {
    data: Partial<ViewConfigurations>;
    name: ConfigName;
    view: RefObject<HTMLDivElement>;
    close: () => void;
    mount?: (num?: number) => void;
    style: ComputeStyleType;
}

export interface ViewProviderProps<T extends ConfigName> {
    view: ModalViewInstance<T>;
}

export { ViewContext };

export default ViewProvider;
