import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ToolbarModule, IncPageModule, TranslateModule } from '@inclouded/ionic4-inclouded-lib';
import { HealtlineComponent } from './healtline.component';

const routes: Routes = [
  {
    path: '',
    component: HealtlineComponent,
    data: { title: 'Healtline' }
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


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [HealtlineComponent  ]
})
export class HealtlineComponentModule { }
