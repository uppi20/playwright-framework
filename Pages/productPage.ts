import { Page } from "@playwright/test";
import { productPageLocators } from "../Locators/ProductPageLocators";

export class ProductPage {
    constructor(private page: Page) {

    }
    async logout() {
        await this.page.click(productPageLocators.settingIcon)
        await this.page.click(productPageLocators.logutlink)
    }
    async openAboutPage() {
        await this.page.click(productPageLocators.settingIcon)
        await this.page.click(productPageLocators.aboutlink)
    }
    async validateAllProductsDisplayed() {
        const names = await this.page.locator(productPageLocators.productnames).allTextContents()
        const Description = await this.page.locator(productPageLocators.productdescription).allTextContents()
        const price = await this.page.locator(productPageLocators.productprices).allTextContents()
        const buttonCount = await this.page.locator(productPageLocators.addToCartButtons).count()

        if (names.length === 0)
            throw new Error("No Products found")
        if (names.length !== Description.length || names.length !== price.length || names.length !== buttonCount)
            throw new Error("Mismatch between the product details")
    }
    async addFirstProductToCart() {
        await this.page.locator(productPageLocators.addToCartButtons).first().click()
    }
    async addAllProductsToCart() {
        const buttons = this.page.locator(productPageLocators.addToCartButtons)
        const count = await buttons.count()
        for (let i = 0; i < count; i++) {
            await buttons.nth(i).click()
            await this.page.waitForTimeout(2000)
        }
    }
    async addSpecificProductsToCart(productName: string[]) {
        const addProducts = this.page.locator(productPageLocators.productnames)
        const count = await addProducts.count()
        for (let i = 0; i < count; i++) {
            const name = await addProducts.nth(i).textContent()
            if (name && productName.includes(name.trim())) {
                await this.page.locator(productPageLocators.addToCartButtons).nth(i).click()
                await this.page.waitForTimeout(3000)
            }
        }
    }
    async filterByNameAtoZ() {
        await this.page.selectOption(productPageLocators.filterDropdown, "az")
    }
    async filterByNameZtoA() {
        await this.page.selectOption(productPageLocators.filterDropdown, "za")
        await this.page.waitForTimeout(3000)

    }
    async filterByPriceLowToHigh() {
        await this.page.selectOption(productPageLocators.filterDropdown, "lohi")
        await this.page.waitForTimeout(3000)

    }
    async filterByPriceHighToLow() {
        await this.page.selectOption(productPageLocators.filterDropdown, "hilo")
        await this.page.waitForTimeout(3000)

    }
    async getProductNames() {
        return await this.page.locator(productPageLocators.productnames).allTextContents()
    }
    async getProductPrices() {
        const prices = await this.page.locator(productPageLocators.productprices).allTextContents()
        return prices.map(price => parseFloat(price.replace('$', '')))
    }

    async clickonCartlink() {
        await this.page.locator(productPageLocators.cartLink).click()
    }
    async getFirstProductDetails() {
        const name = await this.page.locator(productPageLocators.productnames).first().textContent()
        const description = await this.page.locator(productPageLocators.productdescription).first().textContent()
        const price = await this.page.locator(productPageLocators.productprices).first().textContent()
        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        }
    }
    async getAllProductDetails() {

        const allNames = await this.page.locator(productPageLocators.productnames).allTextContents()
        const alldescription = await this.page.locator(productPageLocators.productdescription).allTextContents()
        const allPrices = await this.page.locator(productPageLocators.productprices).allTextContents()

        const allProducts = allNames.map((__, i) =>
        ({
            name: allNames[i].trim(),
            description: alldescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allProducts
        //array of object [{name,description,price},{},{}]


    }
    async getSpecificProductDetails(productName: string[]) {
        const allNames = await this.page.locator(productPageLocators.productnames).allTextContents()
        const allDescription = await this.page.locator(productPageLocators.productdescription).allTextContents()
        const allPrices = await this.page.locator(productPageLocators.productprices).allTextContents()

        const allProducts = allNames.map((__, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allProducts.filter(p => productName.includes(p.name))

    }















}