import React from 'react';
import  Welcome from '~/components/Welcome/Welcome';
import PageSEO from '~/components/PageSEO';

export default function Page() {
  return (
    <>
        <PageSEO />
        <Welcome />
    </>
  );
};