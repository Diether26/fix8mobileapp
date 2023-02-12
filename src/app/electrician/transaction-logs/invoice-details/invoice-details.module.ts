import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceDetailsPageRoutingModule } from './invoice-details-routing.module';

import { InvoiceDetailsPage } from './invoice-details.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceDetailsPageRoutingModule,
    ComponentModule
  ],
  declarations: [InvoiceDetailsPage]
})
export class InvoiceDetailsPageModule {}
