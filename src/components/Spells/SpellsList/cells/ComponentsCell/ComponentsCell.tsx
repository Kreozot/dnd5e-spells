import React, { FC, useMemo } from 'react';
import classNames from 'classnames';

import Tooltip from 'components/Tooltip';

import DiamondIcon from 'images/icon-diamond.svg';
import VoiceIcon from 'images/icon-voice.svg';
import HandIcon from 'images/icon-hand.svg';
import IconCell from '../IconCell';
import * as styles from './ComponentsCell.module.scss';

type Props = {
  components: SpellComponents;
  isMobile?: boolean;
};

const ComponentsCell: FC<Props> = (props) => {
  const { components, isMobile } = props;

  const materialHtml = useMemo(() => {
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
          && <IconCell title="Verbal component"><VoiceIcon /></IconCell>}
      </span>
      <span>
        { Boolean(components.S)
          && <IconCell title="Somatic component"><HandIcon /></IconCell>}
      </span>
      <span>
        { Boolean(components.M)
          && (
            <IconCell>
              <Tooltip text={materialHtml}>
                <div className={components.materialConsumed || components.materialSpecial ? styles.special : ''}>
                  <DiamondIcon />
                </div>
              </Tooltip>
            </IconCell>
          )}
      </span>
    </div>
  );
};

export default ComponentsCell;
