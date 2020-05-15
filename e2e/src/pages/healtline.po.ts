import { browser, by, element, protractor, ElementArrayFinder, ElementFinder, promise } from 'protractor';
import { AppPage } from './app.po';
export class HealtlinePage extends AppPage {

    constructor() {
        super();
    }

    navigateTo(): promise.Promise<string> {
        return super.navigateTo('/main/healtline');
    }


    calculateButton() {
        return super.get(element(by.id('calc')) , true , true, true);
    }

}
