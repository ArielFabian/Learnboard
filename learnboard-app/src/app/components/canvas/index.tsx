import React, { useEffect, useRef, useState, useContext, FC } from "react";
import { LineWidthType, ShapeOutlineType, ShapeToolType, ToolType } from "../../util/toolType";
import { Pen, Tool, Eraser, ColorExtract, ColorFill } from "../../util/tool";
import Shape from "../../util/tool/shape";
import { DispatcherContext } from "../../context";
import { CLEAR_EVENT, REDO_EVENT, UNDO_EVENT } from "../../util/dispatcher/event";
import Snapshot from "../../util/snapshot";

interface CanvasProps {
  toolType: ToolType;
  shapeType: ShapeToolType;
  shapeOutlineType: ShapeOutlineType;
  lineWidthType: LineWidthType;
  mainColor: string;
  subColor: string;
  setColor: (value: string) => void;
}

const Canvas: FC<CanvasProps> = (props) => {
  const { toolType, lineWidthType, mainColor, subColor, setColor, shapeType, shapeOutlineType } = props;
  const [tool, setTool] = useState<Tool>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatcherContext = useContext(DispatcherContext);
  const [snapshot] = useState<Snapshot>(new Snapshot());

  useEffect(() => {
    switch (toolType) {
      case ToolType.PEN:
        setTool(new Pen());
        break;
      case ToolType.ERASER:
        setTool(new Eraser());
        break;
      case ToolType.COLOR_EXTRACT:
        setTool(new ColorExtract(setColor));
        break;
      case ToolType.COLOR_FILL:
        setTool(new ColorFill());
        break;
      case ToolType.SHAPE:
        setTool(new Shape(shapeType, shapeOutlineType === ShapeOutlineType.DOTTED));
        break;
      default:
        break;
    }
  }, [toolType, shapeType]);

  useEffect(() => {
    if (tool instanceof Shape) {
      tool.isDashed = shapeOutlineType === ShapeOutlineType.DOTTED;
    }
  }, [shapeOutlineType]);

  useEffect(() => {
    switch (lineWidthType) {
      case LineWidthType.THIN:
        Tool.lineWidthFactor = 1;
        break;
      case LineWidthType.MIDDLE:
        Tool.lineWidthFactor = 2;
        break;
      case LineWidthType.BOLD:
        Tool.lineWidthFactor = 3;
        break;
      case LineWidthType.MAXBOLD:
        Tool.lineWidthFactor = 4;
        break;
      default:
        break;
    }
  }, [lineWidthType]);

  useEffect(() => {
    Tool.mainColor = mainColor;
  }, [mainColor]);

  useEffect(() => {
    Tool.subColor = subColor;
  }, [subColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.height = canvas.clientHeight;
      canvas.width = canvas.clientWidth;

      canvas.style.height = '100vh';  // 100% of the viewport height
      canvas.style.width = '100vw';   // 100% of the viewport width

      Tool.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        snapshot.add(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }

      const dispatcher = dispatcherContext.dispatcher;
      const callback = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      };
      dispatcher.on(CLEAR_EVENT, callback);

      const forward = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imageData = snapshot.forward();
          if (imageData) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
          }
        }
      };
      dispatcher.on(REDO_EVENT, forward);

      const back = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imageData = snapshot.back();
          if (imageData) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
          }
        }
      };
      dispatcher.on(UNDO_EVENT, back);

      window.addEventListener("resize", () => {
        const canvasData = Tool.ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
        Tool.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        Tool.ctx.fillStyle = "white";
        Tool.ctx.fillRect(0, 0, canvas.width, canvas.height);
        Tool.ctx.putImageData(canvasData, 0, 0);
      });

      return () => {
        dispatcher.off(CLEAR_EVENT, callback);
      };
    }
  }, [canvasRef]);

//FUNCION PARA TOMAR SS//
useEffect(() => {
  const elem = document.querySelector('#screenshot') as HTMLElement;
  if (elem) {
    // Solo añade el evento si el elemento existe
    const handleScreenshotClick = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Obtener la imagen en formato base64
        const base64Image = canvas.toDataURL("image/png"); // Convertir a base64
        console.log("Base64 Image Data:", base64Image); // Mostrar en consola

        // Convertir la imagen a Blob y guardar
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
          }
        });
      }
    };

    elem.addEventListener('click', handleScreenshotClick);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      elem.removeEventListener('click', handleScreenshotClick);
    };
  }
}, [canvasRef]);

const saveBlob = (() => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function saveData(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url); // Limpiamos el objeto URL después de usarlo
  };
})();

  const onMouseDown = (event: MouseEvent) => {
    if (tool) {
      tool.onMouseDown(event);
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (tool) {
      tool.onMouseMove(event);
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    if (tool) {
      tool.onMouseUp(event);
      snapshot.add(Tool.ctx.getImageData(0, 0, Tool.ctx.canvas.width, Tool.ctx.canvas.height));
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    if (tool) {
      tool.onTouchStart(event);
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    if (tool) {
      tool.onTouchMove(event);
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (tool) {
      tool.onTouchEnd(event);
      snapshot.add(Tool.ctx.getImageData(0, 0, Tool.ctx.canvas.width, Tool.ctx.canvas.height));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseup", onMouseUp);

      canvas.addEventListener("touchstart", onTouchStart);
      canvas.addEventListener("touchmove", onTouchMove);
      canvas.addEventListener("touchend", onTouchEnd);

      return () => {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);

        canvas.removeEventListener("touchstart", onTouchStart);
        canvas.removeEventListener("touchmove", onTouchMove);
        canvas.removeEventListener("touchend", onTouchEnd);
      };
    }
  }, [canvasRef, onMouseDown, onMouseMove, onMouseUp]);

  return <canvas className="canvas" ref={canvasRef} />;
};

export default Canvas;
