import { ReactNode, RefObject } from "react";
import { ViewConfigurations } from "./ViewProvider";
import { ZoomElement } from "./ZoomProvider";
export declare const defaultConfig: ConfigurationInfo;
export declare function minMax(h: any, w: any): number[];
export declare function useExtract<T extends ConfigName>(name: T, configs: ExtractMatch<ViewConfigurations[T]>, fixed?: ViewConfigurations[T]): (target: HTMLElement) => readonly [T, ViewConfigurations[T]];
export declare function useMatchImage(areaRef: RefObject<HTMLDivElement>, match: string, disable?: boolean): readonly [import("react").MutableRefObject<Element[]>, (element: EventTarget | null) => boolean | undefined];
export declare function useRelease(): {
    create: (element: ZoomElement) => HTMLPictureElement;
    reback: (element: ZoomElement) => void;
    replace: (element: ZoomElement) => ZoomElement;
    revert: (element: ZoomElement) => void;
};
export interface ConfigurationInfo {
    alt?: string;
    column?: number;
    error_tips?: string;
    load_tips?: string;
    origin?: string;
    row?: number;
    src?: string;
    zindex?: number;
}
export type AreaBaseProps<T> = {
    className?: string;
    config?: T;
    disable?: boolean;
    minHight?: number;
    minWidth?: number;
    power?: ReactNode[];
    show?: ShowItem[];
    theme?: ZoomRootType;
    viewClassName?: string;
    filter?: FilterType<T>;
};
export type ConfigName = keyof ViewConfigurations;
export type FilterType<T extends ConfigurationInfo> = (target: HTMLElement) => T;
export type ShowItem = 'focus' | 'grid' | 'mask';
export type ZoomParentNode = ParentNode & {
    dataset?: Partial<Record<string, string>>;
};
export type ZoomRootType = Partial<Record<string, number>>;
type ExtractMatch<T> = {
    defaultConfig: T;
    props?: T;
    filter?: FilterType<T>;
};
export {};
