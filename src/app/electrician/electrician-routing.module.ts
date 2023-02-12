import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricianPage } from './electrician.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'Profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'Profile/Update',
    loadChildren: () => import('./profile-update/profile-update.module').then( m => m.ProfileUpdatePageModule)
  },{
    path: 'Profile/Electrician-Feedback',
    loadChildren: () => import('./electrician-feedback/electrician-feedback.module').then( m => m.ElectricianFeedbackPageModule)
  },
  {
    path: 'JobOrders',
    loadChildren: () => import('./job-orders/job-orders.module').then( m => m.JobOrdersPageModule)
  },
  {
    path: 'JobOrders/:id',
    loadChildren: () => import('./job-order-details/job-order-details.module').then( m => m.JobOrderDetailsPageModule)
  },
  {
    path: 'Subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'TransactionLogs',
    loadChildren: () => import('./transaction-logs/transaction-logs.module').then( m => m.TransactionLogsPageModule)
  },
  {
    path: 'ChangePassword',
    loadChildren: () => import('./change-password/change-password.module').then(m=>m.ChangePasswordPageModule)
  },{
    path: 'Profile/ChangePassword',
    loadChildren: () => import('./change-password/change-password.module').then(m=>m.ChangePasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricianPageRoutingModule {}
