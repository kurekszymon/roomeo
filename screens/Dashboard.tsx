import React from 'react';
import { StyleSheet } from 'react-native';

import { EditScreenInfo, Text, Timer, View } from '../components';
import { RootTabScreenProps } from '../types';

export default function Dashboard({ navigation }: RootTabScreenProps<'Dashboard'>) {
  return (
    <View style={styles.container}>
      <Timer />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Future Meetings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: '80%',
  },
});
