import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricianFeedbackPageRoutingModule } from './electrician-feedback-routing.module';

import { ElectricianFeedbackPage } from './electrician-feedback.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ElectricianFeedbackPageRoutingModule
  ],
  declarations: [ElectricianFeedbackPage]
})
export class ElectricianFeedbackPageModule {}
