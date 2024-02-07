import { FC } from "react";
import FixedAuto from "./components/fixed/Auto";
import FixedNormal from "./components/fixed/Normal";
import FollowNormal from "./components/follow/Normal";
import FollowScale from "./components/follow/Scale";
import Nest from "./components/nest/index";
import Portal from "./components/portal";

const PCZoom: FC = () => (
    <>
        <FollowNormal />
        <FollowScale />
        <FixedNormal />
        <FixedAuto />
        <Portal />
        <Nest />
    </>
);

export default PCZoom;
