import { FC, useContext, useEffect } from "react";
import { ViewContext } from "../ViewProvider";
import { FixedConfiguration } from "../area/fixed/FixedBase";

const fixedStyle: FixedConfiguration = {
    fixed_height: 400,
    fixed_width: 500,
    fixed_x: 20,
    fixed_y: 0,
};

const FixedControl: FC = () => {
    const {
        data: { fixed = {} },
        view,
        style,
    } = useContext(ViewContext);

    useEffect(() => {
        const { placement } = fixed;
        const data = Object.keys(fixedStyle).reduce(
            (current, key) => ({
                ...current,
                [key]: fixed[key] === undefined ? fixedStyle[key] : fixed[key],
            }),
            {} as FixedConfiguration,
        );
        view.current?.className = `fixed-control ${placement}`;
        style(data);
    }, [fixed, view, style]);

    return null;
};

export { fixedStyle };

export default FixedControl;
