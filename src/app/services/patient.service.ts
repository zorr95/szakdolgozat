import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PatientApi, FirestorePatient } from '@inclouded/fhir-patient';
import { IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import { Observable } from 'rxjs';
import { OrderBy, Paging } from '@inclouded/fhirapi';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientApi: PatientApi;

  constructor(private afs: AngularFirestore) {
    this.patientApi = new PatientApi(this.afs);
  }

  getAllPatient(direction: string, mode?: string, value?: string) {
    const orderBy: OrderBy = { orderBy: 'nameFamily', direction };
    if (value && mode === 'taj') {
      return this.patientApi.getPatientByTAJ(value, orderBy);
    }
    if (value && mode === 'name') {
      return this.patientApi.getPatientByNameSubStr(value, null, orderBy);
    }
    return this.patientApi.getAll(null, orderBy);
  }

  getAll(paging?: Paging, orderBy?: OrderBy): Observable<IPatient[]> {
    return this.patientApi.getAll(paging, orderBy);
  }

  add(data: any, id?: string): Promise<any> {
    return this.patientApi.add(data, id);
  }

  update(data: any): Promise<any> {
    return this.patientApi.update(data);
  }

  delete(id: string): Promise<void> {
    return this.patientApi.delete(id);
  }

  getById(id: string): Observable<any> {
    return this.patientApi.getById(id);
  }

  doOrderBy(query: firebase.firestore.CollectionReference | firebase.firestore.Query, orderBy?: OrderBy) {
    return this.patientApi.doOrderBy(query, orderBy);
  }

  getActivePatients(orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getActivePatients(orderBy, paging);
  }

  getInactivePatients(orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getInactivePatients(orderBy, paging);
  }

  getPatientByName(name: string, orderBy?: OrderBy, paging?: Paging): Observable<(IPatient | FirestorePatient)[]> {
    return this.patientApi.getPatientByName(name, orderBy, paging);
  }

  getPatientByNameAndActive(
    name: string, active: boolean, orderBy?: OrderBy, paging?: Paging): Observable<(IPatient | FirestorePatient)[]> {
    return this.patientApi.getPatientByNameAndActive(name, active, orderBy, paging);
  }

  getPatientByTAJ(idTAJ: string, orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getPatientByTAJ(idTAJ, orderBy, paging);
  }

  getPatientsByPractitioner(practitioner: string, orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getPatientsByPractitioner(practitioner, orderBy, paging);
  }

  getPatientsByGender(gender: string, orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getPatientsByGender(gender, orderBy, paging);
  }

  getPatientsByTelecom(telecom: string, orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getPatientsByTelecom(telecom, orderBy, paging);
  }

  getPatientsByAddress(
    postalCode?: string, country?: string, city?: string, line?: string, orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getPatientsByAddress(postalCode, country, city, line, orderBy, paging);
  }

  getPatientsByBirthDate(birthDate: Date, orderBy?: OrderBy, paging?: Paging): Observable<IPatient[]> {
    return this.patientApi.getPatientsByBirthDate(birthDate, orderBy, paging);
  }
}
