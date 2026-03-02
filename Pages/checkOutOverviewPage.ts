import { Page } from "@playwright/test"
import { CheckoutPageLocators } from "../Locators/checkoutPageLocators"
import { checkoutOverviewlocators } from "../Locators/checkoutOverviewLocators"

export class checkoutOverviewPage {
    constructor(private page: Page) { }
    async getcheckoutOverviewElements() {
        return {
            pageinfo: this.page.locator(checkoutOverviewlocators.pageinfo),
            cancelButton: this.page.locator(checkoutOverviewlocators.cancelButton),
            finishButton: this.page.locator(checkoutOverviewlocators.finishButton),

        }
    }
    async getOverviewProducts() {
        const allNames = await this.page.locator(checkoutOverviewlocators.productnames).allTextContents()
        const allDescription = await this.page.locator(checkoutOverviewlocators.productdescription).allTextContents()
        const allPrices = await this.page.locator(checkoutOverviewlocators.productprices).allTextContents()

        const allCartProducts = allNames.map((__, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allCartProducts;
    }
    async getItemTotal() {
        const text = await this.page.locator(checkoutOverviewlocators.itemTotal).textContent()
        return parseFloat(text!.replace("Item total: $", "").trim())
    }
    async getTax() {
        const text = await this.page.locator(checkoutOverviewlocators.tax).textContent()
        return parseFloat(text!.replace("Tax: $", "").trim())

    }
    async getTotal() {
        const text = await this.page.locator(checkoutOverviewlocators.total).textContent()
        return parseFloat(text!.replace("Total: $", "").trim())
    }
    async clickCancel() {
        await this.page.locator(checkoutOverviewlocators.cancelButton).click()
    }
    async clickonFinish() {
        await this.page.locator(checkoutOverviewlocators.finishButton).click()
    }
}