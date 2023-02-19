import React, { FC } from 'react';
import data from '../../../../public/meta.json';
import { Card } from '../card';
import styles from './index.module.css';

export const Cards: FC = () => {
  return (
    <div className={styles.cards}>
      {(data?.plugins ?? []).map(plugin => (
        <div key={`key-${plugin.name}`} className={styles.cardWrapper} data-testid="container">
          <Card title={plugin.name}>{plugin.description}</Card>
        </div>
      ))}
    </div>
  );
};
