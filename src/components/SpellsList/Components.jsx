import React, { useMemo } from 'react';

import Tooltip from 'components/Tooltip';
import IconCell from './IconCell';

import DiamondIcon from 'images/icon-diamond.svg';
import VoiceIcon from 'images/icon-voice.svg';
import HandIcon from 'images/icon-hand.svg';
import styles from './Components.module.scss';

export default function Components(props) {
  const { components } = props;

  const materialHtml = useMemo(() => {
    const materialPrices = Boolean(components.materialConsumed || components.materialSpecial)
      ? (
        <div className={ styles.specialTooltipBlock }>
          { Boolean(components.materialConsumed) &&
            <div>Consumable: <strong>{ components.materialConsumed } gp</strong></div>
          }
          { Boolean(components.materialSpecial) &&
            <div>Pemanent: <strong>{ components.materialSpecial } gp</strong></div>
          }
        </div>
      )
      : null;

    const materialText = typeof components.M === 'object'
      ? (
        <ul>
          { components.M.map((item) =>
            (<li key={ item }>{ item }</li>)
          ) }
        </ul>
      )
      : <div>{ components.M }</div>;

    return (
      <>
        { materialPrices }
        { materialText }
      </>
    );
  }, [components.M]);

  return (
    <div className={ styles.container }>
      <span>
        { Boolean(components.V) &&
          <IconCell title="Verbal component"><VoiceIcon/></IconCell>
        }
      </span>
      <span>
        { Boolean(components.S) &&
          <IconCell title="Somatic component"><HandIcon/></IconCell>
        }
      </span>
      <span>
        { Boolean(components.M) &&
          <IconCell>
            <Tooltip text={ materialHtml }>
              <div className={ components.materialConsumed || components.materialSpecial ? styles.special : '' }>
                <DiamondIcon/>
              </div>
            </Tooltip>
          </IconCell>
        }
      </span>
    </div>
  )
}
