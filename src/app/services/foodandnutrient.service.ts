import { Injectable, EventEmitter, Output } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { FoodAndNutrientIntakeObservationApi, ObservationConstants } from '@inclouded/fhir-observation';
import { Observable } from 'rxjs';
import { IObservation } from '@ahryman40k/ts-fhir-types/lib/R4';
import { Paging, OrderBy } from '@inclouded/fhirapi';

@Injectable({
  providedIn: 'root'
})




export class FoodAndNutrientService {
  @Output() notifyUser = new EventEmitter();

  FoodAndNutrientIntakeObservationApi: FoodAndNutrientIntakeObservationApi;
  constructor(private afs: AngularFirestore) {
    this.FoodAndNutrientIntakeObservationApi = new FoodAndNutrientIntakeObservationApi(this.afs);


  }

  getAll(): Observable<any[]> {
    return this.FoodAndNutrientIntakeObservationApi.getAll();
  }

  getFoodAndNutrientIntakeByPatient(id: string) {
    return this.FoodAndNutrientIntakeObservationApi.getFoodAndNutrientIntakeByPatient(id);
  }

  getFoodAndNutrientIntakeByDate(fromDate: Date, toDate: Date) {
    return this.FoodAndNutrientIntakeObservationApi.getFoodAndNutrientIntakeByDate(fromDate, toDate);
  }

  addFood(data: IObservation) {
    return this.FoodAndNutrientIntakeObservationApi.add(data);

  }

  updateFood(data: IObservation) {
    return this.FoodAndNutrientIntakeObservationApi.update(data);
  }



  deleteFood(id: string) {
    return this.FoodAndNutrientIntakeObservationApi.delete(id);

  }


  getFoodById(id: string) {

    return this.FoodAndNutrientIntakeObservationApi.getById(id);


  }





}




