import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthElectricianGuardService } from './services/AuthElectricianGuard/auth-electrician-guard.service';
import { AuthHomeownerGuardService } from './services/AuthHomeownerGuard/auth-homeowner-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-electrician',
    loadChildren: () => import('./register-electrician/register-electrician.module').then( m => m.RegisterElectricianPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule),
    canActivate: [AuthElectricianGuardService],
    data: {
      expectedRole: 'Homeowner'
    }
  },
  {
    path: 'Homeowner',
    loadChildren: () => import('./homeowner/homeowner.module').then( m => m.HomeownerPageModule),
    canActivate: [AuthHomeownerGuardService],
    data: {
      expectedRole: 'Homeowner'
    }
  },
  {
    path: 'Electrician',
    loadChildren: () => import('./electrician/electrician.module').then( m => m.ElectricianPageModule),
    canActivate: [AuthElectricianGuardService],
    data: {
      expectedRole: 'Electrician'
    }
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
