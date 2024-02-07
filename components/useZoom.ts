import { ReactNode, RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { ViewConfigurations } from "./ViewProvider";
import { ZoomElement } from "./ZoomProvider";

export const defaultConfig: ConfigurationInfo = {
    alt: "",
    column: 10,
    error_tips: "Load faild.",
    load_tips: "Loading...",
    origin: "src",
    row: 10,
    src: '',
    zindex: 999,
};

export function minMax(h, w) {
    return [Math.max(10, h), Math.max(40, w)];
}

export function useExtract<T extends ConfigName>(name: T, configs: ExtractMatch<ViewConfigurations[T]>, fixed?: ViewConfigurations[T] = {}) {
    const { defaultConfig, props, filter } = configs;
    const getProps = useCallback((key: T) => props ? props[key] : undefined, [props]);
    const pickData = useCallback((data: PickVal[]) => {
        let val: PickVal;
        data.some(item => {
            val = item;
            if (val !== undefined) return true;
        });
        return [null, undefined].indexOf(val) < 0 ? val : undefined as const;
    }, []);

    return useCallback((target: HTMLElement) => {
        const attrs = Object.fromEntries(Array.from(target.attributes).map((a) => [a.nodeName, a.value]));
        const dataset = filter ? filter(target) || {} : {};

        const getItem = (key: string) => pickData([dataset[key], attrs[key], attrs[`data-${key}`], getProps(key), defaultConfig[key]]);
        const data = Object.keys(defaultConfig).reduce((current, key) => {
            const value = getItem(key);
            return value === undefined ? current : {
                ...current,
                [key]:  Number.isInteger(defaultConfig[key]) ? parseInt(value) : value,
            };
        }, {} as ViewConfigurations[T]);

        const { origin = '' } = data;
        if (origin !== "" && !isValidHttpUrl(origin)) {
            data.origin = getItem(origin) || "";
        }
        return [name, { ...data, ...fixed }] as const;
    }, [defaultConfig, name, filter, getProps, pickData]);
};

export function useMatchImage(areaRef: RefObject<HTMLDivElement>, match: string, disable?: boolean = false) {
    const group = useRef<Element[]>([]);

    // match return true, otherwise false will force stop
    // return undefined will be go on
    const action = useCallback((element: EventTarget|null) => {
        if (element === null) return false;
        const target = element as HTMLElement;

        if (target.dataset.mode === 'ignore') return false;
        return group.current.indexOf(target) < 0 ? undefined : true;
    }, [group]);

    useEffect(() => {
        group.current = disable ? [] : [...areaRef.current!.querySelectorAll(match)];
    }, [areaRef, disable, group, match]);

    return [group, action] as const;
}

export function useRelease() {
    return useMemo(() => {
        const create = (element: ZoomElement) => {
            const wrapper = document.createElement("picture");

            wrapper.className = "zoom";
            wrapper.dataset.type = "zoom";
            element.dataset.mode = "ignore";

            return wrapper;
        };
        const reback = (element: ZoomElement) => {
            if (element.dataset.mode) delete element.dataset.mode;
            ['mount', 'start', 'start1'].forEach(key => {
                if (element[key]) delete element[key];
            });
        };
        const replace = (element: ZoomElement) => {
            if (element.dataset.mode !== "ignore") {
                const parent = element.parentNode;
                const wrapper = create(element);

                parent.replaceChild(wrapper, element);
                wrapper.appendChild(element);
            }
            return element;
        };
        const revert = (element: ZoomElement) => {
            delete element.dataset.mode;
            const parent = element.parentNode as ZoomParentNode;

            if (parent.dataset.type === "zoom") {
                reback(element);
                parent.replaceWith(element);
            }
        };

        return { create, reback, replace, revert };
    }, []);
}

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
export type ShowItem = 'focus'|'grid'|'mask';

export type ZoomParentNode = ParentNode & {
    dataset?: Partial<Record<string, string>>;
};

export type ZoomRootType = Partial<Record<string, number>>;

type ExtractMatch<T> = {
    defaultConfig: T;
    props?: T;
    filter?: FilterType<T>;
};

type PickVal = boolean|null|number|string|undefined;

function isValidHttpUrl(link) {
    try {
        if (link.indexOf(';') > 0 && link.split(';')[1].indexOf('base64,') === 0) return true;

        const url = new URL(link);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}
