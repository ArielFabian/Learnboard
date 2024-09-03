import React from "react";
import {useContext} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {ShapeOutlineContext, ShapeTypeContext, ToolTypeContext} from "../../../context";
import {ShapeOutlineType, ShapeToolType, ToolType} from "../../../util/toolType";
// import "./index.less";

const selectedShapeClass = "selected-shape";

const shapes = [
    {
        type: ShapeToolType.LINE,
        img: "./icon/shape_line.svg",
        title: "Linea"
    },
    {
        type: ShapeToolType.RECT,
        img: "./icon/shape_rect.svg",
        title: "Rectángulo"
    },
    {
        type: ShapeToolType.CIRCLE,
        img: "./icon/shape_circle.svg",
        title: "Circulo"
    },
    {
        type: ShapeToolType.RHOMBUS,
        img: "./icon/shape_rhombus.svg",
        title: "Rombo"
    },
    {
        type: ShapeToolType.TRIANGLE,
        img: "./icon/shape_triangle.svg",
        title: "Triángulo"
    },
    {
        type: ShapeToolType.PENTAGON,
        img: "./icon/shape_pentagon.svg",
        title: "Pentágono"
    },
    {
        type: ShapeToolType.SEXANGLE,
        img: "./icon/shape_sexangle.svg",
        title: "Hexágono"
    },
    {
        type: ShapeToolType.ARROW_TOP,
        img: "./icon/shape_arrowtop.svg",
        title: "Flecha hacia arriba"
    },
    {
        type: ShapeToolType.ARROW_RIGHT,
        img: "./icon/shape_arrowright.svg",
        title: "Flecha hacia la derecha"
    },
    {
        type: ShapeToolType.ARROW_DOWN,
        img: "./icon/shape_arrowdown.svg",
        title: "Flecha hacia abajo"
    },
    {
        type: ShapeToolType.ARROW_LEFT,
        img: "./icon/shape_arrowleft.svg",
        title: "Flecha hacia la izquierda"
    },
];

interface ShapePanelProps {
    className?: string;
}

const ShapePanel: React.FC<ShapePanelProps> = (props) => {
    const {className} = props;
    const toolTypeContex = useContext(ToolTypeContext);
    const shapeOutlineContext = useContext(ShapeOutlineContext);

    return (
<div className={className ? `shapepanel ${className}` : "shapepanel"}>
    <div className="shape-container">
        <div className="shape-content">
            <ShapeTypeContext.Consumer>
                {({ type, setType }) => (
                    shapes.map((shape) => (
                        <img
                            src={shape.img}
                            key={shape.img}
                            title={shape.title}
                            className={type === shape.type && toolTypeContex.type === ToolType.SHAPE ? `shape-item ${selectedShapeClass}` : "shape-item"}
                            onClick={() => setType(shape.type)}
                        />
                    ))
                )}
            </ShapeTypeContext.Consumer>
        </div> 
        {/* 
        <div className="shape-style">
            <FormControl variant="outlined" disabled={toolTypeContex.type === ToolType.SHAPE ? false : true}>
                <InputLabel>Contorno</InputLabel>
                <Select
                    value={shapeOutlineContext.type}
                    onChange={(event) => shapeOutlineContext.setType(event.target.value as ShapeOutlineType)}
                    label="轮廓"
                >
                    <MenuItem value={ShapeOutlineType.SOLID}>Line</MenuItem>
                    <MenuItem value={ShapeOutlineType.DOTTED}>Guion</MenuItem>
                </Select>
            </FormControl>
        </div> 
        */}
    </div>
    <div className="title"></div>
</div>
    );
};

export default ShapePanel;
