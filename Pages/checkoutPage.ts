import { Page } from "@playwright/test";
import { CheckoutPageLocators } from "../Locators/checkoutPageLocators";

export class CheckoutPage {
    constructor(private page: Page) { }

    async getcheckoutElements() {
        return {
            pageInfo: this.page.locator(CheckoutPageLocators.pageinfo),
            cancel: this.page.locator(CheckoutPageLocators.cancelButton),
            continue: this.page.locator(CheckoutPageLocators.continueButton)
        }
    }
    async fillcheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(CheckoutPageLocators.firstName, firstName)
        await this.page.fill(CheckoutPageLocators.lastName, lastName)
        await this.page.fill(CheckoutPageLocators.postalCode, postalCode)
    }
    async clickCancel(){
        await this.page.click(CheckoutPageLocators.cancelButton)
    }
      async clickonContinue(){
        await this.page.click(CheckoutPageLocators.continueButton)
    }
        async getErrormessage(){
            return await this.page.locator(CheckoutPageLocators.errormeessage).textContent()
        }


} 