import { FC, PropsWithChildren, ReactNode } from "react";

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, className, extra, footer, title }) => (
    <div className={`box${className ? " " + className : ""}`}>
        <div className="title">
            <h2>{title || "图片放大演示"}</h2>
            <div className="options">{extra}</div>
        </div>
        {children}
        {footer && <div className="footer">{footer}</div>}
    </div>
);

export interface LayoutProps {
    extra?: ReactNode;
    footer?: ReactNode;
    className?: string;
    title?: ReactNode;
}

export default Layout;
