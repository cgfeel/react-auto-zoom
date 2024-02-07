/// <reference types="react" />
import { ViewConfigurations } from "../ViewProvider";
import { useComputeStyle } from "../useModal";
import { ConfigName } from "../useZoom";
import { ModalViewInstance, ModalViewProps } from "../index.d";
import { ModalInstance } from ".";
export interface ImgWrapProps<T extends ConfigName> extends Pick<Required<ModalViewProps<T>>, "power">, Pick<ModalInstance<T>, "close"> {
    info: ViewConfigurations[T];
    viewInstance: ModalViewInstance<T>;
    computeRootStyle: ReturnType<typeof useComputeStyle>;
}
declare const _default: import("react").MemoExoticComponent<(<T extends keyof ViewConfigurations>({ info, power, viewInstance, close, computeRootStyle }: ImgWrapProps<T>) => import("react/jsx-runtime").JSX.Element)>;
export default _default;
