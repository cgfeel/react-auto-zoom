import { FC } from "react";
declare const Menu: FC<MenuProps>;
export interface MenuProps {
    change?: (name: string) => void;
}
export default Menu;
