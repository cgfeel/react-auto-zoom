import { PropsWithChildren, RefObject } from "react";
import { ConfigName, ConfigurationInfo } from "./useZoom";
import { FixedConfiguration } from "./area/fixed/FixedBase";
import { ComputeStyleType, ModalViewInstance } from "./index.d";
declare const ViewContext: import("react").Context<ViewProviderInstance>;
declare const ViewProvider: <T extends keyof ViewConfigurations>({ children, view }: PropsWithChildren<ViewProviderProps<T>>) => import("react/jsx-runtime").JSX.Element;
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
