import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicHorizontalCalendarComponent } from './ionic-horizontal-calendar/ionic-horizontal-calendar.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: TestComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
