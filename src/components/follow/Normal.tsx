import { Follow } from "@/index";
import { FC, useState } from "react";
import Layout from "../Layout";
import PickView from "../PickView";

const Normal: FC = () => {
    const [view, setView] = useState(["focus"]);
    return (
        <Layout className="box-follow-layout" title="悬浮跟随" extra={<PickView onChange={list => setView(list)} />}>
            <Follow show={view}>
                <p className="center">
                    <img
                        alt="居中测试"
                        data-mode="follow"
                        data-origin="origin"
                        origin="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v"
                        src="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v_fw480webp"
                        width={120}
                    />
                </p>
                <p className="center">
                    <img
                        alt="小图测试"
                        data-origin="src"
                        data-zindex="90"
                        src="https://gd-hbimg.huaban.com/37677303643cc89a4d4cc45d9f3a1b89118ec83567184b-dnKgYt_fw480webp"
                    />
                </p>
                <p>
                    <img
                        alt=""
                        data-mode="follow"
                        data-origin="origin"
                        origin="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v"
                        src="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v_fw480webp"
                        width={120}
                    />
                </p>
                <p className="right">
                    <img
                        alt=""
                        data-mode="follow"
                        data-origin="origin"
                        origin="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v"
                        src="https://gd-hbimg.huaban.com/686d6e52f88fa3f6b091d59216d9156eb7c3f98d4ec31-2vxy9v_fw480webp"
                        width={120}
                    />
                </p>
            </Follow>
        </Layout>
    );
};

export default Normal;
