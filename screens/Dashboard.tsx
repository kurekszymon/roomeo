import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Timer, View } from '../components';
import { Clock } from '../components/Clock';
import UpcomingEvents from '../components/UpcomingEvents';
import { RootTabParamList } from '../types';
import { findCurrentEventIndex } from '../utils/google.utils';
import { isPortrait } from '../utils/helpers';

type Props = NativeStackScreenProps<RootTabParamList, 'Dashboard'>;

export default function Dashboard({ navigation, route }: Props) {
  const { fetchedEvents } = route.params;
  const [currentEvent, setCurrentEvent] = useState<IEvent>();
  const separatorStyles = isPortrait()
    ? { marginVertical: 15, height: 2, width: '80%' }
    : {
        marginHorizontal: 25,
        height: '80%',
        width: 2,
      };

  const clearEvent = () => setCurrentEvent(undefined);

  useEffect(() => {
    const [currentEvent] = fetchedEvents.splice(findCurrentEventIndex(fetchedEvents), 1);
    setCurrentEvent(currentEvent);
    return () => {};
  }, [fetchedEvents]);

  return (
    <View style={{ ...styles.container, flexDirection: isPortrait() ? 'column' : 'row' }}>
      {currentEvent ? (
        <Timer
          event={currentEvent}
          clearEvent={clearEvent}
          style={{ marginVertical: 15, marginHorizontal: 50 }}
          size={135}
        />
      ) : (
        <Clock />
      )}
      <View style={separatorStyles} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <UpcomingEvents events={fetchedEvents}></UpcomingEvents>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
