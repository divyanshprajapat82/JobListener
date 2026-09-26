const puppeteer = require("puppeteer");

(async () => {
	try {
		console.log("Launching Chrome...");

		const browser = await puppeteer.launch({
			headless: true,
			executablePath:
				"C:\\Users\\Asus\\.cache\\puppeteer\\chrome\\win64-152.0.7977.75\\chrome-win64\\chrome.exe",
			timeout: 60000,
		});

		console.log("Chrome launched successfully!");

		const page = await browser.newPage();

		await page.setContent(`
      <html>
        <body>
          <h1>Puppeteer Test</h1>
          <p>Chrome is working.</p>
        </body>
      </html>
    `);

		await page.pdf({
			path: "test.pdf",
			format: "A4",
		});

		console.log("PDF created successfully!");

		await browser.close();

		console.log("Browser closed successfully!");
	} catch (error) {
		console.error("Puppeteer test failed:");
		console.error(error);
	}
})();
