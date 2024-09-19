import React from 'react';

import PageSEO from '~/components/PageSEO';
import AppLayout from '~/layouts/AppLayout';
import Compiler from '~/components/Compiler/Complier';
import HeaderCompiler from '~/components/HeaderCompiler';
import ShowCanCom from '~/components/ShowCanCom';

export default function Page() {
  return (
    <>
      {/* <Compiler /> */}
      <ShowCanCom />
      <PageSEO />
    </>
  );
}
