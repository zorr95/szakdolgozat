import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@inclouded/ionic4-inclouded-lib';

@Pipe({
    name: 'timeAgo',
    pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
    private timer: number;
    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone, private translatePipe: TranslatePipe) { }
    transform(value: string) {
        this.removeTimer();
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, timeToUpdate);
            }
            return null;
        });
        const minutes = Math.round(Math.abs(seconds / 60));
        const hours = Math.round(Math.abs(minutes / 60));
        const days = Math.round(Math.abs(hours / 24));
        const months = Math.round(Math.abs(days / 30.416));
        const years = Math.round(Math.abs(days / 365));
        if (Number.isNaN(seconds)) {
            return '';
        } else if (seconds <= 45) {
            return this.translatePipe.transform('FEW_SECONDS_AGO');
        } else if (seconds <= 90) {
            return this.translatePipe.transform('A_MINUTE_AGO');
        } else if (minutes <= 45) {
            return minutes + ' ' + this.translatePipe.transform('MINUTES_AGO');
        } else if (minutes <= 90) {
            return this.translatePipe.transform('AN_HOUR_AGO');
        } else if (hours <= 22) {
            return hours + ' ' + this.translatePipe.transform('HOURS_AGO');
        } else if (hours <= 36) {
            return this.translatePipe.transform('A_DAY_AGO');
        } else if (days <= 25) {
            return days + ' ' + this.translatePipe.transform('DAYS_AGO');
        } else if (days <= 45) {
            return this.translatePipe.transform('A_MONTH_AGO');
        } else if (days <= 345) {
            return months + ' ' + this.translatePipe.transform('MONTHS_AGO');
        } else if (days <= 545) {
            return this.translatePipe.transform('A_YEAR_AGO');
        } else { // (days > 545)
            return years + ' ' + this.translatePipe.transform('YEARS_AGO');
        }
    }
    ngOnDestroy(): void {
        this.removeTimer();
    }
    private removeTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
    private getSecondsUntilUpdate(seconds: number) {
        const min = 60;
        const hr = min * 60;
        const day = hr * 24;
        if (seconds < min) { // less than 1 min, update every 2 secs
            return 2;
        } else if (seconds < hr) { // less than an hour, update every 30 secs
            return 30;
        } else if (seconds < day) { // less then a day, update every 5 mins
            return 300;
        } else { // update every hour
            return 3600;
        }
    }
}
