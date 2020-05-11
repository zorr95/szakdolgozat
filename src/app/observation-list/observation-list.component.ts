import { Component, OnInit } from '@angular/core';
import { FoodAndNutrientService } from '../services/foodandnutrient.service';
import { PractitionerService } from '../services/practitioner.service';
import { FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { iosTransitionAnimation } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ThemeService } from '@inclouded/ionic4-inclouded-lib/lib/user/settings/theme/theme.service';


@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.scss'],
})
export class ObservationListComponent implements OnInit {
  segmentCtrl = new FormControl();

  segments = [{
    text: 'ALL_O',
    value: 'all',
    checked: true

  },
  {
    text: 'ALERTS',
    value: 'alerts',
    checked: false
  }];

  today = new Date();
  date: Date;
  navData: any = [];
  userData: any = [];
  allData: any = [];
  segmentValue = 'all';

  constructor(
    public foodAndNutrientIntake: FoodAndNutrientService,
    public patientService: PractitionerService,
    public firebaseService: FirebaseService,
    public router: Router) { }


  ngOnInit() {

  }

  async getObs(date: Date) {
    this.date = date;
    this.userData = [];
    const start = new Date(date.setHours(0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59));

    this.firebaseService.getAllUserAndObservationsWithDate(start, end).then(data => {
      this.allData = data;
      this.navData.push(data.practitioner);
      if (this.segmentValue === 'all') {
        this.userData = data;
      } else {
        this.userData = data.filter(user => user.calories > 2000);
      }
    });
  }

  segmentChange(event: any) {


      this.segmentValue = event.detail.value;
      if (this.segmentValue === 'all') {
        this.userData = this.allData;

      } else {
        this.userData = this.allData.filter(user => user.calories > 2000);
      }
  }


  navToDetails(id: any, date: Date) {
    setTimeout(() => {

      const k: NavigationExtras = {
        state: {
          id,
          date,
        }
      };
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.userData.length; i++) {
        if (id === this.userData[i].id) {
          k.state.id = this.userData[i].id;
        }
        k.state.date = this.date;
        this.router.navigate(['main/patient/patient-details'], k);
      }
    }, 500);

  }


}
