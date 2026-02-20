import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../Utils/envConfig'
import { ProductPage } from '../Pages/productPage'
import { LoginPage } from '../Pages/LoginPage'
import { LoginLocators } from '../Locators/LoginLocators'
import { CartPage } from '../Pages/CartPage'
import { CheckoutPage } from '../Pages/checkoutPage'
import { checkoutData } from '../test_data/checkoutData'
import { productsToCart } from '../test_data/products'
import { checkoutOverviewPage } from '../Pages/checkOutOverviewPage'

test.describe("Checkout Overview  Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverview: checkoutOverviewPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverview = new checkoutOverviewPage(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.getSpecificProductDetails(productsToCart)
        await productPage.clickonCartlink()
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillcheckoutDetails(checkoutData.firstname, checkoutData.lastname, checkoutData.postalcode)
        await checkoutPage.clickonContinue()

    })
    test('validate checkout overview page UI and url', async ({ page }) => {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
        const elements = await checkoutOverview.getcheckoutOverviewElements()
        await expect(elements.pageinfo).toBeVisible()
        await expect(elements.cancelButton).toBeVisible()
        await expect(elements.finishButton).toBeVisible()

    })
    test("validate cancel button functionality", async ({ page }) => {
        await checkoutOverview.clickCancel()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })
    test("Validate item total calculation", async ({ page }) => {
        const overviewProducts = await checkoutOverview.getOverviewProducts()
        const calculatedTotal = overviewProducts.reduce((sum, { price }) => sum + parseFloat(price.replace("$", "")), 0)
        const UiItemTotal = await checkoutOverview.getItemTotal()
        expect(calculatedTotal).toBe(UiItemTotal)

    })
    test("Validate Final Total (ItemTotal + Tax)", async ({ page }) => {
        const ItemTotal = await checkoutOverview.getItemTotal()
        const Tax = await checkoutOverview.getTax()
        const FinalTotal = await checkoutOverview.getTotal()
        const expectedFinalTotal = ItemTotal + Tax
        expect(FinalTotal).toBe(expectedFinalTotal)

    })
})
