import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getCurrentLevelClassRestrictions, State } from 'common/store';
import SpellSlotsCountItem from './SpellSlotsCountItem';

import * as styles from './SpellSlotsCount.module.scss';

const SpellSlotsCount: FC<ReduxProps> = (props) => {
  const {
    currentLevelClassRestrictions,
  } = props;

  if (!currentLevelClassRestrictions) {
    return null;
  }

  const values = [
    currentLevelClassRestrictions.cantrips
      && <SpellSlotsCountItem level="cantrip" count={currentLevelClassRestrictions.cantrips} key="cantrip" />,
    ...currentLevelClassRestrictions.spellSlots
      // eslint-disable-next-line react/no-array-index-key
      .map((value, i) => <SpellSlotsCountItem level={i + 1} count={value} key={i} />)
  ]
    .filter((value) => value);

  return (
    <div className={styles.container}>
      Spell slots count: {values}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  currentLevelClassRestrictions: getCurrentLevelClassRestrictions(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellSlotsCount);
