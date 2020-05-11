import { SettingsPage } from './settings.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ToolbarModule, IncPageModule, TranslateModule, SettingsModule } from '@inclouded/ionic4-inclouded-lib';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    data: { title: 'Beállítások - SPIRO' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    IncPageModule,
    TranslateModule,
    SettingsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule { }
