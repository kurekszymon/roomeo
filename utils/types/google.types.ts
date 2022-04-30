// https://developers.google.com/calendar/api/v3/reference/calendarList#resource
interface ICalendarList {
  kind: string;
  etag: string;
  nextPageToken: string;
  nextSyncToken: string;
  items: CalendarItem[];
}

type UICalendarItem = {
  id: string;
  name: string;
};

type CalendarItem = {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description: string;
  location: string;
  timeZone: string;
  summaryOverride: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  hidden: boolean;
  selected: boolean;
  accessRole: string;
  defaultReminders: [
    {
      method: string;
      minutes: number;
    }
  ];
  notificationSettings: {
    notifications: [
      {
        type: string;
        method: string;
      }
    ];
  };
  primary: boolean;
  deleted: boolean;
  conferenceProperties: {
    allowedConferenceSolutionTypes: [string];
  };
};
