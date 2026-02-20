import { Page } from "@playwright/test";
import { cartPagelocators } from "../Locators/CartPageLocators";

export class CartPage {
    constructor(private page: Page) { }
    async clickonContinueShopping() {
        await this.page.locator(cartPagelocators.continueShoppingButton).click()

    }
    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPagelocators.cartTitle),
            shoppingCart: this.page.locator(cartPagelocators.continueShoppingButton),
            checkout: this.page.locator(cartPagelocators.checkoutButton)
        }
    }
    async getCartProducts() {
        const allNames = await this.page.locator(cartPagelocators.productnames).allTextContents()
        const allDescription = await this.page.locator(cartPagelocators.productdescription).allTextContents()
        const allPrices = await this.page.locator(cartPagelocators.productprices).allTextContents()

        const allCartProducts = allNames.map((__, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allCartProducts;
        //array of object [{name,description,price},{},{}]
    }
    async removeFirstProduct() {
        await this.page.locator(cartPagelocators.removeButton).click()
    }
    async clickCheckoutButton()
    {
        await this.page.locator(cartPagelocators.checkoutButton).click()
    }
}


