import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { NavigationModule, AuthGuard } from '@inclouded/ionic4-inclouded-lib';
const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'diaries', loadChildren: './../diaries/diaries.module#DiariesComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  },

  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'diaries/add', loadChildren: './../diaries/add/add.module#AddComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  },


  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'healtline', loadChildren: './../healtline/healtline.module#HealtlineComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  },


  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'patient', loadChildren: './../patient/patient.module#PatientComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'patient/add', loadChildren: './../patient/add/add.module#AddComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'patient/patient-details', loadChildren:
      './../patient/patient-details/patient-details.module#PatientDetailsComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  } ,

  {
    path: 'main',
    component: MainPage,
    children: [
      { path: 'observation-list', loadChildren: './../observation-list/observation-list.module#ObservationListComponentModule', },
    ],
    canActivateChild: [AuthGuard],
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NavigationModule,


  ],
  providers: [],
  declarations: [MainPage]
})
export class MainPageModule { }

