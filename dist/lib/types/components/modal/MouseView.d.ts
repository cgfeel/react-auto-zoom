import { ModalViewProps, ModalViewRef } from "../index.d";
import { ConfigName } from "../useZoom";
declare const MouseView: ModalViewRef;
export interface MouseViewProps<T extends ConfigName> extends ModalViewProps<T> {
    height: number;
    width: number;
}
export default MouseView;
