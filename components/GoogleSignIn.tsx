import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, View } from 'react-native';

import { GOOGLE_EXPO_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

export function GoogleSignIn(props: any) {
  console.log(props.navigation);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      console.log(authentication);

      props.navigation.navigate('Root');
    }
  }, [response]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
