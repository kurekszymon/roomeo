import axios from 'axios';

import { GOOGLE_API_KEY } from '@env';
// import { v4 as uuid } from 'uuid';
import { get12pmForCurrentDayUTC, getCurrentTimeUTC } from '../utils/time.utils';
// import { SERVER_URL } from './consts';
// import { DateTime } from 'luxon';

// import 'react-native-get-random-values';
const BASE_URL = 'https://www.googleapis.com/calendar/v3';

export async function getUserCalendars(bearer: string): Promise<ICalendarItem[]> {
  const response = await axios
    .get(`${BASE_URL}/users/me/calendarList?key=${GOOGLE_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
        Accept: 'application/json',
      },
    })
    .catch((e) => console.error('Error fetching calendars, ', e));
  return await response?.data.items;
}

export async function getEventsFromCalendar(calendarID: string, bearer: string): Promise<IEvent[]> {
  const response = await axios.get(
    `${BASE_URL}/calendars/${calendarID}/events?timeMax=${get12pmForCurrentDayUTC}&timeMin=${getCurrentTimeUTC}&key=${GOOGLE_API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${bearer}`,
        Accept: 'application/json',
      },
    }
  );

  return await response?.data.items;
}

// export async function postWatchEventsFromCalendar(calendarID, axiosOpts) {
//   const reqBody = {
//     id: uuid(),
//     type: 'webhook',
//     address: SERVER_URL + 'api/notifications',
//   };
//   return await axios.post(`${BASE_URL}/calendars/${calendarID}/events/watch`, reqBody, axiosOpts);
// }

// export function mapEvents(events) {
//   return events.map((event) => {
//     return {
//       id: event.id,
//       summary: event.summary,
//       startTime: event.start.dateTime,
//       startTimezone: event.start.timeZone,
//       endTime: event.end.dateTime,
//       endTimezone: event.end.timeZone,
//       hangoutLink: event.hangoutLink,
//     };
//   });
// }

// export function findCurrentEvent(events) {
//   return events.find((event) => {
//     const start = DateTime.fromISO(event.startTime).valueOf();
//     const now = DateTime.now().valueOf();
//     const end = DateTime.fromISO(event.endTime).valueOf();

//     if (start <= now && now <= end - 60000) {
//       return event;
//     }

//     return;
//   });
// }
