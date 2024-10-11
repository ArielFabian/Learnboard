import React, { useState } from 'react';
import styled from 'styled-components';

import OverlayMenu from '~/components/Overlay/OverlayMenu';
import OverlayNavbar from '~/components/Overlay/OverlayNavbar';
import OverlaySidebar from '~/components/Overlay/OverlaySidebar';
import OverlayZoom from '~/components/Overlay/OverlayZoom';
import theme from '~/theme';

const FixedDiv = styled.div`
  pointer-events: none;
  position: fixed;
  top: ${theme.variables.overlayGutter};
  bottom: ${theme.variables.overlayGutter};
  left: ${theme.variables.overlayGutter};
  right: ${theme.variables.overlayGutter};
  z-index: ${theme.layers.overlay};
  user-select: none;
`;

const TopDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.variables.overlayGutter};
`;

const LeftDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${theme.variables.sidebarWidth};

  ${theme.medias.gteSmall} {
    top: calc(${theme.variables.topNavbarHeight} + ${theme.variables.overlayGutter});
  }
`;

const BottomRightDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default function Overlay({
  showCompiler,
  onShowCompilerChange,
  onTextChange,
}: {
  handleClick: () => void;
  onTextChange: (text: string) => void;
  showCompiler: boolean;
  onShowCompilerChange: (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => void;
}) {
  const [text, setText] = useState('');

  const handleClick = () => {
    onTextChange(text); // Llama a la función del padre para actualizar el texto
  };
  return (
    <FixedDiv>
      <TopDiv>
        <OverlayNavbar
          showCompiler={showCompiler}
          onShowCompilerChange={onShowCompilerChange}
          onTextChange={onTextChange}
          handleClick={handleClick}
        />
        <OverlayMenu />
      </TopDiv>
      <BottomRightDiv>
        <OverlayZoom />
      </BottomRightDiv>
      <LeftDiv>
        <OverlaySidebar />
      </LeftDiv>
    </FixedDiv>
  );
}
