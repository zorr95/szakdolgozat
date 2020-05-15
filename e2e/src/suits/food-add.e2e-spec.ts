import { LoginPage } from '../pages/login.po';
import { TopBarPage } from '../pages/user-menu.po';
import { ToolbarPage } from '../pages/toolbar.po';

import loginData from '../data/login.data.json';
import { browser } from 'protractor';
import { DiariesPage } from '../pages/diaries.po';
import { NavbarPage } from '../pages/navbar.po';
import { AddFoodPage } from '../pages/add-food.po';

describe('On FoodAdd Page ', () => {
    const loginPage = new LoginPage();
    const topBarPage = new TopBarPage();
    const toolBarPage = new ToolbarPage();
    const diariesPage = new DiariesPage();
    const navbarPage = new NavbarPage();
    const addFoodPage = new AddFoodPage();
    beforeAll(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
    });



    it('a add page works', () => {
        loginPage.navigateTo();
        loginPage.login('user@proba.com', '123456');
        navbarPage.DiariesListLink().click();
        expect(diariesPage.foodAddButton().isDisplayed()).toBeTruthy();
        diariesPage.foodAddButton().click();
    });

    it('a add page works', () => {
        loginPage.navigateTo();
        loginPage.login('user@proba.com', '123456');
        navbarPage.DiariesListLink().click();
        expect(diariesPage.foodAddButton().isDisplayed()).toBeTruthy();
        diariesPage.foodAddButton().click();
        addFoodPage.navigateTo();
        expect(addFoodPage.saveButton().isDisplayed()).toBeTruthy();
        expect(addFoodPage.resetButton().isDisplayed()).toBeTruthy();
        expect(addFoodPage.cancelButton().isDisplayed()).toBeTruthy();

    });

});
