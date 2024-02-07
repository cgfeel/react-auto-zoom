import { PropsWithChildren, RefObject } from "react";
declare const NodeViewContext: import("react").Context<NodeViewInstance>;
export interface NodeViewInstance {
    close: () => void;
}
export interface NodeViewProps {
    portal?: RefObject<HTMLElement>;
}
export { NodeViewContext };
declare const _default: import("react").NamedExoticComponent<PropsWithChildren<NodeViewProps>>;
export default _default;
