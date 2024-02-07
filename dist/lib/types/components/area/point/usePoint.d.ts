import { FixedBaseProps, FixedConfiguration } from "../fixed/FixedBase";
declare const _default: ({ config, filter }: PointProps) => readonly [import("../../ZoomProvider").ZoomElement | undefined, FixedConfiguration | undefined];
export default _default;
export interface PointProps extends Pick<FixedBaseProps<FixedConfiguration>, "config" | "filter"> {
}
