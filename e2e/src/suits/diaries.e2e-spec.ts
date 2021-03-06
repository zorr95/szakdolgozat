import { LoginPage } from '../pages/login.po';
import { TopBarPage } from '../pages/user-menu.po';
import { ToolbarPage } from '../pages/toolbar.po';

import loginData from '../data/login.data.json';
import { browser } from 'protractor';
import { DiariesPage } from '../pages/diaries.po';
import { NavbarPage } from '../pages/navbar.po';

describe('On Diaries Page ', () => {
    const loginPage = new LoginPage();
    const topBarPage = new TopBarPage();
    const toolBarPage = new ToolbarPage();
    const diariesPage = new DiariesPage();
    const navbarPage = new NavbarPage();

    beforeAll(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
    });



    it('a diaries page works', () => {
        loginPage.navigateTo();
        loginPage.login('user@proba.com', '123456');
        navbarPage.DiariesListLink().click();
        expect(diariesPage.foodAddButton().isDisplayed()).toBeTruthy();
    });

    afterAll(() => {
        diariesPage.navigateTo();
        toolBarPage.loggedProfileToolbar().click();
        topBarPage.userLogout().click();
    });

});
