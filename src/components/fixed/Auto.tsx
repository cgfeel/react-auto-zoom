import { Fixed, Focus, Point, PointView, Scale, ShowItem, Tools } from "@/index";
import { FC, useRef, useState } from "react";
import Layout from "../Layout";
import PickImage, { list } from "../PickImage";
import PickView from "../PickView";
import OwnBox from "./foucs";
import PointImg, { PointImgInstance } from "./PointImg";
import Upload from "./upload/index";

const FixedAuto: FC = () => {
    const portalRef = useRef<HTMLDivElement>(null);
    const imgPointRef = useRef<PointImgInstance>(null);

    const [num, setNum] = useState(2);
    const [scale, setScale] = useState(false);
    const [view, setView] = useState<ShowItem>(["focus"]);

    return (
        <Layout
            className="box-auto-layout"
            title={[<div key="title">自身放大</div>, <PickView key="pick-view" onChange={items => setView(items)} />]}
            extra={[
                <div key="scale">
                    放大缩小
                    <input name="scale" type="checkbox" onChange={event => setScale(event.target.checked)} />
                </div>,
                <PickImage
                    key="pick"
                    num={num}
                    select={val => {
                        imgPointRef.current?.pick();
                        setNum(val);
                    }}
                />,
            ]}>
            <div className="box box-fixed-layout">
                <Fixed config={{ placement: "auto" }} power={scale ? [<Scale key="scale" />] : []} show={view}>
                    <p>自身放大缩小</p>
                    <p className="center">
                        <img alt="居中测试" origin={list[num].origin} src={list[num].src} />
                    </p>
                </Fixed>
            </div>
            <div className="box box-fixed-layout">
                <Point
                    point={
                        <PointView
                            power={scale ? [<Scale key="scale" />, <Tools key="tools" />] : [<Tools key="tools" />]}
                            show={view}
                        />
                    }
                    portal={portalRef}>
                    <p>指定位置</p>
                    <div className="box-portal">
                        <div className="portal-cell">
                            <PointImg origin={list[num].origin} ref={imgPointRef} src={list[num].src} />
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
                    }>
                    <p>全屏放大</p>
                    <div className="portal-cell">
                        <p>
                            <img alt="指定位置" origin={list[num].origin} src={list[num].src} width={200} />
                        </p>
                    </div>
                </Point>
            </div>
            <div className="box box-fixed-layout">
                <Fixed
                    config={{ placement: "auto" }}
                    power={scale ? [<Scale key="scale" />, <Focus key="Focus" />] : [<Focus key="Focus" />]}
                    show={view}>
                    <p>放大镜</p>
                    <p className="center">
                        <img alt="居中测试" origin={list[num].origin} src={list[num].src} />
                    </p>
                </Fixed>
            </div>
            <OwnBox origin={list[num].origin} show={view} scale={scale} />
            <Upload scale={scale} show={view} />
        </Layout>
    );
};

export default FixedAuto;
