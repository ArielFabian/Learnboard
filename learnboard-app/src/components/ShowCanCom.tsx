import React, { useState } from 'react';

import Compiler from './Compiler/Complier';

import AppLayout from '~/layouts/AppLayout';

const ParentComponent: React.FC = () => {
  const [showCompiler, setShowCompiler] = useState(false);

  const handleShowCompilerChange = (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => {
    setShowCompiler(newShowCompiler);
  };

  return (
    <div>
      <div style={{display: showCompiler ? 'none' : 'block'}}>
        <AppLayout showCompiler={showCompiler} onShowCompilerChange={handleShowCompilerChange} />
      </div>
      <div style={{display: showCompiler ? 'block': 'none'}}>
        <Compiler showCompiler={showCompiler} onShowCompilerChange={handleShowCompilerChange} initialSrc={''} />
      </div>
    </div>
  );
};

export default ParentComponent;
