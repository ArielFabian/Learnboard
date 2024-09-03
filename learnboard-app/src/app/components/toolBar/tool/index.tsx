import React from "react";
import CreateTwoTone from "@material-ui/icons/CreateTwoTone";
import FormatColorFillTwoTone from "@material-ui/icons/FormatColorFillTwoTone";
import ColorizeTwoToneIcon from "@material-ui/icons/ColorizeTwoTone";
// import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
// import TextFieldsIcon from "@material-ui/icons/TextFields";
import { ShapeToolType, ToolType } from "../../../util/toolType";
import { ToolTypeContext } from "../../../context";
import Canvas from "../../canvas";
import ColorPanel from "../colorPanel";
import { Popover } from "@material-ui/core";
import ThickSelector from "../thickSelector";
import OtherOperator from "../other";
import ShapePanel from "../shape";
import Compiler from "../../compiler/compiler";

// import "./index.less";

const selectedToolClass = "selected-tool";
export interface ToolPanelProps {
  className?: string;
  setIsCompilerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolPanel: React.FC<ToolPanelProps> = (props) => {
  const { className, setIsCompilerActive } = props;
  return (
    <div className={className ? `toolpanel ${className}` : "toolpanel"}>
      <ToolTypeContext.Consumer>
        {({ type, setType }) => (
          <div className="flex bg-gray-100 text-gray-900">
            <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
              <nav className="flex flex-1 flex-col gap-y-4 pt-8">
                <span title="Lapiz">
                  <CreateTwoTone
                    className={
                      type === ToolType.PEN
                        ? `tool-item ${selectedToolClass}`
                        : "tool-item"
                    }
                    onClick={() => {
                      setType(ToolType.PEN);
                    }}
                  />
                </span>

                <span title="Borrador">
                  <img
                    src="./icon/eraser.svg"
                    className={
                      type === ToolType.ERASER
                        ? `tool-item ${selectedToolClass}`
                        : "tool-item"
                    }
                    onClick={() => {
                      setType(ToolType.ERASER);
                    }}
                  />
                </span>

                <span title="Relleno">
                  <FormatColorFillTwoTone
                    className={
                      type === ToolType.COLOR_FILL
                        ? `tool-item ${selectedToolClass}`
                        : "tool-item"
                    }
                    onClick={() => {
                      setType(ToolType.COLOR_FILL);
                    }}
                  />
                </span>

                <span title="Panel">
                  <ColorPanel className="toolbar-item" />
                </span>

                <span title="ThickSelector">
                  <ThickSelector className="toolbar-item" />
                </span>

                <span title="Otros">
                  <OtherOperator />
                </span>
              </nav>

              <nav className="flex flex-1 flex-col gap-y-4 pt-8">
              </nav>

              <span title="Otros">
                <ShapePanel />
              </span>

              <div className="flex flex-col items-center gap-y-4 py-10">
                <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"onClick={() => setIsCompilerActive(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="#216afd"
                      fillRule="evenodd"
                      d="m6.007 13.418l2-12l.986.164l-2 12zm-.8-8.918l-3 3l3 3l-.707.707L.793 7.5L4.5 3.793zm5.293-.707L14.207 7.5L10.5 11.207l-.707-.707l3-3l-3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                    <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                      <div className="absolute inset-0 -left-1 flex items-center">
                        <div className="h-2 w-2 rotate-45 bg-white"></div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

          
            </aside>

          </div>
        )}
      </ToolTypeContext.Consumer>
      <div className="title"></div>
    </div>
  );
};

export default ToolPanel;
