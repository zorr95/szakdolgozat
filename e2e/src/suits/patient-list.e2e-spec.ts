import { LoginPage } from '../pages/login.po';
import { TopBarPage } from '../pages/user-menu.po';
import { ToolbarPage } from '../pages/toolbar.po';

import { browser } from 'protractor';
import { PatientListPage } from '../pages/patient.po';
import { NavbarPage } from '../pages/navbar.po';

describe('On Patient Page ', () => {
    const loginPage = new LoginPage();
    const patientList = new PatientListPage();
    const navbarPage = new NavbarPage();
    beforeAll(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
        loginPage.navigateTo();
        loginPage.login('admin@proba.com', '123456');
    });



    fit('Patient list to be visible', () => {
        navbarPage.patientListLink().click();
        expect(patientList.patientAddButton().isDisplayed()).toBeTruthy();
        expect(patientList.searchPatient().isDisplayed()).toBeTruthy();

    });


    it('Go to patient Details', () => {
        navbarPage.patientListLink().click();
        expect(patientList.patientAddButton().isDisplayed()).toBeTruthy();
        expect(patientList.searchPatient().isDisplayed()).toBeTruthy();
        patientList.clickPatient(2);
    });


    it('Patient menu button ', () => {
        navbarPage.patientListLink().click();
        expect(patientList.patientAddButton().isDisplayed()).toBeTruthy();
        expect(patientList.searchPatient().isDisplayed()).toBeTruthy();
        patientList.clickMenuButtonForPatient().click();
        expect(patientList.deletePatient().isDisplayed()).toBeTruthy();
        expect(patientList.editPatient().isDisplayed()).toBeTruthy();
        expect(patientList.viewPatient().isDisplayed()).toBeTruthy();

    });
});
