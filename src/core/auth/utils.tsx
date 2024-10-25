import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';
export const USER_ID = 'user_id';

export type TokenType = {
  access: string;
  refresh: string;
};

export type AuthType = {
  userId: string;
  token: TokenType;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getUserId = () => getItem<string>(USER_ID);
export const removeUserId = () => removeItem(USER_ID);
export const setUserId = (value: string) => setItem<string>(USER_ID, value);
