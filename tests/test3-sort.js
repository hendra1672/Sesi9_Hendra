//  permintaan kebutuhan selenium web driver dan library
    const { Builder, By, until } = require('selenium-webdriver');
    const assert = require('assert');
    const chrome = require('selenium-webdriver/chrome');

    describe('Google Search Test', function () {
    let driver;
    it('Test Case 4 - Sort Product Z - A', async function () {
        const options = new chrome.Options();
        options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.get('https://www.saucedemo.com');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
            
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        // Memberi waktu untuk membuka inventory html
        await driver.wait(until.urlContains('/inventory.html'), 2000, 'Login failed within 2 seconds.');
        let pageTitle = await driver.getTitle();
        assert.strictEqual(pageTitle, 'Swag Labs', 'Page title "Swag Labs" after successful login.');
        console.log('Login successful');

        //Klik Value Z - A
        const optionZa = await driver.findElement(By.xpath("//select[@class='product_sort_container']/option[@value='za']"));
        await optionZa.click();
        let product_sort_container = await driver.findElement(By.xpath('//div[normalize-space()="Test.allTheThings() T-Shirt (Red)"]'));

        //Cek urutan produk
        let isProductDisplayed = await product_sort_container.isDisplayed();
        assert.strictEqual(isProductDisplayed, true, 'The "Test.allTheThings() T-Shirt (Red)" product should be displayed.');
        console.log('Berhasil mengklik opsi "Name (Z to A)".');

        await driver.quit()

    });
});
