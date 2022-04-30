import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, Timer, View } from '../components';
import { RootTabParamList } from '../types';
import { isPortrait } from '../utils/helpers';
import { formatDateToHoursMinutes } from '../utils/time.utils';

type Props = NativeStackScreenProps<RootTabParamList, 'Dashboard'>;

export default function Dashboard({ navigation, route }: Props) {
  const { fetchedEvents } = route.params;
  const nextUp = {
    __event: fetchedEvents?.[0],
    name: function () {
      return this.__event.summary;
    },
    start: function () {
      return formatDateToHoursMinutes(this.__event.start.dateTime, this.__event.start.timeZone);
    },
    end: function () {
      return formatDateToHoursMinutes(this.__event.end.dateTime, this.__event.end.timeZone);
    },
  };

  const separatorStyles = isPortrait()
    ? { marginVertical: 30, height: 2, width: '80%' }
    : {
        marginHorizontal: 25,
        height: '80%',
        width: 2,
      };
  return (
    <View style={{ ...styles.container, flexDirection: isPortrait() ? 'column' : 'row' }}>
      <Timer style={{ marginVertical: 30, marginHorizontal: 50 }} size={135} />
      <View style={separatorStyles} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView>
        <Text style={styles.title}>Next up</Text>
        <TouchableOpacity style={styles.nextUp}>
          <Text style={styles.nextUpTitle}>{nextUp.name()}</Text>
          <Text style={styles.nextUpHour}>
            {nextUp.start()} - {nextUp.end()}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  separator: {},
  nextUp: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    width: 210,
    height: 54,
    backgroundColor: 'rgb(3, 155, 229)',
    borderRadius: 5,
  },

  nextUpTitle: { fontWeight: '700', color: 'white' },
  nextUpHour: {
    color: 'white',
  },
});
