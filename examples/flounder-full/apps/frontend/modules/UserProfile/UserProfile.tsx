import { useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { Avatar, Link } from '@flounder/ui';
import { common } from 'lang/messages/common';
import { Modal } from 'modules/Layout/components/Modal';
import { Data } from './Data';
import { EditUserProfileButton } from './EditUserProfileButton';
import { EditUserProfileForm } from './EditUserProfileForm';
import { Label } from './Label';
import { List } from './List';
import { Row } from './Row';
import { messages } from './messages';

export const UserProfile = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const intl = useIntl();

  return currentUser ? (
    <div className="pt-3">
      <Modal
        isOpen={isEditProfileModalOpen}
        setIsOpen={setEditProfileModalOpen}
        testId="user-profile-modal"
      >
        <EditUserProfileForm setIsOpen={setEditProfileModalOpen} />
      </Modal>
      <div className="flex flex-col items-center">
        <div className="inline-block relative">
          <Avatar size="big" src={currentUser.avatar_url || ''} />
          <button
            className="w-12 h-12 absolute bottom-0 right-0 block rounded-full text-xl text-white bg-blue-300 ring-2 ring-white hover:bg-blue-400"
            onClick={() => {
              setEditProfileModalOpen(true);
            }}
          >
            +
          </button>
        </div>
        <List>
          <Row>
            <Label>{intl.formatMessage(common.email)}</Label>
            <Data>{currentUser.email || ''}</Data>
          </Row>
          <Row>
            <Label>{intl.formatMessage(common.firstName)}</Label>
            <Data>{currentUser.first_name || ''}</Data>
          </Row>
          <Row>
            <Label>{intl.formatMessage(common.lastName)}</Label>
            <Data>{currentUser.last_name || ''}</Data>
          </Row>
        </List>
        <div className="flex items-center gap-2 pt-4">
          <EditUserProfileButton openModal={() => setEditProfileModalOpen(true)} />
          <Link onClick={() => router.push('/users/change-password')}>
            {intl.formatMessage(messages.changePasswordButton)}
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};
