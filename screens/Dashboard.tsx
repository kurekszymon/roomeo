import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, Timer, View } from '../components';
import { RootTabParamList } from '../types';

type Props = NativeStackScreenProps<RootTabParamList, 'Dashboard'>;

export default function Dashboard({ navigation, route }: Props) {
  const { chosenCalendar } = route.params;

  return (
    <View style={styles.container}>
      <Timer />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Next up</Text>
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
