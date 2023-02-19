import React, { FC } from 'react';
import Image from 'next/image';

export const Logo: FC = () => {
  return (
    <Image data-test="icon" src="/icons/nextjs-icon.svg" alt="nextjs" width="96" height="58" />
  );
};
