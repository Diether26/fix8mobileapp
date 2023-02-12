import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricianDetailsPage } from './electrician-details.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricianDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricianDetailsPageRoutingModule {}
