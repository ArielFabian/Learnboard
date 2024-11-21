import { Slider } from '@mantine/core';
import React from 'react';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import { useCanvasActions } from '~/components/Canvas';
import ControlHeader from '../components/ControlHeader';

export default function StrokeWidthControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  // Obtén la función handleUpdateObject desde el contexto CanvasActionsContext
  const { handleUpdateObject } = useCanvasActions();

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  const handleStrokeWidthChange = (value:any) => {
    // Actualiza el objeto localmente
    updateCanvasObject(activeObject.id, { strokeWidth: value });

    // Propaga el cambio a través de WebSocket
    handleUpdateObject(activeObject.id, { strokeWidth: value });
  };

  return (
    <>
      <ControlHeader title="Stroke Width" />
      <Slider
        key={`stroke-width-slider-${activeObject.id}`}
        size="sm"
        min={activeObject.type === 'free-draw' ? 1 : 0}
        max={activeObject.type === 'free-draw' ? 100 : Math.floor(Math.min(activeObject.width / 2, activeObject.height / 2))}
        value={activeObject.strokeWidth}
        onChange={handleStrokeWidthChange}
        label={(value) => `${value} px`}
      />
    </>
  );
}
