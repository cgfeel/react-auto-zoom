import { ForwardedRef, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { ModalViewProps, ModalViewRef, ModalViewInstance } from "../index.d";
import { pickView, useComputeStyle, useNodeStyle, useTargetListener } from "../useModal";
import { ConfigName } from "../useZoom";
import { ModalContext } from ".";
import GridCom from "./GridCom";
import ImgWrap from "./ImgWrap";

const PreviewInternal = <T extends ConfigName>(
    { mode, touch, useStyle, className = "", power = [], show = ["focus"], theme = {} }: ModalViewProps<T>,
    ref: ForwardedRef<ModalViewInstance<T>>,
) => {
    const { config, target, close } = useContext(ModalContext);
    const styleName = pickView(className, show);

    const modeRef = useRef<HTMLDivElement>(null);
    const computeRootStyle = useComputeStyle(modeRef);

    const [name, info] = config;
    const { column = 10, row = 10, zindex = theme.zindex || 999 } = info;

    const [mount, setMount] = useState(target.mount);
    const [openit, setOpenit] = useState(false);

    const [grid] = useState({
        column: Math.min(column, Math.floor(target.offsetWidth / 4)),
        row: Math.min(row, Math.floor(target.offsetHeight / 4)),
    });

    const viewInstance: ModalViewInstance<T> = useMemo(
        () => ({
            mount: num => setMount(num),
            style: group => computeRootStyle(group),
            close,
            info,
            name,
        }),
        [info, name, close, computeRootStyle, setMount],
    );

    useEffect(() => {
        computeRootStyle({ ...theme, zindex });
    }, [theme, zindex, computeRootStyle]);

    useImperativeHandle(ref, () => viewInstance);
    useTargetListener(target, computeRootStyle);

    return (
        <div
            className={`zoom-control zoom-${mode}${styleName === "" ? "" : " " + styleName}`}
            data-touch={touch ? "1" : "0"}
            ref={modeRef}>
            <GridCom
                grid={grid}
                mount={mount}
                load={({ column, row }) => {
                    computeRootStyle({ column, row });
                    setOpenit(true);
                }}
                useStyle={useStyle || useNodeStyle}
            />
            {openit && (
                <div className={`zoom-view${mount === undefined ? "" : " mount"}`}>
                    <ImgWrap
                        info={info}
                        power={power}
                        viewInstance={viewInstance}
                        close={close}
                        computeRootStyle={computeRootStyle}
                    />
                </div>
            )}
        </div>
    );
};

const Preview: ModalViewRef = forwardRef(PreviewInternal);

if (process.env.NODE_ENV !== "production") {
    Preview.displayName = "Preview";
}

export default Preview;
