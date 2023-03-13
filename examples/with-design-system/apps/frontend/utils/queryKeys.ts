import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

const usersKeys = createQueryKeys('users', {
  all: null,
  currentUser: (id: string) => [id],
});

const paymentKeys = createQueryKeys('payments', {
  prices: null,
});

export const queryKeys = mergeQueryKeys(usersKeys, paymentKeys);
