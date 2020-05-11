import { Injectable } from '@angular/core';
import { PractitionerApi } from '@inclouded/fhir-practitioner';
import { Observable } from 'rxjs';
import { IPractitioner } from '@ahryman40k/ts-fhir-types/lib/R4';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PractitionerService {

    PractitionerApi: PractitionerApi;
    constructor(private afs: AngularFirestore) {
        this.PractitionerApi = new PractitionerApi(this.afs);
    }

    getPractitioners(): Observable<IPractitioner[]> {
        return this.PractitionerApi.getAll();
    }

    addPractitioner(practitioner: IPractitioner) {
        return this.PractitionerApi.add(practitioner);
    }

    deletePractitioner(practitionerId: string) {
        return this.PractitionerApi.delete(practitionerId);
    }

    updatePractitioner(practitioner: IPractitioner) {
        return this.PractitionerApi.update(practitioner);
    }

    getPractitionerbyId(id: string) {
        return this.PractitionerApi.getById(id);
    }


    getPractitionersbyGender(gender: string): Observable<IPractitioner[]> {
        return this.PractitionerApi.getPractitionersbyGender(gender);
    }

    getPractitionersbyTelecom(telecom: string): Observable<IPractitioner[]> {
        return this.PractitionerApi.getPractitionersbyTelecom(telecom);
    }

    getPractitionersbyActive(active: boolean): Observable<IPractitioner[]> {
        return this.PractitionerApi.getPractitionersbyActive(active);
    }

    getPractitionerByNameSubStr(nameSubStr: string) {
        return this.PractitionerApi.getPractitionerByNameSubStr(nameSubStr);
    }
}
