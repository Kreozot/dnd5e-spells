import React from 'react';

import Tooltip from 'components/Tooltip';
import IconCell from './IconCell';

import DiamondIcon from 'images/icon-diamond.svg';
import VoiceIcon from 'images/icon-voice.svg';
import HandIcon from 'images/icon-hand.svg';
import styles from './Components.module.scss';

export default function Components(props) {
  const { components } = props;

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
            <Tooltip text={ components.M }>
              <div  className={ components.materialConsumed ? styles.consumed : '' }>
              <DiamondIcon/>
              </div>
            </Tooltip>
          </IconCell>
        }
      </span>
    </div>
  )
}
