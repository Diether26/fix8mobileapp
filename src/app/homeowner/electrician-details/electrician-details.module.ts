import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricianDetailsPageRoutingModule } from './electrician-details-routing.module';

import { ElectricianDetailsPage } from './electrician-details.page';

import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ElectricianDetailsPageRoutingModule
  ],
  declarations: [ElectricianDetailsPage]
})
export class ElectricianDetailsPageModule {}
