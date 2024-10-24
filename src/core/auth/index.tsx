import { create } from 'zustand';

import { getItem, removeItem, setItem } from '../storage';
import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken, USER_ID } from './utils';

interface AuthState {
  userId: string | null;
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (token: TokenType, userId: string) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  userId: null,
  status: 'idle',
  token: null,
  signIn: (token, userId) => {
    setToken(token);
    setItem(USER_ID, userId);
    set({ status: 'signIn', token, userId });
  },
  signOut: () => {
    removeToken();
    removeItem(USER_ID);
    set({ status: 'signOut', token: null, userId: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const userId = getItem<string>(USER_ID);
      if (userToken !== null) {
        get().signIn(userToken, userId);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType, userId: string) =>
  _useAuth.getState().signIn(token, userId);
export const hydrateAuth = () => _useAuth.getState().hydrate();
