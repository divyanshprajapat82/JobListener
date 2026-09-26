const puppeteer = require("puppeteer");

const generateOfferLetterHTML = require("../templates/offerLetter");

const createOfferLetterPDF = async (offerData) => {
	let browser;

	try {
		browser = await puppeteer.launch({
			headless: true,
			executablePath:
				"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
			// Important for Windows / local development
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-gpu",
			],

			timeout: 60000,
		});

		const page = await browser.newPage();

		const html = generateOfferLetterHTML(offerData);

		await page.setContent(html, {
			waitUntil: "networkidle0",
			timeout: 60000,
		});

		const pdfBuffer = await page.pdf({
			format: "A4",
			printBackground: true,
			margin: {
				top: "20mm",
				right: "20mm",
				bottom: "20mm",
				left: "20mm",
			},
		});

		return pdfBuffer;
	} catch (error) {
		console.error("Offer letter PDF generation failed:", error);
		throw error;
	} finally {
		if (browser) {
			await browser.close();
		}
	}
};

module.exports = {
	createOfferLetterPDF,
};
