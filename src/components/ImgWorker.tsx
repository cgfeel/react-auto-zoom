import { FC, useCallback } from "react";
import "../assets/img-worker.css";

const ImgWorker: FC<ImgWorkerProps> = ({ src, stamp, hidden = true, onFaild = () => {}, onSuccess = () => {} }) => {
    const drawCanvas = useCallback(
        <T extends HTMLImageElement>(canvas: HTMLCanvasElement, [img, stamp]: [T, undefined | T]) => {
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;

            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);

            if (stamp === undefined) return onSuccess({ base64: canvas.toDataURL() });
            const coord = random(
                stamp,
                [canvas.width, canvas.height],
                Math.min(100, canvas.width / 2, canvas.height / 2),
            );

            const { height, width, x, y } = coord;
            ctx.drawImage(stamp, x, y, width, height);

            onSuccess({ base64: canvas.toDataURL(), coord });
        },
        [onFaild, onSuccess],
    );

    const random = useCallback((stamp: HTMLImageElement, range: [number, number], wrap?: number = 100) => {
        const [imgw, imgh] = range;
        const start = wrap / 2;

        const info = { height: stamp.naturalHeight, width: stamp.naturalWidth };
        const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

        const endx = imgw - start - info.width;
        const endy = imgh - start - info.height;

        return {
            ...info,
            x: getRandomInt(start, endx),
            y: getRandomInt(start, endy),
        };
    }, []);

    const handle = useCallback(
        (url: string) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onerror = () => reject(url);
                img.onload = resolve(img);

                img.src = url;
            }),
        [],
    );

    return (
        <div className={hidden ? "canvas-hide" : ""}>
            <canvas
                ref={ref =>
                    ref !== null &&
                    Promise.all([handle(src), stamp ? handle(stamp) : undefined])
                        .then(info => drawCanvas(ref, info))
                        .catch((url: string) => onFaild({ msg: "url faild: " + url }))
                }></canvas>
        </div>
    );
};

type FaildProps = {
    msg: string;
};

type SuccessProps = {
    base64: string;
    coord?: Record<"height" | "width" | "x" | "y", number>;
};

export interface ImgWorkerProps {
    hidden?: boolean;
    src: string;
    stamp?: string;
    onFaild?: (info: FaildProps) => void;
    onSuccess?: (info: SuccessProps) => void;
}

export default ImgWorker;
