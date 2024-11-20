import { Button } from '@mantine/core';
import React from 'react';
import { MdControlPointDuplicate, MdOutlineDelete } from 'react-icons/md';
import styled from 'styled-components';
import { useCanvasActions } from '~/components/Canvas';


import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import generateUniqueId from '~/utils/generateUniqueId';

import ControlHeader from '../components/ControlHeader';

const ActionsUl = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, auto));
  grid-gap: 6px;
`;

export default function ActionsControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);
  const { handleDeleteObject } = useCanvasActions(); // Usar el método desde el contexto

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const appendRectangleObject = useCanvasObjects((state) => state.appendRectangleObject);
  const appendFreeDrawObject = useCanvasObjects((state) => state.appendFreeDrawObject);
  const appendTextObject = useCanvasObjects((state) => state.appendTextObject);

  const deleteCanvasObject = useCanvasObjects((state) => state.deleteCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);


  if (!activeObject) {
    return null;
  }

  return (
    <>
      <ControlHeader title="Actions" />
      <ActionsUl>
        <li>
          <Button
            leftIcon={<MdControlPointDuplicate />}
            variant="default"
            size="xs"
            onClick={() => {
              const newId = generateUniqueId();
              const duplicatedObject = {
                ...activeObject,
                id: newId,
                x: activeObject.x + 50,
                y: activeObject.y + 50,
              };
              switch (activeObject.type) {
                case 'free-draw':
                  appendFreeDrawObject(duplicatedObject);
                  break;
                case 'text':
                  appendTextObject(duplicatedObject);
                  break;
                case 'rectangle':
                default:
                  appendRectangleObject(duplicatedObject);
                  break;
              }
              setActiveObjectId(newId);
            }}
          >
            Duplicate
          </Button>
        </li>
        <li>
          <Button
            leftIcon={<MdOutlineDelete />}
            variant="default"
            size="xs"
            onClick={() => {
              
              handleDeleteObject(activeObject.id); // Llama al método para emitir y eliminar
              setActiveObjectId(null);
            }}
          >
            Delete
          </Button>
        </li>
      </ActionsUl>
    </>
  );
}
