import { ShowItem } from "@/index";
import { FC, useState } from "react";
import Layout from "../Layout";
import { list } from "../PickImage";
import PickView from "../PickView";
import OwnBox from "../fixed/foucs";

const Foucs: FC = () => {
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
            ]}>
            <OwnBox origin={list[0].origin} scale={false} show={view} touch={true} />
        </Layout>
    );
};

export default Foucs;
