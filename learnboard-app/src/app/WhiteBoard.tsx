import React, { useState } from 'react';
import Toolbar from "./components/toolBar";
import Canvas from "./components/canvas";
import Landing from "./components/compiler/components/Landing";
import {
    ColorType,
    LineWidthType,
    ShapeOutlineType,
    ShapeToolType,
    ToolType
} from "./util/toolType";

interface WhiteBoardProps {
  isCompilerActive: boolean;
  setIsCompilerActive: (isActive: boolean) => void;
}

const WhiteBoard: React.FC<WhiteBoardProps> = ({ isCompilerActive, setIsCompilerActive }) => {
  const [toolType, setToolType] = useState<ToolType>(ToolType.PEN);
  const [shapeType, setShapeType] = useState<ShapeToolType>(ShapeToolType.LINE);
  const [shapeOutlineType, setShapeOutlineType] = useState<ShapeOutlineType>(ShapeOutlineType.SOLID);
  const [lineWidthType, setLineWidthType] = useState<LineWidthType>(LineWidthType.THIN);
  const [activeColorType, setActiveColorType] = useState<ColorType>(ColorType.MAIN);
  const [mainColor, setMainColor] = useState<string>('black');
  const [subColor, setSubColor] = useState<string>('white');

  const setColor = (value: string) => {
    if (activeColorType === ColorType.MAIN) {
      setMainColor(value);
    } else {
      setSubColor(value);
    }
  };

  return (
    <div className="drawing-app" style={{ display: 'flex' }}>
    <div style={{ display: isCompilerActive ? 'none' : 'flex' }}>
        <Toolbar setIsCompilerActive={function (value: React.SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.');
              } }/>
        <Canvas
            toolType={toolType}
            shapeType={shapeType}
            shapeOutlineType={shapeOutlineType}
            mainColor={mainColor}
            subColor={subColor}
            lineWidthType={lineWidthType}
            setColor={setColor}
        />
    </div>
    <div style={{ display: isCompilerActive ? 'flex' : 'none' }}>
        <Landing setIsCompilerActive={function (value: React.SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.');
              } }/>
        </div>
        </div>
  );
};

export default WhiteBoard;