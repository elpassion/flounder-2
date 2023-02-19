import Image from 'next/image';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import FacebookIcon from '../../../public/icons/facebook-icon.svg';
import { messages } from './messages';

// Facebook auth button should be consistent with requirements:
// https://developers.facebook.com/docs/facebook-login/userexperience/

export interface FacebookButtonProps {
  fullWidth?: boolean;
  className?: string;
}
export const FacebookButton = ({ fullWidth, className }: FacebookButtonProps) => {
  const { cognitoApi } = useAuth();
  return (
    <button
      className={classNames(
        'py-2 px-3 rounded-md text-sm leading-0 shadow-sm font-medium whitespace-nowrap bg-facebookButton hover:hoveredFacebookButton text-white border border-facebookButton hover:border-hoveredFacebookButton',
        { 'w-full': fullWidth },
        className,
      )}
      onClick={() => cognitoApi?.signInWithFacebook()}
    >
      <span className="flex justify-center items-center gap-4">
        <FacebookIcon className="w-socialButtonIcon h-socialButtonIcon" />
        <span className="w-full justify-center">
          <FormattedMessage {...messages.facebookSignIn} />
        </span>
      </span>
    </button>
  );
};
