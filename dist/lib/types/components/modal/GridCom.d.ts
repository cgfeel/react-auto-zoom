/// <reference types="react" />
import { NodeStyle } from "../index.d";
type GirdType = {
    column: number;
    row: number;
};
export interface GridComProps {
    grid: GirdType;
    load: (grid: GirdType) => void;
    useStyle: NodeStyle;
    mount?: number;
}
declare const _default: import("react").NamedExoticComponent<GridComProps>;
export default _default;
