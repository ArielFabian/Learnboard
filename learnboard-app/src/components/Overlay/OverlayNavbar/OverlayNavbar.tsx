import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useRef, useState, type ReactNode } from 'react';
import { BsSquare, BsCircle, BsImageFill } from 'react-icons/bs';
import { FaMousePointer, FaQrcode, FaCode, FaCamera, FaEnvelopeOpenText } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi';
import { RiImageLine } from 'react-icons/ri';
import { RxText } from 'react-icons/rx';
import styled from 'styled-components';

import styles from '~/components/Overlay/OverlayNavbar/OverlayNavbar.module.css';
import type { UserMode } from '~/config/types';
import useActiveObjectId from '~/store/useActiveObjectId';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.variables.overlayItemsGutter};
`;

const Div = styled.div`
  pointer-events: auto;
  background: var(--color-bgPrimary);
  border-radius: 0.25rem;
  padding: 0.3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: 0.0625rem solid var(--color-borderPrimary);
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 0.15rem;
  align-items: center;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  & > li {
    width: 100%;
    height: 100%;
  }
`;

interface UserModeButton {
  mode: UserMode;
  label: string;
  icon: ReactNode;
}

const userModeButtonsPrimary: UserModeButton[] = [
  {
    mode: 'select',
    label: 'Select mode',
    icon: <FaMousePointer />,
  },
];

const userModeButtonsSecondary: UserModeButton[] = [
  {
    mode: 'free-draw',
    label: 'Draw',
    icon: <HiPencil />,
  },
  {
    mode: 'rectangle',
    label: 'Rectangle',
    icon: <BsSquare />,
  },
  {
    mode: 'ellipse',
    label: 'Ellipse',
    icon: <BsCircle />,
  },
  {
    mode: 'text',
    label: 'Text',
    icon: <RxText />,
  },
  {
    mode: 'icon',
    label: 'Icon',
    icon: <RiImageLine />,
  },

  {
    mode: 'image',
    label: 'Image',
    icon: <BsImageFill />,
  },
];

export default function OverlayNavbar({
  showCompiler,
  onShowCompilerChange,
  onTextChange,
  onTakeScreenshotChange,
}: {
  handleLatexClick: () => void;
  onTextChange: (text: string) => void;
  showCompiler: boolean;
  onShowCompilerChange: (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => void;
  onTakeScreenshotChange: (takeScreenshot: boolean) => void;
}) {
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);

  const toggleShowCompiler = () => {
    onShowCompilerChange && onShowCompilerChange(!showCompiler);
  };

  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const currentUrl = window.location.href;

  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referencia al canvas

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState('');

  const handleLatexClick = () => {
    setDropdownOpen(false)
    onTextChange(text);
    setText('');
  };

  const handleTakeScreenshot = (takeScreenshot: boolean) => {
    onTakeScreenshotChange(takeScreenshot);
  }

  const renderSpecialButtons = () => {
    return (
      <Div>
        <Ul>
          <li>
            <Tooltip position="bottom-start" label="Compilador" offset={16}>
              <ActionIcon
                color="dark"
                variant={userMode === 'select' ? 'gradient' : 'dark'}
                size="lg"
                onClick={toggleShowCompiler}
              >
                <FaCode />
              </ActionIcon>
            </Tooltip>
          </li>
          <li>
            <Tooltip position="bottom-start" label="QR" offset={16}>
              <ActionIcon color="dark" variant={userMode === 'select' ? 'gradient' : 'dark'} size="lg" onClick={toggleQR}>
                <FaQrcode />
              </ActionIcon>
            </Tooltip>
          </li>
          <div>
            <Tooltip position="bottom-start" label="Generar expresion" offset={16}>
              <ActionIcon color="dark" variant="filled" size="lg" onClick={() => setDropdownOpen((prev) => !prev)}>
                <FaEnvelopeOpenText />
              </ActionIcon>
            </Tooltip>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  position: 'absolute',
                  top: '60px',
                  left: '0px',
                  zIndex: 10,
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <TextInput type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe un enunciado matematico" />
                <Button onClick={handleLatexClick}>Generar</Button>
              </div>
            )}
          </div>
          <li>
            {/* Botón de captura de pantalla */}
            <Tooltip position="bottom-start" label="Captura de pantalla" offset={16}>
              <ActionIcon
                color="dark"
                variant={userMode === 'select' ? 'gradient' : 'dark'}
                size="lg"
                onClick={() => handleTakeScreenshot(true)}
              >
                <FaCamera />
              </ActionIcon>
            </Tooltip>
          </li>
        </Ul>
      </Div>
    );
  };

  const renderUserModeButtons = (buttons: UserModeButton[]) => (
    <Div>
      <Ul style={{ gridTemplateColumns: `repeat(${buttons.length}, minmax(0, 1fr))` }}>
        {buttons.map(({ mode, label, icon }) => {
          const isActive = userMode === mode;
          return (
            <li key={mode}>
              <Tooltip
                position="bottom-start"
                label={`${label}${label.endsWith('mode') ? '' : ' tool'}${isActive ? ` (active)` : ''}`}
                offset={16}
              >
                <ActionIcon
                  color="dark"
                  variant={isActive ? 'gradient' : 'dark'}
                  size="lg"
                  onClick={() => {
                    setUserMode(mode);
                    setActiveObjectId(null);
                  }}
                >
                  {icon}
                </ActionIcon>
              </Tooltip>
            </li>
          );
        })}
      </Ul>
    </Div>
  );

  return (
    <Nav>
      {renderUserModeButtons(userModeButtonsPrimary)}
      {renderUserModeButtons(userModeButtonsSecondary)}
      {renderSpecialButtons()}
      {showQR && (
        <div className={styles['qr-overlay']}>
          <div className={styles['qr-popup']}>
            <QRCodeCanvas value={currentUrl} size={200} />
            <button className={styles['close-button']} onClick={toggleQR}>
              X
            </button>
          </div>
          <canvas ref={canvasRef} className={styles.resizedCanvas}></canvas>
        </div>
      )}
    </Nav>
  );
}
