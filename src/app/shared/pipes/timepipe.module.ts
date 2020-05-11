import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';

@NgModule({
    declarations: [TimeAgoPipe],
    imports: [CommonModule],
    exports: [TimeAgoPipe],
    providers: [],
})
export class TimeAgoModule { }
