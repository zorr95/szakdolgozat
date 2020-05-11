import { by, element, ElementFinder, browser } from 'protractor';
import { AppPage } from '../pages/app.po';

export class ToolbarPage extends AppPage {

    constructor() {
        super();
    }

    loggedProfileToolbar(): ElementFinder {
        browser.sleep(1500);
        return super.get(element(by.id('user-detail')), true, true, false);
    }

    backButtonOnToolbar(): ElementFinder {
        browser.sleep(1500);
        return super.get(element(by.id('back-button')), true);
    }
}
