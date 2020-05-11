import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-healtline',
  templateUrl: './healtline.component.html',
  styleUrls: ['./healtline.component.scss'],
})



export class HealtlineComponent implements OnInit {
  @Output() notifyUser = new EventEmitter();

  genderCtrl = new FormControl([Validators.required]);
  heightCtrl = new FormControl([Validators.required]);
  weightCtrl = new FormControl([Validators.required]);
  ageCtrl = new FormControl([Validators.required]);

  bmr: any;
  bmrch: any;
  bmrchg: any;
  bmrp: any;
  bmrpg: any;
  bmrf: any;
  bmrfg: any;
  maintanceChart: Chart;
  wlbmr: any;
  wlch: any;
  wlchg: any;
  wlpg: any;
  wlfg: any;
  wlp: any;
  wlf: any;
  weightLoss: Chart;

  wgbmr: any;
  wgpg: any;
  wgchg: any;
  wgfatg: any;
  wgp: any;
  wgch: any;
  wgfat: any;
  weightGainChart: Chart;


  isShow = false;
  spinner = false;
  Gender = [
    {
      type: 'Male',
      label : 'MALE'
    }, {
      type: 'Female',
      label: 'FEMALE',
    }];



  constructor(public alertController: AlertController) {



  }

  async ngOnInit() {
    this.setForms();



  }




  setForms() {
    if (this.genderCtrl.valueChanges) {
      this.ageCtrl.reset();
      this.weightCtrl.reset();
      this.heightCtrl.reset();
      this.isShow = false;

    }

  }


  async calculate() {

    if (this.genderCtrl.value === null || this.ageCtrl.value === null || this.weightCtrl.value === null || this.heightCtrl.value === null) {
      this.isShow = false;

      const alert = await this.alertController.create({
        header: 'Figyelem!',
        message: 'Kérem rögzitse a megfelelő input paramétereket!',
        buttons: ['OK'],
      });

      await alert.present();
      const result = await alert.onDidDismiss();
      console.log(result);


    } else {


      if (this.genderCtrl.value === 'Male') {

        console.log('Male');
        this.isShow = true;

        this.bmr = 66 + (13.7 * this.weightCtrl.value) + (5 * this.heightCtrl.value) - (6.8 * this.ageCtrl.value);

        this.bmrch = this.bmr * 0.55;
        this.bmrchg = this.bmrch / 4.1;

        this.bmrp = this.bmr * 0.35;
        this.bmrpg = this.bmrp / 4.1;

        this.bmrf = this.bmr * 0.15;
        this.bmrfg = this.bmrf / 9.3;



        const wlodd = 0.2;
        this.wlbmr = this.bmr - (this.bmr * wlodd);

        this.wlch = this.wlbmr * 0.55;
        this.wlchg = this.wlch / 4.1;

        this.wlp = this.wlbmr * 0.35;
        this.wlpg = this.wlp / 4.1;


        this.wlf = this.wlbmr * 0.15;
        this.wlfg = this.wlf / 9.1;



        const wgodd = 0.2;
        this.wgbmr = this.bmr + (this.bmr * wgodd);

        this.wgch = this.wgbmr * 0.55;
        this.wgchg = this.wgch / 4.1;

        this.wgp = this.wgbmr * 0.35;
        this.wgpg = this.wgp / 4.1;


        this.wgfat = this.wgbmr * 0.15;
        this.wgfatg = this.wgfat / 9.1;

        // BMR= 66 + (13,7 * testsúly kg-ban) + (5 * magasság centiben) – (6,8 * életkor)

      } else if (this.genderCtrl.value === 'Female') {
        this.isShow = true;
        this.bmr = 655 + (9.6 * this.weightCtrl.value) + (1.7 * this.heightCtrl.value) - (4.7 * this.ageCtrl.value);
        this.bmrch = this.bmr * 0.55;
        this.bmrchg = this.bmrch / 4.1;
        this.bmrp = this.bmr * 0.15;
        this.bmrpg = this.bmrp / 4.1;
        this.bmrf = this.bmr * 0.35;
        this.bmrfg = this.bmrf / 9.3;
        const wlodd = 0.2;
        this.wlbmr = this.bmr - (this.bmr * wlodd);
        this.wlch = this.wlbmr * 0.55;
        this.wlchg = this.wlch / 4.1;
        this.wlp = this.wlbmr * 0.35;
        this.wlpg = this.wlp / 4.1;
        this.wlf = this.wlbmr * 0.15;
        this.wlfg = this.wlf / 9.1;
        const wgodd = 0.2;
        this.wgbmr = this.bmr + (this.bmr * wgodd);
        this.wgch = this.wgbmr * 0.55;
        this.wgchg = this.wgch / 4.1;
        this.wgp = this.wgbmr * 0.35;
        this.wgpg = this.wgp / 4.1;
        this.wgfat = this.wgbmr * 0.15;
        this.wgfatg = this.wgfat / 9.1;


      }

      this.chartMaintace();
      this.chartWeightGain();
      this.chartWeightLoss();

    }


  }

  chartMaintace() {

    setTimeout(() => {

      const bmr = this.bmrp;
      const bmrch = this.bmrch;
      const bmrf = this.bmrf;


      const ctx = document.getElementById('1');
      this.maintanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              bmrch,
              bmr,
              bmrf

            ],
            backgroundColor: [
              'rgb(147,112,219)',
              'rgb(255,140,0)',
              'rgb(255,0,0)'
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Carbonhydrate',
            'Protein',
            'Fat',
          ]
        },
        options: {
          responsive: true
        }

      }, 3000);
      this.maintanceChart().update();

    });


  }


  chartWeightGain() {


    setTimeout(() => {

      const bmr = this.wgch;
      const bmrch = this.wgp;
      const bmrf = this.wgfat;



      const ctx = document.getElementById('2');
      this.weightGainChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              bmr,
              bmrch,
              bmrf

            ],
            backgroundColor: [
              'rgb(147,112,219)',
              'rgb(255,140,0)',
              'rgb(255,0,0)'
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Carbonhydrate',
            'Protein',
            'Fat',
          ]
        },
        options: {
          responsive: true
        }

      }, 3000);
      this.weightGainChart().update();

    });


  }


  chartWeightLoss() {


    setTimeout(() => {

      const bmr = this.wlch;
      const bmrch = this.wlp;
      const bmrf = this.wlf;


      const ctx = document.getElementById('3');
      this.weightLoss = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              bmr,
              bmrch,
              bmrf

            ],
            backgroundColor: [
              'rgb(147,112,219)',
              'rgb(255,140,0)',
              'rgb(255,0,0)'
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Carbonhydrate',
            'Protein',
            'Fat',
          ]
        },
        options: {
          responsive: true
        }
      }, 3000);
      this.weightLoss().update();

    });





  }


}
