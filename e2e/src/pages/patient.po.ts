import { browser, by, element, protractor, ElementArrayFinder, ElementFinder, promise } from 'protractor';
import { AppPage } from './app.po';
export class PatientListPage extends AppPage {

    constructor() {
        super();
    }

    navigateTo(): promise.Promise<string> {
        return super.navigateTo('/main/patient');
    }

    patientAddButton() {
        return super.get(element(by.id('add')), true);
    }

    editPatient(): ElementFinder {
        return super.get(element(by.id('patient-menu-edit-button')), true, true);
    }
    viewPatient(): ElementFinder {
        return super.get(element(by.id('patient-menu-view-button')), true, true);
    }
    deletePatient(): ElementFinder {
        return super.get(element(by.id('patient-menu-view-button')), true, true);
    }

    clickPatient(i: number) {
        super.getArray(element.all(by.id('patient-row')), i, true, true).get(i).click();
    }

    clickMenuButtonForPatient(): ElementFinder {
        return super.get(element(by.id('patient-menu-button')), true, true, true);
    }


    searchPatient(): ElementFinder {
        return super.get(element(by.id('search')), true, true, true);
    }
}
