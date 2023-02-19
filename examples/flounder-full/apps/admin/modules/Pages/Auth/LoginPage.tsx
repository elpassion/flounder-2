import React, { FC } from 'react';
import Image from 'next/image';
import { AntdLayout } from '@pankod/refine-antd';
import { CustomSignInForm } from '../../CustomSignInForm';

export const LoginPage: FC = () => {
  return (
    <AntdLayout
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
        backgroundSize: 'cover',
      }}
    >
      <div className="h-screen flex w-screen">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="mb-7">
            <Image src="/icons/refine.svg" alt="Refine" width={202} height={55} priority />
          </div>
          <CustomSignInForm />
        </div>
      </div>
    </AntdLayout>
  );
};
