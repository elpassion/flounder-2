import React, { FC } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/pankod"
        target="_blank"
        rel="noreferrer"
        data-testid="pankod-logo"
      >
        <Image data-test="icon" src="/icons/pankod-icon.svg" alt="pankod" width="140" height="28" />
      </a>
      <div className={styles.icons} data-testid="icons-container">
        <a href="https://github.com/pankod" target="_blank" rel="noreferrer">
          <Image
            data-test="icon"
            src="/icons/github-icon.svg"
            alt="github"
            width="28"
            height="29"
          />
        </a>
        <a href="https://twitter.com/PankodDev" target="_blank" rel="noreferrer">
          <Image
            data-test="icon"
            src="/icons/twitter-icon.svg"
            alt="twitter"
            width="28"
            height="28"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCBGOeQkv1XW3ptryLWlQbAQ"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            data-test="icon"
            src="/icons/youtube-icon.svg"
            alt="youtube"
            width="28"
            height="29"
          />
        </a>
        <a href="apps/admin/src/components/css/footer/index" target="_blank" rel="noreferrer">
          <Image
            data-test="icon"
            src="/icons/linkedin-icon.svg"
            alt="linkedin"
            width="28"
            height="32"
          />
        </a>
      </div>
    </div>
  );
};