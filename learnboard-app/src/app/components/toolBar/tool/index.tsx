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

                {/* <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
</svg>


        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
            <div className="absolute inset-0 -left-1 flex items-center">
              <div className="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Pincel <span className="text-gray-400">(Y)</span>
          </div>
        </div>
      </button> */}

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

                {/* <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>


        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
            <div className="absolute inset-0 -left-1 flex items-center">
              <div className="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Figuras<span className="text-gray-400">(Y)</span>
          </div>
        </div>
      </button> */}

                {/* <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M6.798 2.884a7.002 7.002 0 0 1 9.294 8.565l4.394 3.718a3.76 3.76 0 1 1-5.3 5.3l-3.717-4.394a7.002 7.002 0 0 1-8.565-9.295c.358-.894 1.48-1.007 2.063-.373L8.17 9.883l1.446-.288l.29-1.449l-3.48-3.198c-.634-.583-.522-1.706.373-2.064ZM8.805 4.42l2.763 2.54c.322.296.466.738.38 1.165l-.47 2.354a1.25 1.25 0 0 1-.982.981l-2.35.467a1.25 1.25 0 0 1-1.164-.38L4.438 8.785a5.002 5.002 0 0 0 6.804 5.25a1.257 1.257 0 0 1 1.422.355l4.05 4.786a1.76 1.76 0 1 0 2.48-2.48l-4.785-4.05a1.257 1.257 0 0 1-.355-1.422a5.001 5.001 0 0 0-5.25-6.804Z"></path></g></svg>


        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
            <div className="absolute inset-0 -left-1 flex items-center">
              <div className="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Red Neuronal<span className="text-gray-400">(Y)</span>
          </div>
        </div>
      </button> */}
              </nav>

              <nav className="flex flex-1 flex-col gap-y-4 pt-8">
                {/* <a
          href="#"
          className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50"
        >
          <svg
            className="h-6 w-6 stroke-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 9V15M9 12H15H9Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Layouts <span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </a> */}
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

              <div className="flex flex-col items-center gap-y-4 py-10">
                <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"  >
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      fillRule="evenodd"
                      d="M5 5h4.5v4.5H5zm1.5 1.5V8H8V6.5zm8-1.5H19v4.5h-4.5zM16 6.5V8h1.5V6.5zm-11 8h4.5V19H5zM6.5 16v1.5H8V16z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fill="black"
                      d="M5 11.25h1.5v1.5H5zm3 0h1.5v1.5H8zm3.167 0h1.5v1.5h-1.5zm0 3.125h1.5v1.5h-1.5zm0 3.125h1.5V19h-1.5zm0-9.375h1.5v1.5h-1.5zm0-3.125h1.5v1.5h-1.5zm3.166 6.25h1.5v1.5h-1.5zm3.167 0H19v1.5h-1.5zm-3.167 3.125h1.5v1.5h-1.5zm3.167 0H19v1.5h-1.5zM14.333 17.5h1.5V19h-1.5zm3.167 0H19V19h-1.5z"
                    ></path>
                  </svg>
                  <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                    <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                      <div className="absolute inset-0 -left-1 flex items-center">
                        <div className="h-2 w-2 rotate-45 bg-white"></div>
                      </div>
                      QR <span className="text-gray-400">(Y)</span>
                    </div>
                  </div>
                </button>
              </div>
            </aside>

            {/* Compilador madreado xddxdxdxd*/}
            {/* <span title="Otros">
    <Compiler />
    </span> */}

            <div className="Ca">{/* <Canvas/> */}</div>
          </div>
        )}
      </ToolTypeContext.Consumer>
      <div className="title"></div>
    </div>
  );
};

export default ToolPanel;
