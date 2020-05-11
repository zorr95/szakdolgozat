import { ChPasswordComponent } from '@inclouded/ionic4-inclouded-lib';
import { ChPasswordModule } from '@inclouded/ionic4-inclouded-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ChPasswordComponent,
        data: { title: 'Jelszó módosítás - LIB' },
    }
];

@NgModule({
    imports: [
        CommonModule,
        ChPasswordModule,
        RouterModule.forChild(routes)
    ],
})
export class LazyCHPasswordModule { }
