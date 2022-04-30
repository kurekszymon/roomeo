import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getUserCalendars } from '../utils/google.utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'CalendarChoice'>;

export default function CalendarChoice({ route, navigation }: Props) {
  const { accessToken } = route.params;

  const [userCalendars, setUserCalendars] = useState<CalendarItem[]>([]);
  useEffect(() => {
    getUserCalendars(accessToken as string).then((x) => {
      setUserCalendars(x);
    });

    return () => {};
  }, []);
  //
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={userCalendars}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() =>
                navigation.navigate('Root', {
                  screen: 'Dashboard',
                  params: {
                    chosenCalendar: item.id,
                  },
                })
              }
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
