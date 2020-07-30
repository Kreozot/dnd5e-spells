import React, { useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import data from 'content/spells.yaml';
import Layout from 'components/layout';
import SpellsList from 'components/SpellsList';

const IndexPage = () => {
  const filteredData = data;

  const groupedData = useMemo(() => {
    return groupBy(filteredData, 'level');
  }, [filteredData]);

  const list = useMemo(() => {
    const levels = sortBy(Object.keys(groupedData), (level) => {
      return level === 'cantrip' ? 0 : level;
    });
    return levels.map((level) => (
      <div key={ level }>
        <h2>{ level }</h2>
        <SpellsList data={ groupedData[level] }/>
      </div>
    ));
  }, [groupedData]);

  return (
    <Layout>
      { list }
    </Layout>
  );
}

export default IndexPage
