import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import * as moment from 'moment';

interface CalendarDay {
  number: number;
  name: string;
  date: Date;
}

@Component({
  selector: 'app-ionic-horizontal-calendar',
  templateUrl: './ionic-horizontal-calendar.component.html',
  styleUrls: ['./ionic-horizontal-calendar.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicHorizontalCalendarComponent {
  today = moment();
  daysOfTheWeek: CalendarDay[] = [];
  monthSelected: string;
  daySelected: CalendarDay;
  currentFirstDayRendered: Date;
  panExludedDelta = 0;
  @Output() nextDayClicked = new EventEmitter<any>();
  @Output() prevDayClicked = new EventEmitter<any>();
  @Output() daySelectedEvent = new EventEmitter<any>();
  @Input() title: string;
  @Input() daysToExclude = (day: CalendarDay) => day.date.getDay() === 6 || day.date.getDay() === 0;
  @Input()
  set locale(loc: any) {
    moment.updateLocale(loc, {});
    this.renderDaysOfWeek(this.today);
  }
  get localeData(): moment.Locale {
    return moment.localeData();
  }

  get isFirstDayRenderedToday() {
    return moment(this.daysOfTheWeek[0].date).isSame(moment(), 'day');
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.renderDaysOfWeek(this.today);
  }

  renderDaysOfWeek(startingDay) {
    this.monthSelected = this.localeData.months(moment(startingDay), 'MMMM');
    this.daysOfTheWeek = Array(7)
      .fill(7)
      .map((_, i) => {
        const dayToSave = {
          number: moment(startingDay)
            .add(i, 'days')
            .date(),
          name: this.localeData.weekdaysShort(moment(startingDay).add(i, 'days')),
          date: moment(startingDay)
            .add(i, 'days')
            .toDate()
        };
        return dayToSave;
      });
  }

  nextDayOfWeek() {
    const firstDayRendered = moment(this.daysOfTheWeek[0].date).add(1, 'days');
    this.renderDaysOfWeek(firstDayRendered);
    this.nextDayClicked.emit();
  }

  prevDayOfWeek() {
    if (!moment(this.daysOfTheWeek[0].date).isSame(moment(), 'day')) {
      const firstDayRendered = moment(this.daysOfTheWeek[0].date).subtract(1, 'days');
      this.renderDaysOfWeek(firstDayRendered);
      this.prevDayClicked.emit();
    }
  }

  selectDay(day) {
    this.daySelected = day;
    this.daySelectedEvent.emit(day);
  }

  swipeLeft(event) {
    if (Math.abs(event.deltaX) - this.panExludedDelta > 40) {
      this.nextDayOfWeek();
      this.panExludedDelta += 40;
    }
  }

  swipeEnd(event) {
    this.panExludedDelta = 0;
  }

  swipeRight(event) {
    if (Math.abs(event.deltaX) - this.panExludedDelta > 40) {
      this.prevDayOfWeek();
      this.panExludedDelta += 40;
    }
  }
}
