import {
    browser, by, element, protractor, ElementArrayFinder,
    ElementFinder, promise
} from 'protractor';

const EC = protractor.ExpectedConditions;
const ms = 5000;

export enum gender_E {
    female = 'FEMAILE',
    male = 'MALE',
    alienLifeForm = 'OTHER'
}

export class AppPage {

    constructor() {
        browser.sleep(500);
    }

    navigateTo(url: string = '/'): promise.Promise<string> {
        browser.get(url);
        return this.urlContains(url);
    }

    urlContains(url: string): promise.Promise<string> {
        browser.wait(EC.urlContains(url), ms, 'url doesn´t contain: ' + url);
        return browser.getCurrentUrl();
    }

    getArray(arrayFinder: ElementArrayFinder, visibilityIndex: number = 0, waitForAnimation: boolean = false, clickable: boolean = false):
        ElementArrayFinder {
        if (clickable) {
            browser.wait(EC.elementToBeClickable(arrayFinder.get(visibilityIndex)), ms,
                'ElementArrayFinder is not visible. ' + arrayFinder.locator());
        } else {
            browser.wait(EC.presenceOf(arrayFinder.get(visibilityIndex)), ms,
                'ElementArrayFinder is not visible. ' + arrayFinder.locator());
        }
        if (waitForAnimation) {
            browser.sleep(1500);
        }
        /* browser.wait(EC.presenceOf(arrayFinder.get(visibilityIndex)), ms,
          'ElementArrayFinder is not visible. ' + arrayFinder.locator()); */
        return arrayFinder;
    }

    // tslint:disable-next-line:max-line-length
    get(finder: ElementFinder, waitForAnimation: boolean = false, clickable: boolean = false, canBeMissing: boolean = false): ElementFinder {
        if (clickable) {
            browser.wait(EC.elementToBeClickable(finder), ms, 'ElementFinder is not clickable. ' + finder.locator());
        } else if (!canBeMissing) {
            browser.wait(EC.presenceOf(finder), ms, 'ElementFinder is not visible. ' + finder.locator());
        }
        if (waitForAnimation) {
            browser.sleep(1500);
        }
        return finder;
    }
}
