import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialResourcesPage } from './financial-resources.page';

const routes: Routes = [
  {
    path: '',
    component: FinancialResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialResourcesPageRoutingModule {}
