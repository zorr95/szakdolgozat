import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ToolbarModule, IncPageModule, TranslateModule } from '@inclouded/ionic4-inclouded-lib';
import { AddComponent } from './add.component';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: AddComponent,
    data: { title: 'Bevitel' }
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
    RouterModule.forChild(routes),
    ReactiveFormsModule ,
    IonicSelectableModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [AddComponent  ]
})
export class AddComponentModule { }
