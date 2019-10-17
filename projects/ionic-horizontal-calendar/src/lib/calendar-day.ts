import * as moment from 'moment';

export interface CalendarDay {
  number: number;
  name: string;
  date: Date;
  moment: moment.Moment;
}

export function isCalendarDay(object: any): object is CalendarDay {
  return object && object.date && object.number && object.name && object.moment;
}
export function compareCalendarDays(day1: CalendarDay, day2: CalendarDay) {
  return day1 && day2 && day1.moment && day2.moment && day1.moment.isSame(day2.moment);
}
