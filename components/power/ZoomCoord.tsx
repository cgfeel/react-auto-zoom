import { FC, useCallback, useContext, useEffect, useRef } from "react";
import { ViewContext } from "../ViewProvider";
import { ZoomContext } from "../ZoomProvider";
import "../assets/power-coord.css";

const ZoomCoord: FC<ZoomCoordProps> = ({ capture = () => {} }) => {
    const [target] = useContext(ZoomContext);
    const {
        data: { follow_fixed },
        view,
    } = useContext(ViewContext);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { origin } = follow_fixed || {};

    const rgbToHex = useCallback((r: number, g: number, b: number) => {
        function componentToHex(c: number) {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }, []);

    const initCoordinate = useCallback(
        (img: HTMLImageElement) => {
            const canvas = canvasRef.current;
            canvas?.width = img.naturalWidth;
            canvas?.height = img.naturalHeight;

            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);

            canvas.start = true;
        },
        [canvasRef],
    );

    useEffect(() => {
        const { height = 0, left = 0, top = 0, width = 0 } = target?.getBoundingClientRect() || {};
        const compute = (x: number, y: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });

            const coord_x = Math.max(0, ((x - left) / width) * canvas?.width);
            const coord_y = Math.max(0, ((y - top) / height) * canvas?.height);

            const { data } = ctx.getImageData(coord_x, coord_y, 1, 1);
            const color = rgbToHex(data[0], data[1], data[2]);

            view.current?.dataset.color = color;
            capture([{ x: Math.floor(x - left), y: Math.floor(y - top) }, color]);
        };
        const handle = (event: MouseEvent) => {
            const { scrollX, scrollY } = window;
            compute(event.pageX - scrollX, event.pageY - scrollY);
        };
        if (target !== undefined) {
            const { start = [0, 0] } = target;
            compute(start[0], start[1]);
        }
        view.current?.classList.add("zoom-coord");
        target?.nextElementSibling?.addEventListener("mousemove", handle);
        return () => {
            target?.nextElementSibling?.removeEventListener("mousemove", handle);
        };
    }, [canvasRef, target, view, capture, rgbToHex]);

    useEffect(() => {
        if (origin !== undefined) {
            const img = new Image();
            img.onload = function () {
                initCoordinate(img);
            };
            img.src = origin;
        }
    }, [origin, initCoordinate]);

    return (
        <div className="zoom-coord-control" data-color="#000000">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export type CoordType = [{ x: number; y: number }, string];

export interface ZoomCoordProps {
    capture?: (val: CoordType) => void;
}

export default ZoomCoord;
