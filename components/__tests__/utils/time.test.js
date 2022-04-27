import { formatDateToHoursMinutes, calculateTimeBetweenTwoDates } from "../../../utils/time.utils";

import { describe, expect, test } from "@jest/globals";

describe("Format Date To Hours Minutes", () => {
  const input = [
    {
      time: "2021-10-09T11:00:00+02:00",
      timezone: "Europe/Warsaw",
      result: "11:00",
    },
    {
      time: "2017-04-05T08:30:00+02:00",
      timezone: "Europe/Warsaw",
      result: "08:30",
    },
    {
      time: "1996-05-03T21:15:00+02:00",
      timezone: "Europe/Warsaw",
      result: "21:15",
    },
    {
      time: "2013-11-03T21:15:00+02:00",
      timezone: "Europe/Warsaw",
      result: "20:15",
    },
    {
      time: "2000-03-11T05:15:00+02:00",
      timezone: "Europe/Warsaw",
      result: "04:15",
    },
  ];

  input.forEach(({ time, timezone, result }) => {
    test(`Checks if ${time} returns ${result}`, () => {
      expect(formatDateToHoursMinutes(time, timezone)).toEqual(result);
    });
  });
});

describe("Calculate Time Between Two Dates", () => {
  const input = [
    {
      start: "2021-10-09T11:00:00+02:00",
      end: "2021-10-09T11:25:07",
      result: "25m 07s",
    },
    {
      start: "2017-04-05T08:30:00+02:00",
      end: "2017-04-05T11:37:01+02:00",
      result: "187m 01s",
    },
    {
      start: "1996-05-03T21:15:00+02:00",
      end: "1996-05-03T19:15:12+02:00",
      result: "119m 48s",
    },
    {
      start: "2013-11-03T21:15:00+02:00",
      end: "2013-11-03T23:15:48+02:00",
      result: "120m 48s",
    },
    {
      start: "2000-03-11T05:15:00+02:00",
      end: "2000-03-11T05:17:23+02:00",
      result: "02m 23s",
    },
  ];

  input.forEach(({ start, end, result }) => {
    test(`Checks if difference between ${start} and ${end} returns ${result}`, () => {
      //   expect(calculateTimeBetweenTwoDates(start, end)).toEqual(result);
      expect(
        calculateTimeBetweenTwoDates({
          startingPoint: start,
          timeToCalculateTo: end,
        })
      ).toEqual(result);
    });
  });
});
