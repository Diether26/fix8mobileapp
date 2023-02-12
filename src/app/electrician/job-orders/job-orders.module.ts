import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOrdersPageRoutingModule } from './job-orders-routing.module';

import { JobOrdersPage } from './job-orders.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    JobOrdersPageRoutingModule
  ],
  declarations: [JobOrdersPage]
})
export class JobOrdersPageModule {}
