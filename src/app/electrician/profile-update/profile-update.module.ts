import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileUpdatePageRoutingModule } from './profile-update-routing.module';

import { ProfileUpdatePage } from './profile-update.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ProfileUpdatePageRoutingModule
  ],
  declarations: [ProfileUpdatePage]
})
export class ProfileUpdatePageModule {}
