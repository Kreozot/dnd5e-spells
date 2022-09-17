import React, { FC } from 'react';

import Layout from 'components/Layout';
import Spells from 'components/Spells';

const IndexPage: FC = () => {
  return (
    <Layout>
      <Spells />
    </Layout>
  );
};

export default IndexPage;
