import { FC, useState } from "react";
import Menu from "./components/Menu";
import MobileZoom from "./MobileZoom";
import PCZoom from "./PCZoom";

const Router = {
    index: <PCZoom />,
    mobile: <MobileZoom />,
};

const App: FC = () => {
    const [name, setName] = useState("");
    return (
        <div>
            <h1 className="title">
                <span>React auto zoom</span>
                <Menu change={name => setName(name)} />
            </h1>
            {Router[name]}
        </div>
    );
};

export default App;
