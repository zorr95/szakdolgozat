import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { TranslatePipe } from '@inclouded/ionic4-inclouded-lib';
import { IonDatetime } from '@ionic/angular';

export const DATE_FORMAT = 'MMM dd.';
export const TAB_ELEMENTS_NUMBER = 7;

@Component({
  selector: 'nutri-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Output() selectedDate = new EventEmitter<Date>();

  @ViewChild('tabGroup' , null) tabGroup: MatTabGroup;
  @ViewChild('datePicker', null) datePicker: IonDatetime;

  dates: Date[] = [];
  dateFormat = DATE_FORMAT;

  todayDate: Date;

  constructor(private translatePipe: TranslatePipe) { }
  ngOnInit() {
    this.todayDate = new Date();
    this.initDatePicker();
    this.generateNewDatesToTimeline(this.todayDate, 'desc');
    this.tabGroup.selectedIndex = 5;
    setTimeout(() => {
      if (this.tabGroup.realignInkBar) {
        this.tabGroup.realignInkBar();
        this.selectedDate.emit(this.dates[this.tabGroup.selectedIndex]);
      }
    }, 0);
  }

  onNewDateSelected(event: any): void {
    // végállapot ellenőrzések
    if (event.index === 0) {
      this.generateNewDatesToTimeline(this.dates[0], 'desc');
      this.tabGroup.selectedIndex = TAB_ELEMENTS_NUMBER - 2;
    } else if (event.index === TAB_ELEMENTS_NUMBER - 1) {
      this.generateNewDatesToTimeline(this.dates[this.dates.length - 1], 'asc');
      this.tabGroup.selectedIndex = 1;
    } else {
      // új dátummal lekérdezés
      setTimeout(() => {
        if (this.tabGroup.realignInkBar) {
          this.tabGroup.realignInkBar();
          this.selectedDate.emit(this.dates[this.tabGroup.selectedIndex]);
        }
      }, 0);
    }
  }

  setupNewDateRangeOnTimeline(event: any): void {
    const tmpDate = new Date(event.detail.value);
    // nem szabad psizkálni a selectedTabIndex-et, mert triggerel és csúnya kombinációk sülhetnek ki
    this.generateNewDatesToTimeline(new Date(tmpDate.getFullYear(), tmpDate.getMonth(),
      (tmpDate.getDate() - this.tabGroup.selectedIndex) + 1), 'asc');
    this.onNewDateSelected({ index: this.tabGroup.selectedIndex });
  }

  generateNewDatesToTimeline(endDate: Date, order?: string): void {
    this.dates = [];
    if (order === 'asc') {
      for (let i = -1; i <= TAB_ELEMENTS_NUMBER - 2; i++) {
        this.dates.push(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + i));
      }
    } else if (order === 'desc') {
      for (let i = TAB_ELEMENTS_NUMBER - 2; i >= -1; i--) {
        this.dates.push(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - i));
      }
    }
  }

  initDatePicker(): void {
    this.datePicker.max = this.todayDate.getFullYear() + '-' +
      ((this.todayDate.getMonth() + 1) < 10 ? '0' : '') + (this.todayDate.getMonth() + 1) + '-' +
      (this.todayDate.getDate() < 10 ? '0' : '') + this.todayDate.getDate();
    this.datePicker.cancelText = this.translatePipe.transform('CANCEL_L');
    this.datePicker.doneText = this.translatePipe.transform('OK');
  }
}
