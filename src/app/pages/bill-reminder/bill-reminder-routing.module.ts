import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillReminderPage } from './bill-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: BillReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillReminderPageRoutingModule {}
