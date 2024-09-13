import React from 'react';

import PageSEO from '~/components/PageSEO';
import AppLayout from '~/layouts/AppLayout';
import Compiler from '~/components/Compiler/Complier';
import HeaderCompiler from '~/components/Header-Compiler';

export default function Page() {
  return (
    <>
        <HeaderCompiler />
      <PageSEO />
    </>
  );
}
