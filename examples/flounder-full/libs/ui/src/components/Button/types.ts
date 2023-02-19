import { ReactNode } from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
