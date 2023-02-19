import React, { FC } from 'react';
import { Logo } from '../logo';
import styles from './index.module.css';

export const Header: FC = () => {
  return (
    <div className={styles.header} data-testid="container">
      <Logo />
    </div>
  );
};
