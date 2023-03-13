import classNames from 'classnames';
import { useAuth } from '@flounder/cognito-auth';

// Facebook auth button should be consistent with requirements:
// https://developers.facebook.com/docs/facebook-login/userexperience/

export interface FacebookButtonProps {
  fullWidth?: boolean;
  className?: string;
  text: string;
}

export const FacebookButton = ({
  fullWidth,
  className,
  text,
}: FacebookButtonProps) => {
  const { cognitoApi } = useAuth();
  return (
    <button
      className={classNames(
        'py-2 px-3 rounded-md text-sm leading-0 shadow-sm font-medium whitespace-nowrap bg-facebookButton hover:hoveredFacebookButton text-white border border-facebookButton hover:border-hoveredFacebookButton',
        { 'w-full': fullWidth },
        className
      )}
      onClick={() => cognitoApi?.signInWithFacebook()}
    >
      <span className="flex justify-center items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-socialButtonIcon aspect-square"
        >
          <path
            fill="#fff"
            d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
          />
        </svg>
        <span className="w-full justify-center">{text}</span>
      </span>
    </button>
  );
};
