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
  styleUrls: ['./ionic-horizontal-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicHorizontalCalendarComponent {
  /// INTERNAL VARIABLES ///
  /** Array of CalendarDays currently displayed. */
  displayedDays: CalendarDay[] = [];

  /** A string representing the localized month selected, for displaying purposes. */
  monthSelected: string;

  /** The selected CalendarDay, for displaying purposes. */
  currentSelectedDay: CalendarDay;

  /** First date to render, used to build displayedDays. */
  currentFirstDayRendered: Date;

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

  /** Callback to select days that should be excluded from selection. */
  @Input() daysToExclude = (day: CalendarDay) => day.date.getDay() === 6 || day.date.getDay() === 0;

  /** moment's locale */
  @Input()
  set locale(loc: string) {
    moment.updateLocale(loc, {});
    this.renderDaysOfWeek(moment());
  }
  get locale() {
    return moment.locale();
  }

  get isFirstDayRenderedToday() {
    return moment(this.displayedDays[0].date).isSame(moment(), 'day');
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.renderDaysOfWeek(this.currentFirstDayRendered);
  }

  renderDaysOfWeek(startingDay) {
    this.monthSelected = this.localeData.months(moment(startingDay), 'MMMM');
    this.displayedDays = Array(7)
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

  /** Moves the calendar forward by one day. */
  nextDayOfWeek() {
    const firstDayRendered = moment(this.displayedDays[0].date).add(1, 'days');
    this.renderDaysOfWeek(firstDayRendered);
    this.nextDayClicked.emit();
  }

  /** Moves the calendar backward by one day. */
  prevDayOfWeek() {
    if (!moment(this.displayedDays[0].date).isSame(moment(), 'day')) {
      const firstDayRendered = moment(this.displayedDays[0].date).subtract(1, 'days');
      this.renderDaysOfWeek(firstDayRendered);
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
}
