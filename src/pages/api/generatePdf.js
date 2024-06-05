import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";
import puppeteer from "puppeteer";

// export default async function generatePdf(req, res) {
// 	try {
// 		const browser = await playwright.chromium.launch({
// 			args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
// 			executablePath:
// 				process.env.NODE_ENV === "production"
// 					? await chromium.executablePath
// 					: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
// 			headless:
// 				process.env.NODE_ENV === "production"
// 					? chromium.headless
// 					: true,
// 		});

// 		const context = await browser.newContext();

// 		const page = await context.newPage();

// 		// This is the path of the url which shall be converted to a pdf file
// 		const hostUrl = req.protocol + "://" + req.get("host");

// 		const pdfUrl =
// 			process.env.NODE_ENV === "production"
// 				? hostUrl + "/pdf"
// 				: hostUrl + "/pdf";
// 		console.log(pdfUrl);
// 		await page.goto(pdfUrl, {
// 			waitUntil: "load",
// 		});

// 		const pdf = await page.pdf({
// 			path: "/tmp/awesome.pdf", // we need to move the pdf to the tmp folder otherwise it won't work properly
// 			printBackground: true,
// 			format: "a4",
// 		});
// 		await browser.close();

// 		return res.status(200).json({ pdf });
// 	} catch (error) {
// 		return res
// 			.status(error.statusCode || 500)
// 			.json({ error: error.message });
// 	}
// }

export default async function generatePdf(req, res) {
	const htmlContent = "<h1>Hello World</h1>";

	try {
		// Launch a new browser instance
		const browser = await playwright.chromium.launch({
			args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
			executablePath:
				process.env.NODE_ENV === "production"
					? await chromium.executablePath
					: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
			headless:
				process.env.NODE_ENV === "production"
					? chromium.headless
					: true,
		});
		const page = await browser.newPage();
		console.log("htmlContent", page);
		// Set the content of the page
		await page.setContent(htmlContent, {
			//  waitUntil: 'networkidle0', // Ensure the content is fully loaded
		});

		// Generate the PDF
		const pdfBuffer = await page.pdf({
			format: "A4", // Paper format
			printBackground: true, // Print background colors
		});

		// Close the browser
		await browser.close();

		// Set the response headers
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", "attachment; filename=output.pdf"); // Set the filename and allow download
		res.status(200).send(pdfBuffer);
	} catch (error) {
		res.status(500).send({
			message: "Error generating PDF" + error.message,
		});
	}
}
