import { Point, PointTouch, ShowItem, TouchBar, TouchFocus, TouchScale, ZoomContext } from "@/index";
import { FC, ReactNode, RefObject, useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import PickView from "../PickView";
import PickImage from "../PickImage";

const PortalScreen: FC<PortalScreenProps> = ({ tips, wrap, name = "全屏打开" }) => {
    const [, { open }] = useContext(ZoomContext);
    return (
        <p>
            <button
                onClick={() => {
                    const img = wrap.current?.querySelector("a.on img");
                    if (img) open(img, 64);
                }}>
                {name}
            </button>
            {tips}
        </p>
    );
};

const PortalBtn: FC = () => {
    const [target, { close, open }] = useContext(ZoomContext);
    const [view, setView] = useState(false);

    const imgRef = useRef<HTMLDivElement>(null);
    const [num, setNum] = useState(2);

    useEffect(() => {
        if (view) setNum(num => (target === undefined ? -1 : num));
    }, [target, view]);

    return (
        <div ref={imgRef}>
            <PickImage
                num={num}
                onLoad={img => {
                    open(img, 64);
                    setView(true);
                }}
                start={() => close(target)}
                select={key => {
                    const img = imgRef.current?.querySelectorAll("img")[key];
                    setNum(key);
                    open(img, 64);
                }}
            />
        </div>
    );
};

const PortalAuto: FC = () => {
    const imgPointRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const [fouce, setFouce] = useState(false);
    const [scale, setScale] = useState(false);
    const [view, setView] = useState<ShowItem[]>(["focus"]);

    return (
        <Layout
            className="box-auto-layout box-mobile-layout"
            title="受控 + 工具条"
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
                        power={[
                            <TouchBar key="bar" />,
                            scale ? <TouchScale key="scale" /> : null,
                            fouce ? <TouchFocus key="fouce" /> : null,
                        ].filter(i => i)}
                        show={view}
                    />
                }
                portal={imgPointRef}
                disable>
                <div className="tool" ref={boxRef}>
                    <PortalBtn />
                </div>
                <div className="box box-fixed-layout">
                    <p>指定位置</p>
                    <div className="portal-point" ref={imgPointRef}>
                        <div>test</div>
                    </div>
                </div>
            </Point>
            <div className="box box-fixed-layout" style={{ marginTop: 10 }}>
                <Point
                    point={
                        <PointTouch
                            power={[
                                <TouchBar key="bar" />,
                                scale ? <TouchScale key="scale" /> : null,
                                fouce ? <TouchFocus key="fouce" /> : null,
                            ].filter(i => i)}
                            show={view}
                        />
                    }
                    disable>
                    <PortalScreen wrap={boxRef} />
                </Point>
            </div>
            <div className="box box-fixed-layout" style={{ marginTop: 10 }}>
                <Point
                    point={
                        <PointTouch
                            className="full"
                            power={[
                                <TouchBar key="bar" />,
                                scale ? <TouchScale key="scale" /> : null,
                                fouce ? <TouchFocus key="fouce" /> : null,
                            ].filter(i => i)}
                            show={view}
                        />
                    }
                    disable>
                    <PortalScreen name="满屏打开" tips={<span>不考虑尺寸可能会变形</span>} wrap={boxRef} />
                </Point>
            </div>
        </Layout>
    );
};

interface PortalScreenProps {
    wrap: RefObject<HTMLDivElement>;
    name?: string;
    tips?: ReactNode;
}

export default PortalAuto;
