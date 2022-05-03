import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { FlexStyle, StyleProp, StyleSheet } from 'react-native';
import { Donut } from './Donut';
import { Text, View } from './Themed';
import { formatDateToHoursMinutes, getCurrentTimeUTC } from '../utils/time.utils';

export function Clock({ style, size = 100, strokeWidth = 12.5, textMarginTop = 20 }: IClock) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [currentTime, setCurrentTime] = useState(formatDateToHoursMinutes(getCurrentTimeUTC, timezone));

  useEffect(() => {
    let interval = setInterval(() => {
      const d = formatDateToHoursMinutes(getCurrentTimeUTC, timezone);
      setCurrentTime(d);
      console.log(1, d);
      setTimeout(() => {
        console.log(2, d);
      });

      // Specify default date formatting for language (locale)
      // console.log(new Intl.DateTimeFormat('en-gb').formatToParts());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={style}>
      <Donut
        value={100}
        color={'grey'}
        max={100}
        displayedText={currentTime}
        radius={size}
        strokeWidth={strokeWidth}
      ></Donut>
      <Text style={{ ...styles.text, marginTop: textMarginTop }}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export interface IClock {
  style?: StyleProp<FlexStyle>;
  size?: number;
  strokeWidth?: number;
  textMarginTop?: number;
}
