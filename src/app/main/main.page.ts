import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavLink } from '@inclouded/ionic4-inclouded-lib';
import { PractitionerService } from '../services/practitioner.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

export const navPatient: NavLink[] = [
    {
        label: 'DIARIES',
        icon: 'restaurant',
        url: '/main/diaries',
        disabled: false,
        id: 'Diaries',
    },
    {
        label: 'HEALTLINE',
        icon: 'nutrition',
        url: '/main/healtline',
        disabled: false,
        id: 'Healtline',
    }];

export const navAdmin: NavLink[] = [
    {
        label: 'OBSERVATIONS',
        icon: 'clipboard',
        url: '/main/observation-list',
        disabled: false,
        id: 'Observations',
    },

    {
        label: 'PATIENT_LIST',
        icon: 'people-outline',
        url: '/main/patient',
        disabled: false,
        id: 'Patient',
    },
 ];

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    @Output() notifyUser = new EventEmitter();
    user: any;
    navList: NavLink[];

    navTitle = 'Nutrition';



    constructor(public practitionerService: PractitionerService, private storage: Storage, private router: Router) {

        this.loadList();


    }

    ngOnInit() {
    }

    async loadList() {
        const userstorage = await this.storage.get('user');
        this.user = userstorage.uid;
        this.practitionerService.getPractitionerbyId(this.user).subscribe(element => {
            if (element.role === 'Admin') {
                this.navList = navAdmin;
                this.router.navigateByUrl('main/observation-list');
            } else if (element.role !== 'Admin') {
                this.navList = navPatient;
                this.router.navigateByUrl('main/diaries');
            }
        });
    }
}
