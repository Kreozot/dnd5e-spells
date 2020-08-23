import React from 'react';

import Layout from 'components/layout';
import Spells from 'components/Spells';
import Tour from 'components/Tour';

export default function IndexPage() {
  return (
    <Layout>
      <Tour/>
      <Spells/>
    </Layout>
  );
}
