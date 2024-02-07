import { memo } from "react";
import ViewProvider, { ViewConfigurations } from "../ViewProvider";
import { useComputeStyle } from "../useModal";
import { ConfigName } from "../useZoom";
import { ModalViewInstance, ModalViewProps } from "../index.d";
import { ModalInstance } from ".";
import ImgView from "./ImgView";

const ImgWrap = <T extends ConfigName>({ info, power, viewInstance, close, computeRootStyle }: ImgWrapProps<T>) =>
    power.reduce(
        (current, item) => (
            <ViewProvider<T> view={viewInstance}>
                {item}
                {current}
            </ViewProvider>
        ),
        <ImgView info={info} close={close} compute={styles => computeRootStyle(styles)} />,
    );

export interface ImgWrapProps<T extends ConfigName>
    extends Pick<Required<ModalViewProps<T>>, "power">,
        Pick<ModalInstance<T>, "close"> {
    info: ViewConfigurations[T];
    viewInstance: ModalViewInstance<T>;
    computeRootStyle: ReturnType<typeof useComputeStyle>;
}

export default memo(ImgWrap);
