import { FC, RefAttributes } from "react";
import { ViewConfigurations, ViewProviderInstance } from "./ViewProvider";
import { AreaBaseProps, ConfigName, ZoomRootType } from "./useZoom";

interface ModalViewInstance<T extends ConfigName> extends Pick<ViewProviderInstance, "close" | "mount" | "style"> {
    info: ViewConfigurations[T];
    name: T;
}

interface ModalViewProps<T extends ConfigName> extends Pick<AreaBaseProps<T>, "className" | "power" | "show" | "theme"> {
    mode: T;
    touch?: boolean;
    useStyle?: NodeStyle;
}

interface ModalViewRef extends FC<ConfigName> {
    <T extends ConfigName, P = ModalViewProps<T>, R = ModalViewInstance<T>>(
        props: P & { ref?: RefAttributes<R> },
    ): ReturnType<FC<P>>;
}

type ComputeStyleType = (styles: ZoomRootType) => void;

type CreateNodeStyle = (current: number, column: number, row: number) => string;

type NodeStyle = (id: string) => CreateNodeStyle;
