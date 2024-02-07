import { RefObject } from "react";
import { ZoomElement } from "./ZoomProvider";
import { ShowItem, ZoomRootType } from "./useZoom";
export declare function useNodeStyle(id: string): (current: number, column: number) => string;
export declare function pickView(className: string, show: ShowItem[]): string;
export declare function useComputeStyle(modeRef: RefObject<HTMLDivElement>): (styles: ZoomRootType) => void;
export declare function useTargetListener(target: ZoomElement, computeRootStyle: ReturnType<typeof useComputeStyle>): void;
