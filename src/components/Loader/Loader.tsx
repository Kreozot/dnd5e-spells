import React, { FC, useEffect } from 'react';

import * as styles from './Loader.module.scss';

const Loader: FC<{}> = () => {
  useEffect(() => () => {
    clearInterval((window as any).diceInterval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dice}>
        <figure className={styles.face01}>1</figure>
        <figure className={styles.face02}>2</figure>
        <figure className={styles.face03}>3</figure>
        <figure className={styles.face04}>4</figure>
        <figure className={styles.face05}>5</figure>
        <figure className={styles.face06}>6</figure>
        <figure className={styles.face07}>7</figure>
        <figure className={styles.face08}>8</figure>
        <figure className={styles.face09}>9</figure>
        <figure className={styles.face10}>10</figure>
        <figure className={styles.face11}>11</figure>
        <figure className={styles.face12}>12</figure>
        <figure className={styles.face13}>13</figure>
        <figure className={styles.face14}>14</figure>
        <figure className={styles.face15}>15</figure>
        <figure className={styles.face16}>16</figure>
        <figure className={styles.face17}>17</figure>
        <figure className={styles.face18}>18</figure>
        <figure className={styles.face19}>19</figure>
        <figure className={styles.face20}>20</figure>
      </div>
    </div>
  );
};

export default Loader;
