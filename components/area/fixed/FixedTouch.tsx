import { FC, PropsWithChildren, useContext, useEffect, useMemo, useRef } from "react";
import { ZoomContext, ZoomRefInstance } from "../../ZoomProvider";
import { NodeStyle } from "../../index.d";
import TouchControl from "../../power/TouchControl";
import FixedBase, { FixedConfiguration, FixedBaseProps } from "./FixedBase";

const FixedPick: FC<FixedPickProps> = ({ pickDisable }) => {
    const [, { group }] = useContext(ZoomContext);
    useEffect(() => {
        if (!pickDisable) return;
        group.current.forEach(item => item.classList.add("zoom-touch-disable"));
        return () => {
            group.current.forEach(item => item.classList.remove("zoom-touch-disable"));
        };
    }, [group, pickDisable]);
    return null;
};

const FixedTouch: FC<PropsWithChildren<FixedTouchProps>> = ({ children, pickDisable = true, power = [], ...props }) => {
    const zoomRef = useRef<ZoomRefInstance>(null);
    const { onTouch, pick, useNodeStyle } = useMemo(
        () => ({
            onTouch: (event: TouchEvent) => {
                const target = zoomRef.current?.handle(event);
                const coord = (index: number): StartType | undefined => {
                    const info = event.targetTouches[index];
                    return info === undefined ? info : { x: Math.round(info.pageX), y: Math.round(info.pageY) };
                };

                const start = target === undefined ? undefined : coord(0);
                if (start !== undefined) {
                    zoomRef.current?.create(target, start, coord(1));
                }
            },
            pick: () => "ontouchmove" in window,
            useNodeStyle: (id => {
                return (current, column, row) => {
                    const line = Math.floor(current / column);
                    const y = row - line - 1;
                    const x = (line + 1) * column - current - 1;
                    return `[name="zoom-cell[${id}]"]:nth-child(${
                        current + 1
                    }):checked ~ .zoom-view { --zoom-cell-x: ${x}; --zoom-cell-y: ${y}; }`;
                };
            }) as NodeStyle,
        }),
        [zoomRef],
    );

    return (
        <FixedBase
            {...props}
            fixedExtract={{ placement: "auto" }}
            power={[...power, <TouchControl key="touch" />]}
            touch={true}
            zoomRef={zoomRef}
            onTouch={onTouch}
            pick={pick}
            useStyle={useNodeStyle}>
            <FixedPick pickDisable={pickDisable} />
            {children}
        </FixedBase>
    );
};

interface FixedPickProps {
    pickDisable?: boolean;
}

export interface FixedTouchProps
    extends Omit<
            FixedBaseProps<FixedConfiguration>,
            "fixedExtract" | "minHight" | "minWidth" | "onTouch" | "pick" | "touch" | "useStyle" | "zoomRef"
        >,
        FixedPickProps {}

export default FixedTouch;
