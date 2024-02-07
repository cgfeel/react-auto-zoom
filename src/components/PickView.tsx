import { ShowItem } from "@/useZoom";
import { ChangeEvent, FC, useCallback, useRef } from "react";

const group = {
    focus: "焦点",
    grid: "网格",
    mask: "遮罩",
};

const PickView: FC<PickViewProps> = ({ onChange, defaultItems = ["focus"], item = ["focus", "grid", "mask"] }) => {
    const viewRef = useRef<ShowItem[]>(defaultItems);
    const handle = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const list = viewRef.current;
            const {
                target: { checked, value },
            } = event;

            if (checked) {
                viewRef.current = list.indexOf(value) < 0 ? [...list, value] : list;
            } else {
                viewRef.current = list.filter(key => key !== value);
            }
            onChange && onChange(viewRef.current);
        },
        [viewRef, onChange],
    );

    return (
        <div className="pick-view">
            {item.map(key => (
                <label key={key}>
                    {group[key]}
                    <input
                        type="checkbox"
                        name="view"
                        value={key}
                        defaultChecked={viewRef.current.indexOf(key) >= 0}
                        onChange={handle}
                    />
                </label>
            ))}
        </div>
    );
};

export interface PickViewProps {
    defaultItems?: ShowItem[];
    item?: ShowItem[];
    onChange?: (items: ShowItem[]) => void;
}

export default PickView;
