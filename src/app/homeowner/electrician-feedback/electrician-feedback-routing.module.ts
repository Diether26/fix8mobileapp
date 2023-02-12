import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricianFeedbackPage } from './electrician-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricianFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricianFeedbackPageRoutingModule {}
