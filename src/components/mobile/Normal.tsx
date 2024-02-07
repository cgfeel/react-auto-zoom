import { FixedTouch, ShowItem, TouchFocus, TouchScale } from "@/index";
import { FC, useRef, useState } from "react";
import Layout from "../Layout";
import PickView from "../PickView";
import PickImage, { list } from "../PickImage";
import PointImg, { PointImgInstance } from "../fixed/PointImg";

const Normal: FC = () => {
    const imgPointRef = useRef<PointImgInstance>(null);
    const [fouce, setFouce] = useState(false);
    const [num, setNum] = useState(2);
    const [scale, setScale] = useState(false);
    const [view, setView] = useState<ShowItem>(["focus"]);
    return (
        <Layout
            className="box-auto-layout box-mobile-layout"
            title="自身放大"
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
            <div className="tool">
                <PickImage
                    key="pick"
                    num={num}
                    select={val => {
                        imgPointRef.current?.pick();
                        setNum(val);
                    }}
                />
            </div>
            <div className="box box-fixed-layout">
                <FixedTouch
                    power={(scale ? [<TouchScale key="scale" />] : []).concat(
                        fouce ? [<TouchFocus key="fouce" />] : [],
                    )}
                    show={view}>
                    <p>自身放大缩小</p>
                    <PointImg
                        align="center"
                        className="follow-fixed-img"
                        origin={list[num].origin}
                        ref={imgPointRef}
                        src={list[num].src}
                    />
                </FixedTouch>
            </div>
        </Layout>
    );
};

export default Normal;
