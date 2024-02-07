import {
    PropsWithChildren,
    createContext,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import "./assets/index.css";
import { useMatchImage } from "./useZoom";

const ZoomContext = createContext<ZoomContextInstance>([undefined, {} as ZoomProviderInstance]);

const ZoomProvider = forwardRef<ZoomRefInstance, PropsWithChildren<ZoomProviderProps>>(
    ({ className, children, disable, onTouch, match = "img" }, ref) => {
        const areaRef = useRef<HTMLDivElement>(null);
        const [target, setTarget] = useState<ZoomElement | undefined>(undefined);

        const [group, matchImg] = useMatchImage(areaRef, match, disable);
        const compute = useCallback(({ x, y }: StartType) => {
            const { scrollX, scrollY } = window;
            return [x - scrollX, y - scrollY] as const;
        }, []);

        const create = useCallback(
            <T extends StartType>(target: HTMLElement, start: T, start1?: T) =>
                setTarget(
                    Object.assign(target, {
                        start: compute(start),
                        start1: start1 === undefined ? start1 : compute(start1),
                    }),
                ),
            [compute, setTarget],
        );

        const handle = useCallback(
            (event: ZoomEvent) => {
                const { overlay, target } = event;
                if (overlay) return;

                const is_match = matchImg(target);
                event.overlay = is_match !== undefined;

                return is_match && target ? target : undefined;
            },
            [matchImg],
        );

        const zoomInstance: ZoomProviderInstance = useMemo(
            () => ({
                close: elem => setTarget(target => (target === elem ? undefined : target)),
                open: (target, mount = 0) => {
                    const { left, top } = target.getBoundingClientRect();
                    const elem: ZoomElement = Object.assign(target, { mount: Math.max(0, mount), start: [left, top] });

                    setTarget(elem);
                    return elem;
                },
                group,
                compute,
            }),
            [group, compute, setTarget],
        );

        useEffect(() => {
            const overHandler = (event: MouseEvent) => {
                const target = handle(event);
                target !== undefined && create(target, { x: event.pageX, y: event.pageY });
            };
            const touchHandler = () => {};
            const action =
                "ontouchstart" in window ? ["touchstart", onTouch || touchHandler] : ["mouseover", overHandler];
            areaRef.current?.addEventListener(action[0], action[1], { passive: true });
            return () => {
                areaRef.current?.removeEventListener(action[0], action[1], { passive: true });
            };
        }, [areaRef, create, handle, onTouch]);

        useImperativeHandle(ref, () => ({ create, handle }));

        return (
            <ZoomContext.Provider value={[target, zoomInstance]}>
                <div className={className} ref={areaRef}>
                    {children}
                </div>
            </ZoomContext.Provider>
        );
    },
);

if (process.env.NODE_ENV !== "production") {
    ZoomProvider.displayName = "ZoomProvider";
}

interface ZoomProviderInstance {
    group: ReturnType<typeof useMatchImage>[0];
    close: (elem: ZoomElement) => void;
    compute: (info: StartType) => [number, number];
    open: (target: HTMLElement, mount?: number) => ZoomElement;
}

interface ZoomEvent extends Event {
    overlay?: boolean;
}

type StartType = {
    x: number;
    y: number;
};

export interface ZoomRefInstance {
    create: <T extends StartType>(target: HTMLElement, start: T, start1?: T) => void;
    handle: (event: ZoomEvent) => EventTarget | undefined;
}

export type ZoomContextInstance = [ZoomElement | undefined, ZoomProviderInstance];

export type ZoomElement = HTMLElement & {
    mount?: number;
    start?: [number, number];
    start1?: [number, number];
};

export interface ZoomProviderProps {
    className?: string;
    disable?: boolean;
    match?: string;
    onTouch?: (event: TouchEvent) => void;
}

export { ZoomContext };

export default memo(ZoomProvider);
