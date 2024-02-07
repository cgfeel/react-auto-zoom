import { ShowItem } from "@/index";
import { FC } from "react";
declare const Upload: FC<UploadProps>;
export interface UploadProps {
    show: ShowItem[];
    scale?: boolean;
}
export default Upload;
