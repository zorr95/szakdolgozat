
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PractitionerService } from '../services/practitioner.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patients: any;
  users: any = [];
  usersSearch: any = [];
  constructor(public practitionerService: PractitionerService, private router: Router,
              private changeDetector: ChangeDetectorRef, public alertController: AlertController) {


  }

  ngOnInit() {
    this.getPatients();


  }


  presentLoadingDefault() {
    setTimeout(() => {
    }, 2000);
  }



  getPatients() {


    this.practitionerService.getPractitioners().subscribe(data5 => {
      this.users = [];
      this.usersSearch = [];
      this.patients = data5;
      this.patients.forEach(element2 => {
        if (element2.role !== 'Admin') {
          this.users.push(element2);
          this.usersSearch.push(element2);
          console.log(this.users);
        }

      });
      this.changeDetector.detectChanges();

    });


  }

  Add() {

    this.router.navigate(['main/patient/add']);

  }

  navToDetails(id: any) {
    const k: NavigationExtras = {
      state: {
        id,
      }
    };
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i].id) {
        k.state.id = this.users[i].id;
      }
      this.router.navigate(['main/patient/patient-details'], k);
    }
  }


  navToEdit(id: any) {
    const k: NavigationExtras = {
      state: {
        id,
      }
    };
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i].id) {
        k.state.id = this.users[i].id;
      }
      this.router.navigate(['main/patient/add'], k);
    }
  }





  searchUser(filterValue: string) {
    this.users = [];
    let filteredUsers = [];
    filterValue = filterValue.toLowerCase();
    const regExp = new RegExp(filterValue + '.*');
    filteredUsers = this.usersSearch.filter(
      asd => regExp.test(asd.name[0].text.toLowerCase()));
    this.users = filteredUsers;

    console.log(this.users);

    this.changeDetector.detectChanges();


  }



  async deleteAlert(id: string, valueString: string) {

    const msg: any = ['<ion-row> Biztosan törölni szeretné a' + valueString + ' nevű beteget? </ion-row>'];
    const alert = await this.alertController.create({
      header: 'Törlés',
      message: msg,
      buttons: [
        {
          text: 'Mégsem',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Törlés',
          role: 'submit',
          handler: () => {


            this.delete(id);

            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }



  delete(id: string) {

    this.practitionerService.deletePractitioner(id).then(element => {

      console.log(element, 'deleted');

      this.getPatients();


    });
    this.changeDetector.detectChanges();

  }


}
