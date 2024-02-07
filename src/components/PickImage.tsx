import { FC, memo, useCallback, useEffect, useState } from "react";

const list = [
    {
        origin: "https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v",
        src: "https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v_fw480webp",
    },
    {
        origin: "https://gd-hbimg.huaban.com/37677303643cc89a4d4cc45d9f3a1b89118ec83567184b-dnKgYt_fw480webp",
        src: "https://gd-hbimg.huaban.com/37677303643cc89a4d4cc45d9f3a1b89118ec83567184b-dnKgYt_fw480webp",
    },
    {
        origin: "https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM",
        src: "https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM_fw480webp",
    },
];

const PickImage: FC<PickImageProps> = ({ num = 2, onLoad, start, select = () => {} }) => {
    const [index, setIndex] = useState(num);
    const handle = useCallback(
        (index: number) => {
            if (list[index]) {
                setIndex(index);
                select(index);
            }
        },
        [list, select, setIndex],
    );

    useEffect(() => {
        setIndex(num);
    }, [num]);

    return (
        <div className="pick-img">
            换图：
            {list.map((item, key) => (
                <a
                    className={index === key ? "on" : ""}
                    key={key}
                    onClick={() => !("ontouchend" in window) && handle(key)}
                    onTouchStart={() => start && start()}
                    onTouchEnd={() => handle(key)}>
                    <img
                        alt=""
                        origin={item["origin"]}
                        src={item["src"]}
                        onLoad={event => onLoad && index === key && onLoad(event.target, key)}
                    />
                </a>
            ))}
        </div>
    );
};

export interface PickImageProps {
    num?: number;
    onLoad?: (img: HTMLImageElement) => void;
    start?: () => void;
    select?: (val: number) => void;
}

export { list };

export default memo(PickImage);
