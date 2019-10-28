import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ContentChild,
  OnInit
} from '@angular/core';
import * as _moment from 'moment';
import { CalendarDay, isCalendarDay, compareCalendarDays } from './calendar-day';

const moment = _moment;
@Component({
  selector: 'ionic-horizontal-calendar',
  templateUrl: './ionic-horizontal-calendar.component.html',
  styleUrls: ['./ionic-horizontal-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicHorizontalCalendarComponent implements OnInit {
  //////////////////////////////////////////// INTERNAL VARIABLES ////////////////////////////////////////////
  /** Array of days to render */
  get renderDays() {
    return Array(this.dayCount)
      .fill(this.dayCount)
      .map((_, i) => this.generateCalendarDay(this.firstDayRendered, i));
  }

  /** A string representing the localized month selected, for displaying purposes. */
  get monthSelected() {
    return this.localeData.months(this.firstDayRendered.moment, 'MMMM');
  }

  /** The selected CalendarDay, for displaying purposes. */
  currentSelectedDay: CalendarDay;

  /** First date to render, used to build displayedDays. */
  firstDayRendered: CalendarDay;

  get lastDayRendered(): CalendarDay {
    return this.generateCalendarDay(this.firstDayRendered, this.dayCount - 1);
  }

  /** Read-only, returns whether the calendar is allowed to scroll to the left. */
  get canMoveBack() {
    return !this.minDate || this.firstDayRendered.moment.isAfter(this.minDate, 'day');
  }

  /** Read-only, returns whether the calendar is allowed to scroll to the right. */
  get canMoveForward() {
    return !this.maxDate || this.lastDayRendered.moment.isBefore(this.maxDate, 'day');
  }

  /** The projected header, if any */
  @ContentChild('header', { static: true }) content: any;

  /**  */
  compareDays = compareCalendarDays;

  //////////////////////////////////////////// PRIVATES ////////////////////////////////////////////
  /** Internal variable.  */
  private panExludedDelta = 0;

  /** Internal variable */
  private initialDateInternal = new Date();

  /** Read-only, current selected locale for moment. */
  private get localeData(): _moment.Locale {
    return moment.localeData();
  }

  /** Read-only, width in pixels of a step (pan delta required to actually scroll the calendar). */
  private get scrollStep(): number {
    const width = this.elementRef.nativeElement.clientWidth || 375;
    return ((width - 75) / this.dayCount) * this.scrollSensivity;
  }

  /////////////////////////////////////////////// OUTPUTS ////////////////////////////////////////////
  /** Emits whenever the next day button is pressed. */
  @Output() nextDayClicked = new EventEmitter<any>();

  /** Emits whenever the prev day button is pressed. */
  @Output() prevDayClicked = new EventEmitter<any>();

  /** Emits the new selected day whenever it is changed. */
  @Output() daySelected = new EventEmitter<CalendarDay>();

  //////////////////////////////////////////// INPUTS ////////////////////////////////////////////
  /** The amount of days to display at once. */
  @Input() dayCount = 7;

  /** Callback to select days that should be excluded from selection. */
  @Input() daysToExclude = (day: CalendarDay) => day.date.getDay() === 6 || day.date.getDay() === 0 || moment(day.date).isBefore(this.minDate);

  /** Min date allowed. */
  @Input() minDate: _moment.MomentInput;

  /** Max date allowed. */
  @Input() maxDate: _moment.MomentInput;

  /** Scrolling sensivity when panning the days. */
  @Input() scrollSensivity = 1.0;

  /** moment's locale */
  @Input()
  set locale(loc: string) {
    moment.updateLocale(loc, {});
  }
  get locale() {
    return moment.locale();
  }

  /** Make autoselection of the first day when component rendered */
  @Input() firstDayAutoSelected = false;

  /** Display mode, can be daily or weekly */
  @Input() displayMode: 'daily' | 'weekly' = 'daily';

  constructor(private cdRef: ChangeDetectorRef, private elementRef: ElementRef) {
   
  }

  ngOnInit(): void {
    if (this.displayMode === 'weekly') {
      let firstDayOfTheWeek = moment(this.initialDateInternal).weekday(0);
      this.firstDayRendered = this.generateCalendarDay(firstDayOfTheWeek);
    } else {
      this.firstDayRendered = this.generateCalendarDay(this.initialDateInternal);
    }
    if (this.firstDayAutoSelected) {
      let calendarDayToday = this.generateCalendarDay(this.initialDateInternal);
      this.selectDay(calendarDayToday);
    }
  }

  /** Generate a CalendarDay object for a date, optionally offsetted by an arbitrary amount of days. */
  generateCalendarDay(date: _moment.MomentInput | CalendarDay, daysToAdd?: number): CalendarDay {
    let effectiveDate = isCalendarDay(date) ? moment(date.moment) : moment(date);
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

    /** Generate a CalendarDay object for a date, optionally offsetted by an arbitrary amount of days. */
    generateCalendarWeekly(date: _moment.MomentInput | CalendarDay, weekToAdd?: number): CalendarDay {
      let effectiveDate = isCalendarDay(date) ? moment(date.moment) : moment(date);
      // Apply days delta to date we're outputting
      if (weekToAdd > 0) {
        effectiveDate = effectiveDate.add(weekToAdd, 'weeks');
      } else if (weekToAdd < 0) {
        effectiveDate = effectiveDate.subtract(-weekToAdd, 'weeks');
      }
  
      return {
        number: effectiveDate.date(),
        name: this.localeData.weekdaysShort(effectiveDate),
        date: effectiveDate.toDate(),
        moment: effectiveDate
      };
    }

  /** Moves the calendar forward */
  next() {
    if (this.canMoveForward && this.displayMode === 'daily') {
      this.firstDayRendered = this.generateCalendarDay(this.firstDayRendered, 1);
      this.nextDayClicked.emit();
    } else if (this.canMoveForward && this.displayMode === 'weekly') {
      this.firstDayRendered = this.generateCalendarWeekly(this.firstDayRendered, 1);
      this.nextDayClicked.emit();
    }
  }

  /** Moves the calendar backward */
  prev() {
    if (this.canMoveBack && this.displayMode === 'daily') {
      this.firstDayRendered = this.generateCalendarDay(this.firstDayRendered, -1);
      this.prevDayClicked.emit();
    } else if (this.canMoveBack && this.displayMode === 'weekly') {
      this.firstDayRendered = this.generateCalendarWeekly(this.firstDayRendered, -1);     
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
    if (event.deltaX - this.panExludedDelta > this.scrollStep) {
      this.prev();
      this.panExludedDelta += this.scrollStep;
    } else if (event.deltaX - this.panExludedDelta < -this.scrollStep) {
      this.next();
      this.panExludedDelta -= this.scrollStep;
    }
  }
}
