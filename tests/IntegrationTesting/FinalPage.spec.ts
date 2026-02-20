import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../../Utils/envConfig'
import { ProductPage } from '../../Pages/productPage'
import { LoginPage } from '../../Pages/LoginPage'
import { LoginLocators } from '../../Locators/LoginLocators'
import { CartPage } from '../../Pages/CartPage'
import { CheckoutPage } from '../../Pages/checkoutPage'
import { checkoutData } from '../../test_data/checkoutData'
import { productsToCart } from '../../test_data/products'
import { checkoutOverviewPage } from '../../Pages/checkOutOverviewPage'
import { FinalPage } from '../../Pages/FinalPage'

test.describe("Final Page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverview: checkoutOverviewPage
    let finalPage: FinalPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverview = new checkoutOverviewPage(page)
        finalPage = new FinalPage(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.getSpecificProductDetails(productsToCart)
        await productPage.clickonCartlink()
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillcheckoutDetails(checkoutData.firstname, checkoutData.lastname, checkoutData.postalcode)
        await checkoutPage.clickonContinue()
        await checkoutOverview.clickonFinish()

    })
    test('validate checkout overview page UI and url', async ({ page }) => {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
        const elements = await finalPage.getFinalPageElements()
        await expect(elements.backHomeButton).toBeVisible()
        await expect(elements.successMessage).toBeVisible()
        await expect(elements.pageInfo).toBeVisible()

    })
    test("Validate the Success Message",async({page})=>{
        const message = await finalPage.getSuccessMessageText()
       expect(message).toBe("Thank you for your order!")
    })
     test("Validate BackHomeButton",async({page})=>{
        await finalPage.clickonBackHomeButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })
})
