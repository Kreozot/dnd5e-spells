import React, { FC, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { declension } from 'common/format';
import { getCurrentValueForEachLevelUpgrade } from 'common/higherLevel';

import * as styles from './EachLevelUpgrades.module.scss';
import { State } from 'common/store';

// Translates <AtHigherLevels initial="5" eachLevelInc="1" postfix="d8"/> into value relevant for spell slot level
type Props = {
  initial: number;
  eachLevelInc: number;
  postfix?: string;
  spellLevel: number;
  spellTitle: string;
  hint?: string;
};

const EachLevelUpgrades: FC<Props & ReduxProps> = (props) => {
  const { initial, eachLevelInc, postfix = '', spellLevel, currentLevel, hint } = props;

  const currentValue = useMemo(() => {
    return getCurrentValueForEachLevelUpgrade(currentLevel, spellLevel, { initial, eachLevelInc, postfix });
  }, [currentLevel, eachLevelInc, initial, spellLevel, postfix]);

  const tooltipText = useMemo(() => {
    return (
      <>
        <span>
          { declension(initial, postfix) } at { spellLevel } spell slot level, on each next spell slot level increases by { declension(eachLevelInc, postfix) }
        </span>
        { Boolean(hint) &&
          <p className={ styles.hint }>{ hint }</p>
        }
      </>
    );
  }, [eachLevelInc, initial, spellLevel, postfix, hint]);

  return (
    <Tooltip text={ tooltipText }>
      <span className={styles.value}>{ currentValue }</span>
    </Tooltip>
  );
}

const mapStateToProps = (state: State, props: Props) => ({
  currentLevel: state.spellsLevels[props.spellTitle] || props.spellLevel,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(EachLevelUpgrades);
