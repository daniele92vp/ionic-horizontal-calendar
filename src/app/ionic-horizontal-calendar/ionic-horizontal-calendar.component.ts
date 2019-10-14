import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';
import localization from 'moment/locale/de';

@Component({
  selector: 'app-ionic-horizontal-calendar',
  templateUrl: './ionic-horizontal-calendar.component.html',
  styleUrls: ['./ionic-horizontal-calendar.component.scss']
})
export class IonicHorizontalCalendarComponent {
  heute = moment();
  daysOfTheWeek = [];
  monthSelected: string;
  daySelected: number;
  currentFirstDayRendered: Date;
  idTimeSelected: number;
  timeSheet: any;
  daysToExclude = ['Sa.', 'So.'];
  added = 0;
  @Output() nextDayClicked = new EventEmitter<any>();
  @Output() prevDayClicked = new EventEmitter<any>();
  @Output() daySelectedEvent = new EventEmitter<any>();

  get isFirstDayRenderedToday() {
    return moment(this.daysOfTheWeek[0].date).isSame(moment(), 'day');
  }

  constructor() {
    moment.locale('de', localization);
    this.renderDaysOfWeek(this.heute);
  }

  renderDaysOfWeek(startingDay) {
    this.monthSelected = moment(startingDay).format("MMMM");
    this.daysOfTheWeek = Array(7).fill(7).map((x, i) => {
      let dayToSave = {
        number: moment(startingDay).add(i, 'days').date(),
        name: moment(startingDay).add(i, 'days').format("ddd"),
        date: moment(startingDay).add(i, 'days').toDate()
      }
      return dayToSave;
    });

    console.log(this.daysOfTheWeek[0].date === this.heute);
    
    
  }

  nextDayOfWeek() {
    let firstDayRendered = moment(this.daysOfTheWeek[0].date).add(1, 'days');
    this.renderDaysOfWeek(firstDayRendered);
    this.nextDayClicked.emit();
  }

  prevDayOfWeek() {
    if (!moment(this.daysOfTheWeek[0].date).isSame(moment(), 'day')) {
      let firstDayRendered = moment(this.daysOfTheWeek[0].date).subtract(1, 'days');
      this.renderDaysOfWeek(firstDayRendered);
      this.prevDayClicked.emit();
    }
  }

  selectDay(day) {
    this.daySelected = day;
    this.daySelectedEvent.emit(day);
  }


  swipeLeft(event) {
    if (Math.abs(event.deltaX) - this.added > 40) {
      this.nextDayOfWeek();
      this.added += 40;
    }
  }

  swipeEnd(event) {
    this.added = 0;
  }

  swipeRight(event) {
    if (Math.abs(event.deltaX) - this.added > 40) {
      this.prevDayOfWeek();
      this.added += 40;
    }
  }
}