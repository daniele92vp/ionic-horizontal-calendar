import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-ionic-horizontal-calendar',
  templateUrl: './ionic-horizontal-calendar.component.html',
  styleUrls: ['./ionic-horizontal-calendar.component.scss']
})
export class IonicHorizontalCalendarComponent {
 // daysOfTheMonth = [];
 heute = new Date();
 daysOfTheWeek = [];
 monthSelected: Date;
 daySelected: number;
 currentFirstDayRendered: Date;
 idTimeSelected: number;
 timeSheet: any;

 constructor() {
   this.renderDaysOfWeek(this.heute);
 }

 renderDaysOfWeek(startingDay) {
   this.monthSelected = new Date(startingDay);
   this.daysOfTheWeek = Array(7).fill(7).map((x, i) => {
     let newDate = new Date();
     return newDate.setDate(startingDay.getDate() + i);
   });
   console.log('week', this.daysOfTheWeek);
   console.log('month', this.monthSelected);
 }

 nextDayOfWeek() {
   let firstDayRendered = new Date(this.daysOfTheWeek[0]);
   let lastDayRendered = this.daysOfTheWeek[this.daysOfTheWeek.length - 1];
   let day = new Date();
   day.setDate(firstDayRendered.getDate() + 1);
   this.renderDaysOfWeek(day);
 }

 prevDayOfWeek() {
   let firstDayRendered = new Date(this.daysOfTheWeek[0]);
   if (firstDayRendered.getDate() !== this.heute.getDate()) {
     let day = new Date();
     day.setDate(firstDayRendered.getDate() - 1);
     this.renderDaysOfWeek(day);
   }
 }

 selectDay(day) {
   this.daySelected = day;
   console.log(this.daySelected);
 }

 selectTime(idTime) {
   this.idTimeSelected = idTime;
   console.log(this.idTimeSelected);

 }
}