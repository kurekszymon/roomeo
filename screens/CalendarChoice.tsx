import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getEventsFromCalendar, getUserCalendars } from '../utils/google.utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'CalendarChoice'>;

export default function CalendarChoice({ route, navigation }: Props) {
  const { accessToken } = route.params;

  const [userCalendars, setUserCalendars] = useState<ICalendarItem[]>([]);

  useEffect(() => {
    getUserCalendars(accessToken as string).then(setUserCalendars);

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={userCalendars}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={async () => {
                navigation.navigate('Root', {
                  screen: 'Dashboard',
                  params: {
                    fetchedEvents: await getEventsFromCalendar(item.id, accessToken as string),
                  },
                });
              }}
            >
              <Text style={{ fontSize: 24, color: 'black' }}>{item.summary}</Text>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
