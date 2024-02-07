import { Fixed, FixedConfiguration, Scale, ShowItem } from "@/index";
import { FC, useState } from "react";
import Layout from "../Layout";
import PickImage, { list } from "../PickImage";
import PickView from "../PickView";

type AlignType = Required<FixedConfiguration>["placement"];
const fixed_x: string[] = ["lb", "left", "lt", "rb", "right", "rt"];

const FixedNormal: FC = () => {
    const [num, setNum] = useState(2);
    const [placement, setPlacement] = useState<AlignType>("rt");
    const [scale, setScale] = useState(false);
    const [view, setView] = useState<ShowItem[]>(["focus"]);

    return (
        <Layout
            className="box-fixed-layout"
            title={[<div key="title">固定尺寸</div>, <PickView key="pick-view" onChange={items => setView(items)} />]}
            extra={[
                <div key="scale">
                    放大缩小
                    <input name="scale" type="checkbox" onChange={event => setScale(event.target.checked)} />
                </div>,
                <PickImage key="pick" num={num} select={val => setNum(val)} />,
            ]}>
            <div className="fixed-wrap">
                <div className="div1"> </div>
                <div className="div2">
                    <button onClick={() => setPlacement("bl")}>下左</button>
                </div>
                <div className="div3"> </div>
                <div className="div4">
                    <button onClick={() => setPlacement("bottom")}>下中</button>
                </div>
                <div className="div5"> </div>
                <div className="div6">
                    <button onClick={() => setPlacement("br")}>下右</button>
                </div>
                <div className="div7"> </div>
                <div className="div8">
                    <button onClick={() => setPlacement("lt")}>左上</button>
                </div>
                <div className="div9"> </div>
                <div className="div10">
                    <button onClick={() => setPlacement("left")}>左中</button>
                </div>
                <div className="div11"> </div>
                <div className="div12">
                    <button onClick={() => setPlacement("lb")}>左下</button>
                </div>
                <div className="div13"> </div>
                <div className="div14">
                    <button onClick={() => setPlacement("tr")}>上右</button>
                </div>
                <div className="div15"> </div>
                <div className="div16">
                    <button onClick={() => setPlacement("top")}>上中</button>
                </div>
                <div className="div17"> </div>
                <div className="div18">
                    <button onClick={() => setPlacement("tl")}>上左</button>
                </div>
                <div className="div19"> </div>
                <div className="div20">
                    <button onClick={() => setPlacement("rb")}>右下</button>
                </div>
                <div className="div21"> </div>
                <div className="div22">
                    <button onClick={() => setPlacement("right")}>右中</button>
                </div>
                <div className="div23"> </div>
                <div className="div24">
                    <button onClick={() => setPlacement("rt")}>右上</button>
                </div>
                <div className="div25">
                    <div className={`fixed-box ${placement}`}>
                        <Fixed
                            config={{
                                fixed_x: fixed_x.indexOf(placement) < 0 ? 0 : 20,
                                fixed_y: fixed_x.indexOf(placement) < 0 ? 20 : 0,
                                placement,
                            }}
                            power={scale ? [<Scale key="scale" />] : []}
                            show={view}>
                            <div>
                                <img alt="居中测试" height={220} origin={list[num].origin} src={list[num].src} />
                            </div>
                        </Fixed>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FixedNormal;
