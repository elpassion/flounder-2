import Image from 'next/image';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import GoogleIcon from '../../../public/icons/google-icon.svg';
import { messages } from './messages';

// Google auth button has to be consistent with guidelines:
// https://developers.google.com/identity/branding-guidelines
// If design of the button doesn't follow the guidelines, it might not work properly:
// https://meta.discourse.org/t/not-compliant-with-google-signin-branding-requirements/99177

export enum GoogleButtonType {
  SIGN_IN = 'Sign in',
  SIGN_UP = 'Sign up',
}

export interface GoogleButtonProps {
  fullWidth?: boolean;
  className?: string;
  type: GoogleButtonType;
}
export const GoogleButton = ({ fullWidth, className, type }: GoogleButtonProps) => {
  const { cognitoApi } = useAuth();
  return (
    <button
      className={classNames(
        'py-2 px-3 rounded-md text-sm leading-0 shadow-sm font-medium whitespace-nowrap bg-white border border-gray-200 text-gray-700 hover:bg-hoveredGoogleButton',
        { 'w-full': fullWidth },
        className,
      )}
      onClick={() => cognitoApi?.signInWithGoogle()}
    >
      <span className="flex justify-center items-center gap-4">
        <GoogleIcon className="w-socialButtonIcon h-socialButtonIcon" />
        <span className="w-full justify-center">
          {type === GoogleButtonType.SIGN_IN ? (
            <FormattedMessage {...messages.googleSignIn} />
          ) : (
            <FormattedMessage {...messages.googleSignUp} />
          )}
        </span>
      </span>
    </button>
  );
};
