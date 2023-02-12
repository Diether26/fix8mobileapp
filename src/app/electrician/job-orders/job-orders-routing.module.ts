import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOrdersPage } from './job-orders.page';

const routes: Routes = [
  {
    path: '',
    component: JobOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOrdersPageRoutingModule {}
