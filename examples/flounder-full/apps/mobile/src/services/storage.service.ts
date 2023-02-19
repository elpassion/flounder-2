import * as Keychain from 'react-native-keychain';

export interface TokenStorage {
  accessToken: string;
  refreshToken: string;
}

export const TOKEN = 'TOKEN';

export const saveTokensToStorage = async (
  accessToken: string,
  refreshToken: string
) => {
  const tokens: TokenStorage = {
    accessToken,
    refreshToken,
  };

  await Keychain.setGenericPassword(TOKEN, JSON.stringify(tokens));
};

export const retrieveTokensFromStorage =
  async (): Promise<TokenStorage | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const tokens: TokenStorage = JSON.parse(credentials.password);

        return tokens;
      }

      return null;
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

export const resetTokensStorage = async () => {
  await Keychain.resetGenericPassword();
};
