import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FoodAndNutrientService } from '../services/foodandnutrient.service';
import { Chart } from 'chart.js';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { fadeInContent } from '@angular/material';
import { of } from 'rxjs';



@Component({
  selector: 'app-diaries',
  templateUrl: './diaries.component.html',
  styleUrls: ['./diaries.component.scss'],
})
export class DiariesComponent implements OnInit {
  @Output() notifyUser = new EventEmitter();

  AllFood: any[] = [];

  chartData: any = [];
  isShow = false;
  today = new Date();
  demoChart: Chart;
  chartKcal: any;
  chartProtein: any;
  chartCh: any;
  chartFat: any;
  show = false;
  try: any;
  asd: any;
  user: any;
  loading = true;
  chartDisplay = false;
  FilteredFood: any = [];
  startByPick = new Date();
  endByPick = new Date();
  now: any;


  Meats = [
    {
      type: 'Breakfast',
      label: 'BREAKFAST',
      hourStart: 6,
      hourEnd: 10,
      values: new Array()
    },
    {
      type: 'Brunch',
      label: 'BRUNCH',
      hourStart: 10,
      hourEnd: 12,
      values: new Array()
    },
    {
      type: 'Lunch',
      label: 'LUNCH',
      hourStart: 12,
      hourEnd: 15,
      values: new Array()
    },
    {
      type: 'Snack',
      label: 'SNACK',
      hourStart: 15,
      hourEnd: 18,
      values: new Array()
    }
    , {
      type: 'Dinner',
      label: 'DINNER',
      hourStart: 18,
      hourEnd: 23,
      values: new Array()
    }
    , {
      type: 'Other',
      label: 'OTHER',
      hourStart: 0,
      hourEnd: 6,
      values: new Array()
    }
  ];


  constructor(private router: Router, public foodAndNutrientService: FoodAndNutrientService, private changeDetector: ChangeDetectorRef,
    // tslint:disable-next-line:max-line-length
    public alertController: AlertController, private storage: Storage) {
    this.getUserId();
    this.listFood();
    this.chart();


  }

  async ngOnInit() {


  }

  async getUserId() {

    const userstorage = await this.storage.get('user');
    this.user = userstorage.uid;
    console.log(this.user);
  }

  navToAdd(type: string) {
    const k: NavigationExtras = {
      state: {
        type,
      }
    };
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.Meats.length; i++) {
      if (type === this.Meats[i].type) {
        k.state.type = this.Meats[i].type;
      }


    }



