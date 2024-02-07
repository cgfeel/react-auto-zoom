import { useContext, useEffect, useState } from "react";
import { ZoomContext } from "../../ZoomProvider";
import { FixedBaseProps, FixedConfiguration, fixedConfig } from "../fixed/FixedBase";
import { useExtract } from "../../useZoom";

export default ({ config, filter }: PointProps) => {
    const [target] = useContext(ZoomContext);
    const [info, setInfo] = useState<FixedConfiguration | undefined>(undefined);
    const extract = useExtract("fixed", { defaultConfig: fixedConfig, props: config, filter }, { placement: "auto" });

    useEffect(() => {
        if (target) {
            const [, data] = extract(target);
            data.src = data.origin;
            setInfo(data);
        } else {
            setInfo(undefined);
        }
    }, [target, extract]);

    return [target, info] as const;
};

export interface PointProps extends Pick<FixedBaseProps<FixedConfiguration>, "config" | "filter"> {}
