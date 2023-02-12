import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOrderDetailsPageRoutingModule } from './job-order-details-routing.module';

import { JobOrderDetailsPage } from './job-order-details.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOrderDetailsPageRoutingModule,
    ComponentModule
  ],
  declarations: [JobOrderDetailsPage]
})
export class JobOrderDetailsPageModule {}
