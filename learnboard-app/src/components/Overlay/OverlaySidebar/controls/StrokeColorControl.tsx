import React from 'react';

import ColorPicker from '~/components/ColorPicker/ColorPicker';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';
import { useCanvasActions } from '~/components/Canvas';

import ControlHeader from '../components/ControlHeader';

export default function StrokeColorControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  // Obtén la función handleUpdateObject desde el contexto CanvasActionsContext
  const { handleUpdateObject } = useCanvasActions();

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  const handleStrokeColorChange = (color:any) => {
    // Actualiza el objeto localmente
    updateCanvasObject(activeObject.id, {
      strokeColorHex: color,
    });

    // Actualiza los valores predeterminados
    setDefaultParams({
      strokeColorHex: color,
    });

    // Propaga el cambio a través de WebSocket
    handleUpdateObject(activeObject.id, { strokeColorHex: color });
  };

  return (
    <>
      <ControlHeader title="Stroke Color" />
      <ColorPicker
        key={`stroke-color-picker-${activeObject.id}`}
        color={activeObject.strokeColorHex}
        onChange={handleStrokeColorChange}
      />
    </>
  );
}
