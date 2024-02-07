import { FC } from "react";
import MobileAuto from "./components/mobile/Auto";
import Foucs from "./components/mobile/Foucs";
import MobileNormal from "./components/mobile/Normal";
import Portal from "./components/mobile/Portal";
import PortalAuto from "./components/mobile/PortalAuto";

const MobileZoom: FC = () => (
    <>
        <MobileNormal />
        <MobileAuto />
        <Portal />
        <PortalAuto />
        <Foucs />
    </>
);

export default MobileZoom;
