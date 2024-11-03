import axios from 'axios';
import React, { useEffect, useRef, useState, type PointerEvent, type Touch, type TouchEvent } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client'; // Instalar con: npm install socket.io-client
import { TRANSPARENT_BACKGROUND_IMAGE } from '~/config/constants';
import { APP_FIXED_MAIN_UNIQUE_ID } from '~/config/globalElementIds';
import { CANVAS_CONTROLS_OVERLAY } from '~/config/globalElementIds';
import type { ActionModeOption } from '~/config/types';
import useCanvasContext from '~/context/useCanvasContext';
import useActionMode from '~/store/useActionMode';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useDefaultParams from '~/store/useDefaultParams';
import useScrollPosition from '~/store/useScrollPosition';
import useUserMode from '~/store/useUserMode';
import useWindowSize from '~/store/useWindowSize';
import useZoom from '~/store/useZoom';
import theme from '~/theme';
import generateUniqueId from '~/utils/generateUniqueId';
import getControlPoints from '~/utils/getControlPoints';
import getCursorFromModes from '~/utils/getCursorFromModes';
import getDimensionsFromFreeDraw from '~/utils/getDimensionsFromFreeDraw';
import getRelativeMousePositionOnCanvas from '~/utils/getRelativeMousePositionOnCanvas';
import isCursorWithinRectangle from '~/utils/isCursorWithinRectangle';
import getDimensionsFromImage from '~/utils/getDimensionsFromImage';
import { type OptionItem } from '~/components/Overlay/OverlaySidebar/controls/ImageControl/UnsplashImageButton';
import getImageElementFromUrl from '~/utils/getImageElementFromUrl';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
const socket = io('http://localhost:4000'); // Conecta al servidor de sockets

const FixedMain = styled.main`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${theme.layers.canvasApp};
  user-select: none;
`;

type PointerOrTouchEvent = PointerEvent<HTMLElement> | TouchEvent<HTMLElement>;

