import { DateTime, Duration } from 'luxon';

/**
 * @returns 23:59:59 for today's day.
 */
export const get12pmForCurrentDayUTC = DateTime.now()
  .setZone('utc') // needed, cause exceeding 24 hours from timezone resulted in errors
  .endOf('day')
  .startOf('second')
  .toISO({ suppressMilliseconds: true });

/**
 * @returns current time with no miliseconds in format ``
 */
export const getCurrentTimeUTC = DateTime.now().setZone('utc').startOf('second').toISO({ suppressMilliseconds: true });

/**
 *
 * @param date ISO date to calculate from
 * @param zone luxon timezone, like 'Europe/Warsaw'
 * @link https://github.com/moment/luxon/blob/master/docs/zones.md
 * @returns "HH:MM" format
 */
export function formatDateToHoursMinutes(date: string, zone: string): string {
  return DateTime.fromISO(date, { zone }).toFormat('HH:mm');
}

/**
 * @param dateISO ISO date
 * @returns miliseconds
 */
export function getMillisFromISODate(dateISO: string): number {
  return DateTime.fromISO(dateISO).valueOf();
}

/**
 *
 * @param [startingPoint] start point of subtraction; ISO String; defaults to DateTime.now()
 * @param {string} timeToCalculateTo second substraction part; ISO String
 * @returns {string} Time format like "MMm SSs"
 */
export function formatTimeBetweenTwoDates(end: string, start = DateTime.now().toString()) {
  return Duration.fromMillis(calculateTimeBetweenTwoDates(end, start)).toFormat("mm'm 'ss's");
}
/**
 *
 * @param startingPoint start point of subtraction; ISO String; defaults to DateTime.now()
 * @param timeToCalculateTo second substraction part; ISO String
 * @returns Time in milliseconds
 */
export function calculateTimeBetweenTwoDates(end: string, start = DateTime.now().toString()) {
  return Math.abs(getMillisFromISODate(end) - getMillisFromISODate(start));
}
