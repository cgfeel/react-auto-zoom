import { FC, memo, useEffect, useId } from "react";
import { NodeStyle } from "../index.d";

const GridCom: FC<GridComProps> = ({ grid, mount, load, useStyle }) => {
    const cellId = useId();
    const createStyle = useStyle(cellId);

    const point: [number, number] = Object.values(grid).reduce((column, row) => {
        const total = column * row;
        const num = mount === undefined ? -1 : mount;
        return [total, Math.min(total - 1, num)];
    });

    useEffect(() => {
        const style = document.createElement("style");
        const header = document.getElementsByTagName("head")[0];

        const { column, row } = grid;
        const count = column * row;

        const node = [];
        for (let i = 0; i < count; i++) {
            node.push(createStyle(i, column, row));
        }

        load(grid);

        style.innerHTML = node.join(" ");
        header.appendChild(style);

        return () => {
            header.removeChild(style);
        };
    }, [grid, createStyle, load]);

    return Array(point[0])
        .fill(0)
        .map((i, key) => (
            <input
                className="zoom-cell"
                name={`zoom-cell[${cellId}]`}
                type="radio"
                key={`${key}-${i}`}
                value={key}
                defaultChecked={key === point[1]}
            />
        ));
};

type GirdType = {
    column: number;
    row: number;
};

export interface GridComProps {
    grid: GirdType;
    load: (grid: GirdType) => void;
    useStyle: NodeStyle;
    mount?: number;
}

export default memo(GridCom);
