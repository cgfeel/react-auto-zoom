import { ZoomContext } from "@/index";
import { forwardRef, useCallback, useContext, useImperativeHandle, useRef, useState } from "react";

const MountFixed = forwardRef<MountFixedInstance, MountFixedProps>(
    ({ className, origin, src, align = "", open: openRaw = 4 }, ref) => {
        const [target, { close, open }] = useContext(ZoomContext);
        const [isOpen, setOpen] = useState(openRaw < 0 || openRaw > 99 ? false : true);

        const imgRef = useRef<HTMLImageElement>(null);
        const openHandle = useCallback(() => {
            if (imgRef.current) {
                open(imgRef.current, openRaw < 0 || openRaw > 99 ? 4 : openRaw);
            }
        }, [imgRef, openRaw, open]);

        useImperativeHandle(ref, () => ({
            pick: () => close(target),
        }));

        return (
            <div className={align}>
                <img
                    alt="居中测试"
                    className={className}
                    origin={origin}
                    ref={imgRef}
                    src={src}
                    onLoad={() => isOpen && openHandle()}
                />
                <p>
                    <button
                        onClick={() => {
                            target ? close(target) : openHandle();
                            setOpen(val => !val);
                        }}>
                        {target ? "关闭" : "打开"}
                    </button>
                </p>
            </div>
        );
    },
);

if (process.env.NODE_ENV !== "production") {
    MountFixed.displayName = "MountFixed";
}

export interface MountFixedInstance {
    pick: () => void;
}

export interface MountFixedProps {
    origin: string;
    src: string;
    align?: "center" | "right";
    className?: string;
    open?: number;
}

export default MountFixed;
