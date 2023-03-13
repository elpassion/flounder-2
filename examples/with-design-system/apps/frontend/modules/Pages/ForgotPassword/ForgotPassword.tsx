import React from 'react';
import type { NextPage } from 'next';
import { ForgotPasswordForm } from '../../CustomAuth/ForgotPasswordForm';

export const ForgotPassword: NextPage = () => {
  return (
    <div className="pt-3 flex flex-col items-center">
      <ForgotPasswordForm />
    </div>
  );
};
