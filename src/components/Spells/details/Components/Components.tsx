import React, { FC, useMemo } from 'react';
import classNames from 'classnames';

import Tooltip from 'components/Tooltip';
import Icon from 'components/Icon';

import DiamondIcon from 'images/icon-diamond.svg';
import VoiceIcon from 'images/icon-voice.svg';
import HandIcon from 'images/icon-hand.svg';

import * as styles from './Components.module.scss';

type Props = {
  components: SpellComponents;
  isMobile?: boolean;
};

const Components: FC<Props> = (props) => {
  const { components, isMobile } = props;

  const materialTooltip = useMemo(() => {
    const materialPrices = components.materialConsumed || components.materialSpecial
      ? (
        <div className={styles.specialTooltipBlock}>
          { Boolean(components.materialConsumed)
            && <div>Consumable: <strong>{ components.materialConsumed } gp</strong></div>}
          { Boolean(components.materialSpecial)
            && <div>Permanent: <strong>{ components.materialSpecial } gp</strong></div>}
        </div>
      )
      : null;

    const materialText = typeof components.M === 'object'
      ? (
        <ul>
          { components.M.map((item) => (<li key={item}>{ item }</li>)) }
        </ul>
      )
      : <div>{ components.M }</div>;

    return (
      <>
        { materialPrices }
        { materialText }
      </>
    );
  }, [components]);

  return (
    <div className={classNames(styles.container, { [styles.mobile]: isMobile })}>
      <span>
        { Boolean(components.V)
          && <Icon title="Verbal component"><VoiceIcon /></Icon>}
      </span>
      <span>
        { Boolean(components.S)
          && <Icon title="Somatic component"><HandIcon /></Icon>}
      </span>
      <span>
        { Boolean(components.M)
          && (
            <Icon>
              <Tooltip text={materialTooltip}>
                <div className={components.materialConsumed || components.materialSpecial ? styles.special : ''}>
                  <DiamondIcon />
                </div>
              </Tooltip>
            </Icon>
          )}
      </span>
    </div>
  );
};

export default Components;
