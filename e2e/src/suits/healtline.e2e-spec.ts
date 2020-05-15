import { LoginPage } from '../pages/login.po';
import { TopBarPage } from '../pages/user-menu.po';
import { ToolbarPage } from '../pages/toolbar.po';

import { browser } from 'protractor';
import { DiariesPage } from '../pages/diaries.po';
import { NavbarPage } from '../pages/navbar.po';
import { HealtlinePage } from '../pages/healtline.po';

describe('On Heatline Page ', () => {
    const loginPage = new LoginPage();
    const topBarPage = new TopBarPage();
    const toolBarPage = new ToolbarPage();
    const navbarPage = new NavbarPage();
    const healtline = new HealtlinePage();
    beforeAll(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
    });



    it('Healtline page works', () => {
        loginPage.navigateTo();
        loginPage.login('user@proba.com', '123456');
        navbarPage.HealtlineLink().click();
        expect(healtline.calculateButton().isDisplayed()).toBeTruthy();
    });



    afterAll(() => {
        healtline.navigateTo();
        toolBarPage.loggedProfileToolbar().click();
        topBarPage.userLogout().click();
    });


});
