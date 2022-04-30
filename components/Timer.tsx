import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { FlexStyle, StyleProp, StyleSheet } from 'react-native';
import { calculateTimeBetweenTwoDates } from '../utils/time.utils';
import { Donut } from './Donut';
import { Text, View } from './Themed';

export function Timer({ style, size = 100, event, strokeWidth = 12.5, textMarginTop = 20 }: ITimer) {
  const [eventTimeLeft, setEventTimeLeft] = useState(0);
  const [eventEnds, setEventEnds] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const { start, end } = event;

    const eventEnds = calculateTimeBetweenTwoDates(end.dateTime, start.dateTime);
    setEventEnds(eventEnds);

    let interval = setInterval(() => {
      const eventTimeLeft = calculateTimeBetweenTwoDates(end.dateTime);
      setEventTimeLeft(eventTimeLeft);
      setDisplayedText(DateTime.fromMillis(eventTimeLeft).toFormat("mm'm 'ss's"));
    }, 1000);

    if (eventTimeLeft < 0) {
      return clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [event]);

  // TODO Handle clearingInterval, handle 0 mintues
  return (
    <View style={style}>
      <Donut
        value={eventTimeLeft}
        max={eventEnds}
        displayedText={displayedText}
        radius={size}
        strokeWidth={strokeWidth}
      ></Donut>
      <Text style={{ ...styles.text, marginTop: textMarginTop }}>Currently: {event.summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export interface ITimer {
  event: IEvent;
  style?: StyleProp<FlexStyle>;
  size?: number;
  strokeWidth?: number;
  textMarginTop?: number;
}
