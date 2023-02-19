import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface IUseS3FileUpload {
  onUpload?: (destinationKey: string) => void;
  imageApi: {
    createFileDestination: (data: {
      fileName: string;
      fileType: string;
      fileSize: number;
    }) => Promise<{ url: string; key: string }>;
  };
  s3Api: {
    putFileToSignedUrl: (url: string, file: File) => Promise<void>;
  };
}

export const useS3FileUpload = ({
  onUpload,
  imageApi,
  s3Api,
}: IUseS3FileUpload) => {
  const [uploadedFile, setUploadedFile] = useState<{
    filePreview?: string;
    fileDestinationKey?: string;
    fileType?: string;
    fileName?: string;
  }>({});

  const { mutate, error, isLoading } = useMutation<void, Error, File>(
    async (file: File) => {
      try {
        const fileDestination = await imageApi.createFileDestination({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        });

        await s3Api.putFileToSignedUrl(fileDestination.url, file);

        const filePreview = URL.createObjectURL(file);

        setUploadedFile({
          filePreview,
          fileDestinationKey: fileDestination.key,
          fileType: file.type,
          fileName: file.name,
        });
        onUpload && onUpload(fileDestination.key);
      } catch (err) {
        throw new Error();
      }
    }
  );

  return {
    filePreview: uploadedFile.filePreview,
    fileDestinationKey: uploadedFile.fileDestinationKey,
    fileType: uploadedFile.fileType,
    fileName: uploadedFile.fileName,
    uploadFile: mutate,
    isLoading,
    error,
  };
};
