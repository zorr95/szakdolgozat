import { browser, by, element, protractor, ElementArrayFinder, ElementFinder, promise } from 'protractor';
import { AppPage } from './app.po';
export class ObservationPage extends AppPage {

    constructor() {
        super();
    }

    navigateTo(): promise.Promise<string> {
        return super.navigateTo('/main/observation-list');
    }


    timeline() {
        return super.get(element(by.id('timeline')) , true , true, true);
    }

    segmentButtons() {
        return super.get(element(by.id('segment')) , true , true, true);
    }
}
