import { ChEmailComponent } from '@inclouded/ionic4-inclouded-lib';
import { ChEmailModule } from '@inclouded/ionic4-inclouded-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ChEmailComponent,
        data: { title: 'Email módosítás - LIB' },
    }
];

@NgModule({
    imports: [
        CommonModule,
        ChEmailModule,
        RouterModule.forChild(routes)
    ],
})
export class LazyCHEmailModule { }
