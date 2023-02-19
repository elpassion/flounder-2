const tokens = {
  accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2Njg2NzYyNjMsImV4cCI6MjAxNTgzMTQ2MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.327jdvKnSVUajyXMyFQqTpzFjTFlSsxlSjRnkTw2wvo',
  refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2Njg2NzYyNjMsImV4cCI6MjAxNTgzMTQ2MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.327jdvKnSVUajyXMyFQqTpzFjTFlSsxlSjRnkTw2wvo'
};

const credentials = {
  username: 'TOKEN',
  password: JSON.stringify(tokens)
};

export const setGenericPassword = jest.fn(
  (username, password) => {
    return new Promise((resolve, reject) => resolve(true));
  }
);

export const getGenericPassword = jest.fn(
  () => {
    return new Promise((resolve, reject) => resolve(credentials));
  }
);

export const resetGenericPassword = jest.fn(() => {
  return new Promise((resolve, reject) => resolve(true))
});
