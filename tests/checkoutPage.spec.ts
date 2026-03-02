import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../Utils/envConfig'
import { ProductPage } from '../Pages/productPage'
import { LoginPage } from '../Pages/LoginPage'
import { LoginLocators } from '../Locators/LoginLocators'
import { CartPage } from '../Pages/CartPage'
import { CheckoutPage } from '../Pages/checkoutPage'
import { checkoutData } from '../test_data/checkoutData'

test.describe("Cart Page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.clickonCartlink()
    })                          
    test('Validate Checkout Page UI Elements and URL', async ({ page }) => {
        await cartPage.clickCheckoutButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
        const elements = await checkoutPage.getcheckoutElements()
        // await expect(elements.cancel).toBeVisible()
        // await expect(elements.pageInfo).toBeVisible()
        // await expect(elements.continue).toBeVisible()
    })
    test('Validate cancel button functionality', async ({ page }) => {
        await cartPage.clickCheckoutButton()
        await checkoutPage.clickCancel()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")


    })
    test('Validate Continue button', async ({ page }) => {
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillcheckoutDetails(checkoutData.firstname,checkoutData.lastname,checkoutData.postalcode)
        await checkoutPage.clickonContinue()
    })
    test('validate error when clicking on continue with no data',async({page})=>{
        await cartPage.clickCheckoutButton()
        await checkoutPage.clickonContinue()
        const error = await checkoutPage.getErrormessage()
        expect(error?.trim()).toBe("Error: First Name is required")
    })


})
