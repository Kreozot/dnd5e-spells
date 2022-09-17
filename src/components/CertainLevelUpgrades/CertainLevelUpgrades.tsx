import React, { FC, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { getCurrentValueForCertainLevelUpgrade } from 'common/higherLevel';

import * as styles from './CertainLevelUpgrades.module.scss';
import { State } from 'common/store';

// Translates <AtHigherLevels initial="1 beast" upgrades="5:2 beasts;7:3 beasts;9:4 beasts"/> into value relevant for spell slot level
type Props = {
  initial: string;
  spellLevel: number;
  spellTitle: string;
  upgrades: string | {[level: string]: string};
  hint?: string;
};

const CertainLevelUpgrades: FC<Props & ReduxProps> = (props) => {
  const { initial, spellLevel, currentLevel, upgrades, hint } = props;

  const upgradesMap = useMemo(() => {
    if (typeof upgrades === 'string') {
      // TODO: Export function with same logic in LevelUpgrades
      return upgrades.split(';')
        .reduce<{[level: string]: string}>((result, part) => {
          const [level, value] = part.split(':');
          return {
            ...result,
            [level]: value
          };
        }, {});
    }
    return upgrades;
  }, [upgrades]);

  const currentValue = useMemo(() => {
    return getCurrentValueForCertainLevelUpgrade(currentLevel, { initial, ...upgradesMap });
  }, [currentLevel, initial, upgradesMap]);

  const tooltipText = useMemo(() => {
    return (
      <>
        <ul>
          { Boolean(initial) &&
            <li>{ initial } at { spellLevel } spell slot level</li>
          }
          { Object.keys(upgradesMap)
            .map((level) => <li key={ level }>{ upgradesMap[level] } at { level } spell slot level</li>)
          }
        </ul>
        { Boolean(hint) &&
          <p className={ styles.hint }>{ hint }</p>
        }
      </>
    );
  }, [initial, spellLevel, upgradesMap, hint]);

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

export default connector(CertainLevelUpgrades);
