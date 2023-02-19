import React, { FC } from 'react';
import { Button } from '../button';
import styles from './index.module.css';

export const Main: FC = () => {
  return (
    <div className={styles.main}>
      <h1 data-test="main-heading">superplate</h1>
      <p>The frontend boilerplate with superpowers!</p>
      <Button data-test="docs-btn-anchor">Docs</Button>
    </div>
  );
};
