import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { formatDateToHoursMinutes } from '../utils/time.utils';

export default function UpcomingEvents({ events }: IUpcomingEventsProps) {
  return (
    <FlatList
      ListHeaderComponent={<Text style={styles.title}>Upcoming Events:</Text>}
      showsVerticalScrollIndicator={false}
      data={events}
      ListEmptyComponent={<Text>There are no upcoming events.</Text>}
      renderItem={({ item: { summary, start, end } }) => {
        const nextUp = {
          summary,
          start: formatDateToHoursMinutes(start.dateTime, start.timeZone),
          end: formatDateToHoursMinutes(end.dateTime, end.timeZone),
        };

        return (
          <TouchableOpacity style={styles.nextUp}>
            <Text style={styles.nextUpTitle}>{nextUp.summary}</Text>
            <Text style={styles.nextUpHour}>
              {nextUp?.start} - {nextUp?.end}
            </Text>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  nextUp: {
    marginVertical: 10,

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

interface IUpcomingEventsProps {
  events: IEvent[];
}
