import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../Utils/envConfig'
import { ProductPage } from '../Pages/productPage'
import { LoginPage } from '../Pages/LoginPage'
import { LoginLocators } from '../Locators/LoginLocators'
import { productPageLocators } from '../Locators/ProductPageLocators'
import { productsToCart } from '../test_data/products'
import { CartPage } from '../Pages/CartPage'

test.describe("ProductPage Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })
    test("validate cart page URL and UI Elements", async ({ page }) => {
        await productPage.addFirstProductToCart()
        await productPage.clickonCartlink()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui = cartPage.getCartPageElements()
        expect((await ui).cartTitle).toBeVisible()
        expect((await ui).shoppingCart).toBeVisible()
        expect((await ui).shoppingCart).toBeVisible()


    })
    test("Validate cart page URL and UI Elements", async ({ page }) => {
        await productPage.addFirstProductToCart()
        await productPage.clickonCartlink()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui = cartPage.getCartPageElements()
        await expect((await ui).cartTitle).toBeVisible()
        expect((await ui).shoppingCart).toBeVisible()
        expect((await ui).checkout).toBeVisible()

    })
    test("validate Continue Shopping Functionallity", async ({ page }) => {
        await productPage.addFirstProductToCart()
        await productPage.clickonCartlink()
        await cartPage.clickonContinueShopping()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })
    test("validate First Products in the Cart Page", async ({ page }) => {
        const firstProduct = await productPage.getFirstProductDetails()
        await productPage.addFirstProductToCart()
        await productPage.clickonCartlink()
        const CartProducts = await cartPage.getCartProducts()
        expect(CartProducts[0]).toEqual(firstProduct)


    })
    test("validate  All Products added to the Cart Page", async ({ page }) => {
        const getAllProductDetails = await productPage.getAllProductDetails()
        await productPage.addAllProductsToCart()
        await productPage.clickonCartlink()
        const CartProducts = await cartPage.getCartProducts()
        expect(CartProducts).toEqual(getAllProductDetails)
    })
    test("validate  Specific Products added to the Cart Page", async ({ page }) => {
        const getSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart)
        await productPage.addSpecificProductsToCart(productsToCart)
        await productPage.clickonCartlink()
        const CartProducts = await cartPage.getCartProducts()
        expect(CartProducts).toEqual(getSpecificProductDetails)
    })
    test("validate Remove Product functionality", async ({ page }) => {
        await productPage.addFirstProductToCart()
        await productPage.clickonCartlink()
        const initialProducts = await cartPage.getCartProducts()
        expect(initialProducts.length).toBeGreaterThan(0)
        await cartPage.removeFirstProduct()
        const updatedcartProducts = await cartPage.getCartProducts()
        expect(updatedcartProducts.length).toBe(initialProducts.length - 1)
    })
    
})
