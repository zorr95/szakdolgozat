import { by, element, ElementFinder, browser } from 'protractor';
import { AppPage } from '../pages/app.po';

export class TopBarPage extends AppPage {

    constructor() {
        super();
    }
    userLogout(): ElementFinder {
        browser.sleep(2000);
        return super.get(element(by.id('login')), true, true, true);
    }
    userSettings(): ElementFinder {
        browser.sleep(2000);
        return super.get(element(by.id('settings')), true, true, true);
    }
    personalInfo(): ElementFinder {
        browser.sleep(2000);
        return super.get(element(by.id('personal-info')), true, true, true);
    }
}
