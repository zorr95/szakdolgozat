import { browser, by, element, protractor, ElementArrayFinder, ElementFinder, promise } from 'protractor';
import { AppPage } from '../pages/app.po';

export class LoginPage extends AppPage {
    constructor() {
        super();
    }

    navigateTo(): promise.Promise<string> {
        return super.navigateTo('/login');

    }

    login(email: string, password: string) {
        browser.sleep(1000);
        this.emailField().sendKeys(email);
        this.passwordField().sendKeys(password);
        this.loginButton().click();
        browser.sleep(5000);
        // a login teljes lefutása időigényes, várunk egy kicsit
    }

    emailField(): ElementFinder {
        browser.sleep(2000);
        return super.get(element(by.css('ion-input[id=email] input')));
    }

    passwordField(): ElementFinder {
        browser.sleep(2000);

        return super.get(element(by.css('ion-input[id=password] input')));
    }

    rememberMeCheckbox(): ElementFinder {
        return super.get(element(by.id('isRememberMe')));
    }

    loginButton(): ElementFinder {
        return super.get(element(by.id('loginButton')));
    }

    passwordReminderLink(): ElementFinder {
        browser.sleep(1000);
        return super.get(element(by.className('pwd-reminder')));
    }

    alertCardText(): ElementFinder {
        return super.get(element(by.id('alertCard')));
    }
}
