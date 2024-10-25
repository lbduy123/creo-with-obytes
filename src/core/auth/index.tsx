import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { AuthType, TokenType } from './utils';
import {
  getToken,
  getUserId,
  removeToken,
  removeUserId,
  setToken,
  setUserId,
} from './utils';

interface AuthState {
  userId: string | null;
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (auth: AuthType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  userId: null,
  status: 'idle',
  token: null,
  signIn: (auth: AuthType) => {
    setToken(auth.token);
    setUserId(auth.userId);
    set({ status: 'signIn', token: auth.token, userId: auth.userId });
  },
  signOut: () => {
    removeToken();
    removeUserId();
    set({ status: 'signOut', token: null, userId: null });
  },
  hydrate: () => {
    try {
      const token = getToken();
      const userId = getUserId();
      if (token !== null && userId) {
        get().signIn({ token, userId });
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
export const signIn = (auth: AuthType) => _useAuth.getState().signIn(auth);
export const hydrateAuth = () => _useAuth.getState().hydrate();
