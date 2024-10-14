import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { supabase } from '@/core/supabase';

export default function () {
  GoogleSignin.configure({
    // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    iosClientId:
      '1011241754337-duffrrui2aljrvao1nga5rc2t5mticig.apps.googleusercontent.com',
    webClientId:
      '1011241754337-46vam0qmd59oldacq1fpc93umkgilulk.apps.googleusercontent.com',
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          });
          const userInfo = await GoogleSignin.signIn();
          console.log({ userInfo });
          if (userInfo.data?.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.data.idToken,
            });
            console.log(error, data);
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
      }}
    />
  );
}
