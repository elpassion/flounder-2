# shared-apis
[comment]: <> (Required section: Description & Functionalities)
## Description
A library that contains classes that allow connecting to API (handle requests).

## Functionalities
### UserApi
- connecting to `User` API from `backend` app - getting, updating and creating user data, getting info about current user.

#### Example of use
```ts
import { UserApi } from '@flounder/shared-apis';

const getUsers = async () => {
  const userApi = new UserApi();
  const users = await userApi.getUsers();
}
```
