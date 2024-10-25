import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { type UserMetadata } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { useGetProfileByUserId } from '@/api/profile';
import { useAuth } from '@/core';
import { supabase } from '@/core/supabase';

GoogleSignin.configure({
  // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  iosClientId:
    '1011241754337-duffrrui2aljrvao1nga5rc2t5mticig.apps.googleusercontent.com',
  webClientId:
    '1011241754337-46vam0qmd59oldacq1fpc93umkgilulk.apps.googleusercontent.com',
});

export default function Sso() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const [userId, setUserId] = useState<string>('');
  const [metadata, setMetadata] = useState<null | UserMetadata>(null);

  const res = useGetProfileByUserId(userId);

  useEffect(() => {
    if (userId) {
      // Signed in
      if (!res.profileCollection?.edges.length) {
        // Profile not created yet
        router.navigate({
          pathname: '/account-creation',
          params: {
            user_id: userId,
            email: metadata?.email,
            phone: metadata?.phone,
            full_name: metadata?.full_name,
            conn_id: res.profileCollection?.__id,
          },
        });
      } else {
        signIn({
          token: { access: 'access-token', refresh: 'refresh-token' },
          userId,
        });
        router.navigate('/');
      }
    }
  }, [
    router,
    metadata,
    userId,
    signIn,
    res.profileCollection?.edges.length,
    res.profileCollection?.__id,
  ]);

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        if (error) {
          throw error;
        }
        console.log({ data });
        setUserId(data.user?.id);
        setMetadata(data.user?.user_metadata);
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      console.log({ error });
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={async () => handleLogin()}
    />
  );
}
