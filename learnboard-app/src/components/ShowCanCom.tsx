import React, { useState } from 'react';
import HeaderCompiler from './HeaderCompiler';
import Compiler from './Compiler/Complier';
import AppLayout from '~/layouts/AppLayout';
import Canvas from '~/components/Canvas';

const ParentComponent: React.FC = () => {
  const [showCompiler, setShowCompiler] = useState(true);

  const handleShowCompilerChange = (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => {
    setShowCompiler(newShowCompiler);
  };

  return (
    <div>
      {/* Renderizar según el estado */}
      {showCompiler ? (
        <Compiler showCompiler={showCompiler} onShowCompilerChange={handleShowCompilerChange} initialSrc={''} />
      ) : (
        <AppLayout showCompiler={showCompiler} onShowCompilerChange={handleShowCompilerChange} />
      )}
    </div>
  );
};

export default ParentComponent;
