import React from 'react';
import { useIntl } from 'react-intl';
import { useS3FileUpload } from '@flounder/next-utils';
import { AvatarUpload } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { ImageApi, S3Api } from 'modules/Api';
import { useFieldContext } from '../Form';

interface IS3FileInput {
  defaultPreview?: string | null;
}

export function S3FileInput({ defaultPreview }: IS3FileInput) {
  const { field } = useFieldContext();
  const { uploadFile, isLoading, filePreview, fileName } = useS3FileUpload({
    onUpload: field.onChange,
    imageApi: new ImageApi(),
    s3Api: new S3Api(),
  });
  const intl = useIntl();

  return (
    <AvatarUpload
      {...field}
      fileName={fileName}
      loading={isLoading}
      onUpload={uploadFile}
      id={field.name}
      filePreview={filePreview || defaultPreview}
      loadingText={intl.formatMessage(common.loading)}
      uploadText={intl.formatMessage(common.uploadPhoto)}
    />
  );
}
