import { Page } from "@playwright/test"
import { FinalPageLocators } from "../Locators/FinalPageLocators"

export class FinalPage {
    constructor(private page: Page) { }
    async getFinalPageElements() {
        return {
            pageInfo: this.page.locator(FinalPageLocators.pageInfo),
            successMessage: this.page.locator(FinalPageLocators.successMessage),
            backHomeButton: this.page.locator(FinalPageLocators.backHomeButton)
        }
    }
    async getSuccessMessageText() {
        const text = await this.page.locator(FinalPageLocators.successMessage).innerText()
        return (await text).trim()
    }
    async clickonBackHomeButton() {
        await this.page.locator(FinalPageLocators.backHomeButton).click()
    }
}