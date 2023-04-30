import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillReminderPageRoutingModule } from './bill-reminder-routing.module';

import { BillReminderPage } from './bill-reminder.page';
import { ReminderModalComponent } from './reminder-modal/reminder-modal.component'; // import the component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillReminderPageRoutingModule
  ],
  declarations: [BillReminderPage, ReminderModalComponent], // add the component to declarations
  entryComponents: [ReminderModalComponent] // add the component to entryComponents
})
export class BillReminderPageModule {}
