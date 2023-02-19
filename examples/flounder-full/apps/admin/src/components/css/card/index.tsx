import React, { ReactNode, FC } from 'react';
import styles from './index.module.css';

type CardProps = {
  title: string;
  children: ReactNode;
};

export const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{title}</div>
      <div>{children}</div>
    </div>
  );
};
