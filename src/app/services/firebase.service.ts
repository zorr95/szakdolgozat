import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore: AngularFirestore) { }
    async getUserAndObservations(userId: string): Promise<any> {
        const result = { practitioner: undefined, observations: new Array() };
        return new Promise((resolve, reject) => {
            this.firestore.collection('Practitioners').doc(userId).get().toPromise().then(userDocument => {
                result.practitioner = userDocument.data();
                this.firestore.collection('Observations', ref => ref.where('data.subject.reference', '==', userId))
                    .get().toPromise().then(snapshot => {
                        snapshot.forEach(observation => {
                            result.observations.push(observation.data());
                        });
                    }).then(() => {
                        resolve(result);
                    });
            });
        });
    }
    async getUserAndObservationsWithDate(userId: string, start: Date, end: Date): Promise<any> {
        const result = { practitioner: undefined, observations: new Array() };
        return new Promise((resolve, reject) => {
            this.firestore.collection('Practitioners').doc(userId).get().toPromise().then(userDocument => {
                result.practitioner = userDocument.data();
                this.firestore.collection('Observations',
                    ref => ref.where('data.subject.reference', '==', userId)
                )
                    .get().toPromise().then(snapshot => {
                        snapshot.forEach(observation => {
                            const obserDate = new Date(observation.data().data.effectiveDateTime);
                            if (obserDate >= start && obserDate <= end) {
                                result.observations.push(observation.data());
                            }
                        });
                    }).then(() => {
                        resolve(result);
                    });
            });
        });
    }
    async getAllUserAndObservations(): Promise<any> {
        const result = new Array();
        return new Promise((resolve, reject) => {
            this.firestore.collection('Practitioners', ref => ref.where('data.role', '==', 'Patient')).get().toPromise().then(snapshot => {
                snapshot.forEach(async (practitioner) => {
                    const complexData = await this.getUserAndObservations(practitioner.id);
                    result.push(complexData);
                });
            }).then(() => resolve(result));
        });
    }
    async getAllUserAndObservationsWithDate(start: Date, end: Date): Promise<any> {
        const result = new Array();
        return new Promise(async (resolve, reject) => {
            // tslint:disable-next-line: max-line-length
            await this.firestore.collection('Practitioners', ref => ref.where('data.role', '==', 'Patient')).get().toPromise().then(snapshot => {
                snapshot.forEach(async (practitioner) => {
                    const complexData = await this.getUserAndObservationsWithDate(practitioner.id, start, end);
                    if (complexData.observations.length > 0) {
                        let userData = { practitioner: complexData.practitioner, calories: 0, protein: 0, ch: 0, fat: 0 };
                        complexData.observations.forEach(observation => {
                            userData.calories += observation.data.component[1].valueQuantity.value;
                            userData.protein += observation.data.component[2].valueQuantity.value;
                            userData.ch += observation.data.component[3].valueQuantity.value;
                            userData.fat += observation.data.component[4].valueQuantity.value;
                        });
                        result.push(userData);
                    }
                });
                resolve(result);
            });
        });
    }




    async proba(userId: string, start: Date, end: Date): Promise<any> {
        const result = { practitioner: undefined, observations: new Array() };
        return new Promise((resolve, reject) => {
            this.firestore.collection('Practitioners').doc(userId).get().toPromise().then(userDocument => {
                result.practitioner = userDocument.data();
                this.firestore.collection('Observations',
                    ref => ref.where('data.subject.reference', '==', userId)
                )
                    .get().toPromise().then(snapshot => {
                        snapshot.forEach(observation => {
                            const obserDate = new Date(observation.data().data.effectiveDateTime);
                            if (obserDate >= start && obserDate <= end) {
                                result.observations.push(observation.data());
                            }
                        });
                    }).then(() => {
                        resolve(result);
                    });
            });
        });
    }
}
