import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { UseMutateFunction } from '@tanstack/react-query';
import { Avatar } from '../Avatar';

export type AvatarUploadProps = InputHTMLAttributes<HTMLInputElement> & {
  loading?: boolean;
  onUpload: UseMutateFunction<void, Error, File, unknown>;
  loadingText: string;
  uploadText: string;
  filePreview?: string | null;
  fileName?: string;
  maxFileSize?: number;
  // [1]
  defaultImage?: string | null; // @todo: Refactor frontend/admin, pass default and make required
};

export const AvatarUpload = forwardRef<HTMLInputElement, AvatarUploadProps>(
  ({ ...props }: AvatarUploadProps, ref) => {
    const {
      value,
      onUpload,
      filePreview,
      loading,
      fileName,
      maxFileSize = 1,
      loadingText,
      uploadText,
      defaultImage,
      ...rest
    } = props;

    return (
      <div
        className={classNames('w-full flex gap-4 items-center', {
          'pointer-events-none': loading,
        })}
      >
        {/* [1] */}
        <Avatar src={filePreview || defaultImage!} size="medium" />
        <label
          htmlFor={rest.name}
          className="block border py-2 px-3 rounded-md text-sm leading-0 shadow-sm font-medium bg-white border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300 focus:border-gray-300 focus:outline focus:outline-1 focus:outline-gray-300 whitespace-nowrap"
        >
          {loading ? loadingText : uploadText}
        </label>
        <input
          ref={ref}
          type="file"
          {...rest}
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length) {
              if (e.target.files[0].size > maxFileSize * 1024 * 1024) {
                return alert(
                  `File is too big. The maximum size is ${maxFileSize}mb`
                );
              }
              onUpload(e.target.files[0]);
            }
          }}
          hidden
        />
      </div>
    );
  }
);