    this.router.navigate(['main/diaries/add'], k);
  }



  navToEdit(values: any = []) {
    const k: NavigationExtras = {
      state: {
        values,
      }
    };
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.Meats.length; i++) {

      if (values === this.Meats[i].values) {

        k.state.values = this.Meats[i].values;
      }









      this.router.navigate(['main/diaries/add'], k);
    }

  }


  async presentAlertConfirm(id: string, valueString: string) {

    const msg: any = ['<ion-row> Biztosan törölni szeretné az adott '  + valueString + '  névvel rendelkező ételt ? </ion-row>'];
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


            this.deleteFood(id);

            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }


  listFood() {
    this.show = true;
    this.loading = false;
    this.today.setHours(0, 0, 0);
    const start = new Date(this.today.setHours(0, 0, 0));
    const end = new Date(this.today.setHours(23, 59, 59));
    this.foodAndNutrientService.getFoodAndNutrientIntakeByDate(start, end).subscribe(data3 => {
      this.loading = true;
      this.Meats[0].values = [];
      this.Meats[1].values = [];
      this.Meats[2].values = [];
      this.Meats[3].values = [];
      this.Meats[4].values = [];
      this.Meats[5].values = [];
      this.AllFood = data3;
      console.log(this.AllFood);
      this.AllFood.forEach(element => {
        this.show = true;
        if (element.subject.reference === this.user) {
          this.now = element.subject.reference;
          if (element.effectiveDateTime) {
            const date = new Date(element.effectiveDateTime);
            const hours = date.getUTCHours() > 24 ? date.getHours() - 12 : date.getHours();
            if (hours >= this.Meats[0].hourStart && hours < this.Meats[0].hourEnd) {
              this.Meats[0].values.push(element);
            }
            if (hours >= this.Meats[1].hourStart && hours < this.Meats[1].hourEnd) {
              this.Meats[1].values.push(element);
            }
            if (hours >= this.Meats[2].hourStart && hours < this.Meats[2].hourEnd) {
              this.Meats[2].values.push(element);
            }
            if (hours >= this.Meats[3].hourStart && hours < this.Meats[3].hourEnd) {
              this.Meats[3].values.push(element);
            }
            if (hours >= this.Meats[4].hourStart && hours < this.Meats[4].hourEnd) {
              this.Meats[4].values.push(element);
            }
            if (hours >= this.Meats[5].hourStart && hours < this.Meats[5].hourEnd) {
              this.Meats[5].values.push(element);
            }
          }
        } else if (element.subject.reference !== this.user) {
          this.loading = true;
          this.show = true;
        }
      });
      this.changeDetector.detectChanges();

      this.chart();



    });


  }


  deleteFood(id: string) {


    this.foodAndNutrientService.deleteFood(id).then(() => {
      this.listFood();
      this.chart();


    });
    this.changeDetector.detectChanges();
  }





  nextDay() {


    this.today = new Date(this.today.getTime() + 1000 * 60 * 60 * 24);
    console.log(this.today);
    this.listFood();
    this.chart();

  }



  beforeDay() {

    this.today = new Date(this.today.getTime() - 1000 * 60 * 60 * 24);
    console.log(this.today);

    this.listFood();
    this.chart();



  }

  jumpToday() {

    this.today = new Date();
    console.log(this.today);

    this.listFood();
    this.chart();


  }


  addEvent(event: MatDatepickerInputEvent<Date>) {


    this.today = new Date(event.value.setHours(0, 0, 0));
    this.today = new Date(event.value.setHours(23, 59, 59));
    this.listFood();
    this.chart();



  }





  chart() {

    const start = new Date(this.today.setHours(0, 0, 0));
    const end = new Date(this.today.setHours(23, 59, 59));
    const kcal = [];
    const prot = [];
    const ch = [];
    const fat = [];
    this.chartKcal = 0;
    this.chartProtein = 0;
    this.chartDisplay = false;
    this.chartData = [];

    this.chartCh = 0;
    this.chartFat = 0;
    this.foodAndNutrientService.getFoodAndNutrientIntakeByDate(start, end).subscribe(element1 => {

      this.chartData = [];

      this.chartData = element1;
      if (this.chartData.length > 0  && this.user === this.now) {
        console.log(this.chartData);
        this.chartDisplay = true;
        this.show = true;
        this.chartData.forEach((data) => {
          if (data.subject.reference === this.user) {
            this.chartDisplay = true;
            this.show = true;
            kcal.push(data.component[1].valueQuantity.value);
            this.chartKcal = 0;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < kcal.length; i++) {
              this.chartKcal += kcal[i];
              console.log(this.chartKcal);
            }
            prot.push(data.component[2].valueQuantity.value);
            this.chartProtein = 0;
            // tslint:disable-next-line:prefer-for-of
            for(let i = 0; i < prot.length; i++) {
              this.chartProtein += prot[i];
              console.log(this.chartProtein);
            }
            ch.push(data.component[3].valueQuantity.value);
            this.chartCh = 0;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < ch.length; i++) {
              this.chartCh += ch[i];
              console.log(this.chartCh);
            }
            fat.push(data.component[4].valueQuantity.value);
            this.chartFat = 0;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < fat.length; i++) {
              this.chartFat += fat[i];
              console.log(this.chartFat);
            }
          } else if (!this.user) {
            this.chartDisplay = false;
            this.loading = true;
          }
        });
        const ctx = document.getElementById('myChart');
        this.demoChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
            labels: [' Energie/kcal ', 'Protein/g', 'Ch/g', 'Fat/g'],
            datasets: [{
              label: 'Amount',
              data: [this.chartKcal.toFixed(2), this.chartProtein.toFixed(2), this.chartCh.toFixed(2), this.chartFat.toFixed(2)],
              backgroundColor: [
                'rgba(58,174,89)',
                'rgb(147,112,219)',
                'rgb(255,140,0)',
                'rgb(255,0,0)'

              ],
              borderColor: [
                'rgba(58,174,89)',
                'rgb(147,112,219)',
                'rgb(255,140,0)',
                'rgb(255,0,0)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,

            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,

                }
              }]
            }

          }


        });

        this.demoChart.update();



      } else {


        this.chartDisplay = false;
      }
    });

  }



}
