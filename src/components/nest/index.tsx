import { Fixed, Zoom } from "@/index";
import { FC, useState } from "react";
import Layout from "../Layout";
import { list } from "../PickImage";
import PickView from "../PickView";
import Follow from "./Follow";
import Auto from "./Auto";

const Nest: FC = () => {
    const [view, setView] = useState(["focus"]);
    return (
        <Layout className="box-nest-layout" title="嵌套测试" extra={<PickView onChange={list => setView(list)} />}>
            <Fixed show={view}>
                <p>
                    最外层取所有<code>img</code>，但优先级次于子节点，使用固定尺寸方式
                </p>
                <p>
                    <img className="ex-img" origin={list[0].origin} src={list[0].src} />
                </p>
                <div className="box box-disable-layout">
                    <Zoom>
                        <p>禁止当前层级触发</p>
                        {list.map((img, i) => (
                            <img className="ex-img" key={i} origin={img.origin} src={img.src} />
                        ))}
                        <div className="box box-follow-layout">
                            <p>
                                匹配所有样式名为<code>.follow</code>层级下的<code>img</code>样式名为<code>.zoom</code>
                                的图片
                            </p>
                            <div className="nest-grid">
                                <div>
                                    <div className="box box-follow-layout">
                                        <p>
                                            使用跟随方式，第一张没有设置<code>className</code>被上一层级拦截
                                        </p>
                                        <Follow view={view} />
                                    </div>
                                </div>
                                <div>
                                    <div className="box box-nest-layout">
                                        <p>
                                            使用自身放大方式，第一张图设置了<code>ignore</code>将禁止匹配
                                        </p>
                                        <Auto view={view} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
            </Fixed>
        </Layout>
    );
};

export default Nest;