export default function Canvas(
  {
    text,
    handleTextChange,
    takeScreenshot,
    handleTakeScreenshot
  }:
  {
    text: string,
    handleTextChange: (text: string) => void
    takeScreenshot: boolean,
    handleTakeScreenshot: (takeScreenshot: boolean) => void
  }) {
  const { canvasRef, contextRef, drawEverything } = useCanvasContext();

  const previousTouchRef = useRef<Touch | null>(null);
  const distanceBetweenTouchesRef = useRef<number>(0);

  const windowSize = useWindowSize((state) => state.windowSize);

  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const appendRectangleObject = useCanvasObjects((state) => state.appendRectangleObject);
  const appendEllipseObject = useCanvasObjects((state) => state.appendEllipseObject);
  const appendFreeDrawObject = useCanvasObjects((state) => state.appendFreeDrawObject);
  const appendTextObject = useCanvasObjects((state) => state.appendTextObject);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);
  const appendFreeDrawPointToCanvasObject = useCanvasObjects((state) => state.appendFreeDrawPointToCanvasObject);
  const moveCanvasObject = useCanvasObjects((state) => state.moveCanvasObject);
  const resizeCanvasObject = useCanvasObjects((state) => state.resizeCanvasObject);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const defaultParams = useDefaultParams((state) => state.defaultParams);

  const incrementZoom = useZoom((state) => state.incrementZoom);
  const decrementZoom = useZoom((state) => state.decrementZoom);

  const scrollPosition = useScrollPosition((state) => state.scrollPosition);
  const updateScrollPosition = useScrollPosition((state) => state.updateScrollPosition);

  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);

  const actionMode = useActionMode((state) => state.actionMode);
  const setActionMode = useActionMode((state) => state.setActionMode);

  const zoom = useZoom((state) => state.zoom);

  const initialDrawingPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeObject = canvasObjects.find((canvasObject) => canvasObject.id === activeObjectId);

  const [imageUrl, setImageUrl] = useState<string>('');

  const appendImageObject = useCanvasObjects((state) => state.appendImageObject);
  


  // Screenshot
  useEffect(() => {
    if (takeScreenshot) {
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const base64Image = canvas.toDataURL('image/png').split(',')[1];
          sendImageToAPI(base64Image);
        }
      }, 5000);
    }
      socket.on('connect', () => {
        console.log('Conectado al servidor de WebSocket');
      });
  
      // Recepción de datos de inicio de dibujo
      socket.on('start-drawing', (data) => {
        switch (data.type) {
          case 'free-draw':
            appendFreeDrawObject(data);
            break;
          case 'rectangle':
            appendRectangleObject(data);
            break;
          case 'ellipse':
            appendEllipseObject(data);
            break;
          case 'text':
            appendTextObject(data);
            break;
          default:
            break;
        }
        drawEverything(); // Redibujar después de actualizar el objeto
      });
  
      // Recepción de datos en tiempo real (puntos para free-draw)
      socket.on('drawing-data', (data) => {
        if (data.type === 'free-draw') {
          appendFreeDrawPointToCanvasObject(data.id, { x: data.x, y: data.y });
        } else if (data.type === 'rectangle' || data.type === 'ellipse') {
          // Actualizar posición y tamaño en tiempo real para los rectángulos y elipses
          updateCanvasObject(data.id, {
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
          });
        }
        drawEverything();
      });
  
      // Finalización del dibujo
      socket.on('stop-drawing', (data) => {
        console.log('stop-drawing', data);
        drawEverything(); // Redibujar una vez finalizado el trazo
      });
  
      // Limpiar listeners al desmontar
      return () => {
        socket.off('connect');
        socket.off('start-drawing');
        socket.off('drawing-data');
        socket.off('stop-drawing');
      };
    }, [appendFreeDrawObject, appendRectangleObject, appendEllipseObject, appendTextObject, appendFreeDrawPointToCanvasObject, updateCanvasObject, drawEverything]);
  

  // Función para enviar la imagen a la API
  const sendImageToAPI = async (base64Image: string) => {
    try {

      const response = await axios.post('https://api.learn-board.tech/model/process-image', {
        image: base64Image,
      });

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const resultBase64 = response.data.result;
      commonPushImageObject(`data:image/png;base64,${resultBase64}`)
      handleTakeScreenshot(false);
    } catch (error) {
      console.error('Error al enviar la imagen a la API o al cargar la respuesta:', error);
    }
  };

  //Latex
  useEffect(() => {
    const sendLatexToAPI = async (latex: string) => {
      try {
        const response = await axios.post('https://api.learn-board.tech/model/process-latex', {
          expression: latex,
        });

        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const resultLatex = response.data.result;
        commonPushImageObject(`data:image/png;base64,${resultLatex}`)
        handleTextChange('')
      } catch (error) {
        console.error('Error al enviar la imagen a la API o al cargar la respuesta:', error);
      }
    };

    if (text !== '') {
      setTimeout(() => {
        sendLatexToAPI(text)
      } , 5000)
    }
  });


  // On pointer down

  const onPointerDown = (event: PointerOrTouchEvent) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const clientX = 'clientX' in event ? event.clientX : event.touches[0]?.clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0]?.clientY;

    const relativeMousePosition = getRelativeMousePositionOnCanvas({
      windowMouseX: clientX,
      windowMouseY: clientY,
      canvasWorkingSize,
      scrollPosition,
      zoom,
    });

    initialDrawingPositionRef.current = {
      x: relativeMousePosition.relativeMouseX,
      y: relativeMousePosition.relativeMouseY,
    };
    const createdObjectId = generateUniqueId();

    switch (userMode) {
      case 'icon':
      case 'image':
      case 'select': {
        let isResizing = false;
        
        if (activeObject) {
          const { position, ...boxes } = getControlPoints({
            canvasObject: activeObject,
            zoom,
          });
          Object.entries(boxes).forEach(([boxName, box]) => {
            const isWithinBounds = isCursorWithinRectangle({
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
              relativeMouseX: initialDrawingPositionRef.current.x,
              relativeMouseY: initialDrawingPositionRef.current.y,
            });
            if (isWithinBounds) {
              isResizing = true;
              setActionMode({
                type: 'isResizing',
                option: boxName.split('Box')[0] as ActionModeOption,
              });
            }
          });
        }
        if (!isResizing) {
          const clickedObjects = canvasObjects.filter((canvasObject) => {
            return isCursorWithinRectangle({
              x: canvasObject.x,
              y: canvasObject.y,
              width: canvasObject.width,
              height: canvasObject.height,
              relativeMouseX: initialDrawingPositionRef.current.x,
              relativeMouseY: initialDrawingPositionRef.current.y,
            });
          });
          const clickedObject = clickedObjects[clickedObjects.length - 1];
          const wasClickInsideWorkingCanvas = isCursorWithinRectangle({
            x: 0,
            y: 0,
            width: canvasWorkingSize.width,
            height: canvasWorkingSize.height,
            relativeMouseX: initialDrawingPositionRef.current.x,
            relativeMouseY: initialDrawingPositionRef.current.y,
          });
          const shouldClearSelection = !wasClickInsideWorkingCanvas && clickedObject?.id !== activeObjectId;
          setActiveObjectId(shouldClearSelection ? null : clickedObject?.id || null);
          if (clickedObject) {
            setUserMode('select');
            setActionMode({ type: 'isMoving' });
          } else {
            setActionMode({ type: 'isPanning' });
          }
        }
        drawEverything();
        break;
      }

      case 'free-draw': {
        const freeDrawObject = {
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeColorHex: defaultParams.strokeColorHex,
          strokeWidth: 1,
          opacity: 100,
          freeDrawPoints: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y,
            },
          ],
        };
        appendFreeDrawObject(freeDrawObject);
        setActiveObjectId(createdObjectId);
        setActionMode({ type: 'isDrawing' });

        // Emitir el objeto de dibujo libre al servidor
        socket.emit('start-drawing', { ...freeDrawObject, type: 'free-draw' });
        break;
      }

      case 'rectangle': {
        const rectangleObject = {
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          backgroundColorHex: defaultParams.backgroundColorHex,
          strokeColorHex: defaultParams.strokeColorHex,
          strokeWidth: 0,
          opacity: 100,
          borderRadius: 0,
        };
        appendRectangleObject(rectangleObject);
        setActiveObjectId(createdObjectId);
        setActionMode({ type: 'isDrawing' });

        // Emitir el objeto de rectángulo al servidor
        socket.emit('start-drawing', { ...rectangleObject, type: 'rectangle' });
        break;
      }

      case 'ellipse': {
        const ellipseObject = {
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          backgroundColorHex: defaultParams.backgroundColorHex,
          strokeColorHex: defaultParams.strokeColorHex,
          strokeWidth: 0,
          opacity: 100,
          borderRadius: 0,
        };
        appendEllipseObject(ellipseObject);
        setActiveObjectId(createdObjectId);
        setActionMode({ type: 'isDrawing' });

        // Emitir el objeto de elipse al servidor
        socket.emit('start-drawing', { ...ellipseObject, type: 'ellipse' });
        break;
      }

      case 'text': {
        const textObject = {
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 200,
          height: 100,
          text: 'Add text',
          textAlignHorizontal: 'center',
          textAlignVertical: 'middle',
          textJustify: false,
          fontColorHex: defaultParams.fontColorHex,
          fontSize: 44,
          fontFamily: 'sans-serif',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontVariant: 'normal',
          fontLineHeightRatio: 1,
          opacity: 100,
        };
        appendTextObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 200,
          height: 100,
          text: 'Add text',
          textAlignHorizontal: 'center',
          textAlignVertical: 'middle',
          textJustify: false,
          fontColorHex: defaultParams.fontColorHex,
          fontSize: 44,
          fontFamily: 'sans-serif',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontVariant: 'normal',
          fontLineHeightRatio: 1,
          opacity: 100,
        });
        setActiveObjectId(createdObjectId);
        setUserMode('select');
        setActionMode(null);

        // Emitir el objeto de texto al servidor
        socket.emit('start-drawing', { ...textObject, type: 'text' });
        break;
      }

      default:
        break;
    }
};

  // On pointer move

  const onPointerMove = (event: PointerOrTouchEvent) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !actionMode) return;

    const clientX = 'clientX' in event ? event.clientX : event.touches[0]?.clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0]?.clientY;

    const finger0PageX = 'touches' in event ? event.touches[0]?.pageX : null;
    const finger0PageY = 'touches' in event ? event.touches[0]?.pageY : null;

    const finger1PageX = 'touches' in event ? event.touches[1]?.pageX : null;
    const finger1PageY = 'touches' in event ? event.touches[1]?.pageY : null;

    if (finger0PageX !== null && finger0PageY !== null && finger1PageX !== null && finger1PageY !== null) {
      const distanceBetweenTouches = Math.hypot(finger0PageX - finger1PageX, finger0PageY - finger1PageY);

      if (distanceBetweenTouchesRef.current) {
        if (distanceBetweenTouches > distanceBetweenTouchesRef.current) {
          incrementZoom(1);
        } else if (distanceBetweenTouches < distanceBetweenTouchesRef.current) {
          decrementZoom(1);
        }
      }

      distanceBetweenTouchesRef.current = distanceBetweenTouches;
    }

    const movementX =
      'movementX' in event
        ? event.movementX
        : previousTouchRef.current?.pageX
        ? event.touches[0].pageX - previousTouchRef.current.pageX
        : 0;

    const movementY =
      'movementY' in event
        ? event.movementY
        : previousTouchRef.current?.pageY
        ? event.touches[0].pageY - previousTouchRef.current.pageY
        : 0;

    if ('touches' in event) {
      previousTouchRef.current = event.touches[0];
    }

    const relativeMousePosition = getRelativeMousePositionOnCanvas({
      windowMouseX: clientX,
      windowMouseY: clientY,
      canvasWorkingSize,
      scrollPosition,
      zoom,
    });

    const finalX = relativeMousePosition.relativeMouseX;
    const finalY = relativeMousePosition.relativeMouseY;

    switch (userMode) {
      case 'select': {
        if (activeObjectId && actionMode.type === 'isMoving') {
          moveCanvasObject({
            id: activeObjectId,
            deltaPosition: {
              deltaX: movementX / (zoom / 100),
              deltaY: movementY / (zoom / 100),
            },
            canvasWorkingSize,
          });
        } else if (activeObjectId && actionMode.type === 'isResizing' && actionMode.option) {
          resizeCanvasObject({
            id: activeObjectId,
            actionModeOption: actionMode.option,
            delta: {
              deltaX: movementX / (zoom / 100),
              deltaY: movementY / (zoom / 100),
            },
            canvasWorkingSize,
          });
        } else if (actionMode.type === 'isPanning') {
          updateScrollPosition({
            deltaX: movementX,
            deltaY: movementY,
          });
        }
        break;
      }
      case 'free-draw': {
        if (activeObjectId) {
          appendFreeDrawPointToCanvasObject(activeObjectId, {
            x: finalX,
            y: finalY,
          });
        }
        break;
      }
      case 'rectangle':
      case 'ellipse': {
        if (activeObjectId) {
          const topLeftX = Math.min(initialDrawingPositionRef.current.x, finalX);
          const topLeftY = Math.min(initialDrawingPositionRef.current.y, finalY);

          const width = Math.abs(initialDrawingPositionRef.current.x - finalX);
          const height = Math.abs(initialDrawingPositionRef.current.y - finalY);

          updateCanvasObject(activeObjectId, {
            x: topLeftX,
            y: topLeftY,
            width,
            height,
          });
        }
        break;
      }
      default: {
        break;
      }
    }
    socket.emit('drawing-data', {
      id: activeObjectId,
      x: relativeMousePosition.relativeMouseX,
      y: relativeMousePosition.relativeMouseY,
      type: userMode,
    });
  };

  // On pointer up

  const onPointerUp = (event: PointerOrTouchEvent) => {
    event.preventDefault();
    setActionMode(null);
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    previousTouchRef.current = null;
    if ('touches' in event) {
      distanceBetweenTouchesRef.current = 0;
    }

    const delayInMilliseconds = 300;

    setTimeout(() => {
      switch (userMode) {
        case 'free-draw': {
          context.closePath();
          if (activeObject) {
            const dimensions = getDimensionsFromFreeDraw({
              freeDrawObject: activeObject,
            });
            updateCanvasObject(activeObject.id, {
              width: dimensions.width,
              height: dimensions.height,
            });
          }
          setUserMode('select');
          drawEverything();
          break;
        }
        case 'rectangle':
        case 'ellipse': {
          setUserMode('select');
          drawEverything();
          break;
        }
        default: {
          break;
        }
      }
    }, delayInMilliseconds);
    socket.emit('stop-drawing', { id: activeObjectId });
  };

  const commonPushImageObject = async (url: string) => {
    const imageElement = await getImageElementFromUrl(url);
    const dimensions = await getDimensionsFromImage({
      context: contextRef?.current,
      imageObject: { x: 0, y: 0, imageElement },
    });
    pushImageObject({ imageUrl: url, imageElement, dimensions });
  };

  const pushImageObject = async ({ imageUrl, imageElement, dimensions }: OptionItem) => {
    setImageUrl(imageUrl);
    const createdObjectId = generateUniqueId();
    appendImageObject({
      id: createdObjectId,
      x: 0,
      y: 0,
      width: dimensions.width,
      height: dimensions.height,
      opacity: 100,
      imageUrl,
      imageElement,
    });
    setActiveObjectId(createdObjectId);
    setUserMode('select');
  };


  return (
    <FixedMain
      id={APP_FIXED_MAIN_UNIQUE_ID}
      style={{
        cursor: getCursorFromModes({ userMode, actionMode }),
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      <canvas
        id={CANVAS_CONTROLS_OVERLAY}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`,
          zIndex: theme.layers.canvasElement + 1,
        }}
        width={windowSize.width}
        height={windowSize.height}
      />
      <div
        style={{
          position: 'absolute',
          top: scrollPosition.y,
          left: scrollPosition.x,
          width: `${canvasWorkingSize.width}px`,
          height: `${canvasWorkingSize.height}px`,
          transform: `scale(${zoom / 100})`,
          zIndex: theme.layers.canvasElement,
          backgroundImage: `url(${TRANSPARENT_BACKGROUND_IMAGE})`,
          backgroundColor: 'white',
        }}
      >
        <canvas ref={canvasRef} width={canvasWorkingSize.width} height={canvasWorkingSize.height} />
      </div>
    </FixedMain>
  );
}
