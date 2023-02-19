import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar, Button, Icons, Upload, UploadProps, Space } from '@pankod/refine-antd';
import { useNotification } from '@pankod/refine-core';
import { useS3FileUpload } from '@flounder/next-utils';
import { ImageApi, S3Api, useApi } from '../../../../Api';

interface UserAvatarFieldProps {
  url: string | null;
  userId: string;
  onChange: () => void;
}

const EmptyAvatar = () => (
  <Avatar size={60} style={{ backgroundColor: 'white', border: '1px solid lightgrey' }} />
);

const AvatarWithImg = ({ url }: { url: string }) => {
  return (
    <Avatar
      size={60}
      src={<Image src={url} fill style={{ objectFit: 'contain' }} sizes="100%" alt="" />}
    />
  );
};

const uploadProps: UploadProps = {
  showUploadList: false,
};

export const UserAvatarField = ({ url, userId, onChange }: UserAvatarFieldProps) => {
  const [editMode, setEditMode] = useState(false);
  const [avatarKey, setAvatarKey] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const notification = useNotification();
  const { updateUser } = useApi();

  const {
    uploadFile,
    filePreview,
    error: errorUploadingFile,
    isLoading: isAvatarUploadingInProgress,
  } = useS3FileUpload({
    onUpload: avatarKey => {
      setAvatarKey(avatarKey);
    },
    imageApi: new ImageApi(),
    s3Api: new S3Api(),
  });

  if (errorUploadingFile) {
    notification.open({
      type: 'error',
      message: 'Sth goes wrong during uploading photo',
    });
  }

  useEffect(() => {
    if (!filePreview) return;
    setAvatarUrl(filePreview);
  }, [avatarKey]);

  const closeEditMode = () => {
    setAvatarUrl(url);
    setEditMode(false);
  };

  const finishChangeAvatarAction = (message: string) => {
    onChange();
    setEditMode(false);
    notification.open({
      type: 'success',
      message: message,
    });
  };

  const submitAvatar = async () => {
    try {
      await updateUser(userId, { avatar_key: avatarKey });
      finishChangeAvatarAction('New avatar successfully submitted');
    } catch (error) {
      setAvatarUrl(url);
      notification.open({
        type: 'error',
        description: 'Sth went wrong with submitting avatar',
        message: error.message,
      });
    }
  };

  const deleteAvatar = async () => {
    try {
      await updateUser(userId, { avatar_key: null });
      setAvatarUrl(null);
      finishChangeAvatarAction('Avatar successfully deleted');
    } catch (error) {
      notification.open({
        type: 'error',
        description: 'Sth went wrong with deleting photo',
        message: error.message,
      });
    }
  };

  const { DeleteOutlined } = Icons;

  if (!editMode)
    return (
      <Space align="center" size={10}>
        {avatarUrl ? <AvatarWithImg url={avatarUrl} /> : <EmptyAvatar />}
        <Button onClick={() => setEditMode(true)}>Edit Avatar</Button>
        {avatarUrl && (
          <Button danger onClick={deleteAvatar}>
            Delete <DeleteOutlined />
          </Button>
        )}
      </Space>
    );

  if (editMode)
    return (
      <Space align="center" size={10}>
        {avatarUrl ? <AvatarWithImg url={avatarUrl} /> : <EmptyAvatar />}
        <Upload {...uploadProps} beforeUpload={file => uploadFile(file)}>
          <Button loading={isAvatarUploadingInProgress}>Upload photo</Button>
        </Upload>
        <Button type={'primary'} onClick={submitAvatar} disabled={!avatarKey}>
          Submit photo
        </Button>
        <Button danger onClick={closeEditMode}>
          Cancel
        </Button>
      </Space>
    );
};
