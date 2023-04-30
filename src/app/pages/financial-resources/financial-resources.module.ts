import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancialResourcesPageRoutingModule } from './financial-resources-routing.module';

import { FinancialResourcesPage } from './financial-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancialResourcesPageRoutingModule
  ],
  declarations: [FinancialResourcesPage]
})
export class FinancialResourcesPageModule {}
