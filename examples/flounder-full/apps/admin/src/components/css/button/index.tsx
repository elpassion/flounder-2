import React, { DetailedHTMLProps, AnchorHTMLAttributes, FC } from 'react';
import styles from './index.module.css';

export type IButton = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const Button: FC<IButton> = ({ children, ...props }) => {
  return (
    <a
      {...props}
      target="_blank"
      href="apps/admin/src/components/css/button/index"
      rel="noopener noreferrer"
      className={styles.button}
      data-testid="btn"
    >
      {children}
    </a>
  );
};
