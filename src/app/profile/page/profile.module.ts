import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { TranslateModule, ToolbarModule, IncPageModule, ProfileModule } from '@inclouded/ionic4-inclouded-lib';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    data: { title: 'Felhasználói adatok - Lavinia' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ToolbarModule,
    IncPageModule,
    ProfileModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
