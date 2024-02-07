import { Point, PointTouch, ShowItem, TouchFocus, TouchScale, ZoomContext } from "@/index";
import { FC, useContext, useRef, useState } from "react";
import Layout from "../Layout";
import PickView from "../PickView";
import PickImage from "../PickImage";

const PortalBtn: FC = () => {
    const [target, { close }] = useContext(ZoomContext);
    return (
        target !== undefined && (
            <div style={{ padding: 10, textAlign: "center" }} onClick={() => close(target)}>
                <button>关闭</button>
            </div>
        )
    );
};

const Portal: FC = () => {
    const imgPointRef = useRef<HTMLDivElement>(null);
    const [fouce, setFouce] = useState(false);
    const [scale, setScale] = useState(false);
    const [view, setView] = useState<ShowItem>(["focus"]);
    return (
        <Layout
            className="box-auto-layout box-mobile-layout"
            title="指定位置"
            extra={[
                <PickView
                    key="pick-view"
                    defaultItems={view}
                    item={["focus", "grid"]}
                    onChange={items => setView(items)}
                />,
            ]}
            footer={[
                <div key="scale">
                    <label>
                        放大缩小
                        <input name="scale" type="checkbox" onChange={event => setScale(event.target.checked)} />
                    </label>
                    {" - "}
                    <label>
                        放大镜
                        <input name="focus" type="checkbox" onChange={event => setFouce(event.target.checked)} />
                    </label>
                </div>,
            ]}>
            <Point
                point={
                    <PointTouch
                        power={(scale ? [<TouchScale key="scale" />] : []).concat(
                            fouce ? [<TouchFocus key="fouce" />] : [],
                        )}
                        show={view}
                    />
                }
                portal={imgPointRef}>
                <div className="tool">
                    <PickImage num={-1} />
                </div>
                <div className="box box-fixed-layout">
                    <div className="portal-point" ref={imgPointRef}>
                        <div>test</div>
                    </div>
                    <PortalBtn />
                </div>
            </Point>
        </Layout>
    );
};

export default Portal;
