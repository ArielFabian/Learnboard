import React, { useState, useEffect } from 'react';

import Landing from "./components/Landing";

const Compiler: React.FC = () => {
  return <Landing setIsCompilerActive={function (value: React.SetStateAction<boolean>): void {

  } } />;
}

export default Compiler;
