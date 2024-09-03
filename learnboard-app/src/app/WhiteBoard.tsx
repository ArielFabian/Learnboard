import React, { useState } from 'react';
import Toolbar from './components/toolBar';
import Canvas from './components/canvas';
import Landing from './components/compiler/components/Landing';
import {
    ToolTypeContext,
    ShapeTypeContext,
    ShapeOutlineContext,
    LineWidthContext,
    ColorContext,
    DispatcherContext
} from "./context";
import {
    ColorType,
    LineWidthType,
    ShapeOutlineType,
    ShapeToolType,
    ToolType
} from "./util/toolType";
import Dispatcher from './util/dispatcher';

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
    const [dispatcher] = useState(new Dispatcher());
  
    const setColor = (value: string) => {
      if (activeColorType === ColorType.MAIN) {
        setMainColor(value);
      } else {
        setSubColor(value);
      }
    };
  
    return (
      <ToolTypeContext.Provider value={{ type: toolType, setType: setToolType }}>
        <ShapeTypeContext.Provider
          value={{
            type: shapeType,
            setType: (type: ShapeToolType) => {
              setToolType(ToolType.SHAPE);
              setShapeType(type);
            },
          }}
        >
          <ShapeOutlineContext.Provider value={{ type: shapeOutlineType, setType: setShapeOutlineType }}>
            <LineWidthContext.Provider value={{ type: lineWidthType, setType: setLineWidthType }}>
              <DispatcherContext.Provider value={{ dispatcher }}>
                <ColorContext.Provider
                  value={{
                    mainColor,
                    subColor,
                    activeColor: activeColorType,
                    setColor,
                    setActiveColor: setActiveColorType,
                  }}
                >
                  <div className="whiteboard" style={{ display: 'flex' }}>
                    {isCompilerActive ? (
                      <Landing setIsCompilerActive={setIsCompilerActive} />
                    ) : (
                      <>
                        {/* Pasar todas las props necesarias al componente Toolbar */}
                        <Toolbar 
                          setIsCompilerActive={setIsCompilerActive}
                          toolType={toolType}
                          setToolType={setToolType}
                          shapeType={shapeType}
                          setShapeType={setShapeType}
                          shapeOutlineType={shapeOutlineType}
                          setShapeOutlineType={setShapeOutlineType}
                          lineWidthType={lineWidthType}
                          setLineWidthType={setLineWidthType}
                          activeColorType={activeColorType}
                          setActiveColorType={setActiveColorType}
                          mainColor={mainColor}
                          setMainColor={setMainColor}
                          subColor={subColor}
                          setSubColor={setSubColor}
                          setColor={setColor}
                        />
                        <Canvas
                          toolType={toolType}
                          shapeType={shapeType}
                          shapeOutlineType={shapeOutlineType}
                          mainColor={mainColor}
                          subColor={subColor}
                          lineWidthType={lineWidthType}
                          setColor={setColor}
                        />
                      </>
                    )}
                  </div>
                </ColorContext.Provider>
              </DispatcherContext.Provider>
            </LineWidthContext.Provider>
          </ShapeOutlineContext.Provider>
        </ShapeTypeContext.Provider>
      </ToolTypeContext.Provider>
    );
  };
  
  export default WhiteBoard;
