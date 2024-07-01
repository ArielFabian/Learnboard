import React from "react";
// import "./index.less";
import ToolPanel from "./tool";
import ShapePanel from "./shape";
import Divider from "@material-ui/core/Divider";
import ThickSelector from "./thickSelector";
import ColorPanel from "./colorPanel";
import OtherOperator from "./other";

interface ToolbarProps {
    setIsCompilerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toolbar: React.FC<ToolbarProps> = ({ setIsCompilerActive }): JSX.Element => {
    return (
        <div className="toolbar">
            <ToolPanel className="toolbar-item" setIsCompilerActive={setIsCompilerActive}/>
            <Divider className="divider" orientation="vertical" flexItem />
            {/* <ShapePanel className="toolbar-item" />
            <Divider className="divider" orientation="vertical" flexItem />
            <ThickSelector className="toolbar-item" />
            <Divider className="divider" orientation="vertical" flexItem />
            <ColorPanel className="toolbar-item" />
            <Divider className="divider" orientation="vertical" flexItem />
            <OtherOperator />
            <Divider className="divider" orientation="vertical" flexItem /> */}
        </div>
    );
};

export default Toolbar;
