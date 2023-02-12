import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOrderDetailsPage } from './job-order-details.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: JobOrderDetailsPage,
    children: [
      {
        path: 'Home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'Message',
        children: [
          {
            path: '',
            loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
          }
        ]
      },
      {
        path: 'Activity',
        children: [
          {
            path: '',
            loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOrderDetailsPageRoutingModule {}
