import { FC } from "react";
import "../assets/img-worker.css";
declare const ImgWorker: FC<ImgWorkerProps>;
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
