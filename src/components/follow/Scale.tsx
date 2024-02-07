import { Follow, Scale as ScaleRaw } from "@/index";
import { FC, useState } from "react";
import Layout from "../Layout";
import PickView from "../PickView";

const Scale: FC = () => {
    const [scale, setScale] = useState(true);
    const [view, setView] = useState(["focus"]);

    return (
        <Layout
            className="box-follow-scale-layout"
            title="悬浮跟随 + 滚轮放大"
            extra={
                <div className="extra-group">
                    <PickView onChange={items => setView(items)} />
                    <div key="scale">
                        - 放大缩小
                        <input
                            name="scale"
                            type="checkbox"
                            onChange={event => setScale(event.target.checked)}
                            defaultChecked
                        />
                    </div>
                </div>
            }>
            <Follow show={view} power={scale ? [<ScaleRaw key="scale" />] : []}>
                <p className="center">
                    <img
                        alt="底部测试"
                        data-origin="src"
                        src="https://gd-hbimg.huaban.com/37677303643cc89a4d4cc45d9f3a1b89118ec83567184b-dnKgYt_fw480webp"
                    />
                </p>
                <p className="center">
                    <img
                        alt=""
                        data-mode="follow"
                        data-origin="origin"
                        origin="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v"
                        src="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v_fw480webp"
                        width={120}
                    />
                </p>
                <p className="center">
                    <img
                        alt="横图测试"
                        data-origin="https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM"
                        src="https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM_fw480webp"
                    />
                </p>
                <p>
                    <img
                        alt="横图测试"
                        data-origin="https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM"
                        src="https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM_fw480webp"
                    />
                </p>
                <p className="right">
                    <img
                        alt="横图测试"
                        data-origin="https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM"
                        src="https://gd-hbimg.huaban.com/7fd3d5e3397cc7778111b10fc3d9cdf755335f7aad656-p955tM_fw480webp"
                    />
                </p>
            </Follow>
        </Layout>
    );
};

export default Scale;
