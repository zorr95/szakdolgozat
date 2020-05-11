import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginPage } from '@inclouded/ionic4-inclouded-lib';
const routes: Routes = [


  { path: '', redirectTo: 'main', pathMatch: 'full' , canActivateChild: [AuthGuard]  },
  { path: '', loadChildren: '../app/main/main.module#MainPageModule', canActivateChild: [AuthGuard] , },
  { path: 'login', component: LoginPage, data: { title: 'Bejelentkezés ' } },
  { path: 'login/:routeTo', component: LoginPage, data: { title: 'Bejelentkezés ' } },
  { path: 'settings', loadChildren: './settings/page/settings.module#SettingsPageModule', canActivateChild: [AuthGuard] },
  {
    path: 'personal-info', loadChildren: './profile/page/profile.module#ProfilePageModule', canActivateChild: [AuthGuard]
  },
  { path: 'ch-email', loadChildren: './profile/lazies/lazy-ch-email.module#LazyCHEmailModule', canActivateChild: [AuthGuard] },
  { path: 'ch-password', loadChildren: './profile/lazies/lazy-ch-password.module#LazyCHPasswordModule', canActivateChild: [AuthGuard] },
   {
   path: '**',
  redirectTo: ''
   }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
