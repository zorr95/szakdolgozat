
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PractitionerService } from '../../services/practitioner.service';
import { IPractitioner } from '@ahryman40k/ts-fhir-types/lib/R4';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  countryCtrl = new FormControl();
  genderCtrl = new FormControl();
  familyCtrl = new FormControl();
  givenCtrl = new FormControl();
  prefixCtrl = new FormControl();
  lineCtrl = new FormControl();
  cityCtrl = new FormControl();
  postalCodeCtrl = new FormControl();
  emailCtrl = new FormControl();
  phoneCtrl = new FormControl();
  uid: any;
  updatePerson = true;

  Gender = [
    {
      type: 'Male',
      label: 'MALE',
    }, {
      type: 'Fermale',
      label: 'FEMALE',

    }, {
      type: 'Other',
      label: 'OTHER',

    }];

  constructor(public patientService: PractitionerService, private afs: AngularFirestore,
    private router: Router, public route: ActivatedRoute, public alertController: AlertController, public changeDet: ChangeDetectorRef) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let id;
        id = this.router.getCurrentNavigation().extras.state.id;
        this.uid = id;
        console.log(this.uid);
      }
      this.updateCheck();


    });

  }

  ngOnInit() {

  }
  async dataModify() {
    if (this.uid === undefined) {
      // tslint:disable-next-line:max-line-length
      if (this.genderCtrl.untouched || this.familyCtrl.value === null ||  this.givenCtrl.value === null || this.cityCtrl.value === null ||
        this.countryCtrl.value === null || this.postalCodeCtrl.value === null || this.lineCtrl.value === null ||
        this.emailCtrl.value === null || this.phoneCtrl.value === null) {

        const alert = await this.alertController.create({
          header: 'Hiba!',
          message: 'Kérem adja meg a beteg adatait !',
          buttons: ['OK'],
        });
        await alert.present();
        const result = await alert.onDidDismiss();
      } else {
        this.save();
      }
    } else if (this.uid !== undefined) {
      this.update();
    }
  }

  updateCheck() {

    if (this.uid !== undefined) {
      this.updatePerson = true;
      this.patientService.getPractitionerbyId(this.uid).subscribe(element => {
        console.log(element);

        this.genderCtrl.setValue(element.gender);
        this.prefixCtrl.setValue(element.name[0].prefix);
        this.familyCtrl.setValue(element.name[0].family);
        this.givenCtrl.setValue(element.name[0].given);
        this.countryCtrl.setValue(element.address[0].country);
        this.cityCtrl.setValue(element.address[0].city);
        this.lineCtrl.setValue(element.address[0].line[0]);
        this.postalCodeCtrl.setValue(element.address[0].postalCode);
        this.emailCtrl.setValue(element.telecom[0].value);
        this.phoneCtrl.setValue(element.telecom[1].value);

      });
      this.changeDet.detectChanges();
    }
  }


  async save() {


    const data: IPractitioner = {
      resourceType: 'Practitioner',

      id: this.afs.createId(),
      meta: {
        lastUpdated: new Date().toISOString()
      },
      address: [{
        city: this.cityCtrl.value, country: this.countryCtrl.value, line: [this.lineCtrl.value],
        postalCode: this.postalCodeCtrl.value
      }],
      gender: this.genderCtrl.value,
      name: [{
        family: this.familyCtrl.value, given: [this.givenCtrl.value], prefix: [this.prefixCtrl.value],
        text: this.familyCtrl.value + this.givenCtrl.value + this.prefixCtrl.value,
      }],

      telecom: [{ value: this.emailCtrl.value }, { value: this.phoneCtrl.value }]


    };


    this.patientService.addPractitioner(data).then(data2 => {
      console.log(data2);

      this.countryCtrl.reset();
      this.emailCtrl.reset();
      this.familyCtrl.reset();
      this.genderCtrl.reset();
      this.givenCtrl.reset();
      this.postalCodeCtrl.reset();
      this.phoneCtrl.reset();
      this.prefixCtrl.reset();
      this.lineCtrl.reset();

      this.router.navigate(['main/patient/']);

    });



  }

  update() {


    const data: IPractitioner = {
      resourceType: 'Practitioner',

      id: this.uid,
      meta: {
        lastUpdated: new Date().toISOString()
      },
      address: [{
        city: this.cityCtrl.value, country: this.countryCtrl.value, line: [this.lineCtrl.value],
        postalCode: this.postalCodeCtrl.value
      }],
      gender: this.genderCtrl.value,
      name: [{
        family: this.familyCtrl.value, given: this.givenCtrl.value, prefix: this.prefixCtrl.value,
        text: this.familyCtrl.value + this.givenCtrl.value,
      }],

      telecom: [{ value: this.emailCtrl.value }, { value: this.phoneCtrl.value }]


    };


    this.patientService.updatePractitioner(data).then(data2 => {
      console.log(data2);


      this.router.navigate(['main/patient/']);

    });

    this.countryCtrl.reset();
    this.emailCtrl.reset();
    this.familyCtrl.reset();
    this.genderCtrl.reset();
    this.givenCtrl.reset();
    this.postalCodeCtrl.reset();
    this.phoneCtrl.reset();
    this.prefixCtrl.reset();
    this.lineCtrl.reset();

  }




  discard() {
    this.router.navigate(['main/patient/']);

  }

  resetForm() {
    this.countryCtrl.reset();
    this.emailCtrl.reset();
    this.familyCtrl.reset();
    this.genderCtrl.reset();
    this.givenCtrl.reset();
    this.postalCodeCtrl.reset();
    this.phoneCtrl.reset();
    this.prefixCtrl.reset();
    this.lineCtrl.reset();
  }



}

