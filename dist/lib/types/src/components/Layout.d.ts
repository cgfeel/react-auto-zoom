import { FC, PropsWithChildren, ReactNode } from "react";
declare const Layout: FC<PropsWithChildren<LayoutProps>>;
export interface LayoutProps {
    extra?: ReactNode;
    footer?: ReactNode;
    className?: string;
    title?: ReactNode;
}
export default Layout;
