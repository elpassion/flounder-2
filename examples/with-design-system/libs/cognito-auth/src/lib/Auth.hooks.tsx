import { useCallback, useState } from 'react';
import { useAuth } from './AuthContext';
import { TSignIn } from '@flounder/contracts';

import {
  CognitoError,
  CognitoErrorCode,
  UserNotConfirmedError,
} from './Auth.interface';

export const useSignIn = () => {
  const [isProcessing, setProcessing] = useState(false);
  const { cognitoApi } = useAuth();

  const signIn = useCallback(async ({ mail, password }: TSignIn) => {
    try {
      setProcessing(true);
      return await cognitoApi?.signIn(mail, password);
    } catch (error) {
      const cognitoError = error as CognitoError;
      if (cognitoError.code === CognitoErrorCode.UserNotConfirmedException) {
        throw new UserNotConfirmedError(
          cognitoError.code,
          cognitoError.message,
          mail
        );
      }
      throw error;
    } finally {
      setProcessing(false);
    }
  }, []);

  return {
    signIn,
    isProcessing,
  };
};

export const useConfirmUser = () => {
  const [isProcessing, setProcessing] = useState(false);
  const { cognitoApi } = useAuth();

  const resendConfirmationCode = useCallback(async (email: string) => {
    try {
      setProcessing(true);
      const response = await cognitoApi?.resendConfirmationCode(email);
      return response;
    } finally {
      setProcessing(false);
    }
  }, []);

  const confirmUser = useCallback(async (email: string, code: string) => {
    try {
      setProcessing(true);
      await cognitoApi?.confirmUser(email, code);
    } finally {
      setProcessing(false);
    }
  }, []);

  return {
    resendConfirmationCode,
    confirmUser,
    isProcessing,
  };
};

export const useResetPassword = () => {
  const [isProcessing, setProcessing] = useState(false);
  const { cognitoApi } = useAuth();

  const resetPassword = useCallback(async (email: string) => {
    try {
      setProcessing(true);
      return await cognitoApi?.forgotPassword(email);
    } finally {
      setProcessing(false);
    }
  }, []);

  const changePasswordSubmit = useCallback(
    async ({
      email,
      password,
      code,
    }: {
      email: string;
      password: string;
      code: string;
    }) => {
      try {
        setProcessing(true);
        return await cognitoApi?.forgotPasswordSubmit(email, password, code);
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  return {
    resetPassword,
    changePasswordSubmit,
    isProcessing,
  };
};

export const useChangePassword = () => {
  const [isProcessing, setProcessing] = useState(false);
  const { cognitoApi } = useAuth();

  const changePassword = useCallback(
    async ({
      newPassword,
      oldPassword,
    }: {
      newPassword: string;
      oldPassword: string;
    }) => {
      try {
        setProcessing(true);
        return await cognitoApi?.changePassword(oldPassword, newPassword);
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  return {
    changePassword,
    isProcessing,
  };
};
