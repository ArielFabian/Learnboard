import React, { useState } from "react";
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
import Dispatcher from "./util/dispatcher";
import Dashboard from "./Dashboard";
import './components/dashboard/App.css';
import WhiteBoard from "./Whiteboard";

function App(): JSX.Element {
    const [toolType, setToolType] = useState<ToolType>(ToolType.PEN);
    const [shapeType, setShapeType] = useState<ShapeToolType>(ShapeToolType.LINE);
    const [shapeOutlineType, setShapeOutlineType] = useState<ShapeOutlineType>(ShapeOutlineType.SOLID);
    const [lineWidthType, setLineWidthType] = useState<LineWidthType>(LineWidthType.THIN);
    const [activeColorType, setActiveColorType] = useState<ColorType>(ColorType.MAIN);
    const [mainColor, setMainColor] = useState<string>("black");
    const [subColor, setSubColor] = useState<string>("white");
    const [dispatcher] = useState(new Dispatcher());
    const [isCompilerActive, setIsCompilerActive] = useState<boolean>(false);

    const setColor = (value: string) => {
        if (activeColorType === ColorType.MAIN) {
            setMainColor(value);
        } else {
            setSubColor(value);
        }
    };

    return (
        <ToolTypeContext.Provider value={{ type: toolType, setType: setToolType }}>
            <ShapeTypeContext.Provider value={{
                type: shapeType,
                setType: (type: ShapeToolType) => {
                    setToolType(ToolType.SHAPE);
                    setShapeType(type);
                }
            }}>
                <ShapeOutlineContext.Provider value={{ type: shapeOutlineType, setType: setShapeOutlineType }}>
                    <LineWidthContext.Provider value={{ type: lineWidthType, setType: setLineWidthType }}>
                        <DispatcherContext.Provider value={{ dispatcher }}>
                            <ColorContext.Provider value={{
                                mainColor,
                                subColor,
                                activeColor: activeColorType,
                                setColor,
                                setActiveColor: setActiveColorType
                            }}>
                                <div className="app">
                                    {/* Renderizar el componente Dashboard */}
                                    <Dashboard />
                                    {/* Renderizar el componente WhiteBoard */}
                                    <WhiteBoard 
                                        isCompilerActive={isCompilerActive} 
                                        setIsCompilerActive={setIsCompilerActive} 
                                    />
                                </div>
                            </ColorContext.Provider>
                        </DispatcherContext.Provider>
                    </LineWidthContext.Provider>
                </ShapeOutlineContext.Provider>
            </ShapeTypeContext.Provider>
        </ToolTypeContext.Provider>
    );
}

export default App;