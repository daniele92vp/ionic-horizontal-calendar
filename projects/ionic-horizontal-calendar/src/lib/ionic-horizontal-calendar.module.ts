import {NgModule} from '@angular/core';
import {IonicHorizontalCalendarComponent} from './ionic-horizontal-calendar.component';
import {IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [IonicHorizontalCalendarComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [IonicHorizontalCalendarComponent]
})
export class IonicHorizontalCalendarModule {}
