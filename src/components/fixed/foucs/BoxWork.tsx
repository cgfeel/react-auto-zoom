import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import gold from "../../../assets/glod";
import img from "../../../assets/img";
import img1 from "../../../assets/img1";
import ImgWorker, { ImgWorkerProps } from "../../ImgWorker";
import BoxResult, { BoxResultInstance } from "./BoxResult";

const BoxWork = forwardRef<BoxWorkInstance, BoxWorkProps>(({ touch, onSuccess }, ref) => {
    const [start, setStart] = useState(0);
    const resultRef = useRef<BoxResultInstance>(null);

    useImperativeHandle(ref, () => ({
        hit: img => resultRef.current?.success(img, touch),
        load: time => setStart(time),
    }));

    return start === 0
        ? null
        : [
              <ImgWorker
                  key="worker"
                  hidden={true}
                  src={touch ? img1 : img}
                  stamp={gold}
                  onFaild={({ msg }) => resultRef.current?.faild(msg)}
                  onSuccess={info => {
                      resultRef.current?.wait();
                      onSuccess(info);
                  }}
              />,
              <BoxResult key="result" ref={resultRef} reload={() => setStart(Date.now())} />,
          ];
});

if (process.env.NODE_ENV !== "production") {
    BoxWork.displayName = "BoxResult";
}

export interface BoxWorkInstance {
    hit: (img: string) => void;
    load: (val: number) => void;
}

export interface BoxWorkProps extends Pick<ImgWorkerProps, "onSuccess"> {
    touch?: boolean;
}

export default BoxWork;
