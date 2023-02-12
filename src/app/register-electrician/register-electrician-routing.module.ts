import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterElectricianPage } from './register-electrician.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterElectricianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterElectricianPageRoutingModule {}
