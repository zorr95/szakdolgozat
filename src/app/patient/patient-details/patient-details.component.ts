import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodAndNutrientService } from 'src/app/services/foodandnutrient.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Chart } from 'chart.js';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  today = new Date();
  food: any;
  userFoods = [];
  uid: any;
  show = false;
  loading = true;
  demoChart: Chart;
  chartDisplay = true;
  chartKcal: any;
  chartCh: any;
  chartProtein: any;
  chartFat: any;
  chartData = [];
  stateDate: any;
  start: any;
  end: any;
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

  constructor(private router: Router, public route: ActivatedRoute, public foodAndNutrientService: FoodAndNutrientService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let id;
        id = this.router.getCurrentNavigation().extras.state.id;
        this.uid = id;
        let date;
        date = this.router.getCurrentNavigation().extras.state.date;
        this.stateDate = date;
        console.log(this.stateDate);
      }

    });


  }

  ngOnInit() {
    this.getFoodIntake();

    this.chart();
  }


  getFoodIntake() {
    this.loading = false;
    this.show = false;
    this.food = [];
    this.today.setHours(0, 0, 0);
    if (this.stateDate) {
      this.start = new Date(this.stateDate.setHours(0, 0, 0));
      this.end = new Date(this.stateDate.setHours(23, 59, 59));
    } else {
      this.start = new Date(this.today.setHours(0, 0, 0));
      this.end = new Date(this.today.setHours(23, 59, 59));
    }
    this.foodAndNutrientService.getFoodAndNutrientIntakeByDate(this.start, this.end).subscribe(element => {
      this.food = element;
      console.log(this.food);
      this.userFoods = this.food.filter(element2 => element2.subject.reference === this.uid);
      if (this.userFoods.length !== 0) {
        this.show = true;
        this.loading = true;
        console.log(this.userFoods);
        this.Meats[0].values = [];
        this.Meats[1].values = [];
        this.Meats[2].values = [];
        this.Meats[3].values = [];
        this.Meats[4].values = [];
        this.Meats[5].values = [];

        this.userFoods.forEach(data3 => {




          if (data3.effectiveDateTime) {

            const date = new Date(data3.effectiveDateTime);
            const hours = date.getUTCHours() > 24 ? date.getHours() - 12 : date.getHours();
            //  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            if (hours >= this.Meats[0].hourStart && hours < this.Meats[0].hourEnd) {
              this.Meats[0].values.push(data3);
            }
            if (hours >= this.Meats[1].hourStart && hours < this.Meats[1].hourEnd) {
              this.Meats[1].values.push(data3);
            }
            if (hours >= this.Meats[2].hourStart && hours < this.Meats[2].hourEnd) {
              this.Meats[2].values.push(data3);
            }
            if (hours >= this.Meats[3].hourStart && hours < this.Meats[3].hourEnd) {
              this.Meats[3].values.push(data3);
            }
            if (hours >= this.Meats[4].hourStart && hours < this.Meats[4].hourEnd) {
              this.Meats[4].values.push(data3);
            }
            if (hours >= this.Meats[5].hourStart && hours < this.Meats[5].hourEnd) {
              this.Meats[5].values.push(data3);
            }
          }

        });
        this.chart();
      } else {
        this.loading = true;

      }

    });




  }

  nextDay() {


    this.today = new Date(this.today.getTime() + 1000 * 60 * 60 * 24);
    console.log(this.today);
    this.getFoodIntake();
    this.chart();

  }



  beforeDay() {

    this.today = new Date(this.today.getTime() - 1000 * 60 * 60 * 24);
    console.log(this.today);
    this.getFoodIntake();
    this.chart();





  }



  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (this.stateDate) {

      event.value = new Date(this.stateDate);
    } else {
      this.today = new Date(event.value.setHours(0, 0, 0));
      this.today = new Date(event.value.setHours(23, 59, 59));
    }

    this.getFoodIntake();
    this.chart();




  }

  chart() {
    setTimeout(() => {

      const kcal = [];
      const prot = [];
      const ch = [];
      const fat = [];
      this.chartKcal = 0;
      this.chartProtein = 0;
      this.chartCh = 0;
      this.chartFat = 0;
      this.chartDisplay = true;

      if (this.stateDate > 0) {
        this.start = new Date(this.stateDate.setHours(0, 0, 0));
        this.end = new Date(this.stateDate.setHours(23, 59, 59));
      } else if (this.stateDate < 0) {
        this.start = new Date(this.today.setHours(0, 0, 0));
        this.end = new Date(this.today.setHours(23, 59, 59));
      }
      this.foodAndNutrientService.getFoodAndNutrientIntakeByDate(this.start, this.end).subscribe(element => {
        this.chartData = element;
        this.chartData.forEach((data) => {
          if (data.subject.reference === this.uid) {
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
            for (let i = 0; i < prot.length; i++) {
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
          }

        });






        const ctx = document.getElementById('myChart');
        this.demoChart = new Chart(ctx, {

          type: 'horizontalBar',
          data: {
            labels: [' Energie/kcal ', 'Protein/g', 'Ch/g', 'Fat/g'],
            datasets: [{
              label: [],
              // tslint:disable-next-line:max-line-length
              data: [this.chartKcal, this.chartProtein, this.chartCh, this.chartFat],
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

      });
    });



  }
}
