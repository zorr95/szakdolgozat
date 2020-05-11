import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { MatTabsModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatTabsModule,
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
