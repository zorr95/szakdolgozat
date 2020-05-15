import { browser, by, element, protractor, ElementArrayFinder, ElementFinder, promise } from 'protractor';
import { AppPage } from './app.po';
export class AddFoodPage extends AppPage {

    constructor() {
        super();
    }

    navigateToAddFood(): promise.Promise<string> {
        return super.navigateTo('/main/diaries/add');
    }


   resetButton() {
        return super.get(element(by.id('resetBtn')) , true , true, true);
    }

    saveButton() {
        return super.get(element(by.id('save')) , true , true, true);
    }

    cancelButton() {
        return super.get(element(by.id('cancelBtn')) , true , true, true);
    }

}
