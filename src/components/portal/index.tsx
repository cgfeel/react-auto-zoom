import { Fixed, Follow, Point, PointView, Scale, ShowItem, Tools } from "@/index";
import { FC, useRef, useState } from "react";
import Layout from "../Layout";
import PickImage, { list } from "../PickImage";
import PickView from "../PickView";
import MountFixed, { MountFixedInstance } from "./MountFixed";
import OwnBox from "./OwnBox";

const Portal: FC = () => {
    const mountRef = useRef<Map<string, MountFixedInstance>>(new Map());
    const portalRef = useRef<HTMLDivElement>(null);

    const [num, setNum] = useState(2);
    const [scale, setScale] = useState(true);
    const [view, setView] = useState<ShowItem[]>(["focus"]);

    return (
        <Layout
            className="box-portal-layout"
            title={[<div key="title">手动触发</div>, <PickView key="pick-view" onChange={items => setView(items)} />]}
            extra={[
                <div key="scale">
                    放大缩小
                    <input
                        name="scale"
                        type="checkbox"
                        onChange={event => setScale(event.target.checked)}
                        defaultChecked={scale}
                    />
                </div>,
                <PickImage
                    key="pick"
                    num={num}
                    select={val => {
                        mountRef.current.forEach(item => item.pick());
                        setNum(val);
                    }}
                />,
            ]}>
            <div className="box box-fixed-layout">
                <Follow power={scale ? [<Scale key="scale" />] : []} show={view} disable>
                    <p>跟随模式-点击选区自动记录</p>
                    <MountFixed
                        open={-1}
                        origin={list[num].origin}
                        ref={ref => mountRef.current.set("follow", ref)}
                        src={list[num].src}
                    />
                </Follow>
            </div>
            <div className="box box-fixed-layout">
                <Fixed power={scale ? [<Scale key="scale" />] : []} show={view} disable>
                    <p>固定模式-点击选区自动记录</p>
                    <MountFixed
                        origin={list[num].origin}
                        ref={ref => mountRef.current.set("fixed", ref)}
                        src={list[num].src}
                    />
                </Fixed>
            </div>
            <div className="box box-fixed-layout">
                <OwnBox scale={scale} view={view}>
                    <MountFixed
                        origin={list[num].origin}
                        ref={ref => mountRef.current.set("fixed-auto", ref)}
                        src={list[num].src}
                    />
                </OwnBox>
            </div>
            <div className="box box-fixed-layout">
                <Point
                    point={
                        <PointView
                            power={scale ? [<Scale key="scale" />, <Tools key="tools" />] : [<Tools key="tools" />]}
                            show={view}
                        />
                    }
                    portal={portalRef}
                    disable>
                    <p>指定位置</p>
                    <div className="box-portal">
                        <div className="portal-cell">
                            <MountFixed
                                origin={list[num].origin}
                                ref={ref => mountRef.current.set("portal", ref)}
                                src={list[num].src}
                            />
                        </div>
                        <div className="portal-cell">
                            <div className="portal-point" ref={portalRef}>
                                <div>test</div>
                            </div>
                        </div>
                    </div>
                </Point>
            </div>
            <div className="box box-fixed-layout">
                <Point
                    point={
                        <PointView
                            power={scale ? [<Scale key="scale" />, <Tools key="tools" />] : [<Tools key="tools" />]}
                            show={view}
                        />
                    }
                    disable>
                    <p>全屏放大</p>
                    <div className="portal-cell">
                        <MountFixed
                            open={-1}
                            origin={list[num].origin}
                            ref={ref => mountRef.current.set("portal-body", ref)}
                            src={list[num].src}
                        />
                    </div>
                </Point>
            </div>
        </Layout>
    );
};

export default Portal;
