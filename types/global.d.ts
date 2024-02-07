import { AreaBaseProps, ConfigName } from "../components/useZoom";

export interface ModalViewProps<T extends ConfigName> extends Pick<AreaBaseProps<T>, "power" | "theme"> {
    mode: T;
}

interface testProps {
    name: string;
}
