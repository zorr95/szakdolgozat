import { by, element, ElementFinder } from 'protractor';
import { AppPage } from '../pages/app.po';

export class NavbarPage extends AppPage {

    constructor() {
        super();
    }


    observationListLink(): ElementFinder {
        return super.get(element(by.id('Observations')), false, true);
    }

    patientListLink(): ElementFinder {

        return super.get(element(by.id('Patient')), false, true);
    }


}
