import React from 'react';
import { findAllByText } from '@testing-library/react';
import { GetUsersDto, users } from '@flounder/contracts';
import { RenderContext } from '../../../../test/RenderContext';
import { Users } from '../Users';

describe(Users.name, () => {
  it('should render users returned from api/users', async () => {
    // When
    const { container } = await new UsersObject().render();

    // Then
    const users = await findAllByText(container, /.com$/);
    expect(users).not.toHaveLength(0);
  });
});

class UsersObject {
  constructor() {
    this.withInitialUsers(users);
  }

  public context = new RenderContext();
  public container!: HTMLElement;

  public render = () => {
    const renderResult = this.context.render(<Users />);
    this.container = renderResult.container;
    return this;
  };

  public withInitialUsers = (users: GetUsersDto) => {
    this.context.queryClient.setQueryData(['users'], users);
    return this;
  };
}
