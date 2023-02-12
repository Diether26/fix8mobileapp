import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideDrawerComponent } from './slide-drawer/slide-drawer.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [SlideDrawerComponent, LoadingComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SlideDrawerComponent, LoadingComponent]
})
export class ComponentModule { }