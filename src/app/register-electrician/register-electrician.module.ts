import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterElectricianPageRoutingModule } from './register-electrician-routing.module';

import { RegisterElectricianPage } from './register-electrician.page';
import { ComponentModule } from '../component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    RegisterElectricianPageRoutingModule
  ],
  declarations: [RegisterElectricianPage]
})
export class RegisterElectricianPageModule {}
