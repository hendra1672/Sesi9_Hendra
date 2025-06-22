//  permintaan kebutuhan selenium web driver dan library
    const { Builder, By, until } = require('selenium-webdriver');
    const assert = require('assert');

    //  nama test 
        describe('Google Search Test', function () {

    //  connect script dengan browser
        let driver;

        //  test case
            it('Test Case 1 - Web Address', async function () {

        //  browser yang dipergunakan chrome
            driver = await new Builder().forBrowser('chrome').build();
        
        //  alamat browser
            await driver.get('https://www.saucedemo.com');

        //  cek tampilan dari alamat yang dituju dan menandakan test case 1 sukses
            const title = await driver.getTitle();
            assert.strictEqual(title,'Swag Labs');

        //  menutup web driver
            await driver.quit();

    })

 })