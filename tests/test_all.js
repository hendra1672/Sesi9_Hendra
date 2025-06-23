//  permintaan kebutuhan selenium web driver dan library
    const { Builder, By, until } = require('selenium-webdriver');
    const assert = require('assert');
    const chrome = require('selenium-webdriver/chrome');

    describe('Google Search Test', function () {
        let driver;
        //  test case
            it('Test Case 1 - Web Address', async function () {
            const options = new chrome.Options();
            options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            await driver.get('https://www.saucedemo.com');
        
        //  cek tampilan dari alamat yang dituju dan menandakan test case 1 sukses
            const title = await driver.getTitle();
            assert.strictEqual(title,'Swag Labs');
        
        //  Driver akan ditutup
            await driver.quit();
        
        })

            it('Test Case 2 - Login Negative Test Case', async function () {
            const options = new chrome.Options();
            options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            await driver.get('https://www.saucedemo.com');

        //  cek lokasi username dengan menggunakan css locator
            let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
            
        //  cek lokasi password dengan menggunakan xpath locator
            let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))

        //  cek lokasi tombol login dengan menggunakan classname locator
            let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
            
        //  input username dengan invalid username, valid password dan klik tombol login dengan negative test case        
            await inputUsername.sendKeys('standard_us')
            await inputPassword.sendKeys('secret_sauce')
            await buttonLogin.click()

        //  Mengambil teks dari elemen pesan error
            let errorMessageElement = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 2000);
            let actualErrorMessage = await errorMessageElement.getText();

        //  Membandingkan teks pesan error yang didapat dengan teks pesan error yang diharapkan
            assert.strictEqual(actualErrorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Pesan error tidak sesuai dengan yang diharapkan.');

        //  Driver akan ditutup
            await driver.quit();
            
        })

            it('Test Case 3 - Login Positive Test Case', async function () {
            const options = new chrome.Options();
            options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            await driver.get('https://www.saucedemo.com');

        //  cek lokasi username dengan menggunakan css locator
            let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
            
        //  cek lokasi password dengan menggunakan xpath locator
            let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))

        //  cek lokasi tombol login dengan menggunakan classname locator
            let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
            
        //  input valid username, valid password dan klik tombol login dengan positive test case        
            await inputUsername.sendKeys('standard_user')
            await inputPassword.sendKeys('secret_sauce')
            await buttonLogin.click()

        //  Memberi waktu maksimal 2 detik
            await driver.wait(until.urlContains('/inventory.html'), 2000, 'Login failed: did not redirect to inventory page within 2 seconds.');
        
        //  Verifikasi judul halaman setelah login
            let pageTitle = await driver.getTitle();
            assert.strictEqual(pageTitle, 'Swag Labs', 'Page title should be "Swag Labs" after successful login.');
            console.log('Login successful and page title "Swag Labs" is correct.');
                
        //  Driver akan ditutup
            await driver.quit();

        })

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
         
        //  Memberi waktu untuk membuka inventory html
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
         
        //  Driver diberi delay sebelum ditutup  
            await driver.sleep(1700)
            await driver.quit();

        });   

    })