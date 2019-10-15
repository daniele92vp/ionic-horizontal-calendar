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
  moment: moment.Moment;
}

@Component({
  selector: 'app-ionic-horizontal-calendar',
  templateUrl: './ionic-horizontal-calendar.component.html',
  styleUrls: ['./ionic-horizontal-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicHorizontalCalendarComponent {
  /// INTERNAL VARIABLES ///
  /** Array of CalendarDays currently displayed. */
  displayedDays: CalendarDay[] = [];

  /** A string representing the localized month selected, for displaying purposes. */
  get monthSelected() {
    return this.localeData.months(this.currentFirstDayRendered.moment, 'MMMM');
  }

  /** The selected CalendarDay, for displaying purposes. */
  currentSelectedDay: CalendarDay;

  /** First date to render, used to build displayedDays. */
  currentFirstDayRendered: CalendarDay;

  /// PRIVATES ///
  /** Internal variable.  */
  private panExludedDelta = 0;

  /** Current selected locale for moment. */
  private get localeData(): moment.Locale {
    return moment.localeData();
  }

  /// OUTPUTS ///
  /** Emits whenever the next day button is pressed. */
  @Output() nextDayClicked = new EventEmitter<any>();

  /** Emits whenever the prev day button is pressed. */
  @Output() prevDayClicked = new EventEmitter<any>();

  /** Emits the new selected day whenever it is changed. */
  @Output() daySelected = new EventEmitter<any>();

  /// INPUTS ///
  /** Header to display above the calendar. */
  @Input() title: string;

  /** The amount of days to display at once. */
  @Input() dayCount: number;

  /** Callback to select days that should be excluded from selection. */
  @Input() daysToExclude = (day: CalendarDay) => day.date.getDay() === 6 || day.date.getDay() === 0;

  /** moment's locale */
  @Input()
  set locale(loc: string) {
    moment.updateLocale(loc, {});
    // this.renderDaysOfWeek(moment());
  }
  get locale() {
    return moment.locale();
  }

  get isFirstDayRenderedToday() {
    return this.currentFirstDayRendered.moment.isSame(moment(), 'day');
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.currentFirstDayRendered = this.generateCalendarDay(new Date());
  }

  generateCalendarDay(date: moment.MomentInput | CalendarDay, daysToAdd?: number): CalendarDay {
    let effectiveDate = this.isCalendarDay(date) ? moment(date.moment) : moment(date);
    // Apply days delta to date we're outputting
    if (daysToAdd > 0) {
      effectiveDate = effectiveDate.add(daysToAdd, 'days');
    } else if (daysToAdd < 0) {
      effectiveDate = effectiveDate.subtract(-daysToAdd, 'days');
    }

    return {
      number: effectiveDate.date(),
      name: this.localeData.weekdaysShort(effectiveDate),
      date: effectiveDate.toDate(),
      moment: effectiveDate
    };
  }

  generateRenderDays() {
    return Array(7)
      .fill(7)
      .map((_, i) => this.generateCalendarDay(this.currentFirstDayRendered, i));
  }

  /** Moves the calendar forward by one day. */
  nextDayOfWeek() {
    this.currentFirstDayRendered = this.generateCalendarDay(this.currentFirstDayRendered, 1);
    this.nextDayClicked.emit();
  }

  /** Moves the calendar backward by one day. */
  prevDayOfWeek() {
    if (!this.currentFirstDayRendered.moment.isSame(moment(), 'day')) {
      this.currentFirstDayRendered = this.generateCalendarDay(this.currentFirstDayRendered, -1);
      this.prevDayClicked.emit();
    }
  }

  /** Set selected day */
  selectDay(day: CalendarDay): void {
    this.currentSelectedDay = day;
    this.daySelected.emit(day);
  }

  /** Hadler for when swiping ends. */
  swipeEnd(): void {
    this.panExludedDelta = 0;
  }

  /** Handler for when swiping is active and changes offset. */
  swipeMove(event): void {
    if (event.deltaX - this.panExludedDelta > 40) {
      this.prevDayOfWeek();
      this.panExludedDelta += 40;
    } else if (event.deltaX - this.panExludedDelta < -40) {
      this.nextDayOfWeek();
      this.panExludedDelta -= 40;
    }
  }

  /// HELPER METHODS ///
  compareDays(day1: CalendarDay, day2: CalendarDay) {
    return day1 && day2 && day1.moment && day2.moment && day1.moment.isSame(day2.moment);
  }

  private isCalendarDay(object: any): object is CalendarDay {
    return object && object.date && object.number && object.name && object.moment;
  }
}
