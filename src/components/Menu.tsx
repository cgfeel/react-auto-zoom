import { FC, useEffect, useState } from "react";

const route = [
    { path: "index", name: "PC端" },
    { path: "mobile", name: "移动端" },
];

const Menu: FC<MenuProps> = ({ change = () => {} }) => {
    const [pathname, setPathname] = useState("");
    useEffect(() => {
        const { pathname } = location;
        const name = pathname.substring(1).split(".")[0];
        setPathname(name === "" ? "index" : name);
    }, [setPathname]);

    useEffect(() => {
        change(pathname);
    }, [pathname, change]);

    return (
        <span className="menu">
            {route.map(({ name, path }) => (
                <a className={path === pathname ? "on" : ""} href={path === "index" ? "/" : `${path}.html`} key={path}>
                    {name}
                </a>
            ))}
        </span>
    );
};

export interface MenuProps {
    change?: (name: string) => void;
}

export default Menu;
