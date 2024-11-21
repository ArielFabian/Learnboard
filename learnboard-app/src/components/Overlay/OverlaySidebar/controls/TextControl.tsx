import { Slider, NativeSelect, Textarea, Button, Tooltip } from '@mantine/core';
import React, { type ReactNode } from 'react';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaItalic, FaSortAmountUp } from 'react-icons/fa';
import { MdAlignVerticalTop, MdAlignVerticalCenter, MdAlignVerticalBottom } from 'react-icons/md';
import styled from 'styled-components';

import ColorPicker from '~/components/ColorPicker/ColorPicker';
import useActiveObjectId from '~/store/useActiveObjectId';
import useAvailableFonts from '~/store/useAvailableFonts';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';
import theme from '~/theme';

import ControlHeader from '../components/ControlHeader';
import { useCanvasActions } from '~/components/Canvas';

const TextParamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: ${theme.variables.sidebarGutter};
`;

export default function TextControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const availableFonts = useAvailableFonts((state) => state.availableFonts);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  const { handleUpdateObject } = useCanvasActions(); // Obtener el método para manejar cambios mediante sockets

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  const updateObjectWithSocket = (updates: Partial<typeof activeObject>) => {
    if (!activeObject) return;
    handleUpdateObject(activeObject.id, updates); // Emitir cambios por sockets
    updateCanvasObject(activeObject.id, updates); // Actualizar localmente
  };

  const textAlignOptions: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isActive: boolean;
  }[] = [
    {
      label: 'Left',
      icon: <FaAlignLeft />,
      onClick: () => updateObjectWithSocket({ textAlignHorizontal: 'left' }),
      isActive: activeObject.textAlignHorizontal === 'left',
    },
    {
      label: 'Center',
      icon: <FaAlignCenter />,
      onClick: () => updateObjectWithSocket({ textAlignHorizontal: 'center' }),
      isActive: activeObject.textAlignHorizontal === 'center',
    },
    {
      label: 'Right',
      icon: <FaAlignRight />,
      onClick: () => updateObjectWithSocket({ textAlignHorizontal: 'right' }),
      isActive: activeObject.textAlignHorizontal === 'right',
    },
    {
      label: 'Justify',
      icon: <FaAlignJustify />,
      onClick: () => updateObjectWithSocket({ textJustify: !activeObject.textJustify }),
      isActive: activeObject.textJustify,
    },
    {
      label: 'Top',
      icon: <MdAlignVerticalTop />,
      onClick: () => updateObjectWithSocket({ textAlignVertical: 'top' }),
      isActive: activeObject.textAlignVertical === 'top',
    },
    {
      label: 'Middle',
      icon: <MdAlignVerticalCenter />,
      onClick: () => updateObjectWithSocket({ textAlignVertical: 'middle' }),
      isActive: activeObject.textAlignVertical === 'middle',
    },
    {
      label: 'Bottom',
      icon: <MdAlignVerticalBottom />,
      onClick: () => updateObjectWithSocket({ textAlignVertical: 'bottom' }),
      isActive: activeObject.textAlignVertical === 'bottom',
    },
  ];

  const fontStyleOptions: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isActive: boolean;
  }[] = [
    {
      label: 'Bold',
      icon: <FaBold />,
      onClick: () =>
        updateObjectWithSocket({
          fontWeight: activeObject.fontWeight === 'normal' ? 'bold' : 'normal',
        }),
      isActive: activeObject.fontWeight === 'bold',
    },
    {
      label: 'Italic',
      icon: <FaItalic />,
      onClick: () =>
        updateObjectWithSocket({
          fontStyle: activeObject.fontStyle === 'normal' ? 'italic' : 'normal',
        }),
      isActive: activeObject.fontStyle === 'italic',
    },
    {
      label: 'Small Caps',
      icon: <FaSortAmountUp />,
      onClick: () =>
        updateObjectWithSocket({
          fontVariant: activeObject.fontVariant === 'normal' ? 'small-caps' : 'normal',
        }),
      isActive: activeObject.fontVariant === 'small-caps',
    },
  ];

  return (
    <>
      <ControlHeader title="Text" />
      <Textarea
        key={`text-input-${activeObject.id}`}
        size="xs"
        value={activeObject.text}
        onChange={(event) =>
          updateObjectWithSocket({
            text: event.target.value,
          })
        }
      />
      <ControlHeader title="Text Align" />
      <TextParamsGrid>
        {textAlignOptions.map(({ label, icon, onClick, isActive }) => (
          <Tooltip key={label} label={label} position="top">
            <Button variant={isActive ? 'outline' : 'default'} color="dark" size="xs" onClick={onClick}>
              {icon}
            </Button>
          </Tooltip>
        ))}
      </TextParamsGrid>
      <ControlHeader title="Font Family" />
      <NativeSelect
        key={`font-family-select-${activeObject.id}`}
        size="xs"
        data={[
          { value: 'cursive', label: 'Cursive' },
          { value: 'fantasy', label: 'Fantasy' },
          { value: 'monospace', label: 'Monospace' },
          { value: 'sans-serif', label: 'Sans-serif' },
          { value: 'serif', label: 'Serif' },
          ...availableFonts.map((fontFamily) => ({
            value: fontFamily,
            label: fontFamily,
          })),
        ]}
        value={activeObject.fontFamily}
        onChange={(event) =>
          updateObjectWithSocket({
            fontFamily: event.target.value,
          })
        }
      />
      <ControlHeader title="Font Color" />
      <ColorPicker
        key={`font-color-picker-${activeObject.id}`}
        color={activeObject.fontColorHex}
        onChange={(color) => {
          updateObjectWithSocket({ fontColorHex: color });
          setDefaultParams({ fontColorHex: color });
        }}
      />
      <ControlHeader title="Font Style" />
      <TextParamsGrid>
        {fontStyleOptions.map(({ label, icon, onClick, isActive }) => (
          <Tooltip key={label} label={label} position="top">
            <Button variant={isActive ? 'outline' : 'default'} color="dark" size="xs" onClick={onClick}>
              {icon}
            </Button>
          </Tooltip>
        ))}
      </TextParamsGrid>
      <ControlHeader title="Font Size" />
      <Slider
        key={`font-size-slider-${activeObject.id}`}
        size="sm"
        min={1}
        max={400}
        value={activeObject.fontSize}
        onChange={(value) =>
          updateObjectWithSocket({
            fontSize: value,
          })
        }
        label={(value) => `${value} px`}
      />
    </>
  );
}
