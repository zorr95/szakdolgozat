import { browser, by, element, protractor, ElementArrayFinder, ElementFinder, promise } from 'protractor';
import { AppPage } from './app.po';
export class DiariesPage extends AppPage {

    constructor() {
        super();
    }

    navigateTo(): promise.Promise<string> {
        return super.navigateTo('/main/diaries');
    }


    foodAddButton() {
        return super.get(element(by.id('add-food')) , true , true, true);
    }

}

