import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ToolbarModule, IncPageModule, TranslateModule } from '@inclouded/ionic4-inclouded-lib';
import { ObservationListComponent } from './observation-list.component';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
    MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
    MatDatepickerModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
    MatStepperModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { TimeAgoModule } from '../shared/pipes/timepipe.module';
import { TimelineModule } from '../shared/components/timeline/timeline.module';
import { MonoAvatarModule } from '../shared/directives/mono-avatar/mono-avatar.module';

const routes: Routes = [
    {
        path: '',
        component: ObservationListComponent,
        data: { title: 'Observations' }
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
        ReactiveFormsModule,
        A11yModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ToolbarModule,
        IncPageModule,
        TranslateModule,
        TimeAgoModule,
        TimelineModule,
        MonoAvatarModule

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [ObservationListComponent]
})
export class ObservationListComponentModule { }
