import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { GOOGLE_EXPO_CLIENT_ID } from '@env';
import Logo from '../assets/images/googleIcon.svg';
WebBrowser.maybeCompleteAuthSession();

export function GoogleSignIn(props: any) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      // console.log(authentication);

      props.navigation.navigate('Root');
    }
  }, [response]);

  // https://github.com/react-native-google-signin/google-signin
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roomeo</Text>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
        style={styles.googleSignIn}
      >
        <TouchableOpacity style={styles.googleSignInLogo}>
          <Logo style={{ height: 26, width: 26 }} />
        </TouchableOpacity>
        <Text style={styles.googleSignInText}> Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 48,
    fontWeight: '500',
  },
  googleSignInLogo: {
    backgroundColor: '#FFF',
    height: 45,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 1.5,
    borderRadius: 1.5,
  },
  googleSignIn: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    height: 48,
    width: 220,
    borderRadius: 1.5,
  },

  googleSignInText: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 16,
  },
});
