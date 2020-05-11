import { LoginPage } from '../pages/login.po';
import { TopBarPage } from '../pages/user-menu.po';
import { ToolbarPage } from '../pages/toolbar.po';

import loginData from '../data/login.data.json';
import { browser } from 'protractor';

describe('On Login Page ', () => {
  const loginPage = new LoginPage();
  const topBarPage = new TopBarPage();
  const toolBarPage = new ToolbarPage();

  beforeAll(() => {
    browser.driver.manage().window().maximize();
    browser.ignoreSynchronization = true;
  });



  it(' login fields and options should be displayed', () => {
    loginPage.navigateTo();
    browser.sleep(1500);
    expect(loginPage.emailField().isDisplayed()).toBeTruthy();
    expect(loginPage.passwordField().isDisplayed()).toBeTruthy();
    expect(loginPage.rememberMeCheckbox().isDisplayed()).toBeTruthy();
  });

  it(' a user try to login with a wrong username and correct password, an error message shoul be displayed', () => {
    loginPage.navigateTo();
    loginPage.login('user@proba.coms', '123456');
    expect(loginPage.alertCardText().isDisplayed()).toBeTruthy();
    expect(loginPage.alertCardText().getText()).toContain('Hibás e-mail cím vagy jelszó!');
    expect(loginPage.emailField().getAttribute('value')).toBeFalsy();
    expect(loginPage.passwordField().getAttribute('value')).toBeFalsy();
  });

  it(' a user try to login with a correct username and wrong password, an error message shoul be displayed', () => {
    loginPage.navigateTo();
    loginPage.login('user@proba.com', '12345');
    expect(loginPage.alertCardText().isDisplayed()).toBeTruthy();
    expect(loginPage.alertCardText().getText()).toContain('Hibás e-mail cím vagy jelszó!');

  });

  it('a user try to login with a wrong username and password, an error message shoul be displayed', () => {
    loginPage.navigateTo();
    loginPage.login('user@proba.coms', '12345s');
    expect(loginPage.alertCardText().isDisplayed()).toBeTruthy();
    expect(loginPage.alertCardText().getText()).toContain('Hibás e-mail cím vagy jelszó!');

  });

  it(' a user should successfully login with a correct username and password', () => {
    loginPage.navigateTo();
    browser.sleep(1500);
    expect(loginPage.emailField().isDisplayed()).toBeTruthy();
    expect(loginPage.passwordField().isDisplayed()).toBeTruthy();
    expect(loginPage.rememberMeCheckbox().isDisplayed()).toBeTruthy();
    expect(loginPage.passwordReminderLink().isDisplayed()).toBeTruthy();
    loginPage.login('user@proba.com', '123456');
    toolBarPage.loggedProfileToolbar().click();
    topBarPage.userLogout().click();
  });

  it('username should be displayed after login', () => {
    loginPage.navigateTo();
    loginPage.login('user@proba.com', '123456');
    expect(toolBarPage.loggedProfileToolbar().isDisplayed()).toBeTruthy();
    expect(toolBarPage.loggedProfileToolbar().getText()).toContain('User User');
    toolBarPage.loggedProfileToolbar().click();
    topBarPage.userLogout().click();
  });

  it(' user should successfully logout after login', () => {
    loginPage.navigateTo();
    loginPage.login('user@proba.com', '123456');
    expect(toolBarPage.loggedProfileToolbar().isDisplayed()).toBeTruthy();
    toolBarPage.loggedProfileToolbar().click();
    expect(topBarPage.personalInfo().isDisplayed()).toBeTruthy();
    expect(topBarPage.userSettings().isDisplayed()).toBeTruthy();
    expect(topBarPage.userLogout().isDisplayed()).toBeTruthy();
    topBarPage.userLogout().click();
    browser.sleep(1000);

  });
});
