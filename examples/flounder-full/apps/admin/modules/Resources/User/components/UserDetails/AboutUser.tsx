import React, { FC } from 'react';
import { AntdList, Typography } from '@pankod/refine-antd';
import { ExtendedUserDto, GetCognitoUserDto } from '@flounder/contracts';
import { UserAvatarField } from './UserAvatarField';

interface AboutUserProps {
  data: GetCognitoUserDto;
  userBasicData: ExtendedUserDto;
  onUpdate: () => void;
}

export const AboutUser: FC<AboutUserProps> = ({ data, userBasicData, onUpdate }) => {
  const { attributes, enabled, status } = data;
  const { cognito_id, avatar_url } = userBasicData;

  return (
    <AntdList>
      <AntdList.Item>
        <AntdList.Item.Meta
          title={<Typography.Text type={'secondary'}>Email</Typography.Text>}
          description={<Typography.Text>{attributes.email}</Typography.Text>}
        />
      </AntdList.Item>

      <AntdList.Item>
        <AntdList.Item.Meta
          title={<Typography.Text type={'secondary'}>Is blocked</Typography.Text>}
          description={
            enabled ? (
              <Typography.Text>No</Typography.Text>
            ) : (
              <Typography.Text type={'danger'}>Yes</Typography.Text>
            )
          }
        />
      </AntdList.Item>

      <AntdList.Item>
        <AntdList.Item.Meta
          title={<Typography.Text type={'secondary'}>Email status</Typography.Text>}
          description={<Typography.Text>{status}</Typography.Text>}
        />
      </AntdList.Item>

      <AntdList.Item>
        <AntdList.Item.Meta
          title={<Typography.Text type={'secondary'}>Avatar</Typography.Text>}
          description={<UserAvatarField url={avatar_url} userId={cognito_id} onChange={onUpdate} />}
        />
      </AntdList.Item>
    </AntdList>
  );
};
