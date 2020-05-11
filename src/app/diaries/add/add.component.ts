import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { IObservation } from '@ahryman40k/ts-fhir-types/lib/R4';
import { ObservationConstants } from '@inclouded/fhir-observation';
import { FoodAndNutrientService } from 'src/app/services/foodandnutrient.service';
import { Router, ActivatedRoute } from '@angular/router';
import foodData from '../../../assets/foodData.json';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  @Output() notifyUser = new EventEmitter();

  data: any;
  v: number;
  scategory = null;
  time: any;
  number: string;
  addFood: FormGroup;
  compareArray: any = [];
  categoryCtrl = new FormControl([Validators.required]);
  typeCtrl = new FormControl([Validators.required]);
  measuresCtrl = new FormControl([Validators.required]);
  numberCtrl = new FormControl([Validators.required]);
  dateCtrl = new FormControl([Validators.required]);
  filteredFoods: any = [];
  today = new Date();
  today2 = new Date().toISOString;
  timeChange = true;
  showTypes = false;
  newProtein: number;
  newCh: number;
  newFat: number;
  newCalorie: number;
  food: any;
  id: any;
  t: string;
  f: any;
  user: any;
  test: any = [];
  updateTrue = true;
  constructor(public route: ActivatedRoute, public fb: FormBuilder,
    public foodAndNutrientService: FoodAndNutrientService, public router: Router, public alertController: AlertController
    , private afs: AngularFirestore, private storage: Storage) {


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let type;
        type = this.router.getCurrentNavigation().extras.state.type;
        this.data = type;
        console.log(this.data);
        let values;
        values = this.router.getCurrentNavigation().extras.state.values;
        this.t = values;
      }
      this.readFoodsFromJSON();
      this.compare();

    });
  }
  category: any = [];
  measures: any = [
    { name: 'g', value: 'g' },
    { name: 'dkg', value: 'dkg' },
    { name: 'kg', value: 'kg' },
  ];
  async ngOnInit() {

    this.measuresMath();
    this.updateCheck();
    this.setTime();
    const userstorage = await this.storage.get('user');
    this.user = userstorage.uid;
    console.log(this.user);
  }




  readFoodsFromJSON() {
    const json = foodData;
    const foodArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < json.food.length; i++) {
      foodArray.push(json.food[i]);
      this.food = foodArray;
    }
  }



  async dataModify() {




    if (this.t === undefined) {
      // tslint:disable-next-line:max-line-length
      if (this.categoryCtrl.untouched || this.typeCtrl.value === null || this.numberCtrl.value === null || this.measuresCtrl.value === null || this.dateCtrl.value === null) {

        const alert = await this.alertController.create({
          header: 'Error!',
          message: 'Please enter input parameters!',
          buttons: ['OK'],
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log(result);


      } else {
        this.saveFood();
      }
    } else if (this.t !== undefined) {
      this.updateFood();

    }
  }
  updateCheck() {

    if (this.t !== undefined) {
      this.showTypes = true;
      this.updateTrue = true;
      this.foodAndNutrientService.getFoodById(this.t).subscribe(element => {
        console.log(element);
        this.categoryCtrl.setValue(element.category[0].text);
        this.typeCtrl.setValue(element.valueString);
        this.measuresCtrl.setValue(element.component[0].valueQuantity.unit);
        this.numberCtrl.setValue(element.component[0].valueQuantity.value);
        this.dateCtrl.setValue(element.effectiveDateTime);
      });
    }
  }
  setTime() {

    if (this.data !== undefined) {

      this.timeChange = true;


      if (this.data === 'Breakfast') {
        const today = new Date(this.today.setHours(6, 0, 0)).toISOString();
        this.dateCtrl.setValue(today);
      }
      if (this.data === 'Brunch') {
        const today = new Date(this.today.setHours(10, 0, 0)).toISOString();
        this.dateCtrl.setValue(today);
      }
      if (this.data === 'Lunch') {
        const today = new Date(this.today.setHours(12, 0, 0)).toISOString();
        this.dateCtrl.setValue(today);
      }
      if (this.data === 'Snack') {
        const today = new Date(this.today.setHours(15, 0, 0)).toISOString();
        this.dateCtrl.setValue(today);
      }
      if (this.data === 'Dinner') {
        const today = new Date(this.today.setHours(18, 0, 0)).toISOString();
        this.dateCtrl.setValue(today);
      }
      if (this.data === 'Other') {
        const today = new Date(this.today.setHours(0, 0, 0)).toISOString();
        this.dateCtrl.setValue(today);
      }
    }
  }


  compare() {


    this.food.forEach(f => {
      if (!this.category.includes(f.value)) {

        this.category.push(f.value);
      }
      const result = this.food.filter(element => element.value === this.categoryCtrl.value);
      console.log(result);
      this.filteredFoods = result;
      this.test = [];
      this.filteredFoods.forEach(element => {
        this.test.push(element.name);
        console.log(this.test);
        if (this.categoryCtrl.value === element.value) {

          this.showTypes = true;
          this.typeCtrl.reset();
          this.numberCtrl.reset();
          this.measuresCtrl.reset();
        } else {
          this.showTypes = false;
        }
      });
    });
  }

  measuresMath() {
    this.filteredFoods.forEach(element => {
      if (this.numberCtrl.valueChanges) {
        if (this.measuresCtrl.value !== 'kg' && this.measuresCtrl.value !== 'dkg') {
          this.v = this.numberCtrl.value;
          const k = this.numberCtrl.value / 100;
          k.toFixed(2);
          console.log(this.v);
          this.newProtein = k * element.protein.toFixed(2);
          this.newProtein.toFixed(2);
          console.log(this.newProtein.toFixed(2));
          this.newCalorie = k * element.calorie;
          this.newCalorie.toFixed(2);

          console.log(this.newCalorie.toFixed(2));
          this.newCh = k * element.ch;
          this.newCh.toFixed(2);

          console.log(this.newCh);
          this.newFat = k * element.fat;
          this.newFat.toFixed(2);
          console.log(this.newFat.toFixed(2));

        }
        if (this.measuresCtrl.value !== 'kg' && this.measuresCtrl.value !== 'g') {
          this.v = this.numberCtrl.value * 10;
          this.v.toFixed(2);

          console.log(this.v.toFixed(2));
          this.newProtein = this.v * element.protein / 100;
          this.newProtein.toFixed(2);
          console.log(this.newProtein.toFixed(2));
          this.newCalorie = this.v * element.calorie / 100;
          this.newCalorie.toFixed(2);

          console.log(this.newCalorie.toFixed(2));
          this.newCh = this.v * element.ch / 100;
          this.newCh.toFixed(2);

          console.log(this.newCh.toFixed(2));
          this.newFat = this.v * element.fat / 100;
          this.newFat.toFixed(2);

          console.log(this.newFat.toFixed(2));

        }
        if (this.measuresCtrl.value !== 'g' && this.measuresCtrl.value !== 'dkg') {
          this.v = this.numberCtrl.value * 1000;
          this.v.toFixed(2);

          console.log(this.v.toFixed(2));
          this.newProtein = this.v * element.protein / 100;
          this.newProtein.toFixed(2);

          console.log(this.newProtein.toFixed(2));
          this.newCalorie = this.v * element.calorie / 100;
          this.newCalorie.toFixed(2);

          console.log(this.newCalorie.toFixed(2));
          this.newCh = this.v * element.ch / 100;
          this.newCh.toFixed(2);

          console.log(this.newCh.toFixed(2));
          this.newFat = this.v * element.fat / 100;
          this.newFat.toFixed(2);

          console.log(this.newFat);

        }
      }

    });

  }

  updateFood() {

    const data: IObservation = {
      resourceType: 'Observation' as 'Observation',
      id: this.t,
      meta: {
        lastUpdated: new Date().toISOString()
      },
      basedOn: [{
        reference: 'basedOnTest01'
      }],
      code: {
        coding: [{
          system: ObservationConstants.ObservationSystem,
          code: ObservationConstants.FoodAndNutrientIntakepanelCode,
          display: ObservationConstants.FoodAndNutrientIntakepanelCodeDisplay
        }],
        text: ObservationConstants.FoodAndNutrientIntakepanelCodeText
      },
      subject: {
        reference: this.user
      },
      issued: this.dateCtrl.value,
      performer: [{
        reference: this.user
      }],
      effectiveDateTime: this.dateCtrl.value,
      valueString: this.typeCtrl.value,
      category: [{
        text: this.categoryCtrl.value
      }],
      component: [{
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.FoodAmountsPanelCode,
            display: ObservationConstants.FoodAmountsPanelDisplay
          }],
          text: ObservationConstants.FoodAmountsPanelCodeText
        },
        valueQuantity: {
          value: this.v,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.CalorieIntakePanelCode,
            display: ObservationConstants.CalorieIntakePanelCodeDisplay
          }],
          text: ObservationConstants.CalorieIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newCalorie,
          unit: 'kcal',
          system: 'http://unitsofmeasure.org',
          code: 'kcal'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.ProteinIntakePanelCode,
            display: ObservationConstants.ProteinIntakePanelDisplay
          }],
          text: ObservationConstants.ProteinIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newProtein,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.CarbohydrateIntakePanelCode,
            display: ObservationConstants.CarbohydrateIntakePanelDisplay
          }],
          text: ObservationConstants.CarbohydrateIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newCh,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.FatIntakePanelCode,
            display: ObservationConstants.FatIntakePanelDisplay
          }],
          text: ObservationConstants.FatIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newFat,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      ]
    };



    this.foodAndNutrientService.updateFood(data).then(data2 => {
      console.log(data2);

    });





    this.categoryCtrl.reset();
    this.typeCtrl.reset();
    this.measuresCtrl.reset();
    this.numberCtrl.reset();
    this.dateCtrl.reset();

    this.router.navigate(['main/diaries/']);



  }



  async saveFood() {






    const data: IObservation = {
      resourceType: 'Observation' as 'Observation',
      id: this.afs.createId(),
      meta: {
        lastUpdated: new Date().toISOString()
      },
      basedOn: [{
        reference: 'basedOnTest01'
      }],
      code: {
        coding: [{
          system: ObservationConstants.ObservationSystem,
          code: ObservationConstants.FoodAndNutrientIntakepanelCode,
          display: ObservationConstants.FoodAndNutrientIntakepanelCodeDisplay
        }],
        text: ObservationConstants.FoodAndNutrientIntakepanelCodeText
      },
      subject: {
        reference: this.user
      },
      issued: this.dateCtrl.value,
      performer: [{
        reference: this.user
      }],
      effectiveDateTime: this.dateCtrl.value,
      valueString: this.typeCtrl.value,
      category: [{
        text: this.categoryCtrl.value
      }],
      component: [{
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.FoodAmountsPanelCode,
            display: ObservationConstants.FoodAmountsPanelDisplay
          }],
          text: ObservationConstants.FoodAmountsPanelCodeText
        },
        valueQuantity: {
          value: this.v,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.CalorieIntakePanelCode,
            display: ObservationConstants.CalorieIntakePanelCodeDisplay
          }],
          text: ObservationConstants.CalorieIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newCalorie,
          unit: 'kcal',
          system: 'http://unitsofmeasure.org',
          code: 'kcal'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.ProteinIntakePanelCode,
            display: ObservationConstants.ProteinIntakePanelDisplay
          }],
          text: ObservationConstants.ProteinIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newProtein,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.CarbohydrateIntakePanelCode,
            display: ObservationConstants.CarbohydrateIntakePanelDisplay
          }],
          text: ObservationConstants.CarbohydrateIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newCh,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      {
        code: {
          coding: [{
            system: ObservationConstants.ObservationSystem,
            code: ObservationConstants.FatIntakePanelCode,
            display: ObservationConstants.FatIntakePanelDisplay
          }],
          text: ObservationConstants.FatIntakePanelCodeText
        },
        valueQuantity: {
          value: this.newFat,
          unit: 'g',
          system: 'http://unitsofmeasure.org',
          code: 'g'
        }
      },
      ]
    };



    this.foodAndNutrientService.addFood(data).then(data2 => {
      console.log(data2);
    });




    this.categoryCtrl.reset();
    this.typeCtrl.reset();
    this.measuresCtrl.reset();
    this.numberCtrl.reset();
    this.dateCtrl.reset();

    this.router.navigate(['main/diaries/']);


  }


  resetForm() {

    this.categoryCtrl.reset();
    this.typeCtrl.reset();
    this.measuresCtrl.reset();
    this.numberCtrl.reset();

  }


  discard() {

    this.router.navigate(['main/diaries/']);

  }







}

