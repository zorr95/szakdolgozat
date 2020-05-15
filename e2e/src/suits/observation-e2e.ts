import { LoginPage } from '../pages/login.po';
import { TopBarPage } from '../pages/user-menu.po';
import { ToolbarPage } from '../pages/toolbar.po';
import { browser } from 'protractor';
import { NavbarPage } from '../pages/navbar.po';
import { ObservationPage } from '../pages/observation.po';

describe('On Observation Page ', () => {
    const loginPage = new LoginPage();
    const topBarPage = new TopBarPage();
    const toolBarPage = new ToolbarPage();
    const navbarPage = new NavbarPage();
    const observationPage = new ObservationPage();
    beforeAll(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
    });



    it('Observation page works', () => {
        loginPage.navigateTo();
        loginPage.login('admin@proba.com', '123456');
        navbarPage.observationListLink().click();
        expect(observationPage.timeline().isDisplayed()).toBeTruthy();
        expect(observationPage.segmentButtons().isDisplayed()).toBeTruthy();

    });



    afterAll(() => {
        observationPage.navigateTo();
        toolBarPage.loggedProfileToolbar().click();
        topBarPage.userLogout().click();
    });


});
